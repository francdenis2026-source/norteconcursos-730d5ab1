// Grava tested_topic nas questões da prova PC-PR 2026. Uso: node --env-file=.env.local scripts/review/apply-pcpr-2026-topics.mjs
import { TOPICS } from './pcpr-2026-topics.mjs';
const U = process.env.VITE_SUPABASE_URL, K = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json' };
const T = 'board_exam_questions';
const res = await fetch(`${U}/rest/v1/${T}?select=id,career_name,item_number,stem&contest_name=eq.Pol%C3%ADcia%20Civil%20do%20Estado%20do%20Paran%C3%A1&exam_year=eq.2026&limit=500`, { headers: H });
const rows = await res.json();
const key = (r) => r.career_name[0] + r.item_number;
const groups = {};
for (const r of rows) (groups[r.stem.slice(0, 80)] ??= []).push(r);
let done = 0; const miss = [];
for (const r of rows) {
  const k = groups[r.stem.slice(0, 80)].map(key).find((x) => TOPICS[x]);
  if (!k) { miss.push(key(r)); continue; }
  const p = await fetch(`${U}/rest/v1/${T}?id=eq.${r.id}`, { method: 'PATCH', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ tested_topic: TOPICS[k] }) });
  if (!p.ok) throw Error(await p.text());
  done++;
}
console.log('gravadas', done, '/', rows.length, 'sem tópico:', miss.join(' '));
