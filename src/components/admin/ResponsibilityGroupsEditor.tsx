"use client";

import type { JobResponsibilityGroup } from "@/lib/db/types";

export default function ResponsibilityGroupsEditor({
  groups,
  onChange,
}: {
  groups: JobResponsibilityGroup[];
  onChange: (groups: JobResponsibilityGroup[]) => void;
}) {
  const updateHeading = (gi: number, heading: string) => {
    const next = groups.map((g, i) => (i === gi ? { ...g, heading } : g));
    onChange(next);
  };

  const updateItem = (gi: number, ii: number, value: string) => {
    const next = groups.map((g, i) =>
      i === gi ? { ...g, items: g.items.map((it, j) => (j === ii ? value : it)) } : g
    );
    onChange(next);
  };

  const addItem = (gi: number) => {
    const next = groups.map((g, i) => (i === gi ? { ...g, items: [...g.items, ""] } : g));
    onChange(next);
  };

  const removeItem = (gi: number, ii: number) => {
    const next = groups.map((g, i) =>
      i === gi ? { ...g, items: g.items.filter((_, j) => j !== ii) } : g
    );
    onChange(next);
  };

  const removeGroup = (gi: number) => onChange(groups.filter((_, i) => i !== gi));
  const addGroup = () => onChange([...groups, { heading: "", items: [""] }]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5c6480]">
          Key Responsibilities
        </span>
        <button type="button" onClick={addGroup} className="text-xs font-semibold text-[#032E97] hover:underline">
          + Add group
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {groups.map((group, gi) => (
          <div key={gi} className="rounded-xl border border-[#032E97]/10 bg-[#032E97]/[0.02] p-4">
            <div className="mb-3 flex items-center gap-2">
              <input
                type="text"
                value={group.heading ?? ""}
                onChange={(e) => updateHeading(gi, e.target.value)}
                placeholder="Group heading (optional, e.g. Human Resources)"
                className="w-full rounded-lg border border-[#032E97]/10 bg-white px-3 py-2 text-sm font-semibold text-[#0a1435] outline-none focus:border-[#d4af37]/50"
              />
              <button
                type="button"
                onClick={() => removeGroup(gi)}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                Remove group
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {group.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(gi, ii, e.target.value)}
                    placeholder="Responsibility"
                    className="w-full rounded-lg border border-[#032E97]/10 bg-white px-3 py-2 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(gi, ii)}
                    aria-label="Remove"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#5c6480] transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem(gi)}
                className="self-start text-xs font-semibold text-[#032E97] hover:underline"
              >
                + Add item
              </button>
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="rounded-lg border border-dashed border-[#032E97]/15 px-3 py-3 text-xs text-[#5c6480]">
            No responsibility groups yet.
          </p>
        )}
      </div>
    </div>
  );
}
