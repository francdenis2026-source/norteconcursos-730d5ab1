-- Enable Realtime for profiles to sync onboarding
alter publication supabase_realtime add table public.profiles;

-- Create table for access audit logs
create table if not exists public.access_audit_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    feature_key text not null,
    tier text not null,
    attempt_time timestamp with time zone default now(),
    was_blocked boolean default false,
    metadata jsonb default '{}'::jsonb
);

grant select, insert on public.access_audit_logs to authenticated;
grant all on public.access_audit_logs to service_role;

alter table public.access_audit_logs enable row level security;

create policy "Users can view own audit logs"
    on public.access_audit_logs for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own audit logs"
    on public.access_audit_logs for insert
    to authenticated
    with check (auth.uid() = user_id);
