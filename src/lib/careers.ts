export type CareerTier = "federal" | "estadual" | "municipal";

export interface CareerDef {
  id: string;
  name: string;
  fullName: string;
  agency: string;
  color: string; // tailwind-ish hex used inline
  tier: CareerTier;
}

export const CAREERS: CareerDef[] = [
  {
    id: "pf",
    name: "PF",
    fullName: "Polícia Federal",
    agency: "Polícia Federal",
    color: "#1B4B6B",
    tier: "federal",
  },
  {
    id: "prf",
    name: "PRF",
    fullName: "Polícia Rodoviária Federal",
    agency: "Polícia Rodoviária Federal",
    color: "#2F7A4F",
    tier: "federal",
  },
  {
    id: "depen",
    name: "DEPEN",
    fullName: "Departamento Penitenciário Nacional",
    agency: "Departamento Penitenciário Nacional",
    color: "#6B4A9E",
    tier: "federal",
  },
  {
    id: "pc",
    name: "PC",
    fullName: "Polícia Civil",
    agency: "Polícia Civil",
    color: "#B4740E",
    tier: "estadual",
  },
  {
    id: "pp",
    name: "PP",
    fullName: "Polícia Penal",
    agency: "Polícia Penal",
    color: "#7A3B2E",
    tier: "estadual",
  },
  {
    id: "bombeiro",
    name: "Bombeiro",
    fullName: "Corpo de Bombeiros Militar",
    agency: "Corpo de Bombeiros",
    color: "#B23A3A",
    tier: "estadual",
  },
  {
    id: "pm",
    name: "PM",
    fullName: "Polícia Militar",
    agency: "Polícia Militar",
    color: "#1B6B4B",
    tier: "estadual",
  },
];

// Concursos estadual/municipal que ainda não têm uma sigla de carreira própria
// cadastrada (ex.: SEFAZ, ISE, prefeituras) simplesmente não casam com nenhum
// CareerDef — o painel os trata como "não federais" por exclusão, sem exigir
// que toda carreira do país esteja mapeada aqui.
export function isFederalContestName(contestName?: string | null): boolean {
  const career = careerByAgency(contestName);
  return career?.tier === "federal";
}

export function careerById(id: string): CareerDef | undefined {
  return CAREERS.find((c) => c.id === id);
}

export function normalizeText(value: string): string {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

// "Polícia Federal", "Polícia Rodoviária Federal", "Polícia Civil" e "Polícia
// Penal" todas começam com a mesma palavra ("Polícia"), então casar só pelo
// primeiro termo do agency fazia qualquer concurso de qualquer uma delas cair
// sempre na primeira da lista (PF). Comparar pelo nome completo do agency —
// e, havendo mais de um contido no texto, ficar com o mais específico (mais
// longo) — evita esse falso-positivo cruzado entre as polícias.
export function careerByAgency(agency?: string | null): CareerDef | undefined {
  if (!agency) return undefined;
  const target = normalizeText(agency);
  const matches = CAREERS.filter((c) => target.includes(normalizeText(c.agency)));
  if (!matches.length) return undefined;
  return matches.sort((a, b) => b.agency.length - a.agency.length)[0];
}
