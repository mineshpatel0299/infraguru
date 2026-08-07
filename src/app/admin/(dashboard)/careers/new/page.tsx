import PageHeader from "@/components/admin/PageHeader";
import JobForm from "../JobForm";

export const metadata = { title: "New Role — InfraGuru CMS" };

export default function NewJobPage() {
  return (
    <div>
      <PageHeader title="New Role" description="Create a new job opening." />
      <JobForm />
    </div>
  );
}
