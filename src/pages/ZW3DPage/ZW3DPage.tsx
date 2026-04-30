import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../../seo/Seo";
import AwardSection from "../ProductPage/AwardSection/AwardSection";
import ReviewSection from "../ProductPage/ReviewSection/ReviewSection";
import routesName from "~routes/enum.routes";
import "./ZW3DPage.css";

const Z = "/zw3d";

const featureModules = [
  {
    tab: "Part Design",
    title: "Comprehensive Part Design",
    desc: "Mixed modeling combining parametric and direct editing. Surface modeling, sheet metal, structural design, harness, ECAD/MCAD, piping, mold, and electrode design — all in one environment.",
    img: `${Z}/3d_ov6.png`,
  },
  {
    tab: "Assembly",
    title: "Efficient Assembly Design",
    desc: "Handle up to 20,000 components with advanced display engines. Flexible assembly with automated constraint updates, smart fastener automation, standard parts library, and interference check.",
    img: `${Z}/3d_ov7.png`,
  },
  {
    tab: "2D Drawing",
    title: "Sync 2D Drawings with 3D Models",
    desc: "Real-time updates between 3D and 2D. PMI support, annotation and symbol libraries, batch output, auto-drafting, and advanced projection for rapid drawing generation.",
    img: `${Z}/drawing.png`,
  },
  {
    tab: "Simulation (CAE)",
    title: "Integrated Structural Simulation",
    desc: "Unified working environment between design and simulation. Consistent data continuity, comprehensive tools for structural, vibration, heat transfer, and fatigue analysis. Supports 20+ file formats.",
    img: `${Z}/base-plate-CAE-color.png`,
  },
  {
    tab: "CAM",
    title: "Full CAM for CNC Machining",
    desc: "2–5 axis machining strategies, VoluMill™ CAM add-on with 5× efficiency, post-processing for CNC compatibility, and machining verification & simulation.",
    img: `${Z}/middle-panel-cam.png`,
  },
  {
    tab: "Collaboration",
    title: "Seamless Team Collaboration",
    desc: "Fully embedded collaboration with web-based access, shared workspaces, component reuse, version management, threaded comments, trackable approval history, and real-time data sync.",
    img: `${Z}/3d_ov17.png`,
  },
];

const whyItems = [
  {
    title: "Lower Investment with Increased Value",
    desc: "Perpetual license — one-time purchase with full ownership, no recurring subscription. Competitive pricing at a fraction of premium competitors' costs, with flexible upgrade policy and no penalty fees.",
    img: `${Z}/3d_ov11.png`,
    points: ["Perpetual license, own it forever", "From $3,000 with 1-year maintenance", "Flexible upgrade, no penalty fees", "Offline desktop access, faster performance"],
  },
  {
    title: "Seamlessly Integrate Your Legacy Data",
    desc: "25+ import/export formats with accurate conversion retaining attributes, display states, and PMI. IPX modeling history, quick direct editing, and rapid data conversion — 500MB .step files in 80 seconds.",
    img: `${Z}/3d_ov12.png`,
    points: ["25+ formats: STEP, IGES, CATIA, NX, SolidWorks, JT...", "Accurate conversion retaining PMI & display states", "Quick direct editing on native and imported geometry", "500MB .step imported in 80 seconds"],
  },
  {
    title: "Technical Expertise to Empower Your R&D",
    desc: "Establish design standards and parametric design systems enabling rapid iterations. Purpose-built for general machinery design with industry-specific modules.",
    img: `${Z}/3d_ov13.png`,
    points: ["Design standards & process automation", "Parametric system for rapid design iterations", "Modules for machinery, mold, sheet metal, piping", "Active support from ZWSOFT engineering team"],
  },
];

const partnerLogos = [
  "alcan-lg", "baowu-lg", "bridgestone-lg", "hyundai-lg", "johnson-lg",
  "mitsubishi-lg", "smltc-lg", "sony-lg", "taiyoyuden-lg", "yamaha-lg",
];

