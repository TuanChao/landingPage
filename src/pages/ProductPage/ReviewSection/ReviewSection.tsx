import "./ReviewSection.css";

const IMG = "/image-zwcad";

const reviews = [
  {
    name: "Ag Hamzah K.",
    role: "Senior Draftsman",
    avatar: `${IMG}/lpyeah2025/person1`,
    quote:
      "ZWCAD's one-time license and Smart Plot makes it a standout AutoCAD alternative for my daily drafting work.",
  },
  {
    name: "Lisa F.",
    role: "Senior Designer",
    avatar: `${IMG}/lpyeah2025/person2`,
    quote:
      "Efficient, time saving for handling many drawings; ZWCAD is lightweight and keeps me productive.",
  },
  {
    name: "Mat K.",
    role: "Design Consultant",
    avatar: `${IMG}/lpyeah2025/person3`,
    quote:
      "Cost-effective and user-friendly solution for SMEs; we rely on ZWCAD's perpetual license for daily work.",
  },
];

function Stars() {
  return (
    <span className="rv-stars" aria-label="5 stars">
      {"★★★★★"}
    </span>
  );
}

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
              <div className="rv-quot">"</div>
              <p className="rv-quote">{r.quote}</p>
              <div className="rv-footer">
                <Stars />
                <span className="rv-score"><b>5</b> out of <b>5</b></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
