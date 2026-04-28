import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Language } from "../../types/site";

const languageMap: Record<Language, { label: string; flag: string }> = {
  vi: { label: "Tieng Viet", flag: "https://flagcdn.com/w20/vn.png" },
  en: { label: "English", flag: "https://flagcdn.com/w20/us.png" },
  zh: { label: "中文", flag: "https://flagcdn.com/w20/cn.png" }
};

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="lang-dd-trigger" aria-label="Language">
        <span className="lang-flag" aria-hidden="true">
          <img src={languageMap[language].flag} alt="" />
        </span>
        <span className="lang-dd-label">{languageMap[language].label}</span>
        <ChevronDown size={16} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="lang-dd-content" sideOffset={8} align="end">
          {(["vi", "en", "zh"] as Language[]).map((lang) => (
            <DropdownMenu.Item
              key={lang}
              className="lang-dd-item"
              onSelect={() => setLanguage(lang)}
            >
              <span className="lang-dd-item-left">
                <span className="lang-flag" aria-hidden="true">
                  <img src={languageMap[lang].flag} alt="" />
                </span>
                <span>{languageMap[lang].label}</span>
              </span>
              {language === lang ? <Check size={15} /> : null}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
