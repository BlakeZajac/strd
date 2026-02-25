/**
 * Base URL for the site. Matches astro.config.mjs `site`.
 */
export const SITE_URL = "https://blakezajac.com";

/**
 * Returns the full URL for a path.
 *
 * @param path - Path with or without leading slash (e.g. "work" or "/work/club-training").
 */
export function url(path: string): string {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return `${SITE_URL}${normalized}`;
}
