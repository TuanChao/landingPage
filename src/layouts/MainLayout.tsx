import { Outlet } from "react-router-dom";
import SiteHeader from "../components/common/SiteHeader";
import SiteFooter from "../components/common/SiteFooter";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
