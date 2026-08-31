import Link from "next/link";
import { listAllProjects } from "@/lib/db/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsTable from "./ProjectsTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects — InfraGuru CMS" };

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; status?: string }>;
}) {
  const { q, category, status } = await searchParams;
  const all = await listAllProjects();

  const filtered = all.filter((p) => {
    if (category && category !== "All" && p.category !== category) return false;
    if (status && status !== "All" && p.status !== status) return false;
    if (q) {
      const needle = q.toLowerCase();
      if (
        !p.title.toLowerCase().includes(needle) &&
        !p.location?.toLowerCase().includes(needle) &&
        !p.developer?.toLowerCase().includes(needle)
      ) {
        return false;
      }
    }
    return true;
  });

  const categories = ["All", ...Array.from(new Set(all.map((p) => p.category)))];

  return (
    <div>
      <PageHeader
        title="Projects"
        description={`${all.length} total · ${all.filter((p) => p.status === "published").length} published`}
        actions={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5"
          >
            + New Project
          </Link>
        }
      />

      <form className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#032E97]/8 bg-white p-4 shadow-[0_10px_30px_rgba(3,46,151,0.05)] sm:flex-row sm:items-center">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by title, location, developer…"
          className="w-full rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3.5 py-2.5 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50 sm:max-w-xs"
        />
        <select
          name="category"
          defaultValue={category ?? "All"}
          className="rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3.5 py-2.5 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status ?? "All"}
          className="rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3.5 py-2.5 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
        >
          <option value="All">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-[#0a1435] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0a1435]/90"
        >
          Filter
        </button>
      </form>

      <ProjectsTable
        projects={filtered}
        reorderable={!q?.trim() && (!category || category === "All") && (!status || status === "All")}
      />
    </div>
  );
}
