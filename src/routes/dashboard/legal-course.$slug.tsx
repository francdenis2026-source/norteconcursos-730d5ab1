import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStatus } from "@/hooks/useDashboard";
import { LockedState } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LegalCoursePractice } from "@/components/library/LegalCoursePractice";
import { WorkedExamples } from "@/components/library/WorkedExamples";
import { LawPracticeLink } from "@/components/library/LawPracticeLink";
import { LegalUpdateNotice } from "@/components/library/LegalUpdateNotice";
import { LegalStudyReading } from "@/components/library/LegalStudyReading";
import { LegalLiteralPractice } from "@/components/library/LegalLiteralPractice";
import { LegalCoverage } from "@/components/library/LegalCoverage";
import { useStudyMaterial } from "@/lib/studyMaterials";
import { UnitExplanation } from "@/components/library/UnitExplanation";
import { LegalRefProvider } from "@/components/library/LegalRefText";
import { rememberLegal } from "@/components/library/StartHere";
import { useLegalCourses, useLegalProgress, useLegalUnits, useLegalExplanationCoverage, useLegalRefIndex, useLegalExplanation, type LegalUnit, type LegalCourse } from "@/lib/legalCourses";
import { legalProgressSummary, selectNextLegalUnit, type LegalProgress, type ReviewRating } from "@/lib/legalLearning";
import { supabase } from "@/integrations/supabase/client";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { legalStudyCaveat } from "@/lib/legalStudyCaveats";

export const Route = createFileRoute("/dashboard/legal-course/$slug")({
  component: LegalCoursePage, head: () => ({ meta: [{ title: "Percurso de legislação | Norte Concursos" }] }),
  validateSearch: (s: Record<string, unknown>): { art?: string | undefined; par?: string | undefined } => ({
    art: typeof s["art"] === "string" ? s["art"] : undefined,
    par: typeof s["par"] === "string" || typeof s["par"] === "number" ? String(s["par"]) : undefined,
  }),
});

