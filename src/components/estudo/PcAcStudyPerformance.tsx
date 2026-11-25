import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PC_AC_STUDY_SAVED_EVENT } from "@/lib/pcAcStudyBridge";

type StudyRow = {
  question_key: string;
  question_text: string;
  topic_id: string;
  topic_name: string | null;
  mode: string;
  is_correct: boolean;
  answered_at: string;
};

const pct = (ok: number, total: number) => (total ? Math.round((ok / total) * 100) : 0);

function barTone(p: number) {
  if (p >= 75) return "bg-emerald-600";
  if (p >= 60) return "bg-amber-500";
  return "bg-rose-600";
}

export function PcAcStudyPerformance() {
  const [rows, setRows] = useState<StudyRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data: auth } = await supabase.auth.getUser();
    const userId = auth.user?.id;
    if (!userId) {
      setRows([]);
      return;
    }
    const { data, error: loadError } = await supabase
      .from("pcac_study_responses" as never)
      .select("question_key,question_text,topic_id,topic_name,mode,is_correct,answered_at")
      .eq("user_id", userId)
      .order("answered_at", { ascending: false })
      .limit(5000);
    if (loadError) {
      setError("Não foi possível carregar o desempenho agora. Suas respostas ficam guardadas e serão enviadas depois.");
      return;
    }
    setError(null);
    setRows(((data ?? []) as unknown as StudyRow[]).slice());
  }, []);

  useEffect(() => {
    void load();
    window.addEventListener(PC_AC_STUDY_SAVED_EVENT, load);
    return () => window.removeEventListener(PC_AC_STUDY_SAVED_EVENT, load);
  }, [load]);

  const stats = useMemo(() => {
    const list = rows ?? [];
    const ok = list.filter((r) => r.is_correct).length;

    const topicMap = new Map<string, { name: string; total: number; ok: number }>();
    for (const r of list) {
      const cur = topicMap.get(r.topic_id) ?? { name: r.topic_name || r.topic_id, total: 0, ok: 0 };
      cur.total += 1;
      if (r.is_correct) cur.ok += 1;
      topicMap.set(r.topic_id, cur);
    }
    const topics = [...topicMap.values()].sort(
      (a, b) => pct(a.ok, a.total) - pct(b.ok, b.total) || b.total - a.total,
    );

    const missMap = new Map<string, { text: string; topic: string; wrong: number; total: number }>();
    for (const r of list) {
      const cur = missMap.get(r.question_key) ?? { text: r.question_text, topic: r.topic_name || r.topic_id, wrong: 0, total: 0 };
      cur.total += 1;
      if (!r.is_correct) cur.wrong += 1;
      if (!cur.text && r.question_text) cur.text = r.question_text;
      missMap.set(r.question_key, cur);
    }
    const missed = [...missMap.values()]
      .filter((m) => m.wrong > 0)
      .sort((a, b) => b.wrong - a.wrong || b.total - a.total)
      .slice(0, 8);

    const dayMap = new Map<string, { total: number; ok: number }>();
    for (const r of list) {
      const day = r.answered_at.slice(0, 10);
      const cur = dayMap.get(day) ?? { total: 0, ok: 0 };
      cur.total += 1;
      if (r.is_correct) cur.ok += 1;
      dayMap.set(day, cur);
    }
    const days = [...dayMap.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-14);

    const simulados = list.filter((r) => r.mode === "simulado").length;
    return { total: list.length, ok, wrong: list.length - ok, topics, missed, days, simulados };
  }, [rows]);

  return (
    <section className="mt-6 space-y-4 pb-10" aria-label="Desempenho na Área de estudo">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-lg font-semibold">Desempenho na Área de estudo</h2>
        <p className="text-xs text-muted-foreground">
          Estudo e simulado da área ficam registrados aqui. Não somam no contador do treinador oficial.
        </p>
      </div>

      {error ? <p className="rounded-xl border p-4 text-sm text-rose-700">{error}</p> : null}

      {rows === null ? (
        <p className="text-sm text-muted-foreground">Carregando desempenho…</p>
      ) : stats.total === 0 ? (
        <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          Nenhuma resposta registrada ainda. Responda questões na área acima e os gráficos aparecem aqui.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Respostas" value={String(stats.total)} />
            <Stat label="Acertos" value={`${pct(stats.ok, stats.total)}%`} sub={`${stats.ok} certas`} />
            <Stat label="Erros" value={String(stats.wrong)} />
            <Stat label="Em simulado" value={String(stats.simulados)} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold">Acerto por assunto (mais fraco primeiro)</h3>
              <ul className="space-y-3">
                {stats.topics.map((t) => {
                  const p = pct(t.ok, t.total);
                  return (
                    <li key={t.name}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>{t.name}</span>
                        <span className="text-muted-foreground">
                          {p}% · {t.ok}/{t.total}
                        </span>
                      </div>
                      <div className="h-2 rounded bg-muted">
                        <div className={`h-2 rounded ${barTone(p)}`} style={{ width: `${p}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold">Respostas por dia (últimos 14 dias)</h3>
              <div className="flex h-40 items-end gap-1">
                {stats.days.map(([day, d]) => {
                  const p = pct(d.ok, d.total);
                  return (
                    <div key={day} className="flex h-full flex-1 flex-col justify-end" title={`${day}: ${d.ok}/${d.total} certas`}>
                      <div className={`w-full rounded-t ${barTone(p)}`} style={{ height: `${Math.max(6, (d.total / Math.max(...stats.days.map(([, x]) => x.total))) * 100)}%` }} />
                      <span className="mt-1 text-center text-[10px] text-muted-foreground">{day.slice(8, 10)}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Altura = quantidade de respostas. Cor = acerto do dia.</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Questões em que mais errou</h3>
            {stats.missed.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum erro registrado até agora.</p>
            ) : (
              <ol className="space-y-2 text-sm">
                {stats.missed.map((m, i) => (
                  <li key={`${m.topic}-${i}`} className="flex gap-3">
                    <span className="font-semibold text-rose-700">{m.wrong}×</span>
                    <span>
                      <span className="text-xs text-muted-foreground">{m.topic}</span>
                      <br />
                      {m.text ? `${m.text.slice(0, 140)}${m.text.length > 140 ? "…" : ""}` : "Questão sem texto registrado"}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {sub ? <div className="text-xs text-muted-foreground">{sub}</div> : null}
    </div>
  );
}
