-- Banco de questoes individuais com explicacao pedagogica
create table if not exists public.question_bank (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_name text not null,
  contest_year text not null,
  item_number integer not null,
  subject text not null,           -- ex: 'Raciocínio Lógico-Matemático'
  subtopic text,                   -- ex: 'Tabela-verdade'
  question_text text not null,     -- enunciado transcrito
  options jsonb,                   -- para múltipla escolha, se aplicável
  official_answer text,            -- 'C' | 'E' | 'ANULADA' | null se desconhecido
  candidate_answer text,           -- 'C' | 'E' | null
  is_correct boolean,              -- null se indeterminado
  is_anulada boolean not null default false,
  explanation text not null,       -- explicacao pedagogica detalhada
  legal_basis jsonb default '[]'::jsonb, -- [{lei, artigo, url}]
  difficulty text,                 -- 'fácil' | 'média' | 'difícil'
  tags jsonb default '[]'::jsonb,
  source_confidence text not null default 'alta', -- alta/media/baixa
  created_at timestamptz not null default now(),
  unique (user_id, contest_year, item_number, contest_name)
);

alter table public.question_bank enable row level security;

create policy "Users can view own question bank"
  on public.question_bank for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can manage own question bank"
  on public.question_bank for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Admins can manage all question bank"
  on public.question_bank for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_question_bank_subject on public.question_bank(user_id, subject);
create index if not exists idx_question_bank_year on public.question_bank(user_id, contest_year);
