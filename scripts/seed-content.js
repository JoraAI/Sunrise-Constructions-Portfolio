/**
 * Seeds all content tables in Supabase from src/lib/content.ts defaults.
 * Run AFTER database-setup.sql has been executed.
 *
 * Usage: npm run seed-content
 */

const fs = require('fs');
const path = require('path');

// Load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim();
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const REST = `${SUPABASE_URL}/rest/v1`;

const headers = {
  apikey: SERVICE_KEY,
  Authorization: 'Bearer ' + SERVICE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

async function seedTable(table, rows) {
  if (!rows || rows.length === 0) {
    console.log(`  ${table}: no data, skipping`);
    return 0;
  }

  // Check if table already has data
  const checkRes = await fetch(`${REST}/${table}?select=id&limit=1`, { headers: { ...headers, Prefer: 'return=minimal' } });
  const checkData = await checkRes.json();
  if (checkData && checkData.length > 0) {
    console.log(`  ${table}: already has data, skipping (use --force to override)`);
    return 0;
  }

  const res = await fetch(`${REST}/${table}`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify(rows),
  });

  if (res.ok) {
    console.log(`  ✓ ${table}: inserted ${rows.length} rows`);
    return rows.length;
  } else {
    const err = await res.text();
    console.log(`  ✗ ${table}: ${err.substring(0, 200)}`);
    return 0;
  }
}

// --- Data extractors (from content.ts structure) ---

