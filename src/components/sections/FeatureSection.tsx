import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Link } from "react-router-dom";
import "./FeatureSection.css";

const productImages = [
  "/image-zwcad/470x283_zwcad-1_67.jpg",
  "/image-zwcad/470x283_goc700x400_94.jpg",
  "/image-zwcad/470x283_mechanical-2019700x400_14.jpg",
  "/image-zwcad/470x283_architecture-2019-700x400_84.jpg"
];

export default function FeatureSection() {
  const content = useSiteContent();

  return (
    <Section id="features" className="feature-section">
      <SectionTitle>Danh mục sản phẩm nổi bật</SectionTitle>

      <div className="feature-grid">
        {content.products.map((item, index) => (
          <Link key={`${item.slug}-${item.title}`} to={`/san-pham/${item.slug}`} className="feature-card">
            {item.badge && <span className="feature-badge">{item.badge}</span>}
            <div className="feature-thumb">
              <img src={productImages[index]} alt={item.title} loading="lazy" />
            </div>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.description}</p>
            <span className="feature-link">Xem chi tiết →</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
