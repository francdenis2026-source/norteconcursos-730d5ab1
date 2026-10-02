import { canonicalSubject } from "@/lib/subjects";
import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Award,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleSlash2,
  ExternalLink,
  FileStack,
  Image as ImageIcon,
  Lightbulb,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
  XCircle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddExamDialog } from "@/components/dashboard/AddExamDialog";
import {
  ContestPlanCard,
  type PlanEdition,
  type WeakItem,
} from "@/components/dashboard/ContestPlanCard";
import { ExamPhotoUploader } from "@/components/dashboard/ExamPhotoUploader";
import { useAuthStatus } from "@/hooks/useDashboard";
import { canRegisterExams } from "@/lib/subscriptions.config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student-exams")({
  validateSearch: (search: Record<string, unknown>) => ({
    career: typeof search["career"] === "string" ? search["career"] : undefined,
  }),
  component: StudentExamIntelligence,
  errorComponent: ExamRouteError,
});

type Verdict = "correta" | "errada" | "anulada" | "branco" | "pendente_conferencia";

interface ExamAnalysis {
  items?: Record<string, Verdict>;
  resultado_oficial?: { nota_total?: number; classificacao_ampla_objetiva?: number };
}

interface ExamRow {
  id: string;
  contest_name: string | null;
  contest_year: string | number | null;
  exam_board: string | null;
  correct_count: number | null;
  wrong_count: number | null;
  blank_count: number | null;
  score_net: number | null;
  score_raw: number | null;
  file_name: string;
  storage_path: string;
  extracted_data: ExamAnalysis | null;
}

interface QuestionReference {
  key: string;
  contest: string;
  year: string;
  item: number;
  subject: string;
  subtopic: string | null;
  text: string;
  answer: string | null;
  explanation: string;
  legalBasis: Array<{ title?: string; norma?: string; artigo?: string; url?: string }>;
}

// O Planalto marca cada artigo com uma âncora "#artN" (ex.: <a name="art205">
// antes de "Art. 205."), então quando sabemos o artigo dá pra pular a busca
// manual e abrir a página já rolada direto no trecho certo.
const basisHref = (basis: { artigo?: string; url?: string }) => {
  if (!basis.url) return undefined;
  if (!basis.artigo || basis.url.includes("#")) return basis.url;
  const artigoAnchor = basis.artigo.replace(/[^0-9A-Za-z-]/g, "");
  return artigoAnchor ? `${basis.url}#art${artigoAnchor}` : basis.url;
};

interface ExamGroup {
  key: string;
  contest: string;
  canonicalContest: string;
  year: string;
  board: string;
  correct: number;
  wrong: number;
  blank: number;
  score: number;
  analysis: ExamAnalysis | null;
  pages: ExamRow[];
}

interface SubjectMetric {
  subject: string;
  correct: number;
  wrong: number;
  blank: number;
  total: number;
  accuracy: number;
  // Questões desta disciplina cadastradas para a prova (mesmo as que o aluno não respondeu).
  catalog?: number;
}

const canonicalContest = (name: string) =>
  name.toLocaleLowerCase("pt-BR").includes("agente de polícia federal") ? "Polícia Federal" : name;

const percent = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

const questionKey = (contest: string, year: string, item: number) =>
  `${canonicalContest(contest)}__${year}__${item}`;

const UNCLASSIFIED = "Sem disciplina cadastrada";
const ALL_CONTESTS = "__todos__";

interface SubjectReport {
  metrics: SubjectMetric[];
  counted: number;
  mapped: number;
}

// Raio-X por disciplina de um conjunto de provas (uma só, ou todas). Conta todos os itens
// respondidos (anuladas e pendentes ficam de fora); a disciplina vem da questão cadastrada e,
// quando ela não existe, o item cai em "Sem disciplina cadastrada" em vez de sumir da conta.
function computeSubjectReport(
  groups: ExamGroup[],
  references: Map<string, QuestionReference>,
  syllabus: Map<string, string[]> = new Map(),
): SubjectReport {
  const map = new Map<string, SubjectMetric>();
  const metricFor = (subject: string) => {
    const existing = map.get(subject);
    if (existing) return existing;
    const created: SubjectMetric = {
      subject,
      correct: 0,
      wrong: 0,
      blank: 0,
      total: 0,
      accuracy: 0,
    };
    map.set(subject, created);
    return created;
  };
  // Disciplinas e nº de questões cadastradas de cada prova (concurso + ano).
  const catalogByExam = new Map<string, Map<string, number>>();
  for (const reference of references.values()) {
    const examKey = `${canonicalContest(reference.contest)}__${reference.year}`;
    const subjects = catalogByExam.get(examKey) ?? new Map<string, number>();
    subjects.set(reference.subject, (subjects.get(reference.subject) ?? 0) + 1);
    catalogByExam.set(examKey, subjects);
  }
  let counted = 0;
  let mapped = 0;
  for (const group of groups) {
    for (const [itemText, verdict] of Object.entries(group.analysis?.items || {})) {
      if (verdict === "anulada" || verdict === "pendente_conferencia") continue;
      const reference = references.get(
        questionKey(group.canonicalContest, group.year, Number(itemText)),
      );
      const metric = metricFor(reference?.subject ?? UNCLASSIFIED);
      if (verdict === "correta") metric.correct += 1;
      if (verdict === "errada") metric.wrong += 1;
      if (verdict === "branco") metric.blank += 1;
      metric.total += 1;
      metric.accuracy = percent(metric.correct, metric.correct + metric.wrong);
      counted += 1;
      if (reference) mapped += 1;
    }
    // Toda disciplina cobrada na prova aparece, mesmo sem item respondido: as que têm questão
    // cadastrada e as listadas no edital do concurso.
    const examKey = `${group.canonicalContest}__${group.year}`;
    for (const [subject, count] of catalogByExam.get(examKey) ?? [])
      metricFor(subject).catalog = (metricFor(subject).catalog ?? 0) + count;
    for (const subject of syllabus.get(examKey) ?? []) metricFor(subject);
  }
  const metrics = Array.from(map.values()).sort(
    (a, b) =>
      Number(a.subject === UNCLASSIFIED) - Number(b.subject === UNCLASSIFIED) ||
      Number(a.total === 0) - Number(b.total === 0) ||
      a.accuracy - b.accuracy ||
      b.total - a.total ||
      a.subject.localeCompare(b.subject, "pt-BR"),
  );
  return { metrics, counted, mapped };
}

