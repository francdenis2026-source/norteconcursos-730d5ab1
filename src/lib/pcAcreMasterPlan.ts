import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import { pcAcVerticalTopicGroups } from "@/lib/pcAcreTopicStructure";
import { PCAC_COMMITMENT_LABEL, PCAC_EXAM_DATE, type PcAcCommitment } from "@/lib/pcAcreStudyPlan";
import { pcAcDisciplinePoints, pcAcDiscursiveBrief } from "@/lib/pcAcreExamWeights";

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
  | "descanso" | "pausa" | "rotina" | "exercicio" | "compromisso";

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
  /** Compromissos do aluno (trabalho, banho, médico, escola, reunião, emergência…). O estudo é
   * encaixado nos espaços livres, sem invadir esses horários. */
  commitments?: PcAcCommitment[];
}

interface StudyTask extends PcAcPlanActivity {
  minutes: number;
}

interface FixedEvent extends PcAcPlanActivity {
  minutes: number;
  start: string;
  end: string;
}

/** Ordem de estudo das disciplinas: a recorrência de cada matéria acompanha a fatia que ela vale
 * na prova objetiva (ANEXO II do edital), não a quantidade de itens do conteúdo programático.
 * Toda disciplina do cargo entra pelo menos uma vez no ciclo, e o próximo evento é sempre o da
 * matéria mais "atrasada" em relação ao seu peso, para nenhuma delas dominar a semana inteira. */
const TOPIC_CYCLE_MIN_SLOTS = 24;
const TOPIC_CYCLE_SLOTS_PER_DISCIPLINE = 5;

function createTopicCursor(cargo: PcAcVerticalCargo) {
  const pointsById = new Map(pcAcDisciplinePoints(cargo).map((row) => [row.id, row]));
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
      share: pointsById.get(discipline.id)?.share ?? 0,
    };
  })).filter((discipline) => discipline.topics.length);

  // Cada disciplina recebe slots proporcionais aos seus pontos, com o mínimo de um slot: mesmo a
  // matéria de menor peso continua no plano, porque as questões dela também valem ponto.
  const cycle = Math.max(TOPIC_CYCLE_MIN_SLOTS, disciplines.length * TOPIC_CYCLE_SLOTS_PER_DISCIPLINE);
  const extra = Math.max(0, cycle - disciplines.length);
  const totalShare = disciplines.reduce((sum, discipline) => sum + discipline.share, 0) || 1;
  const slots = disciplines.map((discipline) => 1 + Math.round(extra * discipline.share / totalShare));

  // Agendamento por próximo evento: espalha os slots de cada disciplina ao longo do ciclo.
  const step = slots.map((count) => cycle / Math.max(1, count));
  const nextAt = step.map((value) => value / 2);
  const topicIndexes = new Map<string, number>();

  return (): PcAcStudyTopic => {
    if (!disciplines.length) return { discipline: "Conteúdo do edital", disciplineId: "geral", topic: "Revisão do conteúdo programático" };
    let pick = 0;
    for (let i = 1; i < disciplines.length; i += 1) if (nextAt[i]! < nextAt[pick]!) pick = i;
    nextAt[pick] = nextAt[pick]! + step[pick]!;
    const discipline = disciplines[pick]!;
    const index = topicIndexes.get(discipline.id) ?? 0;
    topicIndexes.set(discipline.id, (index + 1) % discipline.topics.length);
    return { discipline: discipline.name, disciplineId: discipline.id, topic: discipline.topics[index]! };
  };
}

/** Revisão espaçada: todo tópico estudado volta ao plano em ~1 dia, ~7 dias e ~30 dias. Prática
 * de recuperação (fechar o material e tentar lembrar) e espaçamento são as duas técnicas com
 * melhor evidência de retenção a longo prazo, por isso o cronograma reserva tempo fixo para elas
 * em vez de deixar a revisão a critério do aluno. */
const REVIEW_OFFSETS_DAYS = [1, 7, 30];

interface ReviewItem {
  subject: string;
  topic: string;
  stage: number;
  dueIso: string;
}

function createSpacedReview() {
  const queue: ReviewItem[] = [];
  const known = new Set<string>();

  const schedule = (subject: string, topic: string, fromIso: string, stage: number) => {
    const offset = REVIEW_OFFSETS_DAYS[stage];
    if (offset === undefined) return;
    queue.push({ subject, topic, stage: stage + 1, dueIso: toIso(addDays(parseIso(fromIso), offset)) });
  };

  return {
    /** Registra o tópico estudado hoje e agenda a primeira revisão. */
    learned(subject: string | undefined, topic: string | undefined, dateIso: string) {
      if (!subject || !topic) return;
      const key = `${subject}::${topic}`;
      if (known.has(key)) return;
      known.add(key);
      schedule(subject, topic, dateIso, 0);
    },
    /** Tópicos cuja revisão está vencida até a data, dos mais antigos para os mais recentes. */
    due(dateIso: string, limit: number): ReviewItem[] {
      const ready = queue.filter((item) => item.dueIso <= dateIso).slice(0, Math.max(0, limit));
      for (const item of ready) {
        queue.splice(queue.indexOf(item), 1);
        schedule(item.subject, item.topic, dateIso, item.stage);
      }
      return ready;
    },
    pending() {
      return queue.length;
    },
  };
}

