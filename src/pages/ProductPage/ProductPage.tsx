import { useMemo, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Seo from "../../seo/Seo";
import "./ProductPage.css";

type ProductKey = "zwcad" | "zw3d" | "zwcad-mfg";

const IMG = "/image-zwcad";

const whyItems = [
  {
    title: "Broad Compatibility",
    text: "Work seamlessly with DWG, DXF, DWT, and other common file formats for smooth collaboration.",
    image: `${IMG}/zwcad/da36.png`
  },
  {
    title: "Familiar and Flexible Interface",
    text: "Whether you prefer Classic or Ribbon, Dark or Light mode, ZWCAD helps your team start working immediately.",
    image: `${IMG}/zwcad/da37.png`
  },
  {
    title: "Highly Customizable",
    text: "Integrate or develop apps with LISP, VBA, ZRX, and .NET to fit your existing workflow.",
    image: `${IMG}/zwcad/da38.png`
  },
  {
    title: "Quick Migration",
    text: "Migrate templates, fonts, command aliases, and printer settings quickly with minimal disruption.",
    image: `${IMG}/zwcad/da39.png`
  }
];

type DeFeature = {
  name: string;
  desc: string;
  icon: string;
  video: string;
};

const advancedFeatures: DeFeature[] = [
  {
    name: "Parametric Design",
    desc: "Add geometric and dimension constraints to entities for quick size and shape adjustments.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/01_Parametric_Design.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/01_Parametric_Design.mp4"
  },
  {
    name: "Flexiblock",
    desc: "Flexiblock contains actions and parameters and allows you to change its shape freely.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/02_Flexiblock.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Flexiblock.mp4"
  },
  {
    name: "Point Cloud",
    desc: "Read and process complex point clouds smoothly. You can attach, edit, and manage them.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/03_Point_Cloud.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Point%20Cloud.mp4"
  },
  {
    name: "Sheet Set Manager",
    desc: "View, access, manage, and plot multiple drawings. All of them can be done in one panel.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/04_Sheet_Se_Manager.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Sheet%20Set%20Manager.mp4"
  },
  {
    name: "PDF Import",
    desc: "Import multiple PDF pages as CAD objects in one step.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/05_PDF_Import.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/PDF%20Import.mp4"
  },
  {
    name: "File Compare",
    desc: "Spot the differences between two drawings at once.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/06_File_Compare.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/File%20Compare.mp4"
  },
  {
    name: "Area Table",
    desc: "Automatically calculate area and generate area tables in just a few steps.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/07_Area_Table.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Area%20Table.mp4"
  }
];

const innovativeFeatures: DeFeature[] = [
  {
    name: "Smart Match",
    desc: "Automatically identify identical shapes and support batch editing.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/1_Smart_Match.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/1_Smart_Match.mp4"
  },
  {
    name: "Similar Search",
    desc: "Search for similar blocks in local files based on a specified graphic.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/2_Similar_Search.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/2_Similar_Search.mp4"
  },
  {
    name: "Smart Plot",
    desc: "Optimize the interface for ease of use and improve plotting efficiency by batch plotting across files and automatic paper size matching.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/3_Smart_Plot.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/3_Smart_Plot.mp4"
  },
  {
    name: "Smart Select",
    desc: "Filter objects based on multiple conditions such as colors, type and attributes.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/4_Smart_Select.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Select.mp4"
  },
  {
    name: "Smart Mouse",
    desc: "Trigger frequently-used commands easily with mouse gestures.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/5_Smart_Mouse.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Mouse.mp4"
  },
  {
    name: "Smart Voice",
    desc: "Annotate with voice messages, saving you the hassle of text editing.",
    icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/6_Smart_Voice.svg",
    video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Voice.mp4"
  }
];

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

const reviewCards = [
  {
    name: "Ag Hamzah K.",
    role: "Senior Draftsman",
    quote: "ZWCAD's one-time license and Smart Plot makes it a standout AutoCAD alternative for my daily drafting work."
  },
  {
    name: "Lisa F.",
    role: "Senior Designer",
    quote: "Efficient, time saving for handling many drawings; ZWCAD is lightweight and keeps me productive."
  },
  {
    name: "Mat K.",
    role: "Design Consultant",
    quote: "Cost-effective and user-friendly solution for SMEs; we rely on ZWCAD's perpetual license for daily work."
  }
];

const appGridItems = [
  { icon: `${IMG}/zwcad/da40.png`, label: "GIS, Survey and Mapping" },
  { icon: `${IMG}/zwcad/da41.png`, label: "Civil" },
  { icon: `${IMG}/zwcad/da42.png`, label: "Architecture" },
  { icon: `${IMG}/zwcad/da52.png`, label: "Construction" },
  { icon: `${IMG}/zwcad/da43.png`, label: "Structural" },
  { icon: `${IMG}/zwcad/da44.png`, label: "Mechanical" },
  { icon: `${IMG}/zwcad/da45.png`, label: "HVAC Design" },
  { icon: `${IMG}/zwcad/da46.png`, label: "Electrical" },
  { icon: `${IMG}/zwcad/da47.png`, label: "Plant Design" }
];

const metaMap: Record<ProductKey, { title: string; subtitle: string; description: string; keywords: string }> = {
  zwcad: {
    title: "ZWCAD",
    subtitle: "Powerful CAD Solution Tailored to Your Needs",
    description:
      "ZWCAD is a powerful CAD solution for complex 2D drafting and advanced 3D navigation, with broad DWG compatibility and smart productivity tools.",
    keywords: "zwcad, cad solution, dwg, smart cad tools"
  },
  zw3d: {
    title: "ZW3D",
    subtitle: "All-in-one 3D CAD/CAE/CAM platform",
    description: "ZW3D supports product design and manufacturing in one integrated workflow.",
    keywords: "zw3d, cad cam, cae"
  },
  "zwcad-mfg": {
    title: "ZWCAD MFG",
    subtitle: "Advanced 2D CAD for manufacturing",
    description: "ZWCAD MFG helps create standardized drawings with mechanical design toolsets.",
    keywords: "zwcad mfg, manufacturing cad"
  }
};

export default function ProductPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const meta = metaMap[productSlug as ProductKey];
  const isZwcad = productSlug === "zwcad";

  const [whyActive, setWhyActive] = useState(1);
  const [featureTab, setFeatureTab] = useState<"advanced" | "innovative">("advanced");
  const [featureActive, setFeatureActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featureList = useMemo(
    () => (featureTab === "advanced" ? advancedFeatures : innovativeFeatures),
    [featureTab]
  );

  const currentFeature = featureList[featureActive] ?? featureList[0];

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => {});
  }, [currentFeature.video]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWhyActive(prev => (prev + 1) % whyItems.length);
    }, 15000);
    return () => clearTimeout(timer);
  }, [whyActive]);

  if (!meta) {
    return (
      <main className="container product-page__fallback">
        <h1>San pham khong ton tai</h1>
      </main>
    );
  }

  if (!isZwcad) {
    return (
      <main className="container product-page__fallback">
        <Seo title={`${meta.title} | ZWCAD Vietnam`} description={meta.description} keywords={meta.keywords} />
        <h1>{meta.title}</h1>
        <h2>{meta.subtitle}</h2>
        <p>{meta.description}</p>
      </main>
    );
  }

  return (
    <main className="zw-page">
      <Seo title={`${meta.title} | ZWCAD Vietnam`} description={meta.description} keywords={meta.keywords} />

      <section className="pp-hero">
        <img className="pp-hero__bg" src={`${IMG}/zwcad/bg-section.png`} alt="" />
        <div className="container">
          <div className="pp-hero__body">
            <span className="pp-hero__eyebrow">ZWCAD</span>
            <h1 className="pp-hero__title">Create Amazing Things</h1>
            <div className="pp-hero__pricing">
              <p>
                <strong>From $899,</strong> You own it forever
              </p>
              <p>Perpetual and network licenses available.</p>
            </div>
            <div className="pp-hero__actions">
              <a href="/tai-ve/zwcad-trial" className="pp-btn-primary">
                Start 30-day Free Trial
              </a>
              <a href="/lien-he" className="pp-btn-outline">
                See Pricing
              </a>
            </div>
            <div className="pp-hero__score">
              <span>4.6 out of 5 (316 reviews)</span>
              <small>
                1st <b>Easiest To Use</b> in General-Purpose CAD software
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
              <div className="db-titles">What's ZWCAD</div>
              <h2 className="db-subtitle">
                <span>Powerful CAD Solution</span> Tailored to Your Needs
              </h2>
              <div className="db-intro">
                ZWCAD is a powerful CAD solution for complex 2D drafting and advanced 3D navigation. Widely compatible
                with <strong>DWG</strong> and other major formats, it enables seamless collaboration across industries.
                With an <strong>intuitive interface, efficiency-boosting features</strong>, and{" "}
                <strong>AI-powered tools</strong>, ZWCAD helps architects, engineers, and designers bring their ideas
                to life without limits and confidently shape the future.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="zw-section zw-why">
        <div className="container">
          <span className="zw-pill">Why ZWCAD</span>
          <h2 className="zw-title">
            Compatible, Efficient, and Intuitive:
            <br />
            <span>Get Started with ZWCAD</span> in No Time
          </h2>
          <div className="zw-why-box">
            <div className="zw-accordion">
              {whyItems.map((item, idx) => (
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
              <img src={whyItems[whyActive].image} alt={whyItems[whyActive].title} />
            </div>
          </div>
        </div>
      </section>

      <section className="de-main">
        {/* Header */}
        <div className="de-inner container">
          <div className="de-top">
            <div className="de-lt">
              <h2 className="de-titles">
                <span className="de-span">Powerful and Fast CAD</span>: Do More in Less Time
              </h2>
            </div>
            <div className="de-rt">
              <p className="de-intro">
                ZWCAD is packed with all the essential tools you need, along with advanced and innovative features
                designed to boost productivity and help you deliver results faster.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="de-swiperbox container">
          <div className="de-tabs">
            <button
              type="button"
              className={`de-tab${featureTab === "advanced" ? " active" : ""}`}
              onClick={() => { setFeatureTab("advanced"); setFeatureActive(0); }}
            >
              Advanced Features
            </button>
            <button
              type="button"
              className={`de-tab${featureTab === "innovative" ? " active" : ""}`}
              onClick={() => { setFeatureTab("innovative"); setFeatureActive(0); }}
            >
              Innovative Features
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="dea-main container">
          <div className="dea-cont">
            {/* Left nav */}
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

            {/* Right: info + video */}
            <div className="dea-right">
              <div className="dea-pc-lt">
                <p className="dea-feature-name">{currentFeature.name}</p>
                <p className="dea-feature-desc">{currentFeature.desc}</p>
              </div>
              <div className="dea-pc-rt">
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

        {/* Bottom CTA */}
        <div className="de-bottom container">
          <a
            href="https://www.zwsoft.com/product/zwcad/whats-new#previous-features"
            className="de-btn"
            target="_blank"
            rel="noreferrer"
          >
            Learn more features by versions
          </a>
        </div>
      </section>

      <section className="zw-section zw-compare">
        <div className="container">
          <h2 className="zw-title">
            <span>Comparison</span> with AutoCAD
          </h2>
          <p className="zw-sub">ZWCAD delivers outstanding performance in both 2D drafting and 3D navigation.</p>
          <div className="zw-compare-grid">
            <div className="zw-compare-card">
              <h4>Complex 2D Drafting</h4>
              <strong>1.98x as fast as AutoCAD</strong>
            </div>
            <div className="zw-compare-card dark">
              <h4>Advanced 3D Navigation</h4>
              <strong>3x as fast as AutoCAD</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="zw-section zw-apps">
        <div className="container zw-apps-box">
          <div className="zw-app-grid">
            {appGridItems.map((item) => (
              <div key={item.label}>
                <img src={item.icon} alt={item.label} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="zw-app-copy">
            <h2>
              Power Up Your CAD with
              <br />
              Abundant <span>Third-Party Applications</span>
            </h2>
            <p>
              We offer over 400 third-party applications for a wide range of industries. You can always find a suitable
              solution to work easier, faster, and more accurately.
            </p>
          </div>
        </div>
      </section>

      <section className="zw-section">
        <div className="container zw-center">
          <h2 className="zw-title">
            They <span>Choose</span> Us
          </h2>
          <p className="zw-sub">Trusted by leading companies worldwide</p>
          <div className="zw-logo-row">
            {partnerLogos.map((logo) => (
              <img key={logo} src={`${IMG}/logo/${logo}`} alt={logo} />
            ))}
          </div>
          <div className="zw-case-card">
            <img src={`${IMG}/lpyeah2025/re6.png`} alt="Case study" />
            <div>
              <p>Boosted R&D efficiency and lowered CAD costs by adopting ZWCAD for faster, more flexible workflows.</p>
              <strong>VIMPO MAKINE</strong>
              <span>MFG-Machinery | Turkey</span>
            </div>
          </div>
        </div>
      </section>

      <section className="zw-section">
        <div className="container">
          <div className="zw-award">
            <div>
              <h2>Lead with top recognition</h2>
              <p>Named to G2's Best Software Awards, and ranks #1 in G2's Easiest to Use General-Purpose CAD.</p>
            </div>
          </div>
          <div className="zw-review-grid">
            {reviewCards.map((r) => (
              <article key={r.name}>
                <h4>{r.name}</h4>
                <small>{r.role}</small>
                <p>{r.quote}</p>
                <b>5 out of 5</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="zw-section">
        <div className="container">
          <h2 className="zw-title zw-center-title">Discover More Products</h2>
          <div className="zw-product-row">
            <a href="/san-pham/zwcad-mfg">ZWCAD MFG</a>
            <a href="#">ZWCAD Mobile</a>
            <a href="/san-pham/zw3d">ZW3D</a>
          </div>
        </div>
      </section>

      <section className="zw-bottom-cta">
        <div className="container">
          <h2>Get started with ZWCAD 2027 Beta now</h2>
          <p>Start sparking creativity and boosting efficiency right away.</p>
          <div>
            <a href="/tai-ve/zwcad-trial">Free Trial</a>
            <a href="/lien-he">See Pricing</a>
            <a href="/lien-he">Contact Sales</a>
          </div>
        </div>
      </section>
    </main>
  );
}

