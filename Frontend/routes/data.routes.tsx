import { lazy } from "react";
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

// Admin + CustomPage lazy-load: cô lập Puck/Tiptap khỏi bundle public.
const AdminLoginPage      = lazy(() => import("@/pages/admin/AdminLoginPage/AdminLoginPage"));
const AdminDashboardPage  = lazy(() => import("@/pages/admin/AdminDashboardPage/AdminDashboardPage"));
const AdminBannersPage    = lazy(() => import("@/pages/admin/AdminBannersPage/AdminBannersPage"));
const AdminNewsPage       = lazy(() => import("@/pages/admin/AdminNewsPage/AdminNewsPage"));
const AdminFaqPage        = lazy(() => import("@/pages/admin/AdminFaqPage/AdminFaqPage"));
const AdminDownloadsPage  = lazy(() => import("@/pages/admin/AdminDownloadsPage/AdminDownloadsPage"));
const AdminContactsPage   = lazy(() => import("@/pages/admin/AdminContactsPage/AdminContactsPage"));
const AdminPagesPage      = lazy(() => import("@/pages/admin/AdminPagesPage/AdminPagesPage"));
const AdminPageEditorPage  = lazy(() => import("@/pages/admin/AdminPageEditorPage/AdminPageEditorPage"));
const AdminPagePreviewPage = lazy(() => import("@/pages/admin/AdminPagePreviewPage/AdminPagePreviewPage"));
const CustomPage           = lazy(() => import("@/pages/CustomPage/CustomPage"));

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
    path: routesName.ADMIN_DOWNLOADS,
    layout: AdminLayout,
    component: AdminDownloadsPage,
  },
  {
    path: routesName.ADMIN_CONTACTS,
    layout: AdminLayout,
    component: AdminContactsPage,
  },
  {
    path: routesName.ADMIN_PAGES,
    layout: AdminLayout,
    component: AdminPagesPage,
  },
  {
    path: routesName.ADMIN_PAGE_EDITOR,
    layout: AdminLayout,
    component: AdminPageEditorPage,
  },
  {
    // Preview KHÔNG dùng AdminLayout (toàn màn, có thanh báo riêng).
    path: routesName.ADMIN_PAGE_PREVIEW,
    layout: MainLayout,
    component: AdminPagePreviewPage,
  },
  {
    path: routesName.CUSTOM_PAGE,
    layout: MainLayout,
    component: CustomPage,
  },
];
