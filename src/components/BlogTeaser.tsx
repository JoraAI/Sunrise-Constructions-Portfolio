import type { BlogPost } from '@/types/content';
import { blogPosts as defaultBlogPosts } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';
import { Reveal } from './Reveal';
import { formatDate, truncate } from '@/lib/utils';

export function BlogTeaser({ posts = defaultBlogPosts }: { posts?: BlogPost[] }) {
  const latest = posts.slice(0, 3);

  return (
    <section className="section bg-white" aria-labelledby="blog-heading">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Insights & News"
            title={<span id="blog-heading">From our blog</span>}
            description="Engineering perspectives, sustainability insights, and project delivery expertise from our leadership team."
            align="left"
          />
          <Reveal delay={0.15}>
            <Link href="/blog" className="btn-outline group shrink-0">
              View All Articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
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
  );
}