import test from "node:test";
import assert from "node:assert/strict";
import { canOpenTrainerLearning, relatedTrainerMaterials } from "../src/lib/trainerLearning.ts";

const material = (slug, discipline, topic_label, extra = {}) => ({
  slug,
  discipline,
  topic_label,
  title: topic_label,
  sort_order: 1,
  content_status: "active",
  ...extra,
});
const question = (subject, subtopic, legalBasis = []) => ({ subject, subtopic, legalBasis });

test("revisão exige resposta salva da questão atual, inclusive ao trocar de questão", () => {
  const history = new Set(["official:previous"]);
  assert.equal(canOpenTrainerLearning(history.has("official:current"), false, false), false);
  // Selecionar alternativa, clicar na ajuda e falhar no salvamento não criam histórico.
  assert.equal(canOpenTrainerLearning(false, false, false), false);
  assert.equal(canOpenTrainerLearning(true, true, false), false);
  assert.equal(canOpenTrainerLearning(true, false, true), false);
  history.add("official:current");
  assert.equal(canOpenTrainerLearning(history.has("official:current"), false, false), true);
});

test("lei identificada vincula seu material apesar das categorias diferentes", () => {
  const q = question("Legislação Penal Especial", "Associação para o tráfico", [
    { url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm?origem=teste" },
  ]);
  const materials = [
    material("legislacao-organizacoes-revisao", "Legislação Especial", "Organizações criminosas"),
    material("legislacao-drogas-revisao", "Legislação Especial", "Lei de Drogas"),
    material("archived", "Legislação Especial", "Tráfico", {
      law_course_slug: "drogas",
      content_status: "archived",
    }),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(q, materials).map((m) => m.slug),
    ["legislacao-drogas-revisao"],
  );
});

test("prioriza tópico do mesmo código e não sugere outra lei com palavras parecidas", () => {
  const q = question("Direito Penal", "Crimes contra a pessoa", [
    { url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm" },
  ]);
  const materials = [
    material("penal-principios-direito-penal", "Direito Penal", "Princípios", { sort_order: 0 }),
    material("cp-pessoa", "Direito Penal", "Crimes contra a pessoa", {
      law_course_slug: "codigo-penal",
    }),
    material("legislacao-trafico-pessoas-revisao", "Direito Penal", "Crimes contra a pessoa"),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(q, materials).map((m) => m.slug),
    ["cp-pessoa", "penal-principios-direito-penal"],
  );
});

test("português liga crase sem substituir por primeiro material da disciplina", () => {
  const materials = [
    material("verbos", "Língua Portuguesa", "Verbos e conjugação"),
    material("crase", "Língua Portuguesa", "Crase: casos práticos"),
    material("outra", "Direito Penal", "Crase: casos práticos"),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(question("Português", "Crase"), materials).map((m) => m.slug),
    ["crase"],
  );
  assert.deepEqual(relatedTrainerMaterials(question("Português", null), materials), []);
});

test("tópicos genéricos e coincidências parciais não recomendam material alheio", () => {
  assert.deepEqual(
    relatedTrainerMaterials(question("Direito Penal", "Direito Penal"), [
      material("general", "Direito Penal", "Direito Penal"),
    ]),
    [],
  );
  assert.deepEqual(
    relatedTrainerMaterials(question("Contabilidade Geral", "Patrimônio e balanço patrimonial"), [
      material("receitas", "Contabilidade Geral", "Balanço de receitas"),
    ]),
    [],
  );
});

test("Estatística e RLM encontram materiais pelo resumo e por flexões dos termos", () => {
  const stats = [
    material("stats-frequencias", "Estatística", "2. Organização e apresentação de dados", {
      title: "Distribuição de frequências",
      summary: "Frequências absolutas, relativas e acumuladas; tabelas e classes.",
    }),
    material("stats-dispersao", "Estatística", "4. Medidas de dispersão", {
      title: "Medidas de dispersão e coeficiente de variação",
      summary: "Amplitude, variância, desvio-padrão e coeficiente de variação.",
    }),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(question("Estatística", "Frequência relativa"), stats).map((m) => m.slug),
    ["stats-frequencias"],
  );
  assert.deepEqual(
    relatedTrainerMaterials(question("Estatística", "Desvio-padrão"), stats).map((m) => m.slug),
    ["stats-dispersao"],
  );
  const rlm = [
    material("rlm-combinatoria", "Raciocínio Lógico", "11. Análise combinatória", {
      title: "Análise combinatória e probabilidade",
      summary: "Combinação, arranjo, permutação e princípio fundamental da contagem.",
    }),
    material("rlm-proposicoes", "Raciocínio Lógico", "2. Estruturas lógicas", {
      title: "Proposições simples e compostas",
      summary: "Sentenças abertas, proposições e valores lógicos.",
    }),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(question("Raciocínio Lógico", "Combinação simples"), rlm).map((m) => m.slug),
    ["rlm-combinatoria"],
  );
  assert.deepEqual(
    relatedTrainerMaterials(question("Raciocínio Lógico", "Proposições simples e proposições compostas"), rlm).map((m) => m.slug),
    ["rlm-proposicoes"],
  );
});

test("o treinador relaciona subassuntos específicos a aulas que já os explicam", () => {
  const stats = [
    material("stats-media-extremos", "Estatística", "3. Medidas de tendência central", {
      title: "Média aritmética simples e ponderada",
      summary: "Média simples, efeitos de valores extremos e comparação com mediana.",
    }),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(question("Estatística", "média, mediana e outlier"), stats).map((m) => m.slug),
    ["stats-media-extremos"],
  );
  const rlm = [
    material("rlm-negacao", "Raciocínio Lógico", "4. Equivalências lógicas e negação", {
      title: "Equivalências lógicas, negação e leis de De Morgan",
      summary: "Negação de proposições universais e existenciais; quantificadores.",
    }),
    material("rlm-conjuntos", "Raciocínio Lógico", "10. Problemas com conjuntos", {
      title: "Relações e operações com conjuntos",
      summary: "Inclusão-exclusão para dois e três conjuntos; diagramas e relações.",
    }),
    material("rlm-porcentagem", "Raciocínio Lógico", "14. Raciocínio lógico quantitativo", {
      title: "Porcentagem, juros, razão, proporção e regra de três",
      summary: "Aumentos e descontos percentuais, variações sucessivas e regra de três.",
    }),
    material("rlm-sequencias", "Raciocínio Lógico", "7. Sequências e padrões", {
      title: "Sequências numéricas e padrões",
      summary: "Identificação de padrões numéricos e sequências figurais.",
    }),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(question("Raciocínio Lógico", "Negação de proposições universais"), rlm).map((m) => m.slug),
    ["rlm-negacao"],
  );
  assert.deepEqual(
    relatedTrainerMaterials(question("Raciocínio Lógico", "Problemas de conjuntos — três grupos"), rlm).map((m) => m.slug),
    ["rlm-conjuntos"],
  );
  assert.deepEqual(
    relatedTrainerMaterials(question("Raciocínio Lógico", "Problemas de porcentagem com aumento e desconto"), rlm).map((m) => m.slug),
    ["rlm-porcentagem"],
  );
  assert.deepEqual(
    relatedTrainerMaterials(question("Raciocínio Lógico", "Sequência lógica de figuras/padrões numéricos"), rlm).map((m) => m.slug),
    ["rlm-sequencias"],
  );
});

test("questões de matemática financeira PC-AC abrem a aula correta", () => {
  const finance = [
    material("pcac-finance", "Contabilidade Geral e Análise Financeira", "5. Matemática financeira", {
      title: "Matemática financeira: juros, descontos e percentuais",
      summary: "Juros simples e compostos, taxas proporcionais, equivalentes, nominais e efetivas, descontos comerciais e racionais e atualização de valores.",
    }),
  ];
  for (const topic of ["Juros compostos", "Taxas nominais e efetivas", "Desconto comercial simples"]) {
    assert.deepEqual(
      relatedTrainerMaterials(question("Contabilidade Geral e Análise Financeira", topic), finance).map((m) => m.slug),
      ["pcac-finance"],
    );
  }
});
