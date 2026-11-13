import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { splitPcAcTopic, pcAcVerticalTopicGroups } from "../src/lib/pcAcreTopicStructure.ts";
import { ACRE_CURRENT_IBGE_REGIONS, ACRE_EDITAL_REGIONS, ACRE_MESOREGIONS, ACRE_MICROREGIONS } from "../src/data/acreGeography.ts";

const acreTopics = [
  "Formação histórica do Acre: ocupação, ciclos da borracha, antecedentes diplomáticos (Tratado de Ayacucho), Revolução Acreana, Tratado de Petrópolis, Território Federal, movimento autonomista e elevação a Estado.",
  "Movimento dos seringueiros, Chico Mendes e criação das reservas extrativistas.",
  "Geografia: localização, limites e fronteiras, fuso horário, municípios e regionais de desenvolvimento, bacias hidrográficas, relevo, clima, vegetação e unidades de conservação.",
  "Aspectos étnicos e culturais: povos indígenas, incluindo povos isolados, populações tradicionais, extrativismo e manifestações culturais.",
  "Aspectos políticos: Constituição do Estado do Acre, organização dos Poderes e símbolos estaduais.",
  "Aspectos sociais e econômicos: população e indicadores sociais, economia, produção extrativista e agropecuária, desenvolvimento sustentável, infraestrutura de transportes e integração regional e fronteiriça.",
  "Segurança pública no Acre: estrutura do sistema estadual de segurança pública e aspectos das regiões de fronteira.",
];

test("separates numbered edital subitems without losing their numbering", () => {
  const groups = splitPcAcTopic(
    "Teoria geral do crime. 4.1 Crime e contravenção penal; bem jurídico. 4.2 Teorias da ação. 4.3 Fato típico: conduta e resultado.",
  );
  assert.equal(groups.title, "Teoria geral do crime.");
  assert.deepEqual(groups.subtopics, [
    "4.1 Crime e contravenção penal; bem jurídico.",
    "4.2 Teorias da ação.",
    "4.3 Fato típico: conduta e resultado.",
  ]);
});

test("separates semicolon-delimited nuclei and keeps a meaningful parent title", () => {
  const groups = splitPcAcTopic(
    "Fundamentos de sistemas computacionais: hardware e software; formatos de arquivo; armazenamento local e em nuvem; segurança.",
  );
  assert.equal(groups.title, "Fundamentos de sistemas computacionais");
  assert.deepEqual(groups.subtopics, [
    "hardware e software",
    "formatos de arquivo",
    "armazenamento local e em nuvem",
    "segurança.",
  ]);
});

test("leaves already atomic topics unchanged", () => {
  assert.deepEqual(splitPcAcTopic("Princípios fundamentais."), {
    title: "Princípios fundamentais.",
    subtopics: [],
  });
});

test("separates long comma lists after a named nucleus", () => {
  const groups = splitPcAcTopic(
    "Formação histórica do Acre: ocupação, ciclos da borracha, antecedentes diplomáticos, Revolução Acreana, Tratado de Petrópolis.",
  );
  assert.equal(groups.title, "Formação histórica do Acre");
  assert.deepEqual(groups.subtopics, [
    "ocupação",
    "ciclos da borracha",
    "antecedentes diplomáticos",
    "Revolução Acreana",
    "Tratado de Petrópolis.",
  ]);
});

