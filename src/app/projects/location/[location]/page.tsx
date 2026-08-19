import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPublishedProjects } from "@/lib/db/projects";
import { getLocationConfig, projectBelongsToLocation } from "@/lib/locations";
import { getSession } from "@/lib/auth";
import { getSection } from "@/lib/db/pageContent";
import PageEditProvider from "@/components/pagebuilder/PageEditProvider";
import EditModeBar from "@/components/pagebuilder/EditModeBar";
import { locationPageSlug, type LocationHeroContent } from "@/lib/pageSections";
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
  searchParams,
}: {
  params: Promise<{ location: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { location } = await params;
  const config = getLocationConfig(location);
  if (!config) notFound();

  const pageSlug = locationPageSlug(config.slug);
  const [projects, savedHero, session, sp] = await Promise.all([
    listPublishedProjects(),
    getSection(pageSlug, "hero"),
    getSession(),
    searchParams,
  ]);
  const matches = projects.filter((p) => projectBelongsToLocation(p, config));

  // Admin-set hero images take priority; otherwise fall back to a matching
  // project's own photo so the hero never goes blank before anyone edits it.
  const saved = savedHero as LocationHeroContent | null;
  const autoResidential = matches.find((p) => p.category === "Residential")?.image || "";
  const autoCommercial = matches.find((p) => p.category === "Commercial")?.image || "";
  const hero: LocationHeroContent = {
    residentialImage: saved?.residentialImage || autoResidential,
    commercialImage: saved?.commercialImage || autoCommercial,
  };

  const editMode = Boolean(session) && sp.cmsEdit === "1";
  const clientNode = (
    <LocationProjectsClient
      location={config}
      projects={matches}
      hero={hero}
      pageSlug={pageSlug}
      editMode={editMode}
    />
  );

  if (!editMode) return clientNode;

  return (
    <PageEditProvider>
      <EditModeBar />
      {clientNode}
    </PageEditProvider>
  );
}
