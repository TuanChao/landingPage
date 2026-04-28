import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductPage from "../pages/ProductPage";
import NewsPage from "../pages/NewsPage";
import NewsDetailPage from "../pages/NewsDetailPage";
import DownloadDetailPage from "../pages/DownloadDetailPage";
import FaqPage from "../pages/FaqPage";
import FaqDetailPage from "../pages/FaqDetailPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trang-chu" element={<Navigate to="/" replace />} />
        <Route path="/san-pham-zwcad" element={<ProductPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
        <Route path="/tai-ve/:slug" element={<DownloadDetailPage />} />
        <Route path="/cau-hoi-thuong-gap" element={<FaqPage />} />
        <Route path="/cau-hoi-thuong-gap/:slug" element={<FaqDetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
