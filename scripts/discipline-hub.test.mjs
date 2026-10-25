import test from "node:test";
import assert from "node:assert/strict";
import { disciplineCards, isLawDiscipline, materialsOf, playlistsOf, tracksOf } from "../src/lib/disciplineHub.ts";
import { TRACKS } from "../src/data/tracks/index.ts";
import { PLAYLISTS } from "../src/data/mediaCatalog.ts";

const mat = (slug, discipline) => ({ slug, discipline, law_course_slug: null });

test("law and Direito disciplines never appear among the disciplines", () => {
  for (const n of ["Direito Penal", "Direito Constitucional", "Direito Administrativo", "Direitos Humanos", "Legislação Penal Extravagante", "Direito Processual Penal", "Carreiras (PRF, PF, PC)", "Legislação de Trânsito"])
    assert.ok(isLawDiscipline(n), n);
  for (const n of ["Língua Portuguesa", "Matemática", "Raciocínio Lógico", "Química", "Física", "Estatística", "Contabilidade Geral", "Informática"])
    assert.ok(!isLawDiscipline(n), n);
  const names = disciplineCards([], TRACKS, PLAYLISTS).map((c) => c.name);
  assert.ok(!names.some((n) => /direito|legisla|penal|constitucional|administrativo|humanos|carreiras/i.test(n)), names.join(","));
});

test("each card gathers materials, track lessons and videos of the same discipline", () => {
  const cards = disciplineCards([mat("a", "Português"), mat("b", "Língua Portuguesa")], TRACKS, PLAYLISTS);
  const pt = cards.find((c) => c.name === "Língua Portuguesa");
  assert.equal(pt.materials, 2);
  assert.ok(pt.lessons > 0, "track lessons");
  assert.ok(pt.videos > 0, "video playlists");
  assert.ok(pt.hasContent);
  const quimica = cards.find((c) => c.name === "Química");
  assert.equal(quimica.hasContent, true);
  assert.ok(quimica.lessons > 0, "new introductory chemistry track");
  const empty = disciplineCards([], [], []).find(c => c.name === "Química");
  assert.equal(empty.hasContent, false, "a genuinely empty discipline remains in preparation");
});

test("expected disciplines come first, in order, extras after", () => {
  const cards = disciplineCards([mat("g", "Geografia")], [], []);
  assert.deepEqual(cards.slice(0, 3).map((c) => c.name), ["Língua Portuguesa", "Matemática", "Raciocínio Lógico"]);
  assert.equal(cards.at(-1).name, "Geografia");
});

test("selectors return only the discipline's own content", () => {
  assert.ok(tracksOf("Informática", TRACKS).every((t) => /inform/i.test(t.title)));
  assert.ok(playlistsOf("Raciocínio Lógico", PLAYLISTS).length >= 2);
  assert.deepEqual(materialsOf("Química", [mat("a", "Português"), mat("b", "Química")]).map((m) => m.slug), ["b"]);
});
