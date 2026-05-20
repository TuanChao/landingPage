// Preview admin: render trang (kể cả bản nháp) dùng cùng Puck config.
// Hiển thị thanh "Preview mode" trên đầu để phân biệt với public.
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Render, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { isAuthed, resource, resolveAssetUrl } from "@/admin/api";
import { puckConfig } from "@/pageBuilder/puckConfig";
import { useHideChromeIf } from "@/contexts/LayoutChrome";
import { useScrollAnimations, useScrollToAnchor } from "@/pageBuilder/useScrollAnimations";
import type { Page } from "@/admin/types";

export default function AdminPagePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = resource<Page>("pages");
  const [page, setPage] = useState<Page | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthed()) { navigate("/admin/login", { replace: true }); return; }
    if (!id) return;
    pages.get(id)
      .then((p) => {
        setPage(p);
        try {
          const parsed = JSON.parse(p.data || "{}");
          setData(parsed?.content ? parsed : ({ content: [], root: { props: {} } } as any));
        } catch {
          setData({ content: [], root: { props: {} } } as any);
        }
      })
      .catch((e) => setError(e?.message || "Không tải được trang"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const root = (data as any)?.root?.props ?? (data as any)?.root ?? {};
  const ogImage = root.ogImage ? resolveAssetUrl(root.ogImage) : "";

  // Preview tôn trọng hideChrome như public.
  useHideChromeIf(!!root.hideChrome);
  useScrollAnimations([data]);
  useScrollToAnchor([data]);

  useEffect(() => {
    if (!ogImage) return;
    let m = document.querySelector('meta[property="og:image"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("property", "og:image"); document.head.appendChild(m); }
    m.setAttribute("content", ogImage);
  }, [ogImage]);

  if (error) return <main style={{ padding: 40 }}><p style={{ color: "crimson" }}>{error}</p></main>;
  if (!page || !data) return <main style={{ padding: 40 }}>Đang tải preview…</main>;

  return (
    <>
      {/* Thanh thông báo preview, fixed top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: "#fbbf24", color: "#000",
        padding: "8px 16px", fontSize: 13, fontWeight: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,.15)",
      }}>
        <span>
          🔍 <strong>Preview mode</strong> — {page.title} ({page.published ? "đã xuất bản" : "bản nháp"})
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to={`/admin/pages/${page.id}/edit`} style={{ color: "#000", textDecoration: "underline" }}>
            Quay lại editor
          </Link>
          <Link to="/admin/pages" style={{ color: "#000", textDecoration: "underline" }}>
            Danh sách
          </Link>
        </div>
      </div>
      <div style={{ paddingTop: 36 }}>
        <Render config={puckConfig} data={data} />
      </div>
    </>
  );
}