function getProjects() {
  return [
    { slug: 'kanhan-major-bridge', title: 'Kanhan Major Bridge', category: 'Infrastructure', location: 'Kanhan, Nagpur, Maharashtra', year: '2022', client: 'NH-PWD Nagpur', metric: 'Major bridge across Kanhan River · NH-7 · ₹7.31 Cr', image: '/images/projects/kanhan-bridge.jpg', alt: 'Kanhan Major Bridge on NH-7', featured: true, gallery: JSON.stringify(['/images/projects/kanhan-bridge.jpg', '/images/projects/kanhan-bridge-2.jpg']), summary: 'Construction of a major bridge across the Kanhan River on NH-7, connecting Parseoni and Kamptee in Nagpur district.', overview: 'This major bridge project spanned the Kanhan River on the Nagpur-Jabalpur road section of NH-7 (Km 709/500), connecting the talukas of Parseoni and Kamptee. The work involved constructing deep well foundations in the riverbed, RCC piers, and a structural steel superstructure designed for heavy highway loading.', scope: JSON.stringify(['Deep well foundations in riverbed', 'RCC pier construction', 'Structural steel superstructure', 'Bridge deck and wearing course', 'Approach roads and protection works']), metrics: JSON.stringify([{value:'₹7.31 Cr',label:'Project value'},{value:'NH-7',label:'Highway corridor'},{value:'2022',label:'Completed'},{value:'NH-PWD',label:'Client'}]), sort_order: 1 },
    { slug: 'nh7-four-laning', title: '4-Laning of NH-7 (MP-MH Border to Nagpur)', category: 'Infrastructure', location: 'Nagpur, Maharashtra', year: '2019', client: 'National Highways Authority of India (NHAI)', metric: '77 km 4-laning · NHDP Phase-II · ₹114.34 Cr', image: '/images/projects/nh7-laning.jpg', alt: 'Four-lane highway on NH-7', featured: true, gallery: JSON.stringify(['/images/projects/nh7-laning.jpg', '/images/projects/nh7-laning-2.jpg']), summary: 'Four-laning of the MP/Maharashtra Border to Nagpur section of NH-7, including the Kamptee-Kanhan and Nagpur Bypass, under NHDP Phase-II.', overview: 'One of our most significant highway projects, this involved the four-laning of a 77 km stretch of NH-7 from the Madhya Pradesh/Maharashtra border to Km 729, including construction of the Kamptee-Kanhan and Nagpur Bypass.', scope: JSON.stringify(['77 km of 4-lane highway construction', 'Kamptee-Kanhan and Nagpur Bypass', 'Flexible and rigid pavement works', 'Culverts, minor bridges, and drains', 'Toll plaza and highway furniture']), metrics: JSON.stringify([{value:'77 km',label:'Highway length'},{value:'₹114.34 Cr',label:'Project value'},{value:'NHDP-II',label:'Phase'},{value:'NHAI',label:'Client'}]), sort_order: 2 },
    { slug: 'mokhabardi-lift-irrigation', title: 'Mokhabardi Lift Irrigation Scheme', category: 'Infrastructure', location: 'Bhiwapur, Nagpur, Maharashtra', year: 'Ongoing', client: 'Ambhora Lift Irrigation Division, Bhiwapur', metric: '44.4 km main canal lining · ₹51.89 Cr', image: '/images/projects/mokhabardi-canal.jpg', alt: 'Mokhabardi canal construction', featured: true, gallery: JSON.stringify(['/images/projects/mokhabardi-canal.jpg', '/images/projects/mokhabardi-canal-2.jpg']), summary: 'Construction of balance earthwork and CC lining for a 44.4 km main canal.', overview: 'The Mokhabardi Lift Irrigation Scheme is a major water infrastructure project designed to bring irrigation to thousands of hectares of agricultural land in the Bhiwapur region.', scope: JSON.stringify(['44.4 km main canal earthwork and lining', 'Cement concrete lining for seepage control', 'Cross-drainage and regulatory structures']), metrics: JSON.stringify([{value:'44.4 km',label:'Canal length'},{value:'₹51.89 Cr',label:'Project value'},{value:'Ongoing',label:'Status'}]), sort_order: 3 },
    { slug: 'mpeb-wrd-colony-pench', title: 'New Colony for MPEB & WRD Employees, Pench', category: 'Residential', location: 'Pench National Park area, Ramtek, Nagpur', year: '2020', client: 'Pench Irrigation Division, Nagpur', metric: 'Residential colony · ₹23.99 Cr', image: '/images/projects/mpeb-colony.jpg', alt: 'MPEB colony near Pench', featured: true, gallery: JSON.stringify(['/images/projects/mpeb-colony.jpg', '/images/projects/mpeb-colony-2.jpg']), summary: 'Construction of a complete residential colony for MPEB and WRD employees near Pench National Park.', overview: 'Located near Pauni Village outside Pench National Park, this project involved the complete construction of a residential colony for employees.', scope: JSON.stringify(['Residential quarters', 'Internal concrete roads', 'Water supply and sewerage systems']), metrics: JSON.stringify([{value:'₹23.99 Cr',label:'Project value'},{value:'Pench',label:'Location'}]), sort_order: 4 },
    { slug: 'gmc-paying-ward-nagpur', title: 'Paying Ward with Electrification, GMC Hospital Nagpur', category: 'Healthcare', location: 'Nagpur, Maharashtra', year: '2026', client: 'Integrated Unit Medical PWD, Nagpur', metric: 'Hospital paying ward · ₹15.31 Cr', image: '/images/projects/gmc-paying-ward.jpg', alt: 'GMC Hospital paying ward', featured: true, gallery: JSON.stringify(['/images/projects/gmc-paying-ward.jpg', '/images/projects/gmc-paying-ward-2.jpg']), summary: 'Construction of a paying ward with complete electrification at GMC Hospital, Nagpur.', overview: 'This healthcare infrastructure project involved construction of a modern paying ward facility within GMCH, Nagpur.', scope: JSON.stringify(['Hospital-grade structural construction', 'Medical gas pipeline systems', 'Comprehensive electrification']), metrics: JSON.stringify([{value:'₹15.31 Cr',label:'Project value'},{value:'GMCH',label:'Hospital'}]), sort_order: 5 },
    { slug: 'foot-over-bridges-nh44', title: 'Foot Over Bridges & Bus Shelters, NH-44', category: 'Infrastructure', location: 'Forest Section, NH-44, Nagpur', year: '2021', client: 'National Highways Authority of India (NHAI)', metric: 'Multiple FOBs & bus shelters · ₹6.13 Cr', image: '/images/projects/foot-over-bridge.jpg', alt: 'Foot over bridge on NH-44', featured: false, gallery: JSON.stringify(['/images/projects/foot-over-bridge.jpg', '/images/projects/foot-over-bridge-2.jpg']), summary: 'Construction of foot over bridges and bus shelters along a forest section of NH-44.', overview: 'This NHAI project addressed critical pedestrian safety needs along the forest section of NH-44.', scope: JSON.stringify(['Multiple foot over bridges with ramps', 'Bus shelters at designated locations']), metrics: JSON.stringify([{value:'₹6.13 Cr',label:'Project value'},{value:'Km 652-692',label:'Corridor'}]), sort_order: 6 },
    { slug: 'yatri-suvidha-kendra-mansar', title: 'Yatri Suvidha Kendra & Refreshment Centre, Mansar', category: 'Commercial', location: 'Mansar, Ramtek, Nagpur', year: '2020', client: 'PWD Construction Division (Special Project), Nagpur', metric: 'Highway transit facility · ₹1.35 Cr', image: '/images/projects/yatri-suvidha.jpg', alt: 'Yatri Suvidha Kendra at Mansar', featured: false, gallery: JSON.stringify(['/images/projects/yatri-suvidha.jpg']), summary: 'Construction of a refreshment centre and Yatri Suvidha Kendra at Mansar.', overview: 'Located at Mansar on the highway near Ramtek, this PWD Special Project involved construction of a traveller amenity centre.', scope: JSON.stringify(['Traveller facility building', 'Public restrooms and refreshment area']), metrics: JSON.stringify([{value:'₹1.35 Cr',label:'Project value'}]), sort_order: 7 },
    { slug: 'nh353j-nagpur-katol-improvement', title: 'One-Time Improvement, Nagpur-Katol Section NH-353J', category: 'Infrastructure', location: 'Nagpur, Maharashtra', year: '2026', client: 'National Highways Authority of India (NHAI), Nagpur', metric: '5.7 km highway improvement · ₹25.67 Cr', image: '/images/projects/nh7-laning-2.jpg', alt: 'Highway improvement NH-353J', featured: false, gallery: JSON.stringify(['/images/projects/nh7-laning-2.jpg']), summary: 'One-time improvement of the Nagpur-Katol section of NH-353J.', overview: 'This NHAI project involved a comprehensive one-time improvement of a 5.7 km stretch of NH-353J.', scope: JSON.stringify(['5.7 km highway pavement improvement', 'Drainage and shoulder works']), metrics: JSON.stringify([{value:'5.7 km',label:'Highway length'},{value:'₹25.67 Cr',label:'Project value'}]), sort_order: 8 },
  ];
}

