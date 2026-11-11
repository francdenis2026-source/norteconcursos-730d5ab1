import type { PcAcVerticalCargo, PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";
import { pcAcVerticalTopicGroups } from "@/lib/pcAcreTopicStructure";
import { pcAcDisciplinePoints } from "@/lib/pcAcreExamWeights";

/** Data da prova objetiva do Edital nº 001 SEAD/PCAC (fonte: comunicado oficial do processo,
 * 06/11/2026) e banca responsável. Usada para o cronograma de estudos se ajustar ao tempo real
 * que falta até a prova. */
export const PCAC_EXAM_DATE = "2027-01-24";
export const PCAC_BOARD = "IDECAN";

export interface PcAcStudyBlock {
  discipline: string;
  minutes: number;
  start: string;
  end: string;
}

/** Compromissos do aluno que ocupam horário fixo no dia e que o cronograma precisa respeitar. */
export type PcAcCommitmentKind =
  | "trabalho" | "intervalo-trabalho" | "banho" | "descanso" | "deslocamento"
  | "escola" | "medico" | "reuniao" | "emergencia" | "outro";

export const PCAC_COMMITMENT_LABEL: Record<PcAcCommitmentKind, string> = {
  trabalho: "Trabalho",
  "intervalo-trabalho": "Intervalo do trabalho",
  banho: "Banho / cuidados pessoais",
  descanso: "Descanso / sono",
  deslocamento: "Deslocamento",
  escola: "Levar ou buscar filho na escola",
  medico: "Consulta médica",
  reuniao: "Reunião",
  emergencia: "Emergência",
  outro: "Outro compromisso",
};

export interface PcAcCommitment {
  id: string;
  kind: PcAcCommitmentKind;
  /** Nome livre; quando vazio usa o rótulo do tipo. */
  label?: string;
  /** Horário de início (HH:MM). */
  time: string;
  minutes: number;
  /** Compromisso recorrente: dias da semana (0 domingo … 6 sábado). */
  days?: number[];
  /** Compromisso pontual: data única (yyyy-mm-dd). Tem prioridade sobre `days`. */
  date?: string;
}

export interface PcAcStudyPlanConfig {
  weeklyHours: number;
  days: number[]; // 0 = domingo … 6 = sábado
  startTime: string; // HH:MM
  /** Primeiro dia em que o aluno pretende executar o cronograma (yyyy-mm-dd). */
  startDate: string;
  breakEveryMinutes: number;
  breakDurationMinutes: number;
  breakfastTime: string;
  morningSnackTime: string;
  lunchTime: string;
  afternoonSnackTime: string;
  dinnerTime: string;
  includeTaf: boolean;
  tafDays: number[];
  tafTime: string;
  tafDurationMinutes: number;
  /** Compromissos informados pelo aluno; o cronograma desvia o estudo em volta deles. */
  commitments: PcAcCommitment[];
}

export const DEFAULT_PCAC_STUDY_CONFIG: PcAcStudyPlanConfig = {
  weeklyHours: 12,
  days: [1, 2, 3, 4, 5, 6],
  startTime: "19:00",
  startDate: "",
  breakEveryMinutes: 50,
  breakDurationMinutes: 10,
  breakfastTime: "07:00",
  morningSnackTime: "10:00",
  lunchTime: "12:30",
  afternoonSnackTime: "16:00",
  dinnerTime: "19:30",
  includeTaf: false,
  tafDays: [2, 4, 6],
  tafTime: "17:00",
  tafDurationMinutes: 60,
  commitments: [],
};

const COMMITMENT_KINDS = new Set<string>(Object.keys(PCAC_COMMITMENT_LABEL));
const isHhMm = (value: unknown): value is string => typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

/** Valida os compromissos vindos do armazenamento local ou da conta, descartando o que não serve. */
export function sanitizePcAcCommitments(value: unknown): PcAcCommitment[] {
  if (!Array.isArray(value)) return [];
  const out: PcAcCommitment[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const raw = item as Partial<PcAcCommitment> & Record<string, unknown>;
    if (!isHhMm(raw.time) || typeof raw.kind !== "string" || !COMMITMENT_KINDS.has(raw.kind)) continue;
    const minutes = Number(raw.minutes);
    if (!Number.isFinite(minutes) || minutes < 5 || minutes > 16 * 60) continue;
    const days = Array.isArray(raw.days)
      ? [...new Set(raw.days.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6))].sort((a, b) => a - b)
      : [];
    const date = typeof raw.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.date) ? raw.date : undefined;
    if (!date && !days.length) continue;
    out.push({
      id: typeof raw.id === "string" && raw.id ? raw.id : `${raw.kind}-${raw.time}-${out.length}`,
      kind: raw.kind as PcAcCommitmentKind,
      ...(typeof raw.label === "string" && raw.label.trim() ? { label: raw.label.trim().slice(0, 80) } : {}),
      time: raw.time,
      minutes: Math.round(minutes),
      ...(date ? { date } : { days }),
    });
    if (out.length >= 40) break;
  }
  return out;
}

