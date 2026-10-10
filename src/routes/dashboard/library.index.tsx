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
  SearchX,
} from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { compareMaterialRevision } from "@/lib/legalChronology";
import { materialLawSlug } from "@/lib/legalLibrary";
import { librarySearchText, matchesLibrarySearch, matchingLibraryLaws } from "@/lib/librarySearch";
import { LibrarySearchMatch } from "@/components/library/LibrarySearchMatch";
import { LibraryNavigation } from "@/components/library/LibraryNavigation";
import { libraryArea, libraryDiscipline, libraryDisciplines, libraryTone, type LibraryArea } from "@/lib/libraryOrganization";
import { LegalPathCatalog } from "@/components/library/LegalPathCatalog";
import {
  readSlugs,
  useStudyMaterialList,
  useLibrarySearchContent,
  type StudyMaterialSummary,
} from "@/lib/studyMaterials";

export const Route = createFileRoute("/dashboard/library/")({
  component: LibraryIndex,
  head: () => ({ meta: [{ title: "Biblioteca de estudo | Norte Concurso" }] }),
});

function LibraryIndex() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const signedIn = !!user && user.id !== "demo-user";
  const { data, isPending, isError, refetch } = useStudyMaterialList(signedIn);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<LibraryArea>("all");
  const [discipline, setDiscipline] = useState<string>("all");
  const [contest, setContest] = useState<string>("all");
  const [topic, setTopic] = useState("all");
  const lawMatches = useMemo(()=>matchingLibraryLaws(query),[query]);
  const content = useLibrarySearchContent(signedIn && query.trim().length >= 2 && !lawMatches.length, user?.id);
  const [read, setRead] = useState<Set<string>>(new Set());

  useEffect(() => setRead(readSlugs()), []);

  const items = useMemo(() => data ?? [], [data]);
  const areaItems = useMemo(() => items.filter(item => area === "all" || libraryArea(item) === area), [items, area]);
  const disciplines = useMemo(() => libraryDisciplines(areaItems), [areaItems]);
  const topics = useMemo(() => Array.from(new Set(areaItems.filter(item=>discipline==="all"||libraryDiscipline(item)===discipline).map(item=>item.topic_label))).sort((a,b)=>a.localeCompare(b,"pt-BR")),[areaItems,discipline]);
  const searchIndex = useMemo(()=>{
    const byId=new Map(content.data?.map(row=>[row.id,row]));
    return new Map(items.map(item=>[item.id,librarySearchText(item,byId.get(item.id))]));
  },[items,content.data]);
  const contests = useMemo(
    () =>
      Array.from(
        new Set(items.map((item) => item.contest_name).filter((n): n is string => !!n)),
      ).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [items],
  );

  const visible = useMemo(() => {
    return items.filter(
      (item) =>
        (area === "all" || libraryArea(item) === area) &&
        (discipline === "all" || libraryDiscipline(item) === discipline) &&
        (contest === "all" || item.contest_name === contest) &&
        (topic === "all" || item.topic_label === topic) &&
        (lawMatches.length ? lawMatches.includes(materialLawSlug(item)??"") : matchesLibrarySearch(searchIndex.get(item.id)??"",query)),
    );
  }, [items, query, area, discipline, contest, topic, searchIndex, lawMatches]);

  const visibleGroups = useMemo(() => libraryDisciplines(visible.filter(item => !materialLawSlug(item))).map(([name, list]) => [name, [...list].sort(compareMaterialRevision)] as [string, StudyMaterialSummary[]]).sort((a, b) => compareMaterialRevision(a[1][0]!, b[1][0]!)), [visible]);
  const searching = query.trim() !== "" || contest !== "all" || topic !== "all";
  const resetFilters = () => {setQuery("");setArea("all");setDiscipline("all");setContest("all");setTopic("all");};
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
        description="Seu estudo organizado por área: encontre a disciplina, compreenda com exemplos e pratique. Leis e materiais atualizados, com o caminho de revisão sempre à mão."
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
          <HeroStat icon={Library} label="Matérias" value={isPending ? "—" : libraryDisciplines(items).length} />
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
          <LibraryNavigation items={items} area={area}
            onArea={value => {setArea(value);setDiscipline("all");setTopic("all");}}
            query={query} onQuery={setQuery}
            discipline={discipline} onDiscipline={value => {setDiscipline(value);setTopic("all");}}
            disciplines={disciplines} topic={topic} onTopic={setTopic} topics={topics}
            contest={contest} onContest={setContest} contests={contests}
            count={visible.length} searchingContent={!lawMatches.length && query.trim().length >= 2 && content.isPending}
            onReset={resetFilters}/>
          {content.isError && query.trim().length >= 2 && <p role="alert" className="rounded-xl border p-4 text-sm">A busca nos textos não carregou; títulos e assuntos continuam disponíveis. <button className="cursor-pointer underline" onClick={() => void content.refetch()}>Tentar novamente</button></p>}

          <LegalPathCatalog userId={user!.id} materials={visible} searching={searching || discipline !== "all"} query={query} />

          {visible.length === 0 ? (
            <Empty
              icon={SearchX}
              title={!lawMatches.length && query.trim().length >= 2 && content.isPending ? "Pesquisando o conteúdo…" : "Nada encontrado"}
              text={!lawMatches.length && query.trim().length >= 2 && content.isPending ? "Aguarde a busca nos textos dos guias publicados." : "Nenhum material combina com essa busca. Tente outro termo ou limpe o filtro."}
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setArea("all");
                    setDiscipline("all");
                    setContest("all");
                    setTopic("all");
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
                query={query}
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

function DisciplineSection({
  name,
  list,
  read,
  defaultOpen,
  query,
}: {
  name: string;
  list: StudyMaterialSummary[];
  read: Set<string>;
  defaultOpen: boolean;
  query: string;
}) {
  const ordered = useMemo(() => [...list].sort(compareMaterialRevision), [list]);
  const position = new Map(ordered.map((item, index) => [item.slug, index + 1]));
  const groups = useMemo(() => [{order: null as number | null, items: ordered}], [ordered]);
  const byEdital = groups.filter((group) => group.order !== null).length > 1;
  const done = ordered.filter((item) => read.has(item.slug)).length;
  const next = ordered.find((item) => !read.has(item.slug));
  const percent = ordered.length ? Math.round((done / ordered.length) * 100) : 0;

  return (
    <details open={defaultOpen} className={`group library-subject library-tone-${libraryTone(name)}`}>
      <summary className="library-subject__heading">
        <div className="min-w-0 flex-1">
          <h2 className="library-discipline-title">{name}</h2>
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
                  query={query}
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
  query,
}: {
  item: StudyMaterialSummary;
  number: number;
  isRead: boolean;
  query: string;
}) {
  return (
    <li>
      <Link
        to="/dashboard/library/$slug"
        params={{ slug: item.slug }}
        className="group/row library-material-row"
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
          <span className="library-material-topic">
            <LibrarySearchMatch text={item.topic_label} query={query}/>
          </span>
          <strong className="block text-sm leading-snug"><LibrarySearchMatch text={item.title} query={query}/></strong>
          {item.updated_at && <span className="mt-1 block text-xs text-muted-foreground">Material atualizado em {new Date(item.updated_at).toLocaleDateString("pt-BR", {timeZone:"America/Rio_Branco"})}</span>}
          {item.summary && (
            <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
              <LibrarySearchMatch text={item.summary} query={query}/>
            </span>
          )}
        </span>
        <ArrowRight className="library-material-arrow mt-1 h-4 w-4 shrink-0 transition group-hover/row:translate-x-0.5" />
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
