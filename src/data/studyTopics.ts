import { subjectAreas } from "@/lib/questionTopics";
/**
 * Assuntos de cada matéria para montar as sessões de estudo do cronograma.
 * São NOMES de assuntos recorrentes em editais policiais, em ordem didática (base → avançado).
 * Não contêm texto de lei: a conferência de vigência segue sendo feita no material da Biblioteca.
 */

const T = {
  portugues: [
    "Interpretação e compreensão de texto",
    "Tipologia e gêneros textuais",
    "Ortografia e acentuação gráfica",
    "Classes de palavras e emprego",
    "Concordância verbal e nominal",
    "Regência verbal e nominal",
    "Crase",
    "Pontuação",
    "Coesão e coerência textual",
    "Colocação pronominal",
    "Reescrita e substituição de trechos",
    "Significação das palavras",
    "Redação oficial",
  ],
  raciocinio: [
    "Proposições e conectivos lógicos",
    "Tabela-verdade e equivalências",
    "Negação de proposições",
    "Argumentação e diagramas lógicos",
    "Conjuntos",
    "Razão, proporção e regra de três",
    "Porcentagem",
    "Sequências e padrões",
    "Análise combinatória",
    "Probabilidade",
  ],
  constitucional: [
    "Princípios fundamentais",
    "Direitos e garantias individuais (art. 5º)",
    "Direitos sociais e nacionalidade",
    "Direitos políticos",
    "Organização do Estado",
    "Poder Executivo",
    "Poder Legislativo",
    "Poder Judiciário",
    "Segurança pública (art. 144)",
    "Controle de constitucionalidade",
  ],
  administrativo: [
    "Princípios da Administração Pública",
    "Poderes administrativos",
    "Atos administrativos",
    "Organização administrativa",
    "Agentes públicos e Lei 8.112/1990",
    "Licitações e contratos",
    "Responsabilidade civil do Estado",
    "Controle da Administração",
    "Processo administrativo (Lei 9.784/1999)",
  ],
  penal: [
    "Princípios e aplicação da lei penal",
    "Teoria do crime: fato típico",
    "Ilicitude e excludentes",
    "Culpabilidade",
    "Concurso de crimes e penas",
    "Crimes contra a pessoa",
    "Crimes contra o patrimônio",
    "Crimes contra a administração pública",
    "Extinção da punibilidade",
  ],
  processual: [
    "Inquérito policial",
    "Ação penal",
    "Provas",
    "Prisões e medidas cautelares",
    "Competência",
    "Nulidades",
    "Recursos",
    "Procedimentos e juizados",
  ],
  informatica: [
    "Hardware e software",
    "Sistemas operacionais (Windows e Linux)",
    "Redes e internet",
    "Navegadores e correio eletrônico",
    "Segurança da informação",
    "Malwares e ataques",
    "Backup e armazenamento",
    "Editores de texto e planilhas",
    "Computação em nuvem",
  ],
  transito: [
    "Sistema Nacional de Trânsito",
    "Normas gerais de circulação",
    "Habilitação",
    "Infrações",
    "Penalidades e medidas administrativas",
    "Crimes de trânsito",
    "Veículos e equipamentos",
    "Sinalização",
  ],
  fisica: [
    "Cinemática",
    "Dinâmica e leis de Newton",
    "Trabalho, energia e potência",
    "Estática e hidrostática",
    "Ondas e óptica",
    "Termologia",
    "Eletricidade",
  ],
  contabilidade: [
    "Conceitos e finalidades",
    "Patrimônio e equação fundamental",
    "Atos e fatos contábeis",
    "Contas e plano de contas",
    "Escrituração e partidas dobradas",
    "Regimes de caixa e competência",
    "Balancete de verificação",
    "Operações com mercadorias",
    "Balanço patrimonial",
    "DRE e demais demonstrações",
    "Estrutura conceitual e NBC TSP",
  ],
  estatistica: [
    "Medidas de posição",
    "Medidas de dispersão",
    "Distribuição de frequências",
    "Probabilidade",
    "Variáveis aleatórias",
    "Distribuição normal",
    "Correlação e regressão",
    "Amostragem e inferência",
  ],
  humanos: ["Teoria geral dos direitos humanos", "Tratados e convenções internacionais"],
  legislacao: [
    "Lei de Drogas (Lei 11.343/2006)",
    "Abuso de autoridade (Lei 13.869/2019)",
    "Organizações criminosas (Lei 12.850/2013)",
    "Estatuto da Criança e do Adolescente",
    "Lei de Migração (Lei 13.445/2017)",
  ],
  "legislacao-pf": [
    "Estatuto da Segurança Privada",
    "Controle de Produtos Químicos",
    "Lei de Migração",
    "Investigações de repercussão interestadual ou internacional",
    "Identificação civil",
    "Convenção de Budapeste",
  ],
  matematica: [
    "Porcentagem",
    "Razão, proporção e regra de três",
    "Equações e sistemas",
    "Geometria",
  ],
  financeira: ["Juros simples e compostos", "Descontos", "Equivalência de capitais"],
  publica: ["Contabilidade aplicada ao setor público", "Plano de contas aplicado ao setor público"],
  custos: ["Custos e despesas", "Métodos de custeio"],
  atualidades: [
    "Política nacional e internacional",
    "Economia e finanças públicas",
    "Segurança pública no Brasil",
    "Meio ambiente e sustentabilidade",
    "Tecnologia e sociedade",
  ],
  medicina: [
    "Tanatologia",
    "Traumatologia forense",
    "Local de crime e preservação",
    "Cadeia de custódia",
    "Perícias criminais",
    "Identificação humana",
  ],
  idiomas: [
    "Geopolítica brasileira e fronteiras",
    "Interpretação de textos em inglês",
    "Vocabulário e estruturas básicas",
  ],
  etica: [
    "Ética no serviço público",
    "Cidadania e direitos fundamentais",
    "Direitos humanos e atividade policial",
  ],
} as const;

const strip = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Assuntos da matéria, em ordem. Nomes compostos ("Penal e Processual Penal") juntam as listas. */
export function topicsFor(subject: string): string[] {
  const n = strip(subject);
  const out: string[] = [];
  const add = (list: readonly string[]) => out.push(...list);
  for (const area of subjectAreas(subject)) {
    if (area in T) add(T[area as keyof typeof T]);
  }
  if (/ingles/.test(n)) add(T.idiomas.filter((topic) => !topic.startsWith("Geopolítica")));
  return out.length
    ? [...new Set(out)]
    : ["Conceitos fundamentais", "Pontos mais cobrados em provas", "Questões comentadas da banca"];
}
