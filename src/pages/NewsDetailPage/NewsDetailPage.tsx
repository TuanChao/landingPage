import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./NewsDetailPage.css";

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function readTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const PLACEHOLDER_BODY = (title: string, excerpt: string) => `
<p class="ndp-lead">${excerpt}</p>

<h2>Tổng quan</h2>
<p>Trong bối cảnh ngành thiết kế kỹ thuật ngày càng đòi hỏi tốc độ và độ chính xác cao hơn, ZWSOFT liên tục cải tiến bộ sản phẩm của mình để đáp ứng nhu cầu thực tế của người dùng. Bài viết này sẽ giúp bạn hiểu rõ hơn về ${title.toLowerCase()} và những lợi ích thiết thực mà nó mang lại cho doanh nghiệp.</p>

<p>Với hơn 20 năm kinh nghiệm phát triển phần mềm CAD, ZWSOFT đã xây dựng được một hệ sinh thái công cụ thiết kế toàn diện, từ 2D drafting đến 3D CAD/CAE/CAM, giúp các kỹ sư và nhà thiết kế làm việc hiệu quả hơn trong mọi giai đoạn của quy trình sản xuất.</p>

<h2>Những điểm nổi bật chính</h2>
<p>Phiên bản mới nhất mang đến nhiều cải tiến đáng kể, bao gồm:</p>
<ul>
  <li><strong>Hiệu suất được cải thiện:</strong> Tốc độ xử lý nhanh hơn tới 30% so với phiên bản trước, giúp làm việc mượt mà hơn ngay cả với các file DWG lớn và phức tạp.</li>
  <li><strong>Giao diện thân thiện:</strong> Được thiết kế lại với UX hiện đại, giảm thời gian làm quen và tăng năng suất làm việc ngay từ ngày đầu tiên.</li>
  <li><strong>Tương thích cao:</strong> Hỗ trợ đầy đủ định dạng DWG, DXF và nhiều format phổ biến khác, đảm bảo khả năng trao đổi dữ liệu liền mạch với các hệ thống CAD khác.</li>
  <li><strong>Công cụ thông minh:</strong> Tích hợp các tính năng AI hỗ trợ tự động hóa các tác vụ lặp lại, giúp tiết kiệm thời gian đáng kể trong quá trình thiết kế.</li>
</ul>

<h2>Ứng dụng thực tế</h2>
<p>Nhiều doanh nghiệp tại Việt Nam đã và đang sử dụng giải pháp này trong các lĩnh vực xây dựng, cơ khí, kiến trúc và sản xuất công nghiệp. Theo khảo sát từ FocusTech, hơn 85% người dùng báo cáo tăng năng suất đáng kể sau 3 tháng sử dụng.</p>

<p>Đặc biệt, với chi phí bản quyền hợp lý so với các đối thủ cạnh tranh, ZWCAD ngày càng trở thành lựa chọn ưu tiên cho các doanh nghiệp vừa và nhỏ muốn tối ưu chi phí vận hành mà vẫn đảm bảo chất lượng công việc.</p>

<blockquote>"Chuyển sang sử dụng ZWCAD là quyết định đúng đắn nhất của chúng tôi trong năm qua. Không chỉ tiết kiệm chi phí, năng suất thiết kế của đội ngũ cũng tăng rõ rệt."<cite>— Nguyễn Văn Minh, Giám đốc kỹ thuật, Công ty Cổ phần Xây dựng ABC</cite></blockquote>

<h2>Hướng dẫn bắt đầu</h2>
<p>Để trải nghiệm sản phẩm trước khi quyết định đầu tư, FocusTech cung cấp bản dùng thử miễn phí 30 ngày đầy đủ tính năng. Bạn chỉ cần điền thông tin đăng ký và tải về — không cần thẻ tín dụng.</p>

<p>Đội ngũ kỹ thuật của FocusTech luôn sẵn sàng hỗ trợ cài đặt, đào tạo và giải đáp mọi thắc mắc trong suốt quá trình sử dụng. Chúng tôi có văn phòng tại cả Hà Nội và TP.HCM, đảm bảo phục vụ khách hàng trên toàn quốc.</p>
`;

