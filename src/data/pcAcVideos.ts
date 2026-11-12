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
};
