import { useState } from "react";
import Seo from "../../seo/Seo";
import AwardSection from "../ProductPage/AwardSection/AwardSection";
import ReviewSection from "../ProductPage/ReviewSection/ReviewSection";
import "./ZW3DPage.css";

const IMG = "/image-zwcad";

const capabilities = [
  { icon: `${IMG}/zw3d/cap1.png`, label: "Part Design" },
  { icon: `${IMG}/zw3d/cap2.png`, label: "Assembly Design" },
  { icon: `${IMG}/zw3d/cap3.png`, label: "2D Drawing" },
  { icon: `${IMG}/zw3d/cap4.png`, label: "Sheet Metal" },
  { icon: `${IMG}/zw3d/cap5.png`, label: "Mold Design" },
  { icon: `${IMG}/zw3d/cap6.png`, label: "Simulation (CAE)" },
  { icon: `${IMG}/zw3d/cap7.png`, label: "CAM Machining" },
  { icon: `${IMG}/zw3d/cap8.png`, label: "Collaboration" },
];

const features = [
  {
    tab: "Part Design",
    title: "Powerful Part Design",
    desc: "Create complex solid and surface models with a full set of modeling tools. History-based and direct editing modes give you full control over geometry.",
    video: "https://statics.zwsoft.com/static/style2020/mp4/3d_ov_2025/model.mp4",
  },
  {
    tab: "Assembly",
    title: "Efficient Assembly Design",
    desc: "Manage large assemblies with ease using top-down and bottom-up design approaches. Intelligent interference detection keeps your design accurate.",
    video: "https://statics.zwsoft.com/static/style2020/mp4/3d_ov_2025/model.mp4",
  },
  {
    tab: "CAE Simulation",
    title: "Integrated Structural Simulation",
    desc: "Run FEA structural analysis directly inside ZW3D without exporting. Validate your designs early and reduce costly physical prototyping.",
    video: "https://statics.zwsoft.com/static/style2020/mp4/3d_ov_2025/model.mp4",
  },
  {
    tab: "CAM Machining",
    title: "Full CAM for CNC Machining",
    desc: "Generate efficient toolpaths for 2.5-axis to 5-axis machining. Simulate material removal and post-process directly to your CNC machine.",
    video: "https://statics.zwsoft.com/static/style2020/mp4/3d_ov_2025/model.mp4",
  },
];

const whyItems = [
  {
    icon: "💰",
    title: "Affordable Perpetual License",
    desc: "Own ZW3D forever from $3,000 with flexible upgrade options — no subscription lock-in.",
  },
  {
    icon: "🔗",
    title: "High Compatibility",
    desc: "Open and save STEP, IGES, Parasolid, CATIA, NX, SolidWorks, and 30+ formats natively.",
  },
  {
    icon: "⚡",
    title: "Fast on Low-End Hardware",
    desc: "Optimized kernel delivers smooth performance even on entry-level workstations.",
  },
  {
    icon: "📐",
    title: "Easy to Learn",
    desc: "Intuitive UI with minimal learning curve — switch from other CAD tools in days, not months.",
  },
];

const caseStudies = [
  {
    name: "Steurer GmbH",
    post: "MFG-Interiors | Italy",
    quote: "Accelerated design-to-production delivery using ZW3D's unified 2D/3D drafting tools and precise, workshop-ready outputs.",
    img: `${IMG}/lpyeah2025/re5.png`,
    logo: `${IMG}/lpyeah2025/re_logo5.svg`,
  },
  {
    name: "VIMPO MAKİNE",
    post: "MFG-Machinery | Turkey",
    quote: "Boosted R&D efficiency and lowered CAD costs by adopting ZW3D for faster, more flexible 3D workflows.",
    img: `${IMG}/lpyeah2025/re3.png`,
    logo: `${IMG}/lpyeah2025/re_logo3.svg`,
  },
  {
    name: "Madro sp. z o.o.",
    post: "MFG-Architecture | Poland",
    quote: "Improved design accuracy and reduced rework with ZW3D's seamless data compatibility and streamlined 3D workflows.",
    img: `${IMG}/lpyeah2025/re6.png`,
    logo: `${IMG}/lpyeah2025/re_logo6.svg`,
  },
  {
    name: "Thang Tien Engineering",
    post: "AEC-MEP | Vietnam",
    quote: "Delivered complex projects faster using ZW3D's powerful assembly and drawing tools for multi-team collaboration.",
    img: `${IMG}/lpyeah2025/re1.png`,
    logo: `${IMG}/lpyeah2025/re_logo1.svg`,
  },
];

