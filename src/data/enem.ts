/** Estrutura da área ENEM: provas, matérias, assuntos mais cobrados e competências da redação. */

export type EnemHue = "sky" | "emerald" | "rose" | "orange" | "violet" | "teal" | "gold";

export interface EnemSubject {
  /** Nome exibido. */
  name: string;
  /** Matéria no catálogo de vídeos (prefixo "ENEM — "). */
  videoKey: string;
  /** Assuntos frequentes. Os que têm videoaula usam o MESMO nome do assunto do catálogo. */
  topics: string[];
}
export interface EnemArea {
  id: string;
  name: string;
  short: string;
  day: 1 | 2;
  hue: EnemHue;
  questions: number;
  subjects: EnemSubject[];
}

const v = (s: string) => `ENEM — ${s}`;

export const ENEM_AREAS: EnemArea[] = [
  {
    id: "linguagens",
    name: "Linguagens, Códigos e suas Tecnologias",
    short: "Linguagens",
    day: 1,
    hue: "rose",
    questions: 45,
    subjects: [
      {
        name: "Língua Portuguesa",
        videoKey: v("Língua Portuguesa"),
        topics: [
          "Interpretação de texto",
          "Gêneros textuais",
          "Funções da linguagem",
          "Variação linguística",
          "Figuras de linguagem",
          "Intertextualidade",
          "Coesão e coerência",
        ],
      },
      {
        name: "Literatura",
        videoKey: v("Literatura"),
        topics: [
          "Do Barroco ao Romantismo",
          "Realismo e Naturalismo",
          "Simbolismo e Parnasianismo",
          "Modernismo",
          "Literatura contemporânea",
        ],
      },
      {
        name: "Línguas Estrangeiras",
        videoKey: v("Línguas Estrangeiras"),
        topics: [
          "Espanhol",
          "Provas anteriores",
          "Interpretação de textos em inglês",
          "Vocabulário em contexto",
        ],
      },
      {
        name: "Artes, Educação Física e Tecnologias",
        videoKey: v("Língua Portuguesa"),
        topics: [
          "Movimentos artísticos",
          "Cultura corporal",
          "Tecnologias da informação e comunicação",
        ],
      },
    ],
  },
  {
    id: "humanas",
    name: "Ciências Humanas e suas Tecnologias",
    short: "Humanas",
    day: 1,
    hue: "orange",
    questions: 45,
    subjects: [
      {
        name: "História",
        videoKey: v("História"),
        topics: [
          "História do Brasil",
          "Idade Média e Moderna",
          "Revoluções Industrial e Francesa",
          "Guerras mundiais e Guerra Fria",
          "África e povos indígenas",
          "Ditadura militar e redemocratização",
        ],
      },
      {
        name: "Geografia",
        videoKey: v("Geografia"),
        topics: [
          "Cartografia",
          "Clima e vegetação",
          "Relevo e solos",
          "Urbanização",
          "Questão agrária e agropecuária",
          "Geopolítica e globalização",
          "Questões ambientais",
          "Demografia",
          "Energia e recursos naturais",
        ],
      },
      {
        name: "Filosofia e Sociologia",
        videoKey: v("Filosofia e Sociologia"),
        topics: [
          "Filosofia",
          "Ética e política",
          "Cultura e identidade",
          "Trabalho e sociedade",
          "Movimentos sociais e cidadania",
          "Clássicos da Sociologia",
        ],
      },
    ],
  },
  {
    id: "natureza",
    name: "Ciências da Natureza e suas Tecnologias",
    short: "Natureza",
    day: 2,
    hue: "emerald",
    questions: 45,
    subjects: [
      {
        name: "Biologia",
        videoKey: v("Biologia"),
        topics: [
          "Ecologia",
          "Genética",
          "Citologia",
          "Fisiologia humana",
          "Evolução",
          "Biotecnologia",
          "Saúde e doenças",
          "Botânica e zoologia",
        ],
      },
      {
        name: "Física",
        videoKey: v("Física"),
        topics: [
          "Mecânica e energia",
          "Eletricidade",
          "Termologia",
          "Ondulatória e óptica",
          "Hidrostática",
          "Física moderna",
        ],
      },
      {
        name: "Química",
        videoKey: v("Química"),
        topics: [
          "Estequiometria",
          "Soluções",
          "Termoquímica",
          "Química orgânica",
          "Eletroquímica",
          "Equilíbrio e cinética",
          "Atomística e ligações",
          "Química ambiental",
        ],
      },
    ],
  },
  {
    id: "matematica",
    name: "Matemática e suas Tecnologias",
    short: "Matemática",
    day: 2,
    hue: "sky",
    questions: 45,
    subjects: [
      {
        name: "Matemática",
        videoKey: v("Matemática"),
        topics: [
          "Matemática básica",
          "Estatística",
          "Probabilidade",
          "Análise combinatória",
          "Geometria plana e espacial",
          "Funções",
          "Progressões",
          "Trigonometria",
          "Geometria analítica",
          "Escalas e unidades",
        ],
      },
    ],
  },
];

