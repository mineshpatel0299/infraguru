import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPublishedProjects } from "@/lib/db/projects";
import { getLocationConfig, projectBelongsToLocation } from "@/lib/locations";
import LocationProjectsClient from "./LocationProjectsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const config = getLocationConfig(location);
  if (!config) {
    return { title: "Location Not Found — Infraguru" };
  }

  const projects = await listPublishedProjects();
  const matches = projects.filter((p) => projectBelongsToLocation(p, config));
  const title = `${config.label} Real Estate Projects`;
  const description = matches.length
    ? `Explore ${matches.length} ultra-premium ${matches.length === 1 ? "project" : "projects"} curated by Infraguru in ${config.label}.`
    : `Infraguru's ${config.label} portfolio is launching soon. Register your interest for early access to new listings.`;
  const url = `/projects/location/${config.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: matches.length ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `${title} — Infraguru`,
      description,
      url,
    },
  };
}

export default async function LocationProjectsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const config = getLocationConfig(location);
  if (!config) notFound();

  const projects = await listPublishedProjects();
  const matches = projects.filter((p) => projectBelongsToLocation(p, config));

  return <LocationProjectsClient location={config} projects={matches} />;
}
