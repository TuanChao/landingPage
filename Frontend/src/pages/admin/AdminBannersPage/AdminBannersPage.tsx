import { FormEvent, useState } from "react";
import { useMockStore, newId, nowIso } from "../../../admin/mockStore";
import { seedBanners } from "../../../admin/seeds";
import type { Banner } from "../../../admin/types";
import Icon from "../../../admin/Icon";
import "./AdminBannersPage.css";

type Draft = Omit<Banner, "id" | "createdAt" | "updatedAt">;
const EMPTY: Draft = {
  title: "", subtitle: "", image: "",
  ctaLabel: "", ctaHref: "",
  order: 0, active: true,
};

export default function AdminBannersPage() {
  const [items, setItems] = useMockStore<Banner[]>("admin.banners", seedBanners);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);

  const sorted = [...items].sort((a, b) => a.order - b.order);

  function startCreate() {
    setEditing(null);
    setDraft({ ...EMPTY, order: (sorted.at(-1)?.order ?? 0) + 1 });
    setShowForm(true);
  }
  function startEdit(b: Banner) {
    setEditing(b);
    setDraft({
      title: b.title, subtitle: b.subtitle ?? "", image: b.image,
      ctaLabel: b.ctaLabel ?? "", ctaHref: b.ctaHref ?? "",
      order: b.order, active: b.active,
    });
    setShowForm(true);
  }
  function cancel() { setShowForm(false); setEditing(null); }

  function handleImageFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, image: reader.result as string }));
    reader.readAsDataURL(file);
  }

  function save(e: FormEvent) {
    e.preventDefault();
    if (editing) {
      setItems(items.map((b) => (b.id === editing.id ? { ...b, ...draft, updatedAt: nowIso() } : b)));
    } else {
      setItems([...items, { ...draft, id: newId(), createdAt: nowIso(), updatedAt: nowIso() }]);
    }
    cancel();
  }

  function remove(b: Banner) {
    if (!confirm(`Xóa banner "${b.title}"?`)) return;
    setItems(items.filter((x) => x.id !== b.id));
  }

  function toggleActive(b: Banner) {
    setItems(items.map((x) => (x.id === b.id ? { ...x, active: !x.active, updatedAt: nowIso() } : x)));
  }

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
            <div className="adm-field">
              <label className="adm-label">Tiêu đề</label>
              <input className="adm-input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required />
            </div>
            <div className="adm-field">
              <label className="adm-label">Mô tả phụ</label>
              <textarea className="adm-textarea" value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} />
            </div>
            <div className="adm-field">
              <label className="adm-label">Ảnh banner</label>
              <input
                className="adm-input"
                value={draft.image}
                onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                placeholder="URL ảnh hoặc chọn file bên dưới"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                style={{ marginTop: 8, fontSize: 12 }}
              />
              {draft.image && (
                <div className="adm-banners-preview">
                  <img src={draft.image} alt="" />
                </div>
              )}
            </div>
            <div className="adm-row">
              <div className="adm-field">
                <label className="adm-label">Nhãn nút CTA</label>
                <input className="adm-input" value={draft.ctaLabel} onChange={(e) => setDraft({ ...draft, ctaLabel: e.target.value })} placeholder="Tải về dùng thử" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Link CTA</label>
                <input className="adm-input" value={draft.ctaHref} onChange={(e) => setDraft({ ...draft, ctaHref: e.target.value })} placeholder="/tai-ve/zwcad-trial" />
              </div>
            </div>
            <div className="adm-row">
              <div className="adm-field">
                <label className="adm-label">Thứ tự</label>
                <input className="adm-input" type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Trạng thái</label>
                <select className="adm-select" value={draft.active ? "1" : "0"} onChange={(e) => setDraft({ ...draft, active: e.target.value === "1" })}>
                  <option value="1">Đang hiển thị</option>
                  <option value="0">Đã tắt</option>
                </select>
              </div>
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="adm-btn adm-btn--outline" type="button" onClick={cancel}>Hủy</button>
            <button className="adm-btn" type="submit">{editing ? "Lưu thay đổi" : "Tạo banner"}</button>
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
            {sorted.map((b) => (
              <tr key={b.id}>
                <td className="adm-mono">{b.order}</td>
                <td>{b.image && <img src={b.image} alt="" className="adm-thumb" />}</td>
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
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => remove(b)} title="Xóa" style={{ color: "var(--adm-destructive)" }}>
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr><td colSpan={6} className="adm-table-empty">Chưa có banner nào — bấm "Thêm banner" để tạo mới</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
