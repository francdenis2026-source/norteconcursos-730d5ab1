-- A ausência das flags de figura e legislação não comprova revisão.
-- Publicação exige decisão individual, vínculo ao edital, textos completos
-- e gabarito confirmado. Conteúdo normativo também exige vigência.
-- Consulte docs/content-review/question-review-2026-10-04.md.
do $$ begin
  raise exception 'Ativação em massa desabilitada: use os IDs individualmente revisados e preserve os itens pendentes.';
end $$;
