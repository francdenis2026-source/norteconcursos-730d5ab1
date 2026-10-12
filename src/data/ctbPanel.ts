/**
 * Dados do Painel do CTB. Valores conferidos com o texto oficial do Código de Trânsito Brasileiro
 * (Lei nº 9.503/1997) já cadastrado na Biblioteca (curso "transito") e com a página oficial de
 * Resoluções do Contran (gov.br/transportes), atualizada em 06/10/2026. Ao alterar, confira o texto
 * vigente: leis e resoluções mudam com frequência.
 */
export type Gravidade = "leve" | "media" | "grave" | "gravissima";

/** Art. 258 (valores) e art. 259 (pontos). */
export const GRAVIDADES: Record<Gravidade, { label: string; multa: number; pontos: number }> = {
  leve: { label: "Leve", multa: 88.38, pontos: 3 },
  media: { label: "Média", multa: 130.16, pontos: 4 },
  grave: { label: "Grave", multa: 195.23, pontos: 5 },
  gravissima: { label: "Gravíssima", multa: 293.47, pontos: 7 },
};

export type Infracao = {
  art: string;
  conduta: string;
  gravidade: Gravidade;
  /** Fator de multiplicação da multa (art. do CTB), quando houver. */
  fator?: number;
  extra?: string;
};

