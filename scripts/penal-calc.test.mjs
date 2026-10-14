import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const m = { exports: {} };
vm.runInNewContext(ts.transpileModule(readFileSync('src/lib/penalCalc.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { module: m, exports: m.exports, require: () => ({}), Math, Number, Date, Error });
const c = m.exports;
const P = (anos, meses = 0, dias = 0) => ({ anos, meses, dias });

test('catálogo de crimes bate com os preceitos do texto compilado (conferidos na Biblioteca)', () => {
  const by = Object.fromEntries(c.CRIMES.map((x) => [x.id, x]));
  assert.deepEqual([by.cp155.min.anos, by.cp155.max.anos], [1, 6]);
  assert.deepEqual([by.cp157.min.anos, by.cp157.max.anos], [6, 10]);
  assert.deepEqual([by.cp180.min.anos, by.cp180.max.anos], [2, 6]);
  assert.deepEqual([by.d33.min.anos, by.d33.max.anos], [5, 15]);
  assert.deepEqual([by.cp217a.min.anos, by.cp217a.max.anos], [10, 18]);
  assert.equal(by.cp331.min.meses, 6);
  assert.equal(by.cp329.min.meses, 2);
});

test('dosimetria em três fases (art. 68) com limites da fase 2', () => {
  const r = c.dosimetria({ min: P(6), max: P(20), circunstanciasNegativas: 2, fracaoCircunstancia: { num: 1, den: 8 }, agravantes: 1, atenuantes: 0, fracaoAgravanteAtenuante: { num: 1, den: 6 }, aumentos: [{ num: 1, den: 3 }], diminuicoes: [] });
  // intervalo = 14 anos (5040 dias); base = 2160 + 2*630 = 3420; +1/6 = 3990; +1/3 = 5320
  assert.equal(r.passos[0].dias, 3420);
  assert.equal(r.passos[1].dias, 3990);
  assert.equal(r.final, 5320);
  const lim = c.dosimetria({ min: P(1), max: P(2), circunstanciasNegativas: 0, fracaoCircunstancia: { num: 1, den: 8 }, agravantes: 0, atenuantes: 3, fracaoAgravanteAtenuante: { num: 1, den: 6 }, aumentos: [], diminuicoes: [{ num: 1, den: 3 }] });
  assert.equal(lim.passos[1].dias, 360, 'atenuante não leva abaixo do mínimo legal');
  assert.equal(lim.final, 240, 'causa de diminuição pode ficar abaixo do mínimo');
  assert.throws(() => c.dosimetria({ min: P(5), max: P(2), circunstanciasNegativas: 0, fracaoCircunstancia: { num: 1, den: 8 }, agravantes: 0, atenuantes: 0, fracaoAgravanteAtenuante: { num: 1, den: 6 }, aumentos: [], diminuicoes: [] }));
});

test('regime inicial pelo art. 33, § 2º', () => {
  assert.equal(c.regimeInicial(c.penaParaDias(P(8, 0, 1)), false, 'reclusão').regime, 'Fechado');
  assert.equal(c.regimeInicial(c.penaParaDias(P(8)), false, 'reclusão').regime, 'Semiaberto');
  assert.equal(c.regimeInicial(c.penaParaDias(P(4)), false, 'reclusão').regime, 'Aberto');
  assert.equal(c.regimeInicial(c.penaParaDias(P(3)), true, 'reclusão').regime, 'Semiaberto possível');
  assert.equal(c.regimeInicial(c.penaParaDias(P(9)), true, 'detenção').regime, 'Semiaberto, em tese');
  assert.equal(c.regimeInicial(c.penaParaDias(P(3)), false, 'reclusão', false).regime, 'Depende de fundamentação');
});

test('progressão: frações do art. 112 da LEP e data pelo calendário', () => {
  const cat = Object.fromEntries(c.CATEGORIAS_PROGRESSAO.map((x) => [x.id, x]));
  assert.equal(cat.base.fracao.den, 6);
  assert.equal(c.fracaoValor(cat.i.fracao), 0.25);
  assert.equal(c.fracaoValor(cat.v.fracao), 0.7);
  assert.equal(c.fracaoValor(cat.viii.fracao), 0.85);
  assert.equal(cat.viii.livramentoVedado, true);
  const ini = c.parseDate('2026-01-01');
  const r = c.marcoExecucao(ini, P(6), cat.base.fracao, 0, 0);
  // 6 anos de 1/1/2026 = 2191 dias (2 bissextos: 2028 e 2032); 1/6 => 366 dias; data = início + 365 dias
  assert.equal(r.totalDias, 2191);
  assert.equal(r.exigidosDias, 366);
  assert.equal(c.toIso(r.data), '2027-01-01');
  const d = c.marcoExecucao(ini, P(6), cat.base.fracao, 100, 66);
  assert.equal(d.faltamDias, 200);
  assert.equal(c.marcoExecucao(ini, P(6), cat.base.fracao, 400, 0).jaCumprido, true);
  assert.equal(c.marcoExecucao(ini, P(50), cat.base.fracao, 0, 0).limiteQuarentaAnos, true);
});

test('livramento exige mais que a fração; remição segue o art. 126', () => {
  const ini = c.parseDate('2026-01-01');
  const l = c.marcoExecucao(ini, P(3), { num: 1, den: 3 }, 0, 0, true);
  assert.equal(l.exigidosDias, Math.floor(l.totalDias / 3) + 1);
  const r = c.remicaoPorBlocos(10, 90, false);
  assert.equal(r.estudo, 10);
  assert.equal(r.trabalho, 30);
  assert.equal(c.remicaoPorBlocos(10, 0, true).acrescimoConclusao, 3);
  assert.throws(() => c.remicaoPorBlocos(1.5, 0, false), /inteiro/);
  assert.throws(() => c.remicaoPorBlocos(1, -3, false), /inteiro/);
});

test('prescrição: faixas do art. 109, aumento do art. 110 e redução do art. 115', () => {
  const y = (n) => n * 360;
  assert.equal(c.prazoPrescricaoAnos(y(12) + 1), 20);
  assert.equal(c.prazoPrescricaoAnos(y(12)), 16);
  assert.equal(c.prazoPrescricaoAnos(y(8) + 1), 16);
  assert.equal(c.prazoPrescricaoAnos(y(8)), 12);
  assert.equal(c.prazoPrescricaoAnos(y(4)), 8);
  assert.equal(c.prazoPrescricaoAnos(y(2)), 4);
  assert.equal(c.prazoPrescricaoAnos(y(1)), 4);
  assert.equal(c.prazoPrescricaoAnos(y(1) - 1), 3);
  const base = { executoria: true, reincidente: true, reduzPelaIdade: false, violenciaSexualContraMulher: false };
  assert.equal(c.prescricao(y(4), base).meses, 128);
  assert.equal(c.prescricao(y(4), { ...base, executoria: false, reincidente: true, reduzPelaIdade: true }).meses, 48);
  assert.equal(c.prescricao(y(4), { ...base, executoria: false, reincidente: false, reduzPelaIdade: true, violenciaSexualContraMulher: true }).meses, 96);
});


test('benefícios usam pena total, sem redução ao limite de cumprimento (Súmula 715)', () => {
  const inicio = c.parseDate('2026-01-01');
  const out = c.marcoExecucao(inicio, P(50), {num:1,den:2}, 0, 0);
  assert.equal(out.totalDias, c.diasEntre(inicio,c.addPena(inicio,P(50))));
  assert.equal(out.exigidosDias, Math.ceil(out.totalDias / 2));
  assert.ok(out.exigidosDias > 24 * 365);
  assert.equal(out.limiteQuarentaAnos, true);
});

test('datas civis e fim de mês não dependem do fuso do dispositivo', () => {
  assert.throws(() => c.parseDate('2026-02-30'), /existente/);
  assert.throws(() => c.parseDate(''), /válida/);
  assert.equal(c.formatBr(c.parseDate('2026-10-14')), '14/10/2026');
  assert.equal(c.toIso(c.addPena(c.parseDate('2026-01-31'),P(0,1))), '2026-02-28');
  assert.equal(c.toIso(c.addPena(c.parseDate('2024-02-29'),P(1))), '2025-02-28');
});

test('dosimetria despreza fração de dia e rejeita valores inválidos', () => {
  const input = {min:P(0,0,1),max:P(0,0,2),circunstanciasNegativas:1,fracaoCircunstancia:{num:1,den:8},agravantes:0,atenuantes:0,fracaoAgravanteAtenuante:{num:1,den:6},aumentos:[{num:2,den:3}],diminuicoes:[]};
  assert.equal(c.dosimetria(input).final, 1);
  assert.throws(()=>c.dosimetria({...input,circunstanciasNegativas:9}),/Circunstâncias/);
  assert.throws(()=>c.dosimetria({...input,diminuicoes:[{num:1,den:0}]}),/Fração/);
  assert.throws(()=>c.penaParaDias(P(1,12)),/meses/);
  assert.throws(()=>c.marcoExecucao(c.parseDate('2026-01-01'),P(0),{num:1,den:6},0,0),/zero/);
  assert.throws(()=>c.prazoPrescricaoAnos(0),/zero/);
});


test('referências de crimes apontam para o diploma e o artigo correto', () => {
  const targets = ['cp121q','cp217a','d33','a16'].map(id => c.crimeStudyTarget(id));
  assert.equal(targets[0].art,'art-121');
  assert.equal(targets[1].art,'art-217-a');
  assert.equal(targets[2].slug,'drogas');
  assert.equal(targets[3].slug,'armas');
  assert.equal(c.crimeStudyTarget('custom'),null);
  assert.equal(c.crimeStudyTarget('cp9999'),null);
});


test('exemplos acompanham os dados e resultados de cada fase, incluindo ausência de causas', async () => {
  const { dosimetryExamples } = await import('../src/lib/penalExamples.ts');
  const input = {min:P(1),max:P(6),circunstanciasNegativas:1,fracaoCircunstancia:{num:1,den:8},agravantes:0,atenuantes:1,fracaoAgravanteAtenuante:{num:1,den:6},aumentos:[],diminuicoes:[]};
  const output = c.dosimetria(input);
  const examples = dosimetryExamples(input,output,'furto');
  assert.equal(examples.length,3);
  assert.match(examples[0].scenario,/furto/);
  assert.match(examples[0].steps[1],new RegExp(String(output.passos[0].dias)));
  assert.match(examples[1].steps[1],new RegExp(String(output.passos[1].dias)));
  assert.match(examples[2].scenario,/nenhuma causa/);
  input.aumentos=[{num:1,den:3}];
  const changed=c.dosimetria(input);
  const newExamples=dosimetryExamples(input,changed,'furto');
  assert.equal(newExamples.length,changed.passos.length);
  assert.match(newExamples.at(-1).steps[0],/1\/3/);
  assert.match(newExamples.at(-1).steps[1],new RegExp(String(changed.final)));
});

test('exemplo de remição acompanha a conclusão e o resultado transferível', async () => {
  const {remitionExample} = await import('../src/lib/penalExamples.ts');
  const result=c.remicaoPorBlocos(12,90,true);
  const example=remitionExample(12,90,true,result);
  assert.equal(result.total,46);
  assert.match(example.conclusion,/46 dias/);
  assert.match(example.scenario,/conclusão certificada/);
  assert.match(example.steps[2],/12 \+ 30 \+ 4 = 46/);
});


test('perfil jurídico distingue hediondez, modalidade e ausência de enquadramento', async () => {
  const {crimePolicy} = await import('../src/lib/penalPolicy.ts');
  const common=crimePolicy('cp157');
  assert.equal(common.classification,'comum');
  assert.equal(crimePolicy('cp121q').classification,'hediondo');
  assert.equal(crimePolicy('cp121').classification,'comum');
  assert.equal(crimePolicy('cp121',true).classification,'hediondo');
  assert.equal(crimePolicy('d33').classification,'equiparado');
  assert.equal(crimePolicy('a16').classification,'comum','uso restrito não é automaticamente uso proibido');
  assert.ok(crimePolicy('custom').rules.every(r=>r.state==='nao-avaliado'));
  const rules=Object.fromEntries(crimePolicy('cp213').rules.map(r=>[r.title,r]));
  for(const name of ['Fiança','Indulto','Graça','Anistia']) assert.equal(rules[name].state,'vedado');
  assert.equal(rules['Progressão'].state,'condicionado','hediondez não elimina progressão');
  assert.match(rules['Fiança'].explanation,/não determina prisão/);
  assert.equal(common.rules.find(r=>r.title==='Indulto').label,'Depende do decreto');
});

test('execução impede perfis incompatíveis sem transformar requisitos em concessões', async () => {
  const {crimePolicy,compatibleProgression,compatibleParole}=await import('../src/lib/penalPolicy.ts');
  const rape=crimePolicy('cp213'),murder=crimePolicy('cp121q'),theft=crimePolicy('cp155'),robbery=crimePolicy('cp157');
  assert.equal(compatibleProgression(rape,'base'),false);
  assert.equal(compatibleProgression(rape,'v'),true);
  assert.equal(compatibleProgression(murder,'v'),false);
  assert.equal(compatibleProgression(murder,'via'),true);
  assert.equal(compatibleProgression(theft,'i'),false);
  assert.equal(compatibleProgression(robbery,'base'),false);
  assert.equal(compatibleProgression(robbery,'i'),true);
  assert.equal(compatibleParole(rape,'terco','manual',false),false);
  assert.equal(compatibleParole(rape,'doistercos','v',false),true);
  assert.equal(compatibleParole(rape,'doistercos','v',true),false);
  assert.equal(compatibleParole(murder,'doistercos','via',false),false);
  assert.equal(compatibleParole(theft,'doistercos','base',false),false);
  assert.equal(compatibleParole(crimePolicy('custom'),'terco','manual',false),false);
});

test('requisitos objetivos da pena atualizam os avisos de benefícios', async()=>{
  const {crimePolicy,policyForSentence}=await import('../src/lib/penalPolicy.ts');
  const map=p=>Object.fromEntries(p.rules.map(r=>[r.title,r.state]));
  assert.equal(map(policyForSentence(crimePolicy('cp129'),90,true,false))['Livramento condicional'],'vedado');
  assert.equal(map(policyForSentence(crimePolicy('cp157'),2160,true,false))['Substituição'],'vedado');
  assert.equal(map(policyForSentence(crimePolicy('cp157'),2160,true,false))['Sursis'],'vedado');
  assert.equal(map(policyForSentence(crimePolicy('d33'),720,false,false))['Sursis'],'vedado');
  assert.equal(map(policyForSentence(crimePolicy('cp155'),720,false,false))['Substituição'],'condicionado');
});


test('saída temporária e monitoração não são inferidas como concessões', async()=>{
  const {crimePolicy}=await import('../src/lib/penalPolicy.ts');
  const find=(id,title)=>crimePolicy(id).rules.find(r=>r.title===title);
  assert.equal(find('cp157','Saída temporária').state,'vedado');
  assert.equal(find('cp213','Saída temporária').state,'vedado');
  assert.equal(find('cp155','Saída temporária').state,'condicionado');
  assert.equal(find('d33','Saída temporária').state,'condicionado','não estender a expressão hediondo sem examinar alcance no equiparado');
  assert.match(find('cp155','Saída temporária').explanation,/visitas familiares/);
  assert.equal(find('cp213','Monitoração eletrônica').state,'condicionado');
  assert.match(find('cp213','Monitoração eletrônica').explanation,/não afasta uma vedação/);
  assert.equal(find('custom','Monitoração eletrônica').state,'nao-avaliado');
});


test('perfil compartilhado sugere progressão conforme primariedade e espécie de reincidência',async()=>{
 const {INITIAL_OFFENDER,recommendedProgression,offenderCategoryCompatible}=await import('../src/lib/penalOffender.ts');
 const {crimePolicy}=await import('../src/lib/penalPolicy.ts');
 const primary={...INITIAL_OFFENDER},generic={...primary,kind:'recurrent'},specific={...generic,specificSpecial:true};
 assert.equal(recommendedProgression(crimePolicy('cp157'),primary).id,'i');
 assert.equal(recommendedProgression(crimePolicy('cp157'),generic).id,'ii');
 assert.equal(recommendedProgression(crimePolicy('cp155'),primary).id,'base');
 assert.equal(recommendedProgression(crimePolicy('cp155'),generic).id,'iii');
 assert.equal(recommendedProgression(crimePolicy('cp213'),primary).id,'v');
 assert.equal(recommendedProgression(crimePolicy('cp213'),generic).id,'manual');
 assert.equal(recommendedProgression(crimePolicy('cp213'),specific).id,'vii');
 assert.equal(recommendedProgression(crimePolicy('cp121q'),specific).id,'viii');
 assert.equal(offenderCategoryCompatible(crimePolicy('cp157'),generic,'i'),false);
});

test('livramento exige antecedentes/natureza informados e respeita a vedação específica',async()=>{
 const {INITIAL_OFFENDER,recommendedParole}=await import('../src/lib/penalOffender.ts');
 const {crimePolicy}=await import('../src/lib/penalPolicy.ts');
 const common=crimePolicy('cp155'),special=crimePolicy('cp213');
 assert.equal(recommendedParole(common,INITIAL_OFFENDER,'base').id,'vedado','primariedade não prova antecedentes');
 assert.equal(recommendedParole(common,{...INITIAL_OFFENDER,record:'good'},'base').id,'terco');
 assert.equal(recommendedParole(common,{...INITIAL_OFFENDER,kind:'recurrent'},'iii').id,'vedado');
 assert.equal(recommendedParole(common,{...INITIAL_OFFENDER,kind:'recurrent',previousIntent:'intentional'},'iii').id,'metade');
 assert.equal(recommendedParole(special,{...INITIAL_OFFENDER,kind:'recurrent',specificSpecial:true},'vii').id,'vedado');
 assert.equal(recommendedParole(special,INITIAL_OFFENDER,'v').id,'doistercos');
});


test('avisos do painel acompanham falta de dados e vedação do perfil compartilhado',async()=>{
 const {INITIAL_OFFENDER,policyForOffender}=await import('../src/lib/penalOffender.ts');
 const {crimePolicy}=await import('../src/lib/penalPolicy.ts');
 const rule=(p,title)=>p.rules.find(r=>r.title===title);
 assert.equal(rule(policyForOffender(crimePolicy('cp155'),INITIAL_OFFENDER),'Livramento condicional').state,'nao-avaliado');
 const specific={...INITIAL_OFFENDER,kind:'recurrent',specificSpecial:true};
 assert.equal(rule(policyForOffender(crimePolicy('cp213'),specific),'Livramento condicional').state,'vedado');
 assert.equal(rule(policyForOffender(crimePolicy('cp213'),{...INITIAL_OFFENDER,kind:'recurrent'}),'Progressão').state,'nao-avaliado');
});
