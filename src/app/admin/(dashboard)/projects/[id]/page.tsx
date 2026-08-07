import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/db/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Project — InfraGuru CMS" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title={project.title} description={`/projects/${project.id}`} />
      <ProjectForm project={project} />
    </div>
  );
}
