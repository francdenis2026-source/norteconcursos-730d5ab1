import test from 'node:test';
import assert from 'node:assert/strict';
import { examCoverage, sessionExamCoverage } from '../src/lib/examCoverage.ts';
const paper = { contest: 'Polícia Civil do Estado do Paraná', career: 'Papiloscopista Policial', year: 2026 };
test('partial papers distinguish eligible availability from the original size', () => {
 assert.equal(examCoverage(paper,36),'36 questões disponíveis de 100 itens da prova original. Acervo parcial.');
 assert.equal(examCoverage(paper,0),'0 questões disponíveis de 100 itens da prova original. Acervo parcial.');
 assert.equal(examCoverage(paper,100),'100 questões disponíveis de 100 itens da prova original.');
});
test('no original size is invented for another year, role or exam', () => {
 for (const fields of [{ year:2025 },{ career:'Investigador' },{ contest:'Polícia Federal' }]) assert.equal(examCoverage({...paper,...fields},36),null);
});

test('selected subject blocks are not misrepresented as incomplete full papers', () => {
 assert.equal(examCoverage(paper,10,true),'10 questões nesta seleção; a prova original tem 100 itens.');
 assert.match(examCoverage({...paper,career:'Agente de Polícia Civil'},36),/^36 questões/);
 assert.equal(examCoverage({...paper,career:'all'},136),null);
});

test('resumed and mixed sessions report only their actual question scope', () => {
 assert.equal(sessionExamCoverage(Array.from({length:7},()=>paper)), '7 questões nesta seleção; a prova original tem 100 itens.');
 assert.equal(sessionExamCoverage([paper,{...paper,career:'Agente de Polícia Judiciária'}]),null);
 assert.equal(sessionExamCoverage([]),null);
});

import { examAvailableCounts } from '../src/lib/examAvailability.ts';
import { PCPI_EXAM, pcpiTrainerSearch } from '../src/lib/pcpiExam.ts';
import { matchesQuestionContest, matchesQuestionCareer } from '../src/lib/questionFilterIdentity.ts';
test('Piauí availability and direct links keep roles, years, sources and original paper identity separate', () => {
 const row=(career,n,extra={})=>({id:career+n,source:'official',contest:`Polícia Civil do Piauí – ${career}`,career,year:'2026',board:'FGV',subject:'Ciências Forenses',text:'Item autossuficiente de teste.',itemNumber:n,...extra});
 const catalog=[row(PCPI_EXAM.roles[0],1),row(PCPI_EXAM.roles[1],1),row(PCPI_EXAM.roles[1],2),row(PCPI_EXAM.roles[1],2),row(PCPI_EXAM.roles[1],3,{source:'curated'}),row(PCPI_EXAM.roles[1],4,{year:'2025'}),row(PCPI_EXAM.roles[1],5,{contest:'Polícia Civil do Paraná'})];
 assert.deepEqual(examAvailableCounts(catalog,PCPI_EXAM),[1,2]);
 for (const role of PCPI_EXAM.roles) {
  const search=pcpiTrainerSearch(role);
  const matched=catalog.filter(q=>q.source==='official'&&q.year===search.year&&matchesQuestionContest(q.contest,search.contest)&&matchesQuestionCareer(q.career,q.contest,q.year,search.career,search.contest,search.year));
  assert.ok(matched.length);assert.ok(matched.every(q=>q.career===role&&q.contest===search.contest));
  assert.equal(search.go,'1');assert.equal(search.mode,'catalog');assert.equal(search.limit,'all');assert.equal(search.board,'FGV');
 }
});

test('shared availability preserves the Paraná role counts while excluding Piauí', () => {
 const exam={contest:paper.contest,year:'2026',board:'FGV',roles:['Delegado de Polícia','Agente de Polícia Judiciária','Papiloscopista Policial']};
 const q={...paper,year:'2026',id:'pr-one',itemNumber:1,source:'official',board:'FGV',subject:'Ciências Forenses',text:'Questão autossuficiente.'};
 assert.deepEqual(examAvailableCounts([q,{...q,id:'pi-one',contest:PCPI_EXAM.contest}],exam),[0,0,1]);
});