/** Infrações mais cobradas (textos dos arts. 162 a 231 do CTB). */
export const INFRACOES: Infracao[] = [
  { art: "162, I", conduta: "Dirigir sem CNH, Permissão para Dirigir ou ACC", gravidade: "gravissima", fator: 3, extra: "Retenção do veículo até haver condutor habilitado" },
  { art: "162, II", conduta: "Dirigir com habilitação cassada ou direito de dirigir suspenso", gravidade: "gravissima", fator: 3, extra: "Recolhimento do documento e retenção do veículo" },
  { art: "162, III", conduta: "Dirigir com habilitação de categoria diferente da do veículo", gravidade: "gravissima", fator: 2, extra: "Retenção do veículo" },
  { art: "162, V", conduta: "Dirigir com CNH vencida há mais de 30 dias", gravidade: "gravissima", extra: "Retenção do veículo" },
  { art: "165", conduta: "Dirigir sob influência de álcool ou substância psicoativa", gravidade: "gravissima", fator: 10, extra: "Suspensão do direito de dirigir por 12 meses; multa em dobro na reincidência em 12 meses" },
  { art: "165-A", conduta: "Recusar-se ao teste, exame ou perícia de álcool/substância psicoativa", gravidade: "gravissima", fator: 10, extra: "Suspensão por 12 meses" },
  { art: "167", conduta: "Deixar de usar o cinto de segurança (condutor ou passageiro)", gravidade: "grave", extra: "Retenção até colocação do cinto" },
  { art: "168", conduta: "Transportar crianças sem observar as normas de segurança especiais", gravidade: "gravissima", extra: "Retenção até sanar a irregularidade" },
  { art: "169", conduta: "Dirigir sem atenção ou sem os cuidados indispensáveis", gravidade: "leve" },
  { art: "170", conduta: "Dirigir ameaçando pedestres ou outros veículos", gravidade: "gravissima", extra: "Suspensão do direito de dirigir" },
  { art: "173", conduta: "Disputar corrida", gravidade: "gravissima", fator: 10, extra: "Suspensão do direito de dirigir; recolhimento da habilitação e remoção do veículo" },
  { art: "175", conduta: "Exibir manobra perigosa (arrancada brusca, derrapagem)", gravidade: "gravissima", fator: 10, extra: "Suspensão do direito de dirigir; recolhimento da habilitação e remoção do veículo" },
  { art: "176", conduta: "Deixar, em sinistro com vítima, de socorrer, preservar o local ou identificar-se", gravidade: "gravissima", fator: 5, extra: "Suspensão do direito de dirigir" },
  { art: "181, VIII", conduta: "Estacionar no passeio, faixa de pedestres, ciclovia ou ciclofaixa", gravidade: "grave", extra: "Remoção do veículo" },
  { art: "181, XI", conduta: "Estacionar ao lado de outro veículo (fila dupla)", gravidade: "grave", extra: "Remoção do veículo" },
  { art: "181, V", conduta: "Estacionar na pista de rolamento de estradas, rodovias e vias de trânsito rápido", gravidade: "gravissima", extra: "Remoção do veículo" },
  { art: "184, III", conduta: "Transitar na faixa exclusiva de transporte coletivo", gravidade: "gravissima", extra: "Remoção do veículo; apreensão retirada do rol de penalidades pela Lei 13.281/2016" },
  { art: "186, II", conduta: "Transitar na contramão em via de sentido único", gravidade: "gravissima" },
  { art: "186, I", conduta: "Transitar na contramão em via de duplo sentido (fora de ultrapassagem)", gravidade: "grave" },
  { art: "189", conduta: "Deixar de dar passagem a veículo de urgência identificado", gravidade: "gravissima" },
  { art: "191", conduta: "Forçar passagem entre veículos que se cruzam em ultrapassagem", gravidade: "gravissima", fator: 10, extra: "Suspensão do direito de dirigir" },
  { art: "193", conduta: "Transitar em calçadas, ciclovias, acostamentos, canteiros e gramados", gravidade: "gravissima", fator: 3 },
  { art: "202", conduta: "Ultrapassar pelo acostamento ou em interseções e passagens de nível", gravidade: "gravissima", fator: 5 },
  { art: "203", conduta: "Ultrapassar pela contramão em curva, ponte, faixa de pedestres ou linha contínua", gravidade: "gravissima", fator: 5 },
  { art: "206", conduta: "Retorno em local proibido ou que prejudique a segurança", gravidade: "gravissima" },
  { art: "208", conduta: "Avançar o sinal vermelho ou parada obrigatória", gravidade: "gravissima" },
  { art: "210", conduta: "Transpor bloqueio viário policial", gravidade: "gravissima", extra: "Apreensão do veículo e suspensão do direito de dirigir" },
  { art: "212", conduta: "Deixar de parar antes de transpor linha férrea", gravidade: "gravissima" },
  { art: "214", conduta: "Não dar preferência a pedestre na faixa ou que não concluiu a travessia", gravidade: "gravissima" },
  { art: "215", conduta: "Não dar preferência em interseção não sinalizada (veículo da direita, rodovia, rotatória)", gravidade: "grave" },
  { art: "218, I", conduta: "Excesso de velocidade de até 20% acima do limite", gravidade: "media" },
  { art: "218, II", conduta: "Excesso de velocidade de mais de 20% até 50% acima do limite", gravidade: "grave" },
  { art: "218, III", conduta: "Excesso de velocidade de mais de 50% acima do limite", gravidade: "gravissima", fator: 3, extra: "Suspensão do direito de dirigir" },
  { art: "230, III", conduta: "Conduzir veículo com dispositivo antirradar", gravidade: "gravissima", extra: "Remoção do veículo; não confundir com a penalidade revogada de apreensão" },
  { art: "244, I", conduta: "Conduzir moto sem capacete ou vestuário de proteção conforme o Contran", gravidade: "gravissima", extra: "Suspensão do direito de dirigir" },
  { art: "252, VI", conduta: "Dirigir com fones nos ouvidos ligados a aparelho sonoro ou celular", gravidade: "media" },
  { art: "252, parágrafo único", conduta: "Dirigir segurando ou manuseando telefone celular", gravidade: "gravissima" },
  { art: "253-A", conduta: "Usar veículo para interromper ou perturbar a circulação sem autorização", gravidade: "gravissima", fator: 20, extra: "Suspensão por 12 meses; organizadores: multa agravada em 60 vezes" },
];

export function valorMulta(i: Infracao): number {
  return GRAVIDADES[i.gravidade].multa * (i.fator ?? 1);
}

