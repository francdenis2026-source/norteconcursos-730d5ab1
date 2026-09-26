-- Official exam documents (provas, gabaritos, padrões de resposta, etc)
create table if not exists public.official_exam_documents (
  id uuid primary key default gen_random_uuid(),
  contest_name text not null,      -- e.g. 'Polícia Federal', 'DEPEN'
  contest_year text,               -- e.g. '2014' (nullable for undated docs)
  exam_board text,                 -- e.g. 'CEBRASPE'
  doc_type text not null,          -- 'prova' | 'gabarito' | 'padrao_resposta' | 'matriz' | 'edital' | 'outro'
  role_cargo text,                 -- specific position/cargo when applicable
  file_name text not null,
  storage_path text not null,      -- path inside the 'official-exams' bucket
  file_size_bytes bigint,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.official_exam_documents enable row level security;

create policy "Anyone can view official exam documents"
  on public.official_exam_documents for select
  using (true);

create policy "Admins can manage official exam documents"
  on public.official_exam_documents for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Student's own exam attempts (scanned/photographed answer sheets, results, etc)
create table if not exists public.student_exam_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_name text,
  contest_year text,
  exam_board text,
  doc_type text not null default 'prova_realizada', -- 'prova_realizada' | 'cartao_resposta' | 'resultado' | 'outro'
  file_name text not null,
  storage_path text not null,      -- path inside the 'student-exams' bucket
  file_size_bytes bigint,
  extracted_data jsonb default '{}'::jsonb, -- OCR/analysis results (answers, score, etc)
  score_raw numeric,                -- raw score if known
  score_net numeric,                -- 'nota líquida' (CEBRASPE-style)
  correct_count integer,
  wrong_count integer,
  blank_count integer,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.student_exam_documents enable row level security;

create policy "Users can view own exam documents"
  on public.student_exam_documents for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own exam documents"
  on public.student_exam_documents for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own exam documents"
  on public.student_exam_documents for update to authenticated
  using (auth.uid() = user_id);

create policy "Admins can manage all student exam documents"
  on public.student_exam_documents for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Reference info about each contest (cut-off score, board rules, etc) researched from the web
create table if not exists public.contest_reference_info (
  id uuid primary key default gen_random_uuid(),
  contest_name text not null,
  contest_year text,
  exam_board text,
  cutoff_score numeric,             -- nota de corte
  scoring_rule text,                -- e.g. description of CEBRASPE net-score formula
  source_url text,
  notes text,
  created_at timestamptz not null default now(),
  unique (contest_name, contest_year)
);

alter table public.contest_reference_info enable row level security;

create policy "Anyone can view contest reference info"
  on public.contest_reference_info for select using (true);

create policy "Admins can manage contest reference info"
  on public.contest_reference_info for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
