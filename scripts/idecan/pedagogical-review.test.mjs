import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root='supabase/imports/idecan/revisao-integral';
const input=JSON.parse(fs.readFileSync('supabase/imports/idecan/idecan_questions.json'));
const math=JSON.parse(fs.readFileSync(`${root}/explicacoes-matematica-rascunho.json`));
const info=JSON.parse(fs.readFileSync(`${root}/explicacoes-informatica-rascunho.json`));
const choose=(n,k)=>{let p=1;for(let i=1;i<=k;i++)p=p*(n-i+1)/i;return p;};
test('resoluções numéricas independentes conferem com as alternativas do arquivo',()=>{
 const results=new Map([[78,8*7*6],[79,(8.5*4+9*3+7)/8],[80,80000/(320000/80000)],[83,23+16],[84,6*9],[85,720/2-120],[88,270/(120/(4*6*10)*3*9)],[89,180000*.85**2],[90,(47-10-8+3)+(30-10-5+3)+(20-8-5+3)],[98,500*.4*.75-500*.6*.2],[99,2000*(1-(.4+.3+.2-.1-.05-.08+.02))],[100,2**4],[134,10*9*8],[135,8*(20+55)/2],[137,Math.sqrt(21*8*7*6)*10],[138,2400*1.1*.88],[139,36],[263,choose(10,4)*choose(7,2)],[264,Math.sqrt((25+25+0+25+25)/(5-1))],[265,5*(160+240)/2],[267,Math.sqrt(9*4)],[268,360/(180-108)],[269,(30-10-12+5)+(25-10-8+5)+(35-12-8+5)],[271,27+9+11]]);
 for(const [i,n] of results){const q=input[i];const text=q.options[q.official_answer];const actual=Number(text.replace(/R\$|dias|\s|\.$/g,'').replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.'));assert.ok(Math.abs(actual-n)<1e-8,`${i}: ${actual} != ${n}`);}
 assert.ok(Math.abs(.85**3-.614125)<1e-12);assert.equal((10/16)*(9/15),.375);assert.equal(.95*.9,.855);assert.ok(Math.abs(.6*(1-.8)-.12)<1e-12);
});
test('culpado único é Alexandre após testar todas as falas',()=>{
 const guilty=[];for(let g=0;g<5;g++){const claims=[g===1,g!==1,g!==1,g!==2,g!==2];if(claims.every((truth,i)=>truth===(g!==i)))guilty.push(g);}
 assert.deepEqual(guilty,[0]);assert.equal(input[86].options[input[86].official_answer],'Alexandre.');
});
test('rascunhos não autorizam publicação e cobrem exatamente as 81 questões escolhidas',()=>{
 assert.equal(math.length,38);assert.equal(info.length,43);assert.equal(new Set([...math,...info].map(x=>x.local_index)).size,81);
 for(const n of [...math,...info]){assert.equal(n.publication_approved,false);assert.ok(n.solution.length>80);assert.ok(n.common_error.length>40);assert.ok(n.practical_example.trim());}
 const troublesome=info.filter(n=>[39,52,54,55,106,107,108,224,225,230,231].includes(n.local_index));assert.ok(troublesome.every(n=>n.editorial_issues.length));
});
test('prazo fracionário não é arredondado silenciosamente nem publicado',()=>{
 assert.equal(150*(4*6*5/50)/(6*8),7.5);
 const r=JSON.parse(fs.readFileSync(`${root}/pareceres-matematica.json`));assert.equal(r.items.length,38);assert.equal(r.items.filter(x=>x.release_approved).length,37);
 assert.equal(r.items.find(x=>x.local_index===270).new_content_status,'under_review');
 assert.equal(r.items.find(x=>x.local_index===81).visual_resolution,true);
});