type SpacedReview = ReturnType<typeof createSpacedReview>;

const REVIEW_STAGE_LABEL = ["1ª revisão (24 h)", "2ª revisão (1 semana)", "3ª revisão (1 mês)"];

/** Blocos de revisão espaçada do dia, em fatias de no mínimo 15 minutos. */
function reviewTasks(minutes: number, dateIso: string, memory: SpacedReview): StudyTask[] {
  if (minutes < 10) return [];
  const slots = Math.max(1, Math.min(3, Math.floor(minutes / 15)));
  const items = memory.due(dateIso, slots);
  if (!items.length) return [];
  const shares = allocateMinutes(minutes, items.map(() => 1));
  return items.map((item, index) => ({
    type: "revisao" as const,
    subject: item.subject,
    topic: item.topic,
    detail: `${REVIEW_STAGE_LABEL[item.stage - 1] ?? "Revisão espaçada"}: feche o material, escreva de memória o que lembra do tópico e só depois confira o resumo para corrigir o que faltou.`,
    minutes: shares[index] ?? 0,
  })).filter((task) => task.minutes > 0);
}

/** Fatia do dia reservada à revisão espaçada em cada fase. */
function reviewShare(phase: PcAcPlanPhase): number {
  return phase === "fundamentos" ? 0.15 : phase === "pratica" ? 0.2 : 0.3;
}

function allocateMinutes(total: number, weights: number[]): number[] {
  if (!weights.length) return [];
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const values = weights.map((weight) => Math.floor(total * weight / sum));
  let remaining = total - values.reduce((a, b) => a + b, 0);
  for (let i = 0; remaining > 0; i = (i + 1) % values.length, remaining--) values[i]! += 1;
  return values;
}

