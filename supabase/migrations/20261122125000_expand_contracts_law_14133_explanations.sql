WITH fixes(pos,why) AS (VALUES (2,'Correto. O art. 104, § 1º, da Lei 14.133/2021 protege as cláusulas econômico-financeiras: sua alteração exige concordância prévia do contratado.'),
(4,'Correto. O art. 98 da Lei 14.133/2021 admite garantia de até 10% do valor inicial do contrato quando houver justificativa ligada à complexidade técnica e aos riscos envolvidos.'),
(5,'Correto. O art. 104, I, da Lei 14.133/2021 permite alteração unilateral para adequação ao interesse público, preservando os direitos do contratado.'),
(6,'Correto. O art. 104, II, da Lei 14.133/2021 prevê extinção unilateral pela Administração nas hipóteses legais, não por simples vontade arbitrária.'),
(7,'Correto. Fiscalizar a execução é prerrogativa expressa no art. 104, III, da Lei 14.133/2021. O acompanhamento não elimina os deveres do contratado.'),
(8,'Correto. O art. 104, IV, da Lei 14.133/2021 autoriza sanções motivadas pela inexecução total ou parcial, observadas as garantias legais.'),
(9,'Correto. O art. 104, V, da Lei 14.133/2021 admite ocupação provisória de bens vinculados ao objeto do contrato apenas nas hipóteses previstas na lei.'),
(10,'Errado. A Administração não pode alterar unilateralmente cláusulas econômico-financeiras sem concordância prévia do contratado, conforme o art. 104, § 1º.'),
(11,'Correto. O art. 89, § 1º, da Lei 14.133/2021 exige identificação das partes e representantes, entre outras informações formais do contrato.'),
(12,'Correto. O art. 89 da Lei 14.133/2021 submete os contratos às próprias cláusulas e aos preceitos de direito público, com aplicação supletiva de outros princípios e regras.'),
(13,'Correto. Pelo art. 94 da Lei 14.133/2021, a divulgação no Portal Nacional de Contratações Públicas é condição indispensável à eficácia do contrato e de seus aditamentos, observadas as exceções legais.'),
(14,'Correto. O art. 118 da Lei 14.133/2021 exige preposto aceito pela Administração no local da obra ou serviço para representar o contratado durante a execução.'),
(15,'Correto. O art. 117 da Lei 14.133/2021 prevê acompanhamento e fiscalização da execução por um ou mais fiscais designados, sem afastar a responsabilidade do contratado.'),
(16,'Correto. O art. 120 da Lei 14.133/2021 atribui ao contratado a responsabilidade pelos danos causados diretamente à Administração ou a terceiros por culpa ou dolo na execução.'),
(17,'Errado. A fiscalização não exclui nem reduz a responsabilidade do contratado pelos danos abrangidos pelo art. 120 da Lei 14.133/2021.'),
(18,'Correto. O art. 119 da Lei 14.133/2021 impõe ao contratado reparar, corrigir, remover, reconstruir ou substituir, às próprias expensas, defeitos resultantes da execução.'),
(19,'Correto. A declaração de inidoneidade impede licitar ou contratar pelo prazo de três a seis anos, conforme art. 156, § 5º, da Lei 14.133/2021.'),
(20,'Correto. A advertência é uma das sanções expressamente previstas no art. 156, I, da Lei 14.133/2021, observadas as hipóteses legais de aplicação.')), rebuilt AS (
SELECT sm.id,jsonb_agg(CASE WHEN f.pos IS NOT NULL AND length(trim(coalesce(e.value->>'why','')))<25 THEN jsonb_set(e.value,'{why}',to_jsonb(f.why)) ELSE e.value END ORDER BY e.ordinality) new_quiz
FROM study_materials sm CROSS JOIN LATERAL jsonb_array_elements(sm.quiz) WITH ORDINALITY e(value,ordinality)
LEFT JOIN fixes f ON f.pos=e.ordinality WHERE sm.slug='administrativo-contratos-administrativos-lei-14133' GROUP BY sm.id)
UPDATE study_materials sm SET quiz=r.new_quiz,updated_at=now() FROM rebuilt r WHERE sm.id=r.id;