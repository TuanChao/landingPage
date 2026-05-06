import type { Banner, NewsItem, FaqItem, Product, DownloadItem, ContactSubmission } from "./types";

const ts = "2026-01-01T00:00:00.000Z";

export const seedBanners: Banner[] = [
  {
    id: "b1", createdAt: ts, updatedAt: ts,
    title: "ZWCAD - Giải pháp CAD chuyên nghiệp",
    subtitle: "Tương thích DWG hoàn hảo, hiệu năng vượt trội với chi phí tối ưu",
    image: "/image-zwcad/zwcad/bg-section.png",
    ctaLabel: "Tải về dùng thử",
    ctaHref: "/tai-ve/zwcad-trial",
    order: 1,
    active: true,
  },
  {
    id: "b2", createdAt: ts, updatedAt: ts,
    title: "ZW3D - CAD/CAM 3D toàn diện",
    subtitle: "Thiết kế và gia công cơ khí trong một nền tảng duy nhất",
    image: "/image-zwcad/zwcad/bg-section.png",
    ctaLabel: "Khám phá ZW3D",
    ctaHref: "/san-pham/zw3d",
    order: 2,
    active: true,
  },
];

export const seedNews: NewsItem[] = [
  {
    id: "n1", createdAt: ts, updatedAt: ts,
    slug: "zwcad-2025-ra-mat",
    title: "ZWCAD 2025 chính thức ra mắt",
    category: "Sản phẩm",
    excerpt: "Phiên bản mới với nhiều cải tiến về hiệu năng và tính năng AI.",
    image: "/image-zwcad/news/banner-city.png",
    date: "2025-09-15",
  },
  {
    id: "n2", createdAt: ts, updatedAt: ts,
    slug: "khuyen-mai-cuoi-nam",
    title: "Khuyến mãi cuối năm 2025",
    category: "Khuyến mãi",
    excerpt: "Giảm đến 30% cho khách hàng doanh nghiệp khi mua trên 5 license.",
    date: "2025-11-20",
  },
];

export const seedFaq: FaqItem[] = [
  {
    id: "f1", createdAt: ts, updatedAt: ts,
    slug: "ban-quyen-vinh-vien",
    question: "ZWCAD có bản quyền vĩnh viễn không?",
    answer: "Có. ZWCAD cung cấp cả license vĩnh viễn và thuê bao theo năm.",
    order: 1,
  },
  {
    id: "f2", createdAt: ts, updatedAt: ts,
    slug: "tuong-thich-autocad",
    question: "ZWCAD có tương thích file DWG của AutoCAD không?",
    answer: "Hoàn toàn tương thích DWG/DXF từ R12 đến phiên bản mới nhất.",
    order: 2,
  },
];

export const seedProducts: Product[] = [
  {
    id: "p1", createdAt: ts, updatedAt: ts,
    name: "ZWCAD",
    slug: "zwcad",
    logo: "/zwcad-mfg/zwcad.png",
    description: "Phần mềm CAD 2D/3D tương thích DWG, hiệu năng cao.",
    price: "$899",
    version: "2025",
  },
  {
    id: "p2", createdAt: ts, updatedAt: ts,
    name: "ZW3D",
    slug: "zw3d",
    logo: "/image-zwcad/logo/zwc3d",
    description: "Giải pháp CAD/CAM 3D toàn diện cho cơ khí.",
    price: "$1990",
    version: "2025",
  },
  {
    id: "p3", createdAt: ts, updatedAt: ts,
    name: "ZWCAD MFG",
    slug: "zwcad-mfg",
    logo: "/image-zwcad/logo/zwcadmfg",
    description: "ZWCAD chuyên biệt cho ngành sản xuất.",
    price: "Liên hệ",
    version: "2025",
  },
];

export const seedDownloads: DownloadItem[] = [
  {
    id: "d1", createdAt: ts, updatedAt: ts,
    slug: "zwcad-trial",
    title: "ZWCAD 2025 Trial",
    productSlug: "zwcad",
    version: "2025",
    fileUrl: "https://download.zwsoft.com/zwcad-2025-trial.exe",
    fileSize: "1.2 GB",
  },
  {
    id: "d2", createdAt: ts, updatedAt: ts,
    slug: "zw3d-trial",
    title: "ZW3D 2025 Trial",
    productSlug: "zw3d",
    version: "2025",
    fileUrl: "https://download.zwsoft.com/zw3d-2025-trial.exe",
    fileSize: "1.8 GB",
  },
];

export const seedContacts: ContactSubmission[] = [
  {
    id: "c1", createdAt: "2026-04-20T10:30:00.000Z", updatedAt: "2026-04-20T10:30:00.000Z",
    name: "Nguyễn Văn A", email: "anv@example.com", phone: "0901234567",
    company: "Công ty TNHH ABC",
    message: "Tôi muốn báo giá ZWCAD cho 10 máy.",
    status: "new",
  },
  {
    id: "c2", createdAt: "2026-04-22T14:15:00.000Z", updatedAt: "2026-04-22T14:15:00.000Z",
    name: "Trần Thị B", email: "btt@example.com",
    company: "Công ty Cơ khí XYZ",
    message: "Demo ZW3D giúp với.",
    status: "replied",
  },
];
