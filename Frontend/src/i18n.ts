import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { contentMap } from "./data/siteContent";
import type { Language } from "./types/site";

const STORAGE_KEY = "zwcad.language";
const fallbackLanguage: Language = "vi";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return fallbackLanguage;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "vi" || saved === "en" || saved === "zh") {
    return saved;
  }

  return fallbackLanguage;
}

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: contentMap.vi },
    en: { translation: contentMap.en },
    zh: { translation: contentMap.zh }
  },
  lng: getInitialLanguage(),
  fallbackLng: fallbackLanguage,
  interpolation: { escapeValue: false }
});

export { STORAGE_KEY };
export default i18n;
