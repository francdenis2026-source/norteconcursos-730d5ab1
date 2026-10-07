import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, ChevronDown, FileText, Layers, Loader2, Scale } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { canonicalCareerName, canonicalSubject } from "@/lib/subjects";
import {
  analyzeEditals,
  TIER_LABEL,
  TIER_STYLE,
  type TopicStat,
  type TopicTier,
} from "@/lib/editalRadar";
import { loadRadarData, type RadarData } from "@/lib/radarData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/exam-panorama")({ component: ExamPanoramaPage });

interface Row {
  contest_name: string;
  exam_year: number;
  career_name: string;
  exam_board: string;
  subject: string;
  items: number;
  scope: "federal" | "estadual" | "municipal";
  family: string;
}

const SCOPES: [string, string][] = [
  ["all", "Todas as esferas"],
  ["federal", "Federal (nacional)"],
  ["estadual", "Estadual / Distrital"],
  ["municipal", "Municipal"],
];
const SCOPE_LABEL: Record<string, string> = {
  federal: "Federal",
  estadual: "Estadual/Distrital",
  municipal: "Municipal",
};

const examKey = (r: Row) => `${r.contest_name}|${r.exam_year}|${r.career_name}`;

function Pills<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: [T, string][];
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={label}>
      {options.map(([id, text]) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
            value === id
              ? "border-primary bg-primary text-primary-foreground"
              : "hover:border-primary/50",
          )}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

function ExamPanoramaPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [rows, setRows] = React.useState<Row[] | null>(null);
  const [error, setError] = React.useState(false);
  const [scope, setScope] = React.useState("all");
  const [family, setFamily] = React.useState("all");
  const [role, setRole] = React.useState("all");
  const [radarData, setRadarData] = React.useState<RadarData | null>(null);
  const real = !!user && user.id !== "demo-user";

  React.useEffect(() => {
    if (authLoading || !real) return;
    void supabase.rpc("exam_panorama").then(({ data, error: e }) => {
      if (e) setError(true);
      else
        setRows(
          ((data as Row[]) ?? []).map((r) => ({
            ...r,
            subject: canonicalSubject(r.subject),
            career_name: canonicalCareerName(r.career_name),
          })),
        );
    });
  }, [authLoading, real]);

  React.useEffect(() => {
    if (authLoading || !real) return;
    let active = true;
    // Mesma base do Raio-X dos editais: cruza o que foi perguntado com o que o edital listava,
    // para abrir cada disciplina em assuntos com chance de cair (clicáveis, levando às explicações).
    loadRadarData()
      .then((result) => active && setRadarData(result))
      .catch((loadError) => console.error("Falha ao carregar assuntos do edital", loadError));
    return () => {
      active = false;
    };
  }, [authLoading, real]);

  const families = React.useMemo(() => {
    const set = new Set(
      (rows ?? []).filter((r) => scope === "all" || r.scope === scope).map((r) => r.family),
    );
    return ["all", ...[...set].sort()];
  }, [rows, scope]);

  const roles = React.useMemo(() => {
    const set = new Set(
      (rows ?? [])
        .filter(
          (r) =>
            (scope === "all" || r.scope === scope) && (family === "all" || r.family === family),
        )
        .map((r) => r.career_name),
    );
    return ["all", ...[...set].sort((a, b) => a.localeCompare(b, "pt-BR"))];
  }, [rows, scope, family]);

  // Esfera e carreira/órgão de cada (concurso, cargo, ano) já vêm prontas da exam_panorama; reaproveita
  // aqui para filtrar as mesmas questões, agora com o assunto do edital, sem duplicar a classificação.
  const examMeta = React.useMemo(() => {
    const map = new Map<string, { scope: string; family: string }>();
    for (const r of rows ?? [])
      map.set(`${r.contest_name}|${r.career_name}|${r.exam_year}`, {
        scope: r.scope,
        family: r.family,
      });
    return map;
  }, [rows]);

  const topicResult = React.useMemo(() => {
    if (!radarData) return null;
    // Canonicaliza o cargo dos dois lados (questões e edições) antes de cruzar, senão uma prova
    // cujo career_name tinha a grafia antiga "perde" o vínculo com o próprio edital dela.
    const selected = radarData.questions
      .map((q) => ({ ...q, career: canonicalCareerName(q.career) }))
      .filter((q) => {
        const meta = examMeta.get(`${q.contest}|${q.career}|${q.year}`);
        if (!meta) return false;
        if (scope !== "all" && meta.scope !== scope) return false;
        if (family !== "all" && meta.family !== family) return false;
        if (role !== "all" && q.career !== role) return false;
        return true;
      });
    const editions = radarData.editions.map((e) => ({
      ...e,
      role: canonicalCareerName(e.role),
    }));
    return analyzeEditals(selected, radarData.topics, editions);
  }, [radarData, examMeta, scope, family, role]);

  const view = React.useMemo(() => {
    const list = (rows ?? []).filter(
      (r) =>
        (scope === "all" || r.scope === scope) &&
        (family === "all" || r.family === family) &&
        (role === "all" || r.career_name === role),
    );
    const exams = new Map<string, { row: Row; items: number; subjects: Set<string> }>();
    const subjects = new Map<string, { items: number; exams: Set<string> }>();
    for (const r of list) {
      const e = exams.get(examKey(r)) ?? { row: r, items: 0, subjects: new Set<string>() };
      e.items += r.items;
      e.subjects.add(r.subject);
      exams.set(examKey(r), e);
      const s = subjects.get(r.subject) ?? { items: 0, exams: new Set<string>() };
      s.items += r.items;
      s.exams.add(examKey(r));
      subjects.set(r.subject, s);
    }
    const total = list.reduce((n, r) => n + r.items, 0);
    const n = exams.size;
    const table = [...subjects.entries()]
      .map(([name, s]) => ({
        name,
        items: s.items,
        share: total ? (100 * s.items) / total : 0,
        inExams: s.exams.size,
        avg: s.items / Math.max(1, s.exams.size),
      }))
      .sort((a, b) => b.items - a.items);
    return {
      total,
      n,
      boards: new Set(list.map((r) => r.exam_board)).size,
      table,
      exams: [...exams.values()].sort(
        (a, b) =>
          b.row.exam_year - a.row.exam_year || a.row.contest_name.localeCompare(b.row.contest_name),
      ),
    };
  }, [rows, scope, family, role]);

  if (authLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  if (!real) {
    return (
      <LockedState
        image="exam-hall"
        title={
          <>
            Panorama das <em>provas</em>
          </>
        }
        description="Entre na sua conta para ver o que mais caiu nas provas já realizadas, por esfera e por carreira."
      />
    );
  }

  const top = view.table.slice(0, 3);
  const always = view.table.filter((s) => view.n > 1 && s.inExams === view.n).map((s) => s.name);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="exam-hall"
        size="sm"
        kicker="Objetivo"
        icon={BarChart3}
        title={
          <>
            Panorama das <em>provas</em>
          </>
        }
        description="O que mais caiu nas provas oficiais já analisadas pela plataforma. A mesma informação para todos os alunos, como norte para escolher o que estudar."
      />

      <Card>
        <CardContent className="space-y-3 pt-6">
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Esfera
            </p>
            <Pills
              label="Esfera"
              value={scope}
              options={SCOPES}
              onChange={(v) => {
                setScope(v);
                setFamily("all");
                setRole("all");
              }}
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Carreira / órgão
            </p>
            <Pills
              label="Carreira"
              value={family}
              onChange={(v) => {
                setFamily(v);
                setRole("all");
              }}
              options={families.map((f) => [f, f === "all" ? "Todas" : f] as [string, string])}
            />
          </div>
          {roles.length > 2 && (
            <div className="space-y-1.5">
              {/* career_name já vem normalizado por canonicalCareerName() (src/lib/subjects.ts),
                  que junta grafias diferentes do MESMO cargo entre estados/bancas (ex.: nome da
                  instituição gravado por engano no lugar do cargo; "Delegado de Polícia" x
                  "Delegado de Polícia Civil" x "Delegado de Polícia Substituto"; "Oficial
                  Investigador" x "Oficial Investigador de Polícia"). Cargos com nomes parecidos
                  mas que são funções realmente distintas continuam separados. */}
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Cargo
              </p>
              <Pills
                label="Cargo"
                value={role}
                onChange={setRole}
                options={roles.map((r) => [r, r === "all" ? "Todos" : r] as [string, string])}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          Não foi possível carregar o panorama. Confirme que a migration exam_panorama foi aplicada
          no banco.
        </p>
      )}
      {!rows && !error && (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
        </div>
      )}

      {rows && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              [FileText, "Provas analisadas", view.n],
              [Layers, "Itens analisados", view.total.toLocaleString("pt-BR")],
              [Scale, "Bancas", view.boards],
              [BarChart3, "Disciplinas", view.table.length],
            ].map(([Icon, label, value]) => {
              const I = Icon as typeof FileText;
              return (
                <div key={String(label)} className="rounded-xl border bg-card p-4">
                  <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    <I className="h-3.5 w-3.5" /> {String(label)}
                  </p>
                  <p className="mt-1 text-2xl font-black tabular-nums">{String(value)}</p>
                </div>
              );
            })}
          </div>

          {view.n === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                Nenhuma prova analisada para este filtro ainda.
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-primary/40">
                <CardHeader>
                  <CardTitle className="text-base">Leitura rápida</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 text-sm">
                  <p>
                    Nas {view.n} {view.n === 1 ? "prova analisada" : "provas analisadas"} deste
                    filtro, as disciplinas que mais pesam são{" "}
                    {top.map((t, i) => (
                      <span key={t.name}>
                        <strong>{t.name}</strong> ({t.share.toFixed(0)}%)
                        {i < top.length - 2 ? ", " : i === top.length - 2 ? " e " : ""}
                      </span>
                    ))}
                    .
                  </p>
                  {always.length > 0 && (
                    <p>
                      Aparecem em <strong>todas</strong> as provas: {always.join(", ")}.
                    </p>
                  )}
                  {view.n < 3 && (
                    <p className="text-muted-foreground">
                      Poucas provas neste filtro: a leitura ainda é preliminar.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peso de cada disciplina</CardTitle>
                  <CardDescription>
                    Parcela dos itens, em quantas provas aparece e média de itens por prova. Clique
                    numa disciplina para ver os assuntos do edital que mais caem dentro dela, com
                    explicações e vídeo-aulas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {view.table.map((s) => (
                    <SubjectRow
                      key={s.name}
                      name={s.name}
                      share={s.share}
                      items={s.items}
                      inExams={s.inExams}
                      avg={s.avg}
                      maxShare={view.table[0]?.share || 1}
                      topics={(topicResult?.topics ?? []).filter((t) => t.discipline === s.name)}
                      examsWithSyllabus={topicResult?.examsWithSyllabus ?? 0}
                    />
                  ))}
                  {(["Conhecimentos Específicos"].some((generic) =>
                    view.table.some((s) => s.name === generic),
                  ) ||
                    view.table.some((s) => /^Conhecimentos do cargo de/i.test(s.name))) && (
                    <p className="pt-1 text-xs text-muted-foreground">
                      "Conhecimentos Específicos" e "Conhecimentos do cargo de…" não são matérias
                      isoladas: é como o próprio edital nomeia o bloco de questões específicas
                      daquele cargo. Use o filtro de <strong>Cargo</strong> acima para abrir só esse
                      bloco.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provas analisadas</CardTitle>
                  <CardDescription>Os concursos que compõem este panorama.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead className="text-xs text-muted-foreground">
                        <tr>
                          <th className="py-1.5 pr-3">Concurso</th>
                          <th className="pr-3">Cargo</th>
                          <th className="pr-3">Ano</th>
                          <th className="pr-3">Banca</th>
                          <th className="pr-3">Esfera</th>
                          <th className="text-right">Itens</th>
                        </tr>
                      </thead>
                      <tbody>
                        {view.exams.map((e) => (
                          <tr key={examKey(e.row)} className="border-t align-top">
                            <td className="py-2 pr-3 font-medium">{e.row.contest_name}</td>
                            <td className="pr-3 text-muted-foreground">{e.row.career_name}</td>
                            <td className="pr-3 tabular-nums">{e.row.exam_year}</td>
                            <td className="pr-3">{e.row.exam_board}</td>
                            <td className="pr-3">
                              <Badge variant="outline">{SCOPE_LABEL[e.row.scope]}</Badge>
                            </td>
                            <td className="text-right tabular-nums">{e.items}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <p className="text-xs text-muted-foreground">
            Base: provas oficiais cadastradas na plataforma (itens ativos e em revisão). Nem toda
            prova de cada órgão está cadastrada; o panorama cresce conforme novas provas são
            analisadas. É uma leitura de incidência para orientar o estudo.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard/study-coach">Montar meu plano de estudos</Link>
          </Button>
        </>
      )}
    </div>
  );
}

function SubjectRow({
  name,
  share,
  items,
  inExams,
  avg,
  maxShare,
  topics,
  examsWithSyllabus,
}: {
  name: string;
  share: number;
  items: number;
  inExams: number;
  avg: number;
  maxShare: number;
  topics: TopicStat[];
  examsWithSyllabus: number;
}) {
  const [open, setOpen] = React.useState(false);
  const ordered = [...topics].sort((a, b) => b.score - a.score || b.questions - a.questions);
  const tiersPresent = (["alta", "media", "baixa", "nunca", "amostra"] as TopicTier[]).filter(
    (tier) => ordered.some((t) => t.tier === tier),
  );

  return (
    <div className="rounded-xl border border-transparent transition-colors hover:border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full space-y-1 rounded-xl px-2 py-1.5 text-left"
        aria-expanded={open}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
          <span className="flex min-w-0 items-center gap-1.5 font-semibold">
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                open && "rotate-180",
              )}
              aria-hidden
            />
            {name}
          </span>
          <span className="tabular-nums text-muted-foreground">
            {share.toFixed(1)}% · {items} itens · em {inExams} provas · ~{avg.toFixed(0)} por prova
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.min(100, (share / maxShare) * 100)}%` }}
          />
        </div>
        {topics.length > 0 && (
          <p className="text-[11px] font-semibold text-primary">
            {open ? "ocultar" : "ver"} {topics.length} assunto(s) do edital →
          </p>
        )}
      </button>
      {open && (
        <div className="space-y-4 border-t px-2 pb-2 pt-3">
          {topics.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              {examsWithSyllabus === 0
                ? "Ainda não há edital cadastrado para esta seleção."
                : "Sem edital cadastrado para esta disciplina nesta seleção."}
            </p>
          ) : (
            tiersPresent.map((tier) => (
              <div key={tier}>
                <Badge className={cn("border-0 text-[10px]", TIER_STYLE[tier])}>
                  {TIER_LABEL[tier]} · {ordered.filter((t) => t.tier === tier).length}
                </Badge>
                <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
                  {ordered
                    .filter((t) => t.tier === tier)
                    .map((topic) => (
                      <TopicItem key={topic.key} topic={topic} />
                    ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function TopicItem({ topic }: { topic: TopicStat }) {
  return (
    <li className="flex flex-wrap items-start justify-between gap-2 py-2.5 text-sm">
      <div className="min-w-0">
        <p className="font-semibold leading-snug">{topic.text}</p>
        <p className="text-[11px] text-muted-foreground">
          caiu em {topic.examsAsked} de {topic.examsInEdital} prova(s) com esse tópico no edital ·{" "}
          {topic.questions} questão(ões)
          {topic.lastYear ? ` · última vez em ${topic.lastYear}` : ""}
        </p>
        {topic.topicIds[0] && (
          <Link
            to="/dashboard/edital/$topicId"
            params={{ topicId: topic.topicIds[0] }}
            className="mt-1 inline-block text-xs font-bold text-primary hover:underline"
          >
            Ver resumo, explicações e vídeos deste assunto →
          </Link>
        )}
      </div>
      <span className="shrink-0 text-xs font-black text-primary">
        {Math.round(topic.score * 100)}%
      </span>
    </li>
  );
}