function getServices() {
  return [
    { slug: 'general-construction', title: 'General Construction', short_description: 'Self-performed structural, civil, and finishing works for landmark builds of every scale.', icon: 'hard-hat', image: '/images/service-construction.svg', alt: 'Workers at a construction site', overview: 'Our core capability. We self-perform reinforced concrete, structural steel, masonry, MEP rough-in, and architectural finishing - backed by an in-house plant, machinery fleet, and a 2,400-strong workforce.', key_deliverables: JSON.stringify(['Structural concrete & steel works', 'Civil, MEP, and finishing trades', 'In-house batching & formwork systems', 'Real-time schedule & cost reporting']), process: JSON.stringify(['Mobilisation & site setup', 'Substructure & superstructure', 'MEP installation & testing', 'Finishes & commissioning', 'QA/QC sign-off & handover']), sort_order: 1 },
    { slug: 'project-management', title: 'Project Management', short_description: 'Owner\u2019s representative services with digital controls, cost certainty, and transparent reporting.', icon: 'clipboard', image: '/images/service-pm.svg', alt: 'Project managers reviewing dashboards', overview: 'We act as your single point of accountability - managing design consultants, contractors, vendors, and authorities.', key_deliverables: JSON.stringify(['Integrated master scheduling', 'Cost planning & earned-value management', 'Procurement & contract administration', 'Risk, quality & HSE governance']), process: JSON.stringify(['Project initiation & scope baselining', 'Procurement strategy & tendering', 'Construction monitoring & controls', 'Change & risk management', 'Close-out & performance review']), sort_order: 2 },
    { slug: 'design-and-build', title: 'Design & Build', short_description: 'Single-contract design and delivery - faster decisions, fewer disputes, one accountable team.', icon: 'pencil-ruler', image: '/images/service-designbuild.svg', alt: 'Architects collaborating', overview: 'One team, one contract, one point of accountability.', key_deliverables: JSON.stringify(['Architectural & structural design', 'MEP engineering & coordination', 'BIM-led clash detection', 'Value engineering & constructability']), process: JSON.stringify(['Brief & concept design', 'Detailed design & approvals', 'GMP pricing & contract', 'Construction & commissioning', 'Handover & warranties']), sort_order: 3 },
    { slug: 'renovation-and-remodeling', title: 'Renovation & Remodeling', short_description: 'Heritage restoration, brownfield retrofits, and adaptive reuse delivered with minimal disruption.', icon: 'wrench', image: '/images/service-renovation.svg', alt: 'Refurbished interior', overview: 'Bringing new life to existing structures demands a different skillset.', key_deliverables: JSON.stringify(['Structural assessment & strengthening', 'Heritage & facade restoration', 'MEP modernisation', 'Phased, low-disruption execution']), process: JSON.stringify(['Condition assessment & survey', 'Design & statutory approvals', 'Phased execution plan', 'Restoration & upgrade works', 'Commissioning & handover']), sort_order: 4 },
    { slug: 'sustainable-construction', title: 'Sustainable Construction', short_description: 'IGBC, LEED, and net-zero aligned delivery reducing embodied and operational carbon.', icon: 'leaf', image: '/images/service-sustainable.svg', alt: 'Green building with solar', overview: 'Sustainability is engineered in, not bolted on.', key_deliverables: JSON.stringify(['IGBC / LEED / GRIHA certification support', 'Low-embodied-carbon material strategy', 'On-site renewables & rainwater harvesting', 'Construction waste management']), process: JSON.stringify(['Sustainability goal-setting', 'Material & systems selection', 'Green construction practices', 'Commissioning & measurement', 'Certification & post-occupancy review']), sort_order: 5 },
  ];
}

