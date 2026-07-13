import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { ContactForm } from '@/components/ContactForm';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { siteConfig, offices } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us - Request a Quote',
  description:
    'Get in touch with Sunrise Constructions. Call +91 712 4567 890, email hello@sunriseconstructions.in, or submit your project details for a quote.',
  path: '/contact-us',
  keywords: [
    'contact construction company',
    'request a quote construction',
    'construction company Nagpur',
    'construction enquiry Maharashtra',
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title={
          <>
            {"Let's build something "}<span className="text-gradient-gold">great together</span>
          </>
        }
        description="Tell us about your project and our team will respond within one business day. For urgent enquiries, call us directly."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-navy">Contact details</h2>
              <p className="mt-3 text-charcoal-light">
                Reach us through any of the channels below, or visit one of our offices across India.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Phone</p>
                    <a href={siteConfig.contact.phoneHref} className="font-heading font-bold text-navy hover:text-gold">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Email</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="font-heading font-bold text-navy hover:text-gold">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Head Office</p>
                    <p className="font-heading font-bold text-navy">
                      {siteConfig.contact.addressLine1},<br />
                      {siteConfig.contact.city}, {siteConfig.contact.state} {siteConfig.contact.pincode}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Working Hours</p>
                    <p className="font-heading font-bold text-navy">{siteConfig.contact.hours}</p>
                  </div>
                </li>
              </ul>

              {/* Map placeholder */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-navy/10 bg-navy-50">
                <div className="flex aspect-[4/3] items-center justify-center bg-navy-grid">
                  <div className="text-center">
                    <MapPin className="mx-auto h-10 w-10 text-gold" />
                    <p className="mt-2 text-sm font-semibold text-navy">Interactive Map</p>
                    <p className="text-xs text-charcoal-muted">Sitabuldi Main Road, Nagpur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal direction="left">
                <h2 className="mb-6 font-heading text-2xl font-bold text-navy">Request a quote</h2>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="section bg-cream">
        <div className="container-page">
          <h2 className="text-center font-heading text-2xl font-bold text-navy">Our offices</h2>
          <p className="mt-3 text-center text-charcoal-light">
            Five offices across Maharashtra, serving clients statewide.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, i) => (
              <Reveal key={office.id} delay={(i % 3) * 0.1}>
                <div className="card h-full p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gold" />
                    <h3 className="font-heading text-base font-bold text-navy">{office.name}</h3>
                    {office.isHQ && (
                      <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-bold text-gold">HQ</span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal-light">{office.address}</p>
                  <div className="mt-4 space-y-1 border-t border-navy/5 pt-4">
                    <p className="text-sm text-charcoal-muted">{office.phone}</p>
                    <a href={`mailto:${office.email}`} className="text-sm text-gold hover:underline">
                      {office.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact-us' },
        ])}
      />
    </>
  );
}