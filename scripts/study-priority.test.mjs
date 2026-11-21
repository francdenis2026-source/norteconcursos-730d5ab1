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
const { studyPriorityFor } = module.exports;

test("PC-AC topics receive the expected priority and cumulative TOP 20 marker", () => {
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

test("every PC-AC discipline has a safe fallback and other editais are not mislabeled", () => {
  const disciplines = [
    "Contabilidade e Análise Financeira", "Estatística", "TI e Segurança da Informação",
    "Análise de Dados e Informações", "Arquivologia", "Noções de Administração",
    "Língua Portuguesa", "Raciocínio Lógico", "Noções de Informática", "Realidade do Acre",
    "Direito Penal e Processo Penal", "Legislação Institucional", "Direito Constitucional",
    "Direito Administrativo",
  ];
  for (const discipline of disciplines) {
    assert.ok(studyPriorityFor("PC-AC 2026", discipline, "Assunto complementar do edital"));
  }
  assert.ok(studyPriorityFor("PC-AC 2026 — Edital 001 SEAD/PCAC", "Noções de Direito Administrativo", "Princípios da Administração Pública"));
  assert.ok(studyPriorityFor("PC-AC 2026", "Noções de Administração", "Eficiência, eficácia e efetividade"));
  assert.equal(studyPriorityFor("Complementar — fora do Anexo III do PC-AC 2026", "Administração Pública", "Evolução da Administração Pública"), null);
  assert.ok(studyPriorityFor("Polícia Civil do Acre — Oficial Investigador — 2026", "Realidade do Estado do Acre", "Revolução Acreana"));
  assert.equal(studyPriorityFor("Polícia Civil de outro estado", "Língua Portuguesa", "Interpretação textual"), null);
  assert.equal(studyPriorityFor(null, "Língua Portuguesa", "Interpretação textual"), null);
});
