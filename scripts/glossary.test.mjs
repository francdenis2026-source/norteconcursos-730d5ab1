import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
function load(file,overrides={}){const module={exports:{}};const native=createRequire(import.meta.url);const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{module,exports:module.exports,require:name=>overrides[name]??native(name),URL},{filename:file});return module.exports;}
const curated=load('src/data/glossaryCurated.ts');
const generated=JSON.parse(readFileSync('src/data/glossary.generated.json','utf8'));
const g=load('src/lib/glossary.ts',{'@/data/glossary.generated.json':{default:generated},'@/data/glossaryCurated':curated});
test('annotate marca verbetes sem alterar o texto e só a primeira ocorrência',()=>{
 const text='O flagrante é a prisão em flagrante; o Habeas Corpus protege a liberdade.';
 const parts=g.annotate(text);
 assert.equal(parts.map(p=>p.text).join(''),text);
 assert.equal(parts.filter(p=>p.entry).length>=2,true);
 assert.equal(parts.filter(p=>p.entry&&g.normalize(p.text)==='flagrante').length,1);
});
test('respeita limites de palavra e acentos',()=>{
 const parts=g.annotate('Flagrantes e inflagrante não contam; SINÔNIMO conta.');
 const marked=parts.filter(p=>p.entry).map(p=>g.normalize(p.text));
 assert.ok(marked.includes('sinonimo'));assert.ok(!marked.includes('flagrante'));
});
test('termos ambíguos não são sublinhados sozinhos, mas existem no dicionário',()=>{
 assert.equal(g.annotate('A parada do ônibus.').some(p=>p.entry),false);
 assert.ok(g.GLOSSARY.some(e=>g.normalize(e.term)==='parada'));
});
test('busca no dicionário ignora acento e olha sinônimos',()=>{
 assert.ok(g.searchGlossary('negligencia').some(e=>e.term==='culpa'));
 assert.ok(g.searchGlossary('SURSIS','Direito').length>0);
});
test('todo verbete tem definição não vazia',()=>{for(const e of g.GLOSSARY){assert.ok(e.term.trim());assert.ok(e.meaning.trim().length>=8,e.term);}});
