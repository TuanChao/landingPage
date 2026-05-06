import { FormEvent, useState } from "react";
import { useMockStore, newId, nowIso } from "../../../admin/mockStore";
import { seedFaq } from "../../../admin/seeds";
import type { FaqItem } from "../../../admin/types";
import Icon from "../../../admin/Icon";
import "./AdminFaqPage.css";

type Draft = Omit<FaqItem, "id" | "createdAt" | "updatedAt">;
const EMPTY: Draft = { slug: "", question: "", answer: "", order: 0 };

export default function AdminFaqPage() {
  const [items, setItems] = useMockStore<FaqItem[]>("admin.faq", seedFaq);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [showForm, setShowForm] = useState(false);

  const sorted = [...items].sort((a, b) => a.order - b.order);

  function startCreate() { setEditing(null); setDraft({ ...EMPTY, order: (sorted.at(-1)?.order ?? 0) + 1 }); setShowForm(true); }
  function startEdit(f: FaqItem) {
    setEditing(f);
    setDraft({ slug: f.slug, question: f.question, answer: f.answer, order: f.order });
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
  function remove(f: FaqItem) {
    if (!confirm(`Xóa câu hỏi này?`)) return;
    setItems(items.filter((x) => x.id !== f.id));
  }

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Câu hỏi thường gặp</h1>
          <p className="adm-muted">Quản lý FAQ hiển thị ở Support Section và trang FAQ.</p>
        </div>
        <button className="adm-btn" onClick={startCreate}>
          <Icon name="plus" size={14} /> Thêm câu hỏi
        </button>
      </div>

      {showForm && (
        <form className="adm-card adm-faq-form" onSubmit={save}>
          <div className="adm-card__header">
            <h2 className="adm-h2">{editing ? "Chỉnh sửa câu hỏi" : "Câu hỏi mới"}</h2>
          </div>
          <div className="adm-card__content">
            <div className="adm-row">
              <div className="adm-field">
                <label className="adm-label">Câu hỏi</label>
                <input className="adm-input" value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} required />
              </div>
              <div className="adm-field">
                <label className="adm-label">Slug</label>
                <input className="adm-input" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} required />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-label">Trả lời</label>
              <textarea className="adm-textarea" rows={5} value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} required />
            </div>
            <div className="adm-field" style={{ maxWidth: 200 }}>
              <label className="adm-label">Thứ tự</label>
              <input className="adm-input" type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="adm-card__footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="adm-btn adm-btn--outline" type="button" onClick={cancel}>Hủy</button>
            <button className="adm-btn" type="submit">{editing ? "Lưu" : "Tạo câu hỏi"}</button>
          </div>
        </form>
      )}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Câu hỏi</th>
              <th>Trả lời</th>
              <th style={{ width: 130 }}></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((f) => (
              <tr key={f.id}>
                <td className="adm-mono">{f.order}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{f.question}</div>
                  <div className="adm-muted" style={{ marginTop: 2 }}>/{f.slug}</div>
                </td>
                <td className="adm-muted" style={{ maxWidth: 400 }}>
                  {f.answer.length > 120 ? f.answer.slice(0, 120) + "…" : f.answer}
                </td>
                <td>
                  <div className="adm-table-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => startEdit(f)}><Icon name="edit" size={14} /></button>
                    <button className="adm-btn adm-btn--ghost adm-btn--icon adm-btn--sm" onClick={() => remove(f)} style={{ color: "var(--adm-destructive)" }}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && <tr><td colSpan={4} className="adm-table-empty">Chưa có câu hỏi nào</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
