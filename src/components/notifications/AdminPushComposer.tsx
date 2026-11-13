import { useState, type FormEvent } from "react";
import { BellRing, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AdminPushComposer() {
  const [title, setTitle] = useState("Comunicado importante");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("/dashboard");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-push-notification", {
        body: { type: "announcement", title: title.trim(), body: body.trim(), url: url.trim() || "/dashboard" },
      });
      if (error) throw error;
      toast.success(`Comunicado enviado para ${data?.sent ?? 0} dispositivo(s).`);
      setBody("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível enviar o comunicado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5 text-primary" /> Comunicados aos alunos</CardTitle>
        <CardDescription>Envie avisos curtos sobre editais, inscrições, datas de prova e informações oficiais. Somente dispositivos que autorizaram comunicados receberão a mensagem.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="max-w-2xl space-y-4" onSubmit={submit}>
          <div className="space-y-2"><Label htmlFor="push-title">Título</Label><Input id="push-title" maxLength={55} value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor="push-body">Mensagem breve</Label><Textarea id="push-body" maxLength={180} rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Ex.: Inscrições abertas até 20 de dezembro." required /><p className="text-xs text-muted-foreground text-right">{body.length}/180</p></div>
          <div className="space-y-2"><Label htmlFor="push-url">Destino ao tocar</Label><Input id="push-url" maxLength={200} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/dashboard" /></div>
          <Button type="submit" disabled={busy || !body.trim()}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}Enviar comunicado</Button>
        </form>
      </CardContent>
    </Card>
  );
}
