import { INVESTIGATOR_STUDY_ORDER } from "@/data/pcAcreIdecanRadar";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";
import {
  PCAC_LAST_STUDY_OFFSET_DAYS,
  buildPcAcFinalDays,
  type PcAcActivityType,
  type PcAcPlanDay,
  type PcAcPlanPhase,
} from "@/lib/pcAcreMasterPlan";

/** Cronograma horário detalhado (05:00–22:00, todos os dias) para o Oficial Investigador da
 * PC-AC, a partir de segunda-feira 09/11/2026, com treino físico (05:00–06:00 e 17:30–19:00,
 * nos horários em que o Franc confirmou disponibilidade), intervalos de descanso e tempo
 * marcado para teoria, questões, redação, simulado e revisão. Complementa o "Plano de estudos
 * completo" (`pcAcreMasterPlan.ts`): aquele diz O QUE estudar e em que ordem; este diz QUANDO,
 * hora a hora. Cerca de 8h30 de estudo efetivo por dia de semana — de propósito menor que a
 * janela total, para sobrar tempo real para refeições, treino e descanso: um cronograma
 * exaustivo rende menos do que um sustentável. Sábado é dia de simulado completo; domingo é
 * descanso ativo, reduzido de propósito. */

export const PCAC_HOURLY_START_DATE = "2026-11-09";
const DAY_START = "05:00";
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
  /** As 1-2 disciplinas em foco nesta semana inteira (ver nota abaixo). */
  focusSubjects: string[];
  days: PcAcHourDay[];
}

const toIso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);
const isoAt = (base: string) => new Date(`${base}T00:00:00`);

function b(start: string, end: string, type: PcAcActivityType, label: string, subject?: string): PcAcHourBlock {
  return { start, end, type, label, ...(subject ? { subject } : {}) };
}

/** Segunda a sexta: as DUAS disciplinas em foco são as mesmas a semana inteira (`subjectA` e
 * `subjectB`) — só a atividade do dia muda (teoria → questões → revisão → redação), para a
 * semana ter um foco claro e reconhecível, em vez de trocar de disciplina todo dia. `dayIndex`
 * vai de 0 (segunda) a 4 (sexta). Treino físico fixo às 05:00–06:00 e 17:30–19:00 (disponibilidade
 * do Franc). Cerca de 8h30 de estudo efetivo (6 blocos de 1h30), o resto é treino, refeições,
 * pausas e rotina — soma exatamente 05:00–22:00. */
function buildWeekdayBlocks(phase: PcAcPlanPhase, subjectA: string, subjectB: string, dayIndex: number): PcAcHourBlock[] {
  const blocks: PcAcHourBlock[] = [
    b("05:00", "06:00", "exercicio", "Treino físico."),
    b("06:00", "06:30", "rotina", "Banho, café da manhã e organização do dia."),
  ];
  let bloco1: PcAcHourBlock;
  let bloco2: PcAcHourBlock;
  let bloco3: PcAcHourBlock;
  let bloco4: PcAcHourBlock;
  let bloco5: PcAcHourBlock;
  if (phase === "fundamentos") {
    // Segunda e terça entram em A, quarta e quinta entram em B, sexta fecha com revisão geral
    // das duas — sempre as mesmas 2 disciplinas da semana.
    const primary = dayIndex < 2 ? subjectA : subjectB;
    const secondary = dayIndex < 2 ? subjectB : subjectA;
    if (dayIndex === 4) {
      bloco1 = b("06:30", "08:00", "revisao", `Revisão geral: ${subjectA} — pontos marcados como fracos na semana.`, subjectA);
      bloco2 = b("08:15", "09:45", "revisao", `Revisão geral: ${subjectB} — pontos marcados como fracos na semana.`, subjectB);
      bloco3 = b("10:00", "11:30", "questoes", `Questões mistas: ${subjectA} e ${subjectB}.`);
      bloco4 = b("13:00", "14:30", "questoes", `Questões mistas: ${subjectA} e ${subjectB}, cronometradas.`);
      bloco5 = b("14:45", "16:15", "revisao", `Revisão: pontos marcados como fracos em ${subjectA} e ${subjectB} na semana.`);
    } else {
      bloco1 = b("06:30", "08:00", "teoria", `Teoria: ${primary} — leitura ativa e resumo.`, primary);
      bloco2 = b("08:15", "09:45", "teoria", `Teoria: ${primary} — continuação e aprofundamento.`, primary);
      bloco3 = b("10:00", "11:30", "questoes", `Questões: ${primary}, revisando cada erro.`, primary);
      bloco4 = b("13:00", "14:30", "questoes", `Questões: ${secondary}, revisando cada erro.`, secondary);
      bloco5 = b("14:45", "16:15", "revisao", `Revisão: pontos marcados como fracos em ${subjectA} e ${subjectB}.`);
    }
  } else {
    // Semana de prática: terça e sexta fecham com redação; quarta vira simulado parcial na fase
    // de revisão. As disciplinas da semana continuam as mesmas em todos os dias.
    const withRedacao = dayIndex === 1 || dayIndex === 4;
    bloco1 = b("06:30", "08:00", "questoes", `Questões: ${subjectA}, cronometradas.`, subjectA);
    bloco2 = b("08:15", "09:45", "questoes", `Questões: ${subjectB}, cronometradas.`, subjectB);
    bloco3 =
      phase === "revisao" && dayIndex === 2
        ? b("10:00", "11:30", "simulado", "Simulado parcial: 40 questões, condições de prova.")
        : b("10:00", "11:30", "teoria", `Teoria: aprofundamento de ${subjectA}.`, subjectA);
    bloco4 = b("13:00", "14:30", "questoes", `Questões mistas: ${subjectA} e ${subjectB}, mesclando bancas policiais.`);
    bloco5 = withRedacao
      ? b("14:45", "16:15", "redacao", "Redação: texto dissertativo-argumentativo, 20 a 30 linhas, cronometrado em 1h30.")
      : b("14:45", "16:15", "revisao", `Revisão: refaça as questões erradas de ${subjectA} e ${subjectB} nesta semana.`);
  }
  blocks.push(
    bloco1,
    b("08:00", "08:15", "pausa", "Intervalo curto."),
    bloco2,
    b("09:45", "10:00", "pausa", "Intervalo curto."),
    bloco3,
    b("11:30", "13:00", "pausa", "Almoço e descanso."),
    bloco4,
    b("14:30", "14:45", "pausa", "Intervalo curto."),
    bloco5,
    b("16:15", "17:30", "rotina", "Transição: banho, lanche e deslocamento."),
    b("17:30", "19:00", "exercicio", "Treino físico (tarde)."),
    b("19:00", "20:00", "rotina", "Banho, jantar e descanso."),
    b("20:00", "21:00", "revisao", "Revisão leve do dia + Legislação institucional (lei seca)."),
    b("21:00", "21:30", "rotina", "Leitura leve e organização para o dia seguinte."),
    b("21:30", "22:00", "pausa", "Tempo livre e relaxamento."),
  );
  return blocks;
}

