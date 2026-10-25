import type { SubjectAccuracy } from "@/hooks/usePerformanceOverview";

/**
 * Cruza acerto e tempo médio por questão para apontar pontos fortes e fracos com mais precisão que o acerto sozinho.
 * A comparação de tempo é com a média do próprio aluno, porque o ritmo ideal varia de pessoa para pessoa.
 * Usa só a primeira resposta de cada questão (a que conta para o ranking).
 */
export type RhythmKind = "strong" | "strong-slow" | "weak-fast" | "weak-slow" | "weak" | "neutral";
export type RhythmInsight = { subject: string; total: number; accuracy: number; avgSeconds: number; kind: RhythmKind; message: string };

export const MIN_SAMPLE = 5;
export const WEAK_BELOW = 60;
export const STRONG_FROM = 80;

export function rhythmInsights(subjects: SubjectAccuracy[]): { overallSeconds: number; items: RhythmInsight[] } {
  const timed = subjects.filter((s) => s.total >= MIN_SAMPLE && s.avgSeconds > 0);
  const weighted = timed.reduce((a, s) => a + s.avgSeconds * s.total, 0);
  const questions = timed.reduce((a, s) => a + s.total, 0);
  const overall = questions ? weighted / questions : 0;
  const items = subjects
    .filter((s) => s.total >= MIN_SAMPLE)
    .map((s): RhythmInsight => {
      const slow = overall > 0 && s.avgSeconds > overall * 1.3;
      const fast = overall > 0 && s.avgSeconds < overall * 0.7;
      let kind: RhythmKind = "neutral";
      let message = "Desempenho dentro do esperado. Continue alternando com as matérias mais fracas.";
      if (s.accuracy >= STRONG_FROM && slow) { kind = "strong-slow"; message = "Você acerta, mas leva mais tempo que o seu normal. Treine com cronômetro para ganhar velocidade na prova."; }
      else if (s.accuracy >= STRONG_FROM) { kind = "strong"; message = "Ponto forte: acerta bem e no seu ritmo. Mantenha com revisões espaçadas."; }
      else if (s.accuracy < WEAK_BELOW && fast) { kind = "weak-fast"; message = "Erra respondendo rápido demais. Leia o enunciado com calma e reveja o conteúdo antes de treinar mais."; }
      else if (s.accuracy < WEAK_BELOW && slow) { kind = "weak-slow"; message = "Erra e ainda demora: há lacuna de conteúdo. Volte ao curso ou à lei desta matéria antes de resolver mais questões."; }
      else if (s.accuracy < WEAK_BELOW) { kind = "weak"; message = "Ponto fraco: priorize esta matéria no plano e refaça os erros no modo reforço."; }
      return { subject: s.subject, total: s.total, accuracy: s.accuracy, avgSeconds: s.avgSeconds, kind, message };
    })
    .sort((a, b) => ORDER[a.kind] - ORDER[b.kind] || a.accuracy - b.accuracy);
  return { overallSeconds: Math.round(overall), items };
}
const ORDER: Record<RhythmKind, number> = { "weak-slow": 0, "weak-fast": 1, weak: 2, "strong-slow": 3, neutral: 4, strong: 5 };
