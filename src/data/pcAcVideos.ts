import type { TopicVideo } from "@/data/topicVideos";

/** Conteúdo recente e diretamente ligado ao edital PC-AC 2026. */
export const PCAC_VIDEOS: Record<string, Record<string, TopicVideo[]>> = {
  "PC-AC 2026": {
    "Edital e estratégia": [
      {
        id: "0Ir0LnvMmKA",
        title: "Atenção! Concurso PCAC publicado | Análise completa do edital - AO VIVO",
        channel: "Qconcursos",
      },
      {
        id: "iuUCugqtBGw",
        title: "PC AC — análise completa do edital",
        channel: "Direito Simples e Objetivo",
      },
    ],
  },
  "Realidade do Acre": {
    "Formação histórica e ciclos da borracha": [
      { id: "c5aX4ZsPWeY", title: "História do Acre para Concursos Públicos", channel: "Esparta Educacional" },
      { id: "SH6gAz1N0Ww", title: "História do Acre - História / Geografia", channel: "Como Foi" },
      { id: "UYa-nUkStbU", title: "História e Geografia do Acre | Concurso Público | Gabaritada | Parte 1", channel: "Português Simples Assim" },
    ],
    "Revolução Acreana e anexação ao Brasil": [
      { id: "c5aX4ZsPWeY", title: "História do Acre para Concursos Públicos", channel: "Esparta Educacional" },
      { id: "SH6gAz1N0Ww", title: "História do Acre - História / Geografia", channel: "Como Foi" },
    ],
    "Geografia, limites, fronteiras e hidrografia": [
      { id: "KRmY1odLVyg", title: "Geografia do Acre - Parte II - Prof. Sérgio Henrique", channel: "Estratégia Concursos" },
      { id: "UYa-nUkStbU", title: "História e Geografia do Acre | Concurso Público | Gabaritada | Parte 1", channel: "Português Simples Assim" },
      { id: "m7JbzmrLqUA", title: "Agricultura das Colônias aos Projetos de Assentamento Dirigidos - Geo História Acre", channel: "Lac Concursos" },
    ],
    "Aspectos étnicos, culturais e populações tradicionais": [
      { id: "SH6gAz1N0Ww", title: "História do Acre - História / Geografia", channel: "Como Foi" },
      { id: "c5aX4ZsPWeY", title: "História do Acre para Concursos Públicos", channel: "Esparta Educacional" },
    ],
    "Aspectos sociais e econômicos": [
      { id: "ed8bJQ9GxWE", title: "Economia e espaço da cidade - Geo História", channel: "Lac Concursos" },
      { id: "m7JbzmrLqUA", title: "Agricultura das Colônias aos Projetos de Assentamento Dirigidos - Geo História Acre", channel: "Lac Concursos" },
      { id: "KRmY1odLVyg", title: "Geografia do Acre - Parte II - Prof. Sérgio Henrique", channel: "Estratégia Concursos" },
    ],
    "Segurança pública e regiões de fronteira": [
      { id: "KRmY1odLVyg", title: "Geografia do Acre - Parte II - Prof. Sérgio Henrique", channel: "Estratégia Concursos" },
      { id: "UYa-nUkStbU", title: "História e Geografia do Acre | Concurso Público | Gabaritada | Parte 1", channel: "Português Simples Assim" },
    ],
  },
};

/**
 * Vídeos ligados às disciplinas de maior peso no edital da PC-AC 2026 (IDECAN).
 * Os títulos e endereços vieram de buscas públicas; a incorporação e a data de publicação ainda
 * precisam ser conferidas com `node scripts/video-meta.mjs`, que consulta o YouTube.
 */