/** Matérias com videoaulas, na ordem de exibição. */
export const ENEM_VIDEO_SUBJECTS = [
  "Matemática",
  "Redação",
  "Língua Portuguesa",
  "Literatura",
  "Línguas Estrangeiras",
  "História",
  "Geografia",
  "Filosofia e Sociologia",
  "Biologia",
  "Física",
  "Química",
  "Como estudar",
].map((name) => ({ name, key: v(name) }));

export interface Competencia {
  n: number;
  title: string;
  tips: string[];
}
/** As cinco competências avaliadas na redação (cada uma vale de 0 a 200 pontos, total de 1000). */
export const COMPETENCIAS: Competencia[] = [
  {
    n: 1,
    title: "Domínio da modalidade escrita formal da língua portuguesa",
    tips: [
      "Revise concordância, regência, crase, pontuação e ortografia.",
      "Evite gírias, marcas de oralidade e abreviações.",
      "Releia o texto procurando desvios antes de passar a limpo.",
    ],
  },
  {
    n: 2,
    title: "Compreensão da proposta e aplicação de conceitos de várias áreas",
    tips: [
      "Não fuja nem tangencie o tema: responda exatamente à proposta.",
      "Use repertório sociocultural (fatos, obras, dados) ligado ao tema.",
      "Mantenha a estrutura dissertativo-argumentativa: introdução, desenvolvimento e conclusão.",
    ],
  },
  {
    n: 3,
    title: "Seleção, organização e interpretação de informações e argumentos",
    tips: [
      "Defina uma tese clara já na introdução.",
      "Planeje os argumentos antes de escrever (projeto de texto).",
      "Explique cada argumento; não apenas cite repertório.",
    ],
  },
  {
    n: 4,
    title: "Conhecimento dos mecanismos linguísticos para a argumentação",
    tips: [
      "Use conectivos variados entre parágrafos e dentro dos períodos.",
      "Retome ideias com pronomes e sinônimos, sem repetir palavras.",
      "Garanta a progressão: cada parágrafo continua o anterior.",
    ],
  },
  {
    n: 5,
    title: "Proposta de intervenção respeitando os direitos humanos",
    tips: [
      "Inclua os cinco elementos: agente, ação, meio ou modo, finalidade e detalhamento.",
      "A proposta deve resolver o problema discutido no texto.",
      "Nunca desrespeite os direitos humanos (ex.: propor violência).",
    ],
  },
];

export const ENEM_FACTS = [
  { label: "Questões objetivas", value: "180", hint: "45 por área, múltipla escolha" },
  { label: "Dias de prova", value: "2", hint: "dois domingos seguidos" },
  { label: "Redação", value: "0–1000", hint: "5 competências de 200 pontos" },
];
