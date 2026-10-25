import {
  MATEMATICA_BASICA,
  FISICA_BASICA,
  QUIMICA_BASICA,
  INGLES_BASICO,
} from "./fundamentos-gerais";
import type { Track } from "./types";
import { CONTABILIDADE_1 } from "./contabilidade1";
import { CONTABILIDADE_2 } from "./contabilidade2";
import { INFORMATICA_1 } from "./informatica1";
import { INFORMATICA_2 } from "./informatica2";
import { PORTUGUES_1 } from "./portugues1";
import { RACIOCINIO_1 } from "./raciocinio1";
import { CONSTITUCIONAL_1 } from "./constitucional1";
import { ADMINISTRATIVO_1 } from "./administrativo1";
import { HUMANOS_1 } from "./humanos1";
import { ESTATISTICA_1 } from "./estatistica1";

export type { Track, TrackLesson, TrackQuiz } from "./types";

export const TRACKS: Track[] = [
  {
    slug: "contabilidade",
    title: "Contabilidade Geral",
    discipline: "Contabilidade",
    source: "Edital da Polícia Federal 2025 (Cebraspe), Bloco III, itens 1 a 12",
    lessons: [...CONTABILIDADE_1, ...CONTABILIDADE_2],
  },
  {
    slug: "informatica",
    title: "Informática",
    discipline: "Informática",
    source: "Edital da Polícia Federal 2025 (Cebraspe), Bloco II",
    lessons: [...INFORMATICA_1, ...INFORMATICA_2],
  },
  {
    slug: "portugues",
    title: "Língua Portuguesa",
    discipline: "Português",
    source: "Tópicos recorrentes em editais policiais; confira o edital do seu concurso",
    lessons: PORTUGUES_1,
  },
  {
    slug: "raciocinio-logico",
    title: "Raciocínio Lógico",
    discipline: "Raciocínio Lógico",
    source: "Tópicos recorrentes em editais policiais; confira o edital do seu concurso",
    lessons: RACIOCINIO_1,
  },
  {
    slug: "constitucional",
    title: "Direito Constitucional",
    discipline: "Constitucional",
    source:
      "Constituição Federal de 1988 (texto compilado do Planalto); tópicos recorrentes em editais policiais",
    lessons: CONSTITUCIONAL_1,
  },
  {
    slug: "administrativo",
    title: "Direito Administrativo",
    discipline: "Administrativo",
    source:
      "Constituição Federal, Leis 8.112/1990, 9.784/1999 e 14.133/2021; tópicos recorrentes em editais policiais",
    lessons: ADMINISTRATIVO_1,
  },
  {
    slug: "direitos-humanos",
    title: "Direitos Humanos",
    discipline: "Direitos Humanos",
    source:
      "Tratados e instrumentos internacionais mais cobrados; confira o edital do seu concurso",
    lessons: HUMANOS_1,
  },
  {
    slug: "estatistica",
    title: "Estatística",
    discipline: "Estatística",
    source:
      "Noções de estatística recorrentes em editais policiais; confira o edital do seu concurso",
    lessons: ESTATISTICA_1,
  },
  {
    slug: "matematica",
    title: "Matemática",
    discipline: "Matemática",
    source:
      "Matriz ENEM cadastrada: fundamentos de proporções, geometria, dados, probabilidade e funções; confira a edição escolhida.",
    lessons: MATEMATICA_BASICA,
  },
  {
    slug: "fisica",
    title: "Física",
    discipline: "Física",
    source:
      "Matriz ENEM cadastrada: fundamentos de grandezas, energia e circuitos; confira a edição escolhida.",
    lessons: FISICA_BASICA,
  },
  {
    slug: "quimica",
    title: "Química",
    discipline: "Química",
    source:
      "Matriz ENEM cadastrada: matéria, transformações e quantidades; confira a edição escolhida.",
    lessons: QUIMICA_BASICA,
  },
  {
    slug: "ingles",
    title: "Língua Inglesa",
    discipline: "Língua Inglesa",
    source:
      "Matriz ENEM cadastrada: leitura, finalidade e vocabulário em contexto; confira a edição escolhida.",
    lessons: INGLES_BASICO,
  },
];
