import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import { pcAcVerticalTopicGroups } from "@/lib/pcAcreTopicStructure";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";

/** Planejador individual por cargo: usa exclusivamente disciplinas e itens do Anexo III
 * pertencentes ao cargo selecionado. A rotina pessoal é separada da carga líquida de estudo. */

export interface PcAcStudyTopic {
  discipline: string;
  topic: string;
  disciplineId: string;
}

export const PCAC_LAST_STUDY_OFFSET_DAYS = 3;

export type PcAcActivityType =
  | "teoria" | "video" | "questoes" | "redacao" | "revisao" | "simulado"
  | "descanso" | "pausa" | "rotina" | "exercicio";

export interface PcAcPlanActivity {
  type: PcAcActivityType;
  subject?: string;
  topic?: string;
  detail: string;
  start?: string;
  end?: string;
  minutes?: number;
}

export interface PcAcPlanDay {
  date: string;
  weekday: number;
  activities: PcAcPlanActivity[];
}

export type PcAcPlanPhase = "fundamentos" | "pratica" | "revisao";

export const PCAC_PHASE_LABEL: Record<PcAcPlanPhase, string> = {
  fundamentos: "Construção da base",
  pratica: "Fixação e resolução de questões",
  revisao: "Revisão, simulados e reta final",
};

export interface PcAcPlanWeek {
  weekNumber: number;
  phase: PcAcPlanPhase;
  startDate: string;
  endDate: string;
  days: PcAcPlanDay[];
}

