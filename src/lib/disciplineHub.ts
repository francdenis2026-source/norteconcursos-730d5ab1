// Disciplinas que NÃO são legislação (Português, Matemática, RLM, Química, Física, Estatística,
// Contabilidade...), cada uma reunindo num só cartão o que o aluno estuda dela: materiais de texto,
// aulas da trilha, videoaulas e prática. Legislação e Direito ficam na área de leis.
import { canonicalSubject } from "./subjects";
import { EXPECTED_SUBJECTS, subjectIcon, type SubjectIcon } from "./materialHub";
import {
  libraryCollection,
  libraryDiscipline,
  type LibraryClassifiable,
} from "./libraryOrganization";

export type DisciplineMaterial = LibraryClassifiable & { contest_name?: string | null };
export interface DisciplineTrack {
  slug: string;
  title: string;
  lessons: unknown[];
}
export interface DisciplinePlaylist {
  id: string;
  title: string;
  discipline: string;
}

/** Direito e legislação pertencem à área de leis, não à de disciplinas. */
const LAW_PATTERN =
  /direito|legisla|constitucional|administrativo|penal|processual|humanos|tr[âa]nsito|criminal|medicina legal|lei org[âa]nica|uso da for[çc]a|carreiras|pf\b/i;
export const isLawDiscipline = (name: string) => LAW_PATTERN.test(canonicalSubject(name));

/**
 * Disciplinas que o banco grava em várias grafias ou recortes, mas que o aluno estuda como uma só.
 * Aqui é só a apresentação (um cartão): as questões e a classificação oficial continuam separadas.
 */
const DISCIPLINE_GROUPS: { label: string; pattern: RegExp; parts: string[] }[] = [
  { label: "Contabilidade", pattern: /contab|cont[áa]bil/i, parts: ["Geral", "de Custos", "Pública", "Análise Financeira", "Perícia"] },
  { label: "Realidade do Acre", pattern: /realidade do (estado do )?acre/i, parts: [] },
  { label: "Estatística", pattern: /estat[ií]stic|an[áa]lise de dados/i, parts: ["Análise de Dados"] },
];
/** Nome do cartão em que a disciplina aparece (o próprio nome quando não pertence a um grupo). */
export function disciplineGroup(raw: string): string {
  const name = canonicalSubject(raw);
  return DISCIPLINE_GROUPS.find((g) => g.pattern.test(name))?.label ?? name;
}
/** Duas disciplinas contam como a mesma quando caem no mesmo cartão. */
export const sameDiscipline = (a: string, b: string) => disciplineGroup(a) === disciplineGroup(b);

export interface DisciplineCard {
  name: string;
  icon: SubjectIcon;
  materials: number;
  lessons: number;
  videos: number;
  /** Tem algum conteúdo publicado (material, aula ou vídeo). */
  hasContent: boolean;
}

export function disciplineCards(
  materials: DisciplineMaterial[],
  tracks: DisciplineTrack[],
  playlists: DisciplinePlaylist[],
): DisciplineCard[] {
  const map = new Map<string, DisciplineCard>();
  const card = (raw: string) => {
    const name = disciplineGroup(raw);
    let entry = map.get(name);
    if (!entry) {
      entry = {
        name,
        icon: subjectIcon(name),
        materials: 0,
        lessons: 0,
        videos: 0,
        hasContent: false,
      };
      map.set(name, entry);
    }
    return entry;
  };
  for (const { name } of EXPECTED_SUBJECTS) card(name);
  for (const item of materials) {
    if (libraryCollection(item) !== "subjects") continue;
    const name = libraryDiscipline(item);
    if (isLawDiscipline(name)) continue;
    card(name).materials += 1;
  }
  for (const track of tracks) {
    if (isLawDiscipline(track.title)) continue;
    card(track.title).lessons += track.lessons.length;
  }
  for (const list of playlists) {
    if (isLawDiscipline(list.discipline)) continue;
    card(list.discipline).videos += 1;
  }
  const expected = [...new Set(EXPECTED_SUBJECTS.map((s) => disciplineGroup(s.name)))];
  const cards = [...map.values()].map((c) => ({
    ...c,
    hasContent: c.materials + c.lessons + c.videos > 0,
  }));
  const first = expected.map((name) => cards.find((c) => c.name === name)!).filter(Boolean);
  const extras = cards
    .filter((c) => !expected.includes(c.name))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return [...first, ...extras];
}

export const tracksOf = <T extends DisciplineTrack>(name: string, tracks: T[]) =>
  tracks.filter((t) => sameDiscipline(t.title, name));
export const playlistsOf = <T extends DisciplinePlaylist>(name: string, playlists: T[]) =>
  playlists.filter((p) => sameDiscipline(p.discipline, name));
export const materialsOf = <T extends DisciplineMaterial>(name: string, materials: T[]) =>
  materials.filter(
    (m) => libraryCollection(m) === "subjects" && sameDiscipline(libraryDiscipline(m), name),
  );
