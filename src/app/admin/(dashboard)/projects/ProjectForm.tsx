"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import FormSection from "@/components/admin/FormSection";
import MediaUploader from "@/components/admin/MediaUploader";
import GalleryEditor from "@/components/admin/GalleryEditor";
import TextListEditor from "@/components/admin/TextListEditor";
import AmenitiesEditor from "@/components/admin/AmenitiesEditor";
import KeyValueListEditor from "@/components/admin/KeyValueListEditor";
import SaveBar from "@/components/admin/SaveBar";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { slugify } from "@/lib/slugify";
import type { Project } from "@/lib/db/types";
import type { ProjectInput } from "@/lib/db/projects";
import { LOCATIONS } from "@/lib/locations";
import { saveProjectAction } from "./actions";

const CATEGORY_OPTIONS = ["Residential", "Commercial"];

function toInput(p?: Project): ProjectInput {
  return {
    slug: p?.slug ?? "",
    code: p?.code ?? "",
    title: p?.title ?? "",
    tagline: p?.tagline ?? "",
    location: p?.location ?? "",
    locationSlug: p?.locationSlug ?? "",
    category: p?.category ?? "Residential",
    price: p?.price ?? "",
    specs: p?.specs ?? "",
    image: p?.image ?? "",
    description: p?.description ?? [],
    highlights: p?.highlights ?? [],
    amenities: p?.amenities ?? [],
    gallery: p?.gallery ?? [],
    architect: p?.architect ?? "",
    developer: p?.developer ?? "",
    possession: p?.possession ?? "",
    rera: p?.rera ?? "",
    landmarks: p?.landmarks ?? [],
    testimonial: p?.testimonial ?? { quote: "", author: "Infraguru Advisory Team", role: "Real Estate Consultants, Gurugram" },
    status: p?.status ?? "draft",
    sortOrder: p?.sortOrder ?? 0,
    seoTitle: p?.seoTitle ?? "",
    seoDescription: p?.seoDescription ?? "",
    seoKeywords: p?.seoKeywords ?? [],
    ogImage: p?.ogImage ?? "",
    seoNoindex: p?.seoNoindex ?? false,
  };
}

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectInput>(() => toInput(project));
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!slugTouched) set("slug", slugify(title));
  };

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      try {
        await saveProjectAction(project?.id ?? null, form);
        router.push("/admin/projects");
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save project.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <FormSection title="Basic Information" description="Core identity for this listing.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="M3M Mansion"
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
              placeholder="m3m-mansion"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Internal Code</span>
            <input
              type="text"
              value={form.code ?? ""}
              onChange={(e) => set("code", e.target.value)}
              placeholder="GGN-113-A"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Category</span>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Location</span>
            <input
              type="text"
              value={form.location ?? ""}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Sector 113, Gurugram"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>City / Region</span>
            <select
              value={form.locationSlug ?? ""}
              onChange={(e) => set("locationSlug", e.target.value)}
              className={inputClass}
            >
              <option value="">— Unassigned —</option>
              <optgroup label="India">
                {LOCATIONS.filter((l) => l.region === "India").map((l) => (
                  <option key={l.slug} value={l.slug}>{l.label}</option>
                ))}
              </optgroup>
              <optgroup label="International">
                {LOCATIONS.filter((l) => l.region === "International").map((l) => (
                  <option key={l.slug} value={l.slug}>{l.label}</option>
                ))}
              </optgroup>
            </select>
            <span className="mt-1 block text-[11px] text-[#5c6480]">
              Controls which city page and nav dropdown entry this project appears under. Leave unassigned and it falls back to guessing from the Location text above.
            </span>
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>Tagline</span>
            <input
              type="text"
              value={form.tagline ?? ""}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="Grand-lifestyle high-rise residences on the Dwarka Expressway."
              className={inputClass}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Media" description="Cover image and gallery photography.">
        <div>
          <span className={labelClass}>Cover Image</span>
          <div className="max-w-sm">
            <MediaUploader value={form.image ?? ""} onChange={(url) => set("image", url)} label="cover image" />
          </div>
        </div>
        <GalleryEditor items={form.gallery} onChange={(v) => set("gallery", v)} />
      </FormSection>

      <FormSection title="Pricing & Specifications">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Price</span>
            <input
              type="text"
              value={form.price ?? ""}
              onChange={(e) => set("price", e.target.value)}
              placeholder="₹3.77 – 26.87 Cr onwards"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Specs</span>
            <input
              type="text"
              value={form.specs ?? ""}
              onChange={(e) => set("specs", e.target.value)}
              placeholder="3, 3.5, 4, 4.5 BHK · 2080 – 3415 Sqft"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Developer</span>
            <input
              type="text"
              value={form.developer ?? ""}
              onChange={(e) => set("developer", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Architect</span>
            <input
              type="text"
              value={form.architect ?? ""}
              onChange={(e) => set("architect", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Possession Status</span>
            <input
              type="text"
              value={form.possession ?? ""}
              onChange={(e) => set("possession", e.target.value)}
              placeholder="Under Construction / New Launch"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>RERA</span>
            <input
              type="text"
              value={form.rera ?? ""}
              onChange={(e) => set("rera", e.target.value)}
              placeholder="Available on request"
              className={inputClass}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Description" description="One entry per paragraph.">
        <TextListEditor
          label="Paragraphs"
          items={form.description}
          onChange={(v) => set("description", v)}
          placeholder="Write a paragraph about the project…"
          multiline
        />
      </FormSection>

      <FormSection title="Highlights">
        <KeyValueListEditor
          label="Highlights"
          items={form.highlights}
          keys={["label", "value"]}
          placeholders={["Label (e.g. Configuration)", "Value (e.g. 3, 4 BHK Residences)"]}
          onChange={(v) => set("highlights", v)}
        />
      </FormSection>

      <FormSection title="Amenities" description="Pick an icon and label for each amenity.">
        <AmenitiesEditor items={form.amenities} onChange={(v) => set("amenities", v)} />
      </FormSection>

      <FormSection title="Nearby Landmarks">
        <KeyValueListEditor
          label="Landmarks"
          items={form.landmarks}
          keys={["label", "distance"]}
          placeholders={["Landmark (e.g. Dwarka Expressway)", "Distance / note"]}
          onChange={(v) => set("landmarks", v)}
        />
      </FormSection>

      <FormSection title="Advisory Testimonial">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Quote</span>
            <textarea
              rows={3}
              value={form.testimonial?.quote ?? ""}
              onChange={(e) => set("testimonial", { ...form.testimonial!, quote: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Author</span>
            <input
              type="text"
              value={form.testimonial?.author ?? ""}
              onChange={(e) => set("testimonial", { ...form.testimonial!, author: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Role</span>
            <input
              type="text"
              value={form.testimonial?.role ?? ""}
              onChange={(e) => set("testimonial", { ...form.testimonial!, role: e.target.value })}
              className={inputClass}
            />
          </label>
        </div>
      </FormSection>

      <FormSection
        title="Search Engine Optimization"
        description="Controls how this listing appears in Google search results and when shared on social media. Leave blank to fall back to the title, tagline, and cover image above."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>SEO Title</span>
            <input
              type="text"
              value={form.seoTitle ?? ""}
              onChange={(e) => set("seoTitle", e.target.value)}
              placeholder={form.title || "M3M Mansion — Infraguru"}
              maxLength={70}
              className={inputClass}
            />
            <span className="mt-1 block text-[11px] text-[#5c6480]">
              {(form.seoTitle ?? "").length}/70 characters. Shown as the blue link in search results.
            </span>
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>SEO Description</span>
            <textarea
              rows={3}
              value={form.seoDescription ?? ""}
              onChange={(e) => set("seoDescription", e.target.value)}
              placeholder={form.tagline || "A short, compelling summary for search results."}
              maxLength={160}
              className={`${inputClass} resize-none`}
            />
            <span className="mt-1 block text-[11px] text-[#5c6480]">
              {(form.seoDescription ?? "").length}/160 characters.
            </span>
          </label>
        </div>
        <TextListEditor
          label="SEO Keywords"
          items={form.seoKeywords}
          onChange={(v) => set("seoKeywords", v)}
          placeholder="e.g. 4 BHK apartments Dwarka Expressway"
        />
        <div>
          <span className={labelClass}>Social Share Image (OG Image)</span>
          <div className="max-w-sm">
            <MediaUploader value={form.ogImage ?? ""} onChange={(url) => set("ogImage", url)} label="social share image" />
          </div>
          <span className="mt-1 block text-[11px] text-[#5c6480]">
            Recommended 1200×630px. Falls back to the cover image if left blank.
          </span>
        </div>
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={form.seoNoindex}
            onChange={(e) => set("seoNoindex", e.target.checked)}
            className="h-4 w-4 rounded border-[#032E97]/20 text-[#d4af37] focus:ring-[#d4af37]"
          />
          <span className="text-sm font-medium text-[#0a1435]">Hide from search engines (noindex)</span>
        </label>
      </FormSection>

      <FormSection title="Publishing">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Status</span>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as ProjectInput["status"])}
              className={inputClass}
            >
              <option value="draft">Draft (hidden from site)</option>
              <option value="published">Published (live on site)</option>
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
            <p className="mt-1.5 text-xs text-[#5c6480]">
              Lower numbers appear first. Tip: on the Projects list, drag rows by their handle to reorder without typing a number.
            </p>
          </label>
        </div>
      </FormSection>

      <SaveBar
        onSave={handleSave}
        pending={pending}
        error={error}
        cancelHref="/admin/projects"
        saveLabel={project ? "Save Changes" : "Create Project"}
      />
    </div>
  );
}
