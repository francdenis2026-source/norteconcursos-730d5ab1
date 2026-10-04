import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, FileText, Layers, Loader2, Scale } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { canonicalSubject } from "@/lib/subjects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/exam-panorama")({ component: ExamPanoramaPage });

interface Row {
  contest_name: string;
  exam_year: number;
  career_name: string;
  exam_board: string;
  subject: string;
  items: number;
  scope: "federal" | "estadual" | "municipal";
  family: string;
}

const SCOPES: [string, string][] = [
  ["all", "Todas as esferas"],
  ["federal", "Federal (nacional)"],
  ["estadual", "Estadual / Distrital"],
  ["municipal", "Municipal"],
];
const SCOPE_LABEL: Record<string, string> = { federal: "Federal", estadual: "Estadual/Distrital", municipal: "Municipal" };

const examKey = (r: Row) => `${r.contest_name}|${r.exam_year}|${r.career_name}`;

function Pills<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: [T, string][]; label: string }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={label}>
      {options.map(([id, text]) => (
        <button key={id} type="button" role="tab" aria-selected={value === id} onClick={() => onChange(id)}
          className={cn("rounded-full border px-3 py-1 text-xs font-semibold transition-colors", value === id ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
          {text}
        </button>
      ))}
    </div>
  );
}

function ExamPanoramaPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [rows, setRows] = React.useState<Row[] | null>(null);
  const [error, setError] = React.useState(false);
  const [scope, setScope] = React.useState("all");
  const [family, setFamily] = React.useState("all");
  const real = !!user && user.id !== "demo-user";

  React.useEffect(() => {
    if (authLoading || !real) return;
    void supabase.rpc("exam_panorama").then(({ data, error: e }) => {
      if (e) setError(true);
      else setRows(((data as Row[]) ?? []).map((r) => ({ ...r, subject: canonicalSubject(r.subject) })));
    });
  }, [authLoading, real]);

  const families = React.useMemo(() => {
    const set = new Set((rows ?? []).filter((r) => scope === "all" || r.scope === scope).map((r) => r.family));
    return ["all", ...[...set].sort()];
  }, [rows, scope]);

  const view = React.useMemo(() => {
    const list = (rows ?? []).filter((r) => (scope === "all" || r.scope === scope) && (family === "all" || r.family === family));
    const exams = new Map<string, { row: Row; items: number; subjects: Set<string> }>();
    const subjects = new Map<string, { items: number; exams: Set<string> }>();
    for (const r of list) {
      const e = exams.get(examKey(r)) ?? { row: r, items: 0, subjects: new Set<string>() };
      e.items += r.items;
      e.subjects.add(r.subject);
      exams.set(examKey(r), e);
      const s = subjects.get(r.subject) ?? { items: 0, exams: new Set<string>() };
      s.items += r.items;
      s.exams.add(examKey(r));
      subjects.set(r.subject, s);
    }
    const total = list.reduce((n, r) => n + r.items, 0);
    const n = exams.size;
    const table = [...subjects.entries()]
      .map(([name, s]) => ({ name, items: s.items, share: total ? (100 * s.items) / total : 0, inExams: s.exams.size, avg: s.items / Math.max(1, s.exams.size) }))
      .sort((a, b) => b.items - a.items);
    return {
      total,
      n,
      boards: new Set(list.map((r) => r.exam_board)).size,
      table,
      exams: [...exams.values()].sort((a, b) => b.row.exam_year - a.row.exam_year || a.row.contest_name.localeCompare(b.row.contest_name)),
    };
  }, [rows, scope, family]);

  if (authLoading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;
  if (!real) {
    return <LockedState image="exam-hall" title={<>Panorama das <em>provas</em></>} description="Entre na sua conta para ver o que mais caiu nas provas já realizadas, por esfera e por carreira." />;
  }

  const top = view.table.slice(0, 3);
  const always = view.table.filter((s) => view.n > 1 && s.inExams === view.n).map((s) => s.name);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero image="exam-hall" size="sm" kicker="Objetivo" icon={BarChart3} title={<>Panorama das <em>provas</em></>}
        description="O que mais caiu nas provas oficiais já analisadas pela plataforma. A mesma informação para todos os alunos, como norte para escolher o que estudar." />

      <Card>
        <CardContent className="space-y-3 pt-6">
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Esfera</p>
            <Pills label="Esfera" value={scope} options={SCOPES} onChange={(v) => { setScope(v); setFamily("all"); }} />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Carreira / órgão</p>
            <Pills label="Carreira" value={family} onChange={setFamily} options={families.map((f) => [f, f === "all" ? "Todas" : f] as [string, string])} />
          </div>
        </CardContent>
      </Card>

      {error && <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">Não foi possível carregar o panorama. Confirme que a migration exam_panorama foi aplicada no banco.</p>}
      {!rows && !error && <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>}

      {rows && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              [FileText, "Provas analisadas", view.n],
              [Layers, "Itens analisados", view.total.toLocaleString("pt-BR")],
              [Scale, "Bancas", view.boards],
              [BarChart3, "Disciplinas", view.table.length],
            ].map(([Icon, label, value]) => {
              const I = Icon as typeof FileText;
              return (
                <div key={String(label)} className="rounded-xl border bg-card p-4">
                  <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground"><I className="h-3.5 w-3.5" /> {String(label)}</p>
                  <p className="mt-1 text-2xl font-black tabular-nums">{String(value)}</p>
                </div>
              );
            })}
          </div>

          {view.n === 0 ? (
            <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Nenhuma prova analisada para este filtro ainda.</CardContent></Card>
          ) : (
            <>
              <Card className="border-primary/40">
                <CardHeader>
                  <CardTitle className="text-base">Leitura rápida</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 text-sm">
                  <p>
                    Nas {view.n} {view.n === 1 ? "prova analisada" : "provas analisadas"} deste filtro, as disciplinas que mais pesam são{" "}
                    {top.map((t, i) => (
                      <span key={t.name}><strong>{t.name}</strong> ({t.share.toFixed(0)}%){i < top.length - 2 ? ", " : i === top.length - 2 ? " e " : ""}</span>
                    ))}
                    .
                  </p>
                  {always.length > 0 && <p>Aparecem em <strong>todas</strong> as provas: {always.join(", ")}.</p>}
                  {view.n < 3 && <p className="text-muted-foreground">Poucas provas neste filtro: a leitura ainda é preliminar.</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peso de cada disciplina</CardTitle>
                  <CardDescription>Parcela dos itens, em quantas provas aparece e média de itens por prova.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {view.table.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                        <span className="font-semibold">{s.name}</span>
                        <span className="tabular-nums text-muted-foreground">{s.share.toFixed(1)}% · {s.items} itens · em {s.inExams}/{view.n} provas · ~{s.avg.toFixed(0)} por prova</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (s.share / (view.table[0]?.share || 1)) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provas analisadas</CardTitle>
                  <CardDescription>Os concursos que compõem este panorama.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead className="text-xs text-muted-foreground">
                        <tr><th className="py-1.5 pr-3">Concurso</th><th className="pr-3">Cargo</th><th className="pr-3">Ano</th><th className="pr-3">Banca</th><th className="pr-3">Esfera</th><th className="text-right">Itens</th></tr>
                      </thead>
                      <tbody>
                        {view.exams.map((e) => (
                          <tr key={examKey(e.row)} className="border-t align-top">
                            <td className="py-2 pr-3 font-medium">{e.row.contest_name}</td>
                            <td className="pr-3 text-muted-foreground">{e.row.career_name}</td>
                            <td className="pr-3 tabular-nums">{e.row.exam_year}</td>
                            <td className="pr-3">{e.row.exam_board}</td>
                            <td className="pr-3"><Badge variant="outline">{SCOPE_LABEL[e.row.scope]}</Badge></td>
                            <td className="text-right tabular-nums">{e.items}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <p className="text-xs text-muted-foreground">
            Base: provas oficiais cadastradas na plataforma (itens ativos e em revisão). Nem toda prova de cada órgão está cadastrada; o
            panorama cresce conforme novas provas são analisadas. É uma leitura de incidência para orientar o estudo.
          </p>
          <Button asChild variant="outline" size="sm"><Link to="/dashboard/study-coach">Montar meu plano de estudos</Link></Button>
        </>
      )}
    </div>
  );
}
