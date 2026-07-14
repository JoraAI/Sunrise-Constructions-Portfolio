import type { Metadata } from 'next';
import { siteConfig } from './content';

/**
 * Central site configuration for SEO + metadata generation.
 * `siteConfig` is re-exported from content.ts for single-source-of-truth.
 */

const baseUrl = siteConfig.url;

interface BuildMetadataArgs {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * Build a fully-resolved Metadata object for a route, including
 * Open Graph + Twitter card tags, canonical URL, and keywords.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  keywords = [],
  type = 'website',
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image ?? `${baseUrl}/og/og-default.svg`;

  return {
    title,
    description,
    keywords: [
      'construction company',
      'commercial construction',
      'general contractor',
      'infrastructure',
      'design and build',
      'project management',
      ...keywords,
    ],
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_IN',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * JSON-LD structured data: Organization + GeneralContractor/LocalBusiness.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'GeneralContractor', 'LocalBusiness'],
    '@id': `${baseUrl}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    image: `${baseUrl}/og/og-default.svg`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    foundingDate: siteConfig.founded,
    slogan: siteConfig.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.addressLine1,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.state,
      postalCode: siteConfig.contact.pincode,
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'sales',
        email: siteConfig.contact.email,
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Tamil', 'Kannada'],
      },
    ],
    sameAs: siteConfig.socials.map((s) => s.href),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '320',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * JSON-LD: JobPosting schema for careers detail pages.
 */
export function jobPostingJsonLd(job: {
  title: string;
  description: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: siteConfig.name,
      sameAs: baseUrl,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'IN',
      },
    },
    employmentType: job.type,
    department: {
      '@type': 'Organization',
      name: job.department,
    },
    datePosted: job.postedDate,
    validThrough: new Date(
      new Date(job.postedDate).getTime() + 60 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    url: `${baseUrl}/careers/${job.slug}`,
  };
}

/**
 * JSON-LD: Article schema for blog posts.
 */
export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
  };
}

/**
 * JSON-LD: BreadcrumbList for sub-pages.
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}