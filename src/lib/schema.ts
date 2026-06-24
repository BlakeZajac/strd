import { url } from "./site";

const SCHEMA_CONTEXT = "https://schema.org";

type SchemaGraph = {
	"@context": string;
	"@graph": unknown[];
};

const PERSON_ID = url("");

export function createHomePageSchema(params: {
	siteName: string;
	siteDescription: string;
	personName: string;
	personJobTitle: string;
}): SchemaGraph {
	return {
		"@context": SCHEMA_CONTEXT,
		"@graph": [
			{
				"@type": "WebSite",
				name: params.siteName,
				description: params.siteDescription,
				url: url(""),
				publisher: { "@id": PERSON_ID },
			},
			{
				"@id": PERSON_ID,
				"@type": "Person",
				name: params.personName,
				jobTitle: params.personJobTitle,
				url: PERSON_ID,
				sameAs: [
					"https://www.instagram.com/zajacphoto/",
					"https://www.linkedin.com/in/blake-zajac/",
				],
				address: {
					"@type": "PostalAddress",
					addressLocality: "Newcastle",
					addressRegion: "NSW",
					addressCountry: "AU",
				},
			},
		],
	};
}
