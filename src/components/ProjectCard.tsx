import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '@/types/content';
import { SmartImage } from './SmartImage';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card card-hover group flex flex-col overflow-hidden"
      aria-label={`View ${project.title} project details`}
    >
      <div className="relative">
        <SmartImage
          src={project.image}
          alt={project.alt}
          aspect="aspect-[16/11]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" aria-hidden />

        {/* Category tag */}
        <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
          {project.category}
        </span>

        {/* Hover arrow */}
        <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>

        {/* Metric */}
        <p className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-white">
          {project.metric}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold text-navy">{project.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-charcoal-muted">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {project.location}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-light">
          {project.summary}
        </p>
      </div>
    </Link>
  );
}