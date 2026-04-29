import Seo from "../../seo/Seo";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./ContactPage.css";

export default function ContactPage() {
  const content = useSiteContent();
  const { placeholders, submit } = content.contact.form;

  return (
    <main className="container contact-page">
      <Seo
        title="Lien he | ZWCAD Vietnam"
        description="Lien he FocusTech de duoc tu van san pham va trien khai ZWCAD."
        keywords="lien he zwcad, focustech, tu van cad"
      />
      <h1>{content.contact.title}</h1>
      <h2>{content.contact.company}</h2>
      <div className="contact-page__wrap">
        <article className="card contact-page__info">
          {content.contact.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>
        <form className="contact-page__form">
          <input type="text" placeholder={placeholders[0]} />
          <input type="text" placeholder={placeholders[1]} />
          <input type="email" placeholder={placeholders[2]} />
          <textarea rows={4} placeholder={placeholders[3]} />
          <button type="button" className="btn btn-primary">
            {submit}
          </button>
        </form>
      </div>
    </main>
  );
}

