import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminById } from "@/lib/db/admin";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login — InfraGuru CMS" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // A well-signed session cookie can still point at an admin id that no
  // longer exists (e.g. after switching DATABASE_URL to a different
  // database) — redirecting on cookie validity alone bounces straight back
  // into requireAdmin()'s own redirect to here, an infinite loop.
  const session = await getSession();
  if (session && (await getAdminById(session.sub))) redirect("/admin");

  const { next } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1435] px-6 py-16">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#032E97]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="font-heading text-2xl font-light tracking-[0.15em] text-white">
            INFRA<span className="font-bold text-[#d4af37]">GURU</span>
          </span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Content Console
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-10">
          <h1 className="mb-1 font-heading text-2xl font-semibold text-white">Sign in</h1>
          <p className="mb-8 text-sm text-white/50">
            Manage projects, careers and applications.
          </p>
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          InfraGuru internal tool &middot; not indexed
        </p>
      </div>
    </main>
  );
}
