/**
 * Migrates referenced media files from /public to Supabase Storage.
 * Only uploads files that are actually used in content.ts.
 *
 * Usage: npm run migrate-media
 */

const fs = require('fs');
const path = require('path');

// Load .env manually
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

if (!SERVICE_KEY || !SUPABASE_URL) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL not set in .env');
  process.exit(1);
}

// All media files referenced in content.ts, organized by section
const MEDIA_FILES = [
  // Hero section
  { path: '/videos/hero-1.mp4', section: 'hero', alt: 'Aerial construction overview' },
  { path: '/videos/hero-2.mp4', section: 'hero', alt: 'Site development' },
  { path: '/videos/hero-3.mp4', section: 'hero', alt: 'Structural progress' },
  { path: '/videos/hero-4.mp4', section: 'hero', alt: 'Project landscape' },
  { path: '/videos/hero-5.mp4', section: 'hero', alt: 'Construction detail' },
  { path: '/videos/hero-6.mp4', section: 'hero', alt: 'Completed structure' },
  { path: '/images/hero-poster-1.jpg', section: 'hero', alt: 'Aerial construction overview' },
  { path: '/images/hero-poster-2.jpg', section: 'hero', alt: 'Site development' },
  { path: '/images/hero-poster-3.jpg', section: 'hero', alt: 'Structural progress' },
  { path: '/images/hero-poster-4.jpg', section: 'hero', alt: 'Project landscape' },
  { path: '/images/hero-poster-5.jpg', section: 'hero', alt: 'Construction detail' },
  { path: '/images/hero-poster-6.jpg', section: 'hero', alt: 'Completed structure' },

  // Projects
  { path: '/images/projects/kanhan-bridge.jpg', section: 'projects', alt: 'Kanhan Major Bridge on NH-7 near Nagpur' },
  { path: '/images/projects/kanhan-bridge-2.jpg', section: 'projects', alt: 'Kanhan Major Bridge alternate view' },
  { path: '/images/projects/nh7-laning.jpg', section: 'projects', alt: 'Four-lane highway construction on NH-7' },
  { path: '/images/projects/nh7-laning-2.jpg', section: 'projects', alt: 'NH-7 highway improvement work' },
  { path: '/images/projects/mokhabardi-canal.jpg', section: 'projects', alt: 'Mokhabardi Lift Irrigation canal construction' },
  { path: '/images/projects/mokhabardi-canal-2.jpg', section: 'projects', alt: 'Mokhabardi canal and Khindasi feeder canal' },
  { path: '/images/projects/mpeb-colony.jpg', section: 'projects', alt: 'Residential colony for MPEB employees near Pench' },
  { path: '/images/projects/mpeb-colony-2.jpg', section: 'projects', alt: 'MPEB colony alternate view' },
  { path: '/images/projects/gmc-paying-ward.jpg', section: 'projects', alt: 'Paying ward at Government Medical College Hospital Nagpur' },
  { path: '/images/projects/gmc-paying-ward-2.jpg', section: 'projects', alt: 'GMC Hospital paying ward interior' },
  { path: '/images/projects/foot-over-bridge.jpg', section: 'projects', alt: 'Foot over bridge on NH-44 forest section' },
  { path: '/images/projects/foot-over-bridge-2.jpg', section: 'projects', alt: 'FOB and bus shelter on NH-44' },
  { path: '/images/projects/yatri-suvidha.jpg', section: 'projects', alt: 'Yatri Suvidha Kendra at Mansar' },
  { path: '/images/projects/yatri-suvidha-2.jpg', section: 'projects', alt: 'Yatri Suvidha Kendra alternate view' },
  { path: '/images/project-metro.svg', section: 'projects', alt: 'Pedestrian underpass on NH-44' },

  // Services
  { path: '/images/service-construction.svg', section: 'services', alt: 'Workers in safety gear at a large Sunrise Constructions site' },
  { path: '/images/service-pm.svg', section: 'services', alt: 'Project managers reviewing Gantt charts' },
  { path: '/images/service-designbuild.svg', section: 'services', alt: 'Architects and engineers collaborating' },
  { path: '/images/service-renovation.svg', section: 'services', alt: 'Refurbished commercial interior' },
  { path: '/images/service-sustainable.svg', section: 'services', alt: 'Green-rated building with solar panels' },

  // Industries
  { path: '/images/industry-commercial.svg', section: 'industries', alt: 'Glass-clad commercial office tower at dusk' },
  { path: '/images/industry-residential.svg', section: 'industries', alt: 'Large residential apartment community' },
  { path: '/images/industry-industrial.svg', section: 'industries', alt: 'Large-span industrial warehouse' },
  { path: '/images/industry-healthcare.svg', section: 'industries', alt: 'Modern multi-specialty hospital' },
  { path: '/images/industry-education.svg', section: 'industries', alt: 'University campus building' },
  { path: '/images/industry-hospitality.svg', section: 'industries', alt: 'Luxury hotel resort with pool' },
  { path: '/images/industry-infrastructure.svg', section: 'industries', alt: 'Elevated metro viaduct under construction' },

  // Team
  { path: '/images/team-1.svg', section: 'team', alt: 'Portrait of D Mallikarjun Reddy, Chairman and Founder' },
  { path: '/images/team-2.svg', section: 'team', alt: 'Portrait of D Anant Reddy, Managing Director' },

  // Testimonials
  { path: '/images/testimonial-1.svg', section: 'testimonials', alt: 'NH-PWD official' },
  { path: '/images/testimonial-2.svg', section: 'testimonials', alt: 'NHAI project director' },
  { path: '/images/testimonial-3.svg', section: 'testimonials', alt: 'Irrigation department engineer' },
  { path: '/images/testimonial-4.svg', section: 'testimonials', alt: 'GMCH hospital dean' },

  // Blog
  { path: '/images/blog-1.svg', section: 'blog', alt: 'Green-rated building with integrated solar' },
  { path: '/images/blog-2.svg', section: 'blog', alt: 'Engineers reviewing a 3D building model' },
  { path: '/images/blog-3.svg', section: 'blog', alt: 'Construction workers in full safety gear' },
  { path: '/images/blog-4.svg', section: 'blog', alt: 'Blog article illustration' },

  // About
  { path: '/images/about-building.svg', section: 'about', alt: 'Sunrise Constructions engineers reviewing blueprints' },
  { path: '/images/about-building.jpg', section: 'about', alt: 'Sunrise Constructions building project' },
  { path: '/images/pageheader-about.jpg', section: 'pageheaders', alt: 'Sunrise Constructions team on site' },

  // Plant & Machinery
  { path: '/images/plant-machinery/concrete-batching-plant.jpg', section: 'plant-machinery', alt: 'High-capacity concrete batching plant with cement silos and transit mixer trucks' },
  { path: '/images/plant-machinery/earthmoving-loaders-graders.jpg', section: 'plant-machinery', alt: 'Caterpillar 120 motor grader and CAT backhoe loader lined up at project machinery yard' },
  { path: '/images/plant-machinery/commercial-trucks-boom-placer.jpg', section: 'plant-machinery', alt: 'Tata heavy commercial trucks and mobile concrete boom placer pump fleet in yard' },
  { path: '/images/plant-machinery/heavy-tippers-haulage.jpg', section: 'plant-machinery', alt: 'Fleet of heavy multi-axle tippers and haulage equipment in company yard' },

  // Social & Culture
  { path: '/images/social/flag-hoisting-celebration.jpg', section: 'social', alt: 'Sunrise leadership, engineers, and workforce celebrating national flag hoisting ceremony at project site' },
  { path: '/images/social/team-celebration-gathering.jpg', section: 'social', alt: 'Panoramic group photograph of Sunrise Constructions team, engineers, and site crew gathered together' },

  // Careers
  { path: '/images/life-1.svg', section: 'careers', alt: 'Life at Sunrise - team event' },
  { path: '/images/life-2.svg', section: 'careers', alt: 'Life at Sunrise - site visit' },
  { path: '/images/life-3.svg', section: 'careers', alt: 'Life at Sunrise - office life' },
  { path: '/images/life-4.svg', section: 'careers', alt: 'Life at Sunrise - training' },
  { path: '/images/life-5.svg', section: 'careers', alt: 'Life at Sunrise - celebration' },
  { path: '/images/life-6.svg', section: 'careers', alt: 'Life at Sunrise - team building' },
  { path: '/images/employee-1.svg', section: 'careers', alt: 'Sunrise Constructions employee' },
  { path: '/images/employee-2.svg', section: 'careers', alt: 'Sunrise Constructions employee' },
  { path: '/images/employee-3.svg', section: 'careers', alt: 'Sunrise Constructions employee' },
];

