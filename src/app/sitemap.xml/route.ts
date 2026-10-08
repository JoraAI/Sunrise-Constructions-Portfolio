import { siteConfig, services, industries, projects, blogPosts, jobListings } from '@/lib/content';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toIsoDate(input: string | Date): string {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

function buildEntries(): SitemapEntry[] {
  const base = siteConfig.url.replace(/\/$/, '');
  const now = toIsoDate(new Date());

  const staticRoutes: SitemapEntry[] = [
    { loc: `${base}/`, lastmod: now, changefreq: 'weekly', priority: '1.0' },
    { loc: `${base}/about-us`, lastmod: now, changefreq: 'monthly', priority: '0.9' },
    { loc: `${base}/services`, lastmod: now, changefreq: 'monthly', priority: '0.9' },
    { loc: `${base}/projects`, lastmod: now, changefreq: 'weekly', priority: '0.9' },
    { loc: `${base}/industries`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${base}/careers`, lastmod: now, changefreq: 'weekly', priority: '0.8' },
    { loc: `${base}/blog`, lastmod: now, changefreq: 'weekly', priority: '0.8' },
    { loc: `${base}/contact-us`, lastmod: now, changefreq: 'yearly', priority: '0.7' },
  ];

  const serviceRoutes = services.map((s) => ({
    loc: `${base}/services/${s.slug}`,
    lastmod: now,
    changefreq: 'monthly' as const,
    priority: '0.7',
  }));

  const projectRoutes = projects.map((p) => ({
    loc: `${base}/projects/${p.slug}`,
    lastmod: now,
    changefreq: 'monthly' as const,
    priority: '0.7',
  }));

  const industryRoutes = industries.map((i) => ({
    loc: `${base}/industries/${i.slug}`,
    lastmod: now,
    changefreq: 'monthly' as const,
    priority: '0.7',
  }));

  const careerRoutes = jobListings.map((j) => ({
    loc: `${base}/careers/${j.slug}`,
    lastmod: toIsoDate(j.postedDate),
    changefreq: 'monthly' as const,
    priority: '0.6',
  }));

  const blogRoutes = blogPosts.map((p) => ({
    loc: `${base}/blog/${p.slug}`,
    lastmod: toIsoDate(p.date),
    changefreq: 'monthly' as const,
    priority: '0.6',
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...industryRoutes,
    ...careerRoutes,
    ...blogRoutes,
  ];
}

function renderSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function GET() {
  const xml = renderSitemap(buildEntries());

  return new Response(xml, {
    status: 200,
    headers: {
      // Google Search Console is pickiest about charset + XML mime
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
