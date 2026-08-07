"use client";

import { useActionState } from "react";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { changePasswordAction, type ChangePasswordState } from "./actions";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<ChangePasswordState, FormData>(
    changePasswordAction,
    undefined
  );

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <label className="block">
        <span className={labelClass}>Current Password</span>
        <input type="password" name="currentPassword" required autoComplete="current-password" className={inputClass} />
      </label>
      <label className="block">
        <span className={labelClass}>New Password</span>
        <input type="password" name="newPassword" required autoComplete="new-password" minLength={8} className={inputClass} />
      </label>
      <label className="block">
        <span className={labelClass}>Confirm New Password</span>
        <input type="password" name="confirmPassword" required autoComplete="new-password" minLength={8} className={inputClass} />
      </label>

      {state?.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{state.error}</p>
      )}
      {state?.success && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
          Password updated.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 self-start rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Updating…" : "Update Password"}
      </button>
    </form>
  );
}
