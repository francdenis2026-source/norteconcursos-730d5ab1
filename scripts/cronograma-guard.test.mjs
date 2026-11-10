import test from "node:test";
import assert from "node:assert/strict";
import { hasActiveEdital } from "../src/lib/cronogramaGuard.ts";

test("published and open-registration contests lock creation", () => {
  assert.equal(hasActiveEdital({ status: "Edital Publicado" }), true);
  assert.equal(hasActiveEdital({ status: "Inscrições Abertas" }), true);
});

test("future and closed contests do not lock creation", () => {
  assert.equal(hasActiveEdital({ status: "Previsto" }), false);
  assert.equal(hasActiveEdital({ status: "Encerrado" }), false);
});
