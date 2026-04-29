import { useState } from "react";
import Seo from "../../seo/Seo";
import AwardSection from "../ProductPage/AwardSection/AwardSection";
import ReviewSection from "../ProductPage/ReviewSection/ReviewSection";
import "./ZWCADMFGPage.css";

const IMG = "/image-zwcad";

const features = [
  {
    tab: "Drawing Standards",
    title: "Frame Templates & Title Block",
    desc: "Frame templates that meet national and international standards. Easily customize file name, designer, date, and more in the title block. Edit frame size and scale with just a few clicks.",
    img: "https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png",
  },
  {
    tab: "Power Dimension",
    title: "Intelligent Auto-Dimensioning",
    desc: "Power Dimension automatically generates appropriate dimensions by recognizing objects. Create different kinds of dimensions — linear, angular, radial — using just one command.",
    img: "https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png",
  },
  {
    tab: "Symbols & Annotations",
    title: "Complete Mechanical Symbol Library",
    desc: "A full blend of symbol annotations for mechanical design: tolerance zones, unequal tolerances, datum identifiers, geometric tolerances, and surface textures — all in one place.",
    img: "https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png",
  },
  {
    tab: "BOM & Balloons",
    title: "Automated BOM Generation",
    desc: "Quickly create balloons, edit related attributes, and align them automatically. The software generates BOMs linked to balloons and part attributes — double-click to update after any modification.",
    img: "https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png",
  },
  {
    tab: "Part Library",
    title: "Rich Standard Parts Library",
    desc: "Find a wide range of standard parts including fasteners, piping fittings, and structural members. The advanced library covers ISO, EN, DIN, ANSI, JIS and more. Import custom parts in simple steps.",
    img: "https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png",
  },
];

const highlights = [
  {
    icon: "📐",
    title: "Multi-Standard Compliance",
    desc: "Templates and part libraries that meet ISO, EN, DIN, ANSI, JIS and many national standards out of the box.",
  },
  {
    icon: "⚡",
    title: "One-Command Dimensioning",
    desc: "Power Dimension recognizes object types automatically and generates the right dimension with a single command.",
  },
  {
    icon: "📋",
    title: "Auto BOM Linking",
    desc: "Balloons and BOM tables stay linked — any part attribute change updates the BOM automatically.",
  },
  {
    icon: "🔩",
    title: "Massive Part Library",
    desc: "Thousands of standard fasteners, fittings, and structural members ready to drag-and-drop into your drawing.",
  },
];

const caseStudies = [
  {
    name: "VIMPO MAKİNE",
    post: "MFG-Machinery | Turkey",
    quote: "Boosted R&D efficiency and lowered CAD costs by adopting ZWCAD MFG for faster, standards-compliant 2D mechanical workflows.",
    img: `${IMG}/lpyeah2025/re3.png`,
    logo: `${IMG}/lpyeah2025/re_logo3.svg`,
  },
  {
    name: "Steurer GmbH",
    post: "MFG-Interiors | Italy",
    quote: "Accelerated design-to-production delivery using ZWCAD MFG's intelligent dimensioning and workshop-ready drawing outputs.",
    img: `${IMG}/lpyeah2025/re5.png`,
    logo: `${IMG}/lpyeah2025/re_logo5.svg`,
  },
  {
    name: "Thang Tien Engineering",
    post: "AEC-MEP | Vietnam",
    quote: "Delivered major projects faster with ZWCAD MFG's auto BOM generation and multi-standard frame templates.",
    img: `${IMG}/lpyeah2025/re1.png`,
    logo: `${IMG}/lpyeah2025/re_logo1.svg`,
  },
  {
    name: "Madro sp. z o.o.",
    post: "MFG-Architecture | Poland",
    quote: "Reduced rework with ZWCAD MFG's DWG compatibility and streamlined mechanical annotation workflows.",
    img: `${IMG}/lpyeah2025/re6.png`,
    logo: `${IMG}/lpyeah2025/re_logo6.svg`,
  },
];

