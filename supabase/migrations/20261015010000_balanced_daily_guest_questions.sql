-- Standalone prerequisite: some deployed projects have not applied the support-text migration.
-- Idempotent: creates only missing infrastructure and preserves existing texts/questions.
-- Textos de apoio compartilhados por vários itens de uma prova (Língua Portuguesa, principalmente).
-- Um texto é cadastrado uma vez e ligado a todos os itens que o usam, em official_exam_questions.support_text_id.
create table if not exists public.question_support_texts (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  body text not null check (length(btrim(body)) > 0),
  contest_name text not null,
  exam_year integer not null,
  exam_board text,
  source_note text,
  created_at timestamptz not null default now()
);

alter table public.question_support_texts enable row level security;

drop policy if exists "Authenticated read support texts" on public.question_support_texts;
create policy "Authenticated read support texts"
  on public.question_support_texts for select to authenticated using (true);

drop policy if exists "Admins manage support texts" on public.question_support_texts;
create policy "Admins manage support texts"
  on public.question_support_texts for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_support_texts_contest on public.question_support_texts(contest_name, exam_year);

alter table public.official_exam_questions
  add column if not exists support_text_id uuid references public.question_support_texts(id) on delete set null;
create index if not exists idx_official_questions_support_text on public.official_exam_questions(support_text_id);

comment on table public.question_support_texts is
  'Texto-base de provas, compartilhado por vários itens. O treinador o exibe junto com cada questão ligada.';

-- A single, private daily selection. No visitor can read the candidate pool/history.
-- Uses only already approved official items; does not publish or edit educational content.
create table if not exists public.daily_guest_question_sets (
  day date primary key, created_at timestamptz not null default now()
);
create table if not exists public.daily_guest_question_items (
  day date not null references public.daily_guest_question_sets(day),
  position integer not null check (position between 1 and 10),
  question_id uuid not null references public.official_exam_questions(id),
  content_key text not null,
  primary key(day,position), unique(day,question_id), unique(day,content_key)
);
create index if not exists daily_guest_question_content_history on public.daily_guest_question_items(content_key,day);
create index if not exists daily_guest_question_id_history on public.daily_guest_question_items(question_id,day);
alter table public.daily_guest_question_sets enable row level security;
alter table public.daily_guest_question_items enable row level security;
revoke all on public.daily_guest_question_sets, public.daily_guest_question_items from anon, authenticated;

create or replace function public._guest_question_kind(p_text text,p_answer text,p_board text)
returns text language sql immutable set search_path='' as $$
 select case
 when p_text ~ '(^|[[:space:]:;.])\(?A\)[[:space:]]*' and p_text ~ '(^|[[:space:]:;.])\(?B\)[[:space:]]*'
  and p_text ~ '(^|[[:space:]:;.])\(?C\)[[:space:]]*' and p_text ~ '(^|[[:space:]:;.])\(?D\)[[:space:]]*'
  and p_answer in ('A','B','C','D','E') and p_text ~ ('(^|[[:space:]:;.])\(?'||p_answer||'\)[[:space:]]*') then 'multiple_choice'
 when p_text ~ '(^|[[:space:]:;.])\(?A\)[[:space:]]*' and p_text ~ '(^|[[:space:]:;.])\(?B\)[[:space:]]*' then null
 when p_answer in ('C','E') and (coalesce(p_board,'')||' '||p_text) ~* '(CEBRASPE|CESPE|julgue|certo ou errado)' then 'true_false'
 else null end
$$;
revoke all on function public._guest_question_kind(text,text,text) from public, anon, authenticated;

