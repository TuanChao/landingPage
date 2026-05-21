// Puck config dùng chung cho Editor (admin) và Render (public).
// Block library: Container/Columns (DropZones), Hero, Heading, RichText, Image,
// Button, Card, CardGrid, FeatureList, Accordion, Testimonial, Pricing, LogoStrip,
// Stats, CtaBanner, Video, Divider, Embed, Map, Gallery, Spacer.
import { useEffect, useState } from "react";
import type { Config, Fields } from "@measured/puck";
import { DropZone } from "@measured/puck";
import { ImagePickerField, RichTextField, ColorField } from "./fields";
import { resolveAssetUrl, API_BASE_URL } from "@/admin/api";
import "./blocks.css";

// ── Helpers ────────────────────────────────────────────────────────────────
const ALIGN_OPTIONS = [
  { label: "Trái", value: "left" },
  { label: "Giữa", value: "center" },
  { label: "Phải", value: "right" },
];

const ANIM_OPTIONS = [
  { label: "Không", value: "" },
  { label: "Fade up",  value: "fadeUp" },
  { label: "Fade in",  value: "fadeIn" },
  { label: "Zoom in",  value: "zoomIn" },
];

const ANIM_FIELD = { type: "select" as const, label: "Hiệu ứng vào màn", options: ANIM_OPTIONS };

const WIDTH_OPTIONS = [
  { label: "Auto",  value: "auto" },
  { label: "25%",   value: "25" },
  { label: "33%",   value: "33" },
  { label: "50%",   value: "50" },
  { label: "66%",   value: "66" },
  { label: "75%",   value: "75" },
  { label: "100%",  value: "100" },
];
const WIDTH_FIELD = { type: "select" as const, label: "Chiều rộng", options: WIDTH_OPTIONS };

// Bọc block trong wrapper align + width. Container ngoài cho phép căn trái/giữa/phải.
function widthWrapStyle(widthPct?: string, align: string = "center"): React.CSSProperties {
  const w = widthPct && widthPct !== "auto" ? `${widthPct}%` : undefined;
  const justify = align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";
  return { display: "flex", justifyContent: justify, padding: "8px 0" };
}
function widthInnerStyle(widthPct?: string): React.CSSProperties {
  return widthPct && widthPct !== "auto"
    ? { width: `${widthPct}%`, maxWidth: "100%" }
    : { width: "auto", maxWidth: "100%" };
}

