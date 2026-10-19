import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { PCPR_EXAM } from "@/lib/pcprExam";
import { needsMissingSupportText } from "@/lib/questionText";
import { matchesQuestionCareer } from "@/lib/questionFilterIdentity";

// Dated public reference, not a live promise. Authenticated availability always uses the eligible catalog.
const PUBLIC_CHECK = { checkedAt: "19/10/2026", counts: [98, 100, 36] };
export function usePcprAvailability() {
  const { user, isAuthenticated } = useAuthStatus();
  const enabled = isAuthenticated && !!user && user.id !== "demo-user";
  const { catalog, loading, error } = useQuestionCatalog(user?.id, enabled);
  const counts = !enabled
    ? PUBLIC_CHECK.counts
    : loading || error
      ? null
      : PCPR_EXAM.roles.map(
          (role) =>
            new Set(
              catalog
                .filter(
                  (q) =>
                    q.contest === PCPR_EXAM.contest &&
                    q.year === PCPR_EXAM.year &&
                    matchesQuestionCareer(
                      q.career,
                      q.contest,
                      q.year,
                      role,
                      PCPR_EXAM.contest,
                      PCPR_EXAM.year,
                    ) &&
                    q.board === PCPR_EXAM.board &&
                    q.source === "official" &&
                    !needsMissingSupportText(q),
                )
                .map((q) => q.itemNumber ?? q.id),
            ).size,
        );
  return {
    counts,
    checkedAt: enabled ? null : PUBLIC_CHECK.checkedAt,
    loading: enabled && loading,
    error,
  };
}
