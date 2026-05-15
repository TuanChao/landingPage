const Z = "/zw3d";

export interface FeatureItem {
  title: string;
  details: string;
}

export interface FeatureModule {
  tab: string;
  title: string;
  synopsis: string;
  video: string;
  defaultItem?: number;
  items: FeatureItem[];
}

export interface WhyItem {
  icon: string;
  title: string;
  intro: string;
  detail: string;
}

export interface LegacyItem {
  icon: string;
  name: string;
  intro: string;
}

export interface CaseStudy {
  name: string;
  post: string;
  quote: string;
  img: string;
  logo: string;
}

export interface TechExpertiseItem {
  icon: string;
  name: string;
  paragraphs: string[];
}

export interface DedicatedListItem {
  text: string;
}

export interface ZW3DPageContent {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    tag: string;
    title: string;
    sub: string;
    trialBtn: string;
    pricingBtn: string;
  };
  what: {
    sectionTag: string;
    titleHighlight: string;
    titleRest: string;
    desc1: string;
    desc2: string;
    trialBtn: string;
  };
  cax: {
    titleHighlight: string;
    titleRest: string;
    intro: string;
  };
  featureModules: FeatureModule[];
  dedicated: {
    title: string;
    titleHighlight: string;
    listItems: DedicatedListItem[];
    exploreLink: string;
  };
  why: {
    tag: string;
    titleRest: string;
    titleHighlight: string;
    items: WhyItem[];
  };
  legacy: {
    titleRest: string;
    titleHighlight: string;
    items: LegacyItem[];
  };
  techExpertise: {
    titleHighlight: string;
    titleRest: string;
    synopsis: string;
    items: TechExpertiseItem[];
  };
  chooseUs: {
    title: string;
    sub: string;
    caseStudies: CaseStudy[];
    exploreBtn: string;
  };
  cta: {
    title: string;
    sub: string;
    trialBtn: string;
    pricingBtn: string;
    contactBtn: string;
  };
}

// ─── English ──────────────────────────────────────────────────────────────────
const en: ZW3DPageContent = {
  seo: {
    title: "ZW3D - Unify Design, Simulation, and Manufacturing",
    description:
      "ZW3D is an affordable all-in-one 3D CAD/CAE/CAM platform that unifies design, simulation, and manufacturing. From $3,000, own it forever.",
    keywords: "zw3d, 3d cad software, cae, cam, machinery design, perpetual license",
  },
  hero: {
    tag: "ZW3D 2026",
    title: "Unify Design, Simulation,\nand Manufacturing",
    sub: "From $3,000 — own it forever with 1-year maintenance. Perpetual license, no recurring subscription.",
    trialBtn: "Start 30-day Free Trial",
    pricingBtn: "See Pricing",
  },
  what: {
    sectionTag: "What's ZW3D",
    titleHighlight: "3D CAD",
    titleRest: "Agile  built for professional engineers",
    desc1:
      "With industry-standard 3D CAD capabilities, ZW3D offers an affordable solution with a perpetual license and flexible upgrade options. Its high compatibility ensures smooth data integration and seamless use of legacy files.",
    desc2:
      "Thanks to its intuitive user interface, transitioning is easy, and the learning curve is minimal. Additionally, ZW3D provides stable performance and fast operation, even on low-end workstations.",
    trialBtn: "Try it free →",
  },
  cax: {
    titleHighlight: "All-in-One CAx",
    titleRest: " Solution for the entire product lifecycle",
    intro:
      "The integrated 3D CAD+CAE/CAM/Collaboration solution that can take you through the entire product development journey from conception to production.",
  },
  featureModules: [
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
          details:
            "Annotation and symbol libraries plus batch output and auto-drafting speed up documentation.",
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
  ],
  dedicated: {
    title: "Dedicated 3D CAD for ",
    titleHighlight: "general machinery design",
    listItems: [
      {
        text: "Satisfy all your design needs with a complete workflow from component and assembly design, through structural analysis and 2D drawing.",
      },
      {
        text: "Speed up your design process with industry-specific modules for sheet metal, steel structure, piping, harness, and more.",
      },
      {
        text: "Optimize product performance, shorten product development time, and reduce prototype costs with structural simulation.",
      },
      {
        text: "Effortlessly manage data by having parts, assemblies, 2D drawings, and even CAM plans in one file.",
      },
    ],
    exploreLink: "Explore ZW3D solution for general machinery design",
  },
  why: {
    tag: "Why ZW3D",
    titleRest: "Lower investment with ",
    titleHighlight: "increased value",
    items: [
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
    ],
  },
  legacy: {
    titleRest: "Seamlessly integrate your ",
    titleHighlight: "legacy data",
    items: [
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
    ],
  },
  techExpertise: {
    titleHighlight: "Technical expertise ",
    titleRest: "to empower your R&D system",
    synopsis:
      "Our dedicated technical and consulting teams collaborate closely with your engineers to develop a high-performance R&D system, integrating industry-proven methods to enhance efficiency, flexibility, and scalability.",
    items: [
      {
        icon: `${Z}/3d_ov17.png`,
        name: "Establish design standards and processes",
        paragraphs: [
          "Streamline repetitive tasks by unifying key design elements and processes.",
          "Ensure consistency, interchangeability, and increased overall efficiency across products and projects.",
        ],
      },
      {
        icon: `${Z}/design-system.svg`,
        name: "Build a parametric design system",
        paragraphs: [
          "Utilize parameter-driven designs to easily adjust features and behaviors.",
          "Enable rapid design iterations without the need for reworking from scratch.",
        ],
      },
    ],
  },
  chooseUs: {
    title: "They Choose Us",
    sub: "Trusted by leading manufacturing companies worldwide",
    caseStudies: [
      {
        name: "NEXT Robotics",
        post: "MFG-Machinery | Thailand",
        quote:
          "Reduced software costs by 65% and accelerated design by 40%, reaching 300% faster performance in key operations with ZW3D's all-in-one platform.",
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
        quote:
          "Completed all CAD/CAE/CAM designs for injection molding machines in just 1.5 months and delivered the final product within four months, greatly enhancing productivity and product quality.",
        img: `${Z}/re2.png`,
        logo: `${Z}/re_logo2.svg`,
      },
      {
        name: "APEX",
        post: "Other MFG Industries | Malaysia",
        quote:
          "ZW3D is fully integrated into our steel furniture designs. With about 90% of our R&D designs created in ZW3D, it has streamlined our workflow and efficiency.",
        img: `${Z}/re4.png`,
        logo: `${Z}/re_logo4.svg`,
      },
    ],
    exploreBtn: "Explore More Case Stories",
  },
  cta: {
    title: "Get started with ZW3D 2026 now",
    sub: "Start sparking creativity and boosting efficiency right away.",
    trialBtn: "Free Trial",
    pricingBtn: "See Pricing",
    contactBtn: "Contact Sales",
  },
};

