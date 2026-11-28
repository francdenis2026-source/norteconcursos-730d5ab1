-- Código curto e digitável por questão (NC-XXXXXXXX) + consulta pública somente leitura.
--
-- Complementa o código longo NC-<prefixo>-<uuid> (question_public_code), que continua válido.
-- O código curto é aleatório (alfabeto sem 0/O/1/I/L; 31^8 combinações), nunca sequencial:
-- não dá para percorrer o banco inteiro "contando" códigos. Uma vez atribuído, nunca muda.
--
-- Cobre as três tabelas globais de questões. Questões pessoais (question_bank) ficam de fora.
-- A consulta pública (anon) devolve só enunciado e alternativas de questões ATIVAS: nunca o
-- gabarito, a explicação ou a base legal. Responder continua exigindo login (trilha do Treinador:
-- timer, primeira resposta única em question_first_answers e ranking em score_events).

create table if not exists public.question_short_codes (
  code text primary key check (code ~ '^[A-HJKMNP-Z2-9]{8}$'),
  question_table text not null check (question_table in ('official_exam_questions','board_exam_questions','curated_question_catalog')),
  question_id uuid not null,
  created_at timestamptz not null default now(),
  unique (question_table, question_id)
);
alter table public.question_short_codes enable row level security;
revoke all on public.question_short_codes from public, anon, authenticated;

create or replace function public._random_question_code()
returns text
language plpgsql
volatile
set search_path = public
as $$
declare
  alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; -- 31 símbolos, sem confusão visual
  result text := '';
begin
  for i in 1..8 loop
    result := result || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
  end loop;
  return result;
end $$;
revoke all on function public._random_question_code() from public, anon, authenticated;

