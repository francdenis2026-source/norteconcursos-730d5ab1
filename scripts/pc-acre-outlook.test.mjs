import test from "node:test";
import assert from "node:assert/strict";
import { pcAcreRole, pcAcreRoles, pcAcrePriorities } from "../src/lib/pcAcreOutlook.ts";
import { pcAcVerticalCargos } from "../src/data/pcAcreVerticalizado.ts";

test("shared cargo ids validate input and default to the requested Investigator", () => {
  assert.equal(pcAcreRole(undefined), "investigador");
  assert.equal(pcAcreRole("admin"), "investigador");
  for (const role of pcAcreRoles) {
    assert.equal(pcAcreRole(role), role);
    assert.ok(pcAcrePriorities[role].length >= 4);
  }
});

test("cargo ids stay in sync with the official edital's 6 cargos (pcAcVerticalCargos)", () => {
  assert.equal(pcAcreRoles.length, 6);
  assert.equal(pcAcVerticalCargos.length, 6);
  const verticalIds = new Set(pcAcVerticalCargos.map((cargo) => cargo.id));
  for (const role of pcAcreRoles) assert.ok(verticalIds.has(role), `missing cargo data for ${role}`);
  for (const cargo of pcAcVerticalCargos) assert.ok(pcAcreRoles.includes(cargo.id), `missing priorities for ${cargo.id}`);
});

test("every cargo has at least one block with at least one discipline", () => {
  for (const cargo of pcAcVerticalCargos) {
    assert.ok(cargo.vagas > 0, `${cargo.id} should have vagas`);
    assert.ok(cargo.salario.startsWith("R$"), `${cargo.id} salario should be formatted`);
    assert.ok(cargo.blocks.length > 0, `${cargo.id} should have blocks`);
    const disciplineCount = cargo.blocks.reduce((total, block) => total + block.disciplines.length, 0);
    assert.ok(disciplineCount > 0, `${cargo.id} should have disciplines`);
  }
});

test("139 total vagas across the 6 real cargos (Edital 001 SEAD/PCAC)", () => {
  const total = pcAcVerticalCargos.reduce((sum, cargo) => sum + cargo.vagas, 0);
  assert.equal(total, 139);
});
