import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import LandingPage from "@/pages/LandingPage";
import ProductPage from "@/pages/ProductPage";
import ZW3DPage from "@/pages/ZW3DPage/ZW3DPage";
import ZWCADMFGPage from "@/pages/ZWCADMFGPage/ZWCADMFGPage";
import ZWCADPage from "@/pages/ZWCADPage/ZWCADPage";
import NewsPage from "@/pages/NewsPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import DownloadPage from "@/pages/DownloadPage";
import DownloadDetailPage from "@/pages/DownloadDetailPage";
import FaqPage from "@/pages/FaqPage";
import FaqDetailPage from "@/pages/FaqDetailPage";
import ContactPage from "@/pages/ContactPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminBannersPage from "@/pages/admin/AdminBannersPage";
import AdminNewsPage from "@/pages/admin/AdminNewsPage";
import AdminFaqPage from "@/pages/admin/AdminFaqPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminDownloadsPage from "@/pages/admin/AdminDownloadsPage";
import AdminContactsPage from "@/pages/admin/AdminContactsPage";
// Folder-based pages (mỗi page có index.ts re-export default)
import routesName from "./enum.routes";
import { IRouterData } from "./type.routes";

export const routesData: IRouterData[] = [
  {
    path: routesName.ROOT,
    layout: MainLayout,
    component: LandingPage,
  },
  {
    path: routesName.TRANG_CHU,
    redirect: routesName.ROOT,
  },
  {
    path: routesName.SAN_PHAM_ZWCAD_LEGACY,
    redirect: routesName.SAN_PHAM_ZWCAD,
  },
  {
    path: routesName.SAN_PHAM_ZW3D,
    layout: MainLayout,
    component: ZW3DPage,
  },
  {
    path: routesName.SAN_PHAM_ZWCAD,
    layout: MainLayout,
    component: ZWCADPage,
  },
  {
    path: routesName.SAN_PHAM_ZWCAD_MFG,
    layout: MainLayout,
    component: ZWCADMFGPage,
  },
  {
    path: routesName.SAN_PHAM,
    layout: MainLayout,
    component: ProductPage,
  },
  {
    path: routesName.TIN_TUC,
    layout: MainLayout,
    component: NewsPage,
  },
  {
    path: routesName.TIN_TUC_DETAIL,
    layout: MainLayout,
    component: NewsDetailPage,
  },
  {
    path: routesName.TAI_VE,
    layout: MainLayout,
    component: DownloadPage,
  },
  {
    path: routesName.TAI_VE_DETAIL,
    layout: MainLayout,
    component: DownloadDetailPage,
  },
  {
    path: routesName.FAQ,
    layout: MainLayout,
    component: FaqPage,
  },
  {
    path: routesName.FAQ_DETAIL,
    layout: MainLayout,
    component: FaqDetailPage,
  },
  {
    path: routesName.LIEN_HE,
    layout: MainLayout,
    component: ContactPage,
  },
  {
    path: routesName.ADMIN_LOGIN,
    component: AdminLoginPage,
  },
  {
    path: routesName.ADMIN_DASHBOARD,
    layout: AdminLayout,
    component: AdminDashboardPage,
  },
  {
    path: routesName.ADMIN_BANNERS,
    layout: AdminLayout,
    component: AdminBannersPage,
  },
  {
    path: routesName.ADMIN_NEWS,
    layout: AdminLayout,
    component: AdminNewsPage,
  },
  {
    path: routesName.ADMIN_FAQ,
    layout: AdminLayout,
    component: AdminFaqPage,
  },
  {
    path: routesName.ADMIN_PRODUCTS,
    layout: AdminLayout,
    component: AdminProductsPage,
  },
  {
    path: routesName.ADMIN_DOWNLOADS,
    layout: AdminLayout,
    component: AdminDownloadsPage,
  },
  {
    path: routesName.ADMIN_CONTACTS,
    layout: AdminLayout,
    component: AdminContactsPage,
  },
];
