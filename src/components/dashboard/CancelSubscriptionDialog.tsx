import * as React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { CANCEL_PHRASE, phraseMatches, type CancellationRecord } from "@/lib/cancellation";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { dateStyle: "long", timeZone: "America/Rio_Branco" });

/** Confirmação em duas etapas: o aluno lê o que acontece e digita a frase. O plano segue até o vencimento. */
export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  planName,
  endsAt,
  onDone,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  endsAt: string | null | undefined;
  onDone: (record: CancellationRecord, emailStatus: string) => void;
}) {
  const [phrase, setPhrase] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    if (!open) {
      setPhrase("");
      setReason("");
    }
  }, [open]);

  const submit = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.rpc("request_subscription_cancellation", {
        p_phrase: phrase,
        p_reason: reason || null,
      });
      if (error) throw error;
      const record = data as CancellationRecord;
      let emailStatus = "falhou";
      try {
        const { data: auth } = await supabase.auth.getSession();
        const res = await fetch("/api/cancellation-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.session?.access_token ?? ""}`,
          },
          body: JSON.stringify({ id: record.id }),
        });
        emailStatus = ((await res.json()) as { status?: string }).status ?? "falhou";
      } catch {
        /* o cancelamento já está gravado; o e-mail pode ser reenviado depois */
      }
      onDone(record, emailStatus);
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível cancelar agora.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" /> Cancelar o plano {planName}?
        </DialogTitle>
        <DialogDescription asChild>
          <div className="space-y-2 text-sm">
            <p>
              Você <strong>continua com o plano {planName}</strong>
              {endsAt ? (
                <>
                  {" "}
                  até <strong>{fmtDate(endsAt)}</strong>
                </>
              ) : (
                " até o fim do período já pago"
              )}
              . Depois dessa data a conta volta ao plano Gratuito.
            </p>
            <p>
              Enquanto o cancelamento estiver agendado, não é possível renovar: a renovação só abre
              depois que o período terminar. Você receberá um recibo para consultar e imprimir.
            </p>
          </div>
        </DialogDescription>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="cancel-reason">Motivo (opcional)</Label>
            <Input
              id="cancel-reason"
              value={reason}
              maxLength={200}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Conte o que podemos melhorar"
              disabled={busy}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cancel-phrase">
              Para confirmar, digite <strong>{CANCEL_PHRASE}</strong>
            </Label>
            <Input
              id="cancel-phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value.toUpperCase())}
              autoComplete="off"
              autoCapitalize="characters"
              disabled={busy}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Manter plano
          </Button>
          <Button variant="destructive" onClick={submit} disabled={busy || !phraseMatches(phrase)}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Confirmar cancelamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
