import { FormEvent, useState } from "react";
import type { NewsItem } from "@/admin/types";
import { Icon, FileUpload, RichTextEditor, LangTabs } from "@/admin/components";
import { useApiResource } from "@/admin/api";
import "./AdminNewsPage.css";

type Lang = "vi" | "en" | "zh";
type Draft = Omit<NewsItem, "id" | "createdAt" | "updatedAt">;

const EMPTY: Draft = {
  slug: "", title: "", titleEn: "", titleZh: "",
  category: "",
  excerpt: "", excerptEn: "", excerptZh: "",
  content: "", contentEn: "", contentZh: "",
  image: "", date: "",
};

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
  const [lang, setLang] = useState<Lang>("vi");

  function startCreate() { setEditing(null); setDraft(EMPTY); setLang("vi"); setShowForm(true); }
  function startEdit(n: NewsItem) {
    setEditing(n);
    setDraft({
      slug: n.slug, title: n.title, titleEn: n.titleEn ?? "", titleZh: n.titleZh ?? "",
      category: n.category ?? "",
      excerpt: n.excerpt ?? "", excerptEn: n.excerptEn ?? "", excerptZh: n.excerptZh ?? "",
      content: n.content ?? "", contentEn: n.contentEn ?? "", contentZh: n.contentZh ?? "",
      image: n.image ?? "", date: n.date ?? "",
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
    } catch (ex: any) { alert(ex?.message || "Lưu thất bại"); }
    finally { setSaving(false); }
  }
  async function handleRemove(n: NewsItem) {
    if (!confirm(`Xóa bài "${n.title}"?`)) return;
    try { await remove(n.id); } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
  }

  const titleKey = lang === "vi" ? "title" : lang === "en" ? "titleEn" : "titleZh";
  const excerptKey = lang === "vi" ? "excerpt" : lang === "en" ? "excerptEn" : "excerptZh";
  const contentKey = lang === "vi" ? "content" : lang === "en" ? "contentEn" : "contentZh";

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
            <LangTabs value={lang} onChange={setLang} />

            {lang === "vi" && (
              <div className="adm-row">
                <div className="adm-field">
                  <label className="adm-label">Slug</label>
                  <input className="adm-input" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} required />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Danh mục</label>
                  <input className="adm-input" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
                </div>
              </div>
            )}

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
              <label className="adm-label">Tóm tắt</label>
              <textarea
                className="adm-textarea"
                value={(draft as any)[excerptKey] ?? ""}
                onChange={(e) => setDraft({ ...draft, [excerptKey]: e.target.value })}
              />
            </div>
            <div className="adm-field">
              <label className="adm-label">Nội dung</label>
              <RichTextEditor
                value={(draft as any)[contentKey] || ""}
                onChange={(html) => setDraft((d) => ({ ...d, [contentKey]: html }))}
                placeholder="Nhập nội dung bài viết. Có thể dán hoặc kéo-thả ảnh trực tiếp vào đây."
              />
            </div>

            {lang === "vi" && (
              <>
                <div className="adm-row">
                  <div className="adm-field">
                    <label className="adm-label">Ngày đăng</label>
                    <input className="adm-input" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                  </div>
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
              </>
            )}
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
