-- Panorama das provas: análise agregada de TODAS as provas oficiais da plataforma, igual para todos os alunos.
-- Só devolve contagens (nenhum enunciado, gabarito ou dado pessoal). Conta itens ativos e em revisão;
-- anulados, revogados e arquivados ficam de fora.
create or replace function public.exam_panorama()
returns table (
  contest_name text, exam_year integer, career_name text, exam_board text,
  subject text, items integer, scope text, family text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    q.contest_name, q.exam_year, q.career_name, q.exam_board, q.subject, count(*)::int,
    case
      when q.contest_name ~* '(Polícia Federal|Rodoviária Federal|Departamento Penitenciário Nacional|Câmara dos Deputados)' then 'federal'
      when q.contest_name ~* '(Prefeitura|Município|Municipal)' then 'municipal'
      else 'estadual'
    end,
    case
      when q.contest_name ~* 'Polícia Federal' then 'Polícia Federal'
      when q.contest_name ~* 'Rodoviária Federal' then 'PRF'
      when q.contest_name ~* '(Penal|Penitenciário)' then 'Polícia Penal'
      when q.contest_name ~* 'Polícia Civil' then 'Polícia Civil'
      when q.contest_name ~* 'Polícia Militar' then 'Polícia Militar'
      else 'Outros órgãos'
    end
  from public.official_exam_questions q
  where q.content_status in ('active', 'under_review')
    and auth.uid() is not null
  group by q.contest_name, q.exam_year, q.career_name, q.exam_board, q.subject
$$;
revoke all on function public.exam_panorama() from public;
grant execute on function public.exam_panorama() to authenticated;
