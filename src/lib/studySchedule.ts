/**
 * Cronograma semanal detalhado, montado como um CICLO DE ESTUDO de concurso:
 *
 *   Teoria → Flashcards (mesmo dia) → Questões (dia seguinte) → Revisão espaçada (1, 7 e 30 dias)
 *   → Revisão de erros → Simulados (frequência cresce perto da prova) → Redação (se houver) → Podcast
 *
 * A divisão do tempo muda com a fase do preparo: no início predomina a teoria; perto da prova,
 * questões e simulados. Determinístico: a mesma semana gera sempre o mesmo cronograma.
 */
import type { CoachPlan } from "@/lib/studyEngine";
import { topicsFor } from "@/data/studyTopics";
import { PODCASTS } from "@/data/mediaCatalog";

export type BlockKind = "Teoria" | "Flashcards" | "Questões" | "Revisão de erros" | "Redação" | "Simulado" | "Podcast";

export interface ScheduleBlock {
  key: string;
  kind: BlockKind;
  subject: string;
  minutes: number;
  start: string;
  end: string;
  topics: string[];
  how: string;
  href: string;
  /** Parâmetros que a ferramenta recebe (matéria/assunto já filtrados). */
  search?: Record<string, string>;
}
export interface ScheduleDay {
  day: number; // 0 = domingo … 6 = sábado
  blocks: ScheduleBlock[];
  minutes: number;
}

export const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HREF: Record<BlockKind, string> = {
  Teoria: "/dashboard/library",
  Flashcards: "/dashboard/flashcards",
  Questões: "/dashboard/question-trainer",
  "Revisão de erros": "/dashboard/errors",
  Redação: "/dashboard/essays",
  Simulado: "/dashboard/mock-exams",
  Podcast: "/dashboard/media",
};

/** Fatia do tempo útil por atividade em cada fase (após reservar redação e podcast). */
export const PHASE_MIX = {
  base: { theory: 0.45, cards: 0.1, questions: 0.27, errors: 0.08, sim: 0.1 },
  volume: { theory: 0.28, cards: 0.1, questions: 0.4, errors: 0.1, sim: 0.12 },
  integration: { theory: 0.15, cards: 0.1, questions: 0.35, errors: 0.12, sim: 0.28 },
  final: { theory: 0.07, cards: 0.1, questions: 0.3, errors: 0.15, sim: 0.38 },
} as const;

const QUANTUM = 30;
const GAP = 10;
const BREAK_AFTER = 120; // pausa maior depois de 2 h seguidas
const LONG_BREAK = 20;

