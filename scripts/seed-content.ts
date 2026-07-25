/**
 * Seeds all content tables in Supabase from the single source of truth
 * (src/lib/content.ts). Run AFTER database-setup.sql has been executed.
 *
 * Usage:
 *   npm run seed-content            # seed only if a table is empty
 *   npm run seed-content -- --force # truncate each table before inserting
 *   npm run seed-content -- --only=services,blog
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  projects,
  services,
  industries,
  team,
  testimonials,
  blogPosts,
  jobListings,
  stats,
  aboutSection,
  missionVisionValues,
  processSteps,
  heroContent,
} from '../src/lib/content';

type Json = unknown;

// ---------------------------------------------------------------------------
// .env loader (Node doesn't auto-load .env)
// ---------------------------------------------------------------------------
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
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
  console.error(
    'Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env',
  );
  process.exit(1);
}

const REST = `${SUPABASE_URL}/rest/v1`;

const headers = {
  apikey: SERVICE_KEY,
  Authorization: 'Bearer ' + SERVICE_KEY,
  'Content-Type': 'application/json',
};

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const FORCE = argv.includes('--force');
const onlyArg = argv.find((a) => a.startsWith('--only='));
const ONLY: string[] | null = onlyArg
  ? onlyArg.split('=')[1].split(',').map((s) => s.trim())
  : null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Truncate a table before seeding. Uses the service role key (bypasses RLS).
 * The `cascade` query param also removes dependent rows in related tables.
 */
async function truncateTable(table: string): Promise<void> {
  // PostgREST requires a WHERE clause on DELETE (safety guard).
  // `id=not.is.null` matches every row, so it deletes all of them.
  const res = await fetch(`${REST}/${table}?id=not.is.null`, {
    method: 'DELETE',
    headers: { ...headers, Prefer: 'return=minimal' },
  });
  if (!res.ok) {
    const err = await res.text();
    console.log(`  ! could not clear ${table}: ${err.substring(0, 120)}`);
  } else {
    console.log(`  ↻ cleared ${table}`);
  }
}

async function seedTable<T extends Record<string, Json>>(
  table: string,
  rows: T[],
  key: string,
): Promise<number> {
  if (ONLY && !ONLY.includes(key)) {
    console.log(`  ${table}: skipped (--only)`);
    return 0;
  }

  if (!rows || rows.length === 0) {
    console.log(`  ${table}: no data, skipping`);
    return 0;
  }

  if (FORCE) {
    await truncateTable(table);
  } else {
    // Skip if the table already has rows.
    const checkRes = await fetch(
      `${REST}/${table}?select=id&limit=1`,
      { headers: { ...headers, Prefer: 'return=minimal' } },
    );
    const checkData = await checkRes.json();
    if (Array.isArray(checkData) && checkData.length > 0) {
      console.log(`  ${table}: already has data, skipping (use --force to override)`);
      return 0;
    }
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

const j = (value: Json): string => JSON.stringify(value ?? []);

// ---------------------------------------------------------------------------
// Mappers: src/lib/content.ts (camelCase) → DB rows (snake_case + JSON strings)
// ---------------------------------------------------------------------------

function projectsToRows() {
  return projects.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    location: p.location,
    year: p.year,
    client: p.client,
    metric: p.metric,
    image: p.image,
    alt: p.alt,
    featured: p.featured,
    gallery: j(p.gallery),
    summary: p.summary,
    overview: p.overview,
    scope: j(p.scope),
    metrics: j(p.metrics),
    sort_order: i + 1,
  }));
}

function servicesToRows() {
  return services.map((s, i) => ({
    slug: s.slug,
    title: s.title,
    short_description: s.shortDescription,
    icon: s.icon,
    image: s.image,
    alt: s.alt,
    overview: s.overview,
    key_deliverables: j(s.keyDeliverables),
    process: j(s.process),
    // Rich content (now backed by dedicated DB columns).
    gallery: j(s.gallery),
    capabilities: j(s.capabilities),
    stats: j(s.stats),
    faqs: j(s.faqs),
    sort_order: i + 1,
  }));
}

function industriesToRows() {
  return industries.map((it, i) => ({
    slug: it.slug,
    title: it.title,
    short_description: it.shortDescription,
    icon: it.icon,
    image: it.image,
    alt: it.alt,
    overview: it.overview,
    capabilities: j(it.capabilities),
    metrics: j(it.metrics),
    sort_order: i + 1,
  }));
}

