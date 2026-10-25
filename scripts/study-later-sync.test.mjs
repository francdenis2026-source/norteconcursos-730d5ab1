import test from "node:test";
import assert from "node:assert/strict";
import { saveStudyLater, readStudyLater, writeStudyLater, studyLaterHas } from "../src/lib/studyLater.ts";
import {
  mergeStudyLaterItems,
  pushStudyLaterItem,
  removeStudyLaterItem,
  studyLaterFromRow,
  studyLaterRow,
  syncStudyLater,
} from "../src/lib/studyLaterSync.ts";

const ID = "30000000-0000-4000-8000-00000000000a";
const question = (extra = {}) => ({
  id: ID,
  source: "official",
  table: "board_exam_questions",
  subject: "Direito Penal",
  subtopic: null,
  text: "Analise.\n(A) Homicídio.\n(B) Furto.",
  board: "FGV",
  contest: "Concurso",
  year: "2026",
  answer: "A",
  explanation: "x",
  legalBasis: [],
  checkedAt: null,
  difficulty: "média",
  state: "",
  category: "",
  ...extra,
});
const memory = () => {
  const data = new Map();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) };
};
const fakePort = (rows = [], failWith) => {
  const calls = { upsert: [], delete: [] };
  return {
    calls,
    async fetchRows() {
      if (failWith) throw failWith;
      return rows;
    },
    async upsertRows(batch) {
      if (failWith) throw failWith;
      calls.upsert.push(...batch);
    },
    async deleteRow(table, id) {
      if (failWith) throw failWith;
      calls.delete.push([table, id]);
    },
  };
};

test("saved items are keyed by the physical table; old keys are still recognised", () => {
  const s = memory();
  const [item] = saveStudyLater(s, "u", question(), "2026-10-20T10:00:00Z", "skipped");
  assert.equal(item.key, `board_exam_questions:${ID}`);
  assert.equal(item.reason, "skipped");
  // outra tabela com o mesmo uuid é outra questão
  assert.equal(studyLaterHas([item], question({ table: "official_exam_questions" })), false);
  // item antigo "origem:id" continua sendo encontrado e não é duplicado
  const legacy = { ...item, key: `official:${ID}` };
  writeStudyLater(s, "u2", [legacy]);
  assert.equal(studyLaterHas(readStudyLater(s, "u2"), question()), true);
  assert.equal(saveStudyLater(s, "u2", question()).length, 1);
});

test("a skipped item never overwrites a deliberate save", () => {
  const s = memory();
  saveStudyLater(s, "u", question(), "2026-10-20T10:00:00Z", "saved");
  const items = saveStudyLater(s, "u", question(), "2026-10-20T11:00:00Z", "skipped");
  assert.equal(items.length, 1);
  assert.equal(items[0].reason, "saved");
});

test("rows round-trip through the account table", () => {
  const s = memory();
  const [item] = saveStudyLater(s, "u", question(), "2026-10-20T10:00:00Z", "skipped");
  const row = studyLaterRow("u", item);
  assert.deepEqual([row.question_table, row.question_id, row.reason], ["board_exam_questions", ID, "skipped"]);
  const back = studyLaterFromRow({ ...row, notes: "rever prazos", reviewed: true });
  assert.equal(back.notes, "rever prazos");
  assert.equal(back.reviewed, true);
  assert.equal(studyLaterFromRow({ ...row, payload: { nada: 1 } }), null);
});

test("merging never drops an item and keeps notes and review progress from either side", () => {
  const s = memory();
  const [local] = saveStudyLater(s, "u", question(), "2026-10-20T10:00:00Z");
  const remoteOnly = { ...local, key: "board_exam_questions:30000000-0000-4000-8000-00000000000b", question: { ...local.question, id: "30000000-0000-4000-8000-00000000000b" } };
  const remoteSame = { ...local, notes: "da conta", reviewed: true, savedAt: "2026-10-19T10:00:00Z" };
  const merged = mergeStudyLaterItems([local], [remoteSame, remoteOnly]);
  assert.equal(merged.length, 2);
  const both = merged.find((i) => i.key === local.key);
  assert.equal(both.notes, "da conta");
  assert.equal(both.reviewed, true);
  assert.equal(both.savedAt, "2026-10-19T10:00:00Z");
});

test("sync uploads what exists only in this browser and reports account availability", async () => {
  const s = memory();
  const [local] = saveStudyLater(s, "u", question(), "2026-10-20T10:00:00Z", "skipped");
  const port = fakePort([]);
  const result = await syncStudyLater("u", [local], port);
  assert.equal(result.account, true);
  assert.equal(port.calls.upsert.length, 1);
  assert.equal(port.calls.upsert[0].question_id, ID);
});

test("without the account table the notebook keeps working in this browser", async () => {
  const missing = { code: "PGRST205", message: "Could not find the table 'public.study_later_items' in the schema cache" };
  const s = memory();
  const [local] = saveStudyLater(s, "u", question());
  assert.deepEqual(await syncStudyLater("u", [local], fakePort([], missing)), { items: [local], account: false });
  assert.equal(await pushStudyLaterItem("u", local, fakePort([], missing)), false);
  assert.equal(await removeStudyLaterItem(local, fakePort([], missing)), false);
  await assert.rejects(syncStudyLater("u", [local], fakePort([], { message: "network down" })));
});

test("removing deletes the exact table and id on the account", async () => {
  const s = memory();
  const [local] = saveStudyLater(s, "u", question());
  const port = fakePort();
  assert.equal(await removeStudyLaterItem(local, port), true);
  assert.deepEqual(port.calls.delete, [["board_exam_questions", ID]]);
});
