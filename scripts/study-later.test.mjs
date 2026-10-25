import test from "node:test";
import assert from "node:assert/strict";
import {
  canStrikeQuestion,
  saveStudyLater,
  readStudyLater,
  writeStudyLater,
  studyLaterKey,
} from "../src/lib/studyLater.ts";
const question = (extra = {}) => ({
  id: "q1",
  source: "official",
  subject: "Direito Penal",
  subtopic: null,
  text: "Analise as situações.\n(A) Homicídio.\n(B) Furto.\n(C) Texto sem classificação.",
  board: "FGV",
  contest: "Concurso",
  year: "2026",
  answer: "A",
  explanation: "Comentário",
  legalBasis: [],
  checkedAt: null,
  difficulty: "média",
  state: "",
  category: "",
  ...extra,
});
const storage = () => {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
};
test("elimination belongs only to multiple choice, including explicit true/false data", () => {
  assert.equal(canStrikeQuestion(question()), true);
  assert.equal(
    canStrikeQuestion(
      question({ text: "Julgue o item.", board: "CEBRASPE", answer: "C", kind: "true_false" }),
    ),
    false,
  );
  assert.equal(canStrikeQuestion(question({ kind: "true_false" })), false);
});
test("saving is per-account, deduplicated and preserves notes and review progress", () => {
  const s = storage();
  saveStudyLater(s, "user-a", question(), "2026-10-15T12:00:00Z");
  const saved = readStudyLater(s, "user-a");
  saved[0].notes = "Rever prazos";
  saved[0].reviewed = true;
  writeStudyLater(s, "user-a", saved);
  saveStudyLater(s, "user-a", question());
  assert.equal(readStudyLater(s, "user-a").length, 1);
  assert.equal(readStudyLater(s, "user-a")[0].notes, "Rever prazos");
  assert.equal(readStudyLater(s, "user-a")[0].reviewed, true);
  assert.deepEqual(readStudyLater(s, "user-b"), []);
  saveStudyLater(s, "user-b", question());
  assert.equal(readStudyLater(s, "user-b")[0].notes, "");
});
test("each alternative gets its own topic and unknown cases remain unknown", () => {
  const s = storage();
  saveStudyLater(s, "a", question());
  const item = readStudyLater(s, "a")[0];
  assert.equal(item.topic, null);
  assert.deepEqual(
    item.alternatives.map((a) => a.topic),
    ["Crimes contra a pessoa", "Crimes contra o patrimônio", null],
  );
  assert.ok(item.alternatives.every((a) => a.subject === "Direito Penal"));
});
test("source identity prevents an official and authored item from overwriting one another", () => {
  const s = storage();
  saveStudyLater(s, "a", question());
  saveStudyLater(s, "a", question({ source: "curated" }));
  assert.equal(readStudyLater(s, "a").length, 2);
});
test("damaged or unavailable storage never reports success or overwrites previous content", () => {
  const s = storage();
  s.setItem(studyLaterKey("a"), "damaged");
  assert.throws(() => saveStudyLater(s, "a", question()));
  assert.equal(s.getItem(studyLaterKey("a")), "damaged");
  const denied = {
    getItem: () => null,
    setItem: () => {
      throw new Error("QuotaExceededError");
    },
  };
  assert.throws(() => saveStudyLater(denied, "a", question()));
  assert.throws(() => saveStudyLater(s, "", question()));
  assert.throws(() => saveStudyLater(s, "demo-user", question()));
});
