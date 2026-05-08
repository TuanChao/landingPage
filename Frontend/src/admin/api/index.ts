// Public API của module data layer admin. Pages chỉ import từ "@/admin/api".
export { API_BASE_URL } from "./constants";
export { ApiError, request } from "./client";
export {
  getToken, setToken, clearAuth, isAuthed,
  login, logout,
  type LoginResult,
} from "./auth";
export {
  resource, useApiResource,
  type ResourceState, type ResourceOptions,
} from "./crud";
export { useContacts, listContacts } from "./contacts";
export {
  uploadFile, resolveAssetUrl, formatBytes,
  type UploadCategory, type UploadResult,
} from "./upload";