function getIndustries() {
  return [
    { slug: 'commercial', title: 'Commercial', short_description: 'Grade-A office towers, IT campuses, and mixed-use developments built for performance.', icon: 'briefcase', image: '/images/industry-commercial.svg', alt: 'Commercial office tower', overview: 'We deliver Grade-A commercial space that meets the demands of global occupiers.', capabilities: JSON.stringify(['Corporate office towers', 'IT/ITeS campuses', 'Mixed-use developments']), metrics: JSON.stringify([{value:'40M+',label:'Sq.ft delivered'},{value:'120+',label:'Commercial projects'}]), sort_order: 1 },
    { slug: 'residential', title: 'Residential', short_description: 'Premium apartments, gated communities, and affordable housing at city scale.', icon: 'home', image: '/images/industry-residential.svg', alt: 'Residential community', overview: 'From luxury high-rises to large-scale affordable housing, we build homes.', capabilities: JSON.stringify(['Premium high-rise apartments', 'Gated communities & villas', 'Affordable housing at scale']), metrics: JSON.stringify([{value:'25,000+',label:'Homes delivered'},{value:'60+',label:'Residential projects'}]), sort_order: 2 },
    { slug: 'industrial', title: 'Industrial', short_description: 'Manufacturing plants, warehouses, and logistics hubs engineered for throughput.', icon: 'factory', image: '/images/industry-industrial.svg', alt: 'Industrial warehouse', overview: 'Speed-to-commissioning is everything in industrial construction.', capabilities: JSON.stringify(['Pre-engineered buildings', 'Heavy manufacturing plants', 'Warehouses & logistics parks']), metrics: JSON.stringify([{value:'18M+',label:'Sq.ft delivered'},{value:'75+',label:'Industrial projects'}]), sort_order: 3 },
    { slug: 'healthcare', title: 'Healthcare', short_description: 'Hospitals and medical facilities built to stringent clinical and regulatory standards.', icon: 'heart-pulse', image: '/images/industry-healthcare.svg', alt: 'Hospital building', overview: 'Healthcare construction demands precision.', capabilities: JSON.stringify(['Multi-specialty hospitals', 'Medical colleges', 'Diagnostic & day-care centres']), metrics: JSON.stringify([{value:'6,500+',label:'Beds delivered'},{value:'22',label:'Healthcare projects'}]), sort_order: 4 },
    { slug: 'education', title: 'Education', short_description: 'Schools, colleges, and campuses designed for learning and built to last.', icon: 'graduation-cap', image: '/images/industry-education.svg', alt: 'Campus building', overview: 'We build the institutions that shape the next generation.', capabilities: JSON.stringify(['K-12 school campuses', 'Universities & research institutes', 'Laboratories & research centres']), metrics: JSON.stringify([{value:'40+',label:'Institutions built'},{value:'12M',label:'Sq.ft of campuses'}]), sort_order: 5 },
    { slug: 'hospitality', title: 'Hospitality', short_description: 'Hotels, resorts, and convention centres delivered to global brand standards.', icon: 'bed', image: '/images/industry-hospitality.svg', alt: 'Hotel resort', overview: 'Hospitality construction is a test of finishes, FF&E coordination, and programme discipline.', capabilities: JSON.stringify(['Business & luxury hotels', 'Resorts & serviced apartments', 'Convention & exhibition centres']), metrics: JSON.stringify([{value:'4,200+',label:'Keys delivered'},{value:'18',label:'Hospitality projects'}]), sort_order: 6 },
    { slug: 'infrastructure', title: 'Infrastructure', short_description: 'Roads, bridges, metro viaducts, and civil works that connect cities.', icon: 'road', image: '/images/industry-infrastructure.svg', alt: 'Metro viaduct construction', overview: 'Beyond buildings, we engineer the civil infrastructure that economies run on.', capabilities: JSON.stringify(['Metro & rail viaducts', 'Flyovers & urban roads', 'Water & sewage treatment plants']), metrics: JSON.stringify([{value:'120 km',label:'Roads & viaducts'},{value:'35+',label:'Civil projects'}]), sort_order: 7 },
  ];
}

