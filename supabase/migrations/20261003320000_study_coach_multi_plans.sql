-- Assistente de estudos: vários planos por aluno (criar, editar, excluir), dias de estudo e redação.
-- Idempotente: a troca da chave primária só acontece se a coluna id ainda não existir.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'study_profiles' and column_name = 'id'
  ) then
    alter table public.study_profiles drop constraint if exists study_profiles_pkey;
    alter table public.study_profiles add column id uuid not null default gen_random_uuid();
    alter table public.study_profiles add primary key (id);
  end if;
end $$;
alter table public.study_profiles add column if not exists name text;
alter table public.study_profiles add column if not exists study_days integer[] not null default '{1,2,3,4,5,6}';
alter table public.study_profiles add column if not exists essay boolean not null default false;
create index if not exists study_profiles_user_idx on public.study_profiles (user_id, updated_at desc);