function learningTasks(
  totalMinutes: number,
  phase: PcAcPlanPhase,
  nextTopic: () => PcAcStudyTopic,
  memory?: SpacedReview,
  dateIso?: string,
): StudyTask[] {
  const tasks: StudyTask[] = [];
  let remaining = totalMinutes;
  while (remaining > 0) {
    const session = Math.min(75, remaining);
    const topic = nextTopic();
    const base = { subject: topic.discipline, topic: topic.topic };
    if (memory && dateIso) memory.learned(topic.discipline, topic.topic, dateIso);
    const templates = phase === "fundamentos"
      ? [
          { type: "video" as const, weight: 20, detail: "Assista a uma videoaula introdutória do assunto, se houver material disponível." },
          { type: "teoria" as const, weight: 45, detail: "Estude a teoria e registre conceitos, regras, exceções e exemplos do tópico. Ao fechar o material, explique o assunto em voz alta com suas palavras antes de seguir." },
          { type: "questoes" as const, weight: 35, detail: "Resolva questões do tópico e anote por que cada alternativa está certa ou errada." },
        ]
      : phase === "pratica"
        ? [
            { type: "questoes" as const, weight: 60, detail: "Resolva questões direcionadas ao tópico, preferencialmente da banca IDECAN." },
            { type: "revisao" as const, weight: 20, detail: "Corrija os erros, identifique lacunas e atualize seu caderno de erros." },
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

/** Compromissos válidos para a data: os pontuais valem só no dia marcado, os recorrentes em todo
 * dia da semana escolhido. */
function commitmentsFor(options: PcAcMasterPlanOptions, weekday: number, dateIso: string): PcAcCommitment[] {
  return (options.commitments ?? []).filter((commitment) =>
    commitment.date ? commitment.date === dateIso : (commitment.days ?? []).includes(weekday));
}

function routineEvents(options: PcAcMasterPlanOptions, weekday: number, dateIso: string): FixedEvent[] {
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
  for (const commitment of commitmentsFor(options, weekday, dateIso)) {
    add(
      "compromisso",
      commitment.label?.trim() || PCAC_COMMITMENT_LABEL[commitment.kind],
      commitment.time,
      Math.max(5, Math.round(commitment.minutes)),
      commitment.date
        ? `Compromisso informado por você para esta data (${PCAC_COMMITMENT_LABEL[commitment.kind].toLocaleLowerCase("pt-BR")}). O estudo do dia foi remanejado para os horários livres.`
        : `Compromisso fixo da sua semana (${PCAC_COMMITMENT_LABEL[commitment.kind].toLocaleLowerCase("pt-BR")}). O estudo do dia foi remanejado para os horários livres.`,
    );
  }
  if (options.includeTaf && (options.tafDays ?? [2, 4, 6]).includes(weekday)) {
    add("exercicio", "Preparação física / TAF", options.tafTime ?? "17:00", options.tafDurationMinutes ?? 60,
      "Treino físico planejado pelo candidato. Ajuste intensidade e exercícios ao edital, à avaliação profissional e à sua condição física.");
  }
  // Os compromissos entram primeiro, para nenhuma refeição empurrar uma consulta ou reunião.
  const anchorFirst = (event: FixedEvent) => (event.type === "compromisso" ? 0 : 1);
  events.sort((a, b) => anchorFirst(a) - anchorFirst(b) || a.start.localeCompare(b.start));
  // Compromissos do aluno são âncoras: não saem do lugar. Refeições e treino cedem o horário e
  // seguem para o primeiro espaço livre; se o atraso passar de 90 minutos a refeição sai do plano,
  // porque nesse caso ela aconteceu fora de casa (no trabalho, por exemplo).
  const MAX_ROUTINE_DELAY = 90;
  const placed: FixedEvent[] = [];
  const collides = (start: number, minutes: number) =>
    placed.find((event) => start < toMin(event.end) && start + minutes > toMin(event.start));
  for (const event of events) {
    let start = toMin(event.start);
    let blocker = collides(start, event.minutes);
    while (blocker) {
      start = toMin(blocker.end);
      blocker = collides(start, event.minutes);
    }
    if (event.type === "rotina" && start - toMin(event.start) > MAX_ROUTINE_DELAY) continue;
    placed.push({ ...event, start: fmtMin(start), end: fmtMin(start + event.minutes) });
  }
  return placed.sort((a, b) => a.start.localeCompare(b.start));
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
  let breakCount = 0;

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
    // A cada quatro ciclos de estudo entra uma pausa longa — é o ritmo da técnica Pomodoro, cuja
    // eficácia vem das pausas regulares que sustentam a atenção ao longo do dia.
    breakCount += 1;
    const isLongBreak = breakCount % 4 === 0;
    const duration = isLongBreak ? Math.max(breakDuration, Math.min(30, breakDuration * 2)) : breakDuration;
    cursor = movePastEvents(cursor, duration);
    placed.push({
      type: "pausa",
      detail: isLongBreak
        ? `Pausa longa de ${duration} minutos: saia da mesa, caminhe, hidrate-se e descanse a visão antes do próximo ciclo.`
        : `Pausa de ${duration} minutos: levante-se, alongue-se e descanse a visão.`,
      start: fmtMin(cursor),
      end: fmtMin(cursor + duration),
      minutes: duration,
    });
    cursor += duration;
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

/** Treino de prova no fim de cada semana: simulado cronometrado e produção de texto, com
 * frequência crescente conforme a prova se aproxima. Resolver prova sob tempo é a forma mais
 * eficaz de testar o que foi aprendido e de calibrar o ritmo do dia da prova. */
function specialTasks(
  cargo: PcAcVerticalCargo,
  weekIndex: number,
  phase: PcAcPlanPhase,
  isLastStudyDay: boolean,
  availableMinutes: number,
): StudyTask[] {
  if (!isLastStudyDay || availableMinutes < 45) return [];
  const limit = Math.floor(availableMinutes * 0.6);
  if (limit < 30) return [];
  const simulado = (minutes: number, detail: string): StudyTask[] => [{ type: "simulado", detail, minutes: Math.min(minutes, limit) }];
  const redacao = (minutes: number): StudyTask[] => [{
    type: "redacao",
    detail: `Treino de prova discursiva: produza um texto completo sob tempo e revise a estrutura ao final. ${pcAcDiscursiveBrief(cargo)}`,
    minutes: Math.min(minutes, limit),
  }];

  if (phase === "revisao") {
    return weekIndex % 2 === 0
      ? simulado(90, "Simulado completo cronometrado, no formato da prova objetiva. Faça a correção comentada e leve os erros para o caderno de erros.")
      : [...simulado(60, "Simulado cronometrado das disciplinas de maior peso. Corrija na sequência e registre os erros."), ...redacao(45)];
  }
  if (phase === "pratica") {
    return weekIndex % 2 === 0
      ? simulado(75, "Simulado cronometrado das disciplinas estudadas nas últimas semanas, com correção comentada.")
      : redacao(45);
  }
  // Na fase de fundamentos o treino de prova é quinzenal: serve para diagnóstico, não para nota.
  return weekIndex >= 1 && weekIndex % 2 === 1
    ? simulado(50, "Simulado curto de diagnóstico sobre o que já foi estudado. O objetivo é medir lacunas, não acertar tudo.")
    : [];
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
  const minutesFor = (weekday: number) => {
    const dayIndex = days.indexOf(weekday);
    return dayIndex < 0 ? 0 : baseMinutes + (dayIndex < extraMinutes ? 1 : 0);
  };

  const ranges: { from: Date; to: Date }[] = [];
  let current = start;
  while (current.getTime() <= lastStudyDate.getTime()) {
    const endOfWeek = addDays(current, (7 - weekdayOf(current)) % 7);
    const end = endOfWeek.getTime() > lastStudyDate.getTime() ? lastStudyDate : endOfWeek;
    ranges.push({ from: current, to: end });
    current = addDays(endOfWeek, 1);
  }

  const totalWeeks = ranges.length;
  // Base (35%), prática em questões (35%) e revisão/simulados (30%): a reta final concentra
  // revisão espaçada e prova cronometrada, que é quando elas rendem mais.
  const foundationsWeeks = totalWeeks <= 2 ? 1 : Math.max(1, Math.round(totalWeeks * 0.35));
  const practiceWeeks = totalWeeks <= 2 ? 0 : Math.max(1, Math.round(totalWeeks * 0.35));
  const nextTopic = createTopicCursor(cargo);
  const memory = createSpacedReview();
  const weeks: PcAcPlanWeek[] = [];

  ranges.forEach(({ from, to }, weekIndex) => {
    const phase: PcAcPlanPhase = weekIndex < foundationsWeeks
      ? "fundamentos"
      : weekIndex < foundationsWeeks + practiceWeeks ? "pratica" : "revisao";
    const tafDays = opts.includeTaf ? (opts.tafDays ?? [2, 4, 6]) : [];
    const dates: Date[] = [];
    for (let date = from; date.getTime() <= to.getTime(); date = addDays(date, 1)) dates.push(date);
    const studyDates = dates.filter((date) => days.includes(weekdayOf(date)));
    const lastStudyTimestamp = studyDates.at(-1)?.getTime();

    const weekDays = dates.map((date) => {
      const weekday = weekdayOf(date);
      const dateIso = toIso(date);
      const isStudyDay = days.includes(weekday);
      const isTafDay = opts.includeTaf && tafDays.includes(weekday);
      const totalForDay = minutesFor(weekday);
      const isLastStudyDay = isStudyDay && date.getTime() === lastStudyTimestamp;
      if (!isStudyDay && !isTafDay) {
        const dayCommitments = routineEvents({ ...opts, breakfastTime: "", morningSnackTime: "", lunchTime: "", afternoonSnackTime: "", dinnerTime: "", includeTaf: false }, weekday, dateIso);
        return {
          date: dateIso,
          weekday,
          activities: [
            {
              type: "descanso" as const,
              detail: "Dia reservado para recuperação, sono, lazer e organização da próxima semana. Não é necessário compensar horas de estudo.",
            },
            ...dayCommitments,
          ],
        };
      }
      const special = isStudyDay ? specialTasks(cargo, weekIndex, phase, isLastStudyDay, totalForDay) : [];
      const specialMinutes = special.reduce((sum, task) => sum + task.minutes, 0);
      const studyMinutes = Math.max(0, totalForDay - specialMinutes);
      // Recuperação ativa: fecha o dia tentando lembrar do conteúdo sem consultar o material.
      const recallMinutes = studyMinutes >= 60 ? Math.min(15, Math.round(studyMinutes * 0.08)) : 0;
      const review = reviewTasks(Math.round((studyMinutes - recallMinutes) * reviewShare(phase)), dateIso, memory);
      const reviewMinutes = review.reduce((sum, task) => sum + task.minutes, 0);
      const coreMinutes = Math.max(0, studyMinutes - recallMinutes - reviewMinutes);
      const recall: StudyTask[] = recallMinutes > 0 ? [{
        type: "revisao",
        detail: "Recuperação ativa do dia: sem olhar o material, escreva ou diga tudo o que lembra dos tópicos de hoje; depois confira e marque no caderno de erros só o que faltou.",
        minutes: recallMinutes,
      }] : [];
      const tasks = [
        ...review,
        ...learningTasks(coreMinutes, phase, nextTopic, memory, dateIso),
        ...special,
        ...recall,
      ];
      const fixed = routineEvents(opts, weekday, dateIso);
      const activities = placeStudyTasks(
        tasks,
        opts.startTime,
        fixed,
        opts.breakEveryMinutes ?? 50,
        opts.breakDurationMinutes ?? 10,
      );
      return { date: dateIso, weekday, activities };
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
  compromisso: "Compromisso pessoal",
  exercicio: "Treino físico / TAF",
};
