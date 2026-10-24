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
