-- Treinador de questões: revisão de questões já respondidas, caderno de erros
-- real (ligado às respostas de verdade, não mais mock), comentários de alunos
-- logados por questão (só exibidos depois que quem está treinando responde,
-- regra aplicada na interface) e estatística de acerto/erro por questão.

-- Status de revisão do "Caderno de erros": toda resposta errada do Treinador
-- entra automaticamente (consulta pelas respostas erradas em
-- question_training_responses); esta tabela só guarda o progresso de revisão
-- de cada erro, pra poder marcar como dominado e tirar da lista.
create table if not exists public.question_error_reviews (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null,
  question_source text not null check (question_source in ('official','curated','personal')),
  status text not null default 'pendente' check (status in ('pendente','revisado','dominado')),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id, question_source)
);

alter table public.question_error_reviews enable row level security;

drop policy if exists "Users manage own error reviews" on public.question_error_reviews;
create policy "Users manage own error reviews"
  on public.question_error_reviews for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Admins read error reviews" on public.question_error_reviews;
create policy "Admins read error reviews"
  on public.question_error_reviews for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_error_reviews_user_status
  on public.question_error_reviews(user_id, status);

drop trigger if exists set_error_reviews_updated_at on public.question_error_reviews;
create trigger set_error_reviews_updated_at
  before update on public.question_error_reviews
  for each row execute function public.set_updated_at();

comment on table public.question_error_reviews is
  'Progresso de revisão do Caderno de erros; a lista de erros em si vem de question_training_responses.';

-- Comentários de alunos logados em cada questão do Treinador. A regra de só
-- mostrar depois de responder é aplicada na interface (não é dado sigiloso);
-- a leitura em massa (com nome de exibição) passa pela RPC abaixo, que é
-- security definer porque profiles só permite cada um ler o próprio perfil.
create table if not exists public.question_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null,
  question_source text not null check (question_source in ('official','curated','personal')),
  body text not null check (char_length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.question_comments enable row level security;

drop policy if exists "Users manage own comments" on public.question_comments;
create policy "Users manage own comments"
  on public.question_comments for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Admins moderate comments" on public.question_comments;
create policy "Admins moderate comments"
  on public.question_comments for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_question_comments_question
  on public.question_comments(question_id, question_source, created_at);

comment on table public.question_comments is
  'Comentários de alunos logados por questão do Treinador; exibidos na interface só depois que quem está respondendo confirma a resposta.';

-- Lista os comentários de uma questão com o nome de exibição do autor
-- (primeiro nome + inicial do último, igual ao ranking), sem expor o perfil
-- completo de outros usuários.
create or replace function public.get_question_comments(p_question_id uuid, p_question_source text)
returns table (id uuid, body text, created_at timestamptz, display_name text, is_me boolean)
language sql
stable
security definer
set search_path = public
as $$
  select c.id, c.body, c.created_at,
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
         else split_part(trim(p.full_name), ' ', 1) || ' '
              || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    c.user_id = auth.uid()
  from public.question_comments c
  left join public.profiles p on p.id = c.user_id
  where c.question_id = p_question_id and c.question_source = p_question_source
  order by c.created_at asc
  limit 200
$$;
revoke all on function public.get_question_comments(uuid, text) from public;
grant execute on function public.get_question_comments(uuid, text) to authenticated;

-- Estatística agregada de acerto/erro por questão (quantos acertaram, quantos
-- erraram, em %). Considera só a 1ª resposta de cada aluno pra cada questão,
-- igual ao critério já usado no ranking/medalhas. security definer porque
-- question_training_responses só permite cada um ler as próprias respostas.
create or replace function public.get_question_training_stats(p_question_id uuid, p_question_source text)
returns table (total integer, correct integer, wrong integer, accuracy numeric)
language sql
stable
security definer
set search_path = public
as $$
  with first_per_user as (
    select distinct on (user_id) is_correct
    from public.question_training_responses
    where question_id = p_question_id and question_source = p_question_source
    order by user_id, created_at
  )
  select
    count(*)::int,
    count(*) filter (where is_correct)::int,
    count(*) filter (where not is_correct)::int,
    case when count(*) = 0 then 0
         else round(100.0 * count(*) filter (where is_correct) / count(*), 1) end
  from first_per_user
$$;
revoke all on function public.get_question_training_stats(uuid, text) from public;
grant execute on function public.get_question_training_stats(uuid, text) to authenticated;
