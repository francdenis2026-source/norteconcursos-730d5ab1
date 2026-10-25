import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { buildAll, reviewDirectory } from './build-continuation-review.mjs';
import { reviewSql } from './build-first-review.mjs';

export function splitReview(changes, maxBytes = 180000) {
  const render = (items) => reviewSql(items, 'Continuação PC-CE 2021: parte independente; preservar decisões anteriores.');
  const groups = [];
  let pending = [];
  for (const change of changes) {
    if (Buffer.byteLength(render([change])) > maxBytes) throw new Error('Um parecer excede o limite por arquivo');
    if (pending.length && Buffer.byteLength(render([...pending, change])) > maxBytes) {
      groups.push(pending);
      pending = [];
    }
    pending.push(change);
  }
  if (pending.length) groups.push(pending);
  return groups.map((items, index) => ({ file: `parte-${String(index + 1).padStart(2, '0')}.sql`, items, sql: render(items) }));
}

export function writeParts() {
  const { changes } = buildAll();
  const parts = splitReview(changes);
  const directory = path.join(reviewDirectory, 'partes');
  fs.mkdirSync(directory, { recursive: true });
  const manifest = parts.map(({ file, items, sql }) => {
    fs.writeFileSync(path.join(directory, file), sql);
    return { file, bytes: Buffer.byteLength(sql), sha256: createHash('sha256').update(sql).digest('hex'), decisions: items.length, candidate_ids: items.map((c) => c.candidate) };
  });
  fs.writeFileSync(path.join(directory, 'manifesto.json'), JSON.stringify({ max_bytes: 180000, total_decisions: changes.length, parts: manifest }, null, 2) + '\n');
  fs.writeFileSync(path.join(directory, 'LEIAME.md'), `# Aplicação pelo SQL Editor do Supabase\n\nO arquivo único ultrapassou o limite do editor. Use estas ${parts.length} partes, cada uma com menos de 180 KB.\n\nA primeira revisão de 23 decisões e o acervo inicial devem estar aplicados.\n\n${manifest.map((p, i) => `${i + 1}. [${p.file}](${p.file}) — ${p.decisions} pareceres; ${p.bytes} bytes.`).join('\n')}\n\nAbra uma parte, copie todo o conteúdo, **substitua o conteúdo do SQL Editor** e execute. Repita na ordem acima. Não cole todas juntas. Ao terminar, execute [verificar.sql](verificar.sql).\n\nCada parte tem sua própria transação: se houver erro, apenas essa parte é revertida. As partes já concluídas permanecem aplicadas e podem ser repetidas sem duplicar a auditoria. Uma decisão alterada por outra revisão interrompe a parte e é preservada; não force sua substituição.\n\nResultado esperado ao concluir: 192 reviewed (publicação retida), 5 obsolete, 3 rejected e 0 under_review; nenhuma publicação autorizada. Este pacote não ativa questões. A aplicação remota não foi verificada.\n`);
  const { results } = buildAll();
  const ids = results.map((r) => `'${r.previous.source.id}'`).join(',');
  // Derive source IDs from the same immutable corpus packs as the updates.
  fs.writeFileSync(path.join(directory, 'verificar.sql'), `-- Somente leitura: resultado esperado 192 reviewed, 5 obsolete, 3 rejected.\nselect s.title, c.content_status, count(*) as candidates,\n count(*) filter (where c.payload ? 'publication' or c.payload#>>'{individual_review,publication_approved}' = 'true') as publicacoes_autorizadas\nfrom public.question_corpus_sources s\njoin public.question_corpus_candidates c on c.corpus_id = s.id\nwhere s.id in (${ids})\ngroup by s.title,c.content_status order by s.title,c.content_status;\n`);
  return manifest;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(writeParts().map(({file,bytes,decisions}) => ({file,bytes,decisions}))));
