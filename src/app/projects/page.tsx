export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { CTABand } from '@/components/CTABand';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/SectionHeading';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { loadProjects } from '@/lib/content-loader';

export const metadata: Metadata = buildMetadata({
  title: 'Projects - Landmark Construction Portfolio',
  description:
    'Explore our portfolio of landmark commercial, residential, industrial, healthcare, and infrastructure projects delivered across India.',
  path: '/projects',
  keywords: [
    'construction projects India',
    'commercial buildings',
    'residential towers',
    'infrastructure projects',
    'project portfolio',
  ],
});

export default async function ProjectsPage() {
  const projects = await loadProjects();
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <>
      <PageHeader
        eyebrow="Our Portfolio"
        title={
          <>
            Projects that <span className="text-gradient-gold">quality engineering</span>
          </>
        }
        description="A selection of landmark builds - each delivered with the scale, discipline, and craft our clients trust us with."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />

      {categories.map((category, ci) => {
        const categoryProjects = projects.filter((p) => p.category === category);
        return (
          <section key={category} className={ci % 2 === 0 ? 'section bg-white' : 'section bg-cream'}>
            <div className="container-page">
              <SectionHeading
                eyebrow={category}
                title={`${category} projects`}
                align="left"
              />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProjects.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 0.08}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTABand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
    </>
  );
}