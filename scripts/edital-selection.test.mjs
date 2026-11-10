import test from "node:test";
import assert from "node:assert/strict";
import { contestOptions, roleOptions, editionOptions } from "../src/lib/editalSelection.ts";

const editions = [
  {
    id: "pc-agente-2026",
    contest_name: "PC-AC",
    role_name: "Agente",
    contest_year: 2026,
    exam_board: "IBFC",
  },
  {
    id: "pc-escrivao-2026",
    contest_name: "PC-AC",
    role_name: "Escrivão",
    contest_year: 2026,
    exam_board: "IBFC",
  },
  {
    id: "pc-agente-2024",
    contest_name: "PC-AC",
    role_name: "Agente",
    contest_year: 2024,
    exam_board: "IBFC",
  },
  {
    id: "pf-agente-2025",
    contest_name: "PF",
    role_name: "Agente",
    contest_year: 2025,
    exam_board: "Cebraspe",
  },
];

test("groups active editions into contests without hiding roles", () => {
  assert.deepEqual(contestOptions(editions), ["PC-AC", "PF"]);
  assert.deepEqual(roleOptions(editions, "PC-AC"), ["Agente", "Escrivão"]);
});

test("keeps every year for the selected contest and role", () => {
  assert.deepEqual(
    editionOptions(editions, "PC-AC", "Agente").map((e) => e.id),
    ["pc-agente-2026", "pc-agente-2024"],
  );
});

test("empty parent selection returns no dependent options", () => {
  assert.deepEqual(roleOptions(editions, ""), []);
  assert.deepEqual(editionOptions(editions, "PC-AC", ""), []);
});