// ─── Vietnamese ───────────────────────────────────────────────────────────────
const vi: ZW3DPageContent = {
  seo: {
    title: "ZW3D - Kết hợp Thiết kế, Mô phỏng và Sản xuất",
    description:
      "ZW3D là nền tảng CAD/CAE/CAM 3D tích hợp, chi phí hợp lý, kết hợp thiết kế, mô phỏng và sản xuất. Từ $3.000, sở hữu vĩnh viễn.",
    keywords: "zw3d, phần mềm cad 3d, cae, cam, thiết kế máy móc, giấy phép vĩnh viễn",
  },
  hero: {
    tag: "ZW3D 2026",
    title: "Kết hợp Thiết kế, Mô phỏng\nvà Sản xuất",
    sub: "Từ $3.000 — sở hữu vĩnh viễn với 1 năm bảo trì. Giấy phép vĩnh viễn, không thuê bao định kỳ.",
    trialBtn: "Dùng thử miễn phí 30 ngày",
    pricingBtn: "Xem bảng giá",
  },
  what: {
    sectionTag: "ZW3D là gì?",
    titleHighlight: "CAD 3D",
    titleRest: "Linh hoạt  được xây dựng cho kỹ sư chuyên nghiệp",
    desc1:
      "Với các tính năng CAD 3D theo tiêu chuẩn công nghiệp, ZW3D cung cấp giải pháp chi phí hợp lý với giấy phép vĩnh viễn và tùy chọn nâng cấp linh hoạt. Khả năng tương thích cao đảm bảo tích hợp dữ liệu mượt mà và sử dụng liền mạch các tệp cũ.",
    desc2:
      "Nhờ giao diện người dùng trực quan, việc chuyển đổi rất dễ dàng và đường cong học tập tối thiểu. Ngoài ra, ZW3D cung cấp hiệu suất ổn định và vận hành nhanh, ngay cả trên các máy trạm cấu hình thấp.",
    trialBtn: "Dùng thử miễn phí →",
  },
  cax: {
    titleHighlight: "Giải pháp CAx tích hợp",
    titleRest: " cho toàn bộ vòng đời sản phẩm",
    intro:
      "Giải pháp CAD+CAE/CAM/Cộng tác 3D tích hợp có thể đưa bạn qua toàn bộ hành trình phát triển sản phẩm từ ý tưởng đến sản xuất.",
  },
  featureModules: [
    {
      tab: "Thiết kế chi tiết",
      title: "Thiết kế chi tiết",
      synopsis:
        "Với các phương pháp mô hình hóa hỗn hợp, khả năng thiết kế chi tiết của ZW3D cho phép bạn tạo và chỉnh sửa các chi tiết phức tạp với độ chính xác và tốc độ cao.",
      video: `${Z}/Video1.mp4`,
      items: [
        {
          title: "Mô hình hóa chuyên nghiệp và chính xác cho thiết kế chi tiết",
          details:
            "Thiết kế tham số, chỉnh sửa trực tiếp và mô hình hóa bề mặt cho cả mô hình hóa chính xác và linh hoạt.",
        },
        {
          title: "Các mô-đun chuyên biệt cho các tình huống nâng cao",
          details:
            "Tôn lá, thiết kế kết cấu, dây điện, ECAD/MCAD, đường ống, khuôn và thiết kế điện cực.",
        },
        {
          title: "Phát triển và quản lý các biến thể thiết kế dễ dàng",
          details:
            "Cấu hình đa dạng giúp so sánh các phương án và quản lý các biến thể sản phẩm trong một tệp.",
        },
        {
          title: "Truyền đạt thiết kế phức tạp một cách đơn giản",
          details: "Xem trên web và xuất HTML để chia sẻ nhanh và truy cập mô hình nhẹ.",
        },
      ],
    },
    {
      tab: "Thiết kế lắp ráp",
      title: "Thiết kế lắp ráp",
      synopsis:
        "ZW3D cho phép người dùng quản lý các cụm lắp ráp phức tạp với các công cụ thông minh giúp đẩy nhanh thiết kế và cải thiện tích hợp.",
      video: `${Z}/Video2.mp4`,
      items: [
        {
          title: "Hiệu suất cực kỳ mượt mà để xử lý các cụm lắp ráp phức tạp",
          details:
            "Các công cụ hiển thị nâng cao giữ cho các cụm lắp ráp lớn phản hồi với công nghệ nhẹ.",
        },
        {
          title: "Công cụ thông minh để tăng tốc thiết kế lắp ráp",
          details:
            "Lắp ráp linh hoạt, Fastener thông minh và Thư viện chi tiết tiêu chuẩn giảm thao tác thủ công.",
        },
        {
          title: "Lắp ráp chính xác và hoàn hảo",
          details: "Kiểm tra xung đột và cập nhật liên kết duy trì độ vừa khít và tính toàn vẹn thiết kế.",
        },
        {
          title: "Trình bày khái niệm rõ ràng với hoạt ảnh trực quan",
          details:
            "Chế độ xem bung và hoạt ảnh cải thiện giao tiếp về cấu trúc và trình tự lắp ráp.",
        },
      ],
    },
    {
      tab: "Bản vẽ 2D",
      title: "Bản vẽ 2D",
      synopsis:
        "ZW3D hợp lý hóa việc tạo bản vẽ 2D bằng cách tự động hóa các tác vụ lặp đi lặp lại với các liên kết liên kết đến mô hình 3D.",
      video: `${Z}/Video3.mp4`,
      items: [
        {
          title: "Cập nhật dữ liệu liên kết để đảm bảo ý định thiết kế nhất quán",
          details:
            "Đồng bộ bản vẽ 2D với mô hình 3D và bảo tồn ý định sản xuất với hỗ trợ PMI.",
        },
        {
          title: "Tạo bản vẽ 2D trực quan và tự động",
          details:
            "Thư viện chú thích và ký hiệu cùng với xuất hàng loạt và vẽ tự động tăng tốc tài liệu.",
        },
        {
          title: "Tạo bản vẽ 2D tốc độ cao",
          details: "Công nghệ chiếu nâng cao để tạo bản vẽ sản xuất nhanh và chính xác.",
        },
      ],
    },
    {
      tab: "Mô phỏng (CAE)",
      title: "Mô phỏng (CAE)",
      synopsis: "Giải pháp thiết kế-mô phỏng tích hợp để tối ưu hóa thiết kế và đưa ra quyết định sáng suốt.",
      video: `${Z}/Video4.mp4`,
      items: [
        {
          title: "Hoàn thiện thiết kế sớm với thông tin chính xác",
          details:
            "Quy trình làm việc CAD/CAE thống nhất với tính liên tục dữ liệu nhất quán để giảm lỗi và làm lại.",
        },
        {
          title: "Công cụ mô phỏng chuyên nghiệp cho các tình huống cụ thể",
          details:
            "Phân tích kết cấu, dao động, truyền nhiệt và mỏi được xác nhận trong sử dụng công nghiệp.",
        },
        {
          title: "Hoạt động với mô hình cũ và kết nối với ngành",
          details:
            "Hỗ trợ trao đổi tệp rộng rãi cho các định dạng CAD/CAE phổ biến và mô hình mô phỏng cũ.",
        },
        {
          title: "Dữ liệu chính xác và khớp nối đa vật lý nâng cao",
          details:
            "Truyền dữ liệu mượt mà giữa các lĩnh vực như phân tích kết cấu và nhiệt.",
        },
      ],
    },
    {
      tab: "Sản xuất (CAM)",
      title: "Sản xuất (CAM)",
      synopsis: "Quy trình làm việc từ thiết kế đến sản xuất liền mạch để sản xuất hiệu quả.",
      video: `${Z}/Video5.mp4`,
      defaultItem: 1,
      items: [
        {
          title: "Sản xuất chất lượng cao với chiến lược gia công toàn diện",
          details: "Gia công 2-5 trục, add-on VoluMill CAM và xử lý hậu kỳ có thể chỉnh sửa cho hệ thống CNC.",
        },
        {
          title: "Cộng tác thiết kế-sản xuất liền mạch",
          details:
            "CAD tích hợp giữ đường dẫn dao CAM đồng bộ với các cập nhật CAD và chỉnh sửa tệp bên thứ ba.",
        },
        {
          title: "Độ chính xác gia công đã được chứng minh với các công cụ mô phỏng nâng cao",
          details: "Xác minh đường dẫn dao và mô phỏng máy đầy đủ phát hiện sự cố trước khi sản xuất.",
        },
      ],
    },
    {
      tab: "Cộng tác",
      title: "Cộng tác",
      synopsis:
        "Quản lý dữ liệu sản phẩm hợp lý cho phép thiết kế cộng tác, kiểm soát dữ liệu và phát hành trong ZW3D.",
      video: `${Z}/Video6.mp4`,
      items: [
        {
          title: "Thúc đẩy năng suất R&D với thiết kế cộng tác",
          details: "Cộng tác nhúng, truy cập web, không gian làm việc chung và tái sử dụng thành phần.",
        },
        {
          title: "Tối ưu hóa kiểm soát quy trình để nâng cao chất lượng sản phẩm",
          details:
            "Kiểm soát lặp thiết kế, đánh giá theo luồng, sao chép lắp ráp và lịch sử phê duyệt.",
        },
        {
          title: "Đảm bảo bảo mật dữ liệu thông qua quản lý dữ liệu thống nhất",
          details: "Kiểm soát truy cập chính xác, quản lý phiên bản và đồng bộ hóa dữ liệu thời gian thực.",
        },
      ],
    },
  ],
  dedicated: {
    title: "CAD 3D chuyên dụng cho ",
    titleHighlight: "thiết kế máy móc tổng quát",
    listItems: [
      {
        text: "Đáp ứng tất cả nhu cầu thiết kế của bạn với quy trình làm việc hoàn chỉnh từ thiết kế chi tiết và cụm lắp ráp, qua phân tích kết cấu và bản vẽ 2D.",
      },
      {
        text: "Tăng tốc quy trình thiết kế với các mô-đun chuyên ngành cho tôn lá, kết cấu thép, đường ống, dây điện và nhiều hơn nữa.",
      },
      {
        text: "Tối ưu hóa hiệu suất sản phẩm, rút ngắn thời gian phát triển sản phẩm và giảm chi phí tạo mẫu với mô phỏng kết cấu.",
      },
      {
        text: "Quản lý dữ liệu dễ dàng khi có các chi tiết, cụm lắp ráp, bản vẽ 2D và thậm chí kế hoạch CAM trong một tệp.",
      },
    ],
    exploreLink: "Khám phá giải pháp ZW3D cho thiết kế máy móc tổng quát",
  },
  why: {
    tag: "Tại sao chọn ZW3D",
    titleRest: "Đầu tư thấp hơn với ",
    titleHighlight: "giá trị cao hơn",
    items: [
      {
        icon: `${Z}/3d_ov6.png`,
        title: "Giấy phép vĩnh viễn",
        intro:
          "Với một lần mua duy nhất, sở hữu hoàn toàn ZW3D mà không cần phí thuê bao định kỳ.",
        detail: "Đảm bảo tiết kiệm lâu dài và sử dụng phần mềm không bị gián đoạn thay vì bị buộc nâng cấp.",
      },
      {
        icon: `${Z}/3d_ov7.png`,
        title: "Phần mềm máy tính để bàn",
        intro: "Tận hưởng quyền truy cập ngoại tuyến và bảo mật nâng cao với giải pháp máy tính để bàn của ZW3D.",
        detail:
          "Hiệu suất nhanh hơn cho các tác vụ tốn nhiều tài nguyên và kiểm soát tốt hơn trong môi trường cục bộ an toàn.",
      },
      {
        icon: `${Z}/3d_ov8.png`,
        title: "Giá cạnh tranh",
        intro: "Truy cập giải pháp CAD/CAM hiệu suất cao với chi phí chỉ bằng một phần của các đối thủ cao cấp.",
        detail:
          "Nhận được khả năng mạnh mẽ và năng suất mà không ảnh hưởng đến giá trị hoặc hiệu quả.",
      },
      {
        icon: `${Z}/3d_ov9.png`,
        title: "Chính sách nâng cấp linh hoạt*",
        intro:
          "Hệ thống nâng cấp của ZW3D đảm bảo doanh nghiệp của bạn có thể phát triển mà không bị phạt giữa các phiên bản.",
        detail: "Luôn cập nhật với các tính năng mới nhất trong khi kiểm soát chi phí phần mềm dài hạn.",
      },
    ],
  },
  legacy: {
    titleRest: "Tích hợp liền mạch ",
    titleHighlight: "dữ liệu cũ của bạn",
    items: [
      {
        icon: `${Z}/3d_ov10.png`,
        name: "Tương thích định dạng",
        intro: "Hỗ trợ hơn 25 định dạng nhập/xuất.",
      },
      {
        icon: `${Z}/3d_ov11.png`,
        name: "Kết quả chuyển đổi chính xác",
        intro: "Giữ lại các thuộc tính chính, trạng thái hiển thị, PMI và bao gồm công cụ tự động sửa chữa.",
      },
      {
        icon: `${Z}/3d_ov12.png`,
        name: "Tính liên tục thiết kế",
        intro: "Truy cập lịch sử mô hình hóa đầy đủ thông qua IPX.",
      },
      {
        icon: `${Z}/3d_ov13.png`,
        name: "Chỉnh sửa trực tiếp nhanh chóng",
        intro: "Cho phép sửa đổi nhanh trên hình học gốc và đã nhập.",
      },
      {
        icon: `${Z}/3d_ov14.png`,
        name: "Chuyển đổi dữ liệu nhanh chóng",
        intro: "Nhập tệp .step 500Mb trong 80 giây, xuất trong 14 giây.",
      },
    ],
  },
  techExpertise: {
    titleHighlight: "Chuyên môn kỹ thuật ",
    titleRest: "để nâng cao hệ thống R&D của bạn",
    synopsis:
      "Các đội ngũ kỹ thuật và tư vấn chuyên dụng của chúng tôi cộng tác chặt chẽ với các kỹ sư của bạn để phát triển hệ thống R&D hiệu suất cao, tích hợp các phương pháp đã được chứng minh trong ngành để nâng cao hiệu quả, linh hoạt và khả năng mở rộng.",
    items: [
      {
        icon: `${Z}/3d_ov17.png`,
        name: "Thiết lập tiêu chuẩn và quy trình thiết kế",
        paragraphs: [
          "Hợp lý hóa các tác vụ lặp đi lặp lại bằng cách thống nhất các yếu tố và quy trình thiết kế chính.",
          "Đảm bảo tính nhất quán, khả năng hoán đổi và tăng hiệu quả tổng thể giữa các sản phẩm và dự án.",
        ],
      },
      {
        icon: `${Z}/design-system.svg`,
        name: "Xây dựng hệ thống thiết kế tham số",
        paragraphs: [
          "Sử dụng các thiết kế dựa trên tham số để dễ dàng điều chỉnh tính năng và hành vi.",
          "Cho phép lặp thiết kế nhanh chóng mà không cần làm lại từ đầu.",
        ],
      },
    ],
  },
  chooseUs: {
    title: "Họ Chọn Chúng Tôi",
    sub: "Được tin dùng bởi các công ty sản xuất hàng đầu trên toàn thế giới",
    caseStudies: [
      {
        name: "NEXT Robotics",
        post: "MFG-Máy móc | Thái Lan",
        quote:
          "Giảm chi phí phần mềm 65% và tăng tốc thiết kế 40%, đạt hiệu suất nhanh hơn 300% trong các hoạt động chính với nền tảng tích hợp của ZW3D.",
        img: `${Z}/re2.png`,
        logo: `${Z}/re_logo2.svg`,
      },
      {
        name: "Huynh Duc MFG",
        post: "MFG-Kỹ thuật chính xác | Việt Nam",
        quote:
          "Rút ngắn chu kỳ thiết kế từ vài tuần xuống còn vài ngày bằng cách sử dụng môi trường CAD/CAM tích hợp hoàn toàn của ZW3D.",
        img: `${Z}/re4.png`,
        logo: `${Z}/re_logo4.svg`,
      },
      {
        name: "Welltec",
        post: "MFG-Máy móc | Trung Quốc",
        quote:
          "Hoàn thành tất cả thiết kế CAD/CAE/CAM cho máy ép phun chỉ trong 1,5 tháng và giao sản phẩm cuối cùng trong vòng bốn tháng, tăng đáng kể năng suất và chất lượng sản phẩm.",
        img: `${Z}/re2.png`,
        logo: `${Z}/re_logo2.svg`,
      },
      {
        name: "APEX",
        post: "Các ngành MFG khác | Malaysia",
        quote:
          "ZW3D được tích hợp đầy đủ vào các thiết kế nội thất thép của chúng tôi. Với khoảng 90% thiết kế R&D được tạo trong ZW3D, nó đã hợp lý hóa quy trình làm việc và hiệu quả của chúng tôi.",
        img: `${Z}/re4.png`,
        logo: `${Z}/re_logo4.svg`,
      },
    ],
    exploreBtn: "Khám phá thêm câu chuyện khách hàng",
  },
  cta: {
    title: "Bắt đầu với ZW3D 2026 ngay bây giờ",
    sub: "Bắt đầu khai sáng sáng tạo và nâng cao hiệu quả ngay lập tức.",
    trialBtn: "Dùng thử miễn phí",
    pricingBtn: "Xem bảng giá",
    contactBtn: "Liên hệ kinh doanh",
  },
};

