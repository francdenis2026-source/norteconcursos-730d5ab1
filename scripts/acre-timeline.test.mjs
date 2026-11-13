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
