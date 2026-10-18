-- Filtro inteligente "Atual": marca, em todas as disciplinas, as questões que tratam de conteúdo novo ou
-- que foram cobradas recentemente. A marcação fica numa tabela própria (um só lugar para todas as tabelas
-- de questões), recalculável por regras, e aceita marcação manual que as regras nunca sobrescrevem.
-- Também amplia a lista de fontes oficiais aceitas como base legal com os domínios do Estado (RS, SC e SP),
-- necessários para a legislação estadual cobrada em provas de segurança pública.
begin;

create table if not exists public.question_currency (
  question_table text not null check (question_table in
    ('official_exam_questions', 'curated_question_catalog', 'board_exam_questions')),
  question_id uuid not null,
  tags text[] not null,
  note text,
  source text not null default 'rule' check (source in ('rule', 'manual')),
  exam_year integer,
  updated_at timestamptz not null default now(),
  primary key (question_table, question_id)
);
create index if not exists question_currency_tags_idx on public.question_currency using gin (tags);

alter table public.question_currency enable row level security;
drop policy if exists "question_currency_read" on public.question_currency;
create policy "question_currency_read" on public.question_currency
  for select to authenticated using (true);
revoke all on public.question_currency from anon, authenticated;
grant select on public.question_currency to authenticated;

-- Fontes oficiais aceitas como base legal: federais, tribunais superiores e, agora, os portais oficiais
-- dos Estados cuja legislação aparece nas provas (rs.gov.br, sc.gov.br, sp.gov.br e subdomínios, como
-- al.rs.gov.br, alesc.sc.gov.br e al.sp.gov.br).
create or replace function public.has_verified_question_basis(
  p_subject text, p_basis jsonb, p_checked timestamptz
) returns boolean language sql stable set search_path = '' as $$
  select case
    when p_basis is null or jsonb_typeof(p_basis) <> 'array' then false
    when jsonb_array_length(p_basis) = 0 then not (coalesce(p_subject, '') ~* '(direito|legisla)')
    else p_checked is not null and p_checked <= now() and not exists (
      select 1 from jsonb_array_elements(p_basis) as b
      where coalesce(b->>'url', '') !~* '^https?://([a-z0-9-]+\.)*(planalto\.gov\.br|stf\.jus\.br|stj\.jus\.br|tst\.jus\.br|tse\.jus\.br|ohchr\.org|unodc\.org|un\.org|rs\.gov\.br|sc\.gov\.br|sp\.gov\.br)(/|$)'
    )
  end;
$$;

-- Recalcula as marcações por regras. Marcações manuais (source = 'manual') ficam intactas.
create or replace function public.refresh_question_currency()
returns integer language plpgsql set search_path = '' as $$
declare
  total integer;
begin
  with src as (
    select 'official_exam_questions'::text as tbl, q.id,
           concat_ws(' ', q.question_text, q.review_note, q.legal_basis::text, q.tested_topic) as body,
           nullif(regexp_replace(coalesce(q.exam_year::text, ''), '\D', '', 'g'), '')::integer as yr
    from public.official_exam_questions q
    where q.content_status = 'active' and q.official_answer <> 'X'
    union all
    select 'curated_question_catalog', q.id,
           concat_ws(' ', q.question_text, q.explanation, q.legal_basis::text, q.tested_topic),
           nullif(regexp_replace(coalesce(q.contest_year::text, ''), '\D', '', 'g'), '')::integer
    from public.curated_question_catalog q
    where q.content_status = 'active'
    union all
    select 'board_exam_questions', q.id,
           concat_ws(' ', q.stem, q.explanation, q.review_note, q.legal_basis::text, q.tested_topic),
           nullif(regexp_replace(coalesce(q.exam_year::text, ''), '\D', '', 'g'), '')::integer
    from public.board_exam_questions q
    where q.content_status = 'active' and q.official_answer <> 'X'
  ), tagged as (
    select tbl, id, yr, array_remove(array[
      case when body ~* '(lei|decreto)( complementar)?[^0-9]{0,12}(15\.[0-9]{3}|14\.[89][0-9]{2})'
             or body ~* '(lei|decreto|resolu[çc][ãa]o|portaria|instru[çc][ãa]o normativa|emenda constitucional)[^;]{0,45}/ ?(2024|2025|2026)\M'
             or body ~* 'emenda constitucional[^0-9]{0,12}1(3[2-9]|4[0-9])\M'
           then 'Lei recente' end,
      case when body ~* '(intelig[êe]ncia artificial|ia generativa|chatgpt|copilot|gemini|\mprompts?\M|microsoft 365|google workspace|microsoft teams|computa[çc][ãa]o em nuvem|ransomware|phishing|deepfake|blockchain|criptomoeda|\mpix\M|\mlgpd\M|internet das coisas|big data|machine learning|aprendizado de m[áa]quina)'
           then 'IA e tecnologia' end,
      case when body ~* '(reforma tribut[áa]ria|\mibs\M|\mcbs\M|imposto seletivo|lei complementar[^0-9]{0,12}214|emenda constitucional[^0-9]{0,12}132)'
           then 'Reforma tributária' end,
      case when body ~* '(lei[^0-9]{0,12}14\.133|nova lei de licita[çc][õo]es|\mnllc\M)'
           then 'Nova Lei de Licitações' end,
      case when body ~* '(viol[êe]ncia vic[áa]ria|feminic[ií]dio|121-a|maria da penha|11\.340|14\.994)'
           then 'Violência contra a mulher' end,
      case when body ~* '(14\.071|14\.599|resolu[çc][ãa]o (do )?contran[^;]{0,25}/ ?(2023|2024|2025|2026)\M)'
           then 'Trânsito: mudanças recentes' end,
      case when yr >= 2024 then 'Prova recente' end
    ], null) as tags
    from src
  ), upserted as (
    insert into public.question_currency (question_table, question_id, tags, source, exam_year, updated_at)
    select tbl, id, tags, 'rule', yr, now() from tagged where cardinality(tags) > 0
    on conflict (question_table, question_id) do update
      set tags = excluded.tags, exam_year = excluded.exam_year, updated_at = now()
      where public.question_currency.source = 'rule'
    returning 1
  )
  select count(*) into total from upserted;

  -- Remove marcações por regra de questões que deixaram de ser ativas ou de ter tema atual.
  delete from public.question_currency c
  where c.source = 'rule' and not exists (
    select 1 from (
      select 'official_exam_questions'::text as tbl, id from public.official_exam_questions where content_status = 'active'
      union all select 'curated_question_catalog', id from public.curated_question_catalog where content_status = 'active'
      union all select 'board_exam_questions', id from public.board_exam_questions where content_status = 'active'
    ) a where a.tbl = c.question_table and a.id = c.question_id
  );
  return total;
end;
$$;
revoke all on function public.refresh_question_currency() from public, anon, authenticated;

select public.refresh_question_currency();

commit;
