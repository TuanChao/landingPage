import Seo from "../seo/Seo";
import { useLanguage } from "../contexts/LanguageContext";
import { useSiteContent } from "../hooks/useSiteContent";

export default function ContactPage() {
  const content = useSiteContent();
  const { language } = useLanguage();

  const placeholders =
    language === "vi"
      ? ["Ho va ten", "So dien thoai", "Email", "Nhu cau cua ban"]
      : language === "en"
        ? ["Full name", "Phone number", "Email", "Your requirement"]
        : ["Xing ming", "Dian hua hao ma", "You xiang", "Nin de xu qiu"];

  const submitLabel =
    language === "vi" ? "Gui thong tin" : language === "en" ? "Submit" : "Ti jiao xin xi";

  return (
    <main className="container page-block">
      <Seo
        title="Lien he | ZWCAD Vietnam"
        description="Lien he FocusTech de duoc tu van san pham va trien khai ZWCAD."
        keywords="lien he zwcad, focustech, tu van cad"
      />
      <h1>{content.contact.title}</h1>
      <h2>{content.contact.company}</h2>
      <div className="contact-wrap">
        <article className="card p-6">
          {content.contact.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>
        <form className="form">
          <input type="text" placeholder={placeholders[0]} />
          <input type="text" placeholder={placeholders[1]} />
          <input type="email" placeholder={placeholders[2]} />
          <textarea rows={4} placeholder={placeholders[3]} />
          <button type="button" className="btn btn-primary">
            {submitLabel}
          </button>
        </form>
      </div>
    </main>
  );
}
