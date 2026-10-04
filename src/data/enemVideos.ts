import type { TopicVideo } from "./topicVideos";

/** Videoaulas gratuitas de ENEM (YouTube), conferidas por oEmbed em 04/10/2026. Cópia de segurança do catálogo gerenciado no admin. */
export const ENEM_VIDEOS: Record<string, Record<string, TopicVideo[]>> = {
  "ENEM — Matemática": {
    "*": [
      { id: "MA_ZrgV2xws", title: "TUDO DE MATEMÁTICA PARA O ENEM - Aula completa Mestres do ENEM", channel: "Umberto Mannarino - Mestres do ENEM" },
      { id: "_EmywnyCOM0", title: "[GRÁTIS] Eu ensino TODA a MATEMÁTICA do ENEM para você em 12 horas", channel: "Pedro Assaad | ENEM 2026" },
      { id: "MSZdhDBoXe0", title: "AULÃO DE MATEMÁTICA PARA O ENEM E VESTIBULARES: Resumo dos 10 temas que mais caem na prova", channel: "Curso Enem Gratuito" },
      { id: "PL8Sb1J47vKz5roPScagXaUkk-maGYZy4c", title: "CURSO COMPLETO MATEMÁTICA DO ZERO (ENEM E VESTIBULARES) - Mestres do ENEM por Umberto Mannarino", channel: "Umberto Mannarino - Mestres do ENEM" },
      { id: "XcR_NulhlKI", title: "Revisão de Matemática para o ENEM - Prof. Gui", channel: "Matemática em Exercícios" },
    ],
    "Matemática básica": [
      { id: "ddZHkCUcYRM", title: "MATEMÁTICA BÁSICA DO ZERO!! - Aulão Completo (MESTRES DO ENEM) [M01]", channel: "Umberto Mannarino - Mestres do ENEM" },
      { id: "MgeQ_Cf7WWg", title: "SEMANA DA MATEMÁTICA BÁSICA!! Aulão Completo (MESTRES DO ENEM) [M02]", channel: "Umberto Mannarino - Mestres do ENEM" },
      { id: "tRQg_BGULk0", title: "AULÃO AO VIVO: Matemática Básica - ENEM 2020 - Aula #6", channel: "Professor Ferretto | ENEM e Vestibulares" },
      { id: "k-bl7YEyYf0", title: "Revisão Matemática Básica para Volta às Aulas, ENEM e Concursos - Professora Angela Matemática", channel: "Professora Angela Matemática" },
    ],
  },
  "ENEM — Redação": {
    "*": [
      { id: "2uWYhLroT_g", title: "Como fazer a REDAÇÃO NOTA 1000 que o Enem QUER de VOCÊ!", channel: "Descomplica" },
      { id: "NJCp5eMZqm4", title: "Como tirar 1000 na redação do ENEM (atualizado com a Cartilha)", channel: "Profinho" },
      { id: "TuBKsV3lSQc", title: "DICAS pra você TIRAR NOTA 1000 na REDAÇÃO DO ENEM #NoENEMComNoslen", channel: "Professor Noslen|Professor Noslen" },
      { id: "Y86ZJPVhmZo", title: "Como fazer sua primeira REDAÇÃO NOTA 1000 do ZERO (atualizado para 2026)", channel: "Profinho" },
      { id: "U7zgxf4pUHo", title: "Como tirar 1000 na REDAÇÃO do ENEM 2026 (deu certo 5x)", channel: "Profinho" },
      { id: "lP8BaL7TBd8", title: "Em 5 minutos, como fazer uma redação do Enem nota 1000", channel: "Estadão" },
    ],
    "As 5 competências": [
      { id: "TCdiXzPI8UI", title: "5 competências da redação do ENEM: domine os critérios da correção", channel: "Toda Matéria" },
      { id: "s2EwNGEQjj8", title: "Como chegar à nota 1000 na redação do Enem - Estudo de caso - Aula 02", channel: "ENEM em curso" },
    ],
  },
  "ENEM — Biologia": {
    "*": [
      { id: "9ToHjY21jjg", title: "Os 5 assuntos de BIOLOGIA que mais caem no ENEM", channel: "Paulo Jubilut" },
      { id: "8OpQIjRKicg", title: "O QUE MAIS CAI EM BIOLOGIA NO ENEM: Revisão FINAL por EXERCÍCIOS!!", channel: "Umberto Mannarino - Mestres do ENEM" },
      { id: "YaqlmznsNwE", title: "AULÃO ENEM 2025 - CONTEÚDOS DE BIOLOGIA QUE SEMPRE SÃO COBRADOS - Professor Samuel Cunha", channel: "Biologia com Samuel Cunha" },
      { id: "kbSV5W1fLpg", title: "AULÃO ENEM 2024 - Tudo que você precisa saber de BIOLOGIA - Professor Samuel Cunha", channel: "Biologia com Samuel Cunha" },
      { id: "V3T8wAt2IYc", title: "O que mais cai no Enem em Biologia pt.2", channel: "Descomplica" },
    ],
    "Ecologia": [
      { id: "KKELP-3_Dlk", title: "Como ECOLOGIA é cobrada no ENEM", channel: "Prof. Paulo Jubilut|Paulo Jubilut" },
      { id: "5vX_ZSKpHjw", title: "ECOLOGIA no ENEM - REVISÃO - Prof. Kennedy Ramos", channel: "Kennedy Ramos" },
    ],
    "Genética": [
      { id: "nBsNHuzp1pQ", title: "O QUE MAIS CAI EM GENÉTICA ENEM", channel: "BIOLOGIA NO ENEM|Marcos André Bio" },
      { id: "Teyow7y8FxM", title: "GENÉTICA no ENEM - REVISÃO - Prof. Kennedy Ramos", channel: "Kennedy Ramos" },
    ],
  },
  "ENEM — Física": {
    "*": [
      { id: "vjScJdDA4m8", title: "Tudo o que mais cai em Física no Enem (MARATONA 2º DIA ENEM)", channel: "Repertório ENEM" },
      { id: "EIG5G1GUc0k", title: "AULÃO DE FÍSICA PARA O ENEM 2026!", channel: "Curso Enem Gratuito" },
      { id: "WTD2FZjY4_I", title: "Física Mecânica", channel: "Cinemática, Dinâmica, Hidrostática, Estática e Energia|Desc…" },
    ],
    "Mecânica e energia": [
      { id: "hBarxlwHC3E", title: "REVISÃO ENEM - ENERGIA MECÂNICA - Cai muuuuuuuuito - DINÂMICA - #ENEM2021 - Parte 1", channel: "Professor Boaro" },
      { id: "KxRk36B6GiM", title: "ENERGIA MECÂNICA", channel: "03 QUESTÕES DO ENEM | FÍSICOS DO YT|FisicaInterativa.Com" },
    ],
    "Eletricidade": [
      { id: "dBvHnPucC0o", title: "Revisão ENEM - Física - Eletricidade - Aula 1", channel: "Estação 14 : Escola de Exatas" },
      { id: "CkXALA4TfME", title: "ELETROSTÁTICA COMPLETA ENEM 2025! Relâmpagos, Eletricidade e Tudo Mais (Mestres do ENEM)", channel: "Umberto Mannarino - Mestres do ENEM" },
      { id: "BP0lo1zroXM", title: "Dicas para o Enem: Eletricidade - Brasil Escola", channel: "Brasil Escola Oficial" },
    ],
  },
  "ENEM — Química": {
    "*": [
      { id: "18FqBaDH3fE", title: "AULÃO DE QUÍMICA PARA O ENEM", channel: "AULÃO DA SALVAÇÃO 2020|Curso Enem Gratuito" },
      { id: "jDy3UtqhLWU", title: "DICAS DE QUÍMICA PARA O ENEM - O QUE MAIS CAI? Prof. Jamal", channel: "Biologia com Samuel Cunha" },
    ],
    "Estequiometria": [
      { id: "vodua1lGa68", title: "ESTEQUIOMETRIA", channel: "Resumo de Química para o Enem|Curso Enem Gratuito" },
      { id: "VV6_UuhbSxU", title: "ESTEQUIOMETRIA: O QUE CAI NO VESTIBULAR?", channel: "QUÍMICA | QUER QUE DESENHE? | DESCOMPLICA|Descomplica" },
      { id: "x1tx_KZZW1M", title: "Tudo de Estequiometria para o ENEM 2026 (didática mágica + 100 questões)", channel: "Pedro Assaad | ENEM 2026" },
      { id: "qkpX7lVpx1o", title: "Estequiometria das soluções", channel: "Kuadro Oficial" },
      { id: "Y0tURaGV8ek", title: "ESTEQUIOMETRIA EXERCÍCIOS REVISÃO ENEM 2023", channel: "Café com química - Prof Michel" },
    ],
    "Química orgânica": [
      { id: "YLM9LtEaE4U", title: "AO VIVO", channel: "COM CERTEZA CAI NO ENEM: QUÍMICA ORGÂNICA | DESCOMPLICA|Des…" },
    ],
  },
  "ENEM — História": {
    "*": [
      { id: "cuHddXfinDE", title: "TODA A HISTÓRIA DO ENEM - REVISÃO (Débora Aladim)", channel: "Débora Aladim" },
      { id: "YvH0XoPyANA", title: "AULÃO ENEM DE GEOGRAFIA E HISTÓRIA: OS TEMAS QUE MAIS CAEM", channel: "AULÃO ENEM 2025|Curso Enem Gratuito" },
      { id: "LNX3JUXNUvk", title: "REVISÃO FINAL DE HISTÓRIA PARA O ENEM 2023! (Débora Aladim)", channel: "Débora Aladim" },
    ],
    "História do Brasil": [
      { id: "7HEKqvV2JiU", title: "TUDO de HISTÓRIA DO BRASIL pro ENEM 2026 (teoria + questões)", channel: "Pedro Assaad | ENEM 2026" },
      { id: "GmmljVXso4k", title: "REVISÃO DE HISTÓRIA DO BRASIL PARA O ENEM - RETA FINAL", channel: "Parabólica" },
      { id: "Q-EVuibh15A", title: "Revisão de História do Brasil", channel: "#8 História no ENEM|Aprova Total" },
      { id: "CSASP_SMiX0", title: "História do Brasil ENEM 2021 [Revisão]", channel: "Aprova Concursos" },
      { id: "PLMra4G0-Z7pPrbm9ztZLYffjG1QZskhqY", title: "HISTÓRIA DO BRASIL (2026)", channel: "Parabólica" },
      { id: "PLQVUQftDIJQH8qKoQP7vlSR2awzAlFpZR", title: "HISTÓRIA DO BRASIL", channel: "Curso Enem Gratuito" },
    ],
  },
  "ENEM — Geografia": {
    "*": [
      { id: "5w4MOmECfaA", title: "AULÃO ENEM DE GEOGRAFIA: 10 temas que mais caem", channel: "Aulão Enem 2024 | Eduardo e Carrieri|Curso Enem Gratuito" },
      { id: "Ie7oRolfIT4", title: "Como aprender GEOGRAFIA do ZERO - Guia completo", channel: "Toda Matéria" },
      { id: "YvH0XoPyANA", title: "AULÃO ENEM DE GEOGRAFIA E HISTÓRIA: OS TEMAS QUE MAIS CAEM", channel: "AULÃO ENEM 2025|Curso Enem Gratuito" },
    ],
    "Cartografia": [
      { id: "LpNzFhdhx6Q", title: "Tudo em 36 minutos", channel: "Tudo sobre CARTOGRAFIA | CICLO DAS ROCHAS e ESTUTURA DO REL…" },
    ],
    "Urbanização": [
      { id: "DZ95ahROrkI", title: "Urbanização (1/3) - Geografia - ENEM", channel: "MundoEdu ENEM" },
    ],
    "Geopolítica e globalização": [
      { id: "WNDyCmznAnc", title: "Geografia para ENEM: Geopolítica e Globalização - Prof. Saulo Takami", channel: "Estratégia ENEM e Vestibulares" },
      { id: "VYfMr7FcDq0", title: "Geopolítica", channel: "Descomplica" },
    ],
  },
  "ENEM — Filosofia e Sociologia": {
    "*": [
      { id: "oxApmqaXlsM", title: "AULÃO ENEM DE SOCIOLOGIA E FILOSOFIA: OS TEMAS QUE MAIS CAEM", channel: "AULÃO ENEM 2025|Curso Enem Gratuito" },
      { id: "vP7KgUbDDRg", title: "Tudo o que mais cai em Filosofia e Sociologia no Enem (MARATONA 1º DIA ENEM)", channel: "Repertório ENEM" },
      { id: "VWGC0fpzB4E", title: "AULÃO 2020 DE FILOSOFIA E SOCIOLOGIA PARA O ENEM", channel: "AULÃO DA SALVAÇÃO|Curso Enem Gratuito" },
      { id: "79cYGI9Aw-w", title: "Cai no ENEM: Filosofia e Sociologia", channel: "Me Salva! ENEM" },
      { id: "j1FP-cqSti8", title: "Revisão completa de Filosofia e Sociologia para o Enem 2023", channel: "ProEnem|Proenem - Enem 2026" },
    ],
    "Filosofia": [
      { id: "-UGqpU9v4bg", title: "Os conteúdos que mais caem em Filosofia no Enem pt. 1", channel: "Descomplica" },
      { id: "2BEQTC3QQPg", title: "O QUE MAIS CAI EM FILOSOFIA NO ENEM pt. 3", channel: "Descomplica" },
      { id: "bv9obMrnFyY", title: "SUPER REVISÃO DE FILOSOFIA MODERNA E CONTEMPORÂNEA PARA O ENEM", channel: "Parabólica" },
    ],
  },
  "ENEM — Língua Portuguesa": {
    "*": [
      { id: "eFTAnaw4RJU", title: "Como acertar QUALQUER questão de LINGUAGENS sem ter estudado NADA", channel: "ENEM 2026|Profinho" },
      { id: "OxTNN-IKcEQ", title: "Interpretação de Textos: Guia COMPLETO para Você ARRASAR na Interpretação!", channel: "Português sem Enrolação - Professora Lis" },
    ],
    "Interpretação de texto": [
      { id: "rf1lg2foSG4", title: "Compreensão x Interpretação no ENEM [Prof. Noslen] #professornoslen #enem", channel: "Professor Noslen" },
      { id: "XsN0e_xPyNI", title: "Compreensão e Interpretação de Texto – Revisão ENEM [Prof. Noslen]", channel: "Professor Noslen" },
      { id: "O0TTbXCTg-I", title: "Enem", channel: "Exercícios de Compreensão de Textos - Aula 1 [Prof. Noslen]…" },
      { id: "K-z7ADHR6Sc", title: "Compreensão e Interpretação Textual + Dicas", channel: "Português On-line l Profa. Aline" },
    ],
    "Gêneros textuais": [
      { id: "51Vj6uzsdaA", title: "Tipos e Gêneros Textuais – Revisão Enem com Prof. Noslen", channel: "Professor Noslen" },
      { id: "PEOKP3J2vfM", title: "Enem", channel: "Exercícios sobre Gêneros Textuais - [Professor Noslen] #pro…" },
    ],
  },
  "ENEM — Literatura": {
    "*": [
      { id: "yz8dlnRIEoU", title: "REVISÃO DE LITERATURA", channel: "ENEM 2021: Barroco, Romantismo, Realismo e Modernismo|Porta…" },
    ],
    "Modernismo": [
      { id: "wlnKLTTtVe0", title: "Modernismo e poesia no ENEM", channel: "Descomplica" },
      { id: "EidWKUcxEi4", title: "Literatura no Enem: 1ª Fase do Modernismo (Parte 1) - Brasil Escola", channel: "Brasil Escola Oficial" },
    ],
    "Do Barroco ao Romantismo": [
      { id: "bp2b9PKuKwI", title: "Do barroco ao Romantismo - síntese das escolas literárias", channel: "Profa Marijane Fernandes" },
      { id: "_ofKo0D0Jjo", title: "ROMANTISMO - RESUMO - CARACTERÍSTICAS - LITERATURA ENEM", channel: "Tatiany Leite do @Vá ler um Livro" },
    ],
  },
  "ENEM — Línguas Estrangeiras": {
    "*": [
      { id: "ULk68VD_IGs", title: "Inglês ou Espanhol no Enem? Veja como escolher", channel: "Stoodi" },
      { id: "vQsVCFxRCYM", title: "Como resolver questões de Espanhol e Inglês no Enem? (parte 2)", channel: "Prof. Felipe Pereira" },
      { id: "yH54CrIQbug", title: "PASSO a PASSO QUESTÕES ENEM #NoENEMComNoslen", channel: "Professor Noslen|Professor Noslen" },
    ],
    "Espanhol": [
      { id: "-lBJmM15Sqg", title: "Desvendando Prova de Linguagens do ENEM: Questões Reais de Espanhol", channel: "Profe Carlos Muchacho|Profe Carlos Muchacho" },
      { id: "5SlATZoSXss", title: "QUESTÕES de Espanhol do ENEM (parte 3)", channel: "Profe Carlos Muchacho|Profe Carlos Muchacho" },
    ],
    "Provas anteriores": [
      { id: "EFnLQVQXTWU", title: "Resolução Comentada - ENEM 2023 - 1º Dia - Língua Estrangeira", channel: "ObjetivoOficial" },
    ],
  },
  "ENEM — Como estudar": {
    "*": [
      { id: "8sSpJWCM2ic", title: "Como montar um CRONOGRAMA DE ESTUDOS pro ENEM (que FUNCIONA!)", channel: "Liliane Freitas" },
      { id: "v1VpVnUmwAE", title: "COMO MONTAR UM CRONOGRAMA DE ESTUDOS PARA O ENEM 2025", channel: "Melhor Cronograma Enem!!!|Duda Ferreira" },
      { id: "UqfL4JRUMdM", title: "ENEM 2026: Como COMEÇAR a ESTUDAR para o ENEM (do zero ao avançado)", channel: "Marcos Vasconcellos" },
      { id: "OCyPXUpjlro", title: "Como estudar para o ENEM 2026 do ZERO passo a passo", channel: "Bruna Geisiane" },
      { id: "PLP88ePMy1c", title: "COMO MONTAR UM CRONOGRAMA DE ESTUDOS PARA O ENEM 2026", channel: "Melhor Cronograma Enem!!!|Duda Ferreira" },
    ],
  },
};
