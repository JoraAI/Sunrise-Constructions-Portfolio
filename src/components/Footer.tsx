import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { footer, siteConfig } from '@/lib/content';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';

const socialIconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-gold via-amber to-gold" aria-hidden />

      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + description + newsletter */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {footer.description}
            </p>
            <p className="mt-4 font-heading text-lg font-semibold text-gold">
              {footer.tagline}
            </p>

            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                Newsletter
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Insights on engineering, sustainability, and project delivery - once a month.
              </p>
              <div className="mt-3 max-w-sm">
                <NewsletterForm variant="footer" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footer.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Contact Us
            </h3>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {siteConfig.contact.addressLine1},<br />
                  {siteConfig.contact.city}, {siteConfig.contact.state} {siteConfig.contact.pincode}
                </span>
              </li>
              {siteConfig.contact.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  <a href={siteConfig.contact.phoneHref} className="hover:text-gold">
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              {siteConfig.socials.map((s) => {
                const SocialIcon = socialIconMap[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10 bg-navy-950 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <p>© {year} {siteConfig.legalName} All rights reserved.</p>
            <ul className="flex items-center gap-5">
              {footer.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-white/40">
            Powered by{' '}
            <a
              href="https://jora.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold transition-colors hover:text-amber"
              aria-label="Jora AI- visit jora.co.in"
            >
              Jora AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}