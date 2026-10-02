import React from "react";
import { Brain, ChevronDown, Flag, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PlanEdition {
  key: string;
  year: string;
  correct: number;
  wrong: number;
  blank: number;
  net: number | null;
  cutoff: number | null;
  hasItems: boolean;
}

export interface PlanSubject {
  subject: string;
  correct: number;
  wrong: number;
  blank: number;
  total: number;
  accuracy: number;
}

export interface WeakItem {
  edition: string;
  item: number;
  verdict: "errada" | "branco";
  subject: string;
}

const tone = (value: number) =>
  value >= 70 ? "bg-emerald-500" : value >= 50 ? "bg-amber-500" : "bg-rose-500";

const round1 = (value: number) => Math.round(value * 10) / 10;

// Raio-X de TODAS as edições de um concurso (ex.: PF 2014, 2018, 2021 e 2025 juntas), mapa dos
// pontos fracos (erros e brancos por disciplina) e um plano para chegar à nota de corte. Em prova
// CEBRASPE (certo/errado com penalidade) um erro vale -1, então virar erro em acerto rende +2 e
// virar branco em acerto rende +1.
export function ContestPlanCard({
  contest,
  editions,
  subjects,
  weakItems,
  cebraspe,
  unclassifiedLabel,
  defaultOpen = false,
}: {
  contest: string;
  editions: PlanEdition[];
  subjects: PlanSubject[];
  weakItems: WeakItem[];
  cebraspe: boolean;
  unclassifiedLabel: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const gain = cebraspe ? 2 : 1;

  const classified = subjects.filter((s) => s.subject !== unclassifiedLabel);
  const ranked = classified
    .filter((s) => s.wrong + s.blank > 0)
    .map((s) => ({ ...s, recover: s.wrong * gain + s.blank }))
    .sort((a, b) => b.recover - a.recover || a.accuracy - b.accuracy);
  const itemsBySubject = new Map<string, WeakItem[]>();
  for (const weak of weakItems) {
    const list = itemsBySubject.get(weak.subject) ?? [];
    list.push(weak);
    itemsBySubject.set(weak.subject, list);
  }
  const latest = [...editions].reverse().find((e) => e.net !== null && e.cutoff !== null);
  const gap = latest ? round1((latest.cutoff ?? 0) - (latest.net ?? 0)) : null;
  const picks: typeof ranked = [];
  if (gap !== null && gap > 0) {
    let sum = 0;
    for (const subject of ranked) {
      picks.push(subject);
      sum += subject.recover;
      if (sum >= gap) break;
    }
  }
  const detailedEditions = editions.filter((e) => e.hasItems).length;
  const errorRate = latest
    ? Math.round((latest.wrong / Math.max(1, latest.correct + latest.wrong)) * 100)
    : null;

  return (
    <Card
      className={cn("overflow-hidden border-slate-200 shadow-sm", open && "border-emerald-300")}
    >
      <button type="button" className="w-full text-left" onClick={() => setOpen((v) => !v)}>
        <CardHeader className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/30">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flag className="h-5 w-5 text-emerald-600" /> {contest}
                <Badge variant="outline">{editions.length} edição(ões)</Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                Raio-X de todas as edições, mapa de pontos fracos e plano para chegar à nota de
                corte.
              </CardDescription>
            </div>
            <ChevronDown
              className={cn("mt-1 h-5 w-5 shrink-0 transition-transform", open && "rotate-180")}
            />
          </div>
        </CardHeader>
      </button>
      {open && (
        <CardContent className="space-y-8 border-t bg-slate-50/50 pt-5 dark:bg-slate-950/20">
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-black">
              <Target className="h-4 w-4" /> Edições e nota de corte
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-xs">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="py-1 pr-3">Ano</th>
                    <th className="py-1 pr-3">Acertos</th>
                    <th className="py-1 pr-3">Erros</th>
                    <th className="py-1 pr-3">Branco</th>
                    <th className="py-1 pr-3">Nota líquida</th>
                    <th className="py-1 pr-3">Corte</th>
                    <th className="py-1">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {editions.map((e) => {
                    const diff =
                      e.net !== null && e.cutoff !== null ? round1(e.net - e.cutoff) : null;
                    return (
                      <tr key={e.key} className="border-t">
                        <td className="py-1.5 pr-3 font-bold">{e.year}</td>
                        <td className="py-1.5 pr-3">{e.correct}</td>
                        <td className="py-1.5 pr-3">{e.wrong}</td>
                        <td className="py-1.5 pr-3">{e.blank}</td>
                        <td className="py-1.5 pr-3">{e.net ?? "—"}</td>
                        <td className="py-1.5 pr-3">{e.cutoff ?? "—"}</td>
                        <td className="py-1.5">
                          {diff === null ? (
                            <span className="text-muted-foreground">corte não cadastrado</span>
                          ) : diff >= 0 ? (
                            <span className="font-bold text-emerald-600">
                              acima do corte (+{diff})
                            </span>
                          ) : (
                            <span className="font-bold text-rose-600">
                              faltaram {Math.abs(diff)}
                            </span>
                          )}
                          {!e.hasItems && (
                            <span className="ml-2 text-[10px] text-muted-foreground">
                              sem detalhe por questão
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-black">
              <Brain className="h-4 w-4 text-violet-600" /> Raio-X de todas as edições
            </h3>
            <p className="text-xs text-muted-foreground">
              {detailedEditions} de {editions.length} edição(ões) têm detalhe por questão; as demais
              entram só nos totais e na nota de corte.
            </p>
            {classified.length ? (
              <div className="space-y-3">
                {classified.map((s) => (
                  <div key={s.subject}>
                    <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
                      <span className="min-w-0 font-bold">{s.subject}</span>
                      <span className={cn("shrink-0 font-black", s.total ? "" : "text-slate-500")}>
                        {s.total ? `${s.accuracy}%` : "—"}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={cn("h-full rounded-full", tone(s.accuracy))}
                        style={{ width: `${s.total ? s.accuracy : 0}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {s.total
                        ? `${s.correct} acertos · ${s.wrong} erros · ${s.blank} em branco`
                        : "Cobrada no concurso, sem itens seus classificados"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Ainda não há questões com disciplina cadastrada para este concurso.
              </p>
            )}
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black">
              Mapa de pontos fracos (erros e questões em branco)
            </h3>
            {ranked.length ? (
              <div className="space-y-4">
                {ranked.map((s) => {
                  const items = itemsBySubject.get(s.subject) ?? [];
                  return (
                    <div key={s.subject} className="rounded-2xl border bg-background p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-sm font-black">{s.subject}</span>
                        <span className="text-xs text-muted-foreground">
                          {s.wrong} erro(s) · {s.blank} em branco · até +{s.recover} ponto(s) se
                          virarem acertos
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {items.slice(0, 24).map((weak) => (
                          <span
                            key={`${weak.edition}-${weak.item}`}
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold",
                              weak.verdict === "errada"
                                ? "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
                            )}
                            title={weak.verdict === "errada" ? "Erro" : "Em branco"}
                          >
                            {weak.edition} · item {weak.item}
                          </span>
                        ))}
                        {items.length > 24 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{items.length - 24} questões
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Não há erros ou questões em branco com disciplina cadastrada para mapear.
              </p>
            )}
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black">Plano para passar neste concurso</h3>
            {latest && gap !== null ? (
              <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed">
                <li>
                  <strong>Onde você está:</strong> na edição de {latest.year} a sua nota líquida foi{" "}
                  {latest.net} e o corte foi {latest.cutoff}.{" "}
                  {gap > 0
                    ? `Faltaram ${gap} ponto(s).`
                    : "Você ficou acima do corte; o objetivo agora é manter e ganhar folga."}
                </li>
                {gap > 0 && (
                  <li>
                    <strong>O que isso exige:</strong> {gap} ponto(s) líquidos equivalem a cerca de{" "}
                    {Math.ceil(gap / gain)} erro(s) virando acerto{gain === 2 ? " (+2 cada)" : ""},
                    ou {Math.ceil(gap)} questão(ões) em branco virando acerto (+1 cada). Misturar os
                    dois caminhos também funciona.
                  </li>
                )}
                {gap > 0 && picks.length > 0 && (
                  <li>
                    <strong>Onde buscar esses pontos primeiro</strong> (maior retorno primeiro):
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {picks.map((s) => (
                        <li key={s.subject}>
                          {s.subject}: {s.wrong} erro(s) e {s.blank} em branco nas edições com
                          detalhe, até +{s.recover} ponto(s).
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {cebraspe && errorRate !== null && (
                  <li>
                    <strong>Estratégia de prova:</strong> em prova CEBRASPE um erro anula um acerto.{" "}
                    {errorRate >= 25
                      ? `Na edição de ${latest.year} ${errorRate}% das questões respondidas estavam erradas: só marque quando tiver segurança e deixe em branco o que for chute.`
                      : `Na edição de ${latest.year} a sua taxa de erro foi ${errorRate}%; vale ampliar os acertos nas disciplinas acima sem aumentar o chute.`}
                  </li>
                )}
                <li>
                  <strong>Rotina sugerida:</strong> para cada disciplina da lista, revisar o
                  conceito das questões que você errou ou deixou em branco, refazer questões do
                  mesmo assunto em 24 horas e de novo em 7 dias, e só então avançar para a próxima
                  disciplina.
                </li>
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                Para traçar o plano é preciso a nota de corte de pelo menos uma edição deste
                concurso; ela ainda não está cadastrada. O mapa de pontos fracos acima já mostra
                onde estão os pontos a recuperar.
              </p>
            )}
          </section>
        </CardContent>
      )}
    </Card>
  );
}
