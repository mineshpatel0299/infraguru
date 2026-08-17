"use client";

import { useRef, useState, type ReactNode } from "react";
import { useSectionEdit } from "./SectionEditBoundary";
import { getPath } from "@/lib/objectPath";
import { uploadVideoAction } from "@/app/admin/video-actions";

/** Renders `children(src)` as-is outside of edit mode. Inside a
 * SectionEditBoundary, wraps it with a hover "Replace" overlay that opens
 * a file picker and uploads straight over the video — no side panel.
 * Mirrors EditableImage but uploads to Cloudinary via uploadVideoAction. */
export default function EditableVideo({
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
  const [error, setError] = useState<string | null>(null);

  if (!ctx) return <>{children(fallback)}</>;

  const src = (getPath(ctx.content, path) as string | undefined) ?? fallback;

  return (
    <div className={`group/editable-video ${wrapperClassName}`}>
      {children(src)}
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setUploading(true);
          setError(null);
          uploadVideoAction(file)
            .then(({ url }) => ctx.setField(path, url))
            .catch((err: Error) => setError(err.message))
            .finally(() => setUploading(false));
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover/editable-video:bg-black/40 group-hover/editable-video:opacity-100"
      >
        <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0a1435] shadow">
          {uploading ? "Uploading…" : src ? "Replace video" : "Upload video"}
        </span>
      </button>
      {error && (
        <span className="pointer-events-none absolute inset-x-2 bottom-2 z-20 rounded-md bg-red-600/95 px-2 py-1 text-center text-[11px] font-semibold text-white">
          {error}
        </span>
      )}
    </div>
  );
}
