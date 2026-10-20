-- Itens idênticos da mesma prova cadastrados para cargos diferentes (PC-PR 2026, PF 2021/2025,
-- Polícia Penal do Acre 2023 etc.) respondem como UMA questão na reserva da primeira resposta.
--
-- Não reescreve nada: reservas e respostas antigas continuam como estão. A regra vale para novas
-- respostas: se o usuário já reservou qualquer cadastro equivalente, a nova resposta é gravada normalmente,
-- mas com ranking_first = false. Dois envios simultâneos para cadastros equivalentes são serializados por
-- trava consultiva (usuário + grupo), então não há dupla pontuação em corrida.
--
-- Equivalente = mesma tabela, mesmo concurso + ano + banca + gabarito + texto completo (apoio, enunciado,
-- alternativas), em cargos DIFERENTES. Se o mesmo cargo tiver mais de uma linha com esse conteúdo
-- (ex.: PC Acre 2017, 11 a 19 linhas iguais no mesmo cargo), o grupo é ignorado: não é prova de duplicata.
-- Requer 20261020120000_cross_mode_question_identity.sql e 20261020130000_attempt_results_and_study_later.sql.

create or replace function public.question_equivalent_ids(_table text, _id uuid)
returns uuid[]
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  ids uuid[];
  total integer;
  careers integer;
begin
  if _table = 'official_exam_questions' then
    select array_agg(o.id), count(*), count(distinct o.career_name) into ids, total, careers
    from public.official_exam_questions me
    join public.official_exam_questions o
      on o.contest_name = me.contest_name and o.exam_year = me.exam_year and o.official_answer = me.official_answer
    where me.id = _id
      and md5(concat_ws('|', public._normalize_question_text(o.contest_name), o.exam_year::text,
            public._normalize_question_text(o.exam_board), o.official_answer, coalesce(o.support_text_id::text, ''),
            public._normalize_question_text(o.question_text)))
        = md5(concat_ws('|', public._normalize_question_text(me.contest_name), me.exam_year::text,
            public._normalize_question_text(me.exam_board), me.official_answer, coalesce(me.support_text_id::text, ''),
            public._normalize_question_text(me.question_text)));
  elsif _table = 'board_exam_questions' then
    select array_agg(b.id), count(*), count(distinct b.career_name) into ids, total, careers
    from public.board_exam_questions me
    join public.board_exam_questions b
      on b.contest_name = me.contest_name and b.exam_year = me.exam_year and b.official_answer = me.official_answer
    where me.id = _id
      and md5(concat_ws('|', public._normalize_question_text(b.contest_name), b.exam_year::text,
            public._normalize_question_text(b.board), b.official_answer, public._normalize_question_text(b.support_text),
            public._normalize_question_text(b.stem), public._normalize_question_text(b.options::text)))
        = md5(concat_ws('|', public._normalize_question_text(me.contest_name), me.exam_year::text,
            public._normalize_question_text(me.board), me.official_answer, public._normalize_question_text(me.support_text),
            public._normalize_question_text(me.stem), public._normalize_question_text(me.options::text)));
  end if;
  if ids is null or total is null or total <> careers then return array[_id]; end if;
  return ids;
end $$;
revoke all on function public.question_equivalent_ids(text, uuid) from public, anon, authenticated;

create or replace function public.reserve_question_first_answer()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  origin text;
  answer text;
  claim uuid;
  candidates integer;
  owner uuid;
  equivalent uuid[];
begin
  if tg_op = 'UPDATE' then
    if (to_jsonb(new) - 'asked_for_help') is distinct from (to_jsonb(old) - 'asked_for_help')
       or (coalesce((to_jsonb(old)->>'asked_for_help')::boolean, false) and not coalesce((to_jsonb(new)->>'asked_for_help')::boolean, false)) then
      raise exception 'A saved question response is immutable';
    end if;
    return new;
  end if;
  if auth.uid() is not null and new.user_id is distinct from auth.uid() then
    raise insufficient_privilege using message = 'Response owner does not match session';
  end if;
  if tg_table_name = 'question_training_responses' then
    if exists(select 1 from public.question_training_responses where id = new.id) then return new; end if;
  else
    select user_id into owner from public.simulator_attempts where id = new.attempt_id;
    if owner is distinct from new.user_id then raise exception 'Attempt owner mismatch'; end if;
    if exists(select 1 from public.simulator_responses where attempt_id = new.attempt_id and question_order = new.question_order) then return new; end if;
  end if;
  select count(*), min(c.question_table), min(c.official_answer) into candidates, origin, answer
  from public.question_origin_candidates(new.question_source, new.question_id) c
  where new.question_table is null or c.question_table = new.question_table;
  if candidates <> 1 then raise exception 'Question origin is missing or ambiguous'; end if;
  new.question_table := origin;
  if origin = 'question_bank' and not exists (
    select 1 from public.question_bank where id = new.question_id and user_id = new.user_id
  ) then
    raise insufficient_privilege using message = 'Personal question owner mismatch';
  end if;
  new.official_answer := answer;
  new.is_correct := case when new.selected_answer is null then null else new.selected_answer = answer end;
  new.created_at := clock_timestamp();
  new.ranking_first := false;
  if new.selected_answer is null then return new; end if;
  equivalent := public.question_equivalent_ids(origin, new.question_id);
  perform pg_advisory_xact_lock(hashtextextended(
    new.user_id::text || ':' || origin || ':' || (select min(x::text) from unnest(equivalent) x), 0));
  -- Cadastro equivalente já respondido (em qualquer modalidade): esta resposta não é a primeira.
  if exists (
    select 1 from public.question_first_answers f
    where f.user_id = new.user_id and f.question_table = origin and f.question_id = any (equivalent)
  ) then
    return new;
  end if;
  insert into public.question_first_answers(user_id, question_table, question_id, response_id, modality, selected_answer, is_correct, answered_at)
  values(new.user_id, origin, new.question_id, new.id,
    case when tg_table_name = 'simulator_responses' then 'simulator' else 'trainer' end,
    new.selected_answer, new.is_correct, new.created_at)
  on conflict (user_id, question_table, question_id) do nothing
  returning response_id into claim;
  new.ranking_first := claim is not null;
  return new;
end $$;
revoke all on function public.reserve_question_first_answer() from public, anon, authenticated;
