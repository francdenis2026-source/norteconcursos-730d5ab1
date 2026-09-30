-- Questão diária para visitantes (não cadastrados): as mesmas 10 questões
-- pra todo mundo, no mesmo dia, não importa o dispositivo, fuso horário
-- do aparelho ou se o relógio dele está errado.
--
-- A "virada do dia" usa o fuso horário do Acre (America/Rio_Branco,
-- UTC-5, sem horário de verão) e é calculada com o relógio do PRÓPRIO
-- SERVIDOR do Postgres (now()), nunca com o relógio do dispositivo do
-- usuário — por isso o dispositivo estar com hora errada não muda nada.
-- A seleção das 10 questões usa um hash determinístico de (id da questão
-- + data do Acre), então todo mundo que chamar a função no mesmo dia
-- recebe exatamente as mesmas 10 questões, na mesma ordem.

create or replace function public.get_current_acre_date()
returns date
language sql
stable
as $$
  select (now() at time zone 'America/Rio_Branco')::date;
$$;

comment on function public.get_current_acre_date() is
  'Data atual no fuso horário do Acre (America/Rio_Branco), calculada pelo relógio do servidor -- usada como chave do dia pra degustação de visitantes, imune a relógio errado no dispositivo do usuário.';

create or replace function public.get_daily_guest_questions(p_limit integer default 10)
returns setof public.official_exam_questions
language sql
stable
as $$
  select q.*
  from public.official_exam_questions q
  where q.content_status = 'active'
    and q.official_answer <> 'X'
    and not (q.legal_review_required and not coalesce(q.legal_audit_completed, false))
  order by md5(q.id::text || to_char(public.get_current_acre_date(), 'YYYY-MM-DD'))
  limit greatest(p_limit, 0);
$$;

comment on function public.get_daily_guest_questions(integer) is
  'As questões oficiais da degustação diária de visitantes: mesmas 10 questões pra todo mundo no mesmo dia (fuso do Acre, relógio do servidor), embaralhadas de forma determinística por hash(id||data) -- nunca depende do relógio do dispositivo do usuário.';

grant execute on function public.get_current_acre_date() to anon, authenticated;
grant execute on function public.get_daily_guest_questions(integer) to anon, authenticated;
