import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import vm from 'node:vm';

const compile = (path, require) => {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require, URL });
  return module.exports;
};
const format = compile('src/lib/questionFormat.ts', () => { throw new Error('Unexpected dependency'); });
const { isStudySourceUrl } = compile('src/lib/studySourceUrl.ts', () => format);
test('Library primary sources accept HTTPS while rejecting misleading domains and credentials', () => {
  for (const url of ['https://www.planalto.gov.br/ccivil_03/', 'https://www.rfc-editor.org/rfc/rfc9114.html', 'https://support.microsoft.com/en-us/windows/', 'https://cdn.cebraspe.org.br/concursos/PF_25/edital.pdf']) assert.equal(isStudySourceUrl(url), true);
  for (const url of ['http://www.planalto.gov.br/', 'javascript:alert(1)', 'https://www.gnu.org.attacker.example/', 'https://password@www.gnu.org/', 'https://drive.google.com/private']) assert.equal(isStudySourceUrl(url), false);
  assert.equal(format.isOfficialUrl('https://www.rfc-editor.org/rfc/rfc9114.html'), false);
  assert.equal(isStudySourceUrl('https://cdn.cebraspe.org.br.attacker.example/edital.pdf'), false);
});

test('Syllabus evidence import rejects an unofficial source before database access', () => {
  const directory = mkdtempSync(join(tmpdir(), 'syllabus-test-'));
  try {
    for (const [kind, source] of [['topics', 'special-laws-topics'], ['sources', 'special-laws-sources']]) {
      const report = join(directory, `${kind}-report.json`);
      const run = path => spawnSync(process.execPath, [`scripts/import-library-${kind}.mjs`, path, report, '--dry-run'], { env: { ...process.env, TASK_SUPABASE_KEY: '', TASK_SUPABASE_PROJECT: '' }, encoding: 'utf8' });
      const path = `docs/library/${source}-2026-10-04.json`;
      assert.equal(run(path).status, 0);
      const rows = JSON.parse(readFileSync(path));
      rows[0][kind === 'topics' ? '_source_url' : 'url'] = 'https://cdn.cebraspe.org.br.attacker.example/edital.pdf';
      const invalid = join(directory, `${kind}-invalid.json`);
      writeFileSync(invalid, JSON.stringify(rows));
      assert.notEqual(run(invalid).status, 0);
    }
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
test('Importer dry run does not need credentials and rejects duplicate slugs', () => {
  const directory = mkdtempSync(join(tmpdir(), 'library-test-'));
  try {
    const report = join(directory, 'report.json');
    const env = { ...process.env, TASK_SUPABASE_KEY: '', TASK_SUPABASE_PROJECT: '', TASK_LIBRARY_REVIEWER: '' };
    const run = path => spawnSync(process.execPath, ['scripts/import-library-materials.mjs', path, report, '--dry-run'], { env, encoding: 'utf8' });
    const source = 'docs/library/materials-2026-10-04.json';
    assert.equal(run(source).status, 0);
    assert.equal(JSON.parse(readFileSync(report)).validated, 26);
    assert.equal(run('docs/library/special-laws-2026-10-04.json').status, 0);
    assert.equal(JSON.parse(readFileSync(report)).validated, 35);
    const row = JSON.parse(readFileSync(source))[0];
    const invalid = join(directory, 'duplicate.json');
    writeFileSync(invalid, JSON.stringify([row, row]));
    assert.notEqual(run(invalid).status, 0);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
