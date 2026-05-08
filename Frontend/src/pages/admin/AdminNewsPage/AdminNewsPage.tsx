import { FormEvent, useState } from "react";
import type { NewsItem } from "@/admin/types";
import { Icon, FileUpload, RichTextEditor } from "@/admin/components";
import { useApiResource } from "@/admin/api";
import "./AdminNewsPage.css";

type Draft = Omit<NewsItem, "id" | "createdAt" | "updatedAt">;
const EMPTY: Draft = { slug: "", title: "", category: "", excerpt: "", content: "", image: "", date: "" };

// Backend dùng publishedAt (DateTime), FE dùng date (yyyy-mm-dd) cho input[type=date].
const mapIn = (raw: any): NewsItem => ({
  ...raw,
  date: raw.publishedAt ? String(raw.publishedAt).slice(0, 10) : "",
});
const mapOut = (d: Partial<NewsItem>): any => {
  const { date, ...rest } = d as any;
  return { ...rest, publishedAt: date ? new Date(date).toISOString() : null };
};

export default function AdminNewsPage() {
  const { items, loading, error, create, update, remove } = useApiResource<NewsItem>("news", { mapIn, mapOut });
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

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
  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await update(editing.id, draft);
      else await create(draft);
      cancel();
    } catch (ex: any) { alert(ex?.message || "Lưu thất bại"); }
    finally { setSaving(false); }
  }
  async function handleRemove(n: NewsItem) {
    if (!confirm(`Xóa bài "${n.title}"?`)) return;
    try { await remove(n.id); } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
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
              <RichTextEditor
                value={draft.content || ""}
                onChange={(html) => setDraft((d) => ({ ...d, content: html }))}
                placeholder="Nhập nội dung bài viết. Có thể dán hoặc kéo-thả ảnh trực tiếp vào đây."
              />
            </div>
            <div className="adm-field">
              <label className="adm-label">Ảnh đại diện</label>
              <input
                className="adm-input"
                value={draft.image}
                onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                placeholder="Dán URL hoặc tải lên bên dưới"
              />
              <div style={{ marginTop: 8 }}>
                <FileUpload
                  category="image"
                  value={draft.image}
                  onChange={(r) => setDraft((d) => ({ ...d, image: r.url }))}
                  hint="JPG/PNG · tỷ lệ 16:9"
                />
              </div>
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="adm-btn adm-btn--outline" type="button" onClick={cancel} disabled={saving}>Hủy</button>
            <button className="adm-btn" type="submit" disabled={saving}>
              {saving ? "Đang lưu…" : editing ? "Lưu" : "Đăng bài"}
            </button>
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
            {loading && <tr><td colSpan={4} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={4} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && items.map((n) => (
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
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => handleRemove(n)} style={{ color: "var(--adm-destructive)" }}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && !error && items.length === 0 && <tr><td colSpan={4} className="adm-table-empty">Chưa có bài viết nào</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
