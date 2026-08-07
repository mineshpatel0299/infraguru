"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next ?? "/admin"} />

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          placeholder="name@company.com"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#d4af37]/60 focus:bg-white/10"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#d4af37]/60 focus:bg-white/10"
        />
      </label>

      {state?.error && (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-8 py-3.5 font-body text-sm font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(212,175,55,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
