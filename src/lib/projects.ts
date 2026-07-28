export type Project = {
  id: number;
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
  highlights: { label: string; value: string }[];
  amenities: string[];
  gallery: string[];
  architect: string;
  developer: string;
  possession: string;
  rera: string;
  landmarks: { label: string; distance: string }[];
  testimonial: { quote: string; author: string; role: string };
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'm3m',
    code: 'DWG-014-A',
    title: 'M3M Maison',
    tagline: 'Sky-high living where every residence commands the Gurugram skyline.',
    location: 'Sector 113, Gurugram',
    category: 'Residential',
    price: 'From ₹3.8 Cr',
    specs: '3 & 4 BHK · 1,850 – 3,400 Sqft',
    image: '/Projects/M3M/Artboard_4_1_-_8jpuMAmC4FGE.webp',
    description: [
      'Rising above Gurugram\'s skyline, M3M Maison is a collection of three interconnected residential towers set around a resort-style infinity pool and landscaped podium gardens. Floor-to-ceiling glazing frames uninterrupted city views from every residence, while a curated material palette of stone, brass, and warm timber carries the address\'s editorial calm from lobby to living room.',
      'Each tower is planned around wide, column-free layouts with private decks, so daily life unfolds against an ever-changing skyline. Below, a half-acre amenity deck — infinity pool, palm-lined promenades, and a dedicated clubhouse — turns the ground plane into a private resort for residents alone.',
    ],
    highlights: [
      { label: 'Configuration', value: '3 & 4 BHK Residences' },
      { label: 'Saleable Area', value: '1,850 – 3,400 Sqft' },
      { label: 'Towers', value: '3 Interconnected Towers' },
      { label: 'Total Units', value: '212 Residences' },
      { label: 'Amenity Deck', value: '0.5 Acre Podium' },
      { label: 'Possession', value: 'Q4 2027' },
    ],
    amenities: [
      'Resort-style infinity-edge pool',
      'Palm-lined podium gardens & jogging track',
      'Double-height residents\' clubhouse',
      'Dedicated concierge & front desk',
      'Fully equipped fitness & yoga studio',
      'Kids\' play area & multipurpose lawn',
      'Smart-home climate & security automation',
      '24-hour manned security with CCTV surveillance',
    ],
    gallery: [
      '/Projects/M3M/Artboard_4_1_-_8jpuMAmC4FGE.webp',
      '/Projects/M3M/Artboard_2_1_-_mYz5GbKAViun.webp',
      '/Projects/M3M/Artboard_3_1_-_lQRc3AupDBjT.webp',
    ],
    architect: 'M3M Design Studio',
    developer: 'M3M India',
    possession: 'Q4 2027',
    rera: 'RERA/GGN/2024/0114',
    landmarks: [
      { label: 'Golf Course Extension Rd', distance: '5 min' },
      { label: 'Cyber Hub', distance: '15 min' },
      { label: 'International School', distance: '10 min' },
      { label: 'IGI Airport', distance: '40 min' },
    ],
    testimonial: {
      quote:
        'The pool deck alone sold us — but it\'s the light in the living room every evening that made this house feel like home.',
      author: 'Resident Owner',
      role: 'Tower B, M3M Maison',
    },
  },
  {
    id: 2,
    slug: 'm3m-antalya',
    code: 'DWG-027-B',
    title: 'M3M Antalya Hills',
    tagline: 'A vertical address for enterprises built to lead.',
    location: 'Downtown Core',
    category: 'Commercial',
    price: 'From ₹8.5 Cr',
    specs: '32 Floors · 210,000 Sqft',
    image: '/Projects/M3M%20Antalya/544304004_m3m-antalya-hills-gallery-3.webp',
    description: [
      'Summit Business Tower rises 32 storeys above Downtown Core, a landmark of glass and structural steel engineered to LEED Platinum standards. Column-free floor plates, a triple-height marble atrium, and a private executive sky-lobby on the 28th floor position it as the district\'s most coveted commercial address.',
      'Designed for institutions that measure their headquarters in decades rather than lease terms, Summit offers fully customizable floor configurations, redundant power infrastructure, and direct access to the metro concourse below — permanence, engineered into every beam.',
    ],
    highlights: [
      { label: 'Total Height', value: '32 Floors / 148 m' },
      { label: 'Floor Plate', value: '6,500 Sqft (column-free)' },
      { label: 'Leasable Area', value: '210,000 Sqft' },
      { label: 'Ceiling Height', value: '3.2 m Slab-to-Slab' },
      { label: 'Parking', value: '4-Level Basement, 480 Bays' },
      { label: 'Possession', value: 'Q2 2026' },
    ],
    amenities: [
      'Triple-height marble reception atrium',
      'Executive sky-lobby & boardroom suite, Level 28',
      'LEED Platinum certified building systems',
      'Redundant N+1 power & fibre infrastructure',
      'Direct metro concourse connectivity',
      'Rooftop helipad & executive transfer lounge',
      'Tenant wellness floor with gymnasium',
      'Valet & 480-bay basement parking',
    ],
    gallery: [
      '/Projects/M3M%20Antalya/544304004_m3m-antalya-hills-gallery-3.webp',
      '/Projects/M3M%20Antalya/g5.webp',
      '/Projects/M3M%20Antalya/about_2_-_LKRZFgeqKGJ4_-_CfWwyPz3TLPk.webp',
    ],
    architect: 'Meridian Skidmore Partners',
    developer: 'Infraguru Developments',
    possession: 'Q2 2026',
    rera: 'RERA/DC/2023/0271',
    landmarks: [
      { label: 'Metro Interchange', distance: 'Direct access' },
      { label: 'Financial District', distance: '5 min' },
      { label: 'Convention Centre', distance: '7 min' },
      { label: 'International Airport', distance: '28 min' },
    ],
    testimonial: {
      quote:
        'We relocated our headquarters twice in a decade chasing the right address. Summit is the last move we will ever need to make.',
      author: 'Managing Director',
      role: 'Anchor Tenant, Floors 18–22',
    },
  },
  {
    id: 3,
    slug: 'signature',
    code: 'DWG-041-C',
    title: 'Signature Sarvam',
    tagline: 'Twelve acres of forest, eleven residences, one legacy.',
    location: 'Whispering Pines',
    category: 'Villas',
    price: 'From ₹15 Cr',
    specs: '6 Bed · 8 Bath · 11,400 Sqft',
    image: '/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124237-PM-Picsart-AiImageEnhancer.webp',
    description: [
      'Verdant Estate occupies twelve acres of protected pine forest in Whispering Pines, where each of its eleven residences is sited to preserve century-old tree canopy rather than clear it. Fieldstone facades and blackened timber sit quietly among the trunks, connected by raised stone pathways that never touch bare earth.',
      'Interiors favour restraint over spectacle: white oak, unlacquered brass, and walls of glass framed to hold the forest like a painting. A private wellness pavilion, orchard, and spring-fed reflecting pond complete an estate designed to be inherited, not simply owned.',
    ],
    highlights: [
      { label: 'Configuration', value: '6 & 7 Bedroom Estates' },
      { label: 'Saleable Area', value: '11,400 – 14,800 Sqft' },
      { label: 'Estate Land', value: '12 Acres Total' },
      { label: 'Total Units', value: '11 Forest Residences' },
      { label: 'Tree Canopy Preserved', value: '92%' },
      { label: 'Possession', value: 'Q1 2028' },
    ],
    amenities: [
      'Private wellness pavilion & thermal circuit',
      'Spring-fed reflecting pond',
      'Working orchard & kitchen garden',
      'Equestrian trail network',
      'Wine library carved into the hillside',
      'Guest cottage on every plot',
      'Off-grid backup micro-hydro power',
      'Dedicated estate ranger & grounds team',
    ],
    gallery: [
      '/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124237-PM-Picsart-AiImageEnhancer.webp',
      '/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124128-PM-Picsart-AiImageEnhancer.webp',
      '/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124155-PM-Picsart-AiImageEnhancer.webp',
    ],
    architect: 'Studio Aalto Grove',
    developer: 'Infraguru Developments',
    possession: 'Q1 2028',
    rera: 'RERA/WP/2024/0389',
    landmarks: [
      { label: 'Whispering Pines Club', distance: '4 min' },
      { label: 'Equestrian Centre', distance: '6 min' },
      { label: 'International School', distance: '15 min' },
      { label: 'International Airport', distance: '42 min' },
    ],
    testimonial: {
      quote:
        'They built around the forest instead of over it. Three years in, it still feels like the trees were always meant to frame this house.',
      author: 'Resident Owner',
      role: 'Estate No. 07, Verdant Estate',
    },
  },
  {
    id: 4,
    slug: 'signature-deluxe',
    code: 'DWG-088-D',
    title: 'Signature Deluxe',
    tagline: 'Industrial precision, reimagined for private living.',
    location: 'Tech Park District',
    category: 'Luxury Apartments',
    price: 'From ₹6.8 Cr',
    specs: '3 Bed · 3 Bath · 3,800 Sqft',
    image: '/Projects/SignatureDeluxe/image-Picsart-AiImageEnhancer-1-scaled.webp',
    description: [
      'The Onyx Lofts translate the exposed steel and volume of the Tech Park District\'s industrial heritage into forty-two double-height residences. Blackened steel mullions, poured concrete ceilings, and mezzanine libraries give each loft the presence of a private gallery rather than an apartment.',
      'A rooftop half-acre garden, resident screening room, and a ground-floor atelier space reserved for owner-curated exhibitions complete a building designed for a district that never stops building the future.',
    ],
    highlights: [
      { label: 'Configuration', value: '3 & 4 Bedroom Lofts' },
      { label: 'Saleable Area', value: '3,800 – 5,200 Sqft' },
      { label: 'Ceiling Height', value: '5.4 m Double Volume' },
      { label: 'Total Units', value: '42 Residences' },
      { label: 'Floors', value: '14 Storeys' },
      { label: 'Possession', value: 'Ready to Move' },
    ],
    amenities: [
      'Half-acre rooftop garden & lounge',
      'Private resident screening room',
      'Ground-floor curated atelier space',
      'Mezzanine library in every residence',
      'Double-height glazed living volumes',
      'Dedicated freight lift for art & furniture',
      'Rooftop infinity lap pool',
      'Concierge & valet parking',
    ],
    gallery: [
      '/Projects/SignatureDeluxe/image-Picsart-AiImageEnhancer-1-scaled.webp',
      '/Projects/SignatureDeluxe/g5%20(1).webp',
      '/Projects/SignatureDeluxe/544304004_m3m-antalya-hills-gallery-3%20(1).webp',
    ],
    architect: 'Foundry Collective',
    developer: 'Infraguru Developments',
    possession: 'Ready to Move',
    rera: 'RERA/TP/2022/0156',
    landmarks: [
      { label: 'Tech Park Metro Station', distance: '2 min' },
      { label: 'Innovation Campus', distance: '5 min' },
      { label: 'Design District', distance: '9 min' },
      { label: 'International Airport', distance: '22 min' },
    ],
    testimonial: {
      quote:
        'It doesn\'t feel converted, it feels composed. The volume, the light through the steel frames — every visitor asks if it was once a foundry.',
      author: 'Resident Owner',
      role: 'Loft 11B, The Onyx Lofts',
    },
  },
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => String(p.id) === id);
}
