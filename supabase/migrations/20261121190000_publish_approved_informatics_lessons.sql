-- Aprovação editorial explícita do responsável em 2026-11-21.
-- Publica as 17 aulas autorais já existentes no banco.
-- Não fabrica practice_review nem libera questões no treinador: a validação de fontes permanece obrigatória.
UPDATE public.study_materials
SET content_status = 'active', updated_at = now()
WHERE slug IN ('informatica-01-01','informatica-01-02','informatica-01-03','informatica-03-01','informatica-03-02','informatica-03-03','informatica-03-04','informatica-03-041','informatica-04-01','informatica-04-02','informatica-04-03','informatica-04-04','informatica-05-01','informatica-05-02','informatica-05-03','informatica-05-04','informatica-05-05')
  AND content_status = 'under_review'
  AND length(coalesce(body_md,'')) >= 500
  AND jsonb_typeof(quiz) = 'array'
  AND jsonb_array_length(quiz) = 2;
