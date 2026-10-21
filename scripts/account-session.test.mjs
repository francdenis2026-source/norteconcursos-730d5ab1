import test from 'node:test';
import assert from 'node:assert/strict';
import { createAccountSessionMonitor } from '../src/lib/accountSession.ts';

test('a login claims once; polling, focus and retry never take ownership back', async () => {
  const claims = [], states = [];
  let owner = true, revoked = 0;
  const monitor = createAccountSessionMonitor({ claim: true,
    verify: async claim => { claims.push(claim); return owner; },
    publish: state => states.push(state), revoke: () => revoked++,
  });
  await monitor.check(true);
  await monitor.check();
  owner = false;
  await monitor.check();
  await monitor.check();
  assert.deepEqual(claims, [true, false, false]);
  assert.deepEqual(states, ['checking', 'verified', 'verified', 'revoked']);
  assert.equal(revoked, 1);
  monitor.dispose();
});
test('network failure blocks access without declaring revocation; retry only verifies', async () => {
  const states = [], claims = [];
  let fail = true;
  const monitor = createAccountSessionMonitor({ claim: true,
    verify: async claim => { claims.push(claim); if (fail) throw Error('offline'); return true; },
    publish: state => states.push(state), revoke: () => assert.fail('not a competing device'),
  });
  await monitor.check(true);
  fail = false;
  await monitor.check(true);
  assert.deepEqual(claims, [true, false]);
  assert.deepEqual(states, ['checking', 'unavailable', 'checking', 'verified']);
  monitor.dispose();
});
test('initial restore never claims; parallel checks share a request and cleanup ignores stale results', async () => {
  let finish, calls = 0;
  const states = [];
  const monitor = createAccountSessionMonitor({ claim: false,
    verify: async (claim, signal) => { calls++; assert.equal(claim, false); return new Promise(resolve => { finish = resolve; signal.addEventListener('abort', () => resolve(false)); }); },
    publish: state => states.push(state), revoke: () => assert.fail('disposed'),
  });
  const first = monitor.check();
  const second = monitor.check();
  assert.equal(first, second);
  await Promise.resolve();
  monitor.dispose();
  finish(false);
  await first;
  assert.equal(calls, 1);
  assert.deepEqual(states, []);
});

test('a stalled auth lock cannot leave an already verified account open forever', async () => {
  const states = [];
  let call = 0, finishStalled, revoked = 0;
  const monitor = createAccountSessionMonitor({ claim: false, timeoutMs: 15,
    verify: async () => {
      call++;
      if (call === 1) return true;
      if (call === 2) return new Promise(resolve => { finishStalled = resolve; });
      return false;
    },
    publish: state => states.push(state), revoke: () => revoked++,
  });
  await monitor.check();
  await monitor.check();
  assert.deepEqual(states, ['verified', 'unavailable'], 'deadline blocks protected access even if adapter ignores AbortSignal');
  await monitor.check();
  assert.equal(revoked, 1, 'the next check can run and detect a different device');
  finishStalled(true);
  await Promise.resolve();
  assert.equal(states.at(-1), 'revoked', 'late successful result cannot reopen access');
  monitor.dispose();
});
