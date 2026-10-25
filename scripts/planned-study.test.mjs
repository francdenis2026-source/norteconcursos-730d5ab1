import test from 'node:test';
import assert from 'node:assert/strict';
import {plannedPractice,plannedAvailability} from '../src/lib/plannedStudy.ts';
import {stepLink,buildDaySteps} from '../src/lib/cronogramaDia.ts';
import {materialPracticePool} from '../src/lib/materialPractice.ts';
test('An agenda question activity carries both the subject and its exact topic and requests automatic execution',()=>{
 const target=plannedPractice('Língua Portuguesa','Sintaxe');
 assert.equal(target.subject,'Língua Portuguesa');assert.equal(target.studySubject,target.subject);
 assert.ok(target.materialTopic);assert.equal(target.planned,'1');assert.equal(target.go,'1');assert.equal(target.limit,'20');
 const step={id:'one',kind:'questoes',nome:'Língua Portuguesa',topic:'Sintaxe',minutes:20};
 assert.deepEqual(stepLink(step).search,target);
});
test('Unknown planned topics never silently open unrelated questions',()=>{
 const target=plannedPractice('Direito Digital','Assunto ainda não catalogado');
 assert.equal(target.materialTopic,'Assunto ainda não catalogado');
 assert.deepEqual(materialPracticePool([], {subject:target.studySubject,topic:target.materialTopic}),[]);
 assert.match(plannedAvailability(0),/Nenhum outro assunto/);
 assert.match(plannedAvailability(7),/20.*7/);assert.equal(plannedAvailability(20),'');
});
test('Weekly simulations retain the personal plan subjects instead of opening the unrestricted catalog',()=>{
 const result=stepLink({id:'week',kind:'simulado',nome:'Simulado da semana',subjects:['Direito Penal','Informática'],minutes:60});
 assert.equal(result.search.planned,'1');assert.deepEqual(JSON.parse(result.search.plannedSubjects),['Direito Penal','Informática']);
 const flash=stepLink({id:'cards',kind:'flashcards',nome:'Informática',topic:'Segurança',minutes:10});
 assert.equal(flash.search.subject,'Informática');assert.equal(flash.search.topic,'Segurança');assert.equal(flash.search.planned,'1');
});
