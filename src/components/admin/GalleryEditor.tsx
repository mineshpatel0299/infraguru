"use client";

import MediaUploader from "./MediaUploader";

export default function GalleryEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const update = (i: number, url: string) => {
    const next = [...items];
    next[i] = url;
    onChange(next.filter((v) => v !== ""));
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5c6480]">
          Gallery
        </span>
        <button type="button" onClick={add} className="text-xs font-semibold text-[#032E97] hover:underline">
          + Add photo
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((url, i) => (
          <div key={i} className="relative">
            <MediaUploader value={url} onChange={(v) => update(i, v)} label={`Photo ${i + 1}`} aspect="aspect-square" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow"
              aria-label="Remove photo"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <p className="rounded-lg border border-dashed border-[#032E97]/15 px-3 py-3 text-xs text-[#5c6480]">
          No gallery photos yet.
        </p>
      )}
    </div>
  );
}
