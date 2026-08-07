"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import FormSection from "@/components/admin/FormSection";
import TextListEditor from "@/components/admin/TextListEditor";
import KeyValueListEditor from "@/components/admin/KeyValueListEditor";
import ResponsibilityGroupsEditor from "@/components/admin/ResponsibilityGroupsEditor";
import SaveBar from "@/components/admin/SaveBar";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { slugify } from "@/lib/slugify";
import type { JobOpening } from "@/lib/db/types";
import type { JobInput } from "@/lib/db/jobs";
import { saveJobAction } from "./actions";

const DEPARTMENT_OPTIONS = ["Sales", "Marketing", "Design", "Operations"];
const WORK_MODES = ["Work from Office", "Hybrid", "Remote"];

function toInput(j?: JobOpening): JobInput {
  return {
    slug: j?.slug ?? "",
    title: j?.title ?? "",
    department: j?.department ?? "Sales",
    location: j?.location ?? "",
    address: j?.address ?? "",
    workMode: j?.workMode ?? "Work from Office",
    requirements: j?.requirements ?? [],
    overview: j?.overview ?? "",
    responsibilities: j?.responsibilities ?? [{ items: [""] }],
    qualifications: j?.qualifications ?? [],
    whyJoin: j?.whyJoin ?? [],
    status: j?.status ?? "draft",
    sortOrder: j?.sortOrder ?? 0,
  };
}

export default function JobForm({ job }: { job?: JobOpening }) {
  const router = useRouter();
  const [form, setForm] = useState<JobInput>(() => toInput(job));
  const [slugTouched, setSlugTouched] = useState(Boolean(job));
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof JobInput>(key: K, value: JobInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!slugTouched) set("slug", slugify(title));
  };

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      try {
        await saveJobAction(job?.id ?? null, form);
        router.push("/admin/careers");
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save role.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Job Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Senior Sales Manager"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Slug (used in the URL)</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Department</span>
            <input
              type="text"
              list="department-options"
              value={form.department}
              onChange={(e) => set("department", e.target.value)}
              className={inputClass}
            />
            <datalist id="department-options">
              {DEPARTMENT_OPTIONS.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </label>
          <label className="block">
            <span className={labelClass}>Location</span>
            <input
              type="text"
              value={form.location ?? ""}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Gurugram, Haryana"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Work Mode</span>
            <input
              type="text"
              list="work-mode-options"
              value={form.workMode ?? ""}
              onChange={(e) => set("workMode", e.target.value)}
              className={inputClass}
            />
            <datalist id="work-mode-options">
              {WORK_MODES.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>Office Address (optional)</span>
            <input
              type="text"
              value={form.address ?? ""}
              onChange={(e) => set("address", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>Overview</span>
            <textarea
              rows={3}
              value={form.overview ?? ""}
              onChange={(e) => set("overview", e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Requirements" description="Shown as bullet points on the openings card.">
        <TextListEditor
          label="Requirements"
          items={form.requirements}
          onChange={(v) => set("requirements", v)}
          placeholder="5+ years in real estate or premium sales leadership."
        />
      </FormSection>

      <FormSection title="Key Responsibilities">
        <ResponsibilityGroupsEditor
          groups={form.responsibilities}
          onChange={(v) => set("responsibilities", v)}
        />
      </FormSection>

      <FormSection title="Qualifications & Skills">
        <KeyValueListEditor
          label="Qualifications"
          items={form.qualifications}
          keys={["label", "value"]}
          placeholders={["Label (e.g. Education)", "Value"]}
          onChange={(v) => set("qualifications", v)}
        />
      </FormSection>

      <FormSection title="Why Join Us">
        <TextListEditor
          label="Reasons"
          items={form.whyJoin}
          onChange={(v) => set("whyJoin", v)}
          placeholder="Opportunity to grow in a dynamic and career-driven company."
        />
      </FormSection>

      <FormSection title="Publishing">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Status</span>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as JobInput["status"])}
              className={inputClass}
            >
              <option value="draft">Draft (hidden from site)</option>
              <option value="open">Open (accepting applications)</option>
              <option value="closed">Closed (visible, not accepting)</option>
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Sort Order</span>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => set("sortOrder", Number(e.target.value) || 0)}
              className={inputClass}
            />
          </label>
        </div>
      </FormSection>

      <SaveBar
        onSave={handleSave}
        pending={pending}
        error={error}
        cancelHref="/admin/careers"
        saveLabel={job ? "Save Changes" : "Create Role"}
      />
    </div>
  );
}
