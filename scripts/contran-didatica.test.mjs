import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const load = (file) => { const module = { exports: {} }; vm.runInNewContext(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { module, exports: module.exports, require: () => ({}) }); return module.exports; };
const { CONTRAN_DIDATICA } = load('src/data/contranDidatica.ts');
const EXTRA = { '973/2022': [986, 1012, 1013, 2024] };
const nums = (s) => (s.match(/\d[\d.]*\d|\d/g) ?? []).map((n) => n.replace(/\./g, ''));

test('explicações didáticas só usam números presentes no texto oficial da resolução', () => {
  for (const [key, d] of Object.entries(CONTRAN_DIDATICA)) {
    const [num, year] = key.split('/');
    const path = `public/contran/${num}-${year}.json`;
    assert.ok(existsSync(path), `sem texto oficial para ${key}`);
    const official = JSON.parse(readFileSync(path, 'utf8')).text;
    const extraText = (d.fontes ?? []).map((f) => { const [n, y] = f.split('/'); return JSON.parse(readFileSync(`public/contran/${n}-${y}.json`, 'utf8')).text; });
    const allowed = new Set([...nums(official), ...extraText.flatMap(nums), num, year, ...(d.fontes ?? []).flatMap((f) => f.split('/'))]);
    // números vindos do catálogo oficial (atos que alteraram a norma), declarados à parte
    const extra = (EXTRA[key] ?? []).map(String);
    // exemplos trazem valores hipotéticos e contas; o resto (texto, quadro, atualizações) só cita o que está nos atos
    const { exemplos, ...checked } = d;
    for (const n of nums(JSON.stringify(checked))) {
      if (!allowed.has(n) && !extra.includes(n)) assert.fail(`${key}: número ${n} fora do texto oficial`);
    }
    assert.ok(d.simples.length >= 2 && d.exemplos.length >= 2 && d.pegadinhas.length >= 2, `${key} incompleta`);
  }
});
