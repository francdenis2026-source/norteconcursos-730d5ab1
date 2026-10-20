// "Estudar depois" ligado à conta (tabela study_later_items), com o navegador como cópia local.
//
// O caderno nasceu só no localStorage. A tabela é opcional: enquanto a migração não existir no banco,
// tudo continua funcionando só neste navegador e a tela avisa isso. Nada é apagado na mesclagem.
import { isQuestionTable, parseQuestionRef, questionTableOf } from "./questionIdentity";
import { studyLaterLegacyIdentity, type StudyLaterItem } from "./studyLater";

export interface StudyLaterRow {
  user_id: string;
  question_table: string;
  question_id: string;
  reason: "saved" | "skipped";
  payload: StudyLaterItem;
  notes: string;
  reviewed: boolean;
  saved_at: string;
}

export interface StudyLaterPort {
  fetchRows(): Promise<StudyLaterRow[]>;
  upsertRows(rows: StudyLaterRow[]): Promise<void>;
  deleteRow(table: string, id: string): Promise<void>;
}

export const isMissingStudyLaterTable = (error: unknown) =>
  /PGRST205|42P01|does not exist|schema cache/i.test(
    `${(error as { code?: string })?.code ?? ""} ${(error as { message?: string })?.message ?? ""}`,
  );

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Tabela física + id do item salvo; null quando não dá para identificar com segurança. */
export function studyLaterTarget(item: StudyLaterItem) {
  const byKey = parseQuestionRef(item.key);
  if (byKey) return byKey;
  const id = String(item.question.id).toLowerCase();
  if (!UUID.test(id)) return null;
  return { table: questionTableOf(item.question), id };
}

export const studyLaterRef = (item: StudyLaterItem) => {
  const target = studyLaterTarget(item);
  return target ? `${target.table}:${target.id}` : studyLaterLegacyIdentity(item.question);
};

export function studyLaterRow(userId: string, item: StudyLaterItem): StudyLaterRow | null {
  const target = studyLaterTarget(item);
  if (!target) return null;
  return {
    user_id: userId,
    question_table: target.table,
    question_id: target.id,
    reason: item.reason === "skipped" ? "skipped" : "saved",
    payload: item,
    notes: item.notes,
    reviewed: item.reviewed,
    saved_at: item.savedAt,
  };
}

export function studyLaterFromRow(row: StudyLaterRow): StudyLaterItem | null {
  const payload = row.payload as Partial<StudyLaterItem> | null;
  if (
    !payload ||
    typeof payload.key !== "string" ||
    typeof payload.question?.id !== "string" ||
    typeof payload.question?.text !== "string" ||
    typeof payload.question?.subject !== "string" ||
    !Array.isArray(payload.alternatives) ||
    !isQuestionTable(row.question_table)
  )
    return null;
  return {
    ...(payload as StudyLaterItem),
    notes: typeof row.notes === "string" ? row.notes : (payload.notes ?? ""),
    reviewed: typeof row.reviewed === "boolean" ? row.reviewed : !!payload.reviewed,
    savedAt: row.saved_at || payload.savedAt || new Date().toISOString(),
    reason: row.reason === "skipped" ? "skipped" : "saved",
  };
}

/** União dos dois lados: nunca descarta um item; anotações e "revisada" locais ou remotos são mantidos. */
export function mergeStudyLaterItems(
  local: readonly StudyLaterItem[],
  remote: readonly StudyLaterItem[],
): StudyLaterItem[] {
  const merged = new Map<string, StudyLaterItem>();
  for (const item of local) merged.set(studyLaterRef(item), item);
  for (const item of remote) {
    const ref = studyLaterRef(item);
    const mine = merged.get(ref);
    if (!mine) {
      merged.set(ref, item);
      continue;
    }
    merged.set(ref, {
      ...mine,
      notes: mine.notes || item.notes,
      reviewed: mine.reviewed || item.reviewed,
      savedAt: Date.parse(item.savedAt) < Date.parse(mine.savedAt) ? item.savedAt : mine.savedAt,
      reason: mine.reason === "saved" || item.reason === "saved" ? "saved" : "skipped",
    });
  }
  return [...merged.values()].sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt));
}

export type StudyLaterSyncResult = { items: StudyLaterItem[]; account: boolean };

/** Mescla o caderno local com o da conta e devolve o que ficou só aqui para a conta. */
export async function syncStudyLater(
  userId: string,
  local: StudyLaterItem[],
  port: StudyLaterPort,
): Promise<StudyLaterSyncResult> {
  let rows: StudyLaterRow[];
  try {
    rows = await port.fetchRows();
  } catch (error) {
    if (isMissingStudyLaterTable(error)) return { items: local, account: false };
    throw error;
  }
  const remote = rows.flatMap((row) => studyLaterFromRow(row) ?? []);
  const items = mergeStudyLaterItems(local, remote);
  const known = new Set(remote.map(studyLaterRef));
  const pending = items.flatMap((item) => {
    const row = known.has(studyLaterRef(item)) ? null : studyLaterRow(userId, item);
    return row ? [row] : [];
  });
  if (pending.length) await port.upsertRows(pending);
  return { items, account: true };
}

/** Grava (ou atualiza) um item na conta; false quando a conta ainda não tem a tabela. */
export async function pushStudyLaterItem(
  userId: string,
  item: StudyLaterItem,
  port: StudyLaterPort,
): Promise<boolean> {
  const row = studyLaterRow(userId, item);
  if (!row) return false;
  try {
    await port.upsertRows([row]);
    return true;
  } catch (error) {
    if (isMissingStudyLaterTable(error)) return false;
    throw error;
  }
}

export async function removeStudyLaterItem(
  item: StudyLaterItem,
  port: StudyLaterPort,
): Promise<boolean> {
  const target = studyLaterTarget(item);
  if (!target) return false;
  try {
    await port.deleteRow(target.table, target.id);
    return true;
  } catch (error) {
    if (isMissingStudyLaterTable(error)) return false;
    throw error;
  }
}
