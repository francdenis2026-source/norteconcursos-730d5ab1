/**
 * Motor do Assistente de estudos.
 * Estima o esforço necessário e distribui as horas entre as matérias a partir do perfil do aluno
 * e, conforme ele pratica, dos acertos, erros e tempo reais. Tudo é ESTIMATIVA para orientar o
 * estudo, não uma garantia de aprovação.
 */

export type Experience = "first" | "some" | "veteran";
export type CareerId = "PF" | "PRF" | "PC" | "OUTRA";

export interface CareerDef {
  id: CareerId;
  name: string;
  /** Multiplicador de dificuldade/concorrência sobre as horas-base. */
  difficulty: number;
  subjects: { name: string; weight: number; aliases: string[] }[];
}

export const CAREERS: CareerDef[] = [
  {
    id: "PF",
    name: "Polícia Federal",
    difficulty: 1.3,
    subjects: [
      { name: "Informática e Tecnologia", weight: 16, aliases: ["informatica", "tecnologia"] },
      { name: "Contabilidade", weight: 12, aliases: ["contabilidade"] },
      { name: "Estatística e Raciocínio Lógico", weight: 15, aliases: ["estatistica", "raciocinio"] },
      { name: "Língua Portuguesa", weight: 15, aliases: ["portugues", "portuguesa"] },
      { name: "Direito Administrativo", weight: 9, aliases: ["administrativo"] },
      { name: "Direito Constitucional", weight: 9, aliases: ["constitucional"] },
      { name: "Direito Penal e Processual Penal", weight: 12, aliases: ["penal"] },
      { name: "Legislação Especial e Direitos Humanos", weight: 8, aliases: ["legislacao", "direitos humanos"] },
      { name: "Atualidades e Economia", weight: 4, aliases: ["atualidades", "economia"] },
    ],
  },
  {
    id: "PRF",
    name: "Polícia Rodoviária Federal",
    difficulty: 1.2,
    subjects: [
      { name: "Legislação de Trânsito", weight: 24, aliases: ["transito"] },
      { name: "Língua Portuguesa", weight: 13, aliases: ["portugues", "portuguesa"] },
      { name: "Raciocínio Lógico-Matemático", weight: 10, aliases: ["raciocinio", "matematica"] },
      { name: "Informática", weight: 8, aliases: ["informatica"] },
      { name: "Física", weight: 10, aliases: ["fisica"] },
      { name: "Direito Constitucional e Administrativo", weight: 12, aliases: ["constitucional", "administrativo"] },
      { name: "Direito Penal e Processual Penal", weight: 13, aliases: ["penal"] },
      { name: "Ética e Direitos Humanos", weight: 6, aliases: ["etica", "direitos humanos"] },
      { name: "Geopolítica e Língua Estrangeira", weight: 4, aliases: ["geopolitica", "ingles", "espanhol"] },
    ],
  },
  {
    id: "PC",
    name: "Polícia Civil",
    difficulty: 1.0,
    subjects: [
      { name: "Direito Penal", weight: 16, aliases: ["direito penal"] },
      { name: "Direito Processual Penal", weight: 16, aliases: ["processual penal"] },
      { name: "Legislação Penal Especial", weight: 13, aliases: ["legislacao"] },
      { name: "Direito Constitucional", weight: 10, aliases: ["constitucional"] },
      { name: "Direito Administrativo", weight: 9, aliases: ["administrativo"] },
      { name: "Língua Portuguesa", weight: 13, aliases: ["portugues", "portuguesa"] },
      { name: "Informática", weight: 8, aliases: ["informatica"] },
      { name: "Raciocínio Lógico", weight: 7, aliases: ["raciocinio"] },
      { name: "Medicina Legal e Criminalística", weight: 8, aliases: ["medicina legal", "criminalistica"] },
    ],
  },
  {
    id: "OUTRA",
    name: "Outra carreira (PM, Polícia Penal, Bombeiros, Guarda…)",
    difficulty: 0.9,
    subjects: [
      { name: "Língua Portuguesa", weight: 22, aliases: ["portugues", "portuguesa"] },
      { name: "Raciocínio Lógico-Matemático", weight: 14, aliases: ["raciocinio", "matematica"] },
      { name: "Direito Constitucional", weight: 16, aliases: ["constitucional"] },
      { name: "Direito Administrativo", weight: 12, aliases: ["administrativo"] },
      { name: "Direito Penal e Processual Penal", weight: 16, aliases: ["penal"] },
      { name: "Informática", weight: 8, aliases: ["informatica"] },
      { name: "Legislação Específica e Atualidades", weight: 12, aliases: ["legislacao", "atualidades"] },
    ],
  },
];

export interface SubjectStat {
  subject: string;
  answered: number;
  correct: number;
  recent_answered: number;
  recent_correct: number;
  seconds: number;
}

