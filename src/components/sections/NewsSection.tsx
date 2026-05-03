import { Link } from "react-router-dom";
import { useSiteContent } from "../../hooks/useSiteContent";
import Section from "../ui/Section";
import "./NewsSection.css";

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}

export default function NewsSection() {
  const content = useSiteContent();
  const items = content.news;

  return (
    <Section className="ns-section">
      <div className="ns-head">
        <h2 className="ns-title">Tin tức</h2>
        <Link to="/tin-tuc" className="ns-more">Xem tất cả →</Link>
      </div>

      <div className="ns-marquee">
        <div className="ns-track">
          {[...items, ...items].map((item, i) => (
            <Link key={i} to={`/tin-tuc/${item.slug}`} className="ns-card">
              <div className="ns-card__thumb">
                {item.image
                  ? <img src={item.image} alt={item.title} />
                  : <div className="ns-card__noimg" />
                }
              </div>
              <div className="ns-card__body">
                {item.category && <span className="ns-card__cat">{item.category}</span>}
                <h3 className="ns-card__title">{item.title}</h3>
                <p className="ns-card__excerpt">{item.excerpt}</p>
                {item.date && <time className="ns-card__date">{formatDate(item.date)}</time>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
