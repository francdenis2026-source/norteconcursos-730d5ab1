import { editalExamQuestions, editalPracticeSearch } from "@/lib/editalPractice";
import { examCoverage } from "@/lib/examCoverage";
import { EditalEditionCatalog } from "@/components/dashboard/EditalEditionCatalog";
import { fetchEditalEditions } from "@/lib/editalEditions";
import React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpenText, ChevronRight, ExternalLink, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { canonicalSubject } from "@/lib/subjects";
import { fetchAllRows } from "@/lib/catalog";
import { needsMissingSupportText } from "@/lib/questionText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockedState } from "@/components/dashboard/PageHero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/dashboard/edital/")({
  component: EditalPage,
  validateSearch: (s: Record<string, unknown>): { edition?: string | undefined } => ({
    edition: typeof s["edition"] === "string" ? s["edition"] : undefined,
  }),
});
import {
  editalSourceLabel,
  editalSourceUrl,
  editalFold as fold,
  type EditalEdition as Edition,
} from "@/lib/editalCatalog";
type Topic = { id: string; discipline: string; topic_text: string; topic_order: number | null };
function EditalPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const navigate = useNavigate();
  const { edition: selected } = Route.useSearch();
  const [editions, setEditions] = React.useState<Edition[]>([]),
    [topics, setTopics] = React.useState<Topic[]>([]);
  const [loading, setLoading] = React.useState(true),
    [topicsLoading, setTopicsLoading] = React.useState(false),
    [error, setError] = React.useState("");
  const [topicsError, setTopicsError] = React.useState("");
  const [search, setSearch] = React.useState(""),
    [discipline, setDiscipline] = React.useState("all"),
    [revision, setRevision] = React.useState(0);
  const {
    catalog,
    loading: catalogLoading,
    error: catalogError,
    reload: reloadCatalog,
  } = useQuestionCatalog(user?.id, real);
  React.useEffect(() => {
    if (authLoading || !real) {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    setError("");
    void fetchEditalEditions()
      .then((data) => {
        if (active) setEditions(data);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os editais. Tente novamente.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [authLoading, user?.id, real, revision]);
  const edition = editions.find((e) => e.id === selected);
  const editionId = edition?.id;
  const examQuestions = React.useMemo(
    () => (edition ? editalExamQuestions(catalog, edition) : []),
    [catalog, edition],
  );
  React.useEffect(() => {
    setSearch("");
    setDiscipline("all");
    setTopics([]);
    setTopicsError("");
    if (!editionId) {
      setTopicsLoading(false);
      return;
    }
    let active = true;
    setTopicsLoading(true);
    void fetchAllRows<Topic>((from, to) =>
      supabase
        .from("syllabus_topics")
        .select("id,discipline,topic_text,topic_order")
        .eq("edition_id", editionId)
        .eq("content_status", "current")
        .order("id")
        .range(from, to),
    )
      .then((data) => {
        if (active) setTopics(data.sort((a, b) => (a.topic_order ?? 0) - (b.topic_order ?? 0)));
      })
      .catch(() => {
        if (active) setTopicsError("Não foi possível carregar os assuntos desta edição.");
      })
      .finally(() => {
        if (active) setTopicsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [editionId, revision]);
  const counts = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const q of catalog)
      if (q.syllabusTopicId && !needsMissingSupportText(q))
        map.set(q.syllabusTopicId, (map.get(q.syllabusTopicId) ?? 0) + 1);
    return map;
  }, [catalog]);
  const disciplines = [...new Set(topics.map((t) => canonicalSubject(t.discipline)))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
  const filtered = topics.filter(
    (t) =>
      (discipline === "all" || canonicalSubject(t.discipline) === discipline) &&
      (!search || fold(`${t.discipline} ${t.topic_text}`).includes(fold(search))),
  );
  const groups = new Map<string, Topic[]>();
  for (const t of filtered) {
    const name = canonicalSubject(t.discipline);
    groups.set(name, [...(groups.get(name) ?? []), t]);
  }
  const chooseEdition = (id?: string) =>
    void navigate({ to: "/dashboard/edital", search: { edition: id } });
  if (authLoading || loading)
    return (
      <div className="flex h-64 items-center justify-center" role="status">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Carregando editais…</span>
      </div>
    );
  if (!real)
    return (
      <LockedState
        image="study-desk"
        title="Estudar pelo edital"
        description="Entre na sua conta para consultar os tópicos do edital e acessar materiais e questões vinculadas."
      />
    );
  return (
    <div className="edital-workspace space-y-5 pb-8">
      <header className="edital-heading">
        <div>
          <span className="edital-eyebrow">MEU CONCURSO</span>
          <h1>Meu edital</h1>
          <p>Encontre seu concurso e transforme o programa em uma sequência de estudo e prática.</p>
        </div>
        <BookOpenText aria-hidden className="edital-heading-icon" />
      </header>
      {!edition ? (
        <EditalEditionCatalog editions={editions} failed={!!error} />
      ) : (
        <section className="edital-selected">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">
              {edition.status === "archived" ? "Edição arquivada" : editalSourceLabel(edition)}
            </Badge>
            <Button variant="outline" onClick={() => chooseEdition()}>
              Trocar concurso ou edição
            </Button>
          </div>
          <h2>
            {edition.contest_name} · {edition.contest_year}
          </h2>
          <p>{edition.role_name}</p>
          <p className="text-sm text-muted-foreground">
            {edition.exam_board ||
              (examQuestions[0]?.board
                ? `${examQuestions[0].board} · identificada nas questões desta prova`
                : "Banca não informada")}
          </p>
          {editalSourceUrl(edition.source) && (
            <a
              href={editalSourceUrl(edition.source)!}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline"
            >
              {edition.source?.source_type === "edital"
                ? "Abrir documento do edital"
                : "Consultar documento de referência"}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <div
            className="mt-4 rounded-xl border border-primary/25 bg-primary/5 p-4"
            role="region"
            aria-label="Treinar a prova desta edição"
          >
            <h3 className="font-semibold">Resolva a prova escolhida</h3>
            <p className="my-2 text-sm text-muted-foreground">
              Treinador: entre direto nas questões desta prova, com correção após cada resposta. A
              seleção usa concurso, cargo, banca e ano. Questões por assunto abaixo podem ter origem
              em outras provas.
            </p>
            {catalogLoading ? (
              <p role="status">Conferindo questões desta prova…</p>
            ) : catalogError ? (
              <Button variant="outline" onClick={reloadCatalog}>
                Tentar carregar questões da prova
              </Button>
            ) : examQuestions.length ? (
              <>
                <Button asChild>
                  <Link to="/dashboard/question-trainer" search={editalPracticeSearch(edition)}>
                    Resolver questões desta prova ({examQuestions.length})
                  </Link>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  {examCoverage(
                    {
                      contest: edition.contest_name,
                      career: edition.role_name,
                      year: edition.contest_year,
                    },
                    examQuestions.length,
                  )}{" "}
                  Quantidade disponível no acervo revisado; pode ser menor que a prova completa.
                  Respostas anteriores ficam em revisão. Os limites diários do seu plano continuam
                  valendo.
                </p>
              </>
            ) : (
              <p role="status" className="text-sm">
                Ainda não há questões elegíveis identificadas para esta prova no acervo. Você pode
                estudar pelos assuntos abaixo; questões de outras provas não serão incluídas neste
                treino.
              </p>
            )}
          </div>
          {edition.status === "archived" && (
            <p className="edital-note">
              Programa histórico para consulta. Os materiais relacionados apresentam conteúdo atual
              e não reproduzem necessariamente a legislação vigente na data desta prova.
            </p>
          )}
          {edition.source?.source_type !== "edital" && (
            <p className="edital-note">
              Esta edição tem uma referência de prova cadastrada. Os assuntos disponíveis não
              representam necessariamente o programa completo do edital.
            </p>
          )}
        </section>
      )}
      {selected && !edition && !error && (
        <div role="alert" className="edital-empty">
          A edição solicitada não foi encontrada. Escolha outra edição no catálogo acima.
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
        >
          <p>{error}</p>
          <Button variant="outline" onClick={() => setRevision((n) => n + 1)}>
            Tentar novamente
          </Button>
        </div>
      )}
      {topicsError && (
        <div role="alert" className="edital-empty">
          {topicsError}
          <Button variant="outline" onClick={() => setRevision((n) => n + 1)}>
            Recarregar assuntos
          </Button>
        </div>
      )}
      {edition && (
        <>
          <section
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            aria-label="Cobertura do edital"
          >
            {[
              [topics.length, "Assuntos"],
              [disciplines.length, "Disciplinas"],
              [
                catalogLoading || catalogError
                  ? "—"
                  : topics.reduce((n, t) => n + (counts.get(t.id) ?? 0), 0),
                "Questões vinculadas",
              ],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border bg-card p-4">
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </section>
          <Card>
            <CardHeader>
              <CardTitle>Encontre seu próximo assunto</CardTitle>
              <CardDescription>
                As contagens indicam questões elegíveis para treino, não domínio ou conclusão do
                conteúdo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_260px]">
                <div>
                  <Label htmlFor="syllabus-search">Buscar assunto</Label>
                  <div className="relative mt-2">
                    <Search
                      aria-hidden
                      className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                    />
                    <Input
                      id="syllabus-search"
                      className="pl-9"
                      placeholder="Ex.: concordância, prescrição…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="syllabus-discipline">Disciplina</Label>
                  <select
                    id="syllabus-discipline"
                    className="mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm"
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                  >
                    <option value="all">Todas as disciplinas</option>
                    {disciplines.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              {catalogError && (
                <p role="status" className="mb-3 text-sm text-muted-foreground">
                  O acervo está indisponível; você ainda pode consultar os assuntos do edital.{" "}
                  <Button variant="ghost" size="sm" onClick={reloadCatalog}>
                    Tentar carregar questões
                  </Button>
                </p>
              )}
              {topicsLoading ? (
                <p role="status">Carregando assuntos…</p>
              ) : filtered.length ? (
                <Accordion type="multiple" defaultValue={disciplines.slice(0, 1)}>
                  {[...groups].map(([name, items]) => (
                    <AccordionItem key={name} value={name}>
                      <AccordionTrigger className="text-left">
                        {name}
                        <Badge variant="outline" className="ml-2">
                          {items.length} assuntos
                        </Badge>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {items.map((t) => (
                            <li key={t.id}>
                              <Link
                                to="/dashboard/edital/$topicId"
                                params={{ topicId: t.id }}
                                className="edital-topic-link"
                              >
                                <span className="flex items-start gap-2">
                                  <BookOpenText className="mt-0.5 h-4 w-4 shrink-0" />
                                  <span>{t.topic_text}</span>
                                </span>
                                <span className="flex shrink-0 items-center gap-2">
                                  <Badge variant="outline">
                                    {catalogLoading || catalogError
                                      ? "Consultando"
                                      : `${counts.get(t.id) ?? 0} questões`}
                                  </Badge>
                                  <ChevronRight className="h-4 w-4" />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="py-5 text-sm text-muted-foreground">
                  {topics.length
                    ? "Nenhum assunto corresponde à busca."
                    : "Esta edição ainda não tem assuntos liberados para estudo. O programa pode estar em revisão; consulte o documento de referência."}
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
