import routesName from "~routes/enum.routes";

export interface ProductMeta {
  name: string;
  logo: string;
  href: string;
  desc: string;
  version: string;
  downloadSlug?: string;
}

export const PRODUCTS: ProductMeta[] = [
  {
    name: "ZWCAD",
    logo: "/zwcad-mfg/zwcad.png",
    href: routesName.SAN_PHAM_ZWCAD,
    desc: "Phần mềm CAD 2D/3D tương thích DWG, hiệu năng cao với chi phí tối ưu.",
    version: "2025",
    downloadSlug: "zwcad-trial",
  },
  {
    name: "ZW3D",
    logo: "/image-zwcad/logo/zwc3d",
    href: routesName.SAN_PHAM_ZW3D,
    desc: "Giải pháp CAD/CAM 3D toàn diện cho thiết kế và gia công cơ khí.",
    version: "2025",
    downloadSlug: "zw3d-trial",
  },
  {
    name: "ZWCAD MFG",
    logo: "/image-zwcad/logo/zwcadmfg",
    href: routesName.SAN_PHAM_ZWCAD_MFG,
    desc: "ZWCAD chuyên biệt cho ngành sản xuất với các công cụ MFG tích hợp sẵn.",
    version: "2025",
    downloadSlug: "zwcad-mfg-trial",
  },
];

export const PRODUCT_NAV: Record<string, ProductMeta> = Object.fromEntries(
  PRODUCTS.map((p) => [p.href, p])
);

export const PRODUCT_BY_DOWNLOAD: Record<string, ProductMeta> = Object.fromEntries(
  PRODUCTS.filter((p) => p.downloadSlug).map((p) => [p.downloadSlug!, p])
);
