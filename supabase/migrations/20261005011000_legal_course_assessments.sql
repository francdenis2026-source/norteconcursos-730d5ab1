create table if not exists public.legal_course_quiz_attempts (
 id uuid primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 course_id uuid not null references public.legal_courses(id),
 answers boolean[] not null,
 correct_count integer not null,
 question_count integer not null,
 created_at timestamptz not null default now(),
 check(correct_count between 0 and question_count)
);
alter table public.legal_course_quiz_attempts enable row level security;
create policy "Read own legal assessments" on public.legal_course_quiz_attempts for select to authenticated using(user_id=auth.uid());
grant select on public.legal_course_quiz_attempts to authenticated;
create index legal_assessments_owner_course on public.legal_course_quiz_attempts(user_id,course_id,created_at desc);

create or replace function public.record_legal_course_quiz(p_course_id uuid,p_answers boolean[],p_request_id uuid,p_expected_user_id uuid)
returns public.legal_course_quiz_attempts
language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); questions jsonb; total integer; correct integer; r public.legal_course_quiz_attempts;
begin
 if uid is null or p_expected_user_id is distinct from uid then raise exception 'Session changed'; end if;
 if p_request_id is null then raise exception 'Request required'; end if;
 select * into r from public.legal_course_quiz_attempts where id=p_request_id;
 if found then
  if r.user_id<>uid or r.course_id<>p_course_id or r.answers is distinct from p_answers then raise exception 'Request conflict'; end if;
  return r;
 end if;
 select m.quiz into questions from public.legal_courses c join public.study_materials m on m.slug=c.material_slug where c.id=p_course_id and c.status='active' and m.content_status='active';
 if questions is null or jsonb_typeof(questions)<>'array' then raise exception 'Assessment unavailable'; end if;
 total:=jsonb_array_length(questions);
 if total=0 or p_answers is null or cardinality(p_answers)<>total or array_ndims(p_answers)<>1 or array_lower(p_answers,1)<>1 or array_position(p_answers,null) is not null then raise exception 'Incomplete answers'; end if;
 select count(*) into correct from jsonb_array_elements(questions) with ordinality q(item,n) where (q.item->>'a')::boolean=p_answers[q.n];
 insert into public.legal_course_quiz_attempts(id,user_id,course_id,answers,correct_count,question_count) values(p_request_id,uid,p_course_id,p_answers,correct,total) on conflict(id) do nothing;
 select * into r from public.legal_course_quiz_attempts where id=p_request_id;
 if r.user_id<>uid or r.course_id<>p_course_id or r.answers is distinct from p_answers then raise exception 'Request conflict'; end if;
 return r;
end $$;
revoke all on function public.record_legal_course_quiz(uuid,boolean[],uuid,uuid) from public,anon;
grant execute on function public.record_legal_course_quiz(uuid,boolean[],uuid,uuid) to authenticated;

create or replace function public.record_legal_review_for_user(p_unit_id uuid,p_rating text,p_notes text,p_request_id uuid,p_expected_user_id uuid)
returns public.legal_course_progress
language plpgsql security definer set search_path=public as $$
begin
 if auth.uid() is null or p_expected_user_id is distinct from auth.uid() then raise exception 'Session changed'; end if;
 return public.record_legal_review(p_unit_id,p_rating,p_notes,p_request_id);
end $$;
revoke all on function public.record_legal_review_for_user(uuid,text,text,uuid,uuid) from public,anon;
grant execute on function public.record_legal_review_for_user(uuid,text,text,uuid,uuid) to authenticated;
