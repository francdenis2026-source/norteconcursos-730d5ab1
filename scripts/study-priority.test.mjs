import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";

const module = { exports: {} };
const source = readFileSync("src/lib/studyPriority.ts", "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const norm = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
vm.runInNewContext(code, {
  module,
  exports: module.exports,
  require: (name) => {
    if (name === "@/lib/editalRadar") return { norm };
    throw new Error(`Unexpected dependency: ${name}`);
  },
});
const { studyPriorityFor, studyDisciplineMetaFor } = module.exports;

test("PC-AC topics receive expected priority and cumulative TOP 20 marker", () => {
  assert.deepEqual(
    JSON.parse(JSON.stringify(studyPriorityFor("PC-AC 2026", "Contabilidade e Análise Financeira", "Ativo, passivo e patrimônio líquido"))),
    { level: "muito-alta", top20: true },
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(studyPriorityFor("Polícia Civil do Acre", "Estatística", "Média aritmética, mediana e moda"))),
    { level: "muito-alta", top20: true },
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(studyPriorityFor("PC-AC 2026", "Direito Penal e Processo Penal", "Inquérito policial"))),
    { level: "muito-alta", top20: true },
  );
});

test("each PC-AC discipline maps known high-incidence topics and leaves unknown titles unclassified", () => {
  const examples = [
    ["Contabilidade Geral", "Ativo, passivo e patrimônio líquido"],
    ["Estatística", "Média aritmética, mediana e moda"],
    ["Tecnologia da Informação e Segurança da Informação", "Segurança da informação"],
    ["Análise de Dados e Informações", "Cruzamento de informações"],
    ["Arquivologia", "Gestão documental e três idades"],
    ["Noções de Administração", "Eficiência, eficácia e efetividade"],
    ["Língua Portuguesa", "Interpretação textual e sintaxe"],
    ["Raciocínio Lógico", "Proposições e tabelas-verdade"],
    ["Noções de Informática", "Excel e fórmulas"],
    ["Realidade do Estado do Acre", "Revolução Acreana"],
    ["Noções de Direito Penal e Processual Penal", "Teoria do crime e tipicidade"],
    ["Legislação Institucional", "Lei Orgânica Nacional"],
    ["Noções de Direito Constitucional", "Princípios fundamentais"],
    ["Noções de Direito Administrativo", "Poder de polícia"],
  ];
  for (const [discipline, topic] of examples) {
    assert.ok(studyPriorityFor("PC-AC 2026", discipline, topic), `Expected mapped topic: ${discipline} / ${topic}`);
  }
  assert.ok(studyPriorityFor("PC-AC 2026 — Edital 001 SEAD/PCAC", "Noções de Direito Administrativo", "Princípios da Administração Pública"));
  assert.ok(studyPriorityFor("Polícia Civil do Acre — Oficial Investigador — 2026", "Realidade do Estado do Acre", "Revolução Acreana"));
  assert.deepEqual(JSON.parse(JSON.stringify(studyPriorityFor("PC-AC 2026", "Estatística", "Distribuições e indicadores complementares"))), { level: "media", top20: false });
  assert.equal(studyPriorityFor("PC-AC 2026", "Estatística", "Objetivos"), null);
  assert.equal(studyPriorityFor("Complementar — fora do Anexo III do PC-AC 2026", "Administração Pública", "Evolução da Administração Pública"), null);
  assert.equal(studyPriorityFor("Polícia Civil de outro estado", "Língua Portuguesa", "Interpretação textual"), null);
  assert.equal(studyPriorityFor(null, "Língua Portuguesa", "Interpretação textual"), null);
  assert.deepEqual(JSON.parse(JSON.stringify(studyDisciplineMetaFor("PC-AC 2026", "Contabilidade Geral e Análise Financeira"))), {
    block: "Conhecimentos Específicos", blockQuestions: 60, blockWeight: 2, blockPoints: 120,
    questions: null, weight: 2, points: null, timePercent: 14,
  });
  assert.deepEqual(JSON.parse(JSON.stringify(studyDisciplineMetaFor("PC-AC 2026", "Língua Portuguesa"))), {
    block: "Conhecimentos Básicos", blockQuestions: 24, blockWeight: 1, blockPoints: 24,
    questions: 6, weight: 1, points: 6, timePercent: 10,
  });
  assert.equal(studyDisciplineMetaFor("Outro edital", "Língua Portuguesa"), null);
  assert.equal(studyPriorityFor("PC-AC 2026", "Análise de Dados e Informações", "Aplicação prática: cruzar bases"), null);
  assert.deepEqual(JSON.parse(JSON.stringify(studyPriorityFor("PC-AC 2026", "Análise de Dados e Informações", "Correlação e causalidade"))), { level: "alta", top20: false });
  assert.deepEqual(JSON.parse(JSON.stringify(studyPriorityFor("PC-AC 2026", "Arquivologia", "Protocolo e tramitação"))), { level: "alta", top20: false });
});
