export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface ProductItem {
  title: string;
  description: string;
}

export interface ContactInfo {
  company: string;
  lines: string[];
}

export interface ContactFormField {
  type: "text" | "email" | "textarea";
  placeholder: string;
}
