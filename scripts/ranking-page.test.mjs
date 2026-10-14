import test from "node:test";
import assert from "node:assert/strict";
import {
  rankingSearch,
  rankingPositionPage,
  partialRankingPage,
  readRankingPage,
} from "../src/lib/rankingPage.ts";

test("ranking URLs validate page limits, section and search without accepting arbitrary sizes", () => {
  assert.deepEqual(rankingSearch({}), { section: "general", page: 1, size: 20, q: "" });
  assert.deepEqual(
    rankingSearch({ section: "questions", page: "12", size: "50", q: " Antônia " }),
    { section: "questions", page: 12, size: 50, q: "Antônia" },
  );
  for (const page of [-1, 0, NaN, Infinity, "foo", 1.5])
    assert.equal(rankingSearch({ page }).page, 1);
  assert.equal(rankingSearch({ section: "admin", size: 5000 }).section, "general");
  assert.equal(rankingSearch({ size: 5000 }).size, 20);
  assert.equal(rankingSearch({ q: "x".repeat(500) }).q.length, 100);
});

test("finding my position handles page boundaries without searching all users in the browser", () => {
  assert.equal(rankingPositionPage(1, 20), 1);
  assert.equal(rankingPositionPage(20, 20), 1);
  assert.equal(rankingPositionPage(21, 20), 2);
  assert.equal(rankingPositionPage(234, 20), 12);
});

test("legacy lists are labeled partial and preserve original positions when searched", () => {
  const entries = Array.from({ length: 100 }, (_, i) => ({
    rank_position: i + 1,
    user_id: `u${i}`,
    display_name: i === 72 ? "ANTÔNIA S." : `CANDIDATO ${i}`,
    is_me: i === 72,
  }));
  const result = partialRankingPage(entries, 10, 20, "antonia");
  assert.equal(result.partial, true);
  assert.equal(result.entries[0].rank_position, 73);
  assert.equal(result.page, 1);
  assert.equal(result.total, 1);
  assert.equal(result.participants, 100);
  assert.equal(result.my_entry.user_id, "u72");
  const empty = partialRankingPage(entries, 999, 20, "inexistente");
  assert.equal(empty.page_count, 1);
  assert.equal(empty.entries.length, 0);
});

test("incompatible RPC data fails explicitly instead of crashing or hiding candidates", () => {
  const valid = {
    entries: [],
    my_entry: null,
    total: 0,
    participants: 0,
    page: 1,
    page_size: 20,
    page_count: 1,
  };
  assert.equal(readRankingPage(valid), valid);
  for (const value of [
    null,
    [],
    {},
    { ...valid, participants: -1 },
    { ...valid, page_size: 1000 },
    { ...valid, total: 10 },
    { ...valid, entries: [{ display_name: "Incomplete" }] },
  ])
    assert.throws(() => readRankingPage(value));
});
