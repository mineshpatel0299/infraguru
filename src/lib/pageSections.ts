// Single source of truth for the visual page builder: content shapes,
// default copy (today's hardcoded values, so nothing changes visually
// until a row is saved), and which sections make up which page.

export type StatPill = { value: string; label: string };

export type HeroContent = {
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  stats: StatPill[];
};

export const HERO_DEFAULT_CONTENT: HeroContent = {
  eyebrow: "LIVE THE ART OF",
  headline: "LUXURY.",
  description:
    "Premium residences crafted for those who value quality, comfort, and timeless living.",
  ctaLabel: "EXPLORE PROJECTS",
  ctaHref: "/projects",
  stats: [
    { value: "25+", label: "YEARS OF EXCELLENCE" },
    { value: "50+", label: "PREMIUM PROJECTS" },
    { value: "15K+", label: "HAPPY FAMILIES" },
    { value: "10+", label: "CITIES PRESENT" },
  ],
};

export type AboutContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
  image1: string;
  image2: string;
};

export const ABOUT_DEFAULT_CONTENT: AboutContent = {
  eyebrow: "About InfraGuru",
  headingPlain: "Redefining Real Estate",
  headingHighlight: "Excellence.",
  paragraphs: [
    "At InfraGuru, we don't just facilitate transactions; we architect futures. With decades of collective experience, our team navigates the complexities of the real estate market with unmatched precision and deep local insight.",
    "Whether you are acquiring a flagship commercial asset, seeking the perfect residential sanctuary, or structuring a joint development, we provide the strategic clarity you need to move forward with absolute confidence.",
  ],
  ctaLabel: "Discover Our Legacy",
  ctaHref: "#contact",
  image1: "/about-1.jpg",
  image2: "/about-2.jpg",
};

export type StatsContent = {
  headingLine1: string;
  headingLine2: string;
  stats: StatPill[];
};

export const STATS_DEFAULT_CONTENT: StatsContent = {
  headingLine1: "We handle comprehensive real estate transactions,",
  headingLine2: "saving you valuable time.",
  stats: [
    { value: "77+", label: "Properties Listed" },
    { value: "350+", label: "Properties Sold" },
    { value: "500+", label: "Satisfied Clients" },
    { value: "25+", label: "Realtor Awards" },
  ],
};

export type WhyChooseUsCard = { title: string; description: string };

export type WhyChooseUsContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  headingSuffix: string;
  cards: WhyChooseUsCard[];
};

export const WHY_CHOOSE_US_DEFAULT_CONTENT: WhyChooseUsContent = {
  eyebrow: "WHY CHOOSE US",
  headingPlain: "WHERE",
  headingHighlight: "EXCELLENCE",
  headingSuffix: "IS STANDARD.",
  cards: [
    {
      title: "SMOOTH & STRESS-FREE PROCESS",
      description:
        "Infra Guru is a professional real estate consulting company that helps clients find the right home and property investment with a seamless and stress-free process.",
    },
    {
      title: "TRUSTED GUIDANCE & SUPPORT",
      description:
        "We focus on delivering trusted guidance and complete transaction support throughout your entire real estate journey.",
    },
    {
      title: "10+ YEARS OF EXPERIENCE",
      description:
        "With more than a decade in the real estate industry, Infra Guru has been operating as a trusted brand in Gurgaon, Haryana since 2021.",
    },
    {
      title: "WIDE RANGE OF PROPERTIES",
      description:
        "We handle a comprehensive variety of property categories, specializing in residential properties, commercial properties, and farmland.",
    },
    {
      title: "RENTALS & LAND DEVELOPMENT",
      description:
        "Our expertise extends across the market, covering commercial rental properties, residential rentals, as well as land and development projects.",
    },
  ],
};

export type Destination = {
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  image: string;
};

export type ExplorePropertiesContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  subheading: string;
  destinations: Destination[];
};

export const EXPLORE_PROPERTIES_DEFAULT_CONTENT: ExplorePropertiesContent = {
  eyebrow: "EXPLORE PROPERTIES",
  headingPlain: "FIND YOUR",
  headingHighlight: "DESTINATION",
  subheading: "Discover premium real estate opportunities across India and international markets",
  destinations: [
    {
      title: "India Properties",
      subtitle: "Gurgaon, Delhi, Goa and Dholera",
      href: "/destinations/india",
      cta: "India Projects",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "International Properties",
      subtitle: "Dubai, Europe and Australia",
      href: "/destinations/international",
      cta: "International Projects",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80",
    },
  ],
};

export type ServiceItem = {
  title: string;
  description: string;
  bgImage: string;
  link: string;
};

export type ServicesContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  items: ServiceItem[];
};

