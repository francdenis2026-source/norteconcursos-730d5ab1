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
