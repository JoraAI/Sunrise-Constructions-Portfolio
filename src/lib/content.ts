import type {
  NavLink,
  ContactInfo,
  SocialLink,
  UtilityBarContent,
  Stat,
  ChecklistItem,
  MissionVisionValue,
  Service,
  Industry,
  Project,
  Certification,
  Testimonial,
  TeamMember,
  ProcessStep,
  BlogPost,
  JobListing,
  JobPerk,
  CareerStat,
  OfficeLocation,
} from '@/types/content';

/* ----------------------------------------------------------------------------
 * SITE CONFIG - single source of truth for identity, contact, and nav.
 * ------------------------------------------------------------------------- */
export const siteConfig = {
  name: 'Sunrise Constructions',
  legalName: 'Sunrise Constructions Pvt. Ltd.',
  shortName: 'Sunrise',
  tagline: 'Building Beyond Expectations',
  description:
    'Sunrise Constructions is a ₹300Cr+ engineering and construction enterprise delivering large-scale commercial, residential, industrial, and infrastructure projects across India since 2016.',
  url: 'https://www.sunriseconstructions.in',
  founded: '2016',
  contact: {
    phone: '+91 712 4567 890',
    phoneHref: 'tel:+917124567890',
    email: 'hello@sunriseconstructions.in',
    addressLine1: 'Sunrise House, 5th Floor, Sitabuldi Main Road',
    addressLine2: '',
    city: 'Nagpur',
    state: 'Maharashtra',
    pincode: '440001',
    mapUrl: 'https://maps.google.com/?q=Sitabuldi+Nagpur',
    hours: 'Mon-Sat: 9:00 AM - 6:30 PM',
  } satisfies ContactInfo,
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  ] satisfies SocialLink[],
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Industries', href: '/industries' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const utilityBar: UtilityBarContent = {
  phone: siteConfig.contact.phone,
  phoneHref: siteConfig.contact.phoneHref,
  email: siteConfig.contact.email,
  socials: siteConfig.socials,
};

/* ----------------------------------------------------------------------------
 * HERO + VIDEO SLIDESHOW
 * ------------------------------------------------------------------------- */

export const heroContent = {
  eyebrow: 'Building Beyond Expectations',
  headline: 'We Build Better',
  headlineAccent: 'Tomorrows',
  subheadline:
    'Since 2016, Sunrise Constructions has engineered landmark commercial towers, industrial campuses, and infrastructure that define city skylines - delivered on time, built to last.',
  primaryCta: { label: 'Our Services', href: '/services' },
  secondaryCta: { label: 'View Projects', href: '/projects' },
  posterImage: '/images/hero-poster.svg',
};

export const heroVideos = [
  { src: '/videos/hero-1.mp4', poster: '/images/hero-poster-1.svg', label: 'Skyline construction' },
  { src: '/videos/hero-2.mp4', poster: '/images/hero-poster-2.svg', label: 'Commercial tower' },
  { src: '/videos/hero-3.mp4', poster: '/images/hero-poster-3.svg', label: 'Industrial campus' },
  { src: '/videos/hero-4.mp4', poster: '/images/hero-poster-4.svg', label: 'Infrastructure' },
];

/* ----------------------------------------------------------------------------
 * STATS BAR
 * ------------------------------------------------------------------------- */
export const stats: Stat[] = [
  { id: 'experience', icon: 'calendar', value: 8, suffix: '+', label: 'Years of Experience' },
  { id: 'projects', icon: 'building', value: 120, suffix: '+', label: 'Projects Completed' },
  { id: 'professionals', icon: 'users', value: 500, suffix: '+', label: 'Skilled Professionals' },
  { id: 'satisfaction', icon: 'smile', value: 98, suffix: '%', label: 'Client Satisfaction' },
  {
    id: 'turnover',
    icon: 'indian-rupee',
    value: 300,
    prefix: '₹',
    suffix: 'Cr+',
    label: 'Annual Turnover',
  },
];

/* ----------------------------------------------------------------------------
 * ABOUT SECTION
 * ------------------------------------------------------------------------- */
export const aboutSection = {
  eyebrow: 'Who We Are',
  heading: 'An engineering enterprise trusted to deliver India\u2019s most demanding projects',
  body: [
    'Founded in 2016 in Nagpur, Maharashtra, Sunrise Constructions has grown rapidly into a ₹300 crore+ engineering and construction enterprise. We self-perform structural, MEP, and finishing works across commercial, residential, industrial, healthcare, education, and infrastructure sectors throughout Maharashtra and beyond.',
    'Our team of engineers, architects, project managers, and skilled tradespeople brings institutional rigor to every build - combining the latest BIM and digital project controls with years of hands-on field expertise. The result: predictable timelines, transparent reporting, and structures built to perform for generations.',
  ],
  image: '/images/about-building.svg',
  imageAlt:
    'Sunrise Constructions engineers reviewing blueprints at a construction site in Nagpur, Maharashtra',
  cta: { label: 'Learn More About Us', href: '/about-us' },
};

export const aboutChecklist: ChecklistItem[] = [
  {
    id: 'quality',
    title: 'Uncompromising Quality',
    description:
      'ISO 9001:2015 certified QA/QC framework on every site, from foundation to handover.',
    icon: 'check',
  },
  {
    id: 'on-time',
    title: 'On-Time Delivery',
    description:
      '92% of projects delivered on or ahead of schedule using digital project controls.',
    icon: 'clock',
  },
  {
    id: 'satisfaction',
    title: 'Client Satisfaction',
    description: 'A 98% satisfaction score across 320+ verified client engagements.',
    icon: 'star',
  },
  {
    id: 'sustainability',
    title: 'Sustainable Build',
    description:
      'IGBC and LEED-aligned practices with 40% reduction in embodied carbon targets.',
    icon: 'leaf',
  },
];

/* ----------------------------------------------------------------------------
 * MISSION / VISION / VALUES
 * ------------------------------------------------------------------------- */
export const missionVisionValues: MissionVisionValue[] = [
  {
    id: 'mission',
    title: 'Our Mission',
    description:
      'To engineer structures that elevate communities - delivering complex projects with absolute integrity, safety, and precision, on time and within budget.',
    icon: 'target',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    description:
      'To be South Asia\u2019s most trusted construction enterprise, recognised for innovation, sustainability, and the calibre of the people we build with.',
    icon: 'eye',
  },
  {
    id: 'values',
    title: 'Our Values',
    description:
      'Safety without compromise. Quality without shortcuts. Accountability in every commitment. Respect for the people and places we build around.',
    icon: 'gem',
  },
];

/* ----------------------------------------------------------------------------
 * SERVICES
 * ------------------------------------------------------------------------- */
