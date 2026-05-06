import { ReactNode, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../admin/Icon";
import "../admin/styles.css";
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
    ],
  },
  {
    label: "Sản phẩm & Tải về",
    items: [
      { to: "/admin/products", label: "Sản phẩm", icon: "product" },
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
  const isLoggedIn = localStorage.getItem("admin_logged_in") === "1";
  const email = localStorage.getItem("admin_email") ?? "admin";
  const initial = email.charAt(0).toUpperCase();

  useEffect(() => {
    if (!isLoggedIn) navigate("/admin/login", { replace: true });
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  function logout() {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_email");
    navigate("/admin/login");
  }

  return (
    <div className="adm-root adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <div className="adm-sidebar__logo">Z</div>
          <div>
            <div className="adm-sidebar__brand-name">ZWCAD Admin</div>
            <div className="adm-sidebar__brand-sub">Vietnam</div>
          </div>
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

      <div className="adm-main">
        <header className="adm-topbar">
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
