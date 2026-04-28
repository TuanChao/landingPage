import { Card } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function SupportSection() {
  const content = useSiteContent();
  return (
    <section className="section container">
      <SectionTitle>Ho tro va FAQ</SectionTitle>
      <div className="grid-4">
        {content.faq.map((item) => (
          <Card key={item.slug} className="p-4">
            <h3>{item.question}</h3>
          </Card>
        ))}
      </div>
    </section>
  );
}
