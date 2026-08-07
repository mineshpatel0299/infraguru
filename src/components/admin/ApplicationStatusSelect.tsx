"use client";

import { useTransition } from "react";
import type { ApplicationStatus } from "@/lib/db/types";

const STATUSES: ApplicationStatus[] = ["new", "reviewed", "shortlisted", "rejected", "hired"];

export default function ApplicationStatusSelect({
  id,
  status,
  action,
}: {
  id: string;
  status: ApplicationStatus;
  action: (id: string, status: ApplicationStatus) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as ApplicationStatus;
        startTransition(() => {
          action(id, next);
        });
      }}
      className="rounded-lg border border-[#032E97]/10 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0a1435] outline-none focus:border-[#d4af37]/50 disabled:opacity-60"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
