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
    title: "Part Design",
    synopsis:
      "With mixed modeling methods, ZW3D part design capabilities let you create and modify complex parts with precision and speed.",
    video: `${Z}/Video1.mp4`,
    items: [
      {
        title: "Professional and accurate modeling for part design",
        details: "Parametric design, direct edit, and surface modeling for both precise and agile modeling.",
      },
      {
        title: "Tailored modules for advanced scenarios",
        details: "Sheet metal, structural design, harness, ECAD/MCAD, piping, mold, and electrodes design.",
      },
      {
        title: "Develop and manage design variations with ease",
        details: "Multiple Configuration helps compare alternatives and manage product variants in one file.",
      },
      {
        title: "Communicate complex design with simplicity",
        details: "Web-based viewing and HTML export for fast sharing and lightweight model access.",
      },
    ],
  },
  {
    tab: "Assembly Design",
    title: "Assembly Design",
    synopsis:
      "ZW3D enables users to manage complex assemblies with smart tools that accelerate design and improve integration.",
    video: `${Z}/Video2.mp4`,
    items: [
      {
        title: "Extremely smooth performance to handle complex assemblies",
        details: "Advanced display engines keep large assemblies responsive with lightweight technology.",
      },
      {
        title: "Smart tools to speed up assembly design",
        details: "Flexible Assembly, Smart Fastener, and Standard Part Library reduce manual operations.",
      },
      {
        title: "Accurate and flawless assembly",
        details: "Interference check and associative updates maintain fit and design integrity.",
      },
      {
        title: "Clear concept presentation with intuitive animation",
        details: "Exploded views and animations improve communication of assembly structure and sequence.",
      },
    ],
  },
  {
    tab: "2D Drawing",
    title: "2D Drawing",
    synopsis:
      "ZW3D streamlines 2D drawing creation by automating repetitive tasks with associative links to 3D models.",
    video: `${Z}/Video3.mp4`,
    items: [
      {
        title: "Associative data updates for consistent design intent",
        details: "Sync 2D drawings with 3D models and preserve manufacturing intent with PMI support.",
      },
      {
        title: "Intuitive and automated 2D drawing creation",
        details: "Annotation and symbol libraries plus batch output and auto-drafting speed up documentation.",
      },
      {
        title: "High-speed 2D drawing generation",
        details: "Advanced projection technology for rapid and accurate production-ready drawings.",
      },
    ],
  },
  {
    tab: "Simulation (CAE)",
    title: "Simulation (CAE)",
    synopsis: "Integrated design-simulation solution for optimized designs and informed decisions.",
    video: `${Z}/Video4.mp4`,
    items: [
      {
        title: "Perfect your design early with accurate insights",
        details: "Unified CAD/CAE workflow with consistent data continuity to reduce errors and rework.",
      },
      {
        title: "Professional simulation tools for targeted scenarios",
        details: "Structural, vibration, heat transfer, and fatigue analysis validated in industrial use.",
      },
      {
        title: "Works with legacy models and connects to industry",
        details: "Broad file exchange support for common CAD/CAE formats and legacy simulation models.",
      },
      {
        title: "Accurate data and advanced multi-physics coupling",
        details: "Smooth data transfer across disciplines such as structural and thermal analysis.",
      },
    ],
  },
  {
    tab: "Manufacturing (CAM)",
    title: "Manufacturing (CAM)",
    synopsis: "Seamless design-to-manufacturing workflow for efficient production.",
    video: `${Z}/Video5.mp4`,
    defaultItem: 1,
    items: [
      {
        title: "High-quality production with comprehensive machining strategies",
        details: "2-5 axis machining, VoluMill CAM add-on, and editable post-processing for CNC systems.",
      },
      {
        title: "Seamless design-to-manufacturing collaboration",
        details: "Built-in CAD keeps CAM toolpaths synchronized with CAD updates and third-party file edits.",
      },
      {
        title: "Proven machining accuracy with advanced simulation tools",
        details: "Toolpath verification and full machine simulation detect issues before production.",
      },
    ],
  },
  {
    tab: "Collaboration",
    title: "Collaboration",
    synopsis:
      "Streamlined product data management enabling collaborative design, data control, and release within ZW3D.",
    video: `${Z}/Video6.mp4`,
    items: [
      {
        title: "Drive R&D productivity with collaborative design",
        details: "Embedded collaboration, web access, shared workspace, and component reuse.",
      },
      {
        title: "Optimize process control to enhance product quality",
        details: "Design iteration control, threaded reviews, assembly clone, and approval history.",
      },
      {
        title: "Ensure data security through unified data management",
        details: "Precise access control, version management, and real-time data synchronization.",
      },
    ],
  },
];
const whyItems = [
  {
    icon: `${Z}/3d_ov6.png`,
    title: "Perpetual license",
    intro: "With a one-time purchase, gain full ownership of ZW3D without recurring subscription fees.",
    detail: "This ensures long-term savings and uninterrupted software usage instead of forced upgrades.",
  },
  {
    icon: `${Z}/3d_ov7.png`,
    title: "Desktop availability",
    intro: "Enjoy offline access and enhanced security with ZW3D's desktop-based solution.",
    detail: "Faster performance for resource-intensive tasks and better control in secure local environments.",
  },
  {
    icon: `${Z}/3d_ov8.png`,
    title: "Competitive pricing",
    intro: "Access a high-performance CAD/CAM solution at a fraction of the cost of premium competitors.",
    detail: "Get powerful capabilities and productivity without compromising value or efficiency.",
  },
  {
    icon: `${Z}/3d_ov9.png`,
    title: "Flexible upgrade policy*",
    intro: "ZW3D's upgrade system ensures your business can evolve without penalty fees between versions.",
    detail: "Stay current with the latest features while controlling long-term software costs.",
  },
];

