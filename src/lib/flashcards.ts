/**
 * Repetição espaçada dos flashcards (SM-2 simplificado, como nos apps de memorização):
 * quanto mais fácil o aluno acerta, mais longe vem a próxima revisão; errou, volta em minutos.
 */
export type Rating = "again" | "hard" | "good" | "easy";

export interface CardState {
  ease: number;
  interval_days: number;
  reps: number;
  lapses: number;
}
export interface CardNext extends CardState {
  due_at: string;
  /** Texto curto do próximo intervalo, para mostrar nos botões ("10 min", "3 dias"). */
  label: string;
}

const MIN_EASE = 1.3;
const AGAIN_MINUTES = 10;

export const RATING_LABEL: Record<Rating, string> = {
  again: "Errei",
  hard: "Difícil",
  good: "Bom",
  easy: "Fácil",
};

export function formatInterval(days: number, minutes = 0): string {
  if (days <= 0) return `${minutes || AGAIN_MINUTES} min`;
  if (days < 30) return `${days} ${days === 1 ? "dia" : "dias"}`;
  if (days < 365)
    return `${Math.round(days / 30)} ${Math.round(days / 30) === 1 ? "mês" : "meses"}`;
  return `${(days / 365).toFixed(1).replace(".", ",")} anos`;
}

export function nextState(card: CardState, rating: Rating, now = new Date()): CardNext {
  let { ease, interval_days: interval, reps, lapses } = card;

  if (rating === "again") {
    lapses += 1;
    reps = 0;
    ease = Math.max(MIN_EASE, ease - 0.2);
    const due = new Date(now.getTime() + AGAIN_MINUTES * 60_000);
    return {
      ease,
      interval_days: 0,
      reps,
      lapses,
      due_at: due.toISOString(),
      label: formatInterval(0),
    };
  }

  if (rating === "hard") {
    ease = Math.max(MIN_EASE, ease - 0.15);
    interval = Math.max(1, Math.round((interval || 1) * 1.2));
  } else if (rating === "good") {
    interval = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(interval * ease);
  } else {
    ease += 0.15;
    interval = reps === 0 ? 4 : Math.round(Math.max(interval, 1) * ease * 1.3);
  }
  reps += 1;
  interval = Math.min(interval, 365);
  const due = new Date(now.getTime() + interval * 86_400_000);
  return {
    ease: Math.round(ease * 100) / 100,
    interval_days: interval,
    reps,
    lapses,
    due_at: due.toISOString(),
    label: formatInterval(interval),
  };
}

/** Verificação rápida da lógica: node --experimental-strip-types src/lib/flashcards.ts */
export function selfCheck() {
  const fresh: CardState = { ease: 2.5, interval_days: 0, reps: 0, lapses: 0 };
  const a = nextState(fresh, "good");
  const b = nextState(a, "good");
  const c = nextState(b, "good");
  console.assert(
    a.interval_days === 1 && b.interval_days === 3 && c.interval_days === 8,
    "good: 1, 3, ~8 dias",
  );
  const lost = nextState(c, "again");
  console.assert(
    lost.interval_days === 0 && lost.lapses === 1 && lost.ease < c.ease,
    "errar zera e reduz a facilidade",
  );
  console.assert(nextState(fresh, "easy").interval_days === 4, "fácil de primeira = 4 dias");
  return [a.label, b.label, c.label, lost.label];
}
