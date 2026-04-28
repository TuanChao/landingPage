import { Card } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function NewsSection() {
  const content = useSiteContent();
  return (
    <section className="section section-soft">
      <div className="container">
        <SectionTitle>Tin tuc</SectionTitle>
        <Card className="p-6">
          <ul className="news-list">
            {content.news.map((item) => (
              <li key={item.slug}>{item.title}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
