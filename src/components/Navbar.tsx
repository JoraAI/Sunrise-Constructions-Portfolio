'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Mail, Menu, X, Linkedin, Twitter, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { navLinks, utilityBar } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

const socialIconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div
        className={cn(
          'hidden border-b border-white/10 bg-navy text-white/80 transition-all duration-300 lg:block',
          scrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-12 opacity-100',
        )}
      >
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href={utilityBar.phoneHref} className="flex items-center gap-2 hover:text-gold">
              <Phone className="h-3.5 w-3.5 text-gold" />
              {utilityBar.phone}
            </a>
            <a
              href={`mailto:${utilityBar.email}`}
              className="flex items-center gap-2 hover:text-gold"
            >
              <Mail className="h-3.5 w-3.5 text-gold" />
              {utilityBar.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40">Follow us</span>
            {utilityBar.socials.map((s) => {
              const SocialIcon = socialIconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/60 transition-colors hover:text-gold"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'bg-navy shadow-navy'
            : 'bg-gradient-to-b from-navy/70 to-transparent',
        )}
        aria-label="Primary"
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Logo variant="light" />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative text-sm font-semibold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-gold after:transition-all',
                    isActive(link.href)
                      ? 'text-white after:w-full'
                      : 'text-white/70 hover:text-white after:w-0 hover:after:w-full',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 xl:flex">
            <Link href="/contact-us" className="btn-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 bg-navy/95 backdrop-blur-md xl:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block border-b border-white/10 py-4 font-heading text-2xl font-bold transition-colors',
                        isActive(link.href) ? 'text-gold' : 'text-white hover:text-gold',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4">
                <Link href="/contact-us" className="btn-primary w-full">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex flex-col gap-2 text-sm text-white/70">
                  <a href={utilityBar.phoneHref} className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gold" /> {utilityBar.phone}
                  </a>
                  <a href={`mailto:${utilityBar.email}`} className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gold" /> {utilityBar.email}
                  </a>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  {utilityBar.socials.map((s) => {
                    const SocialIcon = socialIconMap[s.icon];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="text-white/60 hover:text-gold"
                      >
                        <SocialIcon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}