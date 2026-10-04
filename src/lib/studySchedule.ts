/**
 * Cronograma semanal detalhado: dias, horários, matérias, assuntos e instruções de estudo.
 * Determinístico: a mesma semana gera sempre o mesmo cronograma (as marcações do aluno não o mudam).
 */
import type { CoachPlan } from "@/lib/studyEngine";
import { topicsFor } from "@/data/studyTopics";

export type BlockKind = "Teoria" | "Questões" | "Revisão de erros" | "Redação" | "Simulado";

export interface ScheduleBlock {
  /** Identifica o bloco dentro da semana (usado para marcar como estudado). */
  key: string;
  kind: BlockKind;
  subject: string;
  minutes: number;
  start: string; // "19:00"
  end: string; // "19:45"
  topics: string[];
  how: string;
  href: string;
}
export interface ScheduleDay {
  day: number; // 0 = domingo … 6 = sábado
  blocks: ScheduleBlock[];
  minutes: number;
}

export const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HREF: Record<BlockKind, string> = {
  Teoria: "/dashboard/library",
  Questões: "/dashboard/question-trainer",
  "Revisão de erros": "/dashboard/errors",
  Redação: "/dashboard/essays",
  Simulado: "/dashboard/mock-exams",
};
const QUANTUM = 30; // menor bloco de matéria, em minutos
const GAP = 10; // intervalo entre blocos

