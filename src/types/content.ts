/**
 * Centralized TypeScript interfaces for all site content.
 * These shapes are implemented in `src/lib/content.ts`.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  mapUrl: string;
  hours: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube';
}

export interface UtilityBarContent {
  phone: string;
  phoneHref: string;
  email: string;
  socials: SocialLink[];
}

export interface Stat {
  id: string;
  icon: 'calendar' | 'building' | 'users' | 'smile' | 'shield' | 'indian-rupee';
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  isTextStat?: boolean;
  textValue?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: 'check' | 'clock' | 'leaf' | 'star';
}

export interface MissionVisionValue {
  id: string;
  icon: 'target' | 'eye' | 'gem';
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: 'hard-hat' | 'clipboard' | 'pencil-ruler' | 'wrench' | 'leaf';
  image: string;
  alt: string;
  overview: string;
  keyDeliverables: string[];
  process: string[];
}

export interface Industry {
  slug: string;
  title: string;
  shortDescription: string;
  icon: 'briefcase' | 'home' | 'factory' | 'heart-pulse' | 'graduation-cap' | 'bed' | 'road';
  image: string;
  alt: string;
  overview: string;
  capabilities: string[];
  metrics: { value: string; label: string }[];
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  client: string;
  metric: string;
  image: string;
  alt: string;
  featured: boolean;
  gallery: string[];
  summary: string;
  overview: string;
  scope: string[];
  metrics: ProjectMetric[];
  testimonial?: string;
  testimonialAuthor?: string;
}

export interface Certification {
  name: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  project: string;
  rating: number;
  image: string;
  alt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  alt: string;
  linkedin?: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: 'message-square' | 'pencil-ruler' | 'file-check' | 'hard-hat' | 'shield-check' | 'key';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  image: string;
  alt: string;
  content: string[];
  tags: string[];
}

export interface JobListing {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  postedDate: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  qualifications?: string[];
}

export interface JobPerk {
  id: string;
  title: string;
  description: string;
  icon: 'heart' | 'trending-up' | 'shield' | 'banknote' | 'layers' | 'calendar';
}

export interface CareerStat {
  id: string;
  value: string;
  label: string;
  icon: 'users' | 'clock' | 'map-pin' | 'shield';
}

export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isHQ: boolean;
}