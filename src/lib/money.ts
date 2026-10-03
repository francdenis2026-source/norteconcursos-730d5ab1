// Dinheiro em CENTAVOS (inteiro): nunca somar valores com vírgula flutuante.

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 1990 -> "R$ 19,90" */
export function formatBRL(cents: number): string {
  return brl.format(cents / 100);
}

/**
 * Lê o que a pessoa digitou ("19,90", "1.234,56", "R$ 10", "10.5") e devolve centavos.
 * Retorna null se não for um valor válido (> 0).
 */
export function parseBRLToCents(input: string): number | null {
  const cleaned = input.replace(/[^\d.,]/g, "").trim();
  if (!cleaned) return null;
  let normalized: string;
  if (cleaned.includes(",")) {
    // vírgula = decimal; pontos = milhar
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
    // "1.234" = mil duzentos e trinta e quatro
    normalized = cleaned.replace(/\./g, "");
  } else {
    normalized = cleaned;
  }
  const value = Number(normalized);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
}

/** 2026-10 -> { first: "2026-10-01", last: "2026-10-31" } */
export function monthRange(month: string): { first: string; last: string } {
  const [y = 1970, m = 1] = month.split("-").map(Number);
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const pad = (n: number) => String(n).padStart(2, "0");
  return { first: `${y}-${pad(m)}-01`, last: `${y}-${pad(m)}-${pad(lastDay)}` };
}

/** Os últimos `count` meses terminando em `month` (mais recente primeiro). */
export function lastMonths(month: string, count: number): string[] {
  const [y = 1970, m = 1] = month.split("-").map(Number);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(Date.UTC(y, m - 1 - i, 1));
    out.push(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
  }
  return out;
}
