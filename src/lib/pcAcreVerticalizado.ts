import { pcAcVerticalCargos, type PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";
import { pcAcVerticalTopicGroups } from "@/lib/pcAcreTopicStructure";

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
export function pcAcVerticalItemId(
  block: string,
  disciplineId: string,
  topicIndex?: number,
  subtopicIndex?: number,
) {
  return topicIndex === undefined
    ? `${block}::${disciplineId}`
    : subtopicIndex === undefined
      ? `${block}::${disciplineId}::${topicIndex}`
      : `${block}::${disciplineId}::${topicIndex}::${subtopicIndex}`;
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

/** Lê o status do subtópico atual e preserva o status antigo do tópico-pai durante a transição. */
export function pcAcVerticalTopicStatus(
  progress: Record<string, PcAcVerticalStatus>,
  block: string,
  disciplineId: string,
  topicIndex: number,
  subtopicIndex?: number,
): PcAcVerticalStatus | undefined {
  const current = progress[pcAcVerticalItemId(block, disciplineId, topicIndex, subtopicIndex)];
  if (current) return current;
  return subtopicIndex === undefined
    ? undefined
    : progress[pcAcVerticalItemId(block, disciplineId, topicIndex)];
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
      const groups = pcAcVerticalTopicGroups(discipline);
      const topicsCount = groups.length;
      if (topicsCount === 0) {
        total += 1;
        const status = progress[pcAcVerticalItemId(block.title, discipline.id)];
        if (status === "estudado") estudado += 1;
        else if (status === "a-estudar") aEstudar += 1;
        continue;
      }
      for (let i = 0; i < topicsCount; i++) {
        const units = groups[i]!.subtopics.length ? groups[i]!.subtopics : [groups[i]!.title];
        for (let j = 0; j < units.length; j++) {
          total += 1;
          const status = pcAcVerticalTopicStatus(
            progress,
            block.title,
            discipline.id,
            i,
            groups[i]!.subtopics.length ? j : undefined,
          );
          if (status === "estudado") estudado += 1;
          else if (status === "a-estudar") aEstudar += 1;
        }
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
  const groups = pcAcVerticalTopicGroups(discipline);
  const topicsCount = groups.length;
  const total = Math.max(groups.reduce((sum, group) => sum + Math.max(group.subtopics.length, 1), 0), 1);
  let estudado = 0;
  let aEstudar = 0;
  if (topicsCount === 0) {
    const status = progress[pcAcVerticalItemId(block, discipline.id)];
    if (status === "estudado") estudado += 1;
    else if (status === "a-estudar") aEstudar += 1;
  } else {
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]!;
      const units = group.subtopics.length ? group.subtopics : [group.title];
      for (let j = 0; j < units.length; j++) {
        const status = pcAcVerticalTopicStatus(
          progress,
          block,
          discipline.id,
          i,
          group.subtopics.length ? j : undefined,
        );
        if (status === "estudado") estudado += 1;
        else if (status === "a-estudar") aEstudar += 1;
      }
    }
  }
  return { total, estudado, aEstudar, pendente: total - estudado - aEstudar };
}
