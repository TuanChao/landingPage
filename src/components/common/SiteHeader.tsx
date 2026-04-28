import { NavLink } from "react-router-dom";
import LanguageDropdown from "../ui/LanguageDropdown";
import { useSiteContent } from "../../hooks/useSiteContent";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function SiteHeader() {
  const content = useSiteContent();

  return (
    <header className="head_header">
      <div className="head_h-main">
        <div className="container head_h-inner">
          <div className="head_h-left">
            <a className="head_h-logo" href="/">
              <span className="brand-focus">FOCUS</span>
              <span className="brand-zw">ZWSOFT</span>
            </a>
          </div>
          <div className="head_h-right">
            <div className="head_h-area">
              <input
                className="search-input"
                placeholder={content.searchPlaceholder}
              />
              <div className="head_h-language lang-switch">
                <LanguageDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="head_nav">
        <div className="container head_nav-inner">
          <div className="head_nav-cont">
            <div className="head_nav-navbox">
              {content.nav.map((item) =>
                item.children?.length ? (
                  <DropdownMenu.Root key={item.path}>
                    <DropdownMenu.Trigger className="head_nav-one head_nav-trigger">
                      {item.label} <ChevronDown size={14} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="nav-dd-content" sideOffset={6}>
                        {item.children.map((child) => (
                          <DropdownMenu.Item key={child.path + child.label} className="nav-dd-item" asChild>
                            <a href={child.path}>{child.label}</a>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `head_nav-one ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
