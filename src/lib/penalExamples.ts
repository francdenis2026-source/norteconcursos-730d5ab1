import {
  diasParaPena,
  formatPena,
  penaParaDias,
  type DosimetriaInput,
  type dosimetria,
} from "./penalCalc";

export type PenalExample = {
  title: string;
  scenario: string;
  steps: string[];
  conclusion: string;
  caution: string;
};
const duration = (days: number) => formatPena(diasParaPena(days));

/** Numerical teaching examples reuse the result rather than calculating a second legal outcome. */
export function dosimetryExamples(
  input: DosimetriaInput,
  result: ReturnType<typeof dosimetria>,
  crimeLabel = "crime informado",
): PenalExample[] {
  const min = penaParaDias(input.min),
    max = penaParaDias(input.max);
  const examples = result.passos.map((step, index) => {
    const before = index === 0 ? min : result.passos[index - 1]!.dias;
    let operation: string;
    if (index === 0)
      operation = `Parta de ${duration(min)}. O intervalo até o máximo é de ${max - min} dias. Neste exercício, ${input.circunstanciasNegativas} circunstância(s) desfavorável(is) usa(m) ${input.fracaoCircunstancia.num}/${input.fracaoCircunstancia.den} desse intervalo por circunstância.`;
    else if (index === 1)
      operation = `Sobre ${duration(before)}, simule ${input.agravantes} agravante(s) e ${input.atenuantes} atenuante(s), com fração de ${input.fracaoAgravanteAtenuante.num}/${input.fracaoAgravanteAtenuante.den}. O saldo aritmético é ${input.agravantes - input.atenuantes}.`;
    else operation = `${step.explicacao} A pena anterior era ${duration(before)} (${before} dias).`;
    return {
      title: step.fase,
      scenario: `Imagine uma condenação hipotética por ${crimeLabel}, com pena prevista entre ${formatPena(input.min)} e ${formatPena(input.max)}. Acompanhe esta etapa com os dados que você preencheu.`,
      steps: [
        operation,
        `Resultado desta etapa: ${duration(step.dias)} (${step.dias} dias), após os limites e o descarte de frações de dia usados na simulação.`,
      ],
      conclusion: `${duration(before)} → ${duration(step.dias)}.`,
      caution:
        index === 0
          ? "A fração da pena-base é um critério do exercício, não uma fração obrigatória fixada pela lei."
          : index === 1
            ? "A compensação numérica não resolve a preponderância jurídica. A atenuante não reduz abaixo do mínimo na simulação; uma causa de diminuição na terceira fase pode fazê-lo."
            : "A fração e a possibilidade de cumular causas devem ser conferidas no dispositivo aplicável; clicar em uma fração não comprova que a causa existe no caso.",
    };
  });
  if (!input.aumentos.length && !input.diminuicoes.length)
    examples.push({
      title: "3ª fase: sem causas informadas",
      scenario: "Neste exercício, nenhuma causa de aumento ou diminuição foi selecionada.",
      steps: [
        `A pena da segunda fase é ${duration(result.final)}. Sem causas informadas, ela é mantida na terceira fase.`,
      ],
      conclusion: `Pena simulada: ${duration(result.final)}.`,
      caution:
        "CP, art. 68: ausência de causa na simulação não comprova ausência de causa no caso real. Confira o dispositivo e os fatos.",
    });
  return examples;
}

export function remitionExample(
  study: number,
  workDays: number,
  completion: boolean,
  result: { estudo: number; trabalho: number; acrescimoConclusao: number; total: number },
): PenalExample {
  return {
    title: "Estudo e trabalho no mesmo exercício",
    scenario: `Uma pessoa cumpriu ${study} bloco(s) de estudo conferido(s), de 12 horas cada, e ${workDays} dia(s) de trabalho reconhecível(is). ${completion ? "Também informou conclusão certificada de ensino durante o cumprimento." : "Não informou conclusão certificada de ensino."}`,
    steps: [
      `Estudo: ${study} × 1 = ${result.estudo} dia(s). Cada bloco precisa ter as horas distribuídas em pelo menos três dias.`,
      `Trabalho: ${workDays} ÷ 3 = ${result.trabalho} dia(s) inteiros.`,
      `Acréscimo por conclusão: ${result.acrescimoConclusao} dia(s). Soma: ${result.estudo} + ${result.trabalho} + ${result.acrescimoConclusao} = ${result.total} dia(s).`,
    ],
    conclusion: `O exercício estima ${result.total} dias de remição. Use o botão para levar esse número à execução.`,
    caution:
      "LEP, arts. 126–128: horários compatíveis, certificação e reconhecimento judicial devem ser conferidos. Este exemplo não reconhece dias automaticamente.",
  };
}
