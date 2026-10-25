import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { pcAcreRole, pcAcreRoles, pcAcrePriorities } from "../src/lib/pcAcreOutlook.ts";

const data = JSON.parse(readFileSync("src/data/pcAcreStudyOutlook.json", "utf8"));
const report = JSON.parse(readFileSync("docs/analysis/pc-acre-history-2026-10-14.json", "utf8"));
test("shared cargo URLs validate input and default to the requested Investigator", () => {
  assert.equal(pcAcreRole(undefined), "investigador");
  assert.equal(pcAcreRole("admin"), "investigador");
  for (const role of pcAcreRoles) {
    assert.equal(pcAcreRole(role), role);
    assert.ok(pcAcrePriorities[role].length >= 4);
    assert.equal(data.training.reduce((sum, block) => sum + block[role], 0), 100);
  }
});
test("published historical samples match the reviewed report without including private sources", () => {
  const names = { investigador: "Investigador/Agente", escrivao: "Escrivão", delegado: "Delegado" };
  assert.equal(data.profiles.length, 3);
  for (const p of data.profiles) {
    const original = report.profiles[names[p.id]];
    assert.equal(p.records, original.total_records);
    assert.equal(p.exams.length, original.exams.length);
    assert.equal(p.exams.reduce((sum, exam) => sum + exam.records, 0), p.records);
    assert.equal(new Set(p.exams.map((exam) => `${exam.state}|${exam.year}`)).size, p.exams.length);
    for (const exam of p.exams) for (const source of exam.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, "https:");
      assert.ok(["cdn.cebraspe.org.br", "conhecimento.fgv.br", "www.cev.uece.br"].includes(url.hostname));
      assert.ok(url.pathname.toLowerCase().endsWith(".pdf"));
    }
  }
});
