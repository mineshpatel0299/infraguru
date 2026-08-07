import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, listPublishedProjects } from "@/lib/db/projects";
import ProjectExperience from "@/components/ProjectExperience";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return { title: "Deed Not Found — Infraguru" };
  }

  return {
    title: `${project.title} — Infraguru`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project || project.status !== "published") {
    notFound();
  }

  const related = (await listPublishedProjects()).filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main>
      <ProjectExperience project={project} related={related} />
      <Footer />
    </main>
  );
}
