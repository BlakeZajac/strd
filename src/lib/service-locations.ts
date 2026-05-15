import { getCollection } from "astro:content";

export type ServiceLocationLink = {
  label: string;
  href: string;
};

/**
 * Returns location landing links for a service slug, sorted by location name.
 */
export async function getServiceLocationLinks(
  serviceSlug: string,
): Promise<ServiceLocationLink[]> {
  const locations = await getCollection(
    "service-locations",
    ({ data }) => data.serviceSlug === serviceSlug,
  );

  return locations
    .sort((a, b) => a.data.locationName.localeCompare(b.data.locationName))
    .map((entry) => ({
      label: entry.data.locationName,
      href: `/services/${entry.data.serviceSlug}/${entry.data.locationSlug}/`,
    }));
}
