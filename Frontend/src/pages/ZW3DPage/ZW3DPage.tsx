import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../../seo/Seo";
import AwardSection from "../../components/sections/AwardSection/AwardSection";
import ReviewSection from "../../components/sections/ReviewSection/ReviewSection";
import routesName from "~routes/enum.routes";
import { usePageContent } from "../../hooks/usePageContent";
import { zw3dPageData } from "../../data/pages/zw3dPageData";
import "./ZW3DPage.css";

const Z = "/zw3d";

const legacyFormats = [
  ".asm", ".psm", ".exp", ".prt", ".iam", ".par", ".vda", ".iges", "CATPart", ".sldprt", ".ipt",
  ".stp", ".session", ".stl", ".CATProduct", ".igs", ".3dxml", ".model", ".step", ".stpz", ".jt",
];
const partnerLogos = [
  "alcan-lg", "baowu-lg", "bridgestone-lg", "hyundai-lg", "johnson-lg",
  "mitsubishi-lg", "smltc-lg", "sony-lg", "taiyoyuden-lg", "yamaha-lg",
];

export default function ZW3DPage() {
  const t = usePageContent(zw3dPageData);

  const [activeFeature, setActiveFeature] = useState(0);
  const f = t.featureModules[activeFeature];
  const [activeFeatureItem, setActiveFeatureItem] = useState(0);
  const [activeWhyItem, setActiveWhyItem] = useState<number | null>(null);

  const [diagExploded, setDiagExploded] = useState(false);
  const [diagReturning, setDiagReturning] = useState(false);
  const [diagScale, setDiagScale] = useState(1);
  const [diSlide, setDiSlide] = useState(0);
  const [diContW, setDiContW] = useState(0);
  const scaleBoxRef = useRef<HTMLDivElement>(null);
  const [tfScale, setTfScale] = useState(1);
  const tfBoxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const DI_GAP = 20;
  const diSlideW = diContW * 0.65;
  const diOffset = diContW > 0
    ? -(diSlide * (diSlideW + DI_GAP)) + (diContW - diSlideW) / 2
    : 0;

  useEffect(() => {
    const updateScale = () => {
      if (scaleBoxRef.current) setDiagScale(scaleBoxRef.current.offsetWidth / 728);
      if (tfBoxRef.current) setTfScale(tfBoxRef.current.offsetWidth / 642);
      if (sliderRef.current) setDiContW(sliderRef.current.offsetWidth);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDiSlide((p) => (p + 1) % t.chooseUs.caseStudies.length), 5000);
    return () => clearInterval(interval);
  }, [t.chooseUs.caseStudies.length]);

  useEffect(() => {
    setActiveFeatureItem(f.defaultItem ?? 0);
  }, [activeFeature]);

  return (
    <>
      <Seo
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
      />

      <div className="z3-page">

        {/* ── Hero ── */}
        <div className="z3-hero">
          <div className="container z3-hero__inner">
            <div className="z3-hero__left">
              <div className="z3-hero__tag">
                <img src="/image-zwcad/logo/zwc3d" alt="" className="z3-hero__tag-logo" />
                {t.hero.tag}
              </div>
              <h1 className="z3-hero__title">
                {t.hero.title.split("\n").map((line, i, arr) => (
                  i < arr.length - 1 ? <>{line}<br /></> : line
                ))}
              </h1>
              <p className="z3-hero__sub">
                From <strong>$3,000</strong> — {t.hero.sub.replace(/^From \$3,000 — /, "")}
              </p>
              <div className="z3-hero__btns">
                <Link className="z3-btn-fill" to={routesName.TAI_VE}>{t.hero.trialBtn}</Link>
                <Link className="z3-btn-line" to={routesName.LIEN_HE}>{t.hero.pricingBtn}</Link>
              </div>
            </div>
            <div className="z3-hero__right">
              <img src={`${Z}/3d_ov20.png`} alt="ZW3D 3D CAD" className="z3-hero__img" />
            </div>
          </div>
        </div>

        {/* ── What's ZW3D ── */}
        <div className="z3-what">
          <div className="container z3-what__inner">
            <div className="z3-what__imgbox">
              <div className="z3-what__img"><img src={`${Z}/3d_ov2.png`} alt="ZW3D" /></div>
              <div className="z3-what__gif"><video src={`${Z}/model.mp4`} muted autoPlay loop playsInline /></div>
            </div>
            <div className="z3-what__text">
              <div className="z3-s-tag">{t.what.sectionTag}</div>
              <h2 className="z3-s-title">
                Agile <span className="z3-accent">{t.what.titleHighlight}</span> built for professional engineers
              </h2>
              <p className="z3-s-desc">
                {t.what.desc1.includes("perpetual license") ? (
                  <>
                    With industry-standard 3D CAD capabilities, ZW3D offers an affordable solution with a{" "}
                    <strong>perpetual license</strong> and <strong>flexible upgrade options.</strong> Its{" "}
                    <strong>high compatibility</strong> ensures smooth data integration and seamless use of legacy files.
                  </>
                ) : (
                  t.what.desc1
                )}
              </p>
              <p className="z3-s-desc">
                {t.what.desc2.includes("transitioning is easy") ? (
                  <>
                    Thanks to its intuitive user interface, <strong>transitioning is easy,</strong> and{" "}
                    <strong>the learning curve is minimal.</strong> Additionally, ZW3D provides{" "}
                    <strong>stable performance</strong> and <strong>fast operation,</strong> even on{" "}
                    <strong>low-end workstations.</strong>
                  </>
                ) : (
                  t.what.desc2
                )}
              </p>
              <Link className="z3-btn-ghost" to={routesName.TAI_VE}>{t.what.trialBtn}</Link>
            </div>
          </div>
        </div>

        {/* ── All-in-One CAx ── */}
        <div className="z3-cax-new">
          <div className="container z3-cax-new__inner">
            <div className="z3-cax-new__left">
              <h2 className="z3-cax-title">
                <span className="z3-accent">{t.cax.titleHighlight}</span>{t.cax.titleRest}
              </h2>
              <p className="z3-cax-intro">
                {t.cax.intro}
              </p>
            </div>
            <div
              className={`z3-cax-new__right dc-right${diagExploded ? " is-visible" : ""}${diagReturning && !diagExploded ? " mouseenter" : ""}`}
              onMouseEnter={() => { setDiagExploded(true); setDiagReturning(false); }}
              onMouseLeave={() => { setDiagExploded(false); setDiagReturning(true); }}
            >
              <div className="z3-cax-scale-box" ref={scaleBoxRef}>
                <div className="z3-cax-scale" style={{ transform: `scale(${diagScale})` }}>

                  <div className="dca-one dca-special">
                    <div className="dca-img"><img src={`${Z}/drawing.png`} alt="" /></div>
                    <div className="dca-text"><span>• 2D Drawing</span></div>
                  </div>

                  <div className="dca-one dca-one1">
                    <div className="dca-img"><img src={`${Z}/bottom-gear.png`} alt="" /></div>
                    <div className="dca-text"><span>• Part Design</span></div>
                    <div className="dca-text dca-text2"><span>• Collaboration</span></div>
                  </div>

                  <div className="dca-one dca-one2">
                    <div className="dca-img">
                      <img src={`${Z}/base-plate-CAE.png`} alt="" />
                      <img src={`${Z}/base-plate-CAE-color.png`} alt="" />
                    </div>
                    <div className="dca-text"><span>• Simulation (CAE)</span></div>
                  </div>

                  <div className="dca-one dca-one3"><div className="dca-img"><img src={`${Z}/red-cylinder.png`} alt="" /></div></div>
                  <div className="dca-one dca-one4"><div className="dca-img"><img src={`${Z}/battery.png`} alt="" /></div></div>

                  <div className="dca-one dca-one5">
                    <div className="dca-img"><img src={`${Z}/middle-gear.png`} alt="" /></div>
                    <div className="dca-text"><span>• Assembly Design</span></div>
                  </div>

                  <div className="dca-one dca-one6"><div className="dca-img"><img src={`${Z}/three-pillar.png`} alt="" /></div></div>

                  <div className="dca-one dca-one7">
                    <div className="dca-img">
                      <img src={`${Z}/middle-panel-cam.png`} alt="" />
                      <img src={`${Z}/middle-panel-cam.gif`} alt="" />
                    </div>
                    <div className="dca-text"><span>• Manufacturing (CAM)</span></div>
                  </div>

                  <div className="dca-one dca-one8"><div className="dca-img"><img src={`${Z}/blue-component.png`} alt="" /></div></div>
                  <div className="dca-one dca-one9"><div className="dca-img"><img src={`${Z}/y-pillar.png`} alt="" /></div></div>
                  <div className="dca-one dca-one10"><div className="dca-img"><img src={`${Z}/yg-screw.png`} alt="" /></div></div>
                  <div className="dca-one dca-one11"><div className="dca-img"><img src={`${Z}/three-screw.png`} alt="" /></div></div>

                  <div className="dcd-cont">
                    <div className="dcd-item"><div className="dcd-icon"><img src={`${Z}/3d_ov47.png`} alt="" /></div><div className="dcd-name">Administrator</div></div>
                    <div className="dcd-item"><div className="dcd-icon"><img src={`${Z}/3d_ov48.png`} alt="" /></div><div className="dcd-name">Design Manager</div></div>
                    <div className="dcd-item"><div className="dcd-icon"><img src={`${Z}/3d_ov49.png`} alt="" /></div><div className="dcd-name">Mechanical Designer</div></div>
                    <div className="dcd-item"><div className="dcd-icon"><img src={`${Z}/3d_ov50.png`} alt="" /></div><div className="dcd-name">Mechanical Designer</div></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature Modules (6 tabs) ── */}
        <div className="z3-feats">
          <div className="container">

            <div className="z3-tabs">
              {t.featureModules.map((feat, i) => (
                <button
                  key={feat.tab}
                  className={`z3-tab${activeFeature === i ? " active" : ""}`}
                  onClick={() => setActiveFeature(i)}
                >
                  {feat.tab}
                </button>
              ))}
            </div>
            <div className="z3-feat-panel">
              <div className="z3-feat-panel__body">
                <h3 className="z3-feat-panel__title">{f.title}</h3>
                <p className="z3-feat-panel__desc">{f.synopsis}</p>
                <div className="z3-feat-accordion">
                  {f.items.map((item, i) => {
                    const isActive = i === activeFeatureItem;
                    return (
                      <div key={item.title} className={`z3-feat-acc-item${isActive ? " active" : ""}`}>
                        <button
                          className="z3-feat-acc-head"
                          onClick={() => setActiveFeatureItem((prev) => (prev === i ? -1 : i))}
                          aria-expanded={isActive}
                          type="button"
                        >
                          <span>{item.title}</span>
                          <span className="z3-feat-acc-icon">{isActive ? "-" : "+"}</span>
                        </button>
                        {isActive && (
                          <div className="z3-feat-acc-body">
                            <p>{item.details}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="z3-feat-panel__media">
                <div className="z3-feat-video-frame">
                  <video key={f.video} src={f.video} muted autoPlay loop playsInline />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="z3-dedicated">
          <div className="container">
            <div className="z3-dedicated__inner">
              <div className="z3-dedicated__left">
                <img src={`${Z}/3d_ov4.jpg`} alt="General machinery design with ZW3D" />
              </div>
              <div className="z3-dedicated__right">
                <h2 className="z3-dedicated__title">
                  {t.dedicated.title}<span>{t.dedicated.titleHighlight}</span>
                </h2>
                <ul className="z3-dedicated__list">
                  {t.dedicated.listItems.map((li, i) => (
                    <li key={i}>
                      <img src={`${Z}/tk-tick.png`} alt="" aria-hidden="true" />
                      <span>{li.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.dropbox.com/scl/fi/1y19z0o0o3ge9b4rvfmk4/Flyer_General-Machinery_ZW3D-2026_0702.pdf?rlkey=oqddfboflvhtb9t6jhlh6xdph&st=lpfkawla&dl=1"
                  target="_blank"
                  rel="noreferrer"
                  className="z3-dedicated__link"
                >
                  {t.dedicated.exploreLink}
                  <span className="z3-dedicated__arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Why ZW3D ── */}
        <div className="z3-why-big">
          <div className="container">
            <div className="z3-why-tag">{t.why.tag}</div>
            <h2 className="z3-why-title">
              {t.why.titleRest}<span>{t.why.titleHighlight}</span>
            </h2>
            <div className="z3-why-cards">
              {t.why.items.map((w, i) => (
                <button
                  key={w.title}
                  type="button"
                  className={`z3-why-card${activeWhyItem === i ? " active" : ""}`}
                  onClick={() => setActiveWhyItem((prev) => (prev === i ? null : i))}
                >
                  <div className="z3-why-card__top">
                    <div className="z3-why-card__icon"><img src={w.icon} alt="" aria-hidden="true" /></div>
                    <h3 className="z3-why-card__name">{w.title}</h3>
                    <p className="z3-why-card__intro">{w.intro}</p>
                  </div>
                  <div className="z3-why-card__toggle">
                    <span className="z3-why-card__plus">+</span>
                    <span className="z3-why-card__minus">-</span>
                  </div>
                  <div className="z3-why-card__overlay">
                    <p>{w.detail}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="dg-main">
          <div className="container">
            <div className="dg-inner">
              <h2 className="dg-titles">
                {t.legacy.titleRest}<span className="dg-span">{t.legacy.titleHighlight}</span>
              </h2>
              <div className="dg-cont">
                <div className="dg-right">
                  {t.legacy.items.map((item) => (
                    <div key={item.name} className="dg-one">
                      <div className="dg-icon"><img src={item.icon} alt="" aria-hidden="true" /></div>
                      <div className="dg-text">
                        <div className="dg-name">{item.name}</div>
                        <div className="dg-intro">{item.intro}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="tf-right">
                  <div className="tf-box is-visible" ref={tfBoxRef}>
                    <div className="tf-in" style={{ transform: `scale(${tfScale})` }}>
                      <div className="tf-core"><span>ZW3D</span></div>
                      {legacyFormats.map((ext, i) => (
                        <div key={ext} className={`tf-one tf-one${i + 1}${[1, 3, 7, 10, 14, 15, 20].includes(i) ? " green" : ""}`}>
                          <div className="tf-mid">{ext}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Technical expertise ── */}
        <div className="dh-main">
          <div className="dh-inner">
            <div className="dh-top">
              <h2 className="dh-titles">
                <span className="dh-span">{t.techExpertise.titleHighlight}</span>{t.techExpertise.titleRest}
              </h2>
              <div className="dh-synopsis">
                {t.techExpertise.synopsis}
              </div>
            </div>
            <div className="dh-bottom">
              <div className="dh-left">
                <div className="dh-list">
                  {t.techExpertise.items.map((item) => (
                    <div key={item.name} className="dh-one">
                      <div className="dh-icon"><img src={item.icon} alt="" /></div>
                      <div className="dh-text">
                        <div className="dh-name">{item.name}</div>
                        <div className="dh-textbox">
                          {item.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="dh-right">
                <div className="dh-img pc"><img src={`${Z}/3d_ov16-b (1).png`} alt="Technical expertise" /></div>
                <div className="dh-img phone"><img src={`${Z}/3d_ov16-b (1).png`} alt="Technical expertise" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── They Choose Us ── */}
        <div className="di-main">
          <div className="container">
            <div className="di-top">
              <h2 className="di-top-title">{t.chooseUs.title}</h2>
              <p className="di-top-desc">{t.chooseUs.sub}</p>
            </div>
            <div className="di-center">
              <div className="di-logos">
                {partnerLogos.map((lg) => (
                  <div key={lg} className="di-logo-item">
                    <img src={`${Z}/${lg}`} alt={lg.replace("-lg", "")} />
                  </div>
                ))}
              </div>
            </div>
            <div className="di-bottom">
              <div className="di-slider-outer" ref={sliderRef}>
                <div
                  className="di-track"
                  style={{ transform: `translateX(${diOffset}px)`, gap: DI_GAP }}
                >
                  {t.chooseUs.caseStudies.map((s, i) => (
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
                    onClick={() => setDiSlide((p) => (p - 1 + t.chooseUs.caseStudies.length) % t.chooseUs.caseStudies.length)}
                    aria-label="Previous"
                  >←</button>
                  <button
                    className="di-nav-btn"
                    onClick={() => setDiSlide((p) => (p + 1) % t.chooseUs.caseStudies.length)}
                    aria-label="Next"
                  >→</button>
                </div>
                <div className="di-nav-dots">
                  {t.chooseUs.caseStudies.map((_, i) => (
                    <button
                      key={i}
                      className={`di-nav-dot${diSlide === i ? " active" : ""}`}
                      onClick={() => setDiSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <Link className="di-explore-btn" to={routesName.LIEN_HE}>{t.chooseUs.exploreBtn}</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Awards & Reviews ── */}
        <AwardSection />
        <ReviewSection />

        {/* ── CTA ── */}
        <div className="z3-cta">
          <div className="z3-cta__overlay" />
          <div className="container z3-cta__inner">
            <h2 className="z3-cta__title">{t.cta.title}</h2>
            <p className="z3-cta__sub">{t.cta.sub}</p>
            <div className="z3-cta__btns">
              <Link className="z3-btn-fill" to={routesName.TAI_VE}>{t.cta.trialBtn}</Link>
              <Link className="z3-btn-line" to={routesName.LIEN_HE}>{t.cta.pricingBtn}</Link>
              <Link className="z3-btn-ghost z3-cta__ghost" to={routesName.LIEN_HE}>{t.cta.contactBtn}</Link>
            </div>
          </div>
        </div>

        {/* ── Explore more ── */}
        {/* <div className="z3-more">
          <div className="container">
            <h2 className="z3-s-title z3-center">Explore More Products</h2>
            <div className="z3-more__grid">
              <Link to={routesName.SAN_PHAM_ZWCAD} className="z3-more__card">
                <div className="z3-more__logo"><img src="/zwcad-mfg/zwcad.png" alt="ZWCAD" /></div>
                <h3 className="z3-more__name">ZWCAD</h3>
                <p className="z3-more__sub">DWG-Compatible CAD for Better Productivity</p>
                <span className="z3-btn-ghost">Learn more →</span>
              </Link>
              <Link to={routesName.SAN_PHAM_ZWCAD_MFG} className="z3-more__card">
                <div className="z3-more__logo"><img src="/image-zwcad/logo/zwcadmfg" alt="ZWCAD MFG" /></div>
                <h3 className="z3-more__name">ZWCAD MFG</h3>
                <p className="z3-more__sub">Advanced 2D CAD for Manufacturing</p>
                <span className="z3-btn-ghost">Learn more →</span>
              </Link>
            </div>
          </div>
        </div> */}

      </div>
    </>
  );
}
