import { Link } from "react-router-dom";
import { useMockStore } from "../../../admin/mockStore";
import { seedBanners, seedNews, seedFaq, seedProducts, seedDownloads, seedContacts } from "../../../admin/seeds";
import type { Banner, NewsItem, FaqItem, Product, DownloadItem, ContactSubmission } from "../../../admin/types";
import Icon from "../../../admin/Icon";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  const [banners] = useMockStore<Banner[]>("admin.banners", seedBanners);
  const [news] = useMockStore<NewsItem[]>("admin.news", seedNews);
  const [faq] = useMockStore<FaqItem[]>("admin.faq", seedFaq);
  const [products] = useMockStore<Product[]>("admin.products", seedProducts);
  const [downloads] = useMockStore<DownloadItem[]>("admin.downloads", seedDownloads);
  const [contacts] = useMockStore<ContactSubmission[]>("admin.contacts", seedContacts);

  const newContacts = contacts.filter((c) => c.status === "new").length;
  const activeBanners = banners.filter((b) => b.active).length;

  const stats: { label: string; value: number; hint: string; href: string; icon: string }[] = [
    { label: "Banner đang hiển thị", value: activeBanners, hint: `Tổng cộng ${banners.length} banner`, href: "/admin/banners", icon: "banner" },
    { label: "Bài viết tin tức", value: news.length, hint: "Đã xuất bản", href: "/admin/news", icon: "news" },
    { label: "Câu hỏi thường gặp", value: faq.length, hint: "Đang công khai", href: "/admin/faq", icon: "faq" },
    { label: "Sản phẩm", value: products.length, hint: "Trong danh mục", href: "/admin/products", icon: "product" },
    { label: "File tải về", value: downloads.length, hint: "Trial & docs", href: "/admin/downloads", icon: "download" },
    { label: "Liên hệ chưa đọc", value: newContacts, hint: `${contacts.length} tổng`, href: "/admin/contacts", icon: "contact" },
  ];

  const recentContacts = [...contacts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Tổng quan</h1>
          <p className="adm-muted">Xin chào lại — đây là tóm tắt nội dung đang quản lý.</p>
        </div>
      </div>

      <div className="adm-stats">
        {stats.map((s) => (
          <Link key={s.label} to={s.href} className="adm-stat">
            <div className="adm-stat__head">
              <span>{s.label}</span>
              <Icon name={s.icon} size={16} />
            </div>
            <div className="adm-stat__value">{s.value}</div>
            <div className="adm-stat__hint">{s.hint}</div>
          </Link>
        ))}
      </div>

      <div className="adm-dashboard-grid">
        <div className="adm-card">
          <div className="adm-card__header">
            <h2 className="adm-h2">Liên hệ gần đây</h2>
            <p className="adm-muted">5 yêu cầu mới nhất từ form liên hệ</p>
          </div>
          <div className="adm-card__content" style={{ paddingTop: 12 }}>
            {recentContacts.length === 0 ? (
              <p className="adm-muted">Chưa có liên hệ nào.</p>
            ) : (
              <div className="adm-recent">
                {recentContacts.map((c) => (
                  <div key={c.id} className="adm-recent__row">
                    <div className="adm-avatar">{c.name.charAt(0).toUpperCase()}</div>
                    <div className="adm-recent__body">
                      <div className="adm-recent__name">{c.name}</div>
                      <div className="adm-muted">{c.email} · {c.message.slice(0, 60)}{c.message.length > 60 ? "…" : ""}</div>
                    </div>
                    <span className={`adm-badge adm-badge--${c.status === "new" ? "info" : c.status === "replied" ? "success" : "muted"}`}>
                      {c.status === "new" ? "Mới" : c.status === "replied" ? "Đã trả lời" : "Đã đọc"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card__header">
            <h2 className="adm-h2">Banner đang chạy</h2>
            <p className="adm-muted">Hiển thị trên Hero Section trang chủ</p>
          </div>
          <div className="adm-card__content" style={{ paddingTop: 12 }}>
            {banners.filter((b) => b.active).length === 0 ? (
              <p className="adm-muted">Chưa có banner nào đang bật.</p>
            ) : (
              <div className="adm-recent">
                {banners.filter((b) => b.active).sort((a, b) => a.order - b.order).map((b) => (
                  <div key={b.id} className="adm-recent__row">
                    {b.image
                      ? <img src={b.image} alt="" className="adm-thumb" />
                      : <div className="adm-thumb" style={{ background: "var(--adm-muted-bg)" }} />}
                    <div className="adm-recent__body">
                      <div className="adm-recent__name">{b.title}</div>
                      <div className="adm-muted">{b.subtitle ?? "—"}</div>
                    </div>
                    <span className="adm-badge adm-badge--outline">#{b.order}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
