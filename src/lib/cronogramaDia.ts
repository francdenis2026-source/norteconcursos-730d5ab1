/**
 * Painel do dia: transforma os blocos da semana em ETAPAS guiadas (teoria → flashcards → questões →
 * revisão de erros), com pausas entre disciplinas, simulado e redação nos dias certos.
 * Funções puras (sem rede nem relógio) para testar sem navegador.
 */
import {
  discStats, nextTopic, topicDone, type CronoConfig, type CronoDisc, type TopicProgress, type WeekBlock,
} from "@/lib/cronograma";

export type StepKind = "teoria" | "flashcards" | "questoes" | "erros" | "simulado" | "redacao" | "pausa";

export interface KindMeta {
  label: string;
  emoji: string;
  /** O que o candidato deve fazer agora, em uma frase. */
  guide: string;
  /** Classes completas (Tailwind) para não depender de montagem dinâmica. */
  bg: string; // fundo forte (gradiente)
  soft: string; // chip claro
  ring: string; // cor do anel do cronômetro
  bar: string;
}

export const KINDS: Record<StepKind, KindMeta> = {
  teoria: {
    label: "Teoria", emoji: "📖", guide: "Leia, assista ou ouça a aula. Foque em entender; resuma com suas palavras.",
    bg: "from-sky-500 to-blue-600", soft: "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200", ring: "stroke-sky-500", bar: "bg-sky-500",
  },
  flashcards: {
    label: "Flashcards", emoji: "🃏", guide: "Revise os cartões: responda de cabeça antes de virar. Marque o que errou.",
    bg: "from-violet-500 to-purple-600", soft: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200", ring: "stroke-violet-500", bar: "bg-violet-500",
  },
  questoes: {
    label: "Questões", emoji: "🎯", guide: "Resolva questões do assunto, sem consultar. Cronometre o ritmo e anote os acertos.",
    bg: "from-emerald-500 to-green-600", soft: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200", ring: "stroke-emerald-500", bar: "bg-emerald-500",
  },
  erros: {
    label: "Revisar erros", emoji: "🔁", guide: "Releia as questões que errou e entenda o porquê de cada erro antes de seguir.",
    bg: "from-rose-500 to-red-600", soft: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200", ring: "stroke-rose-500", bar: "bg-rose-500",
  },
  simulado: {
    label: "Simulado", emoji: "🏆", guide: "Simule a prova: sem pausa, sem consulta, com o tempo correndo. Revise o diagnóstico no fim.",
    bg: "from-amber-500 to-orange-600", soft: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200", ring: "stroke-amber-500", bar: "bg-amber-500",
  },
  redacao: {
    label: "Redação", emoji: "✍️", guide: "Escreva um texto completo à mão ou no Caderno de 30 linhas e confira estrutura e gramática.",
    bg: "from-fuchsia-500 to-pink-600", soft: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/20 dark:text-fuchsia-200", ring: "stroke-fuchsia-500", bar: "bg-fuchsia-500",
  },
  pausa: {
    label: "Pausa", emoji: "☕", guide: "Levante, beba água, descanse a vista. Sem celular: volte renovado.",
    bg: "from-teal-500 to-cyan-600", soft: "bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-200", ring: "stroke-teal-500", bar: "bg-teal-500",
  },
};

