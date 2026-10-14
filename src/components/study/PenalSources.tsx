import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useLegalCourses } from "@/lib/legalCourses";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { legalStudyCaveat } from "@/lib/legalStudyCaveats";
import { crimeStudyTarget } from "@/lib/penalCalc";
import { acreDate } from "@/lib/acreTime";

const CONTEXT = {
  dosimetria: {
    slug: "codigo-penal",
    articles: ["59", "61", "63", "64", "65", "67", "68", "33", "44", "77"],
    notes: ["59", "65", "68", "33", "44"],
  },
  execucao: { slug: "lep", articles: ["112", "126", "127", "128"], notes: ["112"] },
  prescricao: {
    slug: "codigo-penal",
    articles: ["109", "110", "111", "112", "115", "116", "117"],
    notes: ["115"],
  },
  remicao: { slug: "lep", articles: ["126", "127", "128"], notes: ["126"] },
} as const;
const OFFICIAL = [
  {
    title: "Código Penal · texto compilado",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
  },
  {
    title: "Código de Processo Penal · texto compilado",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm",
  },
  {
    title: "Lei de Execução Penal · texto oficial",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm",
  },
  {
    title: "STJ · consultar súmulas 231, 269, 440, 444 e 588",
    url: "https://scon.stj.jus.br/SCON/sumstj/",
  },
  {
    title: "STF · consultar Súmula 715 e Súmula Vinculante 56",
    url: "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp",
  },
  {
    title: "STF · pesquisar Tema 788 (prescrição executória)",
    url: "https://portal.stf.jus.br/jurisprudenciaRepercussao/",
  },
];

