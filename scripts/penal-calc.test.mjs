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
