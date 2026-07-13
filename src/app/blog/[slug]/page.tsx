import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { SmartImage } from '@/components/SmartImage';
import { buildMetadata, breadcrumbJsonLd, articleJsonLd } from '@/lib/seo';
import { blogPosts } from '@/lib/content';
import { formatDate, truncate } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: post.tags,
    type: 'article',
  });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: truncate(post.title, 30) },
        ]}
      />

      {/* Meta */}
      <section className="bg-white pb-4 pt-8">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-muted">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              {post.readingTime}
            </span>
            <span className="text-navy">By {post.author}, {post.authorRole}</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-white pb-10">
        <div className="container-page">
          <Reveal>
            <SmartImage
              src={post.image}
              alt={post.alt}
              aspect="aspect-[21/9]"
              className="rounded-2xl shadow-navy-lg"
              sizes="100vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white pb-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal delay={0.1}>
              <p className="font-heading text-xl font-medium leading-relaxed text-navy lg:text-2xl">
                {post.excerpt}
              </p>
            </Reveal>

            <div className="mt-8 space-y-6">
              {post.content.map((para, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <p className="text-base leading-relaxed text-charcoal-light lg:text-lg">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-gold" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-10 border-t border-navy/10 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-amber"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section bg-cream">
          <div className="container-page">
            <h2 className="mb-10 text-center font-heading text-2xl font-bold text-navy">
              Keep reading
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((relPost, i) => (
                <Reveal key={relPost.slug} delay={i * 0.1}>
                  <Link
                    href={`/blog/${relPost.slug}`}
                    className="card card-hover group flex h-full overflow-hidden"
                  >
                    <SmartImage
                      src={relPost.image}
                      alt={relPost.alt}
                      aspect="aspect-[16/9]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <span className="mb-2 inline-flex w-fit rounded-full bg-gold/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gold">
                        {relPost.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-navy">
                        {truncate(relPost.title, 70)}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Structured data */}
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          excerpt: post.excerpt,
          author: post.author,
          date: post.date,
          slug: post.slug,
          image: post.image,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: truncate(post.title, 30), path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}