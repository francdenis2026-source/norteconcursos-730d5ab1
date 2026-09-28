-- Gabarito oficial completo para a tela "Corrigir meu gabarito".
-- A policy de official_exam_questions só deixa o aluno ler itens 'active', então
-- itens em revisão (legislação, contexto compartilhado) sumiam do painel e a
-- nota era recalculada sobre um subconjunto. Esta função devolve SOMENTE
-- número do item e resposta oficial (nunca o enunciado), para todos os status
-- exceto revoked/obsolete/archived.

create or replace function public.get_official_answer_key(p_career text, p_year integer)
returns table (item_number integer, official_answer text)
language sql
stable
security definer
set search_path = public
as $$
  select q.item_number, q.official_answer
  from public.official_exam_questions q
  where q.career_name = p_career
    and q.exam_year = p_year
    and q.content_status in ('active','under_review','annulled')
  order by q.item_number;
$$;

revoke all on function public.get_official_answer_key(text, integer) from public, anon;
grant execute on function public.get_official_answer_key(text, integer) to authenticated;
