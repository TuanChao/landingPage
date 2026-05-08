import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { Language } from "../types/site";
import { STORAGE_KEY } from "../i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (next: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Map lang code → metadata cho <html lang>, og:locale, direction
export const LANG_META: Record<Language, { html: string; ogLocale: string; dir: "ltr" | "rtl"; label: string }> = {
  vi: { html: "vi", ogLocale: "vi_VN", dir: "ltr", label: "Tiếng Việt" },
  en: { html: "en", ogLocale: "en_US", dir: "ltr", label: "English" },
  zh: { html: "zh", ogLocale: "zh_CN", dir: "ltr", label: "中文" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? i18n.language ?? "vi") as Language;

  // Đồng bộ <html lang> + og:locale với ngôn ngữ active — quan trọng cho SEO + a11y
  useEffect(() => {
    if (typeof document === "undefined") return;
    const meta = LANG_META[language] ?? LANG_META.vi;
    document.documentElement.lang = meta.html;
    document.documentElement.dir = meta.dir;

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement("meta");
      ogLocale.setAttribute("property", "og:locale");
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute("content", meta.ogLocale);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (next) => {
        void i18n.changeLanguage(next);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, next);
        }
      },
    }),
    [i18n, language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
