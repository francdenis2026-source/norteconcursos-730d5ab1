import test from 'node:test';
import assert from 'node:assert/strict';
import { claimSessionTab } from '../src/lib/sessionTab.ts';
const settle = () => new Promise(resolve => setImmediate(resolve));
function manager() {
  const held = new Set();
  return { held, async request(name, options, run) {
    if (held.has(name)) return run(null);
    held.add(name);
    try { return await run({ name }); } finally { held.delete(name); }
  } };
}
test('first tab owns the session; duplicate is blocked without releasing the owner', async () => {
  const locks = manager(), first = [], second = [];
  const release = claimSessionTab(locks, 'same-login', state => first.push(state));
  const duplicate = claimSessionTab(locks, 'same-login', state => second.push(state));
  await settle(); assert.deepEqual(first, ['checking', 'owner']); assert.deepEqual(second, ['checking', 'blocked']);
  duplicate(); await settle(); assert.equal(locks.held.size, 1);
  release(); await settle(); assert.equal(locks.held.size, 0);
});
test('closing the original allows a blocked tab to retry', async () => {
  const locks = manager(); const release = claimSessionTab(locks, 'login', () => {});
  release(); await settle(); const states = [];
  const next = claimSessionTab(locks, 'login', state => states.push(state));
  await settle(); assert.equal(states.at(-1), 'owner'); next();
});
test('cleanup before an async lock callback never publishes stale ownership', async () => {
  let callback; const states = [];
  const stop = claimSessionTab({ request: async (_name, _options, run) => { callback = run; } }, 'login', state => states.push(state));
  await Promise.resolve(); stop(); await callback({ name: 'login' }); assert.deepEqual(states, ['checking']);
});
test('independent authentication sessions do not block one another', async () => {
  const locks = manager(), states = [];
  const a = claimSessionTab(locks, 'login-a', state => states.push(state));
  const b = claimSessionTab(locks, 'login-b', state => states.push(state));
  await settle(); assert.equal(states.filter(state => state === 'owner').length, 2); a(); b();
});
test('missing or rejected lock service never grants unverified access', async () => {
  for (const locks of [undefined, { request: async () => { throw Error('unavailable'); } }]) {
    const states = []; claimSessionTab(locks, 'login', state => states.push(state));
    await settle(); assert.deepEqual(states, ['checking', 'unavailable']);
  }
});
test('remounts release old ownership instead of locking out the same tab', async () => {
  const locks = manager(); claimSessionTab(locks, 'login', () => {})(); await settle();
  const states = []; const cleanup = claimSessionTab(locks, 'login', state => states.push(state));
  await settle(); assert.equal(states.at(-1), 'owner'); cleanup();
});

test('a duplicate waiting on the browser lock is aborted instead of remaining queued', async () => {
  let aborted = false; const states = [];
  const cleanup = claimSessionTab({ request: (_key, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => { aborted = true; reject(Error('cancelled')); });
  }) }, 'held-login', state => states.push(state));
  await new Promise(resolve => setTimeout(resolve, 200));
  assert.equal(aborted, true); assert.deepEqual(states, ['checking', 'blocked']); cleanup();
});
