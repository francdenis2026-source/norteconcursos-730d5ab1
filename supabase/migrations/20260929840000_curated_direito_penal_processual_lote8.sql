-- Curated (authored) questions, Direito lote 24: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — peculato',
  $q$Julgue o item a seguir, com base no Código Penal.
O peculato-desvio, previsto no art. 312 do Código Penal, consiste em desviar, em proveito próprio ou alheio, dinheiro, valor ou qualquer outro bem móvel, público ou particular, de que o funcionário tem a posse em razão do cargo, diferentemente do peculato-furto, em que o funcionário não tem a posse do bem, mas se vale da facilidade que sua condição funcional lhe proporciona para subtraí-lo.$q$,
  'C',
  $q$Certo. O art. 312, caput, do Código Penal descreve o peculato-apropriação/desvio: "Apropriar-se o funcionário público de dinheiro, valor ou qualquer outro bem móvel, público ou particular, de que tem a posse em razão do cargo, ou desviá-lo, em proveito próprio ou alheio". Já o § 1º do mesmo artigo trata do peculato-furto: pune-se com a mesma pena o funcionário que, embora não tenha a posse do bem, o subtrai, ou concorre para que seja subtraído, valendo-se da facilidade que lhe proporciona a qualidade de funcionário. A distinção central é justamente essa: no peculato-desvio, o funcionário já detinha legitimamente a posse do bem em razão do cargo, e depois a desvia indevidamente; no peculato-furto, o funcionário nunca teve a posse legítima, mas usa sua posição funcional para facilitar a subtração.
Exemplo: um servidor responsável pela guarda de um cofre público que usa indevidamente o dinheiro ali guardado (que já estava sob sua posse funcional legítima) para fins particulares pratica peculato-desvio; já um servidor que, sem ter posse legítima sobre determinado bem, aproveita seu acesso privilegiado ao local para subtraí-lo, pratica peculato-furto.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a dignidade sexual',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de estupro de vulnerável, previsto no art. 217-A do Código Penal, configura-se ao ter conjunção carnal ou praticar outro ato libidinoso com menor de 14 anos, sendo classificado pela jurisprudência do Superior Tribunal de Justiça como crime de natureza objetiva, no sentido de que o consentimento eventualmente dado pela vítima não afasta a tipicidade da conduta.$q$,
  'C',
  $q$Certo. O art. 217-A, caput, do Código Penal tipifica o estupro de vulnerável como ter conjunção carnal ou praticar outro ato libidinoso com menor de 14 (catorze) anos. A jurisprudência consolidada do Superior Tribunal de Justiça (refletida na Súmula 593) firmou entendimento de que esse crime é de natureza objetiva quanto à condição etária da vítima: o eventual consentimento da vítima menor de 14 anos, sua experiência sexual anterior ou mesmo a existência de relacionamento amoroso entre as partes NÃO afastam a caracterização do crime, dada a presunção absoluta (não relativizável) de vulnerabilidade estabelecida pela lei para essa faixa etária específica, protegendo o desenvolvimento sexual saudável de crianças e adolescentes muito jovens.
Exemplo: mesmo que uma adolescente de 13 anos afirme ter "concordado" com a relação sexual, ou que exista um relacionamento afetivo entre ela e o agente, isso não afasta a tipicidade do crime de estupro de vulnerável, porque a lei estabelece uma proteção absoluta e objetiva para essa faixa etária, independentemente de qualquer manifestação de vontade da vítima.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),jsonb_build_object('title','STJ – Súmula nº 593','url','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?livre=%40docn=%27000593%27')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Medidas cautelares diversas da prisão',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
As medidas cautelares diversas da prisão, previstas no art. 319 do Código de Processo Penal, incluem, entre outras, o comparecimento periódico em juízo, a proibição de acesso ou frequência a determinados lugares, a proibição de contato com pessoa determinada, o recolhimento domiciliar noturno e o monitoramento eletrônico, aplicáveis quando adequadas e suficientes para os fins de garantir a instrução criminal e a aplicação da lei penal.$q$,
  'C',
  $q$Certo. O art. 319 do Código de Processo Penal lista essas e outras medidas cautelares alternativas à prisão preventiva, dando ao juiz um leque mais amplo de opções para lidar com casos em que se entende necessária alguma restrição cautelar ao investigado ou acusado, mas sem exigir a prisão cautelar em si — considerada medida mais gravosa e, portanto, sujeita ao princípio da excepcionalidade. Essas medidas podem ser aplicadas isoladamente ou cumulativamente, conforme a necessidade do caso, e visam justamente oferecer alternativas proporcionais àquelas situações em que a prisão preventiva seria excessiva, mas a total ausência de qualquer medida cautelar também não seria suficiente para os fins do processo.
Exemplo: numa investigação em que há risco de o investigado tentar influenciar testemunhas, mas não há necessidade concreta de mantê-lo preso, o juiz pode determinar, por exemplo, a proibição de contato com essas testemunhas e o comparecimento periódico em juízo, medidas mais brandas que ainda assim protegem a instrução do processo, sem recorrer à prisão preventiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
);
