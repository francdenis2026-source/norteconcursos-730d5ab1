/** Editorial application notes are separate from the unmodified compiled statute. */
export function legalStudyCaveat(law: string, key: string) {
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
