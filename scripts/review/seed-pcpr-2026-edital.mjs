// Cadastra o Edital 01/2026 da PC-PR (FGV) e vincula as questões da prova de 11/10/2026 aos tópicos (por disciplina).
// Uso: node --env-file=.env.local scripts/review/seed-pcpr-2026-edital.mjs <edital.txt>
import { readFileSync } from 'node:fs';
const U = process.env.VITE_SUPABASE_URL, K = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json' };
const api = async (path, method = 'GET', body, prefer = 'return=representation') => {
  const r = await fetch(`${U}/rest/v1/${path}`, { method, headers: { ...H, Prefer: prefer }, body: body && JSON.stringify(body) });
  const t = await r.text(); if (!r.ok) throw Error(`${method} ${path}: ${t}`); return t ? JSON.parse(t) : null;
};
const CONTEST = 'Polícia Civil do Estado do Paraná', YEAR = 2026;
const lines = readFileSync(process.argv[2], 'utf8').split('\n').slice(1279);
const roles = { 'AGENTE DE POLÍCIA JUDICIÁRIA E PAPILOSCOPISTA POLICIAL': 'GERAIS', 'DELEGADO DE POLÍCIA': 'Delegado de Polícia', 'AGENTE DE POLÍCIA JUDICIÁRIA': 'Agente de Polícia Judiciária', 'PAPILOSCOPISTA POLICIAL': 'Papiloscopista Policial' };
const disc = {}; let cur = null, bloco = 'Conhecimentos específicos';
for (const l of lines.map(s => s.trim())) {
  if (roles[l]) { cur = roles[l]; disc[cur] = []; bloco = 'Conhecimentos específicos'; continue; }
  if (/^ANEXO II/.test(l)) break;
  if (/^CONHECIMENTOS GERAIS/.test(l)) bloco = 'Conhecimentos gerais';
  if (/^CONHECIMENTOS ESPEC/.test(l)) bloco = 'Conhecimentos específicos';
  const m = cur && l.match(/^(\d+)\.\s+(\S[^:]{3,120}):/);
  if (m) disc[cur].push({ bloco, n: +m[1], name: m[2].trim(), text: l });
}
for (const r of ['Agente de Polícia Judiciária', 'Papiloscopista Policial']) disc[r].unshift(...disc.GERAIS.map(d => ({ ...d, bloco: 'Conhecimentos gerais' })));
delete disc.GERAIS;
const src = async (row) => (await api('content_sources?on_conflict=url', 'POST', row, 'resolution=merge-duplicates,return=representation'))[0];
const edital = await src({ source_type: 'edital', title: 'Edital nº 01/2026 – Concurso Polícia Civil do Paraná (Delegado, Agente de Polícia Judiciária e Papiloscopista)', issuer: 'FGV / PCPR', url: 'https://conhecimento.fgv.br/sites/default/files/concursos/copia-1-de-edital-01-2026-pcpr-publicacao.docx.pdf', published_on: '2026-07-06', status: 'vigente', is_official: true, notes: 'Retificado em 31/07/2026 (Edital nº 02/2026), que alterou o item 6.6/5.6 do Anexo I (Lei estadual 6.174/1970).' });
await src({ source_type: 'edital', title: 'Edital nº 02/2026 – Retificação do Edital 01/2026 PC-PR', issuer: 'FGV / PCPR', url: 'https://conhecimento.fgv.br/sites/default/files/concursos/edital-02-2026-pcpr-retificacao.docx-1.pdf', published_on: '2026-07-31', status: 'vigente', is_official: true, notes: null });
const out = {};
for (const [role, list] of Object.entries(disc)) {
  const [ed] = await api('syllabus_editions?on_conflict=contest_name,role_name,contest_year', 'POST', { contest_name: CONTEST, role_name: role, contest_year: YEAR, exam_board: 'FGV', source_id: edital.id, status: 'active' }, 'resolution=merge-duplicates,return=representation');
  const topics = list.map((d, i) => ({ edition_id: ed.id, block_name: d.bloco, discipline: d.name, topic_order: d.n + (d.bloco === 'Conhecimentos gerais' ? 100 : 0), topic_text: `${d.name} (Anexo I, item ${d.n}, Edital 01/2026 PC-PR): ${d.text.replace(/^\d+\.\s+[^:]+:\s*/, '').slice(0, 1500)}`, content_status: 'current' }));
  out[role] = await api('syllabus_topics?on_conflict=edition_id,discipline,topic_order', 'POST', topics, 'resolution=merge-duplicates,return=representation');
  console.log(role, ed.id, out[role].length, 'tópicos');
}
// Vincula as questões (subject do caderno -> disciplina do edital)
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
const rows = await api(`board_exam_questions?select=id,career_name,subject&contest_name=eq.${encodeURIComponent(CONTEST)}&exam_year=eq.${YEAR}`);
let linked = 0; const miss = [];
for (const q of rows) {
  const ts = out[q.career_name]; const s = norm(q.subject);
  const t = ts.find(t => norm(t.discipline) === s) || ts.find(t => norm(t.discipline).startsWith(s)) || ts.find(t => s.startsWith(norm(t.discipline).split(' e ')[0]) && norm(t.discipline).split(' ')[0] === s.split(' ')[0]);
  if (!t) { miss.push(`${q.career_name}|${q.subject}`); continue; }
  await api(`board_exam_questions?id=eq.${q.id}`, 'PATCH', { syllabus_topic_id: t.id }, 'return=minimal'); linked++;
}
console.log('vinculadas', linked, '/', rows.length, 'sem tópico:', [...new Set(miss)]);
