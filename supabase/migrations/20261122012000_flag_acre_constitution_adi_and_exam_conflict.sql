-- Source-grounded audit for Acre Constitution: ADI 7466 and state constitutional art. 134.
-- Flag potential tension between constitutional art. 134 §1 (provas e títulos)
-- and LC 129/2004 art. 64 as amended by LC 526/2026 (provas ou provas e títulos).
-- Do not mark the whole quiz as legally revalidated until harmonized.
UPDATE public.study_materials
SET practice_review=jsonb_set(practice_review,'{state_constitution_audit}',
 jsonb_build_object(
 'status','requires_targeted_review','checked_on','2026-11-21',
 'items_checked',8,
 'confirmed_sources',jsonb_build_array(
 'https://legis.ac.gov.br/detalhar_constituicao/0',
 'https://portal.stf.jus.br/jurisprudencia/obterInteiroTeor.asp?idDocumento=782332210',
 'https://legis.ac.gov.br/detalhar/6874'),
 'confirmed','ADI 7466 invalidou art. 131 IV; Constituição estadual art. 134 prevê alternância antiguidade/merecimento, provas e títulos e participação OAB.',
 'issue','Questão sobre ingresso e OAB cita art. 134 §1 da Constituição estadual, mas LC 526/2026 deu ao art. 64 da LC 129/2004 a redação provas OU provas e títulos; exige contextualização de hierarquia e aplicação ao cargo antes de aprovação editorial integral.'
 ),true),
 updated_at=now()
WHERE slug='pcac-2026-constitucional-constituicao-acre-policia-civil'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation';