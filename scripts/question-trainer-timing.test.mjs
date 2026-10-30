import test from 'node:test';
import assert from 'node:assert/strict';
import { elapsedQuestionSeconds } from '../src/lib/questionTrainerTiming.ts';

test('excludes consultation pause from elapsed question time', () => {
  const state = { startedAt: 1000, pausedMs: 0, pausedAt: null };
  assert.equal(elapsedQuestionSeconds(state, 11000), 10);
  state.pausedAt = 11000;
  assert.equal(elapsedQuestionSeconds(state, 21000), 10);
  state.pausedMs += 10000;
  state.pausedAt = null;
  assert.equal(elapsedQuestionSeconds(state, 26000), 15);
});
