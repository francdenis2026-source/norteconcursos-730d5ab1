import { INVESTIGATOR_STUDY_ORDER } from "@/data/pcAcreIdecanRadar";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";
import {
  PCAC_LAST_STUDY_OFFSET_DAYS,
  buildPcAcFinalDays,
  type PcAcActivityType,
  type PcAcPlanDay,
  type PcAcPlanPhase,
} from "@/lib/pcAcreMasterPlan";

/** Cronograma horário detalhado (06:00–22:00, todos os dias) para o Oficial Investigador da
 * PC-AC, a partir de segunda-feira 09/11/2026, com intervalos de descanso e tempo marcado para
 * teoria, questões, redação, simulado e revisão. Complementa o "Plano de estudos completo"
 * (`pcAcreMasterPlan.ts`): aquele diz O QUE estudar e em que ordem; este diz QUANDO, hora a
 * hora. Sábado é dia de simulado completo; domingo é descanso ativo (reduzido de propósito —
 * estudar 16h por dia, 7 dias por semana, por mais de dois meses não é sustentável e piora o
 * desempenho na reta final). */

export const PCAC_HOURLY_START_DATE = "2026-11-09";
const DAY_START = "06:00";
const DAY_END = "22:00";

export interface PcAcHourBlock {
  start: string;
  end: string;
  type: PcAcActivityType;
  subject?: string;
  label: string;
}

export interface PcAcHourDay {
  date: string;
  weekday: number; // 0 domingo … 6 sábado
  phase: PcAcPlanPhase;
  blocks: PcAcHourBlock[];
}

export interface PcAcHourWeek {
  weekNumber: number;
  phase: PcAcPlanPhase;
  startDate: string;
  endDate: string;
  days: PcAcHourDay[];
}

const toIso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);
const isoAt = (base: string) => new Date(`${base}T00:00:00`);

function b(start: string, end: string, type: PcAcActivityType, label: string, subject?: string): PcAcHourBlock {
  return { start, end, type, label, subject };
}

/** Segunda a sexta: 2 disciplinas por dia, revezando teoria/questões/revisão conforme a fase, e
 * redação em dias alternados (começando na fase de prática). Soma exatamente 06:00–22:00,
 * incluindo refeições e pausas. */
function buildWeekdayBlocks(phase: PcAcPlanPhase, subjectA: string, subjectB: string, withRedacao: boolean): PcAcHourBlock[] {
  const blocks: PcAcHourBlock[] = [
    b("06:00", "06:20", "rotina", "Acordar, café da manhã e organização do dia."),
  ];
  if (phase === "fundamentos") {
    blocks.push(
      b("06:20", "08:10", "teoria", `Teoria: ${subjectA} — leitura ativa e resumo.`, subjectA),
      b("08:10", "08:25", "pausa", "Intervalo curto."),
      b("08:25", "10:15", "teoria", `Teoria: ${subjectB} — leitura ativa e resumo.`, subjectB),
      b("10:15", "10:30", "pausa", "Intervalo curto."),
      b("10:30", "12:00", "questoes", `Questões: ${subjectA}, revisando cada erro.`, subjectA),
      b("12:00", "13:30", "pausa", "Almoço e descanso."),
      b("13:30", "15:00", "questoes", `Questões: ${subjectB}, revisando cada erro.`, subjectB),
      b("15:00", "15:15", "pausa", "Intervalo curto."),
      b("15:15", "16:45", "revisao", `Revisão: pontos marcados como fracos em ${subjectA} e ${subjectB}.`),
      b("16:45", "17:00", "pausa", "Intervalo curto."),
      b("17:00", "19:00", "teoria", `Teoria: continuação de ${subjectA} ou próxima disciplina do Anexo III.`, subjectA),
      b("19:00", "20:00", "pausa", "Jantar e descanso."),
      b("20:00", "21:30", "revisao", "Revisão do dia + Legislação institucional (lei seca)."),
      b("21:30", "22:00", "rotina", "Planejamento do dia seguinte e relaxamento."),
    );
  } else {
    const afternoonLabel = withRedacao
      ? "Redação: texto dissertativo-argumentativo, 20 a 30 linhas, cronometrado em 1h."
      : `Revisão: refaça as questões erradas de ${subjectA} e ${subjectB} nesta semana.`;
    blocks.push(
      b("06:20", "08:00", "questoes", `Questões: ${subjectA}, cronometradas.`, subjectA),
      b("08:00", "08:15", "pausa", "Intervalo curto."),
      b("08:15", "09:55", "questoes", `Questões: ${subjectB}, cronometradas.`, subjectB),
      b("09:55", "10:10", "pausa", "Intervalo curto."),
      b("10:10", "11:40", phase === "revisao" ? "simulado" : "teoria", phase === "revisao" ? "Simulado parcial: 40 questões, condições de prova." : `Teoria: aprofundamento de ${subjectA}.`, subjectA),
      b("11:40", "13:10", "pausa", "Almoço e descanso."),
      b("13:10", "14:40", "questoes", `Questões: mescla de bancas policiais em ${subjectA} e ${subjectB}.`),
      b("14:40", "14:55", "pausa", "Intervalo curto."),
      b("14:55", "16:25", withRedacao ? "redacao" : "revisao", afternoonLabel),
      b("16:25", "16:40", "pausa", "Intervalo curto."),
      b("16:40", "18:40", "questoes", "Questões mistas: revisão espaçada das disciplinas já estudadas."),
      b("18:40", "19:40", "pausa", "Jantar e descanso."),
      b("19:40", "21:20", "revisao", "Revisão do dia + Legislação institucional (lei seca)."),
      b("21:20", "22:00", "rotina", "Planejamento do dia seguinte e relaxamento."),
    );
  }
  return blocks;
}

