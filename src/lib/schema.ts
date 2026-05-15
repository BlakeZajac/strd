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

const PERSON_ID = url("about");

/**
 * Creates a WebPage schema.org object.
 */
export function createWebPageSchema(
  name: string,
  path: string,
  options?: { description?: string; linkToPerson?: boolean },
): SchemaBase {
  const schema: SchemaBase = {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    name,
    url: url(path),
  };
  if (options?.description) {
    schema.description = options.description;
  }
  if (options?.linkToPerson) {
    schema.about = { "@id": PERSON_ID };
  }
  return schema;
}

/**
 * Home page @graph: WebSite + Person (Blake).
 */
export function createHomePageSchema(params: {
  siteName: string;
  siteDescription: string;
  personName: string;
  personJobTitle: string;
  searchAction?: { targetTemplate: string; queryInput: string };
}): SchemaGraph {
  const website: Record<string, unknown> = {
    "@type": "WebSite",
    name: params.siteName,
    description: params.siteDescription,
    url: url(""),
    publisher: { "@id": PERSON_ID },
  };
  if (params.searchAction) {
    website.potentialAction = {
      "@type": "SearchAction",
      target: params.searchAction.targetTemplate,
      "query-input": params.searchAction.queryInput,
    };
  }
  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      website,
      {
        "@id": PERSON_ID,
        "@type": "Person",
        name: params.personName,
        jobTitle: params.personJobTitle,
        url: PERSON_ID,
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

/**
 * Service pillar @graph: Service, BreadcrumbList, optional FAQPage.
 */
export function createServicePillarSchema(params: {
  name: string;
  description: string;
  serviceSlug: string;
  pageUrl: string;
  faqs?: Array<{ question: string; answer: string }>;
}): SchemaGraph {
  const graph: unknown[] = [
    {
      "@type": "Service",
      name: params.name,
      description: params.description,
      provider: { "@id": PERSON_ID },
      areaServed: "Australia",
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
          name: params.name,
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
 * Creates a ContactPage schema.org object.
 */
export function createContactPageSchema(
  name: string,
  path: string,
  options?: { description?: string },
): SchemaBase {
  const schema: SchemaBase = {
    "@context": SCHEMA_CONTEXT,
    "@type": "ContactPage",
    name,
    url: url(path),
    about: { "@id": PERSON_ID },
  };
  if (options?.description) {
    schema.description = options.description;
  }
  return schema;
}

/**
 * Creates a Person schema.org object.
 */
export function createPersonSchema(base: {
  name: string;
  jobTitle: string;
  path: string;
  description?: string;
  address?: { locality: string; region: string; country: string };
}): SchemaBase {
  const schema: SchemaBase = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Person",
    "@id": url(base.path),
    name: base.name,
    jobTitle: base.jobTitle,
    url: url(base.path),
  };
  if (base.description) {
    schema.description = base.description;
  }
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
      provider: { "@id": PERSON_ID },
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
