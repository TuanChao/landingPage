// Contacts có endpoint riêng (PATCH status), không khớp CRUD generic. Bọc thành hook
// để pages chỉ thấy 1 interface giống useApiResource.
import { useCallback, useEffect, useState } from "react";
import { request } from "./client";
import type { ContactSubmission } from "@/admin/types";

function normalize(raw: any): ContactSubmission {
  return raw && raw.id != null ? { ...raw, id: String(raw.id) } : raw;
}

/** Fetch danh sách contacts 1 lần (không phải hook). Dùng cho dashboard, summary... */
export async function listContacts(): Promise<ContactSubmission[]> {
  const list = (await request<any[]>("GET", "/api/contacts")) || [];
  return list.map(normalize);
}

export function useContacts() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = (await request<any[]>("GET", "/api/contacts")) || [];
      setItems(list.map(normalize));
    } catch (e: any) {
      setError(e?.message || "Không tải được liên hệ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const setStatus = useCallback(async (id: string, status: ContactSubmission["status"]) => {
    const updated = normalize(await request<any>("PATCH", `/api/contacts/${id}`, { status }));
    setItems((prev) => prev.map((x) => (x.id === id ? updated : x)));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await request<void>("DELETE", `/api/contacts/${id}`);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return { items, loading, error, refresh, setStatus, remove };
}
