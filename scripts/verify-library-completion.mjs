import {readFile,writeFile} from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {join} from 'node:path';
const [folder,report]=process.argv.slice(2);
if(!folder||!report)throw Error('Uso: node scripts/verify-library-completion.mjs PASTA_EVIDENCIAS RELATORIO_JSON');
const load=(file,dependencies={})=>{const module={exports:{}};const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{module,exports:module.exports,require:name=>{if(!dependencies[name])throw Error('Unexpected dependency');return dependencies[name]},URL,Date});return module.exports;};
const highlights=load('src/lib/legalHighlights.ts');
const {literalExercises}=load('src/lib/legalLiteralPractice.ts',{'./legalHighlights':highlights});
const {legalStudyCaveat}=load('src/lib/legalStudyCaveats.ts');
const {isEligibleQuestion,parseBasis}=load('src/lib/questionFormat.ts');
const {questionMatchesLaw}=load('src/lib/legalLibrary.ts');
const read=async name=>JSON.parse(await readFile(join(folder,name+'.json'),'utf8'));
const courses=await read('courses-after'),units=await read('units-after'),materials=await read('materials-after'),versions=await read('examples-after');
const eligible=[];
for(const table of ['official_exam_questions','curated_question_catalog','board_exam_questions']){
 for(const raw of await read(table+'-eligibility')){
  const row=table==='board_exam_questions'?{...raw,context_review_required:raw.needs_visual,legal_audit_completed:!raw.legal_review_required||!!raw.law_version_checked_at}:raw;
  if(isEligibleQuestion(row))eligible.push({id:row.id,table,legalBasis:parseBasis(row.legal_basis)});
 }
}
const normalize=label=>label.toLocaleLowerCase('pt-BR').replace(/[\sº°.,]/g,'');
const rows=courses.filter(c=>c.status==='active').map(course=>{
 const current=units.filter(u=>u.course_id===course.id&&u.content_status==='current');
 const material=materials.find(m=>m.slug===course.material_slug);
 const active=versions.filter(e=>e.material_slug===course.material_slug&&e.status==='active').sort((a,b)=>Date.parse(b.checked_at)-Date.parse(a.checked_at))[0];
 const mapped=new Set(active.content.cases.flatMap(c=>c.articles.map(normalize)));
 let exercises=0;const missing=[];
 for(const unit of current){const practice=legalStudyCaveat(course.slug,unit.unit_key)?.literalPractice===false?[]:literalExercises(unit.body_text);if(!practice.length)missing.push(unit.label);for(const e of practice){if(e.before+e.answer+e.after!==unit.body_text)throw Error('Source reconstruction changed');exercises++;}}
 return {law:course.slug,title:course.title,units:current.length,literal_exercises:exercises,units_without_literal:missing,worked_cases:active.content.cases.length,flashcards:material.flashcards.length,quiz:material.quiz.length,eligible_shared_questions:eligible.filter(q=>questionMatchesLaw(q,course.slug)).length,chapters:[...new Set(current.map(u=>u.chapter))].map(title=>{const chunk=current.filter(u=>u.chapter===title);return {title,units:chunk.length,with_linked_case:chunk.filter(u=>mapped.has(normalize(u.label))).length};})};
});
const result={laws:rows.length,units:rows.reduce((n,r)=>n+r.units,0),literal_exercises:rows.reduce((n,r)=>n+r.literal_exercises,0),units_without_literal:rows.reduce((n,r)=>n+r.units_without_literal.length,0),cases:rows.reduce((n,r)=>n+r.worked_cases,0),flashcards:rows.reduce((n,r)=>n+r.flashcards,0),quiz:rows.reduce((n,r)=>n+r.quiz,0),eligible_shared_catalog:eligible.length,question_scope:'Shared tables only; personal notebooks excluded. Eligibility follows the platform gate, not a new substantive audit of each question.',rows};
await writeFile(report,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,rows:undefined}));
