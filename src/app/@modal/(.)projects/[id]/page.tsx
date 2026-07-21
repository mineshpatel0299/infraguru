import { notFound } from "next/navigation";
import { PROJECTS, getProjectById } from "@/lib/projects";
import ProjectModal from "@/components/ProjectModal";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: String(p.id) }));
}

export default async function InterceptedProjectModal({
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

  return <ProjectModal project={project} related={related} />;
}
