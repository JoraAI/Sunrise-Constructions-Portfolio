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
  legalName: 'Sunrise Constructions',
  shortName: 'Sunrise',
  tagline: 'Inspiring Possibilities',
  description:
    'Sunrise Constructions is a ₹115Cr+ engineering and construction enterprise delivering large-scale commercial, residential, industrial, and infrastructure projects across India since 2014.',
  url: 'https://www.sunriseconstructions.in',
  founded: '2014',
  contact: {
    phone: '',
    phoneHref: '',
    email: 'hello@sunriseconstructions.in',
    addressLine1: 'Ground Floor, Amar Palace Apartment, Dhantoli',
    addressLine2: '',
    city: 'Nagpur',
    state: 'Maharashtra',
    pincode: '440012',
    mapUrl: 'https://maps.app.goo.gl/ajuSEx2VScxB4Sww9',
    hours: 'Mon-Sat: 10:00 AM - 7:00 PM',
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
  eyebrow: 'Inspiring Possibilities',
  headline: 'Building Stronger Future',
  headlineAccent: 'Together',
  subheadline:
    'Since 2014, Sunrise Group has engineered landmark highways, bridges, irrigation systems, and infrastructure across Maharashtra - delivered on time, built to last.',
  primaryCta: { label: 'Our Services', href: '/services' },
  secondaryCta: { label: 'View Projects', href: '/projects' },
  posterImage: '/images/hero-poster-1.jpg',
};

export const heroVideos = [
  { src: '/videos/hero-1.mp4', poster: '/images/hero-poster-1.jpg', label: 'Aerial construction overview' },
  { src: '/videos/hero-2.mp4', poster: '/images/hero-poster-2.jpg', label: 'Site development' },
  { src: '/videos/hero-3.mp4', poster: '/images/hero-poster-3.jpg', label: 'Structural progress' },
  { src: '/videos/hero-4.mp4', poster: '/images/hero-poster-4.jpg', label: 'Project landscape' },
  { src: '/videos/hero-5.mp4', poster: '/images/hero-poster-5.jpg', label: 'NH-353J Katol highway improvement' },
  { src: '/videos/hero-6.mp4', poster: '/images/hero-poster-6.jpg', label: 'Completed structure' },
];

/* ----------------------------------------------------------------------------
 * STATS BAR
 * ------------------------------------------------------------------------- */
export const stats: Stat[] = [
  { id: 'experience', icon: 'calendar', value: 12, suffix: '+', label: 'Years of Experience' },
  { id: 'projects', icon: 'building', value: 28, suffix: '+', label: 'Projects Completed' },
  { id: 'professionals', icon: 'users', value: 250, suffix: '+', label: 'Skilled Professionals' },
  { id: 'satisfaction', icon: 'smile', value: 99, suffix: '%', label: 'Client Satisfaction' },
  {
    id: 'turnover',
    icon: 'indian-rupee',
    value: 115,
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
    'Founded in 2014 in Nagpur, Maharashtra, Sunrise Constructions has grown into a ₹115 crore+ engineering and construction enterprise. We deliver highway, bridge, irrigation, residential, healthcare, and infrastructure projects across Maharashtra, working with prestigious clients including NHAI, NH-PWD, and the Irrigation Department.',
    'Our team of 250+ engineers, project managers, and skilled tradespeople brings institutional rigor to every build - combining modern project controls with years of hands-on field expertise. The result: 95% on-time delivery, 99% client satisfaction, and infrastructure built to perform for generations.',
  ],
  image: '/images/about-building.jpg',
  imageAlt:
    'Aerial view of a large-scale construction site with cranes and infrastructure development',
  cta: { label: 'Learn More About Us', href: '/about-us' },
};

/* ----------------------------------------------------------------------------
 * ABOUT PAGE - FOUNDER MESSAGE
 * ------------------------------------------------------------------------- */
export const founderMessage = {
  name: 'D Mallikarjun Reddy',
  title: 'Chairman and Founder',
  image: '/images/team/mallikarjun-reddy.jpg',
  alt: 'Portrait of D Mallikarjun Reddy, Chairman and Founder of Sunrise Constructions',
  heading: 'A message from our founder',
  body: [
    'When I founded Sunrise Constructions in Nagpur in 2014, I had a simple conviction: that infrastructure built with engineering rigor and uncompromising integrity would always find a client. A decade later, that conviction has been validated by the trust of institutions like NHAI, NH-PWD, and the Irrigation Department.',
    'Today, our 250+ strong team has delivered landmark highways, bridges, irrigation systems, and public infrastructure across Maharashtra. But I am most proud not of the structures we have built, but of the culture we have built them with - one where safety is non-negotiable, quality has no shortcuts, and every commitment we make is kept.',
    'As we look to the next decade, our ambition is unchanged: to be the contractor that clients call when a project truly matters. Thank you for considering Sunrise Constructions. We would be honoured to build with you.',
  ],
  signature: 'D Mallikarjun Reddy',
};

/* ----------------------------------------------------------------------------
 * ABOUT PAGE - APPROACH
 * ------------------------------------------------------------------------- */
export const aboutApproach: {
  id: string;
  step: number;
  title: string;
  description: string;
}[] = [
  {
    id: 'listen',
    step: 1,
    title: 'Listen & Understand',
    description:
      'Every engagement begins with a deep understanding of your goals, constraints, site conditions, and success metrics - long before a single drawing is produced.',
  },
  {
    id: 'engineer',
    step: 2,
    title: 'Engineer & Plan',
    description:
      'Our in-house design and planning teams translate your brief into constructable, costed, and scheduled solutions - with risk engineered out, not bolted on.',
  },
  {
    id: 'execute',
    step: 3,
    title: 'Execute with Discipline',
    description:
      'Self-performed construction with digital project controls, real-time reporting, and a relentless focus on safety, quality, and schedule across every site.',
  },
  {
    id: 'deliver',
    step: 4,
    title: 'Deliver & Support',
    description:
      'We hand over projects that perform - on time, to spec, and backed by a defect-liability commitment and post-handover support that clients can rely on.',
  },
];

/* ----------------------------------------------------------------------------
 * ABOUT PAGE - WHY CHOOSE US (enhanced)
 * ------------------------------------------------------------------------- */
