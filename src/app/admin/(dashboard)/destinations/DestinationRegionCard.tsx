"use client";

import { useState, useTransition } from "react";
import FormSection from "@/components/admin/FormSection";
import MediaUploader from "@/components/admin/MediaUploader";
import { saveSectionContentAction } from "@/app/admin/(dashboard)/pages/actions";
import type { DestinationsRegionContent } from "@/lib/pageSections";

type City = { slug: string; label: string; image: string };

type Region = {
  slug: string;
  label: string;
  pageSlug: string;
  urlPath: string;
  heroImage: string;
  cities: City[];
};

export default function DestinationRegionCard({ region }: { region: Region }) {
  const [savedHero, setSavedHero] = useState(region.heroImage);
  const [savedCities, setSavedCities] = useState(region.cities);
  const [heroImage, setHeroImage] = useState(region.heroImage);
  const [cities, setCities] = useState(region.cities);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const dirty =
    heroImage !== savedHero || cities.some((c, i) => c.image !== savedCities[i]?.image);

  const updateCityImage = (slug: string, image: string) => {
    setCities((prev) => prev.map((c) => (c.slug === slug ? { ...c, image } : c)));
    setJustSaved(false);
  };

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      try {
        const content: DestinationsRegionContent = {
          heroImage,
          cardImages: cities.map((c) => ({ slug: c.slug, image: c.image })),
        };
        await saveSectionContentAction(region.pageSlug, "content", content);
        setSavedHero(heroImage);
        setSavedCities(cities);
        setJustSaved(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save.");
      }
    });
  };

  return (
    <FormSection title={`${region.label} Destinations`} description={region.urlPath}>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#5c6480]">Hero Banner Image</p>
        <p className="mb-2 text-[11px] text-[#5c6480]">
          Recommended 1920×1080px (16:9) landscape, JPG or WEBP — shown full-width behind the page title.
          Leave empty to fall back to the first destination card&apos;s image below.
        </p>
        <MediaUploader
          value={heroImage}
          onChange={(url) => {
            setHeroImage(url);
            setJustSaved(false);
          }}
          label="Hero Image"
          aspect="aspect-[21/9]"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#5c6480]">Destination Cards</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <div key={city.slug}>
              <p className="mb-2 text-[11px] font-semibold text-[#0a1435]">{city.label}</p>
              <MediaUploader
                value={city.image}
                onChange={(url) => updateCityImage(city.slug, url)}
                label={`${city.label} Image`}
                aspect="aspect-[4/3]"
              />
            </div>
          ))}
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