const MIN_BLOCK = 30;
const MAX_BLOCK = 90;

/** Peso da disciplina na semana: acompanha os pontos que ela vale na prova objetiva (ANEXO II do
 * edital). O número de itens do conteúdo programático entra apenas como ajuste fino, para uma
 * matéria extensa não ficar com blocos curtos demais. */
function disciplineWeight(share: number, topicsCount: number): number {
  return Math.max(0.01, share) * Math.sqrt(Math.max(1, topicsCount));
}

/** Dias corridos até a prova, a partir de hoje (0 se já passou). */
export function pcAcDaysUntilExam(examDateIso: string, from: Date = new Date()): number {
  const exam = new Date(`${examDateIso}T00:00:00`);
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.max(0, Math.ceil((exam.getTime() - today.getTime()) / 86_400_000));
}

const hhmm = (min: number) =>
  `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Monta a semana de estudo do cargo: distribui os minutos semanais entre as disciplinas do
 * Anexo III pelo peso de cada uma e espalha os blocos pelos dias escolhidos pelo aluno, sempre
 * no dia mais vazio. Determinístico — o mesmo cargo e a mesma configuração sempre geram a mesma
 * semana, para o aluno poder repetir a rotina. */
export function buildPcAcStudyWeek(
  cargo: PcAcVerticalCargo,
  cfg: PcAcStudyPlanConfig,
): Record<number, PcAcStudyBlock[]> {
  const days = [...new Set(cfg.days)].sort((a, b) => a - b);
  const out: Record<number, PcAcStudyBlock[]> = {};
  for (const d of days) out[d] = [];
  if (!days.length) return out;

  const shareById = new Map(pcAcDisciplinePoints(cargo).map((row) => [row.id, row.share]));
  const entries = cargo.blocks.flatMap((block) =>
    block.disciplines.map((d) => ({
      name: d.name,
      weight: disciplineWeight(
        shareById.get(d.id) ?? 0,
        Math.max(
          1,
          pcAcVerticalTopicGroups(d).reduce(
            (total, group) => total + Math.max(group.subtopics.length, 1),
            0,
          ),
        ),
      ),
    })),
  );
  if (!entries.length) return out;

  const slots = Math.max(1, Math.round((cfg.weeklyHours * 60) / MIN_BLOCK));
  const sum = entries.reduce((a, e) => a + e.weight, 0);
  const share = entries.map((e) => (e.weight / sum) * slots);
  const alloc = share.map(Math.floor);
  let left = slots - alloc.reduce((a, b) => a + b, 0);
  share
    .map((s, i) => [s - Math.floor(s), i] as const)
    .sort((a, b) => b[0] - a[0] || a[1] - b[1])
    .forEach(([, i]) => {
      if (left-- > 0) alloc[i] = (alloc[i] ?? 0) + 1;
    });

  const [startH, startM] = cfg.startTime.split(":").map(Number);
  const startMin = (startH ?? 19) * 60 + (startM ?? 0);
  const load = Object.fromEntries(days.map((d) => [d, 0])) as Record<number, number>;

  const order = entries
    .map((e, i) => ({ e, n: alloc[i] ?? 0 }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  for (const { e, n } of order) {
    let remaining = n * MIN_BLOCK;
    while (remaining > 0) {
      const m = Math.min(remaining, MAX_BLOCK);
      const day = [...days].sort((a, b) => load[a]! - load[b]! || a - b)[0]!;
      const start = startMin + load[day]!;
      out[day]!.push({ discipline: e.name, minutes: m, start: hhmm(start), end: hhmm(start + m) });
      load[day]! += m + 10;
      remaining -= m;
    }
  }
  for (const d of days) out[d]!.sort((a, b) => a.start.localeCompare(b.start));
  return out;
}

export interface PcAcWeeklyGridRow {
  id: string;
  name: string;
  peso: 1 | 2;
  totalMinutes: number;
  /** Dias da semana (0 domingo … 6 sábado) em que a disciplina aparece na semana gerada. */
  days: number[];
  /** Faixa de horário, só quando a disciplina sempre cai no mesmo horário; "variável" senão. */
  horario: string;
}

/** Vira a semana gerada por `buildPcAcStudyWeek` (organizada por dia) numa grade por disciplina —
 * o mesmo formato do cronograma em papel (disciplina · peso · horário · dias da semana marcados).
 * `pesoMap` é opcional: sem ele, toda disciplina sai com peso 1. */
export function buildPcAcWeeklyGrid(
  cargo: PcAcVerticalCargo,
  week: Record<number, PcAcStudyBlock[]>,
  pesoMap: Record<string, 1 | 2> = {},
): PcAcWeeklyGridRow[] {
  const byName = new Map<string, { minutes: number; days: Set<number>; ranges: Set<string> }>();
  for (const [dayStr, blocks] of Object.entries(week)) {
    const day = Number(dayStr);
    for (const b of blocks) {
      const cur = byName.get(b.discipline) ?? { minutes: 0, days: new Set<number>(), ranges: new Set<string>() };
      cur.minutes += b.minutes;
      cur.days.add(day);
      cur.ranges.add(`${b.start}–${b.end}`);
      byName.set(b.discipline, cur);
    }
  }

  const idByName = new Map<string, string>();
  for (const block of cargo.blocks) for (const d of block.disciplines) idByName.set(d.name, d.id);

  return [...byName.entries()]
    .map(([name, info]) => {
      const id = idByName.get(name) ?? name;
      return {
        id,
        name,
        peso: pesoMap[id] ?? 1,
        totalMinutes: info.minutes,
        days: [...info.days].sort((a, b) => a - b),
        horario: info.ranges.size === 1 ? [...info.ranges][0]! : "variável",
      };
    })
    .sort((a, b) => b.peso - a.peso || b.totalMinutes - a.totalMinutes);
}

export interface PcAcStudyPlanStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const key = (userId: string, cargo: PcAcVerticalCargoId) =>
  `norte:pcac-cronograma:v1:${userId}:${cargo}`;

export function readPcAcStudyConfig(
  storage: PcAcStudyPlanStorage,
  userId: string,
  cargo: PcAcVerticalCargoId,
): PcAcStudyPlanConfig {
  const raw = storage.getItem(key(userId, cargo));
  if (!raw) return DEFAULT_PCAC_STUDY_CONFIG;
  try {
    const parsed = JSON.parse(raw) as Partial<PcAcStudyPlanConfig>;
    const days = Array.isArray(parsed.days) ? parsed.days.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6) : null;
    return {
      weeklyHours:
        typeof parsed.weeklyHours === "number" && parsed.weeklyHours > 0
          ? parsed.weeklyHours
          : DEFAULT_PCAC_STUDY_CONFIG.weeklyHours,
      days: days?.length ? days : DEFAULT_PCAC_STUDY_CONFIG.days,
      startTime:
        typeof parsed.startTime === "string" && /^\d{2}:\d{2}$/.test(parsed.startTime)
          ? parsed.startTime
          : DEFAULT_PCAC_STUDY_CONFIG.startTime,
      startDate:
        typeof parsed.startDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(parsed.startDate)
          ? parsed.startDate
          : DEFAULT_PCAC_STUDY_CONFIG.startDate,
      breakEveryMinutes: [30, 40, 50, 60].includes(Number(parsed.breakEveryMinutes)) ? Number(parsed.breakEveryMinutes) : DEFAULT_PCAC_STUDY_CONFIG.breakEveryMinutes,
      breakDurationMinutes: [5, 10, 15].includes(Number(parsed.breakDurationMinutes)) ? Number(parsed.breakDurationMinutes) : DEFAULT_PCAC_STUDY_CONFIG.breakDurationMinutes,
      breakfastTime: typeof parsed.breakfastTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(parsed.breakfastTime) ? parsed.breakfastTime : DEFAULT_PCAC_STUDY_CONFIG.breakfastTime,
      morningSnackTime: typeof parsed.morningSnackTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(parsed.morningSnackTime) ? parsed.morningSnackTime : DEFAULT_PCAC_STUDY_CONFIG.morningSnackTime,
      lunchTime: typeof parsed.lunchTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(parsed.lunchTime) ? parsed.lunchTime : DEFAULT_PCAC_STUDY_CONFIG.lunchTime,
      afternoonSnackTime: typeof parsed.afternoonSnackTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(parsed.afternoonSnackTime) ? parsed.afternoonSnackTime : DEFAULT_PCAC_STUDY_CONFIG.afternoonSnackTime,
      dinnerTime: typeof parsed.dinnerTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(parsed.dinnerTime) ? parsed.dinnerTime : DEFAULT_PCAC_STUDY_CONFIG.dinnerTime,
      includeTaf: typeof parsed.includeTaf === "boolean" ? parsed.includeTaf : DEFAULT_PCAC_STUDY_CONFIG.includeTaf,
      tafDays: Array.isArray(parsed.tafDays) ? parsed.tafDays.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6) : DEFAULT_PCAC_STUDY_CONFIG.tafDays,
      tafTime: typeof parsed.tafTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(parsed.tafTime) ? parsed.tafTime : DEFAULT_PCAC_STUDY_CONFIG.tafTime,
      tafDurationMinutes: [30, 45, 60, 75, 90].includes(Number(parsed.tafDurationMinutes)) ? Number(parsed.tafDurationMinutes) : DEFAULT_PCAC_STUDY_CONFIG.tafDurationMinutes,
      commitments: sanitizePcAcCommitments(parsed.commitments),
    };
  } catch {
    return DEFAULT_PCAC_STUDY_CONFIG;
  }
}

export function writePcAcStudyConfig(
  storage: PcAcStudyPlanStorage,
  userId: string,
  cargo: PcAcVerticalCargoId,
  cfg: PcAcStudyPlanConfig,
) {
  storage.setItem(key(userId, cargo), JSON.stringify(cfg));
}
