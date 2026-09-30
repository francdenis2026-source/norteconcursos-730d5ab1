-- Curated (authored) questions, Direito lote 71: mais Direito Penal e
-- Direito Processual Penal. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-037',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a paz pública — quadrilha ou bando (histórico)',
  $q$Julgue o item a seguir, com base no Código Penal.
A antiga figura do crime de quadrilha ou bando, prevista originalmente no art. 288 do Código Penal, foi renomeada para associação criminosa pela Lei nº 12.850/2013, que também reduziu o número mínimo de integrantes exigido para a configuração do crime, de quatro para três pessoas.$q$,
  'C',
  $q$Certo. A Lei nº 12.850/2013 alterou a redação do art. 288 do Código Penal, que antes tratava do crime de "quadrilha ou bando" e exigia, na redação original, a associação de mais de três pessoas (ou seja, no mínimo quatro) para caracterizar o crime. Com a alteração legislativa, o crime foi renomeado para "associação criminosa", e o número mínimo de integrantes foi reduzido para três pessoas, passando o dispositivo a exigir a associação de "3 (três) ou mais pessoas" para o fim específico de cometer crimes — uma mudança relevante que ampliou o alcance da norma, exigindo menos integrantes para a caracterização típica desse crime associativo.
Exemplo: um grupo estável de três pessoas organizado especificamente para a prática reiterada de crimes já se enquadra, desde a reforma de 2013, no tipo penal de associação criminosa — sob a redação anterior à lei, seria necessário pelo menos um quarto integrante para que o mesmo grupo fosse tipificado como quadrilha ou bando.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, com alterações da Lei nº 12.850/2013','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-033',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Quebra de sigilo bancário e fiscal',
  $q$Julgue o item a seguir, com base na jurisprudência do STF.
A quebra de sigilo bancário e fiscal de um investigado, para fins de investigação criminal, depende, em regra, de autorização judicial fundamentada, ressalvadas hipóteses específicas em que a própria lei atribui a determinados órgãos, como o Ministério Público ou o Fisco, competência para acessar diretamente certas informações, dentro de parâmetros legais e constitucionais específicos.$q$,
  'C',
  $q$Certo. Como regra geral, a quebra de sigilo bancário e fiscal, por representar restrição a direitos fundamentais relacionados à privacidade e à intimidade, depende de autorização judicial fundamentada, observado o princípio da reserva de jurisdição em relação a essa medida invasiva. Porém, o próprio ordenamento jurídico e a jurisprudência do STF reconhecem exceções específicas — por exemplo, o STF já validou a possibilidade de a própria Receita Federal, sem prévia autorização judicial, ter acesso direto a dados bancários de contribuintes para fins fiscais e de fiscalização tributária, sob determinados parâmetros e mediante mecanismos de proteção da informação, entendimento que não se confunde automaticamente, contudo, com o uso dessas informações diretamente para fins de persecução penal, que continua exigindo, em regra, autorização judicial específica.
Exemplo: a Receita Federal pode, dentro de sua competência fiscalizatória própria e sob certos parâmetros legais, acessar informações bancárias de um contribuinte para fins de fiscalização tributária sem necessidade de prévia autorização judicial para esse fim específico; já uma investigação criminal que deseje acessar as mesmas informações bancárias como prova de um crime, em regra, ainda depende de autorização judicial fundamentada específica para essa finalidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
