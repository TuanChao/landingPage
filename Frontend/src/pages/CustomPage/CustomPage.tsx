import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Render, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import Seo from "../../seo/Seo";
import { PublicApi, useLang, pick, type PageDto } from "@/lib/publicApi";
import { puckConfig } from "@/pageBuilder/puckConfig";
import { resolveAssetUrl } from "@/admin/api";
import { useHideChromeIf } from "@/contexts/LayoutChrome";
import { useScrollAnimations, useScrollToAnchor } from "@/pageBuilder/useScrollAnimations";

export default function CustomPage() {
  const { slug } = useParams();
  const lang = useLang();
  const [page, setPage] = useState<PageDto | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    PublicApi.pageBySlug(slug)
      .then((p) => {
        setPage(p);
        try {
          const parsed = JSON.parse(p.data || "{}");
          if (parsed && parsed.content) setData(parsed);
          else setData({ content: [], root: {} } as any);
        } catch {
          setData({ content: [], root: {} } as any);
        }
      })
      .catch((e) => setError(e?.message?.includes("404") ? "Trang không tồn tại" : "Không tải được trang"))
      .finally(() => setLoading(false));
  }, [slug]);

  const title = page ? pick(page, "title", lang) : "";
  const root = (data as any)?.root?.props ?? (data as any)?.root ?? {};
  const seoTitle = root.title || title;
  const seoDesc = root.description || title;
  const ogImage = root.ogImage ? resolveAssetUrl(root.ogImage) : "";

  // Hooks PHẢI gọi trước mọi early-return để giữ thứ tự hooks ổn định.
  useHideChromeIf(!!root.hideChrome);
  useScrollAnimations([data]);
  useScrollToAnchor([data]);

  useEffect(() => {
    if (!ogImage) return;
    let m = document.querySelector('meta[property="og:image"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("property", "og:image"); document.head.appendChild(m); }
    m.setAttribute("content", ogImage);
  }, [ogImage]);

  if (loading) return <main className="container" style={{ padding: 40 }}>Đang tải…</main>;
  if (error || !page || !data) {
    return (
      <main className="container" style={{ padding: 40 }}>
        <h1>404 — Trang không tồn tại</h1>
        <p className="adm-muted">Slug "<code>{slug}</code>" không có hoặc chưa được xuất bản.</p>
      </main>
    );
  }

  return (
    <>
      <Seo title={`${seoTitle} | ZWCAD Vietnam`} description={seoDesc} keywords={page.slug} />
      <main>
        <Render config={puckConfig} data={data} />
      </main>
    </>
  );
}
