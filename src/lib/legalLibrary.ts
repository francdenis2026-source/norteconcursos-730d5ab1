import type { LegalBasis } from "./questionFormat";
export const LEGAL_GROUPS = ["Legislação penal extravagante", "Direito Penal — Código Penal", "Direito Processual Penal — CPP", "Trânsito — CTB", "Proteção de pessoas e violência doméstica", "Legislação específica da Polícia Federal", "Proteção social — pensões", "Direitos humanos — uso da força"] as const;
export const LEGAL_LIBRARY = [
  {
    "slug": "cin",
    "material_slug": "legislacao-cin-revisao",
    "title": "Decreto 10.977/2022 — Carteira de Identidade Nacional",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d10977.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "seguranca-privada",
    "material_slug": "legislacao-seguranca-privada-revisao",
    "title": "Lei 14.967/2024 — Estatuto da Segurança Privada",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "codigo-penal",
    "material_slug": "penal-principios-direito-penal",
    "title": "Código Penal — leitura atualizada",
    "source_url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
    "group": "Direito Penal — Código Penal"
  },
  {
    "slug": "armas",
    "material_slug": "legislacao-armas-revisao",
    "title": "Lei 10.826/2003 — Estatuto do Desarmamento",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826compilado.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "lep",
    "material_slug": "legislacao-lep-revisao",
    "title": "Lei 7.210/1984 — Lei de Execução Penal",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "organizacoes",
    "material_slug": "legislacao-organizacoes-revisao",
    "title": "Lei 12.850/2013 — Organizações Criminosas",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "terrorismo",
    "material_slug": "legislacao-terrorismo-revisao",
    "title": "Lei 13.260/2016 — Lei Antiterrorismo",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13260.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "idosa",
    "material_slug": "legislacao-idosa-revisao",
    "title": "Lei 10.741/2003 — Estatuto da Pessoa Idosa",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm",
    "group": "Proteção de pessoas e violência doméstica"
  },
  {
    "slug": "contravencoes",
    "material_slug": "legislacao-contravencoes-revisao",
    "title": "Decreto-Lei 3.688/1941 — Lei das Contravenções Penais",
    "source_url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3688.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "identificacao-criminal",
    "material_slug": "legislacao-identificacao-criminal-revisao",
    "title": "Lei 12.037/2009 — Identificação Criminal",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "quimicos",
    "material_slug": "legislacao-quimicos-revisao",
    "title": "Lei 10.357/2001 — Controle de Produtos Químicos",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10357.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "pf-interestadual",
    "material_slug": "legislacao-pf-interestadual-revisao",
    "title": "Lei 10.446/2002 — Investigações de repercussão interestadual ou internacional",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/2002/l10446.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "abuso",
    "material_slug": "legislacao-abuso-revisao",
    "title": "Lei 13.869/2019 — Abuso de Autoridade",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869compilado.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "icn",
    "material_slug": "legislacao-icn-revisao",
    "title": "Lei 13.444/2017 — Identificação Civil Nacional",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13444.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "antifaccao",
    "material_slug": "legislacao-antifaccao-marco-legal",
    "title": "Lei antifacção — leitura integral",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15358.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "eca",
    "material_slug": "legislacao-eca-revisao",
    "title": "Lei 8.069/1990 — Estatuto da Criança e do Adolescente",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm",
    "group": "Proteção de pessoas e violência doméstica"
  },
  {
    "slug": "migracao",
    "material_slug": "legislacao-migracao-revisao",
    "title": "Lei 13.445/2017 — Lei de Migração",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "racismo",
    "material_slug": "legislacao-racismo-revisao",
    "title": "Lei 7.716/1989 — Crimes de Racismo e Preconceito",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l7716.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "pcd",
    "material_slug": "legislacao-pcd-revisao",
    "title": "Lei 13.146/2015 — Estatuto da Pessoa com Deficiência",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm",
    "group": "Proteção de pessoas e violência doméstica"
  },
  {
    "slug": "maria-penha",
    "material_slug": "legislacao-maria-penha-revisao",
    "title": "Lei 11.340/2006 — Lei Maria da Penha",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm",
    "group": "Proteção de pessoas e violência doméstica"
  },
  {
    "slug": "hediondos",
    "material_slug": "legislacao-hediondos-revisao",
    "title": "Lei 8.072/1990 — Crimes Hediondos",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l8072.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "lavagem",
    "material_slug": "legislacao-lavagem-revisao",
    "title": "Lei 9.613/1998 — Lavagem de Dinheiro",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9613.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "trafico-pessoas",
    "material_slug": "legislacao-trafico-pessoas-revisao",
    "title": "Lei 13.344/2016 — Tráfico de Pessoas",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13344.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "interceptacao",
    "material_slug": "legislacao-interceptacao-revisao",
    "title": "Lei 9.296/1996 — Interceptação Telefônica",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9296.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "transito",
    "material_slug": "legislacao-transito-revisao",
    "title": "Lei 9.503/1997 — Código de Trânsito Brasileiro",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm",
    "group": "Trânsito — CTB"
  },
  {
    "slug": "henry-borel",
    "material_slug": "legislacao-henry-borel-revisao",
    "title": "Lei 14.344/2022 — Lei Henry Borel",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14344.htm",
    "group": "Proteção de pessoas e violência doméstica"
  },
  {
    "slug": "sic",
    "material_slug": "legislacao-sic-revisao",
    "title": "Decreto 11.797/2023 — Serviço de Identificação do Cidadão",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11797.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "delegado",
    "material_slug": "legislacao-delegado-revisao",
    "title": "Lei 12.830/2013 — Investigação conduzida pelo Delegado",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "tortura",
    "material_slug": "legislacao-tortura-revisao",
    "title": "Lei 9.455/1997 — Crimes de Tortura",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9455.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "codigo-processo-penal",
    "material_slug": "processo-penal-cpp-provas-flagrante-revisao",
    "title": "Código de Processo Penal — leitura atualizada",
    "source_url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm",
    "group": "Direito Processual Penal — CPP"
  },
  {
    "slug": "pensao-regulamento",
    "material_slug": "legislacao-pensao-especial-feminicidio",
    "title": "Pensão especial — regulamentação — leitura integral",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12636.htm",
    "group": "Proteção social — pensões"
  },
  {
    "slug": "identidade",
    "material_slug": "legislacao-identidade-revisao",
    "title": "Lei 7.116/1983 — Carteira de Identidade",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/1980-1988/l7116.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "ambientais",
    "material_slug": "legislacao-ambientais-revisao",
    "title": "Lei 9.605/1998 — Crimes Ambientais",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9605.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "testemunhas",
    "material_slug": "legislacao-testemunhas-revisao",
    "title": "Lei 9.807/1999 — Proteção a Vítimas e Testemunhas",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9807.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "temporaria",
    "material_slug": "legislacao-temporaria-revisao",
    "title": "Lei 7.960/1989 — Prisão Temporária",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l7960.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "budapeste",
    "material_slug": "legislacao-budapeste-revisao",
    "title": "Decreto 11.491/2023 — Convenção de Budapeste",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11491.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "juizados",
    "material_slug": "legislacao-juizados-revisao",
    "title": "Lei 9.099/1995 — Juizados Especiais Cíveis e Criminais",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9099.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "cpf",
    "material_slug": "legislacao-cpf-revisao",
    "title": "Lei 14.534/2023 — CPF como identificador único",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14534.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "drogas",
    "material_slug": "legislacao-drogas-revisao",
    "title": "Lei 11.343/2006 — Lei de Drogas",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm",
    "group": "Legislação penal extravagante"
  },
  {
    "slug": "ric",
    "material_slug": "legislacao-ric-revisao",
    "title": "Lei 9.454/1997 — Registro de Identidade Civil",
    "source_url": "https://www.planalto.gov.br/ccivil_03/leis/l9454.htm",
    "group": "Legislação específica da Polícia Federal"
  },
  {
    "slug": "menor-potencial-ofensivo",
    "material_slug": "legislacao-menor-potencial-ofensivo-revisao",
    "title": "Lei 13.060/2014 — Instrumentos de Menor Potencial Ofensivo",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm",
    "group": "Direitos humanos — uso da força"
  },
  {
    "slug": "uso-forca",
    "material_slug": "legislacao-uso-forca-revisao",
    "title": "Decreto 12.341/2024 — Uso Diferenciado da Força",
    "source_url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm",
    "group": "Direitos humanos — uso da força"
  }
] as const;
export function legalLibraryEntry(slug: string) { return LEGAL_LIBRARY.find(entry => entry.slug === slug); }
/** Match the official diploma, never just a subject name or a keyword in the question. */
export function officialLawIdentity(value?: string): string | null {
 try {
  const url = new URL(value ?? "");
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !['planalto.gov.br','www.planalto.gov.br'].includes(url.hostname)) return null;
  const filename = url.pathname.toLowerCase().split('/').pop() ?? '';
  const match = /^(del|d|l)([0-9.]+)(?:compilad[oa])?\.htm[l]?$/.exec(filename);
  return match ? `${match[1]}:${match[2]!.replace(/\./g, '')}` : null;
 } catch { return null; }
}
export function questionMatchesLaw(question: { legalBasis: LegalBasis[] }, slug: string): boolean {
 const entry = legalLibraryEntry(slug);
 const identity = entry && officialLawIdentity(entry.source_url);
 return !!identity && question.legalBasis.some(basis => officialLawIdentity(basis.url) === identity);
}
export function materialLawSlug(material: {slug:string; discipline?:string; law_course_slug?:string|null; legal_review?:{course_slug?:string|null|undefined}|null}): string | undefined {
 const canonical = LEGAL_LIBRARY.find(entry => entry.material_slug === material.slug)?.slug;
 if (canonical) return canonical;
 // A related norm does not change the subject of a constitutional/civil/administrative lesson.
 if (/Constitucional|Administrativo|Civil/i.test(material.discipline ?? '')) return undefined;
 if (material.slug === 'penal-confissao-sumulas-545-630') return 'codigo-penal';
 return legalLibraryEntry(material.law_course_slug ?? material.legal_review?.course_slug ?? '')?.slug;
}