export const services: Service[] = [
  {
    slug: 'general-construction',
    title: 'General Construction',
    shortDescription:
      'Self-performed structural, civil, and finishing works for landmark builds of every scale.',
    icon: 'hard-hat',
    image: '/images/service-construction.svg',
    alt: 'Workers in safety gear at a large Sunrise Constructions site',
    overview:
      'Our core capability. We self-perform reinforced concrete, structural steel, masonry, MEP rough-in, and architectural finishing - backed by an in-house plant, machinery fleet, and a 2,400-strong workforce. By controlling execution end-to-end, we hold ourselves accountable for quality, schedule, and budget from the first pour to final handover.',
    keyDeliverables: [
      'Structural concrete & steel works',
      'Civil, MEP, and finishing trades',
      'In-house batching & formwork systems',
      'Real-time schedule & cost reporting',
    ],
    process: [
      'Mobilisation & site setup',
      'Substructure & superstructure',
      'MEP installation & testing',
      'Finishes & commissioning',
      'QA/QC sign-off & handover',
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    shortDescription:
      'Owner\u2019s representative services with digital controls, cost certainty, and transparent reporting.',
    icon: 'clipboard',
    image: '/images/service-pm.svg',
    alt: 'Project managers reviewing Gantt charts and digital dashboards',
    overview:
      'We act as your single point of accountability - managing design consultants, contractors, vendors, and authorities so you don\u2019t have to. Our PMO brings enterprise-grade digital controls, earned-value tracking, and risk management to every engagement, giving stakeholders real-time visibility into cost, schedule, and quality.',
    keyDeliverables: [
      'Integrated master scheduling (Primavera/MS Project)',
      'Cost planning & earned-value management',
      'Procurement & contract administration',
      'Risk, quality & HSE governance',
    ],
    process: [
      'Project initiation & scope baselining',
      'Procurement strategy & tendering',
      'Construction monitoring & controls',
      'Change & risk management',
      'Close-out & performance review',
    ],
  },
  {
    slug: 'design-and-build',
    title: 'Design & Build',
    shortDescription:
      'Single-contract design and delivery - faster decisions, fewer disputes, one accountable team.',
    icon: 'pencil-ruler',
    image: '/images/service-designbuild.svg',
    alt: 'Architects and engineers collaborating over building models',
    overview:
      'One team, one contract, one point of accountability. Our integrated design-build service brings architecture, structural engineering, MEP, and construction under a single roof - collapsing timelines, reducing change orders, and aligning design intent with buildability from day one.',
    keyDeliverables: [
      'Architectural & structural design',
      'MEP engineering & coordination',
      'BIM-led clash detection',
      'Value engineering & constructability',
    ],
    process: [
      'Brief & concept design',
      'Detailed design & approvals',
      'GMP pricing & contract',
      'Construction & commissioning',
      'Handover & warranties',
    ],
  },
  {
    slug: 'renovation-and-remodeling',
    title: 'Renovation & Remodeling',
    shortDescription:
      'Heritage restoration, brownfield retrofits, and adaptive reuse delivered with minimal disruption.',
    icon: 'wrench',
    image: '/images/service-renovation.svg',
    alt: 'Refurbished commercial interior with exposed structure',
    overview:
      'Bringing new life to existing structures demands a different skillset. Our renovation team specialises in occupied-building retrofits, heritage restoration, structural strengthening, and adaptive reuse - engineered to modern performance standards while respecting what makes a building worth keeping.',
    keyDeliverables: [
      'Structural assessment & strengthening',
      'Heritage & facade restoration',
      'MEP modernisation & retro-commissioning',
      'Phased, low-disruption execution',
    ],
    process: [
      'Condition assessment & survey',
      'Design & statutory approvals',
      'Phased execution plan',
      'Restoration & upgrade works',
      'Commissioning & handover',
    ],
  },
  {
    slug: 'sustainable-construction',
    title: 'Sustainable Construction',
    shortDescription:
      'IGBC, LEED, and net-zero aligned delivery reducing embodied and operational carbon.',
    icon: 'leaf',
    image: '/images/service-sustainable.svg',
    alt: 'Green-rated building with solar panels and vegetation',
    overview:
      'Sustainability is engineered in, not bolted on. We help owners target IGBC, LEED, and GRIHA ratings - and increasingly, net-zero operational carbon - through material selection, passive design integration, on-site renewable systems, and rigorous waste and water management during construction.',
    keyDeliverables: [
      'IGBC / LEED / GRIHA certification support',
      'Low-embodied-carbon material strategy',
      'On-site renewables & rainwater harvesting',
      'Construction waste management (70%+ diversion)',
    ],
    process: [
      'Sustainability goal-setting',
      'Material & systems selection',
      'Green construction practices',
      'Commissioning & measurement',
      'Certification & post-occupancy review',
    ],
  },
];

/* ----------------------------------------------------------------------------
 * INDUSTRIES
 * ------------------------------------------------------------------------- */
export const industries: Industry[] = [
  {
    slug: 'commercial',
    title: 'Commercial',
    shortDescription:
      'Grade-A office towers, IT campuses, and mixed-use developments built for performance.',
    icon: 'briefcase',
    image: '/images/industry-commercial.svg',
    alt: 'Glass-clad commercial office tower at dusk',
    overview:
      'We deliver Grade-A commercial space that meets the demands of global occupiers - efficient floor plates, smart building systems, and the sustainability credentials corporate tenants now require. Our commercial portfolio spans 40+ million sq.ft of delivered space.',
    capabilities: [
      'Corporate office towers',
      'IT/ITeS campuses',
      'Mixed-use developments',
      'Retail & hospitality complexes',
    ],
    metrics: [
      { value: '40M+', label: 'Sq.ft delivered' },
      { value: '120+', label: 'Commercial projects' },
      { value: '14', label: 'IGBC-rated buildings' },
    ],
  },
  {
    slug: 'residential',
    title: 'Residential',
    shortDescription:
      'Premium apartments, gated communities, and affordable housing at city scale.',
    icon: 'home',
    image: '/images/industry-residential.svg',
    alt: 'Large residential apartment community with landscaped grounds',
    overview:
      'From luxury high-rises to large-scale affordable housing, we build homes that people are proud to live in. Our residential work emphasises structural quality, efficient MEP, and amenities delivered on schedule - critical in a market where buyer trust depends on handover dates.',
    capabilities: [
      'Premium high-rise apartments',
      'Gated communities & villas',
      'Affordable housing at scale',
      'Senior living & co-living',
    ],
    metrics: [
      { value: '25,000+', label: 'Homes delivered' },
      { value: '60+', label: 'Residential projects' },
      { value: '92%', label: 'On-time handover rate' },
    ],
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    shortDescription:
      'Manufacturing plants, warehouses, and logistics hubs engineered for throughput.',
    icon: 'factory',
    image: '/images/industry-industrial.svg',
    alt: 'Large-span industrial warehouse with loading bays',
    overview:
      'Speed-to-commissioning is everything in industrial construction. We deliver pre-engineered buildings, heavy manufacturing facilities, and logistics parks with large clear spans, heavy-duty floors, and the utility infrastructure that production lines depend on.',
    capabilities: [
      'Pre-engineered buildings',
      'Heavy manufacturing plants',
      'Warehouses & logistics parks',
      'Cold storage & clean rooms',
    ],
    metrics: [
      { value: '18M+', label: 'Sq.ft delivered' },
      { value: '75+', label: 'Industrial projects' },
      { value: '8 mo', label: 'Avg. PEB delivery' },
    ],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    shortDescription:
      'Hospitals and medical facilities built to stringent clinical and regulatory standards.',
    icon: 'heart-pulse',
    image: '/images/industry-healthcare.svg',
    alt: 'Modern multi-specialty hospital building exterior',
    overview:
      'Healthcare construction demands precision. We build multi-specialty hospitals, diagnostic centres, and medical colleges with the HVAC, medical gas, infection-control, and electrical redundancy systems that clinical operations and patient safety depend on.',
    capabilities: [
      'Multi-specialty hospitals',
      'Medical colleges & nursing schools',
      'Diagnostic & day-care centres',
      'Hospital refurbishment & expansion',
    ],
    metrics: [
      { value: '6,500+', label: 'Beds delivered' },
      { value: '22', label: 'Healthcare projects' },
      { value: 'NABH', label: 'Compliant builds' },
    ],
  },
  {
    slug: 'education',
    title: 'Education',
    shortDescription:
      'Schools, colleges, and campuses designed for learning and built to last.',
    icon: 'graduation-cap',
    image: '/images/industry-education.svg',
    alt: 'University campus building with landscaped courtyard',
    overview:
      'We build the institutions that shape the next generation - K-12 schools, university campuses, research labs, and student housing - with acoustics, daylighting, safety, and durability engineered for daily, high-traffic use.',
    capabilities: [
      'K-12 school campuses',
      'Universities & research institutes',
      'Laboratories & research centres',
      'Student housing & amenities',
    ],
    metrics: [
      { value: '40+', label: 'Institutions built' },
      { value: '12M', label: 'Sq.ft of campuses' },
      { value: '15', label: 'Research labs' },
    ],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    shortDescription:
      'Hotels, resorts, and convention centres delivered to global brand standards.',
    icon: 'bed',
    image: '/images/industry-hospitality.svg',
    alt: 'Luxury hotel resort with pool and landscaped gardens',
    overview:
      'Hospitality construction is a test of finishes, FF&E coordination, and programme discipline. We deliver business hotels, luxury resorts, and convention centres to the exacting brand standards of international operators - on schedule for soft openings.',
    capabilities: [
      'Business & luxury hotels',
      'Resorts & serviced apartments',
      'Convention & exhibition centres',
      'Restaurants & retail F&B',
    ],
    metrics: [
      { value: '4,200+', label: 'Keys delivered' },
      { value: '18', label: 'Hospitality projects' },
      { value: '5★', label: 'Brand-standard finishes' },
    ],
  },
  {
    slug: 'infrastructure',
    title: 'Infrastructure',
    shortDescription:
      'Roads, bridges, metro viaducts, and civil works that connect cities.',
    icon: 'road',
    image: '/images/industry-infrastructure.svg',
    alt: 'Elevated metro viaduct under construction over a busy highway',
    overview:
      'Beyond buildings, we engineer the civil infrastructure that economies run on - metro viaducts, flyovers, urban roads, water and sewage treatment plants, and industrial utility networks - built to last decades of heavy service.',
    capabilities: [
      'Metro & rail viaducts',
      'Flyovers & urban roads',
      'Water & sewage treatment plants',
      'Industrial utility networks',
    ],
    metrics: [
      { value: '120 km', label: 'Roads & viaducts' },
      { value: '8', label: 'STP/WTP plants' },
      { value: '35+', label: 'Civil projects' },
    ],
  },
];

/* ----------------------------------------------------------------------------
 * PROJECTS
 * ------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    slug: 'meridian-business-park',
    title: 'Meridian Business Park',
    category: 'Commercial',
    location: 'Nagpur, Maharashtra',
    year: '2023',
    client: 'Meridian Developers Pvt. Ltd.',
    metric: '4.5 lakh sq.ft \u00b7 Delivered 2 months early',
    image: '/images/project-meridian.svg',
    alt: 'Meridian Business Park glass office towers',
    featured: true,
    gallery: ['/images/project-meridian.svg', '/images/project-meridian-2.svg'],
    summary:
      'A 4.5 lakh sq.ft Grade-A IT campus with two interconnected towers, a central atrium, and IGBC Platinum certification.',
    overview:
      'Delivered two months ahead of schedule, Meridian Business Park is a twin-tower Grade-A office campus engineered for a global technology occupier. The project features a 60-metre column-free atrium, post-tensioned floor slabs for maximum lettable area, and a smart-building BMS that reduced operational energy by 28% versus baseline.',
    scope: [
      'Structural concrete & post-tensioned slabs',
      'Unitised curtain-wall glazing system',
      'MEP with smart building automation',
      'IGBC Platinum certification',
      'Two-level basement parking',
    ],
    metrics: [
      { value: '4.5 lakh', label: 'Sq.ft built-up area' },
      { value: '12', label: 'Upper floors' },
      { value: 'IGBC', label: 'Platinum rated' },
      { value: '2 mo', label: 'Delivered early' },
    ],
    testimonial:
      'Sunrise delivered our headquarters ahead of schedule and to a finish standard that exceeded every benchmark. Their digital reporting gave us total confidence throughout.',
    testimonialAuthor: 'CFO, Meridian Developers',
  },
  {
    slug: 'aria-residential-towers',
    title: 'Aria Residential Towers',
    category: 'Residential',
    location: 'Pune, Maharashtra',
    year: '2022',
    client: 'Aria Living',
    metric: '640 units \u00b7 4 towers \u00b7 Handed over on time',
    image: '/images/project-aria.svg',
    alt: 'Aria Residential Towers luxury apartment complex',
    featured: true,
    gallery: ['/images/project-aria.svg'],
    summary:
      'Four 28-storey residential towers delivering 640 premium apartments with a clubhouse and podium amenities.',
    overview:
      'Aria Residential Towers redefined premium living in Pune. Four 28-storey towers rise from a shared podium housing a 40,000 sq.ft clubhouse, infinity pool, and landscaped decks. Despite pandemic-era supply disruptions, all 640 units were handed over on the committed date - a rarity in the market.',
    scope: [
      'Four RC residential towers (G+28)',
      '40,000 sq.ft clubhouse & amenities',
      'Three-level podium parking',
      'Sewage treatment & rainwater harvesting',
      'Landscaped sky gardens',
    ],
    metrics: [
      { value: '640', label: 'Apartments' },
      { value: '4', label: 'Towers (G+28)' },
      { value: '40K', label: 'Sq.ft clubhouse' },
      { value: '100%', label: 'On-time handover' },
    ],
  },
  {
    slug: 'nexus-logistics-hub',
    title: 'Nexus Logistics Hub',
    category: 'Industrial',
    location: 'Nagpur, Maharashtra',
    year: '2024',
    client: 'Nexus Warehousing LLP',
    metric: '8 lakh sq.ft \u00b7 Built in 8 months',
    image: '/images/project-nexus.svg',
    alt: 'Nexus Logistics Hub large-span warehouse facility',
    featured: true,
    gallery: ['/images/project-nexus.svg'],
    summary:
      'An 8 lakh sq.ft pre-engineered logistics park with 40 docking bays and heavy-duty floors.',
    overview:
      'Built to a demanding 8-month programme, Nexus Logistics Hub is a pre-engineered warehouse complex engineered for 24/7 throughput. The 40-dock facility features FM2-grade floors rated for 5 tonnes/m², 12-metre clear internal height, and integrated cold storage for pharma clients.',
    scope: [
      'Pre-engineered building (PEB) structure',
      'FM2-grade industrial flooring',
      '40 loading docks with dock levelers',
      'Integrated cold storage zone',
      'Solar-ready rooftop (1.2 MW)',
    ],
    metrics: [
      { value: '8 lakh', label: 'Sq.ft area' },
      { value: '40', label: 'Loading docks' },
      { value: '12 m', label: 'Clear height' },
      { value: '8 mo', label: 'Build duration' },
    ],
  },
  {
    slug: 'apex-multispecialty-hospital',
    title: 'Apex Multi-Specialty Hospital',
    category: 'Healthcare',
    location: 'Nashik, Maharashtra',
    year: '2023',
    client: 'Apex Healthcare Group',
    metric: '650 beds \u00b7 NABH-compliant \u00b7 Delivered 2023',
    image: '/images/project-apex.svg',
    alt: 'Apex Multi-Specialty Hospital modern medical facility',
    featured: true,
    gallery: ['/images/project-apex.svg'],
    summary:
      'A 650-bed quaternary-care hospital engineered to NABH standards with full medical gas and HVAC redundancy.',
    overview:
      'Apex Multi-Specialty Hospital is a 650-bed quaternary-care facility engineered around patient safety and clinical efficiency. We delivered NABH-compliant medical gas systems, HEPA-filtered operation theatre suites, dual-redundant electrical infrastructure, and a pneumatic tube logistics system - all coordinated through a fully clash-checked BIM model.',
    scope: [
      '650-bed patient tower',
      '18 modular operation theatres',
      'Medical gas & vacuum systems',
      'Dual-redundant power infrastructure',
      'BIM-coordinated MEP',
    ],
    metrics: [
      { value: '650', label: 'Inpatient beds' },
      { value: '18', label: 'Operation theatres' },
      { value: 'NABH', label: 'Entry compliant' },
      { value: '24/7', label: 'Power redundancy' },
    ],
  },
  {
    slug: 'heritage-south-restoration',
    title: 'Heritage South Restoration',
    category: 'Renovation',
    location: 'Pune, Maharashtra',
    year: '2021',
    client: 'Heritage Trust of India',
    metric: '1920s landmark \u00b7 Restored to original grandeur',
    image: '/images/project-heritage.svg',
    alt: 'Restored heritage colonial-era commercial building facade',
    featured: false,
    gallery: ['/images/project-heritage.svg'],
    summary:
      'Structural restoration and adaptive reuse of a 1920s colonial-era landmark into a premium office.',
    overview:
      'We painstakingly restored a 1920s colonial-era landmark - stabilising its ageing structure, recreating damaged mughal-plaster and tewood joinery, and seamlessly integrating modern MEP, fire, and accessibility systems. The building now serves as a premium office while preserving its heritage character.',
    scope: [
      'Structural strengthening & underpinning',
      'Heritage facade & joinery restoration',
      'Modern MEP & fire systems integration',
      'Adaptive reuse as Grade-A office',
      'Accessibility upgrades',
    ],
    metrics: [
      { value: '1920', label: 'Original era' },
      { value: '65K', label: 'Sq.ft restored' },
      { value: '18 mo', label: 'Restoration period' },
      { value: 'INTACH', label: 'Approved' },
    ],
  },
  {
    slug: 'metro-viaduct-civil-package',
    title: 'Metro Viaduct Civil Package',
    category: 'Infrastructure',
    location: 'Nagpur, Maharashtra',
    year: '2024',
    client: 'Urban Metro Rail Corporation',
    metric: '6.5 km elevated viaduct \u00b7 7 stations',
    image: '/images/project-metro.svg',
    alt: 'Elevated metro rail viaduct under construction',
    featured: false,
    gallery: ['/images/project-metro.svg'],
    summary:
      'A 6.5 km elevated metro viaduct with 7 stations, built over operating urban corridors with minimal disruption.',
    overview:
      'We delivered a 6.5 km elevated metro viaduct and 7 station structures through dense urban corridors - launching precast segments at night to keep traffic flowing by day. The package included deep pile foundations, pier construction, and segmental superstructure erection with millimetre-precision geometry control.',
    scope: [
      '6.5 km segmental viaduct',
      '7 elevated station structures',
      'Deep pile foundations',
      'Precast segment launching',
      'Urban traffic management',
    ],
    metrics: [
      { value: '6.5 km', label: 'Viaduct length' },
      { value: '7', label: 'Stations' },
      { value: '1,850', label: 'Segments erected' },
      { value: '0', label: 'Lost-time incidents' },
    ],
  },
];

/* ----------------------------------------------------------------------------
 * CERTIFICATIONS / CREDIBILITY
 * ------------------------------------------------------------------------- */
export const certifications: Certification[] = [
  { name: 'ISO 9001:2015', description: 'Quality Management' },
  { name: 'ISO 14001:2015', description: 'Environmental Management' },
  { name: 'ISO 45001:2018', description: 'Occupational Health & Safety' },
  { name: 'OHSAS 18001', description: 'Safety Standards' },
  { name: 'IGBC Member', description: 'Green Building Council' },
  { name: 'Builder\u2019s Association of India', description: 'Industry Member' },
  { name: 'CREDAI', description: 'Real Estate Body' },
  { name: 'RoSPA Gold', description: 'Safety Excellence Award' },
];

export const clientLogos: string[] = [
  'Meridian',
  'Aria Living',
  'Nexus',
  'Apex Health',
  'Heritage Trust',
  'Urban Metro',
];

export const pressMentions: { outlet: string; headline: string }[] = [
  { outlet: 'The Economic Times', headline: '\u201cSunrise Constructions crosses ₹300 Cr turnover milestone\u201d' },
  { outlet: 'Construction World', headline: '\u201cAmong India\u2019s fastest-growing engineering contractors\u201d' },
  { outlet: 'Architecture Digest', headline: '\u201cSetting new benchmarks in sustainable delivery\u201d' },
];

/* ----------------------------------------------------------------------------
 * PROCESS
 * ------------------------------------------------------------------------- */
export const processSteps: ProcessStep[] = [
  {
    id: 'consultation',
    step: 1,
    title: 'Consultation',
    description:
      'We start by understanding your vision, constraints, and success metrics - translating them into a clear project brief.',
    icon: 'message-square',
  },
  {
    id: 'design',
    step: 2,
    title: 'Design & Planning',
    description:
      'Our architects and engineers develop coordinated designs, cost plans, and an optimised construction programme.',
    icon: 'pencil-ruler',
  },
  {
    id: 'approvals',
    step: 3,
    title: 'Approvals',
    description:
      'We manage statutory approvals, NOCs, and pre-construction compliance so you can break ground without delay.',
    icon: 'file-check',
  },
  {
    id: 'construction',
    step: 4,
    title: 'Construction',
    description:
      'Self-performed execution with digital controls, real-time reporting, and uncompromising safety on every site.',
    icon: 'hard-hat',
  },
  {
    id: 'qaqc',
    step: 5,
    title: 'Quality Assurance',
    description:
      'A documented QA/QC regime - inspection, testing, and snagging - ensures we hand over to spec, every time.',
    icon: 'shield-check',
  },
  {
    id: 'handover',
    step: 6,
    title: 'Handover',
    description:
      'Commissioning, documentation, training, and a defined defect-liability period complete a confident handover.',
    icon: 'key',
  },
];

/* ----------------------------------------------------------------------------
 * TESTIMONIALS
 * ------------------------------------------------------------------------- */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Sunrise Constructions delivered our 4.5 lakh sq.ft headquarters two months ahead of schedule. Their digital reporting and on-site discipline are genuinely best-in-class.',
    name: 'Rajesh Mehta',
    role: 'Chief Financial Officer',
    company: 'Meridian Developers',
    project: 'Meridian Business Park',
    rating: 5,
    image: '/images/testimonial-1.svg',
    alt: 'Portrait of Rajesh Mehta, CFO at Meridian Developers',
  },
  {
    id: 't2',
    quote:
      'Across three residential projects with them, Sunrise has never missed a handover date. That reliability is why we keep coming back.',
    name: 'Anita Reddy',
    role: 'Managing Director',
    company: 'Aria Living',
    project: 'Aria Residential Towers',
    rating: 5,
    image: '/images/testimonial-2.svg',
    alt: 'Portrait of Anita Reddy, Managing Director at Aria Living',
  },
  {
    id: 't3',
    quote:
      'Their safety culture is exceptional. A 6.5 km metro package over live traffic with zero lost-time incidents tells you everything about how they operate.',
    name: 'Vikram Nair',
    role: 'Project Director',
    company: 'Urban Metro Rail Corporation',
    project: 'Metro Viaduct Civil Package',
    rating: 5,
    image: '/images/testimonial-3.svg',
    alt: 'Portrait of Vikram Nair, Project Director at Urban Metro Rail',
  },
  {
    id: 't4',
    quote:
      'Building a 650-bed NABH hospital is extraordinarily complex. Sunrise\u2019s BIM coordination and medical-gas expertise made it look easy.',
    name: 'Dr. Lakshmi Iyer',
    role: 'Chairperson',
    company: 'Apex Healthcare Group',
    project: 'Apex Multi-Specialty Hospital',
    rating: 5,
    image: '/images/testimonial-4.svg',
    alt: 'Portrait of Dr. Lakshmi Iyer, Chairperson at Apex Healthcare',
  },
];

