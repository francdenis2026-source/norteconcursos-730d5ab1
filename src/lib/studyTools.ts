/** Lógica pura das ferramentas de estudo (calculadora, estatística, combinatória, tabela-verdade). Sem eval. */

// ───────── Calculadora: analisador descendente recursivo ─────────
type Tok = { t: "num"; v: number } | { t: "op"; v: string } | { t: "id"; v: string };

function tokenize(src: string): Tok[] {
  const s = src.replace(/,/g, ".").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/π/g, "pi").replace(/√/g, "sqrt");
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i]!;
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j]!)) j++;
      const raw = s.slice(i, j);
      const n = Number(raw);
      if (!Number.isFinite(n) || raw.split(".").length > 2) throw new Error("Número inválido");
      out.push({ t: "num", v: n });
      i = j;
    } else if (/[a-z]/i.test(c)) {
      let j = i;
      while (j < s.length && /[a-z]/i.test(s[j]!)) j++;
      out.push({ t: "id", v: s.slice(i, j).toLowerCase() });
      i = j;
    } else if ("+-*/^%()!".includes(c)) { out.push({ t: "op", v: c }); i++; }
    else throw new Error("Símbolo inválido");
  }
  return out;
}

const FN: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt, abs: Math.abs, ln: Math.log, log: Math.log10, sin: (x) => Math.sin((x * Math.PI) / 180),
  cos: (x) => Math.cos((x * Math.PI) / 180), tan: (x) => Math.tan((x * Math.PI) / 180),
};

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) throw new Error("Fatorial inválido");
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/** Avalia uma expressão aritmética: + - × ÷ ^ % ! ( ), π e funções sqrt, abs, ln, log, sin, cos, tan (graus). */
export function calc(expr: string): number {
  const toks = tokenize(expr);
  let p = 0;
  const isOp = (v: string) => { const k = toks[p]; return k?.t === "op" && k.v === v; };
  function expression(): number {
    let v = term();
    while (isOp("+") || isOp("-")) { const op = (toks[p++] as { v: string }).v; const r = term(); v = op === "+" ? v + r : v - r; }
    return v;
  }
  function term(): number {
    let v = unary();
    while (isOp("*") || isOp("/")) {
      const op = (toks[p++] as { v: string }).v; const r = unary();
      if (op === "/" && r === 0) throw new Error("Divisão por zero");
      v = op === "*" ? v * r : v / r;
    }
    return v;
  }
  function unary(): number {
    if (isOp("-")) { p++; return -unary(); }
    if (isOp("+")) { p++; return unary(); }
    return power();
  }
  function power(): number {
    const b = postfix();
    if (isOp("^")) { p++; return Math.pow(b, unary()); }
    return b;
  }
  function postfix(): number {
    let v = primary();
    for (;;) {
      if (isOp("!")) { p++; v = factorial(v); }
      else if (isOp("%")) { p++; v = v / 100; }
      else return v;
    }
  }
  function primary(): number {
    const k = toks[p++];
    if (!k) throw new Error("Expressão incompleta");
    if (k.t === "num") return k.v;
    if (k.t === "id") {
      if (k.v === "pi") return Math.PI;
      const f = FN[k.v];
      if (!f) throw new Error(`Função desconhecida: ${k.v}`);
      if (!isOp("(")) throw new Error("Use parênteses após a função");
      p++;
      const a = expression();
      if (!isOp(")")) throw new Error("Falta fechar parênteses");
      p++;
      return f(a);
    }
    if (k.v === "(") {
      const v = expression();
      if (!isOp(")")) throw new Error("Falta fechar parênteses");
      p++;
      return v;
    }
    throw new Error("Expressão inválida");
  }
  const result = expression();
  if (p < toks.length) throw new Error("Expressão inválida");
  if (!Number.isFinite(result)) throw new Error("Resultado inválido");
  return result;
}

/** Formata para exibição, evitando ruído de ponto flutuante (0,1+0,2). */
export function fmt(n: number, digits = 10): string {
  return Number(n.toPrecision(digits)).toLocaleString("pt-BR", { maximumFractionDigits: 10 });
}

// ───────── Estatística descritiva ─────────
export function parseNumbers(text: string): number[] {
  return text.split(/[\s;]+/).map((x) => x.replace(",", ".")).filter(Boolean).map(Number).filter((n) => Number.isFinite(n));
}

