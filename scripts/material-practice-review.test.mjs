import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { authoredMaterialPractice, matchesMaterialScope } from '../src/lib/materialPractice.ts';
import { matchesPracticeReview } from '../src/lib/materialPracticeReview.ts';
const pack=JSON.parse(readFileSync(new URL('../supabase/imports/materials-normative-2026-10-24/course-additions-package.json',import.meta.url)));
const row=pack.rows.find(r=>r.review.law==='budapeste');
test('published snapshot unlocks its twenty normative exercises and carries official evidence',()=>{
 const qs=authoredMaterialPractice(row.quiz,{law:'budapeste'},row.slug,'Convenção',row.review);
 assert.equal(qs.length,20);assert.ok(qs.every(q=>q.legalBasis[0].url===row.review.sources[0].url));
 assert.equal(authoredMaterialPractice(row.quiz,{law:'budapeste'},row.slug,'Convenção').length,0);
});
test('approval is invalidated by any answer, explanation, statement, slug or official source change',()=>{
 for(const key of ['q','why','a']){const q=structuredClone(row.quiz);q[0][key]=key==='a'?!q[0][key]:q[0][key]+' changed';assert.equal(matchesPracticeReview(q,row.review,row.slug),false);}
 assert.equal(matchesPracticeReview(row.quiz,row.review,'other-material'),false);
 const r=structuredClone(row.review);r.sources[0].url='https://planalto.gov.br.evil.example/';assert.equal(matchesPracticeReview(row.quiz,r,row.slug),false);
 assert.equal(authoredMaterialPractice(row.quiz,{law:'eca'},row.slug,'Convenção',row.review).length,0);
});
test('convention and promulgating decree article numbers never leak into one another',()=>{
 const a=authoredMaterialPractice(row.quiz,{law:'budapeste',article:'Convenção — Artigo 2'},row.slug,'Convenção',row.review);
 assert.ok(a.length>0);assert.ok(a.every(q=>q.legalBasis[0].artigo==='Convenção — Artigo 2'));
 const b=authoredMaterialPractice(row.quiz,{law:'budapeste',article:'Art. 2'},row.slug,'Convenção',row.review);
 assert.ok(b.every(q=>!q.legalBasis[0].artigo.includes('Convenção')));
 const base={subject:'Direito Penal',contest:'',legalBasis:[{url:row.review.sources[0].url,artigo:'Art. 2'}]};
 assert.equal(matchesMaterialScope(base,{law:'budapeste',article:'Convenção — Artigo 2'}),false);
});