function StudentExamIntelligence() {
  const { career } = Route.useSearch();
  const { user } = useAuthStatus();
  const canAdd =
    !!user && user.id !== "demo-user" && canRegisterExams(user.subscription_tier, user.role);
  const [rows, setRows] = React.useState<ExamRow[]>([]);
  const [questions, setQuestions] = React.useState<Map<string, QuestionReference>>(new Map());
  const [syllabus, setSyllabus] = React.useState<Map<string, string[]>>(new Map());
  const [cutoffs, setCutoffs] = React.useState<Map<string, number>>(new Map());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedExam, setSelectedExam] = React.useState<string>(ALL_CONTESTS);
  const [openExam, setOpenExam] = React.useState<string | null>(null);
  const [pageUrls, setPageUrls] = React.useState<Record<string, string>>({});
  const [reloadKey, setReloadKey] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData.session;
        if (!session) throw new Error("Sua sessão expirou. Entre novamente para ver as provas.");

        const examResult = await supabase
          .from("student_exam_documents")
          .select(
            "id,contest_name,contest_year,exam_board,correct_count,wrong_count,blank_count,score_net,score_raw,file_name,storage_path,extracted_data",
          )
          .eq("user_id", session.user.id)
          .order("contest_year", { ascending: true });
        if (examResult.error) throw examResult.error;

        // O banco tem milhares de questões ativas e o PostgREST devolve no máximo 1000 por
        // consulta; sem filtro, as questões de alguns concursos ficavam de fora. Busca só as
        // dos concursos do aluno, em páginas.
        const contestNames = Array.from(
          new Set(
            (examResult.data || []).flatMap((row) => {
              const name = String(row.contest_name || "Concurso");
              return [name, canonicalContest(name)];
            }),
          ),
        );
        const PAGE = 1000;
        const officialRows: Array<Record<string, unknown>> = [];
        for (let from = 0; contestNames.length; from += PAGE) {
          const { data: chunk, error: chunkError } = await supabase
            .from("official_exam_questions")
            .select(
              "contest_name,career_name,exam_year,item_number,subject,question_text,official_answer,review_note,legal_basis,content_status",
            )
            .eq("content_status", "active")
            .in("contest_name", contestNames)
            .order("contest_name")
            .order("exam_year")
            .order("item_number")
            .range(from, from + PAGE - 1);
          if (chunkError) throw chunkError;
          officialRows.push(...((chunk || []) as Array<Record<string, unknown>>));
          if ((chunk || []).length < PAGE) break;
        }
        // Um mesmo concurso/ano pode ter vários cargos com os mesmos números de item (PF 2021 e 2025:
        // Agente, Escrivão, Delegado, Papiloscopista). Fica só a questão do cargo da prova do aluno;
        // se houver vários cargos e nenhum for o dele, não adivinha a disciplina.
        const studentContestNames = Array.from(
          new Set((examResult.data || []).map((row) => String(row.contest_name || "Concurso"))),
        );
        const norm = (text: string) =>
          text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("pt-BR")
            .replace(/\s+/g, " ")
            .trim();
        const careerMatches = (career: string) =>
          studentContestNames.some((name) => {
            const a = norm(name);
            const b = norm(career);
            return a === b || a.includes(b) || b.includes(a);
          });
        const rowsByItem = new Map<string, Array<Record<string, unknown>>>();
        for (const raw of officialRows) {
          const key = questionKey(
            String(raw["contest_name"] || "Concurso"),
            String(raw["exam_year"] || ""),
            Number(raw["item_number"] || 0),
          );
          rowsByItem.set(key, [...(rowsByItem.get(key) ?? []), raw]);
        }
        const resolvedOfficial: Array<Record<string, unknown>> = [];
        for (const rows of rowsByItem.values()) {
          const careers = new Set(rows.map((row) => String(row["career_name"] ?? "")));
          if (careers.size <= 1) resolvedOfficial.push(...rows);
          else
            resolvedOfficial.push(
              ...rows.filter((row) => careerMatches(String(row["career_name"] ?? ""))),
            );
        }
        const officialResult = { data: resolvedOfficial };

        // Notas de corte cadastradas por concurso/ano (complementar: sem elas não há plano de nota).
        const cutoffMap = new Map<string, number>();
        try {
          const refs = await supabase
            .from("contest_reference_info")
            .select("contest_name,contest_year,cutoff_score")
            .in("contest_name", studentContestNames);
          for (const ref of refs.data ?? [])
            if (ref.cutoff_score !== null)
              cutoffMap.set(`${ref.contest_name}__${ref.contest_year}`, Number(ref.cutoff_score));
        } catch (cutoffError) {
          console.warn("Não foi possível carregar as notas de corte", cutoffError);
        }
        const personalResult = await supabase
          .from("question_bank")
          .select(
            "contest_name,contest_year,item_number,subject,subtopic,question_text,official_answer,explanation,legal_basis,content_status",
          )
          .eq("user_id", session.user.id);

        const referenceMap = new Map<string, QuestionReference>();
        for (const raw of (officialResult.data || []) as Array<Record<string, unknown>>) {
          const contest = String(raw["contest_name"] || "Concurso");
          const year = String(raw["exam_year"] || "");
          const item = Number(raw["item_number"] || 0);
          referenceMap.set(questionKey(contest, year, item), {
            key: questionKey(contest, year, item),
            contest,
            year,
            item,
            subject: canonicalSubject(String(raw["subject"] || "Disciplina não classificada")),
            subtopic: null,
            text: String(raw["question_text"] || "Enunciado indisponível"),
            answer: raw["official_answer"] ? String(raw["official_answer"]) : null,
            explanation: String(
              raw["review_note"] ||
                "Gabarito confirmado na fonte oficial. A explicação pedagógica detalhada ainda está em revisão editorial.",
            ),
            legalBasis: Array.isArray(raw["legal_basis"]) ? raw["legal_basis"] : [],
          });
        }
        for (const raw of (personalResult.data || []) as Array<Record<string, unknown>>) {
          const status = String(raw["content_status"] || "active");
          if (["obsolete", "revoked", "archived"].includes(status)) continue;
          const contest = String(raw["contest_name"] || "Concurso");
          const year = String(raw["contest_year"] || "");
          const item = Number(raw["item_number"] || 0);
          referenceMap.set(questionKey(contest, year, item), {
            key: questionKey(contest, year, item),
            contest,
            year,
            item,
            subject: canonicalSubject(String(raw["subject"] || "Disciplina não classificada")),
            subtopic: raw["subtopic"] ? String(raw["subtopic"]) : null,
            text: String(raw["question_text"] || "Enunciado indisponível"),
            answer: raw["official_answer"] ? String(raw["official_answer"]) : null,
            explanation: String(raw["explanation"] || "Explicação em revisão editorial."),
            legalBasis: Array.isArray(raw["legal_basis"]) ? raw["legal_basis"] : [],
          });
        }

        // Disciplinas cobradas em cada concurso segundo o edital cadastrado. É complementar: se não
        // houver edital, a tela segue só com as questões.
        const syllabusMap = new Map<string, string[]>();
        try {
          const editions = await supabase
            .from("syllabus_editions")
            .select("id,contest_name,contest_year")
            .in("contest_name", contestNames);
          const editionRows = editions.error ? [] : (editions.data ?? []);
          if (editionRows.length) {
            const keyByEdition = new Map(
              editionRows.map((edition) => [
                edition.id,
                `${canonicalContest(edition.contest_name)}__${edition.contest_year}`,
              ]),
            );
            const editionIds = editionRows.map((edition) => edition.id);
            for (let from = 0; ; from += PAGE) {
              const { data: chunk, error: topicError } = await supabase
                .from("syllabus_topics")
                .select("edition_id,discipline")
                .in("edition_id", editionIds)
                .order("edition_id")
                .order("discipline")
                .range(from, from + PAGE - 1);
              if (topicError) break;
              for (const topic of chunk ?? []) {
                const key = keyByEdition.get(topic.edition_id);
                if (!key) continue;
                const discipline = canonicalSubject(topic.discipline);
                const list = syllabusMap.get(key) ?? [];
                if (discipline && !list.includes(discipline)) list.push(discipline);
                syllabusMap.set(key, list);
              }
              if ((chunk ?? []).length < PAGE) break;
            }
          }
        } catch (syllabusError) {
          console.warn("Não foi possível carregar as disciplinas do edital", syllabusError);
        }

        if (!active) return;
        setRows((examResult.data || []) as ExamRow[]);
        setQuestions(referenceMap);
        setSyllabus(syllabusMap);
        setCutoffs(cutoffMap);
      } catch (loadError) {
        console.error("Falha ao carregar inteligência de provas", loadError);
        if (active)
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível carregar suas provas.",
          );
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const groups = React.useMemo(() => {
    const grouped = new Map<string, ExamGroup>();
    for (const row of rows) {
      const contest = String(row["contest_name"] || "Concurso");
      const year = String(row["contest_year"] || "—");
      const key = `${contest}__${year}`;
      const current = grouped.get(key) || {
        key,
        contest,
        canonicalContest: canonicalContest(contest),
        year,
        board: String(row.exam_board || "Banca não informada"),
        correct: 0,
        wrong: 0,
        blank: 0,
        score: 0,
        analysis: null,
        pages: [],
      };
      if (row.storage_path?.startsWith("manual-entry/")) {
        current.correct = Number(row.correct_count ?? 0);
        current.wrong = Number(row.wrong_count ?? 0);
        current.blank = Number(row.blank_count ?? 0);
        current.score = Number(row.score_net ?? row.score_raw ?? 0);
        current.analysis = row.extracted_data;
      } else {
        current.pages.push(row);
      }
      grouped.set(key, current);
    }
    // Páginas enviadas pela tela têm "pagina-NN" no caminho; mantém a ordem do caderno.
    const pageNumber = (path: string) => Number(/pagina-(\d+)/.exec(path)?.[1] ?? 0);
    for (const group of grouped.values())
      group.pages.sort((a, b) => pageNumber(a.storage_path) - pageNumber(b.storage_path));
    return Array.from(grouped.values()).sort((a, b) =>
      a.year.localeCompare(b.year, "pt-BR", { numeric: true }),
    );
  }, [rows]);

  React.useEffect(() => {
    if (!groups.length) return;
    // Link vindo de outra tela (?career=): abre a edição mais recente daquele concurso.
    const requested = career
      ? [...groups].reverse().find((group) => {
          const expected = career.toLocaleLowerCase("pt-BR");
          const actual = group.contest.toLocaleLowerCase("pt-BR");
          return actual.includes(expected) || expected.includes(actual);
        })?.key
      : null;
    setSelectedExam(
      (current) =>
        requested ||
        (current === ALL_CONTESTS || groups.some((group) => group.key === current)
          ? current
          : ALL_CONTESTS),
    );
  }, [groups, career]);

  const overallReport = React.useMemo(
    () => computeSubjectReport(groups, questions, syllabus),
    [groups, questions, syllabus],
  );

  if (loading) return <LoadingState />;
  if (error)
    return (
      <EmptyState title="Não foi possível carregar suas provas" description={error}>
        <Button onClick={() => setReloadKey((value) => value + 1)}>
          <RefreshCw className="mr-2 h-4 w-4" /> Tentar novamente
        </Button>
      </EmptyState>
    );
  if (!groups.length)
    return (
      <EmptyState
        title="Você ainda não cadastrou nenhuma prova"
        description="Cadastre os concursos que você já fez para ver a linha do tempo, o Raio-X por disciplina e o seu rendimento."
      >
        <AddExamCard
          user={user}
          contestSuggestions={[]}
          onChanged={() => setReloadKey((v) => v + 1)}
        />
      </EmptyState>
    );

  const attempts = groups.filter((group) => group.correct + group.wrong + group.blank > 0);
  const contests = Array.from(new Set(groups.map((group) => group.contest)));
  const allSelected = selectedExam === ALL_CONTESTS;
  const selectedGroups = allSelected
    ? groups
    : groups.filter((group) => group.key === selectedExam);
  const selectedGroup = allSelected ? null : (selectedGroups[0] ?? null);
  // Métricas, plano de ação e destaques seguem a prova escolhida na linha do tempo (ou todas).
  const scopeAttempts = selectedGroups.filter(
    (group) => group.correct + group.wrong + group.blank > 0,
  );
  const scopeLabel = selectedGroup
    ? `${selectedGroup.contest} — ${selectedGroup.year}`
    : "Todos os concursos";
  const totalCorrect = scopeAttempts.reduce((sum, group) => sum + group.correct, 0);
  const totalWrong = scopeAttempts.reduce((sum, group) => sum + group.wrong, 0);
  const totalBlank = scopeAttempts.reduce((sum, group) => sum + group.blank, 0);
  const totalItems = totalCorrect + totalWrong + totalBlank;
  const responseAccuracy = percent(totalCorrect, totalCorrect + totalWrong);
  const omissionRate = percent(totalBlank, totalItems);
  const bestAttempt = [...scopeAttempts].sort((a, b) => examAccuracy(b) - examAccuracy(a))[0];
  // Evolução = variação de aproveitamento (acertos ÷ respondidas) em pontos percentuais.
  // Uma prova escolhida: contra a edição anterior do MESMO concurso. Todas: média das últimas
  // provas contra a média das primeiras (comparar só a primeira com a última misturava bancas).
  const yearOf = (group: ExamGroup) => Number(group.year) || 0;
  const average = (list: ExamGroup[]) =>
    list.reduce((sum, group) => sum + examAccuracy(group), 0) / list.length;
  const evolutionInfo: { value: string; detail: string; delta: number | null } = (() => {
    if (selectedGroup) {
      const previous = attempts
        .filter(
          (group) =>
            group.contest === selectedGroup.contest && yearOf(group) < yearOf(selectedGroup),
        )
        .at(-1);
      if (!previous || !scopeAttempts.length)
        return { value: "—", detail: "Primeira prova deste concurso", delta: null };
      const delta = examAccuracy(selectedGroup) - examAccuracy(previous);
      return {
        value: `${delta >= 0 ? "+" : ""}${delta} p.p.`,
        detail: `${previous.year} → ${selectedGroup.year}, mesmo concurso`,
        delta,
      };
    }
    const count = Math.min(3, Math.floor(scopeAttempts.length / 2));
    if (count < 1) return { value: "—", detail: "Precisa de pelo menos 2 provas", delta: null };
    const delta = Math.round(
      average(scopeAttempts.slice(-count)) - average(scopeAttempts.slice(0, count)),
    );
    return {
      value: `${delta >= 0 ? "+" : ""}${delta} p.p.`,
      detail: `média das últimas ${count} × primeiras ${count} provas`,
      delta,
    };
  })();
  const scopeReport = computeSubjectReport(selectedGroups, questions, syllabus);
  const scopeSubjects = scopeReport.metrics.filter(
    (metric) => metric.subject !== UNCLASSIFIED && metric.total > 0,
  );
  const weakest = scopeSubjects[0];
  const strongest = [...scopeSubjects].sort(
    (a, b) => b.accuracy - a.accuracy || b.total - a.total,
  )[0];

  const toggleExam = async (group: ExamGroup) => {
    if (openExam === group.key) {
      setOpenExam(null);
      return;
    }
    setOpenExam(group.key);
    const missing = group.pages.filter((page) => !pageUrls[page.id]);
    if (!missing.length) return;
    const signed = await Promise.all(
      missing.map((page) =>
        supabase.storage.from("student-exams").createSignedUrl(page.storage_path, 3600),
      ),
    );
    setPageUrls((current) => {
      const next = { ...current };
      missing.forEach((page, index) => {
        const url = signed[index]?.data?.signedUrl;
        if (url) next[page.id] = url;
      });
      return next;
    });
  };

  // Raio-X de TODAS as edições de cada concurso (ex.: PF 2014+2018+2021+2025) e plano até o corte.
  const families = contests
    .map((contest) => {
      const list = groups.filter((group) => group.contest === contest);
      const report = computeSubjectReport(list, questions, syllabus);
      const weakItems: WeakItem[] = list.flatMap((group) =>
        Object.entries(group.analysis?.items || {}).flatMap(([itemText, verdict]) => {
          if (verdict !== "errada" && verdict !== "branco") return [];
          const reference = questions.get(
            questionKey(group.canonicalContest, group.year, Number(itemText)),
          );
          return [
            {
              edition: group.year,
              item: Number(itemText),
              verdict,
              subject: reference?.subject ?? UNCLASSIFIED,
            },
          ];
        }),
      );
      const editions: PlanEdition[] = list.map((group) => ({
        key: group.key,
        year: group.year,
        correct: group.correct,
        wrong: group.wrong,
        blank: group.blank,
        net: group.score
          ? group.score
          : group.correct + group.wrong > 0
            ? group.correct - group.wrong
            : null,
        cutoff: cutoffs.get(`${group.contest}__${group.year}`) ?? null,
        hasItems: Object.keys(group.analysis?.items || {}).length > 0,
      }));
      return {
        contest,
        editions,
        subjects: report.metrics,
        weakItems,
        cebraspe: list.some((group) => /cebraspe/i.test(group.board)),
        hasCutoff: editions.some((edition) => edition.cutoff !== null),
      };
    })
    .filter((family) => family.editions.some((e) => e.correct + e.wrong + e.blank > 0))
    .sort(
      (a, b) =>
        Number(b.hasCutoff) - Number(a.hasCutoff) || a.contest.localeCompare(b.contest, "pt-BR"),
    );

  const selectExam = (key: string) => {
    if (key === selectedExam) {
      setSelectedExam(ALL_CONTESTS);
      return;
    }
    setSelectedExam(key);
    const group = groups.find((item) => item.key === key);
    if (group && openExam !== group.key) void toggleExam(group);
  };

  return (
    <div className="space-y-7 pb-10">
      <Hero attempts={attempts.length} years={new Set(attempts.map((item) => item.year)).size} />
      <Timeline groups={groups} selectedKey={selectedExam} onSelect={selectExam} />
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-primary">Desempenho por prova</h2>
            <p className="text-sm text-muted-foreground">
              Clique em uma prova da linha do tempo: as métricas, as disciplinas e a correção abaixo
              passam a mostrar só ela, com cada edição separada (PF 2014, 2018, 2021…).
            </p>
          </div>
          <AddExamCard
            user={user}
            contestSuggestions={contests}
            onChanged={() => setReloadKey((v) => v + 1)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-background px-4 py-3 text-sm">
          <span className="text-muted-foreground">Mostrando:</span>
          <strong className="min-w-0 break-words">{scopeLabel}</strong>
          {allSelected ? (
            <span className="text-xs text-muted-foreground">
              Clique em uma prova da linha do tempo para ver só ela.
            </span>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedExam(ALL_CONTESTS)}
            >
              Ver todos os concursos
            </Button>
          )}
        </div>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={Target}
            label="Precisão ao responder"
            value={`${responseAccuracy}%`}
            detail={`${scopeLabel}: ${totalCorrect} acertos em ${totalCorrect + totalWrong} respondidas`}
            tone="emerald"
          />
          <MetricCard
            icon={CircleSlash2}
            label="Taxa de omissão"
            value={`${omissionRate}%`}
            detail={`${totalBlank} itens deixados em branco`}
            tone={omissionRate > 20 ? "rose" : "amber"}
          />
          <MetricCard
            icon={Award}
            label="Melhor desempenho"
            value={`${bestAttempt ? examAccuracy(bestAttempt) : 0}%`}
            detail={bestAttempt ? `${bestAttempt.contest} ${bestAttempt.year}` : "Sem dados"}
            tone="navy"
          />
          <MetricCard
            icon={(evolutionInfo.delta ?? 0) >= 0 ? TrendingUp : TrendingDown}
            label="Evolução"
            value={evolutionInfo.value}
            detail={evolutionInfo.detail}
            tone={(evolutionInfo.delta ?? 0) >= 0 ? "emerald" : "rose"}
          />
        </section>
        {selectedGroups.map((group) => (
          <ContestCard
            key={group.key}
            group={group}
            references={questions}
            syllabus={syllabus}
            canUpload={canAdd}
            open={openExam === group.key}
            pageUrls={pageUrls}
            onToggle={() => void toggleExam(group)}
            onUploaded={() => {
              setOpenExam(null);
              setReloadKey((value) => value + 1);
            }}
          />
        ))}
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-primary">Raio-X e plano por concurso</h2>
          <p className="text-sm text-muted-foreground">
            Todas as edições de cada concurso juntas (por exemplo PF 2014, 2018, 2021 e 2025), com o
            mapa dos seus erros e questões em branco e o caminho até a nota de corte.
          </p>
        </div>
        {families.map((family) => (
          <ContestPlanCard
            key={family.contest}
            contest={family.contest}
            editions={family.editions}
            subjects={family.subjects}
            weakItems={family.weakItems}
            cebraspe={family.cebraspe}
            unclassifiedLabel={UNCLASSIFIED}
            defaultOpen={family.hasCutoff}
          />
        ))}
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <DisciplineAnalysis
          report={overallReport}
          title="Raio-X geral — todos os concursos"
          scope={`Soma de ${attempts.length} prova(s) já realizadas, com todas as disciplinas cobradas em cada concurso.`}
        />
        <ActionPlan
          weakest={weakest}
          strongest={strongest}
          omissionRate={omissionRate}
          wrong={totalWrong}
          blank={totalBlank}
        />
      </section>
    </div>
  );
}