export default function ZWCADMFGPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <>
      <Seo
        title="ZWCAD MFG - Advanced 2D CAD for Manufacturing"
        description="ZWCAD MFG is an advanced CAD software for manufacturing to enhance overall efficiency with standard parts, intelligent tools, and PLM integration."
        keywords="zwcad mfg, manufacturing cad, mechanical drawing, bom, part library"
      />

      <main className="mfg-page">

        {/* ── Hero ── */}
        <div className="mfg-hero">
          <div className="container">
            <div className="mfg-hero__cont">
              <div className="mfg-hero__left">
                <div className="mfg-hero__eyebrow">ZWCAD MFG</div>
                <h1 className="mfg-hero__title">
                  Advanced 2D CAD for Manufacturing Professionals
                </h1>
                <p className="mfg-hero__sub">
                  Built on the ZWCAD platform — faster standard designs, smarter annotations, and an automated BOM workflow for the entire manufacturing process.
                </p>
                <div className="mfg-hero__btns">
                  <a className="mfg-btn-primary" href="/tai-ve">Start 30-day Free Trial</a>
                  <a className="mfg-btn-outline" href="/lien-he">Contact Sales</a>
                </div>
              </div>
              <div className="mfg-hero__right">
                <div className="mfg-hero__imgbox">
                  <img
                    src="https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png"
                    alt="ZWCAD MFG"
                    className="mfg-hero__logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── What's ZWCAD MFG ── */}
        <div className="mfg-what">
          <div className="container">
            <div className="mfg-what__cont">
              <div className="mfg-what__left">
                <div className="mfg-what__imgbox">
                  <img
                    src="https://statics.zwsoft.com/upload/en/20250414/64beab377ae26f3ce4e89c31e84f8598.png"
                    alt="ZWCAD MFG overview"
                  />
                </div>
              </div>
              <div className="mfg-what__right">
                <div className="db-tip d-bold">What's ZWCAD MFG</div>
                <h2 className="mfg-what__title">
                  2D CAD built for <span className="mfg-accent">mechanical design</span> and manufacturing
                </h2>
                <div className="mfg-what__body">
                  <p>
                    ZWCAD MFG is an advanced CAD solution purpose-built for manufacturing professionals. Built on the proven ZWCAD platform, it extends standard 2D drafting with <strong>mechanical-specific tools</strong> — frame templates, intelligent dimensioning, symbol libraries, and automated BOM generation.
                  </p>
                  <p>
                    Whether you're creating detailed part drawings or managing complex assembly documents, ZWCAD MFG helps you <strong>work faster</strong> and stay <strong>standards-compliant</strong> from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Key Features ── */}
        <div className="mfg-features">
          <div className="container">
            <div className="mfg-features__top">
              <h2 className="mfg-section-title">
                Powerful Tools for <span className="mfg-accent">Every Stage</span> of Mechanical Design
              </h2>
              <p className="mfg-section-sub">
                From drawing setup to final BOM export — ZWCAD MFG covers the entire mechanical drafting workflow.
              </p>
            </div>

            <div className="mfg-tabs">
              {features.map((f, i) => (
                <button
                  key={f.tab}
                  className={`mfg-tab${activeFeature === i ? " active" : ""}`}
                  onClick={() => setActiveFeature(i)}
                >
                  {f.tab}
                </button>
              ))}
            </div>

            <div className="mfg-panel">
              <div className="mfg-panel__img">
                <img src={features[activeFeature].img} alt={features[activeFeature].title} />
              </div>
              <div className="mfg-panel__body">
                <h3 className="mfg-panel__title">{features[activeFeature].title}</h3>
                <p className="mfg-panel__desc">{features[activeFeature].desc}</p>
                <a className="mfg-panel__link" href="/tai-ve">Try it free →</a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Highlights ── */}
        <div className="mfg-highlights">
          <div className="container">
            <h2 className="mfg-section-title mfg-center">Why ZWCAD MFG?</h2>
            <div className="mfg-highlights__grid">
              {highlights.map((h) => (
                <div key={h.title} className="mfg-highlight-card">
                  <div className="mfg-highlight-icon">{h.icon}</div>
                  <h3 className="mfg-highlight-title">{h.title}</h3>
                  <p className="mfg-highlight-desc">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── They Choose Us ── */}
        <div className="mfg-cases">
          <div className="container">
            <h2 className="mfg-section-title mfg-center">They Choose ZWCAD MFG</h2>
          </div>
          <div className="di-marquee">
            <div className="di-marquee-track">
              {[...caseStudies, ...caseStudies].map((s, i) => (
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
        </div>

        {/* ── Awards ── */}
        <AwardSection />

        {/* ── Reviews ── */}
        <ReviewSection />

        {/* ── Discover More ── */}
        <section className="mfg-section">
          <div className="container">
            <div className="dl-inner">
              <h2 className="dl-titles d-bold">Discover More Products</h2>
              <div className="dl-cont">
                <a href="/san-pham/zwcad" className="dl-item">
                  <div className="dl-img"><img src="/image-zwcad/logo/zwcadmb" alt="ZWCAD" /></div>
                  <div className="dl-text">
                    <h3 className="dl-name d-bold">ZWCAD</h3>
                    <div className="dl-intro">DWG-Compatible CAD for Better Productivity</div>
                  </div>
                </a>
                <a href="/san-pham/zw3d" className="dl-item">
                  <div className="dl-img"><img src="/image-zwcad/logo/zwc3d" alt="ZW3D" /></div>
                  <div className="dl-text">
                    <h3 className="dl-name d-bold">ZW3D</h3>
                    <div className="dl-intro">Affordable All-in-One 3D CAD/CAE/CAM</div>
                  </div>
                </a>
                <a href="#" className="dl-item">
                  <div className="dl-img"><img src="/image-zwcad/logo/zwcadmb" alt="ZWCAD Mobile" /></div>
                  <div className="dl-text">
                    <h3 className="dl-name d-bold">ZWCAD Mobile</h3>
                    <div className="dl-intro">Fast, Accurate, Easy-to-Use CAD App</div>
                  </div>
                </a>
              </div>
              <div className="dl-textbox">
                <p>1. Price may vary by country or region.</p>
                <p>2. All trademarks, logos, and brand names are the property of their respective owners.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="zw-bottom-cta">
          <div className="container">
            <h2>Get started with ZWCAD MFG today</h2>
            <p>Revolutionize the way you create — enjoy a 30-day free trial.</p>
            <div className="zw-cta-btns">
              <a href="/tai-ve">Free Trial</a>
              <a href="/lien-he">See Pricing</a>
              <a href="/lien-he" className="outline">Contact Sales</a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
