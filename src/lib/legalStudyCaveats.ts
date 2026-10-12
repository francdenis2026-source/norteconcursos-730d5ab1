/** Editorial application notes are separate from the unmodified compiled statute. */
export function legalStudyCaveat(law: string, key: string) {
  const lbiUpdates: Record<string, [string, string, string]> = {
    'art-103': ['Improbidade: inciso revogado em 2021', 'O art. 11, IX, da Lei 8.429 transcrito neste dispositivo foi revogado pela Lei 14.230/2021. A transcrição registra a alteração de 2015; não a use como tipo vigente de improbidade. O dever de acessibilidade permanece, mas responsabilidades exigem os requisitos atuais.', 'https://www.planalto.gov.br/ccivil_03/leis/l8429.htm'],
    'art-104': ['Licitações: distinguir o regime antigo do atual', 'A Lei 8.666 foi revogada para novas contratações. Consulte a Lei 14.133 e suas regras de transição: contratos validamente regidos pelo regime antigo não migram automaticamente para o novo.', 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm'],
    'art-109': ['CTB: vaga reservada tem tipo específico atual', 'A redação de 2015 não substitui o art. 181, XX, atual: estacionar sem credencial em vaga reservada é infração gravíssima, com multa e remoção. Diferencie a remissão residual do art. 86-A ao inciso XVII.', 'https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm'],
    'art-110': ['Percentuais esportivos: redação histórica', 'Os dispositivos do art. 56 da Lei 9.615 alterados aqui foram revogados pela Lei 13.756/2018. A distribuição atual depende da modalidade de loteria e do período; não memorize os percentuais de 2015 como fórmula geral vigente.', 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13756.htm'],
    'art-111': ['Prioridade: rol ampliado em 2023', 'A Lei 14.626/2023 incluiu autismo, mobilidade reduzida e doadores de sangue expressamente no rol atual. Doadores são atendidos após os demais beneficiados, com comprovante válido por 120 dias; acompanhantes são atendidos junto e acessoriamente.', 'https://www.planalto.gov.br/ccivil_03/leis/l10048.htm'],
    'art-114': ['Curatela: artigos civis revogados pelo CPC', 'Os arts. 1.768, 1.769, 1.771 e 1.772 transcritos neste dispositivo estão revogados na compilação do Código Civil. Consulte o procedimento atual nos arts. 747–755 do CPC, em conjunto com as garantias da LBI.', 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm'],
    'art-126': ['IPI: prorrogação posterior até 2026', 'O limite de 2021 é histórico. O art. 9º da Lei 8.989, alterado pela Lei 14.287/2021, prevê efeitos até 31/12/2026. Isso não elimina os requisitos da isenção nem autoriza presumir extensão após essa data.', 'https://www.planalto.gov.br/ccivil_03/leis/l8989.htm'],
  };
  if (law === 'pcd' && lbiUpdates[key]) {
    const [title, explanation, source] = lbiUpdates[key];
    return {title, explanation, source, literalPractice: true};
  }
  if (law === "transito" && ['art-173','art-174','art-175','art-184','art-210','art-229','art-230','art-234','art-238','art-239','art-253','art-256'].includes(key)) return {
    literalPractice: false,
    title: "Apreensão e remoção: atenção à atualização de 2016",
    explanation: "A Lei 13.281/2016 revogou a apreensão do veículo como penalidade (art. 256, IV, e art. 262). Algumas redações específicas do compilado ainda conservam essa expressão. Não a memorize como penalidade atual: distinga a redação residual da medida administrativa de remoção e das demais sanções do artigo. A apreensão de placas ou de documentos tem outro objeto e não se confunde com essa revogação.",
    source: "https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm",
  };
  if (law === "ric" && key === "art-3") return {
    literalPractice: false,
    title: "Redação de 2009 e trecho histórico na compilação",
    explanation: "A página oficial conserva duas redações do § 2º. Para a regra atual, estude a que indica Redação dada pela Lei 12.058/2009: estados e DF signatários do convênio operacionalizam e atualizam o cadastro em compartilhamento com o órgão central. O antigo § 3º foi revogado. Este dispositivo não gera lacunas automáticas, para evitar memorização do trecho histórico como regra vigente.",
    source: "https://www.planalto.gov.br/ccivil_03/leis/l9454.htm",
  };
  if (law === "ric" && key === "art-5") return {
    literalPractice: false,
    title: "Prazos históricos de implementação",
    explanation: "Os prazos de 180 e 360 dias referem-se à regulamentação e à implementação da lei de 1997; não recomeçam a cada emissão de documento. A remissão de revogação que aparece depois pertence ao art. 6º, excluído da leitura vigente. Não memorize o prazo de cinco anos do antigo art. 6º como validade atual de uma carteira.",
    source: "https://www.planalto.gov.br/ccivil_03/leis/l9454.htm",
  };
  if (law === "codigo-processo-penal" && key === "art-262") return {
    literalPractice: false,
    title: "Redação histórica: curador por idade",
    explanation: "O art. 262 ainda aparece no texto compilado. Segundo o STJ, após o Código Civil de 2002 fixar maioridade aos 18 anos, não é necessária nomeação de curador especial no processo penal só porque o acusado tem entre 18 e 21 anos. Não memorize essa frase como exigência atual por idade. Curadoria por outras causas, como incidente de insanidade, possui regras próprias.",
    source: "https://www.stj.jus.br/websecstj/cgi/revista/REJ.cgi/ITA?CodOrgaoJgdr=&SeqCgrmaSessao=&dt=20150211&formato=PDF&nreg=201400285520&salvar=false&seq=1379594&tipo=0",
  };
  return null;
}
