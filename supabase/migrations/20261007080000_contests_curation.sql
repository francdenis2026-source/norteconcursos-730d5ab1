-- "Concursos disponíveis" deixa de ser uma lista vazia e ganha curadoria real: campos de
-- inscrição/edital oficial e dicas de estudo, e um fluxo de revisão igual ao da Biblioteca
-- (content_status: em_revisao -> publicado, só o admin publica). Nenhum concurso é inventado
-- aqui — o admin cadastra manualmente ou cola a URL do edital oficial e o sistema
-- (função fetch-contest-edital) busca a página de verdade e extrai os campos para revisão.
alter table public.contests
  add column if not exists registration_url text,
  add column if not exists official_edital_url text,
  add column if not exists study_tips text,
  add column if not exists source_url text,
  add column if not exists content_status text not null default 'em_revisao',
  add column if not exists reviewed_by uuid references auth.users(id),
  add column if not exists reviewed_at timestamptz,
  add column if not exists researched_at timestamptz not null default now();

alter table public.contests drop constraint if exists contests_content_status_check;
alter table public.contests
  add constraint contests_content_status_check
  check (content_status in ('em_revisao', 'publicado'));

alter table public.contests drop constraint if exists contests_published_needs_review;
alter table public.contests
  add constraint contests_published_needs_review
  check (content_status <> 'publicado' or (reviewed_by is not null and reviewed_at is not null));

-- Linhas que já existiam (cadastradas antes desta curadoria) nascem como rascunho ('em_revisao')
-- igual a qualquer novo concurso: um admin revisa e publica em Painel administrativo > Concursos
-- antes de aparecerem para o aluno. Isso evita mostrar dado desatualizado sem checagem.

drop trigger if exists set_contests_updated_at on public.contests;
create trigger set_contests_updated_at before update on public.contests
  for each row execute function public.set_updated_at();

-- Só concursos publicados ficam visíveis para os alunos; rascunhos em revisão só para o admin.
drop policy if exists "Anyone can view contests" on public.contests;
create policy "Published contests are visible to everyone"
  on public.contests for select
  using (content_status = 'publicado');
-- A policy "Admins can manage contests" (for all) já cobre o admin ver e editar tudo,
-- incluindo os rascunhos em revisão.
