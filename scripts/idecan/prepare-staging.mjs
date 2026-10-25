import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateCorpus } from '../import-question-corpus.mjs';

export function stagingSql(packs) {
  if (!packs.length) throw Error('Nenhum lote');
  for (const pack of packs) {
    validateCorpus(pack);
    if (pack.candidates.some((c) => c.content_status !== 'under_review' || c.payload.publication))
      throw Error('Este arquivo permite apenas acervo privado pendente de revisão');
  }
  const data = JSON.stringify(packs);
  const delimiter = '$idecan_private_corpus$';
  if (data.includes(delimiter)) throw Error('Delimitador SQL no conteúdo');
  return `-- PC-CE 2021: acervo privado para revisão, NÃO questões ativas.
-- Executar manualmente no SQL Editor, após revisão; requer as tabelas question_corpus_* existentes.
-- Transação atômica; reexecução preserva revisões existentes e nunca sobrescreve provas/treinos.
begin;
do $stage$
declare
  pack jsonb;
  src jsonb;
begin
  for pack in select value from jsonb_array_elements(${delimiter}${data}${delimiter}::jsonb) loop
    src := pack->'source';
    if exists(select 1 from public.question_corpus_sources s
      where s.id = src->>'id' and s.raw_text is distinct from src->>'raw_text') then
      raise exception 'Fonte existente divergente; importação interrompida';
    end if;
    insert into public.question_corpus_sources(id,title,publisher,publication_year,page_count,metadata,raw_text)
    values(src->>'id',src->>'title',src->>'publisher',(src->>'publication_year')::integer,
      (src->>'page_count')::integer,src->'metadata',src->>'raw_text')
    on conflict(id) do nothing;
    if exists(select 1 from jsonb_array_elements(pack->'candidates') x
      join public.question_corpus_candidates c on c.id=x->>'id'
      where c.corpus_id is distinct from x->>'corpus_id'
        or c.source_key is distinct from x->>'source_key'
        or c.payload->>'raw_text' is distinct from x->'payload'->>'raw_text') then
      raise exception 'Candidato existente divergente; importação interrompida';
    end if;
    insert into public.question_corpus_candidates(id,corpus_id,source_key,discipline,source_page,payload,content_status)
    select x.id,x.corpus_id,x.source_key,x.discipline,x.source_page,x.payload,'under_review'
    from jsonb_to_recordset(pack->'candidates') as x(id text,corpus_id text,source_key text,
      discipline text,source_page integer,payload jsonb)
    on conflict(id) do nothing;
    if (select count(*) from public.question_corpus_candidates c
      where c.corpus_id = src->>'id' and c.id in
        (select x->>'id' from jsonb_array_elements(pack->'candidates') x))
      <> jsonb_array_length(pack->'candidates') then
      raise exception 'Contagem de confirmação divergente';
    end if;
  end loop;
end $stage$;
commit;
-- Resultado de leitura: estado real após a aplicação, incluindo revisões já existentes.
select s.title,c.content_status,count(*) as candidates
from public.question_corpus_sources s join public.question_corpus_candidates c on c.corpus_id=s.id
where s.id in (${packs.map((p) => `'${p.source.id}'`).join(',')})
group by s.title,c.content_status order by s.title,c.content_status;
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const directory = process.argv[2] ?? 'supabase/imports/idecan';
  const packs = ['inspetor', 'escrivao'].map((career) => JSON.parse(fs.readFileSync(path.join(directory, `pcce_${career}_2021_corpus.json`))));
  const output = path.join(directory, 'pcce_2021_acervo_privado.sql');
  fs.writeFileSync(output, stagingSql(packs));
  console.log(`SQL preparado: ${output}; ${packs.reduce((n, p) => n + p.candidates.length, 0)} candidatos; nenhuma execução no banco.`);
}
