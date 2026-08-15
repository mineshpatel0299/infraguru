"use client";

import { useRef, useState, type ReactNode } from "react";
import { useSectionEdit } from "./SectionEditBoundary";
import { getPath } from "@/lib/objectPath";
import { uploadMediaAction } from "@/app/admin/media-actions";

/** Renders `children(src)` as-is outside of edit mode. Inside a
 * SectionEditBoundary, wraps it with a hover "Replace" overlay that opens
 * a file picker and uploads straight over the image — no side panel. */
export default function EditableImage({
  path,
  fallback,
  wrapperClassName = "relative",
  children,
}: {
  path: string;
  fallback: string;
  wrapperClassName?: string;
  children: (src: string) => ReactNode;
}) {
  const ctx = useSectionEdit();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!ctx) return <>{children(fallback)}</>;

  const src = (getPath(ctx.content, path) as string | undefined) ?? fallback;

  return (
    <div className={`group/editable-image ${wrapperClassName}`}>
      {children(src)}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setUploading(true);
          uploadMediaAction(file)
            .then(({ url }) => ctx.setField(path, url))
            .finally(() => setUploading(false));
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover/editable-image:bg-black/40 group-hover/editable-image:opacity-100"
      >
        <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0a1435] shadow">
          {uploading ? "Uploading…" : "Replace"}
        </span>
      </button>
    </div>
  );
}
