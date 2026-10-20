import test from "node:test";
import assert from "node:assert/strict";
import {
  closedRow,
  createSnapshotUploader,
  hydrateSnapshots,
  localSavedAt,
  openRow,
  snapshotKey,
  stampKey,
} from "../src/lib/sessionSnapshots.ts";

const memory = (seed = {}) => {
  const data = new Map(Object.entries(seed));
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
};
const port = (rows = [], failWith) => {
  const sent = [];
  return {
    sent,
    async fetchRows() {
      if (failWith) throw failWith;
      return rows;
    },
    async upsertRow(row) {
      if (failWith) throw failWith;
      sent.push(row);
    },
  };
};
const bookmark = (savedAt, extra = {}) => ({ version: 1, savedAt, route: "[]", index: 3, results: ["ok", "err", "skipped"], questions: [{ id: "q" }], ...extra });

test("a session saved on another device is brought to this one", async () => {
  const store = memory();
  const remote = openRow("trainer", "trainer", bookmark(5000), 5000);
  const result = await hydrateSnapshots(store, "u", port([remote]));
  assert.deepEqual(result, { account: true, pulled: 1, pushed: 0 });
  assert.deepEqual(JSON.parse(store.getItem(snapshotKey("trainer", "u", "trainer"))).results, ["ok", "err", "skipped"]);
  assert.equal(localSavedAt(store, "trainer", "u", "trainer"), 5000);
});

test("the newest copy wins in both directions", async () => {
  const key = snapshotKey("trainer", "u", "trainer");
  const older = memory({ [key]: JSON.stringify(bookmark(1000)) });
  await hydrateSnapshots(older, "u", port([openRow("trainer", "trainer", bookmark(9000, { index: 8 }), 9000)]));
  assert.equal(JSON.parse(older.getItem(key)).index, 8);

  const newer = memory({ [key]: JSON.stringify(bookmark(9000, { index: 8 })) });
  const p = port([openRow("trainer", "trainer", bookmark(1000), 1000)]);
  const result = await hydrateSnapshots(newer, "u", p);
  assert.equal(JSON.parse(newer.getItem(key)).index, 8, "local is not overwritten");
  assert.equal(result.pushed, 1);
  assert.equal(Date.parse(p.sent[0].client_saved_at), 9000);
});

test("a session that exists only in this browser is uploaded", async () => {
  const key = snapshotKey("simulator", "u", "contests");
  const store = memory({ [key]: JSON.stringify({ version: 1, startedAt: 4000, answers: { a: "A" } }) });
  const p = port([]);
  const result = await hydrateSnapshots(store, "u", p);
  assert.equal(result.pushed, 1);
  assert.equal(p.sent[0].scope, "contests");
  assert.equal(p.sent[0].closed, false);
});

test("a session finished on another device is cleared here, but a newer local one is kept", async () => {
  const key = snapshotKey("trainer", "u", "trainer");
  const stale = memory({ [key]: JSON.stringify(bookmark(1000)) });
  await hydrateSnapshots(stale, "u", port([closedRow("trainer", "trainer", 5000)]));
  assert.equal(stale.getItem(key), null);
  const fresh = memory({ [key]: JSON.stringify(bookmark(8000)) });
  await hydrateSnapshots(fresh, "u", port([closedRow("trainer", "trainer", 5000)]));
  assert.ok(fresh.getItem(key));
});

test("without the table the browser keeps working and nothing throws", async () => {
  const missing = { code: "PGRST205", message: "Could not find the table in the schema cache" };
  const store = memory({ [snapshotKey("trainer", "u", "trainer")]: JSON.stringify(bookmark(1)) });
  assert.deepEqual(await hydrateSnapshots(store, "u", port([], missing)), { account: false, pulled: 0, pushed: 0 });
  await assert.rejects(hydrateSnapshots(store, "u", port([], { message: "network down" })));
  assert.ok(store.getItem(snapshotKey("trainer", "u", "trainer")));
});

test("the stamp takes precedence over the date inside the record", () => {
  const store = memory({
    [snapshotKey("trainer", "u", "trainer")]: JSON.stringify(bookmark(1000)),
    [stampKey("trainer", "u", "trainer")]: "7000",
  });
  assert.equal(localSavedAt(store, "trainer", "u", "trainer"), 7000);
  assert.equal(localSavedAt(memory(), "trainer", "u", "trainer"), 0);
});

const fakeTimers = () => {
  const queue = [];
  return {
    setTimer: (fn) => (queue.push(fn), queue.length - 1),
    clearTimer: (h) => (queue[h] = null),
    run: () => queue.splice(0).forEach((fn) => fn?.()),
  };
};

test("the uploader sends one write per interval and skips unchanged content", async () => {
  const p = port();
  const t = fakeTimers();
  const up = createSnapshotUploader(p, { setTimer: t.setTimer, clearTimer: t.clearTimer });
  for (let i = 0; i < 5; i++) up.schedule(openRow("trainer", "trainer", bookmark(1000 + i), 1000 + i), "same");
  t.run();
  await new Promise((r) => setImmediate(r));
  assert.equal(p.sent.length, 1);
  up.schedule(openRow("trainer", "trainer", bookmark(2000), 2000), "same");
  t.run();
  await new Promise((r) => setImmediate(r));
  assert.equal(p.sent.length, 1, "unchanged content is not re-sent");
  up.schedule(openRow("trainer", "trainer", bookmark(3000, { index: 4 }), 3000), "changed");
  t.run();
  await new Promise((r) => setImmediate(r));
  assert.equal(p.sent.length, 2);
});

test("closing sends immediately, cancels a pending write and marks the session closed", async () => {
  const p = port();
  const t = fakeTimers();
  const up = createSnapshotUploader(p, { setTimer: t.setTimer, clearTimer: t.clearTimer });
  up.schedule(openRow("trainer", "trainer", bookmark(1), 1), "a");
  await up.close("trainer", "trainer", 5000);
  t.run();
  await new Promise((r) => setImmediate(r));
  assert.equal(p.sent.length, 1);
  assert.equal(p.sent[0].closed, true);
  assert.equal(p.sent[0].payload, null);
});

test("a missing table turns the uploader off instead of retrying forever", async () => {
  const missing = { code: "42P01", message: 'relation "study_session_snapshots" does not exist' };
  const p = port([], missing);
  const t = fakeTimers();
  const up = createSnapshotUploader(p, { setTimer: t.setTimer, clearTimer: t.clearTimer });
  up.schedule(openRow("trainer", "trainer", bookmark(1), 1), "a");
  t.run();
  await new Promise((r) => setImmediate(r));
  assert.equal(up.available, false);
});
