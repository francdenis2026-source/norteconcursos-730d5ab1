import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Flame,
  Gem,
  Loader2,
  Medal,
  Star,
  Trophy,
  Search,
  ChevronLeft,
  ChevronRight,
  LocateFixed,
  Users,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { PageHero } from "@/components/dashboard/PageHero";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  rankingSearch,
  rankingPositionPage,
  partialRankingPage,
  readRankingPage,
  type RankingEntry as Row,
  type RankingPageData,
} from "@/lib/rankingPage";

export const Route = createFileRoute("/dashboard/ranking")({
  validateSearch: rankingSearch,
  component: RankingPage,
});

const TABS = [
  ["questions", "Questões", "Pontos das questões do Treinador, conferidos com o gabarito oficial."],
  ["simulators", "Simulados", "Pontos dos simulados concluídos, com bônus de precisão."],
  [
    "general",
    "Geral",
    "Pontos de questões, simulados, flashcards e redação. Horas de estudo são uma métrica de dedicação.",
  ],
] as const;

interface Profile {
  display_name: string;
  stars: number;
  level_name: string;
  general_points: number;
  next_level_at: number | null;
  general_position: number;
  participants: number;
  question_points: number;
  simulator_points: number;
  study_points: number;
  flashcard_points: number;
  essay_points: number;
  consistency_points: number;
  study_hours: number;
  questions: number;
  accuracy: number;
  simulators: number;
  best_accuracy: number;
  streak: number;
  medals: string[];
}

/** 1º = diamante, 2º = ouro, 3º = prata, 4º–10º = bronze; depois, só o número. */
function PositionBadge({ pos }: { pos: number }) {
  const tier =
    pos === 1
      ? { Icon: Gem, cls: "bg-sky-100 text-sky-600 ring-sky-300" }
      : pos === 2
        ? { Icon: Medal, cls: "bg-yellow-100 text-yellow-600 ring-yellow-300" }
        : pos === 3
          ? { Icon: Medal, cls: "bg-slate-100 text-slate-500 ring-slate-300" }
          : pos <= 10
            ? { Icon: Award, cls: "bg-amber-100 text-amber-700 ring-amber-300" }
            : null;
  if (!tier)
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-black text-muted-foreground">
        {pos}
      </span>
    );
  return (
    <span
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full ring-2",
        tier.cls,
      )}
      title={`${pos}º lugar`}
    >
      <tier.Icon className="h-5 w-5" />
      <span className="absolute -bottom-1 -right-1 rounded-full bg-background px-1 text-[10px] font-black text-foreground ring-1 ring-border">
        {pos}
      </span>
    </span>
  );
}

const Stars = ({ n }: { n: number }) => (
  <span className="inline-flex" aria-label={`${n} de 5 estrelas`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={cn(
          "h-3 w-3",
          i <= n ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
        )}
      />
    ))}
  </span>
);

