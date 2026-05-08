import { useState } from "react";
import type { ContactSubmission } from "@/admin/types";
import { Icon } from "@/admin/components";
import { useContacts } from "@/admin/api";
import "./AdminContactsPage.css";

const STATUS_LABEL: Record<ContactSubmission["status"], string> = {
  new: "Mới",
  read: "Đã đọc",
  replied: "Đã phản hồi",
};

export default function AdminContactsPage() {
  const { items, loading, error, setStatus, remove } = useContacts();
  const [filter, setFilter] = useState<"all" | ContactSubmission["status"]>("all");

  const sorted = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const filtered = filter === "all" ? sorted : sorted.filter((c) => c.status === filter);

  async function handleStatus(id: string, status: ContactSubmission["status"]) {
    try { await setStatus(id, status); } catch (ex: any) { alert(ex?.message || "Cập nhật thất bại"); }
  }
  async function handleRemove(id: string) {
    if (!confirm("Xóa liên hệ này?")) return;
    try { await remove(id); } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
  }

  const counts = {
    all: items.length,
    new: items.filter((c) => c.status === "new").length,
    read: items.filter((c) => c.status === "read").length,
    replied: items.filter((c) => c.status === "replied").length,
  };

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Liên hệ</h1>
          <p className="adm-muted">Yêu cầu liên hệ từ form trên trang Liên hệ.</p>
        </div>
      </div>

      <div className="adm-contacts-tabs">
        {(["all", "new", "read", "replied"] as const).map((tab) => (
          <button
            key={tab}
            className={`adm-contacts-tab${filter === tab ? " is-active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab === "all" ? "Tất cả" : STATUS_LABEL[tab]}
            <span className="adm-badge adm-badge--muted">{counts[tab]}</span>
          </button>
        ))}
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 150 }}>Thời gian</th>
              <th>Khách hàng</th>
              <th>Liên hệ</th>
              <th>Nội dung</th>
              <th style={{ width: 150 }}>Trạng thái</th>
              <th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={6} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && filtered.map((c) => (
              <tr key={c.id}>
                <td className="adm-mono adm-muted">{new Date(c.createdAt).toLocaleString("vi-VN")}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="adm-avatar">{c.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.name}</div>
                      {c.company && <div className="adm-muted">{c.company}</div>}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="adm-mono">{c.email}</div>
                  {c.phone && <div className="adm-muted adm-mono">{c.phone}</div>}
                </td>
                <td className="adm-muted" style={{ maxWidth: 320 }}>{c.message}</td>
                <td>
                  <select
                    className="adm-select"
                    value={c.status}
                    onChange={(e) => handleStatus(c.id, e.target.value as ContactSubmission["status"])}
                    style={{ height: 30, fontSize: 12, padding: "0 8px" }}
                  >
                    <option value="new">Mới</option>
                    <option value="read">Đã đọc</option>
                    <option value="replied">Đã phản hồi</option>
                  </select>
                </td>
                <td>
                  <button
                    className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm"
                    onClick={() => handleRemove(c.id)}
                    style={{ color: "var(--adm-destructive)" }}
                    title="Xóa"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && !error && filtered.length === 0 && (
              <tr><td colSpan={6} className="adm-table-empty">Không có liên hệ nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
