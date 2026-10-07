import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Equal,
  Loader2,
  Radar,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  analyzeEditals,
  sphereOf,
  type DisciplineStat,
  type RadarEdition,
  type RadarQuestion,
  type RadarTopic,
  type Sphere,
  type TopicStat,
  type TopicTier,
} from "@/lib/editalRadar";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/edital-radar")({ component: EditalRadarPage });

const PAGE = 1000;

const SPHERES: { id: Sphere; label: string }[] = [
  { id: "federal", label: "Concursos federais" },
  { id: "civil", label: "Polícias Civis" },
  { id: "outras", label: "Outras forças e concursos" },
  { id: "todas", label: "Todos" },
];

const TIER_LABEL: Record<TopicTier, string> = {
  alta: "Quase sempre cai",
  media: "Cai com frequência",
  baixa: "Cai de vez em quando",
  nunca: "Nunca caiu",
  amostra: "Poucos dados",
};

const TIER_STYLE: Record<TopicTier, string> = {
  alta: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
  media: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
  baixa: "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200",
  nunca: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  amostra: "bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400",
};

interface RadarData {
  questions: RadarQuestion[];
  topics: RadarTopic[];
  editions: RadarEdition[];
}

async function loadRadarData(): Promise<RadarData> {
  const questions: RadarQuestion[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("official_exam_questions")
      .select("contest_name,career_name,exam_board,exam_year,subject,syllabus_topic_id")
      .eq("content_status", "active")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    for (const row of data ?? [])
      questions.push({
        contest: row.contest_name,
        career: row.career_name,
        board: row.exam_board,
        year: row.exam_year,
        subject: row.subject,
        topicId: row.syllabus_topic_id,
      });
    if ((data ?? []).length < PAGE) break;
  }
  const editionsResult = await supabase
    .from("syllabus_editions")
    .select("id,contest_name,role_name,contest_year,exam_board");
  if (editionsResult.error) throw editionsResult.error;
  const editions: RadarEdition[] = (editionsResult.data ?? []).map((row) => ({
    id: row.id,
    contest: row.contest_name,
    role: row.role_name,
    year: row.contest_year,
    board: row.exam_board,
  }));
  const topics: RadarTopic[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("syllabus_topics")
      .select("id,edition_id,discipline,topic_text")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    for (const row of data ?? [])
      topics.push({
        id: row.id,
        editionId: row.edition_id,
        discipline: row.discipline,
        text: row.topic_text,
      });
    if ((data ?? []).length < PAGE) break;
  }
  return { questions, topics, editions };
}