const BUCKET = 'media';
const publicDir = path.join(process.cwd(), 'public');

async function uploadFile(filePath, section, altText) {
  const fullPath = path.join(publicDir, filePath);
  const fileName = path.basename(filePath);

  // Check if file exists locally
  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠ SKIP (not found): ${filePath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const ext = path.extname(filePath);
  const mimeType =
    ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.png'
        ? 'image/png'
        : ext === '.svg'
          ? 'image/svg+xml'
          : ext === '.mp4'
            ? 'video/mp4'
            : 'application/octet-stream';

  // Storage path: section/filename
  const storagePath = `${section}/${fileName}`;

  // Check if already uploaded (by public_url pattern)
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/media_assets?storage_path=eq.${encodeURIComponent(storagePath)}&select=id`,
    {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: 'Bearer ' + SERVICE_KEY,
      },
    },
  );
  const checkData = await checkRes.json();
  if (checkData && checkData.length > 0) {
    console.log(`  ✓ EXISTS: ${storagePath}`);
    return 'exists';
  }

  // Upload to Storage
  const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${storagePath}`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': mimeType,
      'x-upsert': 'true',
    },
    body: fileBuffer,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    console.log(`  ✗ UPLOAD FAILED: ${storagePath} - ${errText.substring(0, 100)}`);
    return null;
  }

  // Get public URL
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;

  // Insert into media_assets
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/media_assets`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      section,
      filename: fileName,
      storage_path: storagePath,
      public_url: publicUrl,
      alt_text: altText,
      mime_type: mimeType,
      file_size: fileBuffer.length,
      uploaded_by: 'migration-script',
    }),
  });

  if (!insertRes.ok) {
    console.log(`  ✗ DB INSERT FAILED: ${storagePath}`);
    return null;
  }

  console.log(`  ✓ UPLOADED: ${storagePath} (${(fileBuffer.length / 1024).toFixed(1)} KB)`);
  return 'uploaded';
}

async function main() {
  console.log('='.repeat(60));
  console.log('  Media Migration: local files → Supabase Storage');
  console.log('='.repeat(60));
  console.log(`\nSupabase URL: ${SUPABASE_URL}`);
  console.log(`Files to process: ${MEDIA_FILES.length}\n`);

  let uploaded = 0;
  let existing = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of MEDIA_FILES) {
    const result = await uploadFile(item.path, item.section, item.alt);
    if (result === 'uploaded') uploaded++;
    else if (result === 'exists') existing++;
    else if (result === null) {
      // Check if it was a skip (file not found) or failure
      const fullPath = path.join(publicDir, item.path);
      if (!fs.existsSync(fullPath)) skipped++;
      else failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`  Migration Complete!`);
  console.log(`  Uploaded: ${uploaded}`);
  console.log(`  Already existed: ${existing}`);
  console.log(`  Skipped (not found): ${skipped}`);
  console.log(`  Failed: ${failed}`);
  console.log('='.repeat(60));

  // Print CDN URL for .env
  console.log('\n📝 Add this to your .env file:');
  console.log(`NEXT_PUBLIC_CDN_BASE_URL=${SUPABASE_URL}/storage/v1/object/public/media`);
  console.log('\nOr run: npm run set-cdn');
}

main().catch((e) => console.error('Migration error:', e));