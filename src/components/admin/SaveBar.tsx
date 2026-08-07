"use client";

import Link from "next/link";

export default function SaveBar({
  onSave,
  pending,
  error,
  cancelHref,
  saveLabel = "Save",
  extra,
}: {
  onSave: () => void;
  pending: boolean;
  error: string | null;
  cancelHref: string;
  saveLabel?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-4 z-20 mt-2 flex flex-col gap-3 rounded-2xl border border-[#032E97]/10 bg-white/95 p-4 shadow-[0_20px_50px_rgba(3,46,151,0.15)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        {error ? (
          <p className="text-sm font-medium text-red-600">{error}</p>
        ) : (
          <p className="text-xs text-[#5c6480]">Changes are saved when you click {saveLabel.toLowerCase()}.</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {extra}
        <Link
          href={cancelHref}
          className="rounded-full border border-[#032E97]/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#5c6480] transition-colors hover:border-[#032E97]/30 hover:text-[#0a1435]"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : saveLabel}
        </button>
      </div>
    </div>
  );
}
