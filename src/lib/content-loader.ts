import { getServerSupabase } from './supabase';
import type { Project, Service, Industry, TeamMember, Testimonial, BlogPost, JobListing } from '@/types/content';
import {
  projects as defaultProjects,
  services as defaultServices,
  industries as defaultIndustries,
  team as defaultTeam,
  testimonials as defaultTestimonials,
  blogPosts as defaultBlogPosts,
  jobListings as defaultJobListings,
} from './content';

/**
 * Content Loader — Fetches content from Supabase DB with automatic
 * fallback to content.ts defaults if DB is unavailable or empty.
 */

function parseJson<T>(value: unknown, fallback: T): T {
  if (!value) return fallback;
  if (typeof value === 'string') {
    try { return JSON.parse(value) as T; } catch { return fallback; }
  }
  return value as T;
}

function str(v: unknown): string {
  return (typeof v === 'string') ? v : String(v ?? '');
}

function num(v: unknown, dft = 0): number {
  return typeof v === 'number' ? v : (typeof v === 'string' ? parseInt(v) || dft : dft);
}

function bool(v: unknown): boolean {
  return v === true || v === 'true' || v === 1 || v === '1';
}

export async function loadProjects(): Promise<Project[]> {
  try {
    const s = getServerSupabase();
    const { data, error } = await s.from('content_projects').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultProjects;
    return data.map((p: Record<string, unknown>) => ({
      slug: str(p.slug), title: str(p.title), category: str(p.category) || 'Infrastructure',
      location: str(p.location), year: str(p.year), client: str(p.client),
      metric: str(p.metric), image: str(p.image), alt: str(p.alt) || str(p.title),
      featured: bool(p.featured), gallery: parseJson(p.gallery, []),
      summary: str(p.summary), overview: str(p.overview),
      scope: parseJson(p.scope, []), metrics: parseJson(p.metrics, []),
    })) as Project[];
  } catch { return defaultProjects; }
}

export async function loadProjectBySlug(slug: string): Promise<Project | null> {
  return (await loadProjects()).find((p) => p.slug === slug) || null;
}

export async function loadServices(): Promise<Service[]> {
  try {
    const s = getServerSupabase();
    const { data, error } = await s.from('content_services').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultServices;
    return data.map((sv: Record<string, unknown>) => {
      const slug = str(sv.slug);
      // Fall back to content.ts for legacy DBs that lack the rich columns,
      // otherwise prefer whatever the DB row provides.
      const defaultSvc = defaultServices.find((d) => d.slug === slug);
      return {
        slug,
        title: str(sv.title),
        shortDescription: str(sv.short_description),
        icon: str(sv.icon) || 'hard-hat',
        image: str(sv.image),
        alt: str(sv.alt) || str(sv.title),
        overview: str(sv.overview),
        keyDeliverables: parseJson(sv.key_deliverables, defaultSvc?.keyDeliverables || []),
        process: parseJson(sv.process, defaultSvc?.process || []),
        gallery: sv.gallery ? parseJson(sv.gallery, undefined) : defaultSvc?.gallery,
        capabilities: sv.capabilities ? parseJson(sv.capabilities, undefined) : defaultSvc?.capabilities,
        stats: sv.stats ? parseJson(sv.stats, undefined) : defaultSvc?.stats,
        faqs: sv.faqs ? parseJson(sv.faqs, undefined) : defaultSvc?.faqs,
      } as Service;
    });
  } catch { return defaultServices; }
}

export async function loadServiceBySlug(slug: string): Promise<Service | null> {
  return (await loadServices()).find((s) => s.slug === slug) || null;
}

export async function loadIndustries(): Promise<Industry[]> {
  try {
    const s = getServerSupabase();
    const { data, error } = await s.from('content_industries').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultIndustries;
    return data.map((i: Record<string, unknown>) => ({
      slug: str(i.slug), title: str(i.title), shortDescription: str(i.short_description),
      icon: str(i.icon) || 'briefcase', image: str(i.image), alt: str(i.alt) || str(i.title),
      overview: str(i.overview), capabilities: parseJson(i.capabilities, []),
      metrics: parseJson(i.metrics, []),
    })) as Industry[];
  } catch { return defaultIndustries; }
}

export async function loadIndustryBySlug(slug: string): Promise<Industry | null> {
  return (await loadIndustries()).find((i) => i.slug === slug) || null;
}

export async function loadTeam(): Promise<TeamMember[]> {
  try {
    const s = getServerSupabase();
    const { data, error } = await s.from('content_team').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultTeam;
    return data.map((m: Record<string, unknown>) => ({
      id: str(m.id), name: str(m.name), title: str(m.title), bio: str(m.bio),
      image: str(m.image), alt: str(m.alt) || str(m.name), linkedin: str(m.linkedin),
    }));
  } catch { return defaultTeam; }
}

export async function loadTestimonials(): Promise<Testimonial[]> {
  try {
    const s = getServerSupabase();
    const { data, error } = await s.from('content_testimonials').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultTestimonials;
    return data.map((t: Record<string, unknown>) => ({
      id: str(t.id), quote: str(t.quote), name: str(t.name), role: str(t.role),
      company: str(t.company), project: str(t.project), rating: num(t.rating, 5),
      image: str(t.image), alt: str(t.alt) || str(t.name),
    }));
  } catch { return defaultTestimonials; }
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    const s = getServerSupabase();
    const { data, error } = await s.from('content_blog_posts').select('*').eq('published', true).order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultBlogPosts;
    return data.map((b: Record<string, unknown>) => ({
      slug: str(b.slug), title: str(b.title), excerpt: str(b.excerpt), category: str(b.category) || 'General',
      author: str(b.author), authorRole: str(b.author_role), date: str(b.date),
      readingTime: str(b.reading_time) || '5 min read', image: str(b.image), alt: str(b.alt) || str(b.title),
      tags: parseJson(b.tags, []), content: parseJson(b.content, []),
    }));
  } catch { return defaultBlogPosts; }
}

export async function loadBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await loadBlogPosts()).find((p) => p.slug === slug) || null;
}

export async function loadJobListings(): Promise<JobListing[]> {
  try {
    const s = getServerSupabase();
    const { data, error } = await s.from('content_job_listings').select('*').eq('active', true).order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultJobListings;
    return data.map((j: Record<string, unknown>) => ({
      slug: str(j.slug),
      title: str(j.title),
      department: str(j.department) || 'Engineering',
      location: str(j.location) || 'Nagpur',
      type: str(j.employment_type) || 'Full-time',
      experience: str(j.experience),
      postedDate: str(j.posted_date),
      summary: str(j.summary || j.description),
      description: str(j.description),
      responsibilities: parseJson(j.responsibilities, []),
      requirements: parseJson(j.requirements, []),
      qualifications: parseJson(j.qualifications, []),
      niceToHave: parseJson(j.nice_to_have, []),
    })) as JobListing[];
  } catch { return defaultJobListings; }
}

export async function loadJobBySlug(slug: string): Promise<JobListing | null> {
  return (await loadJobListings()).find((j) => j.slug === slug) || null;
}