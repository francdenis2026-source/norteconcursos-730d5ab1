-- Curated (authored) questions, Direito lote 65: mais Direito Penal e
-- Direito Processual Penal. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-035',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — resistência e desobediência',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de desobediência, previsto no art. 330 do Código Penal, consiste em desobedecer a ordem legal de funcionário público, sendo necessário, para sua configuração, que a ordem seja legal (dentro das atribuições do funcionário) e que não haja previsão de sanção específica de outra natureza (administrativa, civil) para aquele descumprimento, segundo entendimento consolidado na jurisprudência.$q$,
  'C',
  $q$Certo. O art. 330, caput, do Código Penal tipifica "desobedecer a ordem legal de funcionário público". Um requisito central é que a ordem seja legal — emitida dentro das atribuições legítimas do funcionário e com respaldo normativo, não bastando uma ordem arbitrária ou fora de suas competências. Além disso, a jurisprudência consolidada (incluindo entendimento do STJ) reconhece que, quando a lei já prevê uma sanção específica de natureza administrativa ou civil para o descumprimento de determinada ordem, sem ressalvar expressamente a aplicação cumulativa da sanção penal, não se configura o crime de desobediência — a existência de sanção específica de outra natureza para aquela conduta específica de desobediência tende a afastar a incidência do tipo penal, salvo previsão expressa em sentido contrário.
Exemplo: se uma lei específica já prevê multa administrativa para quem descumpre determinada intimação, e não há ressalva expressa autorizando também a aplicação da sanção penal por desobediência, a jurisprudência tende a entender que apenas a sanção administrativa específica se aplica, afastando o crime do art. 330 nessa hipótese particular.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Ação penal privada subsidiária da pública',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Será admitida ação privada nos crimes de ação pública, se esta não for intentada no prazo legal pelo Ministério Público, hipótese conhecida como ação penal privada subsidiária da pública, prevista constitucionalmente como garantia do ofendido diante da inércia da acusação estatal.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LIX, da CF/1988 estabelece que "será admitida ação privada nos crimes de ação pública, se esta não for intentada no prazo legal". Essa garantia constitucional permite que o ofendido (ou seu representante legal) assuma a acusação, na condição de "querelante substituto", quando o Ministério Público, sendo o titular natural da ação penal pública, permanece inerte, deixando de oferecer denúncia dentro do prazo legal estabelecido para tanto. Trata-se de um mecanismo de controle sobre a atuação do órgão acusador oficial, evitando que a inércia (não necessariamente arbitrária, mas objetivamente configurada pelo simples decurso do prazo) do Ministério Público deixe o crime completamente sem qualquer persecução penal.
Exemplo: se o Ministério Público, tendo recebido todos os elementos necessários de uma investigação, simplesmente deixa passar o prazo legal sem oferecer denúncia nem tomar outra providência cabível (como pedir arquivamento fundamentado), a vítima do crime pode, ela mesma, ingressar com queixa-crime subsidiária, assumindo a acusação naquele processo específico.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
