import "./AwardSection.css";

const IMG = "/image-zwcad";
const ZW3D = "/zw3d";

const badges = [
  { src: `${ZW3D}/gridleader.png`,          alt: "G2 Grid Leader Spring 2025" },
  { src: `${ZW3D}/gridleadersummer.png`,    alt: "G2 Grid Leader Summer 2025" },
  { src: `${IMG}/lpyeah2025/easiest`,       alt: "G2 Easiest To Use" },
];

export default function AwardSection() {
  return (
    <section className="aw-section">
      <div className="container">
        <div className="aw-card">
          <div className="aw-left">
            <h2 className="aw-title">Recognized for excellence and innovation</h2>
            <p className="aw-desc">
              Named to G2's 2025 Best Software Awards, ranking among the top 50 in CAD &amp; PLM Products.
            </p>
          </div>
          <div className="aw-badges">
            {badges.map((b) => (
              <img key={b.alt} src={b.src} alt={b.alt} className="aw-badge" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
