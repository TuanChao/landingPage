import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routesData } from "./data.routes";
import { IRouterData } from "./type.routes";
import NotFoundPage from "@/pages/NotFoundPage";

const renderRoutes = (routes: IRouterData[]) =>
  routes.map((route, index) => {
    if (route.redirect) {
      return <Route key={index} path={route.path} element={<Navigate to={route.redirect} replace />} />;
    }

    const Layout = route.layout ?? Fragment;
    const Page = route.component ?? Fragment;

    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  });

export default function AppRouter() {
  return (
    <Routes>
      {renderRoutes(routesData)}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
