import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import { useSiteContent } from "../hooks/useSiteContent";

export default function FaqPage() {
  const content = useSiteContent();
  return (
    <main className="container page-block">
      <Seo
        title="Cau hoi thuong gap | ZWCAD Vietnam"
        description="Tong hop cau hoi thuong gap ve san pham, ban quyen va ho tro ZWCAD."
        keywords="faq zwcad, ho tro zwcad"
      />
      <h1>Cau hoi thuong gap</h1>
      <h2>Danh sach FAQ</h2>
      {content.faq.map((faq) => (
        <article key={faq.slug} className="card page-list-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
          <Link to={`/cau-hoi-thuong-gap/${faq.slug}`}>Xem chi tiet</Link>
        </article>
      ))}
    </main>
  );
}
