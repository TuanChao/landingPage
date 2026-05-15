import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routesName from "~routes/enum.routes";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./HeroProductsSlider.css";

interface ProductSlide {
  name: string;
  tagline: string;
  href: string;
  pricingHref: string;
  img: string;
}

const SLIDES: ProductSlide[] = [
  {
    name: "ZWCAD",
    tagline: "ZWCAD - DWG-Compatible CAD for Better Productivity",
    href: routesName.SAN_PHAM_ZWCAD,
    pricingHref: routesName.SAN_PHAM_ZWCAD,
    img: "/image-zwcad/zwcad/bg-section.png",
  },
  {
    name: "ZW3D",
    tagline: "ZW3D - Affordable All-in-One 3D CAD/CAE/CAM",
    href: routesName.SAN_PHAM_ZW3D,
    pricingHref: routesName.SAN_PHAM_ZW3D,
    img: "/zw3dhomebanner.jpg",
  },
  {
    name: "ZWCAD MFG",
    tagline: "ZWCAD MFG - Advanced 2D CAD for Manufacturing",
    href: routesName.SAN_PHAM_ZWCAD_MFG,
    pricingHref: routesName.SAN_PHAM_ZWCAD_MFG,
    img: "/zwcad-mfg/zwcad-mfg-2026.jpg",
  },
];

const AUTO_INTERVAL = 7000;

export default function HeroProductsSlider() {
  const content = useSiteContent();
  const sliderDescs = content.slider;
  const ui = content.ui.slider;

  const [active, setActive] = useState(0);
  const [activations, setActivations] = useState<number[]>(SLIDES.map(() => 1));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setActive((cur) => {
        const next = (cur + 1) % SLIDES.length;
        setActivations((prev) => {
          const a = [...prev];
          a[next]++;
          return a;
        });
        return next;
      });
    }, AUTO_INTERVAL);
    return () => window.clearInterval(t);
  }, [paused]);

  const goTo = (i: number) => {
    const idx = ((i % SLIDES.length) + SLIDES.length) % SLIDES.length;
    if (idx === active) return;
    setActive(idx);
    setActivations((prev) => {
      const a = [...prev];
      a[idx]++;
      return a;
    });
  };

  return (
    <div
      className={`hps${paused ? " is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slider viewport */}
      <div className="hps-viewport">
        <div
          className="hps-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((s, i) => (
            <article key={s.name} className="hps-slide">
              {/* Full-bleed background image */}
              <img
                key={`img-${i}-${activations[i]}`}
                src={s.img}
                alt={s.name}
                className="hps-slide__img"
              />
              {/* Gradient overlay */}
              <div className="hps-slide__overlay" />

              {/* Text content */}
              <div className="container hps-slide__body">
                <div
                  key={`inner-${i}-${activations[i]}`}
                  className="hps-slide__inner"
                >
                  <h2 className="hps-slide__title">{s.tagline}</h2>
                  <p className="hps-slide__desc">{sliderDescs[i]?.desc ?? ""}</p>
                  <div className="hps-slide__btns">
                    <Link to={s.href} className="hps-btn hps-btn--primary">
                      {ui.learnMore}
                    </Link>
                    <Link to={s.pricingHref} className="hps-btn hps-btn--ghost">
                      {ui.pricing}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom tab nav — nằm absolute bên trong banner */}
      <nav className="hps-bottom">
        <div className="hps-bottom__inner">
        {SLIDES.map((s, i) => (
          <button
            key={s.name}
            type="button"
            className={`hps-tab${i === active ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          >
            {i === active && (
              <span
                key={`bar-${i}-${activations[i]}`}
                className="hps-tab__bar"
              />
            )}
            <span className="hps-tab__text">{s.tagline}</span>
          </button>
        ))}
        </div>
      </nav>
    </div>
  );
}
