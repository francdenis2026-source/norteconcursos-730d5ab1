import test from "node:test";
import assert from "node:assert/strict";
import { selfCheckRefs } from "../src/lib/legalRefs.ts";
import { isOfficialUrl } from "../src/lib/questionFormat.ts";

test("referências legais: artigo e parágrafo exatos, outra lei por nome ou número, sem link para artigo inexistente", () => {
  selfCheckRefs();
});

test("fontes oficiais específicas do Acre são aceitas e caminhos genéricos continuam bloqueados", () => {
  assert.equal(isOfficialUrl("https://legis.ac.gov.br/detalhar/674"), true);
  assert.equal(isOfficialUrl("https://legis.ac.gov.br/detalhar/6527"), true);
  assert.equal(isOfficialUrl("https://legis.ac.gov.br/detalhar/3990"), true);
  assert.equal(isOfficialUrl("https://legis.ac.gov.br/detalhar/2499"), true);
  assert.equal(isOfficialUrl("https://legis.ac.gov.br/detalhar/2741"), true);
  assert.equal(isOfficialUrl("https://legis.ac.gov.br/detalhar/5749-0"), true);
  assert.equal(isOfficialUrl("https://legis.ac.gov.br/detalhar/110"), true);
  assert.equal(isOfficialUrl("https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/5556/pdf-texto"), true);
  assert.equal(
    isOfficialUrl("https://legis.ac.gov.br/detalhar/999999"),
    false,
  );
  assert.equal(
    isOfficialUrl("http://legis.ac.gov.br/detalhar/674"),
    false,
  );
});
