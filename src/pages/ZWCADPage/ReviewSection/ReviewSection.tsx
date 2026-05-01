import "./ReviewSection.css";

const CDN = "https://zwcdn.zwsoft.com/web/lp_year_in_review_2025/img";
const STAR_GRAY   = "https://statics.zwsoft.com/static/style2020/images/3d_ov_2025/3d_ov-star-gray.png";
const STAR_YELLOW = "https://statics.zwsoft.com/static/style2020/images/3d_ov_2025/3d_ov-star1.png";

const reviews = [
  {
    name: "Ssasb A.",
    role: "Mechanical Engineering CAD",
    avatar: `${CDN}/rd_person4.png`,
    quote: "ZW3D Brings together CAD and CAM in one platform, making design and manufacturing much more efficient.",
    score: 5,
    pct: "106.667%",
  },
  {
    name: "Zulfadhli H.",
    role: "Technical Manager",
    avatar: `${CDN}/rd_person5.png`,
    quote: "ZW3D Offers a powerful file translator that handles multiple formats efficiently and helps with cross-platform collaboration.",
    score: 4.5,
    pct: "92.6667%",
  },
  {
    name: "Syed R.",
    role: "Design Engineer",
    avatar: `${CDN}/rd_person6.png`,
    quote: "ZW3D is user-friendly and much similar to NX. I have never faced difficulties in modelling, most of commands works without glitches.",
    score: 4.5,
    pct: "92.6667%",
  },
];

export default function ReviewSection() {
  return (
    <section className="rv-section">
      <div className="container">
        <div className="rv-grid">
          {reviews.map((r) => (
            <article key={r.name} className="rv-card">
              <div className="rv-header">
                <img src={r.avatar} alt={r.name} className="rv-avatar" />
                <div>
                  <div className="rv-name">{r.name}</div>
                  <div className="rv-role">{r.role}</div>
                </div>
              </div>
              <div className="rv-quot"><img src="https://statics.zwsoft.com/static/style2020/images/3d_ov_2025/3d_ov28.png" alt="" /></div>
              <p className="rv-quote">{r.quote}</p>
              <div className="rv-footer">
                <div className="rv-star-wrap">
                  <img src={STAR_GRAY} alt="" className="rv-star-gray" />
                  <div className="rv-star-box" style={{ width: r.pct }}>
                    <img src={STAR_YELLOW} alt="" className="rv-star-yellow" />
                  </div>
                </div>
                <span className="rv-score"><b>{r.score}</b> out of <b>5</b></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
