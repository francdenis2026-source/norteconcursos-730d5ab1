/** Explicitly reviewed curricular links. A shared topic is not proof that two texts are duplicates.
 * Only published materials returned by the catalog can replace the short introductory lesson.
 * Keep route/lesson IDs and their completion keys stable; never infer links by title similarity.
 */
export const TRACK_MATERIALS: Record<string, Record<string, readonly string[]>> = {
  contabilidade: {
    "conceito-objetivo": ["contabilidade-conceito-objeto-usuarios"],
    "patrimonio-componentes": ["contabilidade-patrimonio-equacao-fundamental"],
    "equacao-fundamental": ["contabilidade-patrimonio-equacao-fundamental"],
    "atos-fatos": ["contabilidade-atos-fatos-contabeis"],
    "tipos-fatos": ["contabilidade-atos-fatos-contabeis"],
    "contas-debito-credito": ["contabilidade-contas-plano-de-contas"],
    "contas-natureza": ["contabilidade-contas-plano-de-contas"],
    "plano-contas": ["contabilidade-contas-plano-de-contas"],
    "escrituracao-lancamento": ["contabilidade-escrituracao-partidas-dobradas-livros"],
    "livros-metodos": ["contabilidade-escrituracao-partidas-dobradas-livros"],
    "competencia-caixa": ["contabilidade-regimes-caixa-competencia"],
    "compras-vendas": ["contabilidade-mercadorias-cmv-resultado-bruto"],
    "juros-descontos": ["contabilidade-lancamentos-operacoes-diversas"],
    "tributos-folha": ["contabilidade-lancamentos-operacoes-diversas"],
    provisoes: ["contabilidade-provisoes-passivo-contingente-epcld"],
    "depreciacao-baixa": [
      "contabilidade-depreciacao-amortizacao-exaustao",
      "contabilidade-impairment-cpc-01-baixa-ativos",
    ],
    balancete: ["contabilidade-balancete-verificacao"],
    "balanco-patrimonial": ["contabilidade-balanco-patrimonial-estrutura"],
    dre: ["contabilidade-dre-dfc-dva-lei-6404"],
    "lei-6404": ["contabilidade-demonstracoes-contabeis-lei-6404"],
  },
  informatica: {
    "internet-intranet": ["informatica-internet-intranet-vpn"],
    "navegadores-email": [
      "informatica-navegadores-privacidade-download",
      "informatica-email-smtp-pop-imap",
    ],
    "sistemas-operacionais": [
      "informatica-windows-arquivos-suporte",
      "informatica-linux-comandos-diretorios",
      "informatica-linux-permissoes-rwx",
    ],
    "office-libreoffice": [
      "informatica-word-writer-formatos-estilos",
      "informatica-excel-referencias-funcoes",
      "informatica-powerpoint-impress-apresentacoes",
    ],
    "osi-tcpip": ["informatica-osi-tcp-ip-camadas"],
    protocolos: ["informatica-protocolos-dns-dhcp-http"],
    malwares: ["informatica-malware-antivirus-firewall"],
    defesas: ["informatica-malware-antivirus-firewall", "informatica-seguranca-cid-controles"],
  },
  portugues: {
    "pt-coesao": ["portugues-coesao-reescrita-sentido"],
  },
  "raciocinio-logico": {
    "rl-proposicoes": ["rlm-proposicoes-negacao-condicionais"],
    "rl-equivalencias": ["rlm-proposicoes-negacao-condicionais"],
    "rl-conjuntos": ["rlm-conjuntos-quantificadores"],
    "rl-combinatoria": ["rlm-contagem-probabilidade-basica"],
    "rl-probabilidade": ["rlm-contagem-probabilidade-basica"],
  },
  constitucional: {
    "cf-principios": ["constitucional-principios-fundamentais-federacao-republica"],
    "cf-direitos-individuais": [
      "constitucional-direitos-fundamentais-teoria-geral",
      "constitucional-vida-igualdade",
      "constitucional-liberdades-constitucionais",
      "constitucional-propriedade-funcao-social",
      "constitucional-seguranca-juridica-processo",
    ],
    "cf-remedios": ["constitucional-remedios-constitucionais"],
    "cf-sociais-nacionalidade": [
      "constitucional-direitos-sociais-trabalho",
      "constitucional-nacionalidade-medidas-retirada",
    ],
    "cf-politicos": ["constitucional-direitos-politicos-elegibilidade"],
    "cf-organizacao": ["constitucional-organizacao-estado-competencias"],
    // Judicial review is not fully covered by the judicial-career/CNJ modules.
  },
  administrativo: {
    "adm-principios": ["administrativo-fundamentos-fontes-regime-juridico"],
    "adm-poderes": [
      "administrativo-poderes-vinculado-discricionario-hierarquico",
      "administrativo-poder-de-policia-ciclo-prescricao",
    ],
    "adm-atos": ["administrativo-atos-administrativos-requisitos-atributos"],
    "adm-organizacao": ["administrativo-organizacao-direta-indireta-orgaos"],
    "adm-servidores": [
      "servidores-lei-8112-posse-exercicio-vacancia-remocao",
      "servidores-lei-8112-pad-sindicancia-ritos-prescricao",
    ],
    "adm-licitacoes": [
      "administrativo-licitacoes-lei-14133-modalidades",
      "administrativo-contratos-administrativos-lei-14133",
    ],
    "adm-responsabilidade": ["administrativo-responsabilidade-civil-do-estado"],
    "adm-processo": [
      "administrativo-controle-da-administracao-publica",
      "administrativo-processo-administrativo-lei-9784",
    ],
  },
  // These tracks explicitly use the ENEM matrix; keep that scope on their target materials.
  matematica: {
    "mat-proporcoes": ["enem-matematica-fundamentos"],
    "mat-geometria": ["enem-geometria-aplicacoes"],
    "mat-dados": ["enem-estatistica-aplicacoes"],
    "mat-probabilidade": ["enem-probabilidade-aplicacoes"],
    "mat-funcoes": ["enem-funcoes-aplicacoes"],
  },
  fisica: { "fis-grandezas-energia": ["enem-fisica-fundamentos"] },
  quimica: { "qui-materia-quantidades": ["enem-quimica-fundamentos"] },
  ingles: { "ing-leitura-contexto": ["enem-ingles-fundamentos"] },
};

type PublishedMaterial = { slug: string; content_status: string };
export function materialsForTrackLesson<T extends PublishedMaterial>(
  track: string,
  lesson: string,
  materials: readonly T[],
): T[] {
  const slugs = TRACK_MATERIALS[track]?.[lesson];
  if (!slugs?.length) return [];
  const published = new Map(
    materials.filter((m) => m.content_status === "active").map((m) => [m.slug, m]),
  );
  // A multi-part lesson must never hide its remainder because only one target is available.
  if (!slugs.every((slug) => published.has(slug))) return [];
  return slugs.map((slug) => published.get(slug)!);
}

/** These materials complement the lesson but do not replace all its topics. */
export const PARTIAL_TRACK_MATERIALS = new Set([
  "contabilidade:tributos-folha",
  "informatica:navegadores-email",
  "informatica:sistemas-operacionais",
  "informatica:protocolos",
  "informatica:defesas",
]);
export const isIntegratedTrackLesson = (track: string, lesson: string) =>
  Boolean(TRACK_MATERIALS[track]?.[lesson]?.length) &&
  !PARTIAL_TRACK_MATERIALS.has(`${track}:${lesson}`);
