"use client";

import { useRef, useState, useTransition } from "react";
import { uploadMediaAction } from "@/app/admin/media-actions";

export default function MediaUploader({
  value,
  onChange,
  label = "Image",
  aspect = "aspect-[4/3]",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspect?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined | null) => {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      try {
        const { url } = await uploadMediaAction(file);
        onChange(url);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed.");
      }
    });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className={`group relative ${aspect} w-full overflow-hidden rounded-xl border border-[#032E97]/10 bg-neutral-100`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={pending}
              className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0a1435] shadow"
            >
              {pending ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-red-600 shadow"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={pending}
          className={`flex ${aspect} w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#032E97]/15 bg-[#032E97]/[0.02] text-center transition-colors hover:border-[#d4af37]/50 hover:bg-[#d4af37]/[0.04] disabled:opacity-60`}
        >
          <svg className="h-6 w-6 text-[#032E97]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 18a4.5 4.5 0 01-.5-8.97A5.5 5.5 0 0117 8.5a4 4 0 01-.5 7.97M12 12v7m0-7l-3 3m3-3l3 3" />
          </svg>
          <span className="text-xs font-semibold text-[#032E97]/70">
            {pending ? "Uploading…" : `Upload ${label}`}
          </span>
        </button>
      )}

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="or paste an image URL"
        className="mt-2 w-full rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3 py-2 text-xs text-[#0a1435] outline-none focus:border-[#d4af37]/50"
      />
    </div>
  );
}
