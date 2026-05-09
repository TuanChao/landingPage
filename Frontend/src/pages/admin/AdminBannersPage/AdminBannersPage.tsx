import { FormEvent, useState } from "react";
import type { Banner } from "@/admin/types";
import { Icon, FileUpload, LangTabs } from "@/admin/components";
import { resolveAssetUrl, useApiResource } from "@/admin/api";
import "./AdminBannersPage.css";

type Lang = "vi" | "en" | "zh";
type Draft = Omit<Banner, "id" | "createdAt" | "updatedAt">;

const EMPTY: Draft = {
  title: "", titleEn: "", titleZh: "",
  subtitle: "", subtitleEn: "", subtitleZh: "",
  image: "",
  ctaLabel: "", ctaLabelEn: "", ctaLabelZh: "",
  ctaHref: "",
  order: 0, active: true,
};

export default function AdminBannersPage() {
  const { items, loading, error, create, update, remove } = useApiResource<Banner>("banners");
  const [editing, setEditing] = useState<Banner | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<Lang>("vi");

  const sorted = [...items].sort((a, b) => a.order - b.order);

  function startCreate() {
    setEditing(null);
    setDraft({ ...EMPTY, order: (sorted[sorted.length - 1]?.order ?? 0) + 1 });
    setLang("vi");
    setShowForm(true);
  }
  function startEdit(b: Banner) {
    setEditing(b);
    setDraft({
      title: b.title, titleEn: b.titleEn ?? "", titleZh: b.titleZh ?? "",
      subtitle: b.subtitle ?? "", subtitleEn: b.subtitleEn ?? "", subtitleZh: b.subtitleZh ?? "",
      image: b.image,
      ctaLabel: b.ctaLabel ?? "", ctaLabelEn: b.ctaLabelEn ?? "", ctaLabelZh: b.ctaLabelZh ?? "",
      ctaHref: b.ctaHref ?? "",
      order: b.order, active: b.active,
    });
    setLang("vi");
    setShowForm(true);
  }
  function cancel() { setShowForm(false); setEditing(null); }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await update(editing.id, draft);
      else await create(draft);
      cancel();
    } catch (ex: any) {
      alert(ex?.message || "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(b: Banner) {
    if (!confirm(`Xóa banner "${b.title}"?`)) return;
    try { await remove(b.id); } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
  }

  async function toggleActive(b: Banner) {
    try { await update(b.id, { ...b, active: !b.active }); } catch (ex: any) { alert(ex?.message || "Cập nhật thất bại"); }
  }

  // Helpers to get/set fields for current lang
  const titleKey = lang === "vi" ? "title" : lang === "en" ? "titleEn" : "titleZh";
  const subtitleKey = lang === "vi" ? "subtitle" : lang === "en" ? "subtitleEn" : "subtitleZh";
  const ctaLabelKey = lang === "vi" ? "ctaLabel" : lang === "en" ? "ctaLabelEn" : "ctaLabelZh";

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Banner trang chủ</h1>
          <p className="adm-muted">Slide trên Hero Section. Sắp xếp theo "Thứ tự".</p>
        </div>
        <button className="adm-btn" onClick={startCreate}>
          <Icon name="plus" size={14} /> Thêm banner
        </button>
      </div>

      {showForm && (
        <form className="adm-card adm-banners-form" onSubmit={save}>
          <div className="adm-card__header">
            <h2 className="adm-h2">{editing ? "Chỉnh sửa banner" : "Thêm banner mới"}</h2>
            <p className="adm-muted">Banner hiển thị ngay đầu trang chủ. Đảm bảo ảnh có tỷ lệ phù hợp.</p>
          </div>
          <div className="adm-card__content">
            <LangTabs value={lang} onChange={setLang} />

            <div className="adm-field">
              <label className="adm-label">Tiêu đề</label>
              <input
                className="adm-input"
                value={(draft as any)[titleKey] ?? ""}
                onChange={(e) => setDraft({ ...draft, [titleKey]: e.target.value })}
                required={lang === "vi"}
              />
            </div>
            <div className="adm-field">
              <label className="adm-label">Mô tả phụ</label>
              <textarea
                className="adm-textarea"
                value={(draft as any)[subtitleKey] ?? ""}
                onChange={(e) => setDraft({ ...draft, [subtitleKey]: e.target.value })}
              />
            </div>

            {lang === "vi" && (
              <>
                <div className="adm-field">
                  <label className="adm-label">Ảnh banner</label>
                  <input
                    className="adm-input"
                    value={draft.image}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                    placeholder="Dán URL ảnh hoặc tải lên bên dưới"
                  />
                  <div style={{ marginTop: 8 }}>
                    <FileUpload
                      category="image"
                      value={draft.image}
                      onChange={(r) => setDraft((d) => ({ ...d, image: r.url }))}
                      hint="JPG/PNG/WEBP/SVG · khuyến nghị 1920×800"
                    />
                  </div>
                </div>
                <div className="adm-row">
                  <div className="adm-field">
                    <label className="adm-label">Link CTA (dùng chung)</label>
                    <input className="adm-input" value={draft.ctaHref} onChange={(e) => setDraft({ ...draft, ctaHref: e.target.value })} placeholder="/tai-ve/zwcad-trial" />
                  </div>
                  <div className="adm-field">
                    <label className="adm-label">Thứ tự</label>
                    <input className="adm-input" type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="adm-field">
                  <label className="adm-label">Trạng thái</label>
                  <select className="adm-select" value={draft.active ? "1" : "0"} onChange={(e) => setDraft({ ...draft, active: e.target.value === "1" })}>
                    <option value="1">Đang hiển thị</option>
                    <option value="0">Đã tắt</option>
                  </select>
                </div>
              </>
            )}

            <div className="adm-field">
              <label className="adm-label">Nhãn nút CTA</label>
              <input
                className="adm-input"
                value={(draft as any)[ctaLabelKey] ?? ""}
                onChange={(e) => setDraft({ ...draft, [ctaLabelKey]: e.target.value })}
                placeholder="Tải về dùng thử"
              />
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="adm-btn adm-btn--outline" type="button" onClick={cancel} disabled={saving}>Hủy</button>
            <button className="adm-btn" type="submit" disabled={saving}>
              {saving ? "Đang lưu…" : editing ? "Lưu thay đổi" : "Tạo banner"}
            </button>
          </div>
        </form>
      )}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th style={{ width: 80 }}>Ảnh</th>
              <th>Tiêu đề</th>
              <th>CTA</th>
              <th style={{ width: 120 }}>Trạng thái</th>
              <th style={{ width: 130 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={6} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && sorted.map((b) => (
              <tr key={b.id}>
                <td className="adm-mono">{b.order}</td>
                <td>{b.image && <img src={resolveAssetUrl(b.image)} alt="" className="adm-thumb" />}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{b.title}</div>
                  {b.subtitle && <div className="adm-muted" style={{ marginTop: 2 }}>{b.subtitle}</div>}
                </td>
                <td>
                  {b.ctaLabel
                    ? <span>{b.ctaLabel} <span className="adm-muted">→ {b.ctaHref}</span></span>
                    : <span className="adm-muted">—</span>}
                </td>
                <td>
                  <button
                    className={`adm-badge adm-badge--${b.active ? "success" : "muted"}`}
                    onClick={() => toggleActive(b)}
                    style={{ border: 0, cursor: "pointer" }}
                  >
                    {b.active ? "Đang hiển thị" : "Đã tắt"}
                  </button>
                </td>
                <td>
                  <div className="adm-table-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => startEdit(b)} title="Sửa">
                      <Icon name="edit" size={14} />
                    </button>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => handleRemove(b)} title="Xóa" style={{ color: "var(--adm-destructive)" }}>
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && !error && sorted.length === 0 && (
              <tr><td colSpan={6} className="adm-table-empty">Chưa có banner nào — bấm "Thêm banner" để tạo mới</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