/** Art. 61: velocidade máxima onde não houver sinalização regulamentadora. */
export const VELOCIDADES = [
  { via: "Via urbana — trânsito rápido", limite: "80 km/h" },
  { via: "Via urbana — arterial", limite: "60 km/h" },
  { via: "Via urbana — coletora", limite: "40 km/h" },
  { via: "Via urbana — local", limite: "30 km/h" },
  { via: "Rodovia de pista dupla — automóveis, camionetas, caminhonetes e motocicletas", limite: "110 km/h" },
  { via: "Rodovia de pista dupla — demais veículos", limite: "90 km/h" },
  { via: "Rodovia de pista simples — automóveis, camionetas, caminhonetes e motocicletas", limite: "100 km/h" },
  { via: "Rodovia de pista simples — demais veículos", limite: "90 km/h" },
  { via: "Estrada (via rural não pavimentada)", limite: "60 km/h" },
];

/** Art. 143 a 145 (categorias e requisitos). */
export const CATEGORIAS = [
  { cat: "A", descricao: "Veículo motorizado de duas ou três rodas, com ou sem carro lateral." },
  { cat: "B", descricao: "Veículo motorizado até 3.500 kg de peso bruto total e 8 lugares, excluído o motorista. Também motor-casa e veículos elétricos ou híbridos nos limites do art. 143." },
  { cat: "C", descricao: "Veículos da B e de carga acima de 3.500 kg. Exige 1 ano de categoria B e não mais de uma infração gravíssima em 12 meses." },
  { cat: "D", descricao: "Veículos das B e C e transporte de passageiros com lotação acima de 8 lugares. Exige mais de 21 anos, 2 anos de B ou 1 ano de C, e cursos." },
  { cat: "E", descricao: "Combinações com unidade acoplada de 6.000 kg ou mais, ou lotação acima de 8 lugares. Exige mais de 21 anos e 1 ano de categoria C." },
];

/** Prazos e números-chave do CTB. */
export const PRAZOS = [
  { item: "Transferência de propriedade do veículo", valor: "30 dias", art: "123, §1º" },
  { item: "Comunicação de venda pelo antigo proprietário (se o novo não transferir)", valor: "60 dias", art: "134" },
  { item: "Permissão para Dirigir", valor: "1 ano", art: "148, §2º" },
  { item: "Exame de aptidão física e mental — menos de 50 anos", valor: "a cada 10 anos", art: "147, §2º" },
  { item: "Exame de aptidão física e mental — de 50 a menos de 70 anos", valor: "a cada 5 anos", art: "147, §2º" },
  { item: "Exame de aptidão física e mental — 70 anos ou mais", valor: "a cada 3 anos", art: "147, §2º" },
  { item: "Exame toxicológico (categorias C, D e E) — periódico, menores de 70 anos", valor: "a cada 2 anos e 6 meses", art: "148-A" },
  { item: "Notificação da autuação", valor: "até 30 dias da infração", art: "281" },
  { item: "Defesa prévia (mínimo)", valor: "30 dias", art: "281-A" },
  { item: "Recurso à JARI / recurso à instância seguinte", valor: "no mínimo 30 dias / 30 dias", art: "282, §4º; 288" },
  { item: "Pagamento da multa até o vencimento", valor: "80% do valor", art: "284" },
  { item: "Pagamento com adesão ao sistema eletrônico sem defesa ou recurso", valor: "60% do valor", art: "284, §1º" },
  { item: "Julgamento dos recursos", valor: "24 meses", art: "285, §6º; 289" },
  { item: "Remoção — leilão de veículo não reclamado", valor: "60 dias", art: "328" },
  { item: "Cassação da CNH — pedido de reabilitação", valor: "após 2 anos", art: "263, §2º" },
  { item: "Suspensão pela via judicial", valor: "de 2 meses a 5 anos", art: "293" },
];

/** Art. 261: suspensão por pontos em 12 meses. */
export const SUSPENSAO_PONTOS = [
  { quando: "2 ou mais infrações gravíssimas na pontuação", pontos: 20 },
  { quando: "1 infração gravíssima na pontuação", pontos: 30 },
  { quando: "nenhuma infração gravíssima na pontuação", pontos: 40 },
];

export type ResolucaoContran = {
  numero: string;
  data: string;
  assunto: string;
  situacao: string;
  nota?: string;
};

