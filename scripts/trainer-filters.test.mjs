import test from "node:test";
import assert from "node:assert/strict";
import { filterTrainerQuestions, trainerBoard, trainerCollectionQuestions, isEnemContest, trainerPracticeQuestions, trainerFilterFacets, syllabusQuestions } from "../src/lib/trainerFilters.ts";
import { isMissingQuestionTable } from "../src/lib/catalog.ts";

const all = Object.fromEntries(
  [
    "area",
    "topic",
    "contest",
    "board",
    "career",
    "year",
    "appliedExam",
    "subject",
    "source",
    "reviewed",
    "difficulty",
    "state",
    "category",
  ].map((key) => [key, "all"]),
);
const q = (id, board, source = "official") => ({
  id,
  board,
  source,
  contest: "Concurso",
  career: "Agente",
  year: "2025",
  subject: "Língua Portuguesa",
  difficulty: "média",
  state: "AC",
  category: "Segurança",
  text: "Uma pergunta",
  explanation: "Explicação pedagógica detalhada.",
});
const rows = [
  q("cespe", "CESPE/CEBRASPE"),
  q("fgv", "FGV"),
  q("ibfc", "IBFC"),
  q("fgv-curated", "Fgv", "curated"),
  q("ibade", "IBADE", "curated"),
];
const run = (filters) => filterTrainerQuestions(rows, { ...all, ...filters }, new Map());

test("FGV includes its eligible sources and never Cebraspe", () => {
  assert.deepEqual(
    run({ board: "fgv" }).map((q) => q.id),
    ["fgv", "fgv-curated"],
  );
});
test("IBFC and IBADE remain separate boards", () => {
  assert.deepEqual(
    run({ board: "IBFC" }).map((q) => q.id),
    ["ibfc"],
  );
  assert.deepEqual(
    run({ board: "IBADE" }).map((q) => q.id),
    ["ibade"],
  );
});
test("Cebraspe aliases from old booklets match the same board", () => {
  assert.equal(trainerBoard(" cespe / PF / 2009 "), "CEBRASPE");
  assert.deepEqual(
    run({ board: "Cebraspe" }).map((q) => q.id),
    ["cespe"],
  );
});
test("incompatible board and discipline produce zero, without cross-board fallback", () => {
  assert.deepEqual(run({ board: "FGV", subject: "Informática" }), []);
  assert.deepEqual(run({ board: "VUNESP" }), []);
});
test("switching selections does not reuse the previous board's results", () => {
  assert.equal(run({ board: "CEBRASPE" })[0].id, "cespe");
  assert.equal(run({ board: "IBFC" })[0].id, "ibfc");
  assert.equal(run({ board: "all" }).length, rows.length);
  assert.deepEqual(
    run({ board: "FGV", source: "curated" }).map((q) => q.id),
    ["fgv-curated"],
  );
});
test("only absent optional tables may be omitted; permissions and network errors surface", () => {
  assert.equal(isMissingQuestionTable({ code: "42P01" }), true);
  assert.equal(isMissingQuestionTable({ code: "PGRST205" }), true);
  for (const e of [{ code: "42501" }, { code: "PGRST301" }, new Error("Network failure"), null])
    assert.equal(isMissingQuestionTable(e), false);
});

test("ENEM and public contest collections cannot mix shared disciplines", () => {
  const catalog = [
    {...q("enem", "INEP"), contest: "ENEM"},
    {...q("enem-full", "INEP"), contest: "Exame Nacional do Ensino Médio"},
    {...q("pf", "CEBRASPE"), contest: "Polícia Federal"},
  ];
  assert.deepEqual(trainerCollectionQuestions(catalog, "enem").map(q => q.id), ["enem", "enem-full"]);
  assert.deepEqual(trainerCollectionQuestions(catalog, "contests").map(q => q.id), ["pf"]);
  assert.equal(isEnemContest("ENEM 2024"), true);
  assert.equal(isEnemContest("Polícia Civil"), false);
});