// Wrapper class cho animation. Đặt ở element ngoài cùng của render.
function animClass(animate?: string) {
  return animate ? `pb-anim pb-anim--${animate}` : "";
}
function combineCls(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

const align = (align?: string) =>
  ({ textAlign: (align as any) ?? "left" } as React.CSSProperties);

// Resolve URL ảnh (uploaded /uploads/... → absolute). Public-safe.
function imgUrl(u?: string): string {
  if (!u) return "";
  try { return resolveAssetUrl(u) || u; } catch { return u; }
}

// ── Component props types ──────────────────────────────────────────────────
type HeroProps = {
  title: string; subtitle: string; image: string;
  ctaLabel: string; ctaHref: string;
  align: "left" | "center";
  overlay: number;       // 0..1
  textColor: string;
  minHeight: number;
};
type HeadingProps = { text: string; level: "h1"|"h2"|"h3"|"h4"; align: "left"|"center"|"right"; color: string; anchor: string };
type RichTextBlockProps = { html: string };
type ImageBlockProps = { src: string; alt: string; maxWidth: number; widthPct: string; height: number; fit: "cover"|"contain"|"fill"|"none"; align: "left"|"center"|"right"; rounded: number };
type ButtonProps = { label: string; href: string; variant: "primary"|"ghost"|"outline"; size: "sm"|"md"|"lg"; align: "left"|"center"|"right"; bgColor: string; textColor: string };
type SpacerProps = { height: number };
type DividerProps = { color: string; thickness: number; marginY: number };
type ContainerProps = { bgColor: string; bgImage: string; padding: number; maxWidth: number; minHeight: number; rounded: number; align: "left"|"center"|"right"; anchor: string; animate: string; hideOn: string };
type ColumnsProps = { count: 2|3|4; gap: number; colSizes: string };

type CardItem = { image: string; title: string; text: string; href: string; ctaLabel: string };
type CardProps = CardItem & { rounded: number; shadow: boolean; widthPct: string; align: "left"|"center"|"right"; imageHeight: number };
type CardGridProps = { items: CardItem[]; cols: 2|3|4; gap: number; imageHeight: number };

type FeatureItem = { icon: string; title: string; text: string };
type FeatureListProps = { items: FeatureItem[]; cols: 1|2|3|4 };

type AccordionItem = { question: string; answer: string };
type AccordionProps = { items: AccordionItem[] };

type TestimonialProps = { avatar: string; name: string; role: string; quote: string; align: "left"|"center"; widthPct: string };

type PricingProps = { title: string; price: string; period: string; features: string; ctaLabel: string; ctaHref: string; highlight: boolean; widthPct: string; align: "left"|"center"|"right" };

type LogoStripProps = { items: { src: string; alt: string }[]; height: number };

type StatItem = { value: string; label: string };
type StatsProps = { items: StatItem[] };

type CtaBannerProps = { title: string; subtitle: string; ctaLabel: string; ctaHref: string; bgColor: string; textColor: string };

type VideoProps = { url: string; aspect: "16:9"|"4:3"|"1:1"; maxWidth: number };
type EmbedProps = { html: string };
type MapProps = { embedUrl: string; height: number };
type GalleryProps = { items: { src: string; alt: string }[]; cols: 2|3|4; gap: number };

// ── Interactive blocks (mới) ──────────────────────────────────────────────
type TabsProps = { tabs: { label: string }[] };
type StepItem = { title: string; text: string };
type StepsProps = { items: StepItem[]; numbered: boolean };
type QuoteProps = { text: string; author: string; role: string; widthPct: string; align: "left"|"center"|"right" };
type CountdownProps = { targetDate: string; expiredText: string };
type StickyCtaProps = { text: string; ctaLabel: string; ctaHref: string; showAfterPx: number };
type LeadFormProps = {
  title: string; subtitle: string; submitLabel: string; successMessage: string;
  showPhone: boolean; messagePlaceholder: string; tag: string;
  widthPct: string; align: "left"|"center"|"right";
};

export type Components = {
  Container: ContainerProps;
  Columns: ColumnsProps;
  Hero: HeroProps;
  Heading: HeadingProps;
  RichText: RichTextBlockProps;
  Image: ImageBlockProps;
  Button: ButtonProps;
  Spacer: SpacerProps;
  Divider: DividerProps;
  Card: CardProps;
  CardGrid: CardGridProps;
  FeatureList: FeatureListProps;
  Accordion: AccordionProps;
  Testimonial: TestimonialProps;
  Pricing: PricingProps;
  LogoStrip: LogoStripProps;
  Stats: StatsProps;
  CtaBanner: CtaBannerProps;
  Video: VideoProps;
  Embed: EmbedProps;
  Map: MapProps;
  Gallery: GalleryProps;
  Tabs: TabsProps;
  Steps: StepsProps;
  Quote: QuoteProps;
  Countdown: CountdownProps;
  StickyCta: StickyCtaProps;
  LeadForm: LeadFormProps;
};

// ── Root SEO/meta + layout fields ──────────────────────────────────────────
type RootProps = {
  title: string; description: string; ogImage: string;
  hideChrome: boolean; bgColor: string; customCss: string;
};
const rootFields: Fields<RootProps> = {
  title: { type: "text", label: "SEO Title" },
  description: { type: "textarea", label: "SEO Description" },
  ogImage: ImagePickerField("OG Image (mạng xã hội)"),
  hideChrome: { type: "radio", label: "Ẩn Header/Footer site", options: [
    { label: "Có (landing thuần)", value: true as any },
    { label: "Không", value: false as any },
  ]},
  bgColor: ColorField("Màu nền trang"),
  customCss: { type: "textarea", label: "Custom CSS (advanced)" },
};

// ── Button render helper ───────────────────────────────────────────────────
function btnStyle(variant: string, size: string, bg?: string, color?: string): React.CSSProperties {
  const sizes: Record<string, [string, number]> = { sm: ["6px 14px", 13], md: ["10px 22px", 15], lg: ["14px 28px", 17] };
  const [pad, fs] = sizes[size] ?? sizes.md;
  const base: React.CSSProperties = {
    display: "inline-block", padding: pad, borderRadius: 6, fontWeight: 600,
    textDecoration: "none", fontSize: fs, cursor: "pointer",
  };
  if (variant === "primary") return { ...base, background: bg || "#e63946", color: color || "#fff", border: "none" };
  if (variant === "ghost")   return { ...base, background: "transparent", color: color || "#0b1a2b", border: "none" };
  return { ...base, background: "transparent", color: color || "#0b1a2b", border: `2px solid ${color || "#0b1a2b"}` };
}

// ── Config ─────────────────────────────────────────────────────────────────
export const puckConfig: Config<Components, RootProps> = {
  root: {
    fields: rootFields,
    defaultProps: { title: "", description: "", ogImage: "", hideChrome: false, bgColor: "", customCss: "" } as any,
    render: (props: any) => (
      <div style={{ width: "100%", background: props.bgColor || undefined, minHeight: "100%" }}>
        {props.customCss ? <style dangerouslySetInnerHTML={{ __html: props.customCss }} /> : null}
        {props.children}
      </div>
    ),
  },
  categories: {
    layout:      { title: "Bố cục",      components: ["Container", "Columns", "Spacer", "Divider"] },
    content:     { title: "Nội dung",    components: ["Hero", "Heading", "RichText", "Image", "Button", "Quote", "Video", "CtaBanner"] },
    blocks:      { title: "Block",       components: ["Card", "CardGrid", "FeatureList", "Steps", "Accordion", "Testimonial", "Pricing", "LogoStrip", "Stats", "Gallery"] },
    interactive: { title: "Tương tác",   components: ["Tabs", "Countdown", "StickyCta", "LeadForm"] },
    advanced:    { title: "Nâng cao",    components: ["Embed", "Map"] },
  },
  components: {
    // ── Layout ────────────────────────────────────────────────────────────
    Container: {
      label: "Container",
      fields: {
        bgColor: ColorField("Màu nền"),
        bgImage: ImagePickerField("Ảnh nền"),
        padding: { type: "number", label: "Padding (px)" },
        maxWidth: { type: "number", label: "Max width (px)" },
        minHeight: { type: "number", label: "Min height (px)" },
        rounded: { type: "number", label: "Bo góc (px)" },
        align: { type: "radio", options: ALIGN_OPTIONS },
        anchor: { type: "text", label: "Anchor ID (deep link: #id)" },
        animate: ANIM_FIELD,
        hideOn: { type: "select", label: "Ẩn trên", options: [
          { label: "Không ẩn", value: "" },
          { label: "Mobile (≤768px)", value: "mobile" },
          { label: "Desktop (>768px)", value: "desktop" },
        ]},
      },
      defaultProps: { bgColor: "", bgImage: "", padding: 48, maxWidth: 1100, minHeight: 0, rounded: 0, align: "left", anchor: "", animate: "", hideOn: "" },
      render: ({ bgColor, bgImage, padding, maxWidth, minHeight, rounded, align: a, anchor, animate, hideOn }) => (
        <div id={anchor || undefined} className={combineCls("pb-container", animClass(animate), hideOn === "mobile" && "pb-hide-mobile", hideOn === "desktop" && "pb-hide-desktop")} style={{
          background: bgImage ? `url(${imgUrl(bgImage)}) center/cover` : (bgColor || undefined),
          padding: `${padding}px 16px`,
          borderRadius: rounded,
          minHeight: minHeight || undefined,
        }}>
          <div style={{ maxWidth, margin: "0 auto", textAlign: a as any }}>
            <DropZone zone="inner" />
          </div>
        </div>
      ),
    },

    Columns: {
      label: "Cột / Hàng",
      fields: {
        count: { type: "select", label: "Số cột", options: [
          { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 },
        ]},
        colSizes: { type: "text", label: "Tỷ lệ cột (vd: 1,2,1 hoặc 30%,70%)" },
        gap: { type: "number", label: "Khoảng cách (px)" },
      },
      defaultProps: { count: 2, gap: 24, colSizes: "" },
      render: ({ count, gap, colSizes }) => {
        // Parse "1,2,1" → "1fr 2fr 1fr"; "30%,70%" → "30% 70%"; rỗng → equal
        const parts = (colSizes || "").split(",").map((s) => s.trim()).filter(Boolean);
        let template: string;
        if (parts.length === count) {
          template = parts.map((p) => /%|px|fr|auto/.test(p) ? p : `${p}fr`).join(" ");
        } else {
          template = `repeat(${count}, 1fr)`;
        }
        return (
          <div className="pb-grid" style={{ display: "grid", gridTemplateColumns: template, gap, padding: "16px 0" }}>
            {Array.from({ length: count }, (_, i) => (
              <DropZone key={i} zone={`col-${i + 1}`} />
            ))}
          </div>
        );
      },
    },

    Spacer: {
      label: "Khoảng trắng",
      fields: { height: { type: "number", label: "Chiều cao (px)" } },
      defaultProps: { height: 32 },
      render: ({ height }) => <div style={{ height }} />,
    },

    Divider: {
      label: "Đường kẻ",
      fields: {
        color: ColorField("Màu"),
        thickness: { type: "number", label: "Độ dày (px)" },
        marginY: { type: "number", label: "Margin trên/dưới (px)" },
      },
      defaultProps: { color: "#e5e7eb", thickness: 1, marginY: 24 },
      render: ({ color, thickness, marginY }) => (
        <hr style={{ border: 0, borderTop: `${thickness}px solid ${color}`, margin: `${marginY}px 0` }} />
      ),
    },

    // ── Content ──────────────────────────────────────────────────────────
    Hero: {
      label: "Hero",
      fields: {
        title: { type: "text", label: "Tiêu đề" },
        subtitle: { type: "textarea", label: "Mô tả" },
        image: ImagePickerField("Ảnh nền"),
        ctaLabel: { type: "text", label: "Nhãn nút" },
        ctaHref: { type: "text", label: "Link nút" },
        align: { type: "radio", options: [
          { label: "Trái", value: "left" }, { label: "Giữa", value: "center" },
        ]},
        overlay: { type: "number", label: "Overlay (0-1)" },
        textColor: ColorField("Màu chữ"),
        minHeight: { type: "number", label: "Min height (px)" },
      },
      defaultProps: {
        title: "Tiêu đề hero", subtitle: "Mô tả ngắn cho hero section",
        image: "", ctaLabel: "Tìm hiểu thêm", ctaHref: "#",
        align: "center", overlay: 0.45, textColor: "#ffffff", minHeight: 420,
      },
      render: ({ title, subtitle, image, ctaLabel, ctaHref, align: a, overlay, textColor, minHeight }) => (
        <section className="pb-hero" style={{
          position: "relative", minHeight,
          display: "flex", alignItems: "center",
          justifyContent: a === "center" ? "center" : "flex-start",
          padding: "60px 32px",
          color: image ? textColor : "#0b1a2b",
          backgroundImage: image
            ? `linear-gradient(rgba(0,0,0,${overlay}),rgba(0,0,0,${overlay})),url(${imgUrl(image)})`
            : undefined,
          backgroundColor: image ? undefined : "#f3f6fb",
          backgroundSize: "cover", backgroundPosition: "center",
          textAlign: a,
        }}>
          <div style={{ maxWidth: 720 }}>
            <h1 style={{ fontSize: 44, margin: "0 0 14px", lineHeight: 1.15 }}>{title}</h1>
            <p style={{ fontSize: 18, opacity: 0.9, margin: "0 0 22px", whiteSpace: "pre-wrap" }}>{subtitle}</p>
            {ctaLabel && (
              <a href={ctaHref || "#"} style={btnStyle("primary", "lg")}>{ctaLabel}</a>
            )}
          </div>
        </section>
      ),
    },

    Heading: {
      label: "Tiêu đề",
      fields: {
        text: { type: "text" },
        level: { type: "select", options: [
          { label: "H1", value: "h1" }, { label: "H2", value: "h2" },
          { label: "H3", value: "h3" }, { label: "H4", value: "h4" },
        ]},
        align: { type: "radio", options: ALIGN_OPTIONS },
        color: ColorField("Màu"),
        anchor: { type: "text", label: "Anchor ID (deep link: #id)" },
      },
      defaultProps: { text: "Tiêu đề", level: "h2", align: "left", color: "", anchor: "" },
      render: ({ text, level, align: a, color, anchor }) => {
        const Tag = level as keyof JSX.IntrinsicElements;
        return (
          <div style={align(a)}>
            <Tag id={anchor || undefined} style={{ margin: "0 0 8px", color: color || undefined, scrollMarginTop: 80 }}>{text}</Tag>
          </div>
        );
      },
    },

    RichText: {
      label: "Văn bản",
      fields: { html: RichTextField("Nội dung") },
      defaultProps: { html: "<p>Nhập nội dung ở đây…</p>" },
      render: ({ html }) => (
        <div className="pb-richtext" style={{ lineHeight: 1.7, padding: "8px 0" }}
             dangerouslySetInnerHTML={{ __html: html }} />
      ),
    },

    Image: {
      label: "Ảnh",
      fields: {
        src: ImagePickerField("Ảnh"),
        alt: { type: "text", label: "Alt text" },
        widthPct: WIDTH_FIELD,
        maxWidth: { type: "number", label: "Max width (px) — khi Auto" },
        height: { type: "number", label: "Chiều cao cố định (px) — 0 = auto" },
        fit: { type: "select", label: "Crop mode (khi có height)", options: [
          { label: "Cover (lấp đầy, crop ngoài)", value: "cover" },
          { label: "Contain (vừa khung, để khoảng trắng)", value: "contain" },
          { label: "Fill (kéo dãn)", value: "fill" },
          { label: "None (không crop)", value: "none" },
        ]},
        align: { type: "radio", options: ALIGN_OPTIONS },
        rounded: { type: "number", label: "Bo góc (px)" },
      },
      defaultProps: { src: "", alt: "", widthPct: "auto", maxWidth: 800, height: 0, fit: "cover", align: "center", rounded: 0 },
      render: (props) => <ImageBlock {...props} />,
    },

    Button: {
      label: "Nút",
      fields: {
        label: { type: "text", label: "Nhãn" },
        href: { type: "text", label: "Link" },
        variant: { type: "select", options: [
          { label: "Primary", value: "primary" }, { label: "Outline", value: "outline" }, { label: "Ghost", value: "ghost" },
        ]},
        size: { type: "select", options: [
          { label: "Nhỏ", value: "sm" }, { label: "Vừa", value: "md" }, { label: "Lớn", value: "lg" },
        ]},
        align: { type: "radio", options: ALIGN_OPTIONS },
        bgColor: ColorField("Màu nền"),
        textColor: ColorField("Màu chữ"),
      },
      defaultProps: { label: "Bấm vào đây", href: "#", variant: "primary", size: "md", align: "left", bgColor: "", textColor: "" },
      render: ({ label, href, variant, size, align: a, bgColor, textColor }) => (
        <div style={{ ...align(a), padding: "8px 0" }}>
          <a href={href || "#"} style={btnStyle(variant, size, bgColor, textColor)}>{label}</a>
        </div>
      ),
    },

    Video: {
      label: "Video",
      fields: {
        url: { type: "text", label: "URL YouTube / MP4" },
        aspect: { type: "select", options: [
          { label: "16:9", value: "16:9" }, { label: "4:3", value: "4:3" }, { label: "1:1", value: "1:1" },
        ]},
        maxWidth: { type: "number", label: "Max width (px)" },
      },
      defaultProps: { url: "", aspect: "16:9", maxWidth: 960 },
      render: ({ url, aspect, maxWidth }) => {
        const ratios: Record<string, string> = { "16:9": "56.25%", "4:3": "75%", "1:1": "100%" };
        const yt = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
        const isMp4 = /\.(mp4|webm|ogg)(\?|$)/i.test(url);
        return (
          <div style={{ maxWidth, margin: "0 auto", padding: "8px 0" }}>
            <div style={{ position: "relative", paddingBottom: ratios[aspect] || "56.25%", height: 0, background: "#000" }}>
              {yt ? (
                <iframe
                  src={`https://www.youtube.com/embed/${yt[1]}`}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                  allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
                />
              ) : isMp4 ? (
                <video src={url} controls style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#fff" }}>Dán URL YouTube hoặc file video</div>
              )}
            </div>
          </div>
        );
      },
    },

    CtaBanner: {
      label: "CTA Banner",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        ctaLabel: { type: "text" },
        ctaHref: { type: "text" },
        bgColor: ColorField("Màu nền"),
        textColor: ColorField("Màu chữ"),
      },
      defaultProps: {
        title: "Sẵn sàng bắt đầu?", subtitle: "Tải về dùng thử miễn phí 30 ngày, không yêu cầu thẻ tín dụng.",
        ctaLabel: "Tải về ngay", ctaHref: "#",
        bgColor: "#0b1a2b", textColor: "#ffffff",
      },
      render: ({ title, subtitle, ctaLabel, ctaHref, bgColor, textColor }) => (
        <section className="pb-cta-banner" style={{
          background: bgColor || "#0b1a2b", color: textColor || "#fff",
          padding: "48px 32px", textAlign: "center", borderRadius: 8,
        }}>
          <h2 style={{ fontSize: 32, margin: "0 0 8px" }}>{title}</h2>
          <p style={{ fontSize: 17, opacity: 0.9, margin: "0 0 20px", whiteSpace: "pre-wrap" }}>{subtitle}</p>
          {ctaLabel && (
            <a href={ctaHref || "#"} style={btnStyle("primary", "lg")}>{ctaLabel}</a>
          )}
        </section>
      ),
    },

    // ── Blocks ───────────────────────────────────────────────────────────
    Card: {
      label: "Card",
      fields: {
        image: ImagePickerField("Ảnh"),
        title: { type: "text" },
        text: { type: "textarea" },
        href: { type: "text", label: "Link card" },
        ctaLabel: { type: "text", label: "Nhãn CTA" },
        widthPct: WIDTH_FIELD,
        imageHeight: { type: "number", label: "Chiều cao ảnh (px)" },
        align: { type: "radio", options: ALIGN_OPTIONS },
        rounded: { type: "number", label: "Bo góc (px)" },
        shadow: { type: "radio", options: [
          { label: "Có", value: true as any }, { label: "Không", value: false as any },
        ]},
      },
      defaultProps: { image: "", title: "Tiêu đề card", text: "Mô tả ngắn cho card.", href: "#", ctaLabel: "Xem thêm", widthPct: "auto", imageHeight: 180, align: "center", rounded: 8, shadow: true },
      render: ({ image, title, text, href, ctaLabel, widthPct, imageHeight, align: a, rounded, shadow }) => (
        <div style={widthWrapStyle(widthPct, a)}>
          <div style={widthInnerStyle(widthPct)}>
            <a href={href || "#"} style={{
              display: "block", textDecoration: "none", color: "inherit",
              border: "1px solid #e5e7eb", borderRadius: rounded, overflow: "hidden",
              boxShadow: shadow ? "0 2px 8px rgba(0,0,0,.08)" : "none", background: "#fff",
              maxWidth: widthPct === "auto" ? 360 : undefined,
            }}>
              {image && <img src={imgUrl(image)} alt={title} style={{ width: "100%", height: imageHeight, objectFit: "cover", display: "block" }} />}
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{title}</h3>
                <p style={{ margin: "0 0 12px", color: "#555", lineHeight: 1.6 }}>{text}</p>
                {ctaLabel && <span style={{ color: "#e63946", fontWeight: 600 }}>{ctaLabel} →</span>}
              </div>
            </a>
          </div>
        </div>
      ),
    },

    CardGrid: {
      label: "Card Grid",
      fields: {
        cols: { type: "select", options: [
          { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 },
        ]},
        gap: { type: "number", label: "Khoảng cách (px)" },
        imageHeight: { type: "number", label: "Chiều cao ảnh (px)" },
        items: { type: "array", arrayFields: {
          image: ImagePickerField("Ảnh"),
          title: { type: "text" },
          text: { type: "textarea" },
          href: { type: "text" },
          ctaLabel: { type: "text" },
        }, defaultItemProps: { image: "", title: "Card", text: "Mô tả...", href: "#", ctaLabel: "Xem thêm" }},
      },
      defaultProps: {
        cols: 3, gap: 20, imageHeight: 160,
        items: [
          { image: "", title: "Card 1", text: "Mô tả 1.", href: "#", ctaLabel: "Xem thêm" },
          { image: "", title: "Card 2", text: "Mô tả 2.", href: "#", ctaLabel: "Xem thêm" },
          { image: "", title: "Card 3", text: "Mô tả 3.", href: "#", ctaLabel: "Xem thêm" },
        ],
      },
      render: ({ items, cols, gap, imageHeight }) => (
        <div className="pb-grid pb-grid--2up" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, padding: "16px 0" }}>
          {items.map((c, i) => (
            <a key={i} href={c.href || "#"} style={{
              display: "block", textDecoration: "none", color: "inherit",
              border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,.06)", background: "#fff",
            }}>
              {c.image && <img src={imgUrl(c.image)} alt={c.title} style={{ width: "100%", height: imageHeight, objectFit: "cover", display: "block" }} />}
              <div style={{ padding: 14 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 17 }}>{c.title}</h3>
                <p style={{ margin: "0 0 10px", color: "#555", lineHeight: 1.55, fontSize: 14 }}>{c.text}</p>
                {c.ctaLabel && <span style={{ color: "#e63946", fontWeight: 600, fontSize: 14 }}>{c.ctaLabel} →</span>}
              </div>
            </a>
          ))}
        </div>
      ),
    },

    FeatureList: {
      label: "Feature List",
      fields: {
        cols: { type: "select", options: [
          { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 },
        ]},
        items: { type: "array", arrayFields: {
          icon: { type: "text", label: "Emoji / icon char" },
          title: { type: "text" },
          text: { type: "textarea" },
        }, defaultItemProps: { icon: "✨", title: "Tính năng", text: "Mô tả ngắn." }},
      },
      defaultProps: {
        cols: 3,
        items: [
          { icon: "⚡", title: "Nhanh", text: "Hiệu năng cao trên mọi thiết bị." },
          { icon: "🔒", title: "An toàn", text: "Bảo mật chuẩn ngành." },
          { icon: "🎯", title: "Chính xác", text: "Sai số gần như bằng 0." },
        ],
      },
      render: ({ items, cols }) => (
        <div className="pb-grid pb-grid--2up" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24, padding: "16px 0" }}>
          {items.map((f, i) => (
            <div key={i}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{f.icon}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>{f.title}</h3>
              <p style={{ margin: 0, color: "#555", lineHeight: 1.6 }}>{f.text}</p>
            </div>
          ))}
        </div>
      ),
    },

    Accordion: {
      label: "Accordion / FAQ",
      fields: {
        items: { type: "array", arrayFields: {
          question: { type: "text" },
          answer: { type: "textarea" },
        }, defaultItemProps: { question: "Câu hỏi?", answer: "Câu trả lời." }},
      },
      defaultProps: {
        items: [
          { question: "Đây là phần mềm gì?", answer: "Mô tả phần mềm." },
          { question: "Tôi cài đặt thế nào?", answer: "Hướng dẫn cài đặt." },
        ],
      },
      render: ({ items }) => (
        <div style={{ padding: "16px 0" }}>
          {items.map((it, i) => (
            <details key={i} style={{ borderBottom: "1px solid #e5e7eb", padding: "12px 0" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 16 }}>{it.question}</summary>
              <p style={{ margin: "10px 0 0", color: "#555", lineHeight: 1.6 }}>{it.answer}</p>
            </details>
          ))}
        </div>
      ),
    },

    Testimonial: {
      label: "Testimonial",
      fields: {
        avatar: ImagePickerField("Avatar"),
        name: { type: "text" },
        role: { type: "text" },
        quote: { type: "textarea" },
        widthPct: WIDTH_FIELD,
        align: { type: "radio", options: [
          { label: "Trái", value: "left" }, { label: "Giữa", value: "center" },
        ]},
      },
      defaultProps: { avatar: "", name: "Nguyễn Văn A", role: "Giám đốc kỹ thuật", quote: "Sản phẩm tuyệt vời, đội ngũ hỗ trợ chuyên nghiệp.", widthPct: "auto", align: "center" },
      render: ({ avatar, name, role, quote, widthPct, align: a }) => (
        <div style={widthWrapStyle(widthPct, a)}>
          <div style={{ ...widthInnerStyle(widthPct), maxWidth: widthPct === "auto" ? 720 : undefined, textAlign: a as any, padding: "16px 0" }}>
            <p style={{ fontSize: 20, fontStyle: "italic", color: "#222", lineHeight: 1.6, margin: "0 0 16px" }}>"{quote}"</p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: a === "center" ? "center" : "flex-start" }}>
              {avatar && <img src={imgUrl(avatar)} alt={name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />}
              <div>
                <div style={{ fontWeight: 600 }}>{name}</div>
                <div style={{ color: "#777", fontSize: 14 }}>{role}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    Pricing: {
      label: "Pricing card",
      fields: {
        title: { type: "text" },
        price: { type: "text" },
        period: { type: "text", label: "Đơn vị (vd: /tháng)" },
        features: { type: "textarea", label: "Tính năng (mỗi dòng 1 mục)" },
        ctaLabel: { type: "text" },
        ctaHref: { type: "text" },
        highlight: { type: "radio", options: [
          { label: "Nổi bật", value: true as any }, { label: "Thường", value: false as any },
        ]},
        widthPct: WIDTH_FIELD,
        align: { type: "radio", options: ALIGN_OPTIONS },
      },
      defaultProps: {
        title: "Pro", price: "499.000đ", period: "/tháng",
        features: "Tính năng A\nTính năng B\nTính năng C",
        ctaLabel: "Chọn gói này", ctaHref: "#", highlight: false,
        widthPct: "auto", align: "center",
      },
      render: ({ title, price, period, features, ctaLabel, ctaHref, highlight, widthPct, align: a }) => (
        <div style={widthWrapStyle(widthPct, a)}>
        <div style={{
          ...widthInnerStyle(widthPct),
          border: highlight ? "2px solid #e63946" : "1px solid #e5e7eb",
          borderRadius: 10, padding: 24, background: "#fff",
          boxShadow: highlight ? "0 8px 24px rgba(230,57,70,.15)" : "0 1px 4px rgba(0,0,0,.06)",
          maxWidth: widthPct === "auto" ? 360 : undefined,
        }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 22, textAlign: "center" }}>{title}</h3>
          <div style={{ textAlign: "center", margin: "0 0 16px" }}>
            <span style={{ fontSize: 36, fontWeight: 700 }}>{price}</span>
            <span style={{ color: "#777" }}>{period}</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
            {features.split(/\r?\n/).filter(Boolean).map((f, i) => (
              <li key={i} style={{ padding: "6px 0", color: "#333" }}>✓ {f}</li>
            ))}
          </ul>
          {ctaLabel && (
            <a href={ctaHref || "#"} style={{ ...btnStyle(highlight ? "primary" : "outline", "md"), width: "100%", textAlign: "center", boxSizing: "border-box" }}>{ctaLabel}</a>
          )}
        </div>
        </div>
      ),
    },

    LogoStrip: {
      label: "Logo strip",
      fields: {
        height: { type: "number", label: "Chiều cao logo (px)" },
        items: { type: "array", arrayFields: {
          src: ImagePickerField("Logo"),
          alt: { type: "text" },
        }, defaultItemProps: { src: "", alt: "Brand" }},
      },
      defaultProps: { height: 40, items: [{ src: "", alt: "Brand 1" }, { src: "", alt: "Brand 2" }, { src: "", alt: "Brand 3" }] },
      render: ({ items, height }) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "center", padding: "24px 0" }}>
          {items.map((l, i) => (
            l.src
              ? <img key={i} src={imgUrl(l.src)} alt={l.alt} style={{ height, objectFit: "contain", opacity: 0.85 }} />
              : <div key={i} style={{ height, width: height * 3, background: "#f3f4f6", borderRadius: 4 }} />
          ))}
        </div>
      ),
    },

    Stats: {
      label: "Stats",
      fields: {
        items: { type: "array", arrayFields: {
          value: { type: "text" },
          label: { type: "text" },
        }, defaultItemProps: { value: "100+", label: "Khách hàng" }},
      },
      defaultProps: {
        items: [
          { value: "10K+", label: "Người dùng" },
          { value: "99.9%", label: "Uptime" },
          { value: "24/7", label: "Hỗ trợ" },
          { value: "20+", label: "Năm kinh nghiệm" },
        ],
      },
      render: ({ items }) => (
        <div className="pb-stats" style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 16, padding: "24px 0", textAlign: "center" }}>
          {items.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#e63946" }}>{s.value}</div>
              <div style={{ color: "#555", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      ),
    },

    Gallery: {
      label: "Gallery",
      fields: {
        cols: { type: "select", options: [
          { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 },
        ]},
        gap: { type: "number" },
        items: { type: "array", arrayFields: {
          src: ImagePickerField("Ảnh"),
          alt: { type: "text" },
        }, defaultItemProps: { src: "", alt: "" }},
      },
      defaultProps: { cols: 3, gap: 12, items: [{ src: "", alt: "" }, { src: "", alt: "" }, { src: "", alt: "" }] },
      render: ({ items, cols, gap }) => <GalleryBlock items={items} cols={cols} gap={gap} />,
    },

    // ── Advanced ─────────────────────────────────────────────────────────
    Embed: {
      label: "Embed HTML",
      fields: { html: { type: "textarea", label: "HTML" } },
      defaultProps: { html: "<div style=\"padding:16px;background:#f5f5f5;\">HTML tùy chỉnh ở đây</div>" },
      render: ({ html }) => (
        <div style={{ padding: "8px 0" }} dangerouslySetInnerHTML={{ __html: html }} />
      ),
    },

    Map: {
      label: "Google Maps",
      fields: {
        embedUrl: { type: "text", label: "Embed URL (Google Maps → Share → Embed)" },
        height: { type: "number", label: "Chiều cao (px)" },
      },
      defaultProps: { embedUrl: "", height: 360 },
      render: ({ embedUrl, height }) => (
        <div style={{ padding: "8px 0" }}>
          {embedUrl ? (
            <iframe src={embedUrl} style={{ width: "100%", height, border: 0, borderRadius: 6 }} loading="lazy" />
          ) : (
            <div style={{ height, background: "#f3f4f6", display: "grid", placeItems: "center", color: "#777", borderRadius: 6 }}>
              Dán Embed URL từ Google Maps
            </div>
          )}
        </div>
      ),
    },

    // ── Interactive ──────────────────────────────────────────────────────
    Tabs: {
      label: "Tabs",
      fields: {
        tabs: { type: "array", arrayFields: { label: { type: "text" } }, defaultItemProps: { label: "Tab mới" } },
      },
      defaultProps: { tabs: [{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }] },
      render: ({ tabs }) => <TabsBlock tabs={tabs} />,
    },

    Steps: {
      label: "Steps / Process",
      fields: {
        numbered: { type: "radio", options: [
          { label: "Đánh số", value: true as any }, { label: "Không số", value: false as any },
        ]},
        items: { type: "array", arrayFields: {
          title: { type: "text" },
          text: { type: "textarea" },
        }, defaultItemProps: { title: "Bước", text: "Mô tả bước." }},
      },
      defaultProps: {
        numbered: true,
        items: [
          { title: "Đăng ký", text: "Tạo tài khoản miễn phí trong 30 giây." },
          { title: "Tải về", text: "Tải bản dùng thử và cài đặt." },
          { title: "Bắt đầu", text: "Mở phần mềm và sáng tạo." },
        ],
      },
      render: ({ items, numbered }) => (
        <div className="pb-steps">
          {items.map((s, i) => (
            <div key={i} className="pb-step">
              {numbered && <div className="pb-step__num">{i + 1}</div>}
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>{s.title}</h3>
                <p style={{ margin: 0, color: "#555", lineHeight: 1.6 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    Quote: {
      label: "Quote",
      fields: {
        text: { type: "textarea", label: "Trích dẫn" },
        author: { type: "text" },
        role: { type: "text", label: "Chức vụ / công ty" },
        widthPct: WIDTH_FIELD,
        align: { type: "radio", options: ALIGN_OPTIONS },
      },
      defaultProps: { text: "Sản phẩm tuyệt vời, thay đổi cách chúng tôi làm việc.", author: "Nguyễn Văn A", role: "Giám đốc kỹ thuật", widthPct: "auto", align: "left" },
      render: ({ text, author, role, widthPct, align: a }) => (
        <div style={widthWrapStyle(widthPct, a)}>
          <blockquote className="pb-quote" style={widthInnerStyle(widthPct)}>
            <p className="pb-quote__text">"{text}"</p>
            {(author || role) && (
              <footer className="pb-quote__author">
                {author && <strong>{author}</strong>}
                {author && role && " — "}
                {role}
              </footer>
            )}
          </blockquote>
        </div>
      ),
    },

    Countdown: {
      label: "Countdown timer",
      fields: {
        targetDate: { type: "text", label: "Mốc kết thúc (YYYY-MM-DD HH:mm)" },
        expiredText: { type: "text", label: "Text khi hết hạn" },
      },
      defaultProps: { targetDate: "2026-12-31 23:59", expiredText: "Đã kết thúc!" },
      render: ({ targetDate, expiredText }) => <CountdownBlock targetDate={targetDate} expiredText={expiredText} />,
    },

    StickyCta: {
      label: "Sticky CTA bar",
      fields: {
        text: { type: "text" },
        ctaLabel: { type: "text" },
        ctaHref: { type: "text" },
        showAfterPx: { type: "number", label: "Hiện sau khi scroll (px)" },
      },
      defaultProps: { text: "Ưu đãi 30% chỉ trong hôm nay!", ctaLabel: "Nhận ngay", ctaHref: "#", showAfterPx: 400 },
      render: (props) => <StickyCtaBlock {...props} />,
    },

    LeadForm: {
      label: "Form thu thập lead",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        submitLabel: { type: "text" },
        successMessage: { type: "text" },
        showPhone: { type: "radio", options: [
          { label: "Có", value: true as any }, { label: "Không", value: false as any },
        ]},
        messagePlaceholder: { type: "text" },
        tag: { type: "text", label: "Tag (để phân loại trong Liên hệ)" },
        widthPct: WIDTH_FIELD,
        align: { type: "radio", options: ALIGN_OPTIONS },
      },
      defaultProps: {
        title: "Nhận tư vấn miễn phí",
        subtitle: "Để lại thông tin, đội ngũ FocusTech sẽ liên hệ lại trong 24h.",
        submitLabel: "Gửi thông tin",
        successMessage: "Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm.",
        showPhone: true,
        messagePlaceholder: "Bạn muốn được tư vấn gì?",
        tag: "lead",
        widthPct: "auto", align: "center",
      },
      render: (props) => (
        <div style={widthWrapStyle(props.widthPct, props.align)}>
          <div style={{ ...widthInnerStyle(props.widthPct), maxWidth: props.widthPct === "auto" ? 480 : undefined }}>
            <LeadFormBlock {...props} />
          </div>
        </div>
      ),
    },
  },
};

// ── Block implementations (cần hooks/tách riêng) ───────────────────────────
function ImageBlock({ src, alt, widthPct, maxWidth, height, fit, align: a, rounded }: ImageBlockProps) {
  const wrap = widthWrapStyle(widthPct, a);
  const inner = widthInnerStyle(widthPct);
  const hasHeight = height > 0;
  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: hasHeight ? height : "auto",
    objectFit: hasHeight ? fit : "fill",
    borderRadius: rounded,
    maxWidth: widthPct === "auto" ? maxWidth : "100%",
    display: "block",
  };
  return (
    <div style={wrap}>
      <div style={inner}>
        {src ? (
          <img src={imgUrl(src)} alt={alt} style={imgStyle} />
        ) : (
          <div style={{ background: "#eee", padding: 40, color: "#999", textAlign: "center" }}>Chưa có ảnh — upload ở panel phải</div>
        )}
      </div>
    </div>
  );
}


function GalleryBlock({ items, cols, gap }: { items: { src: string; alt: string }[]; cols: 2|3|4; gap: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  // Đóng bằng Esc, qua lại bằng arrow.
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      else if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length));
      else if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? null : (i + 1) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [openIdx, items.length]);

  const validItems = items.filter((g) => g.src);
  const open = openIdx !== null ? validItems[openIdx] : null;

  return (
    <>
      <div className="pb-gallery pb-grid pb-grid--2up" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, padding: "16px 0" }}>
        {items.map((g, i) => {
          const validIdx = validItems.indexOf(g);
          return g.src ? (
            <img
              key={i} src={imgUrl(g.src)} alt={g.alt}
              onClick={() => setOpenIdx(validIdx >= 0 ? validIdx : null)}
              style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 6 }}
            />
          ) : (
            <div key={i} style={{ height: 200, background: "#f3f4f6", borderRadius: 6 }} />
          );
        })}
      </div>

      {open && openIdx !== null && (
        <div className="pb-lightbox" onClick={(e) => { if (e.target === e.currentTarget) setOpenIdx(null); }}>
          <img className="pb-lightbox__img" src={imgUrl(open.src)} alt={open.alt} />
          <button className="pb-lightbox__close" onClick={() => setOpenIdx(null)} aria-label="Đóng">×</button>
          {validItems.length > 1 && (
            <>
              <button className="pb-lightbox__nav pb-lightbox__nav--prev"
                onClick={() => setOpenIdx((openIdx - 1 + validItems.length) % validItems.length)}
                aria-label="Trước">‹</button>
              <button className="pb-lightbox__nav pb-lightbox__nav--next"
                onClick={() => setOpenIdx((openIdx + 1) % validItems.length)}
                aria-label="Tiếp">›</button>
              <div className="pb-lightbox__counter">{openIdx + 1} / {validItems.length}</div>
            </>
          )}
        </div>
      )}
    </>
  );
}

