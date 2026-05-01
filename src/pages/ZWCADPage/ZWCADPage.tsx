import { useMemo, useState, useRef, useEffect } from "react";
import Seo from "../../seo/Seo";
import AwardSection from "./AwardSection/AwardSection";
import ReviewSection from "./ReviewSection/ReviewSection";
import "./ZWCADPage.css";

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

const caseStudies = [
  {
    name: "Thang Tien Engineering",
    post: "AEC-MEP | Vietnam",
    quote: "Delivered 39 major projects worth $122.5M faster and more collaboratively through ZWCAD's efficient multi-team workflow.",
    img: `${IMG}/lpyeah2025/re1.png`,
    logo: `${IMG}/lpyeah2025/re_logo1.svg`,
  },
  {
    name: "VIMPO MAKÄ°NE",
    post: "MFG-Machinery | Turkey",
    quote: "Boosted R&D efficiency and lowered CAD costs by adopting ZWCAD for faster, more flexible 2D workflows.",
    img: `${IMG}/lpyeah2025/re3.png`,
    logo: `${IMG}/lpyeah2025/re_logo3.svg`,
  },
  {
    name: "Steurer GmbH",
    post: "MFG-Interiors | Italy",
    quote: "Accelerated design-to-production delivery using ZWCAD's unified 2D/3D drafting tools and precise, workshop-ready outputs.",
    img: `${IMG}/lpyeah2025/re5.png`,
    logo: `${IMG}/lpyeah2025/re_logo5.svg`,
  },
  {
    name: "Madro sp. z o.o.",
    post: "AEC-Architecture | Poland",
    quote: "Improved bid-to-construction accuracy and reduced waste with ZWCAD's seamless DWG compatibility and streamlined workflows.",
    img: `${IMG}/lpyeah2025/re6.png`,
    logo: `${IMG}/lpyeah2025/re_logo6.svg`,
  },
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

export default function ZWCADPage() {
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
    vid.play().catch(() => { });
  }, [currentFeature.video]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWhyActive(prev => (prev + 1) % whyItems.length);
    }, 15000);
    return () => clearTimeout(timer);
  }, [whyActive]);

  return (
    <main className="zw-page">
      <Seo
        title="ZWCAD | ZWCAD Vietnam"
        description="ZWCAD is a powerful CAD solution for complex 2D drafting and advanced 3D navigation, with broad DWG compatibility and smart productivity tools."
        keywords="zwcad, cad solution, dwg, smart cad tools"
      />

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
              <img src={`${IMG}/zwcad/comparison.gif`} alt="Complex 2D Drafting" className="zw-compare-media" />
              <h4>Complex 2D Drafting</h4>
              <strong>1.98x as fast as AutoCAD</strong>
            </div>
            <div className="zw-compare-card dark">
              <video className="zw-compare-media" muted autoPlay loop playsInline>
                <source src={`${IMG}/zwcad/df_video.mp4`} type="video/mp4" />
              </video>
              <h4>Advanced 3D Navigation</h4>
              <strong>3x as fast as AutoCAD</strong>
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
                    Power Up Your CAD with Abundant{" "}
                    <span className="dg-span">Third-Party Applications</span>
                  </h2>
                  <div className="dg-intro">
                    We offer over 400 third-party applications for a wide range of industries. No matter what industry
                    you're in, you can always find the right solution to help you work easier, faster, and more
                    accurately.
                  </div>
                  <a href="https://www.zwsoft.com/product/application" className="dg-link" target="_blank" rel="noreferrer">
                    Explore Our Third-Party Applications
                  </a>
                </div>
                <div className="dg-bottom">
                  <div className="dg-bottom-text">
                    <div className="dg-textbox">
                      Our platform supports rich APIs including LISP, VBA, ZRX, and .NET, enabling developers to
                      migrate or build applications with ease.
                    </div>
                    <a href="https://www.zwsoft.com/support/zwcad-devdoc" className="dg-buttom" target="_blank" rel="noreferrer">
                      Get Application Development Support
                    </a>
                  </div>
                  <div className="dg-img">
                    <img src={`${IMG}/zwcad/da48.png`} alt="" />
                  </div>
                </div>
              </div>

              <div className="dg-left">
                <div className="dg-list">
                  {appGridItems.map((item) => (
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
              They <span className="di-span">Choose</span> Us
            </h2>
            <div className="di-synopsis">Trusted by leading companies worldwide</div>
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

          <div className="di-buttom">
            <a className="di-more" href="https://www.zwsoft.com/story?product=ZWCAD" target="_blank" rel="noreferrer">
              Explore More Case Stories
            </a>
          </div>
        </div>
      </section>

      <AwardSection />
      <ReviewSection />

      <section className="zw-section">
        <div className="container">
          <div className="dl-inner">
            <h2 className="dl-titles d-bold">Discover More Products</h2>
            <div className="dl-cont">
              <a href="/san-pham/zwcad-mfg" className="dl-item">
                <div className="dl-img"><img src="/image-zwcad/logo/zwcadmfg" alt="ZWCAD MFG" /></div>
                <div className="dl-text">
                  <h3 className="dl-name d-bold">ZWCAD MFG</h3>
                  <div className="dl-intro">Advanced 2D CAD for Manufacturing</div>
                </div>
              </a>
              <a href="#" className="dl-item">
                <div className="dl-img"><img src="/image-zwcad/logo/zwcadmb" alt="ZWCAD Mobile" /></div>
                <div className="dl-text">
                  <h3 className="dl-name d-bold">ZWCAD Mobile</h3>
                  <div className="dl-intro">Fast, Accurate, Easy-to-Use CAD App</div>
                </div>
              </a>
              <a href="/san-pham/zw3d" className="dl-item">
                <div className="dl-img"><img src="/image-zwcad/logo/zwc3d" alt="ZW3D" /></div>
                <div className="dl-text">
                  <h3 className="dl-name d-bold">ZW3D</h3>
                  <div className="dl-intro">Affordable All-in-One 3D CAD/CAE/CAM</div>
                </div>
              </a>
            </div>
            <div className="dl-textbox">
              <p>1. Price may vary by country or region.</p>
              <p>2. All trademarks, logos, and brand names are the property of their respective owners. AutoCAD is a registered trademark of Autodesk, Inc.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="zw-bottom-cta">
        <div className="container">
          <h2>Get started with ZWCAD 2027 Beta now</h2>
          <p>Start sparking creativity and boosting efficiency right away.</p>
          <div className="zw-cta-btns">
            <a href="/tai-ve/zwcad-trial">Free Trial</a>
            <a href="/lien-he">See Pricing</a>
            <a href="/lien-he" className="outline">Contact Sales</a>
          </div>
        </div>
      </section>
    </main>
  );
}