export const PCAC_VIDEOS_EXTRA: Record<string, Record<string, TopicVideo[]>> = {
  "Língua Portuguesa": {
    "Interpretação e compreensão de texto": [
      { id: "YOZwGjxcntU", title: "Edital Total IDECAN — Episódio 01: Interpretação de Texto" },
      { id: "6lFopVUhNJA", title: "Interpretação de textos para diversos concursos / tipologia textual / treinamento com 13 questões" },
    ],
  },
  "Direito Penal": {
    "Concurso de crimes e penas": [
      { id: "UFiw10ByKEg", title: "Concurso de pessoas: aula completa [Direito Penal Parte Geral]" },
    ],
    "Teoria do crime": [
      { id: "hxNIZuTdokg", title: "Concurso PCMG — Direito Penal — Teoria do Crime", channel: "Monster Concursos" },
    ],
    "*": [
      { id: "OnWgHZgHAik", title: "Concurso Polícia Civil de Minas Gerais — Direito Penal", channel: "Monster Concursos" },
      { id: "c6pukKEQTHw", title: "Concurso PCMG — Direito Penal", channel: "Monster Concursos" },
      { id: "MikEHWxK1ys", title: "Concurso Polícia Civil de São Paulo — Direito Penal", channel: "Monster Concursos" },
      { id: "9Sr8Cz_BUKI", title: "Concurso Polícia Civil SC — Aula de Direito Penal", channel: "Rico Domingues Concursos" },
    ],
  },
  "Direito Processual Penal": {
    "Inquérito policial": [
      { id: "52xdtjEdYdA", title: "Inquérito policial — PCBA" },
      { id: "AgGLhMzanRo", title: "Concurso PC SP: aula de Direito Processual Penal — inquérito policial" },
      { id: "oQ4mRxXzRM4", title: "Processo Penal para Concursos — inquérito policial (live #175)" },
    ],
    "Prisões e medidas cautelares": [
      { id: "WwWHrAP6V0s", title: "PC ES — Prisão em flagrante, parte 3 — Direito Processual Penal" },
      { id: "UpcWXS5RejQ", title: "Resolução de questões: Direito Processual Penal — da prisão em flagrante" },
      { id: "KJVhLQ_A7Cg", title: "Prisão em flagrante" },
    ],
    "*": [
      { id: "9H-BRe_npbk", title: "Carreira Policial: aulão de Direito Processual Penal", channel: "Geilza Diniz" },
    ],
  },
  Informática: {
    "Segurança da informação": [
      { id: "0GQb6-LxJf0", title: "Segurança da Informação — Aula 1" },
      { id: "bKO3jVz2Roo", title: "Phishing e a segurança da informação" },
      { id: "lVM1DeHSxCM", title: "Segurança da informação para concursos #26 — confidencialidade", channel: "Rodrigo Schaeffer" },
      { id: "oXu_UtEIuaw", title: "Segurança da informação para concursos #14 — ataques de spoofing", channel: "Rodrigo Schaeffer" },
      { id: "zxBf-6pkTIk", title: "Segurança da informação para concursos #37 — criptografia assimétrica", channel: "Rodrigo Schaeffer" },
    ],
    "*": [
      { id: "DzyICXlC340", title: "PC AL 2026 — Aula 59 de Tecnologia da Informação e Segurança Cibernética" },
      { id: "_TwnkBG2n_M", title: "Concurso PC AL — Informática e o padrão de cobrança do Cebraspe" },
    ],
  },
  Estatística: {
    "Medidas de posição": [
      { id: "1ZEPQ1glJME", title: "Estatística (média, mediana, moda, variância e desvio padrão)", channel: "Prof. Gui" },
      { id: "BKziBJfi3_U", title: "Noções de Estatística — média, moda, mediana e desvio padrão numa representação gráfica" },
    ],
    "Medidas de dispersão": [
      { id: "0YkPwbbJRn0", title: "Média e desvio padrão amostral — questão de Escrivão da Polícia Civil do Pará" },
      { id: "QXXHPHUUIjs", title: "Estatística: média, moda, mediana, variância e desvio padrão" },
    ],
  },
  // "Legislação Penal Extravagante" não tinha nenhum vídeo no catálogo (nem aqui, nem em
  // topicVideos.ts) — as leis extravagantes aparecem espalhadas sob outras matérias (ex.:
  // "Legislação Especial e Direitos Humanos"), mas não sob o nome usado pelo edital PC-AC.
  // Vídeos abaixo vieram de busca pública; a incorporação e a data ainda precisam ser
  // conferidas com `node scripts/video-meta.mjs` (mesma ressalva já usada acima neste arquivo).
  "Legislação Penal Extravagante": {
    "Lei de Drogas": [
      { id: "i5lcZyzzP_k", title: "AULA GRATUITA: Lei de Drogas (Lei nº 11.343/06) — Legislação Penal Especial" },
      { id: "AYn7n5NhNAM", title: "Lei Esquematizada — Lei de Drogas (Lei nº 11.343/2006)" },
    ],
    "Organizações criminosas": [
      { id: "buqlGgZa668", title: "Lei de Organização Criminosa — Lei 12.850/2013 — Parte 1" },
      { id: "2BV1ZPPW2YI", title: "Lei de Organização Criminosa — Lei 12.850/2013 — Parte 2" },
    ],
    "Lavagem de dinheiro": [
      { id: "UaMAsy-YvOk", title: "AULA GRATUITA: Lei de Lavagem de Dinheiro (Lei nº 9.613/98) — Legislação Penal Especial" },
      { id: "5oKPsxpSG9k", title: "Lei nº 9.613 de 1998 — Lavagem de Capitais", channel: "Professor Raphael Pinho" },
    ],
    "Abuso de autoridade": [
      { id: "AzVpuQfcjPw", title: "AULA GRATUITA: Lei de Abuso de Autoridade (Lei nº 13.869/19) — Legislação Penal Especial" },
      { id: "8g1qujVd6XU", title: "Lei de Abuso de Autoridade (Lei nº 13.869/19)", channel: "Professora Priscilla Fernandes" },
    ],
    "Tortura": [
      { id: "gr7tf8O8O6M", title: "Lei 9.455/97 — Lei de Tortura — Teoria + Questões" },
      { id: "NLPsV5ARlUQ", title: "Lei de Tortura — Lei nº 9.455 de 1997", channel: "Prof. Ayres Barros" },
    ],
    "Estatuto do Desarmamento": [
      { id: "6WqqpOA5qKs", title: "AULA GRATUITA: Estatuto do Desarmamento (Lei nº 10.826/03) — Legislação Penal Especial" },
      { id: "hx4edhZh_Oo", title: "Lei Esquematizada — Estatuto do Desarmamento (Lei nº 10.826 de 2003)" },
    ],
    "Interceptação das comunicações telefônicas": [
      { id: "ir_YQ4qTHEI", title: "Lei Esquematizada — Lei de Interceptação Telefônica (Lei nº 9.296 de 1996)" },
      { id: "z4ffpcWRH7A", title: "Lei de interceptações telefônicas — Parte I (Lei 9.296 de 1996)" },
    ],
    "Crimes hediondos": [
      { id: "qzPbBDWCO-w", title: "AULA GRATUITA: Lei de Crimes Hediondos (Lei nº 8.072/90) — Legislação Penal Especial" },
      { id: "RA21YMfH2_U", title: "Aula completa — Lei de Crimes Hediondos — 8.072/90" },
    ],
    "Crimes cibernéticos": [
      { id: "y7o6IIOD18E", title: "Lei “Carolina Dieckmann” (12.737/2012)" },
      { id: "eAkn8X6qpwk", title: "Delitos Informáticos — Lei Carolina Dieckmann", channel: "Monster Concursos" },
    ],
    "Juizados especiais criminais": [
      { id: "balpCDf-QWo", title: "JECRIM — Aula animada — Juizado Especial Criminal — Lei 9.099/95" },
      { id: "j5wpylJ_QRY", title: "Juizado Especial Criminal — Lei 9.099/95" },
    ],
    "Crimes ambientais": [
      { id: "JrSKZNmOyik", title: "Lei nº 9.605/1998 — Crimes Ambientais" },
      { id: "OWt4mOzeqQw", title: "Lei de Crimes Ambientais (Lei 9.605/1998) — Aula 02" },
    ],
    "Prisão temporária": [
      { id: "mcG4ECMzeUE", title: "Prisão Temporária (Lei 7.960/89) — Lei completa" },
      { id: "7yXMmD0Cf5k", title: "Prisão Temporária (Lei nº 7.960/1989) para a Polícia Civil SP", channel: "Prof. Diego Pureza" },
    ],
    "Violência doméstica e familiar contra a mulher": [
      { id: "2kKfq68qVXo", title: "Aula completa — Lei 11.340/2006 — Lei Maria da Penha (Atualizada)" },
      { id: "xw2ig9iHLiA", title: "Lei Maria da Penha (Atualizada) — Revisão completa + questões comentadas" },
    ],
    "Estatuto da Criança e do Adolescente": [
      { id: "bbLFKngrBQE", title: "Crimes previstos no Estatuto da Criança e do Adolescente", channel: "Professor Rodrigues" },
      { id: "dSLYCs3CwU4", title: "ECA comentado e atualizado para concursos (revisão artigo por artigo)" },
    ],
    "*": [
      { id: "qzPbBDWCO-w", title: "AULA GRATUITA: Lei de Crimes Hediondos (Lei nº 8.072/90) — Legislação Penal Especial" },
      { id: "buqlGgZa668", title: "Lei de Organização Criminosa — Lei 12.850/2013 — Parte 1" },
      { id: "i5lcZyzzP_k", title: "AULA GRATUITA: Lei de Drogas (Lei nº 11.343/06) — Legislação Penal Especial" },
    ],
  },
};
