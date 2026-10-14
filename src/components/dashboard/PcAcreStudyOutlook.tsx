import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ExternalLink, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import outlook from "@/data/pcAcreStudyOutlook.json";
import { pcAcrePriorities, type PcAcreRole } from "@/lib/pcAcreOutlook";
import { cn } from "@/lib/utils";

export function PcAcreStudyOutlook({
  role,
  onRoleChange,
}: {
  role: PcAcreRole;
  onRoleChange: (role: PcAcreRole) => void;
}) {
  const profile = outlook.profiles.find((item) => item.id === role)!;
  const years = profile.exams.map((exam) => exam.year);
  return (
    <section id="pc-acre" className="scroll-mt-24 space-y-4" aria-labelledby="pc-acre-title">
      <Card className="border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardHeader>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Target className="h-4 w-4" />
            Seu próximo passo
          </p>
          <CardTitle id="pc-acre-title" role="heading" aria-level={2} className="text-xl sm:text-2xl">
            PC do Acre: o que priorizar
          </CardTitle>
          <CardDescription>
            Use o histórico de outras Polícias Civis para organizar seu estudo. Análise de{" "}
            {outlook.asOf.split("-").reverse().join("/")}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="rounded-xl border border-sky-400/40 bg-sky-500/10 p-3 text-sm">
            São prioridades de estudo, não garantia do que cairá. O novo edital e a banca da PC-AC
            não foram confirmados neste levantamento.
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Cargo da PC do Acre">
            {outlook.profiles.map((item) => (
              <Button
                key={item.id}
                variant={role === item.id ? "default" : "outline"}
                aria-pressed={role === item.id}
                onClick={() => onRoleChange(item.id as PcAcreRole)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2" aria-live="polite">
            {[
              ["Provas no recorte", profile.exams.length],
              ["Registros históricos", profile.records],
              ["Anos do recorte", `${Math.min(...years)}–${Math.max(...years)}`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border bg-background/70 p-3">
                <p className="text-lg font-black tabular-nums sm:text-2xl">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          {role === "escrivao" && (
            <p className="text-sm text-muted-foreground">
              Amostra menor e mais antiga: Pernambuco/2024, Amazonas/2022 e Sergipe/2021. Use as
              prioridades com esse limite em mente.
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {pcAcrePriorities[role].map((item, index) => (
              <article key={item.title} className="rounded-xl border bg-background/70 p-4">
                <p className="mb-1 text-xs font-bold text-primary">Prioridade {index + 1}</p>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.task}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/dashboard/library">
                <BookOpen className="mr-2 h-4 w-4" />
                Abrir biblioteca
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/dashboard/exam-panorama" search={{ pcCargo: role }} hash="panorama-geral">
                <ArrowRight className="mr-2 h-4 w-4" />
                Explorar outras provas
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">O que se repete nos cadernos</CardTitle>
          <CardDescription>
            Presença histórica por disciplina. Uma disciplina encontrada em todas as provas da
            amostra não tem cobrança futura garantida.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2">
            {profile.subjects.slice(0, 6).map((subject) => (
              <li
                key={subject.subject}
                className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm"
              >
                <span>{subject.subject}</span>
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                  {subject.exams_present}/{subject.exams} provas
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monte um bloco de 100 questões de treino</CardTitle>
          <CardDescription>
            Distribuição pedagógica provisória para comparar os três cargos. Os números não preveem
            a quantidade de questões da próxima prova.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="overflow-x-auto rounded-lg border"
            role="region"
            aria-label="Distribuição de treino por cargo"
            tabIndex={0}
          >
            <table className="w-full min-w-[520px] text-sm">
              <caption className="sr-only">Cada cargo soma 100 questões de treino</caption>
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="p-3 text-left">
                    Bloco de estudo
                  </th>
                  {outlook.profiles.map((item) => (
                    <th
                      key={item.id}
                      scope="col"
                      className={cn(
                        "p-3 text-center",
                        item.id === role && "bg-primary/10 text-primary",
                      )}
                    >
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {outlook.training.map((block) => (
                  <tr key={block.label} className="border-t">
                    <th scope="row" className="p-3 text-left font-medium">
                      {block.label}
                    </th>
                    {outlook.profiles.map((item) => (
                      <td
                        key={item.id}
                        className={cn(
                          "p-3 text-center font-bold tabular-nums",
                          item.id === role && "bg-primary/5 text-primary",
                        )}
                      >
                        {block[item.id as PcAcreRole]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t bg-muted/50">
                <tr>
                  <th scope="row" className="p-3 text-left">
                    Total de treino
                  </th>
                  {outlook.profiles.map((item) => (
                    <td key={item.id} className="p-3 text-center font-bold">
                      100
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Arquivologia é o bloco específico de Escrivão; Medicina Legal, dos demais cargos. Zero
            na simulação não elimina uma disciplina: adapte as cotas ao edital quando ele for
            confirmado.
          </p>
        </CardContent>
      </Card>

      <details className="rounded-xl border bg-card p-4">
        <summary className="cursor-pointer font-bold">
          Provas e fontes de {profile.label} ({profile.exams.length})
        </summary>
        <p className="mt-3 text-sm text-muted-foreground">
          Fontes oficiais indicadas no acervo, sem nova conferência dos PDFs nesta análise.
          Registros não equivalem necessariamente a um caderno completo.
        </p>
        <ul className="mt-3 divide-y">
          {profile.exams.map((exam) => (
            <li key={`${exam.state}-${exam.year}`} className="py-3">
              <p className="font-semibold">
                PC-{exam.state} · {exam.year} · {exam.board}
              </p>
              <p className="text-xs text-muted-foreground">
                {exam.career} · {exam.records} registros
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {exam.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={source.title}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary underline"
                  >
                    {source.title.toLowerCase().includes("gabarito")
                      ? "Gabarito"
                      : "Caderno da prova"}
                    <ExternalLink className="h-3 w-3" />
                    <span className="sr-only"> — {source.title} (abre em outra aba)</span>
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </details>
      <details className="rounded-xl border bg-card p-4">
        <summary className="cursor-pointer font-bold">Como interpretar esta análise</summary>
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <p>
            Este é um recorte histórico datado, separado dos filtros do panorama geral abaixo. Os
            números não são um inventário em tempo real.
          </p>
          <p>
            As comparações separam os cargos e evitam contar duas vezes a mesma prova. Cadernos com
            lacunas podem alterar a leitura das disciplinas. Itens pendentes e anulados ajudam a
            contar temas históricos; não liberam exercícios nem certificam gabaritos atuais.
          </p>
          <p>
            A referência da PC-AC cadastrada é de 2017, IBADE. Ela não confirma o próximo edital.
            Leis estaduais de outras PCs não substituem as normas do Acre; o conteúdo definitivo
            depende do edital e da legislação vigente.
          </p>
        </div>
      </details>
    </section>
  );
}
