-- Assistente de estudos: vários planos por aluno (criar, editar, excluir), dias de estudo e redação.
alter table public.study_profiles drop constraint if exists study_profiles_pkey;
alter table public.study_profiles add column if not exists id uuid not null default gen_random_uuid();
alter table public.study_profiles add primary key (id);
alter table public.study_profiles add column if not exists name text;
alter table public.study_profiles add column if not exists study_days integer[] not null default '{1,2,3,4,5,6}';
alter table public.study_profiles add column if not exists essay boolean not null default false;
create index if not exists study_profiles_user_idx on public.study_profiles (user_id, updated_at desc);
