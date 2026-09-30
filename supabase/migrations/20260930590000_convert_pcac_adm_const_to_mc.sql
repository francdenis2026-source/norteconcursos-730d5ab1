-- Converte para multipla escolha (formato real da banca IBADE) as questoes
-- de Direito Administrativo e Direito Constitucional do lote PC-AC, que
-- foram escritas por engano no formato Certo/Errado (CEBRASPE) quando o
-- edital real (IBADE) usa alternativas A-E. Corrige question_text e
-- official_answer; mantem a explicacao com pequenos ajustes de abertura.

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no Código Tributário Nacional e na doutrina de direito administrativo, assinale a alternativa correta.

(A) Poder de polícia é o poder que permite à Administração apurar infrações funcionais e aplicar sanções disciplinares aos servidores a ela vinculados por relação hierárquica.
(B) Poder de polícia é o poder que decorre da relação de subordinação entre órgãos e agentes públicos, permitindo a distribuição e o escalonamento de funções administrativas.
(C) Poder de polícia é a atividade da administração pública que, limitando ou disciplinando direito, interesse ou liberdade, regula a prática de ato ou a abstenção de fato, em razão de interesse público concernente à segurança, à higiene, à ordem, aos costumes e à disciplina da produção e do mercado.
(D) Poder de polícia é a prerrogativa privativa do chefe do Poder Executivo de expedir decretos e regulamentos para a fiel execução das leis.
(E) Poder de polícia é o poder exercido exclusivamente pelas corporações policiais militares e civis, não se estendendo aos demais órgãos da administração pública.',
  official_answer = 'C',
  explanation = 'A alternativa correta é a C. O art. 78 do Código Tributário Nacional traz a definição legal de poder de polícia, amplamente utilizada pela doutrina administrativista, caracterizando-o como atividade estatal de limitação de direitos individuais em favor do interesse coletivo, presente, por exemplo, na fiscalização de estabelecimentos comerciais e na regulação do trânsito. A alternativa A descreve o poder disciplinar; a B, o poder hierárquico; a D, o poder regulamentar; e a E restringe indevidamente o poder de polícia às corporações policiais, quando na verdade é exercido por diversos órgãos da administração (vigilância sanitária, fiscalização ambiental, posturas municipais, entre outros).
Exemplo: a fiscalização de um estabelecimento comercial quanto às normas de segurança é exercício do poder de polícia, ainda que realizada por um órgão de vigilância sanitária, e não por uma corporação policial.'
where external_item_key = 'pcac17-adm-01';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na doutrina de direito administrativo, assinale a alternativa correta.

(A) A autoexecutoriedade exige, em todo e qualquer caso, prévia autorização judicial para que a Administração possa executar suas próprias decisões.
(B) A autoexecutoriedade permite que a Administração Pública execute diretamente suas decisões, sem necessidade de prévia autorização judicial, nos casos expressamente previstos em lei ou quando a urgência da medida assim exigir.
(C) A autoexecutoriedade significa que o ato administrativo, uma vez editado, jamais poderá ser revisto pela própria Administração, cabendo essa revisão apenas ao Poder Judiciário.
(D) A autoexecutoriedade é atributo exclusivo dos atos vinculados, não se aplicando aos atos discricionários praticados pela Administração.
(E) A autoexecutoriedade permite que a Administração execute diretamente decisões voltadas a dirimir litígios exclusivamente entre particulares.',
  official_answer = 'B',
  explanation = 'A alternativa correta é a B. A autoexecutoriedade é atributo de determinados atos administrativos que permite à Administração implementar suas decisões por meios próprios, sem depender de prévia manifestação do Poder Judiciário, limitando-se, porém, às hipóteses previstas em lei ou de urgência comprovada, sem prejuízo do posterior controle jurisdicional do ato. A alternativa A inverte o conceito; a C confunde autoexecutoriedade com a vedação à autotutela (que, ao contrário, permite à própria Administração rever seus atos); a D é falsa, pois a autoexecutoriedade não se limita aos atos vinculados; e a E é estranha ao conceito, que trata da relação Administração-particular, não de litígios entre particulares.
