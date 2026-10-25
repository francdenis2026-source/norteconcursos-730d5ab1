import { disciplinePracticeSearch } from "@/lib/practiceLink";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import type { PerformanceOverview } from "@/hooks/usePerformanceOverview";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

/** Supplementary recorded activity remains independent of the question analytics service. */
export function LearningJourney({
  userId,
  overview,
}: {
  userId: string;
  overview: PerformanceOverview | null;
}) {
  const reading = useQuery({
    queryKey: ["performance-reading", userId],
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    queryFn: () =>
      fetchAllRows<{ unit_id: string; read_at: string }>((from, to) =>
        supabase
          .from("legal_course_progress")
          .select("unit_id,read_at")
          .eq("user_id", userId)
          .not("read_at", "is", null)
          .order("unit_id")
          .range(from, to),
      ),
  });
  const plan = useQuery({
    queryKey: ["performance-plan", userId],
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    queryFn: () =>
      fetchAllRows<{
        plan_id: string;
        topic_id: string;
        video: boolean;
        pdf: boolean;
        podcast: boolean;
        rev_pdf: boolean;
        rev_questoes: boolean;
      }>((from, to) =>
        supabase
          .from("cronograma_progress")
          .select("plan_id,topic_id,video,pdf,podcast,rev_pdf,rev_questoes")
          .eq("user_id", userId)
          .order("plan_id")
          .order("topic_id")
          .range(from, to),
      ),
  });
  const readCount = reading.data ? new Set(reading.data.map((r) => r.unit_id)).size : null;
  const marked = plan.data?.filter(
    (r) => r.video || r.pdf || r.podcast || r.rev_pdf || r.rev_questoes,
  ).length;
  const weak = overview?.available.training
    ? overview.trainer.bySubject
        .filter((s) => s.total >= 5 && s.accuracy < 60)
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 3)
    : [];
  const lastRead = reading.data?.reduce<string | null>(
    (latest, r) => (!latest || r.read_at > latest ? r.read_at : latest),
    null,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sua trilha de estudo</CardTitle>
        <CardDescription>
          Indicadores do seu próprio histórico. Atualização a cada 30 segundos com a página aberta e
          ao voltar à janela.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border p-3">
            <p className="font-semibold">{readCount ?? "—"} unidades legais marcadas como lidas</p>
            <p className="text-sm text-muted-foreground">
              {reading.isError
                ? "Leituras indisponíveis. Tente atualizar."
                : lastRead
                  ? `Última marcação: ${new Date(lastRead).toLocaleString("pt-BR")}`
                  : "O registro aparece quando você marca uma unidade como lida."}
            </p>
            <Link to="/dashboard/library" search={{}} className="text-sm underline">
              Continuar na biblioteca
            </Link>
          </div>
          <div className="rounded-xl border p-3">
            <p className="font-semibold">{marked ?? "—"} tópicos com atividades no cronograma</p>
            <p className="text-sm text-muted-foreground">
              {plan.isError
                ? "Cronograma indisponível nesta atualização."
                : "Marcações feitas por você: vídeo, PDF, podcast ou revisão. Não são somadas às respostas do treinador."}
            </p>
            <Link to="/dashboard/cronograma" className="text-sm underline">
              Abrir meu cronograma
            </Link>
          </div>
        </div>
        <div className="rounded-xl bg-muted p-4">
          <h3 className="font-semibold">Próximos passos com base nos seus resultados</h3>
          {weak.length ? (
            <ul className="mt-2 space-y-3">
              {weak.map((s) => (
                <li key={s.subject}>
                  <p>
                    <Link
                      to="/dashboard/question-trainer"
                      search={disciplinePracticeSearch(s.subject)}
                      aria-label={`Treinar ${s.subject} pela trilha`}
                      className="inline-flex min-h-11 items-center font-bold underline underline-offset-4 hover:text-primary"
                    >
                      {s.subject}
                    </Link>
                    : {s.correct} acertos em {s.total} questões ({s.accuracy}%). Revise os erros e
                    faça uma nova sessão curta após estudar o conteúdo.
                  </p>
                  <Link
                    className="inline-flex min-h-11 items-center text-sm underline"
                    to="/dashboard/question-trainer"
                    search={disciplinePracticeSearch(s.subject)}
                  >
                    Treinar esta disciplina
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm">
              {overview?.available.training
                ? "Continue resolvendo questões. Sugerimos reforço específico quando houver pelo menos cinco respostas na disciplina e acerto abaixo de 60%."
                : "Aguardando as respostas do treinador para orientar seu reforço."}
            </p>
          )}
          <Link className="mt-3 inline-block text-sm underline" to="/dashboard/errors">
            Revisar meu caderno de erros
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          A trilha usa ações registradas pela plataforma. Abrir uma página não comprova leitura ou
          conclusão; atividades antigas sem registro não podem ser reconstruídas.
        </p>
      </CardContent>
    </Card>
  );
}
