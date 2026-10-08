import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { JsonLd } from '@/components/JsonLd';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/content';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  keywords: [
    'Sunrise Constructions',
    'Sunrise Group Nagpur',
    'construction company Nagpur',
    'construction company Maharashtra',
    'NHAI highway contractor',
    'bridge construction Nagpur',
    'irrigation construction Maharashtra',
    'infrastructure contractor India',
    'general contractor Nagpur',
    'design and build',
    'project management construction',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
    shortcut: '/images/favicon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if we're in the admin area — skip website chrome for those routes
  const headerList = headers();
  const pathname = headerList.get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased">
        {!isAdmin && <JsonLd data={organizationJsonLd()} />}
        {!isAdmin && <JsonLd data={websiteJsonLd()} />}
        {!isAdmin && (
          <>
            {/* Skip to content for accessibility */}
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
            >
              Skip to content
            </a>
            <Navbar />
          </>
        )}
        <main id="main">{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <ChatWidget />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
