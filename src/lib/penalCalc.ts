import { acreDate } from "@/lib/acreTime";
/**
 * Cálculos penais para estudo (dosimetria, regime, progressão, livramento, prescrição, remição, detração).
 * Valores conferidos no texto compilado do Planalto, conforme a Biblioteca de leis, em 12/10/2026:
 * CP arts. 33, 42, 68, 75, 83, 109, 110, 115 e LEP arts. 112, 126 a 128. Ferramenta didática: não substitui
 * o cálculo do juízo da execução nem advogado, e não modela interrupções e suspensões da prescrição (CP arts. 116 e 117).
 */

export type Pena = { anos: number; meses: number; dias: number };

/** Na dosimetria, o ano tem 12 meses e o mês 30 dias (prática forense); datas usam o calendário (CP, art. 10). */
export const penaParaDias = (p: Pena) => p.anos * 360 + p.meses * 30 + p.dias;
export function diasParaPena(total: number): Pena {
  const t = Math.max(0, Math.round(total));
  return { anos: Math.floor(t / 360), meses: Math.floor((t % 360) / 30), dias: t % 30 };
}
export const formatPena = (p: Pena) => {
  const parts = [p.anos && `${p.anos} ${p.anos === 1 ? "ano" : "anos"}`, p.meses && `${p.meses} ${p.meses === 1 ? "mês" : "meses"}`, p.dias && `${p.dias} ${p.dias === 1 ? "dia" : "dias"}`].filter(Boolean);
  return parts.length ? parts.join(", ") : "0 dia";
};

// ───────── Catálogo de crimes (preceito primário e secundário do caput, conforme o texto compilado) ─────────
export type Crime = { id: string; label: string; min: Pena; max: Pena; tipo: "reclusão" | "detenção" };
const P = (anos: number, meses = 0, dias = 0): Pena => ({ anos, meses, dias });
export const CRIMES: Crime[] = [
  { id: "cp121", label: "Homicídio simples (CP, art. 121, caput)", min: P(6), max: P(20), tipo: "reclusão" },
  { id: "cp121q", label: "Homicídio qualificado (CP, art. 121, § 2º)", min: P(12), max: P(30), tipo: "reclusão" },
  { id: "cp129", label: "Lesão corporal (CP, art. 129, caput)", min: P(0, 3), max: P(1), tipo: "detenção" },
  { id: "cp147", label: "Ameaça (CP, art. 147)", min: P(0, 1), max: P(0, 6), tipo: "detenção" },
  { id: "cp155", label: "Furto (CP, art. 155, caput)", min: P(1), max: P(6), tipo: "reclusão" },
  { id: "cp157", label: "Roubo (CP, art. 157, caput)", min: P(6), max: P(10), tipo: "reclusão" },
  { id: "cp158", label: "Extorsão (CP, art. 158, caput)", min: P(4), max: P(10), tipo: "reclusão" },
  { id: "cp171", label: "Estelionato (CP, art. 171, caput)", min: P(1), max: P(5), tipo: "reclusão" },
  { id: "cp180", label: "Receptação (CP, art. 180, caput)", min: P(2), max: P(6), tipo: "reclusão" },
  { id: "cp213", label: "Estupro (CP, art. 213, caput)", min: P(6), max: P(10), tipo: "reclusão" },
  { id: "cp217a", label: "Estupro de vulnerável (CP, art. 217-A, caput)", min: P(10), max: P(18), tipo: "reclusão" },
  { id: "cp288", label: "Associação criminosa (CP, art. 288)", min: P(1), max: P(3), tipo: "reclusão" },
  { id: "cp312", label: "Peculato (CP, art. 312, caput)", min: P(2), max: P(12), tipo: "reclusão" },
  { id: "cp317", label: "Corrupção passiva (CP, art. 317, caput)", min: P(2), max: P(12), tipo: "reclusão" },
  { id: "cp329", label: "Resistência (CP, art. 329, caput)", min: P(0, 2), max: P(2), tipo: "detenção" },
  { id: "cp331", label: "Desacato (CP, art. 331)", min: P(0, 6), max: P(2), tipo: "detenção" },
  { id: "cp333", label: "Corrupção ativa (CP, art. 333, caput)", min: P(2), max: P(12), tipo: "reclusão" },
  { id: "d33", label: "Tráfico de drogas (Lei 11.343/2006, art. 33, caput)", min: P(5), max: P(15), tipo: "reclusão" },
  { id: "a12", label: "Posse irregular de arma de uso permitido (Lei 10.826/2003, art. 12)", min: P(1), max: P(3), tipo: "detenção" },
  { id: "a14", label: "Porte ilegal de arma de uso permitido (Lei 10.826/2003, art. 14)", min: P(2), max: P(4), tipo: "reclusão" },
  { id: "a16", label: "Posse ou porte de arma de uso restrito (Lei 10.826/2003, art. 16, caput)", min: P(3), max: P(6), tipo: "reclusão" },
];

