import Seo from "../seo/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Download, ShoppingCart, CheckCircle2, Zap, Globe, Cpu,
  MonitorSmartphone, Settings2, FileCheck2, Star, ChevronRight,
  Layers, Pencil, BarChart3, FileCode2, Users, Headphones,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <Globe className="w-8 h-8 text-[#2f84dd]" />,
    title: "Tương thích DWG 100%",
    desc: "Mở, chỉnh sửa và lưu file DWG/DXF mà không mất dữ liệu.",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#2f84dd]" />,
    title: "Hiệu suất vượt trội",
    desc: "Nhanh hơn 1.98× khi soạn thảo 2D, 3× khi duyệt mô hình 3D.",
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-[#2f84dd]" />,
    title: "Giao diện quen thuộc",
    desc: "Ribbon và phím tắt tương tự AutoCAD, chuyển đổi không cần học lại.",
  },
  {
    icon: <Settings2 className="w-8 h-8 text-[#2f84dd]" />,
    title: "Tuỳ biến cao",
    desc: "LISP, API, menu — mở rộng theo đúng quy trình của doanh nghiệp.",
  },
];

const ADVANCED_FEATURES = [
  { icon: <Layers className="w-5 h-5" />, name: "Parametric Design", desc: "Ràng buộc hình học & kích thước tự động cập nhật." },
  { icon: <FileCode2 className="w-5 h-5" />, name: "PDF Import", desc: "Nhập file PDF thành đối tượng CAD có thể chỉnh sửa." },
  { icon: <FileCheck2 className="w-5 h-5" />, name: "File Compare", desc: "So sánh hai bản vẽ, phát hiện thay đổi tức thì." },
  { icon: <Cpu className="w-5 h-5" />, name: "Point Cloud", desc: "Hiển thị và căn chỉnh dữ liệu đám mây điểm 3D." },
  { icon: <BarChart3 className="w-5 h-5" />, name: "Sheet Set Manager", desc: "Quản lý tập hợp bản vẽ theo dự án một cách có hệ thống." },
  { icon: <Pencil className="w-5 h-5" />, name: "Flexiblock", desc: "Block động linh hoạt, dễ tái sử dụng trong dự án." },
];

const SMART_FEATURES = [
  { icon: <Zap className="w-5 h-5" />, name: "Smart Match", desc: "Tự động nhận diện và ghép đối tượng tương tự." },
  { icon: <Zap className="w-5 h-5" />, name: "Smart Select", desc: "Chọn nhóm đối tượng thông minh theo thuộc tính." },
  { icon: <Zap className="w-5 h-5" />, name: "Smart Plot", desc: "In bản vẽ tự động với thiết lập tối ưu." },
  { icon: <Zap className="w-5 h-5" />, name: "Smart Mouse", desc: "Thao tác chuột đa chức năng, tăng tốc soạn thảo." },
  { icon: <Zap className="w-5 h-5" />, name: "Similar Search", desc: "Tìm kiếm nhanh đối tượng có hình dạng tương đồng." },
  { icon: <Zap className="w-5 h-5" />, name: "Smart Voice", desc: "Điều khiển lệnh bằng giọng nói, rảnh tay vẽ hơn." },
];

const EDITIONS = [
  {
    name: "ZWCAD Standard",
    price: "Liên hệ",
    badge: null,
    desc: "Phù hợp doanh nghiệp vừa và nhỏ cần bản vẽ 2D chuyên nghiệp.",
    features: [
      "Soạn thảo 2D đầy đủ",
      "Tương thích DWG/DXF",
      "LISP & API",
      "In ấn chuyên nghiệp",
      "Hỗ trợ kỹ thuật",
    ],
    cta: "Liên hệ mua",
    highlight: false,
  },
  {
    name: "ZWCAD Professional",
    price: "Liên hệ",
    badge: "Phổ biến nhất",
    desc: "Đầy đủ tính năng 2D/3D, AI và công cụ nâng cao cho kỹ sư.",
    features: [
      "Tất cả tính năng Standard",
      "3D Navigation nhanh 3×",
      "Parametric Design",
      "Point Cloud & PDF Import",
      "Smart AI Features",
      "Sheet Set Manager",
      "File Compare",
    ],
    cta: "Liên hệ mua",
    highlight: true,
  },
];

