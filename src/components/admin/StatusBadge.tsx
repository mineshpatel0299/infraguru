const STYLES: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-neutral-100 text-neutral-500 border-neutral-200",
  new: "bg-blue-50 text-blue-700 border-blue-200",
  reviewed: "bg-violet-50 text-violet-700 border-violet-200",
  shortlisted: "bg-[#fdf6e3] text-[#b97a00] border-[#d4af37]/40",
  rejected: "bg-red-50 text-red-600 border-red-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function StatusBadge({ status }: { status: string }) {
  const cls = STYLES[status] ?? "bg-neutral-100 text-neutral-600 border-neutral-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${cls}`}
    >
      {status}
    </span>
  );
}
