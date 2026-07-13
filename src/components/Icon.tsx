import {
  Calendar,
  Building2,
  Users,
  Smile,
  Shield,
  IndianRupee,
  CheckCircle2,
  Clock,
  Leaf,
  Star,
  Target,
  Eye,
  Gem,
  HardHat,
  ClipboardList,
  PencilRuler,
  Wrench,
  Briefcase,
  Home,
  Factory,
  HeartPulse,
  GraduationCap,
  BedDouble,
  Route,
  MessageSquare,
  FileCheck,
  ShieldCheck,
  KeyRound,
  Heart,
  TrendingUp,
  Banknote,
  Layers,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

/**
 * Centralized icon registry mapping the string keys stored in content.ts
 * to actual Lucide icon components. Keeps content data serialisable while
 * letting components render the right icon by string reference.
 */
const iconMap: Record<string, LucideIcon> = {
  // stats
  calendar: Calendar,
  building: Building2,
  users: Users,
  smile: Smile,
  shield: Shield,
  'indian-rupee': IndianRupee,
  // checklist
  check: CheckCircle2,
  clock: Clock,
  leaf: Leaf,
  star: Star,
  // mission/vision/values
  target: Target,
  eye: Eye,
  gem: Gem,
  // services
  'hard-hat': HardHat,
  clipboard: ClipboardList,
  'pencil-ruler': PencilRuler,
  wrench: Wrench,
  // industries
  briefcase: Briefcase,
  home: Home,
  factory: Factory,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  bed: BedDouble,
  road: Route,
  // process
  'message-square': MessageSquare,
  'file-check': FileCheck,
  'shield-check': ShieldCheck,
  key: KeyRound,
  // perks
  heart: Heart,
  'trending-up': TrendingUp,
  banknote: Banknote,
  layers: Layers,
  'map-pin': MapPin,
};

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean;
}

export function Icon({ name, className, strokeWidth = 2, ...rest }: IconProps) {
  const Cmp = iconMap[name] ?? Star;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden {...rest} />;
}

export type { LucideIcon };