const routesName = {
  ROOT: "/",
  TRANG_CHU: "/trang-chu",
  SAN_PHAM: "/san-pham/:productSlug",
  SAN_PHAM_ZWCAD: "/san-pham/zwcad",
  SAN_PHAM_ZW3D: "/san-pham/zw3d",
  SAN_PHAM_ZWCAD_MFG: "/san-pham/zwcad-mfg",
  SAN_PHAM_ZWCAD_LEGACY: "/san-pham-zwcad",
  TIN_TUC: "/tin-tuc",
  TIN_TUC_DETAIL: "/tin-tuc/:slug",
  TAI_VE: "/tai-ve",
  TAI_VE_DETAIL: "/tai-ve/:slug",
  FAQ: "/cau-hoi-thuong-gap",
  FAQ_DETAIL: "/cau-hoi-thuong-gap/:slug",
  LIEN_HE: "/lien-he",
} as const;

export default routesName;
