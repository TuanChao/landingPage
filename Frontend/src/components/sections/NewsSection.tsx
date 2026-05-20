import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSiteContent } from "../../hooks/useSiteContent";
import { PublicApi, useFetch, useLang, pick, type NewsDto } from "@/lib/publicApi";
import Section from "../ui/Section";
import "./NewsSection.css";

const LOCALE_MAP: Record<string, string> = { vi: "vi-VN", en: "en-US", zh: "zh-CN" };

function formatDate(dateStr: string | undefined | null, lang: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(LOCALE_MAP[lang] ?? "vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}

export default function NewsSection() {
  const content = useSiteContent();
  const { i18n } = useTranslation();
  const lang = useLang();
  const dateLang = i18n.resolvedLanguage ?? "vi";
  const { data, loading } = useFetch<NewsDto[]>(() => PublicApi.news(), []);

  const items = (data ?? []).slice(0, 8);

  return (
    <Section className="ns-section">
      <div className="ns-head">
        <h2 className="ns-title">{content.ui.news}</h2>
        <Link to="/tin-tuc" className="ns-more">{content.ui.viewAll}</Link>
      </div>

      {loading || items.length === 0 ? null : (
        <div className="ns-marquee">
          <div className="ns-track">
            {[...items, ...items].map((item, i) => {
              const title = pick(item, "title", lang);
              const excerpt = pick(item, "excerpt", lang);
              return (
                <Link key={`${item.id}-${i}`} to={`/tin-tuc/${item.slug}`} className="ns-card">
                  <div className="ns-card__thumb">
                    {item.image
                      ? <img src={item.image} alt={title} />
                      : <div className="ns-card__noimg" />
                    }
                  </div>
                  <div className="ns-card__body">
                    {item.category && <span className="ns-card__cat">{item.category}</span>}
                    <h3 className="ns-card__title">{title}</h3>
                    <p className="ns-card__excerpt">{excerpt}</p>
                    {item.publishedAt && <time className="ns-card__date">{formatDate(item.publishedAt, dateLang)}</time>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
}
