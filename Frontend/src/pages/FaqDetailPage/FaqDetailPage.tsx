import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./FaqDetailPage.css";

export default function FaqDetailPage() {
  const { slug } = useParams();
  const content = useSiteContent();
  const faq = useMemo(() => content.faq.find((item) => item.slug === slug), [slug, content.faq]);

  if (!faq) {
    return (
      <main className="container faq-detail-page">
        <h1>Cau hoi khong ton tai</h1>
      </main>
    );
  }

  return (
    <main className="container faq-detail-page">
      <Seo
        title={`${faq.question} | ZWCAD Vietnam`}
        description={faq.answer}
        keywords="chi tiet faq zwcad"
      />
      <h1>{faq.question}</h1>
      <h2>Chi tiet cau hoi thuong gap</h2>
      <p>{faq.answer}</p>
      <h3>Luu y</h3>
      <p>Neu can ho tro nhanh, vui long lien he hotline FocusTech.</p>
    </main>
  );
}