function getTeam() {
  return [
    { name: 'D Mallikarjun Reddy', title: 'Chairman and Founder', bio: 'Founded Sunrise Constructions in 2014 in Nagpur, Maharashtra. A visionary leader with deep expertise in large-scale infrastructure and highway construction, Mallikarjun guides the group\u2019s long-term strategy and growth.', image: '/images/team-1.svg', alt: 'D Mallikarjun Reddy', linkedin: '', sort_order: 1 },
    { name: 'D Anant Reddy', title: 'Managing Director', bio: 'Leads day-to-day operations and project delivery across all sites. Anant brings hands-on engineering expertise and a relentless focus on quality, safety, and on-time delivery.', image: '/images/team-2.svg', alt: 'D Anant Reddy', linkedin: '', sort_order: 2 },
  ];
}

function getTestimonials() {
  return [
    { quote: 'Sunrise Constructions delivered the Kanhan Major Bridge with exceptional quality and safety standards. Their engineering expertise and project management discipline are truly impressive.', name: 'Executive Engineer', role: 'NH-PWD Nagpur', company: 'NH-PWD', project: 'Kanhan Major Bridge, NH-7', rating: 5, image: '/images/testimonial-1.svg', alt: 'NH-PWD official', sort_order: 1 },
    { quote: 'The four-laning of NH-7 was executed to the highest NHAI standards. Sunrise delivered the 77 km stretch with minimal disruption and excellent quality control.', name: 'Project Director', role: 'NHAI Nagpur', company: 'NHAI', project: '4-Laning of NH-7', rating: 5, image: '/images/testimonial-2.svg', alt: 'NHAI project director', sort_order: 2 },
    { quote: 'The Mokhabardi Lift Irrigation canal work demonstrates Sunrise\u2019s capability in large-scale water infrastructure. Their earthwork precision and lining quality are excellent.', name: 'Superintending Engineer', role: 'Ambhora Lift Irrigation Division', company: 'Irrigation Department', project: 'Mokhabardi Lift Irrigation Scheme', rating: 5, image: '/images/testimonial-3.svg', alt: 'Irrigation department engineer', sort_order: 3 },
    { quote: 'The paying ward construction at GMCH Nagpur was completed to exacting hospital standards. Their coordination with Medical PWD was seamless and professional.', name: 'Dean', role: 'Government Medical College and Hospital', company: 'GMCH Nagpur', project: 'Paying Ward, GMC Hospital', rating: 5, image: '/images/testimonial-4.svg', alt: 'GMCH hospital dean', sort_order: 4 },
  ];
}

