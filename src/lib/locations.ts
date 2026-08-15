export type LocationSlug = "delhi" | "gurgaon" | "goa" | "dholera"| "europe" | "australia" | "dubai";
export type LocationRegion = "India" | "International";

export type LocationConfig = {
  slug: LocationSlug;
  label: string;
  region: LocationRegion;
  // Matched case-insensitively as a substring against a project's `location` field.
  keywords: string[];
  // Representative destination-card image (used on /destinations/[region]).
  image: string;
};

export const LOCATIONS: LocationConfig[] = [
  {
    slug: "delhi",
    label: "Delhi",
    region: "India",
    keywords: ["delhi"],
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "gurgaon",
    label: "Gurgaon",
    region: "India",
    keywords: ["gurgaon", "gurugram"],
    image: "https://images.unsplash.com/photo-1695667424131-a9680e0307ee?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "goa",
    label: "Goa",
    region: "India",
    keywords: ["goa"],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "dholera",
    label: "Dholera",
    region: "India",
    keywords: ["dholera"],
    image: "https://images.unsplash.com/photo-1650868469306-3b9a0a198945?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "europe",
    label: "Europe",
    region: "International",
    keywords: ["europe"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "australia",
    label: "Australia",
    region: "International",
    keywords: ["australia"],
    image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "dubai",
    label: "Dubai",
    region: "International",
    keywords: ["dubai"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80",
  },
];

export function getLocationConfig(slug: string): LocationConfig | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function projectMatchesLocation(projectLocation: string, config: LocationConfig): boolean {
  const haystack = projectLocation.toLowerCase();
  return config.keywords.some((keyword) => haystack.includes(keyword));
}

// The CMS lets an admin explicitly tag a project with one of the LOCATIONS
// slugs (ProjectForm's "City / Region" field). That tag is authoritative
// whenever it's set. Only legacy/untagged rows (locationSlug === "") fall
// back to guessing from the free-text `location` field, so a bad guess can't
// silently override what the admin actually picked.
export function projectBelongsToLocation(
  project: { locationSlug: string; location: string },
  config: LocationConfig
): boolean {
  if (project.locationSlug) return project.locationSlug === config.slug;
  return projectMatchesLocation(project.location, config);
}
