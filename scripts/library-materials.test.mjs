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
  for (const url of ['https://www.planalto.gov.br/ccivil_03/', 'https://www.rfc-editor.org/rfc/rfc9114.html', 'https://support.microsoft.com/en-us/windows/']) assert.equal(isStudySourceUrl(url), true);
  for (const url of ['http://www.planalto.gov.br/', 'javascript:alert(1)', 'https://www.gnu.org.attacker.example/', 'https://password@www.gnu.org/', 'https://drive.google.com/private']) assert.equal(isStudySourceUrl(url), false);
  assert.equal(format.isOfficialUrl('https://www.rfc-editor.org/rfc/rfc9114.html'), false);
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
    const row = JSON.parse(readFileSync(source))[0];
    const invalid = join(directory, 'duplicate.json');
    writeFileSync(invalid, JSON.stringify([row, row]));
    assert.notEqual(run(invalid).status, 0);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
