import { useMemo, useState } from "react";
import { useLegalExplanation, type LegalUnit } from "@/lib/legalCourses";
import { LegalRefText } from "./LegalRefText";

type Item = { text: string; correct: boolean; why: string };

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** "Certo ou errado?": afirmações tiradas da explicação do artigo (pontos = certas; assertivas de prova = erradas). */
function buildItems(e: { pontos: string[]; prova: string[]; atencao: string[]; simples: string }, seed: string): Item[] {
  const wrong: Item[] = e.prova.flatMap((p) => {
    const m = p.match(/^Assertiva que (.+?) erra(?::\s*(.+?))?\.?$/);
    return m ? [{ text: `Segundo o artigo, ${m[1]}.`, correct: false, why: m[2] ? `Na verdade: ${m[2]}.` : (e.atencao[0] ?? e.simples) }] : [];
  });
  const right: Item[] = e.pontos.slice(0, 2).map((t) => ({ text: `Segundo o artigo: ${t.replace(/\.$/, "")}.`, correct: true, why: "Isso está no artigo." }));
  return [...right, ...wrong.slice(0, 2)].sort((a, b) => hash(seed + a.text) - hash(seed + b.text));
}

export function UnitTrueFalse({ unit, userId }: { unit: LegalUnit; userId: string }) {
  const { data: e } = useLegalExplanation(unit.id, userId);
  const items = useMemo(() => (e ? buildItems(e, unit.id) : []), [e, unit.id]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  if (!items.length) return null;
  const done = i >= items.length;
  const item = items[i];
  const answer = (v: boolean) => { if (pick !== null) return; setPick(v); if (v === item!.correct) setScore((s) => s + 1); };
  const next = () => { setPick(null); setI((n) => n + 1); };
  const restart = () => { setPick(null); setI(0); setScore(0); };
  return (
    <section className="space-y-3 rounded-2xl border p-4" aria-label="Certo ou errado">
      <h3 className="font-bold">✅ Teste rápido: certo ou errado?</h3>
      {done ? (
        <div className="space-y-2">
          <p className="text-sm">Você acertou {score} de {items.length}. {score === items.length ? "Muito bem, pode seguir." : "Releia a explicação acima e tente de novo."}</p>
          <button type="button" onClick={restart} className="rounded-lg border px-3 py-2 text-sm">Refazer</button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Afirmação {i + 1} de {items.length}</p>
          <p className="text-sm leading-7"><LegalRefText text={item!.text} /></p>
          <div className="flex gap-2">
            {([true, false] as const).map((v) => (
              <button key={String(v)} type="button" disabled={pick !== null} onClick={() => answer(v)}
                className={`rounded-lg border px-4 py-2 text-sm ${pick === v ? (v === item!.correct ? "border-emerald-500 bg-emerald-500/10" : "border-rose-500 bg-rose-500/10") : ""}`}>
                {v ? "Certo" : "Errado"}
              </button>
            ))}
          </div>
          {pick !== null && (
            <div className="space-y-2 rounded-lg bg-muted p-3 text-sm" role="status">
              <p className="font-semibold">{pick === item!.correct ? "Acertou!" : "Não foi dessa vez."} A afirmação está {item!.correct ? "certa" : "errada"}.</p>
              <p><LegalRefText text={item!.why} /></p>
              <button type="button" onClick={next} className="rounded-lg border px-3 py-1.5 text-sm">{i + 1 < items.length ? "Próxima" : "Ver resultado"}</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
