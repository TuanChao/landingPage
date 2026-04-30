import { ReactNode } from "react";
import SiteHeader from "../components/common/SiteHeader";
import SiteFooter from "../components/common/SiteFooter";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
