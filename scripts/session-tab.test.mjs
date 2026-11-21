import test from 'node:test';
import assert from 'node:assert/strict';
import { claimSessionTab, SESSION_TAB_SLOTS } from '../src/lib/sessionTab.ts';
const settle = () => new Promise(resolve => setImmediate(resolve));
// Simula navigator.locks com ifAvailable: um nome já ocupado entrega lock null, sem fila.
function manager() {
  const held = new Set();
  return { held, async request(name, options, run) {
    if (held.has(name)) return run(null);
    held.add(name);
    try { return await run({ name }); } finally { held.delete(name); }
  } };
}
test('two tabs of the browser can own a session; the third is blocked', async () => {
  const locks = manager(), first = [], second = [], third = [];
  const a = claimSessionTab(locks, state => first.push(state));
  const b = claimSessionTab(locks, state => second.push(state));
  const c = claimSessionTab(locks, state => third.push(state));
  await settle();
  assert.equal(SESSION_TAB_SLOTS, 2);
  assert.deepEqual(first, ['checking', 'owner']);
  assert.deepEqual(second, ['checking', 'owner']);
  assert.deepEqual(third, ['checking', 'blocked']);
  assert.equal(locks.held.size, 2);
  a(); b(); c(); await settle();
  assert.equal(locks.held.size, 0);
});
test('closing an owner frees a slot for a blocked tab to retry', async () => {
  const locks = manager();
  const a = claimSessionTab(locks, () => {});
  const b = claimSessionTab(locks, () => {});
  const blockedStates = [];
  const c = claimSessionTab(locks, state => blockedStates.push(state));
  await settle(); assert.equal(blockedStates.at(-1), 'blocked');
  a(); await settle();
  // Nova tentativa, como o botão "Tentar novamente" faz.
  c();
  const retry = []; const d = claimSessionTab(locks, state => retry.push(state));
  await settle(); assert.equal(retry.at(-1), 'owner');
  b(); d();
});
test('a blocked tab never keeps waiting to take a slot later', async () => {
  const locks = manager();
  const a = claimSessionTab(locks, () => {});
  const b = claimSessionTab(locks, () => {});
  const states = [];
  const c = claimSessionTab(locks, state => states.push(state));
  await settle();
  a(); await settle();
  assert.deepEqual(states, ['checking', 'blocked']);
  a(); b(); c();
});
test('cleanup before an async lock callback never publishes stale ownership', async () => {
  let callback; const states = [];
  const stop = claimSessionTab({ request: async (_name, _options, run) => { callback = run; } }, state => states.push(state));
  await Promise.resolve(); stop(); await callback({ name: 'login' }); assert.deepEqual(states, ['checking']);
});
test('missing or rejected lock service never grants unverified access', async () => {
  for (const locks of [undefined, { request: async () => { throw Error('unavailable'); } }]) {
    const states = []; claimSessionTab(locks, state => states.push(state));
    await settle(); assert.deepEqual(states, ['checking', 'unavailable']);
  }
});
test('remounts release old ownership instead of locking out the same tab', async () => {
  const locks = manager();
  const first = claimSessionTab(locks, () => {}); await settle(); first();
  await settle();
  const states = []; const cleanup = claimSessionTab(locks, state => states.push(state));
  await settle(); assert.equal(states.at(-1), 'owner'); cleanup();
});
