export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner extends BaseEntity {
  title: string;
  titleEn?: string;
  titleZh?: string;
  subtitle?: string;
  subtitleEn?: string;
  subtitleZh?: string;
  image: string;
  ctaLabel?: string;
  ctaLabelEn?: string;
  ctaLabelZh?: string;
  ctaHref?: string;
  order: number;
  active: boolean;
}

export interface NewsItem extends BaseEntity {
  slug: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  category?: string;
  excerpt?: string;
  excerptEn?: string;
  excerptZh?: string;
  content?: string;
  contentEn?: string;
  contentZh?: string;
  image?: string;
  date?: string;
}

export interface FaqItem extends BaseEntity {
  slug: string;
  question: string;
  questionEn?: string;
  questionZh?: string;
  answer: string;
  answerEn?: string;
  answerZh?: string;
  order: number;
}

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  logo: string;
  description: string;
  price?: string;
  badge?: string;
  version?: string;
}

export interface DownloadItem extends BaseEntity {
  slug: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  productSlug?: string;
  version?: string;
  fileUrl: string;
  fileSize?: string;
}

export interface Page extends BaseEntity {
  slug: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  data: string; // Puck JSON (stringified)
  published: boolean;
  dataB?: string | null;     // A/B variant
  variantBWeight?: number;   // % chọn B (0-100, mặc định 50)
}

export interface ContactSubmission extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: "new" | "read" | "replied";
  tag?: string;
  sourceSlug?: string;
  sourceVariant?: string;
}

export interface BlockPreset extends BaseEntity {
  name: string;
  description?: string;
  thumbnail?: string;
  data: string; // Puck JSON
}
