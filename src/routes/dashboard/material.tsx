import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Atom,
  BarChart3,
  BookA,
  BookMarked,
  BookOpen,
  Calculator,
  ClipboardCheck,
  Cpu,
  FlaskConical,
  GraduationCap,
  Languages,
  Library,
  MapPin,
  PenLine,
  PlayCircle,
  Scale,
  ScrollText,
  Sigma,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { hubLaws, hubSubjects, type SubjectIcon } from "@/lib/materialHub";

export const Route = createFileRoute("/dashboard/material")({
  component: MaterialHub,
  head: () => ({ meta: [{ title: "Material didático | Norte Concurso" }] }),
});

const SUBJECT_ICONS: Record<SubjectIcon, LucideIcon> = {
  portugues: PenLine,
  matematica: Calculator,
  logica: Sigma,
  informatica: Cpu,
  quimica: FlaskConical,
  fisica: Atom,
  estatistica: BarChart3,
  contabilidade: Wallet,
  ingles: Languages,
  geral: BookOpen,
};

const OTHER_RESOURCES: {
  to: string;
  search?: Record<string, string>;
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    to: "/dashboard/trilhas",
    icon: GraduationCap,
    title: "Trilhas por disciplina",
    text: "Cursos curtos, aula a aula, com teste rápido.",
  },
  {
    to: "/dashboard/media",
    icon: PlayCircle,
    title: "Videoaulas e podcasts",
    text: "Aprenda vendo ou ouvindo, no seu ritmo.",
  },
  {
    to: "/dashboard/dicionario",
    icon: BookA,
    title: "Dicionário de estudo",
    text: "Termos das leis e das matérias explicados.",
  },
  {
    to: "/dashboard/essays",
    icon: PenLine,
    title: "Redação para concursos",
    text: "Modelos e prática de escrita.",
  },
  {
    to: "/dashboard/enem",
    search: { tab: "materiais" },
    icon: BookMarked,
    title: "Materiais do ENEM",
    text: "Área dedicada ao exame.",
  },
  {
    to: "/dashboard/edital",
    icon: MapPin,
    title: "Meu edital",
    text: "Estude seguindo o que será cobrado.",
  },
];

function MaterialHub() {
  const { user, isLoading } = useAuthStatus();
  const signedIn = !!user && user.id !== "demo-user";
  const { data, isPending } = useStudyMaterialList(signedIn);
  const items = data ?? [];
  const laws = hubLaws(items);
  const subjects = hubSubjects(items);
  const lawTotal = laws.reduce((sum, entry) => sum + entry.count, 0);
  const subjectTotal = subjects.reduce((sum, entry) => sum + entry.count, 0);

  if (!isLoading && !signedIn)
    return (
      <LockedState
        image="study-desk"
        title={
          <>
            Material <em>didático</em>
          </>
        }
        description="Entre na sua conta para acessar a legislação e os materiais por disciplina."
      />
    );

  return (
    <div className="material-hub space-y-8 pb-10">
      <PageHero
        image="study-desk"
        size="lg"
        kicker="Material didático"
        icon={Library}
        title={
          <>
            Tudo para <em>estudar</em>, no lugar certo
          </>
        }
        description="A legislação (leis, súmulas e leis extravagantes) fica separada das demais disciplinas. Escolha por onde começar."
      >
        <div className="page-hero__stats max-w-xl">
          <HeroStat icon={Scale} label="Materiais de leis" value={isPending ? "—" : lawTotal} />
          <HeroStat icon={BookOpen} label="Materiais de disciplinas" value={isPending ? "—" : subjectTotal} />
        </div>
      </PageHero>

      <section aria-labelledby="hub-laws" className="space-y-3">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="hub-laws" className="text-xl font-bold">
              Legislação, leis e súmulas
            </h2>
            <p className="text-sm text-muted-foreground">
              Textos oficiais, explicações e exercícios por lei e por assunto.
            </p>
          </div>
          <Link
            to="/dashboard/library"
            search={{ collection: "laws" }}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Abrir toda a legislação →
          </Link>
        </header>
        {isPending && signedIn ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((n) => (
              <Skeleton key={n} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {laws.map((entry) => (
              <li key={entry.name}>
                <Link
                  to="/dashboard/library"
                  search={{ collection: "laws", discipline: entry.name }}
                  className="material-card"
                >
                  <span className="material-card__icon" data-tone="law">
                    <Scale aria-hidden="true" />
                  </span>
                  <span className="material-card__body">
                    <strong>{entry.name}</strong>
                    <span>
                      {entry.count} {entry.count === 1 ? "material" : "materiais"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/dashboard/library"
                search={{ collection: "laws", q: "súmula" }}
                className="material-card"
              >
                <span className="material-card__icon" data-tone="law">
                  <ScrollText aria-hidden="true" />
                </span>
                <span className="material-card__body">
                  <strong>Súmulas e jurisprudência</strong>
                  <span>Súmulas citadas nos guias de estudo</span>
                </span>
              </Link>
            </li>
          </ul>
        )}
      </section>

      <section aria-labelledby="hub-subjects" className="space-y-3">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="hub-subjects" className="text-xl font-bold">
              Disciplinas
            </h2>
            <p className="text-sm text-muted-foreground">
              Língua Portuguesa, Matemática, Raciocínio Lógico, Química, Física, Estatística,
              Contabilidade e mais.
            </p>
          </div>
          <Link
            to="/dashboard/library"
            search={{ collection: "subjects" }}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Abrir todas as disciplinas →
          </Link>
        </header>
        {isPending && signedIn ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Skeleton key={n} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((entry) => {
              const Icon = SUBJECT_ICONS[entry.icon];
              const content = (
                <>
                  <span className="material-card__icon" data-tone="subject">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="material-card__body">
                    <strong>{entry.name}</strong>
                    <span>
                      {entry.count > 0
                        ? `${entry.count} ${entry.count === 1 ? "material" : "materiais"}`
                        : "Em preparação"}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={entry.name}>
                  {entry.count > 0 ? (
                    <Link
                      to="/dashboard/library"
                      search={{ collection: "subjects", discipline: entry.name }}
                      className="material-card"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="material-card" data-empty="true" aria-disabled="true">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="hub-more" className="space-y-3">
        <header>
          <h2 id="hub-more" className="text-xl font-bold">
            Mais para estudar
          </h2>
          <p className="text-sm text-muted-foreground">Cursos, vídeos, dicionário e prática.</p>
        </header>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_RESOURCES.map(({ to, search, icon: Icon, title, text }) => (
            <li key={title}>
              <Link to={to} search={(search ?? {}) as never} className="material-card">
                <span className="material-card__icon" data-tone="more">
                  <Icon aria-hidden="true" />
                </span>
                <span className="material-card__body">
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/dashboard/question-trainer" className="material-card">
              <span className="material-card__icon" data-tone="more">
                <ClipboardCheck aria-hidden="true" />
              </span>
              <span className="material-card__body">
                <strong>Praticar com questões</strong>
                <span>Fixe o que estudou no Treinador.</span>
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