function getBlogPosts() {
  return [
    { slug: 'future-of-green-building-india', title: 'The Future of Green Building in India: Beyond the Rating', excerpt: 'Why IGBC and LEED ratings are just the beginning - and how embodied carbon, circular materials, and net-zero operations are reshaping what sustainable construction really means.', category: 'Sustainability', author: 'Karthik Venkatesh', author_role: 'Head of Engineering & Design', date: '2024-08-12', reading_time: '6 min read', image: '/images/blog-1.svg', alt: 'Green-rated building', tags: JSON.stringify(['Sustainability','IGBC','Net Zero']), content: JSON.stringify(['For two decades, green building in India meant chasing a rating - IGBC, LEED, or GRIHA plaques on a lobby wall. That era is ending.','Embodied carbon - the emissions locked into making cement, steel, glass, and aluminium - accounts for roughly half of a new building\u2019s lifetime footprint.','At Sunrise Constructions, we now run embodied-carbon assessments at concept stage, not after.','The buildings we hand over today will stand for 50 to 80 years. Designing them to 2024 sustainability standards is not enough.']), published: true, sort_order: 1 },
    { slug: 'bim-transforming-construction', title: 'How BIM Is Transforming Indian Construction Project Delivery', excerpt: 'Building Information Modelling is no longer a design tool - it is the operational backbone that lets large contractors coordinate thousands of decisions and avoid costly rework.', category: 'Technology', author: 'Karthik Venkatesh', author_role: 'Head of Engineering & Design', date: '2024-07-02', reading_time: '5 min read', image: '/images/blog-2.svg', alt: 'Engineers reviewing 3D model', tags: JSON.stringify(['BIM','Technology','Project Management']), content: JSON.stringify(['In a complex hospital or metro project, thousands of structural, MEP, and architectural elements must fit together in three-dimensional space.','Building Information Modelling (BIM) changes that. A federated 3D model lets every discipline coordinate in a shared digital environment.','The result is measurable: rework down by over 30%, RFIs reduced by nearly half.']), published: true, sort_order: 2 },
    { slug: 'safety-culture-construction-sites', title: 'Zero Harm: Building a Real Safety Culture on Site', excerpt: 'A safety helmet is not a safety culture. Here is what it actually takes to run a 6.5 km metro package over live traffic with zero lost-time incidents.', category: 'Safety', author: 'Deepa Anand', author_role: 'Head of Safety & Sustainability', date: '2024-05-20', reading_time: '7 min read', image: '/images/blog-3.svg', alt: 'Workers in safety gear', tags: JSON.stringify(['Safety','HSE','Culture']), content: JSON.stringify(['A safety helmet is not a safety culture.','Here is what it actually takes to run a 6.5 km metro package over live traffic with zero lost-time incidents.']), published: true, sort_order: 3 },
  ];
}

