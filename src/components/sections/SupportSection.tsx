import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SupportSection() {
  const content = useSiteContent();
  const [openSlug, setOpenSlug] = useState<string | null>(content.faq[0]?.slug ?? null);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <SectionTitle>Câu hỏi thường gặp</SectionTitle>
          <Link to="/cau-hoi-thuong-gap" className="section-more">Xem tất cả →</Link>
        </div>
        <div className="faq-list">
          {content.faq.map((item) => {
            const isOpen = openSlug === item.slug;
            return (
              <div key={item.slug} className={`faq-item ${isOpen ? "faq-open" : ""}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <div className="faq-answer">{item.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
