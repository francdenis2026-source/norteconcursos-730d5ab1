import { INVESTIGATOR_DISCIPLINE_ORDER } from "@/data/pcAcreIdecanRadar";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";

/** Plano de estudos completo (semana a semana, dia a dia) para o Oficial Investigador da PC-AC,
 * organizado pela ordem de relevância da banca IDECAN já marcada em `pcAcreIdecanRadar.ts` —
 * reaproveita a mesma marcação usada nos cartões "Foco recomendado" e "Onde concentrar seu
 * tempo" do edital verticalizado, em vez de criar uma nova. Cada atividade de teoria/questões
 * cita o tópico (ou subtópico) exato do Anexo III, não só o nome da disciplina — para o aluno
 * saber na hora o que abrir no edital digital, sem adivinhar. Encerra o estudo de conteúdo novo
 * 3 dias antes da prova, deixando esses últimos dias para revisão leve e descanso. */

interface DisciplineTopics {
  name: string;
  topics: string[];
}

/** Disciplinas do Investigador (nome + tópicos do Anexo III), chaveadas pelo `id` usado em
 * `pcAcVerticalCargos` — mesma fonte do edital digital, para o plano nunca divergir dela. */
const INVESTIGATOR_DISCIPLINE_TOPICS: Record<string, DisciplineTopics> = (() => {
  const cargo = pcAcVerticalCargos.find((c) => c.id === "investigador");
  const out: Record<string, DisciplineTopics> = {};
  for (const block of cargo?.blocks ?? []) {
    for (const d of block.disciplines) {
      out[d.id] = { name: d.name, topics: d.topics?.length ? d.topics : [d.name] };
    }
  }
  return out;
})();

/** Um tópico específico a estudar: disciplina + o texto exato do item do Anexo III. */
export interface PcAcStudyTopic {
  discipline: string;
  topic: string;
}

/** Percorre `INVESTIGATOR_DISCIPLINE_ORDER` em roda-viva; cada vez que uma disciplina volta a
 * aparecer, avança para o próximo tópico dela (volta ao primeiro depois do último), para nunca
 * repetir o mesmo tópico duas vezes seguidas e cobrir o Anexo III inteiro ao longo do plano. */
function createTopicCursor() {
  const topicIndexByDiscipline: Record<string, number> = {};
  let disciplineCursor = 0;
  return (): PcAcStudyTopic => {
    const order = INVESTIGATOR_DISCIPLINE_ORDER.length ? INVESTIGATOR_DISCIPLINE_ORDER : Object.keys(INVESTIGATOR_DISCIPLINE_TOPICS);
    const disciplineId = order[disciplineCursor % order.length]!;
    disciplineCursor += 1;
    const entry = INVESTIGATOR_DISCIPLINE_TOPICS[disciplineId];
    if (!entry) return { discipline: disciplineId, topic: disciplineId };
    const topicIndex = topicIndexByDiscipline[disciplineId] ?? 0;
    topicIndexByDiscipline[disciplineId] = (topicIndex + 1) % entry.topics.length;
    return { discipline: entry.name, topic: entry.topics[topicIndex]! };
  };
}

export const PCAC_LAST_STUDY_OFFSET_DAYS = 3;

export type PcAcActivityType =
  | "teoria"
  | "questoes"
  | "redacao"
  | "revisao"
  | "simulado"
  | "descanso"
  | "pausa"
  | "rotina"
  | "exercicio";

export interface PcAcPlanActivity {
  type: PcAcActivityType;
  subject?: string;
  /** Tópico (ou subtópico) exato do Anexo III a que a atividade se refere, quando houver um. */
  topic?: string;
  detail: string;
  start?: string;
  end?: string;
  minutes?: number;
}

export interface PcAcPlanDay {
  date: string; // ISO yyyy-mm-dd
  weekday: number; // 0 domingo … 6 sábado
  activities: PcAcPlanActivity[];
}

export type PcAcPlanPhase = "fundamentos" | "pratica" | "revisao";

export const PCAC_PHASE_LABEL: Record<PcAcPlanPhase, string> = {
  fundamentos: "Base teórica por prioridade",
  pratica: "Prática intensiva e redação",
  revisao: "Simulados e revisão final",
};

export interface PcAcPlanWeek {
  weekNumber: number;
  phase: PcAcPlanPhase;
  startDate: string;
  endDate: string;
  days: PcAcPlanDay[];
}

/* Datas de calendário tratadas como YYYY-MM-DD puras (aritmética em UTC, sem fuso local),
 * para nunca deslocar um dia. */
const toIso = (d: Date) => d.toISOString().slice(0, 10);
const parseIso = (iso: string) => new Date(`${iso}T00:00:00Z`);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);
const weekdayOf = (d: Date) => d.getUTCDay();
const isValidIsoDate = (iso: string) => /^\d{4}-\d{2}-\d{2}$/.test(iso) && toIso(parseIso(iso)) === iso;