function getJobListings() {
  return [
    { slug: 'pqc-laying-expert-engineer', title: 'PQC Laying Expert (Engineer)', department: 'Engineering', location: 'Nagpur', employment_type: 'Full-time', description: 'Lead pavement quality concrete laying operations on highway construction projects.', responsibilities: JSON.stringify(['Lead PQC laying operations on highway/expressway projects','Supervise slip-form paver operations and concrete paving teams','Ensure mix design compliance as per MoRTH/NHAI specifications','Monitor concrete temperature, workability, and strength parameters']), requirements: JSON.stringify(['B.Tech/B.E. in Civil Engineering','8+ years experience in highway construction with 5+ years in concrete paving','Proven experience with slip-form paver operations','Deep knowledge of MoRTH, IRC, and NHAI specifications']), qualifications: JSON.stringify(['Experience with Wirtgen/CPM slip-form pavers preferred']), active: true, sort_order: 1 },
    { slug: 'deputy-project-manager', title: 'Deputy Project Manager', department: 'Project Management', location: 'Nagpur', employment_type: 'Full-time', description: 'Support PMs in execution of highway, bridge, and irrigation projects.', responsibilities: JSON.stringify(['Assist PM in planning, scheduling, and executing construction projects','Monitor site progress and prepare reports','Coordinate between site engineers, subcontractors, and PMO','Track budgets and material procurement']), requirements: JSON.stringify(['B.Tech/B.E. in Civil Engineering','6-10 years experience in construction project management','Experience with highway/bridge/irrigation projects','Proficiency in MS Project/Primavera']), qualifications: JSON.stringify(['PMP certification preferred']), active: true, sort_order: 2 },
    { slug: 'accountant', title: 'Accountant (2 Positions)', department: 'Corporate/Admin', location: 'Nagpur', employment_type: 'Full-time', description: 'Manage day-to-day accounting, billing, GST/TDS compliance for construction projects.', responsibilities: JSON.stringify(['Maintain books of accounts in Tally/ERP','Process vendor invoices and subcontractor bills','Prepare and file GST, TDS returns','Reconcile bank statements and project cost accounts','Assist in monthly financial statements and MIS']), requirements: JSON.stringify(['B.Com/M.Com/CA Inter','3-5 years accounting experience (construction preferred)','Hands-on Tally Prime and GST portal experience','Knowledge of TDS, GST, construction taxation']), qualifications: JSON.stringify(['CA Inter preferred']), active: true, sort_order: 3 },
  ];
}


