import { ReactNode } from "react";
import SiteHeader from "../components/common/SiteHeader";
import SiteFooter from "../components/common/SiteFooter";
import BackToTop from "../components/common/BackToTop";
import { useScrollToHash } from "../hooks/useScrollToHash";

export default function MainLayout({ children }: { children: ReactNode }) {
  useScrollToHash();
  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
