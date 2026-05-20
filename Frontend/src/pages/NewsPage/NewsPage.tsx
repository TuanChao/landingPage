import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../../seo/Seo";
import { PublicApi, useFetch, useLang, pick, type NewsDto } from "@/lib/publicApi";
import "./NewsPage.css";

const PER_PAGE = 8;

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function NewsPage() {
  const lang = useLang();
  const { data, loading, error } = useFetch<NewsDto[]>(() => PublicApi.news(), []);
  const [page, setPage] = useState(1);

  const news = data ?? [];
  const totalPages = Math.max(1, Math.ceil(news.length / PER_PAGE));
  const items = news.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main className="np-page">
      <Seo
        title="Tin tức | ZWCAD Vietnam"
        description="Cập nhật tin tức, sự kiện và bài viết về phần mềm ZWCAD."
        keywords="tin tuc zwcad, zwcad viet nam"
      />

      <div className="np-banner">
        <img
          src="/image-zwcad/news/banner-city.png"
          alt=""
          className="np-banner__img"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      <div className="container np-wrap">

        <nav className="np-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="np-bc-sep">/</span>
          <Link to="/tin-tuc">Tin tức</Link>
          <span className="np-bc-sep">/</span>
          <span>Tin tức</span>
        </nav>

        {loading && <p>Đang tải...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <div className="np-grid">
          {items.map((item) => {
            const title = pick(item, "title", lang);
            const excerpt = pick(item, "excerpt", lang);
            return (
              <Link key={item.id} to={`/tin-tuc/${item.slug}`} className="np-card">
                <div className="np-card__thumb">
                  {item.image ? (
                    <img src={item.image} alt={title} />
                  ) : (
                    <div className="np-card__noimgbox">
                      <span className="np-card__noimg">NO<br />IMAGE<br />AVAILABLE</span>
                    </div>
                  )}
                </div>
                <div className="np-card__body">
                  {item.category && <span className="np-card__cat">{item.category}</span>}
                  <h2 className="np-card__title">{title}</h2>
                  <p className="np-card__excerpt">{excerpt}</p>
                  {item.publishedAt && <span className="np-card__date">{formatDate(item.publishedAt)}</span>}
                </div>
              </Link>
            );
          })}
        </div>

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
