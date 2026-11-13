-- Persist answers to approved/eligible exercises embedded in study materials.
-- The server reads the answer key from the active material; clients cannot submit correctness.
begin;

create table if not exists public.material_practice_responses (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  material_id uuid not null references public.study_materials(id) on delete cascade,
  item_index integer not null check (item_index >= 0),
  material_slug text not null,
  material_title text not null,
  subject text not null,
  topic text not null,
  question_text text not null,
  selected_answer text not null check (selected_answer in ('C','E')),
  official_answer text not null check (official_answer in ('C','E')),
  is_correct boolean not null,
  response_seconds integer not null default 0 check (response_seconds between 0 and 900),
  created_at timestamptz not null default now()
);

create index if not exists material_practice_responses_user_created_idx
  on public.material_practice_responses(user_id, created_at desc, id);
create index if not exists material_practice_responses_user_item_idx
  on public.material_practice_responses(user_id, material_id, item_index, created_at, id);

alter table public.material_practice_responses enable row level security;
revoke all on public.material_practice_responses from anon, authenticated;
grant select on public.material_practice_responses to authenticated;

drop policy if exists "Students read their own material practice responses"
  on public.material_practice_responses;
create policy "Students read their own material practice responses"
  on public.material_practice_responses
  for select to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.record_material_practice_answer(
  p_attempt_id uuid,
  p_material_id uuid,
  p_item_index integer,
  p_selected_answer text,
  p_response_seconds integer default 0
)
returns table(id uuid, is_correct boolean, official_answer text, created_at timestamptz)
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_user_id uuid := auth.uid();
  v_material public.study_materials%rowtype;
  v_item jsonb;
  v_review jsonb;
  v_review_item jsonb;
  v_requires_review boolean;
  v_answer text;
  v_question text;
begin
  if v_user_id is null then
    raise exception 'Autenticação necessária' using errcode = '28000';
  end if;
  if p_attempt_id is null or p_material_id is null or p_item_index is null
     or p_item_index < 0 or p_selected_answer not in ('C','E')
     or p_response_seconds is null or p_response_seconds < 0 or p_response_seconds > 900 then
    raise exception 'Resposta inválida' using errcode = '22023';
  end if;

  select * into v_material
  from public.study_materials m
  where m.id = p_material_id and m.content_status = 'active';
  if not found then
    raise exception 'Material indisponível' using errcode = 'P0002';
  end if;
  if jsonb_typeof(v_material.quiz) <> 'array'
     or p_item_index >= jsonb_array_length(v_material.quiz) then
    raise exception 'Exercício não encontrado neste material' using errcode = '22023';
  end if;

  v_item := v_material.quiz -> p_item_index;
  if jsonb_typeof(v_item) <> 'object'
     or jsonb_typeof(v_item -> 'a') <> 'boolean'
     or nullif(btrim(v_item ->> 'q'), '') is null then
    raise exception 'Exercício sem gabarito válido' using errcode = '22023';
  end if;
  v_requires_review := lower(v_material.discipline || ' ' || v_material.topic_label)
    ~ '(direito|legisla|contabilidade|reda[çc][ãa]o oficial)';
  if v_requires_review then
    v_review := v_material.practice_review;
    if jsonb_typeof(v_review) <> 'object'
       or v_review ->> 'version' <> '1'
       or v_review ->> 'status' <> 'reviewed'
       or v_review ->> 'material_slug' <> v_material.slug
       or v_review ->> 'subject' is distinct from v_material.discipline
       or v_review ->> 'topic_label' is distinct from v_material.topic_label
       or nullif(v_review ->> 'scope', '') is null
       or jsonb_typeof(v_review -> 'items') <> 'array'
       or jsonb_array_length(v_review -> 'items') <> jsonb_array_length(v_material.quiz)
       or jsonb_typeof(v_review -> 'sources') <> 'array'
       or jsonb_array_length(v_review -> 'sources') = 0
       or (v_review ->> 'syllabus_topic_id') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}
    id, user_id, material_id, item_index, material_slug, material_title,
    subject, topic, question_text, selected_answer, official_answer,
    is_correct, response_seconds
  ) values (
    p_attempt_id, v_user_id, v_material.id, p_item_index, v_material.slug,
    v_material.title, v_material.discipline, v_material.topic_label,
    v_question, p_selected_answer, v_answer, p_selected_answer = v_answer,
    p_response_seconds
  )
  on conflict (id) do nothing;

  return query
    select r.id, r.is_correct, r.official_answer, r.created_at
    from public.material_practice_responses r
    where r.id = p_attempt_id and r.user_id = v_user_id;
  if not found then
    raise exception 'Identificador de tentativa já utilizado' using errcode = '23505';
  end if;
