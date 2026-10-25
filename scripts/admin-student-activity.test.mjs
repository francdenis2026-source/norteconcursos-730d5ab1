import test from "node:test";
import assert from "node:assert/strict";
import {
  lastStudentAccess,
  sortStudents,
  activeSeconds,
  activityDuration,
} from "../src/lib/adminStudentActivity.ts";
const activity = (today, total) => ({
  today_seconds: today,
  total_seconds: total,
  sessions: 1,
  recent: [],
});
const rows = [
  {
    id: "a",
    full_name: "Álvaro",
    email: null,
    lastAccess: "2026-10-15T10:00:00Z",
    activity: activity(0, 900),
  },
  {
    id: "b",
    full_name: "Bruna",
    email: null,
    lastAccess: "2026-10-15T12:00:00Z",
    activity: activity(100, 100),
  },
  { id: "c", full_name: "Carlos", email: null, lastAccess: null, activity: null },
];
test("activity ranking uses selected period, places unknown after zero, and does not mutate rows", () => {
  assert.deepEqual(
    sortStudents(rows, "activity", "today").map((r) => r.id),
    ["b", "a", "c"],
  );
  assert.deepEqual(
    sortStudents(rows, "activity", "total").map((r) => r.id),
    ["a", "b", "c"],
  );
  assert.deepEqual(
    rows.map((r) => r.id),
    ["a", "b", "c"],
  );
  assert.equal(activeSeconds(null, "today"), null);
  assert.equal(activityDuration(null), "Indisponível");
  assert.equal(activityDuration(0), "0 s");
});
test("alphabetical sorting handles Portuguese names; latest access places missing dates last", () => {
  assert.deepEqual(
    sortStudents([...rows].reverse(), "name", "today").map((r) => r.id),
    ["a", "b", "c"],
  );
  assert.deepEqual(
    sortStudents(rows, "access", "today").map((r) => r.id),
    ["b", "a", "c"],
  );
});
test("last access includes resumed sessions after login and ignores invalid timestamps", () => {
  assert.equal(
    lastStudentAccess("2026-10-14T10:00:00Z", {
      ...activity(10, 10),
      recent: [{ last_seen_at: "invalid" }, { last_seen_at: "2026-10-15T10:00:00Z" }],
    }),
    "2026-10-15T10:00:00Z",
  );
  assert.equal(lastStudentAccess(null, null), null);
});