test("creates seven Acre parent topics with independent subtopics", () => {
  const groups = pcAcVerticalTopicGroups({ id: "realidade-acre", topics: acreTopics });
  assert.deepEqual(groups.map((group) => group.title), [
    "Formação histórica do Acre",
    "Movimento dos seringueiros, Chico Mendes e criação das reservas extrativistas",
    "Geografia",
    "Aspectos étnicos e culturais",
    "Aspectos políticos",
    "Aspectos sociais e econômicos",
    "Segurança pública no Acre",
  ]);
  assert.deepEqual(groups.map((group) => group.subtopics.length), [8, 3, 9, 4, 3, 6, 2]);
  assert.equal(groups.reduce((total, group) => total + group.subtopics.length, 0), 35);
  assert.deepEqual(groups[0].subtopics, [
    "Ocupação",
    "Ciclos da borracha",
    "Antecedentes diplomáticos (Tratado de Ayacucho)",
    "Revolução Acreana",
    "Tratado de Petrópolis",
    "Território Federal",
    "Movimento autonomista",
    "Elevação a Estado",
  ]);
  assert.deepEqual(groups[3].subtopics, [
    "Povos indígenas, incluindo povos isolados",
    "Populações tradicionais",
    "Extrativismo",
    "Manifestações culturais",
  ]);
});

test("also separates the original single-block edital text", () => {
  const groups = pcAcVerticalTopicGroups({
    id: "realidade-acre",
    topics: [acreTopics.join(" ")],
  });
  assert.equal(groups.length, 7);
  assert.deepEqual(groups.map((group) => group.subtopics.length), [8, 3, 9, 4, 3, 6, 2]);
});

test("normalizes every topic in a discipline", () => {
  const groups = pcAcVerticalTopicGroups({
    topics: ["A. 1.1 Primeiro item. 1.2 Segundo item.", "Princípios fundamentais."],
  });
  assert.equal(groups.length, 2);
  assert.equal(groups[0].subtopics.length, 2);
});


test("Acre historical geography has two mesoregions, five microregions and 22 municipalities", () => {
  assert.equal(ACRE_MESOREGIONS.length, 2);
  assert.equal(ACRE_MICROREGIONS.length, 5);
  const municipalities = ACRE_MICROREGIONS.flatMap((region) => region.municipalities);
  assert.equal(municipalities.length, 22);
  assert.equal(new Set(municipalities).size, 22);
  assert.deepEqual(ACRE_MESOREGIONS.map((region) => region.municipalityCount), [14, 8]);
});

test("current IBGE regions are clearly separated from the historical meso/micro names", () => {
  assert.equal(ACRE_CURRENT_IBGE_REGIONS.length, 2);
  assert.equal(ACRE_CURRENT_IBGE_REGIONS.reduce((sum, region) => sum + region.immediateRegions.length, 0), 5);
  assert.deepEqual(ACRE_CURRENT_IBGE_REGIONS.map((region) => region.municipalityCount), [14, 8]);
});

test("PC-AC edital regional groups cover all municipalities and place Capixaba in Baixo Acre", () => {
  const municipalities = ACRE_EDITAL_REGIONS.flatMap((region) => region.municipalities);
  assert.equal(municipalities.length, 22);
  assert.equal(new Set(municipalities).size, 22);
  assert.ok(ACRE_EDITAL_REGIONS.find((region) => region.name === "Baixo Acre")?.municipalities.includes("Capixaba"));
});


test("Acre geography uses a vector interactive map built from IBGE municipal shapes", async () => {
  assert.equal(existsSync(new URL("../public/media/acre/acre-municipios.webp", import.meta.url)), false);
  const component = readFileSync(new URL("../src/components/dashboard/AcreGeographyStudy.tsx", import.meta.url), "utf8");
  assert.match(component, /<AcreInteractiveMap \/>/);
  const map = readFileSync(new URL("../src/components/dashboard/AcreInteractiveMap.tsx", import.meta.url), "utf8");
  assert.match(map, /Mesorregiões/);
  assert.match(map, /Regionais do edital/);
  const shapes = readFileSync(new URL("../src/data/acreMapShapes.ts", import.meta.url), "utf8");
  const names = [...shapes.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);
  assert.equal(names.length, 22);
  const expected = ACRE_EDITAL_REGIONS.flatMap((region) => region.municipalities);
  assert.deepEqual([...names].sort(), [...expected].sort());
});
