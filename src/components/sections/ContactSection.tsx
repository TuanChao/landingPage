import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./ContactSection.css";

export default function ContactSection() {
  const content = useSiteContent();
  const { placeholders, submit } = content.contact.form;

  return (
    <section id="contact" className="contact-section container">
      <SectionTitle>{content.contact.title}</SectionTitle>
      <div className="contact-section__wrap">
        <div className="contact-section__info">
          <h3>{content.contact.company}</h3>
          {content.contact.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <form className="contact-section__form">
          <input type="text" placeholder={placeholders[0]} />
          <input type="text" placeholder={placeholders[1]} />
          <input type="email" placeholder={placeholders[2]} />
          <textarea rows={4} placeholder={placeholders[3]} />
          <button type="button" className="btn btn-primary">
            {submit}
          </button>
        </form>
      </div>
    </section>
  );
}
