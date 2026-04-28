import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Link } from "react-router-dom";

export default function NewsSection() {
  const content = useSiteContent();
  return (
    <section className="section section-soft">
      <div className="container">
        <div className="section-head">
          <SectionTitle>Tin tức</SectionTitle>
          <Link to="/tin-tuc" className="section-more">Xem tất cả →</Link>
        </div>
        <div className="news-grid">
          {content.news.map((item) => (
            <Link key={item.slug} to={`/tin-tuc/${item.slug}`} className="news-card">
              <div className="news-card-thumb" aria-hidden="true" />
              <div className="news-card-body">
                {item.date && (
                  <time className="news-date">
                    {new Date(item.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </time>
                )}
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <span className="news-readmore">Đọc thêm →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
