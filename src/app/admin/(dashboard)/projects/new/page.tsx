import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "../ProjectForm";

export const metadata = { title: "New Project — InfraGuru CMS" };

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader title="New Project" description="Create a new project listing." />
      <ProjectForm />
    </div>
  );
}
