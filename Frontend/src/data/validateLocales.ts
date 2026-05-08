// So sánh schema keys giữa 3 locale ở dev. Báo console khi lệch.
// Chạy 1 lần lúc bundle init. Production build: tree-shaken nhờ check DEV.
import type { Language } from "../types/site";
import { contentMap } from "./siteContent";

type Path = string;

function collectPaths(obj: any, prefix = ""): Path[] {
  if (obj == null || typeof obj !== "object") return [];
  if (Array.isArray(obj)) {
    // Với array: chỉ lấy schema từ phần tử đầu (tránh nổ key cho list dài)
    return obj.length > 0 ? collectPaths(obj[0], `${prefix}[]`) : [];
  }
  return Object.keys(obj).flatMap((k) => {
    const next = prefix ? `${prefix}.${k}` : k;
    const child = obj[k];
    if (child !== null && typeof child === "object") {
      return [next, ...collectPaths(child, next)];
    }
    return [next];
  });
}

export function validateLocaleParity() {
  const langs: Language[] = ["vi", "en", "zh"];
  const pathsByLang: Record<Language, Set<Path>> = {} as any;
  langs.forEach((l) => {
    pathsByLang[l] = new Set(collectPaths(contentMap[l]));
  });

  const allKeys = new Set<Path>();
  langs.forEach((l) => pathsByLang[l].forEach((p) => allKeys.add(p)));

  const issues: { key: Path; missing: Language[] }[] = [];
  allKeys.forEach((key) => {
    const missing = langs.filter((l) => !pathsByLang[l].has(key));
    if (missing.length > 0 && missing.length < langs.length) {
      issues.push({ key, missing });
    }
  });

  if (issues.length > 0) {
    // eslint-disable-next-line no-console
    console.group(`[i18n] ⚠️ ${issues.length} key(s) bị lệch giữa các locale`);
    issues.slice(0, 30).forEach((i) => {
      // eslint-disable-next-line no-console
      console.warn(`  ${i.key} — thiếu ở: ${i.missing.join(", ")}`);
    });
    if (issues.length > 30) {
      // eslint-disable-next-line no-console
      console.warn(`  ... và ${issues.length - 30} cái nữa`);
    }
    // eslint-disable-next-line no-console
    console.groupEnd();
  }
}
