"use client";

import { useState } from "react";

const AMENITY_ICONS: { emoji: string; label: string }[] = [
  { emoji: "🏊", label: "Swimming Pool" },
  { emoji: "🏋️", label: "Gym / Fitness Center" },
  { emoji: "🌳", label: "Garden / Park" },
  { emoji: "🅿️", label: "Parking" },
  { emoji: "📶", label: "Wi-Fi" },
  { emoji: "🛡️", label: "Security" },
  { emoji: "📹", label: "CCTV Surveillance" },
  { emoji: "⚡", label: "Power Backup" },
  { emoji: "🛗", label: "Lift / Elevator" },
  { emoji: "🎮", label: "Indoor Games" },
  { emoji: "🏸", label: "Sports Court" },
  { emoji: "🧒", label: "Kids' Play Area" },
  { emoji: "🔥", label: "Fire Safety" },
  { emoji: "💧", label: "Water Supply" },
  { emoji: "🏛️", label: "Clubhouse" },
  { emoji: "🌇", label: "Rooftop Lounge" },
  { emoji: "🚴", label: "Jogging Track" },
  { emoji: "🐕", label: "Pet Friendly" },
  { emoji: "♿", label: "Wheelchair Accessible" },
  { emoji: "🍽️", label: "Restaurant / Cafe" },
  { emoji: "🧘", label: "Yoga / Spa" },
  { emoji: "🎉", label: "Banquet Hall" },
  { emoji: "🔌", label: "EV Charging" },
  { emoji: "🔒", label: "Gated Community" },
];

const EMOJI_SET = new Set(AMENITY_ICONS.map((i) => i.emoji));

function splitIcon(value: string): { icon: string | null; text: string } {
  const [first, ...rest] = value.split(" ");
  if (first && EMOJI_SET.has(first)) {
    return { icon: first, text: rest.join(" ") };
  }
  return { icon: null, text: value };
}

export default function AmenitiesEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const update = (i: number, value: string) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };

  const setIcon = (i: number, emoji: string) => {
    const { text } = splitIcon(items[i]);
    update(i, text ? `${emoji} ${text}` : emoji);
    setOpenIndex(null);
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5c6480]">
          Amenities
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
        {items.map((item, i) => {
          const { icon, text } = splitIcon(item);
          return (
            <div key={i} className="relative flex items-start gap-2">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-label="Choose icon"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] text-base hover:border-[#d4af37]/50"
              >
                {icon ?? <span className="text-[#5c6480]">＋</span>}
              </button>
              <input
                type="text"
                value={text}
                onChange={(e) => update(i, icon ? `${icon} ${e.target.value}` : e.target.value)}
                placeholder="Swimming Pool"
                className="w-full rounded-lg border border-[#032E97]/10 bg-[#032E97]/[0.02] px-3 py-2 text-sm text-[#0a1435] outline-none focus:border-[#d4af37]/50"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Remove"
                className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#5c6480] transition-colors hover:bg-red-50 hover:text-red-600"
              >
                &#10005;
              </button>

              {openIndex === i && (
                <>
                  <button
                    type="button"
                    aria-label="Close icon picker"
                    tabIndex={-1}
                    onClick={() => setOpenIndex(null)}
                    className="fixed inset-0 z-0 cursor-default"
                  />
                  <div className="absolute left-0 top-11 z-10 grid w-64 grid-cols-6 gap-1 rounded-lg border border-[#032E97]/10 bg-white p-2 shadow-lg">
                    {AMENITY_ICONS.map((opt) => (
                      <button
                        key={opt.emoji}
                        type="button"
                        title={opt.label}
                        onClick={() => setIcon(i, opt.emoji)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-base hover:bg-[#032E97]/[0.06]"
                      >
                        {opt.emoji}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
