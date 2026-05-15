import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import Seo from "../../seo/Seo";
import routesName from "~routes/enum.routes";
import { usePageContent } from "../../hooks/usePageContent";
import { zwcadMfgPageData } from "../../data/pages/zwcadMfgPageData";
import "./ZWCADMFGPage.css";

const CDN = "https://zwcdn.zwsoft.com/web/images/zwcad_mfg_ov";
const IMG = "/image-zwcad";

const relatedProductRoutes = [
  { to: routesName.SAN_PHAM_ZWCAD, logo: `${IMG}/logo/zwcadmb` },
  { to: routesName.SAN_PHAM_ZW3D,  logo: `${IMG}/logo/zwc3d` },
];

export default function ZWCADMFGPage() {
  const t = usePageContent(zwcadMfgPageData);

  const [videoOpen, setVideoOpen] = useState(false);

  // Testimonials slider
  const [diSlide, setDiSlide] = useState(0);
  const [diContW, setDiContW] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const DI_GAP = 20;
  const diSlideW = diContW * 0.65;
  const diOffset = diContW > 0
    ? -(diSlide * (diSlideW + DI_GAP)) + (diContW - diSlideW) / 2
    : 0;

  useEffect(() => {
    const update = () => {
      if (sliderRef.current) setDiContW(sliderRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDiSlide((p) => (p + 1) % t.chooseUs.testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [t.chooseUs.testimonials.length]);

  return (
    <>
      <Seo
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
      />

      {/* ── Hero Banner ── */}
      <div className="da-main">
        <div
          className="da-bg pc"
          style={{ backgroundImage: `url('${CDN}/zwcad-mfg-2026.jpg')` }}
        />
        <div
          className="da-bg phone"
          style={{ backgroundImage: `url('${CDN}/zwcad-mfg-2026-b.jpg')` }}
        />
        <div className="da-text">
          <div className="da-box">
            <div className="da-namebox">
              <div className="da-logo">
                <img src="https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png" alt="ZWCAD MFG" />
              </div>
              <h1 className="da-name d-bold">{t.hero.name}</h1>
            </div>
            <h2 className="da-titles d-bold">{t.hero.subtitle}</h2>
            <div className="da-textbox">
              <p><span className="da-nub d-bold">{t.hero.pricingLine1.split(",")[0]},</span>{" "}
                {t.hero.pricingLine1.split(",").slice(1).join(",").trim()}</p>
              <p>{t.hero.pricingLine2}</p>
            </div>
            <div className="da-buttom">
              <Link className="da-trial d-bold" to={routesName.TAI_VE}>{t.hero.trialBtn}</Link>
              <Link className="da-see d-bold white" to={routesName.LIEN_HE}>{t.hero.pricingBtn}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Video Modal ── */}
      {videoOpen && (
        <div className="mfg-modal" onClick={() => setVideoOpen(false)}>
          <div className="mfg-modal__inner" onClick={(e) => e.stopPropagation()}>
            <button className="mfg-modal__close" onClick={() => setVideoOpen(false)}>×</button>
            <iframe
              src="https://fast.wistia.net/embed/iframe/pmom8zvt2r?autoPlay=1"
              allowFullScreen
              className="mfg-modal__iframe"
              title={t.videoModalTitle}
            />
          </div>
        </div>
      )}

      {/* ── What's ZWCAD MFG ── */}
      <div className="db-main">
        <div className="db-inner">
          <div className="db-cont">
            <div className="db-left">
              <div className="db-imgbox" onClick={() => setVideoOpen(true)}>
                <div className="db-img">
                  <img src={`${CDN}/da24.png`} alt="ZWCAD MFG Overview" />
                </div>
                <div className="db-play" />
              </div>
            </div>
            <div className="db-right">
              <div className="db-titles d-bold">{t.what.sectionTag}</div>
              <h2 className="db-subtitle d-bold">
                {t.what.subtitleRest}<span className="db-span d-bold">{t.what.subtitleHighlight}</span>
              </h2>
              <p className="db-intro">
                {t.what.intro1}
              </p>
              <p className="db-intro" style={{ marginTop: 16 }}>
                {t.what.intro2}
              </p>
              <div className="db-btns">
                <Link className="db-btn-fill d-bold" to={routesName.TAI_VE}>{t.what.trialBtn}</Link>
                <Link className="db-btn-ghost" to={routesName.LIEN_HE}>{t.what.pricingBtn}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature 1: Standard parts library (card bg) ── */}
      <div className="dc-main">
        <div className="dc-inner">
          <div className="dc-cont">
            <div className="dc-left">
              <div className="dc-titles d-bold">{t.feature1.sectionTag}</div>
              <h2 className="dc-subtitle d-bold">
                {t.feature1.subtitleRest}<span className="dc-span d-bold">{t.feature1.subtitleHighlight}</span>
              </h2>
              <p className="dc-intro">
                {t.feature1.intro}
              </p>
            </div>
            <div className="dc-right">
              <div className="dc-img">
                <img src={`${CDN}/extensive-library-of-standard-parts.png`} alt="compliant with ISO, EN, DIN, ANSI and more" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature 2: Intelligent tools (no bg, reversed) ── */}
      <div className="de-main">
        <div className="de-inner">
          <div className="de-cont">
            <div className="de-left">
              <h2 className="de-subtitle d-bold">
                <span className="de-span d-bold">{t.feature2.subtitleHighlight}</span>{t.feature2.subtitleRest}
              </h2>
              <p className="de-intro">
                {t.feature2.intro}
              </p>
            </div>
            <div className="de-right">
              <div className="de-img">
                <img src={`${CDN}/rich-set-of-drawing-tools.png`} alt="rich set of drawing tools" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature 3: Unify design standards (card bg) ── */}
      <div className="dc-main">
        <div className="dc-inner">
          <div className="dc-cont">
            <div className="dc-left">
              <h2 className="dc-subtitle d-bold">
                <span className="dc-span d-bold">{t.feature3.subtitleHighlight}</span>{t.feature3.subtitleRest}
              </h2>
              <p className="dc-intro">
                {t.feature3.intro}
              </p>
            </div>
            <div className="dc-right">
              <div className="dc-img">
                <img src={`${CDN}/unify-design-standards-with-customizations.png`} alt="build own templates across teams" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature 4: PLM integration (no bg, reversed) ── */}
      <div className="de-main">
        <div className="de-inner">
          <div className="de-cont">
            <div className="de-left">
              <h2 className="de-subtitle d-bold">
                {t.feature4.subtitleRest}<span className="de-span d-bold">{t.feature4.subtitleHighlight}</span>
              </h2>
              <p className="de-intro">
                {t.feature4.intro}
              </p>
            </div>
            <div className="de-right">
              <div className="de-img">
                <img src={`${CDN}/plm-integration.png`} alt="integrate with popular PLM systems" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Benefits: Comparison table ── */}
      <div className="df-main">
        <div className="df-inner">
          <div className="df-cont">
            <div className="df-left">
              <h2 className="df-titles d-bold">{t.benefits.title}</h2>
              <p className="df-intro">
                {t.benefits.intro}
              </p>
              <div className="df-buttom">
                <button type="button" className="df-video-btn d-bold" onClick={() => setVideoOpen(true)}>
                  {t.benefits.watchVideoBtn}
                </button>
                <a
                  className="df-more d-bold"
                  href="https://dl.zwsoft.com/market/website_file/Benefits_of_Using_ZWCAD_MFG.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.benefits.learnMoreBtn}
                </a>
              </div>
            </div>
            <div className="df-right">
              <div className="df-table">
                <div className="df-box">
                  <div className="df-tr">
                    <div className="df-th d-bold">{t.benefits.tableHeaders.task}</div>
                    <div className="df-th d-bold">{t.benefits.tableHeaders.mfg}</div>
                    <div className="df-th d-bold">{t.benefits.tableHeaders.zwcad}</div>
                  </div>
                  <div className="df-list">
                    {t.benefits.timingRows.map((r) => (
                      <div key={r.task} className="df-item">
                        <div className="df-td">
                          <div className="df-lt">
                            <div className="df-imgbox">
                              <div className="df-icon"><img src="/zwcad-mfg/da30.png" alt="" /></div>
                              <div className="df-sub">
                                <div className="df-img"><img src={r.preview} alt={r.task} loading="lazy" /></div>
                              </div>
                            </div>
                            <div className="df-name">{r.task}</div>
                          </div>
                        </div>
                        <div className="df-td"><div className="df-time">{r.mfg}</div></div>
                        <div className="df-td"><div className="df-time">{r.zwcad}</div></div>
                      </div>
                    ))}

                    <div className="df-item df-item--total">
                      <div className="df-td">
                        <div className="df-lt">
                          <div className="df-imgbox">
                            <div className="df-icon"><img src="/zwcad-mfg/da31.png" alt="" /></div>
                          </div>
                          <div className="df-name d-bold">{t.benefits.totalTimeLabel}</div>
                        </div>
                      </div>
                      <div className="df-td"><div className="df-time d-bold">08:11</div></div>
                      <div className="df-td"><div className="df-time d-bold">16:44</div></div>
                    </div>

                    <div className="df-item df-item--score">
                      <div className="df-td">
                        <div className="df-lt">
                          <div className="df-improvement d-bold">{t.benefits.efficiencyLabel}</div>
                        </div>
                      </div>
                      <div className="df-td">
                        <div className="df-score d-bold">
                          <TrendingUp size={20} />
                          <span>{t.benefits.efficiencyValue}</span>
                        </div>
                      </div>
                      <div className="df-td" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="df-hint">{t.benefits.hint}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="di-main">
        <div className="di-inner">
          <div className="di-top">
            <h2 className="di-titles d-bold">
              They <span className="di-span d-bold">{t.chooseUs.titleHighlight}</span> Us
            </h2>
            <p className="di-synopsis">{t.chooseUs.sub}</p>
          </div>
          <div className="di-center">
            {t.chooseUs.companyLogos.map((l) => (
              <div key={l.alt} className="di-logo">
                <img src={l.src} alt={l.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="di-inner">
          <div className="di-slider-outer" ref={sliderRef}>
            <div
              className="di-track"
              style={{ transform: `translateX(${diOffset}px)`, gap: DI_GAP }}
            >
              {t.chooseUs.testimonials.map((s, i) => (
                <div
                  key={s.name}
                  className={`di-slide${diSlide === i ? " active" : ""}`}
                  style={{ width: diSlideW || "65%" }}
                  onClick={() => setDiSlide(i)}
                >
                  <div className="dib-left">
                    <img src={s.img} alt={s.name} />
                  </div>
                  <div className="dib-right">
                    <div className="dib-quot">"</div>
                    <p className="dib-intro">{s.quote}</p>
                    <div className="dib-footer">
                      <div>
                        <div className="dib-name">{s.name}</div>
                        <div className="dib-post">{s.post}</div>
                      </div>
                      <img className="dib-logo-img" src={s.logo} alt={s.name} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="di-nav">
            <div className="di-nav-arrows">
              <button
                className="di-nav-btn"
                onClick={() => setDiSlide((p) => (p - 1 + t.chooseUs.testimonials.length) % t.chooseUs.testimonials.length)}
                aria-label="Previous"
              >←</button>
              <button
                className="di-nav-btn"
                onClick={() => setDiSlide((p) => (p + 1) % t.chooseUs.testimonials.length)}
                aria-label="Next"
              >→</button>
            </div>
            <div className="di-nav-dots">
              {t.chooseUs.testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`di-nav-dot${diSlide === i ? " active" : ""}`}
                  onClick={() => setDiSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related products ── */}
      <div className="dl-main">
        <div className="dl-inner">
          <h2 className="dl-titles d-bold">{t.relatedProducts.title}</h2>
          <div className="dl-cont">
            {t.relatedProducts.items.map((p, i) => (
              <Link key={p.name} to={relatedProductRoutes[i].to} className="dl-item">
                <div className="dl-img">
                  <img src={relatedProductRoutes[i].logo} alt={p.name} />
                </div>
                <div className="dl-name d-bold">{p.name}</div>
                <div className="dl-intro">{p.sub}</div>
                <span className="dl-link">{t.relatedProducts.learnMoreLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="gu-main">
        <div className="gu-inner">
          <h2 className="gu-title g-size36 d-bold">{t.cta.title}</h2>
          <p className="gu-des g-size20">{t.cta.sub}</p>
          <div className="gu-btns">
            <Link className="d-bold white" to={routesName.TAI_VE}>{t.cta.trialBtn}</Link>
            <Link className="d-bold" to={routesName.LIEN_HE}>{t.cta.contactBtn}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
