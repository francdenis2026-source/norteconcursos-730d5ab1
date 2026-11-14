import { test } from "node:test";
import assert from "node:assert/strict";
import { examOriginLabel } from "../src/lib/examLabel.ts";

test("rótulo mostra órgão e ano, sem nome de banca", () => {
  assert.equal(examOriginLabel({ contest: "Polícia Civil do Acre", year: 2025 }), "Prova de Polícia Civil do Acre · 2025");
  assert.equal(examOriginLabel({ contest: "PC-SE", year: "2021" }), "Prova de PC-SE · 2021");
  assert.equal(examOriginLabel({ contest: null, year: 2024 }), "Prova · 2024");
  assert.equal(examOriginLabel({ contest: "PC-PR" }), "Prova de PC-PR");
  assert.equal(examOriginLabel({}), "Prova");
});