const caseStudies = [
  {
    name: "NEXT Robotics",
    post: "MFG-Machinery | Thailand",
    quote: "Reduced software costs by 65% and accelerated design by 40%, reaching 300% faster performance in key operations with ZW3D's all-in-one platform.",
    img: `${Z}/re2.png`,
    logo: `${Z}/re_logo2.svg`,
  },
  {
    name: "Huynh Duc MFG",
    post: "MFG-Precision Engineering | Vietnam",
    quote: "Cut design cycles from weeks to days using ZW3D's fully integrated CAD/CAM environment.",
    img: `${Z}/re4.png`,
    logo: `${Z}/re_logo4.svg`,
  },
  {
    name: "Welltec",
    post: "MFG-Machinery | China",
    quote: "Completed all CAD/CAE/CAM designs for injection molding machines in just 1.5 months and delivered the final product within four months, greatly enhancing productivity and product quality.",
    img: `${Z}/re2.png`,
    logo: `${Z}/re_logo2.svg`,
  },
  {
    name: "APEX",
    post: "Other MFG Industries | Malaysia",
    quote: "ZW3D is fully integrated into our steel furniture designs. With about 90% of our R&D designs created in ZW3D, it has streamlined our workflow and efficiency.",
    img: `${Z}/re4.png`,
    logo: `${Z}/re_logo4.svg`,
  },
];

