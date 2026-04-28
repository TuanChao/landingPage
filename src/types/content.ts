export interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  theme: string;
}

export interface SiteContent {
  searchPlaceholder: string;
  nav: MenuItem[];
  hero: {
    eyebrow: string;
    slides: HeroSlide[];
  };
  products: Array<{ slug: string; title: string; description: string; badge?: string }>;
  news: Array<{ slug: string; title: string; excerpt: string; date?: string }>;
  downloads: Array<{ slug: string; name: string; version: string }>;
  faq: Array<{ slug: string; question: string; answer: string }>;
  contact: {
    title: string;
    company: string;
    lines: string[];
  };
}
