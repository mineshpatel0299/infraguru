export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: "Market Insights" | "Buying Guide" | "Investment" | "Design & Living";
  date: string;
  readTime: string;
  coverImage: string;
  author: { name: string; role: string; avatar: string };
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "gurugram-real-estate-outlook-2026",
    title: "Gurugram's Real Estate Outlook for 2026",
    excerpt:
      "New expressway links and a wave of Grade-A commercial supply are quietly reshaping where luxury demand is heading next.",
    category: "Market Insights",
    date: "2026-07-18",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Baljeet Singh", role: "Founder & CEO", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" },
    content: [
      "Gurugram's skyline has changed more in the last three years than in the decade before it, and 2026 is shaping up to be the year that growth finds its center of gravity. The Dwarka Expressway corridor, once considered peripheral, is now commanding the kind of per-square-foot premiums that Golf Course Road held a decade ago.",
      "What's driving it isn't speculation: it's infrastructure catching up to intent. Improved connectivity to IGI Airport, the metro extension, and a new generation of business parks have pulled corporate demand westward, and residential development has followed close behind.",
      "For buyers, this means the calculus has shifted. Micro-markets that were purely residential five years ago are now being evaluated on commercial fundamentals: footfall, transit access, and proximity to employment hubs. We're advising clients to weight connectivity roadmaps as heavily as current amenities when underwriting a decade-long hold.",
      "Our view for the back half of 2026: expect continued appreciation in the 15–20% band across well-connected micro-markets, with a widening gap between transit-linked developments and everything else. The address you choose today is increasingly a bet on tomorrow's infrastructure, not just today's skyline.",
    ],
  },
  {
    id: 2,
    slug: "due-diligence-checklist-before-you-buy",
    title: "The Due-Diligence Checklist We Run Before Every Acquisition",
    excerpt:
      "RERA status, title chain, and litigation history: the unglamorous groundwork that protects every transaction we close.",
    category: "Buying Guide",
    date: "2026-06-29",
    readTime: "8 min read",
    coverImage:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&auto=format&fit=crop&q=80",
    author: { name: "InfraGuru Advisory Desk", role: "Research Team", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80" },
    content: [
      "The most expensive mistakes in real estate rarely happen at the negotiation table; they happen weeks earlier, in paperwork nobody read carefully enough. Before we let a client sign anything, every acquisition passes through the same seven-point due-diligence process, regardless of ticket size.",
      "It starts with title verification: a clean, unbroken chain of ownership going back at least thirty years, cross-checked against the local sub-registrar's records. Any gap, however small, gets resolved or the deal gets walked away from.",
      "Next comes RERA registration: not just confirming the project is registered, but reading the filed timeline, sanctioned plan, and any amendments against what's actually being marketed. Discrepancies here are one of the most common red flags we encounter.",
      "We also pull encumbrance certificates, verify there's no pending litigation attached to the land parcel, confirm occupancy certificate status for ready properties, and independently verify carpet area against RERA-registered plans rather than developer brochures.",
      "None of this is exciting work. But it's the difference between an investment and a liability, and it's why every InfraGuru client walks into a transaction knowing exactly what they're buying, and exactly what they're not.",
    ],
  },
  {
    id: 3,
    slug: "commercial-vs-residential-where-the-yield-is",
    title: "Commercial vs. Residential: Where the Yield Actually Is",
    excerpt:
      "Rental yields tell a very different story than capital appreciation headlines. We break down the real numbers by asset class.",
    category: "Investment",
    date: "2026-06-04",
    readTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Baljeet Singh", role: "Founder & CEO", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" },
    content: [
      "Ask most investors what they want from real estate and they'll say 'appreciation.' Ask what they need, and the honest answer is usually cash flow, and that's where the residential-versus-commercial conversation gets interesting.",
      "Residential assets in prime Gurugram micro-markets are currently yielding 2–3% net rental, with the bulk of returns coming from capital appreciation over a 5–7 year hold. It's a patient asset class, well suited to long-term wealth building and end-use.",
      "Commercial assets, particularly pre-leased Grade-A office space and well-anchored retail, are running 6–9% net yields in the same corridors, with appreciation as the secondary driver rather than the primary one. The trade-off is ticket size, tenant-dependency, and a steeper learning curve for underwriting lease quality.",
      "Our recommendation for most portfolios isn't either-or. We typically structure client allocations around a residential core for stability and end-use optionality, layered with select pre-leased commercial assets for yield, sized to the investor's liquidity horizon and risk appetite, not to whatever is trending.",
    ],
  },
  {
    id: 4,
    slug: "designing-for-how-you-actually-live",
    title: "Designing for How You Actually Live, Not How You Entertain Twice a Year",
    excerpt:
      "The best floor plans we've seen this year quietly abandoned the formal living room. Here's why that's the right call.",
    category: "Design & Living",
    date: "2026-05-21",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    author: { name: "InfraGuru Advisory Desk", role: "Research Team", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80" },
    content: [
      "For decades, Indian floor plans reserved their best square footage for a formal living room used a handful of times a year, for guests, for festivals, for the family photo. The rest of daily life happened in whatever space was left over.",
      "The developments we're most excited about this year have quietly reversed that hierarchy. Kitchens have grown into genuine social spaces. Family and dining areas have merged into a single flexible volume. And the 'formal' room, when it still exists, has shrunk to make room for a study, a second work-from-home nook, or simply more light.",
      "It's a small shift on paper but a significant one in practice: floor plans finally designed around a Tuesday evening rather than a once-a-year gathering. When we walk clients through new launches, this is now one of the first things we point out: not how a home photographs, but how it will actually be lived in, daily, for the next fifteen years.",
    ],
  },
  {
    id: 5,
    slug: "joint-development-structuring-a-primer",
    title: "Joint Development Agreements: A Landowner's Primer",
    excerpt:
      "For families sitting on inherited land, a well-structured JDA can unlock value without ever writing a construction cheque.",
    category: "Investment",
    date: "2026-04-30",
    readTime: "9 min read",
    coverImage:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Baljeet Singh", role: "Founder & CEO", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" },
    content: [
      "A surprising number of our commercial mandates start the same way: a family has held a land parcel for generations, watched the neighborhood develop around it, and has no interest in becoming a builder themselves. A joint development agreement is often the answer.",
      "In its simplest form, a JDA lets a landowner contribute land and a developer contribute construction capital and expertise, with both parties sharing the completed built-up area or revenue in an agreed ratio, commonly structured anywhere from 70:30 to 55:45 depending on location, zoning, and market conditions.",
      "The structuring details matter enormously. Revenue-share versus area-share, escrow mechanisms for sale proceeds, construction milestones tied to disbursement, and exit clauses if a developer under-delivers: each of these determines whether a JDA becomes generational wealth or a decade-long dispute.",
      "We've structured joint developments on both sides of the table, and the pattern is consistent: the landowners who come out ahead are the ones who brought independent legal and financial advisory to the table before signing, not after a term sheet was already agreed. It's the one document worth over-preparing for.",
    ],
  },
  {
    id: 6,
    slug: "reading-a-rera-filing-before-you-invest",
    title: "How to Actually Read a RERA Filing Before You Invest",
    excerpt:
      "Most buyers glance at the RERA number and move on. The filing itself holds the answers to questions the brochure won't.",
    category: "Buying Guide",
    date: "2026-04-09",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
    author: { name: "InfraGuru Advisory Desk", role: "Research Team", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80" },
    content: [
      "Almost every marketing brochure now proudly displays a RERA registration number. Very few buyers actually open the filing behind it, which is unfortunate, because it's one of the most information-dense documents available before you commit capital.",
      "Start with the sanctioned project timeline. RERA filings list the developer's own committed completion date, which you can compare against what a sales executive is verbally promising. A gap between the two is worth asking about directly.",
      "Next, check the sanctioned unit count and typology mix against what's currently being marketed as 'available.' Significant divergence can indicate phased launches, inventory being held back, or changes to the original plan that were never formally communicated to earlier buyers.",
      "Finally, look at the quarterly progress reports developers are required to file. Construction-stage photographs and percentage-complete disclosures offer a far more honest read on delivery risk than any showroom walkthrough. It takes twenty minutes to read a filing properly, cheap insurance against a multi-crore commitment.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
