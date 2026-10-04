-- Flashcards próprios do aluno com repetição espaçada (estilo SM-2 simplificado).
create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  topic text,
  front text not null check (length(front) between 1 and 600),
  back text not null check (length(back) between 1 and 1500),
  source text not null default 'manual',     -- 'manual' | 'library'
  source_key text,                           -- evita importar o mesmo cartão da Biblioteca duas vezes
  ease numeric(4,2) not null default 2.5,
  interval_days integer not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, source_key)
);
create index if not exists flashcards_due_idx on public.flashcards (user_id, due_at);
alter table public.flashcards enable row level security;
drop policy if exists "Users manage own flashcards" on public.flashcards;
create policy "Users manage own flashcards" on public.flashcards
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.flashcard_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id uuid references public.flashcards(id) on delete set null,
  rating text not null check (rating in ('again', 'hard', 'good', 'easy')),
  reviewed_at timestamptz not null default now()
);
create index if not exists flashcard_reviews_user_idx on public.flashcard_reviews (user_id, reviewed_at desc);
alter table public.flashcard_reviews enable row level security;
drop policy if exists "Users manage own flashcard reviews" on public.flashcard_reviews;
create policy "Users manage own flashcard reviews" on public.flashcard_reviews
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
