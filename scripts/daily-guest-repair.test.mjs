import test from "node:test";
import assert from "node:assert/strict";
import { planDailyGuestRepairs } from "../src/lib/dailyGuestRepair.ts";
const candidate = (i) => ({
  id: String(i),
  key: "key" + i,
  subject: "subject" + (i % 7),
  career: "career" + (i % 3),
  year: 2026,
  answer: i % 2 ? "C" : "E",
});
const stock = Array.from({ length: 200 }, (_, i) => candidate(i));
const history = Array.from({ length: 10 }, (_, i) => ({
  day: "2026-10-18",
  position: i + 1,
  question_id: String(i),
  content_key: "key" + i,
}));
test("repair replaces only three quarantined slots and preserves all seven eligible items", () => {
  const approved = stock.filter((q) => !["2", "5", "8"].includes(q.id));
  const result = planDailyGuestRepairs("2026-10-18", history, approved, 1);
  assert.deepEqual(
    result.changes.map((q) => q.position),
    [3, 6, 9],
  );
  assert.equal(result.summary[0].kept, 7);
  assert.equal(new Set(result.changes.map((q) => q.question_id)).size, 3);
  assert.ok(result.changes.every((q) => Number(q.question_id) >= 10));
  assert.deepEqual(
    planDailyGuestRepairs(
      "2026-10-18",
      [
        ...history.filter((q) => !result.changes.some((c) => c.position === q.position)),
        ...result.changes,
      ],
      approved,
      1,
    ).changes,
    [],
  );
});
test("fourteen complete days have no repeated historical IDs or content, including future reservations", () => {
  const result = planDailyGuestRepairs("2026-10-18", history, stock);
  assert.equal(result.changes.length, 130);
  assert.equal(new Set(result.changes.map((q) => q.question_id)).size, 130);
  assert.equal(new Set(result.changes.map((q) => q.content_key)).size, 130);
  assert.ok(
    result.changes.every(
      (q) =>
        !history.some((h) => h.question_id === q.question_id || h.content_key === q.content_key),
    ),
  );
  assert.equal(result.summary.at(-1).day, "2026-10-31");
});
test("insufficient reviewed stock fails instead of reusing past content or weakening eligibility", () => {
  assert.throws(
    () => planDailyGuestRepairs("2026-10-18", history, stock.slice(0, 10), 2),
    /Insufficient reviewed/,
  );
});
