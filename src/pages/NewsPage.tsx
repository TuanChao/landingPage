import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import { useSiteContent } from "../hooks/useSiteContent";

export default function NewsPage() {
  const content = useSiteContent();
  return (
    <main className="container page-block">
      <Seo
        title="Tin tuc | ZWCAD Vietnam"
        description="Cap nhat tin tuc, su kien va bai viet ve phan mem ZWCAD."
        keywords="tin tuc zwcad, zwcad viet nam"
      />
      <h1>Tin tuc</h1>
      <h2>Cap nhat moi nhat</h2>
      {content.news.map((item) => (
        <article key={item.slug} className="card page-list-item">
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
          <Link to={`/tin-tuc/${item.slug}`}>Xem chi tiet</Link>
        </article>
      ))}
    </main>
  );
}
