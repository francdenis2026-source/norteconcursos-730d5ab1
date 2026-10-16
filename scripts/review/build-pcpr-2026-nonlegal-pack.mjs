// Pacote da prova PC-PR 2026 para as questões sem conferência legal (Português, RLM, TI, Forense, Exatas...).
// Usa o texto do caderno FGV já conferido; itens que dependem de figura ficam em revisão.
// Uso: node --env-file=.env.local scripts/review/build-pcpr-2026-nonlegal-pack.mjs [--prep]
import { writeFile } from 'node:fs/promises';
import { NORMAS } from './pcpr-2026-legal-table.mjs';
const U = process.env.VITE_SUPABASE_URL, K = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json' };
const api = async (path, method = 'GET', body, prefer = 'return=representation') => {
  const r = await fetch(`${U}/rest/v1/${path}`, { method, headers: { ...H, Prefer: prefer }, body: body && JSON.stringify(body) });
  const t = await r.text(); if (!r.ok) throw Error(`${method} ${path}: ${t}`); return t ? JSON.parse(t) : null;
};
const NOW = new Date().toISOString();
const MARK = 'Gabarito PRELIMINAR (13/10/2026), pendente de gabarito definitivo FGV: conferir e remover esta marca quando o definitivo sair.';
const EDITAL = 'https://conhecimento.fgv.br/sites/default/files/concursos/copia-1-de-edital-01-2026-pcpr-publicacao.docx.pdf';
// Itens que dependem de figura, tabela ou gráfico do caderno (a plataforma ainda não exibe imagens) ou de jurisprudência.
const FIGURA = []; // figuras já enviadas por upload-pcpr-2026-figures.mjs
const JURIS = [];
const BASE = {
  A47: [['l13709', 'arts. 42 a 45'], ['cp', 'art. 171, § 2º-A']],
  A50: [['cpp', 'art. 70, § 4º'], ['cp', 'art. 171, § 2º-A']],
  A58: [['cp', 'art. 154-A']],
  A59: [['l12965', 'arts. 2º e 3º'], ['l13709', 'arts. 1º e 6º']],
  A49: [['l12965', 'art. 19'], ['j_t987', 'Tema 987'], ['d12975', 'art. 19-A (Decreto 8.771/2016)']],
};
const q = 'contest_name=eq.Pol%C3%ADcia%20Civil%20do%20Estado%20do%20Paran%C3%A1&exam_year=eq.2026&legal_review_required=is.false&content_status=eq.under_review&order=career_name,item_number&limit=500';
const rows = await api(`board_exam_questions?select=*&${q}`);
const key = (r) => r.career_name[0] + r.item_number;
const groups = {};
for (const r of rows) (groups[r.stem.slice(0, 80)] ??= []).push(key(r));
const keysOf = (r) => groups[r.stem.slice(0, 80)];
const pend = (r) => keysOf(r).some((k) => FIGURA.includes(k) || JURIS.includes(k));
const baseOf = (r) => BASE[keysOf(r).find((k) => BASE[k])] ?? [];
if (process.argv.includes('--prep')) {
  const used = new Set(Object.values(BASE).flat().map(([k]) => k));
  for (const k of used) {
    const [title, url, type] = NORMAS[k];
    await api('content_sources?on_conflict=url', 'POST', { source_type: type ?? 'lei', title, issuer: k.startsWith('j_') ? (/stj/.test(url) ? 'STJ' : 'STF') : 'Presidência da República', url, checked_at: NOW, status: 'vigente', is_official: true, notes: 'Conferido em 16/10/2026.' }, 'resolution=ignore-duplicates,return=minimal');
  }
  for (const r of rows) {
    const note = pend(r)
      ? `${MARK} Depende de figura, tabela ou gráfico do caderno (ou de jurisprudência): permanece em revisão até a plataforma exibir a figura.`
      : `${r.review_note ?? ''}\nContexto conferido em 16/10/2026: enunciado e alternativas idênticos ao caderno oficial FGV (Tipo 1); ${r.figure_urls?.length ? 'figura(s) do caderno anexada(s) à questão' : 'sem figura necessária'}.`.trim();
    await api(`board_exam_questions?id=eq.${r.id}`, 'PATCH', pend(r) ? { review_note: note } : { needs_visual: false, review_note: note }, 'return=minimal');
  }
  console.log('preparação aplicada');
}
const fresh = await api(`board_exam_questions?select=*&${q}`);
const items = fresh.filter((r) => !pend(r)).map((r) => {
  const basis = baseOf(r).map(([n, artigo]) => ({ url: NORMAS[n][1], norma: NORMAS[n][0], artigo }));
  const reason = `Enunciado e alternativas conferidos com o caderno oficial FGV (Tipo 1); assunto: ${r.tested_topic}; conteúdo previsto no Anexo I do edital.`;
  return {
    table: 'board_exam_questions', expected: r,
    patch: { content_status: 'active', legal_basis: basis, ...(basis.length ? { law_version_checked_at: NOW } : {}), verified_at: NOW,
      review_note: `${MARK} ${basis.length ? `Vigência conferida em 16/10/2026 no texto consolidado oficial (${basis.map((b) => `${b.norma}, ${b.artigo}`).join('; ')}). ` : ''}${reason}` },
    evidence: { reason, sources: [...new Set([r.source_url, EDITAL, ...basis.map((b) => b.url)])], ...(basis.length ? { legal: true } : {}) },
  };
});
await writeFile('docs/question-review-pcpr-2026-10-16-nao-juridicas.json', JSON.stringify({ verified_at: NOW, scope: 'PC-PR 2026: questões sem conferência legal obrigatória; figuras e jurisprudência ficam em revisão.', items }, null, 2) + '\n');
console.log('ativar:', items.length, '| em revisão:', fresh.length - items.length);
