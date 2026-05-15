import { url } from "./site";

const SCHEMA_CONTEXT = "https://schema.org";

type SchemaBase = {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
};

type SchemaGraph = {
  "@context": string;
  "@graph": unknown[];
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
export function createContactPageSchema(
  name: string,
  path: string,
): SchemaBase {
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
export function createPersonSchema(base: {
  name: string;
  jobTitle: string;
  path: string;
  address?: { locality: string; region: string; country: string };
}): SchemaBase {
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
 * Creates a combined @graph schema for a service+location landing page.
 * Includes ProfessionalService, BreadcrumbList, and optional FAQPage.
 */
export function createServiceLocationSchema(params: {
  heading: string;
  description: string;
  areaServed: string;
  pageUrl: string;
  serviceSlug: string;
  locationName: string;
  faqs?: Array<{ question: string; answer: string }>;
}): SchemaGraph {
  const graph: unknown[] = [
    {
      "@type": "ProfessionalService",
      name: params.heading,
      description: params.description,
      provider: {
        "@type": "Person",
        name: "Blake Zajac",
        url: url("about"),
      },
      areaServed: params.areaServed,
      url: params.pageUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Services",
          item: url("services"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "WordPress developer",
          item: url(`services/${params.serviceSlug}`),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: params.locationName,
          item: params.pageUrl,
        },
      ],
    },
  ];
  if (params.faqs && params.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: params.faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }
  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": graph,
  };
}

/**
 * Creates a WebSite schema.org object with optional SearchAction.
 */
export function createWebSiteSchema(
  name: string,
  path: string,
  searchAction?: { targetTemplate: string; queryInput: string },
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
