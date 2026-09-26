-- Historical PF syllabuses are retained for cross-career research, but never
-- become active PF 2025 content without a current-source review.
create table if not exists public.syllabus_exclusions (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.syllabus_editions(id) on delete cascade,
  original_item text not null,
  exclusion_type text not null check (exclusion_type in ('revoked','replaced','obsolete','time_bound','outside_active_edital')),
  reason text not null,
  replacement_source_id uuid references public.content_sources(id),
  reviewed_at timestamptz not null default now(),
  unique (edition_id, original_item)
);

alter table public.syllabus_exclusions enable row level security;
create policy "Authenticated users can read syllabus exclusions" on public.syllabus_exclusions for select to authenticated using (true);
create policy "Admins manage syllabus exclusions" on public.syllabus_exclusions for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.content_sources (source_type,title,issuer,url,published_on,status,notes) values
('edital','Edital nº 55/2014 – DGP/DPF – Agente de Polícia Federal','Polícia Federal / CEBRASPE','https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/edital/agente-de-policia-federal-2014/editais-e-comunicados-apf-2014/Edital%20no%2055-2014%20-%20Abertura.PDF','2014-09-25','substituido','Fonte histórica; usar somente após confronto com a matriz ativa.'),
('edital','Edital nº 1/2018 – DGP/PF – Carreira Policial','Polícia Federal / CEBRASPE','https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/edital/carreira-policial-2018/editais/edital-no-1-abertura/view','2018-06-14','substituido','Fonte histórica; usar somente após confronto com a matriz ativa.'),
('edital','Edital nº 1/2021 – DGP/PF – Carreira Policial','Polícia Federal / CEBRASPE','https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/edital/carreira-policial-2021-4/editais/edital-no-1-dgp-pf-15-01-21.pdf','2021-01-15','substituido','Fonte histórica; usar somente após confronto com a matriz ativa.'),
('lei','Lei nº 13.869/2019 – Abuso de Autoridade','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869compilado.htm','2019-09-05','vigente','Substitui a antiga Lei nº 4.898/1965.'),
('lei','Lei nº 14.133/2021 – Licitações e Contratos Administrativos','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm','2021-04-01','vigente','Substitui Lei nº 8.666/1993, Lei nº 10.520/2002 e parte do RDC.'),
('lei','Lei nº 13.445/2017 – Lei de Migração','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm','2017-05-24','vigente','Substitui o Estatuto do Estrangeiro, Lei nº 6.815/1980.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Federal','Agente de Polícia Federal',year,'CEBRASPE',source_id,'archived'
from (values
  (2014,(select id from public.content_sources where url like '%Edital%20no%2055-2014%')),
  (2018,(select id from public.content_sources where url like '%carreira-policial-2018/editais/edital-no-1-abertura/view')),
  (2021,(select id from public.content_sources where url like '%edital-no-1-dgp-pf-15-01-21.pdf'))
) history(year,source_id)
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='archived';

-- Valid, reusable subject families found in earlier notices. They remain tied
-- to their historical edition and do not automatically enter the active one.
with historical as (select id,contest_year from public.syllabus_editions where contest_name='Polícia Federal' and role_name='Agente de Polícia Federal' and contest_year in (2014,2018,2021))
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select h.id,'Histórico',d.discipline,d.topic_order,d.topic_text,'current'
from historical h cross join (values
  ('Língua Portuguesa',1,'Interpretação, gramática, coesão, reescrita e redação oficial.'),
  ('Direito Administrativo',1,'Organização, atos, agentes, poderes, controle e responsabilidade do Estado; atualizar legislação antes do uso.'),
  ('Direito Constitucional',1,'Direitos fundamentais, Poder Executivo, segurança pública e ordem social.'),
  ('Direito Penal e Processual Penal',1,'Parte geral, crimes selecionados, inquérito, prova e prisão; usar somente CP e CPP compilados vigentes.'),
  ('Legislação Especial',1,'Leis especiais pertinentes à atividade policial; cada diploma exige validação individual de vigência.'),
  ('Estatística',1,'Estatística descritiva, probabilidade, inferência e regressão.'),
  ('Raciocínio Lógico',1,'Lógica proposicional, argumentação, conjuntos, contagem e probabilidade.'),
  ('Informática',1,'Fundamentos de sistemas, redes, segurança, bancos de dados e tecnologia; remover produtos e versões superados.'),
  ('Contabilidade Geral',1,'Patrimônio, escrituração, demonstrações e legislação societária vigente.')
) d(discipline,topic_order,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text,content_status='current';

-- Explicit quarantine of revoked, replaced or intrinsically dated material.
with editions as (select id,contest_year from public.syllabus_editions where contest_name='Polícia Federal' and role_name='Agente de Polícia Federal' and contest_year in (2014,2018,2021)),
replacements as (select title,id from public.content_sources)
insert into public.syllabus_exclusions (edition_id,original_item,exclusion_type,reason,replacement_source_id)
select e.id,x.original_item,x.exclusion_type,x.reason,r.id
from editions e
cross join (values
  ('Lei nº 7.102/1983 – segurança privada','replaced','Revogada; o conteúdo atual deve usar a Lei nº 14.967/2024.','Lei nº 14.967/2024 – Estatuto da Segurança Privada'),
  ('Lei nº 4.898/1965 – abuso de autoridade','revoked','Revogada; questões atuais devem usar a Lei nº 13.869/2019.','Lei nº 13.869/2019 – Abuso de Autoridade'),
  ('Lei nº 6.815/1980 – Estatuto do Estrangeiro','revoked','Revogada; o regime migratório atual é a Lei nº 13.445/2017.','Lei nº 13.445/2017 – Lei de Migração'),
  ('Lei nº 8.666/1993 e Lei nº 10.520/2002','revoked','Revogadas no regime geral; usar a Lei nº 14.133/2021, ressalvados contratos históricos.','Lei nº 14.133/2021 – Licitações e Contratos Administrativos'),
  ('Atualidades vinculadas ao período do edital','time_bound','Fatos conjunturais antigos não devem gerar questões atuais sem novo recorte temporal.',null),
  ('Versões antigas de Windows, Internet Explorer e suítes de escritório','obsolete','Tecnologias e interfaces superadas não devem alimentar novas questões.',null)
) x(original_item,exclusion_type,reason,replacement_title)
left join replacements r on r.title=x.replacement_title
on conflict (edition_id,original_item) do update set exclusion_type=excluded.exclusion_type,reason=excluded.reason,replacement_source_id=excluded.replacement_source_id,reviewed_at=now();

create index if not exists idx_syllabus_exclusions_edition on public.syllabus_exclusions(edition_id,exclusion_type);
