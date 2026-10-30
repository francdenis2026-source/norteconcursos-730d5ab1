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

test("ranking integrity: rejects duplicate candidates and inconsistent ordering", () => {
  const base = {
    entries: [], my_entry: null, total: 2, participants: 2,
    page: 1, page_size: 20, page_count: 1,
  };
  const row = (id, position) => ({
    rank_position: position, user_id: id, display_name: "Candidato",
    points: 10, question_points: 10, simulator_points: 0,
    study_points: 0, extra_points: 0, study_hours: 0,
    questions: 5, accuracy: 80, simulators: 0,
    is_me: false, stars: 1, level_name: "Aspirante",
  });
  assert.deepEqual(readRankingPage({ ...base, entries: [row("a", 1), row("b", 2)] }).entries.map(x => x.rank_position), [1, 2]);
  assert.throws(() => readRankingPage({ ...base, entries: [row("a", 2), row("b", 1)] }));
  assert.throws(() => readRankingPage({ ...base, entries: [row("a", 1), row("b", 1)] }));
  assert.throws(() => readRankingPage({ ...base, entries: [row("a", 1), row("a", 2)] }));
});
