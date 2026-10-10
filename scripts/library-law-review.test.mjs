import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateLawReview,matchesReviewPatch} from './apply-library-law-review.mjs';
const data=JSON.parse(readFileSync('docs/library/law-review-2026-10-07.json','utf8'));
test('Legal revision covers all 92 modules including CPP and preserves 81 worked-case sets',()=>{
 assert.deepEqual(validateLawReview(data),{materials:92,courses:37,enrichments:81});
 assert.ok(data.enrichments.every(r=>Object.keys(r.patch).join()==='source_body_sha256'));
});
test('Constitutional amendment notices distinguish staged effects and the new teacher accumulation rule',()=>{
 const changes=data.materials.flatMap(r=>r.patch.legal_review.changes);
 assert.ok(changes.some(c=>c.url.endsWith('emc138.htm')&&c.summary.includes('qualquer natureza')));
 assert.ok(changes.filter(c=>c.url.endsWith('emc136.htm')).every(c=>c.state==='reference'&&c.vigency.includes('efeitos futuros')));
});
test('Published ECA and CPC changes with future vigency are never labelled effective',()=>{
 const changes=data.materials.flatMap(r=>r.patch.legal_review.changes);
 for(const file of ['l15450.htm','l15479.htm']){const found=changes.filter(r=>r.url.endsWith(file));assert.equal(found.length,2);assert.ok(found.every(r=>r.state==='future'&&r.vigency.includes(file==='l15450.htm'?'28/12/2026':'30/07/2027')));}
});
test('Spoofed source hosts, forged publication, duplicate targets and stale preconditions fail offline',()=>{
 const mutations=[p=>{p.materials[0].patch.legal_review.sources[0].url='https://www.planalto.gov.br.attacker.invalid/lei';},p=>{p.materials[0].patch.content_status='active';},p=>{p.materials.push(p.materials[0]);},p=>{delete p.materials[0].expected.body_sha256;},p=>{p.courses.push(p.courses[0]);}];
 for(const change of mutations){const p=structuredClone(data);change(p);assert.throws(()=>validateLawReview(p));}
});
test('Readback compares complete JSON and normalizes timestamp representation only',()=>{
 const patch={law_version_checked_at:'2026-10-07T10:00:00.000000+00:00',legal_review:{corrections:['Texto corrigido'],sources:[{title:'Fonte'}]}};
 assert.ok(matchesReviewPatch({...patch,law_version_checked_at:'2026-10-07T10:00:00Z'},patch));
 assert.equal(matchesReviewPatch({...patch,legal_review:{...patch.legal_review,corrections:[]}},patch),false);
});
test('CP and CPP coverage retains excluded articles and pedagogical bounds',()=>{
 const p=JSON.parse(readFileSync('docs/library/core-law-paths-2026-10-07.json','utf8'));
 assert.deepEqual(p.courses.map(c=>c.slug),['codigo-penal','codigo-processo-penal']);
 for(const c of p.courses){const units=p.units.filter(u=>u.course_id===c.id);assert.equal(units.filter(u=>u.content_status==='current').length,c.overview.current_units);assert.equal(units.filter(u=>u.content_status==='excluded').length,c.overview.excluded_units);assert.ok(c.overview.editorial_scope.includes('repertório adicional'));}
 const cpp=p.courses.find(c=>c.slug==='codigo-processo-penal');assert.ok(cpp.overview.jurisprudence.some(r=>r.articles.includes('Art. 157')&&r.explanation.includes('inconstitucional')));
});