const TESTIMONIALS = [
  {
    name: "Nguyễn Văn An",
    company: "Công ty Xây dựng Phú Hưng",
    industry: "Kiến trúc & Xây dựng",
    rating: 5,
    quote: "ZWCAD giúp đội ngũ thiết kế của chúng tôi làm việc nhanh hơn 30% mà chi phí bản quyền tiết kiệm đáng kể so với AutoCAD.",
  },
  {
    name: "Trần Thị Bích",
    company: "Cơ khí Đại Dương",
    industry: "Cơ khí chế tạo",
    rating: 5,
    quote: "Tính năng Parametric Design của ZWCAD Professional rất mạnh, file DWG hoàn toàn tương thích với khách hàng dùng AutoCAD.",
  },
  {
    name: "Lê Hoàng Nam",
    company: "Tư vấn Thiết kế MEP",
    industry: "Kỹ thuật hệ thống",
    rating: 4,
    quote: "Đội kỹ sư chuyển sang ZWCAD trong 2 ngày mà không cần đào tạo nhiều nhờ giao diện giống AutoCAD.",
  },
];

const FAQS = [
  {
    q: "ZWCAD có tương thích với AutoCAD không?",
    a: "Có. ZWCAD tương thích 100% với định dạng DWG/DXF của AutoCAD. Bạn có thể mở, chỉnh sửa và lưu file DWG mà không lo mất dữ liệu.",
  },
  {
    q: "ZWCAD có hỗ trợ LISP và API không?",
    a: "Có. ZWCAD hỗ trợ LISP, ARX/ZRX API, giúp bạn tái sử dụng toàn bộ lisp và plugin đang dùng với AutoCAD.",
  },
  {
    q: "Có thể dùng thử ZWCAD trước khi mua không?",
    a: "Có. Bạn có thể tải bản dùng thử 30 ngày miễn phí với đầy đủ tính năng Professional tại trang Tải về.",
  },
  {
    q: "ZWCAD có bản quyền vĩnh viễn không?",
    a: "Có. ZWCAD cung cấp cả gói bản quyền vĩnh viễn lẫn gói thuê bao năm, tuỳ nhu cầu doanh nghiệp.",
  },
  {
    q: "Có hỗ trợ kỹ thuật tại Việt Nam không?",
    a: "Có. FocusTech là đối tác phân phối chính thức tại Việt Nam, cung cấp hỗ trợ cài đặt, đào tạo và bảo hành.",
  },
];

