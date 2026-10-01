import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Clock3, Library, MapPin, Search, SearchX } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { groupByDiscipline, useStudyMaterialList } from "@/lib/studyMaterials";

export const Route = createFileRoute("/dashboard/library/")({
  component: LibraryIndex,
  head: () => ({ meta: [{ title: "Biblioteca de estudo | Norte Concurso" }] }),
});

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

function LibraryIndex() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const signedIn = !!user && user.id !== "demo-user";
  const { data, isPending, isError, refetch } = useStudyMaterialList(signedIn);
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState<string>("all");

  const items = data ?? [];
  const disciplines = useMemo(() => groupByDiscipline(items), [items]);

  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    return items.filter(
      (item) =>
        (discipline === "all" || item.discipline === discipline) &&
        (!needle ||
          normalize(`${item.title} ${item.topic_label} ${item.summary ?? ""}`).includes(needle)),
    );
  }, [items, query, discipline]);

  const visibleGroups = useMemo(() => groupByDiscipline(visible), [visible]);

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
        description="Resumos por matéria, ligados ao edital e revisados antes de chegar até você. Leia, fixe e depois treine com questões."
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
        </div>
      </PageHero>

      {isPending && signedIn ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <Skeleton key={n} className="h-40 rounded-2xl" />
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
          <div className="library-toolbar">
            <label className="library-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Buscar na biblioteca</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por assunto, termo ou matéria"
              />
            </label>
            <div className="library-chips" role="group" aria-label="Filtrar por matéria">
              <button
                type="button"
                aria-pressed={discipline === "all"}
                onClick={() => setDiscipline("all")}
              >
                Todas <b>{items.length}</b>
              </button>
              {disciplines.map(([name, list]) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={discipline === name}
                  onClick={() => setDiscipline(name)}
                >
                  {name} <b>{list.length}</b>
                </button>
              ))}
            </div>
          </div>

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
                  }}
                >
                  Limpar filtros
                </Button>
              }
            />
          ) : (
            visibleGroups.map(([name, list]) => (
              <section key={name} aria-labelledby={`disc-${name}`} className="space-y-3">
                <div className="section-title">
                  <div>
                    <h2 id={`disc-${name}`}>{name}</h2>
                    <p>
                      {list.length} {list.length === 1 ? "material" : "materiais"}
                    </p>
                  </div>
                </div>
                <div className="library-grid">
                  {list.map((item) => (
                    <Link
                      key={item.id}
                      to="/dashboard/library/$slug"
                      params={{ slug: item.slug }}
                      className="library-card"
                    >
                      <span className="library-card__topic">{item.topic_label}</span>
                      <strong>{item.title}</strong>
                      {item.summary && <p>{item.summary}</p>}
                      <span className={cn("library-card__foot")}>
                        {item.law_version_checked_at && (
                          <span>
                            <Clock3 /> Conferido em{" "}
                            {new Date(item.law_version_checked_at).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                        <span className="library-card__go">
                          Ler <ArrowRight />
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </>
      )}
    </div>
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
