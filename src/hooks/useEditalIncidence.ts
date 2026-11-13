import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MockService } from "@/services/mockService";
import { withCatalogCache } from "@/lib/catalogCache";
import { loadIdecanTopicGroups } from "@/lib/idecanTopicGroups";
import { incidenceEditalFor, type IncidenceEdital } from "@/lib/incidenceEditais";
import { computeIncidence, type Incidence, type IncidenceItem } from "@/lib/topicIncidence";

/**
 * Chance de cada assunto do edital cair na prova, a partir das provas da banca.
 * Só funciona quando o aluno ativou o respectivo edital; sem ele, `edital` vem nulo.
 * As provas só são buscadas quando `wantData` é verdadeiro (ex.: aba de conteúdo aberta).
 */
export function useEditalIncidence(userId: string | undefined, items: IncidenceItem[], wantData: boolean) {
  const real = !!userId && userId !== "guest" && userId !== "demo-user";
  const contest = useQuery({
    queryKey: ["focused-contest", userId],
    enabled: real,
    staleTime: 5 * 60_000,
    queryFn: async () => (await MockService.getFocusedContest()) ?? null,
  });
  const edital: IncidenceEdital | null = incidenceEditalFor(contest.data);
  const groups = useQuery({
    queryKey: ["idecan-topic-groups", userId],
    enabled: real && !!edital && wantData,
    staleTime: 10 * 60_000,
    queryFn: () => withCatalogCache(`idecan-topics:${userId}`, loadIdecanTopicGroups),
  });
  const incidence = React.useMemo<Map<string, Incidence> | null>(
    () => (groups.data ? computeIncidence(groups.data, items) : null),
    [groups.data, items],
  );
  return {
    /** Edital ativado pelo aluno com indicação disponível (ou nulo). */
    edital,
    /** Ainda descobrindo qual edital está ativo. */
    checking: real && contest.isLoading,
    loading: !!edital && wantData && groups.isLoading,
    error: groups.isError,
    incidence,
  };
}