/** Sábado: simulado completo (100 questões, condições reais de prova) + correção detalhada,
 * com os mesmos horários fixos de treino físico da semana. */
function buildSaturdayBlocks(): PcAcHourBlock[] {
  return [
    b("05:00", "06:00", "exercicio", "Treino físico."),
    b("06:00", "06:20", "rotina", "Café da manhã e organização."),
    b("06:20", "10:00", "simulado", "Simulado completo: 100 questões, cronometrado, nas condições reais da prova."),
    b("10:00", "10:30", "pausa", "Intervalo."),
    b("10:30", "12:30", "revisao", "Correção do simulado: reveja cada questão errada e anote o motivo do erro."),
    b("12:30", "14:00", "pausa", "Almoço e descanso."),
    b("14:00", "15:30", "redacao", "Redação: treino cronometrado, 20 a 30 linhas."),
    b("15:30", "15:45", "pausa", "Intervalo."),
    b("15:45", "17:30", "revisao", "Revisão geral dos pontos fracos identificados na semana."),
    b("17:30", "19:00", "exercicio", "Treino físico (tarde)."),
    b("19:00", "20:00", "pausa", "Jantar e descanso."),
    b("20:00", "21:00", "questoes", "Questões de reforço nas disciplinas de maior prioridade IDECAN."),
    b("21:00", "22:00", "rotina", "Revisão leve e planejamento da semana seguinte."),
  ];
}

/** Domingo: descanso ativo, de propósito reduzido (ver nota no topo do arquivo). O treino físico
 * aqui é opcional, não um bloco fixo como nos outros dias — domingo o corpo também descansa. */
function buildSundayBlocks(): PcAcHourBlock[] {
  return [
    b("05:00", "09:30", "rotina", "Dormir até tarde / despertar sem despertador — recuperação é parte do plano."),
    b("09:30", "10:30", "exercicio", "Treino físico leve (opcional) — sem compromisso, só se quiser."),
    b("10:30", "12:00", "revisao", "Revisão leve e opcional: reler resumos e flashcards, sem questões."),
    b("12:00", "22:00", "pausa", "Resto do dia livre: família, lazer, descanso. Sem conteúdo novo nem questões."),
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
    // Cada semana recebe 2 disciplinas fixas, na ordem de prioridade IDECAN — a semana inteira
    // gira em torno delas, em vez de trocar de disciplina a cada dia.
    const subjectA = nextSubject();
    const subjectB = nextSubject();
    const days: PcAcHourDay[] = [];
    let weekdayIndex = 0;
    for (let wd = 0; wd < 7; wd += 1) {
      const date = addDays(cursor, wd);
      if (date.getTime() > lastStudyDate.getTime()) break;
      const weekday = date.getDay();
      let blocks: PcAcHourBlock[];
      if (weekday === 0) blocks = buildSundayBlocks();
      else if (weekday === 6) blocks = buildSaturdayBlocks();
      else {
        blocks = buildWeekdayBlocks(phase, subjectA, subjectB, weekdayIndex);
        weekdayIndex += 1;
      }
      days.push({ date: toIso(date), weekday, phase, blocks });
    }
    if (days.length) {
      weeks.push({
        weekNumber: w + 1,
        phase,
        startDate: toIso(cursor),
        endDate: toIso(addDays(cursor, 6)),
        focusSubjects: [subjectA, subjectB],
        days,
      });
    }
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

export { buildPcAcFinalDays };
export type { PcAcPlanDay };
export const PCAC_HOURLY_DAY_WINDOW = `${DAY_START}–${DAY_END}`;
