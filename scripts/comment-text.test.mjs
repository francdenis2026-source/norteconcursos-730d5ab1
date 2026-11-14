import test from "node:test";
import assert from "node:assert/strict";
import { readableComment } from "../src/lib/commentText.ts";

test("fórmulas em LaTeX viram texto legível, sem delimitadores", () => {
  const out = readableComment("Para calcular:\n\\[\nCMV = EI + C - EF\n\\]\nOnde: EI = R$ 3.000");
  assert.ok(!out.includes("\\["));
  assert.ok(!out.includes("\\]"));
  assert.ok(out.includes("CMV = EI + C - EF"));
  assert.ok(out.includes("R$ 3.000"));
});

test("símbolos e frações comuns são convertidos", () => {
  assert.equal(readableComment("\\(3 \\times 4\\)"), "3 × 4");
  assert.equal(readableComment("\\(\\frac{a}{b}\\)"), "(a)/(b)");
  assert.equal(readableComment("\\text{Total} = 10\\%"), "Total = 10%");
});

test("texto comum passa sem alteração", () => {
  assert.equal(readableComment("Errei por pressa. Revisar a regra."), "Errei por pressa. Revisar a regra.");
});
