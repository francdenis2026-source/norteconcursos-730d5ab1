import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Landmark,
  Loader2,
  Minus,
  ScanSearch,
} from "lucide-react";
import { PlanGate } from "@/components/dashboard/PlanGate";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { canonicalBoard, canonicalCareerName, canonicalSubject } from "@/lib/subjects";
import { panoramaOrganization } from "@/lib/panoramaFilters";
import {
  CONFIDENCE_LABEL,
  answerStats,
  careerOptions,
  confidence,
  dedupeQuestions,
  examKey,
  orgOptions,
  recommendations,
  recurringThemes,
  sequenceStats,
  splitByKind,
  subjectProfile,
  summarizeBoards,
  unifiedCareer,
  type BancaQuestion,
  type Verdict,
} from "@/lib/bancaProfile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/perfil-bancas")({
  component: () => (
    <PlanGate feature="bankProfile" title="Perfil das bancas">
      <PerfilBancasPage />
    </PlanGate>
  ),
});

type Row = Record<string, unknown>;
type Page = PromiseLike<{ data: Row[] | null; error: unknown }>;

async function loadQuestions(): Promise<BancaQuestion[]> {
  const rows = await fetchAllRows<Row>(
    (from, to) =>
      supabase
        .from("official_exam_questions")
        .select(
          "exam_board,contest_name,career_name,exam_year,subject,tested_topic,official_answer,item_number,question_text",
        )
        .eq("content_status", "active")
        .neq("official_answer", "X")
        .order("id")
        .range(from, to) as unknown as Page,
  );
  const out: BancaQuestion[] = [];
  for (const r of rows) {
    const board = canonicalBoard(String(r["exam_board"] ?? ""));
    if (!board || board === "Não informada") continue;
    out.push({
      board,
      contest: String(r["contest_name"] ?? ""),
      career: unifiedCareer(
        canonicalCareerName(String(r["career_name"] ?? "")),
        String(r["contest_name"] ?? ""),
      ),
      rawCareer: String(r["career_name"] ?? ""),
      org: panoramaOrganization(String(r["contest_name"] ?? "")).family,
      year: Number(r["exam_year"]),
      subject: canonicalSubject(String(r["subject"] ?? "")),
      topic: r["tested_topic"] ? String(r["tested_topic"]) : null,
      answer: String(r["official_answer"] ?? ""),
      item: r["item_number"] == null ? null : Number(r["item_number"]),
      text: String(r["question_text"] ?? ""),
    });
  }
  return out;
}

const pct = (v: number, d = 0) => `${(v * 100).toFixed(d).replace(".", ",")}%`;

const VERDICT_STYLE: Record<Verdict["level"], string> = {
  sem_dados: "border-border bg-muted/40 text-muted-foreground",
  sem_padrao: "border-emerald-500/30 bg-emerald-500/5",
  indicio: "border-amber-500/40 bg-amber-500/5",
  padrao: "border-amber-600/50 bg-amber-500/10",
};
const VERDICT_LABEL: Record<Verdict["level"], string> = {
  sem_dados: "Dados insuficientes",
  sem_padrao: "Sem padrão",
  indicio: "Indício fraco",
  padrao: "Diferença estatística",
};

function VerdictBox({ title, verdict }: { title: string; verdict: Verdict }) {
  return (
    <div className={cn("rounded-lg border p-4 text-sm", VERDICT_STYLE[verdict.level])}>
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <strong>{title}</strong>
        <Badge variant="outline" className="text-[11px]">
          {VERDICT_LABEL[verdict.level]}
        </Badge>
      </div>
      <p className="leading-relaxed">{verdict.text}</p>
    </div>
  );
}

function PerfilBancasPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const query = useQuery({
    queryKey: ["perfil-bancas"],
    enabled: real,
    staleTime: 10 * 60_000,
    queryFn: loadQuestions,
  });
  const [boardChoice, setBoardChoice] = React.useState<string | null>(null);
  const [orgChoice, setOrgChoice] = React.useState<string>("");
  const [careerChoice, setCareerChoice] = React.useState<string>("");

  const rows = React.useMemo(() => query.data ?? [], [query.data]);
  const boards = React.useMemo(() => summarizeBoards(rows), [rows]);
  const board =
    boardChoice ?? boards.find((b) => b.board === "CEBRASPE")?.board ?? boards[0]?.board ?? null;
  const summary = boards.find((b) => b.board === board) ?? null;
  const boardRows = React.useMemo(() => rows.filter((r) => r.board === board), [rows, board]);
  const orgs = React.useMemo(() => orgOptions(boardRows), [boardRows]);
  const org = orgs.some((o) => o.value === orgChoice) ? orgChoice : "";
  const orgRows = React.useMemo(
    () => (org ? boardRows.filter((r) => r.org === org) : boardRows),
    [boardRows, org],
  );
  const careers = React.useMemo(() => careerOptions(orgRows), [orgRows]);
  const career = careers.some((c) => c.value === careerChoice) ? careerChoice : "";

  const view = React.useMemo(() => {
    if (!board) return null;
    const scope = career ? orgRows.filter((r) => r.career === career) : dedupeQuestions(orgRows);
    const deduped = career ? dedupeQuestions(scope) : scope;
    const exams = new Set(deduped.map(examKey)).size;
    const conf = confidence(deduped.length, exams);
    const kinds = splitByKind(deduped);
    const answersCe = kinds.ce.length ? answerStats(kinds.ce) : null;
    const answersMc = kinds.mc.length ? answerStats(kinds.mc) : null;
    const sequence = answersCe ? sequenceStats(splitByKind(career ? scope : orgRows).ce) : null;
    const answerKinds: ("ce" | "mc")[] = [
      ...(answersCe ? (["ce"] as const) : []),
      ...(answersMc ? (["mc"] as const) : []),
    ];
    const profile = subjectProfile(deduped);
    const themes = profile.subjects
      .slice(0, 4)
      .map((s) => ({ subject: s.subject, themes: recurringThemes(deduped, s.subject) }))
      .filter((t) => t.themes.length > 0);
    const years = deduped.map((r) => r.year);
    return {
      items: deduped.length,
      exams,
      conf,
      answersCe,
      answersMc,
      sequence,
      profile,
      themes,
      first: years.length ? Math.min(...years) : null,
      last: years.length ? Math.max(...years) : null,
      recs: recommendations({
        board,
        career: career || null,
        answerKinds,
        subjects: profile.subjects,
        themes,
        conf,
      }),
    };
  }, [board, orgRows, career]);

  if (authLoading || (real && query.isLoading))
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  if (!real)
    return (
      <LockedState
        image="field-map"
        title={
          <>
            Perfil das <em>bancas</em>
          </>
        }
        description="Entre na sua conta para entender como cada banca monta as provas, com base no histórico de concursos da plataforma."
      />
    );
  if (query.isError || !summary || !view)
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <PageHero
          image="field-map"
          size="sm"
          kicker="Meu concurso"
          icon={Landmark}
          title={
            <>
              Perfil das <em>bancas</em>
            </>
          }
          description="Não foi possível carregar o histórico agora. Tente de novo em instantes."
        />
      </div>
    );

  const maxShare = Math.max(0.0001, ...view.profile.subjects.map((s) => s.share));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="field-map"
        size="sm"
        kicker="Meu concurso"
        icon={Landmark}
        title={
          <>
            Perfil das <em>bancas</em>
          </>
        }
        description="Entenda como a banca do seu concurso costuma montar a prova, com base nas provas já realizadas e no que existe de fato no acervo. Onde não há padrão, dizemos que não há."
      />

      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-3">
          <label className="space-y-1 text-sm">
            <span className="font-medium">Banca</span>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3"
              value={board ?? ""}
              onChange={(e) => {
                setBoardChoice(e.target.value);
                setOrgChoice("");
                setCareerChoice("");
              }}
            >
              {boards.map((b) => (
                <option key={b.board} value={b.board}>
                  {b.board} · {b.items} itens · {CONFIDENCE_LABEL[b.confidence]}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium">Órgão</span>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3"
              value={org}
              onChange={(e) => {
                setOrgChoice(e.target.value);
                setCareerChoice("");
              }}
            >
              <option value="">Todos os órgãos</option>
              {orgs.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.value} · {o.items} itens
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium">Cargo (unificado)</span>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3"
              value={career}
              onChange={(e) => setCareerChoice(e.target.value)}
            >
              <option value="">Todos os cargos</option>
              {careers.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.value} · {c.items} itens · {c.exams} {c.exams === 1 ? "prova" : "provas"}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-muted-foreground sm:col-span-3">
            Cargos iguais com nomes diferentes entre órgãos e anos (por exemplo, Agente de Polícia,
            Agente de Polícia Judiciária e Investigador) aparecem juntos para dar mais precisão. Use
            o filtro de órgão para separar.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-base">
            <ScanSearch className="h-4 w-4" aria-hidden /> Base da análise
            <Badge
              variant={view.conf === "alta" || view.conf === "media" ? "default" : "secondary"}
            >
              {CONFIDENCE_LABEL[view.conf]}
            </Badge>
          </CardTitle>
          <CardDescription>
            {view.items} questões oficiais em {view.exams} {view.exams === 1 ? "prova" : "provas"}
            {view.first != null
              ? ` (${view.first === view.last ? view.first : `${view.first} a ${view.last}`})`
              : ""}
            {career ? `, cargo ${career}` : ""}
            {org ? `, ${org}` : ""}. Questões repetidas entre cargos da mesma prova contam uma vez.
          </CardDescription>
        </CardHeader>
        {view.conf === "insuficiente" || view.conf === "baixa" ? (
          <CardContent>
            <p className="flex gap-2 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Poucas provas dessa banca no acervo. Leia tudo abaixo como pista, não como tendência
              confirmada.
            </p>
          </CardContent>
        ) : null}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Padrões no gabarito</CardTitle>
          <CardDescription>
            Testes estatísticos simples sobre as respostas oficiais. O resultado mais comum é “sem
            padrão”, e isso também é informação útil.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { key: "ce", title: "Provas Certo/Errado", stats: view.answersCe },
            { key: "mc", title: "Provas de múltipla escolha", stats: view.answersMc },
          ].map(({ key, title, stats }) =>
            stats ? (
              <div key={key} className="space-y-3">
                <h4 className="text-sm font-semibold">
                  {title}{" "}
                  <span className="font-normal text-muted-foreground">· {stats.n} itens</span>
                </h4>
                <div className="space-y-2">
                  {Object.entries(stats.shares)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([letter, share]) => (
                      <div key={letter} className="flex items-center gap-3 text-sm">
                        <span className="w-12 font-medium">
                          {key === "ce" ? (letter === "C" ? "Certo" : "Errado") : letter}
                        </span>
                        <div className="h-3 flex-1 overflow-hidden rounded bg-muted">
                          <div className="h-full bg-primary" style={{ width: `${share * 100}%` }} />
                        </div>
                        <span className="w-24 text-right tabular-nums text-muted-foreground">
                          {pct(share, 1)} ({stats.counts[letter]})
                        </span>
                      </div>
                    ))}
                </div>
                <VerdictBox title="Distribuição das respostas" verdict={stats.verdict} />
                {key === "ce" && view.sequence ? (
                  <VerdictBox
                    title="Ordem dos gabaritos na prova"
                    verdict={view.sequence.verdict}
                  />
                ) : null}
              </div>
            ) : null,
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            O que a banca cobra{career ? ` — ${career}` : ""}
          </CardTitle>
          <CardDescription>
            Peso médio de cada disciplina por prova. A seta compara a prova mais recente com a média
            das anteriores (só quando há pelo menos 3 provas).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {view.profile.subjects.slice(0, 12).map((s) => (
            <div key={s.subject} className="flex items-center gap-3 text-sm">
              <span className="w-44 shrink-0 truncate sm:w-56" title={s.subject}>
                {s.subject}
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded bg-muted">
                <div
                  className="h-full bg-primary/80"
                  style={{ width: `${(s.share / maxShare) * 100}%` }}
                />
              </div>
              <span className="w-28 text-right tabular-nums text-muted-foreground">
                {pct(s.share, 1)} · ~{Math.round(s.avgItems)} itens
              </span>
              <span className="w-5" aria-label={s.trend ?? "sem tendência"}>
                {s.trend === "sobe" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                ) : s.trend === "cai" ? (
                  <ArrowDownRight className="h-4 w-4 text-rose-600" />
                ) : s.trend === "estavel" ? (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                ) : null}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {view.themes.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assuntos que a banca repete</CardTitle>
            <CardDescription>
              Temas que reaparecem em provas diferentes, nas disciplinas de maior peso. Veja o
              histórico completo no Panorama das provas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {view.themes.map((t) => (
              <div key={t.subject} className="space-y-1.5">
                <h4 className="text-sm font-semibold">{t.subject}</h4>
                <ul className="space-y-1 text-sm">
                  {t.themes.slice(0, 5).map((x) => (
                    <li key={x.label} className="flex justify-between gap-3">
                      <span>{x.label}</span>
                      <span className="shrink-0 text-muted-foreground">
                        {x.exams} provas · {x.items} itens
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">O que fazer com isso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {view.recs.map((r) => (
            <div key={r.title} className="rounded-lg border p-4 text-sm">
              <strong>{r.title}</strong>
              <p className="mt-1 leading-relaxed text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="flex gap-2 px-1 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        Como ler: as contas usam apenas questões oficiais ativas do acervo. Padrão estatístico não é
        garantia de que a próxima prova repita o histórico. Para decidir o que estudar, o edital do
        seu concurso vem primeiro.
      </p>
    </div>
  );
}