const round15 = (n: number) => Math.max(15, Math.round(n / 15) * 15);
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 19) * 60 + (m ?? 0);
};
const toHHMM = (min: number) => {
  const t = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

function howTo(kind: BlockKind, minutes: number, topics: string[]): string {
  const q = Math.max(3, Math.round(minutes / 2.5));
  switch (kind) {
    case "Teoria":
      return `Leia o material dos assuntos acima e faça um resumo curto (ou mapa mental). No fim, escreva 3 pontos que você precisa lembrar. Lei seca: confira sempre a versão vigente.`;
    case "Questões":
      return `Resolva cerca de ${q} questões sobre ${topics.length ? "os assuntos acima" : "o assunto"} no Treinador. Corrija na hora, leia o comentário e anote no caderno de erros o que errou.`;
    case "Revisão de erros":
      return "Reabra o caderno de erros da semana: refaça as questões erradas sem consultar e revise a teoria só do que ainda errar.";
    case "Redação":
      return minutes >= 45
        ? "Escreva uma redação de 30 linhas à mão, no tempo. Use o esqueleto da aba Guia (introdução, dois desenvolvimentos e proposta)."
        : "Releia a redação, corrija com o checklist do Guia e reescreva os parágrafos mais fracos.";
    case "Simulado":
      return "Faça o simulado sem consulta e com o tempo cronometrado. Depois, classifique cada erro: falta de teoria, desatenção ou pegadinha da banca.";
  }
}

export interface ScheduleOptions {
  /** Número da semana (inteiro, cresce 1 por semana): faz as matérias menores se alternarem. */
  weekIndex: number;
  startTime: string; // "19:00"
  /** Quantos blocos de teoria de cada matéria o aluno já concluiu em semanas anteriores. */
  doneBefore: Record<string, number>;
}

export function buildSchedule(plan: CoachPlan, studyDays: number[], essay: boolean, opts: ScheduleOptions): ScheduleDay[] {
  const days = [...new Set(studyDays)].filter((d) => d >= 0 && d <= 6).sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  if (days.length === 0) return [];
  const total = plan.hoursPerWeek * 60;

  // Redação: uma redação de 30 linhas pede pelo menos 1 hora; com mais tempo, ganha uma sessão de revisão.
  const essayMin = essay ? Math.min(180, Math.max(60, round15(total * 0.15))) : 0;
  const reviewMin = round15(total * 0.1);
  const simMin = plan.phase.id === "integration" || plan.phase.id === "final" ? Math.min(180, round15(total * 0.2)) : 0;
  const forSubjects = Math.max(0, total - essayMin - reviewMin - simMin);

  // Capacidade de cada dia (fim de semana comporta mais).
  const weights = days.map((d) => (d === 0 || d === 6 ? 1.3 : 1));
  const wSum = weights.reduce((n, w) => n + w, 0);
  const cap = new Map(days.map((d, i) => [d, (total * (weights[i] ?? 1)) / wSum]));
  type Raw = Omit<ScheduleBlock, "key" | "start" | "end" | "topics" | "how" | "href"> & { topicCount?: number };
  const out = new Map<number, Raw[]>(days.map((d) => [d, []]));
  const place = (day: number, b: Raw) => {
    out.get(day)!.push(b);
    cap.set(day, (cap.get(day) ?? 0) - b.minutes);
  };

  const last = days[days.length - 1]!;
  const penultimate = days[Math.max(0, days.length - 2)]!;
  if (simMin) place(last, { kind: "Simulado", subject: "Simulado completo", minutes: simMin });
  place(penultimate, { kind: "Revisão de erros", subject: "Caderno de erros", minutes: reviewMin });
  if (essayMin) {
    const first = days[Math.min(1, days.length - 1)]!;
    if (essayMin < 90) {
      place(first, { kind: "Redação", subject: "Treino de redação (30 linhas) e revisão", minutes: essayMin });
    } else {
      const review = round15(essayMin / 3);
      place(first, { kind: "Redação", subject: "Treino de redação (30 linhas)", minutes: essayMin - review });
      place(days[Math.min(days.length - 1, Math.floor(days.length / 2) + 1)]!, {
        kind: "Redação",
        subject: "Revisão e reescrita da redação",
        minutes: review,
      });
    }
  }

  // Quantos "quanta" de 30 min cada matéria recebe nesta semana. A parte fracionária se acumula
  // entre semanas (as matérias menores entram em semanas alternadas), então nada do tempo se perde.
  const sumShare = plan.subjects.reduce((n, s) => n + s.share, 0) || 1;
  const w = opts.weekIndex;
  const order: { name: string; minutes: number; seq: number }[] = [];
  const picks = plan.subjects.map((s, idx) => {
    const q = (forSubjects * s.share) / sumShare / QUANTUM;
    const phase = (idx * 0.618034) % 1; // defasa as matérias para o total semanal não oscilar
    const k = Math.floor(w * q + phase) - Math.floor((w - 1) * q + phase);
    const blocks = k <= 0 ? 0 : Math.ceil(k / 2);
    const size = blocks ? round15((k * QUANTUM) / blocks) : 0;
    return { name: s.name, blocks, size };
  });
  // Intercala as matérias para espalhar bem pelos dias.
  const seq = new Map<string, number>();
  for (let again = true; again; ) {
    again = false;
    for (const p of picks) {
      const done = seq.get(p.name) ?? 0;
      if (done < p.blocks) {
        order.push({ name: p.name, minutes: p.size, seq: done });
        seq.set(p.name, done + 1);
        again = true;
      }
    }
  }

  for (const blk of order) {
    const free = days.filter((d) => !out.get(d)!.some((b) => b.subject === blk.name));
    const pool = free.length ? free : days;
    const day = pool.reduce((best, d) => ((cap.get(d) ?? 0) > (cap.get(best) ?? 0) ? d : best), pool[0]!);
    const theory = plan.phase.id === "base" ? blk.seq % 2 === 0 : blk.seq === 0;
    place(day, { kind: theory ? "Teoria" : "Questões", subject: blk.name, minutes: blk.minutes });
  }

  // Ordem do dia, horários e assuntos.
  const rank: Record<BlockKind, number> = { Teoria: 0, Questões: 1, Redação: 2, "Revisão de erros": 3, Simulado: 4 };
  const taken = new Map<string, number>(); // blocos de teoria já distribuídos nesta semana, por matéria
  const lastTheory = new Map<string, string[]>();
  const startBase = toMin(opts.startTime);

  // Percorre os dias na ordem da semana para os assuntos avançarem de forma contínua.
  return days.map((d) => {
    const raws = out.get(d)!.sort((a, b) => rank[a.kind] - rank[b.kind]);
    let cursor = startBase;
    // Fim de semana: começa mais cedo (manhã), se o horário escolhido for à noite.
    if ((d === 0 || d === 6) && startBase >= 17 * 60) cursor = 9 * 60;
    const blocks: ScheduleBlock[] = raws.map((r, i) => {
      let topics: string[] = [];
      if (r.kind === "Teoria") {
        const list = topicsFor(r.subject);
        const per = r.minutes >= 60 ? 2 : 1;
        const offset = (opts.doneBefore[r.subject] ?? 0) * per + (taken.get(r.subject) ?? 0) * per;
        topics = Array.from({ length: per }, (_, j) => list[(offset + j) % list.length]!);
        taken.set(r.subject, (taken.get(r.subject) ?? 0) + 1);
        lastTheory.set(r.subject, topics);
      } else if (r.kind === "Questões") {
        topics = lastTheory.get(r.subject) ?? topicsFor(r.subject).slice(0, 1);
      } else if (r.kind === "Redação") {
        topics = r.subject.startsWith("Treino") ? ["Tema de segurança pública (use um tema da aba Modelos)"] : ["Texto escrito no treino anterior"];
      }
      const start = cursor;
      cursor += r.minutes + GAP;
      return {
        key: `${d}-${i}-${r.kind}`,
        kind: r.kind,
        subject: r.subject,
        minutes: r.minutes,
        start: toHHMM(start),
        end: toHHMM(start + r.minutes),
        topics,
        how: howTo(r.kind, r.minutes, topics),
        href: HREF[r.kind],
      };
    });
    return { day: d, blocks, minutes: blocks.reduce((n, b) => n + b.minutes, 0) };
  });
}
