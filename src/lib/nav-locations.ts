"use server";

import { listPublishedProjects } from "@/lib/db/projects";
import { LOCATIONS, projectBelongsToLocation, type LocationRegion } from "@/lib/locations";

export type NavLocationItem = {
  slug: string;
  label: string;
  href: string;
  hasProjects: boolean;
};

export type NavLocationGroup = {
  heading: LocationRegion;
  items: NavLocationItem[];
};

export async function getNavLocationGroups(): Promise<NavLocationGroup[]> {
  const projects = await listPublishedProjects();

  const regions: LocationRegion[] = ["India", "International"];

  return regions.map((heading) => ({
    heading,
    items: LOCATIONS.filter((loc) => loc.region === heading).map((loc) => ({
      slug: loc.slug,
      label: loc.label,
      href: `/projects/location/${loc.slug}`,
      hasProjects: projects.some((p) => projectBelongsToLocation(p, loc)),
    })),
  }));
}
