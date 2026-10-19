import test from "node:test";
import assert from "node:assert/strict";
import {
  parseStudyPresence,
  freshStudyPresence,
  studyPresenceLabel,
} from "../src/lib/studyPresence.ts";
const base = { studying_now: 12, as_of: "2026-10-19T05:00:00Z", window_seconds: 90 };
test("presence accepts a server aggregate including genuine zero independently of device date", () => {
  for (const count of [0, 1, 1200]) {
    const data = { ...base, studying_now: count };
    assert.deepEqual(parseStudyPresence(data), data);
    assert.deepEqual(freshStudyPresence({ presence: data, receivedAt: 1000 }, 1500), data);
  }
});
test("malformed aggregates never produce a count", () => {
  for (const data of [
    null,
    {},
    10,
    { ...base, studying_now: -1 },
    { ...base, studying_now: 1.5 },
    { ...base, studying_now: "10" },
    { ...base, as_of: "invalid" },
    { ...base, window_seconds: 600 },
  ])
    assert.equal(parseStudyPresence(data), null);
});
test("cached responses expire by monotonic elapsed time without trusting the wall clock", () => {
  const snapshot = { presence: base, receivedAt: 1000 };
  assert.deepEqual(freshStudyPresence(snapshot, 61000), base);
  for (const now of [61001, 999, NaN, Infinity])
    assert.equal(freshStudyPresence(snapshot, now), null);
  assert.equal(freshStudyPresence(undefined, 2000), null);
});
test("accessible descriptions use correct singular and full counts", () => {
  assert.equal(studyPresenceLabel(0), "0 pessoas estudando agora");
  assert.equal(studyPresenceLabel(1), "1 pessoa estudando agora");
  assert.equal(studyPresenceLabel(1200), "1.200 pessoas estudando agora");
});
