import test from "node:test";
import assert from "node:assert/strict";
import { ACRE_STUDY_CONTENT, ACRE_CURRENT_AFFAIRS, ACRE_CONTENT_CHECKED_ON } from "../src/data/acreStudyContent.ts";
import { ACRE_GEOGRAPHY_FACTS, ACRE_EDITAL_REGIONS, ACRE_CURRENT_IBGE_REGIONS } from "../src/data/acreGeography.ts";

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

test("geografia do Acre cobre fuso, hidrografia, relevo, clima, UCs e transportes", () => {
  const required = ["fuso-horario", "hidrografia", "relevo", "clima-vegetacao", "unidades-conservacao", "transportes"];
  const ids = ACRE_GEOGRAPHY_FACTS.map((fact) => fact.id);
  for (const id of required) assert.ok(ids.includes(id), `faltou conteúdo geográfico: ${id}`);
  for (const fact of ACRE_GEOGRAPHY_FACTS) {
    assert.ok(fact.points.length >= 2, fact.title);
    assert.ok(fact.reference.trim(), fact.title);
    assert.match(fact.source.url, /^https:\/\//, fact.title);
    for (const alt of fact.alternatives ?? []) assert.match(alt.url, /^https:\/\//, fact.title);
  }
  assert.match(ACRE_GEOGRAPHY_FACTS.find((fact) => fact.id === "fuso-horario").points.join(" "), /UTC−5/);
  assert.match(ACRE_GEOGRAPHY_FACTS.find((fact) => fact.id === "hidrografia").points.join(" "), /Juruá.*Purus/);
});

test("história inclui Tratado de Ayacucho e economia inclui infraestrutura de transportes", () => {
  assert.ok(ACRE_STUDY_CONTENT.historia.some((card) => /Ayacucho/.test(card.title)));
  assert.ok(ACRE_STUDY_CONTENT.economia.some((card) => /transportes/i.test(card.title)));
  assert.ok(ACRE_STUDY_CONTENT.economia.some((card) => /indicadores demográficos/i.test(card.title)));
  assert.ok(ACRE_STUDY_CONTENT.cultura.some((card) => /povos indígenas/i.test(card.title)));
  assert.ok(ACRE_STUDY_CONTENT.politica.some((card) => /Constituição do Estado do Acre/i.test(card.title)));
});

test("regionalização do edital distribui os 22 municípios sem duplicidade", () => {
  const municipalities = ACRE_EDITAL_REGIONS.flatMap((region) => region.municipalities);
  assert.equal(ACRE_EDITAL_REGIONS.length, 5);
  assert.equal(municipalities.length, 22);
  assert.equal(new Set(municipalities).size, 22);
  assert.deepEqual(ACRE_EDITAL_REGIONS.map((region) => region.name), ["Alto Acre", "Baixo Acre", "Purus", "Envira", "Juruá"]);
});

test("regionalização IBGE vigente soma os 22 municípios em duas regiões intermediárias", () => {
  assert.equal(ACRE_CURRENT_IBGE_REGIONS.length, 2);
  assert.equal(ACRE_CURRENT_IBGE_REGIONS.reduce((sum, region) => sum + region.municipalityCount, 0), 22);
  assert.deepEqual(ACRE_CURRENT_IBGE_REGIONS.map((region) => region.name), ["Rio Branco", "Cruzeiro do Sul"]);
});
