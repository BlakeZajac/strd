import { url } from "./site";

const SCHEMA_CONTEXT = "https://schema.org";

type SchemaBase = {
	"@context": string;
	"@type": string;
	[key: string]: unknown;
};

/**
 * Creates a WebPage schema.org object.
 */
export function createWebPageSchema(name: string, path: string): SchemaBase {
	return {
		"@context": SCHEMA_CONTEXT,
		"@type": "WebPage",
		name,
		url: url(path),
	};
}

/**
 * Creates a ContactPage schema.org object.
 */
export function createContactPageSchema(name: string, path: string): SchemaBase {
	return {
		"@context": SCHEMA_CONTEXT,
		"@type": "ContactPage",
		name,
		url: url(path),
	};
}

/**
 * Creates a Person schema.org object.
 */
export function createPersonSchema(
	base: {
		name: string;
		jobTitle: string;
		path: string;
		address?: { locality: string; region: string; country: string };
	}
): SchemaBase {
	const schema: SchemaBase = {
		"@context": SCHEMA_CONTEXT,
		"@type": "Person",
		name: base.name,
		jobTitle: base.jobTitle,
		url: url(base.path),
	};
	if (base.address) {
		schema.address = {
			"@type": "PostalAddress",
			addressLocality: base.address.locality,
			addressRegion: base.address.region,
			addressCountry: base.address.country,
		};
	}
	return schema;
}

/**
 * Creates a WebSite schema.org object with optional SearchAction.
 */
export function createWebSiteSchema(
	name: string,
	path: string,
	searchAction?: { targetTemplate: string; queryInput: string }
): SchemaBase {
	const schema: SchemaBase = {
		"@context": SCHEMA_CONTEXT,
		"@type": "WebSite",
		name,
		url: url(path),
	};
	if (searchAction) {
		schema.potentialAction = {
			"@type": "SearchAction",
			target: searchAction.targetTemplate,
			"query-input": searchAction.queryInput,
		};
	}
	return schema;
}
