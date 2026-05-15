const IMG = "/image-zwcad";

export interface WhyItem {
  title: string;
  text: string;
  image: string;
}

export interface DeFeature {
  name: string;
  desc: string;
  icon: string;
  video: string;
}

export interface CaseStudy {
  name: string;
  post: string;
  quote: string;
  img: string;
  logo: string;
}

export interface AppGridItem {
  icon: string;
  label: string;
}

export interface RelatedProduct {
  href: string;
  logo: string;
  name: string;
  intro: string;
}

export interface ZWCADPageContent {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    pricingLine1: string;
    pricingLine2: string;
    trialBtn: string;
    pricingBtn: string;
    score: string;
    scoreLabel: string;
  };
  what: {
    sectionTag: string;
    subtitleHighlight: string;
    subtitleRest: string;
    intro: string;
  };
  why: {
    pill: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    items: WhyItem[];
  };
  features: {
    titleHighlight: string;
    titleRest: string;
    intro: string;
    tabAdvanced: string;
    tabInnovative: string;
    learnMoreBtn: string;
    advanced: DeFeature[];
    innovative: DeFeature[];
  };
  compare: {
    titleHighlight: string;
    titleRest: string;
    sub: string;
    card1Title: string;
    card1Stat: string;
    card2Title: string;
    card2Stat: string;
  };
  apps: {
    title1: string;
    titleHighlight: string;
    intro: string;
    exploreLink: string;
    apiText: string;
    devLink: string;
    grid: AppGridItem[];
  };
  chooseUs: {
    titleHighlight: string;
    titleRest: string;
    sub: string;
    caseStudies: CaseStudy[];
    exploreBtn: string;
  };
  discover: {
    title: string;
    products: RelatedProduct[];
    footnotes: string[];
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
const en: ZWCADPageContent = {
  seo: {
    title: "ZWCAD | ZWCAD Vietnam",
    description:
      "ZWCAD is a powerful CAD solution for complex 2D drafting and advanced 3D navigation, with broad DWG compatibility and smart productivity tools.",
    keywords: "zwcad, cad solution, dwg, smart cad tools",
  },
  hero: {
    eyebrow: "ZWCAD",
    title: "Create Amazing Things",
    pricingLine1: "From $899, You own it forever",
    pricingLine2: "Perpetual and network licenses available.",
    trialBtn: "Start 30-day Free Trial",
    pricingBtn: "See Pricing",
    score: "4.6 out of 5 (316 reviews)",
    scoreLabel: "1st Easiest To Use in General-Purpose CAD software",
  },
  what: {
    sectionTag: "What's ZWCAD",
    subtitleHighlight: "Powerful CAD Solution",
    subtitleRest: "Tailored to Your Needs",
    intro:
      "ZWCAD is a powerful CAD solution for complex 2D drafting and advanced 3D navigation. Widely compatible with DWG and other major formats, it enables seamless collaboration across industries. With an intuitive interface, efficiency-boosting features, and AI-powered tools, ZWCAD helps architects, engineers, and designers bring their ideas to life without limits and confidently shape the future.",
  },
  why: {
    pill: "Why ZWCAD",
    titleLine1: "Compatible, Efficient, and Intuitive:",
    titleHighlight: "Get Started with ZWCAD",
    titleLine2: "in No Time",
    items: [
      {
        title: "Broad Compatibility",
        text: "Work seamlessly with DWG, DXF, DWT, and other common file formats for smooth collaboration.",
        image: `${IMG}/zwcad/da36.png`,
      },
      {
        title: "Familiar and Flexible Interface",
        text: "Whether you prefer Classic or Ribbon, Dark or Light mode, ZWCAD helps your team start working immediately.",
        image: `${IMG}/zwcad/da37.png`,
      },
      {
        title: "Highly Customizable",
        text: "Integrate or develop apps with LISP, VBA, ZRX, and .NET to fit your existing workflow.",
        image: `${IMG}/zwcad/da38.png`,
      },
      {
        title: "Quick Migration",
        text: "Migrate templates, fonts, command aliases, and printer settings quickly with minimal disruption.",
        image: `${IMG}/zwcad/da39.png`,
      },
    ],
  },
  features: {
    titleHighlight: "Powerful and Fast CAD",
    titleRest: ": Do More in Less Time",
    intro:
      "ZWCAD is packed with all the essential tools you need, along with advanced and innovative features designed to boost productivity and help you deliver results faster.",
    tabAdvanced: "Advanced Features",
    tabInnovative: "Innovative Features",
    learnMoreBtn: "Learn more features by versions",
    advanced: [
      {
        name: "Parametric Design",
        desc: "Add geometric and dimension constraints to entities for quick size and shape adjustments.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/01_Parametric_Design.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/01_Parametric_Design.mp4",
      },
      {
        name: "Flexiblock",
        desc: "Flexiblock contains actions and parameters and allows you to change its shape freely.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/02_Flexiblock.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Flexiblock.mp4",
      },
      {
        name: "Point Cloud",
        desc: "Read and process complex point clouds smoothly. You can attach, edit, and manage them.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/03_Point_Cloud.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Point%20Cloud.mp4",
      },
      {
        name: "Sheet Set Manager",
        desc: "View, access, manage, and plot multiple drawings. All of them can be done in one panel.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/04_Sheet_Se_Manager.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Sheet%20Set%20Manager.mp4",
      },
      {
        name: "PDF Import",
        desc: "Import multiple PDF pages as CAD objects in one step.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/05_PDF_Import.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/PDF%20Import.mp4",
      },
      {
        name: "File Compare",
        desc: "Spot the differences between two drawings at once.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/06_File_Compare.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/File%20Compare.mp4",
      },
      {
        name: "Area Table",
        desc: "Automatically calculate area and generate area tables in just a few steps.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/07_Area_Table.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Area%20Table.mp4",
      },
    ],
    innovative: [
      {
        name: "Smart Match",
        desc: "Automatically identify identical shapes and support batch editing.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/1_Smart_Match.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/1_Smart_Match.mp4",
      },
      {
        name: "Similar Search",
        desc: "Search for similar blocks in local files based on a specified graphic.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/2_Similar_Search.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/2_Similar_Search.mp4",
      },
      {
        name: "Smart Plot",
        desc: "Optimize the interface for ease of use and improve plotting efficiency by batch plotting across files and automatic paper size matching.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/3_Smart_Plot.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/3_Smart_Plot.mp4",
      },
      {
        name: "Smart Select",
        desc: "Filter objects based on multiple conditions such as colors, type and attributes.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/4_Smart_Select.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Select.mp4",
      },
      {
        name: "Smart Mouse",
        desc: "Trigger frequently-used commands easily with mouse gestures.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/5_Smart_Mouse.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Mouse.mp4",
      },
      {
        name: "Smart Voice",
        desc: "Annotate with voice messages, saving you the hassle of text editing.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/6_Smart_Voice.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Voice.mp4",
      },
    ],
  },
  compare: {
    titleHighlight: "Comparison",
    titleRest: " with AutoCAD",
    sub: "ZWCAD delivers outstanding performance in both 2D drafting and 3D navigation.",
    card1Title: "Complex 2D Drafting",
    card1Stat: "1.98x as fast as AutoCAD",
    card2Title: "Advanced 3D Navigation",
    card2Stat: "3x as fast as AutoCAD",
  },
  apps: {
    title1: "Power Up Your CAD with Abundant ",
    titleHighlight: "Third-Party Applications",
    intro:
      "We offer over 400 third-party applications for a wide range of industries. No matter what industry you're in, you can always find the right solution to help you work easier, faster, and more accurately.",
    exploreLink: "Explore Our Third-Party Applications",
    apiText:
      "Our platform supports rich APIs including LISP, VBA, ZRX, and .NET, enabling developers to migrate or build applications with ease.",
    devLink: "Get Application Development Support",
    grid: [
      { icon: `${IMG}/zwcad/da40.png`, label: "GIS, Survey and Mapping" },
      { icon: `${IMG}/zwcad/da41.png`, label: "Civil" },
      { icon: `${IMG}/zwcad/da42.png`, label: "Architecture" },
      { icon: `${IMG}/zwcad/da52.png`, label: "Construction" },
      { icon: `${IMG}/zwcad/da43.png`, label: "Structural" },
      { icon: `${IMG}/zwcad/da44.png`, label: "Mechanical" },
      { icon: `${IMG}/zwcad/da45.png`, label: "HVAC Design" },
      { icon: `${IMG}/zwcad/da46.png`, label: "Electrical" },
      { icon: `${IMG}/zwcad/da47.png`, label: "Plant Design" },
    ],
  },
  chooseUs: {
    titleHighlight: "Choose",
    titleRest: "They  Us",
    sub: "Trusted by leading companies worldwide",
    caseStudies: [
      {
        name: "Thang Tien Engineering",
        post: "AEC-MEP | Vietnam",
        quote:
          "Delivered 39 major projects worth $122.5M faster and more collaboratively through ZWCAD's efficient multi-team workflow.",
        img: `${IMG}/lpyeah2025/re1.png`,
        logo: `${IMG}/lpyeah2025/re_logo1.svg`,
      },
      {
        name: "VIMPO MAKİNE",
        post: "MFG-Machinery | Turkey",
        quote:
          "Boosted R&D efficiency and lowered CAD costs by adopting ZWCAD for faster, more flexible 2D workflows.",
        img: `${IMG}/lpyeah2025/re3.png`,
        logo: `${IMG}/lpyeah2025/re_logo3.svg`,
      },
      {
        name: "Steurer GmbH",
        post: "MFG-Interiors | Italy",
        quote:
          "Accelerated design-to-production delivery using ZWCAD's unified 2D/3D drafting tools and precise, workshop-ready outputs.",
        img: `${IMG}/lpyeah2025/re5.png`,
        logo: `${IMG}/lpyeah2025/re_logo5.svg`,
      },
      {
        name: "Madro sp. z o.o.",
        post: "AEC-Architecture | Poland",
        quote:
          "Improved bid-to-construction accuracy and reduced waste with ZWCAD's seamless DWG compatibility and streamlined workflows.",
        img: `${IMG}/lpyeah2025/re6.png`,
        logo: `${IMG}/lpyeah2025/re_logo6.svg`,
      },
    ],
    exploreBtn: "Explore More Case Stories",
  },
  discover: {
    title: "Discover More Products",
    products: [
      {
        href: "/san-pham/zwcad-mfg",
        logo: "/image-zwcad/logo/zwcadmfg",
        name: "ZWCAD MFG",
        intro: "Advanced 2D CAD for Manufacturing",
      },
      {
        href: "#",
        logo: "/zwcad-mfg/zwcad.png",
        name: "ZWCAD Mobile",
        intro: "Fast, Accurate, Easy-to-Use CAD App",
      },
      {
        href: "/san-pham/zw3d",
        logo: "/image-zwcad/logo/zwc3d",
        name: "ZW3D",
        intro: "Affordable All-in-One 3D CAD/CAE/CAM",
      },
    ],
    footnotes: [
      "1. Price may vary by country or region.",
      "2. All trademarks, logos, and brand names are the property of their respective owners. AutoCAD is a registered trademark of Autodesk, Inc.",
    ],
  },
  cta: {
    title: "Get started with ZWCAD 2027 Beta now",
    sub: "Start sparking creativity and boosting efficiency right away.",
    trialBtn: "Free Trial",
    pricingBtn: "See Pricing",
    contactBtn: "Contact Sales",
  },
};

// ─── Vietnamese ───────────────────────────────────────────────────────────────
const vi: ZWCADPageContent = {
  seo: {
    title: "ZWCAD | ZWCAD Việt Nam",
    description:
      "ZWCAD là giải pháp CAD mạnh mẽ cho thiết kế 2D phức tạp và điều hướng 3D nâng cao, tương thích rộng rãi với DWG và các công cụ năng suất thông minh.",
    keywords: "zwcad, phần mềm cad, dwg, công cụ cad thông minh",
  },
  hero: {
    eyebrow: "ZWCAD",
    title: "Tạo Ra Những Điều Tuyệt Vời",
    pricingLine1: "Từ $899, sở hữu vĩnh viễn",
    pricingLine2: "Có giấy phép vĩnh viễn và giấy phép mạng.",
    trialBtn: "Dùng thử miễn phí 30 ngày",
    pricingBtn: "Xem bảng giá",
    score: "4.6/5 (316 đánh giá)",
    scoreLabel: "Hạng 1 Dễ sử dụng nhất trong phần mềm CAD đa năng",
  },
  what: {
    sectionTag: "ZWCAD là gì?",
    subtitleHighlight: "Giải pháp CAD mạnh mẽ",
    subtitleRest: "được tùy chỉnh theo nhu cầu của bạn",
    intro:
      "ZWCAD là giải pháp CAD mạnh mẽ cho thiết kế bản vẽ 2D phức tạp và điều hướng 3D nâng cao. Tương thích rộng rãi với định dạng DWG và các định dạng phổ biến khác, cho phép cộng tác liền mạch giữa các ngành. Với giao diện trực quan, tính năng nâng cao năng suất và công cụ AI, ZWCAD giúp kiến trúc sư, kỹ sư và nhà thiết kế biến ý tưởng thành hiện thực.",
  },
  why: {
    pill: "Tại sao chọn ZWCAD",
    titleLine1: "Tương thích, Hiệu quả và Trực quan:",
    titleHighlight: "Bắt đầu với ZWCAD",
    titleLine2: "ngay lập tức",
    items: [
      {
        title: "Tương thích rộng rãi",
        text: "Làm việc liền mạch với DWG, DXF, DWT và nhiều định dạng tệp phổ biến để cộng tác thuận tiện.",
        image: `${IMG}/zwcad/da36.png`,
      },
      {
        title: "Giao diện quen thuộc và linh hoạt",
        text: "Dù bạn ưa thích Classic hay Ribbon, chế độ Tối hay Sáng, ZWCAD giúp đội ngũ của bạn bắt đầu làm việc ngay lập tức.",
        image: `${IMG}/zwcad/da37.png`,
      },
      {
        title: "Khả năng tùy chỉnh cao",
        text: "Tích hợp hoặc phát triển ứng dụng với LISP, VBA, ZRX và .NET để phù hợp với quy trình làm việc hiện có.",
        image: `${IMG}/zwcad/da38.png`,
      },
      {
        title: "Chuyển đổi nhanh chóng",
        text: "Chuyển đổi mẫu, phông chữ, bí danh lệnh và cài đặt máy in nhanh chóng với ít gián đoạn nhất.",
        image: `${IMG}/zwcad/da39.png`,
      },
    ],
  },
  features: {
    titleHighlight: "CAD Mạnh Mẽ và Nhanh Chóng",
    titleRest: ": Làm Nhiều Hơn Trong Ít Thời Gian Hơn",
    intro:
      "ZWCAD được trang bị đầy đủ các công cụ cần thiết, cùng với các tính năng nâng cao và sáng tạo được thiết kế để tăng năng suất và giúp bạn đạt được kết quả nhanh hơn.",
    tabAdvanced: "Tính năng nâng cao",
    tabInnovative: "Tính năng sáng tạo",
    learnMoreBtn: "Tìm hiểu thêm tính năng theo phiên bản",
    advanced: [
      {
        name: "Thiết kế tham số",
        desc: "Thêm ràng buộc hình học và kích thước cho các đối tượng để điều chỉnh kích thước và hình dạng nhanh chóng.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/01_Parametric_Design.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/01_Parametric_Design.mp4",
      },
      {
        name: "Flexiblock",
        desc: "Flexiblock chứa các hành động và tham số, cho phép bạn thay đổi hình dạng của nó tự do.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/02_Flexiblock.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Flexiblock.mp4",
      },
      {
        name: "Đám mây điểm",
        desc: "Đọc và xử lý đám mây điểm phức tạp một cách mượt mà. Bạn có thể đính kèm, chỉnh sửa và quản lý chúng.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/03_Point_Cloud.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Point%20Cloud.mp4",
      },
      {
        name: "Trình quản lý tập bản vẽ",
        desc: "Xem, truy cập, quản lý và in nhiều bản vẽ. Tất cả đều có thể thực hiện trong một bảng điều khiển.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/04_Sheet_Se_Manager.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Sheet%20Set%20Manager.mp4",
      },
      {
        name: "Nhập PDF",
        desc: "Nhập nhiều trang PDF dưới dạng đối tượng CAD chỉ trong một bước.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/05_PDF_Import.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/PDF%20Import.mp4",
      },
      {
        name: "So sánh tệp",
        desc: "Phát hiện sự khác biệt giữa hai bản vẽ cùng một lúc.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/06_File_Compare.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/File%20Compare.mp4",
      },
      {
        name: "Bảng diện tích",
        desc: "Tự động tính diện tích và tạo bảng diện tích chỉ trong vài bước.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/07_Area_Table.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Area%20Table.mp4",
      },
    ],
    innovative: [
      {
        name: "Khớp thông minh",
        desc: "Tự động nhận dạng các hình dạng giống nhau và hỗ trợ chỉnh sửa hàng loạt.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/1_Smart_Match.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/1_Smart_Match.mp4",
      },
      {
        name: "Tìm kiếm tương tự",
        desc: "Tìm kiếm các khối tương tự trong tệp cục bộ dựa trên đồ họa được chỉ định.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/2_Similar_Search.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/2_Similar_Search.mp4",
      },
      {
        name: "In thông minh",
        desc: "Tối ưu hóa giao diện để dễ sử dụng và cải thiện hiệu quả in ấn bằng cách in hàng loạt qua các tệp và tự động khớp kích thước giấy.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/3_Smart_Plot.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/3_Smart_Plot.mp4",
      },
      {
        name: "Chọn thông minh",
        desc: "Lọc các đối tượng dựa trên nhiều điều kiện như màu sắc, loại và thuộc tính.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/4_Smart_Select.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Select.mp4",
      },
      {
        name: "Chuột thông minh",
        desc: "Kích hoạt các lệnh thường dùng dễ dàng bằng cử chỉ chuột.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/5_Smart_Mouse.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Mouse.mp4",
      },
      {
        name: "Ghi âm thông minh",
        desc: "Chú thích bằng tin nhắn thoại, giúp bạn không phải chỉnh sửa văn bản.",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/6_Smart_Voice.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Voice.mp4",
      },
    ],
  },
  compare: {
    titleHighlight: "So sánh",
    titleRest: " với AutoCAD",
    sub: "ZWCAD mang lại hiệu suất vượt trội trong cả thiết kế bản vẽ 2D và điều hướng 3D.",
    card1Title: "Thiết kế bản vẽ 2D phức tạp",
    card1Stat: "Nhanh hơn AutoCAD 1,98 lần",
    card2Title: "Điều hướng 3D nâng cao",
    card2Stat: "Nhanh hơn AutoCAD 3 lần",
  },
  apps: {
    title1: "Nâng cấp CAD với ",
    titleHighlight: "Ứng dụng bên thứ ba phong phú",
    intro:
      "Chúng tôi cung cấp hơn 400 ứng dụng bên thứ ba cho nhiều ngành công nghiệp. Dù bạn thuộc ngành nào, bạn luôn tìm được giải pháp phù hợp để làm việc dễ dàng hơn, nhanh hơn và chính xác hơn.",
    exploreLink: "Khám phá ứng dụng bên thứ ba",
    apiText:
      "Nền tảng của chúng tôi hỗ trợ các API phong phú bao gồm LISP, VBA, ZRX và .NET, cho phép các nhà phát triển di chuyển hoặc xây dựng ứng dụng dễ dàng.",
    devLink: "Nhận hỗ trợ phát triển ứng dụng",
    grid: [
      { icon: `${IMG}/zwcad/da40.png`, label: "GIS, Khảo sát và Bản đồ" },
      { icon: `${IMG}/zwcad/da41.png`, label: "Xây dựng dân dụng" },
      { icon: `${IMG}/zwcad/da42.png`, label: "Kiến trúc" },
      { icon: `${IMG}/zwcad/da52.png`, label: "Thi công" },
      { icon: `${IMG}/zwcad/da43.png`, label: "Kết cấu" },
      { icon: `${IMG}/zwcad/da44.png`, label: "Cơ khí" },
      { icon: `${IMG}/zwcad/da45.png`, label: "Thiết kế HVAC" },
      { icon: `${IMG}/zwcad/da46.png`, label: "Điện" },
      { icon: `${IMG}/zwcad/da47.png`, label: "Thiết kế nhà máy" },
    ],
  },
  chooseUs: {
    titleHighlight: "Chọn",
    titleRest: "Họ  Chúng Tôi",
    sub: "Được tin dùng bởi các công ty hàng đầu trên toàn thế giới",
    caseStudies: [
      {
        name: "Thang Tien Engineering",
        post: "AEC-MEP | Việt Nam",
        quote:
          "Hoàn thành 39 dự án lớn trị giá $122,5 triệu nhanh hơn và cộng tác hiệu quả hơn nhờ quy trình làm việc đa nhóm hiệu quả của ZWCAD.",
        img: `${IMG}/lpyeah2025/re1.png`,
        logo: `${IMG}/lpyeah2025/re_logo1.svg`,
      },
      {
        name: "VIMPO MAKİNE",
        post: "MFG-Máy móc | Thổ Nhĩ Kỳ",
        quote:
          "Tăng hiệu quả R&D và giảm chi phí CAD bằng cách áp dụng ZWCAD cho quy trình làm việc 2D nhanh hơn và linh hoạt hơn.",
        img: `${IMG}/lpyeah2025/re3.png`,
        logo: `${IMG}/lpyeah2025/re_logo3.svg`,
      },
      {
        name: "Steurer GmbH",
        post: "MFG-Nội thất | Ý",
        quote:
          "Đẩy nhanh tiến độ từ thiết kế đến sản xuất bằng các công cụ vẽ 2D/3D thống nhất của ZWCAD và đầu ra chính xác sẵn sàng cho xưởng.",
        img: `${IMG}/lpyeah2025/re5.png`,
        logo: `${IMG}/lpyeah2025/re_logo5.svg`,
      },
      {
        name: "Madro sp. z o.o.",
        post: "AEC-Kiến trúc | Ba Lan",
        quote:
          "Cải thiện độ chính xác từ đấu thầu đến thi công và giảm lãng phí nhờ khả năng tương thích DWG liền mạch và quy trình làm việc hợp lý của ZWCAD.",
        img: `${IMG}/lpyeah2025/re6.png`,
        logo: `${IMG}/lpyeah2025/re_logo6.svg`,
      },
    ],
    exploreBtn: "Khám phá thêm câu chuyện khách hàng",
  },
  discover: {
    title: "Khám phá thêm sản phẩm",
    products: [
      {
        href: "/san-pham/zwcad-mfg",
        logo: "/image-zwcad/logo/zwcadmfg",
        name: "ZWCAD MFG",
        intro: "CAD 2D nâng cao dành cho sản xuất",
      },
      {
        href: "#",
        logo: "/zwcad-mfg/zwcad.png",
        name: "ZWCAD Mobile",
        intro: "Ứng dụng CAD nhanh, chính xác, dễ sử dụng",
      },
      {
        href: "/san-pham/zw3d",
        logo: "/image-zwcad/logo/zwc3d",
        name: "ZW3D",
        intro: "CAD/CAE/CAM 3D tích hợp, chi phí hợp lý",
      },
    ],
    footnotes: [
      "1. Giá có thể thay đổi tùy theo quốc gia hoặc khu vực.",
      "2. Tất cả nhãn hiệu, logo và tên thương hiệu là tài sản của chủ sở hữu tương ứng. AutoCAD là nhãn hiệu đã đăng ký của Autodesk, Inc.",
    ],
  },
  cta: {
    title: "Bắt đầu với ZWCAD 2027 Beta ngay hôm nay",
    sub: "Bắt đầu khai sáng sáng tạo và nâng cao hiệu quả ngay lập tức.",
    trialBtn: "Dùng thử miễn phí",
    pricingBtn: "Xem bảng giá",
    contactBtn: "Liên hệ kinh doanh",
  },
};

// ─── Chinese Simplified ───────────────────────────────────────────────────────
const zh: ZWCADPageContent = {
  seo: {
    title: "ZWCAD | 中望CAD 越南",
    description:
      "ZWCAD 是功能强大的CAD解决方案，适用于复杂的2D绘图和高级3D导航，兼容DWG格式，配备智能生产力工具。",
    keywords: "zwcad, cad软件, dwg, 智能cad工具",
  },
  hero: {
    eyebrow: "ZWCAD",
    title: "创造非凡之作",
    pricingLine1: "低至$899，永久买断",
    pricingLine2: "支持永久许可证和网络许可证。",
    trialBtn: "开始30天免费试用",
    pricingBtn: "查看价格",
    score: "4.6/5（316条评价）",
    scoreLabel: "通用CAD软件易用性第一名",
  },
  what: {
    sectionTag: "ZWCAD 简介",
    subtitleHighlight: "强大的CAD解决方案",
    subtitleRest: "满足您的个性化需求",
    intro:
      "ZWCAD 是适用于复杂2D绘图和高级3D导航的强大CAD解决方案。广泛兼容DWG及其他主流格式，实现跨行业无缝协作。凭借直观的界面、效率提升功能和AI智能工具，ZWCAD帮助建筑师、工程师和设计师突破创意边界，自信地塑造未来。",
  },
  why: {
    pill: "为什么选择ZWCAD",
    titleLine1: "兼容、高效、直观：",
    titleHighlight: "快速上手ZWCAD",
    titleLine2: "立即投入使用",
    items: [
      {
        title: "广泛兼容",
        text: "无缝支持DWG、DXF、DWT等常见文件格式，实现顺畅协作。",
        image: `${IMG}/zwcad/da36.png`,
      },
      {
        title: "熟悉且灵活的界面",
        text: "无论您偏好经典模式还是功能区模式、暗色或亮色主题，ZWCAD都能让您的团队立即投入工作。",
        image: `${IMG}/zwcad/da37.png`,
      },
      {
        title: "高度可定制",
        text: "通过LISP、VBA、ZRX和.NET集成或开发应用程序，适配您现有的工作流程。",
        image: `${IMG}/zwcad/da38.png`,
      },
      {
        title: "快速迁移",
        text: "快速迁移模板、字体、命令别名和打印机设置，将干扰降至最低。",
        image: `${IMG}/zwcad/da39.png`,
      },
    ],
  },
  features: {
    titleHighlight: "强大快速的CAD",
    titleRest: "：事半功倍",
    intro:
      "ZWCAD 内置所有必备工具，同时提供先进和创新功能，旨在提升生产效率，帮助您更快交付成果。",
    tabAdvanced: "高级功能",
    tabInnovative: "创新功能",
    learnMoreBtn: "按版本了解更多功能",
    advanced: [
      {
        name: "参数化设计",
        desc: "为图元添加几何约束和尺寸约束，快速调整尺寸和形状。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/01_Parametric_Design.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/01_Parametric_Design.mp4",
      },
      {
        name: "动态块",
        desc: "动态块包含动作和参数，允许您自由改变其形状。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/02_Flexiblock.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Flexiblock.mp4",
      },
      {
        name: "点云",
        desc: "流畅读取和处理复杂点云数据，支持附着、编辑和管理。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/03_Point_Cloud.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Point%20Cloud.mp4",
      },
      {
        name: "图纸集管理器",
        desc: "在一个面板中查看、访问、管理和打印多张图纸。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/04_Sheet_Se_Manager.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Sheet%20Set%20Manager.mp4",
      },
      {
        name: "PDF导入",
        desc: "一步将多个PDF页面导入为CAD对象。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/05_PDF_Import.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/PDF%20Import.mp4",
      },
      {
        name: "图纸对比",
        desc: "一次性发现两张图纸之间的差异。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/06_File_Compare.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/File%20Compare.mp4",
      },
      {
        name: "面积表格",
        desc: "仅需几步即可自动计算面积并生成面积表格。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/07_Area_Table.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Area%20Table.mp4",
      },
    ],
    innovative: [
      {
        name: "智能匹配",
        desc: "自动识别相同形状并支持批量编辑。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/1_Smart_Match.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/1_Smart_Match.mp4",
      },
      {
        name: "相似搜索",
        desc: "根据指定图形在本地文件中搜索相似块。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/2_Similar_Search.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/2_Similar_Search.mp4",
      },
      {
        name: "智能打印",
        desc: "优化界面易用性，通过跨文件批量打印和自动纸张尺寸匹配提高打印效率。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/3_Smart_Plot.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/zwcad_ov/3_Smart_Plot.mp4",
      },
      {
        name: "智能选择",
        desc: "根据颜色、类型和属性等多个条件过滤对象。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/4_Smart_Select.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Select.mp4",
      },
      {
        name: "鼠标手势",
        desc: "通过鼠标手势轻松触发常用命令。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/5_Smart_Mouse.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Mouse.mp4",
      },
      {
        name: "语音标注",
        desc: "使用语音消息进行标注，省去文字编辑的繁琐。",
        icon: "https://zwcdn.zwsoft.com/web/images/zwcad_ov/6_Smart_Voice.svg",
        video: "https://statics.zwsoft.com/static/style2020/mp4/cad-ov-2024/Smart%20Voice.mp4",
      },
    ],
  },
  compare: {
    titleHighlight: "与AutoCAD",
    titleRest: "对比",
    sub: "ZWCAD 在2D绘图和3D导航方面均表现出色。",
    card1Title: "复杂2D绘图",
    card1Stat: "速度是AutoCAD的1.98倍",
    card2Title: "高级3D导航",
    card2Stat: "速度是AutoCAD的3倍",
  },
  apps: {
    title1: "借助丰富的",
    titleHighlight: "第三方应用程序",
    intro:
      "我们为各行各业提供超过400款第三方应用程序。无论您身处哪个行业，都能找到合适的解决方案，让您的工作更轻松、更快速、更准确。",
    exploreLink: "探索我们的第三方应用程序",
    apiText:
      "我们的平台支持LISP、VBA、ZRX和.NET等丰富的API，使开发者能够轻松迁移或构建应用程序。",
    devLink: "获取应用开发支持",
    grid: [
      { icon: `${IMG}/zwcad/da40.png`, label: "GIS、测量与制图" },
      { icon: `${IMG}/zwcad/da41.png`, label: "土木工程" },
      { icon: `${IMG}/zwcad/da42.png`, label: "建筑设计" },
      { icon: `${IMG}/zwcad/da52.png`, label: "施工建造" },
      { icon: `${IMG}/zwcad/da43.png`, label: "结构工程" },
      { icon: `${IMG}/zwcad/da44.png`, label: "机械设计" },
      { icon: `${IMG}/zwcad/da45.png`, label: "暖通空调设计" },
      { icon: `${IMG}/zwcad/da46.png`, label: "电气设计" },
      { icon: `${IMG}/zwcad/da47.png`, label: "工厂设计" },
    ],
  },
  chooseUs: {
    titleHighlight: "选择",
    titleRest: "他们  了我们",
    sub: "受到全球领先企业的信赖",
    caseStudies: [
      {
        name: "Thang Tien Engineering",
        post: "AEC-MEP | 越南",
        quote:
          "借助ZWCAD高效的多团队协作工作流，更快、更高效地完成了39个总价值1.225亿美元的重大项目。",
        img: `${IMG}/lpyeah2025/re1.png`,
        logo: `${IMG}/lpyeah2025/re_logo1.svg`,
      },
      {
        name: "VIMPO MAKİNE",
        post: "MFG-机械 | 土耳其",
        quote: "通过采用ZWCAD更快、更灵活的2D工作流程，提升了研发效率并降低了CAD成本。",
        img: `${IMG}/lpyeah2025/re3.png`,
        logo: `${IMG}/lpyeah2025/re_logo3.svg`,
      },
      {
        name: "Steurer GmbH",
        post: "MFG-室内 | 意大利",
        quote:
          "利用ZWCAD统一的2D/3D绘图工具和精确的车间级输出，加快了从设计到生产的交付速度。",
        img: `${IMG}/lpyeah2025/re5.png`,
        logo: `${IMG}/lpyeah2025/re_logo5.svg`,
      },
      {
        name: "Madro sp. z o.o.",
        post: "AEC-建筑 | 波兰",
        quote:
          "借助ZWCAD无缝的DWG兼容性和精简的工作流程，提高了从投标到施工的准确性并减少了浪费。",
        img: `${IMG}/lpyeah2025/re6.png`,
        logo: `${IMG}/lpyeah2025/re_logo6.svg`,
      },
    ],
    exploreBtn: "探索更多案例故事",
  },
  discover: {
    title: "探索更多产品",
    products: [
      {
        href: "/san-pham/zwcad-mfg",
        logo: "/image-zwcad/logo/zwcadmfg",
        name: "ZWCAD MFG",
        intro: "面向制造业的高级2D CAD",
      },
      {
        href: "#",
        logo: "/zwcad-mfg/zwcad.png",
        name: "ZWCAD Mobile",
        intro: "快速、精准、易用的CAD应用",
      },
      {
        href: "/san-pham/zw3d",
        logo: "/image-zwcad/logo/zwc3d",
        name: "ZW3D",
        intro: "经济实惠的一体化3D CAD/CAE/CAM",
      },
    ],
    footnotes: [
      "1. 价格可能因国家或地区而异。",
      "2. 所有商标、标志和品牌名称均为其各自所有者的财产。AutoCAD是Autodesk, Inc.的注册商标。",
    ],
  },
  cta: {
    title: "立即开始使用ZWCAD 2027 Beta",
    sub: "即刻激发创意，提升工作效率。",
    trialBtn: "免费试用",
    pricingBtn: "查看价格",
    contactBtn: "联系销售",
  },
};

export const zwcadPageData: Record<"vi" | "en" | "zh", ZWCADPageContent> = { vi, en, zh };
