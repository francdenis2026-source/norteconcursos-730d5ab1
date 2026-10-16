// Monta o pacote de revisão da prova PC-PR 2026 a partir de pcpr-2026-legal-table.mjs.
// Uso: node --env-file=.env.local scripts/review/build-pcpr-2026-pack.mjs [--prep]
//   sem flag: só lê o banco e grava docs/question-review-pcpr-2026-10-16.json
//   --prep  : antes, registra as fontes, limpa needs_visual (texto conferido contra o caderno) e anota o motivo nas que seguem em revisão
import { writeFile } from 'node:fs/promises';
import { TABLE, NORMAS } from './pcpr-2026-legal-table.mjs';

const U = process.env.VITE_SUPABASE_URL, K = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json' };
const api = async (path, method = 'GET', body, prefer = 'return=representation') => {
  const r = await fetch(`${U}/rest/v1/${path}`, { method, headers: { ...H, Prefer: prefer }, body: body && JSON.stringify(body) });
  const t = await r.text();
  if (!r.ok) throw Error(`${method} ${path}: ${t}`);
  return t ? JSON.parse(t) : null;
};
const NOW = new Date().toISOString();
const MARK = 'Gabarito PRELIMINAR (13/10/2026), pendente de gabarito definitivo FGV: conferir e remover esta marca quando o definitivo sair.';
const rows = await api('board_exam_questions?select=*&contest_name=eq.Pol%C3%ADcia%20Civil%20do%20Estado%20do%20Paran%C3%A1&exam_year=eq.2026&legal_review_required=is.true&content_status=eq.under_review&order=career_name,item_number&limit=500');
const keyOf = (r) => {
  const own = r.career_name[0] + r.item_number;
  return TABLE[own] ? own : 'A' + r.item_number; // Papiloscopista repete as questões comuns do Agente
};
const entry = (r) => {
  const e = TABLE[keyOf(r)];
  if (!e) throw Error(`sem entrada: ${r.career_name} ${r.item_number}`);
  return e;
};
const missing = rows.filter((r) => !TABLE[keyOf(r)]);
if (missing.length) throw Error('sem entrada: ' + missing.map((r) => r.career_name[0] + r.item_number));

if (process.argv.includes('--prep')) {
  const used = new Map();
  for (const r of rows) for (const [n] of entry(r)[1]) used.set(n, NORMAS[n]);
  for (const [n, [title, url]] of used) {
    const isPr = /^(pr|cepr)/.test(n), isCf = n === 'cf' || n === 'cepr', isDec = n === 'd6949', isOds = n === 'ods';
    await api('content_sources?on_conflict=url', 'POST', {
      source_type: NORMAS[n][2] ?? (isCf ? 'constituicao' : isDec ? 'decreto' : isOds ? 'outro' : 'lei'), title, issuer: isOds ? 'ONU' : isPr ? 'Governo do Estado do Paraná' : n === 'j_cidh' ? 'OEA' : n === 'j_ohchr' ? 'ONU' : n === 'j_gelman' ? 'Corte IDH' : n.startsWith('j_') ? (/stj/.test(url) ? 'STJ' : 'STF') : 'Presidência da República', url,
      checked_at: NOW, status: 'vigente', is_official: true, notes: 'Texto consolidado conferido em 16/10/2026 para a revisão da prova PC-PR 2026.',
    }, 'resolution=ignore-duplicates,return=minimal');
  }
  console.log('fontes registradas:', used.size);
  for (const r of rows.filter((r) => r.needs_visual && entry(r)[0] === 'A')) {
    await api(`board_exam_questions?id=eq.${r.id}`, 'PATCH', { needs_visual: false, review_note: `${r.review_note ?? ''}\nContexto conferido em 16/10/2026: enunciado e alternativas idênticos ao caderno oficial FGV (Tipo 1); sem figura ou tabela.`.trim() }, 'return=minimal');
  }
  for (const r of rows.filter((r) => entry(r)[0] === 'P')) {
    await api(`board_exam_questions?id=eq.${r.id}`, 'PATCH', { review_note: `${MARK} Conferência legal em 16/10/2026: ${entry(r)[2]}` }, 'return=minimal');
  }
  console.log('preparação aplicada');
}

const fresh = await api('board_exam_questions?select=*&contest_name=eq.Pol%C3%ADcia%20Civil%20do%20Estado%20do%20Paran%C3%A1&exam_year=eq.2026&legal_review_required=is.true&content_status=eq.under_review&order=career_name,item_number&limit=500');
const items = fresh.filter((r) => entry(r)[0] === 'A').map((r) => {
  const [, base, motivo] = entry(r);
  const basis = base.map(([n, artigo]) => ({ url: NORMAS[n][1], norma: NORMAS[n][0], artigo }));
  return {
    table: 'board_exam_questions',
    expected: r,
    patch: {
      content_status: 'active',
      legal_basis: basis,
      law_version_checked_at: NOW,
      verified_at: NOW,
      review_note: `${MARK} Vigência conferida em 16/10/2026 no texto consolidado oficial (${basis.map((b) => `${b.norma}, ${b.artigo}`).join('; ')}). ${motivo}`,
    },
    evidence: { legal: true, reason: motivo, sources: [...new Set(basis.map((b) => b.url))] },
  };
});
await writeFile('docs/question-review-pcpr-2026-10-16.json', JSON.stringify({ verified_at: NOW, scope: 'PC-PR 2026 (FGV), questões com conferência legal pendente; gabarito preliminar mantido.', items }, null, 2) + '\n');
console.log('itens para ativar:', items.length, '| permanecem em revisão:', fresh.length - items.length);
