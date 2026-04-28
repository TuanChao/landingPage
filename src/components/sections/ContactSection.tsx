import { Card } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function ContactSection() {
  const content = useSiteContent();
  const { language } = useLanguage();

  const placeholders =
    language === "vi"
      ? ["Họ và tên", "Số điện thoại", "Email", "Nhu cầu của bạn"]
      : language === "en"
        ? ["Full name", "Phone number", "Email", "Your requirement"]
        : ["姓名", "电话号码", "邮箱", "您的需求"];

  return (
    <section id="contact" className="section container">
      <SectionTitle>{content.contact.title}</SectionTitle>
      <div className="contact-wrap">
        <Card className="p-6">
          <h3>{content.contact.company}</h3>
          {content.contact.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Card>

        <form className="form">
          <input type="text" placeholder={placeholders[0]} />
          <input type="text" placeholder={placeholders[1]} />
          <input type="email" placeholder={placeholders[2]} />
          <textarea rows={4} placeholder={placeholders[3]} />
          <button type="button" className="btn btn-primary">
            {language === "vi" ? "Gửi thông tin" : language === "en" ? "Submit" : "提交信息"}
          </button>
        </form>
      </div>
    </section>
  );
}
