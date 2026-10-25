import { useAuthStatus } from "@/hooks/useDashboard";
import { useOfficialYearQuestions } from "@/hooks/useQuestionCatalog";
import { examAvailableCounts, type ExamAvailabilityIdentity } from "@/lib/examAvailability";

export function useExamAvailability(
  exam: ExamAvailabilityIdentity,
  reference: { checkedAt: string; counts: number[] },
) {
  const { user, isAuthenticated } = useAuthStatus();
  const enabled = isAuthenticated && !!user && user.id !== "demo-user";
  // Só os itens do ano da prova: o acervo inteiro pesa dezenas de milhares de linhas e travava o painel.
  const { catalog, loading, error } = useOfficialYearQuestions(exam.year, enabled);
  return {
    counts: !enabled
      ? reference.counts
      : loading || error
        ? null
        : examAvailableCounts(catalog, exam),
    checkedAt: enabled ? null : reference.checkedAt,
    loading: enabled && loading,
    error,
  };
}
