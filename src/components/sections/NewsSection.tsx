import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Link } from "react-router-dom";
import "./NewsSection.css";

export default function NewsSection() {
  const content = useSiteContent();
  return (
    <section className="news-section">
      <div className="container">
        <div className="news-section__head">
          <SectionTitle>Tin t?c</SectionTitle>
          <Link to="/tin-tuc" className="news-section__more">Xem t?t c? ?</Link>
        </div>
        <div className="news-section__grid">
          {content.news.map((item) => (
            <Link key={item.slug} to={`/tin-tuc/${item.slug}`} className="news-section__card">
              <div className="news-section__thumb" aria-hidden="true" />
              <div className="news-section__body">
                {item.date && (
                  <time className="news-section__date">
                    {new Date(item.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </time>
                )}
                <h3 className="news-section__title">{item.title}</h3>
                <p className="news-section__excerpt">{item.excerpt}</p>
                <span className="news-section__readmore">Ð?c thêm ?</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
