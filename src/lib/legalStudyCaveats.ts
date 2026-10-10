/** Editorial application notes are separate from the unmodified compiled statute. */
export function legalStudyCaveat(law: string, key: string) {
  if (law === "codigo-processo-penal" && key === "art-262") return {
    literalPractice: false,
    title: "Redação histórica: curador por idade",
    explanation: "O art. 262 ainda aparece no texto compilado. Segundo o STJ, após o Código Civil de 2002 fixar maioridade aos 18 anos, não é necessária nomeação de curador especial no processo penal só porque o acusado tem entre 18 e 21 anos. Não memorize essa frase como exigência atual por idade. Curadoria por outras causas, como incidente de insanidade, possui regras próprias.",
    source: "https://www.stj.jus.br/websecstj/cgi/revista/REJ.cgi/ITA?CodOrgaoJgdr=&SeqCgrmaSessao=&dt=20150211&formato=PDF&nreg=201400285520&salvar=false&seq=1379594&tipo=0",
  };
  return null;
}
