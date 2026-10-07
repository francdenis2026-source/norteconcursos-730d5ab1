// Botão do aluno pra avisar o administrador que uma questão está errada
// (enunciado, gabarito, alternativa, digitação) — vai para a fila de revisão
// em /dashboard/admin-question-reports.
import * as React from "react";
import { Flag, Loader2 } from "lucide-react";
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
import type { Question } from "@/lib/questionFormat";
import { toast } from "sonner";

export function ReportQuestionButton({ question }: { question: Question }) {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [sending, setSending] = React.useState(false);

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
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => setOpen(true)}
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
    </>
  );
}
