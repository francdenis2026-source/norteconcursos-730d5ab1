import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  matchesMaterialScope,
  materialPracticePool,
  materialPracticeSearch,
  materialTopic,
} from "../src/lib/materialPractice.ts";
const cpp = "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm";
const cp = "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm";
const question = (patch = {}) => ({
  id: "one",
  table: "board_exam_questions",
  source: "official",
  subject: "Direito Processual Penal",
  contest: "PC",
  career: "Agente",
  year: "2026",
  board: "IDECAN",
  subtopic: null,
  text: "Assinale a alternativa correta sobre a investigação.\n(A) Uma alternativa.\n(B) Outra alternativa.\n(C) Terceira alternativa.\n(D) Quarta alternativa.",
  answer: "A",
  explanation: "Comentário disponível.",
  legalBasis: [{ url: cpp, artigo: "Art. 5º" }],
  ...patch,
});
test("article scope requires the same diploma and exact article, including suffixes", () => {
  const scope = { law: "codigo-processo-penal", article: "Art. 5º" };
  assert.ok(matchesMaterialScope(question(), scope));
  assert.ok(
    !matchesMaterialScope(question({ legalBasis: [{ url: cpp, artigo: "Art. 50" }] }), scope),
  );
  assert.ok(
    !matchesMaterialScope(question({ legalBasis: [{ url: cpp, artigo: "Art. 5-A" }] }), scope),
  );
  assert.ok(
    !matchesMaterialScope(question({ legalBasis: [{ url: cp, artigo: "Art. 5" }] }), scope),
  );
  assert.ok(!matchesMaterialScope(question(), { ...scope, article: "anexo-1" }));
  assert.ok(matchesMaterialScope(question({ legalBasis: [{ url: cpp + "#art5" }] }), scope));
  assert.ok(
    !matchesMaterialScope(
      question({
        legalBasis: [
          { url: cpp, artigo: "Art. 50" },
          { url: cp, artigo: "Art. 5" },
        ],
      }),
      scope,
    ),
  );
});
test("unclassified topic never widens to all questions of the discipline", () => {
  const scope = { subject: "Direito Processual Penal", topic: "Tema específico sem classificação" };
  assert.ok(!matchesMaterialScope(question(), scope));
  assert.ok(matchesMaterialScope(question({ testedTopic: scope.topic }), scope));
  assert.ok(
    !matchesMaterialScope(question({ subject: "Direito Penal", testedTopic: scope.topic }), scope),
  );
  assert.equal(materialTopic("Química", "Tema específico sem classificação"), scope.topic);
});
test("a material link roundtrips the exact scope without starting a different session", () => {
  const scope = {
    subject: "Direito Processual Penal",
    topic: "Inquérito policial",
    law: "codigo-processo-penal",
    article: "Art. 5º",
  };
  const search = materialPracticeSearch(scope);
  assert.deepEqual(search, {
    studySubject: scope.subject,
    materialTopic: scope.topic,
    law: scope.law,
    studyArticle: scope.article,
    limit: "20",
  });
  assert.equal(search.go, undefined);
});
test("pool preserves CE keys and excludes malformed, personal, duplicate and unsupported questions", () => {
  const ce = question({
    id: "ce",
    board: "CEBRASPE",
    kind: "true_false",
    text: "Julgue o item: o inquérito policial tem natureza administrativa.",
    answer: "C",
  });
  const bad = question({ id: "bad", text: "Assinale a alternativa correta.", answer: "A" });
  const pool = materialPracticePool(
    [question(), question(), ce, bad, question({ id: "personal", source: "personal" })],
    { law: "codigo-processo-penal" },
  );
  assert.deepEqual(
    pool.map((q) => q.id),
    ["one", "ce"],
  );
  assert.equal(materialPracticePool([question()], { law: "unknown" }).length, 0);
});
test("all material reading entry points integrate the shared workspace and the article never uses whole-law quiz", () => {
  for (const route of ["library.$slug", "trilhas", "disciplinas"]) {
    const text = readFileSync(
      new URL("../src/routes/dashboard/" + route + ".tsx", import.meta.url),
      "utf8",
    );
    assert.match(text, /<MaterialStudyTabs/);
    assert.match(text, /<MaterialPractice/);
  }
  const legal = readFileSync(
    new URL("../src/routes/dashboard/legal-course.$slug.tsx", import.meta.url),
    "utf8",
  );
  assert.match(legal, /article: unit.label/);
  assert.ok(!legal.includes("<LawPracticeQuiz"));
  const trainer = readFileSync(
    new URL("../src/routes/dashboard/question-trainer.tsx", import.meta.url),
    "utf8",
  );
  for (const key of ["studySubject", "materialTopic", "studyArticle"])
    assert.ok(trainer.includes('typeof search["' + key + '"]'));
  assert.match(trainer, /materialPracticePool\(scoped, materialScope\)/);
});

