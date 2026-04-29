import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./NewsDetailPage.css";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const content = useSiteContent();
  const article = useMemo(() => content.news.find((n) => n.slug === slug), [slug, content.news]);

  if (!article) {
    return (
      <main className="container news-detail-page">
        <h1>Tin tuc khong ton tai</h1>
      </main>
    );
  }

  return (
    <main className="container news-detail-page">
      <Seo
        title={`${article.title} | ZWCAD Vietnam`}
        description={article.excerpt}
        keywords="chi tiet tin tuc zwcad"
      />
      <h1>{article.title}</h1>
      <h2>Chi tiet tin tuc</h2>
      <p>{article.excerpt}</p>
      <h3>Noi dung chinh</h3>
      <p>
        Day la trang chi tiet tin tuc. Ban co the thay noi dung thuc te tu CMS hoac API
        khi trien khai backend.
      </p>
    </main>
  );
}
