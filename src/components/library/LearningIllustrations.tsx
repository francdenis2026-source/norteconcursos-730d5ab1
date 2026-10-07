import { useId, useState } from "react";
import { truthValues, vennRegions, twoDraws, ledgerBalance } from "@/lib/learningDiagrams";
import type { StudyEnrichment } from "@/lib/studyEnrichment";

const bool = (value: boolean) => (value ? "V" : "F");
const percent = (value: number) =>
  `${(value * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export function LearningIllustration({
  illustration,
}: {
  illustration: StudyEnrichment["content"]["illustrations"][number];
}) {
  return (
    <figure className="worked-illustration">
      <figcaption>
        <strong>{illustration.title}</strong>
        <p>{illustration.caption}</p>
      </figcaption>
      {illustration.kind === "truth" ? (
        <TruthDiagram />
      ) : illustration.kind === "venn" ? (
        <VennDiagram />
      ) : illustration.kind === "probability" ? (
        <ProbabilityDiagram />
      ) : illustration.kind === "ledger" ? (
        <LedgerDiagram illustration={illustration} />
      ) : (
        <ol className="worked-flow" aria-label={illustration.title}>
          {illustration.nodes?.map((node, i) => (
            <li key={i}>
              <span>{i + 1}</span>
              <p>{node}</p>
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
function TruthDiagram() {
  const [p, setP] = useState(true),
    [q, setQ] = useState(false);
  const values = truthValues(p, q);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <label>
          p: estudei{" "}
          <select value={String(p)} onChange={(e) => setP(e.target.value === "true")}>
            <option value="true">Verdadeiro</option>
            <option value="false">Falso</option>
          </select>
        </label>
        <label>
          q: revisei{" "}
          <select value={String(q)} onChange={(e) => setQ(e.target.value === "true")}>
            <option value="true">Verdadeiro</option>
            <option value="false">Falso</option>
          </select>
        </label>
      </div>
      <div aria-live="polite" className="worked-result">
        Se estudei, então revisei: <strong>{bool(values.conditional)}</strong>. Negação (estudei e
        não revisei): <strong>{bool(values.negatedConditional)}</strong>.
      </div>
      <div
        className="worked-table"
        tabIndex={0}
        role="region"
        aria-label="Tabela-verdade dos conectivos"
      >
        <table>
          <thead>
            <tr>
              {["p", "q", "p ∧ q", "p ∨ q", "p → q", "¬(p → q)", "p ↔ q"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [true, true],
              [true, false],
              [false, true],
              [false, false],
            ].map(([a, b], i) => {
              const r = truthValues(a!, b!);
              return (
                <tr
                  key={i}
                  aria-selected={p === a && q === b}
                  className={p === a && q === b ? "worked-selected" : ""}
                >
                  {[a!, b!, r.and, r.or, r.conditional, r.negatedConditional, r.biconditional].map(
                    (v, n) => (
                      <td key={n}>{bool(v)}</td>
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        Mude p e q e compare as quatro linhas. O exemplo representa lógica clássica, não uma relação
        causal entre estudar e revisar.
      </p>
    </div>
  );
}
function VennDiagram() {
  const [operation, setOperation] = useState("union");
  const id = useId();
  const r = vennRegions(30, 18, 16, 8);
  const labels = {
    union: "União A ∪ B",
    intersection: "Interseção A ∩ B",
    difference: "Diferença A − B",
    outside: "Fora de A ∪ B",
  };
  const count =
    operation === "union"
      ? r.union
      : operation === "intersection"
        ? r.both
        : operation === "difference"
          ? r.onlyA
          : r.neither;
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Operação entre conjuntos">
        {Object.entries(labels).map(([key, label]) => (
          <button
            key={key}
            aria-pressed={operation === key}
            className="worked-choice"
            onClick={() => setOperation(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 520 280"
        role="img"
        aria-label={`30 alunos: somente Português ${r.onlyA}, ambas ${r.both}, somente Informática ${r.onlyB}, nenhuma ${r.neither}. Região selecionada: ${count}.`}
        className="worked-svg"
      >
        <defs>
          <clipPath id={id}>
            <circle cx="320" cy="140" r="95" />
          </clipPath>
        </defs>
        <rect
          x="5"
          y="5"
          width="510"
          height="270"
          rx="16"
          fill={operation === "outside" ? "var(--primary)" : "var(--card)"}
          fillOpacity={operation === "outside" ? 0.18 : 1}
          stroke="currentColor"
        />
        <circle
          cx="200"
          cy="140"
          r="95"
          fill={
            operation === "union" || operation === "difference" ? "var(--primary)" : "var(--card)"
          }
          fillOpacity={operation === "union" || operation === "difference" ? 0.22 : 1}
          stroke="currentColor"
        />
        <circle
          cx="320"
          cy="140"
          r="95"
          fill={operation === "union" ? "var(--primary)" : "var(--card)"}
          fillOpacity={operation === "union" ? 0.22 : 1}
          stroke="currentColor"
        />
        {operation === "intersection" && (
          <circle
            cx="200"
            cy="140"
            r="95"
            clipPath={`url(#${id})`}
            fill="var(--primary)"
            fillOpacity="0.3"
          />
        )}
        <g fill="currentColor" textAnchor="middle" fontSize="20">
          <text x="185" y="30">
            A: Português
          </text>
          <text x="335" y="30">
            B: Informática
          </text>
          <text x="165" y="145">
            {r.onlyA}
          </text>
          <text x="260" y="145">
            {r.both}
          </text>
          <text x="355" y="145">
            {r.onlyB}
          </text>
          <text x="470" y="245">
            {r.neither}
          </text>
        </g>
      </svg>
      <p className="worked-result" aria-live="polite">
        Região selecionada: <strong>{count} alunos</strong>. União: 18 + 16 − 8 = 26; fora da união:
        30 − 26 = 4.
      </p>
      <p className="text-sm">
        Os números dentro das regiões são exclusivos: 10 + 8 + 8 + 4 = 30. Os totais A = 18 e B = 16
        já incluem a interseção.
      </p>
    </div>
  );
}
function ProbabilityDiagram() {
  const [replacement, setReplacement] = useState(false);
  const paths = twoDraws(2, 1, replacement);
  return (
    <div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={replacement}
          onChange={(e) => setReplacement(e.target.checked)}
        />
        Repor a primeira bola antes da segunda retirada
      </label>
      <svg
        viewBox="0 0 560 290"
        className="worked-svg"
        role="img"
        aria-label={`Urna com duas bolas vermelhas e uma azul; duas retiradas ${replacement ? "com" : "sem"} reposição. As probabilidades de cada caminho estão na tabela.`}
      >
        <g stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M50 145 L235 70 L430 30 M235 70 L430 110 M50 145 L235 215 L430 185 M235 215 L430 265" />
        </g>
        <g fill="currentColor" fontSize="17">
          <text x="10" y="145">
            Urna
          </text>
          <text x="135" y="80">
            2/3
          </text>
          <text x="130" y="215">
            1/3
          </text>
          <text x="215" y="65">
            V
          </text>
          <text x="215" y="240">
            A
          </text>
          <text x="310" y="40">
            {replacement ? "2/3" : "1/2"}
          </text>
          <text x="310" y="112">
            {replacement ? "1/3" : "1/2"}
          </text>
          <text x="310" y="182">
            {replacement ? "2/3" : "1"}
          </text>
          <text x="310" y="265">
            {replacement ? "1/3" : "0"}
          </text>
          {["V → V", "V → A", "A → V", "A → A"].map((label, i) => (
            <text key={label} x="440" y={[35, 115, 190, 270][i]}>
              {label}
            </text>
          ))}
        </g>
      </svg>
      <div
        className="worked-table"
        role="region"
        aria-label="Probabilidade de cada caminho"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th>Caminho</th>
              <th>Primeira retirada</th>
              <th>Segunda, dada a primeira</th>
              <th>Produto</th>
            </tr>
          </thead>
          <tbody>
            {paths.map((path) => (
              <tr key={path.path}>
                <td>{path.path}</td>
                <td>{percent(path.first)}</td>
                <td>{percent(path.second)}</td>
                <td>{percent(path.probability)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="worked-result" aria-live="polite">
        Duas vermelhas: <strong>{replacement ? "4/9" : "1/3"}</strong>. Sem reposição, a segunda
        probabilidade muda conforme a primeira bola. Com reposição e sorteios uniformes
        independentes, a composição é restaurada.
      </p>
    </div>
  );
}
function LedgerDiagram({
  illustration,
}: {
  illustration: StudyEnrichment["content"]["illustrations"][number];
}) {
  const debits = illustration.debits ?? [],
    credits = illustration.credits ?? [],
    nature = illustration.nature ?? "devedora";
  const r = ledgerBalance(
    debits.map((d) => d.value),
    credits.map((c) => c.value),
    nature,
  );
  const rows = Math.max(debits.length, credits.length, 1);
  return (
    <div>
      <div
        className="worked-ledger"
        role="img"
        aria-label={`Razonete da conta ${illustration.account ?? ""}, natureza ${nature}. Total débito ${money(r.totalDebit)}, total crédito ${money(r.totalCredit)}, saldo ${money(r.balance)} ${r.side ?? "nulo"}.`}
      >
        <div className="worked-ledger-title">{illustration.account ?? "Conta"}</div>
        <div className="worked-ledger-grid">
          <div className="worked-ledger-col worked-ledger-debit">
            <span className="worked-ledger-head">Débito</span>
            {Array.from({ length: rows }).map((_, i) => {
              const e = debits[i];
              return (
                <div key={i} className="worked-ledger-row">
                  {e ? (
                    <>
                      <span>{e.label}</span>
                      <span>{money(e.value)}</span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="worked-ledger-col worked-ledger-credit">
            <span className="worked-ledger-head">Crédito</span>
            {Array.from({ length: rows }).map((_, i) => {
              const e = credits[i];
              return (
                <div key={i} className="worked-ledger-row">
                  {e ? (
                    <>
                      <span>{e.label}</span>
                      <span>{money(e.value)}</span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`worked-ledger-balance${r.unusual ? " worked-ledger-balance--unusual" : ""}`}
        >
          Saldo {r.side ?? "nulo"}: <strong>{money(r.balance)}</strong>
          {r.unusual && " — incomum para conta de natureza " + nature}
        </div>
      </div>
      <p className="text-sm mt-2">
        Conta de natureza <strong>{nature}</strong>: o saldo normal fica do lado{" "}
        {nature === "devedora" ? "do débito" : "do crédito"}.{" "}
        {r.unusual
          ? "Aqui o saldo inverteu — vale conferir os lançamentos."
          : "Os lançamentos acima seguem o padrão esperado."}
      </p>
    </div>
  );
}