const legacyItems = [
  {
    icon: `${Z}/3d_ov10.png`,
    name: "Format compatibility",
    intro: "Supports 25+ import/export formats.",
  },
  {
    icon: `${Z}/3d_ov11.png`,
    name: "Accurate conversion results",
    intro: "Retains key attributes, display states, PMI, and includes auto-repair tools.",
  },
  {
    icon: `${Z}/3d_ov12.png`,
    name: "Design continuity",
    intro: "Accesses complete modeling history through IPX.",
  },
  {
    icon: `${Z}/3d_ov13.png`,
    name: "Quick direct editing",
    intro: "Enables fast modifications on native and imported geometry.",
  },
  {
    icon: `${Z}/3d_ov14.png`,
    name: "Rapid data conversion",
    intro: "Imports 500Mb .step files in 80 seconds, exports in 14.",
  },
];

const legacyFormats = [
  ".asm", ".psm", ".exp", ".prt", ".iam", ".par", ".vda", ".iges", "CATPart", ".sldprt", ".ipt",
  ".stp", ".session", ".stl", ".CATProduct", ".igs", ".3dxml", ".model", ".step", ".stpz", ".jt",
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
    const t = setInterval(() => setDiSlide((p) => (p + 1) % caseStudies.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setActiveFeatureItem(f.defaultItem ?? 0);
  }, [activeFeature]);

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
                  Dedicated 3D CAD for <span>general machinery design</span>
                </h2>
                <ul className="z3-dedicated__list">
                  <li>
                    <img src={`${Z}/tk-tick.png`} alt="" aria-hidden="true" />
                    <span>Satisfy all your design needs with a complete workflow from component and assembly design, through structural analysis and 2D drawing.</span>
                  </li>
                  <li>
                    <img src={`${Z}/tk-tick.png`} alt="" aria-hidden="true" />
                    <span>Speed up your design process with industry-specific modules for sheet metal, steel structure, piping, harness, and more.</span>
                  </li>
                  <li>
                    <img src={`${Z}/tk-tick.png`} alt="" aria-hidden="true" />
                    <span>Optimize product performance, shorten product development time, and reduce prototype costs with structural simulation.</span>
                  </li>
                  <li>
                    <img src={`${Z}/tk-tick.png`} alt="" aria-hidden="true" />
                    <span>Effortlessly manage data by having parts, assemblies, 2D drawings, and even CAM plans in one file.</span>
                  </li>
                </ul>
                <a
                  href="https://www.dropbox.com/scl/fi/1y19z0o0o3ge9b4rvfmk4/Flyer_General-Machinery_ZW3D-2026_0702.pdf?rlkey=oqddfboflvhtb9t6jhlh6xdph&st=lpfkawla&dl=1"
                  target="_blank"
                  rel="noreferrer"
                  className="z3-dedicated__link"
                >
                  Explore ZW3D solution for general machinery design
                  <span className="z3-dedicated__arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ── Why ZW3D ── */}
        <div className="z3-why-big">
          <div className="container">
            <div className="z3-why-tag">Why ZW3D</div>
            <h2 className="z3-why-title">
              Lower investment with <span>increased value</span>
            </h2>
            <div className="z3-why-cards">
              {whyItems.map((w, i) => (
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
                Seamlessly integrate your <span className="dg-span">legacy data</span>
              </h2>
              <div className="dg-cont">
                <div className="dg-right">
                  {legacyItems.map((item) => (
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
                <span className="dh-span">Technical expertise </span> to empower your R&amp;D system
              </h2>
              <div className="dh-synopsis">
                Our dedicated technical and consulting teams collaborate closely with your engineers to develop a high-performance R&amp;D system, integrating industry-proven methods to enhance efficiency, flexibility, and scalability.
              </div>
            </div>
            <div className="dh-bottom">
              <div className="dh-left">
                <div className="dh-list">
                  <div className="dh-one">
                    <div className="dh-icon"><img src={`${Z}/3d_ov17.png`} alt="" /></div>
                    <div className="dh-text">
                      <div className="dh-name">Establish design standards and processes</div>
                      <div className="dh-textbox">
                        <p>Streamline repetitive tasks by unifying key design elements and processes.</p>
                        <p>Ensure consistency, interchangeability, and increased overall efficiency across products and projects.</p>
                      </div>
                    </div>
                  </div>
                  <div className="dh-one">
                    <div className="dh-icon"><img src={`${Z}/design-system.svg`} alt="" /></div>
                    <div className="dh-text">
                      <div className="dh-name">Build a parametric design system</div>
                      <div className="dh-textbox">
                        <p>Utilize parameter-driven designs to easily adjust features and behaviors.</p>
                        <p>Enable rapid design iterations without the need for reworking from scratch.</p>
                      </div>
                    </div>
                  </div>
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
              <h2 className="di-top-title">They Choose Us</h2>
              <p className="di-top-desc">Trusted by leading manufacturing companies worldwide</p>
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
                  {caseStudies.map((s, i) => (
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
                    onClick={() => setDiSlide((p) => (p - 1 + caseStudies.length) % caseStudies.length)}
                    aria-label="Previous"
                  >←</button>
                  <button
                    className="di-nav-btn"
                    onClick={() => setDiSlide((p) => (p + 1) % caseStudies.length)}
                    aria-label="Next"
                  >→</button>
                </div>
                <div className="di-nav-dots">
                  {caseStudies.map((_, i) => (
                    <button
                      key={i}
                      className={`di-nav-dot${diSlide === i ? " active" : ""}`}
                      onClick={() => setDiSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <Link className="di-explore-btn" to={routesName.LIEN_HE}>Explore More Case Stories</Link>
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
            <h2 className="z3-cta__title">Get started with ZW3D 2026 now</h2>
            <p className="z3-cta__sub">Start sparking creativity and boosting efficiency right away.</p>
            <div className="z3-cta__btns">
              <Link className="z3-btn-fill" to={routesName.TAI_VE}>Free Trial</Link>
              <Link className="z3-btn-line" to={routesName.LIEN_HE}>See Pricing</Link>
              <Link className="z3-btn-ghost z3-cta__ghost" to={routesName.LIEN_HE}>Contact Sales</Link>
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









