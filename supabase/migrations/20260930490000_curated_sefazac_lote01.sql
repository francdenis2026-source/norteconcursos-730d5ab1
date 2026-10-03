-- Curated (authored) questions for SEFAZ/AC (edital 2023): 30 questões
-- cobrindo as 9 disciplinas do edital (Administração Pública, Constitucional,
-- Tributário, Informática, Português, Matemática Financeira, Orçamento
-- Público, Raciocínio Lógico e Realidade do Acre). Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'Orçamento participativo',
  $q$Julgue o item a seguir, com base em Administração Pública.
O orçamento participativo é mecanismo de gestão democrática por meio do qual a população participa diretamente da elaboração e da fiscalização do orçamento público, definindo prioridades de investimento em complemento ao processo tradicional de discussão orçamentária conduzido pelo Poder Executivo e pelo Poder Legislativo.$q$,
  'C',
  $q$Certo. O orçamento participativo é instrumento de democracia direta aplicado à gestão orçamentária, permitindo que a população, por meio de assembleias e consultas públicas, indique prioridades de investimento em determinada região ou área temática, complementando (mas não substituindo) o processo formal de elaboração e aprovação do orçamento pelos Poderes Executivo e Legislativo. Exemplo: moradores de um bairro podem, em assembleia de orçamento participativo, priorizar a pavimentação de uma rua em detrimento da construção de uma praça, influenciando diretamente a peça orçamentária.$q$,
  jsonb_build_array(jsonb_build_object('title','Administração Pública — Orçamento participativo','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'Indicadores de desempenho na gestão pública',
  $q$Julgue o item a seguir, com base em Administração Pública.
Os indicadores de desempenho são instrumentos de mensuração utilizados para avaliar a eficiência, a eficácia e a efetividade das políticas públicas e da atuação administrativa, permitindo o monitoramento de metas estabelecidas e o aprimoramento contínuo da gestão pública.$q$,
  'C',
  $q$Certo. Os indicadores de desempenho traduzem, em termos quantificáveis, os resultados alcançados por uma política ou programa público, permitindo distinguir eficiência (relação entre recursos empregados e resultados obtidos), eficácia (grau de cumprimento das metas estabelecidas) e efetividade (impacto real produzido na sociedade), elementos essenciais para o ciclo de planejamento, execução e avaliação da gestão pública. Exemplo: o número de atendimentos realizados por um posto de atendimento fazendário em relação à meta mensal estabelecida é um indicador de eficácia.$q$,
  jsonb_build_array(jsonb_build_object('title','Administração Pública — Indicadores de desempenho','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'OSCIP — termo de parceria (Lei 9.790/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.790/1999.
As Organizações da Sociedade Civil de Interesse Público (OSCIP) são pessoas jurídicas de direito privado, sem fins lucrativos, que podem celebrar termo de parceria com o Poder Público para o fomento e a execução de atividades de interesse social, distinguindo-se das Organizações Sociais pelo instrumento jurídico utilizado.$q$,
  'C',
  $q$Certo. A Lei nº 9.790/1999 qualifica as OSCIP e prevê o termo de parceria como instrumento jurídico próprio para a colaboração entre essas entidades e o Poder Público, diferenciando-se do contrato de gestão previsto na Lei nº 9.637/1998 para as Organizações Sociais, ainda que ambos os modelos busquem viabilizar a execução de atividades de interesse público por entidades do terceiro setor. Exemplo: uma entidade sem fins lucrativos qualificada como OSCIP pode firmar termo de parceria com um órgão estadual para executar projeto de educação fiscal voltado à população.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.790/1999','url','https://www.planalto.gov.br/ccivil_03/leis/l9790.htm')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '700ef4f8-3dea-4d05-95aa-c748a054b35c', 'sefazac23-adm-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Administração Pública', 'Descentralização e desconcentração administrativa',
  $q$Julgue o item a seguir, com base na doutrina de Administração Pública.
A descentralização administrativa consiste na transferência de competências administrativas do ente central para outras pessoas jurídicas, distintas do Estado, dotadas de personalidade jurídica própria, diferenciando-se da desconcentração, que ocorre dentro da mesma pessoa jurídica, por meio da distribuição interna de competências entre órgãos.$q$,
  'C',
  $q$Certo. A descentralização pressupõe a existência de duas pessoas jurídicas distintas (o ente central e a entidade descentralizada, como uma autarquia ou empresa pública), enquanto a desconcentração ocorre dentro da mesma pessoa jurídica, mediante a distribuição interna de atribuições entre diferentes órgãos, sem criação de nova personalidade jurídica. Exemplo: a criação de uma autarquia estadual de fiscalização tributária representa descentralização, enquanto a divisão interna da secretaria de fazenda em diferentes departamentos representa desconcentração.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Administração Pública — Descentralização e desconcentração','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'f6641c35-031b-42c6-9959-5da693486a33', 'sefazac23-const-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Constitucional', 'Intervenção federal (art. 34, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A União não intervirá nos estados nem no Distrito Federal, exceto para manter a integridade nacional, repelir invasão estrangeira ou de uma unidade da Federação em outra, pôr termo a grave comprometimento da ordem pública, ou prover a execução de lei federal, ordem ou decisão judicial.$q$,
  'C',
  $q$Certo. O art. 34 da Constituição Federal disciplina a intervenção federal como medida excepcional de restrição à autonomia dos entes federativos, cabível apenas nas hipóteses taxativamente elencadas, entre elas a defesa da integridade nacional, a repulsa a invasões, o combate a grave comprometimento da ordem pública e a garantia do cumprimento de decisões judiciais e leis federais, refletindo o caráter excepcional dessa medida no pacto federativo. Exemplo: a persistente recusa de um estado em cumprir decisão do Supremo Tribunal Federal pode, em tese, fundamentar pedido de intervenção federal para assegurar o cumprimento da ordem judicial.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 34','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'f6641c35-031b-42c6-9959-5da693486a33', 'sefazac23-const-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Constitucional', 'Direitos dos povos indígenas (art. 231, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São reconhecidos aos índios sua organização social, costumes, línguas, crenças e tradições, e os direitos originários sobre as terras que tradicionalmente ocupam, competindo à União demarcá-las, proteger e fazer respeitar todos os seus bens.$q$,
  'C',
  $q$Certo. O art. 231 da Constituição Federal reconhece aos povos indígenas o direito à sua identidade cultural própria e os direitos originários sobre as terras tradicionalmente ocupadas, atribuindo à União a competência para demarcar essas terras e proteger o patrimônio indígena, direitos que existem independentemente de título de propriedade formal, por decorrerem da ocupação histórica e cultural do território. Exemplo: uma terra indígena localizada no Acre deve ser demarcada pela União, que também deve garantir a proteção dessa área contra invasões e exploração ilegal de recursos naturais.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 231','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'f6641c35-031b-42c6-9959-5da693486a33', 'sefazac23-const-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Constitucional', 'Ação Direta de Inconstitucionalidade — legitimados (art. 103, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Podem propor a ação direta de inconstitucionalidade, entre outros, o Presidente da República, a Mesa do Senado Federal, a Mesa da Câmara dos Deputados, o Governador de Estado, o Procurador-Geral da República, o Conselho Federal da Ordem dos Advogados do Brasil, e confederação sindical ou entidade de classe de âmbito nacional.$q$,
  'C',
  $q$Certo. O art. 103 da Constituição Federal enumera taxativamente os legitimados a propor a ação direta de inconstitucionalidade perante o Supremo Tribunal Federal, entre eles autoridades e órgãos dos Poderes Executivo e Legislativo, o Ministério Público, a OAB, e entidades representativas de classes e categorias profissionais de âmbito nacional, sendo exigida, para as confederações sindicais e entidades de classe, a demonstração de pertinência temática com o objeto da ação. Exemplo: um governador de estado pode propor ADI contra lei estadual de outro estado que considere inconstitucional, desde que demonstre interesse na questão.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 103','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'Substituição tributária',
  $q$Julgue o item a seguir, com base no Direito Tributário.
No regime de substituição tributária, a responsabilidade pelo recolhimento do tributo é atribuída a terceiro que não realizou diretamente o fato gerador, mas que possui vínculo com a situação que o constitui, sendo comum na cadeia de circulação de mercadorias, em que um contribuinte antecipa o recolhimento do imposto devido pelas operações subsequentes.$q$,
  'C',
  $q$Certo. A substituição tributária, prevista no art. 150, § 7º, da Constituição Federal e disciplinada pela legislação de cada tributo, transfere a responsabilidade pelo pagamento do imposto a um terceiro (o substituto tributário), vinculado ao fato gerador, antecipando a arrecadação de tributos devidos em etapas futuras da cadeia produtiva ou comercial, o que simplifica a fiscalização e reduz a evasão fiscal. Exemplo: uma indústria de bebidas pode ser responsável por recolher antecipadamente o ICMS devido nas vendas subsequentes realizadas por distribuidores e varejistas, na chamada substituição tributária "para frente".$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 150, § 7º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'ICMS — diferencial de alíquota (DIFAL)',
  $q$Julgue o item a seguir, com base no Direito Tributário.
O diferencial de alíquota do ICMS incide sobre operações interestaduais destinadas a consumidor final, correspondendo à diferença entre a alíquota interna do estado de destino e a alíquota interestadual aplicada na origem, buscando equilibrar a arrecadação entre os estados de origem e de destino da mercadoria.$q$,
  'C',
  $q$Certo. O DIFAL foi instituído para reduzir o desequilíbrio arrecadatório causado pelo crescimento do comércio eletrônico interestadual, assegurando que o estado de destino da mercadoria também receba parcela do ICMS incidente na operação, calculada pela diferença entre sua alíquota interna e a alíquota interestadual cobrada na origem, mecanismo hoje disciplinado pela Emenda Constitucional nº 87/2015 e por lei complementar específica. Exemplo: uma compra realizada por consumidor final acreano em loja virtual de outro estado gera, além do ICMS de origem, o recolhimento do diferencial de alíquota em favor do Acre.$q$,
  jsonb_build_array(jsonb_build_object('title','Emenda Constitucional nº 87/2015','url','https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc87.htm')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'ICMS monofásico',
  $q$Julgue o item a seguir, com base no Direito Tributário.
No regime de ICMS monofásico, a incidência do imposto se concentra em uma única etapa da cadeia produtiva ou de comercialização, geralmente na fonte (produtor ou importador), desonerando as etapas subsequentes de nova incidência sobre o mesmo produto.$q$,
  'C',
  $q$Certo. O regime monofásico concentra a tributação do ICMS em uma única fase da cadeia, normalmente na origem, desonerando as revendas subsequentes de nova incidência sobre o mesmo bem, o que simplifica a arrecadação e reduz o número de operações fiscalizadas, sendo tradicionalmente aplicado a produtos como combustíveis, cuja cadeia de comercialização apresenta características específicas que favorecem essa modalidade de tributação concentrada. Exemplo: no comércio de combustíveis, o ICMS é recolhido, em regra, uma única vez, na refinaria ou na importação, sem nova incidência nas vendas pelos postos de combustível ao consumidor final.$q$,
  jsonb_build_array(jsonb_build_object('title','Direito Tributário — ICMS monofásico','url','https://www.gov.br/acre/pt-br')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '664b4147-e52e-4953-8ffa-e09cd9a37999', 'sefazac23-trib-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Direito Tributário', 'IPI — princípio da seletividade',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Imposto sobre Produtos Industrializados deve ser seletivo em função da essencialidade do produto, de modo que produtos considerados essenciais tendem a ter alíquotas menores, enquanto produtos supérfluos ou nocivos podem ser tributados com alíquotas mais elevadas.$q$,
  'C',
  $q$Certo. O art. 153, § 3º, inciso I, da Constituição Federal impõe ao IPI o princípio da seletividade em função da essencialidade do produto, técnica de extrafiscalidade que busca onerar mais gravosamente produtos considerados supérfluos ou nocivos à saúde (como cigarros e bebidas alcoólicas) e menos gravosamente bens essenciais à população, diferentemente do ICMS, para o qual a seletividade é facultativa. Exemplo: produtos considerados de primeira necessidade tendem a ter alíquotas de IPI mais baixas do que produtos de luxo, em razão do princípio constitucional da seletividade obrigatória para esse imposto.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 153, § 3º, I','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'b863175e-b66b-44b1-94d7-c44ead86d09e', 'sefazac23-info-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Informática', 'LGPD — conceito de dado pessoal',
  $q$Julgue o item a seguir, com base na Lei nº 13.709/2018 (LGPD).
A Lei Geral de Proteção de Dados define dado pessoal como informação relacionada a pessoa natural identificada ou identificável, estabelecendo princípios e regras para o tratamento desses dados por pessoas físicas ou jurídicas, de direito público ou privado.$q$,
  'C',
  $q$Certo. O art. 5º, inciso I, da Lei nº 13.709/2018 conceitua dado pessoal de forma ampla, abrangendo qualquer informação capaz de identificar ou tornar identificável uma pessoa natural, e a lei se aplica tanto a entidades privadas quanto a órgãos públicos que realizem operações de tratamento de dados pessoais, estabelecendo princípios como finalidade, adequação, necessidade e transparência. Exemplo: o cadastro de contribuintes mantido por um órgão fazendário, contendo nome, CPF e endereço, envolve dados pessoais sujeitos à disciplina da LGPD.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.709/2018, art. 5º, I','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'b863175e-b66b-44b1-94d7-c44ead86d09e', 'sefazac23-info-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Informática', 'Edição de documentos acessíveis',
  $q$Julgue o item a seguir, com base em noções de informática.
A produção de documentos digitais acessíveis busca garantir que pessoas com deficiência visual, auditiva ou motora possam acessar e compreender o conteúdo, por meio de recursos como descrição textual de imagens, estruturação adequada de títulos e compatibilidade com leitores de tela.$q$,
  'C',
  $q$Certo. A acessibilidade digital envolve práticas de elaboração de documentos que considerem as necessidades de usuários com diferentes tipos de deficiência, incluindo a inserção de texto alternativo em imagens (para leitores de tela utilizados por pessoas com deficiência visual), a organização hierárquica correta de títulos e subtítulos, e a compatibilidade com tecnologias assistivas. Exemplo: um documento oficial publicado em formato acessível deve incluir descrição textual de gráficos e tabelas, permitindo que um leitor de tela transmita essa informação a um usuário com deficiência visual.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Acessibilidade digital','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'b863175e-b66b-44b1-94d7-c44ead86d09e', 'sefazac23-info-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Informática', 'Ferramentas de busca — operadores de pesquisa',
  $q$Julgue o item a seguir, com base em noções de informática.
Os mecanismos de busca na internet permitem o uso de operadores específicos, como o uso de aspas para buscar uma expressão exata, ou o sinal de menos para excluir determinado termo dos resultados, refinando a pesquisa realizada pelo usuário.$q$,
  'C',
  $q$Certo. Os principais buscadores de internet oferecem operadores de pesquisa avançada que permitem refinar os resultados obtidos, como o uso de aspas para localizar uma frase exata (em vez de palavras isoladas dispersas pelo texto) e o sinal de menos antes de uma palavra para excluir páginas que a contenham dos resultados apresentados. Exemplo: uma pesquisa por "ICMS diferencial de alíquota" entre aspas retorna páginas que contenham exatamente essa expressão, enquanto "ICMS -federal" exclui resultados que mencionem "federal".$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Ferramentas de busca','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '83c2e133-2cf6-465b-867b-6f55b9eb7a0c', 'sefazac23-port-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Língua Portuguesa', 'Coerência textual e progressão temática',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A coerência textual exige que as informações apresentadas ao longo do texto se articulem logicamente, sem contradições internas, promovendo a progressão temática, ou seja, o avanço organizado das ideias sem estagnação ou repetição desnecessária.$q$,
  'C',
  $q$Certo. A coerência é propriedade textual relacionada ao sentido global do texto, exigindo compatibilidade lógica entre as ideias apresentadas e sua evolução progressiva ao longo da argumentação, de modo que cada novo trecho contribua com informação relevante, evitando tanto contradições quanto a mera repetição de conteúdo já exposto. Exemplo: um parecer técnico que apresenta uma conclusão contrária às premissas anteriormente estabelecidas no próprio texto apresenta falha de coerência.$q$,
  jsonb_build_array(jsonb_build_object('title','Linguística textual — Coerência e progressão temática','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '83c2e133-2cf6-465b-867b-6f55b9eb7a0c', 'sefazac23-port-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Língua Portuguesa', 'Substituição vocabular — sinonímia contextual',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A substituição de uma palavra por outra de sentido equivalente no contexto (sinonímia contextual) é recurso de coesão lexical que evita repetições desnecessárias, devendo, contudo, preservar o sentido original pretendido pelo autor do texto.$q$,
  'C',
  $q$Certo. A sinonímia contextual constitui importante mecanismo de coesão lexical, permitindo variar o vocabulário empregado sem alterar o sentido pretendido, desde que a palavra substituta mantenha equivalência semântica adequada ao contexto específico em que é empregada, sob pena de comprometer a fidelidade de sentido do texto original. Exemplo: em um texto sobre tributos, substituir "imposto" por "tributo" em determinadas passagens pode ser adequado, mas não seria adequado substituir "imposto" por "taxa", pois são espécies tributárias distintas.$q$,
  jsonb_build_array(jsonb_build_object('title','Semântica — Sinonímia contextual','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '83c2e133-2cf6-465b-867b-6f55b9eb7a0c', 'sefazac23-port-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Língua Portuguesa', 'Regência dos verbos "chegar" e "ir"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Os verbos "chegar" e "ir", na norma-padrão, regem a preposição "a" (e não "em") quando indicam o destino de um deslocamento, como em "cheguei ao trabalho" e "fui à reunião".$q$,
  'C',
  $q$Certo. A norma-padrão da língua portuguesa exige o emprego da preposição "a" com os verbos "chegar" e "ir" quando indicam destino, sendo considerado inadequado, nesse contexto formal, o uso da preposição "em" (como em "cheguei no trabalho"), construção comum na linguagem coloquial, mas evitada em textos técnicos e oficiais. Exemplo: em um relatório institucional, o correto é escrever "o servidor chegou à repartição às nove horas", e não "chegou na repartição".$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Regência verbal','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '3a0a8f3a-5ca9-4644-8080-4aa90391f839', 'sefazac23-matfin-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Matemática Financeira', 'Juros simples — fórmula de cálculo',
  $q$Julgue o item a seguir, com base em matemática financeira.
No regime de juros simples, o valor dos juros é calculado sempre sobre o capital inicial, sendo dado pela fórmula J = C x i x t, em que C é o capital, i é a taxa de juros e t é o tempo, permanecendo constante o valor dos juros a cada período.$q$,
  'C',
  $q$Certo. No regime de capitalização simples, os juros de cada período são sempre calculados sobre o capital inicial (C), aplicando-se a taxa de juros (i) durante o tempo (t) considerado, o que faz com que o valor dos juros permaneça constante período após período, resultando em crescimento linear do montante ao longo do tempo. Exemplo: um capital de R$ 1.000,00 aplicado a juros simples de 2% ao mês rende R$ 20,00 de juros em cada mês, independentemente de quantos meses já se passaram.$q$,
  jsonb_build_array(jsonb_build_object('title','Matemática Financeira — Juros simples','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '3a0a8f3a-5ca9-4644-8080-4aa90391f839', 'sefazac23-matfin-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Matemática Financeira', 'Juros compostos — capitalização',
  $q$Julgue o item a seguir, com base em matemática financeira.
No regime de juros compostos, os juros de cada período incidem sobre o montante acumulado (capital mais juros anteriores), e não apenas sobre o capital inicial, o que faz com que o crescimento do montante ao longo do tempo seja exponencial, e não linear como nos juros simples.$q$,
  'C',
  $q$Certo. Na capitalização composta, cada novo período de juros incide sobre o montante total acumulado até aquele momento (e não apenas sobre o capital original), fenômeno conhecido como "juros sobre juros", que resulta em crescimento exponencial do montante ao longo do tempo, em contraste com o crescimento linear observado no regime de juros simples. Exemplo: um capital de R$ 1.000,00 aplicado a juros compostos de 2% ao mês rende R$ 20,00 no primeiro mês, mas, no segundo mês, os juros incidem sobre R$ 1.020,00, e não mais sobre os R$ 1.000,00 originais.$q$,
  jsonb_build_array(jsonb_build_object('title','Matemática Financeira — Juros compostos','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '3a0a8f3a-5ca9-4644-8080-4aa90391f839', 'sefazac23-matfin-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Matemática Financeira', 'Desconto racional simples (por dentro)',
  $q$Julgue o item a seguir, com base em matemática financeira.
O desconto racional simples (por dentro) é calculado sobre o valor atual (valor presente) do título, sendo equivalente à aplicação dos juros simples sobre esse valor atual, diferenciando-se do desconto comercial (por fora), que é calculado sobre o valor nominal (valor futuro) do título.$q$,
  'C',
  $q$Certo. O desconto racional simples toma como base de cálculo o valor presente (atual) do título, sendo matematicamente equivalente ao cálculo de juros simples incidentes sobre esse valor atual, ao passo que o desconto comercial simples utiliza como base o valor nominal (futuro) do título, resultando em valores de desconto diferentes para uma mesma operação, ainda que a taxa e o prazo sejam idênticos. Exemplo: para um mesmo título e a mesma taxa de desconto, o desconto comercial (por fora) resulta, em regra, em valor de desconto maior do que o desconto racional (por dentro), justamente por incidir sobre o valor nominal, superior ao valor atual.$q$,
  jsonb_build_array(jsonb_build_object('title','Matemática Financeira — Desconto racional e comercial','url','https://www.gov.br/acre/pt-br')),
  'difícil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '3a0a8f3a-5ca9-4644-8080-4aa90391f839', 'sefazac23-matfin-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Matemática Financeira', 'Valor presente e valor futuro',
  $q$Julgue o item a seguir, com base em matemática financeira.
O valor presente representa o valor de um montante financeiro em uma data anterior à sua disponibilidade, enquanto o valor futuro representa o valor desse mesmo montante em uma data posterior, sendo a relação entre ambos determinada pela taxa de juros e pelo prazo decorrido entre as datas consideradas.$q$,
  'C',
  $q$Certo. Os conceitos de valor presente (ou valor atual) e valor futuro (ou montante) são fundamentais em matemática financeira, expressando o mesmo capital em diferentes momentos no tempo, com a conversão entre eles dependendo diretamente da taxa de juros aplicável e do intervalo de tempo entre as datas de referência consideradas na operação financeira. Exemplo: R$ 1.000,00 hoje (valor presente) equivalem a um valor futuro maior daqui a um ano, se aplicados a determinada taxa de juros positiva ao longo desse período.$q$,
  jsonb_build_array(jsonb_build_object('title','Matemática Financeira — Valor presente e valor futuro','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'fea05670-5a61-4d8d-b74c-10ff2eca9e94', 'sefazac23-orcpub-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Orçamento Público', 'Plano Plurianual (art. 165, § 1º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Plano Plurianual estabelece, de forma regionalizada, as diretrizes, objetivos e metas da administração pública para as despesas de capital e outras delas decorrentes, e para as relativas aos programas de duração continuada, com vigência de quatro anos.$q$,
  'C',
  $q$Certo. O art. 165, § 1º, da Constituição Federal disciplina o Plano Plurianual (PPA) como instrumento de planejamento estratégico de médio prazo, que orienta os investimentos governamentais de maior vulto e os programas de duração continuada, sendo aprovado com vigência de quatro anos, abrangendo do segundo ano de um mandato até o primeiro ano do mandato seguinte, o que assegura continuidade administrativa entre gestões. Exemplo: uma obra pública de grande porte, cuja execução se estende por vários anos, deve estar prevista no PPA vigente para receber os recursos orçamentários necessários.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 165, § 1º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'fea05670-5a61-4d8d-b74c-10ff2eca9e94', 'sefazac23-orcpub-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Orçamento Público', 'Lei de Diretrizes Orçamentárias (art. 165, § 2º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A Lei de Diretrizes Orçamentárias compreende as metas e prioridades da administração pública, incluindo as despesas de capital para o exercício financeiro subsequente, orienta a elaboração da lei orçamentária anual, dispõe sobre alterações na legislação tributária e estabelece a política de aplicação das agências financeiras oficiais de fomento.$q$,
  'C',
  $q$Certo. O art. 165, § 2º, da Constituição Federal atribui à Lei de Diretrizes Orçamentárias (LDO) o papel de elo entre o planejamento de médio prazo (PPA) e o orçamento anual (LOA), definindo as prioridades e metas a serem observadas na elaboração da lei orçamentária do exercício subsequente, além de tratar de outros temas correlatos, como alterações tributárias e diretrizes para as agências oficiais de fomento. Exemplo: a LDO de determinado ano pode estabelecer como prioridade o investimento em saúde pública, orientando a alocação de recursos na LOA a ser elaborada para o exercício seguinte.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 165, § 2º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'fea05670-5a61-4d8d-b74c-10ff2eca9e94', 'sefazac23-orcpub-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Orçamento Público', 'Lei Orçamentária Anual (art. 165, § 5º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A Lei Orçamentária Anual compreende o orçamento fiscal, o orçamento de investimento das empresas estatais e o orçamento da seguridade social, devendo ser compatível com o Plano Plurianual e com a Lei de Diretrizes Orçamentárias vigentes.$q$,
  'C',
  $q$Certo. O art. 165, § 5º, da Constituição Federal estabelece que a Lei Orçamentária Anual (LOA) é composta por três orçamentos distintos (fiscal, de investimento das estatais e da seguridade social), devendo sua elaboração observar as diretrizes e prioridades já fixadas na LDO e estar em consonância com os objetivos e metas de médio prazo estabelecidos no PPA, formando, os três instrumentos, um sistema integrado de planejamento orçamentário. Exemplo: um programa previsto no PPA e priorizado na LDO deve, consequentemente, receber a correspondente dotação orçamentária na LOA do exercício.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 165, § 5º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'fea05670-5a61-4d8d-b74c-10ff2eca9e94', 'sefazac23-orcpub-04',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Orçamento Público', 'Controle interno e externo (arts. 70-71, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A fiscalização contábil, financeira, orçamentária, operacional e patrimonial será exercida pelo Congresso Nacional, mediante controle externo, e pelo sistema de controle interno de cada Poder, cabendo ao Tribunal de Contas auxiliar o Poder Legislativo nesse controle.$q$,
  'C',
  $q$Certo. Os arts. 70 e 71 da Constituição Federal estruturam o sistema de fiscalização da administração pública em duas frentes complementares: o controle externo, exercido pelo Poder Legislativo com o auxílio técnico do Tribunal de Contas, e o controle interno, exercido pelo sistema próprio de cada Poder sobre sua própria atuação, ambos abrangendo os aspectos contábil, financeiro, orçamentário, operacional e patrimonial da gestão pública. Exemplo: o Tribunal de Contas do Estado do Acre auxilia a Assembleia Legislativa na fiscalização das contas do Poder Executivo estadual, exercendo o controle externo previsto constitucionalmente.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, arts. 70-71','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '0cae21c1-7187-4257-9571-5103fcf24a68', 'sefazac23-rlm-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Raciocínio Lógico', 'Regra de inferência modus ponens',
  $q$Julgue o item a seguir, com base na lógica proposicional.
Pela regra de inferência modus ponens, se a proposição "se P então Q" é verdadeira e a proposição P também é verdadeira, então necessariamente Q é verdadeira, constituindo uma das formas mais básicas e válidas de argumento dedutivo.$q$,
  'C',
  $q$Certo. O modus ponens é uma das regras de inferência fundamentais da lógica proposicional, permitindo concluir a verdade de Q a partir da verdade do condicional "P → Q" combinada com a verdade de P, sendo essa uma forma de argumento sempre válida, independentemente do conteúdo material das proposições envolvidas. Exemplo: se é verdade que "se o contribuinte está inadimplente, então seu nome é inscrito em dívida ativa" e é verdade que "o contribuinte está inadimplente", conclui-se, por modus ponens, que "seu nome foi inscrito em dívida ativa".$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Modus ponens','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '0cae21c1-7187-4257-9571-5103fcf24a68', 'sefazac23-rlm-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Raciocínio Lógico', 'Progressão aritmética',
  $q$Julgue o item a seguir, com base em raciocínio lógico-matemático.
Em uma progressão aritmética, cada termo, a partir do segundo, é obtido pela soma do termo anterior com uma razão constante, sendo essa razão a diferença fixa entre termos consecutivos da sequência.$q$,
  'C',
  $q$Certo. A progressão aritmética é uma sequência numérica em que a diferença entre quaisquer dois termos consecutivos é sempre constante, denominada razão, de modo que cada termo, a partir do segundo, resulta da soma do termo imediatamente anterior com essa razão fixa. Exemplo: na sequência 5, 8, 11, 14, a razão é constante e igual a 3, o que caracteriza uma progressão aritmética.$q$,
  jsonb_build_array(jsonb_build_object('title','Raciocínio lógico-matemático — Progressão aritmética','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', '0cae21c1-7187-4257-9571-5103fcf24a68', 'sefazac23-rlm-03',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Raciocínio Lógico', 'Tabela-verdade da negação',
  $q$Julgue o item a seguir, com base na lógica proposicional.
A negação de uma proposição inverte seu valor lógico, de modo que a negação de uma proposição verdadeira é falsa, e a negação de uma proposição falsa é verdadeira.$q$,
  'C',
  $q$Certo. O conectivo de negação (¬) é o operador lógico mais simples, atuando exclusivamente sobre uma única proposição e invertendo seu valor de verdade original, transformando o verdadeiro em falso e o falso em verdadeiro, servindo de base para a construção de proposições compostas mais elaboradas. Exemplo: se a proposição "o contribuinte pagou o tributo" é verdadeira, sua negação, "o contribuinte não pagou o tributo", é necessariamente falsa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Negação','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'd1ce0696-d39b-4ec3-9a52-31c9c323fc40', 'sefazac23-realac-01',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Realidade do Acre', 'Economia do Acre — setores produtivos',
  $q$Julgue o item a seguir, com base na realidade socioeconômica do Acre.
A economia do estado do Acre é marcada pela presença do setor de serviços e da administração pública como componentes relevantes do PIB estadual, ao lado de atividades primárias como a agropecuária e o extrativismo vegetal, este último com destaque histórico para a produção de látex e castanha.$q$,
  'C',
  $q$Certo. A estrutura econômica do Acre reflete, em parte, sua formação histórica ligada ao extrativismo (com destaque para a borracha e a castanha), somada à relevância do setor público e de serviços na geração de emprego e renda, características comuns a estados da região amazônica com menor grau de industrialização em comparação a outras regiões do país. Exemplo: municípios do interior do Acre mantêm forte tradição na produção extrativista de castanha, atividade que ainda hoje gera renda para comunidades locais.$q$,
  jsonb_build_array(jsonb_build_object('title','Realidade do Acre — Economia estadual','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'd00f4393-203a-45ca-b308-03c8219aa5b3', 'd1ce0696-d39b-4ec3-9a52-31c9c323fc40', 'sefazac23-realac-02',
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre', 2023, 'Especialista da Fazenda Estadual', 'CEBRASPE', 'Realidade do Acre', 'Divisão regional do Acre',
  $q$Julgue o item a seguir, com base na realidade geográfica e administrativa do Acre.
O estado do Acre é organizado, para fins de planejamento e gestão regionalizada de políticas públicas, em regionais que agrupam municípios de características geográficas e socioeconômicas próximas, como as regionais do Alto Acre, Baixo Acre, Purus, Tarauacá/Envira e Juruá.$q$,
  'C',
  $q$Certo. O governo do Acre adota uma divisão regional para fins de planejamento e execução de políticas públicas, agrupando os municípios do estado conforme critérios geográficos e de identidade socioeconômica, sendo as regionais do Alto Acre, Baixo Acre, Purus, Tarauacá/Envira e Juruá referências comuns nesse tipo de organização territorial adotada por órgãos estaduais. Exemplo: a regional do Juruá concentra municípios do oeste do estado, como Cruzeiro do Sul, geograficamente mais distantes da capital Rio Branco.$q$,
  jsonb_build_array(jsonb_build_object('title','Realidade do Acre — Divisão regional','url','https://www.gov.br/acre/pt-br')),
  'difícil', now()
);
