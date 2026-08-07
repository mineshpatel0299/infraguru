"use client";

export default function KeyValueListEditor<K extends string, V extends string>({
  label,
  items,
  keys,
  placeholders,
  onChange,
}: {
  label: string;
  items: Record<K | V, string>[];
  keys: [K, V];
  placeholders: [string, string];
  onChange: (items: Record<K | V, string>[]) => void;
}) {
  const [keyA, keyB] = keys;

  const update = (i: number, field: K | V, value: string) => {
    const next = items.map((item, idx) => (idx === i ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { [keyA]: "", [keyB]: "" } as Record<K | V, string>]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5c6480]">
          {label}
        </span>
        <button type="button" onClick={add} className="text-xs font-semibold text-[#032E97] hover:underline">
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
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item[keyA]}
              onChange={(e) => update(i, keyA, e.target.value)}
              placeholder={placeholders[0]}
              className="w-1/3 rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3 py-2 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
            />
            <input
              type="text"
              value={item[keyB]}
              onChange={(e) => update(i, keyB, e.target.value)}
              placeholder={placeholders[1]}
              className="w-full rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3 py-2 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#5c6480] transition-colors hover:bg-red-50 hover:text-red-600"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
