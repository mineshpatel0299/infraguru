"use client";

import { useSectionEdit } from "./SectionEditBoundary";

/** Small "×" button that clears one or more plain text fields to empty.
 * Pair it with a public-side check that skips rendering the block when its
 * field(s) are empty — that's what actually removes it for visitors;
 * EditableText itself refuses to save empty content via its own blur
 * handler, so this is the only way to fully clear an optional field.
 * Renders nothing outside edit mode. Place inside a `relative group`
 * wrapper — it reveals on hover of that ancestor. */
export default function RemoveFieldButton({
  paths,
  className,
  label = "Remove",
}: {
  paths: string[];
  className?: string;
  label?: string;
}) {
  const ctx = useSectionEdit();
  if (!ctx) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        paths.forEach((path) => ctx.setField(path, ""));
      }}
      aria-label={label}
      className={
        className ??
        "absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
      }
    >
      &#10005;
    </button>
  );
}