/** Sábado: simulado completo (100 questões, condições reais de prova) + correção detalhada. */
function buildSaturdayBlocks(): PcAcHourBlock[] {
  return [
    b("06:00", "06:20", "rotina", "Acordar, café da manhã e organização."),
    b("06:20", "10:00", "simulado", "Simulado completo: 100 questões, cronometrado, nas condições reais da prova."),
    b("10:00", "10:30", "pausa", "Intervalo."),
    b("10:30", "12:30", "revisao", "Correção do simulado: reveja cada questão errada e anote o motivo do erro."),
    b("12:30", "14:00", "pausa", "Almoço e descanso."),
    b("14:00", "15:30", "redacao", "Redação: treino cronometrado, 20 a 30 linhas."),
    b("15:30", "15:45", "pausa", "Intervalo."),
    b("15:45", "17:45", "revisao", "Revisão geral dos pontos fracos identificados na semana."),
    b("17:45", "18:15", "pausa", "Intervalo."),
    b("18:15", "19:45", "questoes", "Questões de reforço nas disciplinas de maior prioridade IDECAN."),
    b("19:45", "20:45", "pausa", "Jantar e descanso."),
    b("20:45", "22:00", "rotina", "Revisão leve e planejamento da semana seguinte."),
  ];
}

/** Domingo: descanso ativo, de propósito reduzido (ver nota no topo do arquivo). */
function buildSundayBlocks(): PcAcHourBlock[] {
  return [
    b("06:00", "09:00", "rotina", "Dormir até tarde / despertar sem despertador — recuperação é parte do plano."),
    b("09:00", "10:30", "revisao", "Revisão leve e opcional: reler resumos e flashcards, sem questões."),
    b("10:30", "22:00", "pausa", "Resto do dia livre: família, lazer, descanso. Sem conteúdo novo nem questões."),
  ];
}

function nextMonday(from: Date): Date {
  const day = from.getDay();
  const diff = day === 1 ? 0 : day === 0 ? 1 : 8 - day;
  return new Date(from.getFullYear(), from.getMonth(), from.getDate() + diff);
}

/** Monta o cronograma horário completo entre `fromDateIso` (uma segunda-feira) e 3 dias antes
 * de `examDateIso`. Mesma regra de fases e mesma ordem de prioridade do plano de estudos
 * completo, agora com hora marcada (06:00–22:00) para cada atividade. */
export function buildPcAcHourlyPlan(
  examDateIso: string = PCAC_EXAM_DATE,
  fromDateIso: string = PCAC_HOURLY_START_DATE,
): PcAcHourWeek[] {
  const examDate = isoAt(examDateIso);
  const lastStudyDate = addDays(examDate, -PCAC_LAST_STUDY_OFFSET_DAYS);
  const start = nextMonday(isoAt(fromDateIso));
  if (start.getTime() > lastStudyDate.getTime()) return [];

  const totalWeeks = Math.max(1, Math.ceil((lastStudyDate.getTime() - start.getTime() + 86_400_000) / (7 * 86_400_000)));
  const fundamentosWeeks = Math.max(1, Math.round(totalWeeks * 0.5));
  const praticaWeeks = totalWeeks <= 2 ? 0 : Math.max(1, Math.round(totalWeeks * 0.3));

  let subjectCursor = 0;
  const nextSubject = () => {
    const s = INVESTIGATOR_STUDY_ORDER[subjectCursor % INVESTIGATOR_STUDY_ORDER.length]!;
    subjectCursor += 1;
    return s.subject;
  };

  const weeks: PcAcHourWeek[] = [];
  let cursor = start;
  for (let w = 0; w < totalWeeks; w += 1) {
    const phase: PcAcPlanPhase = w < fundamentosWeeks ? "fundamentos" : w < fundamentosWeeks + praticaWeeks ? "pratica" : "revisao";
    const days: PcAcHourDay[] = [];
    for (let wd = 0; wd < 7; wd += 1) {
      const date = addDays(cursor, wd);
      if (date.getTime() > lastStudyDate.getTime()) break;
      const weekday = date.getDay();
      let blocks: PcAcHourBlock[];
      if (weekday === 0) blocks = buildSundayBlocks();
      else if (weekday === 6) blocks = buildSaturdayBlocks();
      else blocks = buildWeekdayBlocks(phase, nextSubject(), nextSubject(), wd % 2 === 1);
      days.push({ date: toIso(date), weekday, phase, blocks });
    }
    if (days.length) {
      weeks.push({ weekNumber: w + 1, phase, startDate: toIso(cursor), endDate: toIso(addDays(cursor, 6)), days });
    }
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

export { buildPcAcFinalDays };
export type { PcAcPlanDay };
export const PCAC_HOURLY_DAY_WINDOW = `${DAY_START}–${DAY_END}`;
