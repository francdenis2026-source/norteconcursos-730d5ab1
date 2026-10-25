import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
function load(file){const module={exports:{}};const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{module,exports:module.exports,require:()=>({})},{filename:file});return module.exports;}
const dir='src/data/tracks';
const files=readdirSync(dir).filter(f=>/^(contabilidade|informatica|portugues|raciocinio|constitucional|administrativo|humanos|estatistica)\d+\.ts$/.test(f));
test('trilhas: aulas completas, ids únicos e testes com explicação',()=>{
 assert.ok(files.length>0);
 const ids=new Set();
 for(const f of files){
  const mod=load(`${dir}/${f}`);
  for(const lessons of Object.values(mod))for(const l of lessons){
   assert.ok(!ids.has(l.id),'id repetido '+l.id);ids.add(l.id);
   for(const k of ['group','title','edital','simples','exemplo'])assert.ok(l[k]&&l[k].trim().length>=3,l.id+':'+k);
   assert.ok(l.simples.split(/\s+/).length>=15,l.id+' simples curto');
   assert.ok(l.pontos.length>=2&&l.atencao.length>=1,l.id);
   assert.ok(l.quiz.length>=2,l.id+' quiz');
   for(const q of l.quiz){assert.equal(typeof q.a,'boolean');assert.ok(q.why.trim().length>10,l.id+' why');}
  }
 }
});
