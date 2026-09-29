-- Curated (authored) questions, Direito lote 31: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Requisição, ocupação temporária e servidão administrativa',
  $q$Julgue o item a seguir.
A requisição administrativa é o ato pelo qual o poder público, em caso de iminente perigo público, utiliza bens ou serviços particulares, com indenização ulterior se houver dano, diferentemente da desapropriação, que transfere definitivamente a propriedade do bem ao poder público, mediante indenização prévia, justa e, em regra, em dinheiro.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XXV, da CF/1988 estabelece que "no caso de iminente perigo público, a autoridade competente poderá usar de propriedade particular, assegurada ao proprietário indenização ulterior, se houver dano" — essa é a requisição administrativa, medida excepcional e temporária, aplicável em situações de urgência, em que o Estado usa (e não necessariamente adquire definitivamente) um bem particular, com indenização apenas se e quando houver dano efetivo decorrente dessa utilização. Isso é bem diferente da desapropriação, instituto pelo qual o Estado transfere definitivamente a propriedade do bem para si, mediante indenização prévia, justa e, em regra, em dinheiro (art. 5º, XXIV, da CF), sendo essa indenização, em regra, condição para a própria transferência da propriedade, e não apenas eventual e posterior.
Exemplo: numa situação de calamidade pública, o poder público pode requisitar temporariamente um veículo particular para transportar vítimas, devolvendo-o depois e indenizando eventuais danos causados ao veículo durante esse uso emergencial — isso é bem diferente de desapropriar definitivamente um imóvel para construir uma rodovia, hipótese em que há transferência permanente da propriedade, mediante indenização prévia estabelecida antes mesmo da efetiva transferência.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Acumulação de cargos públicos (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na Lei nº 8.112/1990.
É vedada a acumulação remunerada de cargos públicos, exceto, quando houver compatibilidade de horários, a de dois cargos de professor, a de um cargo de professor com outro técnico ou científico, e a de dois cargos ou empregos privativos de profissionais de saúde, com profissões regulamentadas.$q$,
  'C',
  $q$Certo. O art. 37, inciso XVI, da CF/1988, combinado com o art. 118 da Lei nº 8.112/1990, estabelece a regra geral de vedação à acumulação remunerada de cargos públicos, prevendo, porém, exceções específicas, sempre condicionadas à compatibilidade de horários: acumulação de dois cargos de professor (alínea "a"); um cargo de professor com outro técnico ou científico (alínea "b"); e, desde a EC nº 34/2001, dois cargos ou empregos privativos de profissionais de saúde, com profissões regulamentadas (alínea "c"). Fora dessas hipóteses taxativamente previstas, a acumulação remunerada de cargos, empregos e funções públicas é, em regra, proibida, ainda que se trate de entes federativos diferentes.
Exemplo: um médico pode, em tese, acumular dois cargos públicos privativos de profissional de saúde (como dois cargos em unidades de saúde diferentes), desde que compatíveis os horários entre eles; já um servidor de área administrativa comum, sem enquadramento em nenhuma das exceções constitucionais, não pode, em regra, acumular dois cargos públicos remunerados simultaneamente.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direito de propriedade e função social',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É garantido o direito de propriedade, o qual, contudo, deverá atender a sua função social, sendo essa exigência um dos fundamentos constitucionais que autorizam, por exemplo, a desapropriação para fins de reforma agrária de imóvel rural que não cumpra sua função social.$q$,
  'C',
  $q$Certo. O art. 5º, incisos XXII e XXIII, da CF/1988 garante o direito de propriedade, mas condiciona seu exercício ao cumprimento de sua função social — não se trata de um direito absoluto e ilimitado. Essa exigência constitucional tem desdobramentos concretos em outros dispositivos, como o art. 184, que autoriza a União a desapropriar, por interesse social, para fins de reforma agrária, o imóvel rural que não esteja cumprindo sua função social, mediante prévia e justa indenização em títulos da dívida agrária. A função social da propriedade rural, definida no art. 186 da CF, envolve critérios como aproveitamento racional e adequado do solo, utilização adequada dos recursos naturais e observância das disposições que regulam as relações de trabalho.
Exemplo: um grande imóvel rural mantido totalmente improdutivo, sem qualquer aproveitamento econômico ou social, e que descumpra os critérios legais de função social, pode, em tese, ser objeto de desapropriação para fins de reforma agrária — a garantia constitucional da propriedade não protege, de forma absoluta, o simples "ter" a terra sem cumprir essa função social exigida pela própria Constituição.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
