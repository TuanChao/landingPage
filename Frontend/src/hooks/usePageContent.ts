import { useTranslation } from "react-i18next";

type Lang = "vi" | "en" | "zh";

export function usePageContent<T>(data: Record<Lang, T>): T {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? i18n.language ?? "vi") as Lang;
  return data[lang] ?? data.vi;
}
