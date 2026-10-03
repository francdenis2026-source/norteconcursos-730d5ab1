-- Norte Concurso — Financeiro da plataforma (painel do administrador)
--
-- Livro-caixa simples: receitas e despesas lançadas pelo administrador.
-- Valores em CENTAVOS (inteiro) para não ter erro de arredondamento.
-- Só administradores leem e alteram; alunos não têm acesso a nenhuma linha.
-- Rode UMA vez no SQL Editor do banco.

create table if not exists public.finance_entries (
  id uuid primary key default gen_random_uuid(),
  entry_date date not null default current_date,
  kind text not null check (kind in ('receita', 'despesa')),
  category text not null,
  description text,
  amount_cents integer not null check (amount_cents > 0 and amount_cents <= 100000000),
  student_id uuid references auth.users(id) on delete set null,
  plan_id text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists finance_entries_date_idx on public.finance_entries (entry_date desc);

alter table public.finance_entries enable row level security;

drop policy if exists "Admins manage finance entries" on public.finance_entries;
create policy "Admins manage finance entries" on public.finance_entries
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

grant select, insert, update, delete on public.finance_entries to authenticated;
grant all on public.finance_entries to service_role;
