"use client";

import type { ElementType, FocusEvent, KeyboardEvent } from "react";
import { useSectionEdit } from "./SectionEditBoundary";
import { getPath } from "@/lib/objectPath";

const EDIT_CLASSES =
  "cursor-text rounded-sm outline-none transition-colors hover:bg-[#d4af37]/10 hover:outline hover:outline-1 hover:outline-dashed hover:outline-[#032E97]/40 focus:bg-[#d4af37]/10 focus:outline focus:outline-2 focus:outline-[#d4af37]";

/** Renders `fallback` as plain static text outside of edit mode. Inside a
 * SectionEditBoundary, renders the field at `path` as an in-place editable
 * element — click it on the live page, type, click away to save. No
 * side panel, no form: the DOM node you see is the DOM node you edit. */
export default function EditableText({
  path,
  fallback,
  as = "span",
  className,
  multiline = false,
}: {
  path: string;
  fallback: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
}) {
  const ctx = useSectionEdit();
  const As = as;

  if (!ctx) return <As className={className}>{fallback}</As>;

  const value = (getPath(ctx.content, path) as string | undefined) ?? fallback;

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    const text = (e.currentTarget.textContent ?? "").trim();
    if (text && text !== value) ctx.setField(path, text);
    else if (!text) e.currentTarget.textContent = value; // don't save empty content
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      e.currentTarget.textContent = value;
      e.currentTarget.blur();
    }
  };

  return (
    <As
      className={`${className ?? ""} ${EDIT_CLASSES}`}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {value}
    </As>
  );
}
