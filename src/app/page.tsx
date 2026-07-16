import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { AboutSection } from '@/components/AboutSection';
import { MissionVisionValues } from '@/components/MissionVisionValues';
import { ServicesSection } from '@/components/ServicesSection';
import { IndustriesGrid } from '@/components/IndustriesGrid';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { CredibilityBand } from '@/components/CredibilityBand';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { TeamGrid } from '@/components/TeamGrid';
import { CareersTeaser } from '@/components/CareersTeaser';
import { BlogTeaser } from '@/components/BlogTeaser';
import { CTABand } from '@/components/CTABand';
import {
  loadServices,
  loadProjects,
  loadIndustries,
  loadTestimonials,
  loadTeam,
  loadBlogPosts,
} from '@/lib/content-loader';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch all content from DB (with fallback to content.ts)
  const [services, projects, industries, testimonials, team, blogPosts] =
    await Promise.all([
      loadServices(),
      loadProjects(),
      loadIndustries(),
      loadTestimonials(),
      loadTeam(),
      loadBlogPosts(),
    ]);

  return (
    <>
      {/* 1-2. Navbar + Hero with VideoSlideshow */}
      <Hero />
      {/* 3. Stats Bar */}
      <StatsBar />
      {/* 4. About Us */}
      <AboutSection />
      {/* 5. Mission / Vision / Values */}
      <MissionVisionValues />
      {/* 6. Services */}
      <ServicesSection services={services} />
      {/* 7. Industries */}
      <IndustriesGrid industries={industries} />
      {/* 8. Featured Projects */}
      <FeaturedProjects projects={projects} />
      {/* 9. Credibility Band */}
      <CredibilityBand />
      {/* 10. Process Timeline */}
      <ProcessTimeline />
      {/* 11. Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />
      {/* 12. Leadership Team */}
      <TeamGrid team={team} />
      {/* 13. Careers Teaser */}
      <CareersTeaser />
      {/* 14. Blog Teaser */}
      <BlogTeaser posts={blogPosts} />
      {/* 15. CTA Band */}
      <CTABand />
    </>
  );
}