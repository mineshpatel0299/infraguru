import type { Metadata } from "next";
import { listPublishedProjects } from "@/lib/db/projects";
import ProjectsPageClient from "./ProjectsPageClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Infraguru's curated portfolio of ultra-premium residential and commercial projects across Gurugram, Delhi NCR, Goa, Europe, Australia and Dubai.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Infraguru",
    description:
      "Explore Infraguru's curated portfolio of ultra-premium residential and commercial projects.",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await listPublishedProjects();
  return <ProjectsPageClient projects={projects} />;
}
