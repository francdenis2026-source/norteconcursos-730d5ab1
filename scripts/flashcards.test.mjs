import test from "node:test";
import assert from "node:assert/strict";
import { formatInterval, nextState } from "../src/lib/flashcards.ts";

const fresh = { ease: 2.5, interval_days: 0, reps: 0, lapses: 0 };
const now = new Date("2026-11-09T12:00:00.000Z");

test("first reviews follow the expected spaced repetition sequence", () => {
  const first = nextState(fresh, "good", now);
  const second = nextState(first, "good", now);
  const third = nextState(second, "good", now);
  assert.deepEqual([first.interval_days, second.interval_days, third.interval_days], [1, 3, 8]);
  assert.deepEqual([first.reps, second.reps, third.reps], [1, 2, 3]);
  assert.equal(first.due_at, "2026-11-10T12:00:00.000Z");
});

test("again resets repetitions, increments lapses and schedules ten minutes", () => {
  const prior = { ease: 2.2, interval_days: 8, reps: 3, lapses: 1 };
  const next = nextState(prior, "again", now);
  assert.equal(next.interval_days, 0);
  assert.equal(next.reps, 0);
  assert.equal(next.lapses, 2);
  assert.equal(next.ease, 2);
  assert.equal(next.due_at, "2026-11-09T12:10:00.000Z");
  assert.equal(next.label, "10 min");
});

test("hard and easy ratings adjust ease and never exceed the one-year interval", () => {
  const hard = nextState({ ease: 1.3, interval_days: 1, reps: 2, lapses: 0 }, "hard", now);
  assert.equal(hard.ease, 1.3);
  assert.equal(hard.interval_days, 1);
  const easy = nextState({ ease: 2.5, interval_days: 300, reps: 8, lapses: 0 }, "easy", now);
  assert.equal(easy.interval_days, 365);
  assert.equal(easy.ease, 2.65);
});

test("interval labels remain readable for minutes, days, months and years", () => {
  assert.equal(formatInterval(0), "10 min");
  assert.equal(formatInterval(1), "1 dia");
  assert.equal(formatInterval(14), "14 dias");
  assert.equal(formatInterval(60), "2 meses");
  assert.equal(formatInterval(365), "1,0 anos");
});
