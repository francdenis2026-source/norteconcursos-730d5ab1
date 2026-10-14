import test from 'node:test';
import assert from 'node:assert/strict';
import { simulatorClock } from '../src/lib/simulatorClock.ts';
test('exam clock catches up after a throttled or background interval', () => {
 assert.deepEqual(simulatorClock(100000,120,160000),{elapsed:60,remaining:60});
});
test('exam clock caps elapsed time at the deadline', () => {
 assert.deepEqual(simulatorClock(100000,120,300000),{elapsed:120,remaining:0});
});
test('clock never yields negative elapsed time', () => {
 assert.deepEqual(simulatorClock(100000,120,99999),{elapsed:0,remaining:120});
});
