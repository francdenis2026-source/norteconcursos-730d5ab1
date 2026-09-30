-- Curated (authored) questions, Direito lote 44: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção sobre Eliminação da Discriminação contra a Mulher (CEDAW)',
  $q$Julgue o item a seguir.
A Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (CEDAW), ratificada pelo Brasil, define discriminação contra a mulher como toda distinção, exclusão ou restrição baseada no sexo que tenha por objetivo ou resultado prejudicar ou anular o reconhecimento, gozo ou exercício pela mulher de direitos humanos e liberdades fundamentais.$q$,
  'C',
  $q$Certo. O art. 1º da CEDAW (adotada pela ONU em 1979, ratificada pelo Brasil e internalizada pelo Decreto nº 4.377/2002) define discriminação contra a mulher exatamente nesses termos: "toda a distinção, exclusão ou restrição baseada no sexo e que tenha por objeto ou resultado prejudicar ou anular o reconhecimento, gozo ou exercício pela mulher, independentemente de seu estado civil, com base na igualdade do homem e da mulher, dos direitos humanos e liberdades fundamentais nos campos político, econômico, social, cultural e civil ou em qualquer outro campo". A definição abrange tanto discriminação intencional (objeto) quanto discriminação de fato, mesmo sem intenção declarada de discriminar (resultado) — o que importa é o efeito prático de prejudicar ou anular o exercício de direitos pela mulher em condições de igualdade.
Exemplo: uma norma ou prática que, mesmo sem mencionar explicitamente a palavra "mulher", produza na prática um efeito de exclusão ou desvantagem sistemática para as mulheres em relação aos homens (discriminação indireta) também se enquadra no conceito da Convenção, e não apenas normas explicitamente e intencionalmente discriminatórias.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (CEDAW, 1979) – Decreto nº 4.377/2002','url','https://www.planalto.gov.br/ccivil_03/decreto/2002/d4377.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-033',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direitos humanos e mídia — direito à imagem versus interesse público',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O direito à imagem e à privacidade, assegurado constitucionalmente, não é absoluto, podendo ceder, em determinadas circunstâncias, diante do interesse público envolvido em uma investigação criminal, desde que respeitados os limites da proporcionalidade e a vedação a excessos que configurem exposição midiática vexatória e desnecessária do investigado.$q$,
  'C',
  $q$Certo. Embora o art. 5º, X, da CF/1988 assegure a inviolabilidade da intimidade, da vida privada, da honra e da imagem das pessoas, nenhum direito fundamental é absoluto — todos podem, em certas circunstâncias, ser ponderados em face de outros direitos ou interesses constitucionalmente relevantes, como o interesse público em determinadas investigações criminais. Essa ponderação, porém, deve respeitar os limites da proporcionalidade: mesmo em investigações legítimas, práticas de exposição midiática vexatória, humilhante ou desnecessária do investigado (como certos tipos de divulgação excessiva de imagens algemado, sem necessidade concreta de segurança) têm sido questionadas pela jurisprudência como potencialmente violadoras da dignidade da pessoa humana, ainda que o investigado responda por crime grave.
Exemplo: divulgar a imagem de uma pessoa presa em flagrante, dentro dos limites estritamente necessários à informação de interesse público sobre o fato, é diferente de submetê-la a uma exposição midiática humilhante e desproporcional (como desfiles públicos ou situações vexatórias deliberadamente encenadas), que podem configurar violação a direitos fundamentais mesmo diante de um contexto de investigação criminal legítima.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Combate à Violência Política de Gênero',
  $q$Julgue o item a seguir, com base na Lei nº 14.192/2021.
A Lei de Combate à Violência Política contra a Mulher define a violência política de gênero como toda ação, conduta ou omissão com a finalidade de impedir, obstaculizar ou restringir os direitos políticos da mulher, podendo ocorrer no âmbito de partidos políticos, sindicatos, associações ou mesmo pela internet, e prevê a possibilidade de cassação de registro ou diploma de candidato que a pratique.$q$,
  'C',
  $q$Certo. A Lei nº 14.192/2021 estabelece normas para prevenir, reprimir e combater a violência política contra a mulher, reconhecendo que essa forma de violência pode se manifestar em diferentes espaços — dentro de partidos políticos, sindicatos, associações, ou por meio de plataformas digitais e redes sociais — sempre com o objetivo ou efeito de impedir, restringir ou anular o exercício dos direitos políticos das mulheres, seja no acesso a cargos eletivos, seja na participação política em geral. A lei prevê, entre suas consequências, a possibilidade de responsabilização eleitoral do agressor, incluindo a cassação de registro de candidatura ou diploma daquele que praticar atos configuradores dessa violência, reforçando a proteção à participação política feminina em condições de igualdade.
Exemplo: campanhas sistemáticas de descrédito, humilhação ou intimidação dirigidas especificamente contra uma candidata, com o objetivo de desestimular sua participação política ou inviabilizar sua candidatura, podem configurar violência política de gênero nos termos dessa lei, sujeitando o responsável a consequências jurídicas específicas na esfera eleitoral.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.192/2021 – Lei de Combate à Violência Política contra a Mulher','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14192.htm')),
  'média', now()
);
