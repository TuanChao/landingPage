// Sau khi Puck Render xong, quét các phần tử .pb-anim và bật .is-visible khi vào viewport.
// Cũng smooth scroll tới anchor (#hash) trong URL khi load page.
import { useEffect } from "react";

export function useScrollAnimations(deps: unknown[] = []) {
  useEffect(() => {
    // Microtask để chờ DOM render xong sau khi Puck thay đổi
    const t = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(".pb-anim:not(.is-visible)");
      if (!els.length) return;

      // Fallback: nếu IntersectionObserver không có (legacy), hiện luôn
      if (typeof IntersectionObserver === "undefined") {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
      );
      els.forEach((el) => io.observe(el));
    }, 50);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useScrollToAnchor(deps: unknown[] = []) {
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    // Đợi block render xong rồi mới scroll
    const t = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