test("practice facets only include the selected student's unanswered, answered or unresolved errors", () => {
 const catalog=[{...q("same","INEP"),contest:"ENEM"},q("same","CEBRASPE","curated"),q("right","FGV"),q("recovered","FCC"),q("new","VUNESP")];
 const answers=new Map([["official:same",{isCorrect:false}],["official:right",{isCorrect:true}],["official:recovered",{isCorrect:false}]]);
 const recovery=new Map([["official:recovered",{lastCorrect:true}]]);
 const wrong=trainerPracticeQuestions(catalog,"wrong",answers,recovery);
 assert.deepEqual(wrong.map(q=>q.board),["INEP"]);
 assert.deepEqual([...trainerFilterFacets(wrong,all,new Map()).counts.board.keys()],["INEP"]);
 assert.deepEqual(trainerPracticeQuestions(catalog,"all",answers,recovery).map(q=>q.board),["INEP","FGV","FCC"]);
 assert.deepEqual(trainerPracticeQuestions(catalog,"new",answers,recovery).map(q=>q.board),["CEBRASPE","VUNESP"]);
 assert.equal(trainerPracticeQuestions(catalog,"all",new Map(),new Map()).length,0);
});

test("syllabus practice targets the exact topic and never broadens to the whole discipline", () => {
 const catalog=[{...q("one","CEBRASPE"),syllabusTopicId:"topic-a"},{...q("two","CEBRASPE"),syllabusTopicId:"topic-b"},{...q("historic","FGV"),syllabusTopicId:"topic-a"}];
 assert.deepEqual(syllabusQuestions(catalog,"topic-a").map(q=>q.id),["one","historic"]);
 assert.deepEqual(syllabusQuestions(catalog,"missing"),[]);
 assert.equal(syllabusQuestions(catalog),catalog);
});

