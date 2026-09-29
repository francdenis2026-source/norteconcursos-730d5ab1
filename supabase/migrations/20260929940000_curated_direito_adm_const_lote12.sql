-- Curated (authored) questions, Direito lote 34: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Consórcios públicos',
  $q$Julgue o item a seguir, com base na Lei nº 11.107/2005.
Os consórcios públicos constituem-se em associação formada por entes federativos, com personalidade jurídica própria, seja de direito público, mediante associação pública, seja de direito privado, para realização de objetivos de interesse comum, sendo a gestão associada dos serviços públicos consorciados formalizada por meio de contrato de rateio e contrato de programa.$q$,
  'C',
  $q$Certo. A Lei nº 11.107/2005 disciplina os consórcios públicos, instrumentos de cooperação federativa que permitem a entes públicos (União, Estados, DF e Municípios) se unirem para realizar objetivos de interesse comum, como gestão conjunta de serviços públicos que ultrapassam a capacidade ou a competência de um único ente isoladamente. O consórcio público adquire personalidade jurídica própria, que pode ser de direito público (associação pública, integrando a administração indireta de todos os entes consorciados) ou de direito privado. As despesas do consórcio são custeadas pelos entes consorciados por meio de contrato de rateio, e a execução de atividades específicas pode ser formalizada por meio de contrato de programa entre os entes envolvidos.
Exemplo: municípios vizinhos que, sozinhos, não teriam capacidade financeira e técnica para operar individualmente um aterro sanitário adequado, podem formar um consórcio público para gerir conjuntamente esse serviço de tratamento de resíduos, dividindo custos e responsabilidades por meio dos instrumentos jurídicos previstos na lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.107/2005 – Lei de Consórcios Públicos','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11107.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Responsabilidade civil — teoria do risco administrativo',
  $q$Julgue o item a seguir.
A responsabilidade civil objetiva do Estado, adotada pelo ordenamento jurídico brasileiro, funda-se predominantemente na teoria do risco administrativo, que admite, diferentemente da teoria do risco integral, excludentes ou atenuantes de responsabilidade, como a culpa exclusiva da vítima, o caso fortuito e a força maior.$q$,
  'C',
  $q$Certo. A doutrina majoritária entende que a responsabilidade civil objetiva do Estado brasileiro, prevista no art. 37, § 6º, da CF/1988, adota, como regra geral, a teoria do risco administrativo (e não a teoria do risco integral, mais rigorosa e aplicável apenas a hipóteses excepcionais previstas em lei específica, como danos nucleares). Pela teoria do risco administrativo, embora a vítima não precise provar culpa do agente público para ser indenizada, o Estado pode, em sua defesa, demonstrar causas excludentes ou atenuantes de sua responsabilidade, como a culpa exclusiva da vítima, o caso fortuito ou a força maior, que rompem o nexo de causalidade entre a conduta estatal e o dano, afastando (total ou parcialmente) o dever de indenizar.
Exemplo: se uma pessoa é atropelada por um veículo oficial em decorrência de sua própria imprudência exclusiva (por exemplo, atravessando a via fora da faixa, ignorando sinalização e sem qualquer contribuição do condutor do veículo público), o Estado pode invocar a culpa exclusiva da vítima como excludente, afastando sua responsabilidade objetiva naquele caso específico, apesar da regra geral de responsabilidade objetiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Ministério Público',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Ministério Público é instituição permanente, essencial à função jurisdicional do Estado, incumbindo-lhe a defesa da ordem jurídica, do regime democrático e dos interesses sociais e individuais indisponíveis, gozando seus membros de garantias como vitaliciedade, inamovibilidade e irredutibilidade de subsídio.$q$,
  'C',
  $q$Certo. O art. 127, caput, da CF/1988 estabelece exatamente essa definição institucional do Ministério Público: "instituição permanente, essencial à função jurisdicional do Estado, incumbindo-lhe a defesa da ordem jurídica, do regime democrático e dos interesses sociais e individuais indisponíveis". O art. 128, § 5º, inciso I, assegura aos membros do Ministério Público garantias funcionais que buscam assegurar sua independência no exercício de suas atribuições: vitaliciedade (após dois anos de exercício, só podem perder o cargo por sentença judicial transitada em julgado), inamovibilidade (salvo por motivo de interesse público, mediante procedimento específico) e irredutibilidade de subsídio, garantias que, embora nominalmente parecidas com as da magistratura, refletem a importância institucional atribuída ao Ministério Público como instituição autônoma e independente, não integrante de nenhum dos três Poderes tradicionais.
Exemplo: essas garantias existem para que um promotor ou procurador não sofra retaliações (como remoção arbitrária ou redução salarial) por causa de investigações ou ações que promova contra pessoas politicamente poderosas ou o próprio poder público — a independência funcional depende dessa estabilidade institucional assegurada constitucionalmente.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
