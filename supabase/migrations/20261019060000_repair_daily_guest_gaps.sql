-- Preserve valid published positions; replace only missing/quarantined positions on each request.
-- Requires the reviewed security C/E pool from 20261015020000.
create or replace function public.get_daily_guest_questions(p_limit integer default 10)
returns setof public.official_exam_questions
language plpgsql volatile security definer set search_path='' as $$
declare
 v_day date:=public.get_current_acre_date();
 v_limit integer:=least(greatest(coalesce(p_limit,10),0),10);
 v_ids uuid[]:='{}'; v_keys text[]:='{}'; v_subjects text[]:='{}'; v_careers text[]:='{}'; v_answers text[]:='{}';
 v_positions integer[]:='{}'; v_pool jsonb; v_existing record; v_pick record; v_position integer;
 v_question public.official_exam_questions; v_item record;
begin
 if v_limit=0 then return; end if;
 perform pg_advisory_xact_lock(hashtext('norte-daily-guest-v2'),v_day-date '2000-01-01');
 select coalesce(jsonb_agg(to_jsonb(p)),'[]'::jsonb) into v_pool
 from public._guest_question_pool() p where p.question_format='true_false';
 -- An archived item may no longer exist in the pool. Do not count its stored slot as available.
 for v_existing in
  select i.position,p.* from public.daily_guest_question_items i
  join jsonb_to_recordset(v_pool) as p(question_id uuid,content_key text,discipline text,career text,official_answer text)
   on p.question_id=i.question_id and p.content_key=i.content_key
  where i.day=v_day order by i.position
 loop
  v_positions:=array_append(v_positions,v_existing.position);
  v_ids:=array_append(v_ids,v_existing.question_id); v_keys:=array_append(v_keys,v_existing.content_key);
  v_subjects:=array_append(v_subjects,v_existing.discipline); v_careers:=array_append(v_careers,v_existing.career);
  v_answers:=array_append(v_answers,v_existing.official_answer);
 end loop;
 for v_position in 1..10 loop
  continue when v_position=any(v_positions);
  select p.* into v_pick
  from jsonb_to_recordset(v_pool) as p(question_id uuid,content_key text,discipline text,career text,exam_year integer,official_answer text)
  where not(p.question_id=any(v_ids)) and not(p.content_key=any(v_keys))
   -- Future approved reservations remain private and are never taken by today's repair.
   and not exists(select 1 from public.daily_guest_question_items h where h.day>v_day and (h.question_id=p.question_id or h.content_key=p.content_key))
  order by
   -- Unseen stock first, then oldest historical use only when unseen stock runs out.
   coalesce((select max(h.day) from public.daily_guest_question_items h where h.day<=v_day and (h.question_id=p.question_id or h.content_key=p.content_key)),'-infinity'::date),
   (p.exam_year>=extract(year from v_day)::integer-2) desc,
   cardinality(array_positions(v_subjects,p.discipline)),cardinality(array_positions(v_careers,p.career)),
   cardinality(array_positions(v_answers,p.official_answer)),p.exam_year desc,md5(p.question_id::text||v_day::text)
  limit 1;
  exit when not found; -- Never fill a shortage with an unreviewed or obsolete question.
  insert into public.daily_guest_question_sets(day) values(v_day) on conflict(day) do nothing;
  insert into public.daily_guest_question_items(day,position,question_id,content_key)
   values(v_day,v_position,v_pick.question_id,v_pick.content_key)
   on conflict(day,position) do update set question_id=excluded.question_id,content_key=excluded.content_key;
  v_ids:=array_append(v_ids,v_pick.question_id);v_keys:=array_append(v_keys,v_pick.content_key);
  v_subjects:=array_append(v_subjects,v_pick.discipline);v_careers:=array_append(v_careers,v_pick.career);
  v_answers:=array_append(v_answers,v_pick.official_answer);
 end loop;
 for v_item in
  select q as question,p.question_text as served_text from public.daily_guest_question_items i
  join public._guest_question_pool(v_ids) p on p.question_id=i.question_id and p.content_key=i.content_key
  join public.official_exam_questions q on q.id=p.question_id
  where i.day=v_day order by i.position limit v_limit
 loop
  v_question:=v_item.question;v_question.question_text:=v_item.served_text;return next v_question;
 end loop;
 return;
end;
$$;
revoke all on function public.get_daily_guest_questions(integer) from public;
grant execute on function public.get_daily_guest_questions(integer) to anon, authenticated;
comment on function public.get_daily_guest_questions(integer) is
 'Shared Acre daily security C/E round. Preserves valid positions and fills gaps only from reviewed eligible stock; never changes visitor quotas.';
notify pgrst,'reload schema';
