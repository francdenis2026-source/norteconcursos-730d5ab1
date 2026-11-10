import test from "node:test";
import assert from "node:assert/strict";
import { contestDisplay } from "../src/lib/contestDisplay.ts";

const base = {
  id: "pcac-investigador",
  name: "PC-AC 2026",
  agency: "Polícia Civil do Acre",
  career: "Policial",
  role: "Investigador",
  examBoard: "IBADE",
  educationLevel: "Superior",
  location: "Acre",
  status: "Edital Publicado",
  vacancies: 10,
  salary: 8000,
};

test("cargo is the primary identity and contest remains visible as context", () => {
  assert.deepEqual(contestDisplay(base), {
    context: "Polícia Civil do Acre · PC-AC 2026",
    role: "Investigador",
    career: "Policial",
    education: "Superior",
  });
});

test("different roles remain distinct even with the same agency", () => {
  const other = contestDisplay({ ...base, id: "pcac-agente", role: "Agente" });
  assert.notEqual(contestDisplay(base).role, other.role);
});

test("missing role falls back to the contest name", () => {
  assert.equal(contestDisplay({ ...base, role: "" }).role, "PC-AC 2026");
});