/* ----------------------------------------------------------------------------
 * LEADERSHIP TEAM
 * ------------------------------------------------------------------------- */
export const team: TeamMember[] = [
  {
    id: 'm1',
    name: 'Suresh Krishnan',
    title: 'Chairman & Managing Director',
    bio: 'Founded Sunrise Constructions in 2016 in Nagpur, Maharashtra. A civil engineer with years of large-scale infrastructure experience, Suresh leads the group\u2019s long-term vision and governance.',
    image: '/images/team-1.svg',
    alt: 'Portrait of Suresh Krishnan, Chairman and Managing Director',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'm2',
    name: 'Priya Sundaram',
    title: 'Chief Executive Officer',
    bio: 'An MBA from IIM Bangalore, Priya has scaled the firm from a regional Maharashtra player to a ₹300Cr+ enterprise, driving digital transformation and ESG governance.',
    image: '/images/team-2.svg',
    alt: 'Portrait of Priya Sundaram, Chief Executive Officer',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'm3',
    name: 'Arvind Rajagopal',
    title: 'Chief Operating Officer',
    bio: 'A structural engineer with years of field experience, Arvind oversees delivery across all project sites, plant, and the workforce.',
    image: '/images/team-3.svg',
    alt: 'Portrait of Arvind Rajagopal, Chief Operating Officer',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'm4',
    name: 'Meera Nair',
    title: 'Chief Financial Officer',
    bio: 'A chartered accountant, Meera leads finance, treasury, and investor relations - bringing public-market-grade rigor to project financial controls.',
    image: '/images/team-4.svg',
    alt: 'Portrait of Meera Nair, Chief Financial Officer',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'm5',
    name: 'Karthik Venkatesh',
    title: 'Head of Engineering & Design',
    bio: 'Leads our design and engineering cell, championing BIM, value engineering, and sustainable design across every project.',
    image: '/images/team-5.svg',
    alt: 'Portrait of Karthik Venkatesh, Head of Engineering and Design',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'm6',
    name: 'Deepa Anand',
    title: 'Head of Safety & Sustainability',
    bio: 'Drives our zero-harm safety culture and ESG agenda, holding ISO 45001 and IGBC certifications across the organisation.',
    image: '/images/team-6.svg',
    alt: 'Portrait of Deepa Anand, Head of Safety and Sustainability',
    linkedin: 'https://linkedin.com',
  },
];

