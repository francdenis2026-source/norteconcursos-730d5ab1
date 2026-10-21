import { platformDate } from "@/lib/platformClock";
import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  CheckCircle2,
  Database,
  FileJson,
  Loader2,
  PowerOff,
  RefreshCw,
  Upload,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { confirmDialog } from "@/lib/confirm";
import { fetchAllRows } from "@/lib/catalog";
import {
  parseBoardImport,
  planBoardImport,
  type BoardImportQuestion,
  type BoardImportPlan,
} from "@/lib/questionImport";

export const Route = createFileRoute("/dashboard/admin-questions")({
  head: () => ({
    meta: [
      { title: "Questões de bancas (admin) | Norte Concurso" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminQuestionsPage,
});

interface Row {
  contest_name: string;
  career_name: string;
  subject: string;
  content_status: string;
  needs_visual: boolean;
  legal_review_required: boolean;
  official_answer: string;
}
function AdminQuestionsPage() {
  const { isAdmin } = useAuthStatus();
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [missing, setMissing] = React.useState(false);
  const [incoming, setIncoming] = React.useState<BoardImportQuestion[] | null>(null);
  const [plan, setPlan] = React.useState<BoardImportPlan | null>(null);
  const [checking, setChecking] = React.useState(false);
  const [checkError, setCheckError] = React.useState("");
  const [result, setResult] = React.useState<{
    inserted: number;
    ignored: number;
    complete: boolean;
  } | null>(null);
  const [fileName, setFileName] = React.useState("");
  const [progress, setProgress] = React.useState<{ done: number; total: number } | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    const all: Row[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await supabase
        .from("board_exam_questions")
        .select(
          "contest_name,career_name,subject,content_status,needs_visual,legal_review_required,official_answer",
        )
        .order("id")
        .range(from, from + 999);
      if (error) {
        setMissing(true);
        break;
      }
      all.push(...((data ?? []) as Row[]));
      if (!data || data.length < 1000) break;
    }
    setRows(all);
    setLoading(false);
  }, []);
  React.useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const byProva = React.useMemo(() => {
    const m = new Map<
      string,
      {
        contest: string;
        career: string;
        total: number;
        active: number;
        review: number;
        flagged: number;
      }
    >();
    for (const r of rows) {
      const k = `${r.contest_name}|${r.career_name}`;
      const e = m.get(k) ?? {
        contest: r.contest_name,
        career: r.career_name,
        total: 0,
        active: 0,
        review: 0,
        flagged: 0,
      };
      e.total++;
      if (r.content_status === "active") e.active++;
      if (r.content_status === "under_review") e.review++;
      if (r.needs_visual || r.legal_review_required || r.official_answer === "X") e.flagged++;
      m.set(k, e);
    }
    return [...m.values()].sort((a, b) => a.contest.localeCompare(b.contest, "pt-BR"));
  }, [rows]);
  const bySubject = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) m.set(r.subject, (m.get(r.subject) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const analyze = async (questions: BoardImportQuestion[]) => {
    setChecking(true);
    setPlan(null);
    setCheckError("");
    try {
      const stored = await fetchAllRows<BoardImportQuestion>(
        (from, to) =>
          supabase
            .from("board_exam_questions")
            .select(
              "id,board,contest_name,career_name,exam_year,exam_type,item_number,stem,options,support_text,figure_urls,needs_visual,official_answer",
            )
            .order("id")
            .range(from, to) as unknown as PromiseLike<{
            data: BoardImportQuestion[] | null;
            error: unknown;
          }>,
        1000,
      );
      setPlan(planBoardImport(questions, stored));
    } catch {
      setCheckError(
        "Não foi possível conferir todo o acervo. A importação fica bloqueada até a verificação concluir. Tente novamente.",
      );
    } finally {
      setChecking(false);
    }
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setPlan(null);
    setIncoming(null);
    setResult(null);
    setCheckError("");
    setFileName(file.name);
    setChecking(true);
    try {
      if (file.size > 20 * 1024 * 1024) throw new Error("O arquivo deve ter até 20 MB.");
      const data = parseBoardImport(JSON.parse(await file.text()));
      setIncoming(data);
      await analyze(data);
    } catch (error) {
      toast.error(
        error instanceof SyntaxError
          ? "JSON inválido. Confira o arquivo de questões."
          : (error as Error).message,
      );
      setIncoming(null);
      setChecking(false);
    }
  };

  const doImport = async () => {
    if (!incoming || !plan?.ready.length || plan.conflicts || checking || progress) return;
    setResult(null);
    setProgress({ done: 0, total: plan.ready.length });
    let inserted = 0;
    try {
      for (let i = 0; i < plan.ready.length; i += 100) {
        const chunk = plan.ready.slice(i, i + 100);
        const { data, error } = await supabase
          .from("board_exam_questions")
          .insert(chunk)
          .select("id");
        if (error) {
          setResult({ inserted, ignored: plan.duplicates, complete: false });
          toast.error(
            error.code === "23505"
              ? "Foi detectada uma repetição durante o envio. O lote foi interrompido e será conferido novamente."
              : `Falha ao importar o lote ${i / 100 + 1}: ${error.message}`,
          );
          setProgress(null);
          await analyze(incoming);
          await load();
          return;
        }
        inserted += data?.length ?? 0;
        if (data?.length !== chunk.length)
          throw new Error(
            "O banco não confirmou todas as linhas do lote. Confira o acervo antes de continuar.",
          );
        setResult({ inserted, ignored: plan.duplicates, complete: false });
        setProgress({ done: Math.min(i + 100, plan.ready.length), total: plan.ready.length });
      }
      toast.success(`${inserted} questões importadas; ${plan.duplicates} repetidas ignoradas.`);
      setResult({ inserted, ignored: plan.duplicates, complete: true });
      setProgress(null);
      setIncoming(null);
      setPlan(null);
      await load();
    } catch (error) {
      setResult({ inserted, ignored: plan.duplicates, complete: false });
      setPlan(null);
      setCheckError(
        "O envio foi interrompido. Verifique o acervo novamente antes de continuar; registros já confirmados não serão reenviados.",
      );
      toast.error(error instanceof Error ? error.message : "Não foi possível concluir o envio.");
    } finally {
      setProgress(null);
    }
  };

  const activate = async () => {
    const ok = await confirmDialog({
      title: "Ativar questões revisadas?",
      message:
        "Ativa as questões da FGV em revisão que não dependem de figura, não são de legislação e não foram anuladas. Elas passam a aparecer no treino dos alunos. Confirme que revisou o material e que tem autorização para usá-lo.",
      confirmLabel: "Ativar",
      tone: "default",
    });
    if (!ok) return;
    const { data, error } = await supabase
      .from("board_exam_questions")
      .update({ content_status: "active", verified_at: platformDate().toISOString() })
      .eq("board", "FGV")
      .eq("content_status", "under_review")
      .eq("needs_visual", false)
      .eq("legal_review_required", false)
      .neq("official_answer", "X")
      .select("id");
    if (error) return void toast.error(error.message);
    toast.success(`${data?.length ?? 0} questões ativadas.`);
    await load();
  };
  const deactivate = async () => {
    if (
      !(await confirmDialog({
        title: "Tirar todas do treino?",
        message: "As questões da FGV voltam para “em revisão” e deixam de aparecer aos alunos.",
        confirmLabel: "Tirar do treino",
      }))
    )
      return;
    const { error } = await supabase
      .from("board_exam_questions")
      .update({ content_status: "under_review" })
      .eq("board", "FGV")
      .eq("content_status", "active");
    if (error) return void toast.error(error.message);
    toast.success("Questões retiradas do treino.");
    await load();
  };

  if (!isAdmin)
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;
  const active = rows.filter((r) => r.content_status === "active").length;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração"
        icon={Database}
        title={
          <>
            Questões de <em>bancas</em>
          </>
        }
        description="Importe provas de bancas (FGV e outras), revise e libere para o treino dos alunos."
        actions={
          <Button className="hero-btn-ghost gap-2" onClick={() => void load()} disabled={loading}>
            <RefreshCw className="h-4 w-4" aria-hidden /> Atualizar
          </Button>
        }
      >
        <div className="page-hero__stats">
          <HeroStat icon={Database} label="No banco" value={rows.length} />
          <HeroStat icon={CheckCircle2} label="No treino" value={active} />
          <HeroStat
            icon={FileJson}
            label="Em revisão"
            value={rows.filter((r) => r.content_status === "under_review").length}
          />
        </div>
      </PageHero>

      {missing && (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
          A tabela <b>board_exam_questions</b> ainda não existe. Rode o arquivo{" "}
          <b>supabase/migrations/20261004130000_board_exam_questions.sql</b> no SQL Editor.
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-5 w-5" /> Importar provas
          </CardTitle>
          <CardDescription>
            Escolha o arquivo <b>fgv_questions.json</b> (pasta <code>supabase/imports/fgv</code> do
            projeto). O conteúdo é comparado no arquivo e no acervo, mesmo com outra numeração.
            Questões novas entram “em revisão”; nenhum conteúdo existente é substituído.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground hover:bg-muted/40">
            <FileJson className="h-4 w-4" aria-hidden /> {fileName || "Escolher arquivo .json"}
            <input
              type="file"
              accept="application/json,.json"
              className="sr-only"
              disabled={checking || !!progress}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.currentTarget.value = "";
                void onFile(file);
              }}
            />
          </label>
          {checking && (
            <p role="status" className="text-sm text-muted-foreground">
              Conferindo enunciados, alternativas e textos de apoio no acervo…
            </p>
          )}
          {checkError && (
            <div role="alert" className="space-y-2 text-sm">
              <p>{checkError}</p>
              <Button variant="outline" onClick={() => incoming && void analyze(incoming)}>
                Verificar novamente
              </Button>
            </div>
          )}
          {incoming && plan && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/50 p-3 text-sm">
              <span>
                <b>{plan.ready.length}</b> novas · <b>{plan.duplicates}</b> repetidas ignoradas ·{" "}
                <b>{plan.conflicts}</b> conflitos.
              </span>
              <Button
                onClick={() => void doImport()}
                disabled={!!progress || checking || !!plan.conflicts || !plan.ready.length}
                className="gap-2"
              >
                {progress ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {progress.done}/{progress.total}
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" /> Importar agora
                  </>
                )}
              </Button>
            </div>
          )}
          {plan && plan.issues.length > 0 && (
            <details className="rounded-lg border p-3 text-sm" open={plan.conflicts > 0}>
              <summary className="cursor-pointer font-medium">
                Resultado da verificação ({plan.issues.length})
              </summary>
              <p className="my-2 text-muted-foreground">
                Textos de apoio iguais podem servir a perguntas diferentes. Provas e cargos
                diferentes mantêm sua identificação. Corrija os conflitos de gabarito ou numeração
                antes de importar.
              </p>
              <ul className="max-h-64 space-y-2 overflow-auto">
                {plan.issues.slice(0, 100).map((issue) => (
                  <li key={issue.index}>
                    Linha {issue.index}, questão {issue.item}:{" "}
                    {issue.reason === "duplicate"
                      ? "conteúdo já encontrado"
                      : issue.reason === "answer_conflict"
                        ? "mesmo conteúdo com gabarito diferente"
                        : "número já utilizado por outro conteúdo"}
                    {issue.origin === "file" ? " no arquivo." : " no acervo."}
                  </li>
                ))}
              </ul>
              {plan.issues.length > 100 && (
                <p className="mt-2 text-muted-foreground">Exibindo os primeiros 100 registros.</p>
              )}
            </details>
          )}
          {result && (
            <p role="status" className="text-sm">
              {result.complete ? "Importação concluída" : "Importação parcial"}: {result.inserted}{" "}
              questões gravadas, {result.ignored} repetidas ignoradas.{" "}
              {result.complete
                ? "Todas as novas questões aguardam revisão."
                : "Confira a análise atualizada antes de continuar."}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Provas no banco</CardTitle>
          <CardDescription>
            “Atenção” = depende de figura/fórmula, é de legislação ou foi anulada: não entram na
            ativação automática.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 overflow-x-auto">
          {loading ? (
            <Loader2 className="mx-auto h-5 w-5 animate-spin" aria-label="Carregando" />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Concurso · cargo</th>
                  <th>Total</th>
                  <th>No treino</th>
                  <th>Em revisão</th>
                  <th>Atenção</th>
                </tr>
              </thead>
              <tbody>
                {byProva.map((p) => (
                  <tr key={p.contest + p.career} className="border-t border-border">
                    <td className="py-2">
                      <div className="font-medium text-foreground">{p.contest}</div>
                      <div className="text-xs text-muted-foreground">{p.career}</div>
                    </td>
                    <td>{p.total}</td>
                    <td>{p.active}</td>
                    <td>{p.review}</td>
                    <td>{p.flagged}</td>
                  </tr>
                ))}
                {!byProva.length && (
                  <tr>
                    <td colSpan={5} className="py-3 text-muted-foreground">
                      Nenhuma questão importada ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {bySubject.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t pt-3">
              {bySubject.map(([s, n]) => (
                <Badge key={s} variant="secondary">
                  {s} · {n}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liberar para o treino</CardTitle>
          <CardDescription>
            Faça isso só depois de revisar algumas questões e de confirmar que pode usar o material
            da banca.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={() => void activate()} className="gap-2" disabled={!rows.length}>
            <CheckCircle2 className="h-4 w-4" /> Ativar as revisadas
          </Button>
          <Button
            variant="outline"
            onClick={() => void deactivate()}
            className="gap-2"
            disabled={!active}
          >
            <PowerOff className="h-4 w-4" /> Tirar todas do treino
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
