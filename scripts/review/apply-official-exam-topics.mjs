// Grava tested_topic em official_exam_questions (só onde ainda é nulo; não toca texto, gabarito ou status).
// Uso: node --env-file=.env.local scripts/review/apply-official-exam-topics.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const MAP = JSON.parse(readFileSync(new URL('./official-exam-topics.json', import.meta.url), 'utf8'));
const U = process.env.VITE_SUPABASE_URL, K = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' };
const byTopic = {};
for (const [id, t] of Object.entries(MAP)) (byTopic[t] ??= []).push(id);
let done = 0; const failed = [];
const patch = (filter, topic) => fetch(`${U}/rest/v1/official_exam_questions?${filter}&tested_topic=is.null`, { method: 'PATCH', headers: H, body: JSON.stringify({ tested_topic: topic }) });
for (const [topic, ids] of Object.entries(byTopic)) {
  for (let i = 0; i < ids.length; i += 80) {
    const part = ids.slice(i, i + 80);
    // Linhas ativas de disciplina jurídica sem auditoria violam official_exam_questions_active_legal_audit_check (NOT VALID) em qualquer UPDATE: recusadas uma a uma.
    if ((await patch(`id=in.(${part.join(',')})`, topic)).ok) { done += part.length; continue; }
    for (const id of part) { const r = await patch(`id=eq.${id}`, topic); if (r.ok) done++; else failed.push(id); }
  }
}
const c = await fetch(`${U}/rest/v1/official_exam_questions?tested_topic=is.null&select=id`, { headers: { ...H, Prefer: 'count=exact', Range: '0-0' } });
writeFileSync(new URL('./official-exam-topics-blocked.json', import.meta.url), JSON.stringify(failed));
console.log('gravadas', done, '| bloqueadas pela constraint:', failed.length, '| ainda nulas:', '', c.headers.get('content-range'));
