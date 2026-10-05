import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import path from 'node:path';
const exports={};vm.runInNewContext(ts.transpileModule(await fs.readFile('src/lib/learningDiagrams.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports,module:{exports}});
test('Conditional negation and equivalence match every row, including false antecedents',()=>{
 for(const p of [false,true])for(const q of [false,true]){const r=exports.truthValues(p,q);assert.equal(r.conditional,!p||q);assert.equal(r.negatedConditional,!r.conditional);assert.equal(r.biconditional,p===q);}
});
test('Venn regions partition the universe and reject incompatible sets',()=>{
 const r=exports.vennRegions(30,18,16,8);assert.equal(r.onlyA,10);assert.equal(r.onlyB,8);assert.equal(r.neither,4);assert.equal(r.union,26);assert.equal(r.onlyA+r.onlyB+r.both+r.neither,30);assert.throws(()=>exports.vennRegions(30,18,16,1));
});
test('Probability branches sum to one and replacement changes the result',()=>{
 for(const replacement of [false,true]){const rows=exports.twoDraws(2,1,replacement);assert.ok(Math.abs(rows.reduce((n,r)=>n+r.probability,0)-1)<1e-12);assert.ok(Math.abs(rows[0].probability-(replacement?4/9:1/3))<1e-12);if(!replacement)assert.equal(rows[3].probability,0);}
});
test('Every reviewed example has a resolution and variation; forged publication and sources fail offline',async()=>{
 const rows=JSON.parse(await fs.readFile('docs/library/worked-examples-2026-10-05.json','utf8'));assert.equal(rows.length,121);assert.equal(rows.reduce((n,r)=>n+r.content.cases.length,0),132);
 const dir=await fs.mkdtemp(path.join(tmpdir(),'norte-enrichment-'));
 const env={...process.env};delete env.TASK_SUPABASE_KEY;delete env.TASK_SUPABASE_PROJECT;delete env.TASK_LIBRARY_REVIEWER;
 async function run(value){const input=path.join(dir,'input.json');await fs.writeFile(input,JSON.stringify(value));return spawnSync(process.execPath,['scripts/import-study-enrichment.mjs',input,path.join(dir,'report.json'),'--dry-run'],{env,encoding:'utf8'}).status;}
 try{
  assert.equal(await run(rows),0);
  const incomplete=structuredClone(rows);incomplete[0].content.cases[0].variation.answer='';assert.notEqual(await run(incomplete),0);
  const forged=structuredClone(rows);forged[0].status='active';assert.notEqual(await run(forged),0);
  const bad=structuredClone(rows);bad.find(r=>r.sources.length).sources[0].url='https://www.planalto.gov.br.attacker.invalid/law';assert.notEqual(await run(bad),0);
  const duplicate=structuredClone(rows);duplicate.push(duplicate[0]);assert.notEqual(await run(duplicate),0);
 }finally{await fs.rm(dir,{recursive:true,force:true});}
});
