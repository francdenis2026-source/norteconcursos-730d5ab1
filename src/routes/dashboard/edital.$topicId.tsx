import React from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpenCheck, GraduationCap, Layers3, Loader2, Scale } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { LockedState } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { basisHref, parseBasis, splitExplanation, type LegalBasis } from "@/lib/questionFormat";

export const Route = createFileRoute("/dashboard/edital/$topicId")({ component: TopicPage });

interface TopicRow {
  id: string;
  discipline: string;
  topic_text: string;
  edition_id: string;
}
interface EditionRow {
  contest_name: string;
  role_name: string;
  contest_year: number;
  exam_board: string | null;
}
interface StudyCard {
  id: string;
  subtopic: string | null;
  subject: string;
  explanation: string;
  legalBasis: LegalBasis[];
  difficulty: string;
}

function TopicPage() {
  const { topicId } = useParams({ from: "/dashboard/edital/$topicId" });
  const { user, isLoading: authLoading } = useAuthStatus();
  const [topic, setTopic] = React.useState<TopicRow | null>(null);
  const [edition, setEdition] = React.useState<EditionRow | null>(null);
  const [cards, setCards] = React.useState<StudyCard[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (authLoading || !user || user.id === "demo-user") {
      setLoading(false);
      return;
    }
    let active = true;
    void (async () => {
      const topicResult = await supabase
        .from("syllabus_topics")
        .select("id,discipline,topic_text,edition_id")
        .eq("id", topicId)
        .maybeSingle();
      if (!active) return;
      if (topicResult.error || !topicResult.data) {
        setError(topicResult.error?.message || "Assunto não encontrado.");
        setLoading(false);
        return;
      }
      const topicRow = topicResult.data as TopicRow;
      setTopic(topicRow);
      const [editionResult, curatedResult] = await Promise.all([
        supabase
          .from("syllabus_editions")
          .select("contest_name,role_name,contest_year,exam_board")
          .eq("id", topicRow.edition_id)
          .maybeSingle(),
        supabase
          .from("curated_question_catalog")
          .select("id,subtopic,subject,explanation,legal_basis,difficulty")
          .eq("syllabus_topic_id", topicId)
          .eq("content_status", "active"),
      ]);
      if (!active) return;
      if (editionResult.data) setEdition(editionResult.data as EditionRow);
      if (curatedResult.error) {
        setError(curatedResult.error.message);
      } else {
        setCards(
          ((curatedResult.data || []) as Array<Record<string, unknown>>).map((row) => ({
            id: String(row.id),
            subtopic: row.subtopic ? String(row.subtopic) : null,
            subject: String(row.subject),
            explanation: String(row.explanation),
            legalBasis: parseBasis(row.legal_basis),
            difficulty: String(row.difficulty || "média"),
          })),
        );
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [authLoading, user, topicId]);

  if (authLoading || loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  if (!user || user.id === "demo-user")
    return (
      <LockedState
        image="field-map"
        title={
          <>
            Estude este <em>assunto</em>
          </>
        }
        description="Entre na sua conta para acessar o resumo, as explicações revisadas e o treino deste assunto do edital."
      />
    );
  if (error || !topic)
    return (
      <div className="space-y-4">
        <p className="text-destructive">{error || "Assunto não encontrado."}</p>
        <Button asChild variant="outline">
          <Link to="/dashboard/edital">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao edital
          </Link>
        </Button>
      </div>
    );

  const practiceSearch = edition
    ? {
        contest: edition.contest_name,
        career: edition.role_name,
        year: String(edition.contest_year),
        board: edition.exam_board || undefined,
        subject: cards[0]?.subject,
      }
    : {};

  return (
    <div className="space-y-6 pb-8">
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link to="/dashboard/edital">
          <ArrowLeft className="h-4 w-4" /> Voltar ao edital eletrônico
        </Link>
      </Button>

      <section className="page-hero" data-hero="field-map">
        <Badge className="hero-chip">
          <Layers3 className="mr-1 h-3.5 w-3.5" />
          {topic.discipline}
        </Badge>
        <h1 className="text-2xl font-bold md:text-3xl">{topic.topic_text}</h1>
        {edition && (
          <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
            <GraduationCap className="h-4 w-4" />
            {edition.contest_name} — {edition.role_name} ({edition.contest_year})
            {edition.exam_board ? ` · ${edition.exam_board}` : ""}
          </p>
        )}
        {cards.length > 0 && (
          <Button asChild className="mt-5 bg-white text-[#0b3150] hover:bg-white/90">
            <Link to="/dashboard/question-trainer" search={practiceSearch}>
              <BookOpenCheck className="mr-2 h-4 w-4" />
              Praticar questões desse assunto
            </Link>
          </Button>
        )}
      </section>

      {cards.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ainda sem resumo publicado</CardTitle>
            <CardDescription>
              Esse assunto do edital ainda não tem questões explicadas cadastradas. Continue
              acompanhando — a curadoria de conteúdo está em andamento e cobre editais aos poucos.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Resumo do assunto ({cards.length} pontos revisados)</h2>
          {cards.map((card) => {
            const { main, example } = splitExplanation(card.explanation);
            return (
              <Card key={card.id}>
                <CardHeader>
                  <CardTitle className="text-base">{card.subtopic || card.subject}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed">
                  <p className="whitespace-pre-line text-foreground/90">{main}</p>
                  {example && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <p className="whitespace-pre-line text-foreground/80">{example}</p>
                    </div>
                  )}
                  {card.legalBasis.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex flex-wrap gap-2">
                        {card.legalBasis.map((basis, i) => (
                          <a
                            key={i}
                            href={basisHref(basis)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
                          >
                            <Scale className="h-3 w-3" />
                            {basis.title || (basis as { norma?: string }).norma || "Fonte legal"}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
