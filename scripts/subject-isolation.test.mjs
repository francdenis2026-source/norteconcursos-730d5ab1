import { test } from "node:test";
import assert from "node:assert/strict";
import { subjectWithinArea } from "../src/lib/questionTopics.ts";
import { rankMaterials, topicVideosFor, mentionsTopic } from "../src/lib/arsenalRanking.ts";
import { topicsFor } from "../src/data/studyTopics.ts";

test("a matéria escolhida só recebe o que é inteiramente dela", () => {
  // Estatística e Matemática/RLM são disciplinas separadas: uma matéria composta que mistura as duas
  // não pertence inteiramente a nenhuma delas, e nenhuma recebe o conteúdo da outra.
  assert.equal(subjectWithinArea("Raciocínio Lógico", "Estatística e Raciocínio Lógico"), false);
  assert.equal(subjectWithinArea("Estatística", "Estatística e Raciocínio Lógico"), false);
  assert.equal(subjectWithinArea("Raciocínio Lógico", "Estatística"), false);
  assert.equal(subjectWithinArea("Estatística", "Raciocínio Lógico"), false);
  assert.equal(subjectWithinArea("Estatística", "Estatística e Probabilidade"), true);
  assert.equal(subjectWithinArea("Raciocínio Lógico", "Matemática Financeira"), true);
  assert.equal(subjectWithinArea("Direito Penal", "Direito Processual Penal"), false);
  assert.equal(subjectWithinArea("Direito Penal", "Direito Penal e Processual Penal"), false);
  assert.equal(subjectWithinArea("Direitos Humanos", "Ética e Direitos Humanos"), false);
  assert.equal(subjectWithinArea("Direito Constitucional", "Direito Administrativo"), false);
});

test("uma escolha composta recebe cada parte, e variações de grafia continuam valendo", () => {
  assert.equal(subjectWithinArea("Estatística e Raciocínio Lógico", "Estatística"), true);
  assert.equal(subjectWithinArea("Direito Penal e Processual Penal", "Direito Penal"), true);
  assert.equal(subjectWithinArea("Direito Penal e Processual Penal", "Direito Processual Penal"), true);
  assert.equal(subjectWithinArea("Direito Penal", "direito penal"), true);
  assert.equal(subjectWithinArea("Raciocínio Lógico", "Raciocínio Lógico-Matemático"), true);
});

const mat = (slug, discipline, topic_label, sort_order = 1) => ({ slug, discipline, topic_label, title: topic_label, summary: "", sort_order });
const library = [
  mat("pen-vida", "Direito Penal", "Crimes contra a pessoa"),
  mat("pen-patr", "Direito Penal", "Crimes contra o patrimônio", 2),
  mat("proc-inq", "Direito Processual Penal", "Inquérito policial"),
  mat("comp-pessoa", "Direito Penal e Processual Penal", "Crimes contra a pessoa e inquérito", 3),
  mat("comp-outro", "Direito Penal e Processual Penal", "Prisões e medidas cautelares", 4),
];

test("materiais: nada de outra matéria aparece, e a composta só entra se tratar do assunto", () => {
  const slugs = rankMaterials(library, "Direito Penal", "Crimes contra a pessoa").map((r) => r.m.slug);
  assert.ok(slugs.includes("pen-vida"));
  assert.ok(slugs.includes("comp-pessoa"), "composta que trata do assunto");
  assert.ok(!slugs.includes("proc-inq"), "processual é outra matéria");
  assert.ok(!slugs.includes("comp-outro"), "composta de outro assunto não entra");
});

test("materiais: matéria composta escolhida recebe as duas partes", () => {
  const slugs = rankMaterials(library, "Direito Penal e Processual Penal", "Inquérito policial").map((r) => r.m.slug);
  for (const s of ["pen-vida", "proc-inq", "comp-pessoa", "comp-outro"]) assert.ok(slugs.includes(s), s);
});

test("videoaulas gerais vêm só da própria matéria; as do assunto também de matéria composta que o inclui", () => {
  const v = (id) => ({ id, title: id });
  const source = {
    "Direito Penal": { "*": [v("pen-geral")], "Crimes contra a pessoa": [v("pen-assunto")] },
    "Direito Processual Penal": { "*": [v("proc-geral")] },
    "Direito Penal e Processual Penal": { "*": [v("comp-geral")], "Crimes contra a pessoa": [v("comp-assunto")] },
  };
  const r = topicVideosFor("Direito Penal", "Crimes contra a pessoa", source);
  assert.deepEqual(r.general.map((x) => x.id), ["pen-geral"]);
  assert.deepEqual(r.exact.map((x) => x.id).sort(), ["comp-assunto", "pen-assunto"]);
});

test("podcast só aparece quando trata do assunto escolhido", () => {
  assert.equal(mentionsTopic("Concordância verbal e nominal", "Concordância verbal na prática"), true);
  assert.equal(mentionsTopic("Concordância verbal e nominal", "Teoria do crime e dolo"), false);
});

test("matérias compostas não caem mais na lista genérica", () => {
  const generic = "Conceitos fundamentais";
  assert.ok(!topicsFor("Medicina Legal e Criminalística").includes(generic));
  assert.ok(topicsFor("Medicina Legal e Criminalística").includes("Tanatologia"));
  assert.ok(!topicsFor("Informática e Tecnologia").includes(generic));
  assert.ok(!topicsFor("Geopolítica e Língua Estrangeira").includes(generic));
});

test("cada matéria simples lista só os assuntos da sua própria área", () => {
  assert.ok(!topicsFor("Direito Penal").some((t) => /inquérito|prisão em flagrante/i.test(t)));
  assert.ok(!topicsFor("Direito Processual Penal").some((t) => /teoria do crime|culpabilidade/i.test(t)));
  assert.ok(!topicsFor("Língua Portuguesa").some((t) => /porcentagem|probabilidade/i.test(t)));
  assert.ok(!topicsFor("Direito Constitucional").some((t) => /licitações|atos administrativos/i.test(t)));
});

test("Estatística e Matemática/RLM não trocam materiais nem assuntos", () => {
  const stat = { slug: "est-pos", discipline: "Estatística", topic_label: "Medidas de posição", title: "Medidas de posição", summary: "", sort_order: 1 };
  const rlm = { slug: "rlm-tab", discipline: "Raciocínio Lógico", topic_label: "Tabela-verdade", title: "Tabela-verdade", summary: "", sort_order: 1 };
  assert.deepEqual(rankMaterials([stat, rlm], "Raciocínio Lógico", "Tabela-verdade").map((r) => r.m.slug), ["rlm-tab"]);
  assert.deepEqual(rankMaterials([stat, rlm], "Estatística", "Medidas de posição").map((r) => r.m.slug), ["est-pos"]);
  assert.ok(!topicsFor("Estatística").includes("Tabela-verdade e equivalências"));
  assert.ok(!topicsFor("Raciocínio Lógico").includes("Medidas de posição"));
});
