import test from "node:test";
import assert from "node:assert/strict";
import { readGuestProgress, recordGuestAnswer } from "../src/lib/guestProgress.ts";
import {
  dailyGuestQuestions,
  pendingGuestQuestions,
  guestContentKey,
  isGuestSecurityCareer,
} from "../src/lib/dailyGuestQuestions.ts";
const day = "2026-10-15";
const memory = () => {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
};
const row = (id, changes = {}) => ({
  id,
  contest_name: "Polícia Federal",
  exam_year: 2026,
  career_name: "Agente de Polícia Federal",
  exam_board: "CEBRASPE",
  subject: "Matemática",
  question_text: `Julgue a afirmação matemática independente na situação ${id}, conforme o enunciado apresentado.`,
  official_answer: "C",
  content_status: "active",
  legal_basis: [],
  review_note:
    "A afirmação é analisada pela operação matemática descrita no enunciado, considerando os valores e as regras aplicáveis à situação. Exemplo: somar duas unidades a outras duas resulta em quatro unidades.",
  ...changes,
});
test("guest refresh skips answered items and preserves the ten-answer cap across visits", () => {
  const store = memory(),
    questions = dailyGuestQuestions(Array.from({ length: 10 }, (_, i) => row(String(i))));
  for (const q of questions.slice(0, 3))
    recordGuestAnswer(store, day, { id: q.id, key: guestContentKey(q.text), correct: true });
  const progress = readGuestProgress(store, day);
  assert.equal(progress.used, 3);
  assert.equal(progress.answers.length, 3);
  assert.deepEqual(
    pendingGuestQuestions(questions, progress).map((q) => q.id),
    ["3", "4", "5", "6", "7", "8", "9"],
  );
  for (const q of questions.slice(3))
    recordGuestAnswer(store, day, { id: q.id, key: guestContentKey(q.text), correct: false });
  assert.equal(
    recordGuestAnswer(store, day, { id: "eleventh", key: "eleventh", correct: true }).recorded,
    false,
  );
  assert.equal(readGuestProgress(store, day).used, 10);
});
test("duplicate answer, content copy, and repeated click never consume a second slot", () => {
  const store = memory(),
    q = dailyGuestQuestions([row("a")])[0],
    answer = { id: q.id, key: guestContentKey(q.text), correct: true };
  assert.equal(recordGuestAnswer(store, day, answer).recorded, true);
  assert.equal(recordGuestAnswer(store, day, answer).recorded, false);
  assert.equal(recordGuestAnswer(store, day, { ...answer, id: "copy" }).recorded, false);
  assert.equal(readGuestProgress(store, day).used, 1);
});
test("a session crossing Acre midnight records on its original date and leaves the next day free", () => {
  const store = memory();
  recordGuestAnswer(store, day, { id: "q", key: "q", correct: true });
  assert.equal(readGuestProgress(store, "2026-10-16").used, 0);
  recordGuestAnswer(store, day, { id: "late", key: "late", correct: true });
  assert.equal(readGuestProgress(store, day).used, 2);
  assert.equal(readGuestProgress(store, "2026-10-16").used, 0);
});
test("legacy quota and corrupted progress cannot grant extra free answers", () => {
  const store = memory();
  store.setItem(`norteconcurso:guest-quota:${day}`, "4");
  store.setItem(`norteconcurso:guest-progress:v1:${day}`, "broken");
  const q = dailyGuestQuestions(Array.from({ length: 10 }, (_, i) => row(String(i))));
  assert.deepEqual(
    pendingGuestQuestions(q, readGuestProgress(store, day)).map((q) => q.id),
    ["4", "5", "6", "7", "8", "9"],
  );
  recordGuestAnswer(store, day, { id: "4", key: guestContentKey(q[4].text), correct: true });
  assert.equal(readGuestProgress(store, day).used, 5);
  assert.equal(pendingGuestQuestions(q, readGuestProgress(store, day))[0].id, "5");
});
test("public challenge accepts only reviewed security C/E, preserving official answers and deduplicating copies", () => {
  const ce = row("ce");
  const multiple = row("mc", {
    question_text: "Assinale a alternativa correta. (A) Uma. (B) Duas. (C) Três. (D) Quatro.",
    official_answer: "C",
  });
  const unrelated = row("civil", {
    contest_name: "Secretaria da Fazenda",
    career_name: "Auditor fiscal",
    career_category: "Fiscal",
  });
  const uncommented = row("no-comment", {
    review_note: "Transcrição verbatim do caderno oficial; gabarito definitivo conferido.",
  });
  const actual = dailyGuestQuestions([ce, multiple, unrelated, uncommented, { ...ce, id: "copy" }]);
  assert.equal(actual.length, 1);
  assert.equal(actual[0].kind, "true_false");
  assert.equal(actual[0].answer, "C");
});
test("unreviewed law, missing support text, annulment and multiple choice without options are never shown", () => {
  const invalid = [
    row("law", { subject: "Direito Penal" }),
    row("draft", { content_status: "under_review" }),
    row("cancelled", { official_answer: "X" }),
    row("missing", {
      subject: "Língua Portuguesa",
      question_text: "Segundo o texto, julgue a afirmação do autor.",
      exam_board: "CEBRASPE",
      official_answer: "C",
    }),
    row("no-options", {
      question_text: "Assinale a alternativa correta, mas não há alternativas no cadastro.",
      official_answer: "C",
    }),
  ];
  invalid.push(
    row("partial", {
      exam_board: "CEBRASPE",
      official_answer: "C",
      question_text:
        "Questão de múltipla escolha incompleta.\n(A) Primeira.\n(B) Segunda.\n(C) Terceira.",
    }),
  );
  assert.deepEqual(dailyGuestQuestions(invalid), []);
  const supported = row("text", {
    subject: "Língua Portuguesa",
    exam_board: "CEBRASPE",
    official_answer: "C",
    question_text:
      "Texto-base:\nTexto de apoio completo para interpretar.\n\n[[/texto-base]]\nSegundo o texto, julgue a afirmação.",
  });
  assert.equal(dailyGuestQuestions([supported]).length, 1);
});

test("security scope includes registered police, firefighter, penal and guard careers", () => {
  for (const name of [
    "Polícia Civil",
    "Polícia Militar",
    "Polícia Federal",
    "Polícia Rodoviária Federal",
    "Corpo de Bombeiros",
    "DEPEN",
    "Polícia Penal",
    "Guarda Municipal",
    "Instituto de Perícia Criminal",
  ]) {
    assert.ok(isGuestSecurityCareer(name, name.includes("Perícia") ? "Perito criminal" : "", ""), name);
  }
  assert.equal(isGuestSecurityCareer("SEFAZ", "Auditor fiscal", "Fiscal"), false);
});