create or replace function public.ensure_question_short_code(_table text, _id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  existing text;
  candidate text;
begin
  select code into existing from public.question_short_codes where question_table = _table and question_id = _id;
  if existing is not null then return existing; end if;
  for attempt in 1..20 loop
    candidate := public._random_question_code();
    begin
      insert into public.question_short_codes(code, question_table, question_id) values (candidate, _table, _id);
      return candidate;
    exception when unique_violation then
      -- colisão de código (raríssima) ou corrida na mesma questão: confere e tenta de novo.
      select code into existing from public.question_short_codes where question_table = _table and question_id = _id;
      if existing is not null then return existing; end if;
    end;
  end loop;
  raise exception 'Could not allocate a question code';
end $$;
revoke all on function public.ensure_question_short_code(text, uuid) from public, anon, authenticated;

create or replace function public.assign_question_short_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.ensure_question_short_code(tg_table_name, new.id);
  return new;
end $$;
revoke all on function public.assign_question_short_code() from public, anon, authenticated;

drop trigger if exists assign_question_short_code on public.official_exam_questions;
create trigger assign_question_short_code after insert on public.official_exam_questions
  for each row execute function public.assign_question_short_code();
drop trigger if exists assign_question_short_code on public.board_exam_questions;
create trigger assign_question_short_code after insert on public.board_exam_questions
  for each row execute function public.assign_question_short_code();
drop trigger if exists assign_question_short_code on public.curated_question_catalog;
create trigger assign_question_short_code after insert on public.curated_question_catalog
  for each row execute function public.assign_question_short_code();

-- Preenche TODAS as questões já cadastradas (qualquer status): o código existe desde o cadastro.
select public.ensure_question_short_code('official_exam_questions', id) from public.official_exam_questions;
select public.ensure_question_short_code('board_exam_questions', id) from public.board_exam_questions;
select public.ensure_question_short_code('curated_question_catalog', id) from public.curated_question_catalog;

-- Aceita "nc-7k3m 9qx2", "7K3M9QX2", "NC-7K3M9QX2" etc. Devolve NULL se não tiver formato de código.
create or replace function public._normalize_short_code(_input text)
returns text
language sql
immutable
set search_path = public
as $$
  select case when c ~ '^[A-HJKMNP-Z2-9]{8}$' then c else null end
  from (
    select regexp_replace(regexp_replace(upper(coalesce(_input, '')), '[^A-Z0-9]', '', 'g'), '^NC', '') as c
  ) s
$$;

-- Consulta pública (visitante ou logado): somente leitura, sem gabarito.
create or replace function public.get_public_question_by_code(p_code text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  norm text := public._normalize_short_code(p_code);
  ref public.question_short_codes%rowtype;
  result jsonb;
begin
  if norm is null then return null; end if;
  select * into ref from public.question_short_codes where code = norm;
  if not found then return null; end if;

  if ref.question_table = 'board_exam_questions' then
    select jsonb_build_object(
      'code', 'NC-' || norm, 'kind', 'multiple_choice',
      'board', q.board, 'contest', q.contest_name, 'career', q.career_name, 'year', q.exam_year,
      'subject', q.subject, 'support_text', q.support_text, 'stem', q.stem, 'options', q.options,
      'needs_visual', q.needs_visual)
    into result from public.board_exam_questions q
    where q.id = ref.question_id and q.content_status = 'active' and q.official_answer <> 'X'
      and not (q.legal_review_required and q.law_version_checked_at is null);
  elsif ref.question_table = 'official_exam_questions' then
    select jsonb_build_object(
      'code', 'NC-' || norm, 'kind', 'certo_errado',
      'board', q.exam_board, 'contest', q.contest_name, 'career', q.career_name, 'year', q.exam_year,
      'subject', q.subject, 'support_text', null, 'stem', q.question_text, 'options', '{"C":"Certo","E":"Errado"}'::jsonb,
      'needs_visual', false)
    into result from public.official_exam_questions q
    where q.id = ref.question_id and q.content_status = 'active' and q.official_answer <> 'X'
      and not (q.legal_review_required and not coalesce(q.legal_audit_completed, false));
  else
    select jsonb_build_object(
      'code', 'NC-' || norm, 'kind', 'certo_errado',
      'board', q.exam_board, 'contest', q.contest_name, 'career', q.career_name, 'year', q.contest_year,
      'subject', q.subject, 'support_text', null, 'stem', q.question_text, 'options', '{"C":"Certo","E":"Errado"}'::jsonb,
      'needs_visual', false)
    into result from public.curated_question_catalog q
    where q.id = ref.question_id and q.content_status = 'active';
  end if;
  return result;
end $$;
revoke all on function public.get_public_question_by_code(text) from public;
grant execute on function public.get_public_question_by_code(text) to anon, authenticated;
comment on function public.get_public_question_by_code(text) is
  'SECURITY DEFINER de propósito: consulta pública de UMA questão ativa pelo código curto. Nunca devolve gabarito, explicação ou base legal; códigos são aleatórios, então não há como percorrer o banco.';

-- Logado: descobre tabela e id para abrir a questão completa pelo Treinador (que já grava a
-- primeira resposta única, o tempo e o ranking).
create or replace function public.resolve_question_short_code(p_code text)
returns table (question_table text, question_id uuid, code text)
language sql
stable
security definer
set search_path = public
as $$
  select s.question_table, s.question_id, 'NC-' || s.code
  from public.question_short_codes s
  where auth.uid() is not null and s.code = public._normalize_short_code(p_code)
$$;
revoke all on function public.resolve_question_short_code(text) from public, anon;
grant execute on function public.resolve_question_short_code(text) to authenticated;

-- Logado: código curto de uma questão que já está na tela.
create or replace function public.get_question_short_code(p_table text, p_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select 'NC-' || s.code from public.question_short_codes s
  where auth.uid() is not null and s.question_table = p_table and s.question_id = p_id
$$;
revoke all on function public.get_question_short_code(text, uuid) from public, anon;
grant execute on function public.get_question_short_code(text, uuid) to authenticated;
