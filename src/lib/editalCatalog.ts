import {
  buildTheoryIndex,
  findTheory,
  type TheoryHit,
  type TheoryMaterial,
} from "./cronogramaTeoria";

export const editalFold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export interface EditalEdition {
  id: string;
  contest_name: string;
  role_name: string;
  contest_year: number;
  exam_board: string | null;
  status: string;
  source: { title: string; url: string; source_type: string; status: string } | null;
}
export function editalSourceLabel(edition: Pick<EditalEdition, "source">) {
  return edition.source?.source_type === "edital" ? "Edital cadastrado" : "Referência de prova";
}
export function editalSourceUrl(source: EditalEdition["source"]) {
  try {
    const url = new URL(source?.url ?? "");
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
export function filterEditalEditions(
  editions: EditalEdition[],
  query: string,
  year = "all",
  kind = "all",
) {
  const words = editalFold(query).trim().split(/\s+/).filter(Boolean);
  return editions
    .filter(
      (e) =>
        (year === "all" || String(e.contest_year) === year) &&
        (kind === "all" ||
          (kind === "archived"
            ? e.status === "archived"
            : kind === "edital"
              ? e.source?.source_type === "edital"
              : e.source?.source_type !== "edital")) &&
        words.every((word) =>
          editalFold(
            `${e.contest_name} ${e.role_name} ${e.exam_board ?? ""} ${e.contest_year}`,
          ).includes(word),
        ),
    )
    .sort(
      (a, b) =>
        b.contest_year - a.contest_year ||
        a.contest_name.localeCompare(b.contest_name, "pt-BR") ||
        a.role_name.localeCompare(b.role_name, "pt-BR"),
    );
}
/** Broad syllabus paragraphs contain several separate subjects. Match each clause,
 * while keeping the existing discipline and relevance checks for every suggestion. */
export function editalMaterials(
  materials: TheoryMaterial[],
  discipline: string,
  topic: string,
  limit = 8,
): TheoryHit[] {
  const disciplines = [discipline];
  if (editalFold(discipline) === "direito penal e processual penal")
    disciplines.push("Direito Penal", "Direito Processual Penal");
  const index = buildTheoryIndex(materials, []);
  const clauses = [
    topic,
    ...topic
      .split(/;|\.(?:\s|$)/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 8),
  ];
  const hits = new Map<string, TheoryHit>();
  for (const name of disciplines)
    for (const clause of clauses)
      for (const hit of findTheory(index, name, clause, limit)) {
        if ((hits.get(hit.id)?.score ?? 0) < hit.score) hits.set(hit.id, hit);
      }
  return [...hits.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}
