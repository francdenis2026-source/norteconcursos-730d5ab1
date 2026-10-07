-- Dois pedidos do Treinador: (1) bloquear palavrão/baixo calão nos
-- comentários de questão, validado no banco (não dá pra burlar só mudando o
-- app) — sem IA, por lista de termos com normalização de acento e truques
-- comuns (p0rr4, c@ralho); (2) botão do aluno reportar questão errada pro
-- administrador, com área própria de admin pra tratar.

-- Tira acento e desfaz os truques mais comuns de disfarce (número/símbolo no
-- lugar da letra) antes de comparar com a lista de termos.
create or replace function public.normalize_pt_text(input text)
returns text
language sql
immutable
as $$
  select regexp_replace(
    translate(
      lower(coalesce(input, '')),
      'áàâãäéèêëíìîïóòôõöúùûüçñ0134578@$',
      'aaaaaeeeeiiiioooooouuuucnoieastbas'
    ),
    '[^a-z]+', '', 'g'
  )
$$;

-- Lista de termos bloqueados. Fica em tabela (não embutida numa função) pra
-- o administrador poder adicionar ou remover termos direto pelo Table Editor
-- do Supabase, sem precisar de outro deploy.
create table if not exists public.profanity_terms (
  term text primary key,
  created_at timestamptz not null default now()
);

alter table public.profanity_terms enable row level security;

drop policy if exists "Admins manage profanity terms" on public.profanity_terms;
create policy "Admins manage profanity terms"
  on public.profanity_terms for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

comment on table public.profanity_terms is
  'Termos bloqueados nos comentários do Treinador. Edite aqui (Table Editor) para ajustar a lista sem precisar de deploy.';

insert into public.profanity_terms (term) values
  ('porra'), ('caralho'), ('merda'), ('buceta'), ('puta'), ('putinha'),
  ('piranha'), ('fdp'), ('arrombado'), ('arrombada'), ('cuzao'), ('viadinho'),
  ('corno'), ('retardado'), ('retardada'), ('imbecil'), ('idiota'),
  ('estupido'), ('estupida'), ('vagabundo'), ('vagabunda'), ('desgracado'),
  ('desgracada'), ('foder'), ('fodido'), ('fodida'), ('cacete'), ('pqp'),
  ('vtnc'), ('vsf'), ('otario'), ('otaria'), ('babaca'), ('escroto'),
  ('escrota'), ('krl'), ('xoxota'), ('pentelho'), ('pirocudo'), ('rola'),
  ('pau no cu'), ('filho da puta'), ('tomar no cu')
on conflict (term) do nothing;

-- security definer: a checagem roda com privilégio próprio pra poder ler a
-- lista mesmo que um usuário comum não tenha select em profanity_terms.
create or replace function public.contains_profanity(input text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  normalized text := public.normalize_pt_text(input);
begin
  if normalized = '' then
    return false;
  end if;
  return exists (
    select 1 from public.profanity_terms t
    where normalized like '%' || public.normalize_pt_text(t.term) || '%'
  );
end;
$$;
revoke all on function public.contains_profanity(text) from public;
grant execute on function public.contains_profanity(text) to authenticated;

-- Trigger: roda dentro do banco, então vale pra qualquer forma de inserir um
-- comentário (app, outra ferramenta, chamada direta na API) — não é só uma
-- checagem do front que dá pra contornar.
create or replace function public.block_profane_comments()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if public.contains_profanity(new.body) then
    raise exception 'Comentário contém linguagem não permitida.'
      using errcode = '23514';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_block_profane_comments on public.question_comments;
create trigger trg_block_profane_comments
  before insert or update on public.question_comments
  for each row execute function public.block_profane_comments();

-- Reportar questão errada: o aluno aponta um problema (enunciado, gabarito,
-- alternativa etc.) e o administrador trata numa área própria. question_table
-- guarda a tabela física de origem (official_exam_questions,
-- curated_question_catalog, question_bank ou board_exam_questions), já que
-- "official" no Treinador cobre duas tabelas diferentes — assim o admin edita
-- direto na fonte certa. question_snapshot preserva como a questão estava no
-- momento do relato, pra não se perder se ela for editada ou sair do treino
-- antes da revisão.
create table if not exists public.question_reports (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null,
  question_source text not null check (question_source in ('official','curated','personal')),
  question_table text not null check (
    question_table in ('official_exam_questions','curated_question_catalog','question_bank','board_exam_questions')
  ),
  reported_by uuid references auth.users(id) on delete set null,
  reason text not null check (char_length(trim(reason)) between 1 and 1000),
  question_snapshot jsonb not null,
  status text not null default 'pendente' check (status in ('pendente','em_analise','corrigida','rejeitada')),
  admin_note text,
  resolved_by uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.question_reports enable row level security;

drop policy if exists "Students report questions" on public.question_reports;
create policy "Students report questions"
  on public.question_reports for insert to authenticated
  with check (auth.uid() = reported_by);

drop policy if exists "Admins manage question reports" on public.question_reports;
create policy "Admins manage question reports"
  on public.question_reports for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_question_reports_status
  on public.question_reports(status, created_at desc);

comment on table public.question_reports is
  'Questões reportadas por alunos para revisão administrativa; question_table aponta a tabela física pra correção direto na fonte.';
