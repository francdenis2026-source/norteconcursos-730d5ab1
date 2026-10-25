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
    const name = canonicalSubject(raw);
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
  const expected = EXPECTED_SUBJECTS.map((s) => canonicalSubject(s.name));
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
  tracks.filter((t) => canonicalSubject(t.title) === canonicalSubject(name));
export const playlistsOf = <T extends DisciplinePlaylist>(name: string, playlists: T[]) =>
  playlists.filter((p) => canonicalSubject(p.discipline) === canonicalSubject(name));
export const materialsOf = <T extends DisciplineMaterial>(name: string, materials: T[]) =>
  materials.filter(
    (m) => libraryCollection(m) === "subjects" && libraryDiscipline(m) === canonicalSubject(name),
  );
