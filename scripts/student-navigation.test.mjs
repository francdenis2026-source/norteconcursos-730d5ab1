import test from 'node:test';
import assert from 'node:assert/strict';
import {studentSections} from '../src/lib/studentNavigation.ts';
const items=[
 {group:'Planejamento',href:'/dashboard'},
 {group:'Planejamento',href:'/dashboard/cronograma'},
 {group:'Planejamento',href:'/dashboard/study-coach'},
 {group:'Material didático',href:'/dashboard/library',search:{collection:'laws'}},
 {group:'Material didático',href:'/dashboard/material'},
 {group:'Provas',href:'/dashboard/student-exams'},
 {group:'Provas',href:'/dashboard/mock-exams'},
];
test('section clicks open the actual workspace entry instead of the first arbitrary child',()=>{
 assert.deepEqual(studentSections(items).map(s=>s.entry.href),['/dashboard/study-coach','/dashboard/material','/dashboard/mock-exams']);
});
test('every available secondary destination is retained with its exact query parameters',()=>{
 const sections=studentSections(items);
 assert.equal(sections.flatMap(s=>s.entries).length,items.length-1);
 assert.equal(sections[1].entries[0],items[3]);
 assert.deepEqual(sections[1].entries[0].search,{collection:'laws'});
});
test('unavailable and administrator routes never become student destinations',()=>{
 const sections=studentSections([...items,{group:'Administração',href:'/dashboard/admin',adminOnly:true},{group:'Questões',href:'/dashboard/ai-solver',soon:true}]);
 assert.equal(sections.length,3);
});
test('an absent landing route falls back to an authorized destination',()=>{
 const only=[{group:'Questões',href:'/dashboard/errors'}];
 assert.equal(studentSections(only)[0].entry,only[0]);
});

test('Central de Estudos opens its own workspace and keeps Redação as a secondary destination',()=>{
 const central=[
  {group:'Central de Estudos',href:'/dashboard/study-tools',label:'Central de Estudos'},
  {group:'Central de Estudos',href:'/dashboard/essays',label:'Redação para concursos'},
 ];
 const section=studentSections(central)[0];
 assert.equal(section.entry.href,'/dashboard/study-tools');
 assert.deepEqual(section.entries.map(item=>item.href),['/dashboard/study-tools','/dashboard/essays']);
});
