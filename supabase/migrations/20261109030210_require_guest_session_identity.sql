-- All guest sessions must be bound to a Supabase Auth identity.
-- The previous migration was applied when no legacy guest sessions remained.
alter table public.daily_guest_sessions
  alter column user_id set not null;
