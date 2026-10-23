import test from "node:test";
import assert from "node:assert/strict";
import { backdropClockAngles, backdropClockTick } from "../src/lib/backdropClock.ts";
test("hands use Acre midnight rather than UTC midnight", () => {
  assert.deepEqual(backdropClockAngles(Date.parse("2026-10-23T05:00:00Z")), {
    hour: 0,
    minute: 0,
    second: 0,
  });
  assert.equal(backdropClockAngles(Date.parse("2026-10-23T00:00:00Z")).hour, 210);
});
test("all hands advance smoothly, including fractional seconds", () => {
  const angles = backdropClockAngles(Date.parse("2026-10-23T15:15:30.500Z"));
  assert.equal(angles.second, 183);
  assert(Math.abs(angles.minute - 93.05) < 1e-8);
  assert(Math.abs(angles.hour - (300 + 7.5 + 30.5 / 120)) < 1e-8);
});
test("twelve-hour cycle wraps without negative angles", () => {
  assert.deepEqual(backdropClockAngles(Date.parse("2026-10-23T17:00:00Z")), {
    hour: 0,
    minute: 0,
    second: 0,
  });
  for (const angle of Object.values(backdropClockAngles(-1))) assert(angle >= 0 && angle < 360);
});

test("second hand holds whole seconds and waits only the remaining fraction until its next tick", () => {
  const tick = backdropClockTick(Date.parse("2026-10-23T15:15:30.750Z"));
  assert.equal(tick.angle, 180);
  assert.equal(tick.delay, -0.75);
  assert.equal(backdropClockTick(Date.parse("2026-10-23T15:15:31Z")).angle, 186);
});
test("ticking second hand wraps at midnight and resynchronizes after returning to the tab", () => {
  assert.equal(backdropClockTick(Date.parse("2026-10-23T23:59:59.999Z")).angle, 354);
  assert.equal(backdropClockTick(Date.parse("2026-10-24T00:00:00Z")).angle, 0);
  assert.equal(backdropClockTick(Date.parse("2026-10-24T00:03:17.125Z")).angle, 102);
  assert.equal(backdropClockTick(-1).angle, 354);
});
