import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { CAREERS } from "@/lib/careers";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, FileStack, BookMarked } from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/careers")({
  component: CareersPage,
});

function CareersPage() {
  const [counts, setCounts] = React.useState<Record<string, { exams: number; questions: number }>>(
    {},
  );

  React.useEffect(() => {
    const load = async () => {
      const [examsRes, questionsRes, boardQuestionsRes] = await Promise.all([
        supabase.from("student_exam_documents").select("contest_name"),
        supabase.from("question_bank").select("contest_name"),
        supabase.from("board_exam_questions").select("contest_name").eq("content_status", "active"),
      ]);
      const next: Record<string, { exams: number; questions: number }> = {};
      const matchCareer = (contestName: string | null | undefined) =>
        CAREERS.find(
          (c) =>
            contestName?.toLowerCase().includes(c.agency.toLowerCase()) ||
            contestName?.toLowerCase().includes(c.name.toLowerCase()),
        );
      (examsRes.data || []).forEach((r: { contest_name: string | null }) => {
        const c = matchCareer(r.contest_name);
        if (c) {
          next[c.id] = next[c.id] || { exams: 0, questions: 0 };
          next[c.id]!.exams++;
        }
      });
      // "question_bank" guarda o banco pessoal/curadoria por carreira; "board_exam_questions"
      // (ativas) é o catálogo de provas de bancas (ex.: FGV) revisado em Painel admin > Questões
      // de bancas — sem somar as duas, carreiras com prova de banca já ativada (ex.: Bombeiro)
      // continuavam aparecendo como "sem dados".
      (questionsRes.data || []).forEach((r: { contest_name: string | null }) => {
        const c = matchCareer(r.contest_name);
        if (c) {
          next[c.id] = next[c.id] || { exams: 0, questions: 0 };
          next[c.id]!.questions++;
        }
      });
      (boardQuestionsRes.data || []).forEach((r: { contest_name: string | null }) => {
        const c = matchCareer(r.contest_name);
        if (c) {
          next[c.id] = next[c.id] || { exams: 0, questions: 0 };
          next[c.id]!.questions++;
        }
      });
      setCounts(next);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHero
        image="careers-team"
        kicker="Objetivo"
        icon={ShieldCheck}
        title={
          <>
            Carreiras <em>policiais</em>
          </>
        }
        description="Escolha a carreira para focar seus estudos — dados reais vão se acumulando conforme você envia provas."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAREERS.map((c) => {
          const data = counts[c.id] || { exams: 0, questions: 0 };
          const hasData = data.exams > 0 || data.questions > 0;
          return (
            <Card key={c.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-1.5" style={{ background: c.color }} />
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
                    style={{ background: c.color }}
                  >
                    {c.name}
                  </div>
                  {hasData ? (
                    <Badge className="bg-emerald-500">Com dados</Badge>
                  ) : (
                    <Badge variant="outline">Sem dados ainda</Badge>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{c.fullName}</h3>
                  <p className="text-xs text-muted-foreground">{c.agency}</p>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileStack className="h-3.5 w-3.5" /> {data.exams} prova
                    {data.exams !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookMarked className="h-3.5 w-3.5" /> {data.questions} questõe
                    {data.questions !== 1 ? "s" : ""}
                  </span>
                </div>
                <Link
                  to="/dashboard/student-exams"
                  search={{ career: c.agency }}
                  className="flex items-center justify-between rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                >
                  Abrir área da carreira
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-5 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Plataforma multi-carreira: PF, PRF, DEPEN, PC, PP, Bombeiro e PM. Cada carreira acumula
            provas reais, banco de questões com explicação pedagógica e legislação sempre verificada
            no Planalto — igual ao que já foi feito para Polícia Federal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
