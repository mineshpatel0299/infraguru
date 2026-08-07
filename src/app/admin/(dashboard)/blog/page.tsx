import Link from "next/link";
import { listAllPosts } from "@/lib/db/blog";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBlogPostAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog — InfraGuru CMS" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; status?: string }>;
}) {
  const { q, category, status } = await searchParams;
  const all = await listAllPosts();

  const filtered = all.filter((p) => {
    if (category && category !== "All" && p.category !== category) return false;
    if (status && status !== "All" && p.status !== status) return false;
    if (q) {
      const needle = q.toLowerCase();
      if (!p.title.toLowerCase().includes(needle) && !p.author.name.toLowerCase().includes(needle)) {
        return false;
      }
    }
    return true;
  });

  const categories = ["All", ...Array.from(new Set(all.map((p) => p.category)))];

  return (
    <div>
      <PageHeader
        title="Blog"
        description={`${all.length} total · ${all.filter((p) => p.status === "published").length} published`}
        actions={
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5"
          >
            + New Post
          </Link>
        }
      />

      <form className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#032E97]/8 bg-white p-4 shadow-[0_10px_30px_rgba(3,46,151,0.05)] sm:flex-row sm:items-center">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by title or author…"
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

      <div className="overflow-hidden rounded-2xl border border-[#032E97]/8 bg-white shadow-[0_10px_40px_rgba(3,46,151,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#032E97]/8 bg-[#032E97]/[0.02] text-[10px] font-bold uppercase tracking-wide text-[#5c6480]">
                <th className="px-5 py-3">Post</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#032E97]/5 last:border-0 hover:bg-[#032E97]/[0.015]">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.coverImage || "/favicon.ico"}
                        alt=""
                        className="h-11 w-14 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#0a1435]">{p.title}</p>
                        <p className="truncate text-xs text-[#5c6480]">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[#5c6480]">{p.category}</td>
                  <td className="px-5 py-3.5 text-[#5c6480]">{p.author.name}</td>
                  <td className="px-5 py-3.5 text-[#5c6480]">{formatDate(p.date)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${p.id}`}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#032E97] transition-colors hover:bg-[#032E97]/5"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteBlogPostAction.bind(null, p.id)}
                        confirmMessage={`Delete "${p.title}"? This can't be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-[#5c6480]">
                    No posts match your filters.
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
