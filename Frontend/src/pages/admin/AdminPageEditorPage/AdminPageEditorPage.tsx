import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { resource } from "@/admin/api";
import { puckConfig } from "@/pageBuilder/puckConfig";
import type { Page } from "@/admin/types";

const EMPTY_DATA: Data = { content: [], root: { props: { title: "", description: "", ogImage: "" } } } as any;
const AUTOSAVE_DELAY_MS = 2000;

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AdminPageEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = resource<Page>("pages");

  const [page, setPage] = useState<Page | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const debounceRef = useRef<number | null>(null);
  const pendingDataRef = useRef<Data | null>(null);
  const pageRef = useRef<Page | null>(null);

  useEffect(() => { pageRef.current = page; }, [page]);

  useEffect(() => {
    if (!id) return;
    pages.get(id)
      .then((p) => {
        setPage(p);
        try {
          const parsed = p.data ? JSON.parse(p.data) : EMPTY_DATA;
          setData(parsed && parsed.content ? parsed : EMPTY_DATA);
        } catch {
          setData(EMPTY_DATA);
        }
      })
      .catch((e) => setError(e?.message || "Không tải được trang"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Cleanup pending timer
  useEffect(() => () => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
  }, []);

  async function persist(nextData: Data) {
    const cur = pageRef.current;
    if (!cur) return;
    setStatus("saving");
    try {
      const updated = await pages.update(cur.id, {
        ...cur,
        data: JSON.stringify(nextData),
      });
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
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const d = pendingDataRef.current;
      if (d) persist(d);
    }, AUTOSAVE_DELAY_MS) as unknown as number;
  }

  async function handlePublishClick(nextData: Data) {
    // Save ngay + mark published
    if (!page) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    setStatus("saving");
    try {
      const updated = await pages.update(page.id, {
        ...page,
        data: JSON.stringify(nextData),
        published: true,
      });
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

  if (error) return <div className="adm-root"><p style={{ color: "crimson" }}>{error}</p></div>;
  if (!page || !data) return <div className="adm-root"><p>Đang tải editor…</p></div>;

  const statusLabel: Record<SaveStatus, string> = {
    idle: lastSaved ? `Đã lưu ${lastSaved.toLocaleTimeString("vi-VN")}` : "Sẵn sàng",
    saving: "Đang lưu…",
    saved: lastSaved ? `Đã lưu ${lastSaved.toLocaleTimeString("vi-VN")}` : "Đã lưu",
    error: "Lỗi lưu — kiểm tra kết nối",
  };

  return (
    <div className="adm-root" style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
      <div className="adm-page-header" style={{ paddingBottom: 8 }}>
        <div className="adm-page-header__title">
          <h1 className="adm-h1" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link to="/admin/pages" className="adm-muted" style={{ textDecoration: "none" }}>← Trang</Link>
            <span>{page.title}</span>
          </h1>
          <p className="adm-muted" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <code>/p/{page.slug}</code>
            <span className={`adm-badge adm-badge--${page.published ? "success" : "muted"}`}>
              {page.published ? "Đã xuất bản" : "Bản nháp"}
            </span>
            <span style={{ color: status === "error" ? "crimson" : "#777" }}>{statusLabel[status]}</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
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

      <div style={{ flex: 1, minHeight: 0, border: "1px solid var(--adm-border, #e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
        <Puck
          config={puckConfig}
          data={data}
          onChange={handleChange}
          onPublish={handlePublishClick}
          headerTitle={page.title}
          headerPath={`/p/${page.slug}`}
        />
      </div>
    </div>
  );
}
