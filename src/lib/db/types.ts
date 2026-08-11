export type Highlight = { label: string; value: string };
export type Landmark = { label: string; distance: string };
export type Testimonial = { quote: string; author: string; role: string };

export type ProjectStatus = "draft" | "published";

// Nullable TEXT columns are coerced to "" by the row mapper in db/projects.ts,
// so the public Project shape matches the original static data (plain strings) —
// components can interpolate these fields directly with no null-guards.
export type Project = {
  id: string;
  slug: string;
  code: string;
  title: string;
  tagline: string;
  location: string;
  category: string;
  price: string;
  specs: string;
  image: string;
  description: string[];
  highlights: Highlight[];
  amenities: string[];
  gallery: string[];
  architect: string;
  developer: string;
  possession: string;
  rera: string;
  landmarks: Landmark[];
  testimonial: Testimonial | null;
  status: ProjectStatus;
  featured: boolean;
  sortOrder: number;
  // SEO — all optional overrides. Public pages fall back to title/tagline/image
  // when these are blank, so components can also interpolate these directly.
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage: string;
  seoNoindex: boolean;
  createdAt: string;
  updatedAt: string;
};

export type JobResponsibilityGroup = { heading?: string; items: string[] };
export type JobQualification = { label: string; value: string };
export type JobStatus = "open" | "closed" | "draft";

export const DEPARTMENTS = ["All", "Sales", "Marketing", "Design", "Operations"] as const;
export type Department = (typeof DEPARTMENTS)[number];

export type JobOpening = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  // Nullable — CareerApplyPage falls back to `location` with `job.address ?? job.location`.
  address: string | null;
  workMode: string;
  requirements: string[];
  overview: string;
  responsibilities: JobResponsibilityGroup[];
  qualifications: JobQualification[];
  whyJoin: string[];
  status: JobStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "rejected" | "hired";

export type JobApplication = {
  id: string;
  jobId: string | null;
  jobTitleSnapshot: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  portfolioUrl: string | null;
  coverNote: string | null;
  resumeFilename: string | null;
  resumeMimeType: string | null;
  hasResume: boolean;
  status: ApplicationStatus;
  createdAt: string;
};

export type BlogAuthor = { name: string; role: string; avatar: string };
export type BlogStatus = "draft" | "published";

export const BLOG_CATEGORIES = ["Market Insights", "Buying Guide", "Investment", "Design & Living"] as const;

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: BlogAuthor;
  content: string[];
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};