const toIso = (d: Date) => d.toISOString().slice(0, 10);
const parseIso = (iso: string) => new Date(`${iso}T00:00:00Z`);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);
const weekdayOf = (d: Date) => d.getUTCDay();
const isValidIsoDate = (iso: string) => /^\d{4}-\d{2}-\d{2}$/.test(iso) && toIso(parseIso(iso)) === iso;
const toMin = (value: string) => { const [h, m] = value.split(":").map(Number); return (h ?? 0) * 60 + (m ?? 0); };
const fmtMin = (value: number) => `${String(Math.floor(value / 60) % 24).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

export function pcAcLastStudyDate(examDateIso: string = PCAC_EXAM_DATE): string {
  return isValidIsoDate(examDateIso) ? toIso(addDays(parseIso(examDateIso), -PCAC_LAST_STUDY_OFFSET_DAYS)) : "";
}

export interface PcAcMasterPlanOptions {
  startDate: string;
  startTime: string;
  weeklyHours: number;
  breakEveryMinutes?: number;
  breakDurationMinutes?: number;
  breakfastTime?: string;
  morningSnackTime?: string;
  lunchTime?: string;
  afternoonSnackTime?: string;
  dinnerTime?: string;
  includeTaf?: boolean;
  tafDays?: number[];
  tafTime?: string;
  tafDurationMinutes?: number;
}

interface StudyTask extends PcAcPlanActivity {
  minutes: number;
}

interface FixedEvent extends PcAcPlanActivity {
  minutes: number;
  start: string;
  end: string;
}

function createTopicCursor(cargo: PcAcVerticalCargo) {
  const disciplines = cargo.blocks.flatMap((block) => block.disciplines.map((discipline) => {
    const groups = pcAcVerticalTopicGroups(discipline);
    const topics = groups.flatMap((group) =>
      group.subtopics.length
        ? group.subtopics.map((subtopic) => group.title && group.title !== subtopic ? `${group.title}: ${subtopic}` : subtopic)
        : [group.title],
    ).filter(Boolean);
    return {
      id: discipline.id,
      name: discipline.name,
      topics: topics.length ? topics : discipline.topics?.length ? discipline.topics : [discipline.name],
      priority: /espec[ií]fic/i.test(block.title) ? 1.5 : 1,
    };
  })).filter((discipline) => discipline.topics.length);

  // Alternância ponderada: conhecimentos específicos recebem mais recorrência, sem excluir
  // nenhuma disciplina nem deixar uma única matéria dominar toda a semana.
  const order = disciplines.flatMap((discipline) => {
    const repeats = Math.max(1, Math.min(3, Math.round(discipline.priority * Math.sqrt(discipline.topics.length) / 2)));
    return Array.from({ length: repeats }, () => discipline.id);
  });
  const byId = new Map(disciplines.map((discipline) => [discipline.id, discipline]));
  const topicIndexes = new Map<string, number>();
  let cursor = 0;

  return (): PcAcStudyTopic => {
    if (!order.length) return { discipline: "Conteúdo do edital", disciplineId: "geral", topic: "Revisão do conteúdo programático" };
    const id = order[cursor % order.length]!;
    cursor += 1;
    const discipline = byId.get(id)!;
    const index = topicIndexes.get(id) ?? 0;
    topicIndexes.set(id, (index + 1) % discipline.topics.length);
    return { discipline: discipline.name, disciplineId: id, topic: discipline.topics[index]! };
  };
}

function allocateMinutes(total: number, weights: number[]): number[] {
  if (!weights.length) return [];
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const values = weights.map((weight) => Math.floor(total * weight / sum));
  let remaining = total - values.reduce((a, b) => a + b, 0);
  for (let i = 0; remaining > 0; i = (i + 1) % values.length, remaining--) values[i]! += 1;
  return values;
}

function learningTasks(totalMinutes: number, phase: PcAcPlanPhase, nextTopic: () => PcAcStudyTopic): StudyTask[] {
  const tasks: StudyTask[] = [];
  let remaining = totalMinutes;
  while (remaining > 0) {
    const session = Math.min(75, remaining);
    const topic = nextTopic();
    const base = { subject: topic.discipline, topic: topic.topic };
    const templates = phase === "fundamentos"
      ? [
          { type: "video" as const, weight: 20, detail: "Assista a uma videoaula introdutória do assunto, se houver material disponível." },
          { type: "teoria" as const, weight: 45, detail: "Estude a teoria e registre conceitos, regras, exceções e exemplos do tópico." },
          { type: "questoes" as const, weight: 35, detail: "Resolva questões do tópico e anote por que cada alternativa está certa ou errada." },
        ]
      : phase === "pratica"
        ? [
            { type: "questoes" as const, weight: 55, detail: "Resolva questões direcionadas ao tópico, preferencialmente da banca IDECAN." },
            { type: "revisao" as const, weight: 25, detail: "Corrija os erros, identifique lacunas e atualize seu caderno de erros." },
            { type: "teoria" as const, weight: 20, detail: "Retome somente os pontos teóricos em que houve dificuldade." },
          ]
        : [
            { type: "revisao" as const, weight: 40, detail: "Faça revisão ativa: tente explicar o conteúdo sem consultar o material." },
            { type: "questoes" as const, weight: 40, detail: "Resolva questões inéditas e refaça as que errou anteriormente." },
            { type: "video" as const, weight: 20, detail: "Use uma aula de revisão curta apenas para sanar dúvidas pontuais." },
          ];
    const minutes = allocateMinutes(session, templates.map((template) => template.weight));
    templates.forEach((template, index) => {
      const duration = minutes[index] ?? 0;
      if (duration > 0) tasks.push({ type: template.type, ...base, detail: template.detail, minutes: duration });
    });
    remaining -= session;
  }
  return tasks;
}

function routineEvents(options: PcAcMasterPlanOptions, weekday: number): FixedEvent[] {
  const events: FixedEvent[] = [];
  const add = (type: PcAcActivityType, title: string, time: string | undefined, duration: number, detail: string) => {
    if (!time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return;
    const start = toMin(time);
    events.push({ type, detail, minutes: duration, start: fmtMin(start), end: fmtMin(start + duration), subject: title });
  };
  add("rotina", "Café da manhã", options.breakfastTime ?? "07:00", 30, "Faça uma refeição completa e hidrate-se antes das atividades do dia.");
  add("rotina", "Lanche da manhã", options.morningSnackTime ?? "10:00", 15, "Pausa breve para lanche e hidratação.");
  add("rotina", "Almoço", options.lunchTime ?? "12:30", 60, "Almoço e descanso longe das telas.");
  add("rotina", "Lanche da tarde", options.afternoonSnackTime ?? "16:00", 15, "Lanche leve e pausa para recuperar a energia.");
  add("rotina", "Jantar", options.dinnerTime ?? "19:30", 45, "Jantar com calma e preparação para o período noturno.");
  if (options.includeTaf && (options.tafDays ?? [2, 4, 6]).includes(weekday)) {
    add("exercicio", "Preparação física / TAF", options.tafTime ?? "17:00", options.tafDurationMinutes ?? 60,
      "Treino físico planejado pelo candidato. Ajuste intensidade e exercícios ao edital, à avaliação profissional e à sua condição física.");
  }
  return events.sort((a, b) => a.start.localeCompare(b.start));
}

function overlaps(start: number, end: number, event: FixedEvent): boolean {
  return start < toMin(event.end) && end > toMin(event.start);
}

function placeStudyTasks(
  tasks: StudyTask[],
  startTime: string,
  fixed: FixedEvent[],
  breakEvery: number,
  breakDuration: number,
): PcAcPlanActivity[] {
  const placed: PcAcPlanActivity[] = [];
  let cursor = toMin(startTime);
  let studySinceBreak = 0;

  const movePastEvents = (start: number, duration: number) => {
    let next = start;
    let changed = true;
    while (changed) {
      changed = false;
      for (const event of fixed) {
        if (overlaps(next, next + duration, event)) {
          next = toMin(event.end);
          changed = true;
        }
      }
    }
    return next;
  };

  const addBreak = () => {
    cursor = movePastEvents(cursor, breakDuration);
    placed.push({
      type: "pausa",
      detail: `Pausa de ${breakDuration} minutos: levante-se, alongue-se e descanse a visão.`,
      start: fmtMin(cursor),
      end: fmtMin(cursor + breakDuration),
      minutes: breakDuration,
    });
    cursor += breakDuration;
    studySinceBreak = 0;
  };

  for (const task of tasks) {
    let remaining = task.minutes;
    while (remaining > 0) {
      const eventAhead = fixed.find((event) => toMin(event.end) > cursor && toMin(event.start) >= cursor);
      if (eventAhead && toMin(eventAhead.start) === cursor) {
        cursor = toMin(eventAhead.end);
        continue;
      }
      if (studySinceBreak >= breakEvery) addBreak();

      let available = remaining;
      if (eventAhead) available = Math.min(available, Math.max(0, toMin(eventAhead.start) - cursor));
      const untilBreak = Math.max(1, breakEvery - studySinceBreak);
      available = Math.min(available, untilBreak);

      if (available <= 0) {
        if (eventAhead) cursor = toMin(eventAhead.end);
        else addBreak();
        continue;
      }

      placed.push({
        ...task,
        detail: remaining < task.minutes ? `Continuação: ${task.detail}` : task.detail,
        start: fmtMin(cursor),
        end: fmtMin(cursor + available),
        minutes: available,
      });
      cursor += available;
      remaining -= available;
      studySinceBreak += available;
    }
  }

  return [...placed, ...fixed].sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
}

function specialTasks(
  cargo: PcAcVerticalCargo,
  weekIndex: number,
  isLastStudyDay: boolean,
  availableMinutes: number,
): StudyTask[] {
  if (!isLastStudyDay || availableMinutes < 45) return [];
  const tasks: StudyTask[] = [];
  const hasDiscursive = Boolean(cargo.exam?.discursive?.trim());
  if (hasDiscursive && weekIndex % 2 === 0) {
    const minutes = Math.min(45, availableMinutes);
    tasks.push({
      type: "redacao",
      detail: `Treino de prova discursiva: produza um texto de acordo com a orientação do edital. ${cargo.exam!.discursive}`,
      minutes,
    });
  } else if (weekIndex % 2 === 1) {
    const minutes = Math.min(60, availableMinutes);
    tasks.push({
      type: "simulado",
      detail: "Simulado objetivo cronometrado. Respeite o tempo de prova e faça a correção comentada ao terminar.",
      minutes,
    });
  }
  return tasks;
}

export function buildPcAcMasterPlan(
  studyDays: number[],
  examDateIso: string,
  opts: PcAcMasterPlanOptions,
  cargo: PcAcVerticalCargo,
): PcAcPlanWeek[] {
  const days = [...new Set(studyDays)].filter((day) => Number.isInteger(day) && day >= 0 && day <= 6).sort((a, b) => a - b);
  if (!days.length || !Number.isFinite(opts.weeklyHours) || opts.weeklyHours <= 0 || opts.weeklyHours > 80 ||
    !isValidIsoDate(opts.startDate) || !isValidIsoDate(examDateIso) ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(opts.startTime)) return [];

  const start = parseIso(opts.startDate);
  const lastStudyDate = parseIso(pcAcLastStudyDate(examDateIso));
  if (start.getTime() > lastStudyDate.getTime()) return [];

  const weeklyMinutes = Math.round(opts.weeklyHours * 60);
  const baseMinutes = Math.floor(weeklyMinutes / days.length);
  const extraMinutes = weeklyMinutes - baseMinutes * days.length;
  const minutesFor = (weekday: number) => baseMinutes + (days.indexOf(weekday) < extraMinutes ? 1 : 0);

  const ranges: { from: Date; to: Date }[] = [];
  let current = start;
  while (current.getTime() <= lastStudyDate.getTime()) {
    const endOfWeek = addDays(current, (7 - weekdayOf(current)) % 7);
    const end = endOfWeek.getTime() > lastStudyDate.getTime() ? lastStudyDate : endOfWeek;
    ranges.push({ from: current, to: end });
    current = addDays(endOfWeek, 1);
  }

  const totalWeeks = ranges.length;
  const foundationsWeeks = Math.max(1, Math.ceil(totalWeeks * 0.45));
  const practiceWeeks = totalWeeks <= 2 ? 0 : Math.max(1, Math.ceil(totalWeeks * 0.35));
  const nextTopic = createTopicCursor(cargo);
  const weeks: PcAcPlanWeek[] = [];

  ranges.forEach(({ from, to }, weekIndex) => {
    const phase: PcAcPlanPhase = weekIndex < foundationsWeeks
      ? "fundamentos"
      : weekIndex < foundationsWeeks + practiceWeeks ? "pratica" : "revisao";
    const dates: Date[] = [];
    for (let date = from; date.getTime() <= to.getTime(); date = addDays(date, 1)) {
      if (days.includes(weekdayOf(date))) dates.push(date);
    }

    const weekDays = dates.map((date, dayIndex) => {
      const weekday = weekdayOf(date);
      const totalForDay = minutesFor(weekday);
      const isLastStudyDay = dayIndex === dates.length - 1;
      const special = specialTasks(cargo, weekIndex, isLastStudyDay, totalForDay);
      const coreMinutes = Math.max(0, totalForDay - special.reduce((sum, task) => sum + task.minutes, 0));
      const tasks = [...learningTasks(coreMinutes, phase, nextTopic), ...special];
      const fixed = routineEvents(opts, weekday);
      const activities = placeStudyTasks(
        tasks,
        opts.startTime,
        fixed,
        opts.breakEveryMinutes ?? 50,
        opts.breakDurationMinutes ?? 10,
      );
      return { date: toIso(date), weekday, activities };
    });

    if (weekDays.length) weeks.push({
      weekNumber: weeks.length + 1,
      phase,
      startDate: toIso(from),
      endDate: toIso(to),
      days: weekDays,
    });
  });
  return weeks;
}

export function pcAcDaysBetween(fromIso: string, toIsoDate: string): number {
  return Math.max(0, Math.round((parseIso(toIsoDate).getTime() - parseIso(fromIso).getTime()) / 86_400_000));
}

export function buildPcAcFinalDays(examDateIso: string = PCAC_EXAM_DATE, fromIso = ""): PcAcPlanDay[] {
  const examDate = parseIso(examDateIso);
  const out: PcAcPlanDay[] = [];
  for (let offset = PCAC_LAST_STUDY_OFFSET_DAYS; offset >= 1; offset -= 1) {
    const date = addDays(examDate, -offset);
    const detail = offset === PCAC_LAST_STUDY_OFFSET_DAYS
      ? "Revisão leve: consulte resumos e caderno de erros; não inclua conteúdo novo."
      : offset === 2
        ? "Descanso ativo: organize documentos, logística da prova e priorize uma boa noite de sono."
        : "Véspera: no máximo 30 minutos de leitura leve; encerre cedo e descanse.";
    if (fromIso && toIso(date) < fromIso) continue;
    out.push({ date: toIso(date), weekday: weekdayOf(date), activities: [{ type: "descanso", detail }] });
  }
  return out;
}

export const PCAC_ACTIVITY_LABEL: Record<PcAcActivityType, string> = {
  teoria: "Teoria",
  video: "Videoaula",
  questoes: "Questões",
  redacao: "Redação",
  revisao: "Revisão",
  simulado: "Simulado",
  descanso: "Descanso",
  pausa: "Intervalo",
  rotina: "Alimentação / rotina",
  exercicio: "Treino físico / TAF",
};
