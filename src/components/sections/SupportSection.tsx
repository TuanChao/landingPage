import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./SupportSection.css";

export default function SupportSection() {
  const content = useSiteContent();
  const [openSlug, setOpenSlug] = useState<string | null>(content.faq[0]?.slug ?? null);

  return (
    <Section className="support-section">
      <div className="support-section__head">
          <SectionTitle>C�u h?i th�?ng g?p</SectionTitle>
          <Link to="/cau-hoi-thuong-gap" className="support-section__more">Xem t?t c? ?</Link>
        </div>
        <div className="support-section__faq">
          {content.faq.map((item) => {
            const isOpen = openSlug === item.slug;
            return (
              <div key={item.slug} className={`support-section__item ${isOpen ? "support-section__item--open" : ""}`}>
                <button
                  type="button"
                  className="support-section__trigger"
                  onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="support-section__icon" aria-hidden="true">{isOpen ? "?" : "+"}</span>
                </button>
                {isOpen && <div className="support-section__answer">{item.answer}</div>}
              </div>
            );
          })}
        </div>
    </Section>
  );
}
