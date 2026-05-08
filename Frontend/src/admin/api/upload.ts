// Upload file qua /api/uploads + helpers cho asset URL.
import { API_BASE_URL } from "./constants";
import { getToken } from "./auth";

export type UploadCategory = "image" | "installer" | "doc";

export interface UploadResult {
  url: string;
  absoluteUrl: string;
  filename: string;
  originalName: string;
  size: number;
  mime: string;
  category: string;
}

export async function uploadFile(
  file: File,
  category?: UploadCategory,
  onProgress?: (percent: number) => void,
): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);

  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  const url = `${API_BASE_URL}/api/uploads${qs}`;

  const data = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    const token = getToken();
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300) resolve(json);
        else reject(new Error(json.error || `Upload thất bại (${xhr.status})`));
      } catch {
        reject(new Error(`Phản hồi không hợp lệ (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("Không kết nối được tới server upload"));
    xhr.send(form);
  });

  return {
    ...data,
    absoluteUrl: data.url?.startsWith("http") ? data.url : `${API_BASE_URL}${data.url}`,
  } as UploadResult;
}

/** Trả về URL có thể load: ghép API_BASE_URL nếu là path tương đối. */
export function resolveAssetUrl(url?: string | null): string {
  if (!url) return "";
  if (/^https?:\/\//.test(url) || url.startsWith("data:")) return url;
  return url.startsWith("/") ? `${API_BASE_URL}${url}` : url;
}

export function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
