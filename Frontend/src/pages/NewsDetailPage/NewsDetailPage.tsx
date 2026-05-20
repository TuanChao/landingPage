import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../../seo/Seo";
import { PublicApi, useFetch, useLang, pick, type NewsDto } from "@/lib/publicApi";
import "./NewsDetailPage.css";

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

function readTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const PLACEHOLDER_BODY = (title: string, excerpt: string) => `
<p class="ndp-lead">${excerpt}</p>
<h2>Tổng quan</h2>
<p>Bài viết về ${title.toLowerCase()}. Nội dung chi tiết sẽ được cập nhật sớm.</p>
`;

export default function NewsDetailPage() {
  const { slug } = useParams();
  const lang = useLang();
  const { data, loading } = useFetch<NewsDto[]>(() => PublicApi.news(), []);
  const news = data ?? [];

  const article = useMemo(() => news.find((n) => n.slug === slug), [slug, news]);
  const related = useMemo(() => news.filter((n) => n.slug !== slug).slice(0, 4), [slug, news]);

  if (loading) {
    return <main className="container ndp-notfound"><p>Đang tải...</p></main>;
  }

  if (!article) {
    return (
      <main className="container ndp-notfound">
        <h1>Bài viết không tồn tại</h1>
        <Link to="/tin-tuc">← Quay lại tin tức</Link>
      </main>
    );
  }

  const title = pick(article, "title", lang);
  const excerpt = pick(article, "excerpt", lang);
  const body = pick(article, "content", lang);
  const bodyHtml = body || PLACEHOLDER_BODY(title, excerpt);
  const minutes = readTime(excerpt + bodyHtml.replace(/<[^>]+>/g, " "));

  return (
    <>
      <Seo
        title={`${title} | ZWCAD Vietnam`}
        description={excerpt}
        keywords={`${article.category ?? "tin tuc"}, zwcad vietnam`}
      />

      <div className="ndp-banner">
        {article.image ? (
          <img src={article.image} alt={title} className="ndp-banner__img" />
        ) : (
          <img
            src="/image-zwcad/news/banner-city.png"
            alt=""
            className="ndp-banner__img"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        )}
      </div>

      <div className="container ndp-wrap">

        <nav className="ndp-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/tin-tuc">Tin tức</Link>
          <span>/</span>
          <span className="ndp-bc-current">{title}</span>
        </nav>

        <div className="ndp-layout">

          <article className="ndp-main">

            {article.category && <span className="ndp-cat">{article.category}</span>}

            <h1 className="ndp-title">{title}</h1>

            <div className="ndp-meta">
              <span className="ndp-meta__author">
                <img src="/image-zwcad/news/avatar-default.png" alt="" className="ndp-meta__avatar"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                FocusTech
              </span>
              {article.publishedAt && (
                <span className="ndp-meta__date">{formatDate(article.publishedAt)}</span>
              )}
              <span className="ndp-meta__read">{minutes} phút đọc</span>
            </div>

            <div className="ndp-divider" />

            <div className="ndp-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            <div className="ndp-divider" />

            <div className="ndp-tags">
              <span className="ndp-tags__label">Tags:</span>
              {["ZWCAD", article.category ?? "Phần mềm CAD", "Thiết kế kỹ thuật", "FocusTech"].map((t) => (
                <span key={t} className="ndp-tag">{t}</span>
              ))}
            </div>

            <div className="ndp-share">
              <span className="ndp-share__label">Chia sẻ:</span>
              <a href="#" className="ndp-share__btn ndp-share__fb" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </a>
              <a href="#" className="ndp-share__btn ndp-share__tw" aria-label="Twitter/X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l16 16M4 20L20 4"/></svg>
                Twitter
              </a>
              <a href="#" className="ndp-share__btn ndp-share__li" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>

            <div className="ndp-nav">
              {related[0] && (
                <Link to={`/tin-tuc/${related[0].slug}`} className="ndp-nav__btn ndp-nav__prev">
                  <span className="ndp-nav__dir">← Bài trước</span>
                  <span className="ndp-nav__ttl">{pick(related[0], "title", lang)}</span>
                </Link>
              )}
              {related[1] && (
                <Link to={`/tin-tuc/${related[1].slug}`} className="ndp-nav__btn ndp-nav__next">
                  <span className="ndp-nav__dir">Bài tiếp →</span>
                  <span className="ndp-nav__ttl">{pick(related[1], "title", lang)}</span>
                </Link>
              )}
            </div>
          </article>

          <aside className="ndp-sidebar">

            <div className="ndp-cta-box">
              <div className="ndp-cta-box__icon">🚀</div>
              <h3 className="ndp-cta-box__title">Dùng thử miễn phí</h3>
              <p className="ndp-cta-box__desc">30 ngày trải nghiệm đầy đủ tính năng, không cần thẻ tín dụng.</p>
              <a href="/tai-ve" className="ndp-cta-box__btn">Tải về ngay</a>
              <a href="/lien-he" className="ndp-cta-box__link">Liên hệ tư vấn</a>
            </div>

            <div className="ndp-related">
              <h3 className="ndp-related__title">Bài viết liên quan</h3>
              <div className="ndp-related__list">
                {related.map((r) => {
                  const rt = pick(r, "title", lang);
                  return (
                    <Link key={r.id} to={`/tin-tuc/${r.slug}`} className="ndp-rel-card">
                      <div className="ndp-rel-card__thumb">
                        {r.image ? (
                          <img src={r.image} alt={rt} />
                        ) : (
                          <div className="ndp-rel-card__noimg" />
                        )}
                      </div>
                      <div className="ndp-rel-card__body">
                        {r.category && <span className="ndp-rel-card__cat">{r.category}</span>}
                        <div className="ndp-rel-card__title">{rt}</div>
                        {r.publishedAt && <div className="ndp-rel-card__date">{formatDate(r.publishedAt)}</div>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </>
  );
}
