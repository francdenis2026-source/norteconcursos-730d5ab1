create table if not exists public.active_user_sessions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  session_key text not null,
  last_seen_at timestamptz not null default now()
);

alter table public.active_user_sessions enable row level security;

drop policy if exists "Users manage own active session" on public.active_user_sessions;
create policy "Users manage own active session" on public.active_user_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
