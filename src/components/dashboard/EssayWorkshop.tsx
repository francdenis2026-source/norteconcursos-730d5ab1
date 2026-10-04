import React from "react";
import { toast } from "sonner";
import { Bot, FilePlus2, Save, Trash2, CheckSquare, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { confirmDialog } from "@/lib/confirm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ESSAY_CHECKLIST, ESSAY_MODELS, ESSAY_SKELETON } from "@/lib/essayModels";

const MAX_LINES = 30;
const LINE_PX = 32;

interface SavedEssay {
  id: string;
  title: string;
  body: string;
  updated_at: string;
}

function EssayModels() {
  return (
    <div className="space-y-4">
      {ESSAY_MODELS.map((m) => (
        <Card key={m.id}>
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              {m.tipo}
            </Badge>
            <CardTitle className="text-lg">{m.tema}</CardTitle>
            <CardDescription>{m.estudoDeCaso}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {m.paragrafos.map((p) => (
              <div key={p.papel}>
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">{p.papel}</p>
                <p className="leading-relaxed text-sm">{p.texto}</p>
              </div>
            ))}
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                Por que funciona
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {m.porQueFunciona.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
      <p className="text-xs text-muted-foreground">
        Textos autorais da plataforma, apenas como apoio de estrutura. Não são gabaritos oficiais de
        banca.
      </p>
    </div>
  );
}

function EssayGuide() {
  const [done, setDone] = React.useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setDone((d) => {
      const n = new Set(d);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Esqueleto da redação</CardTitle>
          <CardDescription>
            Estrutura para 30 linhas: introdução, dois desenvolvimentos e proposta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ESSAY_SKELETON.map((s, i) => (
            <div key={s.titulo}>
              <p className="font-bold text-sm">
                {i + 1}. {s.titulo}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                {s.itens.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Checklist de revisão</CardTitle>
          <CardDescription>Marque antes de passar a limpo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {ESSAY_CHECKLIST.map((c, i) => {
            const on = done.has(i);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start gap-2 text-left text-sm"
              >
                {on ? (
                  <CheckSquare className="h-4 w-4 mt-0.5 text-emerald-500" />
                ) : (
                  <Square className="h-4 w-4 mt-0.5 text-muted-foreground" />
                )}
                <span className={on ? "line-through text-muted-foreground" : ""}>{c}</span>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function EssayNotebook({ userId }: { userId: string }) {
  const [list, setList] = React.useState<SavedEssay[]>([]);
  const [id, setId] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [lines, setLines] = React.useState(0);
  const [saving, setSaving] = React.useState(false);
  const taRef = React.useRef<HTMLTextAreaElement>(null);

  const load = React.useCallback(async () => {
    const { data } = await supabase
      .from("user_essays")
      .select("id,title,body,updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    setList((data as SavedEssay[]) || []);
  }, [userId]);

  React.useEffect(() => {
    load();
  }, [load]);

  // O textarea cresce com o texto; linhas = altura / altura da pauta.
  React.useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, LINE_PX * MAX_LINES)}px`;
    setLines(body ? Math.ceil(el.scrollHeight / LINE_PX) : 0);
  }, [body]);

  const words = body.trim() ? body.trim().split(/\s+/).length : 0;
  const reset = () => {
    setId(null);
    setTitle("");
    setBody("");
  };

  const save = async () => {
    if (!body.trim()) {
      toast.error("Escreva algo antes de salvar.");
      return;
    }
    setSaving(true);
    const payload = { title: title.trim() || "Sem título", body, user_id: userId };
    const { data, error } = id
      ? await supabase.from("user_essays").update(payload).eq("id", id).select("id").single()
      : await supabase.from("user_essays").insert(payload).select("id").single();
    setSaving(false);
    if (error || !data) {
      toast.error("Não foi possível salvar. Tente novamente.");
      return;
    }
    setId(data.id);
    toast.success("Redação salva.");
    load();
  };

  const remove = async (e: SavedEssay) => {
    if (
      !(await confirmDialog({
        title: "Excluir redação?",
        message: `"${e.title}" será apagada. Essa ação não pode ser desfeita.`,
        confirmLabel: "Excluir",
      }))
    )
      return;
    const { error } = await supabase.from("user_essays").delete().eq("id", e.id);
    if (error) {
      toast.error("Não foi possível excluir.");
      return;
    }
    if (id === e.id) reset();
    toast.success("Redação excluída.");
    load();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <Card>
        <CardHeader className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tema ou título da redação"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className={lines > MAX_LINES ? "font-bold text-rose-600" : ""}>
              {lines} / {MAX_LINES} linhas (estimativa) · {words} palavras
            </span>
            <span>{id ? "Editando redação salva" : "Nova redação"}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md border bg-[#fffef8] dark:bg-zinc-900 overflow-hidden">
            <Textarea
              ref={taRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escreva sua redação aqui, como na folha de texto definitivo…"
              spellCheck
              style={{
                lineHeight: `${LINE_PX}px`,
                minHeight: LINE_PX * MAX_LINES,
                backgroundImage: `repeating-linear-gradient(transparent, transparent ${LINE_PX - 1}px, rgb(148 163 184 / 0.45) ${LINE_PX - 1}px, rgb(148 163 184 / 0.45) ${LINE_PX}px)`,
                backgroundAttachment: "local",
                paddingTop: 0,
                paddingBottom: 0,
              }}
              className="w-full resize-none border-0 bg-transparent px-4 text-base shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={save} disabled={saving}>
              <Save className="h-4 w-4" /> {id ? "Salvar alterações" : "Salvar redação"}
            </Button>
            <Button variant="outline" onClick={reset}>
              <FilePlus2 className="h-4 w-4" /> Nova
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-base">Minhas redações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {list.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhuma redação salva ainda.</p>
          )}
          {list.map((e) => (
            <div
              key={e.id}
              className={`flex items-center gap-2 rounded-lg border p-2 ${e.id === id ? "border-primary" : ""}`}
            >
              <button
                type="button"
                className="flex-1 text-left min-w-0"
                onClick={() => {
                  setId(e.id);
                  setTitle(e.title);
                  setBody(e.body);
                }}
              >
                <p className="truncate text-sm font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(e.updated_at).toLocaleDateString("pt-BR")}
                </p>
              </button>
              <Button
                size="icon"
                variant="ghost"
                aria-label={`Excluir ${e.title}`}
                onClick={() => remove(e)}
              >
                <Trash2 className="h-4 w-4 text-rose-500" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function EssayAiAssistant() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 flex-wrap">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle>Assistente de correção com IA</CardTitle>
          <Badge variant="secondary">Em breve</Badge>
        </div>
        <CardDescription>
          Receberá sua redação e devolverá nota estimada, aderência aos tópicos, erros de gramática
          e sugestões de melhoria.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button disabled className="w-full sm:w-auto">
          Corrigir minha redação com IA
        </Button>
      </CardContent>
    </Card>
  );
}

export function EssayTabs({ userId, imported }: { userId: string; imported: React.ReactNode }) {
  return (
    <Tabs defaultValue="caderno" className="space-y-4">
      <TabsList className="flex-wrap h-auto">
        <TabsTrigger value="caderno">Caderno (30 linhas)</TabsTrigger>
        <TabsTrigger value="guia">Guia e esqueleto</TabsTrigger>
        <TabsTrigger value="modelos">Modelos</TabsTrigger>
        <TabsTrigger value="ia">
          Correção com IA{" "}
          <Badge variant="secondary" className="ml-1.5">
            Em breve
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="provas">Discursivas de provas</TabsTrigger>
      </TabsList>
      <TabsContent value="caderno">
        <EssayNotebook userId={userId} />
      </TabsContent>
      <TabsContent value="guia">
        <EssayGuide />
      </TabsContent>
      <TabsContent value="modelos">
        <EssayModels />
      </TabsContent>
      <TabsContent value="ia">
        <EssayAiAssistant />
      </TabsContent>
      <TabsContent value="provas">{imported}</TabsContent>
    </Tabs>
  );
}
