import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import type { Service } from '@/types/content';
import { SmartImage } from './SmartImage';
import { Icon } from './Icon';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  // Show up to 3 key deliverables as quick highlights
  const highlights = service.keyDeliverables.slice(0, 3);
  // Show the first stat as a highlight badge
  const heroStat = service.stats?.[0];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="card card-hover group flex flex-col overflow-hidden"
      aria-label={`Read more about ${service.title}`}
    >
      {/* Image with icon overlay */}
      <div className="relative">
        <SmartImage
          src={service.image}
          alt={service.alt}
          aspect="aspect-[16/10]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" aria-hidden />
        <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gold shadow-navy">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        {heroStat && (
          <div className="absolute bottom-4 right-4 rounded-xl bg-navy/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-heading text-lg font-extrabold text-gold">{heroStat.value}</span>
            <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">{heroStat.label}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-bold text-navy">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-light line-clamp-2">
          {service.shortDescription}
        </p>

        {/* Key highlights */}
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
          Explore Service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}