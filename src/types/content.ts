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
  products: Array<{ title: string; description: string }>;
  news: Array<{ slug: string; title: string; excerpt: string }>;
  downloads: Array<{ slug: string; name: string; version: string }>;
  faq: Array<{ slug: string; question: string; answer: string }>;
  contact: {
    title: string;
    company: string;
    lines: string[];
  };
}