const { availableQuestionBank, questionBankSearch, questionBankExams, searchQuestionCatalog } = await import('../src/lib/questionBank.ts');
const { trainerSessionSize, catalogSessionQuestions } = await import('../src/lib/trainerSession.ts');
const { examKey } = await import('../src/lib/questionFormat.ts');
const bankItem=(id,extra={})=>({...q(id,'FGV'),contest:'Polícia Civil do Acre',year:'2025',career:'Agente',subject:'Matemática',text:'Resolva: quanto é dois mais dois?',...extra});
const bankItems=[...Array.from({length:62},(_,i)=>bankItem(`a${i}`)),bankItem('ano',{year:'2024'}),bankItem('banca',{board:'CEBRASPE'}),bankItem('cargo',{career:'Delegado'}),bankItem('concurso',{contest:'Polícia Civil do Amazonas'}),bankItem('autoral',{source:'curated'}),bankItem('pessoal',{source:'personal',board:'Meu caderno',career:'Meu caderno'}),bankItem('enem',{contest:'ENEM',board:'INEP',career:'Estudante'}),bankItem('portugues',{subject:'Língua Portuguesa',text:'Assinale a alternativa em que a palavra está grafada corretamente.'}),bankItem('sem-texto',{subject:'Língua Portuguesa',text:'De acordo com o texto, julgue a afirmação.'})];
const openBank=(selection,collection='contests',source='all',query='')=>{
 const search=questionBankSearch(collection,source,query,selection);
 const catalog=searchQuestionCatalog(availableQuestionBank(bankItems,collection),search.catalogQuery??'');
 const filters={...all,...Object.fromEntries(Object.entries(search).filter(([key,value])=>key in all && value!==undefined))};
 return {search,questions:filterTrainerQuestions(trainerPracticeQuestions(catalog,'catalog',new Map(),new Map()),filters,new Map())};
};
test('bank discipline link scopes the subject, not the broad syllabus area, and includes answered items',()=>{
 const {search,questions}=openBank({subject:'Matemática'});
 assert.equal(search.subject,'Matemática');assert.equal(search.area,undefined);assert.equal(search.mode,'catalog');assert.equal(search.limit,'all');
 assert.equal(questions.length,availableQuestionBank(bankItems,'contests').filter(q=>q.subject==='Matemática').length);
 assert.ok(questions.every(q=>q.subject==='Matemática'));
 const answered=new Map([['official:a0',{isCorrect:false}]]);
 assert.equal(trainerPracticeQuestions(questions,'catalog',answered,new Map()).length,questions.length);
 assert.equal(trainerPracticeQuestions(questions,'new',answered,new Map()).length,questions.length-1);
});
test('bank board and year destinations retain exactly their announced counts',()=>{
 for(const selection of [{board:'FGV'},{year:'2024'}]){
  const [field,value]=Object.entries(selection)[0];
  const expected=availableQuestionBank(bankItems,'contests').filter(q=>q[field]===value);
  assert.deepEqual(openBank(selection).questions.map(q=>q.id),expected.map(q=>q.id));
 }
});
test('bank paper link keeps contest, year, board and job and excludes authored copies with matching metadata',()=>{
 const exam=bankItems[0];const opened=openBank({exam});
 const group=questionBankExams(availableQuestionBank(bankItems,'contests')).find(g=>g.key===examKey(exam));
 assert.equal(opened.search.appliedExam,group.key);assert.equal(opened.search.source,'official');
 assert.equal(opened.questions.length,63);assert.equal(opened.questions.length,group.count);
 assert.ok(opened.questions.every(q=>q.source==='official'&&examKey(q)===examKey(exam)));
});
test('bank passes source and metadata search to the trainer without inflating counts',()=>{
 const opened=openBank({board:'FGV'},'contests','curated','acre');
 assert.equal(opened.search.source,'curated');assert.equal(opened.search.catalogQuery,'acre');assert.deepEqual(opened.questions.map(q=>q.id),['autoral']);
 const port=openBank({subject:'Língua Portuguesa'},'contests','all','portugues');
 assert.deepEqual(port.questions.map(q=>q.id),['portugues']);
});
test('bank ENEM selection and counts stay separate from contests and unsupported text is excluded',()=>{
 assert.ok(!availableQuestionBank(bankItems,'contests').some(q=>q.id==='sem-texto'||q.id==='enem'));
 const opened=openBank({subject:'Matemática'},'enem');
 assert.equal(opened.search.contest,'ENEM');assert.deepEqual(opened.questions.map(q=>q.id),['enem']);
 assert.deepEqual(questionBankExams(bankItems.filter(q=>q.source!=='official')),[]);
});
test('all questions really includes more than fifty while remaining within the first-answer allowance',()=>{
 assert.equal(trainerSessionSize(123,'all'),123);assert.equal(trainerSessionSize(123,'all',7),7);
 assert.equal(trainerSessionSize(NaN,'all'),0);assert.equal(trainerSessionSize(12,'all',0),0);
});
test('mixed catalog session limits new answers without consuming review quota or conflating sources',()=>{
 const questions=[bankItem('new1'),bankItem('done'),bankItem('new2'),bankItem('done',{source:'curated'})];
 const answered=new Map([['official:done',{isCorrect:true}]]);
 assert.deepEqual(catalogSessionQuestions(questions,answered,1).map(q=>`${q.source}:${q.id}`),['official:new1','official:done']);
 assert.deepEqual(catalogSessionQuestions(questions,answered,0).map(q=>`${q.source}:${q.id}`),['official:done']);
 assert.equal(catalogSessionQuestions(questions,answered).length,questions.length);
});

test('refining a selected official paper by subject cannot bring in authored practice',()=>{
 const exam=bankItems[0];
 const questions=filterTrainerQuestions(availableQuestionBank(bankItems,'contests'),{...all,appliedExam:examKey(exam),subject:'Matemática'},new Map());
 assert.equal(questions.length,62);assert.ok(questions.every(q=>q.source==='official'));
 const facets=trainerFilterFacets(availableQuestionBank(bankItems,'contests'),{...all,source:'curated'},new Map());
 assert.equal(facets.counts.exam.size,0);
});

test('two official papers with the same grouped contest, job, board and year remain distinct',()=>{
 const original=bankItem('paper-one');
 const another=bankItem('paper-two',{contest:'Polícia Civil do Acre — Caderno Azul'});
 const search=questionBankSearch('contests','all','',{exam:original});
 const filters={...all,...Object.fromEntries(Object.entries(search).filter(([key,value])=>key in all && value!==undefined))};
 assert.equal(filterTrainerQuestions([original,another],{...filters,appliedExam:'all'},new Map()).length,2);
 assert.deepEqual(filterTrainerQuestions([original,another],filters,new Map()).map(q=>q.id),['paper-one']);
});

