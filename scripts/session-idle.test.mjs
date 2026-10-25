import test from 'node:test';
import assert from 'node:assert/strict';
import { createIdleSession, endIdleSession, sessionActivityKey } from '../src/lib/sessionIdle.ts';

function harness(shared = new Map(), key = 'test-session') {
  let wall = 1000000, mono = 0, expired = 0, remaining;
  const storage = { getItem: k => shared.get(k) ?? null, setItem: (k, v) => shared.set(k, v) };
  const options = { key, storage, now: () => wall, monotonic: () => mono, onExpire: () => expired++, onRemaining: value => { remaining = value; } };
  let monitor = createIdleSession(options);
  return { shared, options, get monitor() { return monitor; }, get expired() { return expired; }, get remaining() { return remaining; }, advance(ms) { wall += ms; mono += ms; }, sleep(ms) { wall += ms; }, remount() { monitor = createIdleSession(options); } };
}

test('warns at four minutes, expires once at exactly five', () => {
  const h = harness(); h.advance(239000); h.monitor.check(); assert.equal(h.remaining, null);
  h.advance(1000); h.monitor.check(); assert.equal(h.remaining, 60);
  h.advance(59999); h.monitor.check(); assert.equal(h.expired, 0);
  h.advance(1); h.monitor.check(); h.monitor.check(); assert.equal(h.expired, 1);
});
test('real interaction before expiry renews the deadline', () => {
  const h = harness(); h.advance(250000); h.monitor.interact(); assert.equal(h.remaining, null);
  h.advance(299000); h.monitor.check(); assert.equal(h.expired, 0);
  h.advance(1000); h.monitor.check(); assert.equal(h.expired, 1);
});
test('first input after a suspended timer cannot revive an expired session', () => {
  const h = harness(); h.sleep(301000); h.monitor.interact(); assert.equal(h.expired, 1);
});
test('reload and remount preserve inactivity, including an expired marker', () => {
  const h = harness(); h.advance(290000); h.remount(); h.advance(10000); h.monitor.check(); assert.equal(h.expired, 1);
  h.remount(); h.monitor.check(); assert.equal(h.expired, 2);
});
test('activity in another tab renews only the same session, and expiry is shared', () => {
  const h = harness(); h.advance(250000);
  h.shared.set('test-session', String(h.options.now())); h.monitor.check(); assert.equal(h.remaining, null);
  h.advance(250000); h.shared.set('other-session', String(h.options.now())); h.monitor.check(); assert.equal(h.remaining, 50);
  h.shared.set('test-session', '-1'); h.monitor.check(); assert.equal(h.expired, 1);
});
test('timer uses monotonic time when device clock moves backwards', () => {
  const h = harness(); h.advance(301000); h.sleep(-100000); h.monitor.check(); assert.equal(h.expired, 1);
});
test('blocked localStorage still enforces the in-memory deadline', () => {
  let now = 1000000, expired = false;
  const monitor = createIdleSession({ key: 'blocked', now: () => now, monotonic: () => now, storage: { getItem() { throw Error(); }, setItem() { throw Error(); } }, onRemaining() {}, onExpire() { expired = true; } });
  now += 300000; monitor.check(); assert.equal(expired, true);
});
test('token refresh keeps the deadline; a fresh login gets its own deadline', () => {
  const session = (sid, exp) => ({ user: { id: 'user-a' }, access_token: `header.${Buffer.from(JSON.stringify({ session_id: sid, exp })).toString('base64url')}.signature` });
  assert.equal(sessionActivityKey(session('a', 1)), sessionActivityKey(session('a', 2)));
  assert.notEqual(sessionActivityKey(session('a', 1)), sessionActivityKey(session('b', 1)));
  assert.equal(sessionActivityKey(null), null);
});
test('logout clears and redirects even with hung progress and auth requests', async () => {
  const calls = [];
  await endIdleSession({ save: () => new Promise(() => {}), stop: () => calls.push('stop'), signOut: () => new Promise(() => {}), clear: () => calls.push('clear'), redirect: () => calls.push('redirect'), timeoutMs: 10 });
  assert.deepEqual(calls, ['stop', 'clear', 'redirect']);
});
test('logout still clears tokens and redirects after rejected auth', async () => {
  const calls = [];
  await endIdleSession({ save: async () => { throw Error('offline'); }, stop() {}, signOut: async () => { throw Error('offline'); }, clear: () => calls.push('clear'), redirect: () => calls.push('redirect') });
  assert.deepEqual(calls, ['clear', 'redirect']);
});

test('activity received from a tab with a later clock anchors both elapsed clocks consistently', () => {
  const h = harness(); h.shared.set('test-session', String(h.options.now() + 240000));
  h.monitor.check(); h.advance(300000); h.monitor.check(); assert.equal(h.expired, 0);
  h.advance(240000); h.monitor.check(); assert.equal(h.expired, 1);
});
