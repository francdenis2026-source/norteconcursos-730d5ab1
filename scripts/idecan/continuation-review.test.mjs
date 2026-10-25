import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildAll, buildContinuation, reviewDirectory } from './build-continuation-review.mjs';
import { validateCorpus, digest } from '../import-question-corpus.mjs';
import { reviewSql } from './build-first-review.mjs';
const json = (file) => JSON.parse(fs.readFileSync(file));
const { results, changes, summary } = buildAll();
test('all 177 remaining candidates have unique individual findings; earlier decisions survive verbatim', () => {
  assert.equal(changes.length,177);
  assert.equal(new Set(changes.map((c) => c.candidate)).size,177);
  assert.equal(new Set(changes.map((c) => c.next_payload.individual_review.explanation)).size,177);
  for (const { role,previous,next,changes:delta } of results) {
    assert.equal(delta.length,role==='inspetor'?90:87);
    validateCorpus(next);
    assert.deepEqual(next,json(`${reviewDirectory}/pcce_${role}_2021_revisado.json`));
    for (const old of previous.candidates) {
      const current = next.candidates.find((c) => c.id===old.id);
      if (old.content_status!=='under_review') assert.deepEqual(current,old);
      else {
        const { individual_review, ...original } = current.payload;
        assert.deepEqual(original,old.payload);
        assert.equal(individual_review.publication_approved,false);
        assert.equal(individual_review.answer_verified,false);
        assert.equal(individual_review.context_complete,false);
        assert(!current.payload.publication);
        if (current.payload.legal_review_required) assert.equal(individual_review.legal_current,false);
      }
    }
  }
});
test('the five superseded items have source-backed findings, not invented annulments', () => {
  const obsolete = results.flatMap(({role,next}) => next.candidates.filter((c)=>c.content_status==='obsolete').map((c)=>`${role}:${c.payload.item_number}`)).sort();
  assert.deepEqual(obsolete,['escrivao:66','escrivao:74','inspetor:55','inspetor:56','inspetor:68']);
  for (const c of changes.filter((c)=>c.next_status==='obsolete')) {
    assert(c.next_payload.individual_review.primary_evidence.length);
    assert.equal(c.next_payload.individual_review.exclusion_reason,'superseded_for_current_training');
  }
  const inspector=results.find((r)=>r.role==='inspetor').next;
  assert(inspector.candidates.slice(10).every((c)=>c.payload.individual_review.answer_key_evidence.section_heading_ambiguous));
  assert.equal(inspector.candidates.filter((c)=>c.content_status==='rejected').length,0);
});
test('every cited excerpt is captured and hashed; unsuccessful Planalto requests never become verified evidence', () => {
  const evidence=json(`${reviewDirectory}/fontes-e-excertos.json`);
  for (const change of changes) for (const item of change.next_payload.individual_review.primary_evidence) {
    const [key,article='document']=item.reference.split(':');
    assert.equal(item.excerpt_sha256,digest(evidence.sources[key].excerpts[article]));
    assert.equal(evidence.sources[key].http_status,200);
  }
  assert.equal(evidence.failed_planalto_requests.length,14);
  assert(evidence.failed_planalto_requests.every((s)=>!s.retrieval_verified && s.http_status==='000' && s.bytes===0));
  assert.match(evidence.sources.lep.excerpts['112'],/75%/);
  assert.match(evidence.sources.improbidade.excerpts['12'],/24 \(vinte e quatro\)/);
  assert.match(evidence.sources.stf6298.excerpts.document,/competência do juiz das garantias cessa com o oferecimento/);
});
test('graphical and product-version issues remain explicit, including the printed SOMASE intervals', () => {
  const clerk=results.find((r)=>r.role==='escrivao').next;
  const q=clerk.candidates[15].payload.individual_review;
  assert(q.blockers.includes('formula_com_intervalos_diferentes'));
  assert.match(q.explanation,/\$C\$7:\$C\$8/);
  assert.equal(q.software_and_media_check.media_integrated_for_training,false);
  assert.equal(clerk.candidates[11].payload.individual_review.software_and_media_check.selected_page_visual_inspection,true);
});
test('coverage and historical profile do not announce a production import or predict PC-AC', () => {
  assert.deepEqual(summary.proposed_states,{reviewed_held:192,obsolete:5,rejected_annulled:3,under_review:0});
  assert.equal(summary.publication_approved,0);
  assert.equal(summary.remote_application_verified,false);
  assert(summary.observed_profile.every((p)=>p.printed_positions===100));
  assert.deepEqual(summary,json(`${reviewDirectory}/resumo-e-perfil-observado.json`));
});
test('SQL is reproducible and protects even against malformed partial review inputs', () => {
  assert.equal(reviewSql(changes,'Continuação PC-CE 2021: 177 pareceres individuais; preservar as 23 decisões anteriores.'),fs.readFileSync(`${reviewDirectory}/aplicar-continuacao.sql`,'utf8'));
  assert.throws(()=>reviewSql(changes,'invalid\ncommit;'),/Título SQL inválido/);
  const notes=json(`${reviewDirectory}/pareceres.json`),evidence=json(`${reviewDirectory}/fontes-e-excertos.json`),text=json(`${reviewDirectory}/cotejo-literal-pdf.json`),keys=json(`${reviewDirectory}/cotejo-gabarito.json`);
  const {previous}=results[0];notes.inspetor.pop();
  assert.throws(()=>buildContinuation(previous,'inspetor',notes,evidence,text,keys),/Cobertura incompleta/);
});
