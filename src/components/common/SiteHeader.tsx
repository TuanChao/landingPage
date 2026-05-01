import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageDropdown from "../ui/LanguageDropdown";
import { useSiteContent } from "../../hooks/useSiteContent";
import routesName from "~routes/enum.routes";
import "./SiteHeader.css";
import { PRODUCT_NAV } from "../../data/products";

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
            <Link className="head_h-logo" to={routesName.ROOT}>
              <img src="/logoweb" alt="ZWCAD Vietnam" />
            </Link>
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
              <Link to={currentProduct.href} className="head_nav-product">
                <div className="head_nav-logo">
                  <img src={currentProduct.logo} alt={currentProduct.name} />
                </div>
                <span className="head_nav-text">{currentProduct.name}</span>
              </Link>
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
                            <Link to={child.path}>{child.label}</Link>
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
