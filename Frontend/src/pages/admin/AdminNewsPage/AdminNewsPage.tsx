import { FormEvent, useState } from "react";
import { useMockStore, newId, nowIso } from "../../../admin/mockStore";
import { seedNews } from "../../../admin/seeds";
import type { NewsItem } from "../../../admin/types";
import Icon from "../../../admin/Icon";
import "./AdminNewsPage.css";

type Draft = Omit<NewsItem, "id" | "createdAt" | "updatedAt">;
const EMPTY: Draft = { slug: "", title: "", category: "", excerpt: "", content: "", image: "", date: "" };

export default function AdminNewsPage() {
  const [items, setItems] = useMockStore<NewsItem[]>("admin.news", seedNews);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);

  function startCreate() { setEditing(null); setDraft(EMPTY); setShowForm(true); }
  function startEdit(n: NewsItem) {
    setEditing(n);
    setDraft({
      slug: n.slug, title: n.title, category: n.category ?? "",
      excerpt: n.excerpt ?? "", content: n.content ?? "",
      image: n.image ?? "", date: n.date ?? "",
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
  function remove(n: NewsItem) {
    if (!confirm(`Xóa bài "${n.title}"?`)) return;
    setItems(items.filter((x) => x.id !== n.id));
  }

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Tin tức</h1>
          <p className="adm-muted">Quản lý bài viết tin tức hiển thị trên trang chủ và trang Tin tức.</p>
        </div>
        <button className="adm-btn" onClick={startCreate}>
          <Icon name="plus" size={14} /> Thêm bài viết
        </button>
      </div>

      {showForm && (
        <form className="adm-card adm-news-form" onSubmit={save}>
          <div className="adm-card__header">
            <h2 className="adm-h2">{editing ? "Chỉnh sửa bài viết" : "Bài viết mới"}</h2>
          </div>
          <div className="adm-card__content">
            <div className="adm-row">
              <div className="adm-field">
                <label className="adm-label">Tiêu đề</label>
                <input className="adm-input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required />
              </div>
              <div className="adm-field">
                <label className="adm-label">Slug</label>
                <input className="adm-input" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} required />
              </div>
            </div>
            <div className="adm-row">
              <div className="adm-field">
                <label className="adm-label">Danh mục</label>
                <input className="adm-input" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Ngày đăng</label>
                <input className="adm-input" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-label">Tóm tắt</label>
              <textarea className="adm-textarea" value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
            </div>
            <div className="adm-field">
              <label className="adm-label">Nội dung</label>
              <textarea className="adm-textarea" rows={8} value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
            </div>
            <div className="adm-field">
              <label className="adm-label">URL ảnh</label>
              <input className="adm-input" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="adm-btn adm-btn--outline" type="button" onClick={cancel}>Hủy</button>
            <button className="adm-btn" type="submit">{editing ? "Lưu" : "Đăng bài"}</button>
          </div>
        </form>
      )}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th style={{ width: 140 }}>Danh mục</th>
              <th style={{ width: 120 }}>Ngày đăng</th>
              <th style={{ width: 130 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((n) => (
              <tr key={n.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{n.title}</div>
                  <div className="adm-muted" style={{ marginTop: 2 }}>/{n.slug}</div>
                </td>
                <td>{n.category ? <span className="adm-badge adm-badge--outline">{n.category}</span> : <span className="adm-muted">—</span>}</td>
                <td className="adm-mono">{n.date || "—"}</td>
                <td>
                  <div className="adm-table-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => startEdit(n)}><Icon name="edit" size={14} /></button>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => remove(n)} style={{ color: "var(--adm-destructive)" }}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="adm-table-empty">Chưa có bài viết nào</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
