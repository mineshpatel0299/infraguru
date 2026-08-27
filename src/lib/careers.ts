export type JobResponsibilityGroup = { heading?: string; items: string[] };
export type JobQualification = { label: string; value: string };

export const DEPARTMENTS = ["All", "Sales", "Marketing", "Design", "Operations"] as const;
export type Department = (typeof DEPARTMENTS)[number];

export type JobOpening = {
  slug: string;
  title: string;
  department: Exclude<Department, "All">;
  location: string;
  workMode: string;
  address?: string;
  requirements: string[];
  overview: string;
  responsibilities: JobResponsibilityGroup[];
  qualifications: JobQualification[];
  whyJoin: string[];
};

const GURUGRAM_ADDRESS = "Tower B-3, SPAZE ITECH PARK, Unit No. 1129, Sector 49, Gurugram, Haryana 122018";

export const OPENINGS: JobOpening[] = [
  {
    slug: "senior-sales-manager",
    title: "Senior Sales Manager",
    department: "Sales",
    location: "Gurugram, Haryana",
    address: GURUGRAM_ADDRESS,
    workMode: "Work from Office",
    requirements: [
      "5+ years in real estate or premium sales leadership.",
      "Proven record of leading and mentoring a sales team.",
      "Strong negotiation and closing skills on high-value deals.",
      "Comfortable owning revenue targets end to end.",
    ],
    overview:
      "We are looking for an experienced Senior Sales Manager to lead our residential sales team, owning revenue targets from lead generation through closing while upholding InfraGuru's advisory-first approach to real estate.",
    responsibilities: [
      {
        items: [
          "Lead, mentor and manage a team of sales consultants to meet and exceed monthly targets.",
          "Own the full sales cycle for premium listings, from lead qualification to final closing.",
          "Build and maintain long-term relationships with high-value clients and developer partners.",
          "Analyze market trends and pricing to guide the team's sales strategy.",
          "Report on team performance and pipeline health to leadership.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in Business, Marketing or a related field; MBA preferred." },
      { label: "Experience", value: "5+ years in real estate or premium sales leadership." },
      { label: "Skills", value: "Strong negotiation, mentoring and closing skills on high-value deals." },
      { label: "Technical", value: "Comfortable with CRM tools and sales reporting." },
    ],
    whyJoin: [
      "Opportunity to lead a high-performing team at a fast-growing, career-driven company.",
      "Transparent, uncapped incentive structure.",
      "Supportive work culture and a clear path to leadership.",
    ],
  },
  {
    slug: "real-estate-consultant",
    title: "Real Estate Consultant",
    department: "Sales",
    location: "Gurugram, Haryana",
    address: GURUGRAM_ADDRESS,
    workMode: "Work from Office",
    requirements: [
      "Graduation in any discipline; MBA preferred.",
      "Freshers to 3 years of sales or client-facing experience.",
      "Strong communication and negotiation skills.",
      "Willingness to travel for site visits.",
    ],
    overview:
      "We are looking for a client-focused Real Estate Consultant to guide buyers through property acquisitions end to end, acting as their single point of trust from first site visit to final documentation.",
    responsibilities: [
      {
        items: [
          "Understand client requirements and recommend suitable properties from our portfolio.",
          "Coordinate and accompany clients on site visits.",
          "Negotiate terms and support clients through documentation and closing.",
          "Maintain regular follow-ups and build long-term client relationships.",
          "Stay current on market pricing and new project launches.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in any discipline." },
      { label: "Experience", value: "Freshers to 3 years of sales or client-facing experience." },
      { label: "Skills", value: "Strong communication and negotiation skills." },
      { label: "Technical", value: "Comfortable using CRM tools; willingness to travel for site visits." },
    ],
    whyJoin: [
      "Opportunity to grow in a dynamic and career-driven company.",
      "Supportive work culture and professional development opportunities.",
      "Competitive salary and performance-based incentives.",
    ],
  },
  {
    slug: "business-development-manager",
    title: "Business Development Manager",
    department: "Sales",
    location: "Mumbai, Maharashtra",
    workMode: "Hybrid",
    requirements: [
      "4+ years in business development or channel partnerships.",
      "Existing network among developers or landowners is a plus.",
      "Comfortable structuring long-cycle B2B deals.",
      "Sharp commercial and analytical judgement.",
    ],
    overview:
      "We are looking for a Business Development Manager to build and manage developer partnerships, structure joint-development opportunities, and expand InfraGuru's footprint into new micro-markets.",
    responsibilities: [
      {
        items: [
          "Identify and develop relationships with developers and landowners.",
          "Structure and negotiate joint-development and channel partnership agreements.",
          "Represent InfraGuru at industry events and partner meetings.",
          "Track market opportunities and provide commercial input to leadership.",
          "Coordinate with legal and operations teams to close partnership deals.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in Business, Real Estate or a related field; MBA preferred." },
      { label: "Experience", value: "4+ years in business development or channel partnerships." },
      { label: "Skills", value: "Sharp commercial and analytical judgement; existing developer network is a plus." },
      { label: "Technical", value: "Comfortable structuring long-cycle B2B deals and contracts." },
    ],
    whyJoin: [
      "Opportunity to shape InfraGuru's expansion into new markets.",
      "Exposure to high-value partnership and structuring deals.",
      "Competitive salary with performance-linked incentives.",
    ],
  },
  {
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Gurugram, Haryana",
    address: GURUGRAM_ADDRESS,
    workMode: "Work from Office",
    requirements: [
      "2+ years running paid campaigns (Meta, Google).",
      "Working knowledge of analytics and attribution tools.",
      "Sharp eye for premium, on-brand creative.",
      "Comfortable owning a monthly pipeline target.",
    ],
    overview:
      "We are looking for a Digital Marketing Executive to own performance campaigns and brand content across channels, translating InfraGuru's premium positioning into measurable pipeline.",
    responsibilities: [
      {
        items: [
          "Plan and execute paid campaigns across Meta, Google and other channels.",
          "Track campaign performance and optimize for cost-per-lead and pipeline quality.",
          "Coordinate content creation with design and external agencies.",
          "Maintain and grow InfraGuru's social media presence.",
          "Report on marketing metrics and ROI to leadership.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in Marketing, Business or a related field." },
      { label: "Experience", value: "2+ years running paid campaigns (Meta, Google)." },
      { label: "Skills", value: "Sharp eye for premium, on-brand creative; strong analytical skills." },
      { label: "Technical", value: "Working knowledge of analytics and attribution tools." },
    ],
    whyJoin: [
      "Opportunity to shape the marketing voice of a premium real estate brand.",
      "Supportive, collaborative marketing team.",
      "Competitive salary and performance bonuses.",
    ],
  },
  {
    slug: "content-brand-strategist",
    title: "Content & Brand Strategist",
    department: "Marketing",
    location: "Remote",
    workMode: "Remote",
    requirements: [
      "3+ years in brand, content, or editorial roles.",
      "Portfolio demonstrating a premium, considered voice.",
      "Comfortable briefing designers and external agencies.",
      "Excellent written English.",
    ],
    overview:
      "We are looking for a Content & Brand Strategist to shape how InfraGuru sounds and looks everywhere, from listing narratives to campaign concepts, with an editorial, luxury-first lens.",
    responsibilities: [
      {
        items: [
          "Develop and maintain InfraGuru's brand voice across all channels.",
          "Write and edit content for listings, campaigns and the website.",
          "Brief and review work from designers and external agencies.",
          "Partner with marketing to plan content calendars and campaign narratives.",
          "Ensure consistency of tone and quality across all brand touchpoints.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in English, Journalism, Marketing or a related field." },
      { label: "Experience", value: "3+ years in brand, content or editorial roles." },
      { label: "Skills", value: "Excellent written English and a premium, considered voice." },
      { label: "Technical", value: "Comfortable briefing designers and managing external agencies." },
    ],
    whyJoin: [
      "Opportunity to define the voice of a premium real estate brand.",
      "Fully remote, flexible working style.",
      "Competitive salary and creative ownership.",
    ],
  },
  {
    slug: "interior-design-lead",
    title: "Interior Design Lead",
    department: "Design",
    location: "Gurugram, Haryana",
    address: GURUGRAM_ADDRESS,
    workMode: "Work from Office",
    requirements: [
      "Bachelor's degree in Interior or Spatial Design.",
      "5+ years designing residential or hospitality interiors.",
      "Proficiency in 3D visualization tools.",
      "Experience presenting concepts directly to clients.",
    ],
    overview:
      "We are looking for an Interior Design Lead to direct show-flat and staging concepts for our flagship projects, working closely with developers to elevate presentation standards.",
    responsibilities: [
      {
        items: [
          "Direct interior concepts for show-flats and staged units across projects.",
          "Collaborate with developers and contractors to execute design concepts.",
          "Prepare mood boards, 3D visualizations and presentation material for clients.",
          "Manage design budgets and vendor coordination.",
          "Stay current on interior design trends relevant to premium residential and hospitality spaces.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Bachelor's degree in Interior or Spatial Design." },
      { label: "Experience", value: "5+ years designing residential or hospitality interiors." },
      { label: "Skills", value: "Strong presentation and client-facing communication skills." },
      { label: "Technical", value: "Proficiency in 3D visualization tools." },
    ],
    whyJoin: [
      "Opportunity to shape the design language of flagship properties.",
      "Collaborative, design-led work culture.",
      "Competitive salary and creative ownership.",
    ],
  },
  {
    slug: "customer-relationship-manager",
    title: "Customer Relationship Manager",
    department: "Operations",
    location: "Bengaluru, Karnataka",
    workMode: "Work from Office",
    requirements: [
      "3+ years in client servicing or relationship management.",
      "High attention to detail with documentation and process.",
      "Calm, empathetic communication under pressure.",
      "Real estate or luxury services background preferred.",
    ],
    overview:
      "We are looking for a Customer Relationship Manager to own the post-sale client journey: documentation, handovers and long-term relationship management for our repeat buyers.",
    responsibilities: [
      {
        items: [
          "Manage post-sale documentation, handovers and client communication.",
          "Serve as the primary point of contact for repeat and referral clients.",
          "Coordinate with legal and operations teams to resolve client queries.",
          "Track and report on client satisfaction and retention metrics.",
          "Identify opportunities to strengthen long-term client relationships.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in any discipline." },
      { label: "Experience", value: "3+ years in client servicing or relationship management." },
      { label: "Skills", value: "Calm, empathetic communication and high attention to detail." },
      { label: "Technical", value: "Comfortable with CRM and documentation systems; real estate or luxury services background preferred." },
    ],
    whyJoin: [
      "Opportunity to build lasting relationships with high-value clients.",
      "Supportive work culture and professional development opportunities.",
      "Competitive salary and employee benefits.",
    ],
  },
  {
    slug: "operations-associate",
    title: "Operations Associate",
    department: "Operations",
    location: "Gurugram, Haryana",
    address: GURUGRAM_ADDRESS,
    workMode: "Work from Office",
    requirements: [
      "1-3 years in operations or coordination roles.",
      "Highly organized with strong follow-through.",
      "Comfortable coordinating across multiple stakeholders.",
      "Working knowledge of MS Office / Google Workspace.",
    ],
    overview:
      "We are looking for an organized Operations Associate to keep the engine running, coordinating between sales, legal and developer teams to ensure every transaction closes without friction.",
    responsibilities: [
      {
        items: [
          "Coordinate documentation and approvals across sales, legal and developer teams.",
          "Track transaction timelines and flag delays proactively.",
          "Maintain accurate records and process documentation.",
          "Support day-to-day office operations and vendor coordination.",
          "Assist leadership with reporting and process improvement.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in any discipline." },
      { label: "Experience", value: "1-3 years in operations or coordination roles." },
      { label: "Skills", value: "Highly organized with strong follow-through." },
      { label: "Technical", value: "Working knowledge of MS Office / Google Workspace." },
    ],
    whyJoin: [
      "Opportunity to grow in a dynamic and career-driven company.",
      "Supportive work culture and professional development opportunities.",
      "Competitive salary and employee benefits.",
    ],
  },
  {
    slug: "hr-admin",
    title: "HR / Admin",
    department: "Operations",
    location: "Gurugram, Haryana",
    address: GURUGRAM_ADDRESS,
    workMode: "Work from Office",
    requirements: [
      "Graduation in HR, Business Administration, or a related field.",
      "Freshers to 3 years of experience in HR or office administration.",
      "Strong organizational and people management skills.",
      "Proficiency in MS Office and HR software (preferred).",
    ],
    overview:
      "We are looking for a proactive and organized HR/Admin professional to manage day-to-day human resources and administrative operations. The ideal candidate should be efficient in handling HR tasks, office management, and employee engagement to ensure smooth business operations.",
    responsibilities: [
      {
        heading: "Human Resources",
        items: [
          "Assist in the recruitment process, from sourcing candidates to onboarding new employees.",
          "Maintain employee records and handle HR documentation.",
          "Support payroll processing and leave management.",
          "Address employee concerns and promote a positive work culture.",
        ],
      },
      {
        heading: "Administration",
        items: [
          "Oversee office operations, supplies, and facility management.",
          "Coordinate meetings, events, and travel arrangements.",
          "Maintain records, files, and correspondence systematically.",
          "Ensure compliance with company policies and procedures.",
        ],
      },
    ],
    qualifications: [
      { label: "Education", value: "Graduation in Human Resources, Business Administration, or a related field." },
      { label: "Experience", value: "Freshers to 3 years of experience in HR or office administration." },
      { label: "Skills", value: "Strong organizational, communication, and people management skills." },
      { label: "Technical", value: "Proficiency in MS Office and HR software (preferred)." },
    ],
    whyJoin: [
      "Opportunity to grow in a dynamic and career-driven company.",
      "Supportive work culture and professional development opportunities.",
      "Competitive salary and employee benefits.",
    ],
  },
];

export function getJobBySlug(slug: string): JobOpening | undefined {
  return OPENINGS.find((job) => job.slug === slug);
}