function ProfileDialog({ userId, onClose }: { userId: string | null; onClose: () => void }) {
  const [p, setP] = React.useState<Profile | null | undefined>(undefined);
  React.useEffect(() => {
    if (!userId) return;
    let alive = true;
    setP(undefined);
    void supabase
      .rpc("get_ranking_profile", { _user: userId })
      .maybeSingle()
      .then(({ data }) => {
        if (alive) setP((data as Profile | null) ?? null);
      });
    return () => {
      alive = false;
    };
  }, [userId]);
  const initial = (p?.display_name ?? "?").trim().charAt(0).toUpperCase() || "?";
  const missing = p?.next_level_at ? Math.max(0, p.next_level_at - p.general_points) : 0;
  return (
    <Dialog open={!!userId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="ranking-profile max-w-md gap-0 overflow-hidden p-0">
        {p === undefined ? (
          <div className="flex justify-center py-14">
            <Loader2
              className="h-5 w-5 animate-spin text-muted-foreground"
              aria-label="Carregando"
            />
            <DialogTitle className="sr-only">Carregando perfil</DialogTitle>
          </div>
        ) : p === null ? (
          <DialogHeader className="p-6">
            <DialogTitle>Perfil indisponível</DialogTitle>
            <DialogDescription>Não foi possível carregar este candidato.</DialogDescription>
          </DialogHeader>
        ) : (
          <>
            <header className="ranking-profile__hero">
              <img
                src="/media/hero/norte-atmosphere.webp"
                alt=""
                aria-hidden="true"
                width={1942}
                height={809}
                loading="lazy"
                decoding="async"
              />
              <div className="ranking-profile__identity">
                <span className="ranking-profile__avatar" aria-hidden="true">
                  {initial}
                </span>
                <div className="min-w-0">
                  <DialogTitle className="truncate text-lg font-bold text-white">
                    {p.display_name}
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/80">
                      <Stars n={p.stars} />
                      <span>Nível {p.level_name}</span>
                    </div>
                  </DialogDescription>
                </div>
                <div
                  className="ranking-profile__position"
                  aria-label={`${p.general_position}º lugar entre ${p.participants}`}
                >
                  <strong>{p.general_position}º</strong>
                  <small>de {p.participants}</small>
                </div>
              </div>
            </header>
            <div className="space-y-5 p-5">
              <section aria-label="Progresso de nível" className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-2xl font-black tabular-nums">
                    {p.general_points}
                    <span className="ml-1 text-xs font-semibold text-muted-foreground">pontos</span>
                  </p>
                  <p className="text-right text-xs text-muted-foreground">
                    {p.next_level_at
                      ? `faltam ${missing} pts para ${p.next_level_at} pts`
                      : "nível máximo"}
                  </p>
                </div>
                <Progress
                  value={
                    p.next_level_at
                      ? Math.min(100, (100 * p.general_points) / p.next_level_at)
                      : 100
                  }
                  className="h-2"
                />
              </section>
              <dl className="grid grid-cols-2 gap-3">
                <Tile
                  label="Questões resolvidas"
                  value={p.questions}
                  note={p.questions ? `${p.accuracy}% de acertos` : "Ainda sem respostas"}
                />
                <Tile
                  label="Simulados"
                  value={p.simulators}
                  note={
                    p.simulators
                      ? `melhor ${Math.round(Number(p.best_accuracy))}%`
                      : "Nenhum concluído"
                  }
                />
                <Tile label="Horas de estudo" value={`${p.study_hours} h`} note="dedicação total" />
                <Tile
                  label="Maior sequência"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <Flame className="h-5 w-5 text-orange-500" aria-hidden="true" />
                      {p.streak}
                    </span>
                  }
                  note={p.streak === 1 ? "dia seguido" : "dias seguidos"}
                />
              </dl>
              <section aria-label="Composição dos pontos">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  De onde vêm os pontos
                </h3>
                <dl className="divide-y rounded-xl border text-sm">
                  {(
                    [
                      ["Questões", p.question_points],
                      ["Simulados", p.simulator_points],
                      ["Flashcards", p.flashcard_points],
                      ["Redação", p.essay_points],
                      ["Constância", p.consistency_points],
                    ] as const
                  ).map(([label, points]) => (
                    <div key={label} className="flex items-center justify-between px-3 py-2">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-bold tabular-nums">{points}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section aria-label="Medalhas">
                <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Medal className="h-3.5 w-3.5" aria-hidden="true" /> Medalhas ({p.medals.length})
                </h3>
                {p.medals.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {p.medals.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border bg-muted/60 px-2.5 py-1 text-xs font-semibold"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">Ainda sem medalhas.</p>
                )}
              </section>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Tile({ label, value, note }: { label: string; value: React.ReactNode; note: string }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-black tabular-nums">{value}</dd>
      <p className="text-[11px] text-muted-foreground">{note}</p>
    </div>
  );
}

function RankingPage() {
  const { user, isLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const kind = search.section;
  const [query, setQuery] = React.useState(search.q);
  const [pageData, setPageData] = React.useState<RankingPageData | null>(null);
  const [loadError, setLoadError] = React.useState(false);
  const [reload, setReload] = React.useState(0);
  const [viewing, setViewing] = React.useState<string | null>(null);
  const [locating, setLocating] = React.useState(false);

  React.useEffect(() => {
    setQuery(search.q);
  }, [search.q]);
  React.useEffect(() => {
    if (query.trim() === search.q) return;
    const timer = window.setTimeout(() => {
      void navigate({
        search: { ...search, q: query.trim().slice(0, 100), page: 1 },
        replace: true,
      });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [query, search, navigate]);

  React.useEffect(() => {
    if (isLoading || !real) {
      setPageData(null);
      return;
    }
    let alive = true;
    setPageData(null);
    setLoadError(false);
    const load = async () => {
      const { data, error } = await supabase.rpc("get_ranking_page", {
        _kind: kind,
        _page: search.page,
        _page_size: search.size,
        _search: search.q,
      });
      if (!alive) return;
      if (error && ["PGRST202", "42883"].includes(error.code)) {
        // Old databases remain usable, with an explicit partial-list notice.
        const legacy = await supabase.rpc("get_ranking_section", { _kind: kind, _limit: 100 });
        if (!alive) return;
        if (legacy.error) throw legacy.error;
        setPageData(
          partialRankingPage((legacy.data ?? []) as Row[], search.page, search.size, search.q),
        );
      } else {
        if (error || !data) throw error ?? new Error("Ranking unavailable");
        setPageData(readRankingPage(data));
      }
    };
    void load().catch(() => {
      if (alive) setLoadError(true);
    });
    return () => {
      alive = false;
    };
  }, [kind, real, isLoading, user?.id, search.page, search.size, search.q, reload]);

  React.useEffect(() => {
    if (!locating || !pageData || !user) return;
    const row = document.getElementById(`ranking-${user.id}`);
    if (row) {
      row.scrollIntoView({
        block: "center",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      row.focus({ preventScroll: true });
      setLocating(false);
    }
  }, [pageData, locating, user]);

  const rows = pageData?.entries;
  const me = pageData?.my_entry;
  const tab = TABS.find((t) => t[0] === kind)!;

  return (
    <div className="space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Desempenho"
        icon={Trophy}
        title={
          <>
            Ranking <em>geral</em>
          </>
        }
        description="Compare seu desempenho, encontre candidatos e acompanhe sua posição. Sobrenomes ficam protegidos e administradores não participam."
      />
      <Card className="border-0 shadow-lg ring-1 ring-border/70">
        <CardHeader className="space-y-3">
          <div className="flex gap-1.5" role="group" aria-label="Seção do ranking">
            {TABS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={kind === id}
                onClick={() => {
                  setQuery("");
                  void navigate({ search: { ...search, section: id, page: 1, q: "" } });
                }}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  kind === id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <CardTitle className="text-xl">{tab[1]}</CardTitle>
          <CardDescription>{tab[2]}</CardDescription>
          <details className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <summary className="cursor-pointer font-semibold text-foreground">
              Como a pontuação funciona (e por que é justa)
            </summary>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>
                <b>Questões:</b> certo sem ajuda +3, com ajuda +1, errado -2. O acerto é conferido
                no servidor com o gabarito oficial. Só vale por inteiro com 70% ou mais de acertos
                no dia (50% ou menos não pontua), então chutar não compensa. Até 100 questões
                pontuadas por dia.
              </li>
              <li>
                <b>Cada questão conta uma vez só</b>, somando Treinador e Simulados: refazer a mesma
                questão não rende ponto. Respostas em menos de 4 segundos não contam.
              </li>
              <li>
                <b>Simulados:</b> mesma conta das questões; a tentativa precisa durar pelo menos 10
                s por questão. Bônus de precisão (+25, +50, +100 com 70%, 80%, 90%) a partir de 20
                questões inéditas.
              </li>
              <li>
                <b>Estudo:</b> as horas ficam visíveis como métrica de dedicação e não geram pontos.{" "}
                <b>Flashcards:</b> +1 por cartão revisado (até 50 por dia). <b>Redação:</b> +20 por
                texto de 150 palavras ou mais (1 por dia).
              </li>
              <li>
                Níveis na pontuação geral: Competidor 250, Avançado 750, Especialista 1.500, Elite
                3.000. Administradores ficam fora.
              </li>
            </ul>
          </details>
        </CardHeader>
        <CardContent>
          {real && pageData && !loadError && (
            <>
              <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {pageData.partial ? "Participantes carregados" : "Candidatos nesta seção"}
                  </p>
                  <p className="mt-1 text-2xl font-black tabular-nums">
                    {pageData.participants.toLocaleString("pt-BR")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {pageData.partial
                      ? "Lista parcial de candidatos disponíveis."
                      : kind === "general"
                        ? "Inclui candidatos com zero pontos."
                        : "Inclui candidatos com pontos nesta seção."}
                  </p>
                </div>
                <div className="rounded-xl border border-primary/40 bg-primary/5 p-4" role="status">
                  <p className="text-xs font-semibold text-muted-foreground">Sua posição</p>
                  {me ? (
                    <>
                      <p className="mt-1 text-xl font-black">
                        {me.rank_position
                          ? `${me.rank_position}º lugar`
                          : "Ainda sem posição nesta seção"}{" "}
                        <span className="text-sm font-semibold">· {me.points} pts</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {me.questions} questões · {me.accuracy}% de acertos
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {me.rank_position && !pageData.partial && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setQuery("");
                              setLocating(true);
                              void navigate({
                                search: {
                                  ...search,
                                  q: "",
                                  page: rankingPositionPage(me.rank_position!, search.size),
                                },
                              });
                            }}
                          >
                            <LocateFixed className="mr-1.5 h-4 w-4" />
                            Encontrar minha posição
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => setViewing(user.id)}>
                          Meu desempenho
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {pageData.partial
                          ? "Sua posição completa está temporariamente indisponível."
                          : user.role === "admin"
                            ? "Administradores não participam do ranking."
                            : "Sua posição ainda não está disponível. Atualize a lista para tentar novamente."}
                      </p>
                      {user.role !== "admin" && (
                        <Button
                          className="mt-3"
                          size="sm"
                          variant="ghost"
                          onClick={() => setViewing(user.id)}
                        >
                          Meu desempenho
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              {pageData.partial && (
                <p
                  role="status"
                  className="mb-4 rounded-lg border border-amber-400/60 bg-amber-500/10 p-3 text-sm"
                >
                  A lista completa está temporariamente indisponível. Exibindo uma lista parcial;
                  nem todos os candidatos aparecem aqui.
                </p>
              )}
            </>
          )}
          {real && (
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label htmlFor="ranking-search" className="mb-1.5 block text-sm font-semibold">
                  Buscar pelo nome exibido
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="ranking-search"
                    type="search"
                    className="pl-9"
                    maxLength={100}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Digite o nome do candidato"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="ranking-size" className="mb-1.5 block text-sm font-semibold">
                  Por página
                </label>
                <select
                  id="ranking-size"
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                  value={search.size}
                  onChange={(event) => {
                    void navigate({
                      search: { ...search, size: Number(event.target.value), page: 1 },
                    });
                  }}
                >
                  {[20, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size} candidatos
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="outline"
                onClick={() => setReload((n) => n + 1)}
                aria-label="Atualizar ranking"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          )}
          {!real ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Entre na sua conta para ver o ranking.
            </p>
          ) : loadError ? (
            <div role="alert" className="py-6 text-center text-sm">
              <p>Não foi possível carregar o ranking. Tente novamente.</p>
              <button
                type="button"
                className="mt-2 font-semibold text-primary underline"
                onClick={() => setReload((n) => n + 1)}
              >
                Recarregar ranking
              </button>
            </div>
          ) : !rows ? (
            <div className="flex justify-center py-8">
              <Loader2
                className="h-5 w-5 animate-spin text-muted-foreground"
                aria-label="Carregando"
              />
            </div>
          ) : rows.length ? (
            <ol
              className="space-y-2"
              start={(pageData!.page - 1) * pageData!.page_size + 1}
              aria-label="Classificação dos candidatos"
            >
              {rows.map((r) => (
                <li key={r.user_id}>
                  <button
                    id={`ranking-${r.user_id}`}
                    type="button"
                    onClick={() => setViewing(r.user_id)}
                    aria-label={`Ver perfil de ${r.display_name}`}
                    className={cn(
                      "grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 rounded-xl border p-3 text-left transition hover:border-primary",
                      r.is_me && "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20",
                    )}
                  >
                    <PositionBadge pos={Number(r.rank_position)} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {r.display_name}
                        {r.is_me && " (você)"}
                      </p>
                      <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        <Stars n={r.stars} /> {r.level_name}
                        <span>
                          · {r.questions} questões ({r.accuracy}%) · {r.simulators} simulados ·{" "}
                          {r.study_hours} h
                        </span>
                      </p>
                    </div>
                    <span className="text-sm font-black tabular-nums">{r.points} pts</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {search.q
                ? "Nenhum candidato encontrado com esse nome."
                : "Ainda não há participantes nesta seção."}
            </p>
          )}
          {real && pageData && !loadError && (
            <nav
              className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
              aria-label="Páginas do ranking"
            >
              <p className="text-xs text-muted-foreground" aria-live="polite">
                {pageData.total
                  ? `${(pageData.page - 1) * pageData.page_size + 1}–${Math.min(pageData.page * pageData.page_size, pageData.total)} de ${pageData.total}`
                  : "0 resultados"}
                {search.q && " encontrados"}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pageData.page <= 1}
                  onClick={() => {
                    void navigate({ search: { ...search, page: pageData.page - 1 } });
                  }}
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs tabular-nums">
                  Página {pageData.page} de {pageData.page_count}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pageData.page >= pageData.page_count}
                  onClick={() => {
                    void navigate({ search: { ...search, page: pageData.page + 1 } });
                  }}
                  aria-label="Próxima página"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          )}
        </CardContent>
      </Card>
      <ProfileDialog userId={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
