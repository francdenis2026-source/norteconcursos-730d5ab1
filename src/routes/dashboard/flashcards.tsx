import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Layers, Loader2, Pencil, Plus, RotateCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { confirmDialog } from "@/lib/confirm";
import { formatInterval, nextState, RATING_LABEL, type Rating } from "@/lib/flashcards";
import { CAREERS } from "@/lib/studyEngine";
import { topicsFor } from "@/data/studyTopics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/flashcards")({
  validateSearch: (s: Record<string, unknown>): { subject?: string | undefined; topic?: string | undefined } => ({
    subject: typeof s["subject"] === "string" ? s["subject"] : undefined,
    topic: typeof s["topic"] === "string" ? s["topic"] : undefined,
  }),
  component: FlashcardsPage,
});

interface Card_ {
  id: string;
  subject: string;
  topic: string | null;
  front: string;
  back: string;
  ease: number;
  interval_days: number;
  reps: number;
  lapses: number;
  due_at: string;
  last_reviewed_at: string | null;
}

const SUBJECTS = [...new Set(CAREERS.flatMap((c) => c.subjects.map((s) => s.name)))].sort((a, b) => a.localeCompare(b, "pt-BR"));
const RATINGS: Rating[] = ["again", "hard", "good", "easy"];
const RATING_STYLE: Record<Rating, string> = {
  again: "border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20",
  hard: "border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20",
  good: "border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20",
  easy: "border-sky-500/50 bg-sky-500/10 hover:bg-sky-500/20",
};
const isSameAcreDay = (iso: string | null) =>
  !!iso && new Intl.DateTimeFormat("en-CA", { timeZone: "America/Rio_Branco" }).format(new Date(iso)) === new Intl.DateTimeFormat("en-CA", { timeZone: "America/Rio_Branco" }).format(new Date());

function CardForm({
  initial, onSave, onCancel,
}: {
  initial: { subject: string; topic: string; front: string; back: string; id?: string };
  onSave: (v: { subject: string; topic: string; front: string; back: string; id?: string }) => Promise<void>;
  onCancel?: () => void;
}) {
  const [v, setV] = React.useState(initial);
  const [busy, setBusy] = React.useState(false);
  const topics = React.useMemo(() => topicsFor(v.subject), [v.subject]);
  const ok = v.subject && v.front.trim() && v.back.trim();
  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!ok) return;
        setBusy(true);
        await onSave(v);
        setBusy(false);
        if (!initial.id) setV({ ...v, front: "", back: "" });
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fc-subject">Matéria</Label>
          <select id="fc-subject" value={v.subject} onChange={(e) => setV({ ...v, subject: e.target.value, topic: "" })} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="">Escolha…</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fc-topic">Assunto (opcional)</Label>
          <Input id="fc-topic" list="fc-topics" value={v.topic} maxLength={120} onChange={(e) => setV({ ...v, topic: e.target.value })} placeholder="Ex.: Crase" />
          <datalist id="fc-topics">{topics.map((t) => <option key={t} value={t} />)}</datalist>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fc-front">Pergunta (frente)</Label>
        <Textarea id="fc-front" value={v.front} maxLength={600} rows={2} onChange={(e) => setV({ ...v, front: e.target.value })} placeholder="Uma pergunta objetiva, que se responde de cabeça." />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fc-back">Resposta (verso)</Label>
        <Textarea id="fc-back" value={v.back} maxLength={1500} rows={3} onChange={(e) => setV({ ...v, back: e.target.value })} placeholder="A resposta curta. Lei seca: confira o texto vigente antes de decorar." />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={!ok || busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : initial.id ? "Salvar alterações" : "Adicionar ao baralho"}</Button>
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>}
      </div>
    </form>
  );
}

function FlashcardsPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const search = Route.useSearch();
  const [cards, setCards] = React.useState<Card_[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState<"study" | "cards">(search.subject || search.topic ? "cards" : "study");
  const [queue, setQueue] = React.useState<Card_[]>([]);
  const [flipped, setFlipped] = React.useState(false);
  const [reviewed, setReviewed] = React.useState(0);
  const [studySubject, setStudySubject] = React.useState("all");
  const [editing, setEditing] = React.useState<Card_ | null>(null);
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const real = !!user && user.id !== "demo-user";

  const load = React.useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from("flashcards").select("*").eq("user_id", user.id).order("due_at", { ascending: true }).limit(3000);
    setCards((data as Card_[] | null) ?? []);
    setLoading(false);
  }, [user]);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real) { setLoading(false); return; }
    void load();
  }, [authLoading, real, load]);

  const dueNow = React.useMemo(() => cards.filter((c) => new Date(c.due_at) <= new Date()), [cards]);
  const doneToday = cards.filter((c) => isSameAcreDay(c.last_reviewed_at)).length;

  const startSession = React.useCallback(() => {
    const pool = dueNow.filter((c) => studySubject === "all" || c.subject === studySubject).slice(0, 30);
    setQueue(pool);
    setFlipped(false);
    setReviewed(0);
  }, [dueNow, studySubject]);

  React.useEffect(() => { if (!loading && tab === "study") startSession(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [loading, tab, studySubject]);

  const current = queue[0];

  const rate = React.useCallback(async (rating: Rating) => {
    const card = queue[0];
    if (!card || !user) return;
    const next = nextState(card, rating);
    setQueue((q) => (rating === "again" ? [...q.slice(1), { ...card, ...next }] : q.slice(1)));
    setFlipped(false);
    setReviewed((n) => n + 1);
    const patch = { ease: next.ease, interval_days: next.interval_days, reps: next.reps, lapses: next.lapses, due_at: next.due_at, last_reviewed_at: new Date().toISOString() };
    setCards((cs) => cs.map((c) => (c.id === card.id ? { ...c, ...patch } : c)));
    const [a, b] = await Promise.all([
      supabase.from("flashcards").update(patch).eq("id", card.id),
      supabase.from("flashcard_reviews").insert({ user_id: user.id, card_id: card.id, rating }),
    ]);
    if (a.error || b.error) toast.error("Não foi possível salvar essa revisão.");
  }, [queue, user]);

  // Atalhos: espaço vira o cartão; 1 a 4 avaliam.
  React.useEffect(() => {
    if (tab !== "study" || !current) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped((f) => !f); }
      else if (flipped && ["1", "2", "3", "4"].includes(e.key)) void rate(RATINGS[Number(e.key) - 1]!);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, current, flipped, rate]);

  async function save(v: { subject: string; topic: string; front: string; back: string; id?: string }) {
    if (!user) return;
    const row = { subject: v.subject, topic: v.topic.trim() || null, front: v.front.trim(), back: v.back.trim() };
    const { error } = v.id
      ? await supabase.from("flashcards").update(row).eq("id", v.id)
      : await supabase.from("flashcards").insert({ ...row, user_id: user.id });
    if (error) { toast.error("Não foi possível salvar o cartão."); return; }
    toast.success(v.id ? "Cartão atualizado." : "Cartão adicionado. Ele já entra na revisão de hoje.");
    setEditing(null);
    await load();
  }

  async function remove(c: Card_) {
    if (!(await confirmDialog({ title: "Excluir cartão?", message: `"${c.front.slice(0, 80)}" será apagado do seu baralho.`, confirmLabel: "Excluir cartão" }))) return;
    const { error } = await supabase.from("flashcards").delete().eq("id", c.id);
    if (error) { toast.error("Não foi possível excluir."); return; }
    toast.success("Cartão excluído.");
    await load();
  }

  if (authLoading || loading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;
  if (!real) return <LockedState image="study-desk" title={<>Meus <em>flashcards</em></>} description="Entre na sua conta para criar cartões e revisá-los na hora certa." />;

  const subjectsInDeck = [...new Set(cards.map((c) => c.subject))].sort();
  const shown = cards.filter((c) => (filter === "all" || c.subject === filter) && (!query || `${c.front} ${c.back} ${c.topic ?? ""}`.toLowerCase().includes(query.toLowerCase())));
  const sessionTotal = reviewed + queue.length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHero image="study-desk" size="sm" kicker="Questões" icon={Layers} title={<>Meus <em>flashcards</em></>}
        description="Crie cartões e revise na hora certa: o sistema agenda cada um conforme a facilidade que você teve." />

      <div className="grid grid-cols-3 gap-3">
        {[["Para revisar agora", dueNow.length], ["Revisados hoje", doneToday], ["Total no baralho", cards.length]].map(([l, v]) => (
          <div key={String(l)} className="rounded-xl border bg-card p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">{l}</p>
            <p className="text-2xl font-black tabular-nums">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Flashcards">
        {([["study", "Estudar"], ["cards", "Meus cartões"]] as const).map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={cn("rounded-full border px-4 py-1.5 text-sm font-semibold", tab === id ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
            {label}
          </button>
        ))}
      </div>

      {tab === "study" && (
        <Card>
          <CardHeader className="gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-primary" /> Sessão de revisão</CardTitle>
              <CardDescription>Espaço vira o cartão · 1 Errei · 2 Difícil · 3 Bom · 4 Fácil</CardDescription>
            </div>
            <select aria-label="Matéria da sessão" value={studySubject} onChange={(e) => setStudySubject(e.target.value)} className="h-9 rounded-md border border-input bg-background px-2 text-sm">
              <option value="all">Todas as matérias</option>
              {subjectsInDeck.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </CardHeader>
          <CardContent className="space-y-4">
            {cards.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Seu baralho está vazio. <button className="font-semibold text-primary underline" onClick={() => setTab("cards")}>Crie o primeiro cartão</button> ou
                salve os flashcards de um material da Biblioteca.
              </div>
            ) : !current ? (
              <div className="space-y-2 py-8 text-center">
                <p className="text-lg font-bold">{reviewed > 0 ? `Sessão concluída: ${reviewed} cartões revisados.` : "Nada para revisar agora."}</p>
                <p className="text-sm text-muted-foreground">Os próximos cartões voltam no tempo certo. Volte amanhã ou adicione novos cartões.</p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold"><span>{current.subject}{current.topic ? ` · ${current.topic}` : ""}</span><span className="tabular-nums">{reviewed}/{sessionTotal}</span></div>
                  <Progress value={sessionTotal ? (100 * reviewed) / sessionTotal : 0} className="h-1.5" />
                </div>
                <button type="button" onClick={() => setFlipped((f) => !f)} aria-label={flipped ? "Ver a pergunta" : "Ver a resposta"}
                  className="flex min-h-56 w-full flex-col items-center justify-center gap-3 rounded-2xl border bg-gradient-to-br from-card to-muted/50 p-6 text-center shadow-sm transition-colors hover:border-primary/50">
                  <span className="text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">{flipped ? "Resposta" : "Pergunta · toque para virar"}</span>
                  <span className={cn("whitespace-pre-wrap leading-relaxed", flipped ? "text-base" : "text-xl font-bold")}>{flipped ? current.back : current.front}</span>
                </button>
                {flipped ? (
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {RATINGS.map((r, i) => (
                      <button key={r} type="button" onClick={() => void rate(r)} className={cn("rounded-xl border p-3 text-center transition-colors", RATING_STYLE[r])}>
                        <span className="block text-sm font-bold">{RATING_LABEL[r]}</span>
                        <span className="block text-[0.7rem] text-muted-foreground">{nextState(current, r).label}</span>
                        <span className="sr-only">tecla {i + 1}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => setFlipped(true)}><RotateCw className="h-4 w-4" /> Mostrar resposta</Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "cards" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5 text-primary" /> {editing ? "Editar cartão" : "Novo cartão"}</CardTitle>
              <CardDescription>Cartões bons têm uma ideia só. Escreva a pergunta como se fosse cair na prova.</CardDescription>
            </CardHeader>
            <CardContent>
              <CardForm
                key={editing?.id ?? "new"}
                initial={editing ? { id: editing.id, subject: editing.subject, topic: editing.topic ?? "", front: editing.front, back: editing.back } : { subject: search.subject ?? "", topic: search.topic ?? "", front: "", back: "" }}
                onSave={save}
                {...(editing ? { onCancel: () => setEditing(null) } : {})}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle>Meu baralho ({shown.length})</CardTitle>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input aria-label="Buscar cartão" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar" className="h-9 w-40 pl-8" />
                </div>
                <select aria-label="Filtrar por matéria" value={filter} onChange={(e) => setFilter(e.target.value)} className="h-9 rounded-md border border-input bg-background px-2 text-sm">
                  <option value="all">Todas</option>
                  {subjectsInDeck.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {shown.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Nenhum cartão encontrado.</p>
              ) : (
                <ul className="divide-y">
                  {shown.map((c) => {
                    const due = new Date(c.due_at) <= new Date();
                    return (
                      <li key={c.id} className="flex items-start justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{c.front}</p>
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{c.back}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[0.68rem]">
                            <Badge variant="outline">{c.subject}</Badge>
                            {c.topic && <Badge variant="outline">{c.topic}</Badge>}
                            <span className={cn("font-semibold", due ? "text-amber-600" : "text-muted-foreground")}>
                              {due ? "Revisar agora" : `Próxima: ${new Date(c.due_at).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco", day: "2-digit", month: "2-digit" })} (${formatInterval(c.interval_days)})`}
                            </span>
                          </div>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <Button size="icon" variant="ghost" aria-label="Editar cartão" onClick={() => { setEditing(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" aria-label="Excluir cartão" onClick={() => void remove(c)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
