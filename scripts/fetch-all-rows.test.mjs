import test from "node:test";
import assert from "node:assert/strict";
import { fetchAllRows } from "../src/lib/catalog.ts";

const table = (n, cap = Infinity) => {
  const calls = [];
  const page = async (from, to) => {
    calls.push([from, to]);
    await new Promise((r) => setTimeout(r, 5));
    const end = Math.min(to, from + cap - 1, n - 1);
    return { data: from >= n ? [] : Array.from({ length: end - from + 1 }, (_, i) => from + i), error: null };
  };
  return { page, calls };
};

test("reads every row once and in order, with pages requested in parallel", async () => {
  const { page, calls } = table(10_500);
  const rows = await fetchAllRows(page, 1000);
  assert.equal(rows.length, 10_500);
  assert.deepEqual(rows, Array.from({ length: 10_500 }, (_, i) => i));
  assert.ok(calls.length < 16, `${calls.length} requests`);
});

test("a server cap below the page size loses no rows", async () => {
  const { page } = table(2_300, 700);
  const rows = await fetchAllRows(page, 1000);
  assert.deepEqual(rows, Array.from({ length: 2_300 }, (_, i) => i));
});

test("exact multiples, empty tables and errors behave like the sequential reader", async () => {
  assert.equal((await fetchAllRows(table(4000).page, 1000)).length, 4000);
  assert.equal((await fetchAllRows(table(0).page, 1000)).length, 0);
  const failing = async (from) => (from >= 2000 ? { data: null, error: new Error("boom") } : { data: new Array(1000).fill(1), error: null });
  await assert.rejects(fetchAllRows(failing, 1000), /boom/);
});

test("an error on a speculative page after the end is ignored", async () => {
  const page = async (from) =>
    from === 0 ? { data: new Array(1000).fill(1), error: null } : from === 1000 ? { data: [], error: null } : { data: null, error: new Error("416") };
  assert.equal((await fetchAllRows(page, 1000)).length, 1000);
});
