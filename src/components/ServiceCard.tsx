import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/content';
import { SmartImage } from './SmartImage';
import { Icon } from './Icon';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
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
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" aria-hidden />
        <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gold shadow-navy">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-bold text-navy">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-light">
          {service.shortDescription}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}