import { ReactNode } from "react";
import SiteHeader from "../components/common/SiteHeader";
import SiteFooter from "../components/common/SiteFooter";
import BackToTop from "../components/common/BackToTop";
import { useScrollToHash } from "../hooks/useScrollToHash";
import { useLayoutChrome } from "../contexts/LayoutChrome";

export default function MainLayout({ children }: { children: ReactNode }) {
  useScrollToHash();
  const { hideChrome } = useLayoutChrome();
  return (
    <div className="app-shell">
      {!hideChrome && <SiteHeader />}
      <main>
        {children}
      </main>
      {!hideChrome && <SiteFooter />}
      {!hideChrome && <BackToTop />}
    </div>
  );
}
