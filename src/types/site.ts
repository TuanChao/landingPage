export type Language = "vi" | "en" | "zh";

export interface NavItem {
  label: LocalizedText;
  path: string;
}

export interface LocalizedText {
  vi: string;
  en: string;
  zh: string;
}
