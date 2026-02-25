import { createWebPageSchema } from "./schema";

const WORK_DESCRIPTION_FALLBACK =
	"A WordPress project designed and developed by Blake Zajac.";

const WORK_INDEX_TITLE = "Selected work | WordPress projects by Blake Zajac | STRD";
const WORK_INDEX_DESCRIPTION =
	"A selection of WordPress projects designed and developed by Blake Zajac, focusing on small businesses and modern, performance-minded websites.";
const WORK_INDEX_SCHEMA_NAME = "Selected work | WordPress projects by Blake Zajac";

/**
 * Returns the page title for a work entry.
 */
export function getWorkPageTitle(title: string): string {
	return `${title} | WordPress project by Blake Zajac | STRD`;
}

/**
 * Returns the meta description for a work entry, with fallback when not provided.
 */
export function getWorkPageDescription(description?: string): string {
	return description ?? WORK_DESCRIPTION_FALLBACK;
}

/**
 * Returns the schema.org name for a work entry.
 */
export function getWorkSchemaName(title: string): string {
	return `${title} | WordPress project by Blake Zajac`;
}

/**
 * Returns the schema.org WebPage object for a work entry.
 */
export function getWorkPageSchema(slug: string, title: string) {
	return createWebPageSchema(getWorkSchemaName(title), `work/${slug}`);
}

/**
 * Returns the page title for the work index.
 */
export function getWorkIndexTitle(): string {
	return WORK_INDEX_TITLE;
}

/**
 * Returns the meta description for the work index.
 */
export function getWorkIndexDescription(): string {
	return WORK_INDEX_DESCRIPTION;
}

/**
 * Returns the schema.org WebPage object for the work index.
 */
export function getWorkIndexSchema() {
	return createWebPageSchema(WORK_INDEX_SCHEMA_NAME, "work");
}
