import { FormEvent, useState } from "react";
import type { DownloadItem } from "@/admin/types";
import { Icon, FileUpload } from "@/admin/components";
import { formatBytes, useApiResource } from "@/admin/api";
import "./AdminDownloadsPage.css";

type Draft = Omit<DownloadItem, "id" | "createdAt" | "updatedAt">;
const EMPTY: Draft = { slug: "", title: "", productSlug: "", version: "", fileUrl: "", fileSize: "" };

export default function AdminDownloadsPage() {
  const { items, loading, error, create, update, remove } = useApiResource<DownloadItem>("downloads");
  const [editing, setEditing] = useState<DownloadItem | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function startCreate() { setEditing(null); setDraft(EMPTY); setShowForm(true); }
  function startEdit(d: DownloadItem) {
    setEditing(d);
    setDraft({
      slug: d.slug, title: d.title, productSlug: d.productSlug ?? "",
      version: d.version ?? "", fileUrl: d.fileUrl, fileSize: d.fileSize ?? "",
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
  async function handleRemove(d: DownloadItem) {
    if (!confirm(`Xóa "${d.title}"?`)) return;
    try { await remove(d.id); } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
  }

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Tải về</h1>
          <p className="adm-muted">File trial, tài liệu, brochure cho khách hàng tải về.</p>
        </div>
        <button className="adm-btn" onClick={startCreate}>
          <Icon name="plus" size={14} /> Thêm file
        </button>
      </div>

      {showForm && (
        <form className="adm-card adm-downloads-form" onSubmit={save}>
          <div className="adm-card__header">
            <h2 className="adm-h2">{editing ? "Chỉnh sửa file" : "File mới"}</h2>
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
            <div className="adm-field">
              <label className="adm-label">File</label>
              <input
                className="adm-input"
                value={draft.fileUrl}
                onChange={(e) => setDraft({ ...draft, fileUrl: e.target.value })}
                placeholder="Dán URL hoặc tải lên bên dưới"
                required
              />
              <div style={{ marginTop: 8 }}>
                <FileUpload
                  category="installer"
                  value={draft.fileUrl}
                  onChange={(r) =>
                    setDraft((d) => ({
                      ...d,
                      fileUrl: r.url,
                      fileSize: d.fileSize || formatBytes(r.size),
                    }))
                  }
                  hint="ZIP / EXE / MSI / RAR / 7Z · tối đa 2 GB"
                />
              </div>
              <div style={{ marginTop: 8 }}>
                <FileUpload
                  category="doc"
                  value=""
                  onChange={(r) =>
                    setDraft((d) => ({
                      ...d,
                      fileUrl: r.url,
                      fileSize: d.fileSize || formatBytes(r.size),
                    }))
                  }
                  label="Hoặc tải lên tài liệu"
                  hint="PDF / DOC / DOCX / XLSX / PPTX"
                />
              </div>
            </div>
            <div className="adm-row-3">
              <div className="adm-field">
                <label className="adm-label">Sản phẩm (slug)</label>
                <input className="adm-input" value={draft.productSlug} onChange={(e) => setDraft({ ...draft, productSlug: e.target.value })} placeholder="zwcad / zw3d" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Phiên bản</label>
                <input className="adm-input" value={draft.version} onChange={(e) => setDraft({ ...draft, version: e.target.value })} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Kích thước</label>
                <input className="adm-input" value={draft.fileSize} onChange={(e) => setDraft({ ...draft, fileSize: e.target.value })} placeholder="1.2 GB" />
              </div>
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="adm-btn adm-btn--outline" type="button" onClick={cancel} disabled={saving}>Hủy</button>
            <button className="adm-btn" type="submit" disabled={saving}>
              {saving ? "Đang lưu…" : editing ? "Lưu" : "Tạo"}
            </button>
          </div>
        </form>
      )}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th style={{ width: 130 }}>Sản phẩm</th>
              <th style={{ width: 100 }}>Phiên bản</th>
              <th style={{ width: 110 }}>Kích thước</th>
              <th style={{ width: 130 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={5} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && items.map((d) => (
              <tr key={d.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{d.title}</div>
                  <div className="adm-muted adm-mono" style={{ marginTop: 2 }}>{d.fileUrl}</div>
                </td>
                <td>{d.productSlug ? <span className="adm-badge adm-badge--outline">{d.productSlug}</span> : <span className="adm-muted">—</span>}</td>
                <td className="adm-mono">{d.version || "—"}</td>
                <td className="adm-mono">{d.fileSize || "—"}</td>
                <td>
                  <div className="adm-table-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => startEdit(d)}><Icon name="edit" size={14} /></button>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => handleRemove(d)} style={{ color: "var(--adm-destructive)" }}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && !error && items.length === 0 && <tr><td colSpan={5} className="adm-table-empty">Chưa có file nào</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
