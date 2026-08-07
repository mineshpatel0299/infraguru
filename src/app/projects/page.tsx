import { listPublishedProjects } from "@/lib/db/projects";
import ProjectsPageClient from "./ProjectsPageClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects — Infraguru" };

export default async function ProjectsPage() {
  const projects = await listPublishedProjects();
  return <ProjectsPageClient projects={projects} />;
}
