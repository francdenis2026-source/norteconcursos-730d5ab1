import {
  Atom,
  BookOpen,
  BookText,
  Dna,
  FlaskConical,
  Map as MapIcon,
  PenLine,
  ScrollText,
  Brain,
  Building2,
  Calculator,
  Coins,
  Fingerprint,
  Gavel,
  Globe,
  HeartHandshake,
  Landmark,
  Laptop,
  Scale,
  Shield,
  Stethoscope,
  TrafficCone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { subjectStyle } from "@/lib/subjectStyle";

export function SubjectIcon({ subject, className }: { subject: string; className?: string }) {
  const { Icon, hue } = subjectStyle(subject);
  return (
    <span className={cn("app-ico app-ico--sm app-ico--page", className)} data-hue={hue} aria-hidden>
      <Icon />
    </span>
  );
}
