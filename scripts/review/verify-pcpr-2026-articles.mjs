// Confere se cada artigo citado na tabela existe e não está revogado no texto compilado do Planalto.
// Uso: node scripts/review/verify-pcpr-2026-articles.mjs <pasta com os <norma>.txt>
import { readFileSync, existsSync } from 'node:fs';
import { TABLE, NORMAS } from './pcpr-2026-legal-table.mjs';
const dir = process.argv[2];
const cache = {};
const text = (k) => (cache[k] ??= existsSync(`${dir}/${k}.txt`) ? readFileSync(`${dir}/${k}.txt`, 'utf8').replace(/ /g, ' ').replace(/\s+/g, ' ') : null);
const numbers = (s) => [...s.replace(/§§?\s*[\dºo\s,e-]+/g, ' ').matchAll(/\b(\d{1,3}(?:-[A-Z])?)[º°o]?\b/g)].map((m) => m[1]);
let bad = 0;
for (const [key, [st, base]] of Object.entries(TABLE)) {
  if (st !== 'A') continue;
  for (const [n, art] of base) {
    if (n === 'ods' || n.startsWith('j_') || n.startsWith('pr') || n === 'cepr' || n === 'd678' || n === 'd6949') continue;
    const t = text(n);
    if (!t) { console.log(`${key} ${n}: texto ausente`); bad++; continue; }
    for (const num of numbers(art)) {
      const m = new RegExp(`Art\\. ${num}[º°o]?(?![\\d-])`).exec(t);
      if (!m) { console.log(`${key} ${n} art. ${num}: NÃO ENCONTRADO`); bad++; continue; }
      const body = t.slice(m.index, t.indexOf(' Art. ', m.index + 8) > 0 ? t.indexOf(' Art. ', m.index + 8) : m.index + 3000).slice(0, 6000);
      const revog = /^Art\. [^ ]+ ?[-–]? ?\(?(Revogad|VETAD)/.test(body.slice(0, 60)) || /^Art\. \S+ \(Revogado/.test(body);
      const recent = [...new Set([...body.matchAll(/Lei(?: Complementar)? ?n[º°o] ?(\d+\.\d+), de 202[56]/g)].map((x) => x[1]))];
      if (revog) { console.log(`${key} ${n} art. ${num}: REVOGADO?`); bad++; }
      if (recent.length) console.log(`${key} ${n} art. ${num}: alterado em 2025/26 por ${recent.join(', ')}`);
    }
  }
}
console.log(bad ? `${bad} problema(s)` : 'todas as citações encontradas e sem revogação aparente');
