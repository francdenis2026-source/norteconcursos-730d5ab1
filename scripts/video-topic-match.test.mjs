import test from "node:test";
import assert from "node:assert/strict";
import { bestTopicMatch, GENERAL_TOPIC } from "../src/lib/videoTopicMatch.ts";

const entries = [
  { topic: GENERAL_TOPIC, title: "Revisão geral de Contabilidade" },
  { topic: "Regime de competência", title: "Regime de competência e caixa" },
  { topic: "Balanço patrimonial", title: "Estrutura do balanço patrimonial: ativo e passivo" },
  { topic: "Estoques", title: "Custo das mercadorias vendidas CMV" },
];

test("assunto do cronograma encontra a aula do mesmo tema", () => {
  const m = bestTopicMatch("Balanço patrimonial: ativo, passivo e patrimônio líquido", entries);
  assert.equal(m.topic, "Balanço patrimonial");
});

test("o título do vídeo também conta", () => {
  const m = bestTopicMatch("Cálculo do custo das mercadorias vendidas (CMV)", entries);
  assert.equal(m.topic, "Estoques");
});

test("sem correspondência real, não escolhe vídeo de outro assunto", () => {
  assert.equal(bestTopicMatch("Princípios da administração pública", entries), null);
});

test("a aula geral nunca é escolhida como correspondência específica", () => {
  assert.notEqual(bestTopicMatch("Revisão geral de Contabilidade", entries)?.topic, GENERAL_TOPIC);
});
