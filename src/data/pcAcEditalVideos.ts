import type { TopicVideo } from "@/data/topicVideos";

/**
 * Ampliação da videoteca para o cargo de Oficial Investigador de Polícia da PC-AC
 * (Edital nº 001 SEAD/PCAC/2026, banca IDECAN — Anexo III, ver `pcAcreVerticalizado.ts`).
 *
 * Cada assunto segue o item correspondente do conteúdo programático do edital. Onde a matéria já
 * existia na videoteca (Contabilidade, Estatística, Informática, Direito Penal e Processual Penal),
 * os vídeos entram nos assuntos já usados pelo cronograma (`studyTopics.ts`), sem criar duplicatas.
 * Matérias novas do edital (Arquivologia, Análise de Dados, Noções de Administração e Legislação
 * Institucional) ganham assuntos com o nome do próprio item do edital.
 *
 * Só vídeos gratuitos do YouTube, localizados por busca em 13/11/2026. O canal só é informado
 * quando aparece na própria página do vídeo.
 */
export const PCAC_EDITAL_VIDEOS: Record<string, Record<string, TopicVideo[]>> = {
  Arquivologia: {
    "Ciclo de vida dos documentos (teoria das três idades)": [
      { id: "CGK6s0zTtSE", title: "Ciclo vital (teoria das três idades) — Prof.ª Izabel Ataíde" },
      { id: "MFEo99A3HEE", title: "Ciclo vital dos documentos e a teoria das três idades" },
      { id: "vG5wk_jobrQ", title: "Teoria das três idades — Arquivologia para concursos (André Sandes)" },
      { id: "oiPsm2Y05GI", title: "Teoria das três idades — parte 1 (Prof. Luiz Antônio de Carvalho)" },
      { id: "DX79R3AH6-M", title: "Teoria das três idades — parte 2 (Prof. Luiz Antônio de Carvalho)" },
    ],
    "Gestão documental: protocolo, classificação, avaliação e temporalidade": [
      { id: "j6gbjU8dyaI", title: "Arquivologia descomplicada: tabela de temporalidade, protocolo e tipos de arquivo" },
      { id: "wTACbF76_VY", title: "Tabela de temporalidade de documentos — Prof.ª Izabel Ataíde" },
      { id: "VMzIM0XhKzY", title: "Gestão de documentos: fases, tabela de temporalidade e princípios arquivísticos" },
      { id: "D4LRKRlKtPk", title: "Arquivologia para concursos: gestão documental (Prof. Vander Duarte)" },
      { id: "YdkfzKhQLM4", title: "Tabela de temporalidade — parte 1 (Prof. Luiz Antônio de Carvalho)" },
      { id: "Wk45ticV2iM", title: "Tabela de temporalidade — parte 2 (Prof. Luiz Antônio de Carvalho)" },
    ],
    "Preservação e conservação de documentos": [
      { id: "9TdoltXsYg4", title: "Acondicionamento e armazenamento de documentos" },
    ],
    "Documentos digitais, digitalização e SIGAD": [
      { id: "fsfazYQSPZA", title: "e-ARQ Brasil e SIGAD — Prof.ª Izabel Ataíde" },
      { id: "Wjh4rWD37p4", title: "Gestão eletrônica de documentos (GED) — Prof.ª Izabel Ataíde" },
      { id: "w0Xoh-MN-2Y", title: "SIGAD — e-ARQ Brasil v2.0 (aula 2)" },
      { id: "6AOj3oqgb0w", title: "Digitalização de documentos e a eliminação dos originais em papel" },
      { id: "JmvZ9FQehYI", title: "Documentos digitais autênticos, cadeia de custódia e SIGAD (Prof. Daniel Flores)" },
    ],
  },

  Contabilidade: {
    "Patrimônio e equação fundamental": [
      { id: "g10pRVqc7MY", title: "Patrimônio na contabilidade: ativo, passivo e PL" },
      { id: "C5UhREYlMcc", title: "Contabilidade básica: bens, direitos e obrigações (ativo = passivo + PL)" },
    ],
    "Escrituração e partidas dobradas": [
      { id: "923pchGYEUE", title: "Método das partidas dobradas — Contabilidade Geral (Claudio Cardoso)" },
      { id: "r38zdbQjZrw", title: "Partidas dobradas e razonetes em 40 minutos" },
    ],
    "Balanço patrimonial": [
      { id: "esfBjDwfV48", title: "Todas as contas do balanço patrimonial: circulante, não circulante e PL" },
      { id: "c-iPyqAZ8_E", title: "Concurso AFT: aula de Contabilidade Geral — balanço patrimonial", channel: "Qconcursos" },
    ],
    "DRE e demais demonstrações": [
      { id: "ELqVu4MIJxg", title: "Passo a passo: balanço patrimonial e DRE em questões de concurso" },
      { id: "azTJ0xSTKO8", title: "Balanço x DRE: a diferença que cai na prova" },
    ],
    "Matemática financeira: juros, taxas e descontos": [
      { id: "PLwfS1OdFfaOwEfXxJs1i8EXCvDvFVC97h", title: "Matemática financeira: curso completo (playlist)" },
      { id: "wuxllPuuB7Y", title: "Juros compostos — parte 2" },
      { id: "v9oaOMDI6C8", title: "Desconto simples e cálculo de taxa efetiva" },
      { id: "fBO677In2LQ", title: "Desconto composto e cálculo da taxa efetiva" },
    ],
    "Análise de movimentações financeiras e lavagem de dinheiro": [
      { id: "ttUGkokAIug", title: "Lavagem de dinheiro: conceitos e etapas (colocação, ocultação e integração)" },
      { id: "dS9mlyRVLfA", title: "Lavagem de dinheiro: aspectos investigativos (Acadepol-SP)" },
      { id: "sMsLP1CXvgg", title: "Crime de lavagem de dinheiro e Lei 9.613/1998" },
    ],
  },

  Estatística: {
    "Medidas de dispersão": [
      { id: "7K2jw0IgUxM", title: "Medidas de dispersão: variância, desvio-padrão e coeficiente de variação" },
      { id: "S0bBa_cFqZg", title: "Medidas de dispersão respondendo questões de concurso" },
      { id: "AYABVEG2Hxc", title: "Medidas de dispersão: questão de prova corrigida" },
    ],
    "Medidas separatrizes: quartis, decis e percentis": [
      { id: "cEHcoXYypR8", title: "Medidas separatrizes: quartil, decil e centil" },
      { id: "6rjEBPwTXeY", title: "Medidas de posição ou separatrizes" },
      { id: "rfgCWwyh_4E", title: "Medidas separatrizes: resolução de exercícios" },
    ],
    Probabilidade: [
      { id: "qX9QiHDooRU", title: "Probabilidade condicional e independência de eventos — parte 1" },
      { id: "R7CZbnJBmRs", title: "Questões de probabilidade: eventos independentes" },
      { id: "-j-UOnSATJk", title: "Exercícios de probabilidade condicional" },
    ],
    "Correlação e regressão": [
      { id: "_oxjh5woChE", title: "Correlação linear entre variáveis" },
      { id: "5SIB_FjcsEo", title: "Correlação e regressão linear" },
      { id: "PLCywy2mu1NAGMhBTK3wuJcBqB-HBlUrVE", title: "Análise de regressão linear em questões de concurso (playlist)" },
    ],
  },

  Informática: {
    "Banco de dados e SQL": [
      { id: "rfR3dUumo0U", title: "Chave primária, chave estrangeira e cardinalidade" },
      { id: "bvjWvaMMB6c", title: "Chaves primária, estrangeira e candidata" },
      { id: "6rdWqiJ5qBA", title: "Questões de banco de dados (Cesgranrio)" },
    ],
    "Redes: modelo OSI e TCP/IP": [
      { id: "zzIEowtyh2M", title: "Endereçamento IP: classes, rede e host" },
      { id: "DhqdUFt-g0k", title: "Protocolos da camada de transporte: TCP e UDP" },
      { id: "217yjA3OPPg", title: "Protocolos de redes: TCP, UDP e IP — parte 1" },
    ],
    "Criptografia, hash e assinatura digital": [
      { id: "DiuU3Hh1u9A", title: "Criptografia: chave simétrica e chave assimétrica" },
      { id: "-2vFngNFT4E", title: "Criptografia simétrica e assimétrica (Prof. Rodrigo Schaeffer)" },
    ],
    "Editores de texto e planilhas": [
      { id: "NKZn3PC6K1A", title: "Como fazer uma tabela dinâmica no Excel" },
      { id: "bGFAHIe4FLc", title: "Tabela dinâmica + PROCV" },
    ],
    "Metadados de arquivos digitais": [
      { id: "VOEm-oTow0M", title: "Como ver os metadados de um arquivo" },
      { id: "nkql1IOYFe0", title: "ExifTool: veja onde e quando uma foto foi tirada" },
      { id: "mj2b-1LCqoY", title: "Investigação forense com metadados e geolocalização de uma foto" },
    ],
  },

  "Análise de Dados e Informações": {
    "Análise de vínculos e diagramas de relacionamento": [
      { id: "bKbgzcXCLBI", title: "Plataforma i2 na análise de relacionamento" },
      { id: "roDvnfwlYr0", title: "i2: como organizar seus diagramas no Analyst's Notebook" },
      { id: "TVU6W-oBz3g", title: "IBM i2 básico: diagramas de associação, rede e hierarquia" },
    ],
    "Inteligência e investigação policial": [
      { id: "cMl9tHltD0A", title: "Diferenças entre inteligência e investigação policial" },
      { id: "PLDVoZQl9HlQpMq-gDVVgHUidxP-PfyElU", title: "Análise criminal: aulas em vídeo (playlist)" },
    ],
    "Organização e tratamento de dados em planilhas": [
      { id: "GmoWeaJZ6-A", title: "Fundamentos sobre análise de dados", channel: "Monster Concursos" },
      { id: "NKZn3PC6K1A", title: "Como fazer uma tabela dinâmica no Excel" },
    ],
  },

  "Noções de Administração": {
    "Funções administrativas: planejamento, organização, direção e controle": [
      { id: "4_5Wjp6zvaQ", title: "Adm Express: funções administrativas (PODC)" },
      { id: "X9j2xGTELbs", title: "Funções administrativas: planejamento, organização, direção e controle" },
      { id: "J9p1h3JqB5U", title: "Funções da administração — resumo animado" },
    ],
    "Gestão de processos": [
      { id: "6JQZuURiUrc", title: "Gestão de processos para concursos: o que mais cai (Prof. Marcelo Soares)" },
      { id: "YapF7ZptBOY", title: "Gestão por processos, reengenharia e BPM (Prof. Rodrigo Rennó)" },
    ],
    "Qualidade no atendimento ao público": [
      { id: "LMCRKa_MssU", title: "Qualidade no atendimento ao público (Administração)" },
      { id: "abDRnHE9H2w", title: "Qualidade no atendimento ao público" },
    ],
  },

  "Legislação Institucional": {
    "Lei Orgânica Nacional das Polícias Civis (Lei 14.735/2023)": [
      { id: "-zYrVkLaKYs", title: "Lei 14.735/2023 — leitura estratégica da Lei Orgânica Nacional das Polícias Civis" },
      { id: "7Yi0V3N4zek", title: "Lei Orgânica Nacional das Polícias Civis e suas normas gerais de funcionamento" },
      { id: "tldM-pSkGCA", title: "Capítulo IV da Lei 14.735/2023 explicado (Legiscast)" },
      { id: "A-XCozJq7KQ", title: "Oficial Investigador de Polícia: quais Polícias Civis já unificaram o cargo?" },
    ],
    "Estatuto dos Servidores Públicos Civis do Acre (LC 39/1993)": [
      { id: "un7_VJ6naWA", title: "Resolução de questões: Estatuto dos Servidores Públicos Civis do Estado do Acre" },
    ],
  },

  "Direito Penal": {
    "Crimes contra a fé pública": [
      { id: "Rz7ZCoIW0WI", title: "Crimes contra a fé pública" },
      { id: "zVJ_cTHdGiw", title: "Falsificação de documento público — art. 297 do CP" },
      { id: "wRavDvjW4N8", title: "Falsificação de documento particular — art. 298 do CP" },
      { id: "PxH4Kkr1my4", title: "Falsa identidade — art. 307 do CP" },
      { id: "ZIxFYGkXAok", title: "Questões FCC: crimes contra a fé pública — falsidade documental" },
    ],
  },

  "Direito Processual Penal": {
    Provas: [
      { id: "Ghq0k7VId0s", title: "Cadeia de custódia explicada (arts. 158-A a 158-F do CPP)" },
      { id: "aOa3xncXAHs", title: "Arts. 158-A a 158-F do CPP — cadeia de custódia (Pacote Anticrime)" },
      { id: "SLomQt26CgU", title: "CPP em áudio: arts. 158 a 184 — corpo de delito, cadeia de custódia e perícias" },
    ],
    "Identificação criminal": [
      { id: "n82YYSXDDVU", title: "Lei 12.037/2009 — identificação criminal (Sexta Extravagante)" },
      { id: "gU40IVvjz0U", title: "Identificação criminal — aula 5.1" },
      { id: "ai4hfkYJkDY", title: "Pacote Anticrime: mudanças na identificação criminal" },
    ],
  },

  "Língua Portuguesa": {
    "Interpretação e compreensão de texto": [
      { id: "AXqFZpNzJhE", title: "Questões comentadas de português — IDECAN (Prof.ª Eliane Vieira)" },
      { id: "ODNucBHQ3gM", title: "IDECAN na prática: português em questões (PCSC)" },
      { id: "RBSxQ6Luf9E", title: "PMES 2026: questões de português resolvidas — IDECAN" },
    ],
  },
};
