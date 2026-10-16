// Envia as figuras do caderno PC-PR 2026 ao bucket público 'question-figures' e grava figure_urls nas questões.
// Uso: node --env-file=.env.local scripts/review/upload-pcpr-2026-figures.mjs <pasta com as imagens extraídas dos PDFs>
import { readFileSync } from 'node:fs';
const U = process.env.VITE_SUPABASE_URL, K = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dir = process.argv[2];
// cargo+item -> arquivos (os itens comuns de Agente e Papiloscopista usam a mesma figura)
const FIG = {
  'A3,P3': ['agente_p4_Image48.jpg'], 'A9,P9': ['agente_p5_Image51.png'], 'A20,P20': ['agente_p9_Image60.png'], 'A30,P30': ['agente_p11_Image65.png'],
  P62: ['papiloscopista_p21_Image98.jpg'], P74: ['papiloscopista_p23_Image112.png', 'papiloscopista_p23_Image114.png'],
  P76: ['papiloscopista_p24_Image118.png'], P78: ['papiloscopista_p24_Image119.png'], P79: ['papiloscopista_p24_Image120.png'],
};
const mime = (f) => (f.endsWith('.png') ? 'image/png' : 'image/jpeg');
const H = { apikey: K, Authorization: `Bearer ${K}` };
const CONTEST = 'Pol%C3%ADcia%20Civil%20do%20Estado%20do%20Paran%C3%A1';
for (const [keys, files] of Object.entries(FIG)) {
  const urls = [];
  for (const f of files) {
    const path = `pcpr-2026/${f}`;
    const r = await fetch(`${U}/storage/v1/object/question-figures/${path}`, { method: 'POST', headers: { ...H, 'Content-Type': mime(f), 'x-upsert': 'true' }, body: readFileSync(`${dir}/${f}`) });
    if (!r.ok) throw Error(`upload ${f}: ${await r.text()}`);
    urls.push(`${U}/storage/v1/object/public/question-figures/${path}`);
  }
  for (const k of keys.split(',')) {
    const q = `board_exam_questions?contest_name=eq.${CONTEST}&exam_year=eq.2026&career_name=like.${k[0] === 'A' ? 'Agente*' : k[0] === 'P' ? 'Papilo*' : 'Delegado*'}&item_number=eq.${k.slice(1)}`;
    const p = await fetch(`${U}/rest/v1/${q}`, { method: 'PATCH', headers: { ...H, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify({ figure_urls: urls, needs_visual: false }) });
    const rows = await p.json();
    console.log(k, rows.length, 'linha(s)', urls.length, 'figura(s)');
  }
}
