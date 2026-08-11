import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, listOpenJobs } from "@/lib/db/jobs";
import CareerApplyPage from "@/components/careers/CareerApplyPage";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return { title: "Role Not Found — InfraGuru Careers" };
  }

  const url = `/careers/apply/${job.slug}`;

  return {
    title: `Apply — ${job.title} — InfraGuru Careers`,
    description: job.overview,
    alternates: { canonical: url },
    robots: job.status === "open" ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: `Apply — ${job.title}`,
      description: job.overview,
      url,
    },
  };
}

export default async function CareerApplyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job || job.status !== "open") {
    notFound();
  }

  const otherOpenings = (await listOpenJobs()).filter((o) => o.slug !== job.slug).slice(0, 3);

  return <CareerApplyPage job={job} otherOpenings={otherOpenings} />;
}
