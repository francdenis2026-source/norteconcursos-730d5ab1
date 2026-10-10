-- Complete official reading paths and private, explicit learning progress.
create table if not exists public.legal_courses (
 id uuid primary key,
 slug text not null unique,
 title text not null,
 source_url text not null check (source_url like 'https://www.planalto.gov.br/%'),
 source_sha256 text not null check (length(source_sha256)=64),
 checked_at timestamptz not null,
 material_slug text not null references public.study_materials(slug),
 syllabus_topic_id uuid not null references public.syllabus_topics(id),
 overview jsonb not null,
 status text not null default 'under_review' check (status in ('under_review','active','archived')),
 reviewed_by uuid references auth.users(id),
 reviewed_at timestamptz,
 check (status <> 'active' or (reviewed_by is not null and reviewed_at is not null))
);
create table if not exists public.legal_course_units (
 id uuid primary key,
 course_id uuid not null references public.legal_courses(id),
 unit_key text not null,
 label text not null,
 chapter text not null,
 position integer not null,
 body_text text not null,
 content_sha256 text not null check (length(content_sha256)=64),
 content_status text not null check (content_status in ('current','excluded')),
 recall jsonb not null,
 unique(course_id,unit_key)
);
create table if not exists public.legal_course_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 unit_id uuid not null references public.legal_course_units(id),
 read_at timestamptz,
 recall_attempts integer not null default 0,
 review_step integer not null default 0 check (review_step between 0 and 5),
 last_rating text check (last_rating in ('again','hard','good','easy')),
 notes text not null default '',
 due_at timestamptz,
 updated_at timestamptz not null default now(),
 last_request_id uuid,
 primary key(user_id,unit_id)
);
create index if not exists legal_course_units_course_order on public.legal_course_units(course_id,position);
create index if not exists legal_course_progress_due on public.legal_course_progress(user_id,due_at);
alter table public.legal_courses enable row level security;
alter table public.legal_course_units enable row level security;
alter table public.legal_course_progress enable row level security;
create policy "Read published legal courses" on public.legal_courses for select to authenticated using (status='active');
create policy "Read units of published courses" on public.legal_course_units for select to authenticated using (exists(select 1 from public.legal_courses c where c.id=course_id and c.status='active'));
create policy "Read own legal progress" on public.legal_course_progress for select to authenticated using (user_id=auth.uid());
grant select on public.legal_courses,public.legal_course_units,public.legal_course_progress to authenticated;

-- Students can record reading and self-assessment, not write another student's progress.
create or replace function public.record_legal_review(p_unit_id uuid,p_rating text,p_notes text,p_request_id uuid)
returns public.legal_course_progress
language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); r public.legal_course_progress; wait_days integer; next_step integer;
begin
 if uid is null then raise exception 'Authentication required'; end if;
 if p_rating is null or p_rating not in ('read','again','hard','good','easy') or p_request_id is null or length(coalesce(p_notes,''))>4000 then raise exception 'Invalid review'; end if;
 if not exists(select 1 from public.legal_course_units u join public.legal_courses c on c.id=u.course_id where u.id=p_unit_id and u.content_status='current' and c.status='active') then raise exception 'Unit unavailable'; end if;
 insert into public.legal_course_progress(user_id,unit_id) values(uid,p_unit_id) on conflict do nothing;
 select * into r from public.legal_course_progress where user_id=uid and unit_id=p_unit_id for update;
 if r.last_request_id=p_request_id then return r; end if;
 if p_rating='read' then
  update public.legal_course_progress set read_at=coalesce(read_at,now()),notes=coalesce(p_notes,''),last_request_id=p_request_id,updated_at=now() where user_id=uid and unit_id=p_unit_id returning * into r;
 else
  next_step:=case when p_rating in ('again','hard') then 0 else least(r.review_step+1,5) end;
  wait_days:=case when p_rating='hard' then 1 when p_rating='easy' then (array[3,7,14,30,60])[greatest(next_step,1)] else (array[1,3,7,14,30])[greatest(next_step,1)] end;
  update public.legal_course_progress set read_at=coalesce(read_at,now()),recall_attempts=recall_attempts+1,review_step=next_step,last_rating=p_rating,notes=coalesce(p_notes,''),due_at=case when p_rating='again' then now()+interval '10 minutes' else now()+make_interval(days=>wait_days) end,last_request_id=p_request_id,updated_at=now() where user_id=uid and unit_id=p_unit_id returning * into r;
 end if;
 return r;
end $$;
revoke all on function public.record_legal_review(uuid,text,text,uuid) from public,anon;
grant execute on function public.record_legal_review(uuid,text,text,uuid) to authenticated;
