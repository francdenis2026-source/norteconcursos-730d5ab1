// Read-only structural inventory. This never grants an editorial approval.
import{readFile,writeFile}from'node:fs/promises';
import{createHash}from'node:crypto';
import{isEligibleQuestion}from'../../src/lib/questionFormat.ts';
const[input,output]=process.argv.slice(2);if(!input||!output)throw Error('Usage: SNAPSHOT REPORT');
const snapshot=JSON.parse(await readFile(input,'utf8'));
const index=key=>new Map(snapshot[key].map(row=>[row.id,row]));
const topics=index('syllabus_topics'),editions=index('syllabus_editions'),sources=index('content_sources');
const groups=new Map(),rows=[];
for(const table of ['official_exam_questions','board_exam_questions'])for(const q of snapshot[table]){
 const topic=topics.get(q.current_syllabus_topic_id||q.syllabus_topic_id),edition=editions.get(topic?.edition_id),source=sources.get(edition?.source_id);
 const flags=[];const active=q.content_status==='active';
 if(!topic)flags.push('missing_topic');else if(topic.content_status!=='current')flags.push('topic_not_current');
 if(!edition||edition.status!=='active')flags.push('missing_or_inactive_edition');
 if(!source?.is_official||source.source_type!=='edital'||source.status!=='vigente')flags.push('edition_without_verified_edital');
 if(q.context_review_required||q.needs_visual)flags.push('context_or_visual_flag');
 if(q.legal_review_required&&!(table==='board_exam_questions'?q.law_version_checked_at:q.legal_audit_completed))flags.push('legal_review_flag');
 const text=q.question_text||q.stem||'';
 if(/TEXTO VERBATIM.*NÃO CONFIRMADO|\[diagrama [A-E] do caderno|^\s*\(A\)/i.test(text))flags.push('incomplete_text_marker');
 const note=q.explanation||q.review_note||'';
 const pedagogicalExample=/exemplo(?: pr[aá]tico)?\s*:/i.test(note);
 // Match the board adapter used by useQuestionCatalog before its gate.
 const gateRow=table==='board_exam_questions'?{...q,context_review_required:q.needs_visual,legal_audit_completed:!q.legal_review_required||!!q.law_version_checked_at}:q;
 const eligible=isEligibleQuestion(gateRow);
 if(active&&!eligible)flags.push('app_gate_rejected');
 const key=[q.contest_name,q.exam_year,q.career_name,q.exam_board||q.board].join(' | ');
 if(!groups.has(key))groups.set(key,{exam:key,records:0,status:{},active_app_eligible:0,active_with_catalog_flags:0,active_without_example_marker:0,flags:{}});
 const g=groups.get(key);g.records++;g.status[q.content_status]=(g.status[q.content_status]||0)+1;
 if(active&&eligible)g.active_app_eligible++;
 if(active&&flags.length)g.active_with_catalog_flags++;
 if(active&&!pedagogicalExample)g.active_without_example_marker++;
 for(const flag of flags)if(active)g.flags[flag]=(g.flags[flag]||0)+1;
 rows.push({table,id:q.id,item_number:q.item_number,exam:key,status:q.content_status,app_eligible:eligible,catalog_flags:flags,example_marker:pedagogicalExample,row_sha256:createHash('sha256').update(JSON.stringify(q)).digest('hex'),editorial_audit_this_run:false});
}
const report={snapshot_at:snapshot.checked_at,generated_at:new Date().toISOString(),scope:'Structural inventory of PC records in official_exam_questions and board_exam_questions. Flags are triage signals, not proof of legal error. No text/answer/source audit or new editorial approval is implied.',counting:'Groups by original contest/year/career/board; not deduplicated physical exam booklets. Archived aliases remain visible.',groups:[...groups.values()].sort((a,b)=>a.exam.localeCompare(b.exam,'pt-BR')),totals:{records:rows.length,status:rows.reduce((n,r)=>(n[r.status]=(n[r.status]||0)+1,n),{}),active_app_eligible:rows.filter(r=>r.status==='active'&&r.app_eligible).length,active_with_catalog_flags:rows.filter(r=>r.status==='active'&&r.catalog_flags.length).length,active_without_example_marker:rows.filter(r=>r.status==='active'&&!r.example_marker).length,editorial_approvals_this_run:0},rows};
await writeFile(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.totals));
