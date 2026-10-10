-- Explicação por artigo: camada didática sobre o texto oficial já cadastrado em legal_course_units.
-- Cada explicação nasce amarrada ao hash do dispositivo (content_sha256): se o texto oficial mudar, ela deixa de
-- aparecer para os alunos até ser revista. Entra como 'under_review' e só vira 'published' por um administrador.
create table if not exists public.legal_unit_explanations (
  unit_id uuid primary key references public.legal_course_units(id) on delete cascade,
  content_sha256 text not null,
  simples text not null,                              -- o artigo em palavras simples
  pontos jsonb not null default '[]'::jsonb,          -- pontos-chave (lista de textos)
  atencao jsonb not null default '[]'::jsonb,         -- pegadinhas e cuidados
  exemplo text not null default '',                   -- exemplo prático
  prova jsonb not null default '[]'::jsonb,           -- como costuma ser cobrado (assertivas típicas)
  termos jsonb not null default '[]'::jsonb,          -- [{termo, significado}]
  remissoes jsonb not null default '[]'::jsonb,       -- onde ver também
  status text not null default 'under_review' check (status in ('under_review', 'published')),
  authored_by text not null default 'claude',
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists legal_unit_explanations_status_idx on public.legal_unit_explanations (status);

alter table public.legal_unit_explanations enable row level security;
drop policy if exists "Students read published explanations" on public.legal_unit_explanations;
create policy "Students read published explanations" on public.legal_unit_explanations
  for select to authenticated using (
    status = 'published'
    and exists (select 1 from public.legal_course_units u where u.id = unit_id and u.content_sha256 = legal_unit_explanations.content_sha256)
  );
drop policy if exists "Admins manage explanations" on public.legal_unit_explanations;
create policy "Admins manage explanations" on public.legal_unit_explanations
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Publica (ou despublica) todas as explicações de uma lei. Só administradores.
create or replace function public.publish_legal_explanations(p_course_slug text, p_publish boolean default true)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'apenas administradores'; end if;
  update public.legal_unit_explanations e
     set status = case when p_publish then 'published' else 'under_review' end,
         reviewed_by = auth.uid(), reviewed_at = now(), updated_at = now()
   from public.legal_course_units u join public.legal_courses c on c.id = u.course_id
   where e.unit_id = u.id and c.slug = p_course_slug and e.content_sha256 = u.content_sha256;
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public.publish_legal_explanations(text, boolean) from public, anon;
grant execute on function public.publish_legal_explanations(text, boolean) to authenticated;

-- Cobertura por lei: quantos dispositivos vigentes já têm explicação publicada (visível ao aluno).
create or replace function public.legal_explanation_coverage()
returns table (course_slug text, total_units integer, explained integer)
language sql
stable
security definer
set search_path = public
as $$
  select c.slug, count(*) filter (where u.content_status = 'current')::int,
         count(*) filter (where u.content_status = 'current' and e.status = 'published' and e.content_sha256 = u.content_sha256)::int
  from public.legal_courses c
  join public.legal_course_units u on u.course_id = c.id
  left join public.legal_unit_explanations e on e.unit_id = u.id
  where c.status = 'active' and auth.uid() is not null
  group by c.slug
$$;
revoke all on function public.legal_explanation_coverage() from public, anon;
grant execute on function public.legal_explanation_coverage() to authenticated;
