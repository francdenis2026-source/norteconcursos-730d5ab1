export interface EssayModel {
  id: string;
  tipo: string;
  tema: string;
  estudoDeCaso: string;
  paragrafos: { papel: string; texto: string }[];
  porQueFunciona: string[];
}

export const ESSAY_MODELS: EssayModel[] = [
  {
    id: "faccoes-presidios",
    tipo: "Dissertativo-argumentativa",
    tema: "O papel das facções criminosas no sistema prisional brasileiro",
    estudoDeCaso:
      "Estudo de caso: a expansão de facções nacionais a partir dos presídios, com recrutamento de presos em busca de proteção e comando de ações fora das unidades.",
    paragrafos: [
      {
        papel: "Introdução — contexto e tese",
        texto:
          "O sistema prisional brasileiro, concebido para ressocializar, tornou-se em muitos estados um território onde facções criminosas organizam, recrutam e comandam atividades ilícitas. Esse cenário, agravado pela superlotação e pela fragilidade do controle estatal, compromete a segurança pública e frustra a finalidade da pena prevista na Lei de Execução Penal.",
      },
      {
        papel: "Desenvolvimento 1 — causa",
        texto:
          "Em primeiro lugar, a ausência do Estado dentro das unidades abre espaço para a lógica da proteção mútua. Presos sem vaga, sem assistência jurídica e sem separação por risco aderem a grupos organizados para sobreviver, e a dívida de lealdade os acompanha após a soltura. Assim, o cárcere funciona como porta de entrada, e não de saída, da criminalidade.",
      },
      {
        papel: "Desenvolvimento 2 — consequência e caso",
        texto:
          "Além disso, o caso das facções nacionais expandidas a partir de presídios mostra que ordens emitidas de dentro das unidades por celulares chegam às ruas, sustentando o tráfico de drogas e de armas e a lavagem de dinheiro. Dessa forma, o problema deixa de ser apenas penitenciário e passa a desafiar toda a segurança pública, exigindo atuação integrada das polícias, do Ministério Público e do Judiciário.",
      },
      {
        papel: "Conclusão — proposta de intervenção",
        texto:
          "Portanto, cabe ao Poder Executivo, por meio das secretarias de administração penitenciária, instalar bloqueadores de sinal, scanners corporais e a separação de presos por perfil de risco, a fim de reduzir o comando criminoso intramuros. Cabe ainda à União financiar a inteligência integrada com as polícias e o Ministério Público, e ampliar o trabalho e o estudo dos custodiados, de modo a retomar o controle do cárcere e restituir sua função ressocializadora.",
      },
    ],
    porQueFunciona: [
      "Tese clara já na introdução, ligada ao tema.",
      "Cada parágrafo de desenvolvimento tem uma ideia central e um conectivo de progressão.",
      "O caso concreto sustenta o argumento sem virar narrativa.",
      "A proposta responde: quem faz, o que faz, como e para quê.",
    ],
  },
  {
    id: "policiamento-comunitario",
    tipo: "Dissertativo-argumentativa",
    tema: "Confiança da população e eficiência do policiamento comunitário",
    estudoDeCaso:
      "Estudo de caso: bases comunitárias e policiamento de proximidade, que aproximam policiais e moradores e ampliam a coleta de informações para a prevenção de crimes.",
    paragrafos: [
      {
        papel: "Introdução — contexto e tese",
        texto:
          "A segurança pública, direito e responsabilidade de todos nos termos do artigo 144 da Constituição Federal, não se constrói apenas com repressão. Experiências de policiamento comunitário mostram que a confiança entre a população e a polícia é condição para a eficiência da prevenção, o que torna a aproximação institucional uma estratégia prioritária.",
      },
      {
        papel: "Desenvolvimento 1 — argumento",
        texto:
          "Em primeiro lugar, comunidades que confiam na polícia denunciam mais e colaboram com a elucidação de crimes. Quando o policial é conhecido pelo bairro, a informação flui de forma espontânea, reduzindo o tempo de resposta e orientando o patrulhamento para os pontos de real risco, em vez de ações genéricas e de alto custo.",
      },
      {
        papel: "Desenvolvimento 2 — caso e contraponto",
        texto:
          "Por outro lado, a implantação de bases comunitárias, quando feita sem continuidade, gera descrédito: o policial é transferido, o vínculo se rompe e a população volta a ver a corporação como ameaça. Logo, o êxito do modelo depende de permanência das equipes, de formação em mediação de conflitos e de metas que valorizem a prevenção, e não apenas o número de prisões.",
      },
      {
        papel: "Conclusão — proposta de intervenção",
        texto:
          "Assim, compete às secretarias de segurança pública garantir a permanência dos policiais nas bases por prazo mínimo, incluir disciplinas de direitos humanos e mediação na formação continuada e criar conselhos comunitários de segurança que avaliem os resultados periodicamente. Com essas medidas, será possível consolidar a confiança mútua e tornar a prevenção mais eficiente e menos custosa.",
      },
    ],
    porQueFunciona: [
      "Cita o fundamento constitucional (art. 144) com precisão e sem excesso.",
      "Apresenta um contraponto, o que demonstra maturidade argumentativa.",
      "A proposta tem agentes, ações e finalidade definidos.",
    ],
  },
  {
    id: "crimes-ciberneticos",
    tipo: "Dissertativo-argumentativa",
    tema: "Crimes cibernéticos e os desafios da investigação policial",
    estudoDeCaso:
      "Estudo de caso: golpes bancários por engenharia social e fraudes digitais em larga escala, com autores em outros estados ou países e provas voláteis.",
    paragrafos: [
      {
        papel: "Introdução — contexto e tese",
        texto:
          "A digitalização de serviços financeiros e sociais ampliou as oportunidades para a criminalidade virtual. Fraudes bancárias, invasões de dispositivos e golpes de engenharia social cresceram no país e expõem um descompasso entre a velocidade dos criminosos e a capacidade de resposta das instituições de segurança pública.",
      },
      {
        papel: "Desenvolvimento 1 — desafio investigativo",
        texto:
          "Em primeiro lugar, a investigação enfrenta provas voláteis e autores dispersos geograficamente. Dados que não são preservados com rapidez desaparecem, e a cooperação com provedores e instituições financeiras, quando depende de longos trâmites, favorece a impunidade. A cadeia de custódia da prova digital, exigida pelo Código de Processo Penal, também demanda peritos e ferramentas que muitas unidades não possuem.",
      },
      {
        papel: "Desenvolvimento 2 — caso e prevenção",
        texto:
          "Nos golpes por engenharia social, a vítima entrega voluntariamente seus dados, o que mostra que a repressão, isoladamente, é insuficiente. Faltam campanhas educativas contínuas e canais ágeis de registro, que permitam bloquear valores antes que sejam dissipados em contas de passagem.",
      },
      {
        papel: "Conclusão — proposta de intervenção",
        texto:
          "Dessa maneira, cabe ao Ministério da Justiça e Segurança Pública fomentar delegacias e peritos especializados e firmar protocolos com bancos e provedores para o bloqueio célere de valores e a preservação de dados. Cabe, ainda, às escolas e aos meios de comunicação promover educação digital permanente, a fim de reduzir o número de vítimas e fortalecer a investigação.",
      },
    ],
    porQueFunciona: [
      "Une o problema técnico (prova digital) ao problema humano (engenharia social).",
      "Usa legislação de forma pertinente, sem citar artigos de que não tem certeza.",
      "Proposta com mais de um agente, todos com ação concreta.",
    ],
  },
];

