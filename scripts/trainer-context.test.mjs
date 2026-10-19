import test from 'node:test';
import assert from 'node:assert/strict';
import { trainerContext,lockedTrainerSubject,trainerDisciplineCatalog } from '../src/lib/trainerContext.ts';
test('setup shows the selected discipline and topic without inventing a current question',()=>{
 assert.deepEqual(trainerContext(undefined,'Direito Constitucional','Direito Constitucional::Direitos fundamentais'),{discipline:'Direito Constitucional',topic:'Direitos fundamentais',automatic:false});
 assert.equal(trainerContext(undefined,'Língua Portuguesa','all','Concordância verbal').topic,'Concordância verbal');
 assert.equal(trainerContext(undefined,'all','all').topic,'Todos os assuntos');
});
test('current question overrides stale filters and updates subject and topic for each item',()=>{
 const first={subject:'Língua Portuguesa',testedTopic:'Concordância verbal',text:'Enunciado'};
 const second={subject:'Contabilidade Geral',testedTopic:'Balanço patrimonial',text:'Outro enunciado'};
 assert.equal(trainerContext(first,'Direito Penal','Crimes').topic,'Concordância verbal');
 const actual=trainerContext(second,'Língua Portuguesa','Concordância verbal');
 assert.equal(actual.discipline,'Contabilidade Geral');assert.equal(actual.topic,'Balanço patrimonial');assert.equal(actual.automatic,false);
 assert.equal(trainerContext({subject:'Língua Portuguesa',text:'xyz'},'Direito Penal','Crimes').topic,'Assunto não identificado');
});

test('entry discipline is immutable in the candidate pool while the general trainer stays unrestricted',()=>{
 assert.equal(lockedTrainerSubject(undefined),null);assert.equal(lockedTrainerSubject('all'),null);
 assert.equal(lockedTrainerSubject('Noções de Direito Penal'),'Direito Penal');
 const rows=[{subject:'Direito Penal'},{subject:'Língua Portuguesa'},{subject:'Noções de Direito Penal'}];
 assert.deepEqual(trainerDisciplineCatalog(rows,'Direito Penal'),[rows[0],rows[2]]);
 assert.equal(trainerDisciplineCatalog(rows,null),rows);
});
