-- Hora oficial do servidor, para o relógio da plataforma não depender do relógio do aparelho.
create or replace function public.server_now()
returns timestamptz
language sql
stable
as $$ select now() $$;
grant execute on function public.server_now() to anon, authenticated;
