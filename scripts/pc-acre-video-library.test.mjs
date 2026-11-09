import test from "node:test";
import assert from "node:assert/strict";
import { PCAC_VIDEOS } from "../src/data/pcAcVideos.ts";
import { pcAcDisciplineLink } from "../src/lib/pcAcreVerticalLinks.ts";

const realityTopics = PCAC_VIDEOS["Realidade do Acre"];

test("PC-AC videoteca covers history, geography, and economy of Acre", () => {
  assert.ok(realityTopics);
  assert.ok(Object.keys(realityTopics).some((topic) => /históric|borracha|revolução/i.test(topic)));
  assert.ok(Object.keys(realityTopics).some((topic) => /geografia|fronteira|hidrográfica/i.test(topic)));
  assert.ok(Object.keys(realityTopics).some((topic) => /econôm|agropec|extrativ/i.test(topic)));
  assert.ok(Object.values(realityTopics).flat().length >= 6);
});

test("Realidade do Acre edital discipline points to its video subject", () => {
  assert.deepEqual(pcAcDisciplineLink("realidade-acre")?.subjects, ["Realidade do Acre"]);
});
