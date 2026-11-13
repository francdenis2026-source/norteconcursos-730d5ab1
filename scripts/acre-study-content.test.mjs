import test from "node:test";
import assert from "node:assert/strict";
import { ACRE_STUDY_CONTENT, ACRE_CURRENT_AFFAIRS, ACRE_CONTENT_CHECKED_ON } from "../src/data/acreStudyContent.ts";

const AXES = ["historia", "economia", "cultura", "politica", "seguranca"];

test("cada área de Realidade do Acre tem conteúdo atualizado", () => {
  for (const axis of AXES) assert.ok(ACRE_STUDY_CONTENT[axis]?.length, `sem conteúdo em ${axis}`);
});

test("todo bloco traz pontos, referência e fonte pública", () => {
  for (const cards of Object.values(ACRE_STUDY_CONTENT))
    for (const card of cards) {
      assert.ok(card.points.length >= 2, card.title);
      assert.ok(card.reference.trim(), card.title);
      assert.match(card.source.url, /^https:\/\//, card.title);
      for (const alt of card.alternatives ?? []) assert.match(alt.url, /^https:\/\//, card.title);
      assert.equal(new Set([card.source.url, ...(card.alternatives ?? []).map((alt) => alt.url)]).size, 1 + (card.alternatives?.length ?? 0), `${card.title}: link repetido`);
    }
});

test("atualidades têm data, fonte e apontam para uma área existente", () => {
  assert.match(ACRE_CONTENT_CHECKED_ON, /^\d{4}-\d{2}-\d{2}$/);
  for (const item of ACRE_CURRENT_AFFAIRS) {
    assert.ok(AXES.includes(item.axis), item.title);
    assert.match(item.source.url, /^https:\/\//, item.title);
  }
});