/* ----------------------------------------------------------------------------
 * BLOG / NEWS
 * ------------------------------------------------------------------------- */
export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-green-building-india',
    title: 'The Future of Green Building in India: Beyond the Rating',
    excerpt:
      'Why IGBC and LEED ratings are just the beginning - and how embodied carbon, circular materials, and net-zero operations are reshaping what \u201csustainable construction\u201d really means.',
    category: 'Sustainability',
    author: 'Karthik Venkatesh',
    authorRole: 'Head of Engineering & Design',
    date: '2024-08-12',
    readingTime: '6 min read',
    image: '/images/blog-1.svg',
    alt: 'Green-rated building with integrated solar and vegetation',
    tags: ['Sustainability', 'IGBC', 'Net Zero'],
    content: [
      'For two decades, green building in India meant chasing a rating - IGBC, LEED, or GRIHA plaques on a lobby wall. That era is ending. The next decade of sustainable construction will be measured not by plaques, but by kilograms of CO₂ per square metre, both embodied and operational.',
      'Embodied carbon - the emissions locked into making cement, steel, glass, and aluminium - accounts for roughly half of a new building\u2019s lifetime footprint. That means material decisions made in the first few weeks of design matter more than decades of efficient operations.',
      'At Sunrise Constructions, we now run embodied-carbon assessments at concept stage, not after. We specify low-carbon concrete blends, source steel with Electric Arc Furnace (EAF) content, and design for demountability - structures that can be disassembled and reused, not demolished.',
      'On the operational side, net-zero is no longer aspirational. Falling solar costs, smarter BMS, and passive design make net-zero operational energy realistic for office and educational buildings today. The constraint is not technology - it is the will to specify and pay for it upfront.',
      'The buildings we hand over today will stand for 50 to 80 years. Designing them to 2024 sustainability standards is not enough. We must design them to the standards - and the climate - of 2070.',
    ],
  },
  {
    slug: 'bim-transforming-construction',
    title: 'How BIM Is Transforming Indian Construction Project Delivery',
    excerpt:
      'Building Information Modelling is no longer a design tool - it is the operational backbone that lets large contractors coordinate thousands of decisions and avoid costly rework.',
    category: 'Technology',
    author: 'Karthik Venkatesh',
    authorRole: 'Head of Engineering & Design',
    date: '2024-07-02',
    readingTime: '5 min read',
    image: '/images/blog-2.svg',
    alt: 'Engineers reviewing a 3D building information model on screen',
    tags: ['BIM', 'Technology', 'Project Management'],
    content: [
      'In a complex hospital or metro project, thousands of structural, MEP, and architectural elements must fit together in three-dimensional space. Doing this on 2D drawings is how clashes become change orders, delays, and cost overruns.',
      'Building Information Modelling (BIM) changes that. A federated 3D model lets every discipline coordinate in a shared digital environment - detecting clashes virtually, long before they become expensive problems on site.',
      'At Sunrise, every project above 50,000 sq.ft now runs on a coordinated BIM model. Clash detection, quantity take-off, sequencing simulations, and as-built documentation all flow from one source of truth.',
      'The result is measurable: rework down by over 30%, RFIs reduced by nearly half, and handover documentation that owners actually use for facilities management.',
      'BIM is not a software purchase - it is a delivery philosophy. The firms that embrace it will pull ahead; those that don\u2019t will find themselves uncompetitive within a project cycle.',
    ],
  },
  {
    slug: 'safety-culture-construction-sites',
    title: 'Zero Harm: Building a Real Safety Culture on Site',
    excerpt:
      'A safety helmet is not a safety culture. Here is what it actually takes to run a 6.5 km metro package over live traffic with zero lost-time incidents.',
    category: 'Safety',
    author: 'Deepa Anand',
    authorRole: 'Head of Safety & Sustainability',
    date: '2024-05-20',
    readingTime: '7 min read',
    image: '/images/blog-3.svg',
    alt: 'Construction workers in full safety gear at a well-organised site',
    tags: ['Safety', 'HSE', 'Culture'],
    content: [
      'Safety on a construction site is not a poster in the site office. It is thousands of small decisions - made every hour, by every person - that either prevent harm or invite it.',
      'A real zero-harm culture starts with leadership accountability. At Sunrise, every project starts with a signed safety charter from the project director, daily toolbox talks, and the absolute right of any worker - regardless of rank - to stop work if something feels unsafe.',
      'We invest heavily in training. Every site worker completes induction safety training before stepping on site, plus weekly refreshers. Our supervisors hold IOSH or NEBOSH certifications.',
      'Technology helps. Daily digital safety inspections, permit-to-work systems, and IoT sensors on scaffolding and cranes give us early warning of risks before they become incidents.',
      'But culture beats process. When a worker feels genuinely empowered to report a near-miss without fear, and when leadership responds with gratitude not blame, you have the foundation of zero harm. Everything else is scaffolding around that.',
    ],
  },
  {
    slug: 'precast-speeding-up-delivery',
    title: 'Why Precast Is the Future of Fast-Track Delivery',
    excerpt:
      'From metro viaducts to affordable housing, precast and pre-engineered systems are collapsing project timelines without sacrificing quality.',
    category: 'Innovation',
    author: 'Arvind Rajagopal',
    authorRole: 'Chief Operating Officer',
    date: '2024-03-08',
    readingTime: '5 min read',
    image: '/images/blog-4.svg',
    alt: 'Precast concrete segments being lifted into place by crane',
    tags: ['Precast', 'Innovation', 'Delivery'],
    content: [
      'When you need to build fast - really fast - cast-in-situ concrete becomes your bottleneck. Weather, curing time, and labour variability all conspire against an aggressive schedule.',
      'Precast flips that equation. Elements are cast in a controlled factory environment, cured to full strength, and erected on site in a fraction of the time. Quality is more consistent, weather dependency drops sharply, and site labour requirements fall.',
      'We used precast segmental construction to deliver a 6.5 km metro viaduct over operating urban corridors. Casting segments off-site let us erect viaduct at night with minimal disruption, hitting geometry tolerances measured in millimetres.',
      'For affordable housing, precast panels and pods cut a typical 24-month build to 14 months - a transformational difference when buyer trust hinges on handover dates.',
      'Precast is not the answer for every project. But when speed, repetition, or quality consistency matter, it is one of the most powerful tools in modern construction.',
    ],
  },
];