export const aboutDifferentiators: {
  id: string;
  number: string;
  title: string;
  description: string;
}[] = [
  {
    id: 'engineering',
    number: '01',
    title: 'Engineering Depth',
    description:
      'In-house structural, civil, and MEP engineering capability on every project - not subcontracted risk, but owned expertise.',
  },
  {
    id: 'delivery',
    number: '02',
    title: 'On-Time Delivery',
    description:
      '95% of projects delivered on or ahead of schedule through disciplined planning, digital controls, and proactive risk management.',
  },
  {
    id: 'safety',
    number: '03',
    title: 'Safety First',
    description:
      'A genuine zero-harm culture with ISO 45001-certified systems, daily toolbox talks, and worker empowerment to stop unsafe work.',
  },
  {
    id: 'trust',
    number: '04',
    title: 'Institutional Trust',
    description:
      'Repeatedly entrusted by NHAI, NH-PWD, Irrigation Department, and GMCH on their most critical public infrastructure projects.',
  },
];

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
      '95% of projects delivered on or ahead of schedule using disciplined project controls.',
    icon: 'clock',
  },
  {
    id: 'satisfaction',
    title: 'Client Satisfaction',
    description: 'A 9.9/10 satisfaction score across 28+ completed client engagements.',
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
    image: '/images/services/general-construction.jpg',
    alt: 'Construction workers in safety gear executing structural concrete works on a large building site',
    overview:
      'Our core capability. We self-perform reinforced concrete, structural steel, masonry, MEP rough-in, and architectural finishing - backed by an in-house plant, machinery fleet, and a 2,400-strong workforce. By controlling execution end-to-end, we hold ourselves accountable for quality, schedule, and budget from the first pour to final handover. From high-rise towers to highway bridges, our general construction teams bring the same discipline: engineered methodology, daily progress controls, and a zero-harm safety culture on every site.',
    keyDeliverables: [
      'Structural concrete & steel works',
      'Civil, MEP, and finishing trades',
      'In-house batching & formwork systems',
      'Real-time schedule & cost reporting',
      'QA/QC inspection and testing regime',
      'Safety, environmental and traffic management plans',
    ],
    process: [
      'Mobilisation & site setup',
      'Substructure & superstructure',
      'MEP installation & testing',
      'Finishes & commissioning',
      'QA/QC sign-off & handover',
    ],
    gallery: [
      '/images/services/general-construction.jpg',
      '/images/services/general-construction-2.jpg',
      '/images/services/general-construction-3.jpg',
      '/images/services/general-construction-4.jpg',
    ],
    capabilities: [
      'Reinforced cement concrete (RCC) - foundations, columns, beams, slabs, shear walls',
      'Structural steel fabrication and erection - columns, trusses, decks',
      'Masonry, blockwork, and plastering',
      'MEP rough-in and finishing - electrical, plumbing, HVAC, fire-fighting',
      'Architectural finishes - flooring, cladding, glazing, painting',
      'Industrial and heavy-duty floors',
      'Site infrastructure - roads, drainage, boundary walls, landscaping',
    ],
    stats: [
      { value: '28+', label: 'Projects delivered' },
      { value: '95%', label: 'On-time completion' },
      { value: '250+', label: 'Skilled workforce' },
      { value: 'Zero', label: 'Lost-time incidents (FY24)' },
    ],
    faqs: [
      {
        question: 'Do you self-perform structural works or subcontract them?',
        answer:
          'We self-perform the majority of structural concrete, steel, and civil works using our own workforce and plant. Specialist MEP, lifts, and façade packages are delivered under our management by pre-qualified subcontractors.',
      },
      {
        question: 'What project sizes do you take on?',
        answer:
          'Our general construction team typically delivers projects valued from ₹1 Cr to ₹115 Cr, ranging from individual buildings and bridges to multi-structure campuses and highway packages.',
      },
      {
        question: 'How do you control quality on site?',
        answer:
          'Every site operates a documented QA/QC plan covering material approvals, pour cards, reinforcement inspections, cube testing, and snagging. Checklists are digital, and sign-offs are tracked against the master construction programme.',
      },
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    shortDescription:
      'Owner\u2019s representative services with digital controls, cost certainty, and transparent reporting.',
    icon: 'clipboard',
    image: '/images/services/project-management.jpg',
    alt: 'Project managers reviewing construction schedules, drawings and progress dashboards',
    overview:
      'We act as your single point of accountability - managing design consultants, contractors, vendors, and authorities so you don\u2019t have to. Our PMO brings enterprise-grade digital controls, earned-value tracking, and risk management to every engagement, giving stakeholders real-time visibility into cost, schedule, and quality. Whether you need an owner\u2019s engineer for a single asset or a programme manager for a multi-site portfolio, our team plugs into your governance structure and protects your interests end-to-end.',
    keyDeliverables: [
      'Integrated master scheduling (Primavera/MS Project)',
      'Cost planning & earned-value management',
      'Procurement & contract administration',
      'Risk, quality & HSE governance',
      'Stakeholder and authority coordination',
      'Monthly progress and financial reporting',
    ],
    process: [
      'Project initiation & scope baselining',
      'Procurement strategy & tendering',
      'Construction monitoring & controls',
      'Change & risk management',
      'Close-out & performance review',
    ],
    gallery: [
      '/images/services/project-management.jpg',
      '/images/services/project-management-2.jpg',
    ],
    capabilities: [
      'Owner\u2019s representative / engineer services',
      'Master scheduling and programme controls (Primavera P6, MS Project)',
      'Cost estimating, budgeting, and earned-value analysis',
      'Procurement strategy, tendering, and contract administration',
      'Design review and value engineering',
      'Construction supervision and quality assurance',
      'Risk, HSE, and compliance management',
      'Programme management for multi-project portfolios',
    ],
    stats: [
      { value: '₹300Cr+', label: 'Projects under PM' },
      { value: '15+', label: 'Active programmes' },
      { value: '98%', label: 'Budget adherence' },
      { value: '24/7', label: 'Dashboard access' },
    ],
    faqs: [
      {
        question: 'Can you act as our owner\u2019s representative on an EPC contract?',
        answer:
          'Yes. We frequently act as the owner\u2019s engineer on EPC and DBFOT packages - reviewing the contractor\u2019s designs, witnessing quality tests, approving invoices, and protecting your commercial and technical interests through to handover.',
      },
      {
        question: 'What reporting cadence do you follow?',
        answer:
          'Standard reporting includes daily site logs, weekly progress notes, and a comprehensive monthly report covering schedule, cost, quality, safety, and risk. A live digital dashboard can be provided for real-time access.',
      },
      {
        question: 'Do you handle statutory approvals and liaising with authorities?',
        answer:
          'Yes. Our PMO coordinates with municipal authorities, NHAI, PWD, Irrigation Department, fire and environmental regulators to secure approvals, NOCs, and clearances - keeping the critical path on schedule.',
      },
    ],
  },
  {
    slug: 'design-and-build',
    title: 'Design & Build',
    shortDescription:
      'Single-contract design and delivery - faster decisions, fewer disputes, one accountable team.',
    icon: 'pencil-ruler',
    image: '/images/services/design-build.jpg',
    alt: 'Architects and engineers collaborating over building models and drawings',
    overview:
      'One team, one contract, one point of accountability. Our integrated design-build service brings architecture, structural engineering, MEP, and construction under a single roof - collapsing timelines, reducing change orders, and aligning design intent with buildability from day one. With design and construction teams co-located, decisions are made in hours rather than weeks, and constructability is engineered into every detail before a shovel hits the ground.',
    keyDeliverables: [
      'Architectural & structural design',
      'MEP engineering & coordination',
      'BIM-led clash detection',
      'Value engineering & constructability',
      'Guaranteed Maximum Price (GMP) option',
      'Single-source warranty',
    ],
    process: [
      'Brief & concept design',
      'Detailed design & approvals',
      'GMP pricing & contract',
      'Construction & commissioning',
      'Handover & warranties',
    ],
    gallery: [
      '/images/services/design-build.jpg',
      '/images/services/design-build-2.jpg',
    ],
    capabilities: [
      'Architectural concept and detailed design',
      'Structural engineering - RCC, steel, composite',
      'MEP design - electrical, HVAC, plumbing, fire',
      'Building Information Modelling (BIM) coordination',
      '3D clash detection and resolution',
      'Value engineering and constructability reviews',
      'Statutory design approvals and permits',
      'Integrated construction and handover',
    ],
    stats: [
      { value: '30%', label: 'Schedule reduction' },
      { value: '15%', label: 'Fewer change orders' },
      { value: '1', label: 'Point of accountability' },
      { value: 'BIM', label: 'On every project' },
    ],
    faqs: [
      {
        question: 'How is design-build different from the traditional design-bid-build approach?',
        answer:
          'In design-build, a single team is accountable for both design and construction under one contract. This eliminates the owner-mediated disputes between designer and builder, accelerates decisions, and allows construction to overlap with detailed design - typically compressing overall delivery by 20-30%.',
      },
      {
        question: 'Can we still use our preferred architect or consultant?',
        answer:
          'Yes. We can integrate your preferred architect or consultant into our design-build team as a nominated sub-consultant, or work with our in-house design studio. Either way, you retain a single contract with Sunrise Constructions.',
      },
      {
        question: 'Do you offer a Guaranteed Maximum Price (GMP)?',
        answer:
          'Yes. Once the detailed design is sufficiently developed (typically at 60-70% completion), we can convert the engagement to a GMP contract - giving you cost certainty while preserving shared-savings incentives for innovation.',
      },
    ],
  },
  {
    slug: 'renovation-and-remodeling',
    title: 'Renovation & Remodeling',
    shortDescription:
      'Heritage restoration, brownfield retrofits, and adaptive reuse delivered with minimal disruption.',
    icon: 'wrench',
    image: '/images/services/renovation.jpg',
    alt: 'Interior renovation and remodeling work with structural strengthening and modern finishes',
    overview:
      'Bringing new life to existing structures demands a different skillset. Our renovation team specialises in occupied-building retrofits, heritage restoration, structural strengthening, and adaptive reuse - engineered to modern performance standards while respecting what makes a building worth keeping. We work in live hospitals, functioning offices, and occupied residential blocks - engineering phasing plans that keep your operations running while we modernise the asset around you.',
    keyDeliverables: [
      'Structural assessment & strengthening',
      'Heritage & facade restoration',
      'MEP modernisation & retro-commissioning',
      'Phased, low-disruption execution',
      'As-built documentation and BIM',
      'Post-handover defect management',
    ],
    process: [
      'Condition assessment & survey',
      'Design & statutory approvals',
      'Phased execution plan',
      'Restoration & upgrade works',
      'Commissioning & handover',
    ],
    gallery: [
      '/images/services/renovation.jpg',
      '/images/services/renovation-2.jpg',
    ],
    capabilities: [
      'Structural condition assessment and NDT testing',
      'Structural strengthening - jacketing, FRP, underpinning',
      'Heritage façade and element restoration',
      'MEP modernisation and retro-commissioning',
      'Interior fit-out and remodeling',
      'Energy and envelope upgrades',
      'Adaptive reuse and change-of-occupancy conversions',
      'Phased execution in occupied buildings',
    ],
    stats: [
      { value: '40+', label: 'Retrofit projects' },
      { value: '0', label: 'Operational shutdowns' },
      { value: '30%', label: 'Avg. energy savings' },
      { value: 'NDT', label: 'Structural diagnostics' },
    ],
    faqs: [
      {
        question: 'Can you work in an occupied building without disrupting operations?',
        answer:
          'Yes. We engineer a phasing and segregation plan - dust barriers, noise windows, dedicated access routes, and vibration monitoring - so that occupants can continue to use the building safely while renovation proceeds zone by zone.',
      },
      {
        question: 'How do you assess the condition of an existing structure?',
        answer:
          'We combine visual inspection with non-destructive testing (rebound hammer, ultrasonic pulse velocity, half-cell potential), cover meter surveys, and selective core cutting. The results feed into a structural condition report that scopes the strengthening works required.',
      },
      {
        question: 'Do you handle heritage building restoration?',
        answer:
          'Yes. We have experience restoring heritage façades and structural elements in compliance with conservation guidelines - matching original materials, documenting existing details, and strengthening behind the historic envelope to meet modern loading requirements.',
      },
    ],
  },
  {
    slug: 'sustainable-construction',
    title: 'Sustainable Construction',
    shortDescription:
      'IGBC, LEED, and net-zero aligned delivery reducing embodied and operational carbon.',
    icon: 'leaf',
    image: '/images/services/sustainable.jpg',
    alt: 'Green-rated sustainable building with solar panels, daylighting, and vegetation',
    overview:
      'Sustainability is engineered in, not bolted on. We help owners target IGBC, LEED, and GRIHA ratings - and increasingly, net-zero operational carbon - through material selection, passive design integration, on-site renewable systems, and rigorous waste and water management during construction. Our sustainability team works alongside design from day one, running embodied-carbon assessments, specifying low-carbon materials, and modelling operational energy so that the building you hand over performs for decades, not just on the rating certificate.',
    keyDeliverables: [
      'IGBC / LEED / GRIHA certification support',
      'Low-embodied-carbon material strategy',
      'On-site renewables & rainwater harvesting',
      'Construction waste management (70%+ diversion)',
      'Energy and water modelling',
      'Post-occupancy performance verification',
    ],
    process: [
      'Sustainability goal-setting',
      'Material & systems selection',
      'Green construction practices',
      'Commissioning & measurement',
      'Certification & post-occupancy review',
    ],
    gallery: [
      '/images/services/sustainable.jpg',
      '/images/services/sustainable-2.jpg',
    ],
    capabilities: [
      'IGBC, LEED, and GRIHA certification advisory',
      'Embodied carbon assessment and reduction',
      'Passive design - daylight, shading, natural ventilation',
      'High-performance building envelope',
      'On-site solar PV and solar hot water',
      'Rainwater harvesting and greywater recycling',
      'Construction and demolition waste management',
      'Building commissioning and post-occupancy evaluation',
    ],
    stats: [
      { value: '40%', label: 'Lower embodied carbon' },
      { value: '70%+', label: 'Waste diverted' },
      { value: 'Net-zero', label: 'Ready delivery' },
      { value: 'IGBC', label: 'Certification support' },
    ],
    faqs: [
      {
        question: 'What green building ratings do you support?',
        answer:
          'We support all major Indian and international rating systems - IGBC (Green Homes, Green New Buildings), LEED (BD+C, ID+C), and GRIHA. We can also deliver net-zero operational carbon and net-zero energy buildings using ASHRAE and World GBC frameworks.',
      },
      {
        question: 'How much does sustainable construction add to project cost?',
        answer:
          'Targeting an IGBC Gold or LEED Silver rating typically adds 1-3% to capital cost, with payback in 3-7 years through energy and water savings. Net-zero buildings cost 5-10% more upfront. We run a rigorous cost-benefit analysis at concept stage so you can make an informed decision.',
      },
      {
        question: 'Do you measure actual performance after handover?',
        answer:
          'Yes. We offer post-occupancy evaluation (POE) services - monitoring energy, water, and indoor environmental quality for 12-24 months after handover, comparing actual performance against the design model, and tuning systems for continuous improvement.',
      },
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
    image: '/images/industries/commercial.jpg',
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
    image: '/images/industries/residential.jpg',
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
    image: '/images/industries/industrial.jpg',
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
    image: '/images/industries/healthcare.jpg',
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
    image: '/images/industries/education.jpg',
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
    image: '/images/industries/hospitality.jpg',
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
    image: '/images/industries/infrastructure.jpg',
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
    slug: 'kanhan-major-bridge',
    title: 'Kanhan Major Bridge',
    category: 'Infrastructure',
    location: 'Kanhan, Nagpur, Maharashtra',
    year: '2022',
    client: 'NH-PWD Nagpur',
    metric: 'Major bridge across Kanhan River \u00b7 NH-7 \u00b7 \u20b97.31 Cr',
    image: '/images/projects/kanhan-bridge.jpg',
    alt: 'Kanhan Major Bridge constructed across the Kanhan River on NH-7 near Nagpur',
    featured: true,
    gallery: ['/images/projects/kanhan-bridge.jpg', '/images/projects/kanhan-bridge-2.jpg'],
    summary:
      'Construction of a major bridge across the Kanhan River on the Nagpur-Jabalpur section of NH-7, connecting Parseoni and Kamptee in Nagpur district.',
    overview:
      'This major bridge project spanned the Kanhan River on the Nagpur-Jabalpur road section of NH-7 (Km 709/500), connecting the talukas of Parseoni and Kamptee. The work involved constructing deep well foundations in the riverbed, RCC piers, and a structural steel superstructure designed for heavy highway loading. Executed under NH-PWD, the bridge is a critical infrastructure link for the region, enabling year-round all-weather connectivity that was previously disrupted during monsoon flooding.',
    scope: [
      'Deep well foundations in riverbed',
      'RCC pier construction',
      'Structural steel superstructure',
      'Bridge deck and wearing course',
      'Approach roads and protection works',
    ],
    metrics: [
      { value: '\u20b97.31 Cr', label: 'Project value' },
      { value: 'NH-7', label: 'Highway corridor' },
      { value: '2022', label: 'Completed' },
      { value: 'NH-PWD', label: 'Client' },
    ],
  },
  {
    slug: 'nh7-four-laning',
    title: '4-Laning of NH-7 (MP-MH Border to Nagpur)',
    category: 'Infrastructure',
    location: 'Nagpur, Maharashtra',
    year: '2019',
    client: 'National Highways Authority of India (NHAI)',
    metric: '77 km 4-laning \u00b7 NHDP Phase-II \u00b7 \u20b9114.34 Cr',
    image: '/images/projects/nh7-laning.jpg',
    alt: 'Four-lane highway construction on NH-7 Nagpur section with bypass',
    featured: true,
    gallery: ['/images/projects/nh7-laning.jpg', '/images/projects/nh7-laning-2.jpg'],
    summary:
      'Four-laning of the MP/Maharashtra Border to Nagpur section of NH-7, including the Kamptee-Kanhan and Nagpur Bypass, under NHDP Phase-II.',
    overview:
      'One of our most significant highway projects, this involved the four-laning of a 77 km stretch of NH-7 from the Madhya Pradesh/Maharashtra border (Km 652) to Km 729, including construction of the Kamptee-Kanhan and Nagpur Bypass. Executed on a DBFOT basis under NHDP Phase-II for NHAI, the project included earthwork, flexible pavement, rigid pavement sections, culverts, minor bridges, and toll plaza infrastructure. The corridor is a critical freight route connecting central India to the south.',
    scope: [
      '77 km of 4-lane highway construction',
      'Kamptee-Kanhan and Nagpur Bypass',
      'Flexible and rigid pavement works',
      'Culverts, minor bridges, and drains',
      'Toll plaza and highway furniture',
    ],
    metrics: [
      { value: '77 km', label: 'Highway length' },
      { value: '\u20b9114.34 Cr', label: 'Project value' },
      { value: 'NHDP-II', label: 'Phase' },
      { value: 'NHAI', label: 'Client' },
    ],
  },
  {
    slug: 'mokhabardi-lift-irrigation',
    title: 'Mokhabardi Lift Irrigation Scheme',
    category: 'Infrastructure',
    location: 'Bhiwapur, Nagpur, Maharashtra',
    year: 'Ongoing',
    client: 'Ambhora Lift Irrigation Division, Bhiwapur',
    metric: '44.4 km main canal lining \u00b7 \u20b951.89 Cr',
    image: '/images/projects/mokhabardi-canal.jpg',
    alt: 'Mokhabardi Lift Irrigation canal construction with concrete lining near Bhiwapur',
    featured: true,
    gallery: ['/images/projects/mokhabardi-canal.jpg', '/images/projects/mokhabardi-canal-2.jpg'],
    summary:
      'Construction of balance earthwork and CC lining for a 44.4 km main canal of the Mokhabardi Lift Irrigation Scheme.',
    overview:
      'The Mokhabardi Lift Irrigation Scheme is a major water infrastructure project designed to bring irrigation to thousands of hectares of agricultural land in the Bhiwapur region. Our scope covers the balance earthwork excavation and cement concrete lining from RD 0 to 44,410 metres on the main canal. The concrete lining is critical for reducing seepage losses and ensuring efficient water conveyance to the command area. The project also includes construction of distribution structures, cross-drainage works, and canal regulatory structures.',
    scope: [
      '44.4 km main canal earthwork and lining',
      'Cement concrete lining for seepage control',
      'Cross-drainage and regulatory structures',
      'Distribution network connections',
      'Command area development',
    ],
    metrics: [
      { value: '44.4 km', label: 'Canal length' },
      { value: '\u20b951.89 Cr', label: 'Project value' },
      { value: 'Ongoing', label: 'Status' },
      { value: 'Irrigation', label: 'Sector' },
    ],
  },
  {
    slug: 'mpeb-wrd-colony-pench',
    title: 'New Colony for MPEB & WRD Employees, Pench',
    category: 'Residential',
    location: 'Pench National Park area, Ramtek, Nagpur',
    year: '2020',
    client: 'Pench Irrigation Division, Nagpur',
    metric: 'Residential colony \u00b7 Near Pench National Park \u00b7 \u20b923.99 Cr',
    image: '/images/projects/mpeb-colony.jpg',
    alt: 'Aerial view of residential colony constructed for MPEB and WRD employees near Pench',
    featured: true,
    gallery: ['/images/projects/mpeb-colony.jpg'],
    summary:
      'Construction of a complete residential colony for Maharashtra State Electricity Board and Water Resources Department employees near Pench National Park.',
    overview:
      'Located near Pauni Village outside Pench National Park in Ramtek taluka, this project involved the complete construction of a residential colony for employees of the Maharashtra Power Generation Company (MPEB) and Water Resources Department (WRD) associated with the Totladoh Pumped Storage Hydroelectric Project. The colony includes residential quarters of multiple categories, internal concrete roads, water supply, drainage, electrification, and landscaping - engineered to support families in a remote forest-adjacent location.',
    scope: [
      'Residential quarters (multiple categories)',
      'Internal concrete roads and land development',
      'Water supply and sewerage systems',
      'Electrical infrastructure and street lighting',
      'Boundary wall and landscaping',
    ],
    metrics: [
      { value: '\u20b923.99 Cr', label: 'Project value' },
      { value: 'Pench', label: 'Location' },
      { value: '2020', label: 'Completed' },
      { value: 'Colony', label: 'Type' },
    ],
  },
  {
    slug: 'gmc-paying-ward-nagpur',
    title: '100-Bedded Paying Ward, GMC Hospital Nagpur',
    category: 'Healthcare',
    location: 'Nagpur, Maharashtra',
    year: '2026',
    client: 'Integrated Unit Medical PWD, Nagpur',
    metric: '100-bedded paying ward \u00b7 Government Medical College \u00b7 \u20b922.38 Cr',
    image: '/images/projects/gmc-paying-ward.jpg',
    alt: 'Interior of paying ward with electrification at Government Medical College Hospital Nagpur',
    featured: true,
    gallery: ['/images/projects/gmc-paying-ward.jpg', '/images/projects/gmc-paying-ward-2.jpg'],
    summary:
      'Construction of a 100-bedded paying ward with complete electrification at the Government Medical College and Hospital (GMCH), Nagpur.',
    overview:
      'This healthcare infrastructure project involved the construction of a modern paying ward facility within the premises of the Government Medical College and Hospital (GMCH), Nagpur - one of the largest government hospitals in central India. The scope included structural construction, internal finishes to hospital standards, complete electrical and backup power infrastructure, medical gas pipeline systems, nurse call systems, and HVAC. The facility provides upgraded patient accommodation options while meeting the stringent requirements of a functioning tertiary-care hospital environment.',
    scope: [
      'Hospital-grade structural construction',
      'Medical gas pipeline systems',
      'Comprehensive electrification and backup power',
      'HVAC and ventilation systems',
      'Hospital-grade finishes and fixtures',
    ],
    metrics: [
      { value: '\u20b922.38 Cr', label: 'Project value' },
      { value: 'GMCH', label: 'Hospital' },
      { value: '2026', label: 'Completed' },
      { value: 'Medical PWD', label: 'Client' },
    ],
  },
  {
    slug: 'foot-over-bridges-nh44',
    title: 'Foot Over Bridges & Bus Shelters, NH-44',
    category: 'Infrastructure',
    location: 'Forest Section, NH-44, Nagpur',
    year: '2021',
    client: 'National Highways Authority of India (NHAI)',
    metric: 'Multiple FOBs & bus shelters \u00b7 Km 652-692 \u00b7 \u20b96.13 Cr',
    image: '/images/projects/foot-over-bridge.jpg',
    alt: 'Foot over bridge and bus shelter constructed on NH-44 forest section near Nagpur',
    featured: false,
    gallery: ['/images/projects/foot-over-bridge.jpg', '/images/projects/foot-over-bridge-2.jpg'],
    summary:
      'Construction of foot over bridges and bus shelters along a 40 km forest section of NH-44 for pedestrian safety under EPC mode.',
    overview:
      'This NHAI project addressed critical pedestrian safety needs along the forest section of NH-44 (Km 652 to Km 692), a corridor that passes through dense forest reserve area. We constructed multiple foot over bridges (FOBs) with ramps and stairs, along with bus shelters at designated stops. The structures were engineered to withstand heavy highway loading while providing safe crossing points for local communities and forest-area pedestrians. The project was executed under EPC (Engineering, Procurement, and Construction) mode.',
    scope: [
      'Multiple foot over bridges with ramps',
      'Bus shelters at designated locations',
      'Structural steel fabrication and erection',
      'Service road integration',
      'Safety signage and highway furniture',
    ],
    metrics: [
      { value: '\u20b96.13 Cr', label: 'Project value' },
      { value: 'Km 652-692', label: 'Corridor' },
      { value: '2021', label: 'Completed' },
      { value: 'EPC', label: 'Mode' },
    ],
  },
  {
    slug: 'yatri-suvidha-kendra-mansar',
    title: 'Yatri Suvidha Kendra & Refreshment Centre, Mansar',
    category: 'Commercial',
    location: 'Mansar, Ramtek, Nagpur',
    year: '2020',
    client: 'PWD Construction Division (Special Project), Nagpur',
    metric: 'Highway transit facility \u00b7 Mansar \u00b7 \u20b91.35 Cr',
    image: '/images/projects/yatri-suvidha.jpg',
    alt: 'Yatri Suvidha Kendra and refreshment centre built at Mansar on the highway near Ramtek',
    featured: false,
    gallery: ['/images/projects/yatri-suvidha.jpg', '/images/projects/yatri-suvidha-2.jpg'],
    summary:
      'Construction of a refreshment centre and Yatri Suvidha Kendra (traveller facility) at Mansar, near Ramtek, on the highway corridor.',
    overview:
      'Located at Mansar on the highway near Ramtek, this PWD Special Project involved the construction of a Yatri Suvidha Kendra - a traveller amenity centre designed to serve commuters on this busy highway corridor connecting Nagpur to Jabalpur. The facility includes rest rooms, refreshment areas, drinking water, parking, and other passenger amenities. The structure was built to highway facility standards with durable finishes suited for high-traffic public use.',
    scope: [
      'Traveller facility building construction',
      'Public restrooms and refreshment area',
      'Parking and site development',
      'Water supply and sanitation',
      'Electrical and lighting infrastructure',
    ],
    metrics: [
      { value: '\u20b91.35 Cr', label: 'Project value' },
      { value: 'Mansar', label: 'Location' },
      { value: '2020', label: 'Completed' },
      { value: 'PWD-SP', label: 'Client' },
    ],
  },
  {
    slug: 'pedestrian-underpass-nh44',
    title: 'Pedestrian Underpass, NH-44 (Forest Section)',
    category: 'Infrastructure',
    location: 'Nagpur, Maharashtra',
    year: '2020',
    client: 'National Highways Authority of India (NHAI)',
    metric: 'Underpass at Km 685+820 \u00b7 EPC mode \u00b7 \u20b912.64 Cr',
    image: '/images/projects/pedestrian-underpass-nh44.jpg',
    alt: 'Pedestrian underpass constructed at Km 685 on NH-44 Jabalpur-Nagpur section',
    featured: false,
    gallery: [
      '/images/projects/pedestrian-underpass-nh44.jpg',
      '/images/projects/pedestrian-underpass-nh44-2.jpg',
      '/images/projects/pedestrian-underpass-nh44-3.jpg',
    ],
    summary:
      'Construction of a pedestrian underpass with service road at Km 685+820 on the Jabalpur-Nagpur section of NH-44 under EPC mode.',
    overview:
      'This NHAI project addressed a critical safety need on the Jabalpur-Nagpur section of NH-44. We constructed a pedestrian underpass at Km 685+820, including the associated service road, in the forest section where pedestrian crossings posed significant safety risks. The underpass was built using box-pushing methodology to minimize disruption to highway traffic during construction. The project also included approach ramps, drainage works, and safety installations to ensure safe passage for pedestrians and two-wheelers beneath the highway.',
    scope: [
      'Box-type pedestrian underpass structure',
      'Service road construction',
      'Approach ramps and drainage',
      'Box-pushing methodology for traffic continuity',
      'Safety installations',
    ],
    metrics: [
      { value: '\u20b912.64 Cr', label: 'Project value' },
      { value: 'Km 685+820', label: 'Chainage' },
      { value: '2020', label: 'Completed' },
      { value: 'EPC', label: 'Mode' },
    ],
  },
  {
    slug: 'khindasi-feeder-canal',
    title: 'Khindasi Feeder Canal with Wild Life Passes',
    category: 'Infrastructure',
    location: 'Ramtek, Nagpur, Maharashtra',
    year: 'Ongoing',
    client: 'Irrigation Project Division, Nagpur',
    metric: '15.3 km canal \u00b7 Wild life passes \u00b7 \u20b948.62 Cr',
    image: '/images/projects/mokhabardi-canal.jpg',
    alt: 'Khindasi feeder canal earthwork and lining construction with wildlife passes near Ramtek',
    featured: false,
    gallery: ['/images/projects/mokhabardi-canal-2.jpg'],
    summary:
      'Construction of earthwork, structures, and CC lining for a 15.3 km feeder canal, including dedicated wildlife crossing passes.',
    overview:
      'This major irrigation project involves the construction of earthwork and lining from RD 792m to 1500m, and balance work of structures and earthwork from RD 1500m to 15,330m on the Khindasi Feeder Canal in Ramtek taluka. A distinctive feature of this project is the inclusion of dedicated wildlife passes - crossing structures designed to allow safe passage of wildlife over or under the canal alignment, which passes near forest areas. This demonstrates our ability to balance critical water infrastructure delivery with environmental responsibility.',
    scope: [
      '15.3 km canal earthwork and CC lining',
      'Canal regulatory and cross-drainage structures',
      'Dedicated wildlife crossing passes',
      'Environmental safeguards during construction',
      'Command area irrigation connectivity',
    ],
    metrics: [
      { value: '15.3 km', label: 'Canal length' },
      { value: '\u20b948.62 Cr', label: 'Project value' },
      { value: 'Ongoing', label: 'Status' },
      { value: 'Wildlife', label: 'Passes included' },
    ],
  },
  {
    slug: 'nh353j-katol-one-time-improvement',
    title: 'One-Time Improvement, Nagpur-Katol Section NH-353J (EPC)',
    category: 'Infrastructure',
    location: 'Nagpur-Katol, Maharashtra',
    year: '2026',
    client: 'National Highways Authority Of India, Nagpur',
    metric: '6.7 km highway improvement \u00b7 Km 7+300 to 13+400 \u00b7 \u20b925.67 Cr',
    image: '/images/projects/nh353j-katol.jpg',
    alt: 'Aerial view of freshly paved NH-353J Nagpur-Katol highway section with improved shoulders and road markings',
    featured: true,
    gallery: [
      '/images/projects/nh353j-katol.jpg',
      '/images/projects/nh353j-katol-2.jpg',
      '/images/projects/nh353j-katol-3.jpg',
      '/images/projects/nh353j-katol-4.jpg',
    ],
    summary:
      'One-time improvement of the denotified portion of the Nagpur-Katol section of NH-353J from Km 7+300 to Km 13+000, executed for the National Highways Authority Of India, Nagpur.',
    overview:
      'Awarded by the National Highways Authority Of India, Nagpur, this project delivered a comprehensive one-time improvement to the 6.7 km denotified stretch of NH-353J between Nagpur and Katol (chainage Km 7+300 to Km 13+400). NH-353J is a key secondary highway corridor connecting Nagpur city to the Katol tehsil and the wider western Maharashtra hinterland, carrying a steady mix of passenger, commercial, and agricultural freight traffic.\n\nThe scope covered strengthening of the existing flexible pavement, restoration of shoulders, and repair of drainage assets to arrest monsoon-related edge distress. The work also included renewal of road markings, installation of reflective highway furniture and signage, and maintenance of cross-drainage structures and minor bridges along the chainage. The package was executed on an Engineering, Procurement and Construction (EPC) basis, with quality controlled against MoRTH and IRC specifications.\n\nBy restoring the carriageway to a serviceable, all-weather standard, the project improved ride quality, reduced vehicle operating costs, and enhanced safety for the communities and freight movement that depend on the Nagpur-Katol corridor.',
    scope: [
      '6.7 km pavement strengthening (Km 7+300 to Km 13+400)',
      'Shoulder restoration and edge protection',
      'Drainage repair and cross-drainage maintenance',
      'Road markings, signage and reflective highway furniture',
      'Bridge and culvert maintenance along the chainage',
    ],
    metrics: [
      { value: '6.7 km', label: 'Highway length' },
      { value: 'Km 7+300 \u2013 13+400', label: 'Chainage' },
      { value: '\u20b925.67 Cr', label: 'Project value' },
      { value: 'NH-353J', label: 'Highway' },
      { value: 'NHAI', label: 'Client' },
    ],
  },
  {
    slug: 'deoli-nh361-white-topping',
    title: 'One-Time Improvement of Carriageway in Deoli Town with White Topping, NH-361',
    category: 'Infrastructure',
    location: 'Deoli, Wardha-Yavatmal Section, Maharashtra',
    year: '2026',
    client: 'National Highways Authority Of India, Chandrapur',
    metric: '3.200 Km white topping \u00b7 NH-361 \u00b7 EPC mode \u00b7 \u20b920.73 Cr',
    image: '/images/projects/deoli-nh361-white-topping.jpg',
    alt: 'White topping highway improvement on NH-361 at Deoli Town, Yavatmal-Wardha section',
    featured: false,
    gallery: ['/images/projects/deoli-nh361-white-topping.jpg'],
    summary:
      'One-time improvement of the existing carriageway in Deoli Town with white topping (3.200 km) on the Yavatmal-Wardha section of NH-361, executed on EPC mode.',
    overview:
      'This NHAI project involved the one-time improvement of the existing carriageway passing through Deoli Town on the Yavatmal-Wardha section of NH-361. The work comprised laying rigid white topping (cement concrete pavement) over a 3.200 km stretch, strengthening the existing road structure to withstand heavy traffic loads and improve longevity. The project was executed on an Engineering, Procurement, and Construction (EPC) basis for the National Highways Authority of India, Chandrapur. White topping provides a durable, low-maintenance surface with superior riding quality and reflectivity, enhancing both safety and service life on this important state highway corridor.',
    scope: [
      '3.200 km of white topping (rigid pavement) over existing carriageway',
      'Pavement strengthening and surface preparation',
      'Drainage and shoulder improvements through Deoli Town',
      'Road markings, signage, and safety furniture',
      'Traffic management during execution',
    ],
    metrics: [
      { value: '3.200 km', label: 'Highway length' },
      { value: '\u20b920.73 Cr', label: 'Project value' },
      { value: '2026', label: 'Completed' },
      { value: 'EPC', label: 'Mode' },
    ],
  },
];

/* ----------------------------------------------------------------------------
 * CREDIBILITY
 * ------------------------------------------------------------------------- */
export const clientLogos: { name: string; logo: string }[] = [
  { name: 'NHAI', logo: '/images/clients/client-01.png' },
  { name: 'NH-PWD Nagpur', logo: '/images/clients/client-02.png' },
  { name: 'PWD Maharashtra', logo: '/images/clients/client-03.png' },
  { name: 'MOIL Limited', logo: '/images/clients/moil.png' },
  { name: 'Western Coalfields Ltd', logo: '/images/clients/western-coalfields.png' },
  { name: 'Government of India', logo: '/images/clients/govt-of-india.png' },
  { name: 'MSSIDC', logo: '/images/clients/mssidc.png' },
  { name: 'GMCH Nagpur', logo: '/images/clients/client-08.png' },
  { name: 'NBCC (India) Ltd', logo: '/images/clients/nbcc.png' },
  { name: 'Pench Irrigation Division', logo: '/images/clients/client-10.png' },
  { name: 'Irrigation Department', logo: '/images/clients/client-11.png' },
  { name: 'NHAI Nagpur', logo: '/images/clients/client-12.png' },
  { name: 'PMGSY', logo: '/images/clients/pmgsy.png' },
  { name: 'NMRDA', logo: '/images/clients/nmrda.png' },
  { name: 'MADC', logo: '/images/clients/client-15.png' },
  { name: 'CIDCO', logo: '/images/clients/client-16.png' },
  { name: 'WRD Maharashtra', logo: '/images/clients/wrd-maharashtra.png' },
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
      'Sunrise Constructions delivered the Kanhan Major Bridge with exceptional quality and safety standards. Their engineering expertise and project management discipline are truly impressive.',
    name: 'Executive Engineer',
    role: 'NH-PWD Nagpur',
    company: 'NH-PWD',
    project: 'Kanhan Major Bridge, NH-7',
    rating: 5,
    image: '/images/testimonial-1.svg',
    alt: 'Representative image of NH-PWD official',
  },
  {
    id: 't2',
    quote:
      'The four-laning of NH-7 was executed to the highest NHAI standards. Sunrise delivered the 77 km stretch with minimal disruption and excellent quality control.',
    name: 'Project Director',
    role: 'NHAI Nagpur',
    company: 'NHAI',
    project: '4-Laning of NH-7 (MP-MH Border to Nagpur)',
    rating: 5,
    image: '/images/testimonial-2.svg',
    alt: 'Representative image of NHAI project director',
  },
  {
    id: 't3',
    quote:
      'The Mokhabardi Lift Irrigation canal work demonstrates Sunrise\u2019s capability in large-scale water infrastructure. Their earthwork precision and lining quality are excellent.',
    name: 'Superintending Engineer',
    role: 'Ambhora Lift Irrigation Division',
    company: 'Irrigation Department',
    project: 'Mokhabardi Lift Irrigation Scheme',
    rating: 5,
    image: '/images/testimonial-3.svg',
    alt: 'Representative image of irrigation department engineer',
  },
  {
    id: 't4',
    quote:
      'The paying ward construction at GMCH Nagpur was completed to exacting hospital standards. Their coordination with Medical PWD was seamless and professional.',
    name: 'Dean',
    role: 'Government Medical College and Hospital',
    company: 'GMCH Nagpur',
    project: 'Paying Ward with Electrification, GMC Hospital',
    rating: 5,
    image: '/images/testimonial-4.svg',
    alt: 'Representative image of GMCH hospital dean',
  },
];

