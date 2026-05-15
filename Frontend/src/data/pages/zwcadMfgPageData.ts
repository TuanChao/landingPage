const CDN = "https://zwcdn.zwsoft.com/web/images/zwcad_mfg_ov";
const IMG = "/image-zwcad";
const STATICS = "https://statics.zwsoft.com/upload/admin/20240527";

export interface TimingRow {
  task: string;
  mfg: string;
  zwcad: string;
  preview: string;
}

export interface CompanyLogo {
  src: string;
  alt: string;
}

export interface Testimonial {
  name: string;
  post: string;
  quote: string;
  img: string;
  logo: string;
}

export interface RelatedProduct {
  name: string;
  sub: string;
}

export interface ZWCADMFGPageContent {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    name: string;
    subtitle: string;
    pricingLine1: string;
    pricingLine2: string;
    trialBtn: string;
    pricingBtn: string;
  };
  videoModalTitle: string;
  what: {
    sectionTag: string;
    subtitleHighlight: string;
    subtitleRest: string;
    intro1: string;
    intro2: string;
    trialBtn: string;
    pricingBtn: string;
  };
  feature1: {
    sectionTag: string;
    subtitleHighlight: string;
    subtitleRest: string;
    intro: string;
  };
  feature2: {
    subtitleHighlight: string;
    subtitleRest: string;
    intro: string;
  };
  feature3: {
    subtitleHighlight: string;
    subtitleRest: string;
    intro: string;
  };
  feature4: {
    subtitleRest: string;
    subtitleHighlight: string;
    intro: string;
  };
  benefits: {
    title: string;
    intro: string;
    watchVideoBtn: string;
    learnMoreBtn: string;
    tableHeaders: {
      task: string;
      mfg: string;
      zwcad: string;
    };
    totalTimeLabel: string;
    efficiencyLabel: string;
    efficiencyValue: string;
    hint: string;
    timingRows: TimingRow[];
  };
  chooseUs: {
    titleHighlight: string;
    titleRest: string;
    sub: string;
    companyLogos: CompanyLogo[];
    testimonials: Testimonial[];
  };
  relatedProducts: {
    title: string;
    learnMoreLabel: string;
    items: RelatedProduct[];
  };
  cta: {
    title: string;
    sub: string;
    trialBtn: string;
    contactBtn: string;
  };
}