create or replace function public._guest_question_pool(p_ids uuid[] default null)
returns table(question_id uuid,exam_year integer,official_answer text,question_text text,content_key text,question_format text,police boolean,discipline text,career text)
language sql stable set search_path='' as $$
 with enriched as materialized (
  select q.id,q.exam_year,q.official_answer,q.exam_board,q.subject,q.contest_name,q.career_name,q.career_category,
   case when nullif(trim(s.body),'') is not null and q.question_text !~ '^Texto-base' then
    'Texto-base'||case when nullif(trim(s.label),'') is not null then ' ['||s.label||']' else '' end||E':\n'||s.body||E'\n\n[[/texto-base]]\n'||q.question_text
   else q.question_text end as text
  from public.official_exam_questions q
  join public.syllabus_topics t on t.id=coalesce(q.current_syllabus_topic_id,q.syllabus_topic_id) and t.content_status='current'
  join public.syllabus_editions e on e.id=t.edition_id and e.status='active'
  left join public.question_support_texts s on s.id=q.support_text_id
  where (p_ids is null or q.id=any(p_ids)) and q.content_status='active' and q.official_answer <> 'X'
   and not coalesce(q.context_review_required,false)
   and not (coalesce(q.legal_review_required,false) and not coalesce(q.legal_audit_completed,false))
   and public.has_verified_question_basis(q.subject,q.legal_basis,q.law_version_checked_at)
   and q.contest_name !~* '\mENEM\M'
 ), usable as (
  select enriched.*,public._guest_question_kind(regexp_replace(text,'(?s)^Texto-base.*\[\[/texto-base\]\][[:space:]]*',''),enriched.official_answer,exam_board) as kind
  from enriched where length(trim(text))>=30
  -- Shared support text is attached above, without opening its table to visitors.
  and not (subject ~* '(portugu|reda[çc][ãa]o|interpreta)'
   and text !~ '^(Texto-base|Comando)( \[[^]]+\])?:'
   and text ~* '((no|do|ao|pelo|neste|deste|nesse|desse|o) texto|par[áa]grafo|linhas? [0-9]|segundo o autor)')
 )
 select id,usable.exam_year,usable.official_answer,text,md5(regexp_replace(lower(text),'[[:space:][:punct:]]','','g')),kind,
  ((coalesce(career_category,'')||' '||contest_name||' '||career_name) ~* '(pol[ií]cia|policial|penitenci[aá]rio|bombeiro)'),
  lower(trim(regexp_replace(subject,'^Noções de ','','i'))),contest_name||' / '||career_name
 from usable where kind is not null
$$;
revoke all on function public._guest_question_pool(uuid[]) from public, anon, authenticated;

create or replace function public.get_daily_guest_questions(p_limit integer default 10)
returns setof public.official_exam_questions
language plpgsql volatile security definer set search_path='' as $$
declare
 v_day date:=public.get_current_acre_date();
 v_limit integer:=least(greatest(coalesce(p_limit,10),0),10);
 v_question public.official_exam_questions; v_item record;
 v_pool jsonb; v_pick record; v_index integer; v_counts record; v_tier integer; v_x integer; v_combos text[]:='{}';
 v_ids uuid[]:='{}';v_keys text[]:='{}';v_kinds text[]:='{}';v_police boolean[]:='{}';v_subjects text[]:='{}';v_careers text[]:='{}';v_answers text[]:='{}';
