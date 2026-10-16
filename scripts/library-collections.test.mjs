import test from "node:test";
import assert from "node:assert/strict";
import { libraryCollection } from "../src/lib/libraryOrganization.ts";
import { relatedVideos } from "../src/lib/relatedVideos.ts";

test("laws, other disciplines and ENEM form disjoint collections", () => {
  const items = [
    {
      slug: "cp",
      discipline: "Direito Penal",
      law_course_slug: "codigo-penal",
      contest_name: null,
    },
    { slug: "constitucional", discipline: "Direito Constitucional", contest_name: "PF" },
    { slug: "portugues", discipline: "Língua Portuguesa", contest_name: "PF" },
    { slug: "enem-portugues", discipline: "Língua Portuguesa", contest_name: "ENEM" },
    { slug: "enem-humanas", discipline: "Direitos Humanos", contest_name: " enem " },
  ];
  assert.deepEqual(items.map(libraryCollection), ["laws", "laws", "subjects", "enem", "enem"]);
  assert.equal(items.filter((item) => libraryCollection(item) === "laws").length, 2);
  assert.equal(items.filter((item) => libraryCollection(item) === "subjects").length, 1);
});

test("library video recommendations never cross ENEM and competition contexts", () => {
  const catalog = {
    topicVideos: {
      "Língua Portuguesa": { "*": [{ id: "competition", title: "Português para concursos" }] },
      "ENEM — Língua Portuguesa": { "*": [{ id: "enem", title: "Linguagens do ENEM" }] },
      "ENEM — Matemática": { "*": [{ id: "math", title: "Matemática" }] },
    },
  };
  assert.deepEqual(
    relatedVideos(catalog, "Língua Portuguesa", "Texto").map((v) => v.id),
    ["competition"],
  );
  assert.deepEqual(
    relatedVideos(catalog, "Língua Portuguesa", "Texto", 4, "enem").map((v) => v.id),
    ["enem"],
  );
  assert.deepEqual(relatedVideos(catalog, "Física", "Energia", 4, "enem"), []);
});
