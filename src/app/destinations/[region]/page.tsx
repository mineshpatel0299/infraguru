import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPublishedProjects } from "@/lib/db/projects";
import { LOCATIONS, projectBelongsToLocation, type LocationRegion } from "@/lib/locations";
import { getSection } from "@/lib/db/pageContent";
import {
  destinationsPageSlug,
  DESTINATIONS_REGION_DEFAULT_CONTENT,
  type DestinationsRegionContent,
} from "@/lib/pageSections";
import RegionDestinationsClient from "./RegionDestinationsClient";

export const dynamic = "force-dynamic";

const REGION_BY_SLUG: Record<string, LocationRegion> = {
  india: "India",
  international: "International",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const heading = REGION_BY_SLUG[region];
  if (!heading) return { title: "Destinations Not Found | Infraguru" };

  const title = heading === "India" ? "India Properties" : "International Properties";
  const description =
    heading === "India"
      ? "Explore Infraguru's curated real estate destinations across Gurgaon, Delhi, Goa and Dholera."
      : "Explore Infraguru's curated international real estate destinations across Dubai, Europe and Australia.";
  const url = `/destinations/${region}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Infraguru`, description, url },
  };
}

export default async function RegionDestinationsPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  const heading = REGION_BY_SLUG[region];
  if (!heading) notFound();

  const [projects, saved] = await Promise.all([
    listPublishedProjects(),
    getSection(destinationsPageSlug(region), "content"),
  ]);
  const content = (saved as DestinationsRegionContent | null) ?? DESTINATIONS_REGION_DEFAULT_CONTENT;
  const cardImageBySlug = new Map(content.cardImages.map((c) => [c.slug, c.image]));

  const locations = LOCATIONS.filter((loc) => loc.region === heading).map((loc) => ({
    ...loc,
    image: cardImageBySlug.get(loc.slug) || loc.image,
    hasProjects: projects.some((p) => projectBelongsToLocation(p, loc)),
  }));

  const heroImage = content.heroImage || locations[0]?.image;

  return <RegionDestinationsClient region={heading} locations={locations} heroImage={heroImage} />;
}
