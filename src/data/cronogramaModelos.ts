import { canonicalDiscipline } from "@/lib/cronograma";

// Modelos fixos de cronograma, extraídos dos cronogramas do Método Focus (edital → disciplinas → conteúdo programático).
// "peso" é a sugestão inicial (2 = disciplina de maior peso/dificuldade: bloco inicial de 2 h); o aluno pode ajustar.
export interface ModeloDisciplina { nome: string; peso: 1 | 2; topicos: string[] }
export interface ModeloCronograma {
  id: string; orgao: string; cargo: string; banca: string; nivel: string; metodo: string; questoes: string; ano: number;
  disciplinas: ModeloDisciplina[];
}

const MODELOS_BRUTOS: ModeloCronograma[] = [
 {
  "id": "caixa-cesgranrio-tec-banc-novo",
  "orgao": "Caixa Econômica Federal",
  "cargo": "Técnico Bancário Novo",
  "banca": "Fundação Cesgranrio",
  "nivel": "Ensino Médio",
  "metodo": "Múltipla escolha",
  "questoes": "60",
  "ano": 2021,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos.",
     "Tipologia textual.",
     "Ortografia oficial.",
     "Acentuação gráfica.",
     "Emprego das classes de palavras.",
     "Emprego do sinal indicativo de crase.",
     "Sintaxe da oração e do período.",
     "Pontuação.",
     "Concordância nominal e verbal.",
     "Regência nominal e verbal.",
     "Significação das palavras.",
     "Redação Oficial: Manual de Redação da Presidência da República (disponível no sítio do Planalto na internet).",
     "Colocação do pronome átono."
    ]
   },
   {
    "nome": "Matemática Financeira",
    "peso": 1,
    "topicos": [
     "Conceitos gerais - o conceito do valor do dinheiro no tempo; Fluxos de caixa e diagramas de fluxo de caixa; Equivalência financeira.",
     "Sequências – lei de formação de sequências e determinação de seus elementos; progressões aritméticas e progressões geométricas.",
     "Juros Simples – cálculo do montante, dos juros, da taxa de juros, do principal e do prazo da operação financeira.",
     "Juros Compostos - cálculo do montante, dos juros, da taxa de juros, do principal e do prazo da operação financeira.",
     "Descontos – cálculo do valor atual, do valor nominal e da taxa de desconto.",
     "Sistemas de Amortização - sistema PRICE (método das prestações constantes); sistema SAC (método das amortizações constantes)."
    ]
   },
   {
    "nome": "Conhecimentos Bancários",
    "peso": 2,
    "topicos": [
     "Sistema Financeiro Nacional: Estrutura do Sistema Financeiro Nacional; Órgãos normativos e instituições supervisoras,",
     "executoras e operadoras. 2 - Mercado financeiro e seus desdobramentos (mercados monetário, de crédito, de capitais e cambial).",
     "Os bancos na Era Digital: Atualidade, tendências e desafios.",
     "Internet banking.",
     "Mobile banking.",
     "Open banking.",
     "Novos modelos de negócios.",
     "Fintechs, startups e big techs.",
     "Sistema de bancos-sombra (Shadow banking).",
     "O dinheiro na era digital: blockchain, bitcoin e demais criptomoedas.",
     "Correspondentes bancários.",
     "Sistema de pagamentos instantâneos (PIX).",
     "Transformação digital no Sistema Financeiro.",
     "Moeda e política monetária: Políticas monetárias convencionais e não-",
     "convencionais (Quantitative Easing); Taxa SELIC e operações compromissadas; O debate sobre os depósitos remunerados dos bancos comerciais no Banco Central do Brasil. 15 – Orçamento público, títulos do Tesouro Nacional e dívida pública.",
     "Produtos Bancários: Programas sociais e Benefícios do trabalhador; Noções de cartões de crédito e débito, crédito direto ao consumidor, crédito rural, poupança, capitalização, previdência, consórcio, investimentos e seguros.",
     "Noções de Mercado de capitais.",
     "Noções de Mercado de Câmbio: Instituições autorizadas a operar e operações básicas.",
     "Regimes de taxas de câmbio fixas, flutuantes e regimes intermediários.",
     "Taxas de câmbio nominais e reais; 21 - Impactos das taxas de câmbio sobre as exportações e importações.",
     "Diferencial de juros interno e externo, prêmios de risco, fluxo de capitais e seus impactos sobre as taxas de câmbio.",
     "Dinâmica do Mercado: Operações no mercado interbancário.",
     "Mercado bancário: Operações de tesouraria, varejo bancário e recuperação de crédito.",
     "Taxas de juros de curto prazo e a curva de juros; taxas de juros nominais e reais.",
     "Garantias do Sistema Financeiro Nacional: aval; fiança; penhor mercantil; alienação fiduciária; hipoteca; fianças bancárias.",
     "Crime de lavagem de dinheiro: conceito e etapas; Prevenção e combate ao crime de lavagem de dinheiro: Lei nº 9.613/98 e suas alterações; Circular nº 3.978, de 23 de janeiro de 2020 e Carta Circular nº 4.001, de 29 de janeiro de 2020 e suas alterações.",
     "Autorregulação bancária.",
     "Sigilo Bancário: Lei Complementar nº 105/2001 e suas alterações.",
     "Lei Geral de Proteção de Dados (LGPD): Lei nº 13.709, de 14 de agosto de 2018 e suas alterações.",
     "Legislação anticorrupção: Lei nº 12.846/2013 e Decreto nº 8.420/2015 e suas alterações.",
     "Ética aplicada: ética, moral, valores e virtudes; noções de ética empresarial e profissional. A gestão da ética nas empresas públicas e privadas. Código de Ética da Caixa Econômica Federal (disponível no sítio da CEF na internet); Código de Conduta da Caixa Econômica Federal (disponível no sítio da CEF na internet).",
     "Política de Responsabilidade Socioambiental da Caixa Econômica Federal (disponível no sítio da CEF na internet).",
     "Lei nº 7.998/1990 (Programa Desemprego e Abono Salarial - beneficiários e critérios para saque).",
     "Artigo 37 da Constituição Federal (Princípios constitucionais da Administração Pública: Princípios da legalidade, impessoalidade, moralidade, publicidade e eficiência).",
     "Lei Complementar nº 7/1970 (PIS). 37 - Lei nº 8.036/1990 (FGTS): possibilidades e condições de utilização/saque; Certificado de Regularidade do FGTS; Guia de Recolhimento (GRF).",
     "Produtos: Abertura e movimentação de contas: documentos básicos.",
     "Pessoa física e pessoa jurídica: capacidade e incapacidade civil, representação e domicílio.",
     "Sistema de pagamentos brasileiro."
    ]
   },
   {
    "nome": "Noções de Probabilidade e Estatística",
    "peso": 1,
    "topicos": [
     "Representação tabular e gráfica.",
     "Medidas de tendência central (média, mediana, moda, medidas de posição,",
     "mínimo e máximo) e de dispersão (amplitude, amplitude interquartil, variância, desvio padrão e coeficiente de variação). 3 - Cálculo de probabilidade.",
     "Teorema de Bayes e Probabilidade condicional.",
     "População e amostra.",
     "Correlação linear simples."
    ]
   },
   {
    "nome": "Conhecimentos de Informática",
    "peso": 1,
    "topicos": [
     "Edição de textos, planilhas e apresentações (ambientes Microsoft Office – Word, Excel e PowerPoint - versão O365).",
     "Segurança da informação: fundamentos, conceitos e mecanismos de segurança; Segurança cibernética: Resolução CMN nº 4893, de 26 de fevereiro de 2021.",
     "Conceitos de organização e de gerenciamento de informações, arquivos, pastas e programas.",
     "Redes de computadores: Conceitos básicos, ferramentas, aplicativos e procedimentos de Internet e intranet.",
     "Navegador Web (Microsoft Edge versão 91 e Mozilla Firefox versão 78 ESR), busca e pesquisa na Web.",
     "Correio eletrônico, grupos de discussão, fóruns e wikis.",
     "Redes Sociais (Twitter, Facebook, Linkedin, WhatsApp, YouTube, Instagram e Telegram).",
     "Visão geral sobre sistemas de suporte à decisão e inteligência de negócio.",
     "Conceitos de tecnologias e ferramentas multimídia, de reprodução de áudio e vídeo.",
     "Ferramentas de produtividade e trabalho a distância (Microsoft Teams, Cisco Webex, Google Hangout, Zoom, Google Drive e Skype)."
    ]
   },
   {
    "nome": "Atendimento Bancário",
    "peso": 2,
    "topicos": [
     "Noções de estratégia empresarial: análise de mercado, forças competitivas, imagem institucional, identidade e posicionamento",
     "Segmentação de mercado.",
     "Ações para aumentar o valor percebido pelo cliente.",
     "Gestão da experiência do cliente.",
     "Aprendizagem e sustentabilidade organizacional.",
     "Características dos serviços: intangibilidade, inseparabilidade, variabilidade e perecibilidade.",
     "Gestão da qualidade em serviços.",
     "Técnicas de vendas: da pré-abordagem ao pós-vendas.",
     "Noções de marketing digital: geração de leads; técnica de copywriting; gatilhos mentais; Inbound marketing.",
     "Ética e conduta profissional em vendas.",
     "Padrões de qualidade no atendimento aos clientes.",
     "Utilização de canais remotos para vendas.",
     "Comportamento do consumidor e sua relação com vendas e negociação.",
     "Política de Relacionamento com o Cliente: Resolução n°. 4.539 de 24 de novembro de 2016. 15 - Resolução CMN nº 4.860, de 23 de outubro de 2020 que dispõe sobre a constituição e o funcionamento de componente organizacional de ouvidoria pelas instituições financeiras e demais instituições autorizadas a funcionar pelo Banco Central do Brasil.",
     "Resolução CMN nº 3.694/2009 e alterações.",
     "Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência): Lei nº 13.146, de 06 de julho de 2015.",
     "Código de Proteção e Defesa do Consumidor: Lei nº 8.078/1990 (versão atualizada)."
    ]
   }
  ]
 },
 {
  "id": "depen-ag-exe-penal",
  "orgao": "DEPEN",
  "cargo": "Agente Federal de Execução Penal",
  "banca": "Cebraspe",
  "nivel": "Ensino Médio",
  "metodo": "Certo/Errado",
  "questoes": "120 + Redação",
  "ano": 2020,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos de gêneros variados.",
     "Reconhecimento de tipos e gêneros textuais.",
     "Domínio da ortografia oficial.",
     "Domínio dos mecanismos de coesão textual.",
     "1 Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.",
     "2 Emprego de tempos e modos verbais.",
     "Domínio da estrutura morfossintática do período.",
     "1 Emprego das classes de palavras.",
     "2 Relações de coordenação entre orações e entre termos da oração.",
     "3 Relações de subordinação entre orações e entre termos da oração.",
     "4 Emprego dos sinais de pontuação.",
     "5 Concordância verbal e nominal.",
     "6 Regência verbal e nominal.",
     "7 Emprego do sinal indicativo de crase.",
     "8 Colocação dos pronomes átonos.",
     "Reescrita de frases e parágrafos do texto.",
     "1 Significação das palavras.",
     "2 Substituição de palavras ou de trechos de texto.",
     "3 Reorganização da estrutura de orações e de períodos do texto.",
     "4 Reescrita de textos de diferentes gêneros e níveis de formalidade.",
     "Correspondência oficial (conforme Manual de Redação da Presidência da República)",
     "1 Padrão Ofício."
    ]
   },
   {
    "nome": "Ética no Serviço Público",
    "peso": 2,
    "topicos": [
     "Ética e moral.",
     "Ética, princípios e valores.",
     "Ética e democracia: exercício da cidadania.",
     "Ética e função pública.",
     "Ética no setor público.",
     "1 Lei nº 8.112/1990 e suas alterações.",
     "1.1 Espécies de Procedimento Disciplinar: sindicâncias investigativa, patrimonial e acusatória.",
     "1.2 Processo Administrativo Disciplinar.",
     "1.2.1 Ritos ordinário e sumário.",
     "1.2.2 Fases: instauração, inquérito e julgamento.",
     "1.2.3 Comissão disciplinar: requisitos, suspeição, impedimento e prazo para conclusão dos trabalhos (prorrogação e recondução).",
     "Lei nº 12.846/2013 e suas alterações."
    ]
   },
   {
    "nome": "Raciocínio Lógico",
    "peso": 2,
    "topicos": [
     "Estruturas lógicas.",
     "Lógica de argumentação: analogias, inferências, deduções e conclusões.",
     "Lógica sentencial (ou proposicional).",
     "1 Proposições simples e compostas.",
     "2 Tabelas verdade.",
     "☒",
     "3 Equivalências.",
     "4 Leis de Morgan.",
     "5 Diagramas lógicos.",
     "Lógica de primeira ordem.",
     "Razões e proporções.",
     "Regras de três simples.",
     "Porcentagens.",
     "Princípios de contagem e probabilidade.",
     "Operações com conjuntos.",
     "Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais."
    ]
   },
   {
    "nome": "Informática",
    "peso": 2,
    "topicos": [
     "Conceitos de internet e intranet.",
     "Conceitos e modos de utilização de tecnologias, ferramentas, aplicativos e procedimentos associados a internet/intranet.",
     "1 Ferramentas e aplicativos comerciais de navegação, de correio eletrônico, de grupos de discussão, de busca, de pesquisa e de",
     "redes sociais. 3 Noções de sistema operacional (ambiente Windows).",
     "Acesso à distância a computadores, transferência de informação e arquivos, aplicativos de áudio, vídeo e multimídia.",
     "Edição de textos, planilhas e apresentações (ambientes Microsoft Office e BrOffice).",
     "Redes de computadores.",
     "Conceitos de proteção e segurança.",
     "1 Noções de vírus, worms e pragas virtuais.",
     "2 Aplicativos para segurança (antivírus, firewall, anti-spyware etc.).",
     "Convergência de rede.",
     "1 Noções de voz sobre IP (VOIP e telefonia IP).",
     "2 Noções de videoconferência.",
     "Segurança da informação.",
     "Sistemas de armazenamento em disco e sistemas de replicação de dados.",
     "Procedimentos de backup.",
     "Noções de Power BI.",
     "Conceito de banco de dados."
    ]
   },
   {
    "nome": "Atualidades",
    "peso": 1,
    "topicos": [
     "Sistema de justiça criminal.",
     "Sistema prisional brasileiro e sistema penitenciário federal.",
     "Políticas públicas de segurança pública e cidadania.",
     "O papel do sistema penitenciário nas Políticas nacionais de segurança pública."
    ]
   },
   {
    "nome": "Noções de Direito Constitucional",
    "peso": 1,
    "topicos": [
     "Direitos e garantias fundamentais: direitos e deveres individuais e coletivos; direito à vida, à liberdade, à igualdade, à segurança e à propriedade; direitos sociais; nacionalidade; cidadania e direitos",
     "políticos; partidos políticos; garantias constitucionais individuais; garantias dos direitos coletivos, sociais e políticos. 2 Poder Executivo: forma e sistema de governo; chefia de Estado e chefia de governo.",
     "Defesa do Estado e das instituições democráticas: segurança pública; organização da segurança pública."
    ]
   },
   {
    "nome": "Noções de Direito Administrativo",
    "peso": 2,
    "topicos": [
     "Lei nº 8.112/1990 e suas alterações.",
     "Poderes administrativos.",
     "1 Hierárquico, disciplinar, regulamentar e de polícia.",
     "2 Uso e abuso do poder.",
     "Lei nº 8.666/1993 e suas alterações e Decreto nº 10.024/2019 (regulamenta a licitação, na modalidade pregão, na forma eletrônica).",
     "Decreto nº 6.170/2007 e suas alterações (dispõe sobre as normas relativas às transferências de recursos da União mediante convênios e contratos de repasse, e dá outras providências); Portaria Interministerial nº 424/2016 e suas alterações.",
     "Responsabilidade civil do Estado.",
     "1 Responsabilidade civil do Estado no direito brasileiro.",
     "1.1 Responsabilidade por ato comissivo do Estado.",
     "1.2 Responsabilidade por omissão do Estado.",
     "2 Requisitos para a demonstração da responsabilidade do Estado.",
     "3 Causas excludentes e atenuantes da responsabilidade do Estado.",
     "Lei nº 9.784/1999 e suas alterações.",
     "Portaria Interministerial nº 424/2016 e suas alterações."
    ]
   },
   {
    "nome": "Noções de Direito Penal",
    "peso": 2,
    "topicos": [
     "Aplicação da lei penal.",
     "1 Princípios.",
     "2 A lei penal no tempo e no espaço.",
     "3 Tempo e lugar do crime.",
     "4 Lei penal excepcional, especial e temporária.",
     "5 Territorialidade e extraterritorialidade da lei penal.",
     "6 Pena cumprida no estrangeiro.",
     "7 Eficácia da sentença estrangeira.",
     "8 Contagem de prazo.",
     "9 Frações não computáveis da pena.",
     "10 Interpretação da lei penal.",
     "11 Analogia.",
     "12 Irretroatividade da lei penal.",
     "13 Conflito aparente de normas penais.",
     "O fato típico e seus elementos.",
     "1 Crime consumado e tentado.",
     "2 Ilicitude e causas de exclusão.",
     "3 Excesso punível.",
     "Crimes contra a pessoa.",
     "Crimes contra o patrimônio.",
     "Crimes contra a fé pública.",
     "Crimes contra a administração pública.",
     "Disposições constitucionais aplicáveis ao direito penal."
    ]
   },
   {
    "nome": "Noções de Direito Processual Penal",
    "peso": 1,
    "topicos": [
     "Aplicação da lei processual no tempo, no espaço e em relação às pessoas.",
     "Disposições preliminares do Código de Processo Penal.",
     "Inquérito policial.",
     "Ação penal.",
     "Prisões, liberdade provisória e fianças.",
     "Processo e julgamento dos crimes de responsabilidade dos funcionários públicos.",
     "O habeas corpus e seu processo.",
     "Disposições constitucionais aplicáveis ao direito processual penal."
    ]
   },
   {
    "nome": "Noções de Direitos Humanos e Participação Social",
    "peso": 1,
    "topicos": [
     "Declaração Universal dos Direitos Humanos — Resolução 217-A (III) da Assembleia Geral das Nações Unidas, 1948.",
     "Direitos humanos e direitos fundamentais na Constituição Federal de 1988 (arts. 5º ao 15).",
     "Regras mínimas da ONU para o tratamento de pessoas presas.",
     "Decreto nº 7.037/2009 e suas alterações (Programa Nacional de Direitos Humanos).",
     "Decreto nº 9.759/2019 (extingue e estabelece diretrizes, regras e limitações para colegiados da administração pública federal.).",
     "Conselho Nacional de Política Criminal e Penitenciária (arts. 62 a 64 da Lei de Execução Penal e suas alterações).",
     "Conselhos Penitenciários (arts. 69 e 70 da Lei de Execução Penal e suas alterações).",
     "Conselhos da Comunidade (arts. 80 e 81 da Lei de Execução Penal e suas alterações)."
    ]
   },
   {
    "nome": "Legislação Especial",
    "peso": 1,
    "topicos": [
     "Lei nº 12.850/2013 e suas alterações (organizações criminosas).",
     "Lei nº 9.613/1998 e suas alterações (lavagem de dinheiro).",
     "Lei nº 9.455/1997 e suas alterações(antitortura).",
     "Lei nº 12.846/2013 e suas alterações (anticorrupção).",
     "Lei nº 13.869/2019 (abuso de autoridade).",
     "Lei nº 8.429/1992 e suas alterações (improbidade administrava).",
     "Lei nº 10.826/2003 e suas alterações (Estatuto do Desarmamento).",
     "Lei nº 11.343/2006 e suas alterações (Lei de Drogas).",
     "Lei nº 13964/2019 (aperfeiçoa a legislação penal e processual penal)."
    ]
   },
   {
    "nome": "Execução Penal",
    "peso": 1,
    "topicos": [
     "Lei nº 7.210/1984 (Lei de Execução Penal).",
     "Portaria Interministerial MJ/SEDH nº",
     "226/2010 (estabelece diretrizes sobre o uso da força pelos agentes de segurança pública). 3 Portaria MJSP nº 65/2019 (formação da força tarefa de intervenção penitenciária no âmbito do DEPEN).",
     "Portaria MJSP nº 157/2019 (disciplina o procedimento de visita social aos presos nos estabelecimentos penais federais de segurança máxima e dá outras providências).",
     "Lei nº 13.675/2018 (disciplina a organização e o funcionamento dos órgãos responsáveis pela segurança pública; cria a Política Nacional de Segurança Pública e Defesa Social; institui o Sistema Único de Segurança Pública) e Decreto de Regulamentação nº 9.489/2018.",
     "Portaria MJSP nº 18/2020 (aprova a Doutrina Nacional de Atuação Integrada de Segurança Pública – DNAISP).",
     "1 Doutrina Nacional de Atuação Integrada",
     "de Segurança Pública – DNAISP. 7 Plano Nacional de Política Criminal e Penitenciária 2020–2023."
    ]
   },
   {
    "nome": "Departamento Penitenciário Nacional",
    "peso": 1,
    "topicos": [
     "Decreto nº 6.049/2007 (Regulamento Penitenciário Federal).",
     "Portaria MSP nº 199/2018 (Regimento Interno do Departamento Penitenciário Nacional).",
     "Lei nº 10.693/2003 e suas alterações.",
     "Lei nº 11.907/2009 (Seção XXIII – Das Carreiras da Área Penitenciária Federal).",
     "Lei n º 13.327/2006 (Capítulo VIII – Das Carreiras da Área Penitenciária Federal).",
     "Lei nº 11.473/2007 (dispõe sobre cooperação federativa no âmbito da segurança pública).",
     "Lei nº 11.671/2008 (dispõe sobre a transferência e inclusão de presos em estabelecimentos penais federais).",
     "Decreto nº 6.877/2008 (Regulamenta a Lei nº 11.671/2008).",
     "Portaria DISPF/DEPEN nº 11/2015 (Aprova o Manual das Assistências do Sistema Penitenciário Federal)."
    ]
   }
  ]
 },
 {
  "id": "iapen-ac-auxiliar-administrativo",
  "orgao": "IAPEN-AC",
  "cargo": "Auxiliar Administrativo",
  "banca": "IBADE",
  "nivel": "Ensino Médio",
  "metodo": "Múltipla escolha",
  "questoes": "40",
  "ano": 2021,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Interpretação de textos, com domínio de relações discursivas, semânticas e morfossintáticas.",
     "Tipos textuais: narrativo, descritivo, argumentativo e injuntivo.",
     "Gêneros discursivos.",
     "Coesão e coerência textual.",
     "Valor dos conectivos.",
     "Usos dos pronomes.",
     "Semântica: sinonímia, polissemia, homonímia, hiperonímia, hiponímia.",
     "Figuras de linguagem: hipérbole, metáfora, metonímia, personificação e outros.",
     "Estrutura e formação de palavras: composição, derivação e outros processos.",
     "Flexão nominal e verbal.",
     "Emprego de tempos e modos verbais.",
     "Classes de palavras.",
     "Regência nominal e verbal.",
     "Concordância nominal e verbal.",
     "Estruturação de períodos: coordenação, subordinação e correlação.",
     "Pontuação.",
     "Variação linguística.",
     "Ortografia."
    ]
   },
   {
    "nome": "Raciocínio Lógico Quantitativo",
    "peso": 2,
    "topicos": [
     "Entendimento da estrutura lógica de relações arbitrárias entre as pessoas, lugares, objetos ou eventos fictícios.",
     "Dedução de novas relações em função de relações fornecidas e avaliação das condições usadas para estabelecer a estrutura daquelas relações.",
     "Compreensão e análise da lógica de uma situação.",
     "Utilizando as funções intelectuais.",
     "Raciocínio verbal.",
     "Raciocínio matemático.",
     "Raciocínio sequencial.",
     "Orientação espacial e temporal.",
     "Formação de conceitos e discriminação de elementos.",
     "Porcentagem.",
     "Razões e proporções.",
     "Regra de três simples e composta.",
     "Princípio fundamental da contagem.",
     "Problemas utilizando as operações fundamentais.",
     "Noções de probabilidade."
    ]
   },
   {
    "nome": "História do Acre",
    "peso": 2,
    "topicos": [
     "O processo de ocupação das terras acreanas.",
     "A ocupação indígena.",
     "A imigração nordestina e a produção da borracha.",
     "A insurreição acreana e anexação do Acre ao Brasil.",
     "A chegada dos “paulistas” nas terras acreanas a partir dos anos 70 do século passado: êxodo rural, conflitos pela terra e invasões do espaço urbano.",
     "A evolução política do Acre: de Território a",
     "Estado. Desafios para um futuro sustentável.",
     "Trabalhos e produção nas diferentes nações indígenas.",
     "Uso e posse da terra dos indígenas da Amazônia no auge do ciclo da borracha.",
     "Ocupação e utilização da terra.",
     "Ocupação e disputa pela terra entre povos indígenas.",
     "Grupos de interesse socioeconômico.",
     "Atividades econômicas mais relevantes no estudo da história da Amazônia e do Acre."
    ]
   },
   {
    "nome": "Geografia do Acre",
    "peso": 2,
    "topicos": [
     "Aspectos geográficos e ecológicos da Amazônia e do Acre.",
     "Formação econômica do Acre.",
     "Processo de anexação do Acre ao Brasil: tratados e limites.",
     "Municípios e populações do Acre: população e localização.",
     "Nova configuração do mapa.",
     "Microrregiões.",
     "Atuais municípios.",
     "Relevo, vegetação, clima, solo, hidrografia, fluxo migratório.",
     "Extrativismo e Zoneamento Ecológico do Acre.",
     "A paisagem local e sua relação com outras paisagens (semelhanças e diferenças, permanências e transformações).",
     "Linguagem cartográfica: leitura de mapas.",
     "Modos de vida no campo e na cidade.",
     "Papel da tecnologia na configuração de paisagens urbanas e rurais e na estruturação da vida em sociedade.",
     "Apropriação e transformação da natureza.",
     "Preservação e cuidados com o meio: como o homem usa a natureza e constrói o seu espaço.",
     "O processo industrial e suas relações no município, no estado e no país."
    ]
   },
   {
    "nome": "Conhecimentos Específicos",
    "peso": 2,
    "topicos": [
     "Fundamentos básicos de Administração: conceitos, características e finalidade.",
     "Funções administrativas: planejamento, organização, controle e direção.",
     "Estrutura organizacional.",
     "Comportamento organizacional.",
     "Rotinas administrativas: técnicas de arquivo e protocolo.",
     "Classificação de documentos.",
     "Racionalização do trabalho.",
     "Delegação de poderes, centralização e descentralização.",
     "Liderança.",
     "Motivação.",
     "Comunicação.",
     "Ética.",
     "Relações humanas: trabalho em equipe.",
     "Comunicação interpessoal e atendimento.",
     "Correspondência e atos oficiais: princípios da redação oficial.",
     "Emprego dos pronomes de tratamento.",
     "Níveis hierárquicos de tratamento.",
     "Conceitos e modelos de atos oficiais: alvará, ata, certidão, circular, convênio.",
     "Decreto, despacho, edital, estatuto, memorando.",
     "Ofício, ordem de serviço, parecer, portaria.",
     "Regimento, relatório, resolução, requerimento.",
     "Gestão de material e controle de estoques.",
     "Lei de Acesso à Informação (LAI).",
     "Lei nº 1.908, de 31/07/2007.",
     "Lei nº 8.742, de 07/12/1993.",
     "Lei nº 12.435, de 06/07/2011.",
     "Resolução nº 307/2019.",
     "Lei nº 7.716, de 05/01/1989.",
     "Lei nº 12.288, de 20/07/2010.",
     "Lei nº 9.394, de 20/12/1996.",
     "Lei nº 11.645, de 10/03/2008.",
     "Lei nº 6.001, de 19/12/1973.",
     "Lei nº 10.741, de 01/10/2003.",
     "Declaração Universal dos Direitos Humanos, 1948.",
     "Lei nº 12.986, de 02/06/2014, CNDH.",
     "Lei nº 13.467, de 13/07/2017 (CLT).",
     "Decreto nº 10.661, de 26/03/2021.",
     "Medida Provisória 1.045, de 27/04/2021.",
     "Lei nº 8.080, de 19/09/1990, SUS.",
     "Lei nº 8.142, de 28/12/1990, SUS.",
     "Lei nº 10.216, de 06/04/2001.",
     "Resolução Conjunta nº 01/2014, LGBT.",
     "Resolução conjunta nº 01/2018, CNAS."
    ]
   }
  ]
 },
 {
  "id": "ibge-agente-censitario-municipal-e-supervisor",
  "orgao": "IBGE",
  "cargo": "Agente Censitário Municipal e Supervisor",
  "banca": "CEBRASPE",
  "nivel": "Ensino Médio",
  "metodo": "Múltipla escolha",
  "questoes": "60",
  "ano": 2021,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos de gêneros variados.",
     "Reconhecimento de tipos e gêneros textuais.",
     "Domínio da ortografia oficial.",
     "Domínio dos mecanismos de coesão textual.",
     "Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.",
     "Emprego de tempos e modos verbais.",
     "Domínio da estrutura morfossintática do período.",
     "Emprego das classes de palavras.",
     "Relações de coordenação entre orações e entre termos da oração.",
     "Relações de subordinação entre orações e entre termos da oração.",
     "Emprego dos sinais de pontuação.",
     "Concordância verbal e nominal.",
     "Regência verbal e nominal.",
     "Emprego do sinal indicativo de crase.",
     "Colocação dos pronomes átonos.",
     "Reescrita de frases e parágrafos do texto.",
     "Significação das palavras.",
     "Substituição de palavras ou de trechos de texto.",
     "Reorganização da estrutura de orações e de períodos do texto.",
     "Reescrita de textos de diferentes gêneros e níveis de formalidade."
    ]
   },
   {
    "nome": "Raciocínio Lógico Quantitativo",
    "peso": 1,
    "topicos": [
     "Estruturas lógicas.",
     "Lógica de argumentação.",
     "Diagramas lógicos.",
     "Aritmética.",
     "Leitura e interpretação de tabelas e gráficos."
    ]
   },
   {
    "nome": "Ética no Serviço Público",
    "peso": 1,
    "topicos": [
     "Código de Ética do IBGE.",
     "Lei nº 8.112/1990 (art. 116, incisos I a IV, inciso V, alíneas a e c, incisos VI a XII e parágrafo único; art. 117, incisos I a VI e IX a XIX; art. 118 a art. 126; art. 127, incisos I a III; art. 132, incisos I a VII, e IX a XIII; art. 136 a art. 141; art. 142, incisos I, primeira parte, II e III, e §1º a §4º)."
    ]
   },
   {
    "nome": "Noções de Administração / Situações Gerenciais",
    "peso": 2,
    "topicos": [
     "Aspectos gerais da administração.",
     "Organizações como sistemas abertos.",
     "Funções administrativas.",
     "Planejamento, organização, direção e controle.",
     "Motivação, comunicação e liderança.",
     "Processo decisório e resolução de problemas.",
     "Noções básicas de gerência e gestão de organizações e de pessoas.",
     "Eficiência e funcionamento de grupos.",
     "O indivíduo na organização: papéis e",
     "interações. Trabalho em equipe.",
     "Equipes de trabalho.",
     "Responsabilidade, coordenação, autoridade, poder e delegação.",
     "Avaliação de desempenho.",
     "Compromisso com a qualidade nos serviços prestados."
    ]
   },
   {
    "nome": "Conhecimentos Técnicos",
    "peso": 1,
    "topicos": [
     "Conhecimentos técnicos aplicados no Censo Demográfico 2021."
    ]
   }
  ]
 },
 {
  "id": "inss-tecn-serv-social",
  "orgao": "INSS",
  "cargo": "Técnico do Seguro Social",
  "banca": "Cebraspe",
  "nivel": "Ensino Médio",
  "metodo": "Certo/Errado",
  "questoes": "120",
  "ano": 2015,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos.",
     "Tipologia textual.",
     "Ortografia oficial.",
     "Acentuação gráfica.",
     "Emprego das classes de palavras.",
     "Emprego do sinal indicativo de crase.",
     "Sintaxe da oração e do período.",
     "Pontuação.",
     "Concordância nominal e verbal.",
     "Regências nominal e verbal.",
     "Significação das palavras.",
     "Redação de correspondências oficiais (conforme Manual de Redação da Presidência da República)."
    ]
   },
   {
    "nome": "Ética no Serviço Público",
    "peso": 1,
    "topicos": [
     "Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal: Decreto nº 1.171/1994",
     "Decreto nº 6.029/2007.",
     "Código de Ética Profissional do Servidor",
     "Público Civil do Poder Executivo Federal: Decreto nº"
    ]
   },
   {
    "nome": "Regime Jurídico Único",
    "peso": 1,
    "topicos": [
     "Lei 8.112/1990 e alterações, direitos e deveres do Servidor Público.",
     "O servidor público como agente de desenvolvimento social.",
     "Saúde e qualidade de vida no serviço público."
    ]
   },
   {
    "nome": "Noções de Direito Constitucional",
    "peso": 1,
    "topicos": [
     "Direitos e deveres fundamentais: direitos e deveres individuais e coletivos; direito à vida, à liberdade, à igualdade, à segurança e à propriedade; direitos sociais; nacionalidade; cidadania; garantias constitucionais individuais; garantias dos direitos coletivos, sociais e políticos.",
     "Administração Pública (artigos de 37 a 41, capítulo VII, Constituição Federal de 1988 e atualizações)."
    ]
   },
   {
    "nome": "Noções de Direito Administrativo",
    "peso": 1,
    "topicos": [
     "Estado, governo e Administração Pública: conceitos, elementos, poderes e organização; natureza, fins e princípios.",
     "Direito Administrativo: conceito, fontes e princípios.",
     "Organização administrativa da União; administração direta e indireta.",
     "Agentes públicos: espécies e classificação; poderes, deveres e prerrogativas; cargo, emprego e função públicos; regime jurídico único: provimento, vacância, remoção, redistribuição e substituição; direitos e vantagens; regime disciplinar; responsabilidade civil, criminal e administrativa.",
     "Poderes administrativos: poder",
     "hierárquico; poder disciplinar; poder regulamentar; poder de polícia; uso e abuso do poder. 6 Ato administrativo: validade, eficácia; atributos; extinção, desfazimento e sanatória; classificação, espécies e exteriorização; vinculação e discricionariedade.",
     "Serviços Públicos: conceito, classificação, regulamentação e controle; forma, meios e requisitos; delegação: concessão, permissão, autorização.",
     "Controle e responsabilização da administração: controle administrativo; controle judicial; controle legislativo; responsabilidade civil do Estado. Lei nº 8.429/1992 (sanções aplicáveis aos agentes públicos nos casos de enriquecimento ilícito no exercício de mandato, cargo, emprego ou função da administração pública direta, indireta ou fundacional e dá outras providências).",
     "Lei n° 9.784/1999 (Lei do Processo Administrativo)."
    ]
   },
   {
    "nome": "Noções de Informática",
    "peso": 1,
    "topicos": [
     "Conceitos de Internet e intranet.",
     "Conceitos básicos e modos de utilização de tecnologias, ferramentas, aplicativos e procedimentos de informática.",
     "Conceitos e modos de utilização de aplicativos para edição de textos, planilhas e apresentações utilizando-se a suíte de escritório LibreOffice.",
     "Conceitos e modos de utilização de sistemas operacionais Windows 7 e 10.",
     "Noções básicas de ferramentas e aplicativos de navegação e correio eletrônico.",
     "Noções básicas de segurança e proteção: vírus, worms e derivados."
    ]
   },
   {
    "nome": "Raciocínio Lógico",
    "peso": 1,
    "topicos": [
     "Conceitos básicos de raciocínio lógico: proposições; valores lógicos das proposições; sentenças abertas; número de linhas da tabela verdade; conectivos; proposições simples; proposições compostas.",
     "Tautologia.",
     "Operação com conjuntos.",
     "Cálculos com porcentagens."
    ]
   },
   {
    "nome": "Seguridade Social",
    "peso": 2,
    "topicos": [
     "Seguridade Social.",
     "1 Origem e evolução legislativa no Brasil.",
     "2 Conceituação.",
     "3 Organização e princípios constitucionais.",
     "Legislação Previdenciária.",
     "1 Conteúdo, fontes, autonomia.",
     "3 Aplicação das normas previdenciárias.",
     "3.1 Vigência, hierarquia, interpretação e integração.",
     "Regime Geral de Previdência Social.",
     "1 Segurados obrigatórios.",
     "2 Filiação e inscrição.",
     "3 Conceito, características e abrangência: empregado, empregado doméstico, contribuinte individual, trabalhador avulso e segurado especial.",
     "4 Segurado facultativo: conceito, características, filiação e inscrição.",
     "5 Trabalhadores excluídos do Regime Geral.",
     "Empresa e empregador doméstico: conceito previdenciário.",
     "Financiamento da Seguridade Social.",
     "1 Receitas da União.",
     "2 Receitas das contribuições sociais: dos segurados, das empresas, do empregador doméstico, do produtor rural, do clube de futebol profissional, sobre a receita de concursos de prognósticos, receitas de outras fontes.",
     "3 Salário-de-contribuição.",
     "3.1 Conceito.",
     "3.2 Parcelas integrantes e parcelas não- integrantes.",
     "3.3 Limites mínimo e máximo.",
     "3.4 Proporcionalidade."
    ]
   }
  ]
 },
 {
  "id": "pc-am-cetram",
  "orgao": "PC-AM",
  "cargo": "Escrivão e Investigador",
  "banca": "CETAM",
  "nivel": "Ensino Superior",
  "metodo": "Múltipla Escolha",
  "questoes": "90 + 2 Discursivas",
  "ano": 2009,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos.",
     "Tipologia textual.",
     "Ortografia oficial.",
     "Acentuação gráfica.",
     "Emprego das classes de palavras.",
     "Emprego do sinal indicativo de crase.",
     "Sintaxe da oração e do período.",
     "Pontuação.",
     "Concordância nominal e verbal.",
     "Regência nominal e verbal.",
     "Significação das palavras.",
     "Redação de correspondências oficiais."
    ]
   },
   {
    "nome": "História e Geografia do Amazonas",
    "peso": 1,
    "topicos": [
     "Ocupação nativa Amazônia.",
     "A conquista europeia da Amazônia.",
     "A Colonização Portuguesa e a exploração da região amazônica.",
     "O Amazonas no Brasil Monárquico.",
     "O Amazonas na República do Brasil.",
     "Aspectos físicos (relevo, hidrografia e clima), humanos (população e grupos) e econômicos (extrativismo, modelo da Zona Franca de Manaus e impactos urbanos e sociais) da Geografia do Amazonas."
    ]
   },
   {
    "nome": "Conhecimentos de Informática",
    "peso": 1,
    "topicos": [
     "Conceito de Internet e intranet.",
     "Conceitos básicos e modos de utilização de tecnologias, ferramentas, aplicativos e procedimentos associados a Internet/Intranet.",
     "1 Ferramentas e aplicativos comerciais de navegação, de correio eletrônico, de grupos de discussão, de busca e pesquisa.",
     "2 Conceitos de protocolos, World Wide Web, organização de informação para uso na Internet, acesso à distância a computadores, transferência de informação e arquivos, aplicativos de áudio, vídeo, multimídia, uso da Internet na educação,",
     "negócios, medicina e outros domínios. 2.3 Conceitos de proteção e segurança.",
     "4 Novas tecnologias e outros.",
     "Conceitos básicos e modos de utilização de tecnologias, ferramentas, aplicativos e procedimentos de informática: tipos de computadores, conceitos de hardware e de software.",
     "1 Procedimentos, aplicativos e dispositivos para armazenamento de dados e para realização de cópia de segurança (back up).",
     "2 Conceitos de organização e gerenciamento de arquivos, pastas e programas, instalação de periféricos.",
     "3 Principais aplicativos comerciais para: edição de textos e planilhas, geração de material escrito, visual e sonoro e outros.",
     "Conceitos dos principais sistemas comerciais e outros."
    ]
   },
   {
    "nome": "Raciocínio Lógico",
    "peso": 1,
    "topicos": [
     "Entendimento da estrutura lógica das relações arbitrárias entre pessoas, lugares, coisas, eventos fictícios.",
     "dedução de novas informações das relações fornecidas e avaliar as condições usadas para estabelecer a estrutura daquelas relações.",
     "Resolução de situações-problema.",
     "As questões desta prova poderão tratar das seguintes áreas: estruturas lógicas, lógicas de argumentação, diagramas lógicos."
    ]
   },
   {
    "nome": "Atualidades",
    "peso": 1,
    "topicos": [
     "Domínio de tópicos atuais e relevantes de diversas áreas, tais como política, economia, sociedade, educação, tecnologia, desenvolvimento sustentável, artes e literatura."
    ]
   },
   {
    "nome": "Noções de Direito Constitucional",
    "peso": 2,
    "topicos": [
     "Direitos e deveres fundamentais: direitos e deveres individuais e coletivos.",
     "Direito à vida, à liberdade, à igualdade, à segurança e à propriedade.",
     "Direitos sociais.",
     "Nacionalidade.",
     "Cidadania e direitos políticos.",
     "Partidos políticos.",
     "Garantias constitucionais individuais.",
     "Garantias dos direitos coletivos, sociais e políticos.",
     "Poder Executivo, Poder Legislativo e Poder Judiciário.",
     "Defesa do Estado e das instituições democráticas: segurança pública. Organização da segurança pública.",
     "Da ordem social: seguridade e previdência.",
     "Constituição do Estado do Amazonas."
    ]
   },
   {
    "nome": "Noções de Direito Penal",
    "peso": 2,
    "topicos": [
     "A lei penal no tempo.",
     "A lei penal no espaço.",
     "Infração penal: elementos, espécies.",
     "Sujeito ativo e sujeito passivo da infração penal.",
     "Tipicidade, ilicitude, culpabilidade, punibilidade.",
     "Excludentes de ilicitude e de culpabilidade.",
     "Imputabilidade penal.",
     "Concurso de pessoas.",
     "Crimes contra a pessoa.",
     "Crimes contra o patrimônio.",
     "Crimes contra a Administração Pública.",
     "Abuso de autoridade (Lei n° 4.898/65).*",
     "* A Lei n° 4.898/65 foi revogada pela Lei nº 13.869, de 5 de setembro de 2019."
    ]
   },
   {
    "nome": "Noções de Direito Processual Penal",
    "peso": 2,
    "topicos": [
     "Inquérito policial.",
     "Notitias criminis.",
     "Ação penal.",
     "Espécies.",
     "Jurisdição.",
     "Competência.",
     "Prova (artigos 158 a 184 do CPP).",
     "Prisão em flagrante.",
     "Prisão preventiva.",
     "Prisão temporária (Lei n°17.960/89).",
     "Processos dos crimes de responsabilidade dos funcionários públicos.",
     "Habeas corpus."
    ]
   },
   {
    "nome": "Noções de Direito Administrativo",
    "peso": 2,
    "topicos": [
     "Estado, governo e administração pública: conceitos, elementos, poderes e organização. Natureza, fins e princípios.",
     "Direito Administrativo: conceito, fontes e princípios.",
     "Organização administrativa do Estado do Amazonas. Administração direta e indireta.",
     "Agentes públicos: espécies e classificação. Poderes, deveres e prerrogativas. Cargo,",
     "emprego e função públicos. Regime jurídico único: provimento, vacância, remoção, redistribuição e substituição. Direitos e vantagens. Regime disciplinar. Responsabilidade civil, criminal e administrativa.",
     "Poderes administrativos: poder hierárquico. Poder disciplinar. Poder regulamentar. Poder de polícia. Uso e abuso do poder.",
     "Ato administrativo: validade, eficácia. Atributos. Extinção, desfazimento e sanatória. Classificação, espécies e exteriorização. Vinculação e discricionariedade.",
     "Serviços Públicos. Conceito, classificação, regulamentação e controle. Forma, meios e requisitos. Delegação: concessão, permissão, autorização.",
     "Controle e responsabilização da administração: controle administrativo. Controle judicial. Controle legislativo. Responsabilidade civil do Estado.",
     "Estatuto da Polícia Civil – Lei nº 2.271/1994.10.",
     "Estatuto dos Funcionários Públicos Civis – Lei nº 1.762/86.",
     "Lei Complementar nº 30/2001.",
     "Lei Delegada n º 87/2007.Lei Estadual nº 2.875/2004."
    ]
   },
   {
    "nome": "Noções de Legislação Especial",
    "peso": 2,
    "topicos": [
     "Nova Lei de Drogas (Lei nº 11.343/2006) 2 Crimes hediondos (Lei n.º 8.072/1990).",
     "Crimes resultantes de preconceitos de raça ou de cor (Lei n.º 7.716/1989).",
     "Apresentação e uso de documento de identificação pessoal (Lei n.º 5.553/1968).",
     "O direito de representação e o processo de responsabilidade administrativa civil e penal, nos casos de abuso de autoridade (Lei n.º 4.898/1965).",
     "Definição dos crimes de tortura (Lei n.º 9.455/1997).",
     "Estatuto da Criança e do Adolescente (Lei n.º 8.069/1990).",
     "Estatuto do Desarmamento (Lei nº 10.826/2003).",
     "Crime organizado (Lei n.º 9.034/1995).",
     "Escuta telefônica (Lei n.º 9.296/1996).",
     "Execução Penal (Lei n.º 7.210/1984).",
     "Lei de imprensa (Lei n.º 5.250/1967).",
     "Código de proteção e defesa do consumidor (Lei n.º 8.078/1990).",
     "Lavagem de dinheiro (Lei n.º 9.613/1998).",
     "Crimes contra a ordem tributária (Lei n.º 8.137/1990).",
     "Estatuto do Idoso (Lei nº 10.741/2003) 17 Crimes contra o meio ambiente (Lei n.º 9.605/1998).",
     "Juizados especiais (Lei n.º 9.099/1996).",
     "Convenção Americana sobre Direitos Humanos (Pacto São José) (Decreto n.º 678/1992)."
    ]
   }
  ]
 },
 {
  "id": "pc-se-agente-escrivao",
  "orgao": "PC-SE",
  "cargo": "Agente e Escrivão de Polícia",
  "banca": "CEBRASPE",
  "nivel": "Ensino Superior",
  "metodo": "certo ou errado",
  "questoes": "100 + redação",
  "ano": 2021,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos de gêneros variados.",
     "Reconhecimento de tipos e gêneros textuais.",
     "Domínio da ortografia oficial.",
     "Emprego das letras.",
     "Emprego da acentuação gráfica.",
     "Domínio dos mecanismos de coesão textual.",
     "Emprego de elementos de referenciação, substituição e repetição, de conectores e outros elementos de sequenciação textual.",
     "Emprego/correlação de tempos e modos verbais.",
     "Domínio da estrutura morfossintática do período.",
     "Relações de coordenação entre orações e entre termos da oração.",
     "Relações de subordinação entre orações e entre termos da oração.",
     "Emprego dos sinais de pontuação.",
     "Concordância verbal e nominal.",
     "Emprego do sinal indicativo de crase.",
     "Colocação dos pronomes átonos.",
     "Reescritura de frases e parágrafos do texto.",
     "Substituição de palavras ou de trechos de texto.",
     "Retextualização de diferentes gêneros e níveis de formalidade."
    ]
   },
   {
    "nome": "Atualidades e Conhecimentos Sobre o Estado",
    "peso": 2,
    "topicos": [
     "Tópicos relevantes e atuais de diversas áreas, tais como segurança.",
     "Transportes.",
     "Política.",
     "Economia.",
     "Sociedade.",
     "Educação.",
     "Saúde.",
     "Cultura.",
     "Tecnologia.",
     "Energia.",
     "Relações internacionais.",
     "Desenvolvimento sustentável e ecologia, suas inter-relações e suas vinculações históricas.",
     "Índios em Sergipe.",
     "Processo de ocupação e povoamento do território sergipano.",
     "Economias fundadoras.",
     "Regiões geoeconômicas.",
     "Estrutura do poder e a sociedade colonial sergipana.",
     "Sergipe nas sucessivas fases da República brasileira.",
     "Condicionantes geoambientais (clima, recursos minerais, relevo e solo, recursos hídricos, vegetação).",
     "Dinâmica populacional.",
     "Rede urbana e organização do espaço.",
     "Formação metropolitana de Aracaju.",
     "Política, sociedade e economia no Sergipe contemporâneo.",
     "Potencialidades e perspectivas para o desenvolvimento econômico e social.",
     "Formação e expressão da cultura sergipana.",
     "Educação em Sergipe."
    ]
   },
   {
    "nome": "Ética",
    "peso": 1,
    "topicos": [
     "Ética e moral.",
     "Ética, princípios e valores.",
     "Ética e democracia: exercício da cidadania.",
     "Ética e função pública.",
     "Ética no setor público."
    ]
   },
   {
    "nome": "Direitos Humanos",
    "peso": 1,
    "topicos": [
     "Teoria geral dos direitos humanos.",
     "Conceitos, terminologia, estrutura normativa, fundamentação.",
     "Afirmação histórica dos direitos humanos.",
     "Direitos humanos e responsabilidade do Estado.",
     "Direitos humanos na Constituição Federal.",
     "Política Nacional de Direitos Humanos.",
     "A Constituição brasileira e os tratados internacionais de direitos humanos."
    ]
   },
   {
    "nome": "Raciocínio Lógico",
    "peso": 2,
    "topicos": [
     "Estruturas lógicas.",
     "Lógica de argumentação: analogias, inferências, deduções e conclusões.",
     "Lógica sentencial (ou proposicional).",
     "Proposições simples e compostas.",
     "Tabelas verdade.",
     "Equivalências.",
     "Leis de De Morgan.",
     "Diagramas lógicos.",
     "Lógica de primeira ordem.",
     "Princípios de contagem e probabilidade.",
     "Operações com conjuntos.",
     "Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais."
    ]
   },
   {
    "nome": "Direito Administrativo",
    "peso": 2,
    "topicos": [
     "Noções de organização administrativa.",
     "Centralização, descentralização, concentração e desconcentração.",
     "Administração direta e indireta.",
     "Autarquias, fundações, empresas públicas e sociedades de economia mista.",
     "Ato administrativo.",
     "Conceito, requisitos, atributos, classificação e espécies.",
     "Agentes públicos.",
     "Legislação pertinente.",
     "Lei Estadual nº 2.148/1977.",
     "Lei Complementar nº 16/1994.",
     "Disposições constitucionais aplicáveis.",
     "Disposições doutrinárias.",
     "Conceito.",
     "Espécies.",
     "Cargo, emprego e função pública.",
     "Poderes administrativos.",
     "Hierárquico, disciplinar, regulamentar e de polícia.",
     "Uso e abuso do poder.",
     "Licitação.",
     "Princípios.",
     "Contratação direta: dispensa e inexigibilidade.",
     "Modalidades.",
     "Tipos.",
     "Procedimento.",
     "Controle da administração pública.",
     "Controle exercido pela administração pública.",
     "Controle judicial.",
     "Controle legislativo.",
     "Responsabilidade civil do Estado.",
     "Responsabilidade civil do Estado no direito brasileiro.",
     "Responsabilidade por ato comissivo do Estado.",
     "Responsabilidade por omissão do Estado.",
     "Requisitos para a demonstração da responsabilidade do Estado.",
     "Causas excludentes e atenuantes da responsabilidade do Estado.",
     "Regime jurídico-administrativo.",
     "Conceito.",
     "Princípios expressos e implícitos da administração pública."
    ]
   },
   {
    "nome": "Direito Constitucional",
    "peso": 2,
    "topicos": [
     "Direitos e garantias fundamentais.",
     "Direitos e deveres individuais e coletivos.",
     "Direito à vida.",
     "À liberdade, à igualdade.",
     "À segurança e à propriedade.",
     "Direitos sociais.",
     "Nacionalidade.",
     "Cidadania e direitos políticos.",
     "Partidos políticos.",
     "Garantias constitucionais individuais.",
     "Garantias dos direitos coletivos.",
     "Sociais e políticos.",
     "Poder Executivo: forma e sistema de governo.",
     "Chefia de Estado e chefia de governo.",
     "Defesa do Estado e das instituições democráticas: Segurança pública.",
     "Organização da segurança pública.",
     "Ordem social: base e objetivos da ordem social.",
     "Seguridade social; meio ambiente.",
     "Família, criança, adolescente, idoso, índio."
    ]
   },
   {
    "nome": "Direito Penal e Processual Penal",
    "peso": 2,
    "topicos": [
     "Princípios básicos.",
     "Aplicação da lei penal.",
     "A lei penal no tempo e no espaço.",
     "Tempo e lugar do crime.",
     "Territorialidade e extraterritorialidade da lei penal.",
     "O fato típico e seus elementos.",
     "Crime consumado e tentado.",
     "Ilicitude e causas de exclusão.",
     "Excesso punível.",
     "Crimes contra a pessoa.",
     "Crimes contra o patrimônio.",
     "Crimes contra a fé pública.",
     "Crimes contra a Administração Pública.",
     "Inquérito policial.",
     "Histórico, natureza, conceito, finalidade, características.",
     "Fundamento, titularidade, grau de cognição, valor probatório.",
     "Formas de instauração, notitia criminis.",
     "Delatio criminis, procedimentos investigativos.",
     "Indiciamento, garantias do investigado; conclusão.",
     "Prova.",
     "Preservação de local de crime.",
     "Requisitos e ônus da prova.",
     "Nulidade da prova.",
     "Documentos de prova.",
     "Reconhecimento de pessoas e coisas.",
     "Acareação.",
     "Indícios.",
     "Busca e apreensão.",
     "Restrição de liberdade.",
     "Prisão em flagrante.",
     "Prisão preventiva.",
     "Prisão temporária.",
     "Prisão domiciliar.",
     "Relaxamento e liberdade provisória.",
     "Medidas cautelares diversas da prisão.",
     "A implantação das audiências de custódia."
    ]
   },
   {
    "nome": "Legislação",
    "peso": 1,
    "topicos": [
     "Lei nº 11.343/2006.",
     "Lei nº 13.869/2019.",
     "Lei nº 9.455/1997.",
     "Lei nº 8.069/1990.",
     "Lei nº 10.826/2003.",
     "Lei nº 9.605/1998.",
     "Lei nº 12.037/2009.",
     "Lei nº 7.960/1989.",
     "Lei nº 9.613/1998."
    ]
   },
   {
    "nome": "Estatística",
    "peso": 2,
    "topicos": [
     "Estatística descritiva e análise exploratória de dados: gráficos, diagramas.",
     "Tabelas, medidas descritivas (posição, dispersão, assimetria e curtose).",
     "Probabilidade.",
     "Definições básicas e axiomas.",
     "Probabilidade condicional e independência.",
     "Variáveis aleatórias discretas e contínuas.",
     "Distribuição de probabilidades.",
     "Função de probabilidade.",
     "Função densidade de probabilidade.",
     "Esperança e momentos.",
     "Distribuições especiais.",
     "Distribuições condicionais e independência.",
     "Transformação de variáveis.",
     "Leis dos grandes números.",
     "Teorema central do limite.",
     "Amostras aleatórias.",
     "Distribuições amostrais.",
     "Inferência estatística.",
     "Estimação pontual: métodos de estimação, propriedades dos estimadores, suficiência.",
     "Estimação intervalar: intervalos de confiança, intervalos de credibilidade.",
     "Testes de hipóteses: hipóteses simples e compostas.",
     "Níveis de significância e potência de um teste, testet de Student, teste qui-quadrado.",
     "Análise de regressão linear.",
     "Critérios de mínimos quadrados e de máxima verossimilhança.",
     "Modelos de regressão linear.",
     "Inferência sobre os parâmetros do modelo.",
     "Análise de variância.",
     "Análise de resíduos.",
     "Técnicas de amostragem.",
     "Amostragem aleatória simples, estratificada, sistemática e por conglomerados.",
     "Tamanho amostral.",
     "Estatística descritiva e análise exploratória de dados: gráficos, diagramas.",
     "Tabelas, medidas descritivas (posição, dispersão, assimetria e curtose).",
     "Probabilidade.",
     "Definições básicas e axiomas.",
     "Probabilidade condicional e independência.",
     "Variáveis aleatórias discretas e contínuas.",
     "Distribuição de probabilidades.",
     "Função de probabilidade.",
     "Função densidade de probabilidade.",
     "Esperança e momentos.",
     "Distribuições especiais.",
     "Distribuições condicionais e independência.",
     "Transformação de variáveis.",
     "Leis dos grandes números.",
     "Teorema central do limite.",
     "Amostras aleatórias.",
     "Distribuições amostrais.",
     "Inferência estatística.",
     "Estimação pontual: métodos de estimação, propriedades dos estimadores, suficiência.",
     "Estimação intervalar: intervalos de confiança, intervalos de credibilidade.",
     "Testes de hipóteses: hipóteses simples e compostas.",
     "Níveis de significância e potência de um teste, testet de Student, teste qui-quadrado.",
     "Análise de regressão linear.",
     "Critérios de mínimos quadrados e de máxima verossimilhança.",
     "Modelos de regressão linear.",
     "Inferência sobre os parâmetros do modelo.",
     "Análise de variância.",
     "Análise de resíduos.",
     "Técnicas de amostragem.",
     "Amostragem aleatória simples, estratificada, sistemática e por conglomerados.",
     "Tamanho amostral."
    ]
   },
   {
    "nome": "Contabilidade",
    "peso": 2,
    "topicos": [
     "Conceitos, objetivos e finalidades da contabilidade.",
     "Patrimônio: componentes, equação fundamental do patrimônio.",
     "Situação líquida, representação gráfica.",
     "Atos e fatos administrativos: conceitos, fatos permutativos, modificativos e mistos.",
     "Contas: conceitos, contas de débitos, contas de créditos e saldos.",
     "Plano de contas: conceitos, elenco de contas, função e funcionamento das contas.",
     "Escrituração: conceitos, lançamentos contábeis, elementos essenciais.",
     "Fórmulas de lançamentos, livros de escrituração, métodos e processos.",
     "Regime de competência e regime de caixa.",
     "Contabilização de operações contábeis diversas: juros.",
     "Descontos, tributos, aluguéis.",
     "Variação monetária/cambial.",
     "Folha de pagamento.",
     "Compras, vendas e provisões.",
     "Depreciações e baixa de bens.",
     "Balancete de verificação: conceitos, modelos e técnicas de elaboração.",
     "Balanço patrimonial: conceitos, objetivo, composição.",
     "Demonstração de resultado de exercício: conceito, objetivo, composição.",
     "Lei nº 6.404/1976 legislação complementar e pronunciamentos do Comitê de Pronunciamentos Contábeis (CPC)."
    ]
   },
   {
    "nome": "Informática",
    "peso": 2,
    "topicos": [
     "Conceito de internet e intranet.",
     "Conceitos e modos de utilização de tecnologias, ferramentas, aplicativos e procedimentos associados a internet/intranet.",
     "Ferramentas e aplicativos comerciais de navegação.",
     "De correio eletrônico.",
     "De grupos de discussão.",
     "De busca, de pesquisa e de redes sociais.",
     "Noções de sistema operacional (ambientes Windows e LibreOffice).",
     "Acesso à distância a computadores, transferência de informação e arquivos,",
     "aplicativos de áudio, vídeo e multimídia. Edição de textos, planilhas e apresentações (ambiente Microsoft Office).",
     "Redes de computadores.",
     "Conceitos de proteção e segurança.",
     "Noções de vírus, worms e pragas virtuais.",
     "Aplicativos para segurança (antivírus, firewall, anti-spyware etc.).",
     "Redes de comunicação.",
     "Introdução a redes (computação/telecomunicações).",
     "Noções básicas de transmissão de dados.",
     "Tipos de enlace, códigos, modos e meios de transmissão.",
     "Metadados de arquivos."
    ]
   },
   {
    "nome": "Medicina Legal",
    "peso": 1,
    "topicos": [
     "Perícia médico-legal: perícias médico- legais, perícia, peritos.",
     "Documentos legais: conteúdo e importância.",
     "Traumatologia forense.",
     "Energia de ordem física.",
     "Energia de ordem mecânica.",
     "Lesões corporais: leve, grave e gravíssima e seguida de morte.",
     "Tanatologia forense: causas jurídicas da morte, diagnóstico de realidade da morte.",
     "Sexologia forense.",
     "Imputabilidade penal."
    ]
   },
   {
    "nome": "Arquivologia (somente Escrivão)",
    "peso": 2,
    "topicos": [
     "Arquivística.",
     "Princípios e conceitos.",
     "Políticas públicas de arquivo, legislação arquivística.",
     "Normas nacionais e internacionais de arquivo.",
     "Sistemas e redes de arquivo.",
     "Gestão de documentos; implementação de programas de gestão de documentos.",
     "Diagnóstico da situação arquivística e realidade arquivística brasileira.",
     "Protocolo.",
     "Recebimento, registro, distribuição, tramitação e expedição de documentos.",
     "Funções arquivísticas.",
     "Criação de documentos.",
     "Aquisição de documentos.",
     "Classificação de documentos.",
     "Avaliação de documentos.",
     "Difusão de documentos.",
     "Descrição de documentos.",
     "Preservação de documentos.",
     "Análise tipológica dos documentos de arquivo.",
     "Políticas de acesso aos documentos de arquivo.",
     "Sistemas informatizados de gestão arquivística de documentos.",
     "Documentos digitais.",
     "Requisitos.",
     "Metadados.",
     "Microfilmagem de documentos de arquivo."
    ]
   }
  ]
 },
 {
  "id": "pf-adm-cespe",
  "orgao": "Polícia Federal",
  "cargo": "Agente Administrativo",
  "banca": "Cebraspe",
  "nivel": "Ensino Médio",
  "metodo": "Certo/Errado",
  "questoes": "120",
  "ano": 2013,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos.",
     "Tipologia textual.",
     "Ortografia oficial.",
     "Acentuação gráfica.",
     "Emprego das classes de palavras.",
     "Emprego/correlação de tempos e modos verbais 7 Emprego do sinal indicativo de crase.",
     "Sintaxe da oração e do período.",
     "Pontuação.",
     "Concordância nominal e verbal.",
     "Regência nominal e verbal.",
     "Significação das palavras.",
     "Redação de Correspondências Oficiais (Manual de Redação da Presidência da República).",
     "1 Adequação da linguagem ao tipo de documento.",
     "2 Adequação do formato do texto ao gênero."
    ]
   },
   {
    "nome": "Noções de Informática",
    "peso": 2,
    "topicos": [
     "Noções de sistema operacional (ambientes Linux e Windows).",
     "Edição de textos, planilhas e apresentações (ambientes Microsoft Office e BrOffice).",
     "Redes de computadores.",
     "1 Conceitos básicos, ferramentas, aplicativos e procedimentos de Internet e intranet.",
     "2 Programas de navegação (Microsoft Internet Explorer, Mozilla Firefox, Google Chrome e similares).",
     "3 Programas de correio eletrônico (Outlook Express, Mozilla Thunderbird e similares).",
     "4 Sítios de busca e pesquisa na Internet.",
     "5 Grupos de discussão.",
     "6 Redes sociais.",
     "7 Computação na nuvem (cloud computing).",
     "Conceitos de organização e de gerenciamento de informações, arquivos,",
     "pastas e programas. 5 Segurança da informação.",
     "1 Procedimentos de segurança.",
     "2 Noções de vírus, worms e pragas virtuais.",
     "3 Aplicativos para segurança (antivírus, firewall, anti-spyware etc.).",
     "4 Procedimentos de backup.",
     "5 Armazenamento de dados na nuvem (cloud storage)."
    ]
   },
   {
    "nome": "Raciocínio Lógico",
    "peso": 1,
    "topicos": [
     "Estruturas lógicas.",
     "Lógica de argumentação: analogias, inferências, deduções e conclusões.",
     "Lógica sentencial (ou proposicional).",
     "1 Proposições simples e compostas.",
     "2 Tabelasverdade.",
     "3 Equivalências.",
     "4 Leis de De Morgan.",
     "5 Diagramas lógicos.4 Lógica de primeira",
     "ordem. 5 Princípios de contagem e probabilidade.",
     "Operações com conjuntos.",
     "Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais."
    ]
   },
   {
    "nome": "Atualidades",
    "peso": 1,
    "topicos": [
     "Tópicos relevantes e atuais de diversas áreas, tais como segurança, transportes, política, economia, sociedade, educação, saúde, cultura, tecnologia, energia, relações internacionais, desenvolvimento sustentável e ecologia."
    ]
   },
   {
    "nome": "Noções de Direito Administrativo",
    "peso": 2,
    "topicos": [
     "Noções de organização administrativa.",
     "1 Centralização, descentralização, concentração e desconcentração.",
     "2 Administração direta e indireta.",
     "3 Autarquias, fundações, empresas",
     "públicas e sociedades de economia mista. 2 Ato administrativo.",
     "1 Conceito, requisitos, atributos, classificação e espécies.",
     "Agentes públicos.",
     "1 Legislação pertinente.",
     "1.1 Lei nº 8.112/1990.",
     "1.2 Disposições constitucionais aplicáveis.",
     "2 Disposições doutrinárias.",
     "2.1 Conceito.",
     "2.2 Espécies.",
     "2.3 Cargo, emprego e função pública.",
     "Poderes administrativos.",
     "1 Hierárquico, disciplinar, regulamentar e de polícia.",
     "2 Uso e abuso do poder.",
     "Licitação.",
     "1 Princípios.",
     "2 Contratação direta: dispensa e inexigibilidade.",
     "3 Modalidades.",
     "4 Tipos.",
     "5 Procedimento.",
     "Controle da administração pública.",
     "1 Controle exercido pela administração pública.",
     "2 Controle judicial.",
     "3 Controle legislativo.",
     "Responsabilidade civil do Estado.",
     "1 Responsabilidade civil do Estado no direito brasileiro.",
     "1.1 Responsabilidade por ato comissivo do Estado.",
     "1.2 Responsabilidade por omissão do Estado.",
     "2 Requisitos para a demonstração da responsabilidade do Estado.",
     "3 Causas excludentes e atenuantes da responsabilidade do Estado.",
     "Regime jurídico-administrativo.",
     "1 Conceito.",
     "2 Princípios expressos e implícitos da administração pública.",
     "Decreto nº 1.171/ 1994 (Código de Ética",
     "Profissional do Servidor Público Civil do Poder Executivo Federal). 10 Resoluções 1 a 10 da Comissão de Ética Pública da Presidência da República."
    ]
   },
   {
    "nome": "Noções de Direito Constitucional",
    "peso": 2,
    "topicos": [
     "Constituição Federal.",
     "1 Conceito, classificações, princípios fundamentais.",
     "2 Capítulo III Segurança Pública: artigo 144.",
     "Direitos e garantias fundamentais.",
     "1 Direitos e deveres individuais e coletivos, direitos sociais, nacionalidade, cidadania, direitos políticos, partidos políticos.",
     "Organização político-administrativa.",
     "1 União, estados, Distrito Federal, municípios e territórios.",
     "Administração pública.",
     "1 Disposições gerais, servidores públicos.",
     "Poder executivo.",
     "1 atribuições do presidente da República e dos ministros de Estado.",
     "Constituição Federal."
    ]
   },
   {
    "nome": "Noções de Administração Pública",
    "peso": 1,
    "topicos": [
     "Características básicas das organizações formais modernas: tipos de estrutura organizacional, natureza, finalidades e critérios de departamentalização.",
     "Organização administrativa: centralização, descentralização, concentração e desconcentração; organização administrativa da União; administração direta e indireta.",
     "Gestão de processos.",
     "Gestão de contratos.",
     "Noções de processos licitatórios."
    ]
   },
   {
    "nome": "Noções de Administração Financeira e Orçamentária",
    "peso": 2,
    "topicos": [
     "Orçamento público.",
     "1 Conceito.",
     "2 Técnicas Orçamentárias.",
     "3 Princípios orçamentários.",
     "4 Ciclo Orçamentário.",
     "O orçamento público no Brasil.",
     "1 Plano Plurianual na Constituição Federal.",
     "2 Diretrizes orçamentárias na Constituição Federal.",
     "3 Orçamento anual na Constituição Federal.",
     "4 Estrutura programática.",
     "5 Créditos ordinários e adicionais.",
     "Programação e execução orçamentária e financeira.",
     "1 Descentralização orçamentária e financeira.",
     "2 Acompanhamento da execução.",
     "Receita pública.",
     "1 Conceito.",
     "2 Classificação segundo a natureza.",
     "1 Etapas e estágios.",
     "Despesa pública.",
     "1 Conceito.",
     "2 Classificação segundo a natureza.",
     "3 Etapas e estágios.",
     "4 Restos a pagar.",
     "5 Despesas de exercícios anteriores.",
     "Lei de Responsabilidade Fiscal.",
     "1 Conceitos e objetivos.",
     "2 Planejamento."
    ]
   },
   {
    "nome": "Noções de Gestão de Pessoas nas Organizações",
    "peso": 1,
    "topicos": [
     "Conceitos, importância, relação com os outros sistemas de organização.",
     "A função do órgão de Gestão de Pessoas: atribuições básicas e objetivos, políticas e sistemas de informações gerenciais.",
     "Comportamento organizacional: relações indivíduo/organização, motivação, liderança, desempenho.",
     "Conceitos, importância, relação com os outros sistemas de organização."
    ]
   },
   {
    "nome": "Noções de Administração de Recursos Materiais",
    "peso": 2,
    "topicos": [
     "Classificação de materiais.",
     "1 Tipos de classificação.",
     "Gestão de estoques.",
     "Compras.",
     "1 Modalidades de compra.",
     "2 Cadastro de fornecedores.",
     "Compras no setor público.",
     "1 Edital de licitação.",
     "Recebimento e armazenagem.",
     "1 Entrada.",
     "2 Conferência.",
     "3 Critérios e técnicas de armazenagem.",
     "Gestão patrimonial.",
     "1 Controle de bens.",
     "2 Inventário.",
     "3 Alterações e baixa de bens."
    ]
   },
   {
    "nome": "Noções de Arquivologia",
    "peso": 1,
    "topicos": [
     "Conceitos fundamentais de arquivologia.",
     "O gerenciamento da informação e a gestão de documentos.",
     "1 diagnósticos.",
     "2 Arquivos correntes e intermediário.",
     "3 Protocolos.",
     "4 Avaliação de documentos.",
     "5 Arquivos permanentes.",
     "Tipologias documentais e suportes físicos.",
     "1 Microfilmagem.",
     "2 Automação.",
     "3 Preservação, conservação e restauração de documentos."
    ]
   },
   {
    "nome": "Legislação Aplicada à Polícia Federal",
    "peso": 1,
    "topicos": [
     "Lei nº 7.102/1983: dispõe sobre segurança para estabelecimentos financeiros, estabelece normas para constituição e funcionamento das empresas particulares",
     "que exploram serviços de vigilância e de transporte de valores, e dá outras providências. 2 Lei nº 10.357/2001: estabelece normas de controle e fiscalização sobre produtos químicos que direta ou indiretamente possam ser destinados à elaboração ilícita de substâncias entorpecentes, psicotrópicas ou que determinem dependência física ou psíquica, e dá outras providências.",
     "Lei nº 6.815/1980: define a situação jurídica do estrangeiro no Brasil, cria o Conselho Nacional de Imigração.",
     "Lei nº 10.826/2003: Estatuto do Desarmamento.",
     "Lei nº 12.830/2013: dispõe sobre a investigação criminal conduzida pelo delegado de polícia."
    ]
   }
  ]
 },
 {
  "id": "pf-agente-cebraspe",
  "orgao": "Polícia Federal",
  "cargo": "Agente de Polícia Federal",
  "banca": "Cebraspe",
  "nivel": "Ensino Superior",
  "metodo": "Certo/Errado",
  "questoes": "120 +Redação",
  "ano": 2021,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos de gêneros variados.",
     "Reconhecimento de tipos e gêneros textuais.",
     "Domínio da ortografia oficial.",
     "Domínio dos mecanismos de coesão textual.",
     "1 Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.",
     "2 Emprego de tempos e modos verbais.",
     "Domínio da estrutura morfossintática do período.",
     "1 Emprego das classes de palavras.",
     "2 Relações de coordenação entre orações e entre termos da oração.",
     "3 Relações de subordinação entre orações e entre termos da oração.",
     "4 Emprego dos sinais de pontuação.",
     "5 Concordância verbal e nominal.",
     "6 Regência verbal e nominal.",
     "7 Emprego do sinal indicativo de crase.",
     "8 Colocação dos pronomes átonos.",
     "Reescrita de frases e parágrafos do texto.",
     "1 Significação das palavras.",
     "2 Substituição de palavras ou de trechos de texto.",
     "3 Reorganização da estrutura de orações e de períodos do texto.",
     "4 Reescrita de textos de diferentes gêneros e níveis de formalidade.",
     "Correspondência oficial (conforme Manual de Redação da Presidência da República).",
     "1 Aspectos gerais da redação oficial.",
     "2 Finalidade dos expedientes oficiais.",
     "3 Adequação da linguagem ao tipo de documento.",
     "4 Adequação do formato do texto ao gênero."
    ]
   },
   {
    "nome": "Noções de Direito Administrativo",
    "peso": 2,
    "topicos": [
     "Noções de organização administrativa.",
     "1 Centralização, descentralização, concentração e desconcentração.",
     "2 Administração direta e indireta.",
     "3 Autarquias, fundações, empresas públicas e sociedades de economia mista.",
     "Ato administrativo.",
     "1 Conceito, requisitos, atributos, classificação e espécies.",
     "Agentes públicos.",
     "1 Legislação pertinente.",
     "1.1 Lei nº 8.112/1990 e suas alterações.",
     "1.2 Disposições constitucionais aplicáveis.",
     "2 Disposições doutrinárias.",
     "2.1 Conceito.",
     "2.2 Espécies.",
     "2.3 Cargo, emprego e função pública.",
     "Poderes administrativos.",
     "1 Hierárquico, disciplinar, regulamentar e de polícia.",
     "2 Uso e abuso do poder.",
     "Licitação.",
     "1 Princípios.",
     "2 Contratação direta: dispensa e inexigibilidade.",
     "3 Modalidades.",
     "4 Tipos.",
     "5 Procedimento.",
     "Controle da Administração Pública.",
     "1 Controle exercido pela Administração Pública.",
     "2 Controle judicial.",
     "3 Controle legislativo.",
     "Responsabilidade civil do Estado.",
     "1 Responsabilidade civil do Estado no direito brasileiro.",
     "1.1 Responsabilidade por ato comissivo do Estado.",
     "1.2 Responsabilidade por omissão do Estado.",
     "2 Requisitos para a demonstração da responsabilidade do Estado.",
     "3 Causas excludentes e atenuantes da responsabilidade do Estado.",
     "Regime jurídico-administrativo.",
     "1 Conceito.",
     "2 Princípios expressos e implícitos da Administração Pública."
    ]
   },
   {
    "nome": "Noções de Direito Constitucional",
    "peso": 1,
    "topicos": [
     "Direitos e garantias fundamentais: direitos e deveres individuais e coletivos; direito à vida, à liberdade, à igualdade, à segurança e à propriedade; direitos sociais; nacionalidade; cidadania e direitos políticos; partidos políticos; garantias constitucionais individuais; garantias dos direitos coletivos, sociais e políticos.",
     "Poder Executivo: forma e sistema de governo; chefia de Estado e chefia de governo.",
     "Defesa do Estado e das instituições democráticas: segurança pública; organização da segurança pública.",
     "Ordem social: base e objetivos da ordem",
     "social; seguridade social; meio ambiente; família, criança, adolescente, idoso, índio."
    ]
   },
   {
    "nome": "Noções de Direito Penal e de Direito Processual Penal",
    "peso": 2,
    "topicos": [
     "Princípios básicos.",
     "Aplicação da lei penal.",
     "1 A lei penal no tempo e no espaço.",
     "2 Tempo e lugar do crime.",
     "3 Territorialidade e extraterritorialidade da lei penal.",
     "O fato típico e seus elementos.",
     "1 Crime consumado e tentado.",
     "2 Ilicitude e causas de exclusão.",
     "3 Excesso punível.",
     "Crimes contra a pessoa.",
     "Crimes contra o patrimônio.",
     "Crimes contra a fé pública.",
     "Crimes contra a Administração Pública.",
     "Inquérito policial.",
     "1 Histórico, natureza, conceito, finalidade,",
     "características, fundamento, titularidade, grau de cognição, valor probatório, formas de instauração, notitia criminis, delatio criminis, procedimentos investigativos, indiciamento, garantias do investigado; conclusão. 9 Prova.",
     "1 Preservação de local de crime.",
     "2 Requisitos e ônus da prova.",
     "3 Nulidade da prova.",
     "4 Documentos de prova.",
     "5 Reconhecimento de pessoas e coisas.",
     "6 Acareação.",
     "7 Indícios.",
     "8 Busca e apreensão.",
     "Restrição de liberdade.",
     "1 Prisão em flagrante."
    ]
   },
   {
    "nome": "Legislação Especial",
    "peso": 1,
    "topicos": [
     "Lei nº 7.102/1983 e suas alterações.",
     "Lei nº 10.357/2001.",
     "Lei nº 13.445/2017.",
     "Lei nº 11.343/2006 e suas alterações (aspectos penais e processuais penais).",
     "Lei nº 13.868/2019 e suas alterações (aspectos penais e processuais penais).",
     "Lei nº 9.455/1997 e suas alterações (aspectos penais e processuais penais).",
     "Lei nº 8.069/1990 e suas alterações (aspectos penais e processuais penais).",
     "Lei nº 10.826/2003 e suas alterações (aspectos penais e processuais penais).",
     "Lei nº 9.605/1998 e suas alterações (aspectos penais e processuais penais).",
     "Lei nº 10.446/2002 e suas alterações."
    ]
   },
   {
    "nome": "Estatística",
    "peso": 2,
    "topicos": [
     "Estatística descritiva e análise exploratória de dados: gráficos, diagramas, tabelas, medidas descritivas (posição, dispersão, assimetria e curtose).",
     "Probabilidade.",
     "1 Definições básicas e axiomas.",
     "2 Probabilidade condicional e independência.",
     "3 Variáveis aleatórias discretas e contínuas.",
     "4 Distribuição de probabilidades.",
     "5 Função de probabilidade.",
     "6 Função densidade de probabilidade.",
     "7 Esperança e momentos.",
     "8 Distribuições especiais.",
     "9 Distribuições condicionais e independência.",
     "10 Transformação de variáveis.",
     "11 Leis dos grandes números.",
     "12 Teorema central do limite.",
     "13 Amostras aleatórias.",
     "14 Distribuições amostrais.",
     "Inferência estatística.",
     "1 Estimação pontual: métodos de estimação, propriedades dos estimadores, suficiência.",
     "2 Estimação intervalar: intervalos de confiança, intervalos de credibilidade.",
     "3 Testes de hipóteses: hipóteses simples e compostas, níveis de significância e potência de um teste, teste t de Student, teste qui-quadrado.",
     "Análise de regressão linear.",
     "1 Critérios de mínimos quadrados e de máxima verossimilhança.",
     "2 Modelos de regressão linear.",
     "Inferência sobre os parâmetros do modelo. 4.4 Análise de variância. 4.5 Análise de resíduos. 5 Técnicas de amostragem: amostragem aleatória simples, estratificada, sistemática e por conglomerados. 5.1 Tamanho amostral."
    ]
   },
   {
    "nome": "Raciocínio Lógico",
    "peso": 2,
    "topicos": [
     "Estruturas lógicas.",
     "Lógica de argumentação: analogias, inferências, deduções e conclusões.",
     "Lógica sentencial (ou proposicional).",
     "1 Proposições simples e compostas.",
     "2 Tabelas-verdade.",
     "3 Equivalências.",
     "4 Leis de Morgan.",
     "5 Diagramas lógicos.",
     "Lógica de primeira ordem.",
     "Princípios de contagem e probabilidade.",
     "Operações com conjuntos.",
     "Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais."
    ]
   },
   {
    "nome": "Informática",
    "peso": 2,
    "topicos": [
     "Conceito de internet e intranet.",
     "Conceitos e modos de utilização de tecnologias, ferramentas, aplicativos e procedimentos associados a internet/intranet.",
     "1 Ferramentas e aplicativos comerciais de",
     "navegação, de correio eletrônico, de grupos de discussão, de busca, de pesquisa e de redes sociais. 2.2 Noções de sistema operacional (ambiente Linux e Windows).",
     "3 Acesso à distância a computadores, transferência de informação e arquivos, aplicativos de áudio, vídeo e multimídia.",
     "4 Edição de textos, planilhas e apresentações (ambientes Microsoft Office e LibreOffice).",
     "Redes de computadores.",
     "Conceitos de proteção e segurança.",
     "1 Noções de vírus, worms e pragas virtuais.",
     "2 Aplicativos para segurança (antivírus, firewall, anti-spyware etc.).",
     "Computação na nuvem (cloud computing).",
     "Fundamentos da Teoria Geral de Sistemas.",
     "Sistemas de informação.",
     "1 Fases e etapas de sistema de",
     "informação. 8 Teoria da informação.",
     "1 Conceitos de informação, dados, representação de dados, de conhecimentos, segurança e inteligência.",
     "Banco de dados.",
     "1 Base de dados, documentação e prototipação.",
     "2 Modelagem conceitual: abstração, modelo entidaderelacionamento, análise funcional e administração de dados.",
     "3 Dados estruturados e não estruturados.",
     "4 Banco de dados relacionais: conceitos básicos e características.",
     "5 Chaves e relacionamentos.",
     "6 Noções de mineração de dados: conceituação e características.",
     "7 Noções de aprendizado de máquina.",
     "8 Noções de bigdata: conceito, premissas e aplicação.",
     "Redes de comunicação.",
     "1 Introdução a redes",
     "(computação/telecomunicações). 10.2 Camada física, de enlace de dados e subcamada de acesso ao meio.",
     "3 Noções básicas de transmissão de dados: tipos de enlace, códigos, modos e meios de transmissão.",
     "Redes de computadores: locais, metropolitanas e de longa distância.",
     "1 Terminologia e aplicações, topologias, modelos de arquitetura (OSI/ISO e TCP/IP) e protocolos.",
     "2 Interconexão de redes, nível de transporte.",
     "Noções de programação Python e R.",
     "API (application programming interface).",
     "Metadados de arquivos."
    ]
   },
   {
    "nome": "Contabilidade Geral",
    "peso": 2,
    "topicos": [
     "Conceitos, objetivos e finalidades da contabilidade.",
     "Patrimônio: componentes, equação",
     "fundamental do patrimônio, situação líquida, representação gráfica. 3 Atos e fatos administrativos: conceitos, fatos permutativos, modificativos e mistos.",
     "Contas: conceitos, contas de débitos, contas de créditos e saldos.",
     "Plano de contas: conceitos, elenco de contas, função e funcionamento das contas.",
     "Escrituração: conceitos, lançamentos contábeis, elementos essenciais, fórmulas de lançamentos, livros de escrituração, métodos e processos, regime de competência e regime de caixa.",
     "Contabilização de operações contábeis diversas: juros, descontos, tributos, aluguéis, variação monetária/ cambial, folha de pagamento, compras, vendas e provisões, depreciações e baixa de bens.",
     "Balancete de verificação: conceitos, modelos e técnicas de elaboração.",
     "Balanço patrimonial: conceitos, objetivo, composição.",
     "Demonstração de resultado de exercício: conceito, objetivo, composição.",
     "Lei nº 6.404/1976 e suas alterações, legislação complementar e pronunciamentos do Comitê de Pronunciamentos Contábeis (CPC).",
     "Norma Brasileira de Contabilidade - NBC TSP Estrutura Conceitual, de 23 de setembro de 2016."
    ]
   }
  ]
 },
 {
  "id": "prf-policial-cebraspe",
  "orgao": "PRF",
  "cargo": "Policial Rodoviário Federal",
  "banca": "Cebraspe",
  "nivel": "Ensino Superior",
  "metodo": "Certo/Errado",
  "questoes": "120 + redação",
  "ano": 2021,
  "disciplinas": [
   {
    "nome": "Língua Portuguesa",
    "peso": 2,
    "topicos": [
     "Compreensão e interpretação de textos de gêneros variados.",
     "Reconhecimento de tipos e gêneros textuais.",
     "Domínio da ortografia oficial.",
     "Domínio dos mecanismos de coesão textual.",
     "1 Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual.",
     "2 Emprego de tempos e modos verbais.",
     "Domínio da estrutura morfossintática do período.",
     "1 Emprego das classes de palavras.",
     "2 Relações de coordenação entre orações e entre termos da oração.",
     "3 Relações de subordinação entre orações e entre termos da oração.",
     "4 Emprego dos sinais de pontuação.",
     "5 Concordância verbal e nominal.",
     "6 Regência verbal e nominal.",
     "7 Emprego do sinal indicativo de crase.",
     "8 Colocação dos pronomes átonos.",
     "Reescrita de frases e parágrafos do texto.",
     "1 Significação das palavras.",
     "2 Substituição de palavras ou de trechos de texto.",
     "3 Reorganização da estrutura de orações e de períodos do texto.",
     "4 Reescrita de textos de diferentes gêneros e níveis de formalidade.",
     "Correspondência oficial (conforme Manual de Redação da Presidência da República).",
     "1 Aspectos gerais da redação oficial.",
     "2 Finalidade dos expedientes oficiais.",
     "3 Adequação da linguagem ao tipo de documento.",
     "4 Adequação do formato do texto ao gênero."
    ]
   },
   {
    "nome": "Raciocínio Lógico-Matemático",
    "peso": 2,
    "topicos": [
     "Modelagem de situações-problema por meio de equações do 1º e 2º graus e sistemas lineares.",
     "Noção de função.",
     "1 Análise gráfica.",
     "2 Funções afim, quadrática, exponencial e logarítmica.",
     "3 Aplicações.",
     "Taxas de variação de grandezas.",
     "1 Razão e proporção com aplicações.",
     "2 Regra de três simples e composta.",
     "Porcentagem.",
     "Regularidades e padrões em sequências.",
     "1 Sequências numéricas.",
     "2 Progressão aritmética e progressão geométrica.",
     "Noções básicas de contagem, probabilidade e estatística.",
     "Descrição e análise de dados.",
     "1 Leitura e interpretação de tabelas e gráficos apresentados em diferentes linguagens e representações.",
     "2 Cálculo de médias e análise de desvios de conjuntos de dados.",
     "Noções básicas de teoria dos conjuntos.",
     "Análise e interpretação de diferentes representações de figuras planas, como desenhos, mapas e plantas.",
     "1 Utilização de escalas.",
     "2 Visualização de figuras espaciais em diferentes posições.",
     "3 Representações bidimensionais de projeções, planificações e cortes.",
     "Métrica.",
     "1 Áreas e volumes.",
     "2 Estimativas.",
     "3 Aplicações."
    ]
   },
   {
    "nome": "Informática",
    "peso": 2,
    "topicos": [
     "Conceito de internet e intranet.",
     "Conceitos e modos de utilização de tecnologias, ferramentas, aplicativos e procedimentos associados a",
     "internet/intranet. 2.1 Ferramentas e aplicativos comerciais de navegação, de correio eletrônico, de grupos de discussão, de busca, de pesquisa, de redes sociais e ferramentas colaborativas.",
     "2 Noções de sistema operacional (ambiente Windows).",
     "3 Acesso a distância a computadores, transferência de informação e arquivos, aplicativos de áudio, vídeo e multimídia.",
     "Transformação digital.",
     "1 Internet das coisas (IoT).",
     "2 Big data.",
     "3 Inteligência artificial.",
     "Conceitos de proteção e segurança.",
     "1 Noções de vírus, worms, phishing e pragas virtuais.",
     "2 Aplicativos para segurança (antivírus, firewall, anti-spyware, VPN, etc.).",
     "Computação na nuvem (cloud computing)."
    ]
   },
   {
    "nome": "Física",
    "peso": 1,
    "topicos": [
     "Cinemática escalar, cinemática vetorial.",
     "Movimento circular.",
     "Leis de Newton e suas aplicações.",
     "Trabalho.",
     "Potência.",
     "Energia cinética, energia potencial, atrito.",
     "Conservação de energia e suas transformações.",
     "Quantidade de movimento e conservação da quantidade de movimento, impulso.",
     "Colisões."
    ]
   },
   {
    "nome": "Ética e Cidadania",
    "peso": 2,
    "topicos": [
     "Ética e moral.",
     "Ética, princípios e valores.",
     "Ética e função pública: integridade.",
     "Ética no setor público.",
     "1 Princípios da Administração Pública: moralidade (art.37 da CF).",
     "2 Deveres dos servidores públicos: moralidade administrativa (Lei nº 8.112, de",
     ", art.116, IX). 4.3 Política de governança da administração pública federal (Decreto nº 9.203, de 2017).",
     "4 Promoção da ética e de regras de conduta para servidores.",
     "4.1 Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal (Decreto nº 1.171, de 1994).",
     "4.2 Sistema de Gestão da Ética do Poder Executivo Federal e Comissões de Ética (Decreto nº 6.029, de 2007).",
     "4.3 Código de Conduta da Alta Administração Federal (Exposição de Motivos nº 37, de 2000).",
     "Ética e democracia: exercício da cidadania.",
     "1 Promoção da transparência ativa e do acesso à informação (Lei nº 12.527, de 2011 e Decreto nº 7.724, de 2012).",
     "2 Tratamento de conflitos de interesses e nepotismo (Lei nº 12.813, de 2013 e Decreto nº 7.203, de 2010)."
    ]
   },
   {
    "nome": "Geopolítica",
    "peso": 1,
    "topicos": [
     "O Brasil político: nação e território.",
     "Organização do Estado Brasileiro.",
     "A divisão inter-regional do trabalho e da produção no Brasil.",
     "A estrutura urbana brasileira e as grandes metrópoles.",
     "Distribuição espacial da população no Brasil e movimentos migratórios internos.",
     "Integração entre indústria e estrutura urbana e setor agrícola no Brasil.",
     "Rede de transporte no Brasil: modais e principais infraestruturas 8 A integração do Brasil ao processo de internacionalização da economia.",
     "Geografia e gestão ambiental.",
     "Macrodivisão natural do espaço brasileiro: biomas, domínios e ecossistemas."
    ]
   },
   {
    "nome": "Língua Inglesa",
    "peso": 1,
    "topicos": [
     "Compreensão de texto escrito em língua inglesa.",
     "Itens gramaticais relevantes para a compreensão dos conteúdos semânticos."
    ]
   },
   {
    "nome": "Língua Espanhola",
    "peso": 1,
    "topicos": [
     "Compreensão de texto escrito em língua inglesa.",
     "Itens gramaticais relevantes para a compreensão dos conteúdos semânticos."
    ]
   },
   {
    "nome": "Legislação de Trânsito",
    "peso": 1,
    "topicos": [
     "Lei nº 9.503, de 1997 (Código de Trânsito Brasileiro) e suas alterações, inclusive as da Lei nº 14.071, de 2020.",
     "Lei nº 5.970, de 1973.",
     "Resoluções do Conselho Nacional de Trânsito (CONTRAN) e suas alterações: 04, de 1998; 14, de 1998; 24, de 1998; 36, de 1998; 92, de 1998,",
     "exceto os anexos; 110, de 2000; 160, de 2004; 210, de 2011; 211, de 2006; 216, de 2006; 227, de 2007, exceto os anexos; 253, de 2007; 254, de 2007; 268, de 2008; 290, de 2008; 292, de 2008; 349, de 2010; 360, de 2010; 432, de 2013; 441, de 2013; 453, de 2013; 471, de 2013; 508, de 2014; 520, de 2015; 525, de 2015; 552, de 2015, exceto os anexos; 561, de 2015, exceto as fichas; 619, de 2016; 667, de 2017, exceto os anexos; 723, de 2018; 735, de 2018, exceto os anexos; 740, de 2018; 780, de 2019; 789, de 2020, Anexo I; 798, de 2020; 803, de 2020; 806, de 2020; 809, de 2020; 810, de 2020."
    ]
   },
   {
    "nome": "Direito Administrativo",
    "peso": 2,
    "topicos": [
     "Noções de organização administrativa.",
     "1 Centralização, descentralização, concentração e desconcentração.",
     "2 Administração direta e indireta.",
     "3 Autarquias, fundações, empresas públicas e sociedades de economia mista.",
     "Ato administrativo.",
     "1 Conceito, requisitos, atributos, classificação e espécies.",
     "Agentes públicos.",
     "1 Legislação pertinente.",
     "1.1 Lei nº 8.112, de 1990 e suas alterações.",
     "1.2 Disposições constitucionais aplicáveis.",
     "2 Disposições doutrinárias.",
     "2.1 Conceito.",
     "2.2 Espécies.",
     "2.3 Cargo, emprego e função pública.",
     "3 Carreira de policial rodoviário federal.",
     "3.1 Lei nº 9.654, de 1998 e suas alterações (carreira de PRF).",
     "3.2 Lei nº 12.855, de 2013 (indenização fronteiras).",
     "3.3 Lei nº 13.712, de 2018 (indenização PRF).",
     "3.4 Decreto nº 8.282, de 2014 (carreira de PRF).",
     "Poderes administrativos.",
     "1 Hierárquico, disciplinar, regulamentar e de polícia.",
     "2 Uso e abuso do poder.",
     "Licitação.",
     "1 Princípios.",
     "2 Contratação direta: dispensa e inexigibilidade.",
     "3 Modalidades.",
     "4 Tipos.",
     "5 Procedimento.",
     "Controle da Administração Pública.",
     "1 Controle exercido pela Administração Pública.",
     "2 Controle judicial.",
     "3 Controle legislativo.",
     "Responsabilidade civil do Estado.",
     "1 Responsabilidade civil do Estado no direito brasileiro.",
     "1.1 Responsabilidade por ato comissivo do Estado.",
     "1.2 Responsabilidade por omissão do Estado.",
     "2 Requisitos para a demonstração da responsabilidade do Estado.",
     "3 Causas excludentes e atenuantes da responsabilidade do Estado.",
     "Regime jurídico-administrativo.",
     "1 Conceito.",
     "2 Princípios expressos e implícitos da Administração Pública."
    ]
   },
   {
    "nome": "Direito Constitucional",
    "peso": 2,
    "topicos": [
     "Poder constituinte.",
     "1 Fundamentos do poder constituinte.",
     "2 Poder constituinte originário e derivado.",
     "3 Reforma e revisão constitucionais.",
     "4 Limitação do poder de revisão.",
     "5 Emendas à Constituição.",
     "Fundamentos constitucionais dos direitos e deveres fundamentais.",
     "1 Direitos e deveres individuais e coletivos.",
     "2 Direito à vida, à liberdade, à igualdade, à segurança e à propriedade.",
     "3 Direitos sociais, nacionalidade,",
     "cidadania e direitos políticos. 2.4 Garantias constitucionais individuais.",
     "5 Garantias dos direitos coletivos, sociais e políticos.",
     "6 Remédios constitucionais.",
     "Poder Executivo.",
     "1 Forma e sistema de governo.",
     "2 Chefia de Estado e chefia de governo.",
     "3 Atribuições e responsabilidades do presidente da República.",
     "4 Da União: bens e competências (arts.20 a 24 da CF).",
     "Defesa do Estado e das instituições democráticas.",
     "1 Forças Armadas (art.142, CF).",
     "2 Segurança pública (art.144 da CF).",
     "3 Organização da segurança pública.",
     "4 Atribuições constitucionais da Polícia Rodoviária Federal.",
     "Ordem social.",
     "1 Base e objetivos da ordem social.",
     "2 Seguridade social.",
     "3 Meio ambiente.",
     "4 Família, criança, adolescente, idoso, índio."
    ]
   },
   {
    "nome": "Direito Penal",
    "peso": 2,
    "topicos": [
     "Princípios básicos.",
     "Aplicação da lei penal.",
     "2 Lei penal no tempo.",
     "2.1 Tempo do crime.",
     "2.2 Conflito de leis penais no tempo.",
     "3 Lei penal no espaço.",
     "3.1 Lugar do crime.",
     "3.2 Territorialidade.",
     "3.3 Extraterritorialidade.",
     "Tipicidade.",
     "1 Crime doloso e crime culposo.",
     "2 Erro de tipo.",
     "3 Crime consumado e tentado.",
     "4 Crime impossível.",
     "5 Punibilidade e causas de extinção.",
     "Ilicitude.",
     "1 Causas de exclusão da ilicitude.",
     "2 Excesso punível.",
     "Culpabilidade.",
     "1 Causas de exclusão da culpabilidade.",
     "2 Imputabilidade.",
     "3 Erro de proibição.",
     "Crimes.",
     "Crimes contra a pessoa. 6.2 Crimes contra o patrimônio. 6.3 Crimes contra a dignidade sexual. 6.4 Crimes contra a incolumidade pública. 6.5 Crimes contra a fé pública. 6.6 Crimes contra a Administração Pública."
    ]
   },
   {
    "nome": "Direito Processual Penal",
    "peso": 2,
    "topicos": [
     "Ação penal.",
     "1 Conceito.",
     "2 Características.",
     "3 Espécies.",
     "4 Condições.",
     "Termo Circunstanciado de Ocorrência (Lei nº 9.099, de 1995).",
     "1 Atos processuais: forma, lugar e tempo.",
     "Prova.",
     "1 Conceito, objeto, classificação.",
     "2 Preservação de local de crime.",
     "3 Requisitos e ônus da prova.",
     "4 Provas ilícitas.",
     "5 Meios de prova: pericial, interrogatório, confissão, perguntas ao ofendido, testemunhas, reconhecimento de pessoas e coisas, acareação, documentos, indícios.",
     "6 Busca e apreensão: pessoal, domiciliar, requisitos, restrições, horários.",
     "Prisão.",
     "1 Conceito, formalidades, espécies e mandado de prisão e cumprimento.",
     "2 Prisão em flagrante.",
     "Identificação Criminal (art. 5º, LVIII, da Constituição Federal e art.3º da Lei nº 12.037, de 2009).",
     "Diligências Investigatórias (art.6º e 13 do CPP)."
    ]
   },
   {
    "nome": "Legislação Especial",
    "peso": 2,
    "topicos": [
     "Lei nº 5.553, de 1968 e Lei nº 12.037, de 2009.",
     "Lei nº 8.069, de 1990 e suas alterações.",
     "Lei nº 8.072, de 1990 e suas alterações.",
     "Decreto nº 1.655, de 1995 e art.",
     "do Decreto nº 9.662, de 2019.",
     "Lei nº 9.099, de 1995 e suas alterações.",
     "Lei nº 9.455, de 1997 e suas alterações.",
     "Lei nº 9.605, de 1998 e suas alterações: Capítulos III e V.",
     "Lei nº 10.826, de 2003 e suas alterações: Capítulo IV.",
     "Lei nº 11.343, de 2006 e suas alterações.",
     "Lei nº 12.850, de 2013 e suas alterações.",
     "Lei nº 13.675, de 2018.",
     "Lei nº 13.869, de 2019."
    ]
   },
   {
    "nome": "Direitos Humanos",
    "peso": 1,
    "topicos": [
     "Direitos humanos na Constituição Federal.",
     "1 A Constituição Federal e os tratados internacionais de direitos humanos.",
     "Declaração Universal dos Direitos Humanos.",
     "Convenção Americana sobre Direitos Humanos (Decreto nº 678, de 1992)."
    ]
   }
  ]
 }
] as ModeloCronograma[];

const semRepetir = (topicos: string[]) => {
  const vistos = new Set<string>();
  return topicos.filter((t) => {
    const k = t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    return !vistos.has(k) && !!vistos.add(k);
  });
};

/** Modelos com os nomes das disciplinas padronizados; nomes que viram o mesmo no mesmo edital são fundidos. */
export const MODELOS_CRONOGRAMA: ModeloCronograma[] = MODELOS_BRUTOS.map((m) => {
  const por = new Map<string, ModeloDisciplina>();
  for (const d of m.disciplinas) {
    const nome = canonicalDiscipline(d.nome);
    const cur = por.get(nome);
    if (cur) {
      cur.topicos = semRepetir([...cur.topicos, ...d.topicos]);
      cur.peso = Math.max(cur.peso, d.peso) as 1 | 2;
    } else por.set(nome, { nome, peso: d.peso, topicos: semRepetir(d.topicos) });
  }
  return { ...m, disciplinas: [...por.values()] };
});