// ───────── Dosimetria trifásica (CP, art. 68) ─────────
export type Fracao = { num: number; den: number };
export const fracaoValor = (f: Fracao) => (f.den ? f.num / f.den : 0);

export type DosimetriaInput = {
  min: Pena;
  max: Pena;
  /** Circunstâncias judiciais (art. 59) desfavoráveis. */
  circunstanciasNegativas: number;
  /** Fração por circunstância sobre o intervalo entre mínimo e máximo (critério usual: 1/8). */
  fracaoCircunstancia: Fracao;
  agravantes: number;
  atenuantes: number;
  /** Fração por agravante/atenuante (critério usual: 1/6), aplicada sobre a pena da fase anterior. */
  fracaoAgravanteAtenuante: Fracao;
  aumentos: Fracao[];
  diminuicoes: Fracao[];
};

export type Passo = { fase: string; explicacao: string; dias: number };

export function dosimetria(i: DosimetriaInput) {
  const min = penaParaDias(i.min), max = penaParaDias(i.max);
  if (max < min || min <= 0) throw new Error("Confira a pena mínima e a máxima");
  const passos: Passo[] = [];
  const base = Math.round(min + (max - min) * fracaoValor(i.fracaoCircunstancia) * i.circunstanciasNegativas);
  const baseLimitada = Math.min(base, max);
  passos.push({ fase: "1ª fase: pena-base", explicacao: `Mínimo legal + ${i.circunstanciasNegativas} circunstância(s) desfavorável(is) × ${i.fracaoCircunstancia.num}/${i.fracaoCircunstancia.den} do intervalo entre o mínimo e o máximo (art. 59).`, dias: baseLimitada });
  const saldo = i.agravantes - i.atenuantes;
  let inter = Math.round(baseLimitada * (1 + saldo * fracaoValor(i.fracaoAgravanteAtenuante)));
  const antes = inter;
  inter = Math.min(max, Math.max(min, inter));
  passos.push({ fase: "2ª fase: agravantes e atenuantes", explicacao: `${i.agravantes} agravante(s) e ${i.atenuantes} atenuante(s), cada uma ${i.fracaoAgravanteAtenuante.num}/${i.fracaoAgravanteAtenuante.den} da pena da fase anterior.${antes !== inter ? " O resultado foi limitado ao mínimo ou ao máximo legal (Súmula 231 do STJ)." : ""}`, dias: inter });
  let atual = inter;
  for (const f of i.aumentos) {
    atual = Math.round(atual * (1 + fracaoValor(f)));
    passos.push({ fase: "3ª fase: causa de aumento", explicacao: `Aumento de ${f.num}/${f.den} sobre a pena da fase anterior; pode superar o máximo legal.`, dias: atual });
  }
  for (const f of i.diminuicoes) {
    atual = Math.round(atual * (1 - fracaoValor(f)));
    passos.push({ fase: "3ª fase: causa de diminuição", explicacao: `Diminuição de ${f.num}/${f.den} sobre a pena da fase anterior; pode ficar abaixo do mínimo legal.`, dias: atual });
  }
  return { passos, final: atual };
}

/** Regime inicial pelo art. 33, § 2º, do CP (sem considerar circunstâncias do art. 59 nem súmulas). */
export function regimeInicial(dias: number, reincidente: boolean, tipo: "reclusão" | "detenção"): { regime: string; nota: string } {
  const anos = dias / 360;
  if (anos > 8) return { regime: "Fechado", nota: "Pena superior a 8 anos (art. 33, § 2º, a)." };
  if (reincidente) return { regime: "Fechado, em regra", nota: "O art. 33, § 2º, b e c, abre o regime mais brando só ao não reincidente. A Súmula 269 do STJ admite o semiaberto ao reincidente com pena até 4 anos e circunstâncias judiciais favoráveis." };
  if (anos > 4) return { regime: "Semiaberto", nota: "Não reincidente, pena superior a 4 e não superior a 8 anos (art. 33, § 2º, b)." };
  return { regime: "Aberto", nota: `Não reincidente, pena igual ou inferior a 4 anos (art. 33, § 2º, c).${tipo === "detenção" ? " Detenção não começa em regime fechado (art. 33, caput)." : ""}` };
}

