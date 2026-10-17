import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuestion, isOfficialUrl } from '../src/lib/questionFormat.ts';

test('texto de apoio ligado: rótulo, parágrafos em branco e enunciado separados', () => {
  const raw = 'Texto-base [Texto 1]:\nPrimeiro parágrafo do texto.\n\nSegundo parágrafo do texto.\n\n[[/texto-base]]\nDe acordo com o texto, assinale a correta.\n(A) um\n(B) dois\n(C) três\n(D) quatro\n(E) cinco';
  const p = parseQuestion(raw);
  assert.equal(p.baseLabel, 'Texto 1');
  assert.ok(p.base.includes('Primeiro parágrafo') && p.base.includes('Segundo parágrafo'));
  assert.ok(p.stem.startsWith('De acordo com o texto'));
  assert.equal(p.options.length, 5);
});

test('formato antigo (sem marcador) continua funcionando', () => {
  const p = parseQuestion('Texto-base:\nUm texto curto.\n\nQual é a ideia central?\n(A) a\n(B) b\n(C) c\n(D) d');
  assert.equal(p.baseLabel, 'Texto de apoio');
  assert.equal(p.base, 'Um texto curto.');
  assert.equal(p.options.length, 4);
});

test('PI primary legal URLs accept only the reviewed SAPL compilation', () => {
  assert.equal(isOfficialUrl('https://sapl.al.pi.leg.br/ta/59/text'), true);
  for (const u of ['https://sapl.al.pi.leg.br/ta/60/text','https://sapl.al.pi.leg.br/ta/59/text?old=1','https://sapl.al.pi.leg.br.evil.test/ta/59/text','http://sapl.al.pi.leg.br/ta/59/text']) assert.equal(isOfficialUrl(u), false);
});
test('MT URL approval is limited to the individually reviewed LC407 dated compilation',()=>{
 const u='https://www.al.mt.gov.br/norma-juridica/urn:lex:br;mato.grosso:estadual:lei.complementar:2010-06-30;407/compilado?exibirAnotacao=1&marcoHistorico=2026-10-17';assert.equal(isOfficialUrl(u),true);for(const x of[u.replace(';407/',';408/'),u.replace('2026-10-17','2020-01-01'),u+'&extra=1',u.replace('www.al.mt.gov.br','www.al.mt.gov.br.evil.test')])assert.equal(isOfficialUrl(x),false);
});