const round15 = (n: number) => Math.max(15, Math.round(n / 15) * 15);
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 19) * 60 + (m ?? 0);
};
const toHHMM = (min: number) => {
  const t = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

function howTo(kind: BlockKind, minutes: number): string {
  const q = Math.max(3, Math.round(minutes / 2.5));
  switch (kind) {
    case "Teoria":
      return "Estude com o material da Biblioteca e faça um resumo curto, com as suas palavras (ou um mapa mental). No fim, sem olhar, escreva 3 pontos que você não pode esquecer. Lei seca: confira sempre a versão vigente.";
    case "Flashcards":
      return "Logo depois da teoria, crie ou revise flashcards dos assuntos acima. Tente responder de cabeça antes de virar o cartão (recuperação ativa): é o que fixa o conteúdo.";
    case "Questões":
      return `Resolva cerca de ${q} questões sobre os assuntos acima, de preferência da banca do seu concurso. Corrija na hora, leia o comentário e anote no caderno de erros o motivo de cada erro.`;
    case "Revisão de erros":
      return "Reabra o caderno de erros da semana: refaça as questões erradas sem consultar e revise a teoria só do que ainda errar. Erros repetidos viram prioridade no próximo ciclo.";
    case "Redação":
      return minutes >= 60
        ? "Escreva uma redação de 30 linhas à mão, no tempo. Use o esqueleto do Guia (introdução, dois desenvolvimentos e proposta) e, depois, revise com o checklist."
        : "Releia a redação, corrija com o checklist do Guia e reescreva os parágrafos mais fracos.";
    case "Simulado":
      return "Faça sem consulta e com o tempo cronometrado, como na prova. Depois, classifique cada erro: falta de teoria, desatenção ou pegadinha da banca. O simulado mostra o que o ciclo ainda não fixou.";
    case "Podcast":
      return "Aprendizado em áudio, leve: ouça um episódio no trânsito, na academia ou em outra hora livre. Ao final, diga em voz alta o que entendeu.";
  }
}

function searchFor(kind: BlockKind, subject: string, topics: string[]): Record<string, string> | undefined {
  if (kind === "Flashcards") return { subject, ...(topics[0] ? { topic: topics[0] } : {}) };
  if (kind === "Questões") return { area: subject, go: "1", ...(topics[0] ? { topic: topics[0] } : {}) };
  return undefined;
}

export interface ScheduleOptions {
  /** Número da semana (inteiro, cresce 1 por semana): alterna matérias menores e a frequência de simulados. */
  weekIndex: number;
  startTime: string;
  /** Blocos de teoria já concluídos por matéria em semanas anteriores (os assuntos seguem de onde parou). */
  doneBefore: Record<string, number>;
}

interface Raw {
  kind: BlockKind;
  subject: string;
  minutes: number;
  /** Agrupa Teoria + Flashcards da mesma matéria para ficarem juntos no dia. */
  group?: string;
}

export function buildSchedule(plan: CoachPlan, studyDays: number[], essay: boolean, opts: ScheduleOptions): ScheduleDay[] {
  const days = [...new Set(studyDays)].filter((d) => d >= 0 && d <= 6).sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  if (days.length === 0) return [];
  const total = plan.hoursPerWeek * 60;
  const mix = PHASE_MIX[plan.phase.id];

  // 1) Reservas fixas: redação (se houver) e podcast (só se existirem episódios publicados).
  const essayMin = essay ? Math.min(180, Math.max(60, round15(total * 0.15))) : 0;
  const podcastMin = PODCASTS.length > 0 ? clamp(round15(total * 0.05), 15, 45) : 0;
  const R = Math.max(0, total - essayMin - podcastMin);

  // 2) Divisão do restante pela fase. Simulados no início só de 15 em 15 dias.
  const simDue = plan.phase.id === "base" ? opts.weekIndex % 2 === 0 : true;
  let simMin = simDue ? clamp(round15(R * mix.sim), 45, 180) : 0;
  if (simMin > R * 0.5) simMin = round15(R * 0.5);
  const errorsMin = Math.min(round15(R * mix.errors), R);
  const theoryPool = R * mix.theory;
  let cardsPool = R * mix.cards;
  let questionsPool = Math.max(0, R - simMin - errorsMin - theoryPool - cardsPool);

  // Capacidade de cada dia (fim de semana comporta mais).
  const weights = days.map((d) => (d === 0 || d === 6 ? 1.3 : 1));
  const wSum = weights.reduce((n, w) => n + w, 0);
  const cap = new Map(days.map((d, i) => [d, (total * (weights[i] ?? 1)) / wSum]));
  const out = new Map<number, Raw[]>(days.map((d) => [d, []]));
  const place = (day: number, b: Raw) => {
    out.get(day)!.push(b);
    cap.set(day, (cap.get(day) ?? 0) - b.minutes);
  };
  const richest = (pool: number[]) => pool.reduce((best, d) => ((cap.get(d) ?? 0) > (cap.get(best) ?? 0) ? d : best), pool[0]!);

  const last = days[days.length - 1]!;
  const penultimate = days[Math.max(0, days.length - 2)]!;
  if (simMin) place(last, { kind: "Simulado", subject: "Simulado completo", minutes: simMin });
  if (errorsMin) place(penultimate, { kind: "Revisão de erros", subject: "Caderno de erros", minutes: errorsMin });
  if (essayMin) {
    const first = days[Math.min(1, days.length - 1)]!;
    if (essayMin < 90) {
      place(first, { kind: "Redação", subject: "Treino de redação (30 linhas) e revisão", minutes: essayMin });
    } else {
      const review = round15(essayMin / 3);
      place(first, { kind: "Redação", subject: "Treino de redação (30 linhas)", minutes: essayMin - review });
      place(days[Math.min(days.length - 1, Math.floor(days.length / 2) + 1)]!, { kind: "Redação", subject: "Revisão e reescrita da redação", minutes: review });
    }
  }

  // 3) Blocos por matéria. A parte fracionária se acumula entre semanas (nada se perde; as
  //    matérias menores entram em semanas alternadas) e cada matéria tem uma defasagem própria.
  const sumShare = plan.subjects.reduce((n, s) => n + s.share, 0) || 1;
  const w = opts.weekIndex;
  const quanta = (pool: number, share: number, idx: number, shift: number) => {
    const q = (pool * share) / sumShare / QUANTUM;
    const phase = (idx * 0.618034 + shift) % 1;
    return Math.max(0, Math.floor(w * q + phase) - Math.floor((w - 1) * q + phase));
  };
  const interleave = (items: { name: string; blocks: number; size: number }[]) => {
    const seen = new Map<string, number>();
    const seq: { name: string; minutes: number; n: number }[] = [];
    for (let again = true; again; ) {
      again = false;
      for (const p of items) {
        const n = seen.get(p.name) ?? 0;
        if (n < p.blocks) {
          seq.push({ name: p.name, minutes: p.size, n });
          seen.set(p.name, n + 1);
          again = true;
        }
      }
    }
    return seq;
  };
  const toItems = (pool: number, shift: number) =>
    plan.subjects.map((s, idx) => {
      const k = quanta(pool, s.share, idx, shift);
      const blocks = k <= 0 ? 0 : Math.ceil(k / 2);
      return { name: s.name, blocks, size: blocks ? round15((k * QUANTUM) / blocks) : 0 };
    });

  // 3a) Teoria (+ flashcards de 15 min colados na teoria, até o limite da fatia de flashcards).
  const theorySeq = interleave(toItems(theoryPool, 0));
  const flashCount = Math.min(theorySeq.length, Math.floor(cardsPool / 15));
  cardsPool -= flashCount * 15;
  questionsPool += cardsPool; // sobra de flashcards vira prática de questões
  const theoryDay = new Map<string, number>(); // matéria -> dia da (primeira) teoria da semana
  const groupDay: { name: string; day: number; minutes: number }[] = [];
  theorySeq.forEach((blk, i) => {
    const free = days.filter((d) => !out.get(d)!.some((b) => b.kind === "Teoria" && b.subject === blk.name));
    const day = richest(free.length ? free : days);
    const group = `${blk.name}#${blk.n}`;
    place(day, { kind: "Teoria", subject: blk.name, minutes: blk.minutes, group });
    if (i < flashCount) place(day, { kind: "Flashcards", subject: blk.name, minutes: 15, group });
    if (!theoryDay.has(blk.name)) theoryDay.set(blk.name, day);
    groupDay.push({ name: blk.name, day, minutes: blk.minutes });
  });

  // 3b) Toda teoria ganha questões no dia seguinte (revisão em ~24 h), enquanto houver tempo de questões.
  for (const g of groupDay) {
    const size = g.minutes >= 60 ? 45 : 30;
    if (questionsPool < size) break;
    const after = days.slice(days.indexOf(g.day) + 1);
    const free = after.filter((d) => !out.get(d)!.some((b) => b.kind === "Questões" && b.subject === g.name));
    const day = free.length ? richest(free) : after.length ? richest(after) : g.day;
    place(day, { kind: "Questões", subject: g.name, minutes: size });
    questionsPool -= size;
  }

  // 3c) Questões extras com o tempo que sobrou: depois da teoria da matéria; sem teoria na semana, onde houver folga.
  for (const blk of interleave(toItems(questionsPool, 0.3))) {
    const td = theoryDay.get(blk.name);
    let day: number;
    if (td !== undefined) {
      const ti = days.indexOf(td);
      const after = days.slice(ti + 1);
      const free = after.filter((d) => !out.get(d)!.some((b) => b.kind === "Questões" && b.subject === blk.name));
      day = free.length ? richest(free) : (after.length ? richest(after) : td);
    } else {
      const free = days.filter((d) => !out.get(d)!.some((b) => b.kind === "Questões" && b.subject === blk.name));
      day = richest(free.length ? free : days);
    }
    place(day, { kind: "Questões", subject: blk.name, minutes: blk.minutes });
  }

  if (podcastMin) place(richest(days), { kind: "Podcast", subject: "Podcast de estudo", minutes: podcastMin });

  // 4) Ordem do dia, horários e assuntos.
  const rank: Record<BlockKind, number> = { Teoria: 0, Flashcards: 0, Questões: 1, Podcast: 2, Redação: 3, "Revisão de erros": 4, Simulado: 5 };
  const taken = new Map<string, number>();
  const topicsByGroup = new Map<string, string[]>();
  const startBase = toMin(opts.startTime);

  return days.map((d) => {
    const raws = out.get(d)!;
    // Dentro de Teoria/Flashcards, mantém cada flashcard logo depois da sua teoria.
    const groupOrder = new Map<string, number>();
    raws.forEach((r) => r.group && !groupOrder.has(r.group) && groupOrder.set(r.group, groupOrder.size));
    raws.sort(
      (a, b) =>
        rank[a.kind] - rank[b.kind] ||
        (groupOrder.get(a.group ?? "") ?? 0) - (groupOrder.get(b.group ?? "") ?? 0) ||
        (a.kind === "Flashcards" ? 1 : 0) - (b.kind === "Flashcards" ? 1 : 0),
    );

    let cursor = (d === 0 || d === 6) && startBase >= 17 * 60 ? 9 * 60 : startBase;
    let worked = 0;
    const blocks: ScheduleBlock[] = raws.map((r, i) => {
      let topics: string[] = [];
      if (r.kind === "Teoria") {
        const list = topicsFor(r.subject);
        const per = r.minutes >= 60 ? 2 : 1;
        const offset = (opts.doneBefore[r.subject] ?? 0) * per + (taken.get(r.subject) ?? 0) * per;
        topics = Array.from({ length: per }, (_, j) => list[(offset + j) % list.length]!);
        taken.set(r.subject, (taken.get(r.subject) ?? 0) + 1);
        if (r.group) topicsByGroup.set(r.group, topics);
      } else if (r.kind === "Flashcards") {
        topics = (r.group && topicsByGroup.get(r.group)) || topicsFor(r.subject).slice(0, 1);
      } else if (r.kind === "Questões") {
        const recent = [...topicsByGroup.entries()].filter(([g]) => g.startsWith(`${r.subject}#`)).pop();
        const list = topicsFor(r.subject);
        topics = recent?.[1] ?? (list.length ? [list[Math.max(0, ((opts.doneBefore[r.subject] ?? 0) - 1)) % list.length]!] : []);
      } else if (r.kind === "Redação") {
        topics = r.subject.startsWith("Revisão") ? ["Texto escrito no treino anterior"] : ["Tema de segurança pública (use um tema da aba Modelos)"];
      } else if (r.kind === "Podcast") {
        topics = PODCASTS.slice(0, 2).map((p) => p.title);
      }
      if (worked >= BREAK_AFTER && i > 0) cursor += LONG_BREAK - GAP;
      const start = cursor;
      cursor += r.minutes + GAP;
      worked += r.minutes;
      return {
        key: `${d}-${i}-${r.kind}`,
        kind: r.kind,
        subject: r.subject,
        minutes: r.minutes,
        start: toHHMM(start),
        end: toHHMM(start + r.minutes),
        topics,
        how: howTo(r.kind, r.minutes),
        href: HREF[r.kind],
        ...(searchFor(r.kind, r.subject, topics) ? { search: searchFor(r.kind, r.subject, topics)! } : {}),
      };
    });
    return { day: d, blocks, minutes: blocks.reduce((n, b) => n + b.minutes, 0) };
  });
}

/** Minutos por tipo de atividade na semana (para mostrar a divisão do tempo). */
export function mixSummary(schedule: ScheduleDay[]) {
  const by = new Map<BlockKind, number>();
  let total = 0;
  for (const d of schedule) for (const b of d.blocks) { by.set(b.kind, (by.get(b.kind) ?? 0) + b.minutes); total += b.minutes; }
  return { total, items: [...by.entries()].map(([kind, minutes]) => ({ kind, minutes, pct: total ? Math.round((100 * minutes) / total) : 0 })).sort((a, b) => b.minutes - a.minutes) };
}

// ───────────────────────── Revisão espaçada (1, 7 e 30 dias) ─────────────────────────

export const REVIEW_OFFSETS = [1, 7, 30];
export interface DueReview { subject: string; topic: string; stage: number; overdueDays: number }

interface CheckLike { kind: string; subject: string; topics: string[]; done_at: string; plan_id: string | null }

const acreDay = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Rio_Branco" }).format(new Date(iso));
const dayDiff = (a: string, b: string) => Math.round((new Date(`${b}T00:00:00Z`).getTime() - new Date(`${a}T00:00:00Z`).getTime()) / 86_400_000);

/**
 * Assuntos que o aluno estudou (teoria marcada) e já chegaram na hora de revisar: 1, 7 e 30 dias
 * depois. O estágio é o número de revisões já feitas daquele assunto depois do último estudo.
 */
export function dueReviews(checks: CheckLike[], planId: string, now = new Date(), limit = 6): DueReview[] {
  const today = acreDay(now.toISOString());
  const mine = checks.filter((c) => c.plan_id === planId);
  const origin = new Map<string, { subject: string; at: string }>();
  for (const c of mine) {
    if (c.kind !== "Teoria") continue;
    for (const t of c.topics) {
      const cur = origin.get(t);
      if (!cur || c.done_at > cur.at) origin.set(t, { subject: c.subject, at: c.done_at });
    }
  }
  const due: DueReview[] = [];
  for (const [topic, o] of origin) {
    const stage = mine.filter((c) => c.kind === "Revisão espaçada" && c.done_at > o.at && c.topics.includes(topic)).length;
    if (stage >= REVIEW_OFFSETS.length) continue;
    const overdue = dayDiff(acreDay(o.at), today) - REVIEW_OFFSETS[stage]!;
    if (overdue >= 0) due.push({ subject: o.subject, topic, stage, overdueDays: overdue });
  }
  return due.sort((a, b) => b.overdueDays - a.overdueDays || a.stage - b.stage).slice(0, limit);
}