Exemplo: a apreensão de mercadorias em desacordo com normas sanitárias pode ser executada diretamente pela autoridade administrativa, sem necessidade de ordem judicial prévia.'
where external_item_key = 'pcac17-adm-02';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Lei nº 14.133/2021, assinale a alternativa correta.

(A) O pregão é modalidade obrigatória de licitação para aquisição de bens e serviços comuns, cujo critério de julgamento poderá ser o de menor preço ou o de maior desconto.
(B) O pregão é modalidade facultativa de licitação, aplicável exclusivamente à contratação de obras de engenharia de grande vulto.
(C) O pregão é modalidade de licitação cujo critério de julgamento exclusivo é a melhor técnica apresentada pelo licitante.
(D) O pregão é modalidade de licitação restrita à aquisição de bens e serviços especiais, de alta complexidade técnica.
(E) O pregão é modalidade de licitação em que a fase de habilitação necessariamente antecede o julgamento das propostas de preço.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. A Lei nº 14.133/2021 mantém o pregão como modalidade licitatória de uso obrigatório para bens e serviços comuns, admitindo como critérios de julgamento o menor preço ou o maior desconto. A alternativa B é falsa porque o pregão é vedado justamente para obras de engenharia; a C está errada porque o pregão não julga por melhor técnica; a D inverte o conceito de bem comum por bem especial; e a E descreve o rito invertido em relação ao pregão, que julga primeiro as propostas de preço e só depois verifica a habilitação do vencedor.
Exemplo: a compra de material de escritório padronizado, por ser bem comum, deve ser feita por meio de pregão, com julgamento pelo menor preço.'
where external_item_key = 'pcac17-adm-03';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Constituição Federal de 1988, assinale a alternativa correta.

(A) A administração pública direta e indireta de qualquer dos Poderes obedecerá aos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência.
(B) A administração pública direta obedece aos princípios constitucionais expressos, mas a administração indireta está dispensada de observá-los.
(C) Os princípios constitucionais expressos da administração pública aplicam-se apenas ao Poder Executivo, não alcançando os Poderes Legislativo e Judiciário.
(D) São princípios expressos da administração pública a legalidade, a supremacia do interesse público e a autotutela.
(E) A Constituição Federal não elenca princípios expressos para a administração pública, apenas princípios implícitos reconhecidos pela doutrina.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 37, caput, da Constituição Federal elenca os cinco princípios expressos (mnemônico LIMPE) que regem toda a atuação administrativa, em qualquer esfera federativa ou Poder. A alternativa B erra ao dispensar a administração indireta; a C erra ao restringir ao Executivo; a D troca dois dos princípios expressos por princípios implícitos (supremacia do interesse público e autotutela, que são reconhecidos pela doutrina, mas não estão no rol do art. 37); e a E é falsa, pois a Constituição elenca sim princípios expressos.
Exemplo: a divulgação de editais de concurso público em veículo oficial de comunicação concretiza o princípio da publicidade, aplicável a qualquer Poder e a toda a administração direta e indireta.'
where external_item_key = 'pcac17-adm-04';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Constituição Federal de 1988, assinale a alternativa correta.

(A) A investidura em cargo ou emprego público depende de aprovação prévia em concurso público de provas ou de provas e títulos, ressalvadas as nomeações para cargo em comissão declarado em lei de livre nomeação e exoneração.
(B) A investidura em cargo ou emprego público sempre depende de concurso público, sem qualquer exceção constitucional.
(C) Os cargos em comissão, embora de livre nomeação, também exigem aprovação prévia em concurso público, segundo a Constituição Federal.
(D) A exigência de concurso público aplica-se apenas aos empregos públicos da administração direta, não alcançando a administração indireta.
(E) Compete a cada órgão da administração pública decidir livremente se exigirá ou não concurso público para a investidura em seus cargos efetivos.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 37, inciso II, da Constituição Federal consagra o concurso público como regra geral para a investidura em cargos e empregos públicos efetivos, ressalvando apenas os cargos em comissão, de livre nomeação e exoneração. A alternativa B erra ao negar qualquer exceção; a C contraria a própria ressalva constitucional; a D restringe indevidamente a exigência à administração direta; e a E é falsa, pois a exigência de concurso é imposição constitucional, não uma escolha discricionária de cada órgão.
Exemplo: um secretário de estado pode ser nomeado diretamente pelo governador, sem concurso, por ocupar cargo em comissão de livre nomeação, mas um analista administrativo efetivo do mesmo órgão só pode ser investido mediante aprovação em concurso público.'
where external_item_key = 'pcac17-adm-05';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Constituição Federal de 1988, assinale a alternativa correta.