/* ----------------------------------------------------------------------------
 * LEADERSHIP TEAM
 * ------------------------------------------------------------------------- */
export const team: TeamMember[] = [
  {
    id: 'm1',
    name: 'D Mallikarjun Reddy',
    title: 'Chairman and Founder',
    bio: 'Founded Sunrise Constructions in 2014 in Nagpur, Maharashtra. A visionary leader with deep expertise in large-scale infrastructure and highway construction, Mallikarjun guides the group\u2019s long-term strategy and growth.',
    image: '/images/team/mallikarjun-reddy.jpg',
    alt: 'Portrait of D Mallikarjun Reddy, Chairman and Founder',
    linkedin: '',
  },
  {
    id: 'm2',
    name: 'D Anant Reddy',
    title: 'Managing Director',
    bio: 'Leads day-to-day operations and project delivery across all sites. Anant brings hands-on engineering expertise and a relentless focus on quality, safety, and on-time delivery.',
    image: '/images/team/anant-reddy.jpg',
    alt: 'Portrait of D Anant Reddy, Managing Director',
    linkedin: '',
  },
  {
    id: 'm3',
    name: 'Ashok Rawat',
    title: 'General Manager (Technical)',
    bio: 'Heads the technical function with over a decade of experience across highway and bridge projects. Ashok oversees engineering design, quality assurance, and on-site technical problem-solving across all active sites.',
    image: '/images/team/ashok-rawat.jpg',
    alt: 'Portrait of Ashok Rawat, General Manager (Technical)',
    linkedin: '',
  },
  {
    id: 'm4',
    name: 'Muntazim Akhtar',
    title: 'Billing & Planning Engineer',
    bio: 'Manages billing, quantity estimation, and project planning for large infrastructure packages. Muntazim ensures contractual compliance, accurate RA bills, and resource-loaded schedules that keep projects on budget and on time.',
    image: '/images/team/muntazim-akhtar.jpg',
    alt: 'Portrait of Muntazim Akhtar, Billing & Planning Engineer',
    linkedin: '',
  },
  {
    id: 'm5',
    name: 'Mujeeb Ansari',
    title: 'Chief Project Manager',
    bio: 'Leads end-to-end delivery of complex highway, bridge, and irrigation projects from concept to handover. Mujeeb coordinates multi-disciplinary site teams, client interfaces, and subcontractor management to ensure milestone adherence.',
    image: '/images/team/mujeeb-ansari.jpg',
    alt: 'Portrait of Mujeeb Ansari, Chief Project Manager',
    linkedin: '',
  },
  {
    id: 'm6',
    name: 'Roshan Waghale',
    title: 'Senior Accounts Officer',
    bio: 'Oversees financial operations across the group, including GST/TDS compliance, vendor payments, project cost accounting, and statutory audits. Roshan brings rigorous financial discipline to multi-crore infrastructure engagements.',
    image: '/images/team/roshan-waghale.jpg',
    alt: 'Portrait of Roshan Waghale, Senior Accounts Officer',
    linkedin: '',
  },
  {
    id: 'm7',
    name: 'Vishal Kumar Tiwari',
    title: 'Project Manager',
    bio: 'Manages concurrent infrastructure projects with a focus on meticulous planning and strong team coordination. Vishal drives site execution, progress monitoring, and client reporting across highway and irrigation packages.',
    image: '/images/team/vishal-tiwari.jpg',
    alt: 'Portrait of Vishal Kumar Tiwari, Project Manager',
    linkedin: '',
  },
  {
    id: 'm8',
    name: 'Amit Pandey',
    title: 'Deputy Project Manager',
    bio: 'Supports project management across site execution, procurement, and progress tracking. Amit brings hands-on experience from site engineering to planning, ensuring day-to-day milestones are met across active projects.',
    image: '/images/team/amit-pandey.jpg',
    alt: 'Portrait of Amit Pandey, Deputy Project Manager',
    linkedin: '',
  },
  {
    id: 'm9',
    name: 'Navin Nikhar',
    title: 'Senior Surveyor & Design Engineer',
    bio: 'Leads survey, setting-out, and design coordination with precision and autonomy. Navin ensures every project\u2019s engineering meets the highest standards, from baseline surveys to as-built documentation.',
    image: '/images/team/navin-nikhar.jpg',
    alt: 'Portrait of Navin Nikhar, Senior Surveyor & Design Engineer',
    linkedin: '',
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
  { id: 'c1', value: '250+', label: 'Team members', icon: 'users' },
  { id: 'c2', value: '4 years', label: 'Avg. tenure', icon: 'clock' },
  { id: 'c3', value: '1', label: 'Head office in Nagpur', icon: 'map-pin' },
  { id: 'c4', value: '5', label: 'Site offices', icon: 'building' },
];

export const employeeTestimonials: Testimonial[] = [
  {
    id: 'e1',
    quote:
      'The technical exposure and project diversity at Sunrise is exceptional. Working on highway and bridge projects has sharpened my engineering judgment immensely.',
    name: 'Ashok Rawat',
    role: 'GM, Technical',
    company: 'Sunrise Constructions',
    project: '12 years at Sunrise',
    rating: 5,
    image: '/images/employee-1.svg',
    alt: 'Portrait of Ashok Rawat, GM Technical',
  },
  {
    id: 'e2',
    quote:
      'The work culture here values precision and accountability. Managing billing and planning for large infrastructure projects has been a rewarding challenge.',
    name: 'Muntazim Akhtar',
    role: 'Billing and Planning Engineer',
    company: 'Sunrise Constructions',
    project: '5 years at Sunrise',
    rating: 5,
    image: '/images/employee-2.svg',
    alt: 'Portrait of Muntazim Akhtar, Billing and Planning Engineer',
  },
  {
    id: 'e3',
    quote:
      'Leading complex projects from concept to completion at Sunrise has been the most fulfilling phase of my career. The team\u2019s dedication is unmatched.',
    name: 'Mujeeb Ansari',
    role: 'Chief Project Manager',
    company: 'Sunrise Constructions',
    project: '5 years at Sunrise',
    rating: 5,
    image: '/images/employee-3.svg',
    alt: 'Portrait of Mujeeb Ansari, Chief Project Manager',
  },
  {
    id: 'e4',
    quote:
      'Managing multiple infrastructure projects simultaneously has taught me the value of meticulous planning and strong team coordination. Sunrise provides the platform to grow as a leader.',
    name: 'Vishal Kumar Tiwari',
    role: 'Project Manager',
    company: 'Sunrise Constructions',
    project: '5 years at Sunrise',
    rating: 5,
    image: '/images/employee-1.svg',
    alt: 'Portrait of Vishal Kumar Tiwari, Project Manager',
  },
  {
    id: 'e5',
    quote:
      'Every project brings a new challenge, and Sunrise equips us with the resources and support to deliver excellence. The collaborative environment makes even the toughest projects achievable.',
    name: 'Pravin Singh',
    role: 'Project Manager',
    company: 'Sunrise Constructions',
    project: '5 years at Sunrise',
    rating: 5,
    image: '/images/employee-2.svg',
    alt: 'Portrait of Pravin Singh, Project Manager',
  },
  {
    id: 'e6',
    quote:
      'The hands-on experience at Sunrise is invaluable. From site execution to project planning, every day brings opportunities to learn and contribute to infrastructure that matters.',
    name: 'Amit Kumar Pandey',
    role: 'Deputy Project Manager',
    company: 'Sunrise Constructions',
    project: '4 years at Sunrise',
    rating: 5,
    image: '/images/employee-3.svg',
    alt: 'Portrait of Amit Kumar Pandey, Deputy Project Manager',
  },
  {
    id: 'e7',
    quote:
      'Precision in survey and design is the foundation of every successful project. At Sunrise, I have the tools and autonomy to ensure our engineering meets the highest standards.',
    name: 'Navin Nikhar',
    role: 'Senior Survey and Design Engineer',
    company: 'Sunrise Constructions',
    project: '7 years at Sunrise',
    rating: 5,
    image: '/images/employee-1.svg',
    alt: 'Portrait of Navin Nikhar, Senior Survey and Design Engineer',
  },
  {
    id: 'e8',
    quote:
      'Behind every great construction project is rigorous financial discipline. At Sunrise, I manage accounts for multi-crore projects with transparency and accountability at the core.',
    name: 'Roshan Waghale',
    role: 'Senior Accounts Officer',
    company: 'Sunrise Constructions',
    project: '7 years at Sunrise',
    rating: 5,
    image: '/images/employee-2.svg',
    alt: 'Portrait of Roshan Waghale, Senior Accounts Officer',
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
    slug: 'pqc-laying-expert-engineer',
    title: 'PQC Laying Expert (Engineer)',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Nagpur',
    postedDate: '2025-07-01',
    summary: 'Expert engineer to lead PQC (Pavement Quality Concrete) laying operations on highway projects.',
    description: 'We are seeking an experienced PQC Laying Expert to lead pavement quality concrete laying operations on our ongoing highway construction projects. The ideal candidate will have deep expertise in concrete pavement technology, slip-form paving, and quality control.',
    responsibilities: [
      'Lead PQC laying operations on highway/expressway projects',
      'Supervise slip-form paver operations and concrete paving teams',
      'Ensure mix design compliance and quality standards as per MoRTH/NHAI specifications',
      'Monitor and control concrete temperature, workability, and strength parameters',
      'Coordinate with batching plant, QC lab, and site engineering teams',
      'Maintain paving records and daily progress reports',
    ],
    requirements: [
      'B.Tech/B.E. in Civil Engineering',
      '8+ years of experience in highway construction with at least 5 years in concrete paving',
      'Proven experience with slip-form paver operations and PQC laying',
      'Deep knowledge of MoRTH, IRC, and NHAI specifications for rigid pavement',
      'Strong leadership and on-site problem-solving skills',
    ],
    qualifications: [
      'Experience with Wirtgen/CPM slip-form pavers preferred',
      'Familiarity with dowel bar installation and joint sealing',
    ],
    niceToHave: [
      'Post-graduate degree in Transportation Engineering',
      'Experience with airport runway paving',
    ],
    experience: '8+ years',
  },
  {
    slug: 'deputy-project-manager',
    title: 'Deputy Project Manager',
    department: 'Project Management',
    type: 'Full-time',
    location: 'Nagpur',
    postedDate: '2025-07-01',
    summary: 'Deputy PM to support project execution, planning, and client coordination on infrastructure projects.',
    description: 'We are looking for a Deputy Project Manager to support our Project Managers in the execution of highway, bridge, and irrigation projects. This is a critical role bridging site operations and project management.',
    responsibilities: [
      'Assist the Project Manager in planning, scheduling, and executing construction projects',
      'Monitor site progress, prepare daily/weekly reports, and flag delays',
      'Coordinate between site engineers, subcontractors, and the project management office',
      'Track project budgets, resource allocation, and material procurement',
      'Ensure compliance with safety, quality, and environmental standards',
      'Liaise with clients (NHAI, PWD, Irrigation Department) and attend progress meetings',
    ],
    requirements: [
      'B.Tech/B.E. in Civil Engineering',
      '6-10 years of experience in construction project management',
      'Experience with highway, bridge, or irrigation projects preferred',
      'Proficiency in MS Project/Primavera and project reporting',
      'Strong communication and coordination skills',
    ],
    qualifications: [
      'PMP or equivalent project management certification preferred',
    ],
    niceToHave: [
      'MBA in Operations or Construction Management',
      'Experience with NHAI/PWD contract management',
    ],
    experience: '6-10 years',
  },
  {
    slug: 'accountant',
    title: 'Accountant (2 Positions)',
    department: 'Corporate/Admin',
    type: 'Full-time',
    location: 'Nagpur',
    postedDate: '2025-07-01',
    summary: 'Accountant to manage day-to-day financial operations, billing, and statutory compliance.',
    description: 'We are hiring 2 Accountants for our corporate office in Nagpur. The role involves managing day-to-day accounting, billing, GST/TDS compliance, vendor payments, and financial reporting for our construction projects.',
    responsibilities: [
      'Maintain books of accounts in Tally/ERP system',
      'Process vendor invoices, subcontractor bills, and petty cash',
      'Prepare and file GST, TDS, and other statutory returns on time',
      'Reconcile bank statements, ledgers, and project cost accounts',
      'Assist in preparation of monthly financial statements and MIS reports',
      'Coordinate with auditors and ensure documentation compliance',
    ],
    requirements: [
      'B.Com / M.Com / CA Inter',
      '3-5 years of accounting experience, preferably in construction or infrastructure',
      'Hands-on experience with Tally Prime and GST portal',
      'Good knowledge of TDS, GST, and construction industry taxation',
      'Proficiency in MS Excel and financial reporting',
    ],
    qualifications: [
      'CA Inter or equivalent preferred',
    ],
    niceToHave: [
      'Experience with ERP systems (SAP, Oracle)',
      'Knowledge of NHAI/PWD billing procedures',
    ],
    experience: '3-5 years',
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
      'Ground Floor, Amar Palace Apartment, Dhantoli, Nagpur, Maharashtra 440012',
    phone: '',
    email: 'hello@sunriseconstructions.in',
    isHQ: true,
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
  tagline: 'Inspiring Possibilities since 2014.',
  description:
    'Sunrise Constructions is a ₹115Cr+ engineering and construction enterprise delivering landmark projects across Maharashtra.',
  quickLinks: navLinks,
  serviceLinks: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
  copyright: `© ${new Date().getFullYear()} ${siteConfig.legalName} All rights reserved.`,
};