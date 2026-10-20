-- Sessão em andamento (treino ou prova) guardada NA CONTA, para continuar de onde parou em qualquer aparelho.
--
-- As respostas confirmadas já ficam em question_training_responses / simulator_responses. Aqui vai só o que
-- nenhuma delas guarda: a lista de questões da sessão, a posição, as puladas, as marcadas e a prova em curso.
-- Uma linha por (usuário, tipo, escopo). Encerrar a sessão não apaga a linha: grava closed = true com
-- payload nulo, para outro aparelho saber que a sessão acabou e limpar a cópia local.
create table if not exists public.study_session_snapshots (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('trainer', 'simulator')),
  scope text not null check (scope in ('trainer', 'contests', 'enem')),
  payload jsonb,
  closed boolean not null default false,
  client_saved_at timestamptz not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, scope),
  check (closed or payload is not null),
  check (payload is null or pg_column_size(payload) < 1000000),
  check ((kind = 'trainer' and scope = 'trainer') or (kind = 'simulator' and scope in ('contests', 'enem')))
);
alter table public.study_session_snapshots enable row level security;
drop policy if exists "Users manage own session snapshots" on public.study_session_snapshots;
create policy "Users manage own session snapshots" on public.study_session_snapshots
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Nunca troca uma sessão mais nova por uma mais antiga (dois aparelhos salvando quase ao mesmo tempo).
create or replace function public.keep_newest_session_snapshot()
returns trigger language plpgsql set search_path = public as $$
begin
  if tg_op = 'UPDATE' and new.client_saved_at < old.client_saved_at then
    return old;
  end if;
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists keep_newest_session_snapshot on public.study_session_snapshots;
create trigger keep_newest_session_snapshot before update on public.study_session_snapshots
  for each row execute function public.keep_newest_session_snapshot();

comment on table public.study_session_snapshots is
  'Posição e lista de questões do treino/prova em andamento por conta. Respostas confirmadas ficam nas tabelas de respostas.';
