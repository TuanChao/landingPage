import { useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getContentByLanguage } from "../data/siteContent";

export function useSiteContent() {
  const { language } = useLanguage();
  return useMemo(() => getContentByLanguage(language), [language]);
}
