import test from "node:test";
import assert from "node:assert/strict";
import { LAW_ROWS, LAW_THEMES, lawsByTheme, searchLaws, sortLaws } from "../src/lib/lawFinder.ts";
import { LEGAL_LIBRARY } from "../src/lib/legalLibrary.ts";

const top = (q) => searchLaws(q)[0]?.row.slug;

test("every published law becomes a row, with a theme for each", () => {
  assert.equal(LAW_ROWS.length, LEGAL_LIBRARY.length);
  for (const row of LAW_ROWS) assert.ok(row.themes.length > 0, `${row.slug} has no theme`);
  const ids = new Set(LAW_THEMES.map((t) => t.id));
  for (const row of LAW_ROWS) for (const t of row.themes) assert.ok(ids.has(t), `${row.slug}: ${t}`);
});

test("law numbers are found with or without dots, prefix, year or the word 'lei'", () => {
  for (const q of ["11343", "11.343", "lei 11.343", "Lei 11.343/2006", "lei n 11343 de 2006", "11343/2006", "113", "11.34"]) {
    assert.ok(searchLaws(q).some((h) => h.row.slug === "drogas"), q);
  }
  assert.equal(top("11343"), "drogas");
  assert.equal(top("lei 10.826"), "armas");
  assert.equal(top("decreto-lei 3688"), "contravencoes");
  assert.equal(top("2848"), "codigo-penal");
  assert.equal(top("3689"), "codigo-processo-penal");
  assert.equal(top("15358"), "antifaccao");
});

test("names, acronyms and themes lead to the right law", () => {
  assert.equal(top("maria da penha"), "maria-penha");
  assert.equal(top("LEP"), "lep");
  assert.equal(top("ECA"), "eca");
  assert.equal(top("ctb"), "transito");
  assert.equal(top("desarmamento"), "armas");
  assert.equal(top("lavagem de dinheiro"), "lavagem");
  assert.equal(top("grampo"), "interceptacao");
  assert.ok(searchLaws("violência doméstica").map((h) => h.row.slug).includes("maria-penha"));
  assert.equal(top("tortura"), "tortura");
});

test("accents, case and extra spaces do not matter; nonsense finds nothing", () => {
  assert.equal(top("  ORGANIZAÇÕES   criminosas "), "organizacoes");
  assert.equal(top("organizacoes criminosas"), "organizacoes");
  assert.deepEqual(searchLaws("zzzxxyy"), []);
  assert.deepEqual(searchLaws("   "), []);
  assert.deepEqual(searchLaws("99999999"), []);
});

test("a year alone lists the laws of that year; exact number outranks prefixes", () => {
  const y = searchLaws("2006").map((h) => h.row.slug);
  assert.ok(y.includes("drogas") && y.includes("maria-penha"));
  const hits = searchLaws("1134");
  assert.ok(hits.every((h) => h.row.number.startsWith("1134")));
});

test("theme filter and sorting", () => {
  assert.ok(lawsByTheme(LAW_ROWS, "drogas-armas").some((r) => r.slug === "armas"));
  assert.equal(lawsByTheme(LAW_ROWS, "all").length, LAW_ROWS.length);
  assert.equal(sortLaws(LAW_ROWS, "recentes")[0].year >= sortLaws(LAW_ROWS, "recentes")[5].year, true);
  const az = sortLaws(LAW_ROWS, "az").map((r) => r.nickname);
  assert.deepEqual(az, [...az].sort((a, b) => a.localeCompare(b, "pt-BR")));
});
