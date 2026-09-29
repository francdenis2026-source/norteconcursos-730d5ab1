-- Duas mudanças pedidas pelo usuário (29/09/2026):
--
-- 1) Degustação para visitantes não cadastrados: até 10 questões por dia,
--    só do acervo de provas oficiais (source='official'), sem acesso às
--    questões autorais/premium (curated_question_catalog) nem ao caderno
--    pessoal (question_bank) — essas duas tabelas já são "to authenticated"
--    e continuam bloqueadas para o público anônimo, sem mudança nenhuma
--    nelas. O limite de 10/dia é controlado no app (localStorage), do
--    mesmo jeito soft-enforcement que o limite diário do plano Free já
--    autenticado (ver src/routes/dashboard/questions.tsx) — não há como
--    fazer cumprir isso via RLS sozinho, então o controle "de verdade"
--    continua sendo o plano pago pra quem já tem conta.
--
-- 2) Classificador de dificuldade por questão: official_exam_questions não
--    tinha essa coluna (curated_question_catalog e question_bank já têm).
--    Adicionada com default 'média' — a classificação real por item é um
--    trabalho de curadoria futuro; por ora todo item existente fica como
--    'média' até ser revisado manualmente (nenhuma dificuldade foi
--    inventada sem base).

alter table public.official_exam_questions
  add column if not exists difficulty text not null default 'média'
    check (difficulty in ('fácil','média','difícil'));

drop policy if exists "Guests read a sample of active official exam questions" on public.official_exam_questions;
create policy "Guests read a sample of active official exam questions"
  on public.official_exam_questions for select to anon
  using (content_status = 'active' and official_answer <> 'X');
