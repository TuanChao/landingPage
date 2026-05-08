// HTTP client lõi: request<T> + ApiError. Tự gắn JWT, tự xử lý 401.
import { API_BASE_URL } from "./constants";
import { getToken, clearAuth } from "./auth";

export class ApiError extends Error {
  status: number;
  data: any;
  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function request<T>(method: string, path: string, body?: any): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    clearAuth();
    if (typeof window !== "undefined" && !window.location.pathname.endsWith("/admin/login")) {
      window.location.href = "/admin/login";
    }
    throw new ApiError("Phiên đăng nhập đã hết hạn", 401, null);
  }

  let data: any = null;
  const text = await res.text();
  if (text) { try { data = JSON.parse(text); } catch { data = text; } }

  if (!res.ok) {
    const msg = (data && (data.error || data.title || data.message)) || `Request thất bại (${res.status})`;
    throw new ApiError(msg, res.status, data);
  }
  return data as T;
}