test("explicit topic metadata takes precedence over an approximate text classifier", () => {
  assert.ok(
    !matchesMaterialScope(
      question({
        subject: "Língua Portuguesa",
        testedTopic: "Pontuação",
        text: "O emprego da crase está correto nesta oração.",
      }),
      { subject: "Língua Portuguesa", topic: "Crase" },
    ),
  );
});

test("authored material exercises keep their own origin, scope and CE key without claiming a catalog row", async () => {
  const { authoredMaterialPractice, mergeMaterialPractice } =
    await import("../src/lib/materialPractice.ts");
  const items = [
    {
      q: "A autenticação verifica uma identidade alegada.",
      a: true,
      why: "Distingue identidade de autorização.",
    },
    { q: "A autenticação verifica uma identidade alegada.", a: true, why: "Duplicada." },
    {
      q: "Toda autorização concede acesso irrestrito.",
      a: false,
      why: "A autorização estabelece os acessos permitidos.",
    },
  ];
  const result = authoredMaterialPractice(
    items,
    { subject: "Informática", topic: "Segurança da informação" },
    "seguranca",
    "Segurança da informação",
  );
  assert.equal(result.length, 2);
  assert.deepEqual(
    result.map((q) => q.answer),
    ["C", "E"],
  );
  assert.ok(result.every((q) => q.table === undefined && q.board.includes("autoral")));
  assert.equal(mergeMaterialPractice(result, result).length, 2);
  for (const scope of [
    { law: "codigo-processo-penal" },
    { subject: "Direito Constitucional" },
    { subject: "Contabilidade Geral" },
    { article: "Art. 5" },
  ])
    assert.equal(authoredMaterialPractice(items, scope, "material", "tema").length, 0);
});

test("four new foundational tracks have actual syllabus bindings and twenty exercises per lesson", async () => {
  const { TRACKS } = await import("../src/data/tracks/index.ts");
  for (const slug of ["matematica", "fisica", "quimica", "ingles"]) {
    const track = TRACKS.find((t) => t.slug === slug);
    assert.ok(track);
    assert.ok(track.lessons.length);
    for (const lesson of track.lessons) {
      assert.equal(lesson.quiz.length, 20);
      assert.ok(lesson.syllabusTopicId);
      assert.ok(lesson.pontos.length >= 4);
      assert.ok(lesson.exemplo.length > 70);
    }
  }
});

test("combining authored practice preserves different support passages for the same command", async () => {
  const { mergeMaterialPractice } = await import("../src/lib/materialPractice.ts");
  const a = question({
    text: "Texto-base:\nPrimeiro caso completo.\n\n[[/texto-base]]\nAssinale a alternativa correta.\n(A) Uma.\n(B) Duas.\n(C) Três.\n(D) Quatro.",
  });
  const b = {
    ...a,
    id: "different",
    text: a.text.replace("Primeiro caso completo.", "Segundo caso completo."),
  };
  assert.equal(mergeMaterialPractice([a], [b]).length, 2);
});
