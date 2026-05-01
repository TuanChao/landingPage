import { Link } from "react-router-dom";
import Seo from "../../seo/Seo";
import { PRODUCTS } from "../../data/products";
import "./DownloadPage.css";

export default function DownloadPage() {
  return (
    <main className="dp-page">
      <div className="container">
        <div className="dp-hero">
          <h1 className="dp-hero__title">Tải về dùng thử miễn phí</h1>
          <p className="dp-hero__sub">Trải nghiệm đầy đủ tính năng trong 30 ngày, không yêu cầu thẻ tín dụng.</p>
        </div>
        <div className="dp-grid">
          {PRODUCTS.map((product) => (
            <div key={product.href} className="dp-card">
              <div className="dp-card__top">
                <img src={product.logo} alt={product.name} className="dp-card__logo" />
              </div>
              <div className="dp-card__body">
                <h2 className="dp-card__name">{product.name}</h2>
                <p className="dp-card__desc">{product.desc}</p>
                <span className="dp-card__version">Phiên bản {product.version}</span>
              </div>
              <div className="dp-card__footer">
                <Link to={`/tai-ve/${product.downloadSlug}`} className="dp-btn">
                  Tải về dùng thử
                </Link>
                <Link to={product.href} className="dp-btn-ghost">
                  Xem sản phẩm
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
