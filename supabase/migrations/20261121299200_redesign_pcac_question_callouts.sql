-- Improve the visual hierarchy of opening practice questions across PC-AC 2026.
-- Remove meta-introduction and pre-question instruction; put the prompt directly in a highlighted callout.
update public.study_materials
set body_md=regexp_replace(
  regexp_replace(
    body_md,
    E'(?m)^# Questão de abertura — [^\\r\\n]*\\r?\\n\\r?\\n_Questão autoral[^\\r\\n]*\\r?\\n\\r?\\n\\*\\*Questão:\\*\\*',
    E'> **🎯 DESAFIO DE PROVA**\\n>\\n> **Questão:**',
    'g'
  ),
  E'\\n\\n\\*\\*Antes de continuar:\\*\\*[^\\n]*(\\n[^\\n]*)?\\n\\n',
  E'\\n\\n',
  'g'
),
updated_at=now()
where contest_name='PC-AC 2026'
and content_status='active'
and body_md like '%# Questão de abertura —%';
