export type StudyActivityKind =
  | "teoria"
  | "questoes"
  | "revisao"
  | "redacao"
  | "simulado"
  | "pausa"
  | "refeicao"
  | "exercicio"
  | "descanso";

export type StudyContentItem = {
  discipline: string;
  topic: string;
  weight?: number;
  incidence?: number;
  difficulty?: number;
};

export type StudyProgress = {
  discipline: string;
  topic: string;
  theoryDone?: boolean;
  questionsDone?: number;
  accuracy?: number | null;
  lastStudiedAt?: string | null;
};

export type StudyPlanConfig = {
  startDate: string;
  examDate: string;
  studyDays: number[];
  weeklyHours: number;
  startTime: string;
  mealTimes?: string[];
  breakEveryMinutes?: number;
  breakMinutes?: number;
  sessionMinutes?: number;
  includeWriting?: boolean;
  includeMockExam?: boolean;
};

export type StudyPlanEvent = {
  id: string;
  date: string;
  start: string;
  end: string;
  kind: StudyActivityKind;
  discipline?: string;
  topic?: string;
  phase: "base" | "pratica" | "revisao" | "final";
  generated: true;
};

export type StudyPlanWeek = { week: number; startDate: string; endDate: string; events: StudyPlanEvent[] };

const DAY_MS = 86_400_000;
const isoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const parseDate = (value: string) => { const [y, m, d] = value.split("-").map(Number); return new Date(y || 1970, (m || 1) - 1, d || 1); };
const addDays = (date: Date, days: number) => new Date(date.getTime() + days * DAY_MS);
const minutes = (time: string) => { const [h, m] = time.split(":").map(Number); return (h || 0) * 60 + (m || 0); };
const hhmm = (value: number) => `${String(Math.floor(value / 60) % 24).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

function contentPriority(item: StudyContentItem, progress: StudyProgress | undefined) {
  const weight = item.weight ?? 1;
  const incidence = item.incidence ?? 1;
  const difficulty = item.difficulty ?? 1;
  const accuracy = progress?.accuracy ?? 0;
  const completionPenalty = progress?.theoryDone ? 0.35 : 1;
  const weakness = accuracy > 0 && accuracy < 70 ? 1.35 : 1;
  return weight * incidence * difficulty * completionPenalty * weakness;
}

function phaseFor(week: number, totalWeeks: number): StudyPlanEvent["phase"] {
  if (totalWeeks <= 2 || week >= totalWeeks - 1) return "final";
  if (week >= Math.ceil(totalWeeks * 0.65)) return "revisao";
  if (week >= Math.ceil(totalWeeks * 0.35)) return "pratica";
  return "base";
}

export function buildStudyPlan(config: StudyPlanConfig, content: StudyContentItem[], progress: StudyProgress[] = []): StudyPlanWeek[] {
  const days = [...new Set(config.studyDays)].filter((day) => day >= 0 && day <= 6);
  if (!days.length || !content.length || config.weeklyHours <= 0) return [];
  const start = parseDate(config.startDate);
  const exam = parseDate(config.examDate);
  const usableDays = Math.max(1, Math.ceil((exam.getTime() - start.getTime()) / DAY_MS));
  const totalWeeks = Math.max(1, Math.ceil(usableDays / 7));
  const minutesPerWeek = Math.max(30, Math.round(config.weeklyHours * 60));
  const session = Math.max(30, config.sessionMinutes ?? 60);
  const progressMap = new Map(progress.map((row) => [`${row.discipline}::${row.topic}`, row]));
  const ordered = [...content].sort((a, b) => contentPriority(b, progressMap.get(`${b.discipline}::${b.topic}`)) - contentPriority(a, progressMap.get(`${a.discipline}::${a.topic}`)));
  const weeks: StudyPlanWeek[] = [];
  let cursor = 0;
  for (let week = 0; week < totalWeeks; week += 1) {
    const weekStart = addDays(start, week * 7);
    const phase = phaseFor(week, totalWeeks);
    const events: StudyPlanEvent[] = [];
    for (let offset = 0; offset < 7; offset += 1) {
      const date = addDays(weekStart, offset);
      if (date >= exam || !days.includes(date.getDay())) continue;
      let at = minutes(config.startTime);
      const dailyMinutes = Math.max(session, Math.floor(minutesPerWeek / days.length));
      const slots = Math.max(1, Math.floor(dailyMinutes / session));
      for (let slot = 0; slot < slots; slot += 1) {
        const item = ordered[cursor % ordered.length]!;
        cursor += 1;
        const key = `${isoDate(date)}-${slot}`;
        const kind: StudyActivityKind = phase === "base" ? "teoria" : phase === "pratica" ? "questoes" : phase === "revisao" ? "revisao" : "simulado";
        events.push({ id: `${key}-${item.discipline}-${item.topic}`, date: isoDate(date), start: hhmm(at), end: hhmm(at + session), kind, discipline: item.discipline, topic: item.topic, phase, generated: true });
        at += session + (config.breakMinutes ?? 10);
      }
      if (config.mealTimes?.length && offset % 2 === 0) events.push({ id: `${isoDate(date)}-meal`, date: isoDate(date), start: config.mealTimes[0]!, end: hhmm(minutes(config.mealTimes[0]!) + 30), kind: "refeicao", phase, generated: true });
    }
    if (config.includeWriting && week % 2 === 1) events.push({ id: `week-${week + 1}-writing`, date: isoDate(weekStart), start: config.startTime, end: hhmm(minutes(config.startTime) + session), kind: "redacao", phase, generated: true });
    weeks.push({ week: week + 1, startDate: isoDate(weekStart), endDate: isoDate(addDays(weekStart, 6)), events: events.sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start)) });
  }
  return weeks;
}
