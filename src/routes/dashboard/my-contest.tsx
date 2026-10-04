import { createFileRoute } from "@tanstack/react-router";
import { useDashboardData } from "@/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Calendar,
  Trophy,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/my-contest")({
  component: MyContestPage,
});

function MyContestPage() {
  const { focusedContest, isLoading } = useDashboardData();

  if (isLoading) return <div className="p-8">Carregando...</div>;

  if (!focusedContest) {
    return (
      <PageHero
        image="careers-team"
        size="lg"
        kicker="Meu concurso"
        icon={Target}
        title={
          <>
            Nenhum concurso <em>em foco.</em>
          </>
        }
        description="Selecione um concurso no catálogo para acompanhar edital, prazo e progresso detalhado."
        actions={
          <Button asChild className="hero-btn-primary gap-2">
            <a href="/dashboard/questions">
              Ir para o catálogo <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        }
      />
    );
  }

  const daysToExam = focusedContest.examDate
    ? Math.ceil(
        (new Date(focusedContest.examDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  return (
    <div className="space-y-6">
      <PageHero
        image="careers-team"
        kicker="Meu concurso"
        icon={Target}
        title={focusedContest.agency}
        description={`${focusedContest.role} · ${focusedContest.examBoard}`}
        actions={
          daysToExam !== null && (
            <div
              className={cn(
                "hero-stat flex items-center gap-3",
                daysToExam < 30 && "!border-rose-400/50 !bg-rose-500/15",
              )}
            >
              <Calendar className="h-5 w-5 text-brass" />
              <div>
                <span>Dias para a prova</span>
                <strong>{daysToExam}</strong>
              </div>
            </div>
          )
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Edital Verticalizado
            </CardTitle>
            <CardDescription>Acompanhe a cobertura dos temas exigidos no edital.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Progresso Geral</span>
                <span className="font-bold">34%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>

            <div className="space-y-3">
              {[
                { name: "Língua Portuguesa", progress: 65, nextReview: "2026-08-15" },
                { name: "Direito Constitucional", progress: 42, nextReview: "2026-08-14" },
                { name: "Direito Administrativo", progress: 15, nextReview: "2026-08-17" },
                { name: "Informática", progress: 0, nextReview: null },
              ].map((topic, i) => {
                const status =
                  topic.progress === 100
                    ? "Revisado"
                    : topic.progress > 0
                      ? "Lido"
                      : "Não Iniciado";
                return (
                  <div
                    key={topic.name}
                    className="flex flex-col gap-2 p-3 border rounded-lg hover:border-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold flex-1">{topic.name}</span>
                      <Badge
                        variant={status === "Não Iniciado" ? "outline" : "default"}
                        className={cn(
                          status === "Revisado" && "bg-emerald-500",
                          status === "Lido" && "bg-secondary",
                        )}
                      >
                        {status}
                      </Badge>
                      <Progress value={topic.progress} className="h-1.5 w-20" />
                    </div>
                    {topic.nextReview && (
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Próxima revisão sugerida:{" "}
                        <span className="font-bold text-secondary">
                          {new Date(topic.nextReview).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="ml-auto text-[9px] h-4">
                          Repetição Espaçada
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Análise de Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Média de Acertos</span>
                </div>
                <span className="font-bold">72.4%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Tempo p/ Questão</span>
                </div>
                <span className="font-bold">1m 12s</span>
              </div>
              <div className="p-3 border border-amber-200 bg-amber-50 rounded-lg flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-[11px] text-amber-800">
                  Sua performance em <strong>Informática</strong> está abaixo da meta (60%).
                  Recomendamos priorizar este tema na próxima semana.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gold" />
                Dicas do Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs opacity-90 leading-relaxed italic">
                "Foque em simulados nesta reta final. A banca {focusedContest.examBoard} costuma
                repetir padrões de enunciados em {focusedContest.role}."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DisciplineProgress({ name, progress }: { name: string; progress: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border group hover:border-secondary transition-colors cursor-pointer">
      <div className="flex flex-col gap-1 flex-1 mr-4">
        <span className="text-sm font-bold">{name}</span>
        <Progress value={progress} className="h-1.5" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-muted-foreground">{progress}%</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary" />
      </div>
    </div>
  );
}
