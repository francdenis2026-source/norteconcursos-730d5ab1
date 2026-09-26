-- Espaço de análise de redações (provas discursivas)
create table if not exists public.essay_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_name text not null,
  contest_year text,
  exam_board text,
  tema text not null,                      -- título/tema proposto
  topicos jsonb not null default '[]'::jsonb, -- [{descricao, valor_pontos, abordado, obs}]
  nota_maxima numeric,                      -- pontuação máxima possível (conteúdo + apresentação)
  valor_apresentacao numeric,               -- pontos reservados a legibilidade/estrutura/parágrafos
  status text not null default 'rascunho_incompleto', -- 'rascunho_incompleto' | 'texto_completo' | 'corrigida'
  transcricao text,                         -- transcrição do que foi lido nas fotos (rascunho ou texto definitivo)
  storage_paths jsonb default '[]'::jsonb,  -- paths das fotos no bucket student-exams
  correcao jsonb default '{}'::jsonb,       -- {nota_estimada, pontos_fortes[], pontos_fracos[], comentario, confianca}
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.essay_submissions enable row level security;

create policy "Users can view own essays"
  on public.essay_submissions for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own essays"
  on public.essay_submissions for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own essays"
  on public.essay_submissions for update to authenticated
  using (auth.uid() = user_id);

create policy "Admins can manage all essays"
  on public.essay_submissions for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists set_essay_submissions_updated_at on public.essay_submissions;
create trigger set_essay_submissions_updated_at before update on public.essay_submissions
  for each row execute function public.set_updated_at();
