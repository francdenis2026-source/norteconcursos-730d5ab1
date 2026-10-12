/** Editorial application notes are separate from the unmodified compiled statute. */
export function legalStudyCaveat(law: string, key: string) {
  const investigationNotes: Record<string, [string, string, string]> = {
    'abuso/art-43': ['Advocacia: pena alterada em 2022', 'Esta transcrição contém a pena inicial do art. 7º-B do Estatuto da Advocacia. A Lei 14.365/2022 elevou a pena para detenção de dois a quatro anos e multa. Consulte o Estatuto compilado; não memorize a faixa antiga de três meses a um ano como vigente.', 'https://www.planalto.gov.br/ccivil_03/leis/l8906.htm'],
    'abuso/art-42': ['Efeitos da condenação: conferir as hipóteses posteriores', 'O ECA 227-A permanece na compilação, mas sua reprodução de 2019 não esgota as regras atuais. O CP 92, §2º, ampliado pela Lei 15.487/2026, prevê efeitos automáticos para crimes do ECA especificamente enumerados. Distinga as hipóteses, os textos e a data do fato, sem generalizar reincidência para toda perda do cargo.', 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'],
    'abuso/art-10': ['Interrogatório: intimação não autoriza condução coercitiva', 'Nas ADPFs 395 e 444, o STF declarou incompatível com a Constituição a condução coercitiva de investigado ou réu para interrogatório. Intimação anterior não supera essa vedação. A condução de testemunha tem requisitos próprios; não confunda as duas situações.', 'https://portal.stf.jus.br/processos/listarProcessos.asp?classe=ADPF&numeroProcesso=395'],
    'organizacoes/art-4': ['Colaboração: silêncio e corroboração', 'Na ADI 5567, o STF preservou o direito ao silêncio como irrenunciável e inalienável: a palavra renúncia do §14 descreve exercício voluntário no acordo, com defesa técnica. O §16 proíbe cautelares, recebimento da acusação e condenação fundados apenas nas declarações. Não transforme homologação em prova suficiente nem em extinção da garantia.', 'https://portal.stf.jus.br/processos/listarProcessos.asp?classe=ADI&numeroProcesso=5567'],
    'organizacoes/art-24': ['CP 288: a reprodução de 2013 é histórica', 'Consulte o Código Penal compilado. A Lei 15.245/2025 renumerou a majorante como §1º e acrescentou §2º sobre solicitar ou contratar crime a integrante de associação. A transcrição modificadora de 2013 não contém todas as hipóteses vigentes.', 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'],
    'organizacoes/art-288': ['Associação: consultar os dois parágrafos atuais', 'O trecho reproduzido termina no antigo parágrafo único. Desde 2025, a majorante está no §1º e o §2º abrange solicitar ou contratar crime a integrante da associação, além da pena do crime solicitado/contratado. Diferencie os requisitos de associação, organização, tráfico e facção; número de pessoas sozinho não decide a tipificação.', 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'],
    'organizacoes/art-3': ['Licitações: remissão ao regime antigo', 'O §2º ainda menciona a Lei 8.666, revogada para novas contratações. Leia o regime vigente e as regras de transição da Lei 14.133, sem converter o dispositivo histórico em autorização genérica para contratar sem controle. Técnicas investigatórias conservam seus requisitos próprios.', 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm'],
    'delegado/art-2': ['Investigação: não há monopólio do delegado', 'Na ADI 5043, julgada em março de 2025, o STF afastou a interpretação de que toda investigação criminal é exclusiva do delegado. Diferencie essa questão do indiciamento privativo e fundamentado previsto no §6º. A expressão exclusivas de Estado não exclui outros órgãos com atribuição investigatória.', 'https://portal.stf.jus.br/processos/detalhe.asp?incidente=4464179'],
    'temporaria/art-1': ['Prisão temporária: cinco requisitos cumulativos', 'Nas ADIs 3360 e 4109, o STF exige imprescindibilidade concreta para o inquérito, razões de autoria em crime do rol, fatos novos ou contemporâneos, adequação e insuficiência de cautelares alternativas. Falta de residência, sozinha, não autoriza prisão. Não estude os três incisos como alternativas independentes nem amplie o rol por analogia.', 'https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=481715'],
    'temporaria/art-4': ['Abuso de autoridade: remissão histórica revogada', 'A alínea transcrita pertencia à Lei 4.898/1965, revogada pela Lei 13.869/2019. Para fatos atuais, consulte o art. 12, parágrafo único, IV, da lei nova e seus requisitos subjetivos, incluindo o art. 1º, §1º. A revogação não elimina a soltura por fim do prazo do art. 2º, §7º, da Lei de Prisão Temporária.', 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm'],
    'tortura/art-1': ['Tortura: atualização de 2026 e regime individualizado', 'A Lei 15.410 acrescentou a modalidade de sofrimento intenso reiterado de mulher em contexto doméstico/familiar, em vigor desde 21/05/2026. Distinga o §7º literal da jurisprudência: o STJ não impõe fechado automaticamente, exigindo individualização. Em outubro de 2026, o Informativo 904 confirmou a compatibilidade da majorante de agente público com tortura de pessoa presa.', 'https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40cnot%3D014772'],
    'trafico-pessoas/art-7': ['Migração: o Estatuto do Estrangeiro foi revogado', 'Os artigos transcritos pertenciam à Lei 6.815, revogada pela Lei 13.445/2017. Para situações atuais, consulte a autorização de residência do art. 30, II, g, da Lei de Migração e o procedimento regulamentar aplicável. A transcrição histórica não certifica um procedimento atual completo.', 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm'],
    'interceptacao/art-5': ['Interceptação: renovações sucessivas exigem fundamento concreto', 'No Tema 661, o STF admitiu renovações sucessivas quando presentes os requisitos legais, necessidade concreta e complexidade da investigação, com decisão legitimamente motivada. Não há teto automático geral de trinta dias; tampouco renovação automática ou fundamentação padronizada sem relação com o caso.', 'https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=3906320&numeroProcesso=625263&numeroTema=661'],
    'interceptacao/art-3': ['Iniciativa judicial: ler junto com o sistema acusatório', 'O dispositivo conserva menção a atuação de ofício. Não isole essa frase do art. 3º-A do CPP e da interpretação constitucional da estrutura acusatória: ela não autoriza o juiz a substituir o órgão acusador ou assumir a investigação. Distinga literalidade, fase e aplicação no caso concreto.', 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'],
  };
  const investigationNote = investigationNotes[`${law}/${key}`];
  if (investigationNote) {
    const [title, explanation, source] = investigationNote;
    // These statutes retain wording that must not be drilled without the
    // constitutional/repeal qualification. Reviewed authored checks remain.
    return {title, explanation, source, literalPractice: false};
  }
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
