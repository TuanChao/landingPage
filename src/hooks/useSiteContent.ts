import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { SiteContent } from "../types/content";
import type { Language } from "../types/site";
import { contentMap } from "../data/siteContent";

export function useSiteContent() {
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? i18n.language ?? "vi") as Language;

  return useMemo(() => {
    const content = i18n.getResourceBundle(language, "translation");
    return (content ?? contentMap.vi) as SiteContent;
  }, [i18n, language]);
}
