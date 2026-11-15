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
test('CFC approval accepts only the reviewed primary accounting PDFs',()=>{
 for(const name of ['NBCTG27(R4)_rev18.pdf','NBCTG23(R2)_rev13.pdf']){
  const url='https://www1.cfc.org.br/sisweb/SRE/docs/'+name;assert.equal(isOfficialUrl(url),true);
  for(const bad of [url+'?old=1',url.replace('https:','http:'),url.replace('www1.cfc.org.br','www1.cfc.org.br.evil.test'),url.replace('/docs/','/personal/'),'https://www1.cfc.org.br/sisweb/SRE/docs/NBCTG99.pdf'])assert.equal(isOfficialUrl(bad),false);
 }
});
test('LC68 URL approval is restricted to the checked public SAPL compilation',()=>{
 const u='https://sapl.al.ro.leg.br/media/sapl/public/anexonormajuridica/1992/20/lei_complementar_no_68_-_alterada_ate_lc_no_1.001_-_05.11.2018..docx';assert.equal(isOfficialUrl(u),true);for(const bad of[u+'?old=1',u.replace('https:','http:'),u.replace('sapl.al.ro.leg.br','sapl.al.ro.leg.br.evil.test'),'https://sapl.al.ro.leg.br/norma/3785'])assert.equal(isOfficialUrl(bad),false);
});

test('Acre legal references accept only reviewed official legislation and the PC-AC notice', () => {
  const approved = [
    'https://legis.ac.gov.br/detalhar/674-1',
    'https://legis.ac.gov.br/detalhar/6874',
    'https://legis.ac.gov.br/detalhar/417-0',
    'https://legis.ac.gov.br/detalhar/6864-1',
    'https://legis.ac.gov.br/detalhar/110',
    'https://legis.ac.gov.br/detalhar_constituicao',
    'https://legis.ac.gov.br/detalhar_emendas/64',
    'https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/9836',
    'https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/9611',
    'https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/5556',
    'https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf',
    'https://www2.camara.leg.br/legin/fed/lei/2023/lei-14735-23-novembro-2023-794983-normaatualizada-pl.html',
    'https://www2.camara.leg.br/legin/fed/lei/2026/lei-15410-20-maio-2026-799133-publicacaooriginal-179393-pl.html',
  ];
  for (const url of approved) assert.equal(isOfficialUrl(url), true, url);
  const rejected = [
    'http://legis.ac.gov.br/detalhar/674-1',
    'https://legis.ac.gov.br/detalhar/674-1?next=evil',
    'https://legis.ac.gov.br/detalhar/9999',
    'https://legis.ac.gov.br/detalhar_constituicao?next=evil',
    'https://legis.ac.gov.br/detalhar_emendas/63',
    'https://www2.camara.leg.br/legin/fed/lei/2023/lei-14735-23-novembro-2023-794983-normaatualizada-pl.html?x=1',
    'https://www2.camara.leg.br/legin/fed/lei/2026/lei-15410-20-maio-2026-799133-publicacaooriginal-179393-pl.html?x=1',
    'https://legis.ac.gov.br.evil.test/detalhar/674-1',
    'https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/9999',
    'https://sead.ac.gov.br/other.pdf',
  ];
  for (const url of rejected) assert.equal(isOfficialUrl(url), false, url);
});
