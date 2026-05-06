import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./NewsPage.css";

const PER_PAGE = 8;

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function NewsPage() {
  const content = useSiteContent();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(content.news.length / PER_PAGE);
  const items = content.news.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main className="np-page">
      <Seo
        title="Tin tức | ZWCAD Vietnam"
        description="Cập nhật tin tức, sự kiện và bài viết về phần mềm ZWCAD."
        keywords="tin tuc zwcad, zwcad viet nam"
      />

      {/* ── Banner ── */}
      <div className="np-banner">
        <img
          src="/image-zwcad/news/banner-city.png"
          alt=""
          className="np-banner__img"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      <div className="container np-wrap">

        {/* ── Breadcrumb ── */}
        <nav className="np-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="np-bc-sep">/</span>
          <Link to="/tin-tuc">Tin tức</Link>
          <span className="np-bc-sep">/</span>
          <span>Tin tức</span>
        </nav>

        {/* ── Grid ── */}
        <div className="np-grid">
          {items.map((item) => (
            <Link key={item.slug} to={`/tin-tuc/${item.slug}`} className="np-card">
              <div className="np-card__thumb">
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <div className="np-card__noimgbox">
                    <span className="np-card__noimg">NO<br />IMAGE<br />AVAILABLE</span>
                  </div>
                )}
              </div>
              <div className="np-card__body">
                {item.category && <span className="np-card__cat">{item.category}</span>}
                <h2 className="np-card__title">{item.title}</h2>
                <p className="np-card__excerpt">{item.excerpt}</p>
                {item.date && <span className="np-card__date">{formatDate(item.date)}</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="np-pager">
            <span className="np-pager__info">Trang {page}/{totalPages}</span>
            <div className="np-pager__btns">
              <button
                className="np-pager__btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`np-pager__btn${n === page ? " active" : ""}`}
                  onClick={() => setPage(n)}
                >{n}</button>
              ))}
              <button
                className="np-pager__btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >›</button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
