import { questionCode, questionIdentity } from "@/lib/questionIdentity";
// Botão do aluno pra avisar o administrador que uma questão está errada
// (enunciado, gabarito, alternativa, digitação) — vai para a fila de revisão
// em /dashboard/admin-question-reports.
import * as React from "react";
import { AlertTriangle, Flag, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isLikelyIncompleteQuestion, type Question } from "@/lib/questionFormat";
import { toast } from "sonner";

const INCOMPLETE_HINT =
  "O enunciado parece estar faltando um trecho (ex.: o termo sublinhado/grifado citado no comando não aparece no texto).";

export function ReportQuestionButton({ question }: { question: Question }) {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [sending, setSending] = React.useState(false);
  // Questões como "substitua o termo sublinhado" só fazem sentido com a marcação preservada;
  // quando a transcrição perdeu essa marcação, sinalizamos em vez de adivinhar o trecho.
  const incomplete = isLikelyIncompleteQuestion(question.text);

  // Sem a tabela física de origem não há como o admin corrigir na fonte.
  if (!question.table) return null;

  const submit = async () => {
    const trimmed = reason.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("not-authenticated");
      const { error } = await supabase.from("question_reports").insert({
        question_id: question.id,
        question_source: question.source,
        question_table: question.table,
        reported_by: auth.user.id,
        reason: trimmed,
        question_snapshot: {
          // Código permanente: o mesmo que o aluno vê e copia na tela da questão.
          code: questionCode(question),
          identity: questionIdentity(question),
          contest: question.contest,
          board: question.board,
          career: question.career,
          year: question.year,
          subject: question.subject,
          text: question.text,
          answer: question.answer,
        },
      });
      if (error) throw error;
      toast.success("Questão reportada. O administrador vai revisar.");
      setOpen(false);
      setReason("");
    } catch {
      toast.error("Não foi possível enviar o relato. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      {incomplete && (
        <span
          className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300"
          title={INCOMPLETE_HINT}
        >
          <AlertTriangle className="h-3 w-3" aria-hidden="true" /> Enunciado incompleto
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        className={incomplete ? "text-amber-700 hover:text-amber-800 dark:text-amber-300" : "text-muted-foreground hover:text-destructive"}
        onClick={() => {
          if (incomplete) setReason((current) => current || INCOMPLETE_HINT);
          setOpen(true);
        }}
      >
        <Flag className="mr-1.5 h-3.5 w-3.5" /> Reportar questão
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reportar problema nesta questão</DialogTitle>
            <DialogDescription>
              Descreva o que está errado — enunciado, gabarito, alternativa, digitação. Um
              administrador vai revisar direto na fonte.
              <span className="mt-2 block break-all font-mono text-xs">
                Questão {questionCode(question)}
              </span>
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Ex.: o gabarito marcado não corresponde à explicação…"
            maxLength={1000}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={sending}>
              Cancelar
            </Button>
            <Button onClick={() => void submit()} disabled={!reason.trim() || sending}>
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar relato"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