/* ----------------------------------------------------------------------------
 * CAREERS
 * ------------------------------------------------------------------------- */
export const jobPerks: JobPerk[] = [
  {
    id: 'p1',
    title: 'Health & Wellness',
    description:
      'Comprehensive family medical coverage, annual health check-ups, mental-health support, and on-site wellness facilities at major sites.',
    icon: 'heart',
  },
  {
    id: 'p2',
    title: 'Growth & Training',
    description:
      'Structured career pathways, technical certifications (NEBOSH, PMP, IGBC), leadership coaching, and an internal mobility-first promotion policy.',
    icon: 'trending-up',
  },
  {
    id: 'p3',
    title: 'Safety-First Culture',
    description:
      'A genuine zero-harm environment where every team member is empowered to stop unsafe work. Safety is never a trade-off.',
    icon: 'shield',
  },
  {
    id: 'p4',
    title: 'Competitive Pay',
    description:
      'Market-leading compensation reviewed annually, performance bonuses, project-completion incentives, and long-service rewards.',
    icon: 'banknote',
  },
  {
    id: 'p5',
    title: 'Project Diversity',
    description:
      'Work across commercial, residential, industrial, healthcare, education, and infrastructure - no two projects are the same.',
    icon: 'layers',
  },
  {
    id: 'p6',
    title: 'Work-Life Balance',
    description:
      'Roster-based site rotations, earned leave, parental leave, and a hybrid policy for office-based roles.',
    icon: 'calendar',
  },
];

