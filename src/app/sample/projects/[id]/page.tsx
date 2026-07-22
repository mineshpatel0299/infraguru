import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import ProjectDetail from "@/components/sample/ProjectDetail";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.slug === id);

  if (!project) {
    return { title: "Deed Not Found — Infraguru" };
  }

  return {
    title: `${project.title} — Infraguru`,
    description: project.tagline,
  };
}

export default async function SampleProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.slug === id);

  if (!project) {
    notFound();
  }

  const related = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  return <ProjectDetail project={project} related={related} />;
}
