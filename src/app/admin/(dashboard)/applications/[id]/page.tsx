import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getApplicationById } from "@/lib/db/applications";
import PageHeader from "@/components/admin/PageHeader";
import ApplicationStatusSelect from "@/components/admin/ApplicationStatusSelect";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteApplicationAction, updateApplicationStatusAction } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Application — InfraGuru CMS" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function deleteAndRedirect(id: string) {
  "use server";
  await deleteApplicationAction(id);
  redirect("/admin/applications");
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getApplicationById(id);
  if (!app) notFound();

  return (
    <div>
      <PageHeader
        title={app.fullName}
        description={app.jobTitleSnapshot ?? "General Application"}
        actions={
          <>
            <ApplicationStatusSelect id={app.id} status={app.status} action={updateApplicationStatusAction} />
            <DeleteButton
              action={deleteAndRedirect.bind(null, app.id)}
              confirmMessage="Delete this application? This can't be undone."
              className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold uppercase tracking-wide text-red-600 hover:bg-red-50"
            />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-[#032E97]/8 bg-white p-6 shadow-[0_10px_40px_rgba(3,46,151,0.05)] sm:p-7">
            <h2 className="mb-4 font-heading text-lg font-semibold text-[#0a1435]">Note to Hiring Team</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#5c6480]">
              {app.coverNote || "No note provided."}
            </p>
          </section>

          {app.hasResume && (
            <section className="rounded-2xl border border-[#032E97]/8 bg-white p-6 shadow-[0_10px_40px_rgba(3,46,151,0.05)] sm:p-7">
              <h2 className="mb-4 font-heading text-lg font-semibold text-[#0a1435]">Resume</h2>
              <a
                href={`/api/admin/applications/${app.id}/resume`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0a1435] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0a1435]/90"
              >
                Download {app.resumeFilename}
              </a>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <section className="rounded-2xl border border-[#032E97]/8 bg-white p-6 shadow-[0_10px_40px_rgba(3,46,151,0.05)]">
            <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5c6480]">Contact</h2>
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-xs text-[#5c6480]">Email</dt>
                <dd className="font-medium text-[#0a1435]">
                  <a href={`mailto:${app.email}`} className="hover:underline">
                    {app.email}
                  </a>
                </dd>
              </div>
              {app.phone && (
                <div>
                  <dt className="text-xs text-[#5c6480]">Phone</dt>
                  <dd className="font-medium text-[#0a1435]">
                    <a href={`tel:${app.phone}`} className="hover:underline">
                      {app.phone}
                    </a>
                  </dd>
                </div>
              )}
              {app.portfolioUrl && (
                <div>
                  <dt className="text-xs text-[#5c6480]">Portfolio / LinkedIn</dt>
                  <dd className="truncate font-medium text-[#032E97]">
                    <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="hover:underline">
                      {app.portfolioUrl}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-[#5c6480]">Applied</dt>
                <dd className="font-medium text-[#0a1435]">{formatDate(app.createdAt)}</dd>
              </div>
            </dl>
          </section>

          {app.jobId && (
            <Link
              href={`/admin/careers/${app.jobId}`}
              className="rounded-2xl border border-[#032E97]/8 bg-white p-6 text-sm font-semibold text-[#032E97] shadow-[0_10px_40px_rgba(3,46,151,0.05)] hover:underline"
            >
              View role: {app.jobTitleSnapshot}
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
