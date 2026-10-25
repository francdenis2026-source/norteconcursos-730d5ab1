import type { Pena } from "./penalCalc";
import type { LegalUnit } from "./legalCourses";
export type SourcePenalty = {
  lawSlug: string;
  lawTitle: string;
  unitKey: string;
  label: string;
  min: Pena;
  max: Pena;
  tipo: "reclusão" | "detenção";
  checkedAt: string;
};
const clean = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
/** A textual suggestion, never legal classification; the UI requires explicit confirmation. */
export function suggestCustodialPenalty(
  text: string,
): { min: Pena; max: Pena; tipo: "reclusão" | "detenção" } | null {
  const caput = clean(text.split(/§/)[0] ?? "");
  if (/revogad|inconstitucional|suspens[ao]+/.test(caput)) return null;
  const matches = [
    ...caput.matchAll(
      /penas?\s*[-–—:]\s*(reclusao|detencao)\s*,?\s*(?:de\s+)?(\d{1,3})\s*(?:\([^)]*\))?\s*(anos?|mes(?:es)?)?\s*a\s*(\d{1,3})\s*(?:\([^)]*\))?\s*(anos?|mes(?:es)?)/g,
    ),
  ];
  if (matches.length !== 1 || /\bou\s+(?:reclusao|detencao|multa)/.test(caput)) return null;
  const m = matches[0]!;
  const make = (n: number, u: string): Pena =>
    u.startsWith("ano")
      ? { anos: n, meses: 0, dias: 0 }
      : { anos: Math.floor(n / 12), meses: n % 12, dias: 0 };
  const min = make(Number(m[2]), m[3] ?? m[5]!),
    max = make(Number(m[4]), m[5]!);
  const days = (p: Pena) => p.anos * 360 + p.meses * 30;
  if (days(min) <= 0 || days(max) < days(min)) return null;
  return { min, max, tipo: m[1] === "reclusao" ? "reclusão" : "detenção" };
}
export function custodialUnits(units: LegalUnit[]): LegalUnit[] {
  return units.filter(
    (u) =>
      u.content_status === "current" &&
      /\bPenas?\s*[-–—:]\s*(?:reclus[aã]o|deten[cç][aã]o)/i.test(u.body_text),
  );
}
