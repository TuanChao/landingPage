import { useMemo, useState, useRef, useEffect } from "react";
import Seo from "../../seo/Seo";
import AwardSection from "../../components/sections/AwardSection/AwardSection";
import ReviewSection from "../../components/sections/ReviewSection/ReviewSection";
import { usePageContent } from "../../hooks/usePageContent";
import { zwcadPageData } from "../../data/pages/zwcadPageData";
import "./ZWCADPage.css";

const IMG = "/image-zwcad";

const partnerLogos = [
  "equans",
  "ericsson",
  "honeywell",
  "jonson",
  "hitachi",
  "lg",
  "zamil",
  "saint-globain",
  "avintia",
  "emerson"
];

export default function ZWCADPage() {
  const t = usePageContent(zwcadPageData);

  const [whyActive, setWhyActive] = useState(1);
  const [featureTab, setFeatureTab] = useState<"advanced" | "innovative">("advanced");
  const [featureActive, setFeatureActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featureList = useMemo(
    () => (featureTab === "advanced" ? t.features.advanced : t.features.innovative),
    [featureTab, t]
  );

  const currentFeature = featureList[featureActive] ?? featureList[0];

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => { });
  }, [currentFeature.video]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWhyActive(prev => (prev + 1) % t.why.items.length);
    }, 15000);
    return () => clearTimeout(timer);
  }, [whyActive, t.why.items.length]);

  return (
    <main className="zw-page">
      <Seo
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
      />

      <section className="pp-hero">
        <img className="pp-hero__bg" src={`${IMG}/zwcad/bg-section.png`} alt="" />
        <div className="container">
          <div className="pp-hero__body">
            <span className="pp-hero__eyebrow">
              <img src="/zwcad-mfg/zwcad.png" alt="" className="pp-hero__eyebrow-logo" />
              {t.hero.eyebrow}
            </span>
            <h1 className="pp-hero__title">{t.hero.title}</h1>
            <div className="pp-hero__pricing">
              <p>
                <strong>{t.hero.pricingLine1.split(",")[0]},</strong>{" "}
                {t.hero.pricingLine1.split(",").slice(1).join(",").trim()}
              </p>
              <p>{t.hero.pricingLine2}</p>
            </div>
            <div className="pp-hero__actions">
              <a href="/tai-ve/zwcad-trial" className="pp-btn-primary">
                {t.hero.trialBtn}
              </a>
              <a href="/lien-he" className="pp-btn-outline">
                {t.hero.pricingBtn}
              </a>
            </div>
            <div className="pp-hero__score">
              <span>{t.hero.score}</span>
              <small>
                {t.hero.scoreLabel.includes("Easiest To Use") ? (
                  <>
                    1st <b>Easiest To Use</b> in General-Purpose CAD software
                  </>
                ) : (
                  t.hero.scoreLabel
                )}
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="zw-section zw-what">
        <div className="db-inner">
          <div className="db-cont">
            <div className="db-left">
              <div className="db-imgbox">
                <div className="db-img">
                  <img src={`${IMG}/da34.png`} alt="What's ZWCAD" />
                </div>
                <button className="db-play" type="button" aria-label="Play video">
                  ▶
                </button>
              </div>
            </div>
            <div className="db-right">
              <div className="db-titles">{t.what.sectionTag}</div>
              <h2 className="db-subtitle">
                <span>{t.what.subtitleHighlight}</span> {t.what.subtitleRest}
              </h2>
              <div className="db-intro">
                {t.what.intro}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="zw-section zw-why">
        <div className="container">
          <span className="zw-pill">{t.why.pill}</span>
          <h2 className="zw-title">
            {t.why.titleLine1}
            <br />
            <span>{t.why.titleHighlight}</span> {t.why.titleLine2}
          </h2>
          <div className="zw-why-box">
            <div className="zw-accordion">
              {t.why.items.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  className={`zw-acc-item ${whyActive === idx ? "active" : ""}`}
                  onClick={() => setWhyActive(idx)}
                >
                  <div className="zw-acc-head">
                    <span>{item.title}</span>
                    <span>{whyActive === idx ? "−" : "+"}</span>
                  </div>
                  {whyActive === idx ? <p>{item.text}</p> : null}
                </button>
              ))}
            </div>
            <div className="zw-why-image">
              <img src={t.why.items[whyActive].image} alt={t.why.items[whyActive].title} />
            </div>
          </div>
        </div>
      </section>

      <section className="de-main">
        <div className="de-inner container">
          <div className="de-top">
            <div className="de-lt">
              <h2 className="de-titles">
                <span className="de-span">{t.features.titleHighlight}</span>{t.features.titleRest}
              </h2>
            </div>
            <div className="de-rt">
              <p className="de-intro">
                {t.features.intro}
              </p>
            </div>
          </div>
        </div>

        <div className="de-swiperbox container">
          <div className="de-tabs">
            <button
              type="button"
              className={`de-tab${featureTab === "advanced" ? " active" : ""}`}
              onClick={() => { setFeatureTab("advanced"); setFeatureActive(0); }}
            >
              {t.features.tabAdvanced}
            </button>
            <button
              type="button"
              className={`de-tab${featureTab === "innovative" ? " active" : ""}`}
              onClick={() => { setFeatureTab("innovative"); setFeatureActive(0); }}
            >
              {t.features.tabInnovative}
            </button>
          </div>
        </div>

        <div className="dea-main container">
          <div className="dea-cont">
            <nav className="dea-left">
              {featureList.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  className={`dea-nav${featureActive === idx ? " active" : ""}`}
                  onClick={() => setFeatureActive(idx)}
                >
                  <span className="dea-icon">
                    <img src={item.icon} alt="" loading="lazy" width={28} height={28} />
                  </span>
                  <span className="dea-name">{item.name}</span>
                </button>
              ))}
            </nav>

            <div className="dea-right">
              <div className="dea-pc-lt">
                <p className="dea-feature-name">{currentFeature.name}</p>
                <p className="dea-feature-desc">{currentFeature.desc}</p>
              </div>
              <div className="dea-pc-rt">
                <div className="dea-imgbox">
                  <video
                    key={currentFeature.video}
                    ref={videoRef}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="dea-video"
                  >
                    <source src={currentFeature.video} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="de-bottom container">
          <a
            href="https://www.zwsoft.com/product/zwcad/whats-new#previous-features"
            className="de-btn"
            target="_blank"
            rel="noreferrer"
          >
            {t.features.learnMoreBtn}
          </a>
        </div>
      </section>

      <section className="zw-section zw-compare">
        <div className="container">
          <h2 className="zw-title">
            <span>{t.compare.titleHighlight}</span>{t.compare.titleRest}
          </h2>
          <p className="zw-sub">{t.compare.sub}</p>
          <div className="zw-compare-grid">
            <div className="zw-compare-card">
              <img src={`${IMG}/zwcad/comparison.gif`} alt={t.compare.card1Title} className="zw-compare-media" />
              <h4>{t.compare.card1Title}</h4>
              <strong>{t.compare.card1Stat}</strong>
            </div>
            <div className="zw-compare-card dark">
              <video className="zw-compare-media" muted autoPlay loop playsInline>
                <source src={`${IMG}/zwcad/df_video.mp4`} type="video/mp4" />
              </video>
              <h4>{t.compare.card2Title}</h4>
              <strong>{t.compare.card2Stat}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="zw-section zw-apps">
        <div className="dg-main">
          <div className="dg-inner container">
            <div className="dg-cont">

              <div className="dg-right">
                <div className="dg-top">
                  <h2 className="dg-titles">
                    {t.apps.title1}
                    <span className="dg-span">{t.apps.titleHighlight}</span>
                  </h2>
                  <div className="dg-intro">
                    {t.apps.intro}
                  </div>
                  <a href="https://www.zwsoft.com/product/application" className="dg-link" target="_blank" rel="noreferrer">
                    {t.apps.exploreLink}
                  </a>
                </div>
                <div className="dg-bottom">
                  <div className="dg-bottom-text">
                    <div className="dg-textbox">
                      {t.apps.apiText}
                    </div>
                    <a href="https://www.zwsoft.com/support/zwcad-devdoc" className="dg-buttom" target="_blank" rel="noreferrer">
                      {t.apps.devLink}
                    </a>
                  </div>
                  <div className="dg-img">
                    <img src={`${IMG}/zwcad/da48.png`} alt="" />
                  </div>
                </div>
              </div>

              <div className="dg-left">
                <div className="dg-list">
                  {t.apps.grid.map((item) => (
                    <div key={item.label} className="dg-item">
                      <div className="dg-icon">
                        <img src={item.icon} alt="" loading="lazy" />
                      </div>
                      <div className="dg-text">
                        <div className="dg-name">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="zw-section di-main">
        <div className="container di-inner">
          <div className="di-top">
            <h2 className="di-titles">
              They <span className="di-span">{t.chooseUs.titleHighlight}</span> Us
            </h2>
            <div className="di-synopsis">{t.chooseUs.sub}</div>
          </div>

          <div className="di-center">
            {partnerLogos.map((logo) => (
              <div key={logo} className="di-logo">
                <img src={`${IMG}/logo/${logo}`} alt={logo} />
              </div>
            ))}
          </div>

          <div className="di-bottom">
            <div className="di-marquee-track">
              {[...t.chooseUs.caseStudies, ...t.chooseUs.caseStudies].map((s, i) => (
                <div key={i} className="dib-item">
                  <div className="dib-img">
                    <img src={s.img} alt={s.name} />
                  </div>
                  <div className="dib-body">
                    <div className="dib-quot">"</div>
                    <div className="dib-intro">{s.quote}</div>
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

          <div className="di-buttom">
            <a className="di-more" href="https://www.zwsoft.com/story?product=ZWCAD" target="_blank" rel="noreferrer">
              {t.chooseUs.exploreBtn}
            </a>
          </div>
        </div>
      </section>

      <AwardSection />
      <ReviewSection />

      <section className="zw-section">
        <div className="container">
          <div className="dl-inner">
            <h2 className="dl-titles d-bold">{t.discover.title}</h2>
            <div className="dl-cont">
              {t.discover.products.map((p) => (
                <a key={p.name} href={p.href} className="dl-item">
                  <div className="dl-img"><img src={p.logo} alt={p.name} /></div>
                  <div className="dl-text">
                    <h3 className="dl-name d-bold">{p.name}</h3>
                    <div className="dl-intro">{p.intro}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="dl-textbox">
              {t.discover.footnotes.map((fn, i) => (
                <p key={i}>{fn}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="zw-bottom-cta">
        <div className="container">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.sub}</p>
          <div className="zw-cta-btns">
            <a href="/tai-ve/zwcad-trial">{t.cta.trialBtn}</a>
            <a href="/lien-he">{t.cta.pricingBtn}</a>
            <a href="/lien-he" className="outline">{t.cta.contactBtn}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