// ── Interactive block implementations ──────────────────────────────────────
function TabsBlock({ tabs }: { tabs: { label: string }[] }) {
  // Sync với URL hash kiểu #tab=2 — shareable link tới tab cụ thể.
  // Bỏ qua khi đang trong Puck editor (URL editor không phản ánh page).
  const isEditor = typeof window !== "undefined" && window.location.pathname.includes("/admin/pages/");
  const initial = (() => {
    if (isEditor) return 0;
    const m = window?.location?.hash?.match(/tab=(\d+)/);
    if (m) {
      const n = parseInt(m[1], 10) - 1;
      if (n >= 0 && n < tabs.length) return n;
    }
    return 0;
  })();
  const [active, setActive] = useState(initial);

  function switchTo(i: number) {
    setActive(i);
    if (!isEditor && typeof window !== "undefined") {
      const hash = `#tab=${i + 1}`;
      window.history.replaceState(null, "", window.location.pathname + window.location.search + hash);
    }
  }

  return (
    <div style={{ padding: "16px 0" }}>
      <div className="pb-tabs__nav">
        {tabs.map((t, i) => (
          <button key={i} className={"pb-tabs__tab" + (active === i ? " is-active" : "")} onClick={() => switchTo(i)}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((_, i) => (
        <div key={i} style={{ display: active === i ? "block" : "none" }}>
          <DropZone zone={`tab-${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

function CountdownBlock({ targetDate, expiredText }: { targetDate: string; expiredText: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const target = new Date(targetDate.replace(" ", "T")).getTime();
  const diff = Math.max(0, target - now);
  if (Number.isNaN(target)) {
    return <div className="pb-countdown" style={{ color: "#999" }}>Nhập mốc kết thúc hợp lệ (YYYY-MM-DD HH:mm)</div>;
  }
  if (diff <= 0) {
    return <div className="pb-countdown"><div style={{ fontSize: 18, color: "#e63946", fontWeight: 600 }}>{expiredText}</div></div>;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return (
    <div className="pb-countdown">
      <Cell v={days} l="Ngày" />
      <Cell v={hours} l="Giờ" />
      <Cell v={mins} l="Phút" />
      <Cell v={secs} l="Giây" />
    </div>
  );
}
function Cell({ v, l }: { v: number; l: string }) {
  return (
    <div className="pb-countdown__cell">
      <div className="pb-countdown__val">{String(v).padStart(2, "0")}</div>
      <div className="pb-countdown__lbl">{l}</div>
    </div>
  );
}

function StickyCtaBlock({ text, ctaLabel, ctaHref, showAfterPx }: StickyCtaProps) {
  const STORAGE_KEY = "pb_sticky_dismissed_" + (typeof window !== "undefined" ? window.location.pathname : "");
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check dismissed cookie/sessionStorage 1 lần
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") {
        setDismissed(true);
      }
    } catch {}
    const onScroll = () => setShown(window.scrollY > showAfterPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx, STORAGE_KEY]);

  function dismiss() {
    setDismissed(true);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  }

  if (dismissed) return null;
  return (
    <div className={"pb-sticky-cta" + (shown ? " is-shown" : "")}>
      <div className="pb-sticky-cta__text">{text}</div>
      <a href={ctaHref || "#"} style={btnStyle("primary", "md")}>{ctaLabel}</a>
      <button className="pb-sticky-cta__close" onClick={dismiss} aria-label="Đóng">×</button>
    </div>
  );
}

function LeadFormBlock({ title, subtitle, submitLabel, successMessage, showPhone, messagePlaceholder, tag }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatus("error"); setErrMsg("Vui lòng nhập đầy đủ họ tên và email.");
      return;
    }
    setStatus("sending"); setErrMsg("");
    try {
      // Đọc nguồn từ CustomPage để tính conversion. Không có thì gửi blank.
      const source = (window as any).__pbPageSource as { slug?: string; variant?: string } | undefined;
      const body = {
        name: name.trim(), email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
        tag: tag || "lead",
        sourceSlug: source?.slug,
        sourceVariant: source?.variant,
      };
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch (e: any) {
      setStatus("error"); setErrMsg(e?.message || "Gửi thất bại");
    }
  }

  if (status === "success") {
    return (
      <div className="pb-leadform">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 48 }}>✓</div>
          <p style={{ marginTop: 8 }}>{successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="pb-leadform" onSubmit={submit}>
      {title && <h3 style={{ margin: "0 0 8px" }}>{title}</h3>}
      {subtitle && <p style={{ margin: "0 0 16px", color: "#555" }}>{subtitle}</p>}
      <input type="text" placeholder="Họ tên *" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
      {showPhone && <input type="tel" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />}
      <textarea rows={3} placeholder={messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Đang gửi..." : submitLabel}
      </button>
      {status === "error" && <p style={{ color: "crimson", marginTop: 8, fontSize: 13 }}>{errMsg}</p>}
    </form>
  );
}
