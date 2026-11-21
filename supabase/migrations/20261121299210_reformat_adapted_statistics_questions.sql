-- Reformat adapted-statistics questions while preserving their source attribution.
update public.study_materials
set body_md=regexp_replace(
 body_md,
 $re$(?s)# Questão de abertura — [^\n]*\n\n_[^\n]*_\n\n(Fonte para conferência: [^\n]*)\n\n\*\*Questão:\*\*(.*?)\n\n\nA\)$re$,
 E'> **🎯 DESAFIO DE PROVA**\n>\n> **Questão:**\\2\n\n_\\1_\n\nA)',
 'g'
),
updated_at=now()
where contest_name='PC-AC 2026'
and content_status='active'
and discipline='Estatística'
and body_md like '%# Questão de abertura —%';
