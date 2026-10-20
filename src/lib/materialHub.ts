// Organização do "Material didático": legislação (leis, súmulas, leis extravagantes) separada das
// demais disciplinas, cada uma fácil de achar. Só agrupa o que a biblioteca já tem publicado; as
// disciplinas esperadas sem conteúdo aparecem como "em preparação", sem inventar material.
import { canonicalSubject } from "./subjects";
import {
  libraryCollection,
  libraryDiscipline,
  type LibraryClassifiable,
} from "./libraryOrganization";

export type HubItem = LibraryClassifiable & { contest_name?: string | null };
export interface HubEntry {
  name: string;
  count: number;
}
export interface HubSubject extends HubEntry {
  /** Ícone sugerido (chave de ícone da interface). */
  icon: SubjectIcon;
}
export type SubjectIcon =
  | "portugues"
  | "matematica"
  | "logica"
  | "informatica"
  | "quimica"
  | "fisica"
  | "estatistica"
  | "contabilidade"
  | "ingles"
  | "geral";

/** Disciplinas que o aluno procura primeiro, na ordem em que aparecem (mesmo sem material ainda). */
export const EXPECTED_SUBJECTS: { name: string; icon: SubjectIcon }[] = [
  { name: "Língua Portuguesa", icon: "portugues" },
  { name: "Matemática", icon: "matematica" },
  { name: "Raciocínio Lógico", icon: "logica" },
  { name: "Informática", icon: "informatica" },
  { name: "Química", icon: "quimica" },
  { name: "Física", icon: "fisica" },
  { name: "Estatística", icon: "estatistica" },
  { name: "Contabilidade Geral", icon: "contabilidade" },
  { name: "Língua Inglesa", icon: "ingles" },
];

const ICON_BY_PATTERN: [RegExp, SubjectIcon][] = [
  [/portugu|reda[çc]/i, "portugues"],
  [/matem/i, "matematica"],
  [/l[óo]gic|rlm/i, "logica"],
  [/inform/i, "informatica"],
  [/qu[ií]mic/i, "quimica"],
  [/f[ií]sic/i, "fisica"],
  [/estat/i, "estatistica"],
  [/contab/i, "contabilidade"],
  [/ingl/i, "ingles"],
];
export const subjectIcon = (name: string): SubjectIcon =>
  ICON_BY_PATTERN.find(([pattern]) => pattern.test(name))?.[1] ?? "geral";

const byName = (a: HubEntry, b: HubEntry) => a.name.localeCompare(b.name, "pt-BR");

function count(items: HubItem[], collection: "laws" | "subjects"): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) {
    if (libraryCollection(item) !== collection) continue;
    const name = libraryDiscipline(item);
    map.set(name, (map.get(name) ?? 0) + 1);
  }
  return map;
}

/** Legislação: cada grupo de leis (Código Penal, CPP, extravagante, trânsito...) com a contagem. */
export function hubLaws(items: HubItem[]): HubEntry[] {
  return [...count(items, "laws")].map(([name, n]) => ({ name, count: n })).sort(byName);
}

/** Demais disciplinas: as esperadas primeiro (mesmo vazias), depois as que existirem no acervo. */
export function hubSubjects(items: HubItem[]): HubSubject[] {
  const found = count(items, "subjects");
  const used = new Set<string>();
  const result: HubSubject[] = EXPECTED_SUBJECTS.map(({ name, icon }) => {
    const key = canonicalSubject(name);
    used.add(key);
    return { name: key, icon, count: found.get(key) ?? 0 };
  });
  const extras = [...found]
    .filter(([name]) => !used.has(name))
    .map(([name, n]) => ({ name, icon: subjectIcon(name), count: n }))
    .sort(byName);
  return [...result, ...extras];
}
