import test from "node:test";
import assert from "node:assert/strict";
import { readInProgressSessions, trainerResume, trainerSearchFromRoute } from "../src/lib/sessionResume.ts";
import { trainerRouteKey } from "../src/lib/internalNavigation.ts";

const store = (entries) => ({ getItem: (key) => entries[key] ?? null });
const route = trainerRouteKey({ contest: "Polícia Civil do Estado do Paraná", year: "2026", go: "1", mode: "catalog", limit: "all" });
const bookmark = (extra = {}) => ({
  version: 1,
  route,
  savedAt: 1000,
  questions: Array.from({ length: 10 }, (_, i) => ({ id: `q${i}`, source: "official" })),
  index: 4,
  results: ["ok", "err", "skipped", "ok"],
  filters: { subject: "all", contest: "Polícia Civil do Estado do Paraná", year: "2026" },
  ...extra,
});

test("the trainer summary keeps right, wrong and skipped apart and counts what is left", () => {
  const s = trainerResume(store({ "trainer-bookmark:u": JSON.stringify(bookmark()) }), "u");
  assert.equal(s.position, 5);
  assert.deepEqual([s.correct, s.wrong, s.skipped, s.answered, s.remaining, s.total], [2, 1, 1, 3, 6, 10]);
  assert.match(s.title, /Paraná/);
});

test("the link back reproduces the exact filters the session was saved with", () => {
  const s = trainerResume(store({ "trainer-bookmark:u": JSON.stringify(bookmark()) }), "u");
  assert.deepEqual(s.search, { contest: "Polícia Civil do Estado do Paraná", year: "2026", go: "1", mode: "catalog", limit: "all" });
  assert.deepEqual(trainerSearchFromRoute(route), s.search);
  assert.deepEqual(trainerSearchFromRoute('[["evil","x"],["year","2026"]]'), { year: "2026" });
  assert.deepEqual(trainerSearchFromRoute("not json"), {});
});

test("a finished, corrupt or foreign bookmark is never offered", () => {
  assert.equal(trainerResume(store({ "trainer-bookmark:u": JSON.stringify(bookmark({ index: 10 })) }), "u"), null);
  assert.equal(trainerResume(store({ "trainer-bookmark:u": "{" }), "u"), null);
  assert.equal(trainerResume(store({ "trainer-bookmark:other": JSON.stringify(bookmark()) }), "u"), null);
  assert.equal(trainerResume(store({}), "u"), null);
});

const draft = (extra = {}) => ({
  version: 1,
  owner: "u",
  scope: "contests",
  title: "Prova — PC-PR 2026",
  phase: "active",
  startedAt: 1_000_000,
  durationMinutes: 60,
  endedAt: null,
  questions: ["a", "b", "c", "d"].map((id) => ({ id })),
  answers: { a: "A", b: "B" },
  skipped: ["c", "a"],
  currentIndex: 2,
  ...extra,
});

test("the simulator summary shows answered, skipped and blank without revealing correctness", () => {
  const now = 1_000_000 + 10 * 60_000;
  const [s] = readInProgressSessions(store({ "norte:simulator:v1:u:contests": JSON.stringify(draft()) }), "u", now);
  assert.equal(s.kind, "simulator");
  assert.deepEqual([s.answered, s.skipped, s.remaining, s.position, s.total], [2, 1, 2, 3, 4]);
  assert.equal(s.correct, null);
  assert.equal(s.wrong, null);
  assert.equal(s.secondsLeft, 50 * 60);
  assert.equal(s.to, "/dashboard/mock-exams");
});

test("an expired or unsaved simulator is flagged and the ENEM scope links to its own mode", () => {
  const late = 1_000_000 + 2 * 3600_000;
  const store2 = store({
    "norte:simulator:v1:u:contests": JSON.stringify(draft()),
    "norte:simulator:v1:u:enem": JSON.stringify(draft({ phase: "result", endedAt: 1_000_500 })),
  });
  const sessions = readInProgressSessions(store2, "u", late);
  assert.equal(sessions.length, 2);
  assert.equal(sessions[0].secondsLeft, 0);
  assert.equal(sessions[1].unsavedResult, true);
  assert.deepEqual(sessions[1].search, { mode: "enem" });
});

test("guests and demo users have nothing to resume", () => {
  assert.deepEqual(readInProgressSessions(store({}), "demo-user", 0), []);
  assert.deepEqual(readInProgressSessions(store({}), "", 0), []);
});
