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
    slug: 'the-azure-residences',
    code: 'DWG-014-A',
    title: 'The Azure Residences',
    tagline: 'A coastal sanctuary where architecture meets the horizon.',
    location: 'Coastal Bay',
    category: 'Residential',
    price: 'From ₹4.2 Cr',
    specs: '4 Bed · 5 Bath · 6,200 Sqft',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: [
      'Set along a private stretch of Coastal Bay, The Azure Residences is a collection of eleven signature waterfront homes conceived for those who consider the horizon part of their address. Floor-to-ceiling glazing, cantilevered terraces, and a material palette of honed limestone and brushed brass dissolve the boundary between interior and sea.',
      'Every residence is oriented to capture the arc of the sun across the water, with double-height living pavilions, private plunge pools, and a subterranean wine cellar carved into the bedrock. This is not a home you visit — it is a coastline you inherit.',
    ],
    highlights: [
      { label: 'Configuration', value: '4 & 5 Bedroom Villas' },
      { label: 'Saleable Area', value: '6,200 – 8,400 Sqft' },
      { label: 'Plot Size', value: '0.45 Acre (avg.)' },
      { label: 'Total Units', value: '11 Signature Homes' },
      { label: 'Waterfront', value: '340 m Private Shoreline' },
      { label: 'Possession', value: 'Q4 2027' },
    ],
    amenities: [
      'Private infinity-edge pool per residence',
      'Subterranean climate-controlled wine cellar',
      'Deep-water private jetty & boat berths',
      'Curated concierge & estate management',
      'Spa pavilion with thermal suite',
      'Bay-facing rooftop observatory deck',
      'Smart-home climate & security automation',
      '24-hour manned coastal security',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    ],
    architect: 'Halden & Voss Architecture Studio',
    developer: 'Infraguru Developments',
    possession: 'Q4 2027',
    rera: 'RERA/CB/2024/0114',
    landmarks: [
      { label: 'Private Marina', distance: '3 min' },
      { label: 'International School', distance: '12 min' },
      { label: 'Coastal Bay Golf Club', distance: '8 min' },
      { label: 'International Airport', distance: '35 min' },
    ],
    testimonial: {
      quote:
        'Every sunrise feels curated. The Azure Residences understood that true luxury is silence, light, and the sea — nothing more was needed.',
      author: 'Resident Owner',
      role: 'Villa No. 04, The Azure Residences',
    },
  },
  {
    id: 2,
    slug: 'summit-business-tower',
    code: 'DWG-027-B',
    title: 'Summit Business Tower',
    tagline: 'A vertical address for enterprises built to lead.',
    location: 'Downtown Core',
    category: 'Commercial',
    price: 'From ₹8.5 Cr',
    specs: '32 Floors · 210,000 Sqft',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
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
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
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
    slug: 'verdant-estate',
    code: 'DWG-041-C',
    title: 'Verdant Estate',
    tagline: 'Twelve acres of forest, eleven residences, one legacy.',
    location: 'Whispering Pines',
    category: 'Villas',
    price: 'From ₹15 Cr',
    specs: '6 Bed · 8 Bath · 11,400 Sqft',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
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
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
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
    slug: 'the-onyx-lofts',
    code: 'DWG-088-D',
    title: 'The Onyx Lofts',
    tagline: 'Industrial precision, reimagined for private living.',
    location: 'Tech Park District',
    category: 'Luxury Apartments',
    price: 'From ₹6.8 Cr',
    specs: '3 Bed · 3 Bath · 3,800 Sqft',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
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
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
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
