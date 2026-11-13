import test from "node:test";
import assert from "node:assert/strict";
import { LEGAL_MAPS, legalMapFor } from "../src/data/legalMaps.ts";

test("mapas jurídicos: itens completos e únicos", () => {
  const ids = new Set();
  for (const map of LEGAL_MAPS) {
    assert.ok(map.sources.length > 0 && map.sources.every((s) => s.url.startsWith("https://")));
    assert.match(map.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
    for (const branch of map.branches) for (const n of branch.nodes) {
      assert.ok(n.title && n.ref && n.rule && n.example, n.id);
      assert.ok(!ids.has(n.id), `id duplicado ${n.id}`); ids.add(n.id);
      assert.ok(n.careers.length > 0, n.id);
      if (n.max !== undefined) assert.ok((n.min ?? 0) <= n.max, n.id);
    }
  }
});
test("legalMapFor resolve as quatro disciplinas", () => {
  for (const s of ["Direito Penal", "Direito Processual Penal", "Legislação Penal Extravagante", "Direito Constitucional"]) assert.ok(legalMapFor(s), s);
  assert.equal(legalMapFor("Português"), undefined);
});
