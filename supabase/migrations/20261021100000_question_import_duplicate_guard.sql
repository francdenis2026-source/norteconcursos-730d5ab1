-- Import protection, independent of browser/CLI. No questions or answers are removed or rewritten.
-- Historical duplicates keep their IDs, provenance and student references. One representative owns
-- each unique guard; the complete non-unique content index also protects grandfathered copies.
begin;

create or replace function public.normalize_question_import_text(value text)
returns text language sql immutable parallel safe set search_path = pg_catalog as $$
  select lower(btrim(regexp_replace(
    replace(replace(replace(replace(normalize(coalesce(value, ''), NFKC), chr(8203), ''), chr(65279), ''), chr(160), ' '), chr(8239), ' '),
    '[[:space:]]+', ' ', 'g')))
$$;

create or replace function public.question_import_content_key(table_name text, document jsonb)
returns text language plpgsql stable set search_path = pg_catalog, public as $$
declare
  context jsonb;
  body text;
  support text := public.normalize_question_import_text(document->>'support_text');
  options jsonb := coalesce(nullif(document->'options', 'null'::jsonb), '{}'::jsonb);
  figures jsonb := coalesce(nullif(document->'figure_urls', 'null'::jsonb), '[]'::jsonb);
begin
  if jsonb_typeof(options) = 'object' then
    select coalesce(jsonb_object_agg(key, public.normalize_question_import_text(value)), '{}'::jsonb)
      into options from jsonb_each_text(options);
  end if;
  if table_name = 'question_support_texts' then
    context := jsonb_build_array(table_name, public.normalize_question_import_text(document->>'contest_name'),
      document->>'exam_year', public.normalize_question_import_text(document->>'exam_board'));
    body := public.normalize_question_import_text(document->>'body');
  elsif table_name in ('official_exam_questions', 'board_exam_questions', 'curated_question_catalog') then
    context := jsonb_build_array(table_name,
      public.normalize_question_import_text(coalesce(document->>'board', document->>'exam_board')),
      public.normalize_question_import_text(document->>'contest_name'),
      public.normalize_question_import_text(document->>'career_name'),
      coalesce(document->>'exam_year', document->>'contest_year'));
    body := public.normalize_question_import_text(coalesce(document->>'stem', document->>'question_text'));
    if support = '' and document->>'support_text_id' is not null then
      select public.normalize_question_import_text(t.body) into support
        from public.question_support_texts t where t.id = (document->>'support_text_id')::uuid;
      support := coalesce(support, '');
    end if;
    -- Missing figures cannot prove two visually dependent items are the same question.
    if document->>'needs_visual' = 'true' and figures = '[]'::jsonb then
      context := context || jsonb_build_array(document->>'exam_type', document->>'item_number');
    end if;
  elsif table_name = 'question_bank' then
    context := jsonb_build_array(table_name, document->>'user_id',
      public.normalize_question_import_text(document->>'contest_name'), document->>'contest_year');
    body := public.normalize_question_import_text(document->>'question_text');
  else
    raise exception 'Unsupported import target';
  end if;
  if body = '' then return null; end if;
  -- Answer keys are deliberately excluded: conflicting keys must be reviewed, not imported twice.
  return encode(sha256(convert_to(jsonb_build_array(context, body, support, options, figures)::text, 'UTF8')), 'hex');
end $$;

create or replace function public.guard_question_import_duplicate()
returns trigger language plpgsql security definer set search_path = pg_catalog, public as $$
declare existing_id uuid; has_unique_owner boolean;
begin
  new.import_content_key := public.question_import_content_key(tg_table_name, to_jsonb(new));
  if tg_op = 'UPDATE' then
    if new.import_content_key is not distinct from old.import_content_key then
      new.import_unique_key := old.import_unique_key;
      return new;
    end if;
  end if;
  new.import_unique_key := new.import_content_key;
  if new.import_content_key is not null then
    execute format('select id from public.%I where import_content_key = $1 and id <> $2 limit 1', tg_table_name)
      into existing_id using new.import_content_key, new.id;
    if existing_id is not null then
      execute format('select exists(select 1 from public.%I where import_unique_key = $1)', tg_table_name)
        into has_unique_owner using new.import_content_key;
      -- Let PostgreSQL resolve normal unique conflicts, including idempotent ON CONFLICT imports.
      -- Explicitly guard legacy copies only if their original unique representative was removed.
      if not has_unique_owner then
        raise exception using errcode = '23505',
          message = 'Conteúdo já cadastrado neste contexto. Reutilize o registro existente.',
          detail = 'existing_id=' || existing_id::text,
          constraint = tg_table_name || '_import_content_unique';
      end if;
    end if;
  end if;
  return new;
end $$;

-- Explicit DDL keeps the SQL Editor script free of anonymous DO blocks.

lock table public.question_support_texts in share row exclusive mode;
alter table public.question_support_texts
  add column import_content_key text, add column import_unique_key text;