export default function ProductPage() {
  return (
    <main>
      <Seo
        title="ZWCAD – Phần mềm CAD chuyên nghiệp | ZWCAD Vietnam"
        description="ZWCAD – giải pháp CAD tương thích DWG, hiệu suất cao, chi phí tối ưu. Soạn thảo 2D/3D chuyên nghiệp cho doanh nghiệp Việt Nam."
        keywords="zwcad, phần mềm cad, zwcad vietnam, zwcad 2025, autocad alternative"
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2e] via-[#0f2444] to-[#1a3a6e] text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #2f84dd 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <Badge variant="blue" className="mb-4 text-sm px-3 py-1">Phiên bản mới nhất 2025</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              ZWCAD
            </h1>
            <p className="text-2xl md:text-3xl font-light text-blue-200 mb-4">
              Kiến tạo những điều tuyệt vời
            </p>
            <p className="text-base md:text-lg text-slate-300 mb-8 max-w-xl">
              Phần mềm CAD mạnh mẽ — tương thích DWG 100%, hiệu suất vượt trội,
              giao diện quen thuộc. Giải pháp tối ưu cho doanh nghiệp Việt Nam.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-[#2f84dd] hover:bg-[#1a6ec4] text-white gap-2">
                <Download className="w-5 h-5" />
                Dùng thử miễn phí 30 ngày
              </Button>
              <Button size="lg" variant="outline"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20 gap-2">
                <ShoppingCart className="w-5 h-5" />
                Liên hệ mua bản quyền
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-6">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-slate-300 ml-1">4.8/5 từ khách hàng Việt Nam</span>
            </div>
          </div>
        </div>
        {/* decorative grid lines */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #2f84dd 0px, transparent 1px, transparent 80px)", backgroundSize: "80px 80px" }} />
      </section>

      {/* ── HIGHLIGHTS ───────────────────────────────────── */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="flex flex-col items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#e8f2ff]">{h.icon}</div>
                <h3 className="font-semibold text-[#1f242d]">{h.title}</h3>
                <p className="text-sm text-[#596273]">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────── */}
      <section className="bg-[#f6f9fd] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="blue" className="mb-3">Tổng quan sản phẩm</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f242d] mb-5">
              Giải pháp CAD toàn diện cho mọi ngành
            </h2>
            <p className="text-[#596273] text-lg leading-relaxed">
              ZWCAD là phần mềm CAD chuyên nghiệp, hỗ trợ soạn thảo 2D phức tạp và điều hướng 3D nâng cao.
              Được tin dùng bởi hàng triệu kỹ sư tại 100+ quốc gia, ZWCAD mang lại hiệu suất vượt trội
              với chi phí tối ưu — lựa chọn lý tưởng thay thế AutoCAD cho doanh nghiệp Việt Nam.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { stat: "1.98×", label: "Nhanh hơn khi soạn thảo 2D", color: "text-[#2f84dd]" },
              { stat: "3×", label: "Nhanh hơn khi duyệt mô hình 3D", color: "text-[#2f84dd]" },
              { stat: "100+", label: "Quốc gia sử dụng ZWCAD", color: "text-[#2f84dd]" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border p-8 text-center shadow-sm">
                <div className={`text-5xl font-extrabold ${s.color} mb-2`}>{s.stat}</div>
                <div className="text-[#596273] text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="blue" className="mb-3">Tính năng</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f242d]">
              Công cụ mạnh mẽ cho mọi tác vụ
            </h2>
          </div>
          <Tabs defaultValue="advanced" className="max-w-4xl mx-auto">
            <TabsList className="w-full mb-8 h-12 bg-[#f0f4fa] p-1">
              <TabsTrigger value="advanced"
                className="flex-1 h-10 data-[state=active]:bg-[#2f84dd] data-[state=active]:text-white font-medium">
                Tính năng nâng cao
              </TabsTrigger>
              <TabsTrigger value="smart"
                className="flex-1 h-10 data-[state=active]:bg-[#2f84dd] data-[state=active]:text-white font-medium">
                Tính năng AI thông minh
              </TabsTrigger>
            </TabsList>
            <TabsContent value="advanced">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ADVANCED_FEATURES.map((f) => (
                  <Card key={f.name} className="hover:shadow-md transition-shadow border-[#e8edf5]">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#e8f2ff] text-[#2f84dd]">{f.icon}</div>
                        <CardTitle className="text-base">{f.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[#596273]">{f.desc}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="smart">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SMART_FEATURES.map((f) => (
                  <Card key={f.name} className="hover:shadow-md transition-shadow border-[#e8edf5]">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#fff3e0] text-[#f59e0b]">{f.icon}</div>
                        <CardTitle className="text-base">{f.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[#596273]">{f.desc}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── PRODUCT EDITIONS ─────────────────────────────── */}
      <section className="bg-[#f6f9fd] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="blue" className="mb-3">Phiên bản</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f242d] mb-3">
              Chọn phiên bản phù hợp
            </h2>
            <p className="text-[#596273]">Liên hệ FocusTech để nhận báo giá tốt nhất cho doanh nghiệp của bạn.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {EDITIONS.map((ed) => (
              <Card key={ed.name}
                className={`relative flex flex-col ${ed.highlight
                  ? "border-2 border-[#2f84dd] shadow-lg shadow-[#2f84dd]/10"
                  : "border-[#e8edf5]"}`}>
                {ed.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#2f84dd] text-white px-4 py-1 text-xs font-semibold">
                      {ed.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl">{ed.name}</CardTitle>
                  <CardDescription className="text-[#596273]">{ed.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5 mb-6">
                    {ed.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[#1f242d]">
                        <CheckCircle2 className="w-4 h-4 text-[#2f84dd] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full gap-2 ${ed.highlight
                      ? "bg-[#2f84dd] hover:bg-[#1a6ec4] text-white"
                      : "border border-[#2f84dd] text-[#2f84dd] bg-transparent hover:bg-[#e8f2ff]"}`}
                    size="lg">
                    <ShoppingCart className="w-4 h-4" />
                    {ed.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="blue" className="mb-3">Ngành nghề</Badge>
            <h2 className="text-3xl font-bold text-[#1f242d]">
              Được sử dụng rộng rãi trong nhiều lĩnh vực
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["Kiến trúc", "Xây dựng & Dân dụng", "Cơ khí chế tạo", "Điện & Điện tử",
              "Hạ tầng & Giao thông", "Nội thất & Trang trí", "GIS & Bản đồ", "Đóng tàu"].map(ind => (
              <div key={ind}
                className="flex items-center gap-2 bg-[#f0f4fa] hover:bg-[#e8f2ff] transition-colors rounded-full px-5 py-2.5 text-sm font-medium text-[#1f242d] cursor-default">
                <ChevronRight className="w-3.5 h-3.5 text-[#2f84dd]" />
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="bg-[#f6f9fd] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="blue" className="mb-3">Khách hàng nói gì</Badge>
            <h2 className="text-3xl font-bold text-[#1f242d]">Được tin dùng bởi hàng nghìn kỹ sư</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="flex flex-col border-[#e8edf5] hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-[#1f242d] text-sm leading-relaxed italic">"{t.quote}"</p>
                </CardHeader>
                <CardContent className="mt-auto pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#e8f2ff] flex items-center justify-center text-[#2f84dd] font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#1f242d]">{t.name}</div>
                      <div className="text-xs text-[#596273]">{t.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="blue" className="mb-3">FAQ</Badge>
            <h2 className="text-3xl font-bold text-[#1f242d]">Câu hỏi thường gặp</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-[#1f242d] hover:no-underline hover:text-[#2f84dd] font-medium">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#596273] leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── SUPPORT + CTA ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0d1b2e] to-[#1a3a6e] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Hỗ trợ chuyên sâu tại Việt Nam</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                FocusTech là đối tác phân phối chính thức của ZWSOFT tại Việt Nam.
                Đội ngũ kỹ thuật viên chuyên nghiệp sẵn sàng hỗ trợ cài đặt, đào tạo và bảo hành.
              </p>
              <div className="space-y-3">
                {[
                  { icon: <Headphones className="w-5 h-5" />, text: "Hotline: 0982 286 072 (Hà Nội) | 0918 134 888 (HCM)" },
                  { icon: <Users className="w-5 h-5" />, text: "Đào tạo sử dụng, tư vấn triển khai tận nơi" },
                  { icon: <FileCheck2 className="w-5 h-5" />, text: "Bảo hành bản quyền, hỗ trợ nâng cấp định kỳ" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-white/10 text-blue-300 shrink-0">{item.icon}</div>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Bắt đầu ngay hôm nay</h3>
              <p className="text-slate-300 text-sm mb-6">
                Dùng thử 30 ngày miễn phí — không cần thẻ tín dụng, không cam kết.
              </p>
              <div className="flex flex-col gap-3">
                <Button size="lg" className="bg-[#2f84dd] hover:bg-[#1a6ec4] text-white w-full gap-2">
                  <Download className="w-5 h-5" />
                  Tải dùng thử miễn phí
                </Button>
                <Button size="lg" variant="outline"
                  className="border-white/30 text-white bg-transparent hover:bg-white/10 w-full gap-2">
                  <Headphones className="w-5 h-5" />
                  Liên hệ tư vấn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