// ─── English ──────────────────────────────────────────────────────────────────
const en: ZWCADMFGPageContent = {
  seo: {
    title: "ZWCAD MFG - Advanced 2D CAD for Manufacturing",
    description:
      "ZWCAD MFG is an advanced CAD software for manufacturing to enhance overall efficiency with standard parts, intelligent tools, and PLM integration.",
    keywords: "zwcad mfg, manufacturing cad, mechanical drawing, bom, part library",
  },
  hero: {
    name: "ZWCAD MFG",
    subtitle: "Advanced 2D CAD for Manufacturing",
    pricingLine1: "From $1,699, You own it forever",
    pricingLine2: "Perpetual and network licenses available.",
    trialBtn: "Start 30-day Free Trial",
    pricingBtn: "See Pricing",
  },
  videoModalTitle: "ZWCAD MFG Overview",
  what: {
    sectionTag: "What's ZWCAD MFG",
    subtitleHighlight: "Enhance Overall Manufacturing Efficiency",
    subtitleRest: "Advanced CAD Solution to ",
    intro1:
      "Built on the powerful ZWCAD platform, it enables users to create standardized, high-quality designs easier and faster by offering an extensive library of standard parts, intelligent drawing tools, and other productivity-enhancing features.",
    intro2:
      "Moreover, it can be seamlessly integrated into PLM systems to achieve efficient management throughout the product lifecycle.",
    trialBtn: "Start Free Trial",
    pricingBtn: "See Pricing →",
  },
  feature1: {
    sectionTag: "Why ZWCAD MFG",
    subtitleHighlight: "an extensive library of standard parts",
    subtitleRest: "Create standard drawings with ",
    intro:
      "Quickly create drawings compliant with national and international standards, including ISO, EN, DIN, ANSI, ASME, PN, IS, JIS and more. From bolts to screws, and rivets to studs, you'll find the right parts for every project.",
  },
  feature2: {
    subtitleHighlight: "Speed up your design process",
    subtitleRest: " with intelligent tools",
    intro:
      "Automate and accelerate your design workflow with a rich set of drawing tools, intelligent annotation tools, an extensive symbol library and automatic BOMs associated with balloons and part properties.",
  },
  feature3: {
    subtitleHighlight: "Unify design standards",
    subtitleRest: " across your team with customizations",
    intro:
      "Build your own templates with customizable border frames, part library, dimension styles, fonts, technical requirements, and more. Consistent standards across your team ensure accuracy and alignment from start to finish.",
  },
  feature4: {
    subtitleRest: "Manage data and enhance collaboration through ",
    subtitleHighlight: "PLM integration",
    intro:
      "Seamlessly integrate with popular PLM systems, such as Teamcenter® and Windchill® to manage design data more efficiently and strengthen team collaboration.",
  },
  benefits: {
    title: "Benefits of Using ZWCAD MFG",
    intro:
      "We conducted a comprehensive comparison between ZWCAD and ZWCAD MFG, using a hand pump as an example to perform common design tasks from drafting to detailing. The results revealed that ZWCAD MFG significantly boosted productivity by 51% compared to ZWCAD.",
    watchVideoBtn: "Watch the video",
    learnMoreBtn: "Learn More",
    tableHeaders: {
      task: "Project tasks",
      mfg: "ZWCAD MFG",
      zwcad: "ZWCAD",
    },
    totalTimeLabel: "Total Time",
    efficiencyLabel: "Efficiency Improvement",
    efficiencyValue: "51%",
    hint: "(Figures shown in minutes and seconds)",
    timingRows: [
      { task: "Part 1: Set up frame",           mfg: "00:34", zwcad: "01:44", preview: "/zwcad-mfg/da32.png" },
      { task: "Part 2: Modify design",           mfg: "02:22", zwcad: "03:18", preview: "/zwcad-mfg/da33.png" },
      { task: "Part 3: Create part drawing",     mfg: "03:25", zwcad: "05:44", preview: "/zwcad-mfg/da34.png" },
      { task: "Part 4: Create assembly drawing", mfg: "01:50", zwcad: "05:58", preview: "/zwcad-mfg/da35.png" },
    ],
  },
  chooseUs: {
    titleHighlight: "Choose",
    titleRest: "They  Us",
    sub: "Trusted by leading companies worldwide",
    companyLogos: [
      { src: `${STATICS}/591b11b7338abb0f8646e67160e69182.png`, alt: "Gates" },
      { src: `${STATICS}/df6d98a7e0bb4eccc974d7b9faa5b5b7.png`, alt: "Zugspitze" },
      { src: `${STATICS}/d37371841ae91ff166b860bd1433291f.png`, alt: "CRRC" },
      { src: `${STATICS}/deb547381e01e3aefea7ca322ba38398.png`, alt: "LINGLONG TIRE" },
      { src: `${STATICS}/67d41fb1c3089cc935b271884176d61e.png`, alt: "DONGFENG" },
      { src: `${STATICS}/5fac18c9b592715b11e0c9c646254157.png`, alt: "WOLONG" },
      { src: `${STATICS}/fe26536c62fdc54c76f9f144626ee21d.png`, alt: "NWM" },
      { src: `${STATICS}/3508aac08fa2e194d366a0c7de4256c5.png`, alt: "ZHENDE MEDICAL" },
      { src: `${STATICS}/de9c97f21f3c2410e7990773b45f7124.png`, alt: "wencan" },
      { src: `${STATICS}/b6178192f5b1e00466997bb6ea2b17c6.png`, alt: "China Merchants" },
    ],
    testimonials: [
      {
        name: "Gates",
        post: "MFG-Automotive丨China",
        quote:
          "It is highly compatible with popular CAD software and runs smoothly even when you open multiple windows. Its part library is very huge and practical. You can directly use the parts in the library without having to draw them from scratch. This really lightens the load of our drawing work.",
        img: `${STATICS}/7b7058d4808066acbdfe8cf284571b1c.jpeg`,
        logo: `${STATICS}/591b11b7338abb0f8646e67160e69182.png`,
      },
      {
        name: "Linglong Tire",
        post: "MFG-Automative丨China",
        quote:
          "It boosts our design efficiency while cutting down on the expenses of software procurement and implementation.",
        img: `${STATICS}/2cb982c7ea2739c2c351b4c3a4f80db6.jpeg`,
        logo: `${STATICS}/deb547381e01e3aefea7ca322ba38398.png`,
      },
      {
        name: "Wolong",
        post: "MFG-Others丨China",
        quote:
          "It offers some unique functions that enhance our workflow, such as intelligent annotation, super card and detail view. The BOMs generated by it can seamlessly interact with PDM and ERP systems. This really boosts design efficiency.",
        img: `${STATICS}/50ee5334154e2d45c4b2392e678ac133.jpeg`,
        logo: `${STATICS}/5fac18c9b592715b11e0c9c646254157.png`,
      },
    ],
  },
  relatedProducts: {
    title: "Explore More Products",
    learnMoreLabel: "Learn more →",
    items: [
      { name: "ZWCAD",  sub: "DWG-Compatible CAD for Better Productivity" },
      { name: "ZW3D",   sub: "Affordable All-in-One 3D CAD/CAE/CAM" },
    ],
  },
  cta: {
    title: "Get started with ZWCAD MFG today",
    sub: "Revolutionize the way you create — enjoy a 30-day free trial.",
    trialBtn: "Start Free Trial",
    contactBtn: "Contact Sales",
  },
};