export const ESSAY_SKELETON = [
  {
    titulo: "Introdução (3 a 5 linhas)",
    itens: [
      "Contextualize o tema com um dado, fato ou fundamento legal.",
      "Apresente a tese: sua posição sobre o problema.",
      "Evite copiar o enunciado e evite perguntas retóricas.",
    ],
  },
  {
    titulo: "Desenvolvimento 1 (6 a 8 linhas)",
    itens: [
      "Tópico frasal com a ideia central.",
      "Argumento + explicação + exemplo ou estudo de caso.",
      "Feche ligando ao tema.",
    ],
  },
  {
    titulo: "Desenvolvimento 2 (6 a 8 linhas)",
    itens: [
      "Segundo argumento, causa ou consequência diferente do primeiro.",
      "Se couber, apresente um contraponto e responda a ele.",
      "Mantenha o fio condutor com conectivos (além disso, por outro lado, dessa forma).",
    ],
  },
  {
    titulo: "Conclusão / proposta (4 a 6 linhas)",
    itens: [
      "Quem: agente responsável (órgão, poder, instituição).",
      "O quê e como: ação concreta e meio de execução.",
      "Para quê: finalidade que resolve o problema da tese.",
    ],
  },
];

export const ESSAY_CHECKLIST = [
  "Li o comando e identifiquei os tópicos exigidos pelo edital.",
  "Respeitei o limite de linhas e escrevi à mão, com letra legível.",
  "Usei linguagem formal, impessoal e sem gírias.",
  "Cada parágrafo tem uma ideia central.",
  "Usei conectivos e evitei repetir palavras.",
  "Revisei concordância, crase, pontuação e ortografia.",
  "Não citei lei ou artigo de que não tenho certeza.",
  "Não fugi do tema nem copiei os textos de apoio.",
];
