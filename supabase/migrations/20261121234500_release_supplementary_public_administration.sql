-- Publish six supplementary lessons, explicitly separated from the PC-AC 2026 required syllabus.
-- Legal review remains partial, without claiming full certification.
BEGIN;
UPDATE public.study_materials
SET content_status='active',
 title=CASE WHEN title LIKE 'Complementar · %' THEN title ELSE 'Complementar · '||title END,
 source_note='Material complementar autoral: não integra expressamente o conteúdo de Noções de Administração do Anexo III do Edital PC-AC 2026 para Oficial Investigador e cargos correlatos. Referências oficiais: CF/1988 e DL 200/1967. Conferência jurídica parcial; temas históricos apresentados como contexto, não como cobrança garantida.',
 legal_review=jsonb_set(coalesce(legal_review,'{}'::jsonb),'{publication_scope}',to_jsonb('supplementary_only'::text),true),
 updated_at=now()
WHERE discipline='Administração Pública'
 AND content_status='archived'
 AND practice_review->>'status'='reviewed'
 AND legal_review->>'status'='pending_full_review'
 AND jsonb_typeof(quiz)='array'
 AND jsonb_array_length(quiz)=4;
COMMIT;