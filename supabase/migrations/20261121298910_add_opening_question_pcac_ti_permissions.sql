-- Add the missing opening question for the ninth active IT lesson.
with lesson as (
 select
 'pcac-2026-ti-sistemas-operacionais-arquivos-permissoes'::text slug,
 E'Sistemas operacionais e permissões de arquivos'::text title,
 E'No Linux, um arquivo possui permissão rw-r----- para o proprietário, grupo e outros, respectivamente. Qual alternativa interpreta corretamente essas permissões?'::text question,
 '["A) proprietário lê e escreve; grupo apenas lê; outros não têm permissão.","B) proprietário apenas lê; grupo lê e escreve; outros executam.","C) todos podem ler e escrever.","D) proprietário executa; grupo e outros leem.","E) ninguém possui permissão."]'::jsonb options,
 'A'::text answer,
 E'rw- significa leitura (r) e escrita (w), sem execução (x), para o proprietário. r-- significa apenas leitura para o grupo. --- significa nenhuma permissão para outros. Leia os três blocos sempre na ordem proprietário, grupo e outros. A ordem das letras é leitura, escrita e execução.'::text solution
),
blocks as (
 select *,
 E'\n\n---\n\n# Questão de abertura — '||title||E'\n\n_Questão autoral no estilo de concursos públicos — elaborada para estudo, não é transcrição de prova oficial._\n\n**Questão:** '||question||E'\n\n'||
 (select string_agg(chr(10)||opt,' ' order by ord) from jsonb_array_elements_text(options) with ordinality x(opt,ord))||
 E'\n\n**Antes de continuar:** tente responder sem consultar a resolução.\n\n' opening,
 E'\n\n---\n\n# Resolução comentada da questão de abertura\n\n**Gabarito: '||answer||'.** '||solution||E'\n\n' closing
 from lesson
)
update public.study_materials m
set body_md=b.opening||m.body_md||b.closing,updated_at=now()
from blocks b
where m.slug=b.slug and m.contest_name='PC-AC 2026'
and m.discipline='Tecnologia da Informação e Segurança da Informação'
and m.content_status='active'
and m.body_md not like '%# Questão de abertura —%';