begin
 if v_limit=0 then return; end if;
 -- All callers, including p_limit=1, share the complete ten-item plan.
 perform pg_advisory_xact_lock(hashtext('norte-daily-guest-v2'),v_day-date '2000-01-01');
 if not exists(select 1 from public.daily_guest_question_sets where day=v_day) then
  select coalesce(jsonb_agg(to_jsonb(c)),'[]'::jsonb) into v_pool from (
   select distinct on(p.content_key)
    p.question_id as id,p.content_key as key,p.question_format as kind,p.police,p.discipline as subject,p.career,
    p.exam_year as year,p.official_answer as answer,
    (select max(h.day) from public.daily_guest_question_items h where (h.content_key=p.content_key or h.question_id=p.question_id) and h.day<v_day) as last_served
   from public._guest_question_pool() p
   order by p.content_key,p.exam_year desc,p.question_id
  ) c;
  -- Reserve each format/career combination before choosing individual items.
  -- This avoids filling all C/E places with police items when the other careers
  -- currently have only C/E stock. Prefer a feasible recent, unseen pool.
  for v_tier in 1..3 loop
   select count(*) filter(where c.kind='multiple_choice' and c.police) as pm,
    count(*) filter(where c.kind='true_false' and c.police) as pc,
    count(*) filter(where c.kind='multiple_choice' and not c.police) as om,
    count(*) filter(where c.kind='true_false' and not c.police) as oc into v_counts
   from jsonb_to_recordset(v_pool) as c(kind text,police boolean,year integer,last_served date)
   where (v_tier>=2 or c.year>=extract(year from v_day)::integer-2) and (v_tier>=3 or c.last_served is null);
   select n into v_x from generate_series(0,4)n where n<=v_counts.om and 4-n<=v_counts.oc and 5-n<=v_counts.pm and 1+n<=v_counts.pc order by abs(n-2),n limit 1;
   exit when found;
  end loop;
  v_x:=coalesce(v_x,2);
  for v_index in 1..10 loop
   select c.* into v_pick from jsonb_to_recordset(v_pool) as c(id uuid,key text,kind text,police boolean,subject text,career text,year integer,answer text,last_served date)
   where not(c.key=any(v_keys))
   order by
    -- Never reuse a previously served item while unseen items remain. Once stock
    -- is exhausted, the oldest served items rotate back, with no same-day repeat.
    coalesce(c.last_served,'-infinity'::date),
    (cardinality(array_positions(v_combos,c.kind||':'||c.police::text)) < case
      when c.kind='multiple_choice' and c.police then 5-v_x
      when c.kind='multiple_choice' then v_x
      when c.police then 1+v_x else 4-v_x end) desc,
    (c.year>=extract(year from v_day)::integer-2) desc,
    (cardinality(array_positions(v_kinds,c.kind))<5) desc,
    (cardinality(array_positions(v_police,c.police))<case when c.police then 6 else 4 end) desc,
    cardinality(array_positions(v_subjects,c.subject)),
    cardinality(array_positions(v_careers,c.career)),
    cardinality(array_positions(v_answers,c.kind||':'||c.answer)),
    c.year desc,md5(c.id::text||v_day::text)
   limit 1;
   exit when not found;
   v_combos:=array_append(v_combos,v_pick.kind||':'||v_pick.police::text);
   v_ids:=array_append(v_ids,v_pick.id);v_keys:=array_append(v_keys,v_pick.key);
   v_kinds:=array_append(v_kinds,v_pick.kind);v_police:=array_append(v_police,v_pick.police);
   v_subjects:=array_append(v_subjects,v_pick.subject);v_careers:=array_append(v_careers,v_pick.career);
   v_answers:=array_append(v_answers,v_pick.kind||':'||v_pick.answer);
  end loop;
  -- Do not cache a transient empty catalog (a later retry may succeed).
  if cardinality(v_ids)>0 then
   insert into public.daily_guest_question_sets(day) values(v_day);
   insert into public.daily_guest_question_items(day,position,question_id,content_key)
    select v_day,n,v_ids[n],v_keys[n] from generate_subscripts(v_ids,1) n;
  end if;
 end if;
 -- Recheck publication/validity: a newly quarantined item is never served from cache.
 select coalesce(array_agg(i.question_id),'{}'::uuid[]) into v_ids from public.daily_guest_question_items i where i.day=v_day;
 for v_item in select q as question,p.question_text as served_text from public.daily_guest_question_items i
  join public._guest_question_pool(v_ids) p on p.question_id=i.question_id and p.content_key=i.content_key
  join public.official_exam_questions q on q.id=p.question_id
  where i.day=v_day order by i.position limit v_limit
 loop
  v_question:=v_item.question;
  v_question.question_text:=v_item.served_text;
  return next v_question;
 end loop;
 return;
end;
$$;
revoke all on function public.get_daily_guest_questions(integer) from public;
grant execute on function public.get_daily_guest_questions(integer) to anon, authenticated;
comment on function public.get_daily_guest_questions(integer) is 'Up to ten approved official questions, shared daily in Acre time; balanced formats and careers; private content-based repetition history.';
