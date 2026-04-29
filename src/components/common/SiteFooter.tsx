import "./SiteFooter.css";

export default function SiteFooter() {
  return (
    <footer className="ft">
      <div className="container ft-inner">
        <div className="ft-top">

          {/* Company info column */}
          <div className="ft-brand">
            <a className="ft-logo" href="/">
              <img src="/logoweb" alt="ZWCAD Vietnam" className="ft-logo__img" />
            </a>
            <p className="ft-company-name">
              CÔNG TY CP THIẾT BỊ VÀ PHÁT TRIỂN CÔNG NGHỆ TRỌNG ĐIỂM
            </p>
            <address className="ft-address">
              <li>
                <span className="ft-addr__label">Hà Nội:</span>
                Tầng 7, Toà nhà Zodiac, Ngõ 19 Duy Tân, P. Cầu Giấy
              </li>
              <li>
                <span className="ft-addr__label">Hotline:</span>
                <a href="tel:0982286072">0982 286 072</a>
              </li>
              <li>
                <span className="ft-addr__label">HCM:</span>
                Tòa nhà Halo, Số 37 Hoàng Văn Thụ, P.15, Q. Phú Nhuận
              </li>
              <li>
                <span className="ft-addr__label">Hotline:</span>
                <a href="tel:0918134888">0918 134 888</a>
              </li>
              <li>
                <span className="ft-addr__label">Email:</span>
                <a href="mailto:contact@focustech.com.vn">contact@focustech.com.vn</a>
              </li>
              <li>
                <span className="ft-addr__label">Tel:</span>
                (+84) 4 32373402
                <span className="ft-addr__sep">·</span>
                <span className="ft-addr__label">Fax:</span>
                (+84) 4 32373402
              </li>
            </address>
          </div>

          {/* Products column */}
          <div className="ft-col">
            <h4 className="ft-col__head">ZWCAD</h4>
            <ul className="ft-col__list">
              <li><a href="/san-pham/zwcad">ZWCAD Standard / Professional</a></li>
              <li><a href="/san-pham/zwcad-mfg">ZWCAD MFG (Mechanical)</a></li>
              <li><a href="/san-pham/zwcad#viewer">ZWCAD Viewer</a></li>
              <li><a href="/san-pham/zwcad#compare">So sánh phiên bản</a></li>
              <li><a href="/san-pham/zwcad#license">Cấp phép &amp; Nâng cấp</a></li>
            </ul>
          </div>

          {/* ZW3D column */}
          <div className="ft-col">
            <h4 className="ft-col__head">CAD 3D</h4>
            <ul className="ft-col__list">
              <li><a href="/san-pham/zw3d">ZW3D</a></li>
              <li><a href="/san-pham/zw3d#cam">ZW3D CAM</a></li>
              <li><a href="/san-pham/zw3d#cae">ZW3D CAE</a></li>
              <li><a href="/tai-ve/zwcad-trial">Tải bản dùng thử</a></li>
            </ul>
          </div>

          {/* Support / Social column */}
          <div className="ft-col">
            <h4 className="ft-col__head">Hỗ trợ</h4>
            <ul className="ft-col__list">
              <li><a href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</a></li>
              <li><a href="/tin-tuc">Tin tức</a></li>
              <li><a href="/lien-he">Liên hệ / Báo giá</a></li>
            </ul>
            <div className="ft-social">
              <a href="https://www.facebook.com/phanmemzwcad" className="ft-social__btn ft-social__fb" aria-label="Facebook" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://youtube.com" className="ft-social__btn ft-social__yt" aria-label="YouTube" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0d1220"/></svg>
              </a>
              <a href="https://twitter.com" className="ft-social__btn ft-social__x" aria-label="X (Twitter)" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://plus.google.com" className="ft-social__btn ft-social__gp" aria-label="Google+" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11h8.533c.044.385.067.78.067 1.184 0 5.407-3.621 9.255-9.6 9.255A9.44 9.44 0 0 1 2.556 12 9.44 9.44 0 0 1 11 2.561c2.544 0 4.678.933 6.32 2.464l-2.567 2.467C13.696 6.52 12.44 6 11 6A6.336 6.336 0 0 0 4.667 12 6.336 6.336 0 0 0 11 18c3.543 0 5.598-2.009 5.985-4.667H12V11zm10 0v2h-2v2h-2v-2h-2v-2h2V9h2v2h2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="ft-bottom">
          <p>© {new Date().getFullYear()} FocusTech — ZWCAD Vietnam. All rights reserved.</p>
          <div className="ft-bottom__links">
            <a href="/san-pham/zwcad">ZWCAD</a>
            <a href="/san-pham/zw3d">ZW3D</a>
            <a href="/san-pham/zwcad-mfg">ZWCAD MFG</a>
            <a href="/">FocusTech</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
