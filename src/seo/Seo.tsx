import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
}

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export default function Seo({ title, description, keywords }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    if (keywords) {
      setMeta("keywords", keywords);
    }
  }, [title, description, keywords]);

  return null;
}
