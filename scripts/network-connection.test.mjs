import test from 'node:test';
import assert from 'node:assert/strict';
import { createConnectionMonitor } from '../src/lib/networkConnection.ts';
const settle = () => new Promise(resolve => setImmediate(resolve));

test('a browser offline event immediately opens the screen and invalidates an older successful probe', async () => {
  const states = []; let resolve;
  const monitor = createConnectionMonitor({ probe: () => new Promise(r => { resolve = r; }), publish: value => states.push(value) });
  const checking = monitor.check(); await settle();
  monitor.offline(); assert.deepEqual(states, [false]);
  resolve(true); assert.equal(await checking, false);
  assert.deepEqual(states, [false]); monitor.dispose();
});

test('two failed checks detect lost internet even when the browser still reports Wi-Fi online', async () => {
  const states = []; let reachable = false;
  const monitor = createConnectionMonitor({ probe: async () => reachable, publish: value => states.push(value) });
  await monitor.check(); assert.deepEqual(states, []);
  await monitor.check(); assert.deepEqual(states, [false]);
  await monitor.check(); assert.deepEqual(states, [false]);
  reachable = true; await monitor.check(); assert.deepEqual(states, [false, true]); monitor.dispose();
});

test('a transient failure followed by success does not hide the workspace', async () => {
  const states = []; let reachable = false;
  const monitor = createConnectionMonitor({ probe: async () => reachable, publish: value => states.push(value) });
  await monitor.check(); reachable = true; await monitor.check(); reachable = false; await monitor.check();
  assert.deepEqual(states, []); monitor.dispose();
});

test('a hung probe is bounded and overlapping checks share the same request', async () => {
  let requests = 0; const states = [];
  const monitor = createConnectionMonitor({ probe: () => { requests++; return new Promise(() => {}); }, publish: value => states.push(value), timeoutMs: 10 });
  await Promise.all([monitor.check(), monitor.check()]);
  assert.equal(requests, 1); assert.deepEqual(states, []);
  await monitor.check(); assert.deepEqual(states, [false]); monitor.dispose();
});

test('cleanup prevents late responses from changing the screen', async () => {
  let resolve; const states = [];
  const monitor = createConnectionMonitor({ probe: () => new Promise(r => { resolve = r; }), publish: value => states.push(value) });
  const checking = monitor.check(); await settle(); monitor.dispose(); resolve(false); await checking;
  assert.deepEqual(states, []);
});

test('an aborted old check cannot clear the newer recovery request', async () => {
  const resolvers = [], states = [];
  const monitor = createConnectionMonitor({ probe: () => new Promise(r => resolvers.push(r)), publish: value => states.push(value) });
  const first = monitor.check(); await settle(); monitor.offline();
  const second = monitor.check(); await settle(); resolvers[0](true); await first;
  const shared = monitor.check(); assert.equal(resolvers.length, 2);
  resolvers[1](true); await Promise.all([second, shared]);
  assert.deepEqual(states, [false, true]); monitor.dispose();
});
