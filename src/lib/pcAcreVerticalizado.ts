import { pcAcVerticalCargos, type PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";

export type PcAcVerticalStatus = "a-estudar" | "estudado";

export interface PcAcVerticalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const pcAcVerticalKey = (userId: string, cargo: PcAcVerticalCargoId) =>
  `norte:pcac-verticalizado:v1:${userId}:${cargo}`;

/** Todo item de um cargo é identificado por "<bloco>::<disciplina>" para aceitar disciplinas
 * repetidas entre blocos (ex.: Legislação Institucional aparece em vários cargos). */
export function pcAcVerticalItemId(block: string, disciplineId: string) {
  return `${block}::${disciplineId}`;
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
  return pcAcVerticalCargos.find((c) => c.id === id) ?? pcAcVerticalCargos[0]!;
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
      total += 1;
      const status = progress[pcAcVerticalItemId(block.title, discipline.id)];
      if (status === "estudado") estudado += 1;
      else if (status === "a-estudar") aEstudar += 1;
    }
  return { total, estudado, aEstudar, pendente: total - estudado - aEstudar };
}