export default function ZW3DPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const f = featureModules[activeFeature];

  const [diagExploded, setDiagExploded] = useState(false);
  const [diagReturning, setDiagReturning] = useState(false);
  const [diagScale, setDiagScale] = useState(1);
  const scaleBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (scaleBoxRef.current) setDiagScale(scaleBoxRef.current.offsetWidth / 728);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      <Seo
        title="ZW3D - Unify Design, Simulation, and Manufacturing"
        description="ZW3D is an affordable all-in-one 3D CAD/CAE/CAM platform that unifies design, simulation, and manufacturing. From $3,000, own it forever."
        keywords="zw3d, 3d cad software, cae, cam, machinery design, perpetual license"
      />

      <div className="z3-page">

        {/* ── Hero ── */}
        <div className="z3-hero">
          <div className="container z3-hero__inner">
            <div className="z3-hero__left">
              <div className="z3-hero__tag">ZW3D 2026</div>
              <h1 className="z3-hero__title">
                Unify Design, Simulation,<br />and Manufacturing
              </h1>
              <p className="z3-hero__sub">
                From <strong>$3,000</strong> — own it forever with 1-year maintenance. Perpetual license, no recurring subscription.
              </p>
              <div className="z3-hero__btns">
                <Link className="z3-btn-fill" to={routesName.TAI_VE}>Start 30-day Free Trial</Link>
                <Link className="z3-btn-line" to={routesName.LIEN_HE}>See Pricing</Link>
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
              <div className="z3-s-tag">What's ZW3D</div>
              <h2 className="z3-s-title">
                Agile <span className="z3-accent">3D CAD</span> built for professional engineers
              </h2>
              <p className="z3-s-desc">
                With industry-standard 3D CAD capabilities, ZW3D offers an affordable solution with a <strong>perpetual license</strong> and <strong>flexible upgrade options.</strong> Its <strong>high compatibility</strong> ensures smooth data integration and seamless use of legacy files.
              </p>
              <p className="z3-s-desc">
                Thanks to its intuitive user interface, <strong>transitioning is easy,</strong> and <strong>the learning curve is minimal.</strong> Additionally, ZW3D provides <strong>stable performance</strong> and <strong>fast operation,</strong> even on <strong>low-end workstations.</strong>
              </p>
              <Link className="z3-btn-ghost" to={routesName.TAI_VE}>Try it free →</Link>
            </div>
          </div>
        </div>

        {/* ── All-in-One CAx ── */}
        <div className="z3-cax-new">
          <div className="container z3-cax-new__inner">
            <div className="z3-cax-new__left">
              <h2 className="z3-cax-title">
                <span className="z3-accent">All-in-One CAx</span> Solution for the entire product lifecycle
              </h2>
              <p className="z3-cax-intro">
                The integrated 3D CAD+CAE/CAM/Collaboration solution that can take you through the entire product development journey from conception to production.
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
            <div className="z3-feats__top">
              <div className="z3-feats__tl">
                <h2 className="z3-s-title">
                  Powerful <span className="z3-accent">3D CAD / CAE / CAM</span>
                </h2>
              </div>
              <div className="z3-feats__tr">
                <p className="z3-s-desc">
                  One platform covers the full product development workflow — from concept design and simulation to CNC machining.
                </p>
              </div>
            </div>
            <div className="z3-tabs">
              {featureModules.map((feat, i) => (
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
              <div className="z3-feat-panel__img">
                <img key={f.img} src={f.img} alt={f.title} />
              </div>
              <div className="z3-feat-panel__body">
                <h3 className="z3-feat-panel__title">{f.title}</h3>
                <p className="z3-feat-panel__desc">{f.desc}</p>
                <Link className="z3-btn-ghost" to={routesName.TAI_VE}>Try it free →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Why ZW3D (3 alternating blocks) ── */}
        <div className="z3-why-big">
          <div className="container">
            <h2 className="z3-s-title z3-center">Why ZW3D</h2>
            <div className="z3-why-blocks">
              {whyItems.map((w, i) => (
                <div key={w.title} className={`z3-why-block${i % 2 !== 0 ? " z3-why-block--rev" : ""}`}>
                  <div className="z3-why-block__img">
                    <img src={w.img} alt={w.title} />
                  </div>
                  <div className="z3-why-block__body">
                    <h3 className="z3-why-block__title">{w.title}</h3>
                    <p className="z3-why-block__desc">{w.desc}</p>
                    <ul className="z3-why-points">
                      {w.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <Link className="z3-btn-ghost" to={routesName.LIEN_HE}>See Pricing →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Partner logos ── */}
        <div className="z3-partners">
          <div className="container">
            <p className="z3-partners__label">Trusted by leading companies worldwide</p>
            <div className="z3-partners__logos">
              {partnerLogos.map((lg) => (
                <div key={lg} className="z3-partners__logo">
                  <img src={`${Z}/${lg}`} alt={lg.replace("-lg", "")} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Case studies ── */}
        <div className="z3-cases">
          <div className="container">
            <h2 className="z3-s-title z3-center">They Choose ZW3D</h2>
          </div>
          <div className="di-marquee">
            <div className="di-marquee-track">
              {[...caseStudies, ...caseStudies].map((s, i) => (
                <div key={i} className="dib-item">
                  <div className="dib-img"><img src={s.img} alt={s.name} /></div>
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

        {/* ── Awards & Reviews ── */}
        <AwardSection />
        <ReviewSection />

        {/* ── CTA ── */}
        <div className="z3-cta">
          <div className="z3-cta__overlay" />
          <div className="container z3-cta__inner">
            <div>
              <h2 className="z3-cta__title">Get started with ZW3D 2026 now</h2>
              <p className="z3-cta__sub">Start sparking creativity and boosting efficiency right away.</p>
            </div>
            <div className="z3-cta__btns">
              <Link className="z3-btn-fill" to={routesName.TAI_VE}>Free Trial</Link>
              <Link className="z3-btn-line" to={routesName.LIEN_HE}>See Pricing</Link>
              <Link className="z3-btn-line" to={routesName.LIEN_HE}>Contact Sales</Link>
            </div>
          </div>
        </div>

        {/* ── Explore more ── */}
        <div className="z3-more">
          <div className="container">
            <h2 className="z3-s-title z3-center">Explore More Products</h2>
            <div className="z3-more__grid">
              <Link to={routesName.SAN_PHAM_ZWCAD} className="z3-more__card">
                <div className="z3-more__logo"><img src="/image-zwcad/logo/zwcadmb" alt="ZWCAD" /></div>
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
        </div>

      </div>
    </>
  );
}
