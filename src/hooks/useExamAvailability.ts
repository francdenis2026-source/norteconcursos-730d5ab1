import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { examAvailableCounts, type ExamAvailabilityIdentity } from "@/lib/examAvailability";

export function useExamAvailability(
  exam: ExamAvailabilityIdentity,
  reference: { checkedAt: string; counts: number[] },
) {
  const { user, isAuthenticated } = useAuthStatus();
  const enabled = isAuthenticated && !!user && user.id !== "demo-user";
  const { catalog, loading, error } = useQuestionCatalog(user?.id, enabled);
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