function AddExamCard({
  user,
  contestSuggestions,
  onChanged,
}: {
  user: {
    id: string;
    subscription_tier: Parameters<typeof canRegisterExams>[0];
    role?: string;
  } | null;
  contestSuggestions: string[];
  onChanged: () => void;
}) {
  if (!user || user.id === "demo-user") return null;
  if (canRegisterExams(user.subscription_tier, user.role))
    return (
      <AddExamDialog
        userId={user.id}
        contestSuggestions={contestSuggestions}
        onChanged={onChanged}
      />
    );
  return (
    <div className="max-w-sm rounded-2xl border border-dashed bg-background p-4 text-sm">
      <p className="font-black">Cadastre e analise as suas provas</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Este recurso faz parte do plano Premium: registrar os concursos que você já fez, enviar as
        fotos e acompanhar o seu rendimento por disciplina.
      </p>
      <Link
        to="/dashboard/profile"
        className="mt-2 inline-block text-xs font-bold text-emerald-700 hover:underline"
      >
        Ver os planos →
      </Link>
    </div>
  );
}

function Hero({ attempts, years }: { attempts: number; years: number }) {
  return (
    <section className="page-hero page-hero--lg" data-hero="exam-hall">
      <div className="page-hero__row">
        <div className="page-hero__text">
          <span className="hero-chip">Inteligência de desempenho</span>
          <h1>
            Minha trajetória <em>em concursos</em>
          </h1>
          <p className="page-hero__desc">
            Uma leitura objetiva do seu histórico, das falhas recorrentes e do próximo passo de
            estudo.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <div className="hero-stat min-w-[120px]">
            <span>Provas analisadas</span>
            <strong className="tabular">{attempts}</strong>
          </div>
          <div className="hero-stat min-w-[120px]">
            <span>Anos no histórico</span>
            <strong className="tabular">{years}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline({
  groups,
  selectedKey,
  onSelect,
}: {
  groups: ExamGroup[];
  selectedKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-emerald-600" /> Linha do tempo geral
        </CardTitle>
        <CardDescription>
          Aproveitamento nas questões respondidas. Clique em uma prova para ver só ela; clique de
          novo para voltar a todas. Compare concursos com cautela porque bancas e critérios mudam.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto pb-6">
        <div className="flex min-w-max items-start gap-0">
          {groups.map((group, index) => {
            const graded = group.correct + group.wrong + group.blank > 0;
            const accuracy = graded ? examAccuracy(group) : null;
            const previousGraded = groups
              .slice(0, index)
              .reverse()
              .find((item) => item.correct + item.wrong + item.blank > 0);
            const delta =
              accuracy === null || !previousGraded ? null : accuracy - examAccuracy(previousGraded);
            return (
              <button
                key={group.key}
                type="button"
                onClick={() => onSelect(group.key)}
                aria-pressed={selectedKey === group.key}
                className={cn(
                  "relative w-44 rounded-2xl px-3 pb-3 text-center transition",
                  selectedKey === group.key
                    ? "bg-emerald-50 ring-2 ring-emerald-400 dark:bg-emerald-950/30"
                    : "hover:bg-slate-50 dark:hover:bg-slate-900/30",
                )}
              >
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-200" />
                <div
                  className={cn(
                    "relative mx-auto flex h-11 w-11 items-center justify-center rounded-full border-4 border-background text-xs font-black text-white",
                    accuracy === null
                      ? "bg-slate-400"
                      : accuracy >= 70
                        ? "bg-emerald-500"
                        : accuracy >= 50
                          ? "bg-amber-500"
                          : "bg-rose-500",
                  )}
                >
                  {accuracy === null ? "—" : `${accuracy}%`}
                </div>
                <p className="mt-3 text-sm font-black">{group.year}</p>
                <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                  {group.contest}
                </p>
                {accuracy === null && (
                  <Badge variant="outline" className="mt-2 text-[10px] text-slate-600">
                    sem resultado
                  </Badge>
                )}
                {delta !== null && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "mt-2 text-[10px]",
                      delta >= 0 ? "text-emerald-700" : "text-rose-700",
                    )}
                  >
                    {delta >= 0 ? "+" : ""}
                    {delta} p.p.
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function DisciplineAnalysis({
  report,
  title,
  scope,
  embedded = false,
}: {
  report: SubjectReport;
  title: string;
  scope: string;
  embedded?: boolean;
}) {
  const ranked = [...report.metrics]
    .sort(
      (a, b) =>
        Number(a.subject === UNCLASSIFIED) - Number(b.subject === UNCLASSIFIED) ||
        b.total - a.total,
    )
    .slice(0, embedded ? undefined : 20);
  const unmapped = report.counted - report.mapped;
  const text = (value: number, neutral: boolean) =>
    neutral
      ? "text-slate-500"
      : value >= 70
        ? "text-emerald-600"
        : value >= 50
          ? "text-amber-600"
          : "text-rose-600";
  const bar = (value: number, neutral: boolean) =>
    neutral
      ? "bg-slate-400"
      : value >= 70
        ? "bg-emerald-500"
        : value >= 50
          ? "bg-amber-500"
          : "bg-rose-500";
  const body = (
    <div className="space-y-4">
      {ranked.length ? (
        ranked.map((item) => {
          const neutral = item.subject === UNCLASSIFIED;
          return (
            <div key={item.subject}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="truncate font-bold" title={item.subject}>
                  {item.subject}
                </span>
                <span
                  className={cn("font-black", text(item.accuracy, neutral || item.total === 0))}
                >
                  {item.total === 0 ? "—" : `${item.accuracy}%`}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={cn("h-full rounded-full", bar(item.accuracy, neutral))}
                  style={{ width: `${item.total === 0 ? 0 : item.accuracy}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {item.total === 0
                  ? "Cobrada nesta prova, sem itens seus classificados"
                  : `${item.correct} acertos · ${item.wrong} erros · ${item.blank} em branco`}
                {item.catalog ? ` · ${item.catalog} questão(ões) cadastrada(s)` : ""}
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-muted-foreground">Nenhum item respondido nesta seleção.</p>
      )}
      {report.counted > 0 && unmapped > 0 && (
        <p className="text-[11px] text-muted-foreground">
          {report.mapped} de {report.counted} itens têm disciplina cadastrada. Os outros {unmapped}{" "}
          aparecem em "{UNCLASSIFIED}" e não entram nos pontos fracos.
        </p>
      )}
    </div>
  );
  if (embedded)
    return (
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-black">
          <Brain className="h-4 w-4 text-violet-600" /> {title}
        </h3>
        <p className="text-xs text-muted-foreground">{scope}</p>
        {body}
      </div>
    );
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-violet-600" /> {title}
        </CardTitle>
        <CardDescription>{scope}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}

function ActionPlan({
  weakest,
  strongest,
  omissionRate,
  wrong,
  blank,
}: {
  weakest?: SubjectMetric | undefined;
  strongest?: SubjectMetric | undefined;
  omissionRate: number;
  wrong: number;
  blank: number;
}) {
  const steps = [
    weakest
      ? `Prioridade 1: revisar ${weakest.subject}, atualmente com ${weakest.accuracy}% de precisão em ${weakest.total} itens mapeados.`
      : "Prioridade 1: concluir a classificação editorial das disciplinas.",
    omissionRate > 20
      ? `Treinar decisão de resposta: ${blank} itens ficaram em branco (${omissionRate}%). Separe desconhecimento de falta de tempo.`
      : `A taxa de omissão está controlada em ${omissionRate}%; preserve a seleção cuidadosa de respostas.`,
    `Criar um ciclo de revisão dos ${wrong} erros: conceito → exemplo resolvido → nova questão em 24 horas e novamente em 7 dias.`,
  ];
  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm dark:from-emerald-950/30 dark:to-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-amber-500" /> Plano de ação orientado por dados
        </CardTitle>
        <CardDescription>
          {strongest
            ? `Ponto forte atual: ${strongest.subject} (${strongest.accuracy}%).`
            : "Plano atualizado conforme novas provas forem analisadas."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex gap-3 rounded-xl border border-emerald-100 bg-white/80 p-3 text-sm dark:bg-slate-950/30"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
              {index + 1}
            </span>
            <p className="leading-relaxed">{step}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ContestCard({
  group,
  references,
  syllabus,
  canUpload,
  open,
  pageUrls,
  onToggle,
  onUploaded,
}: {
  group: ExamGroup;
  references: Map<string, QuestionReference>;
  syllabus: Map<string, string[]>;
  canUpload: boolean;
  open: boolean;
  pageUrls: Record<string, string>;
  onToggle: () => void;
  onUploaded: () => void;
}) {
  const answered = group.correct + group.wrong;
  const accuracy = percent(group.correct, answered);
  const reviewItems = Object.entries(group.analysis?.items || {})
    .flatMap(([itemText, verdict]) => {
      if (verdict !== "errada" && verdict !== "branco") return [];
      const reference = references.get(
        questionKey(group.canonicalContest, group.year, Number(itemText)),
      );
      return reference ? [{ reference, verdict }] : [];
    })
    .slice(0, 12);
  return (
    <Card
      className={cn(
        "overflow-hidden border-slate-200 shadow-sm",
        open && "border-emerald-300 shadow-md",
      )}
    >
      <button type="button" className="w-full text-left" onClick={onToggle}>
        <CardHeader className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/30">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
                {group.contest} — {group.year}
                <Badge className="bg-emerald-600">Analisada</Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {group.board} · {group.pages.length} páginas · {answered + group.blank} itens
                contabilizados
              </CardDescription>
            </div>
            <div className="grid grid-cols-4 items-center gap-5 text-center">
              <MiniMetric label="Acertos" value={group.correct} className="text-emerald-600" />
              <MiniMetric label="Erros" value={group.wrong} className="text-rose-600" />
              <MiniMetric label="Saldo" value={group.score} className="text-primary" />
              <div className="flex items-center gap-2">
                <MiniMetric label="Precisão" value={`${accuracy}%`} className="text-amber-600" />
                <ChevronDown className={cn("h-5 w-5 transition-transform", open && "rotate-180")} />
              </div>
            </div>
          </div>
        </CardHeader>
      </button>
      {open && (
        <CardContent className="space-y-6 border-t bg-slate-50/50 pt-5 dark:bg-slate-950/20">
          <div className="grid gap-3 sm:grid-cols-4">
            <ScoreBox
              icon={CheckCircle2}
              label="Corretas"
              value={group.correct}
              tone="text-emerald-600"
            />
            <ScoreBox icon={XCircle} label="Erradas" value={group.wrong} tone="text-rose-600" />
            <ScoreBox
              icon={CircleSlash2}
              label="Em branco"
              value={group.blank}
              tone="text-amber-600"
            />
            <ScoreBox icon={Target} label="Pontuação" value={group.score} tone="text-primary" />
          </div>
          {Object.keys(group.analysis?.items || {}).length === 0 &&
          group.correct + group.wrong > 0 ? (
            <div className="rounded-xl border border-dashed bg-background p-4 text-sm text-muted-foreground">
              Esta prova foi cadastrada pelo resultado oficial ({group.correct} acertos,{" "}
              {group.wrong} erros, nota {group.score}) e não tem detalhamento por questão, por isso
              não há Raio-X por disciplina desta edição. Ela entra no Raio-X do concurso (todas as
              edições) pelos totais e pela nota de corte, e as outras edições mostram as
              disciplinas.
            </div>
          ) : (
            <DisciplineAnalysis
              embedded

              report={computeSubjectReport([group], references, syllabus)}

              title="Raio-X desta prova"

              scope={`Todas as disciplinas cobradas em ${group.contest} — ${group.year}, só desta prova.`}
            />
          )}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-black">
              <BookOpenCheck className="h-4 w-4" /> Como corrigir erros e omissões
            </h3>
            {reviewItems.length ? (
              <div className="space-y-3">
                {reviewItems.map(({ reference, verdict }) => (
                  <div key={reference.key} className="rounded-2xl border bg-background p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">Item {reference.item}</Badge>
                      <Badge className={verdict === "errada" ? "bg-rose-600" : "bg-amber-500"}>
                        {verdict === "errada" ? "Erro" : "Em branco"}
                      </Badge>
                      <span className="text-xs font-bold text-muted-foreground">
                        {reference.subject}
                        {reference.subtopic ? ` · ${reference.subtopic}` : ""}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">{reference.text}</p>
                    <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                      <strong>Resposta oficial: {reference.answer || "—"}.</strong>{" "}
                      {reference.explanation}
                    </div>
                    {reference.legalBasis.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {reference.legalBasis
                          .filter((basis) => basis.url)
                          .map((basis, index) => (
                            <a
                              key={`${reference.key}-${index}`}
                              href={basisHref(basis)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
                            >
                              {basis.title || basis.norma || "Fonte oficial"}
                              {basis.artigo ? ` · ${basis.artigo}` : ""}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                <AlertTriangle className="mr-2 inline h-4 w-4" />
                As questões desta prova ainda não foram liberadas pela revisão editorial. Os números
                permanecem disponíveis, mas nenhuma orientação não verificada será exibida.
              </div>
            )}
          </div>
          {canUpload && (
            <ExamPhotoUploader
              contest={group.contest}
              year={group.year}
              board={group.board}
              existingPages={group.pages.length}
              onUploaded={onUploaded}
            />
          )}
          {group.pages.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black">
                <ImageIcon className="h-4 w-4" /> Caderno digitalizado
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {group.pages.map((page, index) => (
                  <a
                    key={page.id}
                    href={pageUrls[page.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-[3/4] overflow-hidden rounded-xl border bg-muted shadow-sm transition hover:-translate-y-1 hover:ring-2 hover:ring-emerald-400"
                  >
                    {pageUrls[page.id] ? (
                      <img
                        src={pageUrls[page.id]}
                        alt={`Página ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                        carregando…
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-5 text-[10px] font-bold text-white">
                      Página {index + 1}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function examAccuracy(group: ExamGroup) {
  return percent(group.correct, group.correct + group.wrong);
}
function ScoreBox({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <Icon className={cn("mb-2 h-5 w-5", tone)} />
      <p className={cn("text-2xl font-black", tone)}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
  tone: "navy" | "emerald" | "amber" | "rose";
}) {
  const styles = {
    navy: "bg-ink text-white",
    emerald: "bg-emerald-600 text-white",
    amber: "bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    rose: "bg-rose-50 text-rose-950 dark:bg-rose-950/30 dark:text-rose-100",
  };
  return (
    <Card className={cn("border-0 shadow-sm", styles[tone])}>
      <CardContent className="pt-5">
        <Icon className="mb-4 h-5 w-5 opacity-80" />
        <p className="text-xs font-bold uppercase tracking-wide opacity-70">{label}</p>
        <p className="mt-1 text-3xl font-black">{value}</p>
        <p className="mt-2 text-xs opacity-70">{detail}</p>
      </CardContent>
    </Card>
  );
}
function MiniMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: number | string;
  className?: string;
}) {
  return (
    <div>
      <p className={cn("text-lg font-black", className)}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
function LoadingState() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-3 text-center">
      <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
      <p className="text-sm font-bold">Calculando seu histórico de desempenho…</p>
      <p className="text-xs text-muted-foreground">
        Provas, disciplinas e questões estão sendo organizadas.
      </p>
    </div>
  );
}
function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-4 text-center">
      <FileStack className="h-14 w-14 text-muted-foreground/30" />
      <h2 className="text-xl font-black">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
function ExamRouteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <EmptyState
      title="O painel encontrou uma inconsistência"
      description="Seus dados continuam protegidos. Recarregue para reconstruir os indicadores."
    >
      <Button onClick={reset}>
        <RefreshCw className="mr-2 h-4 w-4" /> Recarregar painel
      </Button>
    </EmptyState>
  );
}
