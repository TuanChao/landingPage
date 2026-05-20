import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../../hooks/useSiteContent";
import { PublicApi, useFetch, useLang, pick, type BannerDto } from "@/lib/publicApi";
import "./HeroProductsSlider.css";

const AUTO_INTERVAL = 7000;

export default function HeroProductsSlider() {
  const content = useSiteContent();
  const ui = content.ui.slider;
  const lang = useLang();
  const { data: banners, loading, error } = useFetch<BannerDto[]>(() => PublicApi.banners(), []);

  const slides = useMemo(() => {
    const list = (banners ?? []).filter((b) => b.active).sort((a, b) => a.order - b.order);
    return list.map((b) => ({
      id: b.id,
      title: pick(b, "title", lang),
      desc: pick(b, "subtitle", lang),
      ctaLabel: pick(b, "ctaLabel", lang) || ui.learnMore,
      href: b.ctaHref || "#",
      img: b.image,
    }));
  }, [banners, lang, ui.learnMore]);

  const [active, setActive] = useState(0);
  const [activations, setActivations] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);

  // Reset activations khi số lượng slide thay đổi
  useEffect(() => {
    setActivations(slides.map(() => 1));
    setActive(0);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = window.setInterval(() => {
      setActive((cur) => {
        const next = (cur + 1) % slides.length;
        setActivations((prev) => {
          const a = [...prev];
          a[next] = (a[next] ?? 0) + 1;
          return a;
        });
        return next;
      });
    }, AUTO_INTERVAL);
    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  const goTo = (i: number) => {
    if (slides.length === 0) return;
    const idx = ((i % slides.length) + slides.length) % slides.length;
    if (idx === active) return;
    setActive(idx);
    setActivations((prev) => {
      const a = [...prev];
      a[idx] = (a[idx] ?? 0) + 1;
      return a;
    });
  };

  if (loading || slides.length === 0) {
    return (
      <div className="hps hps--placeholder">
        <div className="hps-viewport">
          <div className="hps-slide hps-slide--empty">
            {error && <p style={{ color: "#fff", padding: 24 }}>{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`hps${paused ? " is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hps-viewport">
        <div className="hps-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((s, i) => (
            <article key={s.id} className="hps-slide">
              <img
                key={`img-${i}-${activations[i] ?? 0}`}
                src={s.img}
                alt={s.title}
                className="hps-slide__img"
              />
              <div className="hps-slide__overlay" />
              <div className="container hps-slide__body">
                <div key={`inner-${i}-${activations[i] ?? 0}`} className="hps-slide__inner">
                  <h2 className="hps-slide__title">{s.title}</h2>
                  <p className="hps-slide__desc">{s.desc}</p>
                  <div className="hps-slide__btns">
                    <Link to={s.href} className="hps-btn hps-btn--primary">
                      {s.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <nav className="hps-bottom">
        <div className="hps-bottom__inner">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`hps-tab${i === active ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            >
              {i === active && (
                <span key={`bar-${i}-${activations[i] ?? 0}`} className="hps-tab__bar" />
              )}
              <span className="hps-tab__text">{s.title}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