export interface CoachInput {
  experience: Experience;
  career: CareerId;
  examDate: string | null; // yyyy-mm-dd
  hoursPerWeek: number;
  stats: SubjectStat[];
  /** Horas já estudadas na plataforma. */
  hoursStudied: number;
  now?: Date;
}

export interface SubjectPlan {
  name: string;
  share: number; // % do tempo semanal
  minutes: number; // por semana
  questions: number; // por semana
  answered: number;
  accuracy: number | null; // 0-100, só com amostra mínima
  trend: "up" | "down" | "flat" | null;
  hours: number; // tempo já gasto respondendo
  reason: string;
}

export interface CoachPlan {
  phase: { id: "base" | "volume" | "integration" | "final"; title: string; focus: string };
  weeksLeft: number | null;
  assumedWeeks: number;
  neededHoursPerWeek: number;
  hoursPerWeek: number;
  coverage: number; // % do necessário que a disponibilidade cobre
  feasible: boolean;
  overallAccuracy: number | null;
  totalAnswered: number;
  subjects: SubjectPlan[];
  tips: string[];
}

const BASE_HOURS: Record<Experience, number> = { first: 600, some: 400, veteran: 250 };
const PRIOR: Record<Experience, number> = { first: 0.5, some: 0.6, veteran: 0.65 };
const MIN_SAMPLE = 10; // abaixo disso a matéria ainda é "desconhecida" e ganha reforço de exploração
const PRIOR_WEIGHT = 10;
const MIN_PER_QUESTION = 2.5;

export const norm = (v: string) =>
  v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Soma as estatísticas de todas as linhas do banco que pertencem a uma matéria do edital. */
function statFor(aliases: string[], stats: SubjectStat[]): SubjectStat {
  const acc: SubjectStat = { subject: "", answered: 0, correct: 0, recent_answered: 0, recent_correct: 0, seconds: 0 };
  for (const s of stats) {
    const n = norm(s.subject);
    if (aliases.some((a) => n.includes(a))) {
      acc.answered += s.answered;
      acc.correct += s.correct;
      acc.recent_answered += s.recent_answered;
      acc.recent_correct += s.recent_correct;
      acc.seconds += s.seconds;
    }
  }
  return acc;
}

