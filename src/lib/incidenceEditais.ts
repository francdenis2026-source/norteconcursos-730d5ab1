import type { Contest } from "@/types";
import { norm } from "@/lib/editalRadar";

/**
 * Editais que têm indicação personalizada de "chance de cair" por assunto.
 * A indicação só aparece quando o aluno ativa o respectivo edital (concurso em foco em Meu concurso).
 * Para incluir outro edital: acrescente uma entrada aqui e informe a lista de assuntos dele
 * (hoje só o edital verticalizado da PC-AC tem a lista item a item no formato necessário).
 */
export interface IncidenceEdital {
  id: string;
  /** Nome curto exibido ao aluno. */
  label: string;
  /** Banca cujas provas servem de base. */
  board: string;
  matches: (contest: Pick<Contest, "agency" | "name">) => boolean;
}

export const INCIDENCE_EDITAIS: IncidenceEdital[] = [
  {
    id: "pcac",
    label: "PC-AC",
    board: "IDECAN",
    matches: (contest) => {
      const text = norm(`${contest.agency} ${contest.name}`);
      return text.includes("policia civil") && /\bacre\b/.test(text);
    },
  },
];

export function incidenceEditalFor(
  contest: Pick<Contest, "agency" | "name"> | null | undefined,
): IncidenceEdital | null {
  if (!contest) return null;
  return INCIDENCE_EDITAIS.find((edital) => edital.matches(contest)) ?? null;
}
