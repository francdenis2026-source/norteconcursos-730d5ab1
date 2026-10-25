import test from 'node:test';
import assert from 'node:assert/strict';
import * as t from '../src/lib/disciplineTools.ts';
import { parseDate, toIso } from '../src/lib/penalCalc.ts';

test('diagrama de Venn: regiões e validações', () => {
  const v = t.venn(18, 15, 8, 30);
  assert.deepEqual({ ...v }, { onlyA: 10, onlyB: 7, inter: 8, union: 25, outside: 5 });
  assert.throws(() => t.venn(3, 5, 4));
  assert.throws(() => t.venn(10, 10, 2, 5));
});

test('bases numéricas e unidades de dados', () => {
  assert.deepEqual({ ...t.baseConvert('255', 10) }, { bin: '11111111', oct: '377', dec: '255', hex: 'FF' });
  assert.equal(t.baseConvert('ff', 16).dec, '255');
  assert.equal(t.baseConvert('1010', 2).dec, '10');
  assert.throws(() => t.baseConvert('12', 2));
  const b = t.convertBytes(1, 'GB', true);
  assert.equal(b.MB, 1024);
  assert.equal(t.convertBytes(1, 'GB', false).MB, 1000);
});

test('CIDR: máscara, rede, broadcast e hosts', () => {
  const c = t.cidr('192.168.1.10', 24);
  assert.equal(c.mask, '255.255.255.0');
  assert.equal(c.network, '192.168.1.0');
  assert.equal(c.broadcast, '192.168.1.255');
  assert.equal(c.hosts, 254);
  assert.equal(c.first, '192.168.1.1');
  assert.equal(c.last, '192.168.1.254');
  const d = t.cidr('10.0.0.130', 26);
  assert.equal(d.network, '10.0.0.128');
  assert.equal(d.hosts, 62);
  assert.equal(t.cidr('10.0.0.1', 30).hosts, 2);
  assert.throws(() => t.cidr('300.1.1.1', 24));
  assert.throws(() => t.cidr('10.0.0.1', 33));
});

test('prazos: dia do começo, dias úteis e prorrogação', () => {
  const iso = (ms) => toIso(ms);
  // 2026-10-12 é segunda-feira
  assert.equal(iso(t.somarPrazo('2026-10-12', 10, { excluirInicio: true, diasUteis: false })), '2026-10-22');
  assert.equal(iso(t.somarPrazo('2026-10-12', 10, { excluirInicio: false, diasUteis: false })), '2026-10-21');
  assert.equal(iso(t.somarPrazo('2026-10-12', 5, { excluirInicio: true, diasUteis: true })), '2026-10-19');
  assert.equal(iso(t.proximoDiaUtil(parseDate('2026-10-17'))), '2026-10-19');
  assert.throws(() => t.somarPrazo('2026-10-12', -1, { excluirInicio: true, diasUteis: false }));
});

test('contabilidade e finanças', () => {
  const l = t.liquidez(200, 100, 50, 40, 60);
  assert.equal(l.corrente, 2);
  assert.equal(l.seca, 1.5);
  assert.equal(l.geral, 1.5);
  assert.throws(() => t.liquidez(1, 0));
  const d = t.depreciacaoLinear(12000, 2000, 5);
  assert.equal(d.anual, 2000);
  assert.ok(Math.abs(d.mensal - 166.6667) < 1e-3);
  const p = t.pontoEquilibrio(10000, 50, 30);
  assert.equal(p.unidades, 500);
  assert.equal(p.margem, 20);
  const j = t.jurosCompostos(1000, 10, 2);
  assert.ok(Math.abs(j.montante - 1210) < 1e-9);
  assert.equal(j.simples, 1200);
});

test('distribuição normal: CDF e escore padrão', () => {
  assert.ok(Math.abs(t.normalCdf(0) - 0.5) < 1e-6);
  assert.ok(Math.abs(t.normalCdf(1.96) - 0.975) < 1e-3);
  assert.ok(Math.abs(t.normalCdf(1) - 0.8413) < 1e-3);
  const e = t.escorePadrao(80, 70, 10);
  assert.equal(e.z, 1);
  assert.ok(Math.abs(e.abaixo + e.acima - 1) < 1e-12);
  assert.throws(() => t.escorePadrao(1, 0, 0));
});
