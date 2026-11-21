WITH fixes(slug,pos,why) AS (VALUES
('administrativo-atos-administrativos-requisitos-atributos',5,'Correto. O art. 53 da Lei 9.784/1999 impõe a anulação dos atos administrativos ilegais. Anular é corrigir ilegalidade, não uma escolha de conveniência.'),
('administrativo-atos-administrativos-requisitos-atributos',6,'Correto. Pelo art. 53 da Lei 9.784/1999, a Administração pode revogar atos válidos por conveniência ou oportunidade, respeitados os direitos adquiridos.'),
('administrativo-atos-administrativos-requisitos-atributos',8,'Correto. O art. 53 da Lei 9.784/1999 prevê expressamente que a Administração deve anular seus atos quando eivados de vício de legalidade.'),
('administrativo-atos-administrativos-requisitos-atributos',14,'Correto. O art. 55 da Lei 9.784/1999 permite convalidar defeitos sanáveis, desde que não haja lesão ao interesse público nem prejuízo a terceiros.'),
('administrativo-atos-administrativos-requisitos-atributos',16,'Correto. O art. 54 da Lei 9.784/1999 estabelece, em regra, cinco anos para anular atos favoráveis, salvo comprovada má-fé.'),
('administrativo-bens-publicos-classificacao-uso',5,'Correto. Pelo art. 98 do Código Civil, são públicos os bens pertencentes às pessoas jurídicas de direito público interno; os demais são particulares.'),
('administrativo-bens-publicos-classificacao-uso',11,'Errado. O art. 100 do Código Civil determina que os bens de uso comum do povo são inalienáveis enquanto conservarem essa qualificação.'),
('administrativo-bens-publicos-classificacao-uso',12,'Correto. Segundo o art. 100 do Código Civil, bens de uso especial permanecem inalienáveis enquanto conservarem essa qualificação.'),
('administrativo-bens-publicos-classificacao-uso',13,'Correto. O art. 101 do Código Civil admite alienação dos bens públicos dominicais, desde que sejam observadas as exigências legais.'),
('administrativo-bens-publicos-classificacao-uso',14,'Errado. O art. 102 do Código Civil proíbe usucapião de bens públicos, mesmo quando a posse se prolonga por mais de quinze anos.'),
('administrativo-bens-publicos-classificacao-uso',15,'Correto. O art. 103 do Código Civil admite uso comum gratuito ou retribuído, conforme a disciplina legal da entidade administradora.'),
('administrativo-bens-publicos-classificacao-uso',16,'Correto. O art. 99 do Código Civil distingue bens de uso comum do povo, bens de uso especial e bens dominicais.'),
('administrativo-bens-publicos-classificacao-uso',19,'Correto. Conforme o art. 100 do Código Civil, bens de uso comum do povo são inalienáveis enquanto mantiverem essa destinação.'),
('administrativo-bens-publicos-classificacao-uso',20,'Errado. O art. 102 do Código Civil veda usucapião de bens públicos, inclusive os dominicais, embora estes possam ser alienados nos termos legais.')
), rebuilt AS (
SELECT sm.id,jsonb_agg(CASE WHEN f.pos IS NOT NULL AND length(trim(coalesce(e.value->>'why','')))<25 THEN jsonb_set(e.value,'{why}',to_jsonb(f.why)) ELSE e.value END ORDER BY e.ordinality) new_quiz
FROM study_materials sm CROSS JOIN LATERAL jsonb_array_elements(sm.quiz) WITH ORDINALITY e(value,ordinality)
LEFT JOIN fixes f ON f.slug=sm.slug AND f.pos=e.ordinality
WHERE sm.slug IN (SELECT DISTINCT slug FROM fixes) GROUP BY sm.id)
UPDATE study_materials sm SET quiz=r.new_quiz,updated_at=now() FROM rebuilt r WHERE sm.id=r.id;