export function describe(values: number[]) {
  const n = values.length;
  if (!n) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const mid = Math.floor(n / 2);
  const median = n % 2 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
  const freq = new Map<number, number>();
  for (const v of values) freq.set(v, (freq.get(v) ?? 0) + 1);
  const top = Math.max(...freq.values());
  const modes = top > 1 ? [...freq].filter(([, c]) => c === top).map(([v]) => v).sort((a, b) => a - b) : [];
  const ss = values.reduce((a, v) => a + (v - mean) ** 2, 0);
  const varPop = ss / n;
  const varSample = n > 1 ? ss / (n - 1) : NaN;
  return {
    n, sum, mean, median, modes, min: sorted[0]!, max: sorted[n - 1]!, range: sorted[n - 1]! - sorted[0]!,
    varPop, sdPop: Math.sqrt(varPop), varSample, sdSample: Math.sqrt(varSample),
    cv: mean !== 0 ? Math.sqrt(varPop) / Math.abs(mean) : NaN,
  };
}

// ───────── Análise combinatória (BigInt: sem estouro) ─────────
export function fat(n: number): bigint {
  if (!Number.isInteger(n) || n < 0 || n > 500) throw new Error("Use inteiros de 0 a 500");
  let r = 1n;
  for (let i = 2n; i <= BigInt(n); i++) r *= i;
  return r;
}
export function arranjo(n: number, k: number): bigint {
  if (k > n) throw new Error("k não pode ser maior que n");
  return fat(n) / fat(n - k);
}
export function combinacao(n: number, k: number): bigint {
  if (k > n) throw new Error("k não pode ser maior que n");
  return fat(n) / (fat(k) * fat(n - k));
}

// ───────── Regra de três ─────────
/** Regra de três simples: a está para b assim como c está para x (direta) ou inversamente proporcional. */
export function regraDeTres(a: number, b: number, c: number, inversa = false): number {
  if (a === 0 || (inversa && c === 0)) throw new Error("Valor não pode ser zero");
  return inversa ? (a * b) / c : (b * c) / a;
}

// ───────── Tabela-verdade ─────────
/** Operadores: ¬ ∧ ∨ → ↔ ⊻ (ou exclusivo); proposições p, q, r e s. Aceita também ~ ! & | -> <->. */
export function truthTable(source: string) {
  const s = source.replace(/<->/g, "↔").replace(/->/g, "→").replace(/[~!]/g, "¬").replace(/[&^]/g, "∧").replace(/[|]/g, "∨");
  const tokens = s.replace(/\s+/g, "").split("");
  for (const c of tokens) if (!"pqrs¬∧∨→↔⊻()".includes(c)) throw new Error(`Símbolo inválido: ${c}`);
  const vars = [...new Set(tokens.filter((c) => "pqrs".includes(c)))].sort();
  if (!vars.length) throw new Error("Use as proposições p, q, r ou s");
  if (vars.length > 4) throw new Error("Use até 4 proposições");
  type Env = Record<string, boolean>;
  type Fn = (e: Env) => boolean;
  let i = 0;
  const peek = () => tokens[i];
  function bicond(): Fn { let l = cond(); while (peek() === "↔") { i++; const r = cond(); const a = l; l = (e) => a(e) === r(e); } return l; }
  function cond(): Fn { const l = or(); if (peek() === "→") { i++; const r = cond(); return (e) => !l(e) || r(e); } return l; }
  function or(): Fn {
    let l = and();
    while (peek() === "∨" || peek() === "⊻") { const op = tokens[i++]!; const r = and(); const a = l; l = op === "∨" ? (e) => a(e) || r(e) : (e) => a(e) !== r(e); }
    return l;
  }
  function and(): Fn { let l = not(); while (peek() === "∧") { i++; const r = not(); const a = l; l = (e) => a(e) && r(e); } return l; }
  function not(): Fn { if (peek() === "¬") { i++; const x = not(); return (e) => !x(e); } return atom(); }
  function atom(): Fn {
    const c = tokens[i++];
    if (c === "(") { const x = bicond(); if (tokens[i++] !== ")") throw new Error("Falta fechar parênteses"); return x; }
    if (c && "pqrs".includes(c)) return (e) => e[c]!;
    throw new Error("Expressão inválida");
  }
  const f = bicond();
  if (i < tokens.length) throw new Error("Expressão inválida");
  const rows: { values: boolean[]; result: boolean }[] = [];
  for (let m = 0; m < 1 << vars.length; m++) {
    const env: Env = {};
    vars.forEach((v, idx) => { env[v] = !(m & (1 << (vars.length - 1 - idx))); });
    rows.push({ values: vars.map((v) => env[v]!), result: f(env) });
  }
  const all = rows.every((r) => r.result), none = rows.every((r) => !r.result);
  return { vars, rows, kind: all ? "tautologia" : none ? "contradição" : "contingência" } as const;
}
