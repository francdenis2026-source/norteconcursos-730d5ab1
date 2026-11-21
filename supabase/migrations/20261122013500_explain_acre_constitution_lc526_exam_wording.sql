-- Reconcile the state constitutional rule with later complementary legislation
-- without declaring either provision revoked or judicially invalidated.
UPDATE public.study_materials s
SET quiz=(SELECT jsonb_agg(
 CASE WHEN e.value->>'q'='O ingresso na classe inicial das carreiras policiais civis ocorre por concurso público de provas e títulos, com participação da OAB nas fases.'
 THEN jsonb_set(e.value,'{why}',to_jsonb('Correto como leitura literal do art. 134, §1º, da Constituição do Acre: o dispositivo estadual menciona provas e títulos e participação da OAB em todas as fases. ATENÇÃO À ATUALIZAÇÃO: o art. 64 da LC 129/2004, alterado pela LC 526/2026, usa a fórmula provas OU provas e títulos; o art. 65 da mesma LC exige fases de provas e títulos. Há diferença de redação entre as fontes. Em prova, identifique qual norma o enunciado pede; não conclua que a Constituição estadual foi revogada pela lei complementar. Fontes: https://legis.ac.gov.br/detalhar_constituicao/0 e https://legis.ac.gov.br/detalhar/6874'::text))
 ELSE e.value END ORDER BY e.ordinality)
 FROM jsonb_array_elements(s.quiz) WITH ORDINALITY e(value,ordinality)),
 body_md=body_md || E'\n\n## Atenção: redações diferentes sobre concurso da Polícia Civil (2026)\n\n**Constituição do Acre, art. 134, §1º:** menciona concurso de **provas e títulos** e participação da **OAB em todas as fases**. **LC 129/2004, art. 64, com redação da LC 526/2026:** usa **provas ou provas e títulos**; o art. 65 prevê fases obrigatórias incluindo provas e títulos. São textos normativos distintos. Para resolver questões, verifique qual dispositivo é expressamente cobrado. A lei complementar não altera automaticamente a Constituição estadual, e a divergência de redação não autoriza presumir decisão judicial ou revogação.\n\n**Exemplo:** se a banca perguntar “segundo o art. 134, §1º, da Constituição estadual”, reproduza o texto constitucional. Se perguntar “segundo o art. 64 da LC 129/2004”, reconheça a redação alterada em 2026.\n\n**Fontes oficiais:** https://legis.ac.gov.br/detalhar_constituicao/0 ; https://legis.ac.gov.br/detalhar/6874\n',
 practice_review=jsonb_set(practice_review,'{state_constitution_audit,issue}',to_jsonb('Diferença de redação contextualizada no material e na justificativa da questão. Revisão jurisprudencial e constitucional integral ainda pendente.'::text),true),
 updated_at=now()
WHERE s.slug='pcac-2026-constitucional-constituicao-acre-policia-civil'
 AND s.content_status='active'
 AND s.body_md NOT LIKE '%Atenção: redações diferentes sobre concurso da Polícia Civil (2026)%';