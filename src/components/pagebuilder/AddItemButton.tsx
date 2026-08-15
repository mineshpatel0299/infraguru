"use client";

import { useSectionEdit } from "./SectionEditBoundary";

/** Appends a new blank item to an array field. Renders nothing outside
 * edit mode. Drop it right after the list's .map() as one more item. */
export default function AddItemButton({
  arrayPath,
  newItem,
  label = "Add",
  className,
}: {
  arrayPath: string;
  newItem: unknown;
  label?: string;
  className?: string;
}) {
  const ctx = useSectionEdit();
  if (!ctx) return null;

  return (
    <button
      type="button"
      onClick={() => ctx.addItem(arrayPath, newItem)}
      className={
        className ??
        "flex min-h-[80px] items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#032E97]/25 px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#032E97]/60 transition-colors hover:border-[#d4af37]/60 hover:text-[#032E97]"
      }
    >
      + {label}
    </button>
  );
}
