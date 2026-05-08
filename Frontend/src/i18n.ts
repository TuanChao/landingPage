import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { contentMap } from "./data/siteContent";
import { validateLocaleParity } from "./data/validateLocales";
import type { Language } from "./types/site";

const STORAGE_KEY = "zwcad.language";
const fallbackLanguage: Language = "vi";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return fallbackLanguage;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "vi" || saved === "en" || saved === "zh") return saved;

  // Auto-detect từ browser khi user vào lần đầu
  const navLang = window.navigator.language.toLowerCase();
  if (navLang.startsWith("vi")) return "vi";
  if (navLang.startsWith("zh")) return "zh";
  if (navLang.startsWith("en")) return "en";
  return fallbackLanguage;
}

const isDev = (import.meta as any).env?.DEV ?? false;

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: contentMap.vi },
    en: { translation: contentMap.en },
    zh: { translation: contentMap.zh },
  },
  lng: getInitialLanguage(),
  fallbackLng: fallbackLanguage,
  interpolation: { escapeValue: false },

  // Cảnh báo missing key ở dev — catch sớm khi 3 locale lệch
  saveMissing: isDev,
  missingKeyHandler: isDev
    ? (lngs, ns, key) => {
        // eslint-disable-next-line no-console
        console.warn(`[i18n] missing key [${lngs.join(",")}] ${ns}:${key}`);
      }
    : undefined,
});

if (isDev) validateLocaleParity();

export { STORAGE_KEY };
export default i18n;
