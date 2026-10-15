import test from 'node:test';
import assert from 'node:assert/strict';
import {addStudyLater,questionStudyTopics,studyLaterKey,readStudyLater,writeStudyLater} from '../src/lib/studyLater.ts';
const q={id:'q1',source:'official',subject:'Direito Penal',subtopic:null,text:'Analise os institutos apresentados.\nA) O homicídio tutela a vida.\nB) O furto é um delito patrimonial.\nC) A legítima defesa exclui a ilicitude.\nD) Texto sem assunto identificável.',legalBasis:[],explanation:'Comentário',answer:'A'};
test('save is source-aware and idempotent; edits preserve review status and date',()=>{
 const first=addStudyLater([],q,'Tema','Dúvida');first[0].reviewed=true;
 const edited=addStudyLater(first,q,'Tema corrigido','Outra dúvida');
 assert.equal(edited.length,1);assert.equal(edited[0].savedAt,first[0].savedAt);assert.equal(edited[0].reviewed,true);
 assert.equal(addStudyLater(edited,{...q,source:'curated'},'Tema','').length,2);
});
test('alternatives are classified independently and unknown topics remain unknown',()=>{
 const topics=questionStudyTopics(q);
 assert.equal(topics.alternatives.length,4);
 assert.notEqual(topics.alternatives[0].topic,topics.alternatives[1].topic);
 assert.notEqual(topics.alternatives[1].topic,topics.alternatives[2].topic);
 assert.equal(topics.alternatives[3].topic,null);
});
test('storage is isolated per account; corrupt data and storage failures are surfaced',()=>{
 const data=new Map();global.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};global.window={dispatchEvent:()=>{}};
 writeStudyLater('alice',addStudyLater([],q,'Tema',''));assert.equal(readStudyLater('alice').length,1);assert.deepEqual(readStudyLater('bob'),[]);
 data.set(studyLaterKey('bob'),'{');assert.throws(()=>readStudyLater('bob'));
 global.localStorage.setItem=()=>{throw new Error('Quota')};assert.throws(()=>writeStudyLater('alice',[]));
});
