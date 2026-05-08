// Auth: token storage + login/logout. Không phụ thuộc client.ts để tránh circular.
import { API_BASE_URL } from "./constants";

const TOKEN_KEY = "admin_token";
const EMAIL_KEY = "admin_email";

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
export function setToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch {}
}
export function clearAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem("admin_logged_in");
  } catch {}
}
export function isAuthed(): boolean { return !!getToken(); }

export interface LoginResult { token: string; user: { email: string }; }

export async function login(email: string, password: string): Promise<LoginResult> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Đăng nhập thất bại (${res.status})`;
    throw new Error(msg);
  }
  setToken(data.token);
  try { localStorage.setItem(EMAIL_KEY, data.user.email); } catch {}
  return data as LoginResult;
}

export function logout() { clearAuth(); }
