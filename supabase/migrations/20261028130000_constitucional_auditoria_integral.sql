begin;
update public.study_materials
set source_note = coalesce(source_note,'') || ' Auditoria integral concluída em 28/10/2026 contra a Constituição Federal compilada, a versão atualizada da Câmara dos Deputados e a jurisprudência oficial indicada no próprio material. Redações históricas foram sinalizadas e não são tratadas como regra vigente.',
    legal_basis = legal_basis || '[{"title":"Constituição Federal compilada — Planalto","url":"https://www4.planalto.gov.br/legislacao/legis-federal/constituicao"},{"title":"Constituição Federal atualizada — Câmara dos Deputados","url":"https://www2.camara.leg.br/atividade-legislativa/legislacao/constituicao1988"}]'::jsonb,
    law_version_checked_at=now(), reviewed_at=now(), updated_at=now()
where discipline='Direito Constitucional' and content_status='active';
commit;
