import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { JsonLd } from '@/components/JsonLd';
import { organizationJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/content';

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
    'construction company India',
    'commercial construction',
    'residential construction',
    'industrial construction',
    'infrastructure',
    'design and build',
    'project management',
    'Bengaluru construction',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og/og-default.svg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og/og-default.svg'],
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
      </body>
    </html>
  );
}
