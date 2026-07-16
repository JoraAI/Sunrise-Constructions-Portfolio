export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { SmartImage } from '@/components/SmartImage';
import { CTABand } from '@/components/CTABand';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { loadBlogPosts } from '@/lib/content-loader';
import { formatDate, truncate } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Blog - Construction Insights & Industry News',
  description:
    'Engineering perspectives, sustainability insights, and project delivery expertise from the Sunrise Constructions leadership team.',
  path: '/blog',
  keywords: [
    'construction blog',
    'construction insights India',
    'sustainable construction',
    'BIM construction',
    'construction safety',
  ],
});

export default async function BlogPage() {
  const blogPosts = await loadBlogPosts();
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHeader
        eyebrow="Insights & News"
        title={
          <>
            From the <span className="text-gradient-gold">Sunrise blog</span>
          </>
        }
        description="Engineering perspectives, sustainability insights, and project delivery expertise from our leadership team."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="section bg-white">
        <div className="container-page">
          {/* Featured post */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="card card-hover group grid overflow-hidden lg:grid-cols-2"
            >
              <SmartImage
                src={featured.image}
                alt={featured.alt}
                aspect="aspect-[16/10] lg:aspect-auto lg:h-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <span className="mb-3 inline-flex w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold">
                  Featured · {featured.category}
                </span>
                <h2 className="font-heading text-2xl font-bold text-navy lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-charcoal-light">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-charcoal-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(featured.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readingTime}
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Remaining posts */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card card-hover group flex h-full flex-col overflow-hidden"
                >
                  <SmartImage
                    src={post.image}
                    alt={post.alt}
                    aspect="aspect-[16/9]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 inline-flex w-fit rounded-full bg-gold/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gold">
                      {post.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold leading-snug text-navy">
                      {truncate(post.title, 70)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-charcoal-light">
                      {truncate(post.excerpt, 110)}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-charcoal-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
    </>
  );
}