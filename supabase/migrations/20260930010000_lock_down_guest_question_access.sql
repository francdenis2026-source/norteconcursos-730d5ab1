-- Reforço de segurança pedido pelo usuário (30/09/2026): visitante não
-- pode ter acesso de leitura direto à tabela official_exam_questions (isso
-- deixaria ele consultar o banco inteiro pela API, não só as 10 do dia) e
-- não pode entrar em nenhuma rota do painel/área do cliente (/dashboard/*)
-- — isso é resolvido no código (redirecionamento pra rota pública
-- /desafio-diario). Aqui, o reforço correspondente no banco:
--
-- 1) Remove a policy de SELECT direto pra anon em official_exam_questions
--    (criada em 20260929120000) — visitante não lê mais a tabela direto.
-- 2) get_daily_guest_questions() vira SECURITY DEFINER: continua
--    funcionando pra anon (roda com o privilégio de quem criou a função,
--    não do chamador), mas agora é o ÚNICO jeito de um visitante ler
--    qualquer linha de official_exam_questions — sempre as mesmas 10 do
--    dia, nunca a tabela inteira.
-- Nenhuma outra tabela do projeto (profiles, question_training_responses,
-- user_responses, mock_exam_results etc.) jamais teve policy pra anon —
-- conferido: são todas "to authenticated" desde a criação. A área do
-- cliente já estava protegida no banco; o gap era só este.

drop policy if exists "Guests read a sample of active official exam questions" on public.official_exam_questions;

create or replace function public.get_daily_guest_questions(p_limit integer default 10)
returns setof public.official_exam_questions
language sql
stable
security definer
set search_path = public
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
  'SECURITY DEFINER de propósito: é o único jeito de um visitante (anon) ler qualquer linha de official_exam_questions -- sempre as mesmas 10 do dia (fuso do Acre, relógio do servidor), nunca a tabela inteira. A tabela em si não tem mais policy de SELECT para anon.';

-- Reafirma os grants (create or replace preserva os existentes na mesma
-- assinatura, mas reforça explicitamente por segurança/clareza).
grant execute on function public.get_current_acre_date() to anon, authenticated;
grant execute on function public.get_daily_guest_questions(integer) to anon, authenticated;
