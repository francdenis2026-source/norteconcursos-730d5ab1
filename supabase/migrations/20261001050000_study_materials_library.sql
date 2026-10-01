-- Biblioteca de estudo: materiais por disciplina, ligados ao edital e sujeitos
-- ao mesmo ciclo de revisão das questões (CONTENT_GOVERNANCE.md).
-- O aluno só enxerga conteúdo `active`; ativar exige revisor e data de conferência.
begin;

create table if not exists public.study_materials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  discipline text not null,
  topic_label text not null,
  sort_order integer not null default 0,
  title text not null,
  summary text,
  body_md text not null,
  contest_name text,
  syllabus_topic_order integer,
  source_note text not null,
  legal_basis jsonb not null default '[]'::jsonb,
  law_version_checked_at timestamptz,
  content_status text not null default 'under_review'
    check (content_status in ('under_review','active','obsolete','archived')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    content_status <> 'active'
    or (reviewed_by is not null and reviewed_at is not null and law_version_checked_at is not null)
  )
);

create index if not exists study_materials_discipline_order_idx
  on public.study_materials (discipline, sort_order);
create index if not exists study_materials_status_idx
  on public.study_materials (content_status);

create or replace function public.touch_study_materials_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists study_materials_touch_updated_at on public.study_materials;
create trigger study_materials_touch_updated_at
before update on public.study_materials
for each row execute function public.touch_study_materials_updated_at();

alter table public.study_materials enable row level security;

drop policy if exists "Students read active study materials" on public.study_materials;
create policy "Students read active study materials" on public.study_materials
for select to authenticated using (content_status = 'active');

drop policy if exists "Admins manage study materials" on public.study_materials;
create policy "Admins manage study materials" on public.study_materials
for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

comment on table public.study_materials is
  'Materiais de estudo por disciplina. Só `active` aparece ao aluno; ativar exige revisor, data de revisão e data de conferência das fontes.';

commit;
