import { canonicalBoard, canonicalCareerName, canonicalSubject } from "./subjects";

export type PanoramaScope = "federal" | "estadual" | "municipal";
export interface PanoramaRow {
  contest_name: string;
  exam_year: number;
  career_name: string;
  exam_board: string;
  subject: string;
  items: number;
  scope: PanoramaScope;
  family: string;
  raw_career_name?: string;
}
export interface PanoramaFilters {
  scope: string;
  family: string;
  role: string;
}
export const emptyPanoramaFilters: PanoramaFilters = { scope: "all", family: "all", role: "all" };
const identity = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const same = (a: string, b: string) => identity(a) === identity(b);

/** Identity comes from the organization, rather than guessing from a shared job title. */
export function panoramaOrganization(
  contest: string,
  family = "Outros órgãos",
  scope: PanoramaScope = "estadual",
) {
  const text = identity(contest);
  if (/rodoviaria federal|\bprf\b/.test(text)) return { family: "PRF", scope: "federal" as const };
  if (/policia federal|\bpf\b/.test(text))
    return { family: "Polícia Federal", scope: "federal" as const };
  if (/departamento penitenciario nacional|\bdepen\b|\bsenappen\b/.test(text))
    return { family: "Polícia Penal", scope: "federal" as const };
  if (/policia civil/.test(text)) return { family: "Polícia Civil", scope: "estadual" as const };
  if (/policia penal|penitenciari/.test(text)) return { family: "Polícia Penal", scope };
  if (/policia militar/.test(text))
    return { family: "Polícia Militar", scope: "estadual" as const };
  return { family, scope };
}

export function panoramaCareer(raw: string, contest: string, year: number, family?: string) {
  const text = canonicalCareerName(raw).replace(/\s+/g, " ").trim();
  const key = identity(text);
  const organization = panoramaOrganization(contest, family).family;
  if (organization === "Polícia Civil") {
    const names: Record<string, string> = {
      "agente de policia": "Agente de Polícia Civil",
      "agente de policia civil": "Agente de Polícia Civil",
      "agente de policia judiciaria": "Agente de Polícia Civil",
      "escrivao de policia": "Escrivão de Polícia Civil",
      "escrivao de policia civil": "Escrivão de Polícia Civil",
      "delegado de policia": "Delegado de Polícia Civil",
      "investigador de policia": "Investigador de Polícia",
      "investigador de policia i": "Investigador de Polícia",
      "oficial investigador": "Oficial Investigador",
    };
    return names[key] ?? text;
  }
  if (organization === "Polícia Federal") {
    const names: Record<string, string> = {
      "agente de policia": "Agente de Polícia Federal",
      "escrivao de policia": "Escrivão de Polícia Federal",
      "delegado de policia": "Delegado de Polícia Federal",
    };
    return names[key] ?? text;
  }
  // Confirmed against the registered DEPEN/2021 syllabus. Do not infer other institutional records.
  if (key === "departamento penitenciario nacional" && identity(contest) === key && year === 2021)
    return "Agente Federal de Execução Penal";
  return text;
}

export function normalizePanoramaRow(row: PanoramaRow): PanoramaRow {
  const org = panoramaOrganization(row.contest_name, row.family, row.scope);
  return {
    ...row,
    ...org,
    raw_career_name: row.raw_career_name ?? row.career_name,
    career_name: panoramaCareer(row.career_name, row.contest_name, row.exam_year, org.family),
    subject: canonicalSubject(row.subject),
    exam_board: canonicalBoard(row.exam_board),
  };
}

const unique = (values: string[]) => [
  ...new Map(
    values
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "pt-BR"))
      .map((value) => [identity(value), value]),
  ).values(),
];
export const matchesPanoramaFilter = (selected: string, value: string) => selected === "all" || same(selected, value);
const matches = matchesPanoramaFilter;
export function filterPanoramaRows<T extends PanoramaRow>(rows: T[], filters: PanoramaFilters) {
  return rows.filter(
    (row) =>
      matches(filters.scope, row.scope) &&
      matches(filters.family, row.family) &&
      matches(filters.role, row.career_name),
  );
}
/** Resolve parent first; an invalid child cannot silently empty or contaminate the results. */
export function panoramaFilterState(rows: PanoramaRow[], filters: PanoramaFilters) {
  const scopes = ["all", ...unique(rows.map((row) => row.scope))];
  const scope = scopes.find((value) => same(value, filters.scope)) ?? "all";
  const scoped = rows.filter((row) => matches(scope, row.scope));
  const families = ["all", ...unique(scoped.map((row) => row.family))];
  const family = families.find((value) => same(value, filters.family)) ?? "all";
  const roles = [
    "all",
    ...unique(scoped.filter((row) => matches(family, row.family)).map((row) => row.career_name)),
  ];
  const role = roles.find((value) => same(value, filters.role)) ?? "all";
  return { filters: { scope, family, role }, scopes, families, roles };
}