(A) Os atos de improbidade administrativa importarão a suspensão dos direitos políticos, a perda da função pública, a indisponibilidade dos bens e o ressarcimento ao erário, na forma e gradação previstas em lei, sem prejuízo da ação penal cabível.
(B) Os atos de improbidade administrativa importam exclusivamente sanções de natureza penal, não podendo gerar suspensão de direitos políticos.
(C) A prática de improbidade administrativa afasta, por si só, a possibilidade de responsabilização penal pelo mesmo fato, em razão da vedação ao bis in idem.
(D) A Constituição Federal, ao tratar de improbidade administrativa, fixa diretamente a gradação das sanções, sem remeter essa definição à lei ordinária.
(E) A indisponibilidade de bens do agente ímprobo é sanção vedada pela Constituição Federal, por violar o direito de propriedade.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 37, § 4º, da Constituição Federal estabelece as sanções aplicáveis ao agente que pratica ato de improbidade, deixando à lei ordinária a gradação dessas penalidades, sem prejuízo de eventual responsabilização penal pelo mesmo fato. A alternativa B erra ao restringir a sanções penais; a C erra ao invocar bis in idem, que não se aplica entre esferas distintas (cível-administrativa e penal); a D contraria o próprio texto, que remete a gradação à lei; e a E é falsa, pois a indisponibilidade de bens é expressamente prevista como sanção constitucional.
Exemplo: um gestor condenado por improbidade que causou dano ao erário pode ter seus bens tornados indisponíveis e perder a função pública, independentemente de eventual condenação criminal pelo mesmo fato.'
where external_item_key = 'pcac17-adm-06';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na doutrina de direito administrativo, assinale a alternativa correta.

(A) Atos vinculados e atos discricionários são sinônimos na doutrina administrativista, não havendo distinção prática entre eles.
(B) Atos vinculados são aqueles em que a lei estabelece todos os requisitos e condições de sua realização, sem margem de escolha para o administrador; atos discricionários permitem juízo de conveniência e oportunidade dentro dos limites legais.
(C) Atos discricionários são aqueles em que a lei estabelece todos os requisitos, sem qualquer margem de escolha para o administrador.
(D) Nos atos vinculados, o administrador pode escolher livremente, entre diversas opções, a que melhor atenda ao interesse público, segundo seu juízo de conveniência.
(E) A discricionariedade administrativa permite ao administrador agir contra ou além dos limites estabelecidos em lei, sempre que entender conveniente.',
  official_answer = 'B',
  explanation = 'A alternativa correta é a B. Nos atos vinculados, a lei não deixa espaço de valoração subjetiva, cabendo ao administrador apenas verificar o preenchimento dos requisitos legais; nos discricionários, a lei confere margem de liberdade para escolher, entre opções válidas, a que melhor atenda ao interesse público, sempre dentro da legalidade. A alternativa A nega a distinção, que é real e relevante; a C e a D trocam os conceitos entre si; e a E é falsa, pois a discricionariedade jamais autoriza agir contra ou além da lei, apenas dentro da margem por ela conferida.
Exemplo: a concessão de aposentadoria por tempo de contribuição, uma vez preenchidos os requisitos legais, é ato vinculado; já a decisão sobre remover ou não um servidor por interesse do serviço, dentro dos limites legais, é ato discricionário.'
where external_item_key = 'pcac17-adm-07';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na doutrina de direito administrativo, assinale a alternativa correta.

