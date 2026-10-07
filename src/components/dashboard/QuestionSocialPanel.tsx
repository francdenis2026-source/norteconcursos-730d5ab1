// Mostra, logo abaixo da questão e só depois que o aluno responde: a
// estatística profissional de quantos acertaram/erraram em % e os
// comentários de outros alunos logados, com campo pra ele comentar também.
import * as React from "react";
import { BarChart3, Loader2, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Stats = { total: number; correct: number; wrong: number; accuracy: number };
type Comment = {
  id: string;
  body: string;
  created_at: string;
  display_name: string;
  is_me: boolean;
};

export function QuestionSocialPanel({
  questionId,
  questionSource,
}: {
  questionId: string;
  questionSource: string;
}) {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [draft, setDraft] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const load = React.useCallback(async () => {
    const [statsRes, commentsRes] = await Promise.all([
      supabase
        .rpc("get_question_training_stats", {
          p_question_id: questionId,
          p_question_source: questionSource,
        })
        .maybeSingle(),
      supabase.rpc("get_question_comments", {
        p_question_id: questionId,
        p_question_source: questionSource,
      }),
    ]);
    setStats((statsRes.data as Stats | null) ?? null);
    setComments((commentsRes.data as Comment[] | null) ?? []);
    setLoading(false);
  }, [questionId, questionSource]);

  React.useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  const submitComment = async () => {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("not-authenticated");
      const { error } = await supabase.from("question_comments").insert({
        user_id: auth.user.id,
        question_id: questionId,
        question_source: questionSource,
        body,
      });
      if (error) throw error;
      setDraft("");
      await load();
      toast.success("Comentário publicado.");
    } catch {
      toast.error("Não foi possível publicar o comentário. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-4 space-y-3 rounded-xl border bg-muted/30 p-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-primary" />
        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          Desempenho dos candidatos nesta questão
        </p>
      </div>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : !stats || stats.total === 0 ? (
        <p className="text-sm text-muted-foreground">
          Você é o primeiro a responder esta questão no Treinador.
        </p>
      ) : (
        <div className="space-y-1.5">
          <div className="flex h-2.5 overflow-hidden rounded-full bg-rose-200 dark:bg-rose-950/40">
            <div className="h-full bg-emerald-500" style={{ width: `${stats.accuracy}%` }} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              {stats.accuracy}% acertaram
            </span>
            <span className="text-muted-foreground">
              {stats.correct} certas · {stats.wrong} erradas · {stats.total} respostas no total
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <MessageSquare className="h-4 w-4 text-primary" />
        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          Comentários de quem já estudou esta questão
        </p>
      </div>
      {!loading && comments.length === 0 && (
        <p className="text-sm text-muted-foreground">Seja o primeiro a comentar.</p>
      )}
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={
              comment.is_me
                ? "rounded-lg border border-primary/30 bg-primary/5 p-2.5 text-sm"
                : "rounded-lg border bg-background p-2.5 text-sm"
            }
          >
            <p className="mb-1 text-[11px] font-bold text-muted-foreground">
              {comment.display_name}
              {comment.is_me ? " (você)" : ""}
            </p>
            <p className="whitespace-pre-line leading-5">{comment.body}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Compartilhe como você raciocinou ou uma dúvida sobre a questão…"
          maxLength={2000}
          className="min-h-[44px] bg-background"
        />
        <Button
          size="icon"
          disabled={!draft.trim() || sending}
          onClick={submitComment}
          aria-label="Enviar comentário"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
