-- Resolve ambiguous wording in the Acre Constitution entrance-exam item without falsely certifying the lesson.
UPDATE public.study_materials
SET quiz=jsonb_set(quiz,'{5,q}',to_jsonb('Segundo a redação literal do art. 134, § 1º, da Constituição do Acre, o ingresso na classe inicial das carreiras policiais civis ocorre mediante concurso de provas e títulos, com participação da OAB nas fases.'::text)),
 practice_review=jsonb_set(
 jsonb_set(practice_review,'{state_constitution_audit,status}','"requires_targeted_review"'),
 '{state_constitution_audit,issue}',to_jsonb('Item 6 agora identifica expressamente a fonte constitucional. A LC 129/2004 após LC 526/2026 tem redação diferente no art. 64; manter revalidação pendente até confrontação oficial integral e decisão jurisprudencial.'::text)),
 updated_at=now()
WHERE slug='pcac-2026-constitucional-constituicao-acre-policia-civil'
 AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=8;