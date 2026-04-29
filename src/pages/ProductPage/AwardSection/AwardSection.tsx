import "./AwardSection.css";

const IMG = "/image-zwcad";

const badges = [
  { src: `${IMG}/lpyeah2025/top50-cad-plm`, alt: "G2 Top 50 CAD PLM Products 2026" },
  { src: `${IMG}/lpyeah2025/top50-apac`,    alt: "G2 Top 50 APAC 2026" },
  { src: `${IMG}/lpyeah2025/easiest`,       alt: "G2 Easiest To Use Winter 2026" },
];

export default function AwardSection() {
  return (
    <section className="aw-section">
      <div className="container">
        <div className="aw-card">
          <div className="aw-left">
            <h2 className="aw-title">Lead with top recognition</h2>
            <p className="aw-desc">
              Named to G2's 2025 Best Software Awards, and ranks #1 in G2's Easiest to Use
              General-Purpose CAD.
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
