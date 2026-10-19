import { readFile, writeFile } from 'node:fs/promises';
import { validateReview } from './publish-question-review.mjs';
const [input,output]=process.argv.slice(2);
if (!input || !output) throw Error('Usage: SNAPSHOT OUTPUT_PACK');
const rows=JSON.parse(await readFile(input,'utf8'));
const sameExam=r=>r.contest_name==='Polícia Civil do Estado do Paraná' && r.exam_year===2026;
const archived=rows.filter(r=>sameExam(r)&&r.career_name==='Papiloscopista Policial'&&r.content_status==='archived');
if (archived.length!==64) throw Error('Expected exactly the 64 archived shared items; refresh and investigate any change');
const pack={purpose:'pcpr-papiloscopista-restoration',created_at:new Date().toISOString(),scope:'Restore only publication status of the 64 shared PCPR/2026 Papiloscopista items, explicitly requested by user; preserve all content and existing audit metadata.',items:archived.map(expected=>{
 const canonical=rows.find(r=>sameExam(r)&&r.career_name==='Agente de Polícia Judiciária'&&r.item_number===expected.item_number&&r.content_status==='active');
 if (!canonical) throw Error(`Missing active counterpart: ${expected.item_number}`);
 return {table:'board_exam_questions',expected,patch:{content_status:'active'},evidence:{legal:!!expected.legal_basis?.length || !!expected.legal_review_required,reason:'User-authorized restoration of shared exam items to their own Papiloscopista paper. Identical active Agente counterpart, original role/syllabus and all content retained; not a new legal audit.',sources:[expected.source_url,expected.answer_key_url].filter(Boolean),restore_expected:canonical}};
})};
validateReview(pack);
await writeFile(output,JSON.stringify(pack,null,2)+'\n');
console.log(JSON.stringify({purpose:pack.purpose,items:pack.items.length,patch_fields:['content_status']}));