/** Cor de cada disciplina (rotaciona por posição), usada na Semana, no Conteúdo e no Painel do dia. */
export const DISC_COLORS = [
  { bar: "bg-sky-500", chip: "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200", border: "border-sky-300" },
  { bar: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200", border: "border-emerald-300" },
  { bar: "bg-violet-500", chip: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200", border: "border-violet-300" },
  { bar: "bg-amber-500", chip: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200", border: "border-amber-300" },
  { bar: "bg-rose-500", chip: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200", border: "border-rose-300" },
  { bar: "bg-cyan-500", chip: "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-200", border: "border-cyan-300" },
  { bar: "bg-fuchsia-500", chip: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/20 dark:text-fuchsia-200", border: "border-fuchsia-300" },
  { bar: "bg-lime-500", chip: "bg-lime-100 text-lime-800 dark:bg-lime-500/20 dark:text-lime-200", border: "border-lime-300" },
  { bar: "bg-orange-500", chip: "bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-200", border: "border-orange-300" },
  { bar: "bg-indigo-500", chip: "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200", border: "border-indigo-300" },
] as const;
export const discColor = (cfg: CronoConfig, discId: string) =>
  DISC_COLORS[Math.max(0, cfg.discs.findIndex((d) => d.id === discId)) % DISC_COLORS.length]!;

export interface DayStep {
  id: string;
  kind: StepKind;
  discId?: string;
  nome: string; // disciplina (ou título do passo)
  topicId?: string;
  topic?: string;
  minutes: number;
}

const MIN_STEP = 10;
const round5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);

/**
 * Divide um bloco de disciplina em etapas. 1ª vez na disciplina pesa na teoria; depois pesa nas questões.
 * Etapas abaixo de 10 min somem e o tempo vai para Questões (ou Teoria). A soma é sempre igual ao bloco.
 */
export function splitBlock(minutes: number, first: boolean): { kind: StepKind; minutes: number }[] {
  const mix: [StepKind, number][] = first
    ? [["teoria", 0.5], ["flashcards", 0.1], ["questoes", 0.3], ["erros", 0.1]]
    : [["teoria", 0.25], ["flashcards", 0.15], ["questoes", 0.45], ["erros", 0.15]];
  let steps = mix.map(([kind, f]) => ({ kind, minutes: minutes * f })).filter((s) => s.minutes >= MIN_STEP);
  if (!steps.length) steps = [{ kind: "questoes", minutes }];
  const leftover = minutes - steps.reduce((s, x) => s + x.minutes, 0);
  const sink = steps.find((s) => s.kind === "questoes") ?? steps[0]!;
  sink.minutes += leftover;
  // arredonda em 5 min e joga a diferença na maior etapa
  const rounded = steps.map((s) => ({ ...s, minutes: round5(s.minutes) }));
  const diff = minutes - rounded.reduce((s, x) => s + x.minutes, 0);
  const big = rounded.reduce((a, b) => (b.minutes > a.minutes ? b : a));
  big.minutes += diff;
  return rounded;
}

export interface DayOptions { simulado: boolean; essay: boolean; isLastStudyDay: boolean; isSecondLastOrOnly: boolean }

/** Passos do dia: blocos da disciplina em etapas, pausa entre disciplinas e extras (simulado/redação). */
export function buildDaySteps(
  cfg: CronoConfig, blocks: WeekBlock[], progress: Record<string, TopicProgress>, opt: DayOptions,
): DayStep[] {
  const out: DayStep[] = [];
  const taken = new Set<string>(); // evita sugerir o mesmo conteúdo duas vezes no mesmo dia
  let cumulative = 0;
  blocks.forEach((b, bi) => {
    const disc = cfg.discs.find((d) => d.id === b.discId);
    const topic = disc?.topicos.find((t) => !topicDone(progress[t.id]) && !taken.has(t.id));
    if (topic) taken.add(topic.id);
    for (const s of splitBlock(b.minutes, b.first)) {
      out.push({
        id: `${bi}-${s.kind}`, kind: s.kind, discId: b.discId, nome: b.nome, minutes: s.minutes,
        ...(topic && s.kind !== "erros" ? { topicId: topic.id, topic: topic.t } : {}),
      });
    }
    cumulative += b.minutes;
    if (bi < blocks.length - 1) {
      const long = cumulative >= 120;
      if (long) cumulative = 0;
      out.push({ id: `${bi}-pausa`, kind: "pausa", nome: long ? "Pausa longa" : "Pausa", minutes: long ? 20 : 10 });
    }
  });
  if (opt.essay && opt.isSecondLastOrOnly)
    out.push({ id: "x-redacao", kind: "redacao", nome: "Redação", minutes: 40, topic: "Escreva um texto completo e confira estrutura, argumentos e gramática." });
  if (opt.simulado && opt.isLastStudyDay)
    out.push({ id: "x-simulado", kind: "simulado", nome: "Simulado da semana", minutes: 60, topic: "Simulado completo com tempo de prova. Depois, revise o diagnóstico por disciplina." });
  return out;
}

/** Link da plataforma para cada tipo de etapa, já com a disciplina/assunto quando a ferramenta aceita. */
export function stepLink(step: DayStep): { to: string; search?: Record<string, string> } | null {
  switch (step.kind) {
    case "teoria": return { to: "/dashboard/library" };
    case "flashcards": return { to: "/dashboard/flashcards", search: { subject: step.nome } };
    case "questoes": return { to: "/dashboard/question-trainer", search: { area: step.nome, go: "1" } };
    case "erros": return { to: "/dashboard/errors" };
    case "simulado": return { to: "/dashboard/mock-exams" };
    case "redacao": return { to: "/dashboard/essays" };
    default: return null;
  }
}

export const stepMinutes = (steps: DayStep[], kinds?: StepKind[]) =>
  steps.filter((s) => !kinds || kinds.includes(s.kind)).reduce((a, s) => a + s.minutes, 0);

/** Self-check: cada bloco é dividido sem perder nem ganhar minutos, e as pausas ficam entre blocos. */
export function selfCheckDia() {
  for (const first of [true, false])
    for (const m of [30, 60, 90, 120, 150]) {
      const parts = splitBlock(m, first);
      const total = parts.reduce((s, p) => s + p.minutes, 0);
      if (total !== m) throw new Error(`bloco ${m} (${first}) somou ${total}`);
      if (parts.some((p) => p.minutes < 5 || p.minutes % 5)) throw new Error("etapa fora de múltiplos de 5");
    }
  const mk = (id: string): CronoDisc => ({ id, nome: id, peso: 1, topicos: [{ id: id + ".0", t: "t0" }, { id: id + ".1", t: "t1" }] });
  const cfg: CronoConfig = { discs: [mk("a"), mk("b")], days: [1, 2], startTime: "19:00", weeklyHours: 4 };
  const blocks: WeekBlock[] = [
    { discId: "a", nome: "a", minutes: 60, start: "19:00", end: "20:00", first: true },
    { discId: "b", nome: "b", minutes: 60, start: "20:10", end: "21:10", first: true },
  ];
  const steps = buildDaySteps(cfg, blocks, {}, { simulado: true, essay: true, isLastStudyDay: true, isSecondLastOrOnly: true });
  if (stepMinutes(steps, ["teoria", "flashcards", "questoes", "erros"]) !== 120) throw new Error("minutos de estudo");
  if (steps.filter((s) => s.kind === "pausa").length !== 1) throw new Error("uma pausa entre dois blocos");
  if (steps.at(-1)?.kind !== "simulado" || steps.at(-2)?.kind !== "redacao") throw new Error("extras no fim");
  if (discStats(cfg.discs[0]!, {}).done !== 0 || nextTopic(cfg, {})?.t.t !== "t0") throw new Error("próximo conteúdo");
  return true;
}