export function buildPlan(input: CoachInput): CoachPlan {
  const now = input.now ?? new Date();
  const career = CAREERS.find((c) => c.id === input.career) ?? CAREERS[CAREERS.length - 1]!;

  const weeksLeft = input.examDate
    ? Math.max(0, Math.ceil((new Date(`${input.examDate}T12:00:00`).getTime() - now.getTime()) / (7 * 86_400_000)))
    : null;
  const assumedWeeks = weeksLeft ?? 24;

  const totalAnswered = input.stats.reduce((n, s) => n + s.answered, 0);
  const totalCorrect = input.stats.reduce((n, s) => n + s.correct, 0);
  const overallAccuracy = totalAnswered >= 30 ? Math.round((100 * totalCorrect) / totalAnswered) : null;

  // Esforço total estimado: base por experiência x dificuldade; ajustado pelo desempenho real.
  const perfFactor = overallAccuracy === null ? 1 : Math.min(1.3, Math.max(0.75, 1.5 - overallAccuracy / 100));
  const totalHours = BASE_HOURS[input.experience] * career.difficulty * perfFactor;
  const remaining = Math.max(0, totalHours - input.hoursStudied);
  const neededHoursPerWeek = Math.max(1, Math.round(remaining / Math.max(1, assumedWeeks)));
  const coverage = Math.min(100, Math.round((100 * input.hoursPerWeek) / neededHoursPerWeek));

  // Fase do preparo conforme o tempo que falta.
  const w = assumedWeeks;
  const phase =
    w <= 3
      ? { id: "final" as const, title: "Reta final", focus: "Simulados completos, revisão dos erros e controle de risco." }
      : w <= 8
        ? { id: "integration" as const, title: "Integração", focus: "Simulados mistos, tempo de prova e estratégia da banca." }
        : w <= 16
          ? { id: "volume" as const, title: "Ganho de volume", focus: "Blocos de questões por assunto e revisão espaçada." }
          : { id: "base" as const, title: "Base", focus: "Teoria objetiva, lei seca vigente e primeiros blocos de questões." };

  // Distribuição: peso do edital x necessidade (erro) x exploração (pouca amostra).
  const prior = PRIOR[input.experience];
  const raw = career.subjects.map((sub) => {
    const st = statFor(sub.aliases, input.stats);
    const known = st.answered >= MIN_SAMPLE;
    const smoothed = (st.correct + prior * PRIOR_WEIGHT) / (st.answered + PRIOR_WEIGHT);
    const need = 0.5 + 2.0 * (1 - smoothed) + (known ? 0 : 0.15);
    return { sub, st, known, smoothed, weight: sub.weight * need };
  });
  const sum = raw.reduce((n, r) => n + r.weight, 0) || 1;
  const weeklyMinutes = input.hoursPerWeek * 60;
  const questionShare = phase.id === "base" ? 0.4 : phase.id === "volume" ? 0.6 : 0.75;

  const subjects: SubjectPlan[] = raw
    .map((r) => {
      const share = (100 * r.weight) / sum;
      const minutes = Math.round((weeklyMinutes * share) / 100);
      const acc = r.known ? Math.round((100 * r.st.correct) / r.st.answered) : null;
      let trend: SubjectPlan["trend"] = null;
      if (r.st.recent_answered >= 5 && r.st.answered - r.st.recent_answered >= 5) {
        const recent = r.st.recent_correct / r.st.recent_answered;
        const before = (r.st.correct - r.st.recent_correct) / (r.st.answered - r.st.recent_answered);
        trend = recent - before > 0.05 ? "up" : recent - before < -0.05 ? "down" : "flat";
      }
      const reason = !r.known
        ? `Poucos dados (${r.st.answered} questões): comece com um bloco de diagnóstico.`
        : (acc ?? 0) < 60
          ? `Acerto de ${acc}%: prioridade para corrigir a base.`
          : (acc ?? 0) < 75
            ? `Acerto de ${acc}%: mantenha o ritmo e revise os erros.`
            : `Acerto de ${acc}%: manutenção, sem tirar tempo das mais fracas.`;
      return {
        name: r.sub.name,
        share: Math.round(share * 10) / 10,
        minutes,
        questions: Math.round((minutes * questionShare) / MIN_PER_QUESTION),
        answered: r.st.answered,
        accuracy: acc,
        trend,
        hours: Math.round((r.st.seconds / 3600) * 10) / 10,
        reason,
      };
    })
    .sort((a, b) => b.share - a.share);

  const tips: string[] = [];
  if (input.experience === "first") {
    tips.push("É o seu primeiro concurso: leia o edital inteiro uma vez e marque o que já conhece. Comece pelas matérias de maior peso.");
    tips.push("Prefira sessões curtas e diárias (45–60 min) a maratonas: constância vale mais que volume no início.");
  }
  if (coverage < 70) {
    tips.push(
      weeksLeft !== null
        ? `Sua disponibilidade cobre ${coverage}% do ritmo estimado. Aumente as horas semanais ou considere uma prova mais distante.`
        : `Sua disponibilidade cobre ${coverage}% do ritmo estimado. Defina a data da prova para o plano ficar mais preciso.`,
    );
  }
  if (totalAnswered < 30) tips.push("Resolva ao menos 30 questões no Treinador: o plano passa a se ajustar aos seus acertos e erros.");
  const weakest = subjects.filter((s) => s.accuracy !== null).sort((a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0))[0];
  if (weakest && (weakest.accuracy ?? 100) < 60) tips.push(`Ponto crítico: ${weakest.name} (${weakest.accuracy}% de acerto). Já recebe mais tempo no plano.`);

  return {
    phase,
    weeksLeft,
    assumedWeeks,
    neededHoursPerWeek,
    hoursPerWeek: input.hoursPerWeek,
    coverage,
    feasible: coverage >= 70,
    overallAccuracy,
    totalAnswered,
    subjects,
    tips,
  };
}

/** O que mudou desde a última foto do plano (diferença de pontos percentuais por matéria). */
export function diffShares(prev: Record<string, number> | undefined, subjects: SubjectPlan[]) {
  if (!prev) return [];
  return subjects
    .map((s) => ({ name: s.name, delta: Math.round((s.share - (prev[s.name] ?? s.share)) * 10) / 10, now: s.share }))
    .filter((d) => Math.abs(d.delta) >= 2)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

/** Verificação rápida da lógica: node --experimental-strip-types src/lib/studyEngine.ts */
export function selfCheck() {
  const base = { experience: "first" as const, career: "PF" as const, examDate: null, hoursPerWeek: 10, hoursStudied: 0 };
  const none = buildPlan({ ...base, stats: [] });
  console.assert(Math.abs(none.subjects.reduce((n, s) => n + s.share, 0) - 100) < 0.5, "shares somam 100");
  const weak = buildPlan({
    ...base,
    stats: [{ subject: "Contabilidade", answered: 40, correct: 12, recent_answered: 0, recent_correct: 0, seconds: 0 }],
  });
  const a = none.subjects.find((s) => s.name === "Contabilidade")!.share;
  const b = weak.subjects.find((s) => s.name === "Contabilidade")!.share;
  console.assert(b > a, "matéria com muitos erros ganha mais tempo");
  return { a, b };
}