export function PenalSources({ tab, crimeId }: { tab: keyof typeof CONTEXT; crimeId: string }) {
  const { user } = useAuthStatus();
  const courses = useLegalCourses(user?.id !== "demo-user" ? user?.id : undefined);
  const [search, setSearch] = useState("");
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/(\d)\.(?=\d)/g, "$1");
  const terms = normalize(search).split(/\s+/).filter(Boolean);
  const catalog = (courses.data ?? []).filter(
    (c) =>
      !!c.syllabus_topic_id && terms.every((t) => normalize(`${c.title} ${c.slug}`).includes(t)),
  );
  const sorted = [...catalog].sort(
    (a, b) =>
      Number(["codigo-penal", "codigo-processo-penal", "lep"].includes(b.slug)) -
        Number(["codigo-penal", "codigo-processo-penal", "lep"].includes(a.slug)) ||
      a.title.localeCompare(b.title, "pt-BR"),
  );
  const context = CONTEXT[tab];
  const crimeTarget = crimeStudyTarget(crimeId);
  const selectedCrimeCourse = crimeTarget && courses.data?.find((c) => c.slug === crimeTarget.slug);
  const supplemental =
    tab === "execucao"
      ? [
          { slug: "codigo-penal", art: "42" },
          { slug: "codigo-penal", art: "75" },
          { slug: "codigo-penal", art: "83" },
          { slug: "codigo-processo-penal", art: "387" },
        ]
      : [];
  const current = courses.data?.find((c) => c.slug === context.slug);
  const notes = context.notes
    .map((art) => legalStudyCaveat(context.slug, `art-${art}`))
    .filter((n) => !!n);
  return (
    <section
      id="penal-sources"
      className="scroll-mt-24 space-y-5 rounded-2xl border bg-card p-5 md:p-6"
    >
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <BookOpen className="h-5 w-5" /> Legislação e jurisprudência para estudar
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O cálculo não incorpora automaticamente todas as regras do acervo. Abra o dispositivo,
          confira a lei no tempo e consulte as exceções antes de escolher os parâmetros.
        </p>
      </div>
      {tab === "dosimetria" && crimeTarget && selectedCrimeCourse && (
        <Button
          asChild
          variant="outline"
          className="h-auto min-h-10 max-w-full whitespace-normal text-left"
        >
          <Link
            to="/dashboard/legal-course/$slug"
            params={{ slug: crimeTarget.slug }}
            search={{ art: crimeTarget.art }}
          >
            Estudar o dispositivo do crime selecionado · {selectedCrimeCourse.title}
          </Link>
        </Button>
      )}
      {supplemental.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {supplemental
            .filter((ref) => courses.data?.some((c) => c.slug === ref.slug))
            .map((ref) => (
              <Button key={`${ref.slug}:${ref.art}`} asChild variant="outline" size="sm">
                <Link
                  to="/dashboard/legal-course/$slug"
                  params={{ slug: ref.slug }}
                  search={{ art: `art-${ref.art}` }}
                >
                  {ref.slug === "codigo-penal" ? "CP" : "CPP"} · art. {ref.art}
                </Link>
              </Button>
            ))}
        </div>
      )}
      {current && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">
            Dispositivos da aba atual · {current.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {context.articles.map((art) => (
              <Button key={art} asChild size="sm" variant="outline">
                <Link
                  to="/dashboard/legal-course/$slug"
                  params={{ slug: context.slug }}
                  search={{ art: `art-${art}` }}
                >
                  Art. {art}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
      {notes.length > 0 && (
        <details className="rounded-xl border p-4">
          <summary className="cursor-pointer text-sm font-semibold">
            Notas jurídicas já revisadas na biblioteca
          </summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {notes.map((note) => (
              <article key={note.title} className="text-sm">
                <h4 className="font-semibold">{note.title}</h4>
                <p className="mt-1 leading-6 text-muted-foreground">{note.explanation}</p>
                {isStudySourceUrl(note.source) && (
                  <a
                    href={note.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-primary underline"
                  >
                    Fonte oficial
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </details>
      )}
      <details className="rounded-xl border p-4" open={!!search}>
        <summary className="cursor-pointer text-sm font-semibold">
          Explorar o acervo de leis · CP, CPP, LEP e legislação especial
        </summary>
        <p className="mt-2 text-xs text-muted-foreground">
          Percursos ativos vinculados a editais. A lista inclui outras áreas jurídicas; a presença
          no acervo não significa aplicação automática à conta penal.
        </p>
        <label className="relative mt-4 block">
          <span className="sr-only">Buscar uma lei por nome ou número</span>
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, número ou tema…"
            className="min-h-11 w-full rounded-xl border bg-background py-2 pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>
        {courses.isLoading && (
          <p role="status" className="mt-3 text-sm">
            Consultando legislação…
          </p>
        )}
        {courses.isError && (
          <p role="alert" className="mt-3 text-sm">
            Não foi possível consultar o acervo.{" "}
            <Button variant="link" onClick={() => void courses.refetch()}>
              Tentar novamente
            </Button>
          </p>
        )}
        {!courses.isLoading && !courses.isError && !sorted.length && (
          <p className="mt-3 text-sm text-muted-foreground">
            Nenhum percurso disponível para esta busca. Consulte as fontes oficiais abaixo.
          </p>
        )}
        <div className="mt-4 grid max-h-96 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((course) => (
            <article key={course.id} className="rounded-xl border p-3">
              <Link
                to="/dashboard/legal-course/$slug"
                params={{ slug: course.slug }}
                className="text-sm font-semibold text-primary hover:underline"
              >
                {course.title}
              </Link>
              <p className="mt-2 text-xs text-muted-foreground">
                Conferência registrada:{" "}
                {course.checked_at
                  ? acreDate(course.checked_at).toLocaleDateString("pt-BR", {
                      timeZone: "America/Rio_Branco",
                    })
                  : "não informada"}
              </p>
              {isStudySourceUrl(course.source_url) && (
                <a
                  className="mt-2 inline-flex items-center gap-1 text-xs underline"
                  href={course.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir texto oficial
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </article>
          ))}
        </div>
      </details>
      <div>
        <h3 className="text-sm font-semibold">Consulta direta nas fontes oficiais</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {OFFICIAL.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl border p-3 text-sm hover:bg-muted"
            >
              {source.title}
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Links de consulta, sem certificação de atualização em tempo real. Confira o enunciado, os
          precedentes e o estado atual da jurisprudência no tribunal.
        </p>
      </div>
    </section>
  );
}
