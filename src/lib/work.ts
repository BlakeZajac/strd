const WORK_DESCRIPTION_FALLBACK =
	"A WordPress project designed and developed by Blake Zajac.";

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
