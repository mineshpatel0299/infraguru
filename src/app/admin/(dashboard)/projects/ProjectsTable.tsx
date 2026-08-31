"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import type { Project } from "@/lib/db/types";
import { getLocationConfig } from "@/lib/locations";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProjectAction, reorderProjectsAction } from "./actions";

function DragHandleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <circle cx="6" cy="5" r="1.4" />
      <circle cx="6" cy="10" r="1.4" />
      <circle cx="6" cy="15" r="1.4" />
      <circle cx="13" cy="5" r="1.4" />
      <circle cx="13" cy="10" r="1.4" />
      <circle cx="13" cy="15" r="1.4" />
    </svg>
  );
}

export default function ProjectsTable({
  projects,
  reorderable,
}: {
  projects: Project[];
  reorderable: boolean;
}) {
  const [ordered, setOrdered] = useState(projects);
  useEffect(() => setOrdered(projects), [projects]);

  const [isSaving, startTransition] = useTransition();
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDrop = (dropIndex: number) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    setDragOverIndex(null);
    if (from === null || from === dropIndex) return;

    const next = [...ordered];
    const [moved] = next.splice(from, 1);
    next.splice(dropIndex, 0, moved);
    setOrdered(next);
    startTransition(() => {
      reorderProjectsAction(next.map((p) => p.id));
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#032E97]/8 bg-white shadow-[0_10px_40px_rgba(3,46,151,0.05)]">
      {reorderable ? (
        <div className="flex items-center justify-between gap-3 border-b border-[#032E97]/8 bg-[#d4af37]/[0.06] px-5 py-2 text-[11px] font-semibold text-[#8a6a1a]">
          <span>Drag rows by the handle to reorder how projects appear on the site.</span>
          {isSaving && <span className="text-[#8a6a1a]/70">Saving order…</span>}
        </div>
      ) : (
        <div className="border-b border-[#032E97]/8 bg-[#032E97]/[0.02] px-5 py-2 text-[11px] font-semibold text-[#5c6480]">
          Clear all filters to drag-and-drop reorder projects.
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#032E97]/8 bg-[#032E97]/[0.02] text-[10px] font-bold uppercase tracking-wide text-[#5c6480]">
              <th className="w-10 px-3 py-3" />
              <th className="px-5 py-3">Project</th>
              <th className="px-5 py-3">City</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((p, i) => (
              <tr
                key={p.id}
                draggable={reorderable}
                onDragStart={(e) => {
                  dragIndex.current = i;
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  if (!reorderable) return;
                  e.preventDefault();
                  if (dragOverIndex !== i) setDragOverIndex(i);
                }}
                onDragLeave={() => setDragOverIndex((cur) => (cur === i ? null : cur))}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(i);
                }}
                onDragEnd={() => {
                  dragIndex.current = null;
                  setDragOverIndex(null);
                }}
                className={`border-b border-[#032E97]/5 last:border-0 transition-colors ${
                  dragOverIndex === i ? "bg-[#d4af37]/10" : "hover:bg-[#032E97]/[0.015]"
                }`}
              >
                <td className="px-3 py-3.5">
                  {reorderable && (
                    <span
                      className="flex cursor-grab items-center justify-center text-[#5c6480]/40 transition-colors hover:text-[#5c6480] active:cursor-grabbing"
                      title="Drag to reorder"
                    >
                      <DragHandleIcon />
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image || "/favicon.ico"}
                      alt=""
                      className="h-11 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#0a1435]">{p.title}</p>
                      <p className="truncate text-xs text-[#5c6480]">{p.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  {p.locationSlug ? (
                    <span className="inline-flex items-center rounded-full bg-[#032E97]/8 px-2.5 py-1 text-[11px] font-semibold text-[#032E97]">
                      {getLocationConfig(p.locationSlug)?.label ?? p.locationSlug}
                    </span>
                  ) : (
                    <span
                      title="No city assigned — won't reliably show up on any /projects/location page or in the Properties nav dropdown."
                      className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700"
                    >
                      Unassigned
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-[#5c6480]">{p.category}</td>
                <td className="px-5 py-3.5 text-[#5c6480]">{p.price}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#032E97] transition-colors hover:bg-[#032E97]/5"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteProjectAction.bind(null, p.id)}
                      confirmMessage={`Delete "${p.title}"? This can't be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {ordered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-[#5c6480]">
                  No projects match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
