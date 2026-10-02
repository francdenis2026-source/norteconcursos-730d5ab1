import { Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarDays, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AGENTE_TOPICS,
  AGENTE_WEEKS,
  computeAgenteStats,
  type ItemVerdicts,
} from "@/lib/agenteContabilidade";
import { cn } from "@/lib/utils";

interface AttemptRow {
  contest_name: string | null;
  contest_year: string | number | null;
  extracted_data: Record<string, unknown> | null;
}

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const YEARS = [2014, 2018, 2021, 2025];

// Plano de 6 semanas de Contabilidade Geral para Agente de PF (Bloco III do edital: 24 de 120 itens),
// priorizado pelo que mais caiu nas provas de Agente e pelos pontos que o aluno perdeu em cada tópico.
export function AgenteContabilidadePlan({ attempts }: { attempts: AttemptRow[] }) {
  const verdicts: ItemVerdicts = {};
  let approximate = false;
  for (const row of attempts) {
    if (!normalize(String(row.contest_name ?? "")).includes("agente de policia federal")) continue;
    const year = Number(row.contest_year);
    const items = row.extracted_data?.["items"];
    if (!year || !items || typeof items !== "object") continue;
    verdicts[year] = { ...(verdicts[year] ?? {}), ...(items as Record<string, string>) };
    if (row.extracted_data?.["itens_aproximado"]) approximate = true;
  }
  const stats = computeAgenteStats(verdicts);
  const personal = stats.some((stat) => stat.hasData);
  const labelOf = (id: number) => AGENTE_TOPICS.find((topic) => topic.id === id)?.label ?? "";

  return (
    <Card className="border-emerald-200 shadow-sm dark:border-emerald-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-emerald-600" /> Plano de Contabilidade para Agente de PF
        </CardTitle>
        <CardDescription>
          O Bloco III do edital da PF 2025 é só Contabilidade Geral: 24 dos 120 itens. A ordem
          abaixo junta o que mais caiu nas provas de Agente com os pontos que você perdeu em cada
          tópico (erro = 2 pontos, em branco = 1).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="space-y-3">
          <h3 className="text-sm font-black">Prioridades</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="py-1 pr-3">#</th>
                  <th className="py-1 pr-3">Tópico do edital</th>
                  <th className="py-1 pr-3">Caiu ({YEARS.join(", ")})</th>
                  <th className="py-1 pr-3">Seu desempenho</th>
                  <th className="py-1 pr-3">Pontos perdidos</th>
                  <th className="py-1">Materiais</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => (
                  <tr key={stat.topic.id} className="border-t align-top">
                    <td className="py-2 pr-3 font-black">{index + 1}</td>
                    <td className="py-2 pr-3 font-bold">{stat.topic.label}</td>
                    <td className="py-2 pr-3">
                      <b>{stat.asked}</b>{" "}
                      <span className="text-muted-foreground">
                        ({YEARS.map((year) => stat.askedByYear[year] ?? 0).join(" · ")})
                      </span>
                    </td>
                    <td className="py-2 pr-3">
                      {stat.hasData ? (
                        `${stat.correct} certas · ${stat.wrong} erradas · ${stat.blank} em branco`
                      ) : (
                        <span className="text-muted-foreground">sem itens seus</span>
                      )}
                    </td>
                    <td className="py-2 pr-3">
                      {stat.hasData ? (
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px]",
                            stat.pointsLost >= 10
                              ? "border-rose-300 text-rose-700"
                              : stat.pointsLost >= 6
                                ? "border-amber-300 text-amber-700"
                                : "text-muted-foreground",
                          )}
                        >
                          {stat.pointsLost}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-x-2 gap-y-1">
                        {stat.topic.materials.map((material) => (
                          <Link
                            key={material.slug}
                            to="/dashboard/library/$slug"
                            params={{ slug: material.slug }}
                            className="font-bold text-emerald-700 hover:underline"
                          >
                            {material.title}
                          </Link>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!personal && (
            <p className="text-xs text-muted-foreground">
              Sem itens seus de Agente de PF cadastrados: a ordem usa só a frequência nas provas.
            </p>
          )}
        </section>

        <section className="space-y-3">
          <h3 className="flex items-center gap-2 text-sm font-black">
            <CalendarDays className="h-4 w-4" /> 6 semanas, 8 horas por semana
          </h3>
          <p className="text-xs text-muted-foreground">
            Em cada semana: 60% lendo o material, 30% resolvendo as questões oficiais do tópico e
            10% revisando os erros de ontem e de 7 dias atrás. Com mais ou menos tempo, mantenha as
            proporções.
          </p>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {AGENTE_WEEKS.map((week) => (
              <div key={week.week} className="rounded-2xl border bg-background p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                    {week.week}
                  </span>
                  <Badge variant="secondary">{week.hours} h</Badge>
                </div>
                <p className="text-sm font-black">{week.title}</p>
                {week.topics.length > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {week.topics.map(labelOf).join(" + ")}
                  </p>
                )}
                <p className="mt-2 text-xs font-semibold text-emerald-700">{week.practice}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />O tópico de cada questão foi
          atribuído automaticamente pelo enunciado e pode errar em alguns itens.
          {approximate &&
            " O detalhamento da PF 2025 vem de planilha pessoal e é aproximado; os totais oficiais são os do BDI."}
        </p>
      </CardContent>
    </Card>
  );
}
