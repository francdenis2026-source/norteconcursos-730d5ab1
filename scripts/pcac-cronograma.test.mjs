import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPcAcMasterPlan } from "../src/lib/pcAcreMasterPlan.ts";
const MON_SAT = [1,2,3,4,5,6];
const all = (w) => w.flatMap((x) => x.days);
const mins = (d) => d.activities.reduce((s, a) => s + a.minutes, 0);
test("início 13/11/2026, 05:00, seg–sáb", () => {
  const w = buildPcAcMasterPlan(MON_SAT, "2027-01-24", { startDate: "2026-11-13", startTime: "05:00", weeklyHours: 8 });
  const d = all(w);
  assert.equal(d[0].date, "2026-11-13");
  assert.equal(d[0].activities[0].start, "05:00");
  assert.ok(d.every((x) => x.weekday !== 0 && x.date >= "2026-11-13" && x.date <= "2027-01-21"));
  assert.ok(d.some((x) => x.date.startsWith("2027-01")));
  assert.equal(w[1].days.reduce((s, x) => s + mins(x), 0), 480);
  assert.equal(w[0].days.reduce((s, x) => s + mins(x), 0), 160); // sex+sáb parcial
});
test("12 h/semana e hora alterada", () => {
  const w = buildPcAcMasterPlan(MON_SAT, "2027-01-24", { startDate: "2026-11-13", startTime: "19:30", weeklyHours: 12 });
  assert.equal(w[1].days.reduce((s, x) => s + mins(x), 0), 720);
  assert.ok(all(w).every((x) => x.activities[0].start === "19:30"));
});
test("desmarcar dia redistribui", () => {
  const w = buildPcAcMasterPlan([1,2,3,4,5], "2027-01-24", { startDate: "2026-11-16", startTime: "05:00", weeklyHours: 8 });
  assert.ok(all(w).every((x) => x.weekday !== 6));
  assert.equal(w[0].days.reduce((s, x) => s + mins(x), 0), 480);
});
test("início após último dia não gera", () => {
  assert.equal(buildPcAcMasterPlan(MON_SAT, "2027-01-24", { startDate: "2027-01-23", startTime: "05:00", weeklyHours: 8 }).length, 0);
});
