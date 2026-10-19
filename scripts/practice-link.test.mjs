import test from "node:test";
import assert from "node:assert/strict";
import { practiceSearch, TRACK_SUBJECT } from "../src/lib/practiceLink.ts";

test("link de prática vai direto ao treino, filtrado pela matéria e começando sozinho", () => {
  const s = practiceSearch("Língua Portuguesa", "Regência e crase");
  assert.equal(s.area, "Língua Portuguesa");
  assert.equal(s.go, "1");
  assert.equal(s.reinforce, "1");
  assert.equal(s.topic, "Crase");
});

test("sem assunto reconhecido, o link filtra só pela matéria", () => {
  const s = practiceSearch(
    "Direito Constitucional",
    "Texto que não casa com nenhum assunto cadastrado xyz",
  );
  assert.equal(s.area, "Direito Constitucional");
  assert.equal("topic" in s, false);
  assert.equal(TRACK_SUBJECT.portugues, "Língua Portuguesa");
});

test("diagnosis practice links preserve the exact discipline and start the trainer", async () => {
  const { disciplinePracticeSearch } = await import("../src/lib/practiceLink.ts");
  const search = disciplinePracticeSearch("Noções de Direito Penal");
  assert.equal(search.subject, "Direito Penal");
  assert.equal(search.area, "Direito Penal");
  assert.equal(search.go, "1");
  assert.equal(search.topic, undefined);
});


test("discipline history opens exact subject setup without autostart or a preselected topic", async () => {
  const { disciplineSetupSearch } = await import("../src/lib/practiceLink.ts");
  for (const subject of ["Direito Constitucional", "Redação Oficial", "Contabilidade Geral"]) {
    const s=disciplineSetupSearch(subject,"fresh-click");
    assert.equal(s.subject,subject);assert.equal(s.unseen,"1");assert.equal(s.fresh,"fresh-click");
    assert.equal(s.go,undefined);assert.equal(s.studyTopic,undefined);assert.equal(s.topic,undefined);assert.equal(s.area,undefined);
  }
});
