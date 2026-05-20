import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import type { Page } from "@/admin/types";
import { Icon } from "@/admin/components";
import { useApiResource } from "@/admin/api";
import { TEMPLATES } from "@/pageBuilder/templates";

type Draft = { slug: string; title: string; templateId: string };

const EMPTY: Draft = { slug: "", title: "", templateId: "blank" };

function slugify(s: string) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPagesPage() {
  const { items, loading, error, create, remove, update } = useApiResource<Page>("pages");
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!draft.slug.trim() || !draft.title.trim()) return;
    setSaving(true);
    try {
      const tpl = TEMPLATES.find((t) => t.id === draft.templateId) ?? TEMPLATES[0];
      const created = await create({
        slug: draft.slug, title: draft.title,
        data: JSON.stringify(tpl.data),
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
        <button className="adm-btn" onClick={() => setShowForm((v) => !v)}>
          <Icon name="plus" size={14} /> Tạo trang mới
        </button>
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
              <label className="adm-label">Bắt đầu từ template</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {TEMPLATES.map((t) => (
                  <label key={t.id} style={{
                    display: "block", border: `2px solid ${draft.templateId === t.id ? "#e63946" : "#e5e7eb"}`,
                    borderRadius: 8, padding: 12, cursor: "pointer", background: "#fff",
                  }}>
                    <input
                      type="radio" name="tpl" value={t.id}
                      checked={draft.templateId === t.id}
                      onChange={() => setDraft({ ...draft, templateId: t.id })}
                      style={{ marginRight: 6 }}
                    />
                    <strong>{t.name}</strong>
                    <div className="adm-muted" style={{ fontSize: 12, marginTop: 4 }}>{t.description}</div>
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
              <th style={{ width: 140 }}>Trạng thái</th>
              <th style={{ width: 180 }}>Cập nhật</th>
              <th style={{ width: 200 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={5} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && items.map((p) => (
              <tr key={p.id}>
                <td><div style={{ fontWeight: 500 }}>{p.title}</div></td>
                <td><code>/p/{p.slug}</code></td>
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
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => handleRemove(p)} title="Xóa" style={{ color: "var(--adm-destructive)" }}>
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && !error && items.length === 0 && (
              <tr><td colSpan={5} className="adm-table-empty">Chưa có trang nào — bấm "Tạo trang mới"</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
