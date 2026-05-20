import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Seo from "../../seo/Seo";
import { PublicApi, useFetch, useLang, pick, type FaqDto } from "@/lib/publicApi";
import "./FaqDetailPage.css";

export default function FaqDetailPage() {
  const { slug } = useParams();
  const lang = useLang();
  const { data, loading } = useFetch<FaqDto[]>(() => PublicApi.faq(), []);
  const faq = useMemo(() => (data ?? []).find((item) => item.slug === slug), [slug, data]);

  if (loading) {
    return <main className="container faq-detail-page"><p>Đang tải...</p></main>;
  }

  if (!faq) {
    return (
      <main className="container faq-detail-page">
        <h1>Cau hoi khong ton tai</h1>
      </main>
    );
  }

  const question = pick(faq, "question", lang);
  const answer = pick(faq, "answer", lang);

  return (
    <main className="container faq-detail-page">
      <Seo
        title={`${question} | ZWCAD Vietnam`}
        description={answer}
        keywords="chi tiet faq zwcad"
      />
      <h1>{question}</h1>
      <h2>Chi tiet cau hoi thuong gap</h2>
      <p>{answer}</p>
      <h3>Luu y</h3>
      <p>Neu can ho tro nhanh, vui long lien he hotline FocusTech.</p>
    </main>
  );
}
