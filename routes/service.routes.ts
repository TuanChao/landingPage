import { generatePath, Params } from "react-router-dom";

/**
 * routeTo('/tin-tuc/:slug', { slug: 'bai-viet' })
 * → '/tin-tuc/bai-viet'
 *
 * routeTo('/tin-tuc/:slug', { slug: 'bai-viet' }, { page: 2 })
 * → '/tin-tuc/bai-viet?page=2'
 */
export const routeTo = (
  path: string,
  params?: Params,
  query?: Record<string, string | number | boolean>
) => {
  const url = generatePath(path, params);
  if (!query) return url;
  const qs = new URLSearchParams(
    Object.entries(query).map(([k, v]) => [k, String(v)])
  ).toString();
  return `${url}?${qs}`;
};