export default function NewsDetailPage() {
  const { slug } = useParams();
  const content = useSiteContent();

  const article = useMemo(
    () => content.news.find((n) => n.slug === slug),
    [slug, content.news]
  );

  const related = useMemo(
    () => content.news.filter((n) => n.slug !== slug).slice(0, 4),
    [slug, content.news]
  );

  if (!article) {
    return (
      <main className="container ndp-notfound">
        <h1>Bài viết không tồn tại</h1>
        <Link to="/tin-tuc">← Quay lại tin tức</Link>
      </main>
    );
  }

  const bodyHtml = article.body ?? PLACEHOLDER_BODY(article.title, article.excerpt);
  const minutes = readTime(article.excerpt + bodyHtml.replace(/<[^>]+>/g, " "));

  return (
    <>
      <Seo
        title={`${article.title} | ZWCAD Vietnam`}
        description={article.excerpt}
        keywords={`${article.category ?? "tin tuc"}, zwcad vietnam`}
      />

      {/* ── Banner ── */}
      <div className="ndp-banner">
        {article.image ? (
          <img src={article.image} alt={article.title} className="ndp-banner__img" />
        ) : (
          <img
            src="/image-zwcad/news/banner-city.png"
            alt=""
            className="ndp-banner__img"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        )}
      </div>

      <div className="container ndp-wrap">

        {/* ── Breadcrumb ── */}
        <nav className="ndp-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/tin-tuc">Tin tức</Link>
          <span>/</span>
          <span className="ndp-bc-current">{article.title}</span>
        </nav>

        <div className="ndp-layout">

          {/* ── Main article ── */}
          <article className="ndp-main">

            {article.category && (
              <span className="ndp-cat">{article.category}</span>
            )}

            <h1 className="ndp-title">{article.title}</h1>

            <div className="ndp-meta">
              <span className="ndp-meta__author">
                <img src="/image-zwcad/news/avatar-default.png" alt="" className="ndp-meta__avatar"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {article.author ?? "FocusTech"}
              </span>
              {article.date && (
                <span className="ndp-meta__date">{formatDate(article.date)}</span>
              )}
              <span className="ndp-meta__read">{minutes} phút đọc</span>
            </div>

            <div className="ndp-divider" />

            <div
              className="ndp-body"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            <div className="ndp-divider" />

            {/* ── Tags ── */}
            <div className="ndp-tags">
              <span className="ndp-tags__label">Tags:</span>
              {["ZWCAD", article.category ?? "Phần mềm CAD", "Thiết kế kỹ thuật", "FocusTech"].map((t) => (
                <span key={t} className="ndp-tag">{t}</span>
              ))}
            </div>

            {/* ── Share ── */}
            <div className="ndp-share">
              <span className="ndp-share__label">Chia sẻ:</span>
              <a href="#" className="ndp-share__btn ndp-share__fb" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </a>
              <a href="#" className="ndp-share__btn ndp-share__tw" aria-label="Twitter/X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l16 16M4 20L20 4"/></svg>
                Twitter
              </a>
              <a href="#" className="ndp-share__btn ndp-share__li" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>

            {/* ── Prev / Next ── */}
            <div className="ndp-nav">
              {related[0] && (
                <Link to={`/tin-tuc/${related[0].slug}`} className="ndp-nav__btn ndp-nav__prev">
                  <span className="ndp-nav__dir">← Bài trước</span>
                  <span className="ndp-nav__ttl">{related[0].title}</span>
                </Link>
              )}
              {related[1] && (
                <Link to={`/tin-tuc/${related[1].slug}`} className="ndp-nav__btn ndp-nav__next">
                  <span className="ndp-nav__dir">Bài tiếp →</span>
                  <span className="ndp-nav__ttl">{related[1].title}</span>
                </Link>
              )}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="ndp-sidebar">

            {/* CTA box */}
            <div className="ndp-cta-box">
              <div className="ndp-cta-box__icon">🚀</div>
              <h3 className="ndp-cta-box__title">Dùng thử miễn phí</h3>
              <p className="ndp-cta-box__desc">30 ngày trải nghiệm đầy đủ tính năng, không cần thẻ tín dụng.</p>
              <a href="/tai-ve" className="ndp-cta-box__btn">Tải về ngay</a>
              <a href="/lien-he" className="ndp-cta-box__link">Liên hệ tư vấn</a>
            </div>

            {/* Related articles */}
            <div className="ndp-related">
              <h3 className="ndp-related__title">Bài viết liên quan</h3>
              <div className="ndp-related__list">
                {related.map((r) => (
                  <Link key={r.slug} to={`/tin-tuc/${r.slug}`} className="ndp-rel-card">
                    <div className="ndp-rel-card__thumb">
                      {r.image ? (
                        <img src={r.image} alt={r.title} />
                      ) : (
                        <div className="ndp-rel-card__noimg" />
                      )}
                    </div>
                    <div className="ndp-rel-card__body">
                      {r.category && <span className="ndp-rel-card__cat">{r.category}</span>}
                      <div className="ndp-rel-card__title">{r.title}</div>
                      {r.date && <div className="ndp-rel-card__date">{formatDate(r.date)}</div>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </>
  );
}
