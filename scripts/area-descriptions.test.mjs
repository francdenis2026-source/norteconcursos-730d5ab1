import { test } from "node:test";
import assert from "node:assert/strict";
import { subjectDescription } from "../src/lib/areaDescriptions.ts";

test("descreve disciplinas pelo nome, sem confundir penal e processual penal", () => {
  assert.match(subjectDescription("Direito Processual Penal"), /processo criminal/);
  assert.match(subjectDescription("Noções de Direito Penal"), /Teoria do crime/);
  assert.match(subjectDescription("Legislação Penal Extravagante"), /fora do Código/);
  assert.match(subjectDescription("RLM - Raciocínio Lógico"), /tabelas-verdade/);
  assert.match(subjectDescription("Língua Portuguesa"), /Interpretação/);
});

test("sem nome ou sem correspondência, não inventa descrição", () => {
  assert.equal(subjectDescription(""), undefined);
  assert.equal(subjectDescription(null), undefined);
  assert.equal(subjectDescription("Zoologia marinha"), undefined);
});