/**
 * Resoluções do Contran com situação extraída da página oficial "Resoluções Contran"
 * (gov.br/transportes), atualizada em 06/10/2026. A lista NÃO é exaustiva: o endereço oficial
 * abaixo é a fonte da verdade para consultar texto e situação de qualquer resolução.
 */
export const RESOLUCOES_FONTE = "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/resolucoes-contran";
export const RESOLUCOES_VERIFICADO_EM = "06/10/2026";
export const RESOLUCOES: ResolucaoContran[] = [
  { numero: "1.031", data: "17/08/2026", assunto: "Fiscalização do consumo de álcool ou outras substâncias psicoativas (art. 165, 165-A, 276 e 277 do CTB)", situacao: "Em vigor — revoga a Res. 432/2013 e altera o Anexo da Res. 985/2022; parte das alterações tem vigência em 60 dias", nota: "Substitui a antiga Res. 432/2013 (Lei Seca)." },
  { numero: "1.030", data: "17/08/2026", assunto: "Altera a Res. 242/2007 (equipamentos geradores de imagens em veículos)", situacao: "Publicada em 18/08/2026" },
  { numero: "1.029", data: "17/08/2026", assunto: "Aprova a Deliberação 278/2026 (prorroga validade de ACC e CNH)", situacao: "Publicada em 18/08/2026" },
  { numero: "1.028", data: "17/08/2026", assunto: "Aprova a Deliberação 277/2026 (transição do free flow)", situacao: "Em vigor" },
  { numero: "1.027", data: "17/08/2026", assunto: "Registro, licenciamento e transferência de propriedade de veículos", situacao: "Em vigor — revoga as Res. 809/2020, 817/2021 e 999/2023" },
  { numero: "1.026", data: "26/06/2026", assunto: "Institui o Renave (registro nacional de veículos em estoque); altera a Res. 807/2020", situacao: "Em vigor — revoga as Res. 797/2020 e 818/2021" },
  { numero: "1.025", data: "26/06/2026", assunto: "Remoção, guarda, liberação e leilão de veículos recolhidos (arts. 271 e 328 do CTB)", situacao: "Em vigor — revoga a Res. 623/2016" },
  { numero: "1.023", data: "26/06/2026", assunto: "Veículos fora de estrada de uso recreativo, esportivo ou turístico", situacao: "Em vigor — altera o Anexo da Res. 985/2022" },
  { numero: "1.022", data: "26/06/2026", assunto: "Quadriciclos", situacao: "Em vigor — revoga a Res. 573/2015" },
  { numero: "1.020", data: "01/12/2025", assunto: "Aprendizagem, habilitação e expedição de documentos de condutores (formação de condutores)", situacao: "Em vigor — revoga diversas resoluções anteriores, entre elas a 789/2020" },
  { numero: "1.018", data: "20/01/2025", assunto: "Execução extrajudicial de veículos com alienação fiduciária", situacao: "Em vigor" },
  { numero: "1.017", data: "11/12/2024", assunto: "Registro e circulação de tratores e máquinas agrícolas", situacao: "Em vigor desde 01/01/2025" },
  { numero: "1.013", data: "14/10/2024", assunto: "Sistemas de livre passagem (free flow)", situacao: "Em vigor — alterada pela Deliberação 277/2026; revogou a Res. 984/2022" },
  { numero: "1.006", data: "03/04/2024", assunto: "Altera a Res. 886/2021 (especificações da CNH)", situacao: "Publicada em 08/04/2024" },
  { numero: "1.004", data: "21/12/2023", assunto: "Plano Nacional de Redução de Mortes e Lesões no Trânsito (Pnatrans)", situacao: "Em vigor desde 02/01/2024 — revoga a Res. 870/2021" },
  { numero: "985", data: "15/12/2022", assunto: "Manual Brasileiro de Fiscalização de Trânsito (MBFT)", situacao: "Em vigor — alterada pelas Res. 1.012/2024, 1.003/2023, 1.023/2026 e 1.031/2026" },
  { numero: "973", data: "18/07/2022", assunto: "Regulamento de Sinalização Viária", situacao: "Consta da lista oficial; confira alterações posteriores no texto consolidado" },
];
