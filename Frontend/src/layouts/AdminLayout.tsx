import { ReactNode, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@/admin/components";
import { isAuthed, logout as apiLogout } from "@/admin/api";
import "@/admin/styles.css";
import "./AdminLayout.css";

const NAV_GROUPS: { label: string; items: { to: string; label: string; icon: string; end?: boolean }[] }[] = [
  {
    label: "Tổng quan",
    items: [
      { to: "/admin", label: "Dashboard", icon: "dashboard", end: true },
    ],
  },
  {
    label: "Nội dung",
    items: [
      { to: "/admin/banners", label: "Banner trang chủ", icon: "banner" },
      { to: "/admin/news", label: "Tin tức", icon: "news" },
      { to: "/admin/faq", label: "Câu hỏi thường gặp", icon: "faq" },
      { to: "/admin/pages", label: "Trang tùy biến", icon: "page" },
    ],
  },
  {
    label: "Tải về",
    items: [
      { to: "/admin/downloads", label: "Tải về", icon: "download" },
    ],
  },
  {
    label: "Tương tác",
    items: [
      { to: "/admin/contacts", label: "Liên hệ", icon: "contact" },
    ],
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = isAuthed();
  const email = localStorage.getItem("admin_email") ?? "admin";
  const initial = email.charAt(0).toUpperCase();

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) navigate("/admin/login", { replace: true });
  }, [isLoggedIn, navigate]);

  // Đóng drawer khi đổi route
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Khoá scroll body khi drawer mở
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  if (!isLoggedIn) return null;

  function logout() {
    apiLogout();
    navigate("/admin/login");
  }

  return (
    <div className={`adm-root adm-shell${drawerOpen ? " adm-shell--drawer-open" : ""}`}>
      <aside className="adm-sidebar" aria-hidden={!drawerOpen && undefined}>
        <div className="adm-sidebar__brand">
          <div className="adm-sidebar__logo">Z</div>
          <div>
            <div className="adm-sidebar__brand-name">ZWCAD Admin</div>
            <div className="adm-sidebar__brand-sub">Vietnam</div>
          </div>
          <button
            type="button"
            className="adm-sidebar__close"
            aria-label="Đóng menu"
            onClick={() => setDrawerOpen(false)}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <nav className="adm-sidebar__nav">
          {NAV_GROUPS.map((g) => (
            <div key={g.label} className="adm-sidebar__group">
              <div className="adm-sidebar__group-label">{g.label}</div>
              {g.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `adm-sidebar__link${isActive ? " is-active" : ""}`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <button className="adm-sidebar__link adm-sidebar__link--btn" onClick={logout}>
            <Icon name="logout" size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <div
        className="adm-sidebar__overlay"
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      <div className="adm-main">
        <header className="adm-topbar">
          <button
            type="button"
            className="adm-btn adm-btn--ghost adm-btn--icon adm-topbar__burger"
            aria-label="Mở menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <Icon name="menu" size={18} />
          </button>

          <div className="adm-topbar__search">
            <Icon name="search" size={16} />
            <input className="adm-topbar__search-input" placeholder="Tìm kiếm..." />
          </div>

          <div className="adm-topbar__right">
            <button className="adm-btn adm-btn--ghost adm-btn--icon" aria-label="Notifications">
              <Icon name="bell" size={18} />
            </button>
            <div className="adm-topbar__user">
              <div className="adm-avatar">{initial}</div>
              <div className="adm-topbar__user-info">
                <div className="adm-topbar__user-name">{email}</div>
                <div className="adm-topbar__user-role">Quản trị viên</div>
              </div>
            </div>
          </div>
        </header>

        <main className="adm-content">{children}</main>
      </div>
    </div>
  );
}