(A) Bens de uso comum do povo são os destinados ao uso indiscriminado da coletividade, como ruas e praças; bens de uso especial são os afetados à prestação de serviço público, como prédios de repartições; e bens dominicais constituem o patrimônio disponível do Estado, sem destinação pública específica.
(B) Bens dominicais são todos os bens utilizados pela administração pública para a realização de suas atividades e consecução de seus fins, estejam ou não afetados a uma finalidade específica.
(C) Bens de uso comum do povo são exclusivamente os bens móveis pertencentes ao patrimônio disponível do Estado.
(D) Bens de uso especial são aqueles que, por não terem destinação pública específica, podem ser livremente alienados pelo Estado.
(E) A classificação dos bens públicos quanto à destinação não admite a categoria de bens dominicais, restringindo-se a bens de uso comum e de uso especial.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O Código Civil e a doutrina classificam os bens públicos, quanto à destinação, em bens de uso comum do povo (utilização geral, como praças e vias públicas), bens de uso especial (afetados a finalidade pública específica, como prédios públicos) e bens dominicais (patrimônio disponível do Estado, sem afetação específica). A alternativa B descreve, na verdade, os bens de uso especial; a C restringe indevidamente os bens de uso comum a bens móveis; a D confunde bens de uso especial com dominicais; e a E nega a existência da categoria dominical, que é real e relevante (é justamente ela que pode ser alienada).
Exemplo: um terreno público sem uso definido, que poderia ser alienado pelo Estado mediante licitação, é classificado como bem dominical, e não como bem de uso especial.'
where external_item_key = 'pcac17-adm-08';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Lei nº 14.133/2021, assinale a alternativa correta.

(A) São cláusulas exorbitantes dos contratos administrativos, entre outras, a possibilidade de alteração e rescisão unilateral pela Administração, a fiscalização da execução contratual, a aplicação de sanções e a ocupação provisória de bens, prerrogativas que não encontram equivalente nos contratos regidos exclusivamente pelo direito privado.
(B) As cláusulas exorbitantes são vedadas nos contratos administrativos regidos pela Lei nº 14.133/2021, por violarem o princípio da isonomia entre as partes contratantes.
(C) A possibilidade de alteração unilateral do contrato pela Administração depende sempre de prévia concordância do contratado, sob pena de rescisão contratual.
(D) A fiscalização da execução contratual é prerrogativa exclusiva do contratado, cabendo à Administração apenas o pagamento pelos serviços prestados.
(E) A ocupação provisória de bens do contratado, mesmo em serviços essenciais, é vedada pelo ordenamento jurídico brasileiro em qualquer hipótese.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. As cláusulas exorbitantes representam prerrogativas especiais conferidas à Administração nos contratos administrativos, justificadas pela supremacia do interesse público. A alternativa B nega essas prerrogativas, que são, ao contrário, típicas e legítimas nesse regime; a C erra ao exigir concordância do contratado para a alteração unilateral, que é justamente unilateral; a D inverte a titularidade da fiscalização; e a E é falsa, pois a ocupação provisória de bens é expressamente admitida em hipóteses de serviços essenciais.
Exemplo: em um contrato de prestação de serviço essencial, a Administração pode, em caso de rescisão por inadimplemento do contratado, ocupar provisoriamente os equipamentos utilizados na prestação do serviço, para garantir sua continuidade.'
where external_item_key = 'pcac17-adm-09';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Constituição Federal de 1988, assinale a alternativa correta.

(A) A lei estabelecerá o procedimento para desapropriação por necessidade ou utilidade pública, ou por interesse social, mediante justa e prévia indenização em dinheiro, ressalvados os casos previstos na Constituição.
(B) A desapropriação, em qualquer hipótese prevista na Constituição Federal, deve ser indenizada exclusivamente em títulos da dívida agrária.
(C) A desapropriação por necessidade ou utilidade pública dispensa qualquer forma de indenização ao proprietário do bem expropriado.
(D) A indenização por desapropriação, quando devida em dinheiro, pode ser paga em parcelas após a efetiva transferência da propriedade ao Poder Público, sem prejuízo à regra geral.
(E) A Constituição Federal veda, em qualquer hipótese, a desapropriação de imóveis urbanos para fins de utilidade pública.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 5º, inciso XXIV, da Constituição Federal disciplina a desapropriação, exigindo, como regra geral, indenização justa e prévia em dinheiro, ressalvadas hipóteses específicas (como a reforma agrária, indenizada em títulos da dívida agrária). A alternativa B generaliza indevidamente a exceção da reforma agrária para todas as hipóteses; a C nega a exigência constitucional de indenização; a D contraria a exigência de indenização prévia (antes da transferência, não depois); e a E é falsa, pois a desapropriação de imóveis urbanos por utilidade pública é expressamente admitida.
Exemplo: a desapropriação de um imóvel urbano para construção de uma via pública deve, em regra, ser precedida do pagamento da justa indenização em dinheiro ao proprietário.'
where external_item_key = 'pcac17-adm-10';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na doutrina de direito administrativo, assinale a alternativa correta.