test('historical material and study repertoire cannot be labeled as an applied official paper',()=>{
 const study=[bankItem('apostila',{contest:'Apostilas Opção OP-100AG-21 repertório'}),bankItem('historico',{contest:'Polícia Federal — material de estudo histórico'})];
 assert.equal(availableQuestionBank(study,'contests').length,2);
 assert.deepEqual(questionBankExams(study),[]);
 assert.equal(trainerFilterFacets(study,all,new Map()).counts.exam.size,0);
 assert.deepEqual(filterTrainerQuestions(study,{...all,appliedExam:examKey(study[0])},new Map()),[]);
});

test("filtro Atual: 'recent' pega qualquer etiqueta, uma etiqueta pega só ela, e a contagem não duplica questões", () => {
  const tagged = [
    { ...q("a", "FGV"), currencyTags: ["IA e tecnologia", "Prova recente"] },
    { ...q("b", "FGV"), currencyTags: ["Lei recente"] },
    q("c", "FGV"),
    { ...q("d", "FGV"), currencyTags: ["Prova recente"] },
  ];
  const ids = (currency) => filterTrainerQuestions(tagged, { ...all, currency }, new Map()).map((r) => r.id);
  assert.deepEqual(ids("all"), ["a", "b", "c", "d"]);
  assert.deepEqual(ids("recent"), ["a", "b"]); // só prova recente não conta como conteúdo novo
  assert.deepEqual(ids("Prova recente"), ["a", "d"]);
  assert.deepEqual(ids("IA e tecnologia"), ["a"]);
  assert.deepEqual(ids("Reforma tributária"), []);
  // sem o campo (quem monta filtros sem ele) nada muda
  assert.equal(filterTrainerQuestions(tagged, all, new Map()).length, 4);
  const facets = trainerFilterFacets(tagged, { ...all, currency: "all" }, new Map());
  assert.equal(facets.counts.currency.get("recent"), 2);
  assert.equal(facets.counts.currency.get("Prova recente"), 2);
  assert.equal(facets.totals.currency, 4);
});

test('topics and content facets follow discipline without trapping the general discipline chooser',()=>{
 const catalog=[q('pt','FGV'),{...q('math','IBFC'),subject:'Matemática'}];
 const topics=new Map([['pt','Crase'],['math','Porcentagem']]);
 const filters={...all,subject:'Língua Portuguesa',topic:'Língua Portuguesa::Crase'};
 const facets=trainerFilterFacets(catalog,filters,topics);
 assert.equal(facets.counts.subject.size,2);
 assert.deepEqual([...facets.counts.topic.keys()],['Língua Portuguesa::Crase']);
 assert.deepEqual([...facets.counts.board.keys()],['FGV']);
 assert.deepEqual(filterTrainerQuestions(catalog,filters,topics).map(q=>q.id),['pt']);
 assert.deepEqual(filterTrainerQuestions(catalog,{...filters,subject:'Matemática'},topics),[]);
});

test('origin and job facets stay distinct and unattributed jobs do not remove questions',()=>{
 const catalog=[{...q('job','FGV'),contest:'Polícia Federal',career:'Agente de Polícia Federal'},
 {...q('org','FGV'),contest:'Polícia Federal',career:'Polícia Federal'},
 {...q('material','FGV'),contest:'Repertório — Apostilas Opção',career:'Diversos'}];
 const facets=trainerFilterFacets(catalog,all,new Map());
 assert.equal(facets.counts.contest.size,2);
 assert.deepEqual([...facets.counts.career.keys()],['Agente de Polícia Federal']);
 assert.equal(filterTrainerQuestions(catalog,all,new Map()).length,3);
 assert.deepEqual(filterTrainerQuestions(catalog,{...all,career:'Agente de Polícia Federal'},new Map()).map(q=>q.id),['job']);
});
