import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  CheckCircle2,
  XCircle,
  CircleSlash,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/question-bank")({
  component: QuestionBankPage,
});

interface QBItem {
  id: string;
  contest_name: string;
  contest_year: string;
  career_name?: string;
  item_number: number;
  subject: string;
  subtopic: string | null;
  question_text: string;
  official_answer: string | null;
  candidate_answer: string | null;
  is_correct: boolean | null;
  is_anulada: boolean;
  explanation: string;
  difficulty: string | null;
  source_confidence: string;
  content_status?: string;
  verified_at?: string | null;
  law_version_checked_at?: string | null;
  is_original?: boolean;
  source_kind?: "official" | "curated" | "personal";
  source_page?: number | null;
  legal_basis?: Array<{ title?: string; url?: string }>;
  review_note?: string | null;
}

function QuestionBankPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [items, setItems] = React.useState<QBItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [subjectFilter, setSubjectFilter] = React.useState<string>("all");
  const [careerFilter, setCareerFilter] = React.useState<string>("all");
  const [yearFilter, setYearFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [openId, setOpenId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (authLoading || !user || user.id === "demo-user") {
      setIsLoading(false);
      return;
    }
    const load = async () => {
      setIsLoading(true);
      const [personalResult, curatedResult, officialResult] = await Promise.all([
        supabase
          .from("question_bank")
          .select("*")
          .eq("user_id", user.id)
          .order("contest_year", { ascending: true })
          .order("item_number", { ascending: true }),
        supabase
          .from("curated_question_catalog")
          .select("*")
          .eq("content_status", "active")
          .order("contest_year", { ascending: false })
          .order("created_at", { ascending: true }),
        supabase
          .from("official_exam_questions")
          .select("*")
          .eq("content_status", "active")
          .order("exam_year", { ascending: false })
          .order("item_number", { ascending: true }),
      ]);

      const personal = ((personalResult.data as QBItem[]) || [])
        .filter(
          (item) => !["obsolete", "revoked", "archived"].includes(item.content_status || "active"),
        )
        .map((item) => ({ ...item, source_kind: "personal" as const }));
      const curated = ((curatedResult.data as Array<Record<string, unknown>>) || []).map(
        (row, index): QBItem => ({
          id: `curated-${String(row.id)}`,
          contest_name: String(row.contest_name),
          contest_year: String(row.contest_year),
          career_name: String(row.career_name),
          item_number: index + 1,
          subject: String(row.subject),
          subtopic: row.subtopic ? String(row.subtopic) : null,
          question_text: String(row.question_text),
          official_answer: String(row.official_answer),
          candidate_answer: null,
          is_correct: null,
          is_anulada: false,
          explanation: String(row.explanation),
          difficulty: row.difficulty ? String(row.difficulty) : null,
          source_confidence: "alta",
          content_status: String(row.content_status),
          verified_at: row.verified_at ? String(row.verified_at) : null,
          is_original: true,
          source_kind: "curated",
        }),
      );
      const official = ((officialResult.data as Array<Record<string, unknown>>) || []).map(
        (row): QBItem => ({
          id: `official-${String(row.id)}`,
          contest_name: String(row.contest_name),
          contest_year: String(row.exam_year),
          career_name: String(row.career_name),
          item_number: Number(row.item_number),
          subject: String(row.subject),
          subtopic: null,
          question_text: String(row.question_text),
          official_answer: String(row.official_answer),
          candidate_answer: null,
          is_correct: null,
          is_anulada: false,
          explanation: row.review_note
            ? String(row.review_note)
            : "Gabarito conferido na publicação oficial definitiva do CEBRASPE. O comentário pedagógico detalhado será acrescentado na revisão editorial.",
          difficulty: null,
          source_confidence: "alta",
          content_status: String(row.content_status),
          verified_at: row.verified_at ? String(row.verified_at) : null,
          law_version_checked_at: row.law_version_checked_at
            ? String(row.law_version_checked_at)
            : null,
          is_original: false,
          source_kind: "official",
          source_page: row.source_page ? Number(row.source_page) : null,
          legal_basis: Array.isArray(row.legal_basis)
            ? (row.legal_basis as Array<{ title?: string; url?: string }>)
            : [],
          review_note: row.review_note ? String(row.review_note) : null,
        }),
      );
      setItems([...official, ...curated, ...personal]);
      setIsLoading(false);
    };
    load();
  }, [user, authLoading]);

  const subjects = React.useMemo(
    () => Array.from(new Set(items.map((i) => i.subject))).sort(),
    [items],
  );
  const careers = React.useMemo(
    () => Array.from(new Set(items.map((i) => i.career_name || i.contest_name))).sort(),
    [items],
  );
  const years = React.useMemo(
    () => Array.from(new Set(items.map((i) => i.contest_year))).sort(),
    [items],
  );

  const filtered = items.filter((i) => {
    if (subjectFilter !== "all" && i.subject !== subjectFilter) return false;
    if (careerFilter !== "all" && (i.career_name || i.contest_name) !== careerFilter) return false;
    if (yearFilter !== "all" && i.contest_year !== yearFilter) return false;
    if (statusFilter === "errou" && i.is_correct !== false) return false;
    if (statusFilter === "acertou" && i.is_correct !== true) return false;
    if (statusFilter === "anulada" && !i.is_anulada) return false;
    return true;
  });

  const stats = {
    total: items.length,
    acertos: items.filter((i) => i.is_correct === true).length,
    erros: items.filter((i) => i.is_correct === false).length,
    anuladas: items.filter((i) => i.is_anulada).length,
    oficiais: items.filter((i) => i.source_kind === "official").length,
  };

  if (authLoading || isLoading) return <div className="p-8">Carregando banco de questões...</div>;

  if (!user || user.id === "demo-user") {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <BookMarked className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Faça login para ver seu banco de questões</h2>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <BookMarked className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Banco de questões ainda vazio</h2>
        <p className="text-muted-foreground max-w-md">
          Conforme suas provas forem analisadas, as questões individuais com explicação pedagógica
          aparecem aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Banco de Questões</h1>
          <p className="text-muted-foreground">
            Questões oficiais da PF e questões autorais, todas vinculadas ao edital e a fontes
            verificadas.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700"
        >
          <ShieldCheck className="h-3.5 w-3.5" /> Fontes oficiais verificadas
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatTile label="Questões" value={stats.total} color="text-primary" />
        <StatTile label="Certas" value={stats.acertos} color="text-emerald-600" />
        <StatTile label="Erradas" value={stats.erros} color="text-rose-600" />
        <StatTile label="Anuladas" value={stats.anuladas} color="text-amber-600" />
        <StatTile label="Oficiais" value={stats.oficiais} color="text-sky-600" />
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterSelect
          label="Matéria"
          value={subjectFilter}
          onChange={setSubjectFilter}
          options={["all", ...subjects]}
          allLabel="Todas as matérias"
        />
        <FilterSelect
          label="Carreira"
          value={careerFilter}
          onChange={setCareerFilter}
          options={["all", ...careers]}
          allLabel="Todas as carreiras"
        />
        <FilterSelect
          label="Ano"
          value={yearFilter}
          onChange={setYearFilter}
          options={["all", ...years]}
          allLabel="Todos os anos"
        />
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={["all", "acertou", "errou", "anulada"]}
          allLabel="Todos"
          labels={{ acertou: "Acertei", errou: "Errei", anulada: "Anuladas" }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((q) => {
          const isOpen = openId === q.id;
          return (
            <Card
              key={q.id}
              className={cn(
                "border-l-4",
                q.is_anulada
                  ? "border-l-amber-400"
                  : q.is_correct === true
                    ? "border-l-emerald-500"
                    : q.is_correct === false
                      ? "border-l-rose-500"
                      : "border-l-muted",
              )}
            >
              <CardContent
                className="pt-4 cursor-pointer"
                onClick={() => setOpenId(isOpen ? null : q.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <Badge variant="outline" className="text-[10px]">
                        {q.contest_year}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        Item {q.item_number}
                      </Badge>
                      <Badge className="text-[10px] bg-secondary">{q.subject}</Badge>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {q.career_name || q.contest_name}
                      </span>
                      {q.subtopic && (
                        <span className="text-[10px] text-muted-foreground">{q.subtopic}</span>
                      )}
                      {q.is_original && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-sky-200 bg-sky-50 text-sky-700"
                        >
                          Questão autoral
                        </Badge>
                      )}
                      {q.source_kind === "official" && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-violet-200 bg-violet-50 text-violet-700"
                        >
                          Prova oficial PF
                        </Badge>
                      )}
                      {q.verified_at && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-emerald-200 text-emerald-700"
                        >
                          Edital verificado
                        </Badge>
                      )}
                      {q.law_version_checked_at && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-indigo-200 bg-indigo-50 text-indigo-700"
                        >
                          Vigência jurídica conferida
                        </Badge>
                      )}
                      <StatusIcon anulada={q.is_anulada} correct={q.is_correct} />
                    </div>
                    <p className="text-sm leading-relaxed">{q.question_text}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {isOpen && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span>
                        Gabarito oficial: <strong>{q.official_answer || "—"}</strong>
                      </span>
                      {q.candidate_answer && (
                        <span>
                          Sua resposta: <strong>{q.candidate_answer}</strong>
                        </span>
                      )}
                      {q.difficulty && (
                        <Badge variant="outline" className="text-[10px]">
                          {q.difficulty}
                        </Badge>
                      )}
                      {q.source_kind === "official" && q.source_page && (
                        <span className="text-muted-foreground">
                          Caderno oficial, pág. {q.source_page}
                        </span>
                      )}
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm leading-relaxed">
                      <p className="font-bold text-xs uppercase text-muted-foreground mb-1">
                        Explicação
                      </p>
                      {q.explanation}
                    </div>
                    {q.legal_basis && q.legal_basis.length > 0 && (
                      <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
                        <p className="mb-2 text-xs font-bold uppercase text-indigo-800">
                          Fontes oficiais da revisão jurídica
                        </p>
                        <div className="flex flex-col gap-1.5">
                          {q.legal_basis.map((source, index) =>
                            source.url ? (
                              <a
                                key={`${source.url}-${index}`}
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                className="inline-flex w-fit items-center gap-1 text-xs font-medium text-indigo-700 hover:underline"
                              >
                                {source.title || "Fonte oficial"}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : null,
                          )}
                        </div>
                      </div>
                    )}
                    {q.source_confidence !== "alta" && (
                      <p className="text-[10px] text-amber-600 flex items-center gap-1">
                        Confiança da explicação: {q.source_confidence} — vale conferir com material
                        complementar.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function StatTile({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="pt-4 pb-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn("text-2xl font-bold", color)}>{value}</p>
      </CardContent>
    </Card>
  );
}

function StatusIcon({ anulada, correct }: { anulada: boolean; correct: boolean | null }) {
  if (anulada) return <CircleSlash className="h-3.5 w-3.5 text-amber-500" />;
  if (correct === true) return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
  if (correct === false) return <XCircle className="h-3.5 w-3.5 text-rose-500" />;
  return null;
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
  labels,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
  labels?: Record<string, string>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 px-3 rounded-md border bg-background text-sm"
      aria-label={label}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt === "all" ? allLabel : labels?.[opt] || opt}
        </option>
      ))}
    </select>
  );
}
