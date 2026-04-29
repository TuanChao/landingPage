import { Link } from "react-router-dom";
import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./DownloadPage.css";

export default function DownloadPage() {
  const content = useSiteContent();
  return (
    <main className="container download-page">
      <Seo
        title="Tai ve | ZWCAD Vietnam"
        description="Tong hop bo cai thu nghiem va tai nguyen tai ve cho ZWCAD, CADbro."
        keywords="tai ve zwcad, cadbro trial, download zwcad"
      />
      <h1>Tai ve</h1>
      <h2>Danh sach bo cai va tai nguyen</h2>
      {content.downloads.map((item) => (
        <article key={item.slug} className="download-page__item">
          <h3>{item.name}</h3>
          <p>Phien ban: {item.version}</p>
          <Link to={`/tai-ve/${item.slug}`}>Xem chi tiet</Link>
        </article>
      ))}
    </main>
  );
}