export const careerStats: CareerStat[] = [
  { id: 'c1', value: '500+', label: 'Team members', icon: 'users' },
  { id: 'c2', value: '4.5 yrs', label: 'Avg. tenure', icon: 'clock' },
  { id: 'c3', value: '5', label: 'Offices in Maharashtra', icon: 'map-pin' },
  { id: 'c4', value: '0.42', label: 'TRIR safety record', icon: 'shield' },
];

export const employeeTestimonials: Testimonial[] = [
  {
    id: 'e1',
    quote:
      'I joined as a graduate engineer trainee and in six years I\u2019ve grown into a senior project manager. The mentorship and project exposure here are unmatched.',
    name: 'Rahul Deshpande',
    role: 'Senior Project Manager',
    company: 'Sunrise Constructions',
    project: '5 years at Sunrise',
    rating: 5,
    image: '/images/employee-1.svg',
    alt: 'Portrait of Rahul Deshpande, Senior Project Manager',
  },
  {
    id: 'e2',
    quote:
      'The safety culture is real, not lip service. I\u2019ve stopped work twice and been thanked both times. That trust makes me a better engineer.',
    name: 'Sneha Pillai',
    role: 'Site Engineer',
    company: 'Sunrise Constructions',
    project: '3 years at Sunrise',
    rating: 5,
    image: '/images/employee-2.svg',
    alt: 'Portrait of Sneha Pillai, Site Engineer',
  },
  {
    id: 'e3',
    quote:
      'From hospitals to metro viaducts, the sheer variety of work keeps me learning every single day. Sunrise is where careers are built, not just jobs.',
    name: 'Imran Khan',
    role: 'Design Lead',
    company: 'Sunrise Constructions',
    project: '8 years at Sunrise',
    rating: 5,
    image: '/images/employee-3.svg',
    alt: 'Portrait of Imran Khan, Design Lead',
  },
];