// ─── Vietnamese ───────────────────────────────────────────────────────────────
const vi: ZWCADMFGPageContent = {
  seo: {
    title: "ZWCAD MFG - CAD 2D Nâng Cao Cho Sản Xuất",
    description:
      "ZWCAD MFG là phần mềm CAD nâng cao dành cho sản xuất, nâng cao hiệu quả tổng thể với thư viện chi tiết tiêu chuẩn, công cụ thông minh và tích hợp PLM.",
    keywords: "zwcad mfg, cad sản xuất, bản vẽ cơ khí, bom, thư viện chi tiết",
  },
  hero: {
    name: "ZWCAD MFG",
    subtitle: "CAD 2D Nâng Cao Cho Sản Xuất",
    pricingLine1: "Từ $1.699, sở hữu vĩnh viễn",
    pricingLine2: "Có giấy phép vĩnh viễn và giấy phép mạng.",
    trialBtn: "Dùng thử miễn phí 30 ngày",
    pricingBtn: "Xem bảng giá",
  },
  videoModalTitle: "Tổng quan ZWCAD MFG",
  what: {
    sectionTag: "ZWCAD MFG là gì?",
    subtitleHighlight: "Nâng cao hiệu quả sản xuất tổng thể",
    subtitleRest: "Giải pháp CAD nâng cao để ",
    intro1:
      "Được xây dựng trên nền tảng ZWCAD mạnh mẽ, phần mềm giúp người dùng tạo ra các bản thiết kế tiêu chuẩn hóa, chất lượng cao một cách dễ dàng và nhanh chóng hơn nhờ thư viện chi tiết tiêu chuẩn phong phú, công cụ vẽ thông minh và các tính năng nâng cao năng suất khác.",
    intro2:
      "Hơn nữa, phần mềm có thể được tích hợp liền mạch vào các hệ thống PLM để đạt được quản lý hiệu quả trong toàn bộ vòng đời sản phẩm.",
    trialBtn: "Bắt đầu dùng thử miễn phí",
    pricingBtn: "Xem bảng giá →",
  },
  feature1: {
    sectionTag: "Tại sao chọn ZWCAD MFG",
    subtitleHighlight: "thư viện chi tiết tiêu chuẩn phong phú",
    subtitleRest: "Tạo bản vẽ tiêu chuẩn với ",
    intro:
      "Nhanh chóng tạo các bản vẽ tuân thủ tiêu chuẩn quốc gia và quốc tế, bao gồm ISO, EN, DIN, ANSI, ASME, PN, IS, JIS và nhiều hơn nữa. Từ bu lông đến vít, và đinh tán đến chốt, bạn sẽ tìm thấy các chi tiết phù hợp cho mọi dự án.",
  },
  feature2: {
    subtitleHighlight: "Tăng tốc quy trình thiết kế",
    subtitleRest: " với các công cụ thông minh",
    intro:
      "Tự động hóa và đẩy nhanh quy trình thiết kế với bộ công cụ vẽ phong phú, công cụ chú thích thông minh, thư viện ký hiệu mở rộng và BOM tự động được liên kết với bong bóng và thuộc tính chi tiết.",
  },
  feature3: {
    subtitleHighlight: "Thống nhất tiêu chuẩn thiết kế",
    subtitleRest: " trong toàn bộ nhóm với các tùy chỉnh",
    intro:
      "Xây dựng mẫu riêng của bạn với khung viền tùy chỉnh, thư viện chi tiết, kiểu kích thước, phông chữ, yêu cầu kỹ thuật và nhiều hơn nữa. Các tiêu chuẩn nhất quán trong nhóm của bạn đảm bảo độ chính xác và sự thống nhất từ đầu đến cuối.",
  },
  feature4: {
    subtitleRest: "Quản lý dữ liệu và tăng cường cộng tác thông qua ",
    subtitleHighlight: "tích hợp PLM",
    intro:
      "Tích hợp liền mạch với các hệ thống PLM phổ biến như Teamcenter® và Windchill® để quản lý dữ liệu thiết kế hiệu quả hơn và tăng cường cộng tác nhóm.",
  },
  benefits: {
    title: "Lợi ích của việc sử dụng ZWCAD MFG",
    intro:
      "Chúng tôi đã thực hiện so sánh toàn diện giữa ZWCAD và ZWCAD MFG, sử dụng máy bơm tay làm ví dụ để thực hiện các tác vụ thiết kế phổ biến từ phác thảo đến chi tiết hóa. Kết quả cho thấy ZWCAD MFG tăng đáng kể năng suất lên 51% so với ZWCAD.",
    watchVideoBtn: "Xem video",
    learnMoreBtn: "Tìm hiểu thêm",
    tableHeaders: {
      task: "Nhiệm vụ dự án",
      mfg: "ZWCAD MFG",
      zwcad: "ZWCAD",
    },
    totalTimeLabel: "Tổng thời gian",
    efficiencyLabel: "Cải thiện hiệu quả",
    efficiencyValue: "51%",
    hint: "(Số liệu hiển thị theo phút và giây)",
    timingRows: [
      { task: "Phần 1: Thiết lập khung",            mfg: "00:34", zwcad: "01:44", preview: "/zwcad-mfg/da32.png" },
      { task: "Phần 2: Sửa đổi thiết kế",            mfg: "02:22", zwcad: "03:18", preview: "/zwcad-mfg/da33.png" },
      { task: "Phần 3: Tạo bản vẽ chi tiết",         mfg: "03:25", zwcad: "05:44", preview: "/zwcad-mfg/da34.png" },
      { task: "Phần 4: Tạo bản vẽ lắp ráp",         mfg: "01:50", zwcad: "05:58", preview: "/zwcad-mfg/da35.png" },
    ],
  },
  chooseUs: {
    titleHighlight: "Chọn",
    titleRest: "Họ  Chúng Tôi",
    sub: "Được tin dùng bởi các công ty hàng đầu trên toàn thế giới",
    companyLogos: [
      { src: `${STATICS}/591b11b7338abb0f8646e67160e69182.png`, alt: "Gates" },
      { src: `${STATICS}/df6d98a7e0bb4eccc974d7b9faa5b5b7.png`, alt: "Zugspitze" },
      { src: `${STATICS}/d37371841ae91ff166b860bd1433291f.png`, alt: "CRRC" },
      { src: `${STATICS}/deb547381e01e3aefea7ca322ba38398.png`, alt: "LINGLONG TIRE" },
      { src: `${STATICS}/67d41fb1c3089cc935b271884176d61e.png`, alt: "DONGFENG" },
      { src: `${STATICS}/5fac18c9b592715b11e0c9c646254157.png`, alt: "WOLONG" },
      { src: `${STATICS}/fe26536c62fdc54c76f9f144626ee21d.png`, alt: "NWM" },
      { src: `${STATICS}/3508aac08fa2e194d366a0c7de4256c5.png`, alt: "ZHENDE MEDICAL" },
      { src: `${STATICS}/de9c97f21f3c2410e7990773b45f7124.png`, alt: "wencan" },
      { src: `${STATICS}/b6178192f5b1e00466997bb6ea2b17c6.png`, alt: "China Merchants" },
    ],
    testimonials: [
      {
        name: "Gates",
        post: "MFG-Ô tô丨Trung Quốc",
        quote:
          "Phần mềm tương thích cao với các phần mềm CAD phổ biến và chạy mượt mà ngay cả khi mở nhiều cửa sổ. Thư viện chi tiết rất phong phú và thực tế. Bạn có thể sử dụng trực tiếp các chi tiết trong thư viện mà không cần vẽ lại từ đầu. Điều này thực sự giảm bớt gánh nặng công việc vẽ của chúng tôi.",
        img: `${STATICS}/7b7058d4808066acbdfe8cf284571b1c.jpeg`,
        logo: `${STATICS}/591b11b7338abb0f8646e67160e69182.png`,
      },
      {
        name: "Linglong Tire",
        post: "MFG-Ô tô丨Trung Quốc",
        quote:
          "Phần mềm thúc đẩy hiệu quả thiết kế của chúng tôi trong khi giảm chi phí mua sắm và triển khai phần mềm.",
        img: `${STATICS}/2cb982c7ea2739c2c351b4c3a4f80db6.jpeg`,
        logo: `${STATICS}/deb547381e01e3aefea7ca322ba38398.png`,
      },
      {
        name: "Wolong",
        post: "MFG-Khác丨Trung Quốc",
        quote:
          "Phần mềm cung cấp một số chức năng độc đáo nâng cao quy trình làm việc của chúng tôi, như chú thích thông minh, thẻ siêu và chế độ xem chi tiết. BOM được tạo ra có thể tương tác liền mạch với hệ thống PDM và ERP. Điều này thực sự thúc đẩy hiệu quả thiết kế.",
        img: `${STATICS}/50ee5334154e2d45c4b2392e678ac133.jpeg`,
        logo: `${STATICS}/5fac18c9b592715b11e0c9c646254157.png`,
      },
    ],
  },
  relatedProducts: {
    title: "Khám phá thêm sản phẩm",
    learnMoreLabel: "Tìm hiểu thêm →",
    items: [
      { name: "ZWCAD",  sub: "CAD tương thích DWG cho năng suất cao hơn" },
      { name: "ZW3D",   sub: "CAD/CAE/CAM 3D tích hợp, chi phí hợp lý" },
    ],
  },
  cta: {
    title: "Bắt đầu với ZWCAD MFG ngay hôm nay",
    sub: "Cách mạng hóa cách bạn tạo ra — tận hưởng dùng thử miễn phí 30 ngày.",
    trialBtn: "Bắt đầu dùng thử miễn phí",
    contactBtn: "Liên hệ kinh doanh",
  },
};

