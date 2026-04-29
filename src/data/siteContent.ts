import type { Language } from "../types/site";
import type { SiteContent } from "../types/content";
import vi from "./locales/vi.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

export const contentMap: Record<Language, SiteContent> = {
  vi: vi as SiteContent,
  en: en as SiteContent,
  zh: zh as SiteContent
};

export function getContentByLanguage(language: Language): SiteContent {
  return contentMap[language] ?? contentMap.vi;
}