export const SERVICES_DEFAULT_CONTENT: ServicesContent = {
  eyebrow: "WHAT WE DO",
  headingPlain: "COMPREHENSIVE",
  headingHighlight: "SERVICES",
  items: [
    {
      title: "Property to Buy",
      bgImage: "/Projects/M3M%20Antalya/544304004_m3m-antalya-hills-gallery-3.webp",
      description: "Property to buy means a land or building that is available for sale and can be legally purchased by a buyer.",
      link: "/contact",
    },
    {
      title: "Property to Sell",
      bgImage: "/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124237-PM-Picsart-AiImageEnhancer.webp",
      description: "Property to sell means a land or building that the owner is offering for sale and can be legally sold to a buyer.",
      link: "/contact",
    },
    {
      title: "Property to Rent",
      bgImage: "/Projects/SignatureDeluxe/image-Picsart-AiImageEnhancer-1-scaled.webp",
      description: "Property to rent means a land or building that is given to someone for temporary use in exchange for rent, without transferring ownership.",
      link: "/contact",
    },
    {
      title: "Property to Lease",
      bgImage: "/Projects/M3M/Artboard_4_1_-_8jpuMAmC4FGE.webp",
      description: "Property to lease means a land or building given for long-term use to a tenant under a lease agreement, without transferring ownership.",
      link: "/contact",
    },
    {
      title: "Property to Invest",
      bgImage: "/Projects/M3M%20Antalya/about_2_-_LKRZFgeqKGJ4_-_CfWwyPz3TLPk.webp",
      description: "Property to invest means properties specially selected for long-term returns, rental income and capital growth.",
      link: "/contact",
    },
    {
      title: "Property for Joint Development",
      bgImage: "/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124128-PM-Picsart-AiImageEnhancer.webp",
      description: "Property for joint development is when a land owner and developer partner together to develop a project, sharing the resulting benefits without either party bearing the full cost alone.",
      link: "/contact",
    },
  ],
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type TestimonialsContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  items: TestimonialItem[];
};

export const TESTIMONIALS_DEFAULT_CONTENT: TestimonialsContent = {
  eyebrow: "CLIENT STORIES",
  headingPlain: "VOICES OF",
  headingHighlight: "TRUST",
  items: [
    {
      name: "Michael Carter",
      role: "Real Estate Developer",
      quote:
        "An exceptional experience from start to finish! Their attention to detail and ability to bring ideas to life is truly unmatched. Highly recommended for anyone looking for top-tier renderings and visuals.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Sophia Roberts",
      role: "Interior Designer",
      quote:
        "Working with them was a game-changer for my projects. The virtual tours they created were so immersive and engaging that my clients couldn't stop raving about them!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "David Vance",
      role: "Luxury Homebuyer",
      quote:
        "The most transparent and seamless real estate acquisition we have ever experienced. Infraguru found us our dream waterfront villa before it even hit the open market.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Elena Rostova",
      role: "Commercial Investor",
      quote:
        "Their strategic market insights and asset curation delivered returns that exceeded our portfolio projections by over 30%. A world-class real estate advisory team.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
  ],
};

export type FooterContent = {
  tagline: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
  phone: string;
  websiteLabel: string;
  websiteHref: string;
  hours: string;
  socials: { label: string; href: string }[];
};

export const FOOTER_DEFAULT_CONTENT: FooterContent = {
  tagline: "A tradition of trust — engineering premium infrastructure and real estate legacies since 2011.",
  addressLine1: "Unit No. 1129, Spaze IT Tech Park",
  addressLine2: "Sector - 49, Gurugram",
  email: "info@infraguru.in",
  phone: "+91 90 90 65 65 75",
  websiteLabel: "www.infraguru.in",
  websiteHref: "https://infraguru.in",
  hours: "Mon - Sat : 9:30am - 7:30pm",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
  ],
};

// ── Page / section registry ──────────────────────────────────────────────

export type SectionDef = {
  key: string;
  label: string;
  /** Storage namespace — usually the page's own slug, but shared content
   * (like the Footer) lives once under "global" so every page reads/writes
   * the same row instead of duplicating it. */
  pageSlug: string;
};

export type PageDef = {
  slug: string;
  label: string;
  previewPath: string;
  sections: SectionDef[];
};

export const PAGE_REGISTRY: PageDef[] = [
  {
    slug: "home",
    label: "Home",
    previewPath: "/",
    sections: [
      { key: "hero", label: "Hero", pageSlug: "home" },
      { key: "about", label: "About Intro", pageSlug: "home" },
      { key: "stats", label: "Stats", pageSlug: "home" },
      { key: "whyChooseUs", label: "Why Choose Us", pageSlug: "home" },
      { key: "exploreProperties", label: "Explore Properties", pageSlug: "home" },
      { key: "services", label: "Services", pageSlug: "home" },
      { key: "testimonials", label: "Testimonials", pageSlug: "home" },
      { key: "footer", label: "Footer (shown on all pages)", pageSlug: "global" },
    ],
  },
];

export function getPageDef(slug: string): PageDef | undefined {
  return PAGE_REGISTRY.find((p) => p.slug === slug);
}

export function sectionMapKey(section: Pick<SectionDef, "pageSlug" | "key">): string {
  return `${section.pageSlug}:${section.key}`;
}

/** Reads a saved section's content out of the Map returned by
 * `getSections`, falling back to the given default when no row exists yet. */
export function resolveSection<T>(map: Map<string, unknown>, section: SectionDef, fallback: T): T {
  const value = map.get(sectionMapKey(section));
  return (value as T | undefined) ?? fallback;
}
