// Public content API — đọc dữ liệu từ backend (no-auth), dùng cho landing page.
// Admin pages dùng @/admin/api (có JWT). File này CHỈ cho public side.
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "@/admin/api";

export type Lang = "vi" | "en" | "zh";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `POST ${path} failed: ${res.status}`);
  }
  return res.json().catch(() => ({} as T));
}

// Chọn field theo ngôn ngữ. Quy ước: field gốc = vi, suffix En/Zh cho 2 ngôn ngữ kia.
// Fallback: nếu thiếu bản dịch → dùng vi.
export function pick<T extends Record<string, any>>(
  item: T,
  base: string,
  lang: Lang,
): string {
  if (lang === "en") return item[`${base}En`] ?? item[base] ?? "";
  if (lang === "zh") return item[`${base}Zh`] ?? item[base] ?? "";
  return item[base] ?? "";
}

// ── Banners ─────────────────────────────────────────────────────────────────
export interface BannerDto {
  id: number;
  title: string; titleEn?: string | null; titleZh?: string | null;
  subtitle?: string | null; subtitleEn?: string | null; subtitleZh?: string | null;
  image: string;
  ctaLabel?: string | null; ctaLabelEn?: string | null; ctaLabelZh?: string | null;
  ctaHref?: string | null;
  order: number;
  active: boolean;
}

// ── News ────────────────────────────────────────────────────────────────────
export interface NewsDto {
  id: number;
  slug: string;
  title: string; titleEn?: string | null; titleZh?: string | null;
  category?: string | null;
  excerpt?: string | null; excerptEn?: string | null; excerptZh?: string | null;
  content?: string | null; contentEn?: string | null; contentZh?: string | null;
  image?: string | null;
  publishedAt?: string | null;
}

// ── FAQ ─────────────────────────────────────────────────────────────────────
export interface FaqDto {
  id: number;
  slug: string;
  question: string; questionEn?: string | null; questionZh?: string | null;
  answer: string; answerEn?: string | null; answerZh?: string | null;
  order: number;
}

// ── Downloads ───────────────────────────────────────────────────────────────
export interface DownloadDto {
  id: number;
  slug: string;
  title: string; titleEn?: string | null; titleZh?: string | null;
  productSlug?: string | null;
  version?: string | null;
  fileUrl: string;
  fileSize?: string | null;
}

// ── Custom Pages (Puck) ─────────────────────────────────────────────────────
export interface PageDto {
  id: number;
  slug: string;
  title: string; titleEn?: string | null; titleZh?: string | null;
  data: string; // JSON string (Puck) — variant A
  dataB?: string | null; // variant B (nếu có A/B)
  variantBWeight?: number; // % chọn B (0-100)
  published: boolean;
}

// ── Endpoints ───────────────────────────────────────────────────────────────
export const PublicApi = {
  banners: () => getJson<BannerDto[]>("/api/banners"),
  news:    () => getJson<NewsDto[]>("/api/news"),
  faq:     () => getJson<FaqDto[]>("/api/faq"),
  downloads: () => getJson<DownloadDto[]>("/api/downloads"),
  pageBySlug: (slug: string) => getJson<PageDto>(`/api/pages/by-slug/${encodeURIComponent(slug)}`),
  logPageView: (slug: string, variant?: string) =>
    postJson<{ ok: boolean }>("/api/page-views", { slug, variant }).catch(() => null),
  submitContact: (data: { name: string; email: string; phone?: string; company?: string; message: string }) =>
    postJson<{ id: number }>("/api/contacts", data),
};

// ── Hook tổng quát ──────────────────────────────────────────────────────────
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fn: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });
  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => { if (alive) setState({ data, loading: false, error: null }); })
      .catch((e) => { if (alive) setState({ data: null, loading: false, error: String(e?.message ?? e) }); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

export function useLang(): Lang {
  const { i18n } = useTranslation();
  const code = (i18n.resolvedLanguage ?? i18n.language ?? "vi").slice(0, 2);
  return (code === "en" || code === "zh") ? code : "vi";
}
