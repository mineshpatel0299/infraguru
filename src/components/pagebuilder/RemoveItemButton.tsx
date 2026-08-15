"use client";

import { useSectionEdit } from "./SectionEditBoundary";

/** Small "×" overlay that removes one item from an array field. Renders
 * nothing outside edit mode. Place it inside a `relative group` list-item
 * container — it reveals on hover of that ancestor. */
export default function RemoveItemButton({
  arrayPath,
  index,
  className,
}: {
  arrayPath: string;
  index: number;
  className?: string;
}) {
  const ctx = useSectionEdit();
  if (!ctx) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        ctx.removeItem(arrayPath, index);
      }}
      aria-label="Remove"
      className={
        className ??
        "absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
      }
    >
      &#10005;
    </button>
  );
}
