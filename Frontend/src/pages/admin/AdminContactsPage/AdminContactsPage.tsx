import { useState } from "react";
import type { ContactSubmission } from "@/admin/types";
import { Icon } from "@/admin/components";
import { request, useContacts } from "@/admin/api";
import "./AdminContactsPage.css";

const STATUS_LABEL: Record<ContactSubmission["status"], string> = {
  new: "Mới",
  read: "Đã đọc",
  replied: "Đã phản hồi",
};

export default function AdminContactsPage() {
  const { items, loading, error, setStatus, remove, refresh } = useContacts();
  const [filter, setFilter] = useState<"all" | ContactSubmission["status"]>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  function toggleAllVisible() {
    setSelected((prev) => {
      const visibleIds = filtered.map((c) => c.id);
      const allSelected = visibleIds.every((id) => prev.has(id));
      if (allSelected) {
        const next = new Set(prev);
        visibleIds.forEach((id) => next.delete(id));
        return next;
      }
      return new Set([...prev, ...visibleIds]);
    });
  }
  async function bulkSetStatus(status: ContactSubmission["status"]) {
    if (selected.size === 0) return;
    const ids = Array.from(selected).map((id) => Number(id));
    try {
      await request("PATCH", "/api/contacts/bulk-status", { ids, status });
      setSelected(new Set());
      refresh();
    } catch (ex: any) { alert(ex?.message || "Cập nhật thất bại"); }
  }
  async function bulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Xóa ${selected.size} liên hệ đã chọn?`)) return;
    const ids = Array.from(selected).map((id) => Number(id));
    try {
      await request("POST", "/api/contacts/bulk-delete", { ids });
      setSelected(new Set());
      refresh();
    } catch (ex: any) { alert(ex?.message || "Xóa thất bại"); }
  }

  const sorted = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const filtered = sorted
    .filter((c) => filter === "all" || c.status === filter)
    .filter((c) => tagFilter === "all" || (c.tag ?? "") === tagFilter);

  const tags = Array.from(new Set(items.map((c) => c.tag).filter(Boolean))) as string[];

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

  function exportCsv() {
    if (filtered.length === 0) { alert("Không có dữ liệu để export."); return; }
    const escape = (s: any) => {
      const v = (s ?? "").toString();
      return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    };
    const headers = ["Thời gian", "Họ tên", "Email", "SĐT", "Công ty", "Tag", "Trạng thái", "Nội dung"];
    const rows = filtered.map((c) => [
      new Date(c.createdAt).toLocaleString("vi-VN"),
      c.name, c.email, c.phone ?? "", c.company ?? "", c.tag ?? "",
      STATUS_LABEL[c.status], c.message ?? "",
    ].map(escape).join(","));
    // BOM cho Excel hiểu UTF-8
    const csv = "﻿" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const tagSuffix = tagFilter === "all" ? "" : `-${tagFilter}`;
    a.download = `lien-he${tagSuffix}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Liên hệ</h1>
          <p className="adm-muted">Yêu cầu liên hệ từ form trên trang Liên hệ + lead từ trang tùy biến.</p>
        </div>
        <button className="adm-btn adm-btn--outline" onClick={exportCsv} disabled={filtered.length === 0}>
          Export CSV ({filtered.length})
        </button>
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
        {tags.length > 0 && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span className="adm-muted" style={{ fontSize: 13 }}>Tag:</span>
            <select className="adm-select" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} style={{ height: 30, fontSize: 13 }}>
              <option value="all">Tất cả</option>
              {tags.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}
      </div>

      {selected.size > 0 && (
        <div style={{
          background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 6,
          padding: "8px 12px", margin: "12px 0", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        }}>
          <strong>Đã chọn {selected.size}</strong>
          <button className="adm-btn adm-btn--sm" onClick={() => bulkSetStatus("read")}>Đánh dấu đã đọc</button>
          <button className="adm-btn adm-btn--sm" onClick={() => bulkSetStatus("replied")}>Đánh dấu đã phản hồi</button>
          <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={bulkDelete} style={{ color: "var(--adm-destructive)" }}>
            Xóa
          </button>
          <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => setSelected(new Set())}>Bỏ chọn</button>
        </div>
      )}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && filtered.every((c) => selected.has(c.id))}
                  onChange={toggleAllVisible}
                />
              </th>
              <th style={{ width: 150 }}>Thời gian</th>
              <th>Khách hàng</th>
              <th>Liên hệ</th>
              <th>Nội dung</th>
              <th style={{ width: 150 }}>Trạng thái</th>
              <th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} className="adm-table-empty">Đang tải…</td></tr>}
            {error && !loading && <tr><td colSpan={7} className="adm-table-empty" style={{ color: "var(--adm-destructive)" }}>{error}</td></tr>}
            {!loading && !error && filtered.map((c) => (
              <tr key={c.id} style={selected.has(c.id) ? { background: "#fffbeb" } : undefined}>
                <td>
                  <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleOne(c.id)} />
                </td>
                <td className="adm-mono adm-muted">
                  {new Date(c.createdAt).toLocaleString("vi-VN")}
                  {c.sourceSlug && (
                    <div className="adm-muted" style={{ fontSize: 11, marginTop: 2 }}>
                      ← /p/{c.sourceSlug}{c.sourceVariant ? ` [${c.sourceVariant}]` : ""}
                    </div>
                  )}
                </td>
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
                <td style={{ maxWidth: 320 }}>
                  {c.tag && <span className="adm-badge adm-badge--muted" style={{ marginRight: 6 }}>{c.tag}</span>}
                  <span className="adm-muted">{c.message}</span>
                </td>
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
              <tr><td colSpan={7} className="adm-table-empty">Không có liên hệ nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
