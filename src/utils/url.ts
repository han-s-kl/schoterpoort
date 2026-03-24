/**
 * Prefix an internal path with the Astro base URL.
 * External URLs (http, mailto, tel, #) are returned unchanged.
 */
export function url(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '';
  // Ensure no double slashes
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
