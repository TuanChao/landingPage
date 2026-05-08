import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import routesName from "~routes/enum.routes";
import "./HeroProductsSlider.css";

interface ProductSlide {
  name: string;
  tagline: string;
  desc: string;
  href: string;
  logo: string;
  bg: string;
  accent: string;
}

const SLIDES: ProductSlide[] = [
  {
    name: "ZWCAD",
    tagline: "Create Amazing Things",
    desc: "Phần mềm CAD 2D/3D tương thích DWG, hiệu năng cao với chi phí tối ưu cho mọi doanh nghiệp.",
    href: routesName.SAN_PHAM_ZWCAD,
    logo: "/zwcad-mfg/zwcad.png",
    bg: "/image-zwcad/zwcad/bg-section.png",
    accent: "#0d1f4e",
  },
  {
    name: "ZW3D",
    tagline: "Unify Design, Simulation & Manufacturing",
    desc: "Giải pháp CAD/CAM 3D toàn diện cho thiết kế và gia công cơ khí, hợp nhất quy trình từ ý tưởng tới sản phẩm.",
    href: routesName.SAN_PHAM_ZW3D,
    logo: "/image-zwcad/logo/zwc3d",
    bg: "/public/zw3dhomebanner.jpg",
    accent: "#1762e7",
  },
  {
    name: "ZWCAD MFG",
    tagline: "Advanced 2D CAD for Manufacturing",
    desc: "ZWCAD chuyên biệt cho ngành sản xuất với bộ công cụ MFG tích hợp, tăng năng suất tới 51%.",
    href: routesName.SAN_PHAM_ZWCAD_MFG,
    logo: "/image-zwcad/logo/zwcadmfg",
    bg: "https://zwcdn.zwsoft.com/web/images/zwcad_mfg_ov/zwcad-mfg-2026.jpg",
    accent: "#005BFE",
  },
];

const AUTO_INTERVAL = 8000;

export default function HeroProductsSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, AUTO_INTERVAL);
    return () => window.clearInterval(t);
  }, [paused]);

  const goTo = (i: number) => setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

  return (
    <section
      className={`hps${paused ? " is-paused" : ""}`}
      aria-label="Sản phẩm nổi bật"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hps-viewport">
        <div
          ref={trackRef}
          className="hps-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((s) => (
            <article
              key={s.name}
              className="hps-slide"
              style={{ backgroundImage: `url('${s.bg}')` }}
            >
              <div className="hps-slide__overlay" />
              <div className="container">
                <div className="hps-slide__inner">
                  <div className="hps-slide__brand">
                    <div className="hps-slide__logo">
                      <img src={s.logo} alt={s.name} />
                    </div>
                    <span className="hps-slide__name">{s.name}</span>
                  </div>
                  <h2 className="hps-slide__title">{s.tagline}</h2>
                  <p className="hps-slide__desc">{s.desc}</p>
                  <Link to={s.href} className="hps-slide__cta" style={{ background: s.accent }}>
                    Khám phá {s.name}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="hps-arrow hps-arrow--prev"
        onClick={() => goTo(active - 1)}
        aria-label="Slide trước"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        className="hps-arrow hps-arrow--next"
        onClick={() => goTo(active + 1)}
        aria-label="Slide kế"
      >
        <ChevronRight size={20} />
      </button>

      <div className="hps-dots" role="tablist">
        {SLIDES.map((s, i) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Sản phẩm ${s.name}`}
            className={`hps-dot${i === active ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
