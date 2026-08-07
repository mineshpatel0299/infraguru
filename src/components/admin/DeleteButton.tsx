"use client";

import { useTransition } from "react";

export default function DeleteButton({
  action,
  confirmMessage = "Are you sure? This can't be undone.",
  label = "Delete",
  className,
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  label?: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      }
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
