-- Source traceability for four active legal lessons that had no legal_basis.
-- No automatic promotion of legal_review or practice_review statuses.
UPDATE public.study_materials
SET legal_basis=CASE
 WHEN discipline='Noções de Direito Constitucional' THEN jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 — texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'))
 WHEN discipline='Noções de Direito Penal e Processual Penal' THEN jsonb_build_array(jsonb_build_object('title','Código Penal — texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'))
 WHEN discipline='Noções de Direito Administrativo' THEN jsonb_build_array(
  jsonb_build_object('title','Constituição Federal de 1988 — texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'),
  jsonb_build_object('title','Lei nº 9.784/1999 — processo administrativo federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm'),
  jsonb_build_object('title','Lei nº 8.429/1992 — improbidade administrativa','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm'))
 ELSE legal_basis END,
 source_note=coalesce(source_note,'') || ' | Auditoria 21/11/2026: fontes normativas oficiais vinculadas para rastreabilidade; revisão jurisprudencial e validação legal integral pendentes.',
 updated_at=now()
WHERE slug IN (
'pcac-2026-administrativo-casos-praticos-atos-poderes-agentes',
'pcac-2026-constitucional-art37-41-servidores-administracao',
'pcac-2026-constitucional-art5-direitos-garantias-aplicacao-pratica',
'pcac-2026-penal-crimes-fe-publica-mortos-testemunho-fraude')
AND content_status='active' AND legal_review IS NULL
AND jsonb_typeof(legal_basis)='array' AND jsonb_array_length(legal_basis)=0;