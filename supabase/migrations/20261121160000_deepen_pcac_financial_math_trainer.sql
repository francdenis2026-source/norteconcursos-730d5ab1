-- PC-AC 2026 — financial mathematics: interest, rates and discounts.
-- Preserve the lesson's detailed examples and remove the unrelated CPC 26 section.

update public.study_materials
set body_md=split_part(body_md,E'\n## Classificação dos passivos financeiros — CPC 26',1),
updated_at=now()
where contest_name='PC-AC 2026'
and slug='pcac-2026-contabilidade-05-matematica-financeira-juros-descontos';

-- The 19 original trainer items remain in order with their answer keys.
-- Live trainer explanations, corrected tips and stepwise solutions were
-- expanded directly in the quiz record and verified after the update.
