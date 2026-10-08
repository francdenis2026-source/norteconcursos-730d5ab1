import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookMarked,
  Check,
  ChevronDown,
  Library,
  MapPin,
  PlayCircle,
  Search,
  SearchX,
} from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { materialLawSlug } from "@/lib/legalLibrary";
import { LegalPathCatalog } from "@/components/library/LegalPathCatalog";
import {
  groupByDiscipline,
  groupByEditalTopic,
  readSlugs,
  useStudyMaterialList,
  type StudyMaterialSummary,
} from "@/lib/studyMaterials";

export const Route = createFileRoute("/dashboard/library/")({
  component: LibraryIndex,
  head: () => ({ meta: [{ title: "Biblioteca de estudo | Norte Concurso" }] }),
});

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function LibraryIndex() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const signedIn = !!user && user.id !== "demo-user";
  const { data, isPending, isError, refetch } = useStudyMaterialList(signedIn);
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState<string>("all");
  const [contest, setContest] = useState<string>("all");
  const [read, setRead] = useState<Set<string>>(new Set());

  useEffect(() => setRead(readSlugs()), []);

  const items = useMemo(() => data ?? [], [data]);
  const disciplines = useMemo(() => groupByDiscipline(items), [items]);
  const contests = useMemo(
    () =>
      Array.from(
        new Set(items.map((item) => item.contest_name).filter((n): n is string => !!n)),
      ).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [items],
  );

  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    return items.filter(
      (item) =>
        (discipline === "all" || item.discipline === discipline) &&
        (contest === "all" || item.contest_name === contest) &&
        (!needle ||
          normalize(`${item.title} ${item.topic_label} ${item.summary ?? ""}`).includes(needle)),
    );
  }, [items, query, discipline, contest]);

  const visibleGroups = useMemo(() => groupByDiscipline(visible.filter(item => !materialLawSlug(item))), [visible]);
  const searching = query.trim() !== "" || contest !== "all";
  const readCount = items.filter((item) => read.has(item.slug)).length;

  if (!authLoading && !signedIn) {
    return (
      <LockedState
        image="study-desk"
        title={
          <>
            Biblioteca de <em>estudo</em>
          </>
        }
        description="Entre na sua conta para ler os resumos por matéria, ligados ao edital do seu concurso."
      />
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <PageHero
        image="study-desk"
        size="lg"
        kicker="Treinamento"
        icon={Library}
        title={
          <>
            Biblioteca de <em>estudo</em>
          </>
        }
        description="Resumos por matéria, na ordem do edital e revisados antes de chegar até você. Leia, fixe e depois treine com questões."
        actions={
          <Button asChild className="hero-btn-ghost gap-2" variant="outline">
            <Link to="/dashboard/edital">
              <MapPin className="h-4 w-4" /> Edital eletrônico
            </Link>
          </Button>
        }
      >
        <div className="page-hero__stats max-w-xl">
          <HeroStat icon={BookMarked} label="Materiais" value={isPending ? "—" : items.length} />
          <HeroStat icon={Library} label="Matérias" value={isPending ? "—" : disciplines.length} />
          <HeroStat icon={Check} label="Já lidos" value={isPending ? "—" : readCount} />
        </div>
      </PageHero>


      {isPending && signedIn ? (
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((n) => (
            <Skeleton key={n} className="h-20 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <Empty
          title="Não foi possível carregar a biblioteca"
          text="Tente novamente em instantes."
          action={
            <Button variant="outline" onClick={() => refetch()}>
              Tentar novamente
            </Button>
          }
        />
      ) : items.length === 0 ? (
        <Empty
          title="A biblioteca está sendo montada"
          text="Os primeiros materiais estão em revisão e aparecem aqui assim que forem publicados. Enquanto isso, estude pelo edital eletrônico."
          action={
            <Button asChild>
              <Link to="/dashboard/edital">Abrir o edital eletrônico</Link>
            </Button>
          }
        />
      ) : (
        <>
          <div className="space-y-3 rounded-2xl border bg-background p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <span className="sr-only">Buscar na biblioteca</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por assunto, termo ou matéria"
                  className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
              </label>
              {contests.length > 1 && (
                <select
                  value={contest}
                  onChange={(event) => setContest(event.target.value)}
                  aria-label="Filtrar por concurso"
                  className="rounded-xl border bg-background px-3 py-2.5 text-sm sm:w-64"
                >
                  <option value="all">Todos os concursos</option>
                  {contests.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por matéria">
              <Chip active={discipline === "all"} onClick={() => setDiscipline("all")}>
                Todas <b>{items.length}</b>
              </Chip>
              {disciplines.map(([name, list]) => (
                <Chip key={name} active={discipline === name} onClick={() => setDiscipline(name)}>
                  {name} <b>{list.length}</b>
                </Chip>
              ))}
            </div>
          </div>

          <LegalPathCatalog userId={user!.id} materials={visible} searching={query.trim() !== "" || discipline !== "all" || contest !== "all"} />

          {visible.length === 0 ? (
            <Empty
              icon={SearchX}
              title="Nada encontrado"
              text="Nenhum material combina com essa busca. Tente outro termo ou limpe o filtro."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setDiscipline("all");
                    setContest("all");
                  }}
                >
                  Limpar filtros
                </Button>
              }
            />
          ) : (
            visibleGroups.map(([name, list], index) => (
              <DisciplineSection
                key={name}
                name={name}
                list={list}
                read={read}
                defaultOpen={
                  discipline !== "all" || searching || index === 0 || visible.length <= 12
                }
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition [&_b]:ml-1 [&_b]:font-black",
        active
          ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40"
          : "border-slate-200 text-muted-foreground hover:border-emerald-300",
      )}
    >
      {children}
    </button>
  );
}

function DisciplineSection({
  name,
  list,
  read,
  defaultOpen,
}: {
  name: string;
  list: StudyMaterialSummary[];
  read: Set<string>;
  defaultOpen: boolean;
}) {
  const ordered = useMemo(() => [...list].sort((a, b) => a.sort_order - b.sort_order), [list]);
  const position = new Map(ordered.map((item, index) => [item.slug, index + 1]));
  const groups = useMemo(() => groupByEditalTopic(ordered), [ordered]);
  const byEdital = groups.filter((group) => group.order !== null).length > 1;
  const done = ordered.filter((item) => read.has(item.slug)).length;
  const next = ordered.find((item) => !read.has(item.slug));
  const percent = ordered.length ? Math.round((done / ordered.length) * 100) : 0;

  return (
    <details open={defaultOpen} className="group rounded-2xl border bg-background shadow-sm">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-black text-primary">{name}</h2>
          <p className="text-xs text-muted-foreground">
            {ordered.length} {ordered.length === 1 ? "material" : "materiais"} · {done} lido
            {done === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex w-full items-center gap-3 sm:w-64">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
          </div>
          <span className="w-9 text-right text-xs font-bold text-muted-foreground">{percent}%</span>
        </div>
        <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-5 border-t px-5 pb-5 pt-4">
        {next && (
          <Link
            to="/dashboard/library/$slug"
            params={{ slug: next.slug }}
            className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-200"
          >
            <PlayCircle className="h-5 w-5 shrink-0" />
            <span className="min-w-0">
              {done ? "Continuar de onde parou" : "Começar por aqui"}:{" "}
              <span className="font-semibold">{next.title}</span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0" />
          </Link>
        )}
        {groups.map((group) => (
          <div key={group.order ?? "outros"} className="space-y-2">
            {byEdital && (
              <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-muted-foreground">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {group.order === null ? "Complementar" : `Edital · tópico ${group.order}`}
                </span>
                <span className="font-semibold normal-case tracking-normal">
                  {group.items.length} {group.items.length === 1 ? "material" : "materiais"}
                </span>
              </h3>
            )}
            <ol className="grid gap-2 lg:grid-cols-2">
              {group.items.map((item) => (
                <MaterialRow
                  key={item.id}
                  item={item}
                  number={position.get(item.slug) ?? 0}
                  isRead={read.has(item.slug)}
                />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </details>
  );
}

function MaterialRow({
  item,
  number,
  isRead,
}: {
  item: StudyMaterialSummary;
  number: number;
  isRead: boolean;
}) {
  return (
    <li>
      <Link
        to="/dashboard/library/$slug"
        params={{ slug: item.slug }}
        className="group/row flex h-full items-start gap-3 rounded-xl border bg-background p-3.5 transition hover:border-emerald-300 hover:shadow-sm"
      >
        <span
          className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black",
            isRead ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800",
          )}
          aria-label={isRead ? "Já lido" : `Passo ${number}`}
        >
          {isRead ? <Check className="h-4 w-4" /> : number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-emerald-700">
            {item.topic_label}
          </span>
          <strong className="block text-sm leading-snug">{item.title}</strong>
          {item.summary && (
            <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
              {item.summary}
            </span>
          )}
        </span>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover/row:translate-x-0.5 group-hover/row:text-emerald-600" />
      </Link>
    </li>
  );
}

function Empty({
  icon: Icon = Library,
  title,
  text,
  action,
}: {
  icon?: typeof Library;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="surface-card library-empty">
      <span className="metric-tile__icon h-12 w-12 rounded-2xl">
        <Icon />
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{text}</p>
      </div>
      {action}
    </div>
  );
}
