-- Curated (authored) questions, Direito lote 12: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Pacto Internacional sobre Direitos Civis e Políticos',
  $q$Julgue o item a seguir.
O Pacto Internacional sobre Direitos Civis e Políticos, de 1966, ratificado pelo Brasil, assegura, entre outros direitos, que ninguém poderá ser preso ou detido arbitrariamente, e que toda pessoa privada de liberdade tem direito a recorrer a um tribunal para que este decida sem demora sobre a legalidade de sua detenção.$q$,
  'C',
  $q$Certo. O Pacto Internacional sobre Direitos Civis e Políticos (PIDCP), adotado pela ONU em 1966 e ratificado pelo Brasil (promulgado internamente pelo Decreto nº 592/1992), traz em seu art. 9º exatamente essas garantias: a vedação à prisão ou detenção arbitrária, e o direito de qualquer pessoa privada de liberdade por prisão ou detenção de recorrer a um tribunal, a fim de que este decida sem demora sobre a legalidade dessa detenção, ordenando sua soltura caso a prisão não seja legal. Esse mecanismo tem paralelo direto, no direito interno brasileiro, com o instituto do habeas corpus e, mais recentemente, com a própria audiência de custódia.
Exemplo: essa é exatamente a lógica por trás da audiência de custódia brasileira — levar rapidamente o preso à presença de um juiz para que a legalidade da prisão seja verificada sem demora, em linha com o compromisso internacional assumido pelo Brasil ao ratificar o Pacto.$q$,
  jsonb_build_array(jsonb_build_object('title','Pacto Internacional sobre Direitos Civis e Políticos (1966) – Decreto nº 592/1992','url','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0592.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção contra a Tortura (ONU)',
  $q$Julgue o item a seguir.
A Convenção das Nações Unidas contra a Tortura e Outros Tratamentos ou Penas Cruéis, Desumanos ou Degradantes estabelece que nenhuma circunstância excepcional, seja estado de guerra ou ameaça de guerra, instabilidade política interna ou qualquer outra emergência pública, poderá ser invocada como justificação para a tortura.$q$,
  'C',
  $q$Certo. O art. 2º, item 2, da Convenção contra a Tortura (adotada pela ONU em 1984 e internalizada no Brasil pelo Decreto nº 40/1991) estabelece expressamente que "em nenhum caso poderão invocar-se circunstâncias excepcionais, tais como o estado de guerra ou ameaça de guerra, instabilidade política interna ou qualquer outra emergência pública, como justificação para a tortura". Essa é uma das características que tornam a proibição da tortura um exemplo de norma de direito internacional considerada absoluta (jus cogens) — não admite exceções, nem mesmo em situações extremas de crise ou emergência nacional.
Exemplo: mesmo em um cenário de grave crise de segurança nacional, um Estado que ratificou essa Convenção não pode justificar o uso de tortura sob a alegação de "necessidade excepcional" — a proibição é absoluta e não comporta esse tipo de ponderação circunstancial.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção contra a Tortura (ONU, 1984) – Decreto nº 40/1991','url','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '012bdb9d-f67d-48e9-911e-10be9fc9226e', 'auth-leg-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Abuso de Autoridade — sujeitos e sanções',
  $q$Julgue o item a seguir, com base na Lei nº 13.869/2019.
Sujeita-se às sanções da Lei de Abuso de Autoridade qualquer agente público, servidor ou não, que, no exercício de suas funções ou a pretexto de exercê-las, pratique as condutas nela descritas, ainda que se encontre fora do exercício de suas funções, mas atuando com abuso do cargo que ocupa.$q$,
  'C',
  $q$Certo. O art. 2º da Lei nº 13.869/2019 estabelece que se considera agente público, para os efeitos dessa lei, todo aquele que exerce, ainda que transitoriamente ou sem remuneração, por eleição, nomeação, designação, contratação ou qualquer outra forma de investidura ou vínculo, mandato, cargo, emprego ou função em órgão ou entidade pública, o que inclui uma gama ampla de pessoas ligadas à administração, não se restringindo a servidores efetivos. O parágrafo único do mesmo artigo esclarece que se aplicam as sanções a quaisquer agentes públicos, "ainda que fora do exercício de suas funções ou antes de assumi-las, mas em razão delas", desde que o abuso guarde relação com a posição de autoridade ocupada.
Exemplo: um agente público que, mesmo estando de folga naquele dia, usa indevidamente sua condição de autoridade para intimidar alguém pode, dependendo do caso concreto e da relação com sua função, se sujeitar às sanções da Lei de Abuso de Autoridade, já que a lei não limita sua aplicação estritamente ao horário formal de expediente.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.869/2019 – Lei de Abuso de Autoridade','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'ECA — direito à convivência familiar',
  $q$Julgue o item a seguir, com base na Lei nº 8.069/1990.
Toda criança ou adolescente tem direito a ser criado e educado no seio de sua família e, excepcionalmente, em família substituta, sendo a colocação em família substituta feita mediante guarda, tutela ou adoção, independentemente da situação jurídica da criança ou adolescente, nos termos da lei.$q$,
  'C',
  $q$Certo. O art. 19, caput, do ECA estabelece que "é direito da criança e do adolescente ser criado e educado no seio de sua família e, excepcionalmente, em família substituta, assegurada a convivência familiar e comunitária" — reforçando que a permanência na família de origem é a regra, e a família substituta, a exceção, priorizada apenas quando a manutenção na família natural não for possível ou recomendável. O art. 28 esclarece que a colocação em família substituta se dá por guarda, tutela ou adoção, independentemente da situação jurídica da criança ou do adolescente, cada uma dessas modalidades com requisitos e efeitos jurídicos próprios definidos ao longo da lei.
Exemplo: antes de encaminhar uma criança para adoção, o sistema de proteção busca, sempre que possível, preservar ou restabelecer os vínculos com a família de origem (pais ou parentes próximos) — só quando essa manutenção se mostra inviável ou prejudicial ao bem-estar da criança é que se avalia a colocação em família substituta.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990 – Estatuto da Criança e do Adolescente','url','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm')),
  'média', now()
);
