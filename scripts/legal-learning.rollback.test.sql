-- Run as the database owner after applying both migrations and publishing courses.
-- All test writes are rolled back by the nested exception block; no users are created.
do $test$
declare uid uuid; other_uid uuid:=gen_random_uuid(); unit uuid; excluded uuid; course uuid; req uuid:=gen_random_uuid(); quiz_req uuid:=gen_random_uuid(); a boolean[]; r public.legal_course_progress; again_r public.legal_course_progress; q public.legal_course_quiz_attempts; denied boolean; before_progress integer; before_quizzes integer;
begin
 select reviewed_by into uid from public.legal_courses where status='active' and reviewed_by is not null order by id limit 1;
 if uid is null then raise exception 'Publish a reviewed course before running this integration test'; end if;
 select count(*) into before_progress from public.legal_course_progress;
 select count(*) into before_quizzes from public.legal_course_quiz_attempts;
 begin
  perform set_config('request.jwt.claim.sub',uid::text,true);
  select id,course_id into unit,course from public.legal_course_units where content_status='current' and not exists(select 1 from public.legal_course_progress p where p.user_id=uid and p.unit_id=legal_course_units.id) order by id limit 1;
  select id into excluded from public.legal_course_units where content_status='excluded' order by id limit 1;
  if unit is null or excluded is null then raise exception 'Missing published curriculum'; end if;
  r:=public.record_legal_review_for_user(unit,'read','test note',req,uid);
  if r.recall_attempts<>0 or r.read_at is null then raise exception 'Reading counted as recall'; end if;
  r:=public.record_legal_review_for_user(unit,'again','test difficulty',gen_random_uuid(),uid);
  if r.review_step<>0 or r.due_at<now()+interval '9 minutes' or r.due_at>now()+interval '11 minutes' then raise exception 'Retry scheduling failed'; end if;
  req:=gen_random_uuid();r:=public.record_legal_review_for_user(unit,'good','test correction',req,uid);
  again_r:=public.record_legal_review_for_user(unit,'good','test correction',req,uid);
  if again_r.recall_attempts<>r.recall_attempts or r.review_step<>1 then raise exception 'Retry duplicated progress'; end if;
  denied:=false;
  begin perform public.record_legal_review_for_user(excluded,'good','',gen_random_uuid(),uid); exception when others then denied:=true; end;
  if not denied then raise exception 'Excluded text was graded'; end if;
  denied:=false;
  begin perform public.record_legal_review_for_user(unit,'good','',gen_random_uuid(),other_uid); exception when others then denied:=true; end;
  if not denied then raise exception 'Session mismatch accepted'; end if;
  select array_agg((v.item->>'a')::boolean order by v.n) into a from public.legal_courses c join public.study_materials m on m.slug=c.material_slug cross join lateral jsonb_array_elements(m.quiz) with ordinality v(item,n) where c.id=course;
  q:=public.record_legal_course_quiz(course,a,quiz_req,uid);
  if q.correct_count<>cardinality(a) or q.question_count<>cardinality(a) then raise exception 'Server assessment failed'; end if;
  q:=public.record_legal_course_quiz(course,a,quiz_req,uid);
  if (select count(*) from public.legal_course_quiz_attempts where id=quiz_req)<>1 then raise exception 'Assessment retry duplicated'; end if;
  denied:=false;
  begin perform public.record_legal_course_quiz(course,array[true],gen_random_uuid(),uid); exception when others then denied:=true; end;
  if not denied then raise exception 'Incomplete assessment accepted'; end if;
  perform set_config('request.jwt.claim.sub',other_uid::text,true);
  execute 'set local role authenticated';
  if exists(select 1 from public.legal_course_progress where user_id=uid) or exists(select 1 from public.legal_course_quiz_attempts where user_id=uid) then raise exception 'Private progress exposed'; end if;
  if not exists(select 1 from public.legal_courses where status='active') then raise exception 'Published courses not readable'; end if;
  execute 'reset role';
  raise exception using errcode='Z0001',message='rollback successful test writes';
 exception when sqlstate 'Z0001' then null;
 end;
 if (select count(*) from public.legal_course_progress)<>before_progress or (select count(*) from public.legal_course_quiz_attempts)<>before_quizzes then raise exception 'Test persisted data'; end if;
 raise notice 'Legal learning rollback tests passed: scheduling, idempotency, server grading, excluded text and private RLS';
end $test$;
