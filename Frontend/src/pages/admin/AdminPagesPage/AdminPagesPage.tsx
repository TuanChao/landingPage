import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Page, BlockPreset } from "@/admin/types";
import { Icon } from "@/admin/components";
import { request, resolveAssetUrl, useApiResource } from "@/admin/api";
import { TEMPLATES } from "@/pageBuilder/templates";

interface ViewStats { slug: string; total: number; last7: number; last30: number; a: number; b: number; }

type Draft = { slug: string; title: string; templateId: string };

const EMPTY: Draft = { slug: "", title: "", templateId: "blank" };

function tryParse(s: string) {
  try { return JSON.parse(s); } catch { return { content: [], root: {} }; }
}

function slugify(s: string) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPagesPage() {
  const { items, loading, error, create, remove, update } = useApiResource<Page>("pages");
  const { items: presets } = useApiResource<BlockPreset>("block-presets");
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<Record<string, ViewStats>>({});

  useEffect(() => {
    request<any[]>("GET", "/api/page-views/stats").then((rows) => {
      const map: Record<string, ViewStats> = {};
      (rows || []).forEach((r: any) => {
        map[r.slug] = { slug: r.slug, total: r.total, last7: r.last7, last30: r.last30, a: r.a, b: r.b };
      });
      setStats(map);
    }).catch(() => {});
  }, []);

  // Gộp templates built-in + user presets, prefix "preset:" để phân biệt.
  const allOptions = [
    ...TEMPLATES.map((t) => ({ id: t.id, name: t.name, description: t.description, data: t.data, thumbnail: "" })),
    ...presets.map((p) => ({ id: `preset:${p.id}`, name: `★ ${p.name}`, description: p.description || "Preset đã lưu", data: tryParse(p.data), thumbnail: p.thumbnail || "" })),
  ];

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!draft.slug.trim() || !draft.title.trim()) return;
    setSaving(true);
    try {
      const opt = allOptions.find((t) => t.id === draft.templateId) ?? allOptions[0];
      const created = await create({
        slug: draft.slug, title: draft.title,
        data: JSON.stringify(opt.data),
        published: false,
      });
      setDraft(EMPTY);
      setShowForm(false);
      window.location.href = `/admin/pages/${created.id}/edit`;
    } catch (ex: any) {
      alert(ex?.message || "Tạo thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(p: Page) {
    if (!confirm(`Xóa trang "${p.title}"?`)) return;
    try { await remove(p.id); } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
  }

  async function togglePublish(p: Page) {
    try { await update(p.id, { ...p, published: !p.published }); }
    catch (ex: any) { alert(ex?.message || "Cập nhật thất bại"); }
  }

  function exportPage(p: Page) {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      slug: p.slug,
      title: p.title,
      titleEn: p.titleEn,
      titleZh: p.titleZh,
      data: tryParse(p.data),
      dataB: p.dataB ? tryParse(p.dataB) : null,
      variantBWeight: p.variantBWeight,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${p.slug}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importPage(file: File) {
    try {
      const text = await file.text();
      const obj = JSON.parse(text);
      if (!obj.slug || !obj.title || !obj.data) throw new Error("File không hợp lệ (thiếu slug/title/data)");
      // Đảm bảo slug không trùng
      let slug = obj.slug as string;
      let n = 1;
      while (items.some((x) => x.slug === slug)) { n++; slug = `${obj.slug}-${n}`; }
      const created = await create({
        slug, title: obj.title,
        titleEn: obj.titleEn, titleZh: obj.titleZh,
        data: JSON.stringify(obj.data),
        dataB: obj.dataB ? JSON.stringify(obj.dataB) : undefined,
        variantBWeight: obj.variantBWeight ?? 50,
        published: false,
      });
      alert(`Đã import thành "${slug}". Mở editor…`);
      window.location.href = `/admin/pages/${created.id}/edit`;
    } catch (ex: any) {
      alert(ex?.message || "Import thất bại");
    }
  }

  async function duplicate(p: Page) {
    const newTitle = `${p.title} (copy)`;
    let baseSlug = `${p.slug}-copy`;
    let slug = baseSlug;
    let n = 1;
    while (items.some((x) => x.slug === slug)) { n++; slug = `${baseSlug}-${n}`; }
    try {
      const created = await create({
        slug, title: newTitle,
        titleEn: p.titleEn, titleZh: p.titleZh,
        data: p.data, published: false,
      });
      window.location.href = `/admin/pages/${created.id}/edit`;
    } catch (ex: any) { alert(ex?.message || "Nhân bản thất bại"); }
  }

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Trang tùy biến</h1>
          <p className="adm-muted">Tạo landing page bằng cách kéo thả block. Mỗi trang truy cập qua <code>/p/&lt;slug&gt;</code>.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <label className="adm-btn adm-btn--outline" style={{ cursor: "pointer", margin: 0 }}>
            Import JSON
            <input type="file" accept="application/json,.json" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) importPage(f); }} />
          </label>
          <Link to="/admin/block-presets" className="adm-btn adm-btn--outline">
            Block Presets
          </Link>
          <button className="adm-btn" onClick={() => setShowForm((v) => !v)}>
            <Icon name="plus" size={14} /> Tạo trang mới
          </button>
        </div>
      </div>

      {showForm && (
        <form className="adm-card" onSubmit={handleCreate} style={{ marginBottom: 16 }}>
          <div className="adm-card__header">
            <h2 className="adm-h2">Tạo trang mới</h2>
          </div>
          <div className="adm-card__content">
            <div className="adm-field">
              <label className="adm-label">Tiêu đề</label>
              <input
                className="adm-input"
                value={draft.title}
                onChange={(e) => {
                  const t = e.target.value;
                  setDraft((d) => ({ ...d, title: t, slug: d.slug || slugify(t) }));
                }}
                required
              />
            </div>
            <div className="adm-field">
              <label className="adm-label">Slug (URL)</label>
              <input
                className="adm-input"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                placeholder="khuyen-mai-thang-5"
                required
              />
              <small className="adm-muted">URL public: /p/{draft.slug || "..."}</small>
            </div>
            <div className="adm-field">
              <label className="adm-label">Bắt đầu từ template hoặc preset</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {allOptions.map((t) => (
                  <label key={t.id} style={{
                    display: "block", border: `2px solid ${draft.templateId === t.id ? "#e63946" : "#e5e7eb"}`,
                    borderRadius: 8, padding: 0, cursor: "pointer", background: "#fff", overflow: "hidden",
                  }}>
                    {t.thumbnail && (
                      <img src={resolveAssetUrl(t.thumbnail)} alt="" style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
                    )}
                    <div style={{ padding: 12 }}>
                      <input
                        type="radio" name="tpl" value={t.id}
                        checked={draft.templateId === t.id}
                        onChange={() => setDraft({ ...draft, templateId: t.id })}
                        style={{ marginRight: 6 }}
                      />
                      <strong>{t.name}</strong>
                      <div className="adm-muted" style={{ fontSize: 12, marginTop: 4 }}>{t.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button type="button" className="adm-btn adm-btn--outline" onClick={() => { setShowForm(false); setDraft(EMPTY); }} disabled={saving}>Hủy</button>
            <button type="submit" className="adm-btn" disabled={saving}>{saving ? "Đang tạo…" : "Tạo & mở editor"}</button>
          </div>
        </form>
      )}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Slug</th>
              <th style={{ width: 110 }}>Views (7d)</th>
              <th style={{ width: 140 }}>Trạng thái</th>
              <th style={{ width: 180 }}>Cập nhật</th>
              <th style={{ width: 200 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={6} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && items.map((p) => {
              const s = stats[p.slug];
              const hasAB = !!(p.dataB && p.dataB.trim() && p.dataB !== "{}");
              return (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{p.title}</div>
                  {hasAB && <span className="adm-badge adm-badge--muted" style={{ fontSize: 10, marginTop: 2 }}>A/B</span>}
                </td>
                <td><code>/p/{p.slug}</code></td>
                <td className="adm-mono">
                  <strong>{s?.last7 ?? 0}</strong>
                  <div className="adm-muted" style={{ fontSize: 11 }}>tổng {s?.total ?? 0}</div>
                </td>
                <td>
                  <button
                    className={`adm-badge adm-badge--${p.published ? "success" : "muted"}`}
                    onClick={() => togglePublish(p)}
                    style={{ border: 0, cursor: "pointer" }}
                  >
                    {p.published ? "Đã xuất bản" : "Bản nháp"}
                  </button>
                </td>
                <td className="adm-muted">{new Date(p.updatedAt).toLocaleString("vi-VN")}</td>
                <td>
                  <div className="adm-table-actions">
                    <Link to={`/admin/pages/${p.id}/edit`} className="adm-btn adm-btn--ghost adm-btn--sm">
                      <Icon name="edit" size={14} /> Sửa
                    </Link>
                    <Link to={`/admin/pages/${p.id}/preview`} className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" title="Preview (xem bản nháp)">
                      <Icon name="eye" size={14} />
                    </Link>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => duplicate(p)} title="Nhân bản">
                      <Icon name="plus" size={14} />
                    </button>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => exportPage(p)} title="Export JSON">
                      <Icon name="download" size={14} />
                    </button>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => handleRemove(p)} title="Xóa" style={{ color: "var(--adm-destructive)" }}>
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
              );
            })}
            {!loading && !error && items.length === 0 && (
              <tr><td colSpan={6} className="adm-table-empty">Chưa có trang nào — bấm "Tạo trang mới"</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
