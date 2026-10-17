import test from "node:test";
import assert from "node:assert/strict";
import {
  parseQuestion,
  questionAnswers,
  questionAnswerLabel,
  isLegallyVerified,
  isOfficialUrl,
  isEligibleQuestion,
} from "../src/lib/questionFormat.ts";
import { fetchAllRows } from "../src/lib/catalog.ts";

const question = {
  text: "Julgue o item a seguir. Uma afirmação.",
  source: "curated",
  board: "IBADE",
};
test("authorial judgment does not inherit multiple choice from the board", () => {
  assert.deepEqual(questionAnswers(question), ["C", "E"]);
  assert.equal(questionAnswerLabel("C", question), "Certo");
});
test("Cebraspe multiple-choice booklet preserves its actual alternatives", () => {
  const q = {
    ...question,
    source: "official",
    board: "Cebraspe",
    text: "Escolha.\n(A) Um\n(B) Dois\n(C) Três\n(D) Quatro\n(E) Cinco",
  };
  assert.deepEqual(questionAnswers(q), ["A", "B", "C", "D", "E"]);
  assert.equal(questionAnswerLabel("C", q), "Alternativa C");
});
test("inline parenthesized and legacy alternatives preserve their contents", () => {
  for (const text of [
    "Escolha (A) Um; (B) Dois; (C) Três; (D) Quatro",
    "Escolha\n(A) Um; (B) Dois; (C) Três; (D) Quatro",
    "Escolha A) Um; B) Dois; C) Três; D) Quatro",
  ]) {
    const parsed = parseQuestion(text);
    assert.equal(parsed.stem, "Escolha");
    assert.deepEqual(
      parsed.options.map((o) => o.text),
      ["Um", "Dois", "Três", "Quatro"],
    );
  }
});
test("personal multiple choice with correct answer C retains all choices", () => {
  assert.deepEqual(
    questionAnswers({
      ...question,
      source: "personal",
      board: "Meu caderno",
      answer: "C",
      text: "Escolha (A) Um; (B) Dois; (C) Três; (D) Quatro",
    }),
    ["A", "B", "C", "D"],
  );
});
test("legal gates reject missing evidence, invalid dates and mixed sources", () => {
  const official = { url: "https://www.planalto.gov.br/ccivil_03/leis/l9455.htm" };
  assert.equal(isLegallyVerified([], null, true), false);
  assert.equal(isLegallyVerified([], null, false), true);
  assert.equal(isLegallyVerified([official], "invalid"), false);
  assert.equal(isLegallyVerified([official], "2999-01-01"), false);
  assert.equal(
    isLegallyVerified([official, { url: "https://example.org/lei" }], "2020-01-01"),
    false,
  );
  assert.equal(
    isLegallyVerified([{ url: "https://planalto.gov.br.evil.example/lei" }], "2020-01-01"),
    false,
  );
  assert.equal(isLegallyVerified([official], "2020-01-01"), true);
});
test("draft, missing legal evidence, cancelled and pending context stay outside training", () => {
  const row = {
    content_status: "active",
    subject: "Informática",
    legal_basis: [],
    official_answer: "C",
  };
  assert.equal(isEligibleQuestion(row), true);
  for (const patch of [
    { content_status: "under_review" },
    { content_status: "draft" },
    { official_answer: "X" },
    { subject: "Direito Penal" },
    { context_review_required: true },
  ])
    assert.equal(isEligibleQuestion({ ...row, ...patch }), false);
});
test("pagination handles a server cap below requested page size without gaps", async () => {
  const all = Array.from({ length: 7 }, (_, id) => ({ id }));
  assert.deepEqual(
    await fetchAllRows(
      (from, to) =>
        Promise.resolve({ data: all.slice(from, Math.min(to + 1, from + 2)), error: null }),
      5,
    ),
    all,
  );
});
test("pagination does not silently accept failed requests", async () => {
  await assert.rejects(
    fetchAllRows(() => Promise.resolve({ data: null, error: new Error("offline") })),
    /offline/,
  );
});

test('reviewed ALEPE norms pass legal eligibility while search pages and lookalike hosts stay blocked', () => {
  const url = 'https://legis.alepe.pe.gov.br/texto.aspx?id=4937&tipo=TEXTOATUALIZADO';
  assert.equal(isOfficialUrl(url), true);
  assert.equal(isOfficialUrl(url.replace('TEXTOATUALIZADO', 'TEXTOORIGINAL')), true);
  const row = {content_status:'active', official_answer:'C', subject:'Legislação Estadual de Pernambuco', legal_review_required:true, legal_audit_completed:true, context_review_required:false, legal_basis:[{url}], law_version_checked_at:'2026-10-16T00:00:00Z'};
  assert.equal(isEligibleQuestion(row), true);
  assert.equal(isEligibleQuestion({...row, legal_audit_completed:false}), false);
  assert.equal(isEligibleQuestion({...row, law_version_checked_at:null}), false);
  for (const invalid of ['https://legis.alepe.pe.gov.br/pesquisaAvancada.aspx', url.replace('https:', 'http:'), url.replace('legis.alepe.pe.gov.br', 'legis.alepe.pe.gov.br.evil.example'), url.replace('4937', 'not-a-norm'), url.replace('TEXTOATUALIZADO', 'SEARCH'), url.replace('https://', 'https://user:password@')]) {
    assert.equal(isOfficialUrl(invalid), false);
    assert.equal(isEligibleQuestion({...row, legal_basis:[{url:invalid}]}), false);
  }
});
test('ALE-RO constitutional compilation is accepted without opening generic legislature pages',()=>{
 const url='https://www.al.ro.leg.br/downloads/constituicao-do-estado-de-rondonia';assert.equal(isOfficialUrl(url),true);
 for(const wrong of ['https://www.al.ro.leg.br/','https://www.al.ro.leg.br/noticias/lei',url+'?redirect=elsewhere',url.replace('https:','http:'),url.replace('www.al.ro.leg.br','www.al.ro.leg.br.evil.example')])assert.equal(isOfficialUrl(wrong),false);
});

test('reviewed biosafety source accepts only the exact Ministry of Health RDC capture',()=>{
 const url='https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2018/rdc0222_28_03_2018.pdf';
 assert.equal(isLegallyVerified([{url}],'2026-10-15T00:00:00Z',true),true);
 for(const wrong of [url.replace('https:','http:'),url+'?preview=1',url.replace('2018.pdf','2019.pdf'),url.replace('bvsms.saude.gov.br','bvsms.saude.gov.br.evil.test'),'https://bvsms.saude.gov.br/'])assert.equal(isOfficialUrl(wrong),false);
 assert.equal(isLegallyVerified([{url}],null,true),false);
});
