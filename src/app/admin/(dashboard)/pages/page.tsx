import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { PAGE_REGISTRY } from "@/lib/pageSections";

export const metadata = { title: "Pages — InfraGuru CMS" };

export default function AdminPagesPage() {
  return (
    <div>
      <PageHeader
        title="Pages"
        description="Click into a page, then click any text or image directly on it to edit."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PAGE_REGISTRY.map((page) => (
          <Link
            key={page.slug}
            href={`${page.previewPath}?cmsEdit=1`}
            className="group overflow-hidden rounded-2xl border border-[#032E97]/8 bg-white shadow-[0_10px_40px_rgba(3,46,151,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(3,46,151,0.1)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a1435]">
              {/* Cheap "screenshot": a real, live, non-interactive iframe of
                  the page scaled down to thumbnail size — always accurate,
                  no screenshot pipeline needed. */}
              <div className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25]">
                <iframe
                  src={page.previewPath}
                  title={`${page.label} preview`}
                  tabIndex={-1}
                  className="h-full w-full border-0"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-heading text-sm font-semibold text-[#0a1435]">{page.label}</span>
              <span className="text-xs font-semibold text-[#032E97] opacity-0 transition-opacity group-hover:opacity-100">
                Edit live →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
