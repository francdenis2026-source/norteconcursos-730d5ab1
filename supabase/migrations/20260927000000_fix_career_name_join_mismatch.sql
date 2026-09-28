-- Fixes the "Pontos fracos por disciplina" breakdown being silently empty for
-- PRF, PC-AC and PP-Acre. The student-exams.tsx dashboard joins
-- official_exam_questions to student_exam_documents by matching
-- official_exam_questions.career_name against student_exam_documents.contest_name
-- (the value used for grouping/filtering in the UI). For Polícia Federal these
-- two strings happen to coincide ("Agente de Polícia Federal" on both sides),
-- but for the other three careers they diverge: official_exam_questions.career_name
-- stored the job title (e.g. "Agente de Polícia Civil") while
-- student_exam_documents.contest_name stores the institution/exam name (e.g.
-- "Polícia Civil do Acre"). The join therefore returned zero rows and the
-- per-discipline weak-point chart never rendered for these three careers.
--
-- Fix: align official_exam_questions.career_name to the exact contest_name
-- string used in student_exam_documents for each affected career, so the
-- existing .eq("career_name", contest_name) join in the frontend starts
-- matching. career_name keeps meaning "which panel this question belongs to"
-- (it already served that purpose for PF); this just makes the value
-- consistent with how the rest of the schema identifies a panel.
update public.official_exam_questions
set career_name = 'Polícia Rodoviária Federal'
where career_name = 'Policial Rodoviário Federal';

update public.official_exam_questions
set career_name = 'Polícia Civil do Acre'
where career_name = 'Agente de Polícia Civil';

update public.official_exam_questions
set career_name = 'Polícia Penal do Acre'
where career_name = 'Agente de Polícia Penal';