export default function ZW3DPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <>
      <Seo
        title="ZW3D - Affordable All-in-One 3D CAD/CAE/CAM Software"
        description="ZW3D provides a unified CAx solution for the machinery industry, integrating CAD/CAE/CAM workflows and reducing costs with flexible licensing."
        keywords="zw3d, 3d cad software, cae, cam, machinery design"
      />

      <main className="z3-page">

        {/* ── Hero ── */}
        <div className="da-main">
          <div className="da-inner container">
            <div className="da-cont">
              <div className="da-left">
                <h1 className="da-titles d-bold">
                  ZW3D — Unify Design, Simulation, and Manufacturing to Improve Productivity
                </h1>
                <div className="da-intro">
                  <span className="da-span d-bold">From $3,000</span>, own it forever with 1-year maintenance.
                </div>
                <div className="da-linkbox">
                  <a className="da-link d-bold" href="/tai-ve">Start 30-day Free Trial</a>
                  <a className="da-link da-link-outline d-bold" href="/lien-he">See Pricing</a>
                </div>
              </div>
              <div className="da-right">
                <div className="da-box">
                  <div className="da-img">
                    <img src="https://statics.zwsoft.com/static/style2020/images/3d_ov_2025/3d_ov20.png" alt="ZW3D" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── What's ZW3D ── */}
        <div className="db-main">
          <div className="db-inner container">
            <div className="db-cont">
              <div className="db-right">
                <div className="db-tip d-bold">What's ZW3D</div>
                <h2 className="db-titles d-bold">
                  Agile <span className="db-span">3D CAD</span> built for professional engineers
                </h2>
                <div className="db-textbox">
                  <p>
                    With industry-standard 3D CAD capabilities, ZW3D offers an affordable solution with a <strong>perpetual license</strong> and <strong>flexible upgrade options.</strong> Its <strong>high compatibility</strong> ensures smooth data integration and seamless use of legacy files.
                  </p>
                  <p>
                    Thanks to its intuitive user interface, <strong>transitioning is easy,</strong> and <strong>the learning curve is minimal.</strong> Additionally, ZW3D provides <strong>stable performance</strong> and <strong>fast operation,</strong> even on <strong>low-end workstations.</strong>
                  </p>
                </div>
              </div>
              <div className="db-left">
                <div className="db-imgbox">
                  <div className="db-img">
                    <img src="https://statics.zwsoft.com/static/style2020/images/3d_ov_2025/3d_ov2.png" alt="ZW3D design" />
                  </div>
                  <div className="db-gif">
                    <video
                      src="https://statics.zwsoft.com/static/style2020/mp4/3d_ov_2025/model.mp4"
                      muted autoPlay loop playsInline
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── All-in-One CAx ── */}
        <div className="dc-main">
          <div className="dc-inner container">
            <div className="dc-top">
              <div className="dc-left">
                <h2 className="dc-titles d-bold">
                  <span className="dc-span">All-in-One CAx</span> Solution for the entire product lifecycle
                </h2>
                <div className="dc-intro">
                  The integrated 3D CAD+CAE/CAM/Collaboration solution that takes you through the entire product development journey from conception to production.
                </div>
              </div>
            </div>
            <div className="dc-grid">
              {capabilities.map((c) => (
                <div key={c.label} className="dc-card">
                  <div className="dc-icon">
                    <img src={c.icon} alt={c.label} />
                  </div>
                  <div className="dc-label">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Key Features ── */}
        <div className="de-main z3-section">
          <div className="container">
            <div className="de-top">
              <div className="de-lt">
                <h2 className="de-titles">
                  Powerful and Fast <span className="de-span">3D CAD/CAE/CAM</span>
                </h2>
              </div>
              <div className="de-rt">
                <p className="de-intro">
                  One platform covers the full product development workflow — from concept design and simulation to CNC machining — so your team stays connected at every stage.
                </p>
              </div>
            </div>

            <div className="de-tabs">
              {features.map((f, i) => (
                <button
                  key={f.tab}
                  className={`de-tab${activeFeature === i ? " active" : ""}`}
                  onClick={() => setActiveFeature(i)}
                >
                  {f.tab}
                </button>
              ))}
            </div>

            <div className="dea-cont">
              <div className="dea-pc-rt">
                <div className="dea-imgbox">
                  <video
                    key={features[activeFeature].video}
                    className="dea-video"
                    src={features[activeFeature].video}
                    muted autoPlay loop playsInline
                  />
                </div>
              </div>
              <div className="dea-pc-lt">
                <h3 className="dea-name">{features[activeFeature].title}</h3>
                <p className="dea-desc">{features[activeFeature].desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Why ZW3D ── */}
        <div className="z3-section z3-why">
          <div className="container">
            <h2 className="z3-titles z3-center">Why Choose ZW3D?</h2>
            <div className="z3-why-grid">
              {whyItems.map((w) => (
                <div key={w.title} className="z3-why-card">
                  <div className="z3-why-icon">{w.icon}</div>
                  <h3 className="z3-why-title">{w.title}</h3>
                  <p className="z3-why-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── They Choose Us ── */}
        <div className="z3-section z3-cases">
          <div className="container">
            <h2 className="z3-titles z3-center">They Choose ZW3D</h2>
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
        <section className="z3-section">
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
                <a href="/san-pham/zwcad-mfg" className="dl-item">
                  <div className="dl-img"><img src="/image-zwcad/logo/zwcadmb" alt="ZWCAD MFG" /></div>
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
            <h2>Get started with ZW3D now</h2>
            <p>Start sparking creativity and boosting efficiency right away.</p>
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
