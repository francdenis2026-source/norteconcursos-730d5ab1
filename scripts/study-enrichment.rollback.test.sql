do $test$
declare target uuid; parent text; before_count integer; changed integer; denied boolean;
begin
 select id,material_slug into target,parent from public.study_material_enrichments where status='active' order by id limit 1;
 if target is null then raise exception 'Publish examples before running integration tests'; end if;
 select count(*) into before_count from public.study_material_enrichments;
 begin
  perform set_config('request.jwt.claim.sub',gen_random_uuid()::text,true);
  execute 'set local role authenticated';
  if not exists(select 1 from public.study_material_enrichments where id=target) then raise exception 'Student cannot read published example'; end if;
  denied:=false;
  begin
   update public.study_material_enrichments set version='forged' where id=target;
   get diagnostics changed=row_count; denied:=changed=0;
  exception when insufficient_privilege then denied:=true;
  end;
  if not denied then raise exception 'Student modified editorial content'; end if;
  execute 'reset role';
  update public.study_material_enrichments set status='under_review' where id=target;
  execute 'set local role authenticated';
  if exists(select 1 from public.study_material_enrichments where id=target) then raise exception 'Draft exposed to student'; end if;
  execute 'reset role';
  update public.study_material_enrichments set status='active' where id=target;
  update public.study_materials set content_status='under_review' where slug=parent;
  execute 'set local role authenticated';
  if exists(select 1 from public.study_material_enrichments where id=target) then raise exception 'Unpublished parent exposed'; end if;
  execute 'reset role';
  raise exception using errcode='Z0001',message='Rollback successful test writes';
 exception when sqlstate 'Z0001' then null;
 end;
 if (select count(*) from public.study_material_enrichments)<>before_count or not exists(select 1 from public.study_material_enrichments where id=target and status='active') then raise exception 'Test persisted changes'; end if;
 raise notice 'Study enrichment RLS tests passed; changes rolled back';
end $test$;
