import "@/styles/exam-performance-workspaces.css";
import "@/styles/ranking-professional-refinement.css";
import "@/styles/ranking-arena.css";
import "@/styles/ranking-arena-v2.css";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame,
  Loader2,
  Target,
  Medal,
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  LocateFixed,
  TrendingUp,
  Users,
  RefreshCw,
  Trophy,
  CheckCircle2,
  Layers,
  PenLine,
  Scale,
  ArrowRight,
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
import { TrophyEmblem } from "@/components/dashboard/RankEmblems";
import { LevelEmblem, MedalEmblem } from "@/components/dashboard/RankEmblems";
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
  type RankingPeriod,
  hasScore,
  levelProgress,
  RANKING_LEVELS,
} from "@/lib/rankingPage";

export const Route = createFileRoute("/dashboard/ranking")({
  validateSearch: rankingSearch,
  component: RankingPage,
});

const TABS = [
  [
    "general",
    "Geral",
    "Pontos de questões, simulados, flashcards e redação. Horas de estudo são uma métrica de dedicação.",
  ],
  ["questions", "Questões", "Pontos das questões do Treinador, conferidos com o gabarito oficial."],
  ["simulators", "Simulados", "Pontos dos simulados concluídos, com bônus de precisão."],
] as const;

const PERIODS = [
  ["all", "Todo o período"],
  ["month", "Este mês"],
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

/** 1º ouro, 2º prata, 3º bronze; depois, só o número. Sem pontuação: sem posição. */
function PositionBadge({ pos, scored }: { pos: number; scored: boolean }) {
  if (!scored)
    return (
      <span className="rank-badge rank-badge--none" aria-label="Sem posição: ainda sem pontuação">
        —
      </span>
    );
  const tier = pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : null;
  if (!tier) return <span className="rank-badge">{pos}</span>;
  return (
    <span className={cn("rank-badge", `rank-badge--${tier}`)} aria-label={`${pos}º lugar`}>
      <MedalEmblem tier={tier} label={pos} size={44} />
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
      <DialogContent className="ranking-profile max-h-[92dvh] max-w-md grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden p-0">
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
                      {p.general_points > 0 ? (
                        <>
                          <Stars n={p.stars} />
                          <span>Nível {p.level_name}</span>
                        </>
                      ) : (
                        <span className="rank-chip rank-chip--none">Sem pontuação ainda</span>
                      )}
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
            <div className="min-h-0 space-y-4 overflow-y-auto overscroll-contain p-4">
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
              <dl className="grid grid-cols-2 gap-2">
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
                <h3 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  De onde vêm os pontos
                </h3>
                <dl className="grid grid-cols-2 divide-x rounded-xl border text-center sm:grid-cols-4">
                  {(
                    [
                      ["Questões", p.question_points],
                      ["Simulados", p.simulator_points],
                      ["Flashcards", p.flashcard_points],
                      ["Redação", p.essay_points],
                    ] as const
                  ).map(([label, points]) => (
                    <div key={label} className="min-w-0 px-1 py-2">
                      <dt className="truncate text-[10px] text-muted-foreground">{label}</dt>
                      <dd className="text-base font-black tabular-nums">{points}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                  Pontos não são a quantidade de questões: contam só a primeira resposta de cada uma
                  (acerto soma, erro desconta) e dependem do aproveitamento do dia. Constância (
                  {p.consistency_points} pts) e horas de estudo são métricas de dedicação e não
                  entram nesse total.
                </p>
              </section>
              <section aria-label="Medalhas">
                <h3 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Medal className="h-3.5 w-3.5" aria-hidden="true" /> Medalhas ({p.medals.length})
                </h3>
                {p.medals.length ? (
                  <ul className="flex max-h-24 flex-wrap gap-1.5 overflow-y-auto pr-1">
                    {p.medals.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border bg-muted/60 px-2 py-0.5 text-[11px] font-semibold"
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
    <div className="rounded-xl border bg-muted/30 px-3 py-2">
      <dt className="truncate text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-lg font-black leading-tight tabular-nums">{value}</dd>
      <p className="truncate text-[11px] text-muted-foreground">{note}</p>
    </div>
  );
}

function RankingPage() {
  const { user, isLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const kind = search.section;
  const period = search.period;
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
        _period: period,
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
  }, [kind, period, real, isLoading, user?.id, search.page, search.size, search.q, reload]);

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

  const lv = me && hasScore(me) ? levelProgress(me.points) : null;
  const leaderPoints = Math.max(1, ...(rows ?? []).filter(hasScore).map((r) => r.points));

  return (
    <div className="ranking-workspace rka">
      <header className="rka-hero" aria-labelledby="ranking-page-title">
        <img className="rka-hero__bg" src="/media/hero/careers-team.webp" alt="" aria-hidden="true" decoding="async" />
        <div className="rka-hero__copy">
          <span className="rka-hero__trophy" aria-hidden="true">
            <TrophyEmblem size={64} />
          </span>
          <p className="rka-kicker">Arena Norte · Desempenho</p>
          <h1 id="ranking-page-title">
            Ranking <span>{tab[1].toLowerCase()}</span>
          </h1>
          <p className="rka-hero__desc">Cada questão certa te aproxima do topo. Suba de nível e acompanhe sua evolução.</p>
          {pageData && !pageData.partial && (
            <p className="rka-chip">
              <Users aria-hidden="true" /> {pageData.participants.toLocaleString("pt-BR")} candidatos na disputa
            </p>
          )}
        </div>

        {real && pageData && !loadError && (
          <section className="rka-me" role="status" aria-label="Sua posição">
            <p className="rka-me__label">Sua posição</p>
            {me && hasScore(me) && lv ? (
              <>
                <div className="rka-me__main">
                  <div
                    className="rka-ring"
                    style={{ "--p": lv.percent } as React.CSSProperties}
                    role="img"
                    aria-label={`Progresso no nível ${lv.name}: ${lv.percent}%`}
                  >
                    <LevelEmblem stars={lv.stars} size={40} />
                  </div>
                  <div>
                    <p className="rka-me__pos">
                      {me.rank_position ? `${me.rank_position}º` : "—"}
                      <small>{me.points.toLocaleString("pt-BR")} pts</small>
                    </p>
                    <p className="rka-me__meta">
                      <Stars n={lv.stars} /> {lv.name} · {me.questions} questões · {me.accuracy}%
                    </p>
                  </div>
                </div>
                <p className="rka-me__next">
                  {lv.next
                    ? `Faltam ${lv.missing.toLocaleString("pt-BR")} pts para ${lv.next.name}`
                    : "Nível máximo alcançado"}
                </p>
                <div className="rka-me__actions">
                  {me.rank_position && !pageData.partial && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setQuery("");
                        setLocating(true);
                        void navigate({
                          search: { ...search, q: "", page: rankingPositionPage(me.rank_position!, search.size) },
                        });
                      }}
                      className="rka-btn rka-btn--gold"
                    >
                      <LocateFixed aria-hidden="true" /> Minha posição
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => setViewing(user.id)} className="rka-btn">
                    Meu desempenho
                  </Button>
                </div>
              </>
            ) : me ? (
              <>
                <p className="rka-me__pos rka-me__pos--none">Sem pontuação</p>
                <p className="rka-me__meta">Responda questões no Treinador para entrar na classificação.</p>
                <Link to="/dashboard/question-trainer" className="rka-btn rka-btn--gold rka-btn--link">
                  <Target aria-hidden="true" /> Começar a pontuar
                </Link>
              </>
            ) : (
              <p className="rka-me__meta">
                {pageData.partial ? "Indisponível agora" : user.role === "admin" ? "Admins não participam" : "Ainda sem posição"}
              </p>
            )}
          </section>
        )}
      </header>

      <div className="rka-toolbar">
        <div className="rka-seg" role="group" aria-label="Classificação">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={kind === id}
              onClick={() => {
                setQuery("");
                void navigate({ search: { ...search, section: id, page: 1, q: "" } });
              }}
            >
              {id === "general" ? <Trophy aria-hidden="true" /> : id === "questions" ? <CheckCircle2 aria-hidden="true" /> : <Layers aria-hidden="true" />}
              {label}
            </button>
          ))}
        </div>
        <div className="rka-seg" role="group" aria-label="Período">
          {PERIODS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={period === id}
              onClick={() => {
                setQuery("");
                void navigate({ search: { ...search, period: id as RankingPeriod, page: 1, q: "" } });
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {real && (
          <div className="rka-tools">
            <label className="rka-search" htmlFor="ranking-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Buscar pelo nome exibido</span>
              <Input
                id="ranking-search"
                type="search"
                maxLength={100}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar candidato"
              />
            </label>
            <label className="rka-size">
              <span className="sr-only">Por página</span>
              <select
                id="ranking-size"
                value={search.size}
                onChange={(event) => {
                  void navigate({ search: { ...search, size: Number(event.target.value), page: 1 } });
                }}
              >
                {[20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size} por página
                  </option>
                ))}
              </select>
            </label>
            <Button variant="outline" onClick={() => setReload((n) => n + 1)} aria-label="Atualizar ranking" className="rka-icon-btn">
              <RefreshCw aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      <div className="rka-body">
        <section className="rka-board" aria-labelledby="rka-board-title">
          <header className="rka-board__head">
            <h2 id="rka-board-title">{tab[1]}</h2>
            <p>
              {tab[2]} {period === "month" && "Mostrando só os pontos deste mês."}
            </p>
          </header>
          {real && pageData?.partial && (
            <p role="status" className="rka-notice">
              A lista completa está temporariamente indisponível. Exibindo uma lista parcial; nem todos os candidatos aparecem aqui.
            </p>
          )}
          {!real ? (
            <p className="rka-empty">Entre na sua conta para ver o ranking.</p>
          ) : loadError ? (
            <div role="alert" className="rka-empty">
              <p>Não foi possível carregar o ranking. Tente novamente.</p>
              <button type="button" className="rka-link" onClick={() => setReload((n) => n + 1)}>
                Recarregar ranking
              </button>
            </div>
          ) : !rows ? (
            <div className="rka-skeleton" aria-label="Carregando">
              {[0, 1, 2, 3, 4].map((n) => (
                <span key={n} />
              ))}
              <Loader2 className="sr-only" aria-hidden="true" />
            </div>
          ) : rows.length ? (
            (() => {
              // Pódio só na primeira página, sem busca e com os três primeiros pontuados.
              const podium =
                pageData!.page === 1 && !search.q
                  ? rows.filter((r) => hasScore(r) && Number(r.rank_position) <= 3).slice(0, 3)
                  : [];
              const showPodium = podium.length === 3;
              const listRows = showPodium ? rows.filter((r) => !podium.includes(r)) : rows;
              const firstUnranked = listRows.findIndex((r) => !hasScore(r));
              return (
                <>
                  {showPodium && (
                    <ol className="rka-podium" aria-label="Pódio">
                      {podium.map((r) => {
                        const pos = Number(r.rank_position);
                        return (
                          <li key={r.user_id} data-place={pos}>
                            <button
                              type="button"
                              onClick={() => setViewing(r.user_id)}
                              aria-label={`${pos}º lugar: ${r.display_name}, ${r.points} pontos. Ver perfil`}
                              className="rka-podium__card"
                            >
                              <span className="rka-podium__glow" aria-hidden="true" />
                              <span className="rka-podium__medal">
                                <MedalEmblem
                                  tier={pos === 1 ? "gold" : pos === 2 ? "silver" : "bronze"}
                                  label={pos}
                                  size={pos === 1 ? 76 : 60}
                                />
                              </span>
                              <span className="rka-podium__name">
                                {r.display_name}
                                {r.is_me && " (você)"}
                              </span>
                              <Stars n={r.stars} />
                              <span className="rka-podium__points">
                                {r.points.toLocaleString("pt-BR")} <small>pts</small>
                              </span>
                              <span className="rka-podium__stats">
                                {r.questions} questões · {r.accuracy}%
                              </span>
                              <span className="rka-podium__step" aria-hidden="true">
                                {pos}º
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  )}
                  <ol className="rka-list" aria-label="Classificação dos candidatos">
                    {listRows.map((r, index) => {
                      const pos = Number(r.rank_position);
                      const scored = hasScore(r);
                      const initial = (r.display_name ?? "?").trim().charAt(0).toUpperCase() || "?";
                      return (
                        <React.Fragment key={r.user_id}>
                          {index === firstUnranked && (
                            <li className="rka-divider" aria-label="Candidatos ainda sem pontuação">
                              Ainda sem pontuação · entram na classificação na primeira resposta pontuada
                            </li>
                          )}
                          <li style={{ "--i": Math.min(index, 12) } as React.CSSProperties}>
                            <button
                              id={`ranking-${r.user_id}`}
                              type="button"
                              onClick={() => setViewing(r.user_id)}
                              aria-label={`Ver perfil de ${r.display_name}`}
                              data-podium={scored && pos <= 3 ? pos : undefined}
                              data-unranked={scored ? undefined : "true"}
                              className={cn("rka-row", r.is_me && "rka-row--me")}
                            >
                              <PositionBadge pos={pos} scored={scored} />
                              <span className="rka-avatar" aria-hidden="true" data-hue={initial.charCodeAt(0) % 6}>
                                {initial}
                              </span>
                              <span className="rka-row__who">
                                <span className="rka-row__name">
                                  {r.display_name}
                                  {r.is_me && <em>você</em>}
                                </span>
                                <span className="rka-row__meta">
                                  {scored ? (
                                    <>
                                      <LevelEmblem stars={r.stars} size={18} />
                                      <span>{r.level_name}</span>
                                      <span className="rka-row__stats">
                                        {r.questions} questões · {r.accuracy}% · {r.simulators} simulados
                                      </span>
                                    </>
                                  ) : (
                                    <span>Sem pontuação</span>
                                  )}
                                </span>
                              </span>
                              <span className="rka-row__score">
                                <b>
                                  {scored ? r.points.toLocaleString("pt-BR") : "—"}
                                  <small> pts</small>
                                </b>
                                {scored && (
                                  <span className="rka-bar" aria-hidden="true">
                                    <i style={{ width: `${Math.max(4, (r.points / leaderPoints) * 100)}%` }} />
                                  </span>
                                )}
                              </span>
                            </button>
                          </li>
                        </React.Fragment>
                      );
                    })}
                  </ol>
                </>
              );
            })()
          ) : (
            <p className="rka-empty">
              {search.q ? "Nenhum candidato encontrado com esse nome." : "Ainda não há participantes nesta seção."}
            </p>
          )}
          {real && pageData && !loadError && (
            <nav className="rka-pager" aria-label="Páginas do ranking">
              <p aria-live="polite">
                {pageData.total
                  ? `${(pageData.page - 1) * pageData.page_size + 1}–${Math.min(pageData.page * pageData.page_size, pageData.total)} de ${pageData.total}`
                  : "0 resultados"}
                {search.q && " encontrados"}
              </p>
              <div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pageData.page <= 1}
                  onClick={() => void navigate({ search: { ...search, page: pageData.page - 1 } })}
                  aria-label="Página anterior"
                  className="rka-icon-btn"
                >
                  <ChevronLeft aria-hidden="true" />
                </Button>
                <span>
                  Página {pageData.page} de {pageData.page_count}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pageData.page >= pageData.page_count}
                  onClick={() => void navigate({ search: { ...search, page: pageData.page + 1 } })}
                  aria-label="Próxima página"
                  className="rka-icon-btn"
                >
                  <ChevronRight aria-hidden="true" />
                </Button>
              </div>
            </nav>
          )}
        </section>

        <aside className="rka-side">
          <Link to="/dashboard/performance" className="rka-evolution">
            <img src="/media/hero/dashboard.webp" alt="" aria-hidden="true" loading="lazy" />
            <span>
              <TrendingUp aria-hidden="true" />
              <b>Sua evolução</b>
              <small>Gráficos por dia, semana, mês e ano</small>
            </span>
            <ArrowRight className="rka-evolution__go" aria-hidden="true" />
          </Link>

          <section className="rka-card" aria-labelledby="rka-points-title">
            <h3 id="rka-points-title">Como pontuar</h3>
            <ul className="rka-points">
              <li>
                <span data-tone="green"><CheckCircle2 aria-hidden="true" /></span>
                <div>
                  <b>Questões</b>
                  <small>Certo sem ajuda +3, com ajuda +1, errado −2. Vale por inteiro com 70%+ no dia; até 100 por dia.</small>
                </div>
              </li>
              <li>
                <span data-tone="blue"><Layers aria-hidden="true" /></span>
                <div>
                  <b>Simulados</b>
                  <small>Mesma conta, 10s+ por questão. Bônus +25/+50/+100 com 70/80/90% a partir de 20 inéditas.</small>
                </div>
              </li>
              <li>
                <span data-tone="violet"><PenLine aria-hidden="true" /></span>
                <div>
                  <b>Flashcards e redação</b>
                  <small>+1 por cartão (até 50/dia). +20 por redação de 150+ palavras (1/dia).</small>
                </div>
              </li>
              <li>
                <span data-tone="gold"><Scale aria-hidden="true" /></span>
                <div>
                  <b>Desempate</b>
                  <small>Pontos, % de acertos, acertos e questões válidas. Sem bônus por assinatura; administradores ficam fora.</small>
                </div>
              </li>
            </ul>
            <p className="rka-card__note">Horas de estudo são métrica de dedicação, sem pontos. Sem pontuação, o candidato aparece no fim até a primeira resposta pontuada.</p>
          </section>

          <section className="rka-card" aria-labelledby="rka-levels-title">
            <h3 id="rka-levels-title">Níveis</h3>
            <ol className="rka-levels" aria-label="Níveis e estrelas">
              {RANKING_LEVELS.map((level) => (
                <li key={level.name} data-current={lv?.name === level.name || undefined}>
                  <LevelEmblem stars={level.stars} size={26} />
                  <span>
                    <b>{level.name}</b>
                    <Stars n={level.stars} />
                  </span>
                  <small>{level.min.toLocaleString("pt-BR")}+ pts</small>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
      <ProfileDialog userId={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
