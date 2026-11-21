-- Correct prior row-level UPDATE behavior: apply all revisions for each lesson atomically.
WITH fixes(slug,position,explanation) AS (VALUES
('contabilidade-cebraspe-tce-ms-2025-auditor-ciencias-contabeis',7,'Errado. No PCASP, as classes 7 e 8 são de controles devedores e credores, respectivamente; as classes 1 e 2 são de ativo e passivo/patrimônio líquido.'),
('contabilidade-cebraspe-tce-ms-2025-auditor-ciencias-contabeis',9,'Correto. Restos a pagar processados são despesas empenhadas e liquidadas que não foram pagas até o encerramento do exercício.'),
('contabilidade-cebraspe-tce-rs-2025-ciencias-contabeis',3,'Errado. Uma perda por redução ao valor recuperável diminui a situação patrimonial e é reconhecida como variação patrimonial diminutiva (VPD), não aumentativa.'),
('contabilidade-cebraspe-tce-rs-2025-ciencias-contabeis',8,'Correto. A despesa já passou pelas fases de empenho e liquidação, faltando o pagamento; essa é a característica dos restos a pagar processados.'),
('contabilidade-cebraspe-tce-rs-2025-ciencias-contabeis',10,'Errado. O limite prudencial da despesa total com pessoal corresponde a 95% do limite máximo aplicável, nos termos do art. 22, parágrafo único, da LRF; 90% é outro patamar de alerta.'),
('contabilidade-cebraspe-tce-rs-2025-ciencias-contabeis',12,'Correto. Liquidez corrente = ativo circulante / passivo circulante. Índice 0,83 significa R$ 0,83 de ativo circulante para cada R$ 1,00 de passivo circulante.'),
('contabilidade-gabriel-rabelo-exemplos-cfc-2020-1-simulado',5,'Errado. O custo por unidade equivalente é custo total dividido pelas unidades equivalentes: R$ 5.000 / 1.000 = R$ 5, e não R$ 50.'),
('contabilidade-gabriel-rabelo-exemplos-cfc-2020-1-simulado',10,'Correto. Custo das mercadorias vendidas = estoque inicial + compras líquidas − estoque final = 30.000 + 80.000 − 40.000 = R$ 70.000.')
), rebuilt AS (
SELECT sm.id,jsonb_agg(CASE WHEN f.position IS NOT NULL THEN jsonb_set(e.value,'{why}',to_jsonb(f.explanation)) ELSE e.value END ORDER BY e.ordinality) new_quiz
FROM study_materials sm CROSS JOIN LATERAL jsonb_array_elements(sm.quiz) WITH ORDINALITY e(value,ordinality)
LEFT JOIN fixes f ON f.slug=sm.slug AND f.position=e.ordinality
WHERE sm.slug IN (SELECT DISTINCT slug FROM fixes)
GROUP BY sm.id)
UPDATE study_materials sm SET quiz=r.new_quiz,updated_at=now() FROM rebuilt r WHERE sm.id=r.id;