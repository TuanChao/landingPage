import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Language, LocalizedText } from "../types/site";

interface LanguageContextValue {
  language: Language;
  setLanguage: (next: Language) => void;
  t: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (text) => text[language]
    }),
    [language]
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
