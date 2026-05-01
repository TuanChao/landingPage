import MainLayout from "@/layouts/MainLayout";
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
];
