import { useExamAvailability } from "@/hooks/useExamAvailability";
import { PCPR_EXAM } from "@/lib/pcprExam";

// Dated public reference, not a live promise. Authenticated availability uses the eligible catalog.
const PUBLIC_CHECK = { checkedAt: "19/10/2026", counts: [98, 100, 36] };
export function usePcprAvailability() {
  return useExamAvailability(PCPR_EXAM, PUBLIC_CHECK);
}
