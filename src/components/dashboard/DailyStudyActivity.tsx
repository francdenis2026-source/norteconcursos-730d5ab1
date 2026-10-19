import { disciplineSetupSearch } from "@/lib/practiceLink";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows, isMissingQuestionTable, isMissingQuestionSupport } from "@/lib/catalog";
import {
  activityDateRange,
  activityPracticeSearch,
  activityTopic,
  otherStudentStats,
  type ActivityQuestion,
  type StudyPeriod,
} from "@/lib/dailyStudyActivity";
import { canonicalSubject } from "@/lib/subjects";
import { acreDateKey, ACRE_TZ } from "@/lib/acreTime";
import { parseQuestion } from "@/lib/questionFormat";
import { QuestionFigures } from "@/components/dashboard/QuestionFigures";
import { QuestionSupportText } from "@/components/library/QuestionSupportText";
import type { TrainingActivity, SimulatorActivity } from "@/hooks/usePerformanceOverview";

const clock = new Intl.DateTimeFormat("pt-BR", {
  timeZone: ACRE_TZ,
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
const duration = (s: number | undefined) =>
  s == null || !Number.isFinite(s)
    ? "Tempo não registrado"
    : `${Math.floor(Math.max(0, s) / 60)} min ${Math.floor(Math.max(0, s) % 60)} s`;
type Response = {
  id: string;
  question_id: string;
  question_source: string;
  subject: string;
  selected_answer: string | null;
  official_answer: string;
  is_correct: boolean | null;
  question_order?: number;
  created_at?: string;
  response_seconds?: number;
};
type QuestionInfo = ActivityQuestion & {
  explanation: string;
  available: boolean;
  figures?: string[];
};

async function questionInfo(row: Response, userId: string): Promise<QuestionInfo> {
  const tables =
    row.question_source === "curated"
      ? (["curated_question_catalog"] as const)
      : row.question_source === "personal"
        ? (["question_bank"] as const)
        : (["official_exam_questions", "board_exam_questions"] as const);
  for (const table of tables) {
    const load = async (support: boolean) => {
      let query = supabase
        .from(table)
        .select(
          table === "board_exam_questions"
            ? "id,subject,tested_topic,support_text,stem,options,explanation,figure_urls"
            : table === "official_exam_questions"
              ? "id,subject,tested_topic,question_text,review_note" +
                (support ? ",support:question_support_texts(label,body)" : "")
              : "id,subject,subtopic,question_text,explanation" +
                (table === "curated_question_catalog" ? ",tested_topic" : ""),
        )
        .eq("id", row.question_id);
      if (table === "question_bank") query = query.eq("user_id", userId);
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data as unknown as Record<string, unknown> | null;
    };
    let raw: Record<string, unknown> | null;
    try {
      raw = await load(true);
    } catch (error) {
      if (table === "official_exam_questions" && isMissingQuestionSupport(error))
        raw = await load(false);
      else if (isMissingQuestionTable(error)) continue;
      else throw error;
    }
    if (!raw) continue;
    const support = raw["support"] as { body?: string } | null;
    let text = String(raw["question_text"] ?? raw["stem"] ?? "");
    if (raw["support_text"])
      text = `Texto-base:\n${raw["support_text"]}\n\n[[/texto-base]]\n${text}`;
    if (support?.body) text = `Texto-base:\n${support.body}\n\n[[/texto-base]]\n${text}`;
    const options = raw["options"];
    if (options && typeof options === "object")
      text +=
        "\n" +
        Object.entries(options)
          .map(([k, v]) => `${k}) ${v}`)
          .join("\n");
    return {
      subject: canonicalSubject(String(raw["subject"] || row.subject)),
      testedTopic: raw["tested_topic"] ? String(raw["tested_topic"]) : null,
      subtopic: raw["subtopic"] ? String(raw["subtopic"]) : null,
      text,
      explanation: String(raw["explanation"] ?? raw["review_note"] ?? ""),
      available: true,
      figures: Array.isArray(raw["figure_urls"]) ? raw["figure_urls"].map(String) : [],
    };
  }
  return { subject: canonicalSubject(row.subject), text: "", explanation: "", available: false };
}

export function DailyStudyActivity({
  userId,
  day,
  period,
}: {
  userId: string;
  day: string;
  period: StudyPeriod;
}) {
  const [limit, setLimit] = useState(15);
  const range = activityDateRange(day, period);
  const query = useQuery({
    queryKey: ["daily-study-activity", userId, range.start, range.end],
    staleTime: 15000,
    retry: 1,
    queryFn: async () => {
      const results = await Promise.allSettled([
        fetchAllRows<TrainingActivity>((from, to) =>
          supabase
            .from("question_training_responses")
            .select(
              "id,question_id,question_source,subject,is_correct,response_seconds,selected_answer,official_answer,created_at",
            )
            .eq("user_id", userId)
            .gte("created_at", range.start)
            .lt("created_at", range.end)
            .order("created_at", { ascending: false })
            .order("id")
            .range(from, to),
        ),
        fetchAllRows<SimulatorActivity>((from, to) =>
          supabase
            .from("simulator_attempts")
            .select(
              "id,title,total_questions,correct_answers,wrong_answers,blank_answers,accuracy,duration_seconds,finished_at,contest_filter",
            )
            .eq("user_id", userId)
            .gte("finished_at", range.start)
            .lt("finished_at", range.end)
            .order("finished_at", { ascending: false })
            .order("id")
            .range(from, to),
        ),
        fetchAllRows<Response>((from, to) =>
          supabase
            .from("question_reinforcement_attempts")
            .select(
              "id,question_id,question_source,subject,is_correct,response_seconds,selected_answer,official_answer,created_at",
            )
            .eq("user_id", userId)
            .gte("created_at", range.start)
            .lt("created_at", range.end)
            .order("created_at", { ascending: false })
            .order("id")
            .range(from, to),
        ).catch((error) => {
          if (isMissingQuestionTable(error)) return [];
          throw error;
        }),
      ]);
      return {
        training: results[0].status === "fulfilled" ? results[0].value : [],
        attempts: results[1].status === "fulfilled" ? results[1].value : [],
        reinforcement: results[2].status === "fulfilled" ? results[2].value : [],
        errors: results.flatMap((r, i) => (r.status === "rejected" ? [i] : [])),
      };
    },
  });
  if (query.isPending)
    return (
      <section aria-label="Atividades realizadas">
        <h3>O que você estudou</h3>
        <p role="status">Carregando suas atividades neste período…</p>
      </section>
    );
  if (query.isError)
    return (
      <section>
        <h3>O que você estudou</h3>
        <p role="alert">Não foi possível consultar suas atividades.</p>
        <button type="button" onClick={() => void query.refetch()}>
          Tentar novamente
        </button>
      </section>
    );
  const data = query.data;
  const entries = [
    ...data.training.map((r) => ({
      key: `q:${r.id}`,
      at: r.created_at,
      kind: "question" as const,
      row: r,
    })),
    ...data.attempts.map((r) => ({
      key: `s:${r.id}`,
      at: r.finished_at,
      kind: "simulator" as const,
      row: r,
    })),
    ...data.reinforcement.map((r) => ({
      key: `r:${r.id}`,
      at: r.created_at || "",
      kind: "reinforcement" as const,
      row: r,
    })),
  ].sort((a, b) => b.at.localeCompare(a.at));
  const correct = data.training.filter((r) => r.is_correct).length;
  return (
    <section className="daily-study-activity" aria-label="Atividades realizadas">
      <h3>O que você estudou {period !== "day" ? "no período" : "neste dia"}</h3>
      {data.errors.length > 0 && (
        <p role="alert">
          Parte do histórico está indisponível (
          {data.errors.map((i) => ["questões", "simulados", "reforço"][i]).join(", ")}).{" "}
          <button type="button" onClick={() => void query.refetch()}>
            Tentar novamente
          </button>
        </p>
      )}
      <dl className="daily-study-activity__summary">
        <div>
          <dt>Questões do treinador</dt>
          <dd>{data.errors.includes(0) ? "Indisponível" : data.training.length}</dd>
        </div>
        <div>
          <dt>Acerto no treinador</dt>
          <dd>
            {data.errors.includes(0)
              ? "Indisponível"
              : data.training.length
                ? `${Math.round((correct / data.training.length) * 100)}%`
                : "Sem respostas"}
          </dd>
        </div>
        <div>
          <dt>Simulados concluídos</dt>
          <dd>{data.errors.includes(1) ? "Indisponível" : data.attempts.length}</dd>
        </div>
      </dl>
      <p className="daily-study-activity__note">
        Respostas e simulados concluídos no período. O tempo de cada atividade é informativo e não é
        somado ao tempo ativo, pois podem se sobrepor.
      </p>
      {!entries.length && !data.errors.length && (
        <p>
          Nenhuma questão, reforço ou simulado concluído foi registrado neste período. O tempo ativo
          pode incluir leituras e outras áreas sem registro detalhado.
        </p>
      )}
      <div className="daily-study-activity__list">
        {entries
          .slice(0, limit)
          .map((e) =>
            e.kind === "simulator" ? (
              <SimulatorResult key={e.key} userId={userId} attempt={e.row} />
            ) : (
              <ActivityQuestionRow
                key={e.key}
                userId={userId}
                response={e.row}
                reinforcement={e.kind === "reinforcement"}
              />
            ),
          )}
      </div>
      {entries.length > limit && (
        <button
          type="button"
          className="daily-study-activity__more"
          onClick={() => setLimit((v) => v + 15)}
        >
          Mostrar mais atividades ({entries.length - limit})
        </button>
      )}
    </section>
  );
}

function SimulatorResult({ userId, attempt }: { userId: string; attempt: SimulatorActivity }) {
  const [open, setOpen] = useState(false);
  const query = useQuery({
    queryKey: ["daily-simulator-responses", userId, attempt.id],
    enabled: open,
    staleTime: 60000,
    queryFn: () =>
      fetchAllRows<Response>((from, to) =>
        supabase
          .from("simulator_responses")
          .select(
            "id,question_id,question_source,question_order,subject,selected_answer,official_answer,is_correct",
          )
          .eq("user_id", userId)
          .eq("attempt_id", attempt.id)
          .order("question_order")
          .order("id")
          .range(from, to),
      ),
  });
  const subjects = new Map<string, { total: number; correct: number }>();
  for (const row of query.data ?? []) {
    const name = canonicalSubject(row.subject);
    const s = subjects.get(name) ?? { total: 0, correct: 0 };
    s.total++;
    if (row.is_correct) s.correct++;
    subjects.set(name, s);
  }
  return (
    <details className="activity-entry" onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>
        <span>
          <strong>{attempt.title}</strong>
          <small>
            Simulado · {clock.format(new Date(attempt.finished_at))} ·{" "}
            {duration(attempt.duration_seconds)}
          </small>
        </span>
        <b>{attempt.accuracy}% de acerto</b>
      </summary>
      <div className="activity-entry__details">
        <p>
          {attempt.correct_answers} acertos · {attempt.wrong_answers} erros ·{" "}
          {attempt.blank_answers} em branco · {attempt.total_questions} questões
        </p>
        <p className="daily-study-activity__note">
          Comparação entre alunos para este mesmo simulado ainda indisponível. Nenhuma média de
          simulados diferentes é usada.
        </p>
        {query.isPending ? (
          <p role="status">Carregando as respostas deste simulado…</p>
        ) : query.isError ? (
          <p role="alert">
            Não foi possível carregar as respostas.{" "}
            <button type="button" onClick={() => void query.refetch()}>
              Tentar novamente
            </button>
          </p>
        ) : (
          <>
            <ul>
              {[...subjects].map(([subject, s]) => (
                <li key={subject}>
                  <Link
                    className="student-metric-panel__history-discipline"
                    to="/dashboard/question-trainer"
                    search={disciplineSetupSearch(subject, String(Date.now()))}
                    aria-label={`Treinar ${subject}`}
                  >
                    {subject}: {s.correct}/{s.total} acertos (
                    {Math.round((s.correct / s.total) * 100)}%) →
                  </Link>
                </li>
              ))}
            </ul>
            {!query.data?.length && (
              <p>Não há respostas detalhadas disponíveis para este simulado.</p>
            )}
            {query.data?.map((row) => (
              <ActivityQuestionRow key={row.id} userId={userId} response={row} />
            ))}
          </>
        )}
      </div>
    </details>
  );
}

function ActivityQuestionRow({
  userId,
  response,
  reinforcement = false,
}: {
  userId: string;
  response: Response;
  reinforcement?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [fresh, setFresh] = useState(() => String(Date.now()));
  const detail = useQuery({
    queryKey: ["activity-question", userId, response.question_source, response.question_id],
    enabled: open,
    staleTime: 60000,
    queryFn: () => questionInfo(response, userId),
  });
  const peers = useQuery({
    queryKey: ["activity-question-peers", userId, response.question_source, response.question_id],
    enabled: open && response.question_source !== "personal",
    staleTime: 60000,
    retry: 0,
    queryFn: async () => {
      const [stats, own] = await Promise.all([
        supabase
          .rpc("get_question_training_stats", {
            p_question_id: response.question_id,
            p_question_source: response.question_source,
          })
          .maybeSingle(),
        supabase
          .from("question_training_responses")
          .select("is_correct")
          .eq("user_id", userId)
          .eq("question_id", response.question_id)
          .eq("question_source", response.question_source)
          .order("created_at")
          .order("id")
          .limit(1)
          .maybeSingle(),
      ]);
      if (stats.error || own.error) throw stats.error || own.error;
      return stats.data
        ? otherStudentStats(
            stats.data as unknown as { total: number; correct: number; wrong: number },
            own.data,
          )
        : null;
    },
  });
  const info = detail.data;
  const parsed = info?.text ? parseQuestion(info.text) : null;
  const label =
    response.selected_answer == null
      ? "Em branco"
      : response.is_correct == null
        ? "Resultado não registrado"
        : response.is_correct
          ? "Acertou"
          : "Errou";
  return (
    <details
      className="activity-entry activity-entry--question"
      onToggle={(e) => {
        setOpen(e.currentTarget.open);
        if (e.currentTarget.open) setFresh(String(Date.now()));
      }}
    >
      <summary>
        <span>
          <strong>
            {response.question_order ? `Questão ${response.question_order} · ` : ""}
            {canonicalSubject(response.subject) || info?.subject || "Questão"}
          </strong>
          <small>
            {reinforcement ? "Reforço" : "Questão"}
            {response.created_at ? ` · ${clock.format(new Date(response.created_at))}` : ""}
            {response.response_seconds != null ? ` · ${duration(response.response_seconds)}` : ""}
          </small>
          {info && activityTopic(info) && <small>{activityTopic(info)}</small>}
        </span>
        <b data-result={label}>{label}</b>
      </summary>
      <div className="activity-entry__details">
        <dl className="activity-answer">
          <div>
            <dt>Sua resposta</dt>
            <dd>{response.selected_answer ?? "Em branco"}</dd>
          </div>
          <div>
            <dt>Gabarito registrado na tentativa</dt>
            <dd>{response.official_answer || "Não registrado"}</dd>
          </div>
        </dl>
        {detail.isPending ? (
          <p role="status">Carregando questão e assunto…</p>
        ) : detail.isError ? (
          <p role="alert">
            Não foi possível carregar o enunciado.{" "}
            <button type="button" onClick={() => void detail.refetch()}>
              Tentar novamente
            </button>
          </p>
        ) : (
          <>
            {parsed && (
              <div className="activity-question-text">
                {parsed.base && (
                  <QuestionSupportText text={parsed.base} citesLines={/linha/i.test(parsed.stem)} />
                )}
                <QuestionFigures urls={info?.figures} illustrations={parsed.illustrations} />
                <p>{parsed.stem}</p>
                {parsed.options.map((o) => (
                  <p key={o.letter}>
                    <strong>{o.letter})</strong> {o.text}
                  </p>
                ))}
              </div>
            )}
            {info?.explanation && (
              <div className="activity-explanation">
                <h4>Comentário da questão</h4>
                <p>{info.explanation}</p>
              </div>
            )}
            {info && !info.available && (
              <p>
                O enunciado original não está disponível no catálogo. Seu resultado registrado foi
                preservado.
              </p>
            )}
            {info && info.subject && (
              <p>
                <Link
                  className="student-metric-panel__history-discipline"
                  to="/dashboard/question-trainer"
                  search={disciplineSetupSearch(info.subject, fresh)}
                >
                  Escolher assunto de {info.subject} →
                </Link>
              </p>
            )}
            {info && info.subject && (
              <Link
                className="activity-new-practice"
                to="/dashboard/question-trainer"
                search={activityPracticeSearch(info, fresh)}
              >
                {activityTopic(info)
                  ? "Resolver questões novas deste assunto"
                  : "Resolver questões novas desta disciplina"}{" "}
                →
              </Link>
            )}
            {info && (
              <p className="daily-study-activity__note">
                O treino exclui itens já feitos no treinador, no reforço e nos simulados. Se não
                houver novos itens deste assunto, a plataforma informa e mantém o filtro.
              </p>
            )}
          </>
        )}
        {response.question_source !== "personal" && (
          <div className="activity-peer-stats">
            <h4>Outros alunos nesta questão</h4>
            {peers.isPending ? (
              <p role="status">Conferindo a média…</p>
            ) : peers.isError ? (
              <p>Comparação indisponível no momento.</p>
            ) : peers.data ? (
              <p>
                <strong>{peers.data.accuracy}% de acerto</strong> entre {peers.data.total} outros
                alunos · {peers.data.correct} acertos · {peers.data.wrong} erros. Primeira resposta
                no treinador; sua resposta foi excluída desta média.
              </p>
            ) : (
              <p>
                Ainda não há amostra suficiente: a comparação exige pelo menos cinco outros alunos.
              </p>
            )}
          </div>
        )}
      </div>
    </details>
  );
}
