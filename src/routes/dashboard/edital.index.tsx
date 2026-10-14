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
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
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
type Edition = {
  id: string;
  contest_name: string;
  role_name: string;
  contest_year: number;
  exam_board: string | null;
  source: { title: string; url: string; source_type: string; status: string } | null;
};
type Topic = { id: string; discipline: string; topic_text: string; topic_order: number | null };
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
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
    void supabase
      .from("syllabus_editions")
      .select(
        "id,contest_name,role_name,contest_year,exam_board,source:content_sources(title,url,source_type,status)",
      )
      .eq("status", "active")
      .order("contest_name")
      .order("contest_year", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setError("Não foi possível carregar as edições do edital.");
        else setEditions((data ?? []) as unknown as Edition[]);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [authLoading, user?.id, real, revision]);
  const edition = editions.find((e) => e.id === selected);
  React.useEffect(() => {
    setSearch("");
    setDiscipline("all");
    setTopics([]);
    setError("");
    if (!edition) {
      setTopicsLoading(false);
      return;
    }
    let active = true;
    setTopicsLoading(true);
    void fetchAllRows<Topic>((from, to) =>
      supabase
        .from("syllabus_topics")
        .select("id,discipline,topic_text,topic_order")
        .eq("edition_id", edition.id)
        .eq("content_status", "current")
        .order("id")
        .range(from, to),
    )
      .then((data) => {
        if (active) setTopics(data.sort((a, b) => (a.topic_order ?? 0) - (b.topic_order ?? 0)));
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os assuntos desta edição.");
      })
      .finally(() => {
        if (active) setTopicsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [edition?.id, revision]);
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
    <div className="mx-auto max-w-6xl space-y-5 pb-8">
      <PageHero
        image="study-desk"
        size="sm"
        kicker="Seu programa de estudo"
        title="Estudar pelo edital"
        description="Escolha a edição e o cargo. Localize um assunto, consulte materiais relacionados e pratique as questões vinculadas a esse tópico."
      />
      <Card>
        <CardContent className="space-y-3 p-5">
          <Label htmlFor="syllabus-edition">Concurso, cargo e edição</Label>
          <select
            id="syllabus-edition"
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
            value={selected ?? "all"}
            onChange={(e) =>
              void navigate({
                to: "/dashboard/edital",
                search: { edition: e.target.value === "all" ? undefined : e.target.value },
              })
            }
          >
            <option value="all">Selecione uma edição do edital</option>
            {editions.map((e) => (
              <option key={e.id} value={e.id}>
                {e.contest_name} — {e.role_name} ({e.contest_year})
              </option>
            ))}
          </select>
          {edition && (
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {edition.exam_board ?? "Banca não informada"}
              </span>
              {edition.source?.source_type === "edital" &&
                edition.source.status === "vigente" &&
                /^https:\/\//.test(edition.source.url) && (
                  <a
                    href={edition.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-primary"
                  >
                    Consultar fonte do edital <ExternalLink className="h-4 w-4" />
                  </a>
                )}
            </div>
          )}
        </CardContent>
      </Card>
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
      {edition && (
        <>
          <section className="grid grid-cols-3 gap-3" aria-label="Cobertura do edital">
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
                <Accordion type="multiple">
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
                                className="flex items-center justify-between gap-3 rounded-xl border p-3 text-sm hover:bg-muted"
                              >
                                <span className="flex items-start gap-2">
                                  <BookOpenText className="mt-0.5 h-4 w-4 shrink-0" />
                                  {t.topic_text}
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
                    : "Esta edição ainda não tem tópicos atuais cadastrados."}
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
      {!selected && !error && (
        <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
          Selecione o edital que orienta sua preparação. O cronograma organiza sua rotina; esta área
          ajuda a consultar e estudar cada tópico.
        </div>
      )}
    </div>
  );
}
