"use client";

export default function TextListEditor({
  label,
  items,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const update = (i: number, value: string) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5c6480]">
          {label}
        </span>
        <button
          type="button"
          onClick={add}
          className="text-xs font-semibold text-[#032E97] hover:underline"
        >
          + Add
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-[#032E97]/15 px-3 py-3 text-xs text-[#5c6480]">
            Nothing yet — click &ldquo;Add&rdquo; to create one.
          </p>
        )}
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                rows={2}
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className="w-full resize-none rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3 py-2 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
              />
            ) : (
              <input
                type="text"
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3 py-2 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
              />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#5c6480] transition-colors hover:bg-red-50 hover:text-red-600"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