/** Último dia permitido para conteúdo novo, calculado a partir da data oficial da prova. */
export function pcAcLastStudyDate(examDateIso: string = PCAC_EXAM_DATE): string {
  return isValidIsoDate(examDateIso) ? toIso(addDays(parseIso(examDateIso), -PCAC_LAST_STUDY_OFFSET_DAYS)) : "";
}
const toMin = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return (h ?? 0) * 60 + (m ?? 0); };
const fmtMin = (min: number) => `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export interface PcAcMasterPlanOptions {
  startDate: string; // YYYY-MM-DD local
  startTime: string; // HH:MM
  weeklyHours: number;
}

/** Distribui `total` minutos entre as atividades do dia e grava início/fim sequenciais. */
function assignTimes(acts: PcAcPlanActivity[], startTime: string, total: number): PcAcPlanActivity[] {
  const weights = acts.map((a) => (a.type === "teoria" ? 3 : a.type === "simulado" ? 4 : 2));
  const sum = weights.reduce((x, y) => x + y, 0) || 1;
  let cursor = toMin(startTime);
  let used = 0;
  return acts.map((a, i) => {
    const m = i === acts.length - 1 ? total - used : Math.round((total * weights[i]!) / sum / 5) * 5;
    used += m;
    const out = { ...a, start: fmtMin(cursor), end: fmtMin(cursor + m), minutes: m };
    cursor += m;
    return out;
  });
}

const REDACAO_THEMES = [
  "atuação do investigador na apuração de crimes patrimoniais",
  "uso de tecnologia e análise de dados na investigação policial",
  "cadeia de custódia e valor da prova no inquérito policial",
  "direitos humanos e atuação policial no Acre",
  "crimes contra a administração pública e investigação financeira",
];

function activitiesForFundamentos(topic: PcAcStudyTopic, dayIndexInWeek: number): PcAcPlanActivity[] {
  const base = { subject: topic.discipline, topic: topic.topic };
  if (dayIndexInWeek === 0) {
    return [{ type: "teoria", ...base, detail: "Leia o resumo e os pontos do Anexo III, sem pressa." }];
  }
  return [
    { type: "teoria", ...base, detail: 'Continue o tópico — fixe os pontos marcados como "a estudar" no edital digital.' },
    { type: "questoes", ...base, detail: "15 a 20 questões no Treinador, revisando cada erro." },
  ];
}

function activitiesForPratica(topic: PcAcStudyTopic, isLastStudyDayOfWeek: boolean, weekIndex: number): PcAcPlanActivity[] {
  const base = { subject: topic.discipline, topic: topic.topic };
  if (isLastStudyDayOfWeek) {
    const theme = REDACAO_THEMES[weekIndex % REDACAO_THEMES.length];
    return [
      { type: "questoes", ...base, detail: "20 a 30 questões, cronometradas." },
      { type: "redacao", detail: `Texto dissertativo-argumentativo de 20 a 30 linhas sobre ${theme} (modelo da prova discursiva).` },
    ];
  }
  return [
    { type: "questoes", ...base, detail: "25 a 35 questões, misturando bancas policiais." },
    { type: "revisao", ...base, detail: "Reveja os erros do dia anterior antes de avançar." },
  ];
}

function activitiesForRevisao(topic: PcAcStudyTopic | undefined, isLastStudyDayOfWeek: boolean, weekIndex: number): PcAcPlanActivity[] {
  if (isLastStudyDayOfWeek) {
    return [{ type: "simulado", detail: "100 questões cronometradas, nas condições da prova (ver Simulados)." }];
  }
  const theme = REDACAO_THEMES[weekIndex % REDACAO_THEMES.length];
  return [
    topic
      ? { type: "revisao", subject: topic.discipline, topic: topic.topic, detail: "Refaça só as questões que errou antes." }
      : { type: "revisao", detail: "Revisão rápida dos pontos mais fracos do Anexo III." },
    { type: "redacao", detail: `Pratique novamente sobre ${theme}, cronometrando 1h.` },
  ];
}

/** Monta o plano entre a data inicial escolhida (primeiro dia possível) e o último dia de
 * conteúdo (prova − PCAC_LAST_STUDY_OFFSET_DAYS). Só agenda nos dias selecionados, no horário
 * escolhido; cada dia recebe weeklyHours/nº de dias, então semanas parciais ficam proporcionais.
 * Semana 1 vai da data inicial ao domingo; as demais, segunda a domingo. */
export function buildPcAcMasterPlan(
  studyDays: number[],
  examDateIso: string,
  opts: PcAcMasterPlanOptions,
): PcAcPlanWeek[] {
  const days = [...new Set(studyDays)].filter((d) => d >= 0 && d <= 6).sort((a, b) => a - b);
  if (
    !days.length ||
    !Number.isFinite(opts.weeklyHours) ||
    opts.weeklyHours <= 0 ||
    opts.weeklyHours > 80 ||
    !isValidIsoDate(opts.startDate) ||
    !isValidIsoDate(examDateIso) ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(opts.startTime)
  ) return [];
  const lastStudyDate = parseIso(pcAcLastStudyDate(examDateIso));
  const start = parseIso(opts.startDate);
  if (start.getTime() > lastStudyDate.getTime()) return [];

  const weeklyMin = Math.round(opts.weeklyHours * 60);
  const base = Math.floor(weeklyMin / days.length);
  const extra = weeklyMin - base * days.length;
  const minutesFor = (wd: number) => base + (days.indexOf(wd) < extra ? 1 : 0);

  // Semanas de calendário (seg–dom) recortadas por início e último dia.
  const ranges: { from: Date; to: Date }[] = [];
  let cur = start;
  while (cur.getTime() <= lastStudyDate.getTime()) {
    const toSunday = (7 - weekdayOf(cur)) % 7;
    const end = addDays(cur, toSunday);
    const to = end.getTime() > lastStudyDate.getTime() ? lastStudyDate : end;
    ranges.push({ from: cur, to });
    cur = addDays(end, 1);
  }
  const totalWeeks = ranges.length;
  const fundamentosWeeks = Math.max(1, Math.round(totalWeeks * 0.5));
  const praticaWeeks = totalWeeks <= 2 ? 0 : Math.max(1, Math.round(totalWeeks * 0.3));
  const nextTopic = createTopicCursor();

  const weeks: PcAcPlanWeek[] = [];
  ranges.forEach(({ from, to }, w) => {
    const phase: PcAcPlanPhase = w < fundamentosWeeks ? "fundamentos" : w < fundamentosWeeks + praticaWeeks ? "pratica" : "revisao";
    const dates: Date[] = [];
    for (let d = from; d.getTime() <= to.getTime(); d = addDays(d, 1)) if (days.includes(weekdayOf(d))) dates.push(d);
    const weekDays: PcAcPlanDay[] = dates.map((date, i) => {
      const isLast = i === dates.length - 1;
      let activities: PcAcPlanActivity[];
      if (phase === "fundamentos") activities = activitiesForFundamentos(nextTopic(), i);
      else if (phase === "pratica") activities = activitiesForPratica(nextTopic(), isLast, w);
      else activities = activitiesForRevisao(isLast ? undefined : nextTopic(), isLast, w);
      return { date: toIso(date), weekday: weekdayOf(date), activities: assignTimes(activities, opts.startTime, minutesFor(weekdayOf(date))) };
    });
    if (weekDays.length) weeks.push({ weekNumber: weeks.length + 1, phase, startDate: toIso(from), endDate: toIso(to), days: weekDays });
  });
  return weeks;
}

/** Dias de calendário entre duas datas YYYY-MM-DD (0 se já passou). */
export function pcAcDaysBetween(fromIso: string, toIsoDate: string): number {
  return Math.max(0, Math.round((parseIso(toIsoDate).getTime() - parseIso(fromIso).getTime()) / 86_400_000));
}

/** Os últimos dias antes da prova (não incluídos no plano de estudo novo): revisão leve e
 * descanso, para chegar na prova com a cabeça fresca. */
export function buildPcAcFinalDays(examDateIso: string = PCAC_EXAM_DATE, fromIso = ""): PcAcPlanDay[] {
  const examDate = parseIso(examDateIso);
  const out: PcAcPlanDay[] = [];
  for (let i = PCAC_LAST_STUDY_OFFSET_DAYS; i >= 1; i -= 1) {
    const date = addDays(examDate, -i);
    const detail =
      i === PCAC_LAST_STUDY_OFFSET_DAYS
        ? "Revisão leve: releia só seus próprios resumos e grifos, sem conteúdo novo nem questões longas."
        : i === 2
          ? "Descanso ativo: durma bem, organize seus documentos e o caminho até o local de prova."
          : "Véspera: revisão rápida de 30 minutos no máximo, depois descanse. Chegue descansado é mais importante que estudar mais.";
    if (fromIso && toIso(date) < fromIso) continue;
    out.push({ date: toIso(date), weekday: weekdayOf(date), activities: [{ type: "descanso", detail }] });
  }
  return out;
}

export const PCAC_ACTIVITY_LABEL: Record<PcAcActivityType, string> = {
  teoria: "Teoria",
  questoes: "Questões",
  redacao: "Redação",
  revisao: "Revisão",
  simulado: "Simulado",
  descanso: "Descanso",
  pausa: "Pausa",
  rotina: "Rotina",
  exercicio: "Treino físico",
};
