import { useAuthStatus } from "@/hooks/useDashboard";
import { useBoardYearQuestions } from "@/hooks/useBoardYearQuestions";
import { examAvailableCounts } from "@/lib/examAvailability";
import { PCSC_EXAM } from "@/lib/pcscExam";

// Dated public reference, not a live promise. Authenticated availability uses the eligible catalog.
const PUBLIC_CHECK = { checkedAt: "22/10/2026", counts: [92] };

export function usePcscAvailability() {
  const { user, isAuthenticated } = useAuthStatus();
  const enabled = isAuthenticated && !!user && user.id !== "demo-user";
  const { catalog, loading, error } = useBoardYearQuestions(
    PCSC_EXAM.year,
    PCSC_EXAM.board,
    enabled,
  );
  return {
    counts: !enabled
      ? PUBLIC_CHECK.counts
      : loading || error
        ? null
        : examAvailableCounts(catalog, PCSC_EXAM),
    checkedAt: enabled ? null : PUBLIC_CHECK.checkedAt,
    loading: enabled && loading,
    error,
  };
}
