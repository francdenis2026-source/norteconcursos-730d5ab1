import test from 'node:test';
import assert from 'node:assert/strict';
import {isEligibleQuestion,isOfficialUrl} from '../../src/lib/questionFormat.ts';
test('SINJ district legislation is eligible only with dated verification and existing approval',()=>{
 const row={content_status:'active',official_answer:'C',subject:'Direito Administrativo',legal_review_required:true,legal_audit_completed:true,context_review_required:false,law_version_checked_at:'2026-10-16T00:00:00Z',legal_basis:[{url:'https://www.sinj.df.gov.br/sinj/Norma/70196/Lei_Complementar_840_23_12_2011.html',artigo:'181'}]};
 assert.equal(isEligibleQuestion(row),true);
 assert.equal(isEligibleQuestion({...row,law_version_checked_at:null}),false);
 assert.equal(isEligibleQuestion({...row,legal_audit_completed:false}),false);
 assert.equal(isEligibleQuestion({...row,content_status:'under_review'}),false);
 for(const host of ['sinj.df.gov.br.evil.test','evil-sinj.df.gov.br','df.gov.br','example.org'])assert.equal(isOfficialUrl('https://'+host+'/law'),false);
});