function EditalRadarPage() {
  const [data, setData] = React.useState<RadarData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [sphere, setSphere] = React.useState<Sphere>("federal");
  const [contest, setContest] = React.useState("todos");

  React.useEffect(() => {
    let active = true;
    loadRadarData()
      .then((result) => active && setData(result))
      .catch((loadError) => {
        console.error("Falha ao carregar o Raio-X dos editais", loadError);
        if (active) setError("Não foi possível carregar os editais e as provas agora.");
      });
    return () => {
      active = false;
    };
  }, []);

  const inSphere = React.useMemo(
    () =>
      (data?.questions ?? []).filter((q) => sphere === "todas" || sphereOf(q.contest) === sphere),
    [data, sphere],
  );
  const contests = React.useMemo(
    () =>
      Array.from(new Set(inSphere.map((q) => q.contest))).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [inSphere],
  );
  const selected = React.useMemo(
    () => (contest === "todos" ? inSphere : inSphere.filter((q) => q.contest === contest)),
    [inSphere, contest],
  );
  const result = React.useMemo(
    () => (data ? analyzeEditals(selected, data.topics, data.editions) : null),
    [data, selected],
  );

  if (error) return <p className="p-8 text-sm text-rose-600">{error}</p>;
  if (!data || !result)
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Analisando editais e provas...
      </div>
    );

  const likely = result.topics.filter((t) => t.tier === "alta" || t.tier === "media").slice(0, 20);

  return (
    <div className="space-y-7 pb-10">
      <PageHero
        image="field-map"
        size="sm"
        kicker="Inteligência de editais"
        icon={Radar}
        title={
          <>
            Raio-X dos <em>editais</em>
          </>
        }
        description="Cruza o que cada edital lista com o que as provas já cadastradas realmente cobraram: o que mais cai, o que nunca caiu e o que tende a cair. É estatística, não garantia."
      />
      <section className="rounded-3xl border bg-background p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {SPHERES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSphere(item.id);
                setContest("todos");
              }}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-bold transition",
                sphere === item.id
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40"
                  : "border-slate-200 text-muted-foreground hover:border-emerald-300",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-3 max-w-md">
          <label className="text-xs font-bold text-muted-foreground" htmlFor="radar-contest">
            Concurso
          </label>
          <select
            id="radar-contest"
            value={contest}
            onChange={(event) => setContest(event.target.value)}
            className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
          >
            <option value="todos">Todos desta categoria (visão nacional)</option>
            {contests.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {result.exams.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            Ainda não há provas cadastradas nesta seleção.
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Summary label="Provas analisadas" value={String(result.exams.length)} />
            <Summary label="Questões analisadas" value={String(result.totalQuestions)} />
            <Summary
              label="Período"
              value={result.yearRange ? `${result.yearRange[0]}–${result.yearRange[1]}` : "—"}
            />
            <Summary label="Bancas" value={result.boards.join(", ") || "—"} small />
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">O que mais cai, por disciplina</CardTitle>
              <CardDescription>
                Participação média no total de questões, com peso maior para as provas mais
                recentes. “Esperadas” é quanto a disciplina valeria numa prova de ~
                {result.averageExamSize} questões. Clique numa disciplina para ver os assuntos com
                mais chance de cair, do mais provável ao menos provável.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.disciplines.slice(0, 20).map((d) => (
                <DisciplineRow
                  key={d.subject}
                  stat={d}
                  totalExams={result.exams.length}
                  topics={result.topics.filter((t) => t.discipline === d.subject)}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Radar de previsibilidade</CardTitle>
              <CardDescription>
                Os tópicos de todas as disciplinas que mais se repetem nas provas, juntos num só
                lugar. A frequência considera só as provas em que o tópico estava no edital e dá
                mais peso às recentes. Tópicos com menos de 2 provas ficam como “poucos dados”.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {likely.length ? (
                <ul className="divide-y">
                  {likely.map((topic) => (
                    <TopicRow key={topic.key} topic={topic} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ainda não há dados de edital e prova suficientes para apontar tendências nesta
                  seleção ({result.examsWithSyllabus} de {result.exams.length} prova(s) têm edital
                  cadastrado).
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">O que mudou entre os editais</CardTitle>
              <CardDescription>
                Comparação das duas últimas edições de cada cargo com edital cadastrado (tópicos
                comparados pelo texto exato; reescritas aparecem como novo e retirado).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {result.changes.length ? (
                result.changes.map((change) => (
                  <div key={`${change.contest}-${change.role}`} className="space-y-2 text-sm">
                    <p className="font-black">
                      {change.contest} — {change.role}: {change.from} → {change.to}
                    </p>
                    {change.addedDisciplines.length > 0 && (
                      <p className="text-xs text-emerald-700">
                        Disciplinas novas: {change.addedDisciplines.join(", ")}
                      </p>
                    )}
                    {change.removedDisciplines.length > 0 && (
                      <p className="text-xs text-rose-700">
                        Disciplinas retiradas: {change.removedDisciplines.join(", ")}
                      </p>
                    )}
                    <ChangeList title="Tópicos novos" items={change.added} tone="emerald" />
                    <ChangeList title="Tópicos retirados" items={change.removed} tone="rose" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  É preciso ter pelo menos duas edições do mesmo cargo com edital cadastrado para
                  comparar.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Provas incluídas na análise</CardTitle>
              <CardDescription>
                A qualidade da previsão depende de quantas provas existem: mais edições, melhor a
                leitura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-xs">
                  <thead className="text-muted-foreground">
                    <tr>
                      <th className="py-1 pr-3">Concurso</th>
                      <th className="py-1 pr-3">Cargo</th>
                      <th className="py-1 pr-3">Ano</th>
                      <th className="py-1 pr-3">Banca</th>
                      <th className="py-1">Questões</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.exams.map((exam) => (
                      <tr key={exam.key} className="border-t">
                        <td className="py-1.5 pr-3 font-bold">{exam.contest}</td>
                        <td className="py-1.5 pr-3">{exam.career}</td>
                        <td className="py-1.5 pr-3">{exam.year}</td>
                        <td className="py-1.5 pr-3">{exam.board}</td>
                        <td className="py-1.5">{exam.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Só entram questões ativas e já revisadas. Provas ainda não cadastradas, editais
                novos e mudanças de banca podem alterar o cenário.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function Summary({
  label,
  value,
  small = false,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p
          className={cn(
            "mt-1 font-black text-primary",
            small ? "text-base leading-snug" : "text-2xl",
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function DisciplineRow({
  stat,
  totalExams,
  topics,
}: {
  stat: DisciplineStat;
  totalExams: number;
  topics: TopicStat[];
}) {
  const [open, setOpen] = React.useState(false);
  const percent = Math.round(stat.weightedShare * 100);
  const trend =
    stat.trend === "sobe" ? (
      <span className="inline-flex items-center gap-0.5 font-bold text-emerald-700">
        <ArrowUp className="h-3 w-3" /> sobe +{stat.trendDelta} p.p.
      </span>
    ) : stat.trend === "cai" ? (
      <span className="inline-flex items-center gap-0.5 font-bold text-rose-700">
        <ArrowDown className="h-3 w-3" /> cai {stat.trendDelta} p.p.
      </span>
    ) : stat.trend === "estavel" ? (
      <span className="inline-flex items-center gap-0.5 text-muted-foreground">
        <Equal className="h-3 w-3" /> estável
      </span>
    ) : (
      <span className="text-muted-foreground">sem tendência</span>
    );
  // Mais prováveis primeiro; dentro do mesmo nível, o que mais caiu primeiro.
  const ordered = [...topics].sort((a, b) => b.score - a.score || b.questions - a.questions);
  const tiersPresent = (["alta", "media", "baixa", "nunca", "amostra"] as TopicTier[]).filter(
    (tier) => ordered.some((t) => t.tier === tier),
  );

  return (
    <div className="rounded-xl border border-slate-100 dark:border-slate-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-3 py-3 text-left"
        aria-expanded={open}
      >
        <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
          <span className="flex min-w-0 items-center gap-1.5 font-bold">
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                open && "rotate-180",
              )}
              aria-hidden
            />
            {stat.subject}
          </span>
          <span className="shrink-0 font-black text-primary">{percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${Math.min(100, percent)}%` }}
          />
        </div>
        <p className="mt-1 flex flex-wrap gap-x-3 text-[11px] text-muted-foreground">
          <span>≈ {stat.expected} questões esperadas</span>
          <span>
            em {stat.exams} de {totalExams} prova(s)
          </span>
          {trend}
          {topics.length > 0 && (
            <span className="font-semibold text-primary">
              {open ? "ocultar" : "ver"} {topics.length} assunto(s) do edital →
            </span>
          )}
        </p>
      </button>
      {open && (
        <div className="space-y-4 border-t border-slate-100 px-3 pb-3 pt-3 dark:border-slate-800">
          {topics.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Sem edital cadastrado para esta disciplina nesta seleção.
            </p>
          ) : (
            tiersPresent.map((tier) => (
              <div key={tier}>
                <Badge className={cn("border-0 text-[10px]", TIER_STYLE[tier])}>
                  {TIER_LABEL[tier]} · {ordered.filter((t) => t.tier === tier).length}
                </Badge>
                <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
                  {ordered
                    .filter((t) => t.tier === tier)
                    .map((topic) => (
                      <TopicRow key={topic.key} topic={topic} showDiscipline={false} />
                    ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function TopicRow({
  topic,
  showDiscipline = true,
}: {
  topic: TopicStat;
  showDiscipline?: boolean;
}) {
  return (
    <li className="flex flex-wrap items-start justify-between gap-2 py-2.5 text-sm">
      <div className="min-w-0">
        <p className="font-semibold leading-snug">{topic.text}</p>
        <p className="text-[11px] text-muted-foreground">
          {showDiscipline ? `${topic.discipline} · ` : ""}caiu em {topic.examsAsked} de{" "}
          {topic.examsInEdital} prova(s) com esse tópico no edital · {topic.questions} questão(ões)
          {topic.lastYear ? ` · última vez em ${topic.lastYear}` : ""}
        </p>
        {topic.topicIds[0] && (
          <Link
            to="/dashboard/edital/$topicId"
            params={{ topicId: topic.topicIds[0] }}
            className="mt-1 inline-block text-xs font-bold text-primary hover:underline"
          >
            Ver resumo e exemplos deste assunto →
          </Link>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-xs font-black text-primary">{Math.round(topic.score * 100)}%</span>
        {showDiscipline && (
          <Badge className={cn("border-0 text-[10px]", TIER_STYLE[topic.tier])}>
            {TIER_LABEL[topic.tier]}
          </Badge>
        )}
      </div>
    </li>
  );
}

function ChangeList({
  title,
  items,
  tone,
}: {
  title: string;
  items: { discipline: string; text: string }[];
  tone: "emerald" | "rose";
}) {
  if (!items.length) return null;
  return (
    <details>
      <summary
        className={cn(
          "cursor-pointer text-xs font-bold",
          tone === "emerald" ? "text-emerald-700" : "text-rose-700",
        )}
      >
        {title} ({items.length})
      </summary>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs text-muted-foreground">
        {items.slice(0, 25).map((item) => (
          <li key={`${item.discipline}-${item.text}`}>
            <strong>{item.discipline}:</strong> {item.text}
          </li>
        ))}
        {items.length > 25 && <li>… e mais {items.length - 25}</li>}
      </ul>
    </details>
  );
}