export const lifeAtSunrise: string[] = [
  '/images/life-1.svg',
  '/images/life-2.svg',
  '/images/life-3.svg',
  '/images/life-4.svg',
  '/images/life-5.svg',
  '/images/life-6.svg',
];

export const jobListings: JobListing[] = [
  {
    slug: 'senior-project-manager-commercial',
    title: 'Senior Project Manager - Commercial',
    department: 'Project Management',
    location: 'Nagpur, Maharashtra',
    type: 'Full-time',
    experience: '12+ years',
    postedDate: '2024-08-01',
    summary:
      'Lead delivery of a 5+ lakh sq.ft Grade-A commercial tower from mobilisation to handover, owning schedule, cost, quality, and client relationship.',
    description:
      'We are seeking an experienced Senior Project Manager to lead the delivery of a flagship commercial office tower in Nagpur. You will own the project end-to-end - from mobilisation through handover - managing a multidisciplinary team of engineers, consultants, and subcontractors to deliver on schedule, on budget, and to our quality and safety standards.',
    responsibilities: [
      'Own overall project schedule, cost, quality, and HSE performance',
      'Lead a team of 6–10 engineers and coordinate 15+ subcontractor packages',
      'Manage client and consultant relationships with weekly reporting',
      'Drive risk identification, mitigation, and change management',
      'Ensure QA/QC and statutory compliance through to handover',
    ],
    requirements: [
      'B.E./B.Tech in Civil Engineering; M.Tech or MBA preferred',
      '12+ years in commercial construction, 5+ in a PM role',
      'Proven delivery of projects above 2 lakh sq.ft',
      'Strong knowledge of Primavera P6, MS Project, and BIM workflows',
      'PMP or equivalent certification preferred',
    ],
    niceToHave: [
      'IGBC AP accreditation',
      'Experience with post-tensioned structures',
      'Familiarity with smart building/BMS systems',
    ],
  },
  {
    slug: 'structural-engineer-design-cell',
    title: 'Structural Engineer - Design Cell',
    department: 'Design',
    location: 'Nagpur, Maharashtra',
    type: 'Full-time',
    experience: '5-8 years',
    postedDate: '2024-07-25',
    summary:
      'Design and detail RCC and steel structures across diverse sectors, working in a BIM-coordinated environment with the latest analysis software.',
    description:
      'Join our central design cell to engineer structures across commercial, residential, industrial, and healthcare projects. You will work in a fully BIM-coordinated environment, using ETABS, STAAD.Pro, and Tekla to deliver safe, efficient, and buildable structural designs.',
    responsibilities: [
      'Analyse and design RCC and structural steel buildings',
      'Produce detailed structural drawings and bar-bending schedules',
      'Coordinate with MEP and architectural teams via BIM models',
      'Perform value engineering and constructability reviews',
      'Support site teams with design clarifications and RFIs',
    ],
    requirements: [
      'B.E./B.Tech in Civil Engineering; M.Tech in Structural Engineering preferred',
      '5–8 years in structural design consulting or design-build',
      'Proficiency in ETABS, STAAD.Pro, and Tekla/Revit Structure',
      'Knowledge of IS 456, IS 800, and relevant Indian codes',
    ],
    niceToHave: [
      'Experience with pre-engineered buildings',
      'Familiarity with seismic and wind load analysis',
      'IGBC or GRIHA awareness',
    ],
  },
  {
    slug: 'site-engineer-metro-package',
    title: 'Site Engineer - Metro Viaduct Package',
    department: 'Site Operations',
    location: 'Pune, Maharashtra',
    type: 'Full-time',
    experience: '4-7 years',
    postedDate: '2024-07-20',
    summary:
      'Supervise viaduct pier and segment-erection works on an elevated metro package, ensuring quality, safety, and geometry control.',
    description:
      'We are expanding our metro civil team in Pune. As Site Engineer, you will supervise pier construction and precast segment erection on a 5+ km elevated viaduct package, working closely with the project manager, QA/QC, and safety teams.',
    responsibilities: [
      'Supervise pier construction, segment casting, and launching',
      'Ensure geometry control and tolerance compliance',
      'Enforce safety protocols and conduct daily toolbox talks',
      'Maintain site records, inspection requests, and pour cards',
      'Coordinate with casting yard and erection crews',
    ],
    requirements: [
      'B.E./B.Tech in Civil Engineering',
      '4–7 years in infrastructure or heavy civil works',
      'Experience with precast segmental or box-girder bridges',
      'Strong understanding of surveying and total-station work',
    ],
    niceToHave: [
      'Prior metro rail project experience',
      'AWS or CSWIP welding inspection certification',
    ],
  },
  {
    slug: 'bim-coordinator-healthcare',
    title: 'BIM Coordinator - Healthcare Project',
    department: 'Design',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    experience: '6-10 years',
    postedDate: '2024-07-15',
    summary:
      'Lead BIM coordination on a complex 650-bed hospital project, federating models across disciplines and driving clash resolution.',
    description:
      'Healthcare construction demands near-perfect MEP coordination. As BIM Coordinator, you will federate architectural, structural, and MEP models for a 650-bed hospital, run clash detection, and chair weekly coordination meetings to resolve issues before they reach site.',
    responsibilities: [
      'Develop and maintain the project BIM execution plan (BEP)',
      'Federate multidiscipline models in Navisworks',
      'Run weekly clash detection and resolution meetings',
      'Produce 4D sequencing and MEP shop drawings',
      'Coordinate as-built model at handover',
    ],
    requirements: [
      'B.E./B.Tech in Civil/MEP/Architectural engineering',
      '6–10 years of BIM coordination experience',
      'Expert in Revit, Navisworks, and BIM 360 / ACC',
      'Experience on healthcare or complex MEP projects',
    ],
    niceToHave: [
      'Autodesk Certified Professional (Revit)',
      'ISO 19650 awareness',
    ],
  },
  {
    slug: 'quantity-surveyor-industrial',
    title: 'Quantity Surveyor - Industrial Projects',
    department: 'Project Management',
    location: 'Pune, Maharashtra',
    type: 'Full-time',
    experience: '5-9 years',
    postedDate: '2024-07-10',
    summary:
      'Manage costing, procurement, and contract administration across a portfolio of industrial warehouse and manufacturing projects.',
    description:
      'We are strengthening our commercial team for a growing portfolio of industrial projects. As Quantity Surveyor, you will manage cost estimation, tendering, subcontract procurement, billing, and variation management across multiple active industrial sites.',
    responsibilities: [
      'Prepare BOQs, cost estimates, and tender documentation',
      'Manage subcontract procurement and negotiation',
      'Process running-account bills and variations',
      'Track project cost against budget and forecast at completion',
      'Support claims and final-account settlement',
    ],
    requirements: [
      'B.E./B.Tech in Civil Engineering',
      '5–9 years in quantity surveying / contracts',
      'Strong knowledge of PWD / CPWD / IS specifications',
      'Proficiency in Excel, AutoCAD, and QS software',
    ],
    niceToHave: [
      'RICS or AIQS membership',
      'FIDIC contract administration experience',
    ],
  },
  {
    slug: 'hr-business-partner',
    title: 'HR Business Partner',
    department: 'Corporate',
    location: 'Nagpur, Maharashtra',
    type: 'Full-time',
    experience: '8-12 years',
    postedDate: '2024-07-05',
    summary:
      'Partner with business leaders to drive talent strategy, performance management, and culture across project sites and corporate offices.',
    description:
      'We are seeking an experienced HR Business Partner to work closely with our operations and engineering leadership. You will own talent planning, performance management, employee engagement, and culture initiatives across project sites and the corporate office.',
    responsibilities: [
      'Partner with business heads on workforce planning and hiring',
      'Drive performance management and succession planning',
      'Lead employee engagement and retention initiatives',
      'Manage grievance, discipline, and compliance matters',
      'Champion the safety and inclusion culture',
    ],
    requirements: [
      'MBA / MSW in HR from a reputed institution',
      '8–12 years in HRBP or generalist HR roles',
      'Experience in construction, infrastructure, or manufacturing',
      'Strong knowledge of Indian labour law and compliance',
    ],
    niceToHave: [
      'Experience scaling HR for a high-growth organisation',
      'Certification in psychometric assessment',
    ],
  },
];

