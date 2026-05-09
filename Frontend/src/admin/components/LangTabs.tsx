type Lang = "vi" | "en" | "zh";

interface LangTabsProps {
  value: Lang;
  onChange: (lang: Lang) => void;
}

const LABELS: Record<Lang, string> = { vi: "Tiếng Việt", en: "English", zh: "中文" };

export default function LangTabs({ value, onChange }: LangTabsProps) {
  return (
    <div className="adm-lang-tabs">
      {(["vi", "en", "zh"] as Lang[]).map((lang) => (
        <button
          key={lang}
          type="button"
          className={`adm-lang-tab${value === lang ? " is-active" : ""}`}
          onClick={() => onChange(lang)}
        >
          {LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
