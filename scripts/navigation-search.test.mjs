import test from 'node:test';
import assert from 'node:assert/strict';
import { searchNavigation, recentNavigation } from '../src/lib/navigationSearch.ts';
import { navigationKey } from '../src/lib/dashboardNavigation.ts';
const items = [
 {label:'Simulador de provas',group:'Provas',href:'/dashboard/mock-exams'},
 {label:'Legislação e súmulas',group:'Material didático',href:'/dashboard/library',search:{collection:'laws'}},
 {label:'Caderno de erros',group:'Questões',href:'/dashboard/errors'},
 {label:'Videoaulas e podcasts',group:'Material didático',href:'/dashboard/media'},
];
test('search handles accents, plurals and the terms students use',()=>{
 for(const [query,href] of [['simulados','/dashboard/mock-exams'],['lei seca','/dashboard/library'],['LEGISLACAO SUMULAS','/dashboard/library'],['revisar erros','/dashboard/errors'],['videos aulas','/dashboard/media']])assert.equal(searchNavigation(items,query)[0]?.href,href,query);
});
test('category and all query terms must match; an empty result is real',()=>{
 assert.equal(searchNavigation(items,'simulado','Questões').length,0);
 assert.equal(searchNavigation(items,'','Provas').length,1);
 assert.equal(searchNavigation(items,'simulado inexistente').length,0);
});
test('search preserves destination identity and query parameters',()=>{
 assert.equal(searchNavigation(items,'lei seca')[0],items[1]);
 assert.deepEqual(searchNavigation(items,'lei seca')[0].search,{collection:'laws'});
});
test('recent destinations are limited to the current authorized menu',()=>{
 const unauthorized=navigationKey({href:'/dashboard/admin-finance'});
 assert.deepEqual(recentNavigation(items,[unauthorized,navigationKey(items[2]),navigationKey(items[2]),'/removed']),[items[2]]);
 assert.deepEqual(recentNavigation([{...items[2],soon:true}],[navigationKey(items[2])]),[]);
});

test('previous menu names still find renamed destinations',()=>{
 const renamed=[
  {label:'Configuração do estudo',group:'Planejamento',href:'/dashboard/study-coach'},
  {label:'Ajustes pelos resultados',group:'Planejamento',href:'/dashboard/study-plan'},
  {label:'Leis especiais',group:'Material didático',href:'/dashboard/leis'},
  {label:'Coleções de questões',group:'Questões',href:'/dashboard/notebooks'},
  {label:'Provas realizadas e diagnóstico',group:'Provas',href:'/dashboard/student-exams'},
 ];
 for(const [query,href] of [['estratégia de estudos','/dashboard/study-coach'],['plano por resultados','/dashboard/study-plan'],['leis extravagantes','/dashboard/leis'],['meus cadernos','/dashboard/notebooks'],['minhas provas e diagnóstico','/dashboard/student-exams']]) assert.equal(searchNavigation(renamed,query)[0]?.href,href,query);
 assert.ok(searchNavigation(renamed,'meu planejamento').length>=1);
});
