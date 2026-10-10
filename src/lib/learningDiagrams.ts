export function truthValues(p: boolean, q: boolean) {
  return {
    and: p && q,
    or: p || q,
    conditional: !p || q,
    negatedConditional: p && !q,
    biconditional: p === q,
  };
}
export function vennRegions(total: number, a: number, b: number, both: number) {
  const onlyA = a - both,
    onlyB = b - both,
    neither = total - a - b + both;
  if (![total, a, b, both, onlyA, onlyB, neither].every((n) => Number.isInteger(n) && n >= 0))
    throw new Error("Conjuntos incompatíveis");
  return { onlyA, onlyB, both, neither, union: a + b - both };
}
// Razonete (T-account): soma os lançamentos de cada lado e devolve o saldo,
// classificado pela natureza da conta (devedora ou credora) — regra que
// decide se o saldo fica do lado do débito ou do crédito.
export function ledgerBalance(debits: number[], credits: number[], nature: "devedora" | "credora") {
  if (
    !debits.every((n) => Number.isFinite(n) && n >= 0) ||
    !credits.every((n) => Number.isFinite(n) && n >= 0)
  )
    throw new Error("Lançamento inválido");
  const totalDebit = debits.reduce((a, b) => a + b, 0),
    totalCredit = credits.reduce((a, b) => a + b, 0);
  const diff = totalDebit - totalCredit;
  const side = diff === 0 ? null : diff > 0 ? "devedor" : "credor";
  const expected = nature === "devedora" ? "devedor" : "credor";
  return {
    totalDebit,
    totalCredit,
    balance: Math.abs(diff),
    side,
    unusual: side !== null && side !== expected,
  };
}
export function twoDraws(red: number, blue: number, replacement: boolean) {
  if (!Number.isInteger(red) || !Number.isInteger(blue) || red < 1 || blue < 1)
    throw new Error("Urna inválida");
  const total = red + blue,
    denominator = total - (replacement ? 0 : 1);
  return [
    {
      path: "Vermelha → Vermelha",
      first: red / total,
      second: (red - (replacement ? 0 : 1)) / denominator,
    },
    { path: "Vermelha → Azul", first: red / total, second: blue / denominator },
    { path: "Azul → Vermelha", first: blue / total, second: red / denominator },
    {
      path: "Azul → Azul",
      first: blue / total,
      second: (blue - (replacement ? 0 : 1)) / denominator,
    },
  ].map((row) => ({ ...row, probability: row.first * row.second }));
}
