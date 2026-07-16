import type { Project } from '@/types/content';
import { projects as defaultProjects } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';

export function FeaturedProjects({ projects = defaultProjects }: { projects?: Project[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="section bg-cream" aria-labelledby="projects-heading">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our Work"
            title={<span id="projects-heading">Projects that inspire</span>}
            description="A selection of landmark builds - each delivered with the scale, discipline, and craft our clients trust us with."
            align="left"
          />
          <Reveal delay={0.15}>
            <Link href="/projects" className="btn-outline group shrink-0">
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 4) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}