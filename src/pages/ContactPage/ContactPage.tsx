import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react";
import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./ContactPage.css";

const offices = [
  {
    city: "Hà Nội",
    address: "Tầng 7, tòa nhà Zodiac, Ngõ 19 Duy Tân, Cầu Giấy",
    phone: "0982 286 072",
  },
  {
    city: "TP. Hồ Chí Minh",
    address: "Tòa nhà Halo, 37 Hoàng Văn Thụ, Phú Nhuận",
    phone: "0918 134 888",
  },
];

export default function ContactPage() {
  const content = useSiteContent();
  const { placeholders, submit } = content.contact.form;

  return (
    <main className="cp-page">
      <Seo
        title="Liên hệ | ZWCAD Vietnam"
        description="Liên hệ FocusTech để được tư vấn sản phẩm và triển khai ZWCAD."
        keywords="lien he zwcad, focustech, tu van cad"
      />

      <section className="cp-hero">
        <div className="container">
          <h1 className="cp-hero__title">Liên hệ với chúng tôi</h1>
          <p className="cp-hero__sub">
            Đội ngũ FocusTech sẵn sàng tư vấn giải pháp ZWCAD phù hợp nhất cho doanh nghiệp của bạn.
          </p>
        </div>
      </section>

      <section className="cp-body container">
        <div className="cp-grid">
          {/* Left: info */}
          <aside className="cp-info">
            <div className="cp-info__head">
              <span className="cp-info__brand">{content.contact.company}</span>
              <h2 className="cp-info__title">Thông tin liên hệ</h2>
              <p className="cp-info__desc">
                Phản hồi trong vòng 24 giờ làm việc. Hotline ưu tiên cho các yêu cầu khẩn.
              </p>
            </div>

            <div className="cp-quick">
              <a href="mailto:contact@focustech.com.vn" className="cp-quick__item">
                <span className="cp-quick__icon"><Mail size={18} /></span>
                <div>
                  <p className="cp-quick__label">Email</p>
                  <p className="cp-quick__value">contact@focustech.com.vn</p>
                </div>
              </a>
              <div className="cp-quick__item">
                <span className="cp-quick__icon"><Clock size={18} /></span>
                <div>
                  <p className="cp-quick__label">Giờ làm việc</p>
                  <p className="cp-quick__value">Thứ 2 – Thứ 6, 8:30 – 17:30</p>
                </div>
              </div>
            </div>

            <div className="cp-offices">
              {offices.map((o) => (
                <div key={o.city} className="cp-office">
                  <h3 className="cp-office__city">
                    <MapPin size={16} /> {o.city}
                  </h3>
                  <p className="cp-office__addr">{o.address}</p>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="cp-office__phone">
                    <Phone size={14} /> {o.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="cp-social">
              <a href="#" aria-label="Facebook" className="cp-social__btn cp-social__fb"><Facebook size={16} /></a>
              <a href="#" aria-label="YouTube" className="cp-social__btn cp-social__yt"><Youtube size={16} /></a>
            </div>
          </aside>

          {/* Right: form */}
          <form className="cp-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="cp-form__title">Gửi yêu cầu tư vấn</h2>
            <p className="cp-form__sub">Điền thông tin, chúng tôi sẽ liên hệ lại sớm nhất.</p>

            <div className="cp-field-row">
              <div className="cp-field">
                <label>{placeholders[0]} <span>*</span></label>
                <input type="text" placeholder={placeholders[0]} required />
              </div>
              <div className="cp-field">
                <label>{placeholders[1]} <span>*</span></label>
                <input type="tel" placeholder={placeholders[1]} required />
              </div>
            </div>

            <div className="cp-field">
              <label>{placeholders[2]} <span>*</span></label>
              <input type="email" placeholder={placeholders[2]} required />
            </div>

            <div className="cp-field">
              <label>{placeholders[3]}</label>
              <textarea rows={5} placeholder={placeholders[3]} />
            </div>

            <button type="submit" className="cp-submit">{submit}</button>

            <p className="cp-note">
              Bằng việc gửi thông tin, bạn đồng ý với chính sách bảo mật của FocusTech.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
