import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <AdminSidebar adminName={admin.name} adminEmail={admin.email} />
      <div className="lg:pl-72">
        <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
