import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageDropdown from "../ui/LanguageDropdown";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./SiteHeader.css";

const PRODUCT_NAV: Record<string, { name: string; logo: string; href: string }> = {
  "/san-pham/zwcad": {
    name: "ZWCAD",
    logo: "/image-zwcad/logo/zwcadmb",
    href: "/san-pham/zwcad",
  },
  "/san-pham/zw3d": {
    name: "ZW3D",
    logo: "/image-zwcad/logo/zwc3d",
    href: "/san-pham/zw3d",
  },
  "/san-pham/zwcad-mfg": {
    name: "ZWCAD MFG",
    logo: "/image-zwcad/logo/zwcadmfg",
    href: "/san-pham/zwcad-mfg",
  },
};

export default function SiteHeader() {
  const content = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const currentProduct = PRODUCT_NAV[location.pathname] ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`head_header${scrolled ? " scrolled" : ""}`}>
      <div className="head_h-main">
        <div className="container head_h-inner">
          <div className="head_h-left">
            <a className="head_h-logo" href="/">
              <img src="/logoweb" alt="ZWCAD Vietnam" />
            </a>
          </div>
          <div className="head_h-right">
            <div className="head_h-area">
              <input className="search-input" placeholder={content.searchPlaceholder} />
              <div className="lang-switch">
                <LanguageDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="head_nav">
        <div className="container head_nav-inner">
          <div className="head_nav-cont">
            {currentProduct && (
              <a href={currentProduct.href} className="head_nav-product">
                <div className="head_nav-logo">
                  <img src={currentProduct.logo} alt={currentProduct.name} />
                </div>
                <span className="head_nav-text">{currentProduct.name}</span>
              </a>
            )}
            <div className="head_nav-navbox">
              {content.nav.map((item) =>
                item.children?.length ? (
                  <DropdownMenu.Root key={item.path}>
                    <DropdownMenu.Trigger className="head_nav-one navdd__trigger">
                      {item.label} <ChevronDown size={14} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="navdd__content" sideOffset={6}>
                        {item.children.map((child) => (
                          <DropdownMenu.Item key={child.path + child.label} className="navdd__item" asChild>
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
