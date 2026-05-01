import { useState } from "react";
import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./FaqPage.css";

export default function FaqPage() {
  const content = useSiteContent();
  const [openSlug, setOpenSlug] = useState<string | null>(content.faq[0]?.slug ?? null);

  return (
    <main className="faq-page">
      <Seo
        title="Câu hỏi thường gặp | ZWCAD Vietnam"
        description="Tổng hợp câu hỏi thường gặp về sản phẩm, bản quyền và hỗ trợ ZWCAD."
        keywords="faq zwcad, ho tro zwcad"
      />

      <div className="faq-hero">
        <div className="container">
          <h1 className="faq-hero__title">Câu hỏi thường gặp</h1>
          <p className="faq-hero__sub">Giải đáp nhanh các thắc mắc về sản phẩm, bản quyền và hỗ trợ kỹ thuật.</p>
        </div>
      </div>

      <div className="container faq-body">
        <div className="faq-list">
          {content.faq.map((item) => {
            const isOpen = openSlug === item.slug;
            return (
              <div key={item.slug} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
                <button
                  className="faq-item__q"
                  onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <svg className="faq-item__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="faq-item__a">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
