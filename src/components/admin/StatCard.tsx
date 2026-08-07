export default function StatCard({
  label,
  value,
  hint,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "primary" | "gold" | "neutral";
}) {
  const accentClasses =
    accent === "gold"
      ? "from-[#d4af37]/15 to-[#d4af37]/0 text-[#b97a00]"
      : accent === "neutral"
        ? "from-[#0a1435]/8 to-[#0a1435]/0 text-[#0a1435]"
        : "from-[#032E97]/12 to-[#032E97]/0 text-[#032E97]";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#032E97]/8 bg-white p-6 shadow-[0_10px_40px_rgba(3,46,151,0.06)]">
      <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accentClasses} blur-2xl opacity-60`} />
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5c6480]">{label}</p>
      <p className="mt-3 font-heading text-3xl font-semibold text-[#0a1435]">{value}</p>
      {hint && <p className="mt-2 text-xs text-[#5c6480]">{hint}</p>}
    </div>
  );
}
