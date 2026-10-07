-- Run as a database administrator. All test mutations roll back inside the block.
do $test$
declare first_row public.study_materials; second_row public.study_materials;
 before_row jsonb; after_row jsonb; p jsonb; r1 jsonb; r2 jsonb; result jsonb;
 total_units bigint; total_progress bigint;
begin
 if has_function_privilege('anon','public.apply_library_law_review(jsonb,uuid)','EXECUTE')
  or has_function_privilege('authenticated','public.apply_library_law_review(jsonb,uuid)','EXECUTE')
  or not has_function_privilege('service_role','public.apply_library_law_review(jsonb,uuid)','EXECUTE') then raise exception 'Publication privileges failed'; end if;
 select * into first_row from public.study_materials where content_status='active' and reviewed_by is not null order by slug limit 1;
 select * into second_row from public.study_materials where content_status='active' and id<>first_row.id order by slug limit 1;
 before_row=to_jsonb(first_row);
 select count(*) into total_units from public.legal_course_units;
 select count(*) into total_progress from public.legal_course_progress;
 r1=jsonb_build_object('slug',first_row.slug,'expected',jsonb_build_object('id',first_row.id,'updated_at',first_row.updated_at,'body_sha256',encode(sha256(convert_to(first_row.body_md,'UTF8')),'hex')),'patch',jsonb_build_object('body_md',first_row.body_md||E'\n\nTeste transacional.','law_version_checked_at',now(),'legal_review',jsonb_build_object('rollback_test',true)));
 r2=jsonb_build_object('slug',second_row.slug,'expected',jsonb_build_object('id',second_row.id,'updated_at',second_row.updated_at,'body_sha256',repeat('0',64)),'patch',jsonb_build_object('body_md',second_row.body_md||E'\nTeste inválido.','law_version_checked_at',now(),'legal_review',jsonb_build_object('rollback_test',true)));
 p=jsonb_build_object('version','rollback-test','materials',jsonb_build_array(r1,r2),'courses','[]'::jsonb,'enrichments','[]'::jsonb);
 begin
  perform public.apply_library_law_review(p,first_row.reviewed_by);
  raise exception using errcode='P0098',message='Stale precondition accepted';
 exception when sqlstate 'P0001' then
  if sqlerrm not like 'Concurrent material change:%' then raise; end if;
 end;
 select to_jsonb(m) into after_row from public.study_materials m where id=first_row.id;
 if after_row<>before_row then raise exception 'Atomicity failed'; end if;
 begin
  p=jsonb_set(p,'{materials}',jsonb_build_array(r1));
  result=public.apply_library_law_review(p,first_row.reviewed_by);
  if result->>'materials_updated'<>'1' then raise exception 'Valid patch failed'; end if;
  select to_jsonb(m) into after_row from public.study_materials m where id=first_row.id;
  result=public.apply_library_law_review(p,first_row.reviewed_by);
  if result->>'materials_preserved'<>'1' or result->>'materials_updated'<>'0' then raise exception 'Idempotence failed'; end if;
  if (select to_jsonb(m) from public.study_materials m where id=first_row.id)<>after_row then raise exception 'Retry changed review metadata'; end if;
  if (select count(*) from public.legal_course_units)<>total_units or (select count(*) from public.legal_course_progress)<>total_progress then raise exception 'Learning data changed'; end if;
  raise exception using errcode='P0099',message='Successful test rollback';
 exception when sqlstate 'P0099' then null;
 end;
 if (select to_jsonb(m) from public.study_materials m where id=first_row.id)<>before_row then raise exception 'Rollback failed'; end if;
 raise notice 'PASS: publication privileges, atomic preflight, idempotence and preserved learning records';
end $test$;

