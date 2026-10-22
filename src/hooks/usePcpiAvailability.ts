import { useExamAvailability } from "@/hooks/useExamAvailability";
import { PCPI_EXAM } from "@/lib/pcpiExam";

const PUBLIC_CHECK = { checkedAt: "19/10/2026", counts: [80, 74] };

export function usePcpiAvailability() {
  return useExamAvailability(PCPI_EXAM, PUBLIC_CHECK);
}
