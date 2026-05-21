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

const VARIANT_COOKIE_PREFIX = "pb_variant_";
const COOKIE_DAYS = 30;

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/** Pick A/B variant: pin per visitor qua cookie để mỗi visitor luôn thấy cùng variant. */
function pickVariant(slug: string, hasB: boolean, weight: number): "A" | "B" {
  if (!hasB) return "A";
  const cookieKey = VARIANT_COOKIE_PREFIX + slug;
  const existing = getCookie(cookieKey);
  if (existing === "A" || existing === "B") return existing;
  const w = Math.max(0, Math.min(100, weight ?? 50));
  const chosen: "A" | "B" = Math.random() * 100 < w ? "B" : "A";
  setCookie(cookieKey, chosen, COOKIE_DAYS);
  return chosen;
}

export default function CustomPage() {
  const { slug } = useParams();
  const lang = useLang();
  const [page, setPage] = useState<PageDto | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [variant, setVariant] = useState<"A" | "B">("A");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    PublicApi.pageBySlug(slug)
      .then((p) => {
        setPage(p);
        const hasB = !!(p.dataB && p.dataB.trim() && p.dataB !== "{}");
        const v = pickVariant(p.slug, hasB, p.variantBWeight ?? 50);
        setVariant(v);
        const raw = v === "B" ? (p.dataB || "{}") : (p.data || "{}");
        try {
          const parsed = JSON.parse(raw);
          setData(parsed?.content ? parsed : ({ content: [], root: {} } as any));
        } catch {
          setData({ content: [], root: {} } as any);
        }
        // Log view (fire-and-forget, không await để không block render)
        PublicApi.logPageView(p.slug, hasB ? v : undefined);
      })
      .catch((e) => setError(e?.message?.includes("404") ? "Trang không tồn tại" : "Không tải được trang"))
      .finally(() => setLoading(false));
  }, [slug]);

  const title = page ? pick(page, "title", lang) : "";
  const root = (data as any)?.root?.props ?? (data as any)?.root ?? {};
  const seoTitle = root.title || title;
  const seoDesc = root.description || title;
  const ogImage = root.ogImage ? resolveAssetUrl(root.ogImage) : "";

  useHideChromeIf(!!root.hideChrome);
  useScrollAnimations([data, variant]);
  useScrollToAnchor([data]);

  // LeadForm block đọc nguồn từ đây để gắn vào conversion.
  useEffect(() => {
    if (!page) return;
    (window as any).__pbPageSource = { slug: page.slug, variant };
    return () => { delete (window as any).__pbPageSource; };
  }, [page, variant]);

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
