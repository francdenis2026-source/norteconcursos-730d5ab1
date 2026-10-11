import test from "node:test";
import fs from "node:fs";
import assert from 'node:assert/strict';
import {usableArticleSource} from './article-explanation-package.mjs';

// Estrutura mínima de cada explicação por artigo (a conferência contra o texto oficial roda em scripts/explicacoes/build.mjs).
for (const file of fs.readdirSync("scripts/explicacoes").filter((f) => f.endsWith(".json"))) {
  test(`explicações por artigo: ${file}`, () => {
    const exp = JSON.parse(fs.readFileSync(`scripts/explicacoes/${file}`, "utf8"));
    if (!exp.course_slug) throw new Error("course_slug ausente");
    for (const [key, e] of Object.entries(exp.units)) {
      for (const f of ["simples", "exemplo"]) if (typeof e[f] !== "string" || e[f].length < 20) throw new Error(`${key}: ${f} curto`);
      for (const f of ["pontos", "atencao", "prova"]) if (!Array.isArray(e[f]) || !e[f].length) throw new Error(`${key}: ${f} vazio`);
      if (e.simples.split(/\s+/).length < 10) throw new Error(`${key}: explicação rasa`);
    }
  });
}

test('rascunhos não sobrescrevem revisões e exigem o texto-base exato',()=>{
 const files=[...fs.readdirSync('supabase/migrations').filter(f=>/^20261014003[3-8]00_explicacoes_.*\.sql$/.test(f)).map(f=>'supabase/migrations/'+f),...fs.readdirSync('sql-lotes').filter(f=>/^leis3-.*\.sql$/.test(f)).map(f=>'sql-lotes/'+f)];
 assert.equal(files.length,19);
 for(const file of files){
  const sql=fs.readFileSync(file,'utf8');
  const statements=sql.match(/insert into public\.legal_unit_explanations[\s\S]*?on conflict \(unit_id\)[\s\S]*?;/g)??[];
  assert.ok(statements.length,file);
  for(const statement of statements){
   assert.match(statement,/on conflict \(unit_id\) do nothing;/,file);
   assert.match(statement,/u\.content_status = 'current'/,file);
   assert.match(statement,/u\.content_sha256 = '[a-f0-9]{64}'/,file);
   assert.match(statement,/t\.content_status='current' and d\.status='active'/,file);
  }
  assert.doesNotMatch(sql,/where c\.slug = 'lep' and u\.unit_key = 'art-182'/,file);
 }
});

test('ECA 232 permanece vigente; revogação de 233 não migra ao artigo anterior',()=>{
 const e=JSON.parse(fs.readFileSync('scripts/explicacoes/eca-07.json','utf8')).units['art-232'];
 assert.match(e.simples,/permanece vigente/);
 assert.match(e.atencao.join(' '),/revogou o art\. 233, não o art\. 232/);
 assert.ok(e.exemplo.includes('Variação:'));
 assert.ok(e.prova.every(q=>q.includes('?')&&q.split('?')[1].trim()));
});

test('fonte parcialmente revogada permite artigo remanescente, nunca fonte totalmente revogada',()=>{
 assert.equal(usableArticleSource({is_official:true,status:'parcialmente_revogado'}),true);
 assert.equal(usableArticleSource({is_official:true,status:'revogado'}),false);
 assert.equal(usableArticleSource({is_official:false,status:'vigente'}),false);
});