function LegalCoursePage() {
  const { slug } = useParams({ from: "/dashboard/legal-course/$slug" });
  const { user, isLoading } = useAuthStatus();
  const userId = user?.id !== "demo-user" ? user?.id : undefined;
  const courses = useLegalCourses(userId);
  const course = courses.data?.find(row => row.slug === slug);
  const units = useLegalUnits(course?.id, userId);
  const progress = useLegalProgress(userId);
  const coverage = useLegalExplanationCoverage(userId).data?.find(row => row.course_slug === slug);
  const material = useStudyMaterial(course?.material_slug ?? "", !!course && !!userId);
  const { art, par } = Route.useSearch();
  const navigate = useNavigate({ from: "/dashboard/legal-course/$slug" });
  const refIndex = useLegalRefIndex(courses.data, userId).data ?? null;
  const [selectedId, setSelectedIdState] = useState<string>();
  const [search, setSearch] = useState("");
  const [chapter, setChapter] = useState("all");
  const [dueOnly, setDueOnly] = useState(false);
  const [showExcluded, setShowExcluded] = useState(false);
  const [tab, setTab] = useState<"learn" | "application">("learn");
  const rows = units.data ?? [];
  const states = progress.data ?? [];
  const current = rows.filter(row => row.content_status === "current");
  const suggested = selectNextLegalUnit(rows, states);
  const fromUrl = art ? rows.find(row => row.unit_key === art) : undefined;
  const selected = rows.find(row => row.id === selectedId) ?? fromUrl ?? suggested ?? current[0];
  // escolher um dispositivo atualiza o endereço (compartilhável e com o botão Voltar funcionando)
  const setSelectedId = (id: string) => {
    setSelectedIdState(id);
    const unit = rows.find(row => row.id === id);
    if (unit) void navigate({ search: { art: unit.unit_key }, replace: true });
  };
  // link novo (?art=…&par=…) enquanto a página já está aberta: troca o dispositivo escolhido
  useEffect(() => { if (art) setSelectedIdState(undefined); }, [art, par]);
  useEffect(() => { if (course && selected) rememberLegal({ slug: course.slug, art: selected.unit_key, label: selected.label, title: course.title.replace(/ — leitura atualizada$/, "") }); }, [course?.slug, selected?.unit_key]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!art || !selected) return;
    const t = setTimeout(() => document.getElementById("dispositivo-aberto")?.scrollIntoView({ block: "start", behavior: "smooth" }), 250);
    return () => clearTimeout(t);
  }, [art, par, selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const summary = legalProgressSummary(current.map(row => row.id), states);
  const byId = useMemo(() => new Map(states.map(row => [row.unit_id, row])), [states]);
  const visible = rows.filter(row => (showExcluded || row.content_status === "current") && (chapter === "all" || row.chapter === chapter) && `${row.label} ${row.chapter} ${row.body_text}`.toLocaleLowerCase("pt-BR").includes(search.trim().toLocaleLowerCase("pt-BR")) && (!dueOnly || (byId.get(row.id)?.due_at && Date.parse(byId.get(row.id)!.due_at!) <= Date.now())));
  if (!isLoading && !userId) return <LockedState image="study-desk" title="Percurso de legislação" description="Entre para estudar e guardar seu progresso e suas revisões." />;
  if (isLoading || courses.isPending || (course && units.isPending)) return <Skeleton className="h-80 rounded-2xl" />;
  if (courses.isError || units.isError || !course) return <div className="surface-card p-6"><p>Não foi possível abrir este percurso.</p><Button onClick={() => { void courses.refetch(); void units.refetch(); }}>Tentar novamente</Button><Link to="/dashboard/library" className="ml-4 underline">Biblioteca</Link></div>;
  return <LegalRefProvider value={{ slug: course.slug, index: refIndex }}><div className="space-y-5 pb-8">
    <Link to="/dashboard/library" className="text-sm underline">← Biblioteca</Link>
    <header className="surface-card p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Percurso de legislação</p>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{course.title}</h1>
      {coverage && <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-900 dark:bg-indigo-500/20 dark:text-indigo-100">💡 Explicação por artigo: {coverage.explained} de {coverage.total_units} dispositivos{coverage.explained === 0 ? " (em preparação)" : ""}</p>}
      <p className="mt-3 text-muted-foreground">{course.overview.intro}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm" aria-label="Seu progresso nesta lei">
        <span>{summary.read}/{current.length} lidos</span><span>{summary.practiced} praticados sem consulta</span><span>{summary.difficult} dificuldades</span><span>{summary.due} revisões pendentes</span>
      </div>
      <progress className="mt-3 h-2 w-full" max={Math.max(current.length, 1)} value={summary.read} aria-label="Dispositivos lidos" />
    </header>
    <LegalUpdateNotice review={course.legal_review ? { ...course.legal_review, course_slug: undefined } : null} slug={course.material_slug} />
    <div className="flex flex-wrap gap-2" role="group" aria-label="Modo de estudo">
      <Button variant={tab === "learn" ? "default" : "outline"} onClick={() => setTab("learn")}>Leitura e recuperação</Button>
      <Button variant={tab === "application" ? "default" : "outline"} onClick={() => setTab("application")}>Questões comentadas e cartões</Button>
      {suggested && <Button variant="outline" onClick={() => { setSelectedId(suggested.id); setTab("learn"); }}>Próximo passo sugerido</Button>}
    </div>
    {progress.isError && <p role="alert" className="rounded-xl border p-3 text-sm">Não foi possível carregar o progresso. <button className="underline" onClick={() => void progress.refetch()}>Tentar novamente</button></p>}
    {tab === "application" ? material.isPending ? <Skeleton className="h-64" /> : material.data ? <>
      <p className="text-sm text-muted-foreground">Este conjunto testa os conceitos indicados no resumo de aplicação. A cobertura da leitura integral é acompanhada por dispositivo.</p>
      <WorkedExamples key={`${userId}:${course.material_slug}`} slug={course.material_slug} enabled={!!userId} />
      {userId && <LegalCoursePractice key={`${userId}:${material.data.slug}`} courseId={course.id} userId={userId} material={material.data} />}
      {userId && <LawPracticeLink law={course.slug} userId={userId} />}
      <Link to="/dashboard/library/$slug" params={{ slug: course.material_slug }} className="inline-block underline">Abrir explicações e exemplos de aplicação</Link>
    </> : <p>Não foi possível carregar os exercícios. <button onClick={() => void material.refetch()} className="underline">Tentar novamente</button></p> : <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="surface-card space-y-3 p-4 lg:sticky lg:top-4 lg:self-start">
        <label className="block text-sm">Buscar artigo ou expressão<input className="mt-1 w-full rounded-lg border bg-background p-2" type="search" value={search} onChange={e => setSearch(e.target.value)} /></label>
        <label className="block text-sm">Capítulo ou seção<select className="mt-1 w-full rounded-lg border bg-background p-2" value={chapter} onChange={e => setChapter(e.target.value)}><option value="all">Todos os blocos</option>{Array.from(new Set(rows.map(row => row.chapter))).map(name => <option key={name} value={name}>{name}</option>)}</select></label>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={dueOnly} onChange={e => setDueOnly(e.target.checked)} />Somente revisões pendentes</label>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={showExcluded} onChange={e => setShowExcluded(e.target.checked)} />Mostrar dispositivos excluídos</label>
        <p className="text-xs text-muted-foreground">{visible.length} dispositivos neste filtro</p>
        <nav className="max-h-[60vh] space-y-1 overflow-y-auto" aria-label="Dispositivos da lei">
          {visible.map(row => <button type="button" key={row.id} aria-current={selected?.id === row.id ? "true" : undefined} onClick={() => setSelectedId(row.id)} className={`block w-full rounded-lg border p-2 text-left text-sm ${selected?.id === row.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted"}`}>
            <strong>{row.label}</strong><span className="ml-2 text-xs text-muted-foreground">{row.content_status === "excluded" ? "Fora da leitura ativa" : byId.get(row.id)?.last_rating === "again" ? "Retomar" : byId.get(row.id)?.read_at ? "Lido" : "A estudar"}</span>
          </button>)}
          {!visible.length && <p className="text-sm">Nenhum dispositivo neste filtro.</p>}
        </nav>
      </aside>
      {progress.isPending ? <Skeleton className="h-80 rounded-xl" /> : selected && userId && !progress.isError && <UnitLesson key={`${userId}:${selected.id}`} unit={selected} law={course.slug} materialSlug={course.material_slug} references={course.overview.jurisprudence.filter(ref => ref.articles.includes(selected.label))} progress={byId.get(selected.id)} userId={userId} highlightPar={selected.unit_key === art ? par : undefined} onNext={() => { const index = current.findIndex(row => row.id === selected.id); if (current[index + 1]) setSelectedId(current[index + 1]!.id); }} />}
    </div>}
    <section aria-label="Sobre esta lei" className="space-y-4 border-t pt-5"><h2 className="text-lg font-bold">Sobre esta lei</h2>
      <div className="surface-card p-5 text-sm">
        <p className="mt-2 text-xs text-muted-foreground">Leitura e recuperação são acompanhadas separadamente. A autoavaliação orienta a revisão; não certifica aprovação ou domínio.</p>
        <p className="mt-3 text-sm"><strong>Edital de referência:</strong> {course.overview.contest}. A leitura integral inclui disposições que podem exceder o programa do cargo; confira seu edital.</p>
        {isStudySourceUrl(course.source_url) && <a href={course.source_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm underline">Texto oficial · conferido em {new Date(course.checked_at).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" })}</a>}
      </div>
    {userId && <LegalCoverage course={course} units={rows} userId={userId} />}
    <details className="surface-card p-5">
      <summary className="cursor-pointer font-semibold">Objetivos, atualizações e jurisprudência</summary>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">{course.overview.objectives.map(goal => <li key={goal}>{goal}</li>)}</ul>
      <p className="mt-4 whitespace-pre-line border-l-2 border-amber-500 pl-3 text-sm">{course.overview.alerts}</p>
      {course.overview.jurisprudence.map(ref => <div key={ref.url} className="mt-4 text-sm"><strong>{ref.title}</strong><p className="mt-1">{ref.explanation}</p>{isStudySourceUrl(ref.url) && <a href={ref.url} target="_blank" rel="noopener noreferrer" className="underline">Conferir no tribunal</a>}</div>)}
      <p className="mt-4 text-xs text-muted-foreground">{course.overview.editorial_scope}</p>
    </details>
    </section>
  </div></LegalRefProvider>;
}