// ─── Chinese Simplified ───────────────────────────────────────────────────────
const zh: ZW3DPageContent = {
  seo: {
    title: "ZW3D - 统一设计、仿真与制造",
    description:
      "ZW3D是经济实惠的一体化3D CAD/CAE/CAM平台，统一了设计、仿真和制造。从$3,000起，永久买断。",
    keywords: "zw3d, 三维cad软件, cae, cam, 机械设计, 永久许可证",
  },
  hero: {
    tag: "ZW3D 2026",
    title: "统一设计、仿真\n与制造",
    sub: "低至$3,000 — 含1年维护的永久买断。永久许可证，无需定期订阅。",
    trialBtn: "开始30天免费试用",
    pricingBtn: "查看价格",
  },
  what: {
    sectionTag: "ZW3D 简介",
    titleHighlight: "3D CAD",
    titleRest: "专为专业工程师打造的敏捷",
    desc1:
      "凭借行业标准的3D CAD功能，ZW3D以永久许可证和灵活升级选项提供经济实惠的解决方案。其高度兼容性确保数据平滑集成和旧版文件的无缝使用。",
    desc2:
      "得益于直观的用户界面，过渡非常容易，学习曲线极低。此外，ZW3D提供稳定的性能和快速操作，即使在低端工作站上也不例外。",
    trialBtn: "免费试用 →",
  },
  cax: {
    titleHighlight: "一体化CAx解决方案",
    titleRest: "覆盖整个产品生命周期",
    intro:
      "集成的3D CAD+CAE/CAM/协作解决方案，贯穿从概念到生产的整个产品开发旅程。",
  },
  featureModules: [
    {
      tab: "零件设计",
      title: "零件设计",
      synopsis:
        "借助混合建模方法，ZW3D零件设计功能让您以精度和速度创建和修改复杂零件。",
      video: `${Z}/Video1.mp4`,
      items: [
        {
          title: "专业精确的零件设计建模",
          details: "参数化设计、直接编辑和曲面建模，兼顾精确与敏捷建模。",
        },
        {
          title: "针对高级场景的专用模块",
          details: "钣金、结构设计、线束、ECAD/MCAD、管道、模具和电极设计。",
        },
        {
          title: "轻松开发和管理设计变体",
          details: "多配置功能帮助在一个文件中比较方案和管理产品变体。",
        },
        {
          title: "简单传达复杂设计",
          details: "基于Web的查看和HTML导出，实现快速共享和轻量模型访问。",
        },
      ],
    },
    {
      tab: "装配设计",
      title: "装配设计",
      synopsis:
        "ZW3D使用户能够用智能工具管理复杂装配体，加速设计并改善集成。",
      video: `${Z}/Video2.mp4`,
      items: [
        {
          title: "极其流畅的性能处理复杂装配体",
          details: "先进的显示引擎通过轻量化技术保持大型装配体的响应速度。",
        },
        {
          title: "加速装配设计的智能工具",
          details: "柔性装配、智能紧固件和标准件库减少手动操作。",
        },
        {
          title: "精确完美的装配",
          details: "干涉检查和关联更新保持配合关系和设计完整性。",
        },
        {
          title: "直观动画清晰呈现概念",
          details: "爆炸图和动画改善装配结构和顺序的沟通。",
        },
      ],
    },
    {
      tab: "2D工程图",
      title: "2D工程图",
      synopsis: "ZW3D通过与3D模型的关联链接自动化重复任务，简化2D工程图创建。",
      video: `${Z}/Video3.mp4`,
      items: [
        {
          title: "关联数据更新确保一致的设计意图",
          details: "将2D工程图与3D模型同步，并通过PMI支持保留制造意图。",
        },
        {
          title: "直观自动化的2D工程图创建",
          details: "标注和符号库加上批量输出和自动制图加快文档生成。",
        },
        {
          title: "高速2D工程图生成",
          details: "先进的投影技术快速准确地生成生产就绪工程图。",
        },
      ],
    },
    {
      tab: "仿真分析(CAE)",
      title: "仿真分析(CAE)",
      synopsis: "集成设计-仿真解决方案，优化设计并做出明智决策。",
      video: `${Z}/Video4.mp4`,
      items: [
        {
          title: "通过准确洞察早期完善设计",
          details: "统一的CAD/CAE工作流程，数据连续性一致，减少错误和返工。",
        },
        {
          title: "针对特定场景的专业仿真工具",
          details: "结构、振动、传热和疲劳分析，经工业应用验证。",
        },
        {
          title: "支持旧版模型并连接行业",
          details: "广泛支持常见CAD/CAE格式和旧版仿真模型的文件交换。",
        },
        {
          title: "精确数据和先进多物理场耦合",
          details: "跨学科（如结构和热分析）的顺畅数据传输。",
        },
      ],
    },
    {
      tab: "加工制造(CAM)",
      title: "加工制造(CAM)",
      synopsis: "无缝设计到制造工作流程，实现高效生产。",
      video: `${Z}/Video5.mp4`,
      defaultItem: 1,
      items: [
        {
          title: "全面加工策略实现高质量生产",
          details: "2-5轴加工、VoluMill CAM插件和可编辑的CNC系统后处理器。",
        },
        {
          title: "无缝设计到制造协作",
          details: "内置CAD使CAM刀路与CAD更新和第三方文件编辑保持同步。",
        },
        {
          title: "先进仿真工具验证的加工精度",
          details: "刀路验证和完整机床仿真在生产前发现问题。",
        },
      ],
    },
    {
      tab: "协同设计",
      title: "协同设计",
      synopsis: "简化的产品数据管理，在ZW3D内实现协作设计、数据控制和发布。",
      video: `${Z}/Video6.mp4`,
      items: [
        {
          title: "通过协作设计推动研发生产力",
          details: "嵌入式协作、Web访问、共享工作区和组件复用。",
        },
        {
          title: "优化流程控制以提升产品质量",
          details: "设计迭代控制、线程式审查、装配克隆和审批历史。",
        },
        {
          title: "通过统一数据管理确保数据安全",
          details: "精确的访问控制、版本管理和实时数据同步。",
        },
      ],
    },
  ],
  dedicated: {
    title: "专为",
    titleHighlight: "通用机械设计",
    listItems: [
      {
        text: "通过从零件和装配设计到结构分析和2D工程图的完整工作流程，满足您所有的设计需求。",
      },
      {
        text: "使用钣金、钢结构、管道、线束等行业专用模块加速设计流程。",
      },
      {
        text: "通过结构仿真优化产品性能，缩短产品开发时间，降低样品成本。",
      },
      {
        text: "将零件、装配体、2D工程图甚至CAM方案存储在一个文件中，轻松管理数据。",
      },
    ],
    exploreLink: "探索ZW3D通用机械设计解决方案",
  },
  why: {
    tag: "为什么选择ZW3D",
    titleRest: "更低投资，",
    titleHighlight: "更高价值",
    items: [
      {
        icon: `${Z}/3d_ov6.png`,
        title: "永久许可证",
        intro: "一次性购买，永久拥有ZW3D，无需定期订阅费用。",
        detail: "确保长期节省并持续使用软件，而非被迫升级。",
      },
      {
        icon: `${Z}/3d_ov7.png`,
        title: "桌面端可用",
        intro: "使用ZW3D桌面版，享受离线访问和增强安全性。",
        detail: "在资源密集型任务中提供更快性能，在安全本地环境中提供更好控制。",
      },
      {
        icon: `${Z}/3d_ov8.png`,
        title: "极具竞争力的价格",
        intro: "以顶级竞争对手的极低成本获得高性能CAD/CAM解决方案。",
        detail: "在不影响价值或效率的前提下获得强大功能和生产力。",
      },
      {
        icon: `${Z}/3d_ov9.png`,
        title: "灵活的升级政策*",
        intro: "ZW3D的升级系统确保您的业务在版本之间升级无需支付罚款。",
        detail: "掌控长期软件成本的同时，始终保持最新功能。",
      },
    ],
  },
  legacy: {
    titleRest: "无缝集成您的",
    titleHighlight: "历史数据",
    items: [
      {
        icon: `${Z}/3d_ov10.png`,
        name: "格式兼容性",
        intro: "支持25种以上的导入/导出格式。",
      },
      {
        icon: `${Z}/3d_ov11.png`,
        name: "精确的转换结果",
        intro: "保留关键属性、显示状态、PMI，并包含自动修复工具。",
      },
      {
        icon: `${Z}/3d_ov12.png`,
        name: "设计连续性",
        intro: "通过IPX访问完整的建模历史记录。",
      },
      {
        icon: `${Z}/3d_ov13.png`,
        name: "快速直接编辑",
        intro: "对原生和导入几何体进行快速修改。",
      },
      {
        icon: `${Z}/3d_ov14.png`,
        name: "快速数据转换",
        intro: "80秒导入500Mb .step文件，14秒导出。",
      },
    ],
  },
  techExpertise: {
    titleHighlight: "技术专业知识",
    titleRest: "赋能您的研发体系",
    synopsis:
      "我们专属的技术和咨询团队与您的工程师密切协作，开发高性能研发体系，整合行业验证的方法，提升效率、灵活性和可扩展性。",
    items: [
      {
        icon: `${Z}/3d_ov17.png`,
        name: "建立设计标准和流程",
        paragraphs: [
          "通过统一关键设计要素和流程，简化重复性工作。",
          "确保产品和项目之间的一致性、互换性和整体效率的提升。",
        ],
      },
      {
        icon: `${Z}/design-system.svg`,
        name: "构建参数化设计体系",
        paragraphs: [
          "利用参数驱动设计轻松调整特征和行为。",
          "无需从头返工即可实现快速设计迭代。",
        ],
      },
    ],
  },
  chooseUs: {
    title: "他们选择了我们",
    sub: "受到全球领先制造企业的信赖",
    caseStudies: [
      {
        name: "NEXT Robotics",
        post: "MFG-机械 | 泰国",
        quote:
          "借助ZW3D一体化平台，软件成本降低65%，设计效率提升40%，关键操作性能提升300%。",
        img: `${Z}/re2.png`,
        logo: `${Z}/re_logo2.svg`,
      },
      {
        name: "Huynh Duc MFG",
        post: "MFG-精密工程 | 越南",
        quote: "使用ZW3D完全集成的CAD/CAM环境，将设计周期从数周缩短至数天。",
        img: `${Z}/re4.png`,
        logo: `${Z}/re_logo4.svg`,
      },
      {
        name: "Welltec",
        post: "MFG-机械 | 中国",
        quote:
          "仅用1.5个月完成注塑机的所有CAD/CAE/CAM设计，并在四个月内交付最终产品，大幅提升了生产效率和产品质量。",
        img: `${Z}/re2.png`,
        logo: `${Z}/re_logo2.svg`,
      },
      {
        name: "APEX",
        post: "其他制造业 | 马来西亚",
        quote:
          "ZW3D已完全融入我们的钢制家具设计中。约90%的研发设计在ZW3D中完成，极大地简化了我们的工作流程和效率。",
        img: `${Z}/re4.png`,
        logo: `${Z}/re_logo4.svg`,
      },
    ],
    exploreBtn: "探索更多案例故事",
  },
  cta: {
    title: "立即开始使用ZW3D 2026",
    sub: "即刻激发创意，提升工作效率。",
    trialBtn: "免费试用",
    pricingBtn: "查看价格",
    contactBtn: "联系销售",
  },
};

export const zw3dPageData: Record<"vi" | "en" | "zh", ZW3DPageContent> = { vi, en, zh };
