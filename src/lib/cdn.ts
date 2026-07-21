/**
 * Resolves media paths to use CDN (if configured) or local paths.
 *
 * When NEXT_PUBLIC_CDN_BASE_URL is set, all paths are prefixed with the CDN URL
 * and remapped to match the Supabase Storage folder structure.
 * When empty, paths are returned as-is (local /images/, /videos/).
 */

/** Maps local file paths to Supabase Storage folder paths */
function mapToStoragePath(localPath: string): string {
  // Remove leading slash
  const path = localPath.replace(/^\//, '');

  // /videos/hero-X.mp4 → hero/hero-X.mp4
  if (path.startsWith('videos/hero-')) {
    return 'hero/' + path.replace('videos/', '');
  }
  // /images/hero-poster-X.jpg → hero/hero-poster-X.jpg
  if (path.startsWith('images/hero-poster-')) {
    return 'hero/' + path.replace('images/', '');
  }
  // /images/projects/ → projects/
  if (path.startsWith('images/projects/')) {
    return path.replace('images/', '');
  }
  // /images/project-X.svg → projects/project-X.svg
  if (path.startsWith('images/project-')) {
    return 'projects/' + path.replace('images/', '');
  }
  // /images/service-X.svg → services/service-X.svg
  if (path.startsWith('images/service-')) {
    return 'services/' + path.replace('images/', '');
  }
  // /images/services/ → services/
  if (path.startsWith('images/services/')) {
    return path.replace('images/', '');
  }
  // /images/industry-X.svg → industries/industry-X.svg
  if (path.startsWith('images/industry-')) {
    return 'industries/' + path.replace('images/', '');
  }
  // /images/industries/ → industries/
  if (path.startsWith('images/industries/')) {
    return path.replace('images/', '');
  }
  // /images/team-X.svg → team/team-X.svg
  if (path.startsWith('images/team-')) {
    return 'team/' + path.replace('images/', '');
  }
  // /images/testimonial-X.svg → testimonials/testimonial-X.svg
  if (path.startsWith('images/testimonial-')) {
    return 'testimonials/' + path.replace('images/', '');
  }
  // /images/blog-X.svg → blog/blog-X.svg
  if (path.startsWith('images/blog-')) {
    return 'blog/' + path.replace('images/', '');
  }
  // /images/about-building.svg → about/about-building.svg
  if (path.startsWith('images/about-')) {
    return 'about/' + path.replace('images/', '');
  }
  // /images/life-X.svg → careers/life-X.svg
  if (path.startsWith('images/life-')) {
    return 'careers/' + path.replace('images/', '');
  }
  // /images/employee-X.svg → careers/employee-X.svg
  if (path.startsWith('images/employee-')) {
    return 'careers/' + path.replace('images/', '');
  }
  // /images/clients/ → clients/
  if (path.startsWith('images/clients/')) {
    return path.replace('images/', '');
  }

  // Default: just strip the /images/ or /videos/ prefix
  return path.replace(/^(images|videos)\//, '');
}

export function mediaUrl(path: string): string {
  // If it's already a full URL (http/https), return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cdnBase = process.env.NEXT_PUBLIC_CDN_BASE_URL || '';

  // If CDN is not configured, return local path as-is
  if (!cdnBase) {
    return path;
  }

  // Map local path → Storage folder path, then combine with CDN base
  const storagePath = mapToStoragePath(path);
  const base = cdnBase.replace(/\/$/, '');
  return `${base}/${storagePath}`;
}