import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenText, ChevronRight, Loader2, MapPin, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { LockedState } from "@/components/dashboard/PageHero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/dashboard/edital/")({ component: EditalPage });

interface Edition {
  id: string;
  contest_name: string;
  role_name: string;
  contest_year: number;
  exam_board: string | null;
}
interface Topic {
  id: string;
  discipline: string;
  topic_text: string;
  topic_order: number | null;
  count: number;
}

const examKey = (e: Edition) => `${e.contest_name}::${e.role_name}::${e.contest_year}`;

function EditalPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [editions, setEditions] = React.useState<Edition[]>([]);
  const [selected, setSelected] = React.useState("all");
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [loadingEditions, setLoadingEditions] = React.useState(true);
  const [loadingTopics, setLoadingTopics] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (authLoading || !user || user.id === "demo-user") {
      setLoadingEditions(false);
      return;
    }
    let active = true;
    void (async () => {
      const { data, error } = await supabase
        .from("syllabus_editions")
        .select("id,contest_name,role_name,contest_year,exam_board")
        .eq("status", "active")
        .order("contest_name")
        .order("contest_year", { ascending: false });
      if (!active) return;
      if (error) setError(error.message);
      else setEditions((data || []) as Edition[]);
      setLoadingEditions(false);
    })();
    return () => {
      active = false;
    };
  }, [authLoading, user]);

  const groups = React.useMemo(() => {
    const map = new Map<string, Edition[]>();
    for (const e of editions) {
      const list = map.get(examKey(e)) || [];
      list.push(e);
      map.set(examKey(e), list);
    }
    return Array.from(map.values()).map((list) => list[0]);
  }, [editions]);

  const currentEdition = React.useMemo(
    () => editions.find((e) => e.id === selected) || null,
    [editions, selected],
  );

  React.useEffect(() => {
    if (!currentEdition) {
      setTopics([]);
      return;
    }
    let active = true;
    setLoadingTopics(true);
    void (async () => {
      const [topicsResult, countsResult] = await Promise.all([
        supabase
          .from("syllabus_topics")
          .select("id,discipline,topic_text,topic_order")
          .eq("edition_id", currentEdition.id)
          .order("discipline")
          .order("topic_order"),
        supabase
          .from("curated_question_catalog")
          .select("syllabus_topic_id")
          .eq("content_status", "active"),
      ]);
      if (!active) return;
      if (topicsResult.error) {
        setError(topicsResult.error.message);
        setLoadingTopics(false);
        return;
      }
      const counts = new Map<string, number>();
      for (const row of (countsResult.data || []) as Array<{ syllabus_topic_id: string }>) {
        counts.set(row.syllabus_topic_id, (counts.get(row.syllabus_topic_id) || 0) + 1);
      }
      setTopics(
        ((topicsResult.data || []) as Array<Omit<Topic, "count">>).map((t) => ({
          ...t,
          count: counts.get(t.id) || 0,
        })),
      );
      setLoadingTopics(false);
    })();
    return () => {
      active = false;
    };
  }, [currentEdition]);

  const byDiscipline = React.useMemo(() => {
    const map = new Map<string, Topic[]>();
    for (const t of topics) {
      const list = map.get(t.discipline) || [];
      list.push(t);
      map.set(t.discipline, list);
    }
    return Array.from(map.entries());
  }, [topics]);

  if (authLoading || loadingEditions)
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
            Edital <em>eletrônico</em>
          </>
        }
        description="Entre na sua conta para navegar pelo edital do seu concurso assunto por assunto, com resumos e treino direcionado."
      />
    );
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="space-y-6 pb-8">
      <section className="page-hero page-hero--lg" data-hero="field-map">
        <Badge className="hero-chip">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          CTI — Centro de Treinamento Intensivo
        </Badge>
        <h1 className="text-2xl font-bold md:text-3xl">Edital eletrônico</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
          Escolha o concurso e o cargo. Cada assunto do edital vira uma porta de entrada: clique
          para ver o resumo, as explicações já revisadas e ir direto treinar aquele ponto
          específico.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">1. Escolha o concurso</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-full md:w-[420px]">
              <SelectValue placeholder="Selecione um concurso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Selecione um concurso…</SelectItem>
              {groups.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.contest_name} — {e.role_name} ({e.contest_year})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loadingTopics && (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {!loadingTopics && currentEdition && byDiscipline.length === 0 && (
        <p className="text-muted-foreground">
          Ainda não há tópicos de edital cadastrados para esse concurso.
        </p>
      )}

      {!loadingTopics && byDiscipline.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              2. Clique no assunto que você quer estudar
            </CardTitle>
            <CardDescription>
              {topics.reduce((n, t) => n + t.count, 0)} questões explicadas disponíveis nesse
              edital, distribuídas pelos assuntos abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {byDiscipline.map(([discipline, items]) => (
                <AccordionItem key={discipline} value={discipline}>
                  <AccordionTrigger className="text-left font-semibold">
                    {discipline}
                    <Badge variant="outline" className="ml-2 font-normal">
                      {items.length} {items.length === 1 ? "assunto" : "assuntos"}
                    </Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {items.map((t) => (
                        <li key={t.id}>
                          <Link
                            to="/dashboard/edital/$topicId"
                            params={{ topicId: t.id }}
                            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                          >
                            <span className="flex items-center gap-2">
                              <BookOpenText className="h-4 w-4 shrink-0 text-muted-foreground" />
                              {t.topic_text}
                            </span>
                            <span className="flex items-center gap-2 shrink-0">
                              {t.count > 0 ? (
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                  {t.count} questõe{t.count === 1 ? "" : "s"}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                  em preparo
                                </Badge>
                              )}
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
