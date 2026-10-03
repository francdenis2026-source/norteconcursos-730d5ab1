-- Curated (authored) questions for SEFAZ/AC (edital 2023), lote 02: 30
-- questões cobrindo as 9 disciplinas do edital com subtemas inéditos.
-- Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'Avaliação de desempenho institucional',
  $q$Julgue o item a seguir, com base em Administração Pública.
A avaliação de desempenho institucional consiste na aferição periódica dos resultados alcançados por órgãos e entidades públicas em relação às metas pactuadas, servindo de base para o aprimoramento da gestão e, eventualmente, para o ajuste de parcerias e contratos de gestão firmados com entidades do terceiro setor.$q$,
  'C',
  $q$Certo. A avaliação de desempenho institucional é instrumento de gestão que compara os resultados efetivamente alcançados por um órgão ou entidade com as metas previamente estabelecidas, subsidiando decisões sobre a continuidade, o ajuste ou a revisão de políticas, programas e instrumentos de parceria, como os contratos de gestão celebrados com Organizações Sociais. Exemplo: o desempenho insatisfatório de uma entidade parceira em relação às metas de um contrato de gestão pode fundamentar a revisão ou a não renovação dessa parceria pelo Poder Público.$q$,
  jsonb_build_array(jsonb_build_object('title','Administração Pública — Avaliação de desempenho institucional','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'Princípio da oficialidade no processo administrativo (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
A Administração tem o poder-dever de impulsionar de ofício o processo administrativo, independentemente de provocação do interessado, podendo determinar a produção das provas que entender necessárias à instrução do feito.$q$,
  'C',
  $q$Certo. O art. 2º da Lei nº 9.784/1999 consagra o princípio da oficialidade, atribuindo à Administração a responsabilidade de impulsionar o andamento do processo administrativo, sem depender exclusivamente da atuação do interessado, o que inclui a possibilidade de determinar, de ofício, a produção de provas complementares que julgue necessárias para o correto esclarecimento dos fatos. Exemplo: mesmo sem requerimento expresso do interessado, a Administração pode determinar a realização de perícia técnica que considere indispensável para decidir corretamente um processo administrativo tributário.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, art. 2º','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-07',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'Improbidade administrativa — modalidades de atos ímprobos',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992.
A Lei de Improbidade Administrativa distingue os atos que importam enriquecimento ilícito, os que causam prejuízo ao erário e os que atentam contra os princípios da administração pública, cada categoria com sanções específicas e, após a reforma promovida pela Lei nº 14.230/2021, exigindo em todas elas a comprovação de dolo do agente.$q$,
  'C',
  $q$Certo. Os arts. 9º, 10 e 11 da Lei nº 8.429/1992 classificam os atos de improbidade em três categorias distintas, cada qual com consequências e sanções próprias, e a reforma de 2021 unificou a exigência do elemento subjetivo dolo para a configuração de improbidade em qualquer dessas modalidades, afastando definitivamente a antiga responsabilização por culpa nos atos que causam prejuízo ao erário. Exemplo: um agente que, comprovadamente com dolo, favorece empresa em processo licitatório fraudulento pode responder por ato de improbidade que atenta contra os princípios da administração, ainda que não haja enriquecimento pessoal direto.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, arts. 9º-11, com redação da Lei nº 14.230/2021','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-08',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'Lei de Acesso à Informação — transparência ativa',
  $q$Julgue o item a seguir, com base na Lei nº 12.527/2011 (Lei de Acesso à Informação).
A transparência ativa consiste na divulgação de informações de interesse público independentemente de solicitação, por meio de sítios eletrônicos oficiais, abrangendo dados como estrutura organizacional, competências, despesas, licitações e contratos, em contraposição à transparência passiva, que depende de pedido do interessado.$q$,
  'C',
  $q$Certo. A Lei nº 12.527/2011 distingue a transparência ativa, na qual o próprio órgão público divulga proativamente informações consideradas de interesse geral (independentemente de qualquer solicitação), da transparência passiva, que se concretiza mediante resposta a um pedido específico formulado por cidadão, sendo ambas as modalidades complementares na concretização do princípio da publicidade administrativa. Exemplo: a divulgação, no sítio eletrônico de uma secretaria de fazenda estadual, dos contratos e das despesas realizadas, sem necessidade de solicitação prévia, exemplifica a transparência ativa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.527/2011, art. 8º','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'f6641c35-031b-42c6-9959-5da693486a33', 'sefazac23-const-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Constitucional', 'Princípio da simetria constitucional',
  $q$Julgue o item a seguir, com base na doutrina constitucional.
Os estados-membros organizam-se por meio de constituições próprias, elaboradas por suas Assembleias Legislativas, observados os princípios estabelecidos na Constituição Federal, fenômeno conhecido como princípio da simetria, que impõe a reprodução, nas constituições estaduais, de normas de observância obrigatória da Carta Federal.$q$,
  'C',
  $q$Certo. O princípio da simetria (ou paralelismo constitucional) decorre da estrutura federativa brasileira, exigindo que as constituições estaduais reproduzam determinadas normas e modelos estabelecidos pela Constituição Federal, especialmente aquelas relacionadas à organização dos Poderes e a princípios fundamentais, de modo a preservar a coerência do sistema constitucional em todos os entes da federação. Exemplo: a estrutura do processo legislativo estadual deve, em regra, seguir o modelo previsto na Constituição Federal para o processo legislativo federal, em razão do princípio da simetria.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina constitucional — Princípio da simetria','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'f6641c35-031b-42c6-9959-5da693486a33', 'sefazac23-const-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Constitucional', 'Órgãos do Poder Judiciário (art. 92, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São órgãos do Poder Judiciário o Supremo Tribunal Federal, o Conselho Nacional de Justiça, o Superior Tribunal de Justiça, os Tribunais Regionais Federais e Juízes Federais, os Tribunais e Juízes do Trabalho, os Tribunais e Juízes Eleitorais, os Tribunais e Juízes Militares, e os Tribunais e Juízes dos estados e do Distrito Federal e Territórios.$q$,
  'C',
  $q$Certo. O art. 92 da Constituição Federal enumera taxativamente os órgãos que integram a estrutura do Poder Judiciário brasileiro, contemplando tanto a Justiça comum federal e estadual quanto as Justiças especializadas (trabalhista, eleitoral e militar), além dos órgãos de cúpula (STF) e de controle administrativo e funcional (CNJ). Exemplo: um Tribunal de Justiça estadual, como o do Acre, integra a estrutura do Poder Judiciário nos termos desse dispositivo constitucional.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 92','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'f6641c35-031b-42c6-9959-5da693486a33', 'sefazac23-const-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Constitucional', 'Competência residual dos estados (art. 25, § 1º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São reservadas aos estados as competências que não lhes sejam vedadas pela Constituição Federal, adotando-se, portanto, o critério da competência residual (ou remanescente) em favor dos estados-membros.$q$,
  'C',
  $q$Certo. O art. 25, § 1º, da Constituição Federal adota, em relação aos estados-membros, a técnica da competência residual, atribuindo-lhes tudo aquilo que não estiver expressamente reservado à União, aos municípios ou vedado pela própria Constituição, técnica distinta da adotada para os municípios e para a União, cujas competências são enumeradas de forma mais específica. Exemplo: na ausência de disposição constitucional expressa reservando determinada matéria à União ou aos municípios, presume-se a competência do estado-membro para legislar ou atuar administrativamente sobre ela.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 25, § 1º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'Constituição do crédito tributário pelo lançamento (art. 142, CTN)',
  $q$Julgue o item a seguir, com base no Código Tributário Nacional.
Compete privativamente à autoridade administrativa constituir o crédito tributário pelo lançamento, entendido como o procedimento tendente a verificar a ocorrência do fato gerador, determinar a matéria tributável, calcular o montante devido, identificar o sujeito passivo e, sendo caso, propor a aplicação da penalidade cabível.$q$,
  'C',
  $q$Certo. O art. 142 do Código Tributário Nacional atribui privativamente à autoridade administrativa a competência para constituir o crédito tributário por meio do lançamento, ato administrativo vinculado e obrigatório que formaliza a obrigação tributária, definindo com precisão os elementos essenciais da cobrança (fato gerador, base de cálculo, sujeito passivo e, se cabível, penalidade), tornando o crédito líquido, certo e exigível. Exemplo: a autoridade fazendária, ao identificar que um contribuinte deixou de recolher determinado imposto, procede ao lançamento de ofício, constituindo formalmente o crédito tributário correspondente.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Tributário Nacional, art. 142','url','https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'Prescrição e decadência tributárias',
  $q$Julgue o item a seguir, com base no Código Tributário Nacional.
A decadência extingue o direito de a Fazenda Pública constituir o crédito tributário pelo lançamento, enquanto a prescrição extingue o direito de ação para a cobrança judicial do crédito já constituído, sendo ambos os institutos disciplinados, em regra, pelo prazo de cinco anos previsto no Código Tributário Nacional.$q$,
  'C',
  $q$Certo. A decadência tributária (art. 173 do CTN) atinge o próprio direito de lançar o tributo, extinguindo-o se não exercido no prazo legal, ao passo que a prescrição (art. 174 do CTN) incide sobre o direito de ação para a cobrança judicial de crédito já regularmente constituído pelo lançamento, sendo, em ambos os casos, o prazo geral de cinco anos, contados, porém, a partir de marcos temporais distintos para cada instituto. Exemplo: se a Fazenda Pública deixa de lançar um tributo dentro do prazo decadencial, perde definitivamente o direito de constituir o crédito correspondente; se, após o lançamento, deixa de cobrar judicialmente dentro do prazo prescricional, perde o direito de ação para essa cobrança.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Tributário Nacional, arts. 173-174','url','https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-07',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'Imunidade tributária recíproca (art. 150, VI, "a", CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É vedado à União, aos estados, ao Distrito Federal e aos municípios instituir impostos sobre patrimônio, renda ou serviços uns dos outros, vedação que se estende às autarquias e fundações públicas mantidas pelo Poder Público, quanto ao patrimônio, à renda e aos serviços vinculados às suas finalidades essenciais.$q$,
  'C',
  $q$Certo. A imunidade tributária recíproca, prevista no art. 150, inciso VI, alínea "a", e no § 2º do mesmo artigo, protege os entes federativos e suas autarquias e fundações de instituição de impostos entre si sobre patrimônio, renda ou serviços vinculados às finalidades essenciais, em decorrência do princípio federativo e da isonomia entre os entes públicos, mas não se estende, em regra, às empresas estatais exploradoras de atividade econômica. Exemplo: o estado do Acre não pode cobrar IPTU sobre imóvel de propriedade de autarquia federal utilizado para suas finalidades institucionais, em razão da imunidade recíproca.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 150, VI, "a", e § 2º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-08',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'Fato gerador da obrigação tributária (art. 114, CTN)',
  $q$Julgue o item a seguir, com base no Código Tributário Nacional.
Fato gerador da obrigação tributária principal é a situação definida em lei como necessária e suficiente à sua ocorrência, sendo a obrigação principal aquela que tem por objeto o pagamento de tributo ou de penalidade pecuniária.$q$,
  'C',
  $q$Certo. O art. 114 do Código Tributário Nacional define o fato gerador da obrigação principal como a hipótese legalmente prevista cuja ocorrência concreta faz nascer o dever de pagamento, seja de tributo, seja de penalidade pecuniária decorrente do descumprimento de obrigação tributária, distinguindo-se da obrigação acessória, que tem por objeto prestações de fazer ou não fazer, como a emissão de nota fiscal. Exemplo: a circulação de mercadoria configura o fato gerador do ICMS, obrigação principal que se concretiza com a ocorrência dessa situação prevista em lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Tributário Nacional, art. 114','url','https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'b863175e-b66b-44b1-94d7-c44ead86d09e', 'sefazac23-info-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Informática', 'Sincronização de arquivos em nuvem',
  $q$Julgue o item a seguir, com base em noções de informática.
Os serviços de armazenamento em nuvem permitem a sincronização automática de arquivos entre múltiplos dispositivos conectados à mesma conta, de modo que alterações feitas em um dispositivo são refletidas nos demais assim que houver conexão à internet.$q$,
  'C',
  $q$Certo. A sincronização automática é uma das principais vantagens dos serviços de armazenamento em nuvem, permitindo que o mesmo conjunto de arquivos permaneça atualizado em todos os dispositivos vinculados à conta do usuário, sem necessidade de transferência manual, bastando que os dispositivos estejam conectados à internet para que as alterações sejam propagadas. Exemplo: um documento editado no computador do trabalho estará automaticamente atualizado no celular do usuário, desde que ambos os dispositivos estejam sincronizados com a mesma conta de armazenamento em nuvem.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Armazenamento em nuvem','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'b863175e-b66b-44b1-94d7-c44ead86d09e', 'sefazac23-info-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Informática', 'Planilha eletrônica — referências absoluta e relativa',
  $q$Julgue o item a seguir, com base em noções de informática.
Em planilhas eletrônicas, a referência relativa a uma célula se ajusta automaticamente quando a fórmula é copiada para outras células, enquanto a referência absoluta, indicada pelo símbolo "$" antes da coluna e/ou da linha, permanece fixa independentemente de a fórmula ser copiada para outro local.$q$,
  'C',
  $q$Certo. Nas planilhas eletrônicas, a referência relativa se ajusta proporcionalmente à posição para onde a fórmula é copiada, enquanto a referência absoluta, fixada com o símbolo "$" antes da coluna e/ou da linha (por exemplo, "$A$1"), mantém-se constante, apontando sempre para a mesma célula, independentemente de a fórmula ser copiada para outras posições da planilha. Exemplo: em uma planilha que calcula o valor de diferentes itens multiplicados por uma taxa fixa localizada em uma única célula, essa célula da taxa deve ser referenciada de forma absoluta, para que a fórmula copiada para outras linhas continue apontando para o mesmo valor.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Planilhas eletrônicas','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'b863175e-b66b-44b1-94d7-c44ead86d09e', 'sefazac23-info-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Informática', 'LGPD — controlador e operador de dados',
  $q$Julgue o item a seguir, com base na Lei nº 13.709/2018 (LGPD).
O controlador é a pessoa física ou jurídica responsável pelas decisões referentes ao tratamento de dados pessoais, enquanto o operador realiza o tratamento de dados pessoais em nome do controlador, seguindo suas instruções.$q$,
  'C',
  $q$Certo. O art. 5º, incisos VI e VII, da Lei nº 13.709/2018 distingue os dois principais agentes de tratamento de dados pessoais: o controlador, que toma as decisões referentes à finalidade e aos meios do tratamento, e o operador, que executa o tratamento em nome do controlador, conforme as instruções recebidas, sendo essa distinção relevante para a atribuição de responsabilidades em caso de violação de dados. Exemplo: um órgão público que contrata uma empresa terceirizada para processar dados de contribuintes figura como controlador, enquanto a empresa contratada, que segue as instruções recebidas, figura como operadora.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.709/2018, art. 5º, VI e VII','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '83c2e133-2cf6-465b-867b-6f55b9eb7a0c', 'sefazac23-port-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Língua Portuguesa', 'Voz ativa e voz passiva',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Na voz ativa, o sujeito pratica a ação expressa pelo verbo; na voz passiva, o sujeito sofre a ação, sendo esta representada, na forma analítica, pelo verbo "ser" seguido de particípio, acompanhado, quando explicitado, do agente da passiva introduzido pela preposição "por".$q$,
  'C',
  $q$Certo. A distinção entre voz ativa (sujeito agente, que pratica a ação) e voz passiva (sujeito paciente, que sofre a ação) é fundamental na análise sintática, sendo a voz passiva analítica formada pela combinação do verbo auxiliar "ser" com o particípio do verbo principal, podendo apresentar, de forma explícita, o agente da passiva, introduzido pela preposição "por" (ou "de", em casos específicos). Exemplo: "O fiscal autuou a empresa" (voz ativa) corresponde a "A empresa foi autuada pelo fiscal" (voz passiva analítica, com agente da passiva explícito).$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Vozes verbais','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '83c2e133-2cf6-465b-867b-6f55b9eb7a0c', 'sefazac23-port-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Língua Portuguesa', 'Conjunções subordinativas condicionais',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
As conjunções subordinativas condicionais introduzem uma oração que expressa condição para a realização do fato descrito na oração principal, sendo "se", "caso" e "contanto que" exemplos comuns desse tipo de conjunção.$q$,
  'C',
  $q$Certo. As orações subordinadas adverbiais condicionais, introduzidas por conjunções como "se", "caso" e "contanto que", estabelecem uma relação de dependência lógica entre a condição expressa nessa oração e a realização do fato descrito na oração principal, sendo estrutura frequente tanto em textos técnicos e normativos quanto na linguagem comum. Exemplo: "Caso o contribuinte não regularize a pendência, será autuado" apresenta a oração condicional "caso o contribuinte não regularize a pendência" como requisito para a consequência descrita na oração principal.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Orações subordinadas condicionais','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '83c2e133-2cf6-465b-867b-6f55b9eb7a0c', 'sefazac23-port-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Língua Portuguesa', 'Crase antes de nomes de lugares',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
O uso da crase antes de nomes de lugares depende da regência do verbo empregado e da aceitação, pelo nome do lugar, do artigo definido feminino "a", sendo necessário testar a substituição por "para a" ou "da" para verificar a exigência do artigo.$q$,
  'C',
  $q$Certo. A regra prática para verificar a ocorrência de crase antes de topônimos consiste em substituir a expressão original por uma equivalente com "para a" ou "da": se o resultado exigir o artigo feminino ("para a", "da"), a crase deve ser empregada; caso a substituição resulte em "para" ou "de" (sem artigo), a crase é indevida. Exemplo: "Vou a Salvador" não leva crase (substituindo: "vou para Salvador", sem artigo), mas "Vou à Bahia" leva crase (substituindo: "vou para a Bahia", com artigo).$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Crase e nomes de lugares','url','https://www.gov.br/acre/pt-br')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '3a0a8f3a-5ca9-4644-8080-4aa90391f839', 'sefazac23-matfin-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Matemática Financeira', 'Taxa de juros nominal e taxa efetiva',
  $q$Julgue o item a seguir, com base em matemática financeira.
A taxa nominal de juros é aquela declarada para um determinado período, geralmente anual, sem considerar o efeito da capitalização em períodos menores dentro desse intervalo, enquanto a taxa efetiva reflete o rendimento real da aplicação, considerando o efeito da capitalização composta nos subperíodos.$q$,
  'C',
  $q$Certo. A taxa nominal é aquela informalmente divulgada, geralmente referida a um período maior (como o ano), mas capitalizada em intervalos menores (como o mês), sem incorporar o efeito da composição de juros; já a taxa efetiva já reflete o resultado real da aplicação, considerando o efeito cumulativo da capitalização composta ao longo dos subperíodos, sendo, em regra, superior à taxa nominal quando há capitalização mais de uma vez no período de referência. Exemplo: uma taxa nominal de 12% ao ano, capitalizada mensalmente, resulta em taxa efetiva anual superior a 12%, em razão do efeito dos juros compostos mensais.$q$,
  jsonb_build_array(jsonb_build_object('title','Matemática Financeira — Taxas nominal e efetiva','url','https://www.gov.br/acre/pt-br')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '3a0a8f3a-5ca9-4644-8080-4aa90391f839', 'sefazac23-matfin-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Matemática Financeira', 'Regra de três simples',
  $q$Julgue o item a seguir, com base em matemática financeira.
A regra de três simples é utilizada para resolver problemas envolvendo duas grandezas diretamente ou inversamente proporcionais, estabelecendo uma proporção entre os valores conhecidos e o valor desconhecido a ser determinado.$q$,
  'C',
  $q$Certo. A regra de três simples aplica-se a situações envolvendo duas grandezas relacionadas de forma proporcional, sendo diretamente proporcionais quando o aumento de uma implica aumento proporcional da outra, e inversamente proporcionais quando o aumento de uma implica diminuição proporcional da outra, permitindo calcular um valor desconhecido a partir de uma proporção estabelecida com valores já conhecidos. Exemplo: se 5 servidores completam determinada tarefa em 10 dias, o cálculo de quantos dias seriam necessários com 10 servidores (mantida a mesma produtividade individual) envolve uma relação inversamente proporcional, resolvida por regra de três simples.$q$,
  jsonb_build_array(jsonb_build_object('title','Matemática Financeira — Regra de três simples','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '3a0a8f3a-5ca9-4644-8080-4aa90391f839', 'sefazac23-matfin-07',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Matemática Financeira', 'Taxas de juros equivalentes',
  $q$Julgue o item a seguir, com base em matemática financeira.
Duas taxas de juros compostos, referentes a períodos de capitalização diferentes, são consideradas equivalentes quando produzem o mesmo montante final a partir de um mesmo capital inicial, aplicado pelo mesmo intervalo de tempo total.$q$,
  'C',
  $q$Certo. O conceito de taxas equivalentes é central na comparação de investimentos ou financiamentos que utilizam periodicidades de capitalização distintas (por exemplo, taxa mensal versus taxa anual), sendo duas taxas consideradas equivalentes, no regime de juros compostos, quando geram exatamente o mesmo montante final para um mesmo capital inicial e um mesmo período total de aplicação. Exemplo: uma taxa de juros compostos de 1% ao mês não é simplesmente equivalente a 12% ao ano (essa seria a taxa proporcional), pois a taxa anual equivalente, em regime composto, deve considerar o efeito cumulativo da capitalização mensal ao longo dos doze meses.$q$,
  jsonb_build_array(jsonb_build_object('title','Matemática Financeira — Taxas equivalentes','url','https://www.gov.br/acre/pt-br')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'fea05670-5a61-4d8d-b74c-10ff2eca9e94', 'sefazac23-orcpub-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Orçamento Público', 'Princípio da anualidade orçamentária',
  $q$Julgue o item a seguir, com base no Direito Financeiro.
O orçamento público deve ser elaborado e aprovado para viger durante um exercício financeiro determinado, coincidente, no Brasil, com o ano civil, sendo renovado anualmente por meio da aprovação de nova lei orçamentária.$q$,
  'C',
  $q$Certo. O princípio da anualidade orçamentária estabelece que a peça orçamentária tem vigência limitada a um exercício financeiro, que no Brasil coincide com o ano civil (1º de janeiro a 31 de dezembro), exigindo que uma nova lei orçamentária seja elaborada e aprovada a cada ano, o que permite o acompanhamento periódico e a renovação do planejamento das receitas e despesas públicas. Exemplo: a Lei Orçamentária Anual aprovada para determinado exercício não produz efeitos automáticos para o exercício seguinte, exigindo a elaboração e aprovação de uma nova LOA.$q$,
  jsonb_build_array(jsonb_build_object('title','Direito Financeiro — Princípio da anualidade orçamentária','url','https://www.planalto.gov.br/ccivil_03/leis/l4320.htm')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'fea05670-5a61-4d8d-b74c-10ff2eca9e94', 'sefazac23-orcpub-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Orçamento Público', 'Créditos adicionais — suplementares e especiais',
  $q$Julgue o item a seguir, com base na Lei nº 4.320/1964.
Créditos suplementares destinam-se ao reforço de dotação orçamentária já existente, ao passo que os créditos especiais destinam-se a despesas para as quais não haja dotação orçamentária específica, sendo ambos autorizados por lei e abertos por decreto do Poder Executivo, dentro dos limites autorizados.$q$,
  'C',
  $q$Certo. A Lei nº 4.320/1964 classifica os créditos adicionais em suplementares (reforço de dotação já existente no orçamento), especiais (destinados a despesas sem dotação orçamentária específica) e extraordinários (destinados a despesas urgentes e imprevisíveis, como guerra ou calamidade pública), sendo os dois primeiros dependentes de autorização legislativa prévia e abertos por decreto do Executivo dentro do limite autorizado. Exemplo: caso uma secretaria estadual necessite de recursos adicionais para uma dotação já prevista no orçamento, mas insuficiente, pode ser aberto crédito suplementar, mediante autorização legislativa e decreto correspondente.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 4.320/1964, arts. 40-46','url','https://www.planalto.gov.br/ccivil_03/leis/l4320.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'fea05670-5a61-4d8d-b74c-10ff2eca9e94', 'sefazac23-orcpub-07',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Orçamento Público', 'Princípio do equilíbrio orçamentário',
  $q$Julgue o item a seguir, com base no Direito Financeiro.
O orçamento público deve buscar o equilíbrio entre as receitas previstas e as despesas fixadas, evitando déficits sistemáticos que comprometam a saúde financeira do ente público e a sustentabilidade da dívida pública ao longo do tempo.$q$,
  'C',
  $q$Certo. O princípio do equilíbrio orçamentário orienta a elaboração e a execução do orçamento no sentido de compatibilizar receitas e despesas, sem que isso signifique proibição absoluta de déficits pontuais, mas sim a preocupação com a sustentabilidade fiscal de médio e longo prazo, refletida também em normas de responsabilidade fiscal que buscam controlar o endividamento público. Exemplo: um ente federativo que reiteradamente executa orçamentos deficitários, sem planejamento de ajuste, tende a comprometer sua capacidade futura de honrar compromissos financeiros, violando a lógica do equilíbrio orçamentário.$q$,
  jsonb_build_array(jsonb_build_object('title','Direito Financeiro — Princípio do equilíbrio orçamentário','url','https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '0cae21c1-7187-4257-9571-5103fcf24a68', 'sefazac23-rlm-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Raciocínio Lógico', 'Regra de inferência modus tollens',
  $q$Julgue o item a seguir, com base na lógica proposicional.
Pela regra de inferência modus tollens, se a proposição "se P então Q" é verdadeira e Q é falsa, então necessariamente P também é falsa, constituindo outra forma válida de argumento dedutivo.$q$,
  'C',
  $q$Certo. O modus tollens é uma regra de inferência válida que permite concluir a falsidade de P a partir da verdade do condicional "P → Q" combinada com a falsidade de Q, representando o raciocínio da negação do consequente para negar o antecedente, complementar ao modus ponens na lógica dedutiva. Exemplo: se é verdade que "se o tributo foi pago, então há comprovante de quitação" e é verdade que "não há comprovante de quitação", conclui-se, por modus tollens, que "o tributo não foi pago".$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Modus tollens','url','https://www.gov.br/acre/pt-br')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '0cae21c1-7187-4257-9571-5103fcf24a68', 'sefazac23-rlm-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Raciocínio Lógico', 'Conjuntos disjuntos',
  $q$Julgue o item a seguir, com base na teoria dos conjuntos.
Dois conjuntos são disjuntos quando não possuem nenhum elemento em comum, sendo sua intersecção, portanto, um conjunto vazio.$q$,
  'C',
  $q$Certo. Na teoria dos conjuntos, diz-se que dois conjuntos são disjuntos quando não compartilham nenhum elemento entre si, de modo que a operação de intersecção entre eles resulta necessariamente no conjunto vazio, propriedade útil na resolução de problemas envolvendo classificação e contagem de elementos em diferentes categorias. Exemplo: o conjunto de contribuintes pessoas físicas e o conjunto de contribuintes pessoas jurídicas, em uma classificação mutuamente exclusiva, são conjuntos disjuntos entre si.$q$,
  jsonb_build_array(jsonb_build_object('title','Teoria dos conjuntos — Conjuntos disjuntos','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '0cae21c1-7187-4257-9571-5103fcf24a68', 'sefazac23-rlm-06',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Raciocínio Lógico', 'Progressão geométrica',
  $q$Julgue o item a seguir, com base em raciocínio lógico-matemático.
Em uma progressão geométrica, cada termo, a partir do segundo, é obtido pela multiplicação do termo anterior por uma razão constante, sendo essa razão o quociente fixo entre termos consecutivos da sequência.$q$,
  'C',
  $q$Certo. A progressão geométrica caracteriza-se por manter constante o quociente entre quaisquer dois termos consecutivos (a razão), de modo que cada termo, a partir do segundo, resulta da multiplicação do termo imediatamente anterior por essa razão fixa, gerando, conforme o valor da razão, crescimento ou decrescimento exponencial dos termos da sequência. Exemplo: na sequência 3, 6, 12, 24, a razão constante é igual a 2, caracterizando uma progressão geométrica.$q$,
  jsonb_build_array(jsonb_build_object('title','Raciocínio lógico-matemático — Progressão geométrica','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '0cae21c1-7187-4257-9571-5103fcf24a68', 'sefazac23-rlm-07',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Raciocínio Lógico', 'Tabela-verdade da conjunção',
  $q$Julgue o item a seguir, com base na lógica proposicional.
A conjunção "P e Q" é verdadeira somente quando ambas as proposições P e Q são verdadeiras simultaneamente, sendo falsa em todos os demais casos.$q$,
  'C',
  $q$Certo. O conectivo de conjunção (∧), representado pela palavra "e", exige que ambas as proposições componentes sejam verdadeiras para que o resultado da conjunção também seja verdadeiro, bastando que uma delas seja falsa para que toda a proposição composta seja considerada falsa. Exemplo: a afirmação "o contribuinte pagou o imposto e apresentou a declaração" só é verdadeira se ambas as condições (pagamento e apresentação da declaração) tiverem efetivamente ocorrido.$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Conjunção','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'd1ce0696-d39b-4ec3-9a52-31c9c323fc40', 'sefazac23-realac-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Realidade do Acre', 'ICMS como principal fonte de arrecadação estadual',
  $q$Julgue o item a seguir, com base na realidade econômica e tributária do Acre.
Entre as receitas próprias dos estados brasileiros, incluindo o Acre, o ICMS costuma representar a principal fonte de arrecadação tributária estadual, complementada por outras receitas como o IPVA e taxas estaduais diversas.$q$,
  'C',
  $q$Certo. O ICMS é, de forma geral, o imposto de maior arrecadação própria entre os estados brasileiros, dada sua ampla base de incidência sobre a circulação de mercadorias e determinados serviços, o que se aplica também ao Acre, que complementa sua arrecadação com o IPVA e outras receitas tributárias e não tributárias, incluindo transferências constitucionais recebidas da União. Exemplo: a arrecadação de ICMS é fundamental para o financiamento de políticas públicas estaduais, incluindo áreas como saúde, educação e segurança pública no Acre.$q$,
  jsonb_build_array(jsonb_build_object('title','Realidade do Acre — Estrutura tributária estadual','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'd1ce0696-d39b-4ec3-9a52-31c9c323fc40', 'sefazac23-realac-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Realidade do Acre', 'Povos indígenas do Acre',
  $q$Julgue o item a seguir, com base na realidade cultural do Acre.
O estado do Acre abriga diversos povos indígenas, como os Huni Kuin (Kaxinawá), os Ashaninka e os Yawanawá, cuja presença e cultura tradicional constituem parte relevante da diversidade étnica e cultural do estado.$q$,
  'C',
  $q$Certo. O Acre possui significativa presença de povos indígenas, com destaque para etnias como os Huni Kuin (também conhecidos como Kaxinawá), os Ashaninka e os Yawanawá, que mantêm tradições culturais, línguas e práticas ancestrais próprias, contribuindo para a rica diversidade étnica e cultural do estado, reconhecida inclusive em iniciativas de valorização e proteção desses povos e de seus territórios. Exemplo: aldeias indígenas localizadas em terras demarcadas no interior do Acre preservam práticas culturais tradicionais, como a produção artesanal e rituais próprios de cada etnia.$q$,
  jsonb_build_array(jsonb_build_object('title','Realidade do Acre — Povos indígenas','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'd1ce0696-d39b-4ec3-9a52-31c9c323fc40', 'sefazac23-realac-05',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Realidade do Acre', 'Reservas Extrativistas no Acre',
  $q$Julgue o item a seguir, com base na realidade ambiental do Acre.
O Acre concentra importantes unidades de conservação de uso sustentável, como reservas extrativistas criadas para conciliar a preservação ambiental com a manutenção das atividades tradicionais de comunidades extrativistas, movimento historicamente impulsionado pela atuação de lideranças como Chico Mendes.$q$,
  'C',
  $q$Certo. As reservas extrativistas (RESEX) são unidades de conservação de uso sustentável que buscam compatibilizar a proteção ambiental com a manutenção do modo de vida e das atividades econômicas tradicionais de populações extrativistas, modelo cuja criação e consolidação no Brasil, especialmente no Acre, foi fortemente impulsionada pela mobilização histórica de lideranças como Chico Mendes, na defesa dos seringais contra o desmatamento. Exemplo: comunidades que vivem em reservas extrativistas no Acre podem continuar exercendo atividades como o extrativismo da castanha e da borracha, de forma regulamentada e sustentável.$q$,
  jsonb_build_array(jsonb_build_object('title','Realidade do Acre — Unidades de conservação','url','https://www.gov.br/acre/pt-br')),
  'média', now()
);
