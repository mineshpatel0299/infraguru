export type LocationSlug = "delhi" | "gurgaon" | "goa" | "dholera"| "europe" | "australia" | "dubai";
export type LocationRegion = "India" | "International";

export type LocationConfig = {
  slug: LocationSlug;
  label: string;
  region: LocationRegion;
  // Matched case-insensitively as a substring against a project's `location` field.
  keywords: string[];
};

export const LOCATIONS: LocationConfig[] = [
  { slug: "delhi", label: "Delhi", region: "India", keywords: ["delhi"] },
  { slug: "gurgaon", label: "Gurgaon", region: "India", keywords: ["gurgaon", "gurugram"] },
  { slug: "goa", label: "Goa", region: "India", keywords: ["goa"] },
  { slug: "dholera", label: "Dholera", region: "India", keywords: ["dholera"] },
  { slug: "europe", label: "Europe", region: "International", keywords: ["europe"] },
  { slug: "australia", label: "Australia", region: "International", keywords: ["australia"] },
  { slug: "dubai", label: "Dubai", region: "International", keywords: ["dubai"] },
];

export function getLocationConfig(slug: string): LocationConfig | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function projectMatchesLocation(projectLocation: string, config: LocationConfig): boolean {
  const haystack = projectLocation.toLowerCase();
  return config.keywords.some((keyword) => haystack.includes(keyword));
}
