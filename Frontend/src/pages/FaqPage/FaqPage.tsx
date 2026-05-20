import { useEffect, useState } from "react";
import Seo from "../../seo/Seo";
import { PublicApi, useFetch, useLang, pick, type FaqDto } from "@/lib/publicApi";
import "./FaqPage.css";

export default function FaqPage() {
  const lang = useLang();
  const { data, loading, error } = useFetch<FaqDto[]>(() => PublicApi.faq(), []);
  const items = (data ?? []).slice().sort((a, b) => a.order - b.order);

  const [openSlug, setOpenSlug] = useState<string | null>(null);
  useEffect(() => {
    if (openSlug == null && items.length > 0) setOpenSlug(items[0].slug);
  }, [items, openSlug]);

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
        {loading && <p>Đang tải...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <div className="faq-list">
          {items.map((item) => {
            const isOpen = openSlug === item.slug;
            const question = pick(item, "question", lang);
            const answer = pick(item, "answer", lang);
            return (
              <div key={item.id} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
                <button
                  className="faq-item__q"
                  onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                  aria-expanded={isOpen}
                >
                  <span>{question}</span>
                  <svg className="faq-item__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="faq-item__a">
                    <p>{answer}</p>
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
