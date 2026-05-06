export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner extends BaseEntity {
  title: string;
  subtitle?: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
  order: number;
  active: boolean;
}

export interface NewsItem extends BaseEntity {
  slug: string;
  title: string;
  category?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  date?: string;
}

export interface FaqItem extends BaseEntity {
  slug: string;
  question: string;
  answer: string;
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
  productSlug?: string;
  version?: string;
  fileUrl: string;
  fileSize?: string;
}

export interface ContactSubmission extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: "new" | "read" | "replied";
}