(A) A servidão administrativa transfere ao Poder Público a propriedade plena do bem, extinguindo qualquer direito do particular sobre ele.
(B) A servidão administrativa é direito real público que autoriza o Poder Público a usar a propriedade imóvel privada para permitir a execução de obras e serviços de interesse coletivo, sem retirar do proprietário o domínio ou a posse direta do bem, gerando direito à indenização apenas quando houver efetivo prejuízo comprovado.
(C) A servidão administrativa, assim como a desapropriação, sempre exige indenização prévia e em dinheiro, independentemente da existência de prejuízo ao proprietário.
(D) A servidão administrativa é modalidade de contrato administrativo, dependendo de licitação prévia para sua constituição.
(E) A servidão administrativa não admite indenização ao proprietário em nenhuma hipótese, por se tratar de ônus de natureza gratuita.',
  official_answer = 'B',
  explanation = 'A alternativa correta é a B. A servidão administrativa constitui forma de intervenção restritiva na propriedade privada, impondo um ônus real sobre o imóvel para viabilizar obra ou serviço de interesse público, sem transferir o domínio, sendo a indenização devida apenas na medida do prejuízo efetivamente demonstrado. A alternativa A confunde servidão com desapropriação (que sim transfere a propriedade); a C erra ao exigir indenização prévia sempre, mesmo sem prejuízo comprovado; a D é falsa, pois a servidão não é um contrato administrativo sujeito a licitação; e a E nega indevidamente a possibilidade de indenização quando há prejuízo.
Exemplo: a instalação de uma linha de transmissão de energia elétrica sobre uma propriedade rural, sem retirar do proprietário o uso do solo, exemplifica servidão administrativa.'
where external_item_key = 'pcac17-adm-11';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Lei nº 9.784/1999, assinale a alternativa correta.

(A) No processo administrativo, os atos dependem sempre de forma rigorosamente determinada em lei, sob pena de nulidade automática, mesmo quando a lei não exigir formalidade específica.
(B) O princípio do informalismo, no processo administrativo, aplica-se apenas aos atos praticados pela própria Administração, não alcançando os requerimentos apresentados pelo administrado.
(C) No processo administrativo, os atos devem ser produzidos com simplicidade, clareza e sem rigidez de formas, salvo exigência expressa de lei, permitindo maior flexibilidade procedimental em benefício do administrado.
(D) A ausência de forma rígida no processo administrativo compromete sua validade, exigindo-se sempre modelo próprio aprovado pela autoridade competente.
(E) O informalismo processual, na Lei nº 9.784/1999, autoriza o administrado a descumprir prazos legais sempre que entender conveniente.',
  official_answer = 'C',
  explanation = 'A alternativa correta é a C. O art. 22 da Lei nº 9.784/1999 consagra o princípio do informalismo (ou formalismo moderado), segundo o qual os atos do processo administrativo não dependem de forma determinada, senão quando a lei expressamente a exigir. A alternativa A inverte o princípio, exigindo forma rígida por padrão; a B restringe indevidamente o informalismo apenas aos atos da Administração; a D contraria a própria flexibilidade que o princípio busca garantir; e a E é falsa, pois o informalismo trata da forma dos atos, não autoriza descumprimento de prazos legais.
Exemplo: um requerimento administrativo apresentado de forma simples, sem seguir modelo rígido, pode ser aceito pela Administração, desde que contenha os elementos essenciais para sua compreensão e tramitação.'
where external_item_key = 'pcac17-adm-12';
