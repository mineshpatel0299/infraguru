import Link from "next/link";
import { listAllJobs } from "@/lib/db/jobs";
import { listApplications } from "@/lib/db/applications";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteJobAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Careers — InfraGuru CMS" };

export default async function AdminCareersPage() {
  const [jobs, applications] = await Promise.all([listAllJobs(), listApplications()]);

  const applicationCounts = new Map<string, number>();
  for (const app of applications) {
    if (!app.jobId) continue;
    applicationCounts.set(app.jobId, (applicationCounts.get(app.jobId) ?? 0) + 1);
  }

  return (
    <div>
      <PageHeader
        title="Career Portal"
        description={`${jobs.length} roles · ${jobs.filter((j) => j.status === "open").length} open`}
        actions={
          <Link
            href="/admin/careers/new"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5"
          >
            + New Role
          </Link>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-[#032E97]/8 bg-white shadow-[0_10px_40px_rgba(3,46,151,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#032E97]/8 bg-[#032E97]/[0.02] text-[10px] font-bold uppercase tracking-wide text-[#5c6480]">
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Applicants</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-[#032E97]/5 last:border-0 hover:bg-[#032E97]/[0.015]">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-[#0a1435]">{job.title}</p>
                    <p className="text-xs text-[#5c6480]">/{job.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-[#5c6480]">{job.department}</td>
                  <td className="px-5 py-3.5 text-[#5c6480]">{job.location}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/applications?jobId=${job.id}`}
                      className="font-semibold text-[#032E97] hover:underline"
                    >
                      {applicationCounts.get(job.id) ?? 0}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/careers/${job.id}`}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#032E97] transition-colors hover:bg-[#032E97]/5"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteJobAction.bind(null, job.id)}
                        confirmMessage={`Delete "${job.title}"? This can't be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-[#5c6480]">
                    No roles yet. Create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
