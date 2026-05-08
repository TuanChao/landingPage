import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage, LANG_META } from "../contexts/LanguageContext";
import type { Language } from "../types/site";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  /**
   * Optional bản dịch của title/description theo ngôn ngữ. Khi cung cấp, Seo
   * tự đổi theo lang active. Nếu thiếu lang nào, fallback về `title`/`description` chính.
   */
  i18n?: Partial<Record<Language, { title: string; description: string }>>;
  /** Override origin URL (chủ yếu cho SSR/test). */
  canonicalBase?: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let meta = document.querySelector(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.querySelector(selector);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    if (hreflang) link.setAttribute("hreflang", hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function Seo({ title, description, keywords, i18n, canonicalBase }: SeoProps) {
  const { language } = useLanguage();
  const location = useLocation();

  const localized = i18n?.[language];
  const finalTitle = localized?.title ?? title;
  const finalDesc = localized?.description ?? description;

  useEffect(() => {
    document.title = finalTitle;
    setMeta("description", finalDesc);
    if (keywords) setMeta("keywords", keywords);

    // Open Graph (og:locale do LanguageContext đảm nhiệm)
    setMeta("og:title", finalTitle, "property");
    setMeta("og:description", finalDesc, "property");

    // Canonical + hreflang.
    // URL hiện giữ tiếng Việt cho cả 3 lang, alternate trỏ cùng path.
    // Search engine vẫn phân biệt qua og:locale + <html lang>.
    // Khi chuyển sang path-prefix /en, /zh thì cập nhật phần build URL bên dưới.
    const base = canonicalBase ?? (typeof window !== "undefined" ? window.location.origin : "");
    const path = location.pathname + location.search;
    const fullUrl = `${base}${path}`;

    setLink("canonical", fullUrl);
    (Object.keys(LANG_META) as Language[]).forEach((lng) => {
      setLink("alternate", fullUrl, LANG_META[lng].html);
    });
    setLink("alternate", fullUrl, "x-default");
  }, [finalTitle, finalDesc, keywords, language, location.pathname, location.search, canonicalBase]);

  return null;
}
