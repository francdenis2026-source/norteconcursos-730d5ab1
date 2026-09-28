-- A chave oficial é usada na pontuação do aluno e não depende do status pedagógico da questão
-- (ativa, em revisão, arquivada ou obsoleta). A função continua devolvendo só número + resposta.
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
  order by q.item_number;
$$;
-- @@
insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('lei','Lei nº 6.404/1976 – Lei das Sociedades por Ações (texto compilado)','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm','vigente','Conferidos em 27/09/2026: art. 182, §1º; art. 183; art. 187.')
on conflict (url) do update set checked_at=now(), status=excluded.status, notes=excluded.notes;
