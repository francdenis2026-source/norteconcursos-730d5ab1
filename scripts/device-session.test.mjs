import test from 'node:test';
import assert from 'node:assert/strict';
import { monitorDeviceSession } from '../src/lib/deviceSession.ts';

test('two independent devices: newest login revokes the older device permanently', async () => {
  let owner = 'old';
  const oldStates = [], newStates = [];
  let oldSignouts = 0;
  const old = monitorDeviceSession({ verify: async () => owner === 'old', publish: s => oldStates.push(s), replaced: () => oldSignouts++ });
  await old.check();
  owner = 'new';
  const latest = monitorDeviceSession({ verify: async () => owner === 'new', publish: s => newStates.push(s), replaced: () => assert.fail('new login revoked') });
  await Promise.all([old.check(), latest.check()]);
  assert.equal(oldStates.at(-1), 'replaced');
  assert.equal(newStates.at(-1), 'active');
  assert.equal(oldSignouts, 1);
  await old.check();
  assert.equal(oldSignouts, 1);
});

test('offline/device wake does not sign out on a network failure, then detects takeover', async () => {
  const states = []; let online = false, replaced = 0;
  const monitor = monitorDeviceSession({ verify: async () => { if (!online) throw Error('offline'); return false; }, publish: s => states.push(s), replaced: () => replaced++ });
  await monitor.check();
  assert.equal(states.at(-1), 'unavailable'); assert.equal(replaced, 0);
  online = true; await monitor.check();
  assert.equal(states.at(-1), 'replaced'); assert.equal(replaced, 1);
});

test('responses from a previous account/session are ignored after cleanup', async () => {
  let resolve; const states = [];
  const monitor = monitorDeviceSession({ verify: () => new Promise(r => { resolve = r; }), publish: s => states.push(s), replaced: () => assert.fail('stale logout') });
  const check = monitor.check(); monitor.stop(); resolve(false); await check;
  assert.deepEqual(states, ['checking']);
});

test('overlapping realtime and polling checks share one in-flight request', async () => {
  let resolve, requests = 0;
  const monitor = monitorDeviceSession({ verify: () => { requests++; return new Promise(r => { resolve = r; }); }, publish: () => {}, replaced: () => {} });
  const first = monitor.check(), second = monitor.check();
  assert.equal(requests, 1); resolve(true); await Promise.all([first, second]); monitor.stop();
});
