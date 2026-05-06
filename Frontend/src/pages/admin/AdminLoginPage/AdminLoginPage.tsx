import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../admin/styles.css";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@zwcadvietnam.com");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!password) {
      setErr("Vui lòng nhập mật khẩu");
      return;
    }
    localStorage.setItem("admin_logged_in", "1");
    localStorage.setItem("admin_email", email);
    navigate("/admin");
  }

  return (
    <div className="adm-root adm-login">
      <div className="adm-login__panel">
        <div className="adm-login__brand">
          <div className="adm-login__logo">Z</div>
          <span>ZWCAD Vietnam</span>
        </div>
        <div className="adm-login__copy">
          <h1 className="adm-login__hero">Quản trị nội dung landing page</h1>
          <p className="adm-login__hero-sub">
            Quản lý banner, tin tức, sản phẩm, FAQ và các yêu cầu liên hệ từ khách hàng tại một nơi duy nhất.
          </p>
        </div>
        <div className="adm-login__footnote">© 2026 ZWCAD Vietnam. All rights reserved.</div>
      </div>

      <div className="adm-login__form-wrap">
        <form className="adm-login__form" onSubmit={handleSubmit}>
          <div className="adm-login__form-head">
            <h2 className="adm-h1">Đăng nhập</h2>
            <p className="adm-muted">Nhập email và mật khẩu để truy cập hệ thống</p>
          </div>

          <div className="adm-field">
            <label className="adm-label">Email</label>
            <input
              className="adm-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="adm-field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label className="adm-label">Mật khẩu</label>
              <a className="adm-muted" href="#" style={{ fontSize: 12, textDecoration: "none" }}>Quên mật khẩu?</a>
            </div>
            <input
              className="adm-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button className="adm-btn" type="submit" style={{ width: "100%", height: 40 }}>
            Đăng nhập
          </button>
          {err && <div className="adm-error">{err}</div>}

          <div className="adm-login__demo">
            Phiên bản demo · Nhập bất kỳ mật khẩu nào để vào
          </div>
        </form>
      </div>
    </div>
  );
}
