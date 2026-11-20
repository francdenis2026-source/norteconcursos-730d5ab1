import { platformNow } from "@/lib/platformClock";

/**
 * Fonte única da contagem para a prova. Toda tela que mostra "dias para a prova" deve usar estas funções:
 * relógio da plataforma (servidor), prova às 8h no horário do Acre (UTC-5), dias INTEIROS restantes.
 */
export const EXAM_START = "T08:00:00-05:00";
export function examInstant(examDate: string): number {
  return new Date(examDate.length > 10 ? examDate : `${examDate}${EXAM_START}`).getTime();
}
export function examRemainingMs(examDate: string, now: number = platformNow()): number {
  const t = examInstant(examDate);
  return Number.isFinite(t) ? Math.max(0, t - now) : 0;
}
export function examDaysLeft(examDate: string | null | undefined, now: number = platformNow()): number | null {
  if (!examDate) return null;
  const t = examInstant(examDate);
  return Number.isFinite(t) ? Math.floor(Math.max(0, t - now) / 86_400_000) : null;
}
