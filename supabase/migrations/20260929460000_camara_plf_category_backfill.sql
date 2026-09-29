-- Backfill state/career_category/role_type for the Câmara dos Deputados PLF
-- 2026 import (added after the main taxonomy backfill in
-- 20260929450000_career_category_state_role_type.sql).

update public.official_exam_questions
set state = null, career_category = 'Legislativo', role_type = 'Agente'
where contest_name = 'Câmara dos Deputados'
  and career_name = 'Técnico Legislativo – Especialidade: Policial Legislativo Federal';
