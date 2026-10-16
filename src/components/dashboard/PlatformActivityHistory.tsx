import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { ACRE_TZ } from "@/lib/acreTime";
import { canonicalSubject } from "@/lib/subjects";
import type { TrainingActivity, SimulatorActivity } from "@/hooks/usePerformanceOverview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const date = new Intl.DateTimeFormat("pt-BR", {
  timeZone: ACRE_TZ,
  dateStyle: "short",
  timeStyle: "short",
});
const duration = (seconds: number) =>
  `${Math.floor(Math.max(0, seconds) / 60)} min ${Math.floor(Math.max(0, seconds) % 60)} s`;
interface SimResponse {
  id: string;
  question_order: number;
  subject: string;
  selected_answer: string | null;
  official_answer: string;
  is_correct: boolean | null;
}
export function PlatformActivityHistory({
  userId,
  responses,
  attempts,
}: {
  userId: string;
  responses: TrainingActivity[];
  attempts: SimulatorActivity[];
}) {
  const [kind, setKind] = useState("all");
  const [subject, setSubject] = useState("all");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<SimulatorActivity | null>(null);
  const subjects = useMemo(
    () => Array.from(new Set(responses.map((r) => canonicalSubject(r.subject)))).sort(),
    [responses],
  );
  const rows = useMemo(
    () =>
      [
        ...responses.map((r) => ({
          id: `q-${r.id}`,
          kind: "question",
          subject: canonicalSubject(r.subject),
          title: canonicalSubject(r.subject),
          result: r.is_correct ? "Acerto" : "Erro",
          seconds: r.response_seconds,
          at: r.created_at,
          attempt: null as SimulatorActivity | null,
          question: r.question_id,
          answer: r.selected_answer,
          official: r.official_answer,
        })),
        ...attempts.map((a) => ({
          id: `s-${a.id}`,
          kind: "simulator",
          subject: "",
          title: a.title,
          result: `${a.accuracy}% de acerto`,
          seconds: a.duration_seconds,
          at: a.finished_at,
          attempt: a,
          question: "",
          answer: null,
          official: null,
        })),
      ]
        .filter(
          (r) =>
            (kind === "all" || r.kind === kind) && (subject === "all" || r.subject === subject),
        )
        .sort((a, b) => b.at.localeCompare(a.at)),
    [responses, attempts, kind, subject],
  );
  const details = useQuery({
    queryKey: ["performance", "simulator-responses", userId, selected?.id],
    enabled: !!selected,
    queryFn: () =>
      fetchAllRows<SimResponse>((from, to) =>
        supabase
          .from("simulator_responses")
          .select("id,question_order,subject,selected_answer,official_answer,is_correct")
          .eq("user_id", userId)
          .eq("attempt_id", selected!.id)
          .order("question_order")
          .range(from, to),
      ),
  });
  const pages = Math.max(1, Math.ceil(rows.length / 15));
  const current = Math.min(page, pages - 1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de questões e simulados</CardTitle>
        <CardDescription>
          Cada resposta do treinador e cada simulado concluído, com o tempo registrado. Horários do
          Acre. As médias usam a primeira resposta de cada questão; este histórico mostra todos os
          registros.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <label className="flex flex-col gap-1 text-sm font-medium">
            Atividade
            <select
              aria-label="Atividade"
              className="h-11 rounded-lg border bg-background px-3"
              value={kind}
              onChange={(e) => {
                setKind(e.target.value);
                setSubject("all");
                setPage(0);
              }}
            >
              <option value="all">Todas as atividades</option>
              <option value="question">Questões do treinador</option>
              <option value="simulator">Simulados</option>
            </select>
          </label>
          {kind !== "simulator" && (
            <label className="flex flex-col gap-1 text-sm font-medium">
              Disciplina
              <select
                aria-label="Disciplina"
                className="h-11 max-w-full rounded-lg border bg-background px-3"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setPage(0);
                }}
              >
                <option value="all">Todas as disciplinas</option>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          )}
        </div>
        {!rows.length ? (
          <p className="py-6 text-sm text-muted-foreground">
            Nenhuma atividade registrada para esta seleção.
          </p>
        ) : (
          <ul className="divide-y">
            {rows.slice(current * 15, current * 15 + 15).map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <p className="break-words font-semibold">{r.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {r.kind === "question" ? "Questão" : "Simulado"} · {date.format(new Date(r.at))}
                  </p>
                  {r.question && (
                    <details className="mt-2 text-sm">
                      <summary className="cursor-pointer py-2 font-medium">
                        Conferir resposta
                      </summary>
                      <p>
                        Sua resposta: {r.answer ?? "Não registrada"} · Gabarito registrado:{" "}
                        {r.official ?? "Não registrado"}
                      </p>
                      <p className="mt-1 break-all text-xs text-muted-foreground">
                        Identificador: {r.question}
                      </p>
                    </details>
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{r.result}</p>
                  <p className="text-muted-foreground">Tempo: {duration(r.seconds)}</p>
                </div>
                {r.attempt && (
                  <Button
                    variant="outline"
                    className="min-h-11"
                    onClick={() => setSelected(r.attempt)}
                  >
                    Ver resultado
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span>
            {rows.length} registros · Página {current + 1} de {pages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="min-h-11"
              disabled={current === 0}
              onClick={() => setPage(current - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              className="min-h-11"
              disabled={current >= pages - 1}
              onClick={() => setPage(current + 1)}
            >
              Próxima
            </Button>
          </div>
        </div>
      </CardContent>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[90dvh] max-w-3xl overflow-auto">
          <DialogTitle>{selected?.title}</DialogTitle>
          <DialogDescription>Resultado do simulado realizado na plataforma.</DialogDescription>
          {selected && (
            <p className="rounded-lg border p-3 text-sm">
              {selected.correct_answers} acertos · {selected.wrong_answers} erros ·{" "}
              {selected.blank_answers} em branco de {selected.total_questions} questões. Tempo
              total: {duration(selected.duration_seconds)}.
            </p>
          )}
          {details.isPending ? (
            <p role="status">Carregando respostas…</p>
          ) : details.isError ? (
            <div role="alert">
              Não foi possível carregar as respostas.
              <Button variant="outline" onClick={() => void details.refetch()}>
                Tentar novamente
              </Button>
            </div>
          ) : !details.data?.length ? (
            <p>Este simulado não possui respostas detalhadas registradas.</p>
          ) : (
            <ol className="divide-y">
              {details.data.map((r) => (
                <li key={r.id} className="py-3 text-sm">
                  <strong>
                    Questão {r.question_order} · {canonicalSubject(r.subject)}
                  </strong>
                  <p>
                    Sua resposta: {r.selected_answer ?? "Em branco"} · Gabarito registrado:{" "}
                    {r.official_answer} ·{" "}
                    {r.selected_answer === null ? "Em branco" : r.is_correct ? "Acerto" : "Erro"}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