function teamToRows() {
  return team.map((m, i) => ({
    name: m.name,
    title: m.title,
    bio: m.bio,
    image: m.image,
    alt: m.alt,
    linkedin: m.linkedin ?? '',
    sort_order: i + 1,
  }));
}

function testimonialsToRows() {
  return testimonials.map((t, i) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    company: t.company,
    project: t.project,
    rating: t.rating,
    image: t.image,
    alt: t.alt,
    sort_order: i + 1,
  }));
}

function blogToRows() {
  return blogPosts.map((b, i) => ({
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    author: b.author,
    author_role: b.authorRole,
    date: b.date,
    reading_time: b.readingTime,
    image: b.image,
    alt: b.alt,
    tags: j(b.tags),
    content: j(b.content),
    published: true,
    sort_order: i + 1,
  }));
}

function jobsToRows() {
  return jobListings.map((job, i) => ({
    slug: job.slug,
    title: job.title,
    department: job.department,
    location: job.location,
    employment_type: job.type,
    description: job.description,
    responsibilities: j(job.responsibilities),
    requirements: j(job.requirements),
    qualifications: j(job.qualifications),
    nice_to_have: j(job.niceToHave),
    experience: job.experience,
    posted_date: job.postedDate,
    active: true,
    sort_order: i + 1,
  }));
}

function siteSettingsRow() {
  return {
    id: 'singleton',
    stats: j(stats),
    about_heading: aboutSection.heading,
    about_body: j(aboutSection.body),
    about_image: aboutSection.image,
    about_image_alt: aboutSection.imageAlt,
    mission: missionVisionValues.find((m) => m.id === 'mission')?.description ?? '',
    vision: missionVisionValues.find((m) => m.id === 'vision')?.description ?? '',
    values: missionVisionValues.find((m) => m.id === 'values')?.description ?? '',
    process_steps: j(
      processSteps.map((p) => ({
        id: p.id,
        step: p.step,
        title: p.title,
        description: p.description,
        icon: p.icon,
      })),
    ),
    hero_eyebrow: heroContent.eyebrow,
    hero_headline: heroContent.headline,
    hero_headline_accent: heroContent.headlineAccent,
    hero_subheadline: heroContent.subheadline,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('='.repeat(60));
  console.log('  Content Seed: src/lib/content.ts → Supabase DB');
  console.log('='.repeat(60));
  console.log(`Supabase URL: ${SUPABASE_URL}`);
  console.log(`Mode: ${FORCE ? 'FORCE (truncate before insert)' : 'skip-if-not-empty'}`);
  if (ONLY) console.log(`Only: ${ONLY.join(', ')}`);
  console.log();

  let total = 0;

  console.log('Projects:');
  total += await seedTable('content_projects', projectsToRows(), 'projects');

  console.log('Services:');
  total += await seedTable('content_services', servicesToRows(), 'services');

  console.log('Industries:');
  total += await seedTable('content_industries', industriesToRows(), 'industries');

  console.log('Team:');
  total += await seedTable('content_team', teamToRows(), 'team');

  console.log('Testimonials:');
  total += await seedTable('content_testimonials', testimonialsToRows(), 'testimonials');

  console.log('Blog Posts:');
  total += await seedTable('content_blog_posts', blogToRows(), 'blog');

  console.log('Job Listings:');
  total += await seedTable('content_job_listings', jobsToRows(), 'jobs');

  // Site settings — single-row table, upsert.
  console.log('Site Settings:');
  if (ONLY && !ONLY.includes('settings')) {
    console.log('  content_site_settings: skipped (--only)');
  } else {
    const row = siteSettingsRow();
    const res = await fetch(`${REST}/content_site_settings`, {
      method: 'POST',
      headers: {
        ...headers,
        Prefer: 'return=minimal,resolution=merge-duplicates',
      },
      body: JSON.stringify(row),
    });
    if (res.ok) {
      console.log('  ✓ content_site_settings: upserted');
      total += 1;
    } else {
      const err = await res.text();
      console.log(`  ✗ content_site_settings: ${err.substring(0, 150)}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`  Seed Complete! ${total} total rows inserted/upserted.`);
  console.log('='.repeat(60));
}

// Entrypoint guard: run main() only when executed directly via `tsx scripts/seed-content.ts`.
const entryPath = process.argv[1];
if (entryPath && import.meta.url === pathToFileURL(path.resolve(entryPath)).href) {
  main().catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  });
}