// ─── Chinese Simplified ───────────────────────────────────────────────────────
const zh: ZWCADMFGPageContent = {
  seo: {
    title: "ZWCAD MFG - 面向制造业的高级2D CAD",
    description:
      "ZWCAD MFG是面向制造业的高级CAD软件，通过标准件库、智能工具和PLM集成提升整体效率。",
    keywords: "zwcad mfg, 制造业cad, 机械图纸, bom, 零件库",
  },
  hero: {
    name: "ZWCAD MFG",
    subtitle: "面向制造业的高级2D CAD",
    pricingLine1: "低至$1,699，永久买断",
    pricingLine2: "支持永久许可证和网络许可证。",
    trialBtn: "开始30天免费试用",
    pricingBtn: "查看价格",
  },
  videoModalTitle: "ZWCAD MFG 概览",
  what: {
    sectionTag: "ZWCAD MFG 简介",
    subtitleHighlight: "提升整体制造效率",
    subtitleRest: "先进的CAD解决方案，",
    intro1:
      "基于强大的ZWCAD平台构建，通过提供丰富的标准件库、智能绘图工具和其他效率提升功能，使用户能够更轻松、更快速地创建标准化高质量设计。",
    intro2:
      "此外，它可以与PLM系统无缝集成，实现整个产品生命周期的高效管理。",
    trialBtn: "开始免费试用",
    pricingBtn: "查看价格 →",
  },
  feature1: {
    sectionTag: "为什么选择ZWCAD MFG",
    subtitleHighlight: "丰富的标准件库",
    subtitleRest: "使用",
    intro:
      "快速创建符合国家和国际标准的图纸，包括ISO、EN、DIN、ANSI、ASME、PN、IS、JIS等。从螺栓到螺钉，从铆钉到螺柱，您可以找到每个项目所需的合适零件。",
  },
  feature2: {
    subtitleHighlight: "加速您的设计流程",
    subtitleRest: "，借助智能工具",
    intro:
      "使用丰富的绘图工具、智能标注工具、完善的符号库以及与气泡和零件属性关联的自动BOM，自动化并加速您的设计工作流程。",
  },
  feature3: {
    subtitleHighlight: "统一团队设计标准",
    subtitleRest: "，通过定制化配置",
    intro:
      "使用可定制的标题栏、零件库、尺寸样式、字体、技术要求等构建专属模板。团队间一致的标准确保从头到尾的准确性和统一性。",
  },
  feature4: {
    subtitleRest: "通过",
    subtitleHighlight: "PLM集成",
    intro:
      "与Teamcenter®和Windchill®等主流PLM系统无缝集成，更高效地管理设计数据，加强团队协作。",
  },
  benefits: {
    title: "使用ZWCAD MFG的优势",
    intro:
      "我们以手动泵为例，对ZWCAD和ZWCAD MFG进行了全面比较，执行从草图到详图的常见设计任务。结果显示，ZWCAD MFG比ZWCAD生产效率显著提升51%。",
    watchVideoBtn: "观看视频",
    learnMoreBtn: "了解更多",
    tableHeaders: {
      task: "项目任务",
      mfg: "ZWCAD MFG",
      zwcad: "ZWCAD",
    },
    totalTimeLabel: "总时间",
    efficiencyLabel: "效率提升",
    efficiencyValue: "51%",
    hint: "（数字以分钟和秒显示）",
    timingRows: [
      { task: "第1部分：设置框架",    mfg: "00:34", zwcad: "01:44", preview: "/zwcad-mfg/da32.png" },
      { task: "第2部分：修改设计",    mfg: "02:22", zwcad: "03:18", preview: "/zwcad-mfg/da33.png" },
      { task: "第3部分：创建零件图",  mfg: "03:25", zwcad: "05:44", preview: "/zwcad-mfg/da34.png" },
      { task: "第4部分：创建装配图",  mfg: "01:50", zwcad: "05:58", preview: "/zwcad-mfg/da35.png" },
    ],
  },
  chooseUs: {
    titleHighlight: "选择",
    titleRest: "他们  了我们",
    sub: "受到全球领先企业的信赖",
    companyLogos: [
      { src: `${STATICS}/591b11b7338abb0f8646e67160e69182.png`, alt: "Gates" },
      { src: `${STATICS}/df6d98a7e0bb4eccc974d7b9faa5b5b7.png`, alt: "Zugspitze" },
      { src: `${STATICS}/d37371841ae91ff166b860bd1433291f.png`, alt: "CRRC" },
      { src: `${STATICS}/deb547381e01e3aefea7ca322ba38398.png`, alt: "LINGLONG TIRE" },
      { src: `${STATICS}/67d41fb1c3089cc935b271884176d61e.png`, alt: "DONGFENG" },
      { src: `${STATICS}/5fac18c9b592715b11e0c9c646254157.png`, alt: "WOLONG" },
      { src: `${STATICS}/fe26536c62fdc54c76f9f144626ee21d.png`, alt: "NWM" },
      { src: `${STATICS}/3508aac08fa2e194d366a0c7de4256c5.png`, alt: "ZHENDE MEDICAL" },
      { src: `${STATICS}/de9c97f21f3c2410e7990773b45f7124.png`, alt: "wencan" },
      { src: `${STATICS}/b6178192f5b1e00466997bb6ea2b17c6.png`, alt: "China Merchants" },
    ],
    testimonials: [
      {
        name: "Gates",
        post: "MFG-汽车丨中国",
        quote:
          "与主流CAD软件高度兼容，即使打开多个窗口也能流畅运行。零件库非常丰富实用，可以直接使用库中的零件，无需从头绘制，大大减轻了我们的绘图工作量。",
        img: `${STATICS}/7b7058d4808066acbdfe8cf284571b1c.jpeg`,
        logo: `${STATICS}/591b11b7338abb0f8646e67160e69182.png`,
      },
      {
        name: "Linglong Tire",
        post: "MFG-汽车丨中国",
        quote: "在提升设计效率的同时，降低了软件采购和实施费用。",
        img: `${STATICS}/2cb982c7ea2739c2c351b4c3a4f80db6.jpeg`,
        logo: `${STATICS}/deb547381e01e3aefea7ca322ba38398.png`,
      },
      {
        name: "Wolong",
        post: "MFG-其他丨中国",
        quote:
          "它提供了一些增强我们工作流程的独特功能，如智能标注、超级卡片和详图视图。生成的BOM可以与PDM和ERP系统无缝交互，极大地提升了设计效率。",
        img: `${STATICS}/50ee5334154e2d45c4b2392e678ac133.jpeg`,
        logo: `${STATICS}/5fac18c9b592715b11e0c9c646254157.png`,
      },
    ],
  },
  relatedProducts: {
    title: "探索更多产品",
    learnMoreLabel: "了解更多 →",
    items: [
      { name: "ZWCAD",  sub: "兼容DWG的高效CAD" },
      { name: "ZW3D",   sub: "经济实惠的一体化3D CAD/CAE/CAM" },
    ],
  },
  cta: {
    title: "立即开始使用ZWCAD MFG",
    sub: "革新您的创作方式 — 享受30天免费试用。",
    trialBtn: "开始免费试用",
    contactBtn: "联系销售",
  },
};

export const zwcadMfgPageData: Record<"vi" | "en" | "zh", ZWCADMFGPageContent> = { vi, en, zh };