update public.question_support_texts q
  set import_content_key = public.question_import_content_key('question_support_texts', to_jsonb(q));
with ranked as (
  select id, import_content_key, row_number() over (partition by import_content_key order by id) n
  from public.question_support_texts where import_content_key is not null
)
update public.question_support_texts q set import_unique_key = r.import_content_key
  from ranked r where r.id = q.id and r.n = 1;
create index question_support_texts_import_content_lookup on public.question_support_texts(import_content_key);
create unique index question_support_texts_import_content_unique on public.question_support_texts(import_unique_key);
create trigger question_import_duplicate_guard before insert or update on public.question_support_texts
  for each row execute function public.guard_question_import_duplicate();

lock table public.official_exam_questions in share row exclusive mode;
alter table public.official_exam_questions
  add column import_content_key text, add column import_unique_key text;
update public.official_exam_questions q
  set import_content_key = public.question_import_content_key('official_exam_questions', to_jsonb(q));
with ranked as (
  select id, import_content_key, row_number() over (partition by import_content_key order by id) n
  from public.official_exam_questions where import_content_key is not null
)
update public.official_exam_questions q set import_unique_key = r.import_content_key
  from ranked r where r.id = q.id and r.n = 1;
create index official_exam_questions_import_content_lookup on public.official_exam_questions(import_content_key);
create unique index official_exam_questions_import_content_unique on public.official_exam_questions(import_unique_key);
create trigger question_import_duplicate_guard before insert or update on public.official_exam_questions
  for each row execute function public.guard_question_import_duplicate();

lock table public.board_exam_questions in share row exclusive mode;
alter table public.board_exam_questions
  add column import_content_key text, add column import_unique_key text;
update public.board_exam_questions q
  set import_content_key = public.question_import_content_key('board_exam_questions', to_jsonb(q));
with ranked as (
  select id, import_content_key, row_number() over (partition by import_content_key order by id) n
  from public.board_exam_questions where import_content_key is not null
)
update public.board_exam_questions q set import_unique_key = r.import_content_key
  from ranked r where r.id = q.id and r.n = 1;
create index board_exam_questions_import_content_lookup on public.board_exam_questions(import_content_key);
create unique index board_exam_questions_import_content_unique on public.board_exam_questions(import_unique_key);
create trigger question_import_duplicate_guard before insert or update on public.board_exam_questions
  for each row execute function public.guard_question_import_duplicate();

lock table public.curated_question_catalog in share row exclusive mode;
alter table public.curated_question_catalog
  add column import_content_key text, add column import_unique_key text;
update public.curated_question_catalog q
  set import_content_key = public.question_import_content_key('curated_question_catalog', to_jsonb(q));
with ranked as (
  select id, import_content_key, row_number() over (partition by import_content_key order by id) n
  from public.curated_question_catalog where import_content_key is not null
)
update public.curated_question_catalog q set import_unique_key = r.import_content_key
  from ranked r where r.id = q.id and r.n = 1;
create index curated_question_catalog_import_content_lookup on public.curated_question_catalog(import_content_key);
create unique index curated_question_catalog_import_content_unique on public.curated_question_catalog(import_unique_key);
create trigger question_import_duplicate_guard before insert or update on public.curated_question_catalog
  for each row execute function public.guard_question_import_duplicate();

lock table public.question_bank in share row exclusive mode;
alter table public.question_bank
  add column import_content_key text, add column import_unique_key text;
update public.question_bank q
  set import_content_key = public.question_import_content_key('question_bank', to_jsonb(q));
with ranked as (
  select id, import_content_key, row_number() over (partition by import_content_key order by id) n
  from public.question_bank where import_content_key is not null
)
update public.question_bank q set import_unique_key = r.import_content_key
  from ranked r where r.id = q.id and r.n = 1;
create index question_bank_import_content_lookup on public.question_bank(import_content_key);
create unique index question_bank_import_content_unique on public.question_bank(import_unique_key);
create trigger question_import_duplicate_guard before insert or update on public.question_bank
  for each row execute function public.guard_question_import_duplicate();

-- A support-text edit also refreshes the identities of the questions using that text.
create or replace function public.refresh_support_question_import_keys()
returns trigger language plpgsql security definer set search_path = pg_catalog, public as $$
begin
  if new.body is distinct from old.body then
    update public.official_exam_questions set import_content_key = null where support_text_id = new.id;
  end if;
  return new;
end $$;
create trigger refresh_support_question_import_keys after update of body on public.question_support_texts
  for each row execute function public.refresh_support_question_import_keys();

revoke all on function public.normalize_question_import_text(text) from public;
revoke all on function public.question_import_content_key(text, jsonb) from public;
revoke all on function public.guard_question_import_duplicate() from public;
revoke all on function public.refresh_support_question_import_keys() from public;
commit;
