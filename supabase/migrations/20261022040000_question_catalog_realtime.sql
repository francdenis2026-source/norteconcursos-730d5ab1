-- As contagens de questões (Treinador, Acervo, painel administrativo, selo da
-- home) são lidas pelo navegador em consultas separadas, cada uma com seu
-- próprio cache. Sem realtime, a inserção/edição/remoção de uma questão só
-- aparecia depois que cada tela expirasse seu cache por conta própria (até
-- 10 minutos no painel administrativo). Publicando estas tabelas no canal
-- supabase_realtime, o app invalida todos os caches assim que o banco muda.
do $$
begin
  if exists (select 1 from pg_catalog.pg_publication where pubname = 'supabase_realtime') then
    if not exists (select 1 from pg_catalog.pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'official_exam_questions') then
      alter publication supabase_realtime add table public.official_exam_questions;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'board_exam_questions') then
      alter publication supabase_realtime add table public.board_exam_questions;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'curated_question_catalog') then
      alter publication supabase_realtime add table public.curated_question_catalog;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'question_support_texts') then
      alter publication supabase_realtime add table public.question_support_texts;
    end if;
  end if;
end;
$$;
