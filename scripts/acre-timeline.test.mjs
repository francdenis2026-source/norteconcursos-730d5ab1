import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("Acre timeline covers the key milestones in each era", () => {
  const data = read("src/data/acreTimeline.ts");
  for (const text of ["6/8/1902", "17/11/1903", "15/6/1962", "3/10/1989", "Xapuri", "Lei nº 4.070"])
    assert.ok(data.includes(text), `missing: ${text}`);
  const eras = ["conflito", "territorio", "estado"];
  for (const era of eras) assert.ok(new RegExp(`era: "${era}"`).test(data), `era ${era} has no event`);
  assert.equal((data.match(/place: "/g) ?? []).length, 5);
});

test("Acre video guide uses only catalog videos and encoded searches", () => {
  const guide = read("src/data/acreVideoGuide.ts");
  assert.match(guide, /encodeURIComponent/);
  assert.match(read("src/components/dashboard/AcreVideoPanel.tsx"), /youtubeSearchUrl/);
  assert.match(read("src/components/dashboard/AcreRealityArea.tsx"), /AcreVideoPanel axisId="atualidades"/);
});

test("every municipality note refers to a real Acre municipality", () => {
  const notes = read("src/data/acreMunicipalityNotes.ts");
  const shapes = read("src/data/acreMapShapes.ts");
  const names = new Set([...shapes.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]));
  const keys = [...notes.matchAll(/^  "([^"]+)": \{/gm)].map((m) => m[1]);
  assert.ok(keys.length >= 10);
  for (const key of keys) assert.ok(names.has(key), `unknown municipality: ${key}`);
});

test("Acre strategic facts name the people and sources banks ask about", () => {
  const facts = read("src/data/acreStrategicFacts.ts");
  for (const text of ["Mailza Assis", "Jéssica Alves", "José Manuel Pando", "Guachalla", "Pinilla", "Assis Brasil", "El Acre", "Gálvez", "Bolivian Syndicate"])
    assert.ok(facts.includes(text), `missing: ${text}`);
  const questions = (facts.match(/question: "/g) ?? []).length;
  const sources = (facts.match(/sources: \[/g) ?? []).length;
  assert.equal(questions, sources);
  assert.match(read("src/components/dashboard/AcreRealityArea.tsx"), /AcreStrategicFacts/);
});

test("videos open in the platform player window with a back button and other topics", () => {
  const panel = read("src/components/dashboard/AcreVideoPanel.tsx");
  assert.match(panel, /VideoWatchDialog/);
  assert.doesNotMatch(panel, /youtubeWatchUrl/);
  const player = read("src/components/media/VideoWatchDialog.tsx");
  assert.match(player, /Outros tópicos do edital/);
  assert.match(player, /onClick=\{onClose\}/);
  assert.match(read("src/styles/video-player-window.css"), /92dvh/);
});

test("Resex map and indigenous study use only municipalities that exist on the map", () => {
  const shapes = read("src/data/acreMapShapes.ts");
  const names = new Set([...shapes.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]));
  for (const file of ["src/data/acreResex.ts", "src/data/acreIndigenous.ts"]) {
    const text = read(file);
    for (const m of text.matchAll(/"([A-ZÁÂÃÉÊÍÓÔÕÚÇ][^"]{3,30})": \d/g)) assert.ok(names.has(m[1]), `${file}: ${m[1]}`);
  }
  const resex = read("src/data/acreResex.ts");
  for (const m of resex.matchAll(/municipalities: \[([^\]]*)\]/g))
    for (const n of m[1].split(",").map((x) => x.trim().replace(/"/g, "")).filter(Boolean)) assert.ok(names.has(n), `Resex: ${n}`);
  assert.match(read("src/components/dashboard/AcreRealityArea.tsx"), /AcreResexMap/);
  assert.match(read("src/components/dashboard/AcreRealityArea.tsx"), /AcreIndigenousStudy/);
});

test("IBGE regional division is explained and 2026 updates are recorded", () => {
  const ibge = read("src/components/dashboard/AcreIbgeDivision.tsx");
  for (const text of ["Região Imediata", "Região Intermediária", "1989/1990", "2017", "133 e 510", "regionais do edital"])
    assert.ok(ibge.includes(text), `missing: ${text}`);
  assert.match(read("src/components/dashboard/AcreGeographyStudy.tsx"), /<AcreIbgeDivision \/>/);
  const content = read("src/data/acreStudyContent.ts");
  for (const text of ["887.794", "14,7%", "Marcio Bittar"]) assert.ok(content.includes(text), `missing: ${text}`);
});
