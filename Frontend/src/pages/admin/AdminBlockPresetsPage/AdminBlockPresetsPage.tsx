import { useState } from "react";
import { Link } from "react-router-dom";
import type { BlockPreset } from "@/admin/types";
import { Icon, FileUpload } from "@/admin/components";
import { resolveAssetUrl, useApiResource } from "@/admin/api";

export default function AdminBlockPresetsPage() {
  const { items, loading, error, update, remove } = useApiResource<BlockPreset>("block-presets");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftDesc, setDraftDesc] = useState("");
  const [draftThumb, setDraftThumb] = useState("");

  function startEdit(p: BlockPreset) {
    setEditingId(p.id);
    setDraftName(p.name);
    setDraftDesc(p.description ?? "");
    setDraftThumb(p.thumbnail ?? "");
  }
  async function saveEdit(p: BlockPreset) {
    try {
      await update(p.id, { ...p, name: draftName, description: draftDesc, thumbnail: draftThumb });
      setEditingId(null);
    } catch (ex: any) { alert(ex?.message || "Lưu thất bại"); }
  }
  async function handleRemove(p: BlockPreset) {
    if (!confirm(`Xóa preset "${p.name}"?`)) return;
    try { await remove(p.id); } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
  }

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Block Presets</h1>
          <p className="adm-muted">
            Các block group đã lưu. Dùng nút "Lưu thành Preset" trong editor để thêm mới.
            Preset hiển thị trong picker khi tạo trang mới (đánh dấu ★).
          </p>
        </div>
        <Link to="/admin/pages" className="adm-btn adm-btn--outline">← Trang tùy biến</Link>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 100 }}>Thumbnail</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th style={{ width: 180 }}>Tạo lúc</th>
              <th style={{ width: 140 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={5} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && items.map((p) => (
              <tr key={p.id}>
                {editingId === p.id ? (
                  <>
                    <td>
                      <FileUpload category="image" value={draftThumb} onChange={(r) => setDraftThumb(r.url)} hint="" />
                    </td>
                    <td><input className="adm-input" value={draftName} onChange={(e) => setDraftName(e.target.value)} /></td>
                    <td><input className="adm-input" value={draftDesc} onChange={(e) => setDraftDesc(e.target.value)} placeholder="Mô tả ngắn" /></td>
                    <td className="adm-muted">{new Date(p.createdAt).toLocaleString("vi-VN")}</td>
                    <td>
                      <div className="adm-table-actions">
                        <button className="adm-btn adm-btn--sm" onClick={() => saveEdit(p)}>Lưu</button>
                        <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => setEditingId(null)}>Hủy</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {p.thumbnail
                        ? <img src={resolveAssetUrl(p.thumbnail)} alt="" style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 4, border: "1px solid #e5e7eb" }} />
                        : <div style={{ width: 80, height: 50, background: "#f3f4f6", borderRadius: 4, display: "grid", placeItems: "center", color: "#bbb", fontSize: 11 }}>no img</div>}
                    </td>
                    <td><strong>{p.name}</strong></td>
                    <td className="adm-muted">{p.description || "—"}</td>
                    <td className="adm-muted">{new Date(p.createdAt).toLocaleString("vi-VN")}</td>
                    <td>
                      <div className="adm-table-actions">
                        <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => startEdit(p)} title="Sửa">
                          <Icon name="edit" size={14} />
                        </button>
                        <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => handleRemove(p)} title="Xóa" style={{ color: "var(--adm-destructive)" }}>
                          <Icon name="trash" size={14} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {!loading && !error && items.length === 0 && (
              <tr><td colSpan={5} className="adm-table-empty">Chưa có preset nào. Mở editor một trang và bấm "Lưu thành Preset".</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
