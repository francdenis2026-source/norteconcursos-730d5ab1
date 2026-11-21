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

test("reviewed accounting exercises carry difficulty, step-by-step correction and exam tips", async () => {
  const { authoredMaterialPractice } = await import("../src/lib/materialPractice.ts");
  const quiz = [{
    q: "Se o ativo é R$ 20.000 e o passivo é R$ 12.000, o PL é R$ 32.000.",
    a: false,
    why: "PL = Ativo − Passivo = R$ 8.000.",
    difficulty: "média",
    tip: "Use PL = Ativo − Passivo.",
    resolution_steps: ["Separe Ativo e Passivo.", "Subtraia 20.000 − 12.000.", "O PL é R$ 8.000."],
    wrong_feedback: "O erro está na soma; PL é a diferença."
  }];
  const review = {
    version: 1, review_type: "didactic", status: "reviewed",
    material_slug: "pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo",
    subject: "Contabilidade Geral e Análise Financeira",
    topic_label: "1. Conceitos fundamentais de contabilidade",
    checked_at: "2026-11-14T23:00:00-03:00",
    method: "Revisão didática individual.",
    source_note: "Edital PC-AC e material de apoio fornecido.",
    items: quiz.map(({q,a,why}) => ({q,a,why}))
  };
  const result = authoredMaterialPractice(
    quiz,
    {subject: "Contabilidade Geral e Análise Financeira"},
    review.material_slug,
    "Conceitos fundamentais",
    review
  );
  assert.equal(result.length, 1);
  assert.equal(result[0].difficulty, "média");
  assert.equal(result[0].studyTip, quiz[0].tip);
  assert.deepEqual(result[0].resolutionSteps, quiz[0].resolution_steps);
  assert.equal(result[0].wrongFeedback, quiz[0].wrong_feedback);
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

test("legacy Informatics lessons require exact approved reviews, without opening other slugs", async () => {
  const { authoredMaterialPractice } = await import("../src/lib/materialPractice.ts");
  const { matchesManualReview } = await import("../src/lib/materialPracticeReview.ts");
  const slug = "informatica-01-01";
  const quiz = [{ q: "Um SSD mantém dados sem energia?", a: true, why: "SSD é armazenamento não volátil." }];
  const scope = { subject: "Informática", topic: "Hardware, software e periféricos" };
  const review = {
    version: 1, review_type: "didactic_manual", status: "reviewed",
    material_slug: slug, subject: "Informática", topic_label: scope.topic,
    checked_at: "2026-11-21T18:00:00Z",
    method: "Revisão editorial item a item.", source_note: "Exercício autoral de fixação.",
    items: quiz.map(({ q, a, why }) => ({ q, a, why })),
  };
  assert.equal(authoredMaterialPractice(quiz, scope, slug, scope.topic).length, 0);
  assert.equal(matchesManualReview(quiz, review, slug), true);
  assert.equal(authoredMaterialPractice(quiz, scope, slug, scope.topic, review).length, 1);
  assert.equal(authoredMaterialPractice(quiz, scope, slug, scope.topic, { ...review, items: [{ ...review.items[0], why: "Alterado" }] }).length, 0);
  assert.equal(authoredMaterialPractice(quiz, scope, "informatica-99-99", scope.topic, { ...review, material_slug: "informatica-99-99" }).length, 0);
});
