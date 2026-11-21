WITH fixes(pos,why) AS (VALUES (5,'Correto. A concorrência consta expressamente entre as modalidades do art. 28, II, da Lei 14.133/2021.'),
(6,'Correto. O diálogo competitivo é modalidade prevista no art. 28, V, da Lei 14.133/2021, com procedimento próprio.'),
(7,'Correto. O leilão integra as modalidades do art. 28, IV, da Lei 14.133/2021; não confunda modalidade com critério de julgamento.'),
(8,'Correto. O concurso é modalidade de licitação no art. 28, III, da Lei 14.133/2021, distinta do concurso público para provimento de cargos.'),
(9,'Errado. Convite era modalidade do regime anterior, mas não integra a lista do art. 28 da Lei 14.133/2021.'),
(10,'Correto. O art. 28, § 2º, da Lei 14.133/2021 veda criar novas modalidades ou combinar as modalidades previstas na lei.'),
(11,'Correto. Menor preço é critério de julgamento do art. 33, I, da Lei 14.133/2021, e não uma modalidade de licitação.'),
(12,'Correto. Maior desconto é critério de julgamento previsto no art. 33, II, da Lei 14.133/2021; não é modalidade autônoma.'),
(13,'Correto. Melhor técnica ou conteúdo artístico é critério de julgamento no art. 33, III, da Lei 14.133/2021.'),
(14,'Correto. Maior lance integra os critérios de julgamento do art. 33, V, da Lei 14.133/2021, especialmente relevante no leilão.'),
(15,'Correto. Maior retorno econômico é critério do art. 33, VI, da Lei 14.133/2021, relacionado aos contratos de eficiência.'),
(16,'Errado. Pela sequência ordinária do art. 17 da Lei 14.133/2021, o julgamento precede a habilitação; a inversão é possível mediante justificativa e previsão no edital.'),
(17,'Correto. O art. 17, I, da Lei 14.133/2021 inclui a fase preparatória no procedimento licitatório.'),
(18,'Correto. A fase recursal está expressamente prevista no art. 17, VI, da Lei 14.133/2021.'),
(19,'Correto. A homologação integra a sequência de fases da licitação no art. 17, VII, da Lei 14.133/2021.'),
(20,'Correto. O pregão é a modalidade obrigatória para aquisição de bens e serviços comuns, conforme a Lei 14.133/2021, ressalvadas as situações previstas na própria lei.')), rebuilt AS (
SELECT sm.id,jsonb_agg(CASE WHEN f.pos IS NOT NULL AND length(trim(coalesce(e.value->>'why','')))<25 THEN jsonb_set(e.value,'{why}',to_jsonb(f.why)) ELSE e.value END ORDER BY e.ordinality) new_quiz
FROM study_materials sm CROSS JOIN LATERAL jsonb_array_elements(sm.quiz) WITH ORDINALITY e(value,ordinality)
LEFT JOIN fixes f ON f.pos=e.ordinality WHERE sm.slug='administrativo-licitacoes-lei-14133-modalidades' GROUP BY sm.id)
UPDATE study_materials sm SET quiz=r.new_quiz,updated_at=now() FROM rebuilt r WHERE sm.id=r.id;