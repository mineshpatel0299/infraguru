import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OPENINGS, getJobBySlug } from "@/lib/careers";
import CareerApplyPage from "@/components/careers/CareerApplyPage";

export function generateStaticParams() {
  return OPENINGS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: "Role Not Found — InfraGuru Careers" };
  }

  return {
    title: `Apply — ${job.title} — InfraGuru Careers`,
    description: job.overview,
  };
}

export default async function CareerApplyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const otherOpenings = OPENINGS.filter((o) => o.slug !== job.slug).slice(0, 3);

  return <CareerApplyPage job={job} otherOpenings={otherOpenings} />;
}
