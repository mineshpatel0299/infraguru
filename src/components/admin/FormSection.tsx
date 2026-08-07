import type { ReactNode } from "react";

export default function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#032E97]/8 bg-white p-6 shadow-[0_10px_40px_rgba(3,46,151,0.05)] sm:p-7">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold text-[#0a1435]">{title}</h2>
        {description && <p className="mt-1 text-xs text-[#5c6480]">{description}</p>}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
