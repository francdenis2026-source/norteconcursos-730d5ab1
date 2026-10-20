import test from "node:test";
import assert from "node:assert/strict";
import {
  READING_SCALES,
  normalizeReadingScale,
  readingScalePercent,
  showsReadingControl,
  stepReadingScale,
  READING_SCALE_INIT_SCRIPT,
} from "../src/lib/readingScale.ts";

test("the text never goes below the default size and stays inside the offered steps", () => {
  assert.equal(READING_SCALES[0], 1);
  for (const bad of [0, 0.5, 0.99, -1, NaN, null, undefined, "abc", "", 3, 99, 1.2])
    assert.equal(normalizeReadingScale(bad), 1, String(bad));
  assert.equal(normalizeReadingScale("1.5"), 1.5);
  assert.equal(normalizeReadingScale(2), 2);
});

test("stepping up and down clamps at 100% and 200%", () => {
  assert.equal(stepReadingScale(1, -1), 1);
  assert.equal(stepReadingScale(1, 1), 1.15);
  assert.equal(stepReadingScale(2, 1), 2);
  assert.equal(stepReadingScale(1.3, -1), 1.15);
  let value = 1;
  for (let i = 0; i < 20; i++) value = stepReadingScale(value, 1);
  assert.equal(value, 2);
  for (let i = 0; i < 20; i++) value = stepReadingScale(value, -1);
  assert.equal(value, 1);
  assert.equal(stepReadingScale(1.37, 1), 1.15, "unknown stored values restart from the default");
});

test("percent labels and the screens that show the control", () => {
  assert.equal(readingScalePercent(1.15), "115%");
  assert.equal(readingScalePercent(7), "100%");
  for (const p of ["/dashboard/library/codigo-penal", "/dashboard/legal-course/x", "/dashboard/errors"])
    assert.ok(showsReadingControl(p), p);
  for (const p of ["/dashboard/question-trainer", "/dashboard/mock-exams", "/desafio-diario", "/dashboard", "/dashboard/ranking", "/dashboard/profile", "/", "/dashboard/libraryx"])
    assert.ok(!showsReadingControl(p), p);
});

test("the early init script only accepts offered steps above 100%", () => {
  const run = (stored) => {
    const attrs = {};
    const props = {};
    const root = { setAttribute: (k, v) => (attrs[k] = v), style: { setProperty: (k, v) => (props[k] = v) } };
    new Function("localStorage", "document", READING_SCALE_INIT_SCRIPT)({ getItem: () => stored }, { documentElement: root });
    return { attrs, props };
  };
  assert.deepEqual(run("1.5").attrs, { "data-read-scale": "1.5" });
  assert.deepEqual(run("0.8").attrs, {});
  assert.deepEqual(run("1").attrs, {});
  assert.deepEqual(run("9").attrs, {});
  assert.deepEqual(run(null).attrs, {});
});
