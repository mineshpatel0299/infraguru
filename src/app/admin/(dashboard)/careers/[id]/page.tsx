import { notFound } from "next/navigation";
import { getJobById } from "@/lib/db/jobs";
import PageHeader from "@/components/admin/PageHeader";
import JobForm from "../JobForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Role — InfraGuru CMS" };

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) notFound();

  return (
    <div>
      <PageHeader title={job.title} description={`/careers/apply/${job.slug}`} />
      <JobForm job={job} />
    </div>
  );
}
