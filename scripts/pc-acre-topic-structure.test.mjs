import test from "node:test";
import assert from "node:assert/strict";
import { splitPcAcTopic, pcAcVerticalTopicGroups } from "../src/lib/pcAcreTopicStructure.ts";

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

test("normalizes every topic in a discipline", () => {
  const groups = pcAcVerticalTopicGroups({
    topics: ["A. 1.1 Primeiro item. 1.2 Segundo item.", "Princípios fundamentais."],
  });
  assert.equal(groups.length, 2);
  assert.equal(groups[0].subtopics.length, 2);
});
