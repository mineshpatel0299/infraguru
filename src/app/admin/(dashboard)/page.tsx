import Link from "next/link";
import { listAllProjects } from "@/lib/db/projects";
import { listAllJobs } from "@/lib/db/jobs";
import { listApplications } from "@/lib/db/applications";
import { listAllPosts } from "@/lib/db/blog";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard — InfraGuru CMS" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default async function AdminDashboardPage() {
  const [projects, jobs, applications, posts] = await Promise.all([
    listAllProjects(),
    listAllJobs(),
    listApplications(),
    listAllPosts(),
  ]);

  const publishedProjects = projects.filter((p) => p.status === "published").length;
  const openJobs = jobs.filter((j) => j.status === "open").length;
  const newApplications = applications.filter((a) => a.status === "new").length;
  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const recentApplications = applications.slice(0, 6);

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your projects, roles and applications." />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Projects" value={projects.length} hint={`${publishedProjects} published`} accent="primary" />
        <StatCard label="Open Roles" value={openJobs} hint={`${jobs.length} total roles`} accent="gold" />
        <StatCard label="Blog Posts" value={posts.length} hint={`${publishedPosts} published`} accent="neutral" />
        <StatCard label="Total Applications" value={applications.length} accent="neutral" />
        <StatCard label="New Applications" value={newApplications} hint="Awaiting review" accent="primary" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <section className="overflow-hidden rounded-2xl border border-[#032E97]/8 bg-white shadow-[0_10px_40px_rgba(3,46,151,0.05)]">
          <div className="flex items-center justify-between border-b border-[#032E97]/8 px-6 py-4">
            <h2 className="font-heading text-base font-semibold text-[#0a1435]">Recent Applications</h2>
            <Link href="/admin/applications" className="text-xs font-semibold text-[#032E97] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[#032E97]/5">
            {recentApplications.map((app) => (
              <Link
                key={app.id}
                href={`/admin/applications/${app.id}`}
                className="flex items-center justify-between gap-4 px-6 py-3.5 transition-colors hover:bg-[#032E97]/[0.015]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#0a1435]">{app.fullName}</p>
                  <p className="truncate text-xs text-[#5c6480]">
                    {app.jobTitleSnapshot ?? "General Application"} · {formatDate(app.createdAt)}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </Link>
            ))}
            {recentApplications.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-[#5c6480]">No applications yet.</p>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[#032E97]/8 bg-white p-6 shadow-[0_10px_40px_rgba(3,46,151,0.05)]">
            <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5c6480]">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/admin/projects/new"
                className="rounded-xl bg-[#032E97]/[0.04] px-4 py-3 text-sm font-semibold text-[#032E97] transition-colors hover:bg-[#032E97]/[0.08]"
              >
                + New Project
              </Link>
              <Link
                href="/admin/careers/new"
                className="rounded-xl bg-[#032E97]/[0.04] px-4 py-3 text-sm font-semibold text-[#032E97] transition-colors hover:bg-[#032E97]/[0.08]"
              >
                + New Role
              </Link>
              <Link
                href="/admin/blog/new"
                className="rounded-xl bg-[#032E97]/[0.04] px-4 py-3 text-sm font-semibold text-[#032E97] transition-colors hover:bg-[#032E97]/[0.08]"
              >
                + New Post
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
