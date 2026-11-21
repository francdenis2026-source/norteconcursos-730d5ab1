import { norm } from "@/lib/editalRadar";

export type StudyPriorityLevel = "muito-alta" | "alta" | "media";
export type StudyPriority = { level: StudyPriorityLevel; top20: boolean };

/** Perfis por edital. Um edital só recebe selos quando há uma matriz explícita e validada. */
const PCAC_PROFILE = {
  id: "pcac",
  matches: (name: string) => /pc.?ac|policia civil.*acre|acre.*policia civil/.test(norm(name)),
  disciplines: [
    { names: ["contabilidade", "análise financeira"], very: ["ativo", "passivo", "patrimônio líquido", "equação fundamental", "extrato bancário", "pix", "ted", "depósitos", "transferências", "origem e destino", "movimentações financeiras", "fracionadas", "recorrentes", "conciliação", "cruzamento de movimentações"], high: ["contas patrimoniais", "contas de resultado", "débito e crédito", "partidas dobradas", "balanço patrimonial", "dre", "regime de caixa", "competência"], top: ["ativo", "passivo", "patrimônio líquido", "movimentações financeiras", "extrato bancário", "pix"] },
    { names: ["estatística"], very: ["população", "amostra", "variáveis qualitativas", "variáveis quantitativas", "frequência absoluta", "frequência relativa", "frequência acumulada", "tabelas", "gráficos", "média aritmética", "mediana", "moda", "variância", "desvio-padrão", "correlação"], high: ["amostragem", "coeficiente de variação", "quartis", "decis", "percentis", "probabilidade condicional", "independência de eventos", "regressão linear", "séries temporais", "tendências", "outliers", "indicadores"], top: ["média", "mediana", "moda", "variância", "desvio-padrão", "probabilidade", "frequência", "gráficos", "tabelas"] },
    { names: ["tecnologia da informação", "segurança da informação", "ti e segurança"], very: ["segurança da informação", "confidencialidade", "integridade", "disponibilidade", "autenticação", "controle de acesso", "redes de computadores", "endereçamento ip", "bancos de dados", "planilhas eletrônicas", "metadados", "cruzamento de informações"], high: ["criptografia", "backup", "proteção de informações", "protocolos", "tabelas", "registros", "relacionamentos", "consultas", "filtros", "fórmulas", "funções do excel", "tabelas dinâmicas", "arquivos duplicados"], top: ["segurança da informação", "phishing", "criptografia", "autenticação", "ip", "redes", "bancos de dados", "metadados", "arquivos digitais"] },
    { names: ["análise de dados", "informações"], very: ["duplicidades", "inconsistências", "cruzamento de informações", "padrões", "recorrências", "análise temporal", "linhas do tempo", "vínculos", "registros de comunicação", "fatos", "inferências", "hipóteses"], high: ["dados estruturados", "dados não estruturados", "confiabilidade", "qualidade das informações", "organização", "classificação de dados", "redes de relacionamento", "frequência", "duração", "sequência de contatos", "análise geográfica", "coordenadas", "correlação", "causalidade", "relatórios analíticos"], medium: ["distâncias", "trajetos"], top: ["cruzamento de dados", "análise de vínculos", "registros de comunicação", "análise temporal"] },
    { names: ["arquivologia"], very: ["três idades", "arquivos correntes", "arquivos intermediários", "arquivos permanentes", "gestão documental", "métodos de arquivamento", "tabelas de temporalidade", "documentos digitais"], high: ["princípios arquivísticos", "natureza e finalidade", "protocolo", "tramitação", "classificação de documentos", "avaliação", "destinação documental", "metadados", "indexação", "autenticidade", "integridade documental", "documentos sigilosos"], medium: ["conservação", "preservação"] },
    { names: ["administração"], very: ["planejamento, organização", "direção e controle", "podc", "eficiência", "eficácia", "efetividade"], high: ["conceitos e princípios", "estruturas organizacionais", "gestão de processos", "padronização de rotinas", "controle de atividades", "gestão da informação", "gestão do conhecimento", "ética", "comportamento profissional"], medium: ["divisão do trabalho", "comunicação organizacional", "trabalho em equipe", "gestão do tempo", "prioridades", "recursos materiais", "atendimento ao público"] },
    { names: ["língua portuguesa", "português"], very: ["interpretação", "compreensão textual", "sintaxe", "coordenação", "subordinação", "pontuação"], high: ["concordância", "reescrita", "coesão", "coerência", "conectivos", "relações de sentido", "classes de palavras", "regência", "crase", "significação contextual"], medium: ["colocação pronominal", "figuras de linguagem", "ortografia", "acentuação"], top: ["interpretação textual", "sintaxe"] },
    { names: ["raciocínio lógico"], very: ["proposições", "conectivos lógicos", "tabelas-verdade", "negação de proposições", "equivalências lógicas", "porcentagem", "probabilidade"], high: ["argumentação lógica", "verdades e mentiras", "razão e proporção", "regra de três", "análise combinatória", "sequências numéricas", "média aritmética", "gráficos", "tabelas"], medium: ["progressões aritméticas", "progressões geométricas"], top: ["proposições", "negações", "equivalências"] },
    { names: ["informática"], very: ["excel", "libreoffice calc", "fórmulas", "funções", "filtros", "classificação", "tabelas dinâmicas", "smtp", "pop3", "imap", "phishing", "falsificação de remetente", "segurança", "proteção de dados"], high: ["windows 11", "linux ubuntu", "arquivos e pastas", "word", "writer", "internet", "navegadores", "https", "certificados digitais", "computação em nuvem", "microsoft 365", "google workspace", "autenticação", "autorização"], medium: ["powerpoint", "impress"] },
    { names: ["realidade do acre", "realidade do estado do acre"], very: ["revolução acreana", "tratado de petrópolis", "ciclos da borracha", "chico mendes", "municípios", "regionais", "segurança pública", "regiões de fronteira"], high: ["formação do acre", "reservas extrativistas", "fronteiras", "limites", "bacias hidrográficas", "povos indígenas", "economia", "produção extrativista", "constituição estadual", "organização dos poderes"], medium: ["clima", "relevo", "vegetação"], top: ["história do acre", "revolução acreana"] },
    { names: ["direito penal", "processo penal"], very: ["aplicação da lei penal", "teoria do crime", "tipicidade", "ilicitude", "culpabilidade", "consumação", "tentativa", "concurso de pessoas", "crimes contra o patrimônio", "administração pública", "abuso de autoridade", "inquérito policial", "características do inquérito", "provas", "cadeia de custódia", "prisão em flagrante", "prisão preventiva", "prisão temporária"], high: ["crimes contra a pessoa", "dignidade sexual", "fé pública", "tortura", "exame de corpo de delito", "peritos", "intérpretes", "identificação criminal", "medidas cautelares"], top: ["teoria do crime", "inquérito policial", "prisões", "medidas cautelares", "cadeia de custódia"] },
    { names: ["legislação institucional"], very: ["14.735", "lei orgânica nacional", "129/2004", "lei orgânica da pcac", "39/1993", "estatuto dos servidores"], high: ["2.250/2009", "plano de cargos", "carreiras"], top: ["lei orgânica nacional", "lei orgânica da pcac"] },
    { names: ["direito constitucional"], very: ["princípios fundamentais", "direitos e garantias", "remédios constitucionais", "art. 37", "arts. 37", "administração pública", "art. 144", "segurança pública", "constituição do acre", "polícia civil"], high: ["direitos e deveres coletivos", "servidores públicos"] },
    { names: ["direito administrativo", "noções de direito administrativo"], very: ["princípios da administração", "poderes administrativos", "poder de polícia", "polícia administrativa", "polícia judiciária", "atos administrativos"], high: ["administração direta", "administração indireta", "centralização", "descentralização", "agentes públicos", "responsabilidade civil", "improbidade administrativa"] },
  ] as const,
};

