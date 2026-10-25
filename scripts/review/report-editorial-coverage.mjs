// Count actual current editorial approvals, rather than legacy published rows.
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {hasCurrentExplanationReview} from '../../src/lib/explanationReview.ts';
const [folder,report]=process.argv.slice(2);
if(!folder||!report) throw Error('Usage: report-editorial-coverage.mjs SNAPSHOT_FOLDER REPORT');
const read=async table=>JSON.parse(await readFile(resolve(folder,table+'.json'),'utf8'));
const [courses,units,explanations]=await Promise.all(['legal_courses','legal_course_units','legal_unit_explanations'].map(read));
const byUnit=new Map(explanations.map(e=>[e.unit_id,e]));
const rows=courses.map(course=>{
 const current=units.filter(u=>u.course_id===course.id&&u.content_status==='current');
 const reviewed=current.filter(u=>hasCurrentExplanationReview(byUnit.get(u.id)||{},u.content_sha256)).length;
 return {slug:course.slug,current:current.length,review_metadata:reviewed,pending:current.length-reviewed};
});
const result={current_units:rows.reduce((s,r)=>s+r.current,0),current_review_metadata:rows.reduce((s,r)=>s+r.review_metadata,0),pending_current_review_metadata:rows.reduce((s,r)=>s+r.pending,0),checked_at:new Date().toISOString(),note:'Contagem de aprovações editoriais atuais com revisor, data e hash correspondente; existência de explicação publicada não equivale a revisão atual. Não certifica toda a regulamentação ou jurisprudência.',courses:rows};
await writeFile(report,JSON.stringify(result,null,2)+'\n');
console.log({reviewed:result.current_review_metadata,pending:result.pending_current_review_metadata});