function UnitLesson({ unit, law, materialSlug, references, progress, userId, highlightPar, onNext }: { highlightPar?: string | undefined; unit: LegalUnit; law: string; materialSlug: string; references: LegalCourse["overview"]["jurisprudence"]; progress: LegalProgress | undefined; userId: string; onNext: () => void }) {
  const caveat = legalStudyCaveat(law, unit.unit_key);
  const queryClient = useQueryClient();
  const [step, setStep] = useState<"entender" | "texto" | "fixar">(highlightPar ? "texto" : "entender");
  const explanation = useLegalExplanation(unit.id, userId);
  // sem explicação publicada para este artigo: começa direto no texto oficial
  useEffect(() => { if (explanation.isSuccess && !explanation.data && !highlightPar) setStep(cur => (cur === "entender" ? "texto" : cur)); }, [explanation.isSuccess, explanation.data, highlightPar]);
  const mode = step === "fixar" ? "recall" : "read";
  const [revealed, setRevealed] = useState(false);
  const [notes, setNotes] = useState(progress?.notes ?? "");
  const [response, setResponse] = useState("");
  const [busy, setBusy] = useState(false);
  const pendingRequest = useRef<{ rating: ReviewRating | "read"; notes: string; id: string } | null>(null);
  async function save(rating: ReviewRating | "read") {
    setBusy(true);
    try {
      if (pendingRequest.current?.rating !== rating || pendingRequest.current.notes !== notes) pendingRequest.current = { rating, notes, id: crypto.randomUUID() };
      const { error } = await supabase.rpc("record_legal_review_for_user", { p_unit_id: unit.id, p_rating: rating, p_notes: notes, p_request_id: pendingRequest.current.id, p_expected_user_id: userId });
      if (error) throw error;
      pendingRequest.current = null;
      await queryClient.invalidateQueries({ queryKey: ["legal-progress", userId] });
      toast.success(rating === "read" ? "Leitura e anotações salvas." : "Revisão programada. Seu progresso foi salvo.");
    } catch { toast.error("Não foi possível salvar. Suas anotações continuam nesta tela; tente novamente."); }
    finally { setBusy(false); }
  }
  return <article id="dispositivo-aberto" className="surface-card scroll-mt-4 space-y-4 p-5 sm:p-7">
    <p className="text-xs text-muted-foreground">{unit.chapter}</p><h2 className="text-2xl font-bold">{unit.label}</h2>
    {unit.content_status === "excluded" ? <p className="rounded-xl border border-amber-500 p-4 text-sm">Este dispositivo está vetado, revogado ou sem redação ativa no texto compilado. Não integra o progresso nem a recuperação de regras vigentes. Consulte o ato modificador na fonte oficial.</p> : <>
      <nav className="grid gap-2 sm:grid-cols-3" aria-label="Passos de estudo deste artigo">
        {([["entender", "1", "Entender", "Explicação em palavras simples", "from-sky-500 to-indigo-600"], ["texto", "2", "Ler o texto oficial", "Com grifos e leitura guiada", "from-emerald-500 to-teal-600"], ["fixar", "3", "Fixar", "Recuperar sem consulta e praticar", "from-amber-500 to-orange-600"]] as const).map(([id, n, title, sub, grad]) =>
          <button key={id} type="button" aria-current={step === id ? "step" : undefined} onClick={() => { setStep(id); if (id === "fixar") { setRevealed(false); setResponse(""); } }}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${step === id ? `border-transparent bg-gradient-to-r ${grad} text-white shadow` : "bg-card hover:border-primary"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-black ${step === id ? "bg-white/25" : "bg-muted"}`}>{n}</span>
            <span><span className="block text-sm font-bold">{title}</span><span className={`block text-xs ${step === id ? "text-white/85" : "text-muted-foreground"}`}>{sub}</span></span>
          </button>)}
      </nav>
      {mode === "recall" && <section className="space-y-3 rounded-xl border p-4"><h3 className="font-semibold">Explique com suas palavras</h3><ol className="list-decimal space-y-2 pl-5 text-sm">{unit.recall.prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ol><label className="block text-sm">Sua resposta de recuperação<textarea className="mt-1 min-h-36 w-full rounded-lg border bg-background p-3" value={response} onChange={e => setResponse(e.target.value)} placeholder="Responda antes de abrir a referência." /></label><Button disabled={!response.trim()} variant="outline" onClick={() => setRevealed(true)}>Conferir com o texto e os critérios</Button></section>}
      {step === "entender" && <>
        {caveat && <aside className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4 text-sm"><strong>{caveat.title}</strong><p className="mt-2 leading-7">{caveat.explanation}</p><a href={caveat.source} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">Conferir o entendimento do STJ</a></aside>}
        {references.map(ref => <aside key={ref.url} className="rounded-xl border border-amber-500/50 p-4 text-sm"><strong>{ref.title}</strong><p className="mt-2">{ref.explanation}</p>{isStudySourceUrl(ref.url) && <a className="mt-2 inline-block underline" href={ref.url} target="_blank" rel="noopener noreferrer">Fonte do tribunal</a>}</aside>)}
        <UnitExplanation unit={unit} userId={userId} />
        {explanation.isSuccess && !explanation.data && <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">A explicação deste artigo ainda está em preparação. Leia o texto oficial no passo 2.</p>}
        <div className="flex justify-end"><Button onClick={() => setStep("texto")}>Ler o texto oficial →</Button></div>
      </>}
      {(step === "texto" || (step === "fixar" && revealed)) && <>
        <div className={unit.unit_key.startsWith("anexo-") ? "library-body overflow-x-auto" : undefined}><LegalStudyReading source={unit.body_text} markdown={unit.unit_key.startsWith("anexo-")} highlightPar={highlightPar} /></div>
        {step === "texto" && caveat?.literalPractice !== false && <LegalLiteralPractice key={unit.content_sha256} source={unit.body_text} label={unit.label} />}
        {unit.recall.figures?.filter(figure => isStudySourceUrl(figure.url)).map(figure => <figure key={figure.url} className="rounded-xl border p-3"><img src={figure.url} alt={figure.title} className="h-auto max-w-full" loading="lazy" onError={event => { event.currentTarget.hidden = true; }} /><figcaption className="mt-2 text-xs"><a href={figure.url} target="_blank" rel="noopener noreferrer" className="underline">{figure.title}</a></figcaption></figure>)}
        {step === "texto" && <div className="flex justify-between gap-2"><Button variant="outline" onClick={() => setStep("entender")}>← Entender</Button><Button onClick={() => { setStep("fixar"); setRevealed(false); setResponse(""); }}>Fixar este artigo →</Button></div>}
      </>}
      {step === "fixar" && <>
        <section className="rounded-xl bg-muted/40 p-4"><h3 className="font-semibold">Como conferir sua compreensão</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm">{unit.recall.checklist.map(item => <li key={item}>{item}</li>)}</ul></section>
        <WorkedExamples slug={materialSlug} enabled={true} articleLabel={unit.label} />
      </>}
      {mode === "recall" && revealed && <section className="space-y-3"><p className="text-sm">Compare sua resposta com o dispositivo inteiro. Registre a regra ou exceção que confundiu. Esta avaliação é feita por você; não é correção automática de texto livre.</p><div className="flex flex-wrap gap-2">{([['again','Não lembrei · 10 min'],['hard','Com dificuldade · 1 dia'],['good','Lembrei'],['easy','Lembrei com facilidade']] as const).map(([rating,label]) => <Button disabled={busy} key={rating} variant="outline" onClick={() => void save(rating)}>{label}</Button>)}</div></section>}
      <label className="block text-sm">Anotações e confusões a retomar<textarea maxLength={4000} className="mt-1 min-h-24 w-full rounded-lg border bg-background p-3" value={notes} onChange={e => setNotes(e.target.value)} /></label>
      <div className="flex flex-wrap gap-2"><Button disabled={busy} onClick={() => void save("read")}>Salvar leitura e anotações</Button><Button variant="outline" onClick={onNext}>Próximo dispositivo</Button></div>
      {progress?.due_at && <p className="text-xs text-muted-foreground">Próxima revisão: {new Date(progress.due_at).toLocaleString("pt-BR", { timeZone: "America/Rio_Branco" })}</p>}
    </>}
  </article>;
}
