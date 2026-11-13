import { editalExamQuestions, editalPracticeSearch } from "@/lib/editalPractice";
import { examCoverage } from "@/lib/examCoverage";
import { EditalEditionCatalog } from "@/components/dashboard/EditalEditionCatalog";
import { fetchEditalEditions } from "@/lib/editalEditions";
import React from "react";
import "@/styles/student-workspace-unified.css";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftRight, BookOpenText, Check, ChevronRight, ClipboardCheck, ExternalLink, FileText, Layers, ListChecks, Loader2, Search, Share2, Download, Star, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { canonicalSubject } from "@/lib/subjects";
import { fetchAllRows } from "@/lib/catalog";
import { readActiveStudyEdition, saveActiveStudyEdition } from "@/lib/activeStudyEdition";
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

import "@/styles/student-internal-workspace-system.css";
import "@/styles/edital-pdf-refinement.css";
import "@/styles/edital-compact.css";
import "@/styles/edital-study.css";

const ED3_TONES = ["#39A6D8", "#E6A64A", "#70C58A", "#9B83E8", "#D8799D", "#4FB6A8"];

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
  const navigate = Route.useNavigate();
  const { edition: initialEdition } = Route.useSearch();
  const [selected, setSelected] = React.useState(initialEdition);
  // Trocar de edição não deve escrever na URL; o parâmetro inicial (vindo de
  // um link de outra tela) é lido uma vez e removido da barra de endereço.
  React.useEffect(() => {
    if (initialEdition) void navigate({ search: {}, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só na montagem
  }, []);
  const [editions, setEditions] = React.useState<Edition[]>([]),
    [topics, setTopics] = React.useState<Topic[]>([]);
  const [loading, setLoading] = React.useState(true),
    [topicsLoading, setTopicsLoading] = React.useState(false),
    [error, setError] = React.useState("");
  const [topicsError, setTopicsError] = React.useState("");
  const [search, setSearch] = React.useState(""),
    [discipline, setDiscipline] = React.useState("all"),
    [progressFilter, setProgressFilter] = React.useState<"all" | "pending" | "done">("all"),
    [revision, setRevision] = React.useState(0);
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});
  const [activeEditionId, setActiveEditionId] = React.useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = React.useState("");
  const [downloadBusy, setDownloadBusy] = React.useState(false);
  const [downloadFeedback, setDownloadFeedback] = React.useState("");
  async function downloadEdital(url: string, title: string) {
    if (downloadBusy) return;
    setDownloadBusy(true);
    setDownloadFeedback("");
    try {
      const response = await fetch(url, { credentials: "omit" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const type = blob.type.toLowerCase();
      const pdf = type.includes("pdf") || new URL(url).pathname.toLowerCase().endsWith(".pdf");
      if (!pdf || type.includes("html")) throw new Error("A origem não retornou um PDF válido");
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `${title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-").slice(0, 90)}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
      setDownloadFeedback("Download iniciado.");
    } catch {
      setDownloadFeedback("O servidor do documento não permitiu o download direto. Use Abrir edital e salve o PDF pelo navegador.");
    } finally {
      setDownloadBusy(false);
    }
  }

  async function shareEdital(url: string, title: string) {
    setShareFeedback("");
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareFeedback("Link do documento copiado.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareFeedback("Não foi possível compartilhar. Abra o documento e copie o endereço.");
    }
  }

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
  React.useEffect(() => {
    setActiveEditionId(user?.id ? readActiveStudyEdition(user.id)?.id ?? null : null);
  }, [user?.id, editionId]);
  React.useEffect(() => {
    if (!editionId) return;
    try { setCompleted(JSON.parse(localStorage.getItem(`norte-edital-progress:${editionId}`) ?? "{}")); } catch { setCompleted({}); }
  }, [editionId]);
  const toggleCompleted = (topicId: string) => {
    setCompleted((current) => {
      const next = { ...current, [topicId]: !current[topicId] };
      if (editionId) localStorage.setItem(`norte-edital-progress:${editionId}`, JSON.stringify(next));
      return next;
    });
  };
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
      (progressFilter === "all" || (progressFilter === "done" ? completed[t.id] : !completed[t.id])) &&
      (!search || fold(`${t.discipline} ${t.topic_text}`).includes(fold(search))),
  );
  const completedCount = topics.filter((topic) => completed[topic.id]).length;
  const completionPercent = topics.length ? Math.round((completedCount / topics.length) * 100) : 0;
  const groups = new Map<string, Topic[]>();
  for (const t of filtered) {
    const name = canonicalSubject(t.discipline);
    groups.set(name, [...(groups.get(name) ?? []), t]);
  }
  const chooseEdition = (id?: string) => setSelected(id);
  const adoptEdition = () => {
    if (!user?.id || !edition) return;
    const saved = saveActiveStudyEdition(user.id, {
      id: edition.id,
      contestName: edition.contest_name,
      roleName: edition.role_name,
      year: edition.contest_year,
      examBoard: edition.exam_board,
    });
    if (saved) setActiveEditionId(edition.id);
  };
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
    <div className="nc-student-workspace edital-workspace space-y-5 pb-8">
      <header className="ed2-strip">
        <BookOpenText aria-hidden className="ed2-strip__icon" />
        <div className="ed2-strip__text">
          <span>Meu concurso</span>
          <h1>Estudar pelo edital</h1>
        </div>
        <dl className="ed2-strip__stats">
          {edition ? (
            <>
              <div><dt>Disciplinas</dt><dd>{disciplines.length}</dd></div>
              <div><dt>Tópicos</dt><dd>{topics.length}</dd></div>
            </>
          ) : (
            <div><dt>Editais</dt><dd>{editions.length}</dd></div>
          )}
        </dl>
      </header>
      {!edition ? (
        <EditalEditionCatalog editions={editions} failed={!!error} activeEditionId={activeEditionId} />
      ) : (
        <section className="ed3-identity" aria-label="Edição selecionada">
          <header className="ed3-identity__head">
            <div className="ed3-identity__title">
              <Badge variant="outline">
                {edition.status === "archived" ? "Edição arquivada" : editalSourceLabel(edition)}
              </Badge>
              <h2>{edition.contest_name} · {edition.contest_year}</h2>
              <p>
                {edition.role_name} ·{" "}
                {edition.exam_board ||
                  (examQuestions[0]?.board ? `${examQuestions[0].board} (identificada nas questões)` : "Banca não informada")}
              </p>
            </div>
            <div className="ed3-identity__actions">
              <Button
                variant={activeEditionId === edition.id ? "default" : "outline"}
                size="sm"
                onClick={adoptEdition}
                disabled={activeEditionId === edition.id || !user?.id}
              >
                <Star className="mr-2 h-4 w-4" aria-hidden="true" />
                {activeEditionId === edition.id ? "Edital principal" : "Usar como principal"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => chooseEdition()}>
                <ArrowLeftRight className="mr-2 h-4 w-4" aria-hidden="true" /> Trocar edição
              </Button>
              {editalSourceUrl(edition.source) && (
                <>
                  <Button asChild variant="outline" size="sm">
                    <a href={editalSourceUrl(edition.source)!} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                      {edition.source?.source_type === "edital" ? "Abrir edital" : "Abrir referência"}
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={downloadBusy}
                    onClick={() => void downloadEdital(editalSourceUrl(edition.source)!, `${edition.contest_name}-${edition.contest_year}`)}
                  >
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    {downloadBusy ? "Baixando…" : "PDF"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void shareEdital(editalSourceUrl(edition.source)!, `${edition.contest_name} — ${edition.contest_year}`)}
                  >
                    <Share2 className="mr-2 h-4 w-4" aria-hidden="true" /> Compartilhar
                  </Button>
                </>
              )}
            </div>
            {(shareFeedback || downloadFeedback) && <span role="status" className="ed3-identity__feedback">{downloadFeedback || shareFeedback}</span>}
          </header>
          <dl className="ed3-stats" aria-label="Resumo da edição">
            <div className="ed3-stat ed3-stat--progress">
              <ClipboardCheck aria-hidden="true" />
              <dt>Progresso</dt>
              <dd>{completionPercent}%</dd>
              <small>{completedCount} de {topics.length} assuntos estudados</small>
              <div className="edital-progress-track" role="progressbar" aria-label="Progresso do edital" aria-valuenow={completionPercent} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${completionPercent}%` }} /></div>
            </div>
            <div className="ed3-stat ed3-stat--disc"><Layers aria-hidden="true" /><dt>Disciplinas</dt><dd>{disciplines.length}</dd><small>no programa</small></div>
            <div className="ed3-stat ed3-stat--topics"><ListChecks aria-hidden="true" /><dt>Assuntos</dt><dd>{topics.length}</dd><small>itens da edição</small></div>
            <div className="ed3-stat ed3-stat--q"><Target aria-hidden="true" /><dt>Questões da prova</dt><dd>{catalogLoading ? "—" : examQuestions.length}</dd><small>{examQuestions.length ? "para treinar" : "nenhuma identificada"}</small></div>
          </dl>
          {activeEditionId === edition.id && (
            <p role="status" className="ed3-note ed3-note--ok">Este edital é a referência de estudo nas disciplinas da plataforma.</p>
          )}
          {edition.status === "archived" && (
            <p className="ed3-note">Programa histórico para consulta. Os materiais apresentam conteúdo atual e não reproduzem necessariamente a legislação vigente na data desta prova.</p>
          )}
          {edition.source?.source_type !== "edital" && (
            <p className="ed3-note">Esta edição tem uma referência de prova cadastrada; os assuntos podem não representar o programa completo do edital.</p>
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
          <ol className="ed3-trail" aria-label="Como estudar por este edital">
            <li><span>1</span><div><strong>Escolha a disciplina</strong><small>Use a busca ou abra um bloco abaixo.</small></div></li>
            <li><span>2</span><div><strong>Estude o assunto</strong><small>Abra o tópico e marque como estudado.</small></div></li>
            <li><span>3</span><div><strong>Resolva questões</strong><small>Treine pelo assunto ou pela prova inteira.</small></div></li>
          </ol>
          <section className="ed3-exam" role="region" aria-label="Treinar a prova desta edição">
            <ClipboardCheck aria-hidden="true" />
            <div>
              <h3>Resolva a prova desta edição</h3>
              {catalogLoading ? (
                <p role="status">Conferindo questões desta prova…</p>
              ) : catalogError ? (
                <p>Não foi possível carregar as questões.</p>
              ) : examQuestions.length ? (
                <p>
                  {examCoverage({ contest: edition.contest_name, career: edition.role_name, year: edition.contest_year }, examQuestions.length)}{" "}
                  Quantidade do acervo revisado; pode ser menor que a prova completa. Os limites diários do seu plano continuam valendo.
                </p>
              ) : (
                <p role="status">Ainda não há questões elegíveis desta prova no acervo. Estude pelos assuntos abaixo; questões de outras provas não entram neste treino.</p>
              )}
            </div>
            {catalogError ? (
              <Button variant="outline" onClick={reloadCatalog}>Tentar de novo</Button>
            ) : examQuestions.length ? (
              <Button asChild>
                <Link to="/dashboard/question-trainer" search={editalPracticeSearch(edition)}>
                  Resolver {examQuestions.length} questões
                </Link>
              </Button>
            ) : null}
          </section>
          <Card className="ed3-syllabus">
            <CardHeader>
              <CardTitle>Programa por disciplina</CardTitle>
              <CardDescription>
                As contagens indicam questões elegíveis para treino, não domínio do conteúdo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_260px]">
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
                <div className="edital-filter-tabs sm:col-span-2" role="group" aria-label="Filtrar progresso">
                  {([["all", "Todos"], ["pending", "Pendentes"], ["done", "Estudados"]] as const).map(([value, label]) => (
                    <button key={value} type="button" className={progressFilter === value ? "is-active" : ""} onClick={() => setProgressFilter(value)}>{label}</button>
                  ))}
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
                  {[...groups].map(([name, items], index) => {
                    const done = items.filter((item) => completed[item.id]).length;
                    return (
                    <AccordionItem key={name} value={name} className="ed3-disc" style={{ "--ed3-tone": ED3_TONES[index % ED3_TONES.length] } as React.CSSProperties}>
                      <AccordionTrigger className="text-left">
                        <span className="ed3-disc__icon"><FileText aria-hidden="true" /></span>
                        <span className="ed3-disc__name">{name}</span>
                        <span className="ed3-disc__meta">
                          <span>{done}/{items.length} estudados</span>
                          <span className="ed3-disc__bar" aria-hidden="true"><i style={{ width: `${items.length ? Math.round((done / items.length) * 100) : 0}%` }} /></span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {items.map((t) => (
                            <li key={t.id}>
                              <Link
                                to="/dashboard/edital/$topicId"
                                params={{ topicId: t.id }}
                                className={`edital-topic-link ${completed[t.id] ? "is-complete" : ""}`}
                              >
                                <span className="flex items-start gap-3">
                                  <button type="button" className={`edital-check ${completed[t.id] ? "is-checked" : ""}`} aria-label={completed[t.id] ? "Marcar como pendente" : "Marcar como estudado"} onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggleCompleted(t.id); }}>
                                    {completed[t.id] && <Check className="h-4 w-4" />}
                                  </button>
                                  <span className="flex items-start gap-2"><BookOpenText className="mt-0.5 h-4 w-4 shrink-0" /><span>{t.topic_text}</span></span>
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
                    );
                  })}
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
