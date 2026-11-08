import type { PcAcVerticalCargo, PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";
import { pcAcVerticalTopicGroups } from "@/lib/pcAcreTopicStructure";

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

export interface PcAcStudyPlanConfig {
  weeklyHours: number;
  days: number[]; // 0 = domingo … 6 = sábado
  startTime: string; // HH:MM
}

export const DEFAULT_PCAC_STUDY_CONFIG: PcAcStudyPlanConfig = {
  weeklyHours: 12,
  days: [1, 2, 3, 4, 5, 6],
  startTime: "19:00",
};

const MIN_BLOCK = 30;
const MAX_BLOCK = 90;

/** Peso da disciplina: conhecimentos específicos pesam mais que os básicos, e uma disciplina com
 * mais itens no Anexo III do edital ganha mais tempo de estudo. */
function disciplineWeight(blockTitle: string, topicsCount: number): number {
  const especifico = /espec[ií]fic/i.test(blockTitle);
  return (especifico ? 1.6 : 1) * Math.max(1, topicsCount);
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

  const entries = cargo.blocks.flatMap((block) =>
    block.disciplines.map((d) => ({
      name: d.name,
      weight: disciplineWeight(
        block.title,
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
