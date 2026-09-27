-- Persists scoring rules per exam board (banca), so any grading logic (manual
-- or automated) can look up the correct formula instead of hardcoding it.
-- Requested explicitly by the candidate (2026-09-27) after a correction: for
-- CEBRASPE, blank items are NEVER discounted from the net score. The formula
-- is strictly: nota líquida = corretas - erradas + anuladas. An erring item
-- cancels out one correct item (1:1), and an annulled item is credited as if
-- correct (+1) to every candidate, regardless of what they marked.
create table if not exists public.exam_board_scoring_rules (
  id uuid primary key default gen_random_uuid(),
  exam_board text not null unique,     -- e.g. 'CEBRASPE', 'IBADE', 'IBFC', 'FUNCAB'
  net_score_formula text not null,     -- human-readable formula
  blank_counts_as_wrong boolean not null default false,
  wrong_cancels_correct boolean not null default true,
  annulled_awards_point boolean not null default true,
  description text not null,
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.exam_board_scoring_rules enable row level security;

drop policy if exists "Anyone can view exam board scoring rules" on public.exam_board_scoring_rules;
create policy "Anyone can view exam board scoring rules"
  on public.exam_board_scoring_rules for select using (true);

drop policy if exists "Admins can manage exam board scoring rules" on public.exam_board_scoring_rules;
create policy "Admins can manage exam board scoring rules"
  on public.exam_board_scoring_rules for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

insert into public.exam_board_scoring_rules
  (exam_board, net_score_formula, blank_counts_as_wrong, wrong_cancels_correct, annulled_awards_point, description, source_note)
values (
  'CEBRASPE',
  'nota_liquida = corretas - erradas + anuladas',
  false,
  true,
  true,
  'Cada item errado anula um item correto (1 errada cancela 1 correta, na proporção 1:1). Itens anulados são pontuados como se o candidato tivesse acertado (+1 cada), independentemente do que foi marcado. Itens deixados em branco NÃO são descontados da nota líquida — eles simplesmente não somam nem subtraem ponto algum, e não devem ser tratados como erro para fins de cálculo da nota.',
  'Regra confirmada explicitamente pelo candidato (Franc Denis) em 2026-09-27, após identificar imprecisão em cálculo anterior.'
)
on conflict (exam_board) do update
set net_score_formula = excluded.net_score_formula,
    blank_counts_as_wrong = excluded.blank_counts_as_wrong,
    wrong_cancels_correct = excluded.wrong_cancels_correct,
    annulled_awards_point = excluded.annulled_awards_point,
    description = excluded.description,
    source_note = excluded.source_note,
    updated_at = now();
