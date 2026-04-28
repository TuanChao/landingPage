import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Link } from "react-router-dom";

export default function FeatureSection() {
  const content = useSiteContent();
  return (
    <section id="features" className="section container">
      <SectionTitle>Danh mục sản phẩm nổi bật</SectionTitle>

      <div className="grid-4">
        {content.products.map((item) => (
          <Link
            key={item.title}
            to={`/san-pham/${item.slug}`}
            className="product-card"
          >
            {item.badge && <span className="product-badge">{item.badge}</span>}
            <div className="product-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.12" />
                <path d="M8 16h16M16 8v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="product-title">{item.title}</h3>
            <p className="product-desc">{item.description}</p>
            <span className="product-link">Xem chi tiết →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
