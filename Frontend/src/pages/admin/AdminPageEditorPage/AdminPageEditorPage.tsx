import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { resource, request } from "@/admin/api";
import { puckConfig } from "@/pageBuilder/puckConfig";
import type { Page, BlockPreset } from "@/admin/types";

const EMPTY_DATA: Data = { content: [], root: { props: { title: "", description: "", ogImage: "" } } } as any;
const AUTOSAVE_DELAY_MS = 2000;

type SaveStatus = "idle" | "saving" | "saved" | "error";
type Variant = "A" | "B";

export default function AdminPageEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = resource<Page>("pages");

  const [page, setPage] = useState<Page | null>(null);
  const [dataA, setDataA] = useState<Data | null>(null);
  const [dataB, setDataB] = useState<Data | null>(null);
  const [variant, setVariant] = useState<Variant>("A");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const debounceRef = useRef<number | null>(null);
  const pendingDataRef = useRef<Data | null>(null);
  const pageRef = useRef<Page | null>(null);
  const variantRef = useRef<Variant>("A");

  useEffect(() => { pageRef.current = page; }, [page]);
  useEffect(() => { variantRef.current = variant; }, [variant]);

  useEffect(() => {
    if (!id) return;
    pages.get(id)
      .then((p) => {
        setPage(p);
        setDataA(parseSafe(p.data) ?? EMPTY_DATA);
        setDataB(p.dataB ? parseSafe(p.dataB) : null);
      })
      .catch((e) => setError(e?.message || "Không tải được trang"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => () => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
  }, []);

  async function persist(nextData: Data) {
    const cur = pageRef.current;
    if (!cur) return;
    setStatus("saving");
    try {
      const payload: any = { ...cur };
      if (variantRef.current === "A") payload.data = JSON.stringify(nextData);
      else payload.dataB = JSON.stringify(nextData);
      const updated = await pages.update(cur.id, payload);
      setPage(updated);
      setStatus("saved");
      setLastSaved(new Date());
    } catch (e: any) {
      setStatus("error");
      console.error("Auto-save failed", e);
    }
  }

  function handleChange(nextData: Data) {
    pendingDataRef.current = nextData;
    // Cập nhật state local cho variant đang sửa
    if (variant === "A") setDataA(nextData); else setDataB(nextData);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const d = pendingDataRef.current;
      if (d) persist(d);
    }, AUTOSAVE_DELAY_MS) as unknown as number;
  }

  async function handlePublishClick(nextData: Data) {
    if (!page) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    setStatus("saving");
    try {
      const payload: any = { ...page, published: true };
      if (variant === "A") payload.data = JSON.stringify(nextData);
      else payload.dataB = JSON.stringify(nextData);
      const updated = await pages.update(page.id, payload);
      setPage(updated);
      setStatus("saved");
      setLastSaved(new Date());
    } catch (e: any) {
      setStatus("error");
      alert(e?.message || "Xuất bản thất bại");
    }
  }

  async function togglePublish() {
    if (!page) return;
    try {
      const updated = await pages.update(page.id, { ...page, published: !page.published });
      setPage(updated);
    } catch (e: any) {
      alert(e?.message || "Cập nhật thất bại");
    }
  }

  async function enableVariantB() {
    if (!page || !dataA) return;
    try {
      const updated = await pages.update(page.id, { ...page, dataB: JSON.stringify(dataA) });
      setPage(updated);
      setDataB(dataA);
      setVariant("B");
    } catch (e: any) {
      alert(e?.message || "Bật A/B thất bại");
    }
  }

  async function disableVariantB() {
    if (!page) return;
    if (!confirm("Tắt A/B test? Variant B sẽ bị xóa.")) return;
    try {
      const updated = await pages.update(page.id, { ...page, dataB: null });
      setPage(updated);
      setDataB(null);
      setVariant("A");
    } catch (e: any) {
      alert(e?.message || "Tắt A/B thất bại");
    }
  }

  async function promoteVariant(winner: Variant) {
    if (!page) return;
    const src = winner === "A" ? dataA : dataB;
    if (!src) return;
    const label = winner === "A" ? "A → giữ A, xóa B" : "B → thay A bằng B, xóa B";
    if (!confirm(`Promote variant ${winner}? Kết quả: ${label}. Bản còn lại sẽ bị xóa.`)) return;
    try {
      const updated = await pages.update(page.id, {
        ...page,
        data: JSON.stringify(src),
        dataB: null,
      });
      setPage(updated);
      setDataA(src);
      setDataB(null);
      setVariant("A");
    } catch (e: any) {
      alert(e?.message || "Promote thất bại");
    }
  }

  async function setVariantWeight(w: number) {
    if (!page) return;
    try {
      const updated = await pages.update(page.id, { ...page, variantBWeight: w });
      setPage(updated);
    } catch (e: any) {
      alert(e?.message || "Cập nhật thất bại");
    }
  }

  async function saveAsPreset() {
    const currentData = variant === "A" ? dataA : dataB;
    if (!currentData) return;
    const name = window.prompt("Tên preset:", page?.title || "");
    if (!name) return;
    const description = window.prompt("Mô tả ngắn (tùy chọn):", "") || undefined;
    try {
      await request<BlockPreset>("POST", "/api/block-presets", {
        name, description, data: JSON.stringify(currentData),
      });
      alert("Đã lưu preset. Xem ở mục Block Presets.");
    } catch (e: any) {
      alert(e?.message || "Lưu preset thất bại");
    }
  }

  if (error) return <div className="adm-root"><p style={{ color: "crimson" }}>{error}</p></div>;
  if (!page || !dataA) return <div className="adm-root"><p>Đang tải editor…</p></div>;

  const currentData = variant === "A" ? dataA : (dataB ?? EMPTY_DATA);
  const hasB = !!dataB;

  const statusLabel: Record<SaveStatus, string> = {
    idle: lastSaved ? `Đã lưu ${lastSaved.toLocaleTimeString("vi-VN")}` : "Sẵn sàng",
    saving: "Đang lưu…",
    saved: lastSaved ? `Đã lưu ${lastSaved.toLocaleTimeString("vi-VN")}` : "Đã lưu",
    error: "Lỗi lưu — kiểm tra kết nối",
  };

  return (
    <div className="adm-root puck-editor-shell">
      <div className="adm-page-header" style={{ padding: "14px 24px 8px", flexShrink: 0 }}>
        <div className="adm-page-header__title">
          <h1 className="adm-h1" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link to="/admin/pages" className="adm-muted" style={{ textDecoration: "none" }}>← Trang</Link>
            <span>{page.title}</span>
          </h1>
          <p className="adm-muted" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <code>/p/{page.slug}</code>
            <span className={`adm-badge adm-badge--${page.published ? "success" : "muted"}`}>
              {page.published ? "Đã xuất bản" : "Bản nháp"}
            </span>
            <span style={{ color: status === "error" ? "crimson" : "#777" }}>{statusLabel[status]}</span>

            {/* A/B variant switcher */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 6px", border: "1px solid #e5e7eb", borderRadius: 4 }}>
              <button
                className={"adm-badge " + (variant === "A" ? "adm-badge--success" : "adm-badge--muted")}
                onClick={() => setVariant("A")}
                style={{ border: 0, cursor: "pointer" }}
              >A</button>
              {hasB ? (
                <button
                  className={"adm-badge " + (variant === "B" ? "adm-badge--success" : "adm-badge--muted")}
                  onClick={() => setVariant("B")}
                  style={{ border: 0, cursor: "pointer" }}
                >B</button>
              ) : (
                <button className="adm-badge adm-badge--muted" onClick={enableVariantB} style={{ border: 0, cursor: "pointer" }} title="Tạo variant B (clone từ A)">
                  + B
                </button>
              )}
              {hasB && (
                <>
                  <select
                    value={page.variantBWeight ?? 50}
                    onChange={(e) => setVariantWeight(parseInt(e.target.value, 10))}
                    style={{ height: 22, fontSize: 11, padding: "0 4px" }}
                    title="% visitor thấy variant B"
                  >
                    {[10, 25, 50, 75, 90].map((w) => <option key={w} value={w}>{w}% B</option>)}
                  </select>
                  <button onClick={() => promoteVariant(variant)} title={`Promote ${variant} thành bản chính, xóa bản còn lại`}
                    style={{ border: 0, background: "transparent", cursor: "pointer", fontSize: 12, color: "#16a34a" }}>
                    🏆 Promote {variant}
                  </button>
                  <button onClick={disableVariantB} title="Tắt A/B, xóa B" style={{ border: 0, background: "transparent", color: "crimson", cursor: "pointer", fontSize: 12 }}>×</button>
                </>
              )}
            </span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="adm-btn adm-btn--outline" onClick={saveAsPreset}>Lưu thành Preset</button>
          <Link to={`/admin/pages/${page.id}/preview`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn--outline">
            Preview
          </Link>
          <button className="adm-btn adm-btn--outline" onClick={togglePublish}>
            {page.published ? "Hủy xuất bản" : "Xuất bản"}
          </button>
          {page.published && (
            <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn--outline">
              Xem live
            </a>
          )}
          <button className="adm-btn adm-btn--outline" onClick={() => navigate("/admin/pages")}>Đóng</button>
        </div>
      </div>

      <div className="puck-editor-canvas" style={{ flex: 1, minHeight: 0, border: "1px solid var(--adm-border, #e5e7eb)", overflow: "hidden" }}>
        {/* Key cần đổi theo variant để Puck reload data từ đầu */}
        <Puck
          key={variant}
          config={puckConfig}
          data={currentData}
          onChange={handleChange}
          onPublish={handlePublishClick}
          headerTitle={`${page.title} — Variant ${variant}`}
          headerPath={`/p/${page.slug}`}
        />
      </div>
    </div>
  );
}

function parseSafe(s: string | null | undefined): Data | null {
  if (!s) return null;
  try {
    const parsed = JSON.parse(s);
    return parsed && parsed.content ? parsed : null;
  } catch { return null; }
}
