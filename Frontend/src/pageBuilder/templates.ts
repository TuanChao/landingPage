// Preset templates cho trang tùy biến. Mỗi template = Puck Data.
// Khi tạo trang mới, user có thể chọn template để có sẵn structure.
import type { Data } from "@measured/puck";

export interface Template {
  id: string;
  name: string;
  description: string;
  data: Data;
}

const blank: Data = { content: [], root: { props: { title: "", description: "", ogImage: "" } } } as any;

const promo: Data = {
  root: { props: { title: "Khuyến mãi", description: "Ưu đãi đặc biệt cho khách hàng mới", ogImage: "" } },
  content: [
    {
      type: "Hero",
      props: {
        id: "hero-1",
        title: "Ưu đãi đặc biệt",
        subtitle: "Giảm giá tới 30% cho khách hàng mới — chỉ trong tháng này.",
        image: "",
        ctaLabel: "Nhận ưu đãi",
        ctaHref: "#cta",
        align: "center",
        overlay: 0.5,
        textColor: "#ffffff",
        minHeight: 480,
      },
    },
    {
      type: "FeatureList",
      props: {
        id: "feat-1",
        cols: 3,
        items: [
          { icon: "🎁", title: "Tặng kèm khóa học", text: "Khóa học cơ bản miễn phí khi mua bản quyền." },
          { icon: "⏱️", title: "Hỗ trợ 24/7",     text: "Đội ngũ kỹ thuật luôn sẵn sàng giải đáp." },
          { icon: "💯", title: "Cam kết chất lượng", text: "Hoàn tiền 100% nếu không hài lòng trong 30 ngày." },
        ],
      },
    },
    {
      type: "CtaBanner",
      props: {
        id: "cta-1",
        title: "Sẵn sàng nâng cấp?",
        subtitle: "Liên hệ ngay để nhận tư vấn miễn phí và mã giảm giá.",
        ctaLabel: "Liên hệ tư vấn",
        ctaHref: "/lien-he",
        bgColor: "#0b1a2b",
        textColor: "#ffffff",
      },
    },
  ],
} as any;

const product: Data = {
  root: { props: { title: "Sản phẩm", description: "Giới thiệu sản phẩm", ogImage: "" } },
  content: [
    {
      type: "Hero",
      props: {
        id: "hero-2",
        title: "Tên sản phẩm",
        subtitle: "Mô tả ngắn về giá trị mang lại cho khách hàng.",
        image: "", ctaLabel: "Tải về dùng thử", ctaHref: "/tai-ve",
        align: "left", overlay: 0.4, textColor: "#ffffff", minHeight: 420,
      },
    },
    {
      type: "Heading",
      props: { id: "h-1", text: "Tính năng nổi bật", level: "h2", align: "center", color: "" },
    },
    {
      type: "FeatureList",
      props: {
        id: "feat-2", cols: 3,
        items: [
          { icon: "⚡", title: "Nhanh chóng", text: "Tối ưu cho hiệu năng cao." },
          { icon: "🔒", title: "An toàn",    text: "Bảo mật chuẩn ngành." },
          { icon: "🎯", title: "Chính xác",  text: "Sai số gần như bằng 0." },
        ],
      },
    },
    {
      type: "Pricing",
      props: {
        id: "price-1",
        title: "Bản Pro", price: "499.000đ", period: "/tháng",
        features: "Tính năng A\nTính năng B\nHỗ trợ kỹ thuật ưu tiên\nCập nhật miễn phí",
        ctaLabel: "Mua ngay", ctaHref: "#", highlight: true,
      },
    },
    {
      type: "Accordion",
      props: {
        id: "faq-1",
        items: [
          { question: "Phần mềm chạy trên hệ điều hành nào?", answer: "Windows 10/11 64-bit." },
          { question: "Tôi có thể dùng thử miễn phí không?",  answer: "Có, bản dùng thử 30 ngày đầy đủ tính năng." },
        ],
      },
    },
  ],
} as any;

export const TEMPLATES: Template[] = [
  { id: "blank",   name: "Trống",                description: "Bắt đầu từ trang trống.", data: blank },
  { id: "promo",   name: "Landing khuyến mãi",   description: "Hero + Features + CTA banner.", data: promo },
  { id: "product", name: "Trang sản phẩm",       description: "Hero + Features + Pricing + FAQ.", data: product },
];
