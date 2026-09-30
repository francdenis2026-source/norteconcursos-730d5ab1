-- Curated (authored) questions, Direito lote 77: mais Direito Penal e
-- Direito Processual Penal. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-039',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a fé pública — falsificação de documento público',
  $q$Julgue o item a seguir, com base no Código Penal.
Falsificar, no todo ou em parte, documento público, ou alterar documento público verdadeiro, constitui crime previsto no art. 297 do Código Penal, equiparando-se a documento público, para efeitos penais, o emanado de entidade paraestatal e o título ao portador ou transmissível por endosso.$q$,
  'C',
  $q$Certo. O art. 297, caput, do Código Penal tipifica "falsificar, no todo ou em parte, documento público, ou alterar documento público verdadeiro". O § 2º do mesmo artigo estabelece uma equiparação relevante: "para os efeitos penais, equiparam-se a documento público o emanado de entidade paraestatal, o título ao portador ou transmissível por endosso, as ações de sociedade comercial, os livros mercantis e o testamento particular" — essa equiparação amplia a proteção penal conferida a documentos públicos para determinados documentos privados que, por sua relevância e circulação social, recebem o mesmo tratamento penal mais rigoroso reservado à falsificação de documentos públicos, em vez do tratamento mais brando da falsificação de documento particular (art. 298).
Exemplo: falsificar um cheque ao portador (título transmissível por endosso) recebe o mesmo tratamento penal mais rigoroso da falsificação de documento público, por força dessa equiparação legal expressa, mesmo sendo, na origem, um documento de natureza privada.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-035',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prova ilícita e prova ilícita por derivação',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e no Código de Processo Penal.
São inadmissíveis, no processo, as provas obtidas por meios ilícitos, sendo também consideradas inadmissíveis, em regra, as provas derivadas das ilícitas, salvo quando não evidenciado o nexo de causalidade entre umas e outras, ou quando as derivadas puderem ser obtidas por uma fonte independente das primeiras.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LVI, da CF/1988 estabelece que "são inadmissíveis, no processo, as provas obtidas por meios ilícitos". O art. 157, § 1º, do Código de Processo Penal, com a redação dada pela Lei nº 11.690/2008, complementa que "são também inadmissíveis as provas derivadas das ilícitas, salvo quando não evidenciado o nexo de causalidade entre umas e outras, ou quando as derivadas puderem ser obtidas por uma fonte independente das primeiras" — consagrando, no direito brasileiro, a chamada "teoria dos frutos da árvore envenenada" (fruits of the poisonous tree), mas também suas exceções, como a "fonte independente" (quando a prova derivada poderia ter sido descoberta por outro caminho legítimo, sem depender da prova ilícita original).
Exemplo: se uma prova é descoberta a partir de uma interceptação telefônica ilegal, mas ficar demonstrado que essa mesma prova também seria inevitavelmente descoberta por meio de uma investigação regular e independente já em curso, a prova pode ser considerada admissível pela exceção da fonte independente, mesmo tendo origem indireta numa prova originalmente ilícita.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