/* ----------------------------------------------------------------------------
 * OFFICES
 * ------------------------------------------------------------------------- */
export const offices: OfficeLocation[] = [
  {
    id: 'o1',
    name: 'Nagpur (Head Office)',
    address:
      'Sunrise House, 5th Floor, Sitabuldi Main Road, Nagpur, Maharashtra 440001',
    phone: '+91 712 4567 890',
    email: 'hello@sunriseconstructions.in',
    isHQ: true,
  },
  {
    id: 'o2',
    name: 'Mumbai Branch',
    address: 'Tower B, Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    phone: '+91 22 4567 8900',
    email: 'mumbai@sunriseconstructions.in',
    isHQ: false,
  },
  {
    id: 'o3',
    name: 'Pune Branch',
    address: '6th Floor, FC Road, Shivajinagar, Pune, Maharashtra 411005',
    phone: '+91 20 4567 8900',
    email: 'pune@sunriseconstructions.in',
    isHQ: false,
  },
  {
    id: 'o4',
    name: 'Nashik Branch',
    address: 'Gangapur Road, Nashik, Maharashtra 422001',
    phone: '+91 253 4567 890',
    email: 'nashik@sunriseconstructions.in',
    isHQ: false,
  },
  {
    id: 'o5',
    name: 'Aurangabad Branch',
    address: 'Station Road, Aurangabad, Maharashtra 431001',
    phone: '+91 240 4567 890',
    email: 'aurangabad@sunriseconstructions.in',
    isHQ: false,
  },
];

/* ----------------------------------------------------------------------------
 * CTA BAND
 * ------------------------------------------------------------------------- */
export const ctaBand = {
  heading: "Let\u2019s Build Something Great Together",
  subheading:
    'From concept to handover, we deliver complex projects with the scale, discipline, and craft your vision deserves.',
  phone: siteConfig.contact.phone,
  phoneHref: siteConfig.contact.phoneHref,
  cta: { label: 'Get in Touch', href: '/contact-us' },
};

/* ----------------------------------------------------------------------------
 * CHAT WIDGET
 * ------------------------------------------------------------------------- */
export const chatWidget = {
  title: 'Chat with Sunrise',
  subtitle: 'We typically reply within a few minutes',
  greeting:
    'Hi there! 👋 Welcome to Sunrise Constructions. How can we help you build something great today?',
  placeholder: 'Type your message…',
  disclaimer: 'This assistant uses simulated responses during preview.',
};

/* ----------------------------------------------------------------------------
 * FOOTER
 * ------------------------------------------------------------------------- */
export const footer = {
  tagline: 'Building Beyond Expectations since 2016.',
  description:
    'Sunrise Constructions is a ₹300Cr+ engineering and construction enterprise delivering landmark projects across India.',
  quickLinks: navLinks,
  serviceLinks: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  certificationsMini: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'IGBC'],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
  copyright: `© ${new Date().getFullYear()} ${siteConfig.legalName} All rights reserved.`,
};