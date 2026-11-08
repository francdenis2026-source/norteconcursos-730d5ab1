import { pcAcVerticalCargos, type PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";

export type PcAcVerticalStatus = "a-estudar" | "estudado";

export interface PcAcVerticalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const pcAcVerticalKey = (userId: string, cargo: PcAcVerticalCargoId) =>
  `norte:pcac-verticalizado:v2:${userId}:${cargo}`;

/** Cada item rastreável é identificado por "<bloco>::<disciplina>" (quando a disciplina não tem
 * itens detalhados) ou "<bloco>::<disciplina>::<índice do item>" (um item do conteúdo
 * programático oficial dessa disciplina). O bloco entra na chave para aceitar disciplinas
 * repetidas entre blocos (ex.: Legislação Institucional aparece em vários cargos). */
export function pcAcVerticalItemId(block: string, disciplineId: string, topicIndex?: number) {
  return topicIndex === undefined
    ? `${block}::${disciplineId}`
    : `${block}::${disciplineId}::${topicIndex}`;
}

export function readPcAcVerticalProgress(
  storage: PcAcVerticalStorage,
  userId: string,
  cargo: PcAcVerticalCargoId,
): Record<string, PcAcVerticalStatus> {
  const raw = storage.getItem(pcAcVerticalKey(userId, cargo));
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const result: Record<string, PcAcVerticalStatus> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>))
      if (value === "a-estudar" || value === "estudado") result[key] = value;
    return result;
  } catch {
    return {};
  }
}

export function writePcAcVerticalProgress(
  storage: PcAcVerticalStorage,
  userId: string,
  cargo: PcAcVerticalCargoId,
  progress: Record<string, PcAcVerticalStatus>,
) {
  storage.setItem(pcAcVerticalKey(userId, cargo), JSON.stringify(progress));
}

export function pcAcVerticalCargo(id: unknown) {
  return pcAcVerticalCargos.find((c) => c.id === id) ?? pcAcVerticalCargos.find((c) => c.id === "investigador") ?? pcAcVerticalCargos[0]!;
}

export function pcAcVerticalCounts(
  cargo: (typeof pcAcVerticalCargos)[number],
  progress: Record<string, PcAcVerticalStatus>,
) {
  let total = 0;
  let estudado = 0;
  let aEstudar = 0;
  for (const block of cargo.blocks)
    for (const discipline of block.disciplines) {
      const topicsCount = discipline.topics?.length ?? 0;
      if (topicsCount === 0) {
        total += 1;
        const status = progress[pcAcVerticalItemId(block.title, discipline.id)];
        if (status === "estudado") estudado += 1;
        else if (status === "a-estudar") aEstudar += 1;
        continue;
      }
      for (let i = 0; i < topicsCount; i++) {
        total += 1;
        const status = progress[pcAcVerticalItemId(block.title, discipline.id, i)];
        if (status === "estudado") estudado += 1;
        else if (status === "a-estudar") aEstudar += 1;
      }
    }
  return { total, estudado, aEstudar, pendente: total - estudado - aEstudar };
}

/** Progresso só desta disciplina (para mostrar um selo "x/y" no cabeçalho dela). */
export function pcAcVerticalDisciplineCounts(
  block: string,
  discipline: { id: string; topics?: string[] },
  progress: Record<string, PcAcVerticalStatus>,
) {
  const topicsCount = discipline.topics?.length ?? 0;
  const total = Math.max(topicsCount, 1);
  let estudado = 0;
  let aEstudar = 0;
  if (topicsCount === 0) {
    const status = progress[pcAcVerticalItemId(block, discipline.id)];
    if (status === "estudado") estudado += 1;
    else if (status === "a-estudar") aEstudar += 1;
  } else {
    for (let i = 0; i < topicsCount; i++) {
      const status = progress[pcAcVerticalItemId(block, discipline.id, i)];
      if (status === "estudado") estudado += 1;
      else if (status === "a-estudar") aEstudar += 1;
    }
  }
  return { total, estudado, aEstudar, pendente: total - estudado - aEstudar };
}
