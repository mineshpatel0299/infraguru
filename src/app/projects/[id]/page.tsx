import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectById } from "@/lib/projects";
import ProjectExperience from "@/components/ProjectExperience";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

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
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const related = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main>
      <ProjectExperience project={project} related={related} mode="page" />
      <Footer />
    </main>
  );
}
