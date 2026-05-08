// CRUD generic + hook useApiResource. Mọi page admin chỉ cần biết hook này.
import { useCallback, useEffect, useState } from "react";
import { request } from "./client";

// Backend trả id: number, FE types dùng id: string. Normalize ở boundary.
function normalize<T extends { id: any }>(raw: any): T {
  if (raw && typeof raw === "object" && "id" in raw && raw.id != null) {
    return { ...raw, id: String(raw.id) } as T;
  }
  return raw as T;
}

function stripId<T extends Record<string, any>>(obj: T): Omit<T, "id"> {
  const { id, ...rest } = obj as any;
  return rest;
}

export function resource<T extends { id: string }>(path: string) {
  const base = `/api/${path}`;
  return {
    list: async (): Promise<T[]> =>
      ((await request<any[]>("GET", base)) || []).map(normalize<T>),
    get: async (id: string): Promise<T> =>
      normalize<T>(await request<any>("GET", `${base}/${id}`)),
    create: async (data: Partial<T>): Promise<T> =>
      normalize<T>(await request<any>("POST", base, stripId(data))),
    update: async (id: string, data: Partial<T>): Promise<T> =>
      normalize<T>(await request<any>("PUT", `${base}/${id}`, { ...stripId(data), id: Number(id) })),
    remove: async (id: string): Promise<void> => {
      await request<void>("DELETE", `${base}/${id}`);
    },
  };
}

export interface ResourceState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

export interface ResourceOptions<T> {
  /** Map raw object từ API → entity FE (khi backend dùng tên field khác) */
  mapIn?: (item: any) => T;
  /** Map entity FE → raw object gửi lên API */
  mapOut?: (data: Partial<T>) => any;
}

export function useApiResource<T extends { id: string }>(
  path: string,
  options?: ResourceOptions<T>,
): ResourceState<T> {
  const r = resource<T>(path);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapIn = options?.mapIn ?? ((x: any) => x as T);
  const mapOut = options?.mapOut ?? ((x: Partial<T>) => x as any);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await r.list();
      setItems(list.map(mapIn));
    } catch (e: any) {
      setError(e?.message || "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => { refresh(); }, [refresh]);

  const create = useCallback(async (data: Partial<T>) => {
    const created = mapIn(await r.create(mapOut(data)));
    setItems((prev) => [...prev, created]);
    return created;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const update = useCallback(async (id: string, data: Partial<T>) => {
    const updated = mapIn(await r.update(id, mapOut(data)));
    setItems((prev) => prev.map((x) => (x.id === id ? updated : x)));
    return updated;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const remove = useCallback(async (id: string) => {
    await r.remove(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { items, loading, error, refresh, create, update, remove };
}
