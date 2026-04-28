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
                <div className="new_footer-one new_footer-bold">Products</div>
                <div className="new_footer-twobox">
                  <a className="new_footer-two" href="/san-pham-zwcad">
                    ZWCAD
                  </a>
                  <a className="new_footer-two" href="/tai-ve/zwcad-trial">
                    Download Trial
                  </a>
                </div>
              </div>
              <div className="new_footer-item">
                <div className="new_footer-one new_footer-bold">Support</div>
                <div className="new_footer-twobox">
                  <a className="new_footer-two" href="/cau-hoi-thuong-gap">
                    FAQ
                  </a>
                  <a className="new_footer-two" href="/tin-tuc">
                    News
                  </a>
                </div>
              </div>
              <div className="new_footer-item">
                <div className="new_footer-one new_footer-bold">Contact</div>
                <div className="new_footer-twobox">
                  <a className="new_footer-two" href="mailto:contact@focustech.com.vn">
                    contact@focustech.com.vn
                  </a>
                  <a className="new_footer-two" href="tel:0982286072">
                    0982 286 072
                  </a>
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
