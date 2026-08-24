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

export type AwardItem = {
  title: string;
  issuer: string;
  year: string;
  /** Empty string = no photo uploaded yet; card renders a placeholder. */
  image: string;
  /** Optional ceremony/moment clip. Empty string = no video attached. */
  video: string;
};

export type AwardsContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  subheading: string;
  items: AwardItem[];
};

export const AWARDS_DEFAULT_CONTENT: AwardsContent = {
  eyebrow: "RECOGNITION",
  headingPlain: "AWARDS &",
  headingHighlight: "ACCOLADES",
  subheading:
    "A legacy measured not only in addresses delivered, but in the trust and recognition earned along the way.",
  items: [
    {
      title: "Best Luxury Real Estate Advisory",
      issuer: "Realty Excellence Awards",
      year: "2025",
      image: "",
      video: "",
    },
    {
      title: "Developer Partner of the Year",
      issuer: "India Real Estate Summit",
      year: "2024",
      image: "",
      video: "",
    },
    {
      title: "Top Real Estate Consultancy — North India",
      issuer: "National Realty Icons",
      year: "2024",
      image: "",
      video: "",
    },
    {
      title: "Customer Trust Award",
      issuer: "PropTech India",
      year: "2023",
      image: "",
      video: "",
    },
    {
      title: "Excellence in Client Service",
      issuer: "Gurugram Business Awards",
      year: "2023",
      image: "",
      video: "",
    },
    {
      title: "Emerging Real Estate Brand",
      issuer: "CREDAI Recognition",
      year: "2022",
      image: "",
      video: "",
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

// ── About page ────────────────────────────────────────────────────────────

export type AboutHeroContent = {
  eyebrow: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  description: string;
  image: string;
};

export const ABOUT_HERO_DEFAULT_CONTENT: AboutHeroContent = {
  eyebrow: "Our Story",
  line1: "Engineering",
  line2: "Legacies,",
  line3: "Not Just",
  line4: "Listings.",
  description:
    "Since 2011, InfraGuru has stood at the intersection of trust and craftsmanship — curating real estate that is bought once and cherished for generations.",
  image: "/about.jpg",
};

export type AboutStoryContent = {
  eyebrow: string;
  headingPlain1: string;
  headingHighlight: string;
  headingPlain2: string;
  paragraphs: string[];
  image1: string;
  image2: string;
  badgeYear: string;
  badgeLabel: string;
  stats: StatPill[];
};

export const ABOUT_STORY_DEFAULT_CONTENT: AboutStoryContent = {
  eyebrow: "Who We Are",
  headingPlain1: "A decade spent turning",
  headingHighlight: "addresses",
  headingPlain2: "into legacies.",
  paragraphs: [
    "InfraGuru began with a simple conviction — that real estate advisory should feel like a partnership, not a transaction. Since 2011, we've worked from Gurugram outward, guiding individuals, families, and enterprises through the residential, commercial, and infrastructure markets with quiet precision.",
    "We don't chase volume. Every mandate — whether it's a flagship commercial tower, a private residence, or a joint-development structure — is handled with the same architect's eye for detail and a fiduciary's sense of responsibility.",
  ],
  image1: "/about-1.jpg",
  image2: "/about-2.jpg",
  badgeYear: "2011",
  badgeLabel: "Est.",
  stats: [
    { value: "15+", label: "Years of Trust" },
    { value: "500+", label: "Families & Investors Served" },
  ],
};

export type AboutVisionMissionContent = {
  eyebrow: string;
  headingPlain1: string;
  headingHighlight: string;
  headingPlain2: string;
  vision: { title: string; description: string };
  mission: { title: string; description: string };
};

export const ABOUT_VISION_MISSION_DEFAULT_CONTENT: AboutVisionMissionContent = {
  eyebrow: "Our Compass",
  headingPlain1: "Guided by",
  headingHighlight: "Purpose,",
  headingPlain2: "Not Just Property",
  vision: {
    title: "Our Vision",
    description:
      "To be India's most trusted real estate advisory — where every address we curate becomes a benchmark for quality, integrity, and lasting value, for generations to come.",
  },
  mission: {
    title: "Our Mission",
    description:
      "To guide every client — from first-time buyers to institutional investors — through real estate decisions with uncompromising transparency, deep market intelligence, and a standard of service that earns trust for life.",
  },
};

export type AboutPillarsContent = {
  eyebrow: string;
  headingPlain1: string;
  headingHighlight: string;
  headingPlain2: string;
  pillars: { title: string; description: string }[];
};

export const ABOUT_PILLARS_DEFAULT_CONTENT: AboutPillarsContent = {
  eyebrow: "What Guides Us",
  headingPlain1: "The",
  headingHighlight: "Principles",
  headingPlain2: "Behind Every Deal",
  pillars: [
    {
      title: "Integrity First",
      description:
        "Every recommendation is made with full transparency — no hidden margins, no conflicted interests, only what genuinely serves you.",
    },
    {
      title: "Precision Curation",
      description:
        "We evaluate every asset against location, legal clarity, and long-term value before it ever reaches your shortlist.",
    },
    {
      title: "Absolute Discretion",
      description:
        "High-value transactions demand privacy. Our process is built to move quietly, efficiently, and entirely on your terms.",
    },
    {
      title: "Lifetime Partnership",
      description:
        "Our relationship doesn't end at the signature — from documentation to resale, we remain your standing advisory.",
    },
  ],
};

export type AboutStatsContent = {
  stats: StatPill[];
};

export const ABOUT_STATS_DEFAULT_CONTENT: AboutStatsContent = {
  stats: [
    { value: "77+", label: "Properties Listed" },
    { value: "350+", label: "Properties Sold" },
    { value: "500+", label: "Satisfied Clients" },
    { value: "25+", label: "Realtor Awards" },
  ],
};

export type AboutMilestone = { year: string; title: string; description: string };

export type AboutTimelineContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  milestones: AboutMilestone[];
};

export const ABOUT_TIMELINE_DEFAULT_CONTENT: AboutTimelineContent = {
  eyebrow: "The Journey",
  headingPlain: "Fifteen Years,",
  headingHighlight: "One Standard.",
  milestones: [
    {
      year: "2011",
      title: "InfraGuru Founded",
      description: "Opened our doors in Gurugram with a single mandate: real estate advisory built on trust.",
    },
    {
      year: "2015",
      title: "Commercial Expansion",
      description: "Extended into commercial and infrastructure advisory, serving developers and institutions.",
    },
    {
      year: "2019",
      title: "300+ Transactions",
      description: "Crossed three hundred successful transactions across residential and commercial portfolios.",
    },
    {
      year: "2023",
      title: "Joint-Development Practice",
      description: "Launched a dedicated structuring practice for landowner-developer partnerships.",
    },
    {
      year: "2026",
      title: "500+ Clients, 25+ Awards",
      description: "A decade and a half later — a trusted name behind Gurugram's most discerning acquisitions.",
    },
  ],
};

export type AboutFounderContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  portraitImage: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
};

export const ABOUT_FOUNDER_DEFAULT_CONTENT: AboutFounderContent = {
  eyebrow: "Meet The Founder",
  headingPlain: "The Vision",
  headingHighlight: "Behind InfraGuru",
  portraitImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80",
  name: "Baljeet Singh",
  role: "Founder & CEO",
  quote:
    "I started InfraGuru on a belief that's stayed with me since day one — real estate isn't about square footage, it's about the life that happens inside it. Every client walks away with more than a property; they walk away with a decision they'll never second-guess.",
  bio: "With over fifteen years navigating Gurugram's real estate landscape, Baljeet founded InfraGuru to close the gap between what buyers are promised and what they actually receive. That principle still shapes every mandate the firm takes on today.",
};

export type AboutCTAContent = {
  eyebrow: string;
  headingPlain: string;
  headingHighlight: string;
  subcopy: string;
  ctaLabel: string;
  ctaHref: string;
};

export const ABOUT_CTA_DEFAULT_CONTENT: AboutCTAContent = {
  eyebrow: "Let's Talk",
  headingPlain: "Ready to write the next chapter of your",
  headingHighlight: "portfolio?",
  subcopy:
    "Book a private consultation with our advisory team and discover what a truly considered real estate partnership feels like.",
  ctaLabel: "Book A Consultation",
  ctaHref: "/contact",
};

export type GalleryHeroContent = {
  eyebrow: string;
  headline: string;
  description: string;
};

export const GALLERY_HERO_DEFAULT_CONTENT: GalleryHeroContent = {
  eyebrow: "The Portfolio",
  headline: "Gallery",
  description:
    "A curated visual journey through the addresses, interiors, and skylines that define InfraGuru.",
};

export type GalleryImage = { src: string; alt: string };

export type GalleryContent = {
  images: GalleryImage[];
};

export const GALLERY_DEFAULT_CONTENT: GalleryContent = {
  images: [
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop", alt: "Contemporary residence with infinity pool at dusk" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80&auto=format&fit=crop", alt: "Sunlit living room with panoramic glazing" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop", alt: "Poolside terrace of a private villa" },
    { src: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600&q=80&auto=format&fit=crop", alt: "Chef's kitchen finished in natural stone" },
    { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80&auto=format&fit=crop", alt: "Sculptural facade of a signature address" },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80&auto=format&fit=crop", alt: "Minimalist living space with curated furnishings" },
    { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80&auto=format&fit=crop", alt: "Private estate framed by manicured landscaping" },
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&auto=format&fit=crop", alt: "Glass and steel commercial tower" },
    { src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80&auto=format&fit=crop", alt: "Master suite with soft ambient lighting" },
    { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80&auto=format&fit=crop", alt: "Illuminated residence after sunset" },
    { src: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1600&q=80&auto=format&fit=crop", alt: "Floor-to-ceiling glass pavilion" },
    { src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600&q=80&auto=format&fit=crop", alt: "Tiered residential facade against a clear sky" },
    { src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&q=80&auto=format&fit=crop", alt: "Clean-lined exterior of a modern home" },
    { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80&auto=format&fit=crop", alt: "Architectural detail in natural light" },
    { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80&auto=format&fit=crop", alt: "Landscaped entrance to a private residence" },
    { src: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1600&q=80&auto=format&fit=crop", alt: "Twilight view of a poolside residence" },
  ],
};

export type GalleryVideo = { src: string; poster?: string; title?: string };

export type GalleryVideosContent = {
  videos: GalleryVideo[];
};

export const GALLERY_VIDEOS_DEFAULT_CONTENT: GalleryVideosContent = {
  videos: [],
};

// ── Location project pages (/projects/location/[slug]) ──────────────────────
// One "hero" section per city in LOCATIONS, holding the two hero images shown
// on that city's /projects/location/[slug] page — a distinct image for the
// Residential toggle and one for the Commercial toggle. An empty string means
// "no admin override yet"; the page falls back to a matching project's photo.

export type LocationHeroContent = {
  residentialImage: string;
  commercialImage: string;
};

export const LOCATION_HERO_DEFAULT_CONTENT: LocationHeroContent = {
  residentialImage: "",
  commercialImage: "",
};

export function locationPageSlug(citySlug: string): string {
  return `location-${citySlug}`;
}

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
      { key: "awards", label: "Awards & Recognition", pageSlug: "home" },
      { key: "exploreProperties", label: "Explore Properties", pageSlug: "home" },
      { key: "services", label: "Services", pageSlug: "home" },
      { key: "testimonials", label: "Testimonials", pageSlug: "home" },
      { key: "footer", label: "Footer (shown on all pages)", pageSlug: "global" },
    ],
  },
  {
    slug: "about",
    label: "About",
    previewPath: "/about",
    sections: [
      { key: "hero", label: "Hero", pageSlug: "about" },
      { key: "story", label: "Our Story", pageSlug: "about" },
      { key: "visionMission", label: "Vision & Mission", pageSlug: "about" },
      { key: "pillars", label: "Pillars", pageSlug: "about" },
      { key: "stats", label: "Stats", pageSlug: "about" },
      { key: "timeline", label: "Timeline", pageSlug: "about" },
      { key: "founder", label: "Founder", pageSlug: "about" },
      { key: "cta", label: "Call To Action", pageSlug: "about" },
      { key: "footer", label: "Footer (shown on all pages)", pageSlug: "global" },
    ],
  },
  {
    slug: "gallery",
    label: "Gallery",
    previewPath: "/gallery",
    sections: [
      { key: "hero", label: "Hero", pageSlug: "gallery" },
      { key: "gallery", label: "Image Gallery", pageSlug: "gallery" },
      { key: "videos", label: "Video Gallery", pageSlug: "gallery" },
      { key: "footer", label: "Footer (shown on all pages)", pageSlug: "global" },
    ],
  },
  // Location project pages (/projects/location/[slug]) are intentionally NOT
  // listed here — they get their own dedicated admin screen at
  // /admin/project-hero instead of showing up in the generic Pages grid.
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
