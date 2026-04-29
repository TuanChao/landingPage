import "./SiteFooter.css";
export default function SiteFooter() {
  return (
    <footer className="new_footer">
      <div className="container new_footer-inner">
        <div className="new_footer-top">
          <div className="new_footer-left">
            <a className="new_footer-logo" href="/">
              <span className="brand-focus">FOCUS</span>
              <span className="brand-zw brand-zw-white">ZWSOFT</span>
            </a>
            <div className="new_footer-box">
              <div className="new_footer-hint">Connect with ZWCAD Vietnam</div>
            </div>
          </div>

          <div className="new_footer-right">
            <div className="new_footer-list">
              <div className="new_footer-item">
                <div className="new_footer-one new_footer-bold">S?n ph?m</div>
                <div className="new_footer-twobox">
                  <a className="new_footer-two" href="/san-pham/zwcad">ZWCAD</a>
                  <a className="new_footer-two" href="/san-pham/zw3d">ZW3D</a>
                  <a className="new_footer-two" href="/san-pham/zwcad-mfg">ZWCAD MFG</a>
                  <a className="new_footer-two" href="/tai-ve/zwcad-trial">T?i b?n dùng th?</a>
                </div>
              </div>
              <div className="new_footer-item">
                <div className="new_footer-one new_footer-bold">H? tr?</div>
                <div className="new_footer-twobox">
                  <a className="new_footer-two" href="/cau-hoi-thuong-gap">Câu h?i thý?ng g?p</a>
                  <a className="new_footer-two" href="/tin-tuc">Tin t?c</a>
                </div>
              </div>
              <div className="new_footer-item">
                <div className="new_footer-one new_footer-bold">Liên h?</div>
                <div className="new_footer-twobox">
                  <a className="new_footer-two" href="mailto:contact@focustech.com.vn">contact@focustech.com.vn</a>
                  <a className="new_footer-two" href="tel:0982286072">0982 286 072</a>
                  <a className="new_footer-two" href="/lien-he">G?i yêu c?u</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="new_footer-bottom">
          <p>© {new Date().getFullYear()} ZWCAD Vietnam - FocusTech</p>
        </div>
      </div>
    </footer>
  );
}

