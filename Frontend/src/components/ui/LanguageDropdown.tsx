import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Language } from "../../types/site";
import "./LanguageDropdown.css";

const languageMap: Record<Language, { label: string; flag: string }> = {
  vi: { label: "Tiếng Việt", flag: "https://flagcdn.com/w20/vn.png" },
  en: { label: "English", flag: "https://flagcdn.com/w20/us.png" },
  zh: { label: "中文", flag: "https://flagcdn.com/w20/cn.png" }
};

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="langdd__trigger" aria-label="Ngôn ngữ">
        <span className="langdd__flag" aria-hidden="true">
          <img src={languageMap[language].flag} alt="" />
        </span>
        <ChevronDown size={13} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="langdd__content" sideOffset={8} align="end">
          {(["vi", "en", "zh"] as Language[]).map((lang) => (
            <DropdownMenu.Item key={lang} className="langdd__item" onSelect={() => setLanguage(lang)}>
              <span className="langdd__flag" aria-hidden="true">
                <img src={languageMap[lang].flag} alt="" />
              </span>
              <span className="langdd__item-label">{languageMap[lang].label}</span>
              {language === lang && <Check size={13} className="langdd__check" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
