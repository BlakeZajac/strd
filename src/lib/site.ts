/**
 * Base URL for the site. Matches astro.config.mjs `site`.
 */
export const SITE_URL = "https://blakezajac.com";

/** Default social preview image (absolute path under `public/`). */
export const DEFAULT_OG_IMAGE = "/gallery/landscape/hero.webp";

/**
 * Returns the full URL for a path.
 *
 * @param path - Path with or without leading slash (e.g. "landscape" or "/automotive/").
 */
export function url(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
