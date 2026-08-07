import Link from "next/link";
import { listApplications } from "@/lib/db/applications";
import { listAllJobs } from "@/lib/db/jobs";
import PageHeader from "@/components/admin/PageHeader";
import ApplicationStatusSelect from "@/components/admin/ApplicationStatusSelect";
import { updateApplicationStatusAction } from "./actions";
import type { ApplicationStatus } from "@/lib/db/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Applications — InfraGuru CMS" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ jobId?: string; status?: string }>;
}) {
  const { jobId, status } = await searchParams;

  const [applications, jobs] = await Promise.all([
    listApplications({
      jobId: jobId || undefined,
      status: (status as ApplicationStatus) || undefined,
    }),
    listAllJobs(),
  ]);

  const jobTitle = jobId ? jobs.find((j) => j.id === jobId)?.title : undefined;

  return (
    <div>
      <PageHeader
        title="Applications"
        description={
          jobTitle
            ? `${applications.length} applications for ${jobTitle}`
            : `${applications.length} total applications`
        }
      />

      <form className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#032E97]/8 bg-white p-4 shadow-[0_10px_30px_rgba(3,46,151,0.05)]">
        <select
          name="jobId"
          defaultValue={jobId ?? ""}
          className="rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3.5 py-2.5 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
        >
          <option value="">All roles</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3.5 py-2.5 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-[#0a1435] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0a1435]/90"
        >
          Filter
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-[#032E97]/8 bg-white shadow-[0_10px_40px_rgba(3,46,151,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#032E97]/8 bg-[#032E97]/[0.02] text-[10px] font-bold uppercase tracking-wide text-[#5c6480]">
                <th className="px-5 py-3">Applicant</th>
                <th className="px-5 py-3">Applied For</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Resume</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-[#032E97]/5 last:border-0 hover:bg-[#032E97]/[0.015]">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-[#0a1435]">{app.fullName}</p>
                  </td>
                  <td className="px-5 py-3.5 text-[#5c6480]">
                    {app.jobTitleSnapshot ?? "General Application"}
                  </td>
                  <td className="px-5 py-3.5 text-[#5c6480]">
                    <p>{app.email}</p>
                    {app.phone && <p className="text-xs">{app.phone}</p>}
                  </td>
                  <td className="px-5 py-3.5 text-[#5c6480]">{formatDate(app.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    {app.hasResume ? (
                      <a
                        href={`/api/admin/applications/${app.id}/resume`}
                        className="font-semibold text-[#032E97] hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-[#032E97]/30">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <ApplicationStatusSelect
                      id={app.id}
                      status={app.status}
                      action={updateApplicationStatusAction}
                    />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#032E97] transition-colors hover:bg-[#032E97]/5"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-[#5c6480]">
                    No applications yet.
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
