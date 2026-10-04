import { Atom, BookText, Building2, Calculator, Coins, Fingerprint, Gavel, Globe, HeartHandshake, Landmark, Laptop, Scale, Shield, Stethoscope, TrafficCone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Hue = "gold" | "sky" | "violet" | "emerald" | "rose" | "orange" | "teal";

/** Ícone e cor de cada matéria (reconhece o nome por palavras-chave). */
const RULES: [RegExp, LucideIcon, Hue][] = [
  [/portugu/i, BookText, "rose"],
  [/racioc|estat|matem/i, Calculator, "sky"],
  [/constitucional/i, Landmark, "gold"],
  [/processual/i, Scale, "orange"],
  [/penal|crimin/i, Gavel, "rose"],
  [/administrativ/i, Building2, "teal"],
  [/inform/i, Laptop, "violet"],
  [/legisla|human/i, Scale, "emerald"],
  [/contab/i, Coins, "orange"],
  [/f[ií]sica/i, Atom, "sky"],
  [/medicina|pericia|criminal[ií]stica/i, Stethoscope, "rose"],
  [/geopol|estrang|ingl|espanh/i, Globe, "teal"],
  [/[ée]tica/i, HeartHandshake, "emerald"],
  [/tr[âa]nsito/i, TrafficCone, "orange"],
];

export function subjectStyle(subject: string): { Icon: LucideIcon; hue: Hue } {
  const hit = RULES.find(([re]) => re.test(subject));
  return hit ? { Icon: hit[1], hue: hit[2] } : { Icon: Shield, hue: "gold" };
}

export function SubjectIcon({ subject, className }: { subject: string; className?: string }) {
  const { Icon, hue } = subjectStyle(subject);
  return (
    <span className={cn("app-ico app-ico--sm app-ico--page", className)} data-hue={hue} aria-hidden>
      <Icon />
    </span>
  );
}
