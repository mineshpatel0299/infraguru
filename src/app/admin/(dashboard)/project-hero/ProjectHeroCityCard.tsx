"use client";

import { useState, useTransition } from "react";
import FormSection from "@/components/admin/FormSection";
import MediaUploader from "@/components/admin/MediaUploader";
import { saveSectionContentAction } from "@/app/admin/(dashboard)/pages/actions";
import type { LocationHeroContent } from "@/lib/pageSections";

type City = {
  slug: string;
  label: string;
  pageSlug: string;
  residentialImage: string;
  commercialImage: string;
};

export default function ProjectHeroCityCard({ city }: { city: City }) {
  const [saved, setSaved] = useState({ residentialImage: city.residentialImage, commercialImage: city.commercialImage });
  const [residentialImage, setResidentialImage] = useState(city.residentialImage);
  const [commercialImage, setCommercialImage] = useState(city.commercialImage);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const dirty = residentialImage !== saved.residentialImage || commercialImage !== saved.commercialImage;

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      try {
        const content: LocationHeroContent = { residentialImage, commercialImage };
        await saveSectionContentAction(city.pageSlug, "hero", content);
        setSaved({ residentialImage, commercialImage });
        setJustSaved(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save.");
      }
    });
  };

  return (
    <FormSection title={city.label} description={`/projects/location/${city.slug}`}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#5c6480]">Residential Hero Image</p>
          <p className="mb-2 text-[11px] text-[#5c6480]">
            Recommended 1920×1080px (16:9) landscape, JPG or WEBP, under ~500KB — shown full-width behind the hero text and cropped into a small circle toggle.
          </p>
          <MediaUploader
            value={residentialImage}
            onChange={(url) => {
              setResidentialImage(url);
              setJustSaved(false);
            }}
            label="Residential Image"
            aspect="aspect-[16/9]"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#5c6480]">Commercial Hero Image</p>
          <p className="mb-2 text-[11px] text-[#5c6480]">
            Recommended 1920×1080px (16:9) landscape, JPG or WEBP, under ~500KB — shown full-width behind the hero text and cropped into a small circle toggle.
          </p>
          <MediaUploader
            value={commercialImage}
            onChange={(url) => {
              setCommercialImage(url);
              setJustSaved(false);
            }}
            label="Commercial Image"
            aspect="aspect-[16/9]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#032E97]/8 pt-5">
        <p className="text-xs text-[#5c6480]">
          {error ? (
            <span className="font-medium text-red-600">{error}</span>
          ) : justSaved ? (
            <span className="font-medium text-emerald-600">Saved.</span>
          ) : (
            "Changes are saved when you click Save."
          )}
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={pending || !dirty}
          className="shrink-0 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </FormSection>
  );
}