function getSiteSettings() {
  return {
    id: 'singleton',
    stats: JSON.stringify([
      {id:'experience',icon:'calendar',value:12,suffix:'+',label:'Years of Experience'},
      {id:'projects',icon:'building',value:28,suffix:'+',label:'Projects Completed'},
      {id:'professionals',icon:'users',value:250,suffix:'+',label:'Skilled Professionals'},
      {id:'satisfaction',icon:'smile',value:99,suffix:'%',label:'Client Satisfaction'},
      {id:'turnover',icon:'indian-rupee',value:115,prefix:'₹',suffix:'Cr+',label:'Annual Turnover'},
    ]),
    about_heading: 'An engineering enterprise trusted to deliver India\u2019s most demanding projects',
    about_body: JSON.stringify([
      'Founded in 2014 in Nagpur, Maharashtra, Sunrise Constructions has grown into a ₹115 crore+ engineering and construction enterprise.',
      'Our team of 250+ engineers, project managers, and skilled tradespeople brings institutional rigor to every build.',
    ]),
    about_image: '/images/about-building.svg',
    about_image_alt: 'Sunrise Constructions engineers reviewing blueprints',
    mission: 'To engineer structures that elevate communities - delivering complex projects with absolute integrity, safety, and precision, on time and within budget.',
    vision: 'To be South Asia\u2019s most trusted construction enterprise, recognised for innovation, sustainability, and the calibre of the people we build with.',
    values: 'Safety without compromise. Quality without shortcuts. Accountability in every commitment. Respect for the people and places we build around.',
    certifications: JSON.stringify([
      {name:'ISO 9001:2015',description:'Quality Management'},
      {name:'ISO 14001:2015',description:'Environmental Management'},
      {name:'ISO 45001:2018',description:'Occupational Health & Safety'},
      {name:'IGBC Member',description:'Green Building Council'},
      {name:'CREDAI',description:'Real Estate Body'},
    ]),
    process_steps: JSON.stringify([
      {id:'consultation',step:1,title:'Consultation',description:'We start by understanding your vision, constraints, and success metrics.',icon:'message-square'},
      {id:'design',step:2,title:'Design & Planning',description:'Our architects and engineers develop coordinated designs and cost plans.',icon:'pencil-ruler'},
      {id:'approvals',step:3,title:'Approvals',description:'We manage statutory approvals, NOCs, and pre-construction compliance.',icon:'file-check'},
      {id:'construction',step:4,title:'Construction',description:'Self-performed execution with digital controls and uncompromising safety.',icon:'hard-hat'},
      {id:'qaqc',step:5,title:'Quality Assurance',description:'A documented QA/QC regime ensures we hand over to spec, every time.',icon:'shield-check'},
      {id:'handover',step:6,title:'Handover',description:'Commissioning, documentation, training, and defect-liability period.',icon:'key'},
    ]),
    hero_eyebrow: 'Inspiring Possibilities',
    hero_headline: 'We Build Better',
    hero_headline_accent: 'Tomorrows',
    hero_subheadline: 'Since 2014, Sunrise Group has engineered landmark highways, bridges, irrigation systems, and infrastructure across Maharashtra - delivered on time, built to last.',
  };
}

async function main() {
  console.log('='.repeat(60));
  console.log('  Content Seed: content.ts data → Supabase DB');
  console.log('='.repeat(60));
  console.log(`Supabase URL: ${SUPABASE_URL}\n`);

  let total = 0;

  console.log('Projects:');
  total += await seedTable('content_projects', getProjects());

  console.log('Services:');
  total += await seedTable('content_services', getServices());

  console.log('Industries:');
  total += await seedTable('content_industries', getIndustries());

  console.log('Team:');
  total += await seedTable('content_team', getTeam());

  console.log('Testimonials:');
  total += await seedTable('content_testimonials', getTestimonials());

  console.log('Blog Posts:');
  total += await seedTable('content_blog_posts', getBlogPosts());

  console.log('Job Listings:');
  total += await seedTable('content_job_listings', getJobListings());

  // Site settings (single row)
  console.log('Site Settings:');
  const settingsRes = await fetch(`${REST}/content_site_settings?id=eq.singleton&select=id&limit=1`, { headers: { ...headers, Prefer: 'return=minimal' } });
  const settingsData = await settingsRes.json();
  if (settingsData && settingsData.length > 0) {
    console.log('  content_site_settings: already has data, skipping');
  } else {
    const sRes = await fetch(`${REST}/content_site_settings`, {
      method: 'POST',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify(getSiteSettings()),
    });
    if (sRes.ok) console.log('  ✓ content_site_settings: inserted');
    else console.log('  ✗ content_site_settings: ' + (await sRes.text()).substring(0, 150));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`  Seed Complete! ${total} total rows inserted.`);
  console.log('='.repeat(60));
}

main().catch((e) => console.error('Seed error:', e));