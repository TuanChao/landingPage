import { Card } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function FeatureSection() {
  const content = useSiteContent();
  return (
    <section id="features" className="section container">
      <SectionTitle>Danh muc san pham noi bat</SectionTitle>
      <div className="grid-4">
        {content.products.map((item) => (
          <Card key={item.title} className="p-4">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
