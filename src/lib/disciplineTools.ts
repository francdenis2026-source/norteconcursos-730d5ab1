/** Lógica pura das ferramentas por disciplina (conjuntos, bases numéricas, redes, prazos, contabilidade). */
import { addDays, parseDate } from "@/lib/penalCalc";

// ───────── Raciocínio lógico: conjuntos ─────────
/** Dois conjuntos A e B em um universo: calcula todas as regiões do diagrama de Venn. */
export function venn(nA: number, nB: number, nInter: number, universe?: number) {
  if (nInter > Math.min(nA, nB)) throw new Error("A interseção não pode ser maior que um dos conjuntos");
  const union = nA + nB - nInter;
  if (universe !== undefined && universe < union) throw new Error("O total é menor que a união dos conjuntos");
  return { onlyA: nA - nInter, onlyB: nB - nInter, inter: nInter, union, outside: universe === undefined ? undefined : universe - union };
}

// ───────── Informática: bases, unidades e redes ─────────
export function baseConvert(text: string, base: 2 | 8 | 10 | 16) {
  const clean = text.trim().toLowerCase().replace(/^0x/, "").replace(/\s+/g, "");
  const digits = "0123456789abcdef".slice(0, base);
  if (!clean || [...clean].some((c) => !digits.includes(c))) throw new Error(`Digite um número válido na base ${base}`);
  let n = 0n;
  for (const c of clean) n = n * BigInt(base) + BigInt(digits.indexOf(c));
  return { bin: n.toString(2), oct: n.toString(8), dec: n.toString(10), hex: n.toString(16).toUpperCase() };
}

export const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;
/** Converte entre unidades: base 1024 (KiB, MiB...) ou base 1000 (KB, MB do sistema decimal). */
export function convertBytes(value: number, from: (typeof BYTE_UNITS)[number], binary = true) {
  if (!Number.isFinite(value) || value < 0) throw new Error("Valor inválido");
  const step = binary ? 1024 : 1000;
  const bytes = value * step ** BYTE_UNITS.indexOf(from);
  return Object.fromEntries(BYTE_UNITS.map((u, i) => [u, bytes / step ** i])) as Record<(typeof BYTE_UNITS)[number], number>;
}

const ipToInt = (ip: string) => {
  const p = ip.trim().split(".").map(Number);
  if (p.length !== 4 || p.some((x) => !Number.isInteger(x) || x < 0 || x > 255)) throw new Error("IP inválido (use o formato 192.168.0.10)");
  return ((p[0]! << 24) | (p[1]! << 16) | (p[2]! << 8) | p[3]!) >>> 0;
};
const intToIp = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");

/** Rede, máscara, broadcast e quantidade de hosts de um endereço IPv4 com prefixo CIDR. */
export function cidr(ip: string, prefix: number) {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) throw new Error("O prefixo vai de 0 a 32");
  const addr = ipToInt(ip);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (addr & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - prefix);
  return {
    mask: intToIp(mask),
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    first: prefix >= 31 ? intToIp(network) : intToIp(network + 1),
    last: prefix >= 31 ? intToIp(broadcast) : intToIp(broadcast - 1),
    hosts: prefix >= 31 ? total : total - 2,
    total,
  };
}

// ───────── Direito: contagem de prazos ─────────
/**
 * Soma dias a uma data. `excluirInicio`: o dia do começo não conta e o do vencimento conta (regra comum de prazos
 * processuais, como no art. 798, § 1º, do CPP). Sem isso, o dia do começo conta (como na pena, CP art. 10).
 * `diasUteis` ignora sábados e domingos; feriados não são considerados.
 */
export function somarPrazo(inicioIso: string, dias: number, o: { excluirInicio: boolean; diasUteis: boolean }) {
  if (!Number.isInteger(dias) || dias < 0 || dias > 5000) throw new Error("Informe um número de dias entre 0 e 5000");
  let ms = parseDate(inicioIso);
  const ehUtil = (t: number) => { const d = new Date(t).getUTCDay(); return d !== 0 && d !== 6; };
  if (!o.diasUteis) return addDays(ms, o.excluirInicio ? dias : Math.max(0, dias - 1));
  let contados = o.excluirInicio ? 0 : ehUtil(ms) ? 1 : 0;
  while (contados < dias) {
    ms = addDays(ms, 1);
    if (ehUtil(ms)) contados++;
  }
  return ms;
}
/** Se o último dia cair em sábado ou domingo, devolve a segunda-feira seguinte (prorrogação usual de prazos). */
export function proximoDiaUtil(ms: number) {
  const d = new Date(ms).getUTCDay();
  return d === 6 ? addDays(ms, 2) : d === 0 ? addDays(ms, 1) : ms;
}

// ───────── Contabilidade e finanças ─────────
export const liquidez = (ac: number, pc: number, estoques = 0, rlp = 0, pnc = 0) => {
  if (pc <= 0) throw new Error("O passivo circulante deve ser maior que zero");
  return { corrente: ac / pc, seca: (ac - estoques) / pc, geral: pnc + pc > 0 ? (ac + rlp) / (pc + pnc) : NaN };
};
export const depreciacaoLinear = (custo: number, residual: number, anosVida: number) => {
  if (anosVida <= 0 || residual > custo) throw new Error("Confira o custo, o valor residual e a vida útil");
  const anual = (custo - residual) / anosVida;
  return { anual, mensal: anual / 12, taxa: anual / custo };
};
export const pontoEquilibrio = (custosFixos: number, preco: number, custoVariavel: number) => {
  const margem = preco - custoVariavel;
  if (margem <= 0) throw new Error("O preço deve ser maior que o custo variável unitário");
  return { margem, unidades: custosFixos / margem, indiceMargem: margem / preco };
};
export const jurosCompostos = (capital: number, taxaPercent: number, periodos: number) => {
  const montante = capital * (1 + taxaPercent / 100) ** periodos;
  return { montante, juros: montante - capital, simples: capital * (1 + (taxaPercent / 100) * periodos) };
};

// ───────── Estatística: distribuição normal ─────────
/** Função de distribuição acumulada da normal padrão (aproximação de Abramowitz e Stegun, erro da ordem de 1e-7). */
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z >= 0 ? 1 - p : p;
}
export function escorePadrao(x: number, media: number, desvio: number) {
  if (desvio <= 0) throw new Error("O desvio padrão deve ser maior que zero");
  const z = (x - media) / desvio;
  return { z, abaixo: normalCdf(z), acima: 1 - normalCdf(z) };
}