end;
$function$;

revoke all on function public.record_material_practice_answer(uuid,uuid,integer,text,integer) from public, anon;
grant execute on function public.record_material_practice_answer(uuid,uuid,integer,text,integer) to authenticated;

commit;

       or not exists (
         select 1 from public.syllabus_topics st
         where st.id = (v_review ->> 'syllabus_topic_id')::uuid
           and st.content_status = 'active'
       ) then
      raise exception 'A revisão editorial deste exercício está ausente ou desatualizada' using errcode = '42501';
    end if;
    v_review_item := v_review -> 'items' -> p_item_index;
    if v_review_item ->> 'q' is distinct from v_item ->> 'q'
       or v_review_item -> 'a' is distinct from v_item -> 'a'
       or v_review_item ->> 'why' is distinct from v_item ->> 'why'
       or not exists (
         select 1
         from jsonb_array_elements(v_review -> 'sources') as source(item)
         where source.item ->> 'url' = v_review_item ->> 'source_url'
           and source.item ->> 'sha256' ~* '^[0-9a-f]{64}
    id, user_id, material_id, item_index, material_slug, material_title,
    subject, topic, question_text, selected_answer, official_answer,
    is_correct, response_seconds
  ) values (
    p_attempt_id, v_user_id, v_material.id, p_item_index, v_material.slug,
    v_material.title, v_material.discipline, v_material.topic_label,
    v_question, p_selected_answer, v_answer, p_selected_answer = v_answer,
    p_response_seconds
  )
  on conflict (id) do nothing;

  return query
    select r.id, r.is_correct, r.official_answer, r.created_at
    from public.material_practice_responses r
    where r.id = p_attempt_id and r.user_id = v_user_id;
  if not found then
    raise exception 'Identificador de tentativa já utilizado' using errcode = '23505';
  end if;
end;
$function$;

revoke all on function public.record_material_practice_answer(uuid,uuid,integer,text,integer) from public, anon;
grant execute on function public.record_material_practice_answer(uuid,uuid,integer,text,integer) to authenticated;

commit;

       ) then
      raise exception 'A revisão deste exercício não corresponde à versão publicada' using errcode = '42501';
    end if;
  end if;

  v_answer := case when (v_item ->> 'a')::boolean then 'C' else 'E' end;
  v_question := v_item ->> 'q';

  insert into public.material_practice_responses(
    id, user_id, material_id, item_index, material_slug, material_title,
    subject, topic, question_text, selected_answer, official_answer,
    is_correct, response_seconds
  ) values (
    p_attempt_id, v_user_id, v_material.id, p_item_index, v_material.slug,
    v_material.title, v_material.discipline, v_material.topic_label,
    v_question, p_selected_answer, v_answer, p_selected_answer = v_answer,
    p_response_seconds
  )
  on conflict (id) do nothing;

  return query
    select r.id, r.is_correct, r.official_answer, r.created_at
    from public.material_practice_responses r
    where r.id = p_attempt_id and r.user_id = v_user_id;
  if not found then
    raise exception 'Identificador de tentativa já utilizado' using errcode = '23505';
  end if;
end;
$function$;

revoke all on function public.record_material_practice_answer(uuid,uuid,integer,text,integer) from public, anon;
grant execute on function public.record_material_practice_answer(uuid,uuid,integer,text,integer) to authenticated;

commit;
