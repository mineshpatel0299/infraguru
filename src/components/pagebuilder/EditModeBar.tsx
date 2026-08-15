import Link from "next/link";

/** Fixed wayfinding bar shown only while an admin has inline edit mode on
 * (?cmsEdit=1). Click any text or image on the page to edit it in place —
 * there's no separate editor screen, so this is the only extra chrome. */
export default function EditModeBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[10000] flex items-center justify-between gap-3 bg-[#0a1435] px-4 py-2 text-white shadow-lg">
      <p className="text-xs font-semibold">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d4af37] align-middle" />
        Edit mode — click any text or image on the page to change it.
      </p>
      <Link
        href="/admin/pages"
        className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
      >
        Exit to admin
      </Link>
    </div>
  );
}