/** Informações sobre substituição e suspensão da pena, para orientar o estudo (CP, arts. 44 e 77). */
export function beneficios(dias: number, comViolencia: boolean) {
  const anos = dias / 360;
  return [
    anos <= 4 && !comViolencia ? "A pena (até 4 anos, sem violência ou grave ameaça) permite estudar a substituição por restritivas de direitos (art. 44)." : "Substituição por restritivas de direitos (art. 44) exige, em regra, pena até 4 anos e crime sem violência ou grave ameaça.",
    anos <= 2 ? "Pena de até 2 anos: estudar a suspensão condicional da pena (art. 77)." : "A suspensão condicional da pena (art. 77) exige pena não superior a 2 anos.",
  ];
}

// ───────── Execução da pena ─────────
export type CategoriaExecucao = { id: string; label: string; fracao: Fracao; livramentoVedado?: boolean };
/** LEP, art. 112, com a redação do texto compilado (Leis 13.964/2019, 15.358/2026 e 15.402/2026). */
export const CATEGORIAS_PROGRESSAO: CategoriaExecucao[] = [
  { id: "base", label: "Regra geral: crime sem violência ou grave ameaça, primário (caput)", fracao: { num: 1, den: 6 } },
  { id: "i", label: "Primário, crime com violência ou grave ameaça (inciso I)", fracao: { num: 25, den: 100 } },
  { id: "ii", label: "Reincidente, crime com violência ou grave ameaça (inciso II)", fracao: { num: 30, den: 100 } },
  { id: "iii", label: "Reincidente em crime sem violência ou grave ameaça (inciso III)", fracao: { num: 20, den: 100 } },
  { id: "v", label: "Hediondo ou equiparado, primário (inciso V)", fracao: { num: 70, den: 100 } },
  { id: "via", label: "Hediondo ou equiparado com resultado morte, primário (inciso VI, a)", fracao: { num: 75, den: 100 }, livramentoVedado: true },
  { id: "vib", label: "Comando de organização criminosa ultraviolenta para crime hediondo (inciso VI, b)", fracao: { num: 75, den: 100 }, livramentoVedado: true },
  { id: "vic", label: "Constituição de milícia privada (inciso VI, c)", fracao: { num: 75, den: 100 } },
  { id: "vid", label: "Feminicídio, primário (inciso VI, d)", fracao: { num: 75, den: 100 }, livramentoVedado: true },
  { id: "vii", label: "Reincidente em crime hediondo ou equiparado (inciso VII)", fracao: { num: 80, den: 100 } },
  { id: "viii", label: "Reincidente em hediondo ou equiparado com resultado morte (inciso VIII)", fracao: { num: 85, den: 100 }, livramentoVedado: true },
  { id: "mae", label: "Gestante, mãe ou responsável por criança ou pessoa com deficiência, nos requisitos do § 3º", fracao: { num: 1, den: 8 } },
];

export const LIVRAMENTO: { id: string; label: string; fracao: Fracao }[] = [
  { id: "terco", label: "Não reincidente em crime doloso e com bons antecedentes: mais de 1/3 (art. 83, I)", fracao: { num: 1, den: 3 } },
  { id: "metade", label: "Reincidente em crime doloso: mais da metade (art. 83, II)", fracao: { num: 1, den: 2 } },
  { id: "doistercos", label: "Hediondo, tortura, tráfico de drogas, tráfico de pessoas ou terrorismo, não reincidente específico: mais de 2/3 (art. 83, V)", fracao: { num: 2, den: 3 } },
];

