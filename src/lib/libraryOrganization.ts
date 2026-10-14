import { canonicalSubject, canonicalTopic } from "./subjects";
import { legalLibraryEntry, materialLawSlug } from "./legalLibrary";
import type { StudyMaterialSummary } from "./studyMaterials";

export const LIBRARY_AREAS = [
  {
    id: "all",
    title: "Todas as áreas",
    description: "Explore a biblioteca por disciplina",
    tone: "slate",
  },
  {
    id: "legislation",
    title: "Legislação",
    description: "Código Penal, CPP, leis especiais, PF e trânsito",
    tone: "amber",
  },
  {
    id: "law",
    title: "Direito",
    description: "Fundamentos: constitucional, administrativo e humanos",
    tone: "blue",
  },
  {
    id: "general",
    title: "Demais disciplinas",
    description: "Português, RLM, informática e contabilidade",
    tone: "teal",
  },
] as const;
export type LibraryArea = (typeof LIBRARY_AREAS)[number]["id"];
export type LibraryCollection = "laws" | "subjects" | "enem";
export function libraryCollection(
  item: LibraryClassifiable & { contest_name?: string | null },
): LibraryCollection {
  if (item.contest_name?.trim().toUpperCase() === "ENEM") return "enem";
  return libraryArea(item) === "general" ? "subjects" : "laws";
}
export type LibraryClassifiable = Pick<
  StudyMaterialSummary,
  "slug" | "discipline" | "law_course_slug"
>;
export function libraryDiscipline(item: LibraryClassifiable): string {
  const slug = materialLawSlug(item);
  const entry = slug && legalLibraryEntry(slug);
  if (entry) {
    if (slug === "codigo-penal") return "Direito Penal";
    if (slug === "codigo-processo-penal") return "Direito Processual Penal";
    return entry.group;
  }
  if (
    /^Legislação (?:Especial|Penal Especial|Penal Extravagante)$/i.test(
      canonicalSubject(item.discipline),
    )
  )
    return "Legislação — outros temas";
  if (item.discipline === "Legislação Específica da PF")
    return "Legislação específica da Polícia Federal";
  return canonicalSubject(item.discipline);
}
export function libraryArea(item: LibraryClassifiable): LibraryArea {
  const slug = materialLawSlug(item);
  // Toda lei, inclusive o Código Penal e o CPP, fica em "Legislação"; "Direito" reúne os fundamentos.
  if (slug) return "legislation";
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
export function libraryDisciplines(
  items: StudyMaterialSummary[],
): [string, StudyMaterialSummary[]][] {
  const map = new Map<string, StudyMaterialSummary[]>();
  for (const item of items) {
    const name = libraryDiscipline(item);
    const list = map.get(name) ?? [];
    list.push(item);
    map.set(name, list);
  }
  return [...map].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
}

/** Multiple guides for one special law form one filter, without merging their content. */
export function libraryTopic(item: LibraryClassifiable & { topic_label: string }): string {
  const law = materialLawSlug(item);
  const entry = law && legalLibraryEntry(law);
  return entry && !["codigo-penal", "codigo-processo-penal"].includes(law!)
    ? entry.title
    : (canonicalTopic(item.topic_label) ?? "Assunto não classificado");
}
