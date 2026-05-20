import { useState } from "react";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import { useSiteContent } from "../../hooks/useSiteContent";
import { PublicApi } from "@/lib/publicApi";
import "./ContactSection.css";

type FormState = { name: string; phone: string; email: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

const INITIAL: FormState = { name: "", phone: "", email: "", message: "" };

export default function ContactSection() {
  const content = useSiteContent();
  const { placeholders, submit } = content.contact.form;

  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Vui lòng nhập đầy đủ họ tên, email và nội dung.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      await PublicApi.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      });
      setStatus("success");
      setForm(INITIAL);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Gửi thất bại, vui lòng thử lại.");
    }
  }

  return (
    <Section id="contact" className="contact-section">
      <SectionTitle>{content.contact.title}</SectionTitle>
      <div className="contact-section__wrap">
        <div className="contact-section__info">
          <h3>{content.contact.company}</h3>
          {content.contact.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <form className="contact-section__form" onSubmit={handleSubmit}>
          <input type="text" placeholder={placeholders[0]} value={form.name} onChange={set("name")} />
          <input type="text" placeholder={placeholders[1]} value={form.phone} onChange={set("phone")} />
          <input type="email" placeholder={placeholders[2]} value={form.email} onChange={set("email")} />
          <textarea rows={4} placeholder={placeholders[3]} value={form.message} onChange={set("message")} />
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Đang gửi..." : submit}
          </button>
          {status === "success" && <p style={{ color: "#2e7d32", marginTop: 8 }}>Đã gửi! Chúng tôi sẽ liên hệ lại sớm.</p>}
          {status === "error" && <p style={{ color: "crimson", marginTop: 8 }}>{errorMsg}</p>}
        </form>
      </div>
    </Section>
  );
}
