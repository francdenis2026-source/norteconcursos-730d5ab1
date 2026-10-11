import test from "node:test";
import { selfCheckRefs } from "../src/lib/legalRefs.ts";

test("referências legais: artigo e parágrafo exatos, outra lei por nome ou número, sem link para artigo inexistente", () => {
  selfCheckRefs();
});
