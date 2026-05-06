import { FormEvent, useState } from "react";
import { useMockStore, newId, nowIso } from "../../../admin/mockStore";
import { seedProducts } from "../../../admin/seeds";
import type { Product } from "../../../admin/types";
import Icon from "../../../admin/Icon";
import "./AdminProductsPage.css";

type Draft = Omit<Product, "id" | "createdAt" | "updatedAt">;
const EMPTY: Draft = { name: "", slug: "", logo: "", description: "", price: "", badge: "", version: "" };

export default function AdminProductsPage() {
  const [items, setItems] = useMockStore<Product[]>("admin.products", seedProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);

  function startCreate() { setEditing(null); setDraft(EMPTY); setShowForm(true); }
  function startEdit(p: Product) {
    setEditing(p);
    setDraft({
      name: p.name, slug: p.slug, logo: p.logo, description: p.description,
      price: p.price ?? "", badge: p.badge ?? "", version: p.version ?? "",
    });
    setShowForm(true);
  }
  function cancel() { setShowForm(false); setEditing(null); }
  function save(e: FormEvent) {
    e.preventDefault();
    if (editing) {
      setItems(items.map((x) => (x.id === editing.id ? { ...x, ...draft, updatedAt: nowIso() } : x)));
    } else {
      setItems([...items, { ...draft, id: newId(), createdAt: nowIso(), updatedAt: nowIso() }]);
    }
    cancel();
  }
  function remove(p: Product) {
    if (!confirm(`Xóa sản phẩm "${p.name}"?`)) return;
    setItems(items.filter((x) => x.id !== p.id));
  }

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Sản phẩm</h1>
          <p className="adm-muted">Danh mục sản phẩm hiển thị tại Feature Section.</p>
        </div>
        <button className="adm-btn" onClick={startCreate}>
          <Icon name="plus" size={14} /> Thêm sản phẩm
        </button>
      </div>

      {showForm && (
        <form className="adm-card adm-products-form" onSubmit={save}>
          <div className="adm-card__header">
            <h2 className="adm-h2">{editing ? "Chỉnh sửa sản phẩm" : "Sản phẩm mới"}</h2>
          </div>
          <div className="adm-card__content">
            <div className="adm-row">
              <div className="adm-field">
                <label className="adm-label">Tên sản phẩm</label>
                <input className="adm-input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required />
              </div>
              <div className="adm-field">
                <label className="adm-label">Slug</label>
                <input className="adm-input" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} required />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-label">Logo URL</label>
              <input className="adm-input" value={draft.logo} onChange={(e) => setDraft({ ...draft, logo: e.target.value })} />
              {draft.logo && <img src={draft.logo} alt="" className="adm-products-logo-preview" />}
            </div>
            <div className="adm-field">
              <label className="adm-label">Mô tả</label>
              <textarea className="adm-textarea" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            </div>
            <div className="adm-row-3">
              <div className="adm-field">
                <label className="adm-label">Giá</label>
                <input className="adm-input" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="$899 hoặc Liên hệ" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Phiên bản</label>
                <input className="adm-input" value={draft.version} onChange={(e) => setDraft({ ...draft, version: e.target.value })} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Badge</label>
                <input className="adm-input" value={draft.badge} onChange={(e) => setDraft({ ...draft, badge: e.target.value })} placeholder="HOT, MỚI..." />
              </div>
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="adm-btn adm-btn--outline" type="button" onClick={cancel}>Hủy</button>
            <button className="adm-btn" type="submit">{editing ? "Lưu" : "Tạo sản phẩm"}</button>
          </div>
        </form>
      )}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 70 }}>Logo</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th style={{ width: 110 }}>Giá</th>
              <th style={{ width: 90 }}>Phiên bản</th>
              <th style={{ width: 130 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.logo
                    ? <img src={p.logo} alt="" className="adm-thumb" style={{ height: 36, width: 36, objectFit: "contain", padding: 2 }} />
                    : <div className="adm-thumb" style={{ width: 36, height: 36, background: "var(--adm-muted-bg)" }} />}
                </td>
                <td>
                  <div style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                    {p.name}
                    {p.badge && <span className="adm-badge adm-badge--info">{p.badge}</span>}
                  </div>
                  <div className="adm-muted" style={{ marginTop: 2 }}>/{p.slug}</div>
                </td>
                <td className="adm-muted" style={{ maxWidth: 320 }}>{p.description}</td>
                <td className="adm-mono">{p.price || "—"}</td>
                <td className="adm-mono">{p.version || "—"}</td>
                <td>
                  <div className="adm-table-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => startEdit(p)}><Icon name="edit" size={14} /></button>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => remove(p)} style={{ color: "var(--adm-destructive)" }}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={6} className="adm-table-empty">Chưa có sản phẩm nào</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
