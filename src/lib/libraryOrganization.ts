import { legalLibraryEntry, materialLawSlug } from "./legalLibrary";
import type { StudyMaterialSummary } from "./studyMaterials";

export const LIBRARY_AREAS = [
  { id: "all", title: "Todas as áreas", description: "Explore a biblioteca por disciplina", tone: "slate" },
  { id: "legislation", title: "Legislação", description: "Leis especiais, PF, trânsito e proteção", tone: "amber" },
  { id: "law", title: "Direito", description: "CP, CPP e fundamentos jurídicos", tone: "blue" },
  { id: "general", title: "Demais disciplinas", description: "Português, RLM, informática e contabilidade", tone: "teal" },
] as const;
export type LibraryArea = typeof LIBRARY_AREAS[number]["id"];
export type LibraryClassifiable = Pick<StudyMaterialSummary, "slug" | "discipline" | "law_course_slug">;
export function libraryDiscipline(item: LibraryClassifiable): string {
  const slug = materialLawSlug(item);
  const entry = slug && legalLibraryEntry(slug);
  if (entry) {
    if (slug === "codigo-penal") return "Direito Penal";
    if (slug === "codigo-processo-penal") return "Direito Processual Penal";
    return entry.group;
  }
  if (/^Legislação (?:Especial|Penal Especial)$/i.test(item.discipline)) return "Legislação — outros temas";
  if (item.discipline === "Legislação Específica da PF") return "Legislação específica da Polícia Federal";
  return item.discipline;
}
export function libraryArea(item: LibraryClassifiable): LibraryArea {
  const slug = materialLawSlug(item);
  if (slug) return ["codigo-penal", "codigo-processo-penal"].includes(slug) ? "law" : "legislation";
  if (/legislação/i.test(item.discipline)) return "legislation";
  return /direito|criminalística|uso da força/i.test(item.discipline) ? "law" : "general";
}
export function libraryTone(name: string): string {
  if (/penal extravagante|legislação — outros/i.test(name)) return "amber";
  if (/processual penal|CPP/i.test(name)) return "violet";
  if (/penal|Código Penal/i.test(name)) return "blue";
  if (/Polícia Federal|PF|informática/i.test(name)) return "cyan";
  if (/proteção de pessoas|violência doméstica/i.test(name)) return "rose";
  if (/direitos humanos|uso da força|portuguesa/i.test(name)) return "teal";
  if (/trânsito|contabilidade|lógico/i.test(name)) return "emerald";
  if (/constitucional|pensões/i.test(name)) return "violet";
  return "blue";
}
export function libraryDisciplines(items: StudyMaterialSummary[]): [string, StudyMaterialSummary[]][] {
  const map = new Map<string, StudyMaterialSummary[]>();
  for (const item of items) {
    const name = libraryDiscipline(item);
    const list = map.get(name) ?? [];
    list.push(item); map.set(name, list);
  }
  return [...map].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
}
