import test from "node:test";
import assert from "node:assert/strict";
import { splitLawMentions, lawTitle } from "../src/lib/lawNames.ts";

const laws = (text) => splitLawMentions(text).filter((p) => p.law).map((p) => [p.text, p.law.name]);

test("a numbered law in several spellings gets its name", () => {
  assert.deepEqual(laws("nos termos da Lei n.º 11.340/2006, aplica-se"), [["Lei n.º 11.340/2006", "Lei Maria da Penha"]]);
  assert.equal(laws("Lei nº 11.340/2006")[0][1], "Lei Maria da Penha");
  assert.equal(laws("Lei no 11.340/2006")[0][1], "Lei Maria da Penha");
  assert.equal(laws("Lei 11.343, de 23 de agosto de 2006")[0][1], "Lei de Drogas");
  assert.match(laws("Lei Federal n. º 8.072/1990")[0][1], /Hediondos/);
});

test("the text around the mention is preserved exactly", () => {
  const text = "Segundo a Lei n.º 11.340/2006, a vítima;  e a Lei 9.099/1995.";
  const parts = splitLawMentions(text);
  assert.equal(parts.map((p) => p.text).join(""), text);
  assert.equal(parts.filter((p) => p.law).length, 2);
});

test("a wrong year or an unknown number never gets a name", () => {
  assert.deepEqual(laws("Lei n.º 11.340/1999"), []);
  assert.deepEqual(laws("Lei n.º 99.999/2006"), []);
  assert.deepEqual(laws("Decreto-Lei 2.848/1999"), []);
  assert.deepEqual(laws("O art. 5º da Constituição e a lei penal."), []);
});

test("decree-laws need the year, ordinary laws may omit it", () => {
  assert.equal(laws("Decreto-Lei nº 2.848/1940")[0][1], "Código Penal");
  assert.deepEqual(laws("Decreto-Lei nº 2.848"), []);
  assert.equal(laws("Lei 11.340")[0][1], "Lei Maria da Penha");
});

test("library norms keep their official link and the title is normalised", () => {
  const part = splitLawMentions("Lei 10.826/2003").find((p) => p.law);
  assert.match(part.law.sourceUrl, /planalto\.gov\.br/);
  assert.equal(lawTitle(part.law), "Lei nº 10.826/2003");
  assert.equal(lawTitle(splitLawMentions("Lei Complementar 75/1993").find((p) => p.law).law), "Lei Complementar nº 75/1993");
});

test("plain text without laws comes back untouched", () => {
  assert.deepEqual(splitLawMentions("Sem lei alguma aqui."), [{ text: "Sem lei alguma aqui." }]);
});
