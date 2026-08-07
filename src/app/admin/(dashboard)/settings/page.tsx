import { requireAdmin } from "@/lib/auth";
import PageHeader from "@/components/admin/PageHeader";
import FormSection from "@/components/admin/FormSection";
import ChangePasswordForm from "./ChangePasswordForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings — InfraGuru CMS" };

export default async function AdminSettingsPage() {
  const admin = await requireAdmin();

  return (
    <div>
      <PageHeader title="Settings" description="Account and security." />
      <div className="flex flex-col gap-6">
        <FormSection title="Account">
          <p className="text-sm text-[#0a1435]">
            <span className="font-semibold">{admin.name}</span>
            <br />
            <span className="text-[#5c6480]">{admin.email}</span>
          </p>
        </FormSection>
        <FormSection title="Change Password" description="Use at least 8 characters.">
          <ChangePasswordForm />
        </FormSection>
      </div>
    </div>
  );
}