const MS = 86_400_000;
export const parseDate = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return Date.UTC(y!, (m ?? 1) - 1, d ?? 1); };
export const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
export const addDays = (ms: number, n: number) => ms + n * MS;
/** Soma anos, meses e dias ao calendário comum (CP, art. 10). */
export function addPena(ms: number, p: Pena): number {
  const d = new Date(ms);
  const t = Date.UTC(d.getUTCFullYear() + p.anos, d.getUTCMonth() + p.meses, d.getUTCDate());
  // Ajuste de fim de mês (31 de jan + 1 mês cai no último dia de fevereiro)
  const target = new Date(Date.UTC(d.getUTCFullYear() + p.anos, d.getUTCMonth() + p.meses + 1, 0));
  const clamped = new Date(t).getUTCMonth() !== target.getUTCMonth() ? target.getTime() : t;
  return clamped + p.dias * MS;
}
export const diasEntre = (a: number, b: number) => Math.round((b - a) / MS);
export const formatBr = (ms: number) => acreDate(ms).toLocaleDateString("pt-BR", { timeZone: "UTC" });

export type ExecucaoResultado = {
  totalDias: number;
  exigidosDias: number;
  abatidosDias: number;
  faltamDias: number;
  data: number;
  jaCumprido: boolean;
  limiteQuarentaAnos: boolean;
};

/**
 * Data em que se atinge a fração exigida. O dia do começo conta (CP, art. 10).
 * `estrito`: livramento exige "mais de" a fração, então soma-se um dia.
 */
export function marcoExecucao(inicio: number, pena: Pena, fracao: Fracao, detracaoDias: number, remicaoDias: number, estrito = false): ExecucaoResultado {
  const totalDiasBruto = diasEntre(inicio, addPena(inicio, pena));
  const totalDias = Math.min(totalDiasBruto, diasEntre(inicio, addPena(inicio, { anos: 40, meses: 0, dias: 0 })));
  const exigidosDias = estrito ? Math.floor((totalDias * fracao.num) / fracao.den) + 1 : Math.ceil((totalDias * fracao.num) / fracao.den);
  const abatidosDias = Math.max(0, detracaoDias) + Math.max(0, remicaoDias);
  const faltamDias = Math.max(0, exigidosDias - abatidosDias);
  const data = addDays(inicio, Math.max(0, faltamDias - 1));
  return { totalDias, exigidosDias, abatidosDias, faltamDias, data, jaCumprido: faltamDias === 0, limiteQuarentaAnos: totalDiasBruto > totalDias };
}

// ───────── Remição e detração (LEP, art. 126; CP, art. 42) ─────────
export function remicao(horasEstudo: number, diasDistintosEstudo: number, diasTrabalho: number, concluiuEnsino: boolean) {
  const estudoValido = diasDistintosEstudo >= 3 || horasEstudo < 12;
  const baseEstudo = estudoValido ? Math.floor(Math.max(0, horasEstudo) / 12) : 0;
  const acrescimo = concluiuEnsino ? Math.floor(baseEstudo / 3) : 0;
  const trabalho = Math.floor(Math.max(0, diasTrabalho) / 3);
  return { estudo: baseEstudo, acrescimoConclusao: acrescimo, trabalho, total: baseEstudo + acrescimo + trabalho, estudoValido };
}

// ───────── Prescrição (CP, arts. 109, 110 e 115) ─────────
export function prazoPrescricaoAnos(penaDias: number): number {
  const anos = penaDias / 360;
  if (anos > 12) return 20;
  if (anos > 8) return 16;
  if (anos > 4) return 12;
  if (anos > 2) return 8;
  if (anos >= 1) return 4;
  return 3;
}

export function prescricao(penaDias: number, o: { executoria: boolean; reincidente: boolean; reduzPelaIdade: boolean; violenciaSexualContraMulher: boolean }) {
  let anos = prazoPrescricaoAnos(penaDias);
  const notas: string[] = [`Art. 109: pena ${o.executoria ? "aplicada" : "máxima cominada"} de ${formatPena(diasParaPena(penaDias))} corresponde a ${anos} anos.`];
  let meses = anos * 12;
  if (o.executoria && o.reincidente) { meses = Math.round(meses * (4 / 3)); notas.push("Art. 110, caput: o prazo da prescrição da pretensão executória aumenta de um terço se o condenado é reincidente."); }
  if (o.reduzPelaIdade) {
    if (o.violenciaSexualContraMulher) notas.push("Art. 115: não há redução pela idade quando o crime envolve violência sexual contra a mulher.");
    else { meses = Math.round(meses / 2); notas.push("Art. 115: prazo reduzido pela metade (menor de 21 anos ao tempo do crime ou maior de 70 na data da sentença)."); }
  }
  return { meses, notas };
}