const PROFILES = [PCAC_PROFILE];

const normalize = (value: string) => norm(value).replace(/\s+/g, " ").trim();
const matchesAny = (text: string, terms: readonly string[]) =>
  terms.some((term) => normalize(text).includes(normalize(term)));

function disciplineProfile(discipline: string) {
  const key = normalize(discipline);
  return PCAC_PROFILE.disciplines.find((entry) => entry.names.some((name) => key.includes(normalize(name))));
}

/** Retorna null para editais sem matriz própria: não inventa classificação para outro concurso. */
export function studyPriorityFor(
  contestName: string | null | undefined,
  discipline: string,
  topic: string,
): StudyPriority | null {
  const contest = contestName?.trim() ?? "";
  const profile = PROFILES.find((entry) => entry.matches(contest));
  if (!profile) return null;
  const rule = disciplineProfile(discipline);
  if (!rule) return null;
  const text = normalize(topic);
  const very = "very" in rule ? rule.very : [];
  const high = "high" in rule ? rule.high : [];
  const medium = "medium" in rule ? rule.medium : [];
  const top = "top" in rule ? rule.top : [];
  const isTop20 = matchesAny(text, top);
  if (matchesAny(text, very)) return { level: "muito-alta", top20: isTop20 };
  if (matchesAny(text, high)) return { level: "alta", top20: isTop20 };
  if (matchesAny(text, medium)) return { level: "media", top20: isTop20 };
  return { level: "media", top20: isTop20 };
}

export function studyPriorityLabel(priority: StudyPriority) {
  return priority.level === "muito-alta"
    ? "Prioridade muito alta"
    : priority.level === "alta"
      ? "Prioridade alta"
      : "Prioridade média";
}
