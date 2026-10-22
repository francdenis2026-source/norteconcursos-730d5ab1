import "@/styles/question-workspace.css";
import { PlanGate } from "@/components/dashboard/PlanGate";
import { useAuthStatus } from "@/hooks/useDashboard";
import { StudyLaterNotebook } from "@/components/dashboard/StudyLaterNotebook";
import { platformDate } from "@/lib/platformClock";
import { acreDate } from "@/lib/acreTime";
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  BookOpen,
  MoreVertical,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Printer,
} from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";
import { AiResolutionsSection } from "@/components/dashboard/AiResolutionsSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MockService } from "@/services/mockService";
import { Notebook, Question } from "@/types";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/notebooks")({
  component: () => (
    <PlanGate feature="notebooks" title="Cadernos de estudo">
      <NotebooksPage />
    </PlanGate>
  ),
});

function NotebooksPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const owner = user?.id && user.id !== "demo-user" ? user.id : null;
  const notebookStorageKey = owner ? `norte_notebooks:${owner}` : null;
  const [editor, setEditor] = useState<Notebook | null>(null);
  const [editorName, setEditorName] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorError, setEditorError] = useState("");
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "questions">("date");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setNotebooks([]);
    if (!owner || authLoading) return;
    void loadData();
  }, [owner, authLoading]);

  const loadData = async () => {
    setIsLoading(true);
    // Load Notebooks
    if (!notebookStorageKey) return;
    const storedNbs = localStorage.getItem(notebookStorageKey);
    if (storedNbs) {
      try {
        setNotebooks(JSON.parse(storedNbs));
      } catch {
        toast.error("Não foi possível ler os cadernos deste navegador.");
      }
    } else {
      setNotebooks([]);
    }

    // Load All Questions for searching context
    const questions = await MockService.getQuestions();
    setAllQuestions(questions);

    setIsLoading(false);
  };

  const openNotebook = (notebook?: Notebook) => {
    const item = notebook ?? {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      questionIds: [],
      createdAt: platformDate().toISOString(),
    };
    setEditor(item);
    setEditorName(item.name);
    setEditorDescription(item.description ?? "");
    setEditorError("");
  };
  const saveNotebook = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editor || !notebookStorageKey || !editorName.trim()) return;
    const saved = { ...editor, name: editorName.trim(), description: editorDescription.trim() };
    const updated = notebooks.some((item) => item.id === saved.id)
      ? notebooks.map((item) => (item.id === saved.id ? saved : item))
      : [...notebooks, saved];
    try {
      localStorage.setItem(notebookStorageKey, JSON.stringify(updated));
      setNotebooks(updated);
      setEditor(null);
      toast.success("Coleção salva neste navegador.");
    } catch {
      setEditorError("Não foi possível salvar neste navegador. Seus registros foram preservados.");
    }
  };

  const handleExportPDF = (notebook: Notebook) => {
    const escapePrint = (value: unknown) =>
      String(value ?? "").replace(
        /[&<>"']/g,
        (character) =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
      );
    toast.success(`Gerando PDF do caderno: ${notebook.name}`);

    // Create a temporary print stylesheet for cleaner PDF
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #print-section, #print-section * { visibility: visible; }
        #print-section { 
          position: absolute; 
          left: 0; 
          top: 0; 
          width: 100%;
          padding: 20px;
          color: black !important;
        }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    // Create printable content
    const notebookQuestions = allQuestions.filter((q) => notebook.questionIds.includes(q.id));
    const subjectsCount = notebookQuestions.reduce((acc: Record<string, number>, q) => {
      acc[q.subjectId] = (acc[q.subjectId] || 0) + 1;
      return acc;
    }, {});

    const printDiv = document.createElement("div");
    printDiv.id = "print-section";
    printDiv.innerHTML = `
      <div style="border-bottom: 2px solid #1e293b; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="font-size: 24px; font-bold; color: #1e293b;">${escapePrint(notebook.name)}</h1>
        <p style="color: #64748b;">${escapePrint(notebook.description)}</p>
        <p style="font-size: 12px;">Gerado em: ${acreDate().toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" })}</p>
      </div>
      
      <div style="margin-bottom: 30px; background: #f8fafc; padding: 15px; border-radius: 8px;">
        <h2 style="font-size: 18px; margin-bottom: 10px;">Resumo do Caderno</h2>
        <p>Total de Questões: <strong>${notebookQuestions.length}</strong></p>
        <ul style="font-size: 14px;">
          ${Object.entries(subjectsCount)
            .map(([subId, count]) => `<li>Assunto ${escapePrint(subId)}: ${count} questões</li>`)
            .join("")}
        </ul>
      </div>

      <div>
        ${notebookQuestions
          .map(
            (q, i) => `
          <div style="margin-bottom: 40px; page-break-inside: avoid; border-left: 4px solid #e2e8f0; padding-left: 15px;">
            <p style="font-weight: bold;">Questão ${i + 1} - ${escapePrint(q.difficulty)}</p>
            <div style="margin: 10px 0;">${escapePrint(q.text)}</div>
            <div style="margin-top: 10px; font-style: italic; font-size: 12px; color: #64748b;">
              Assunto: ${escapePrint(q.subjectId)} | Disciplina: ${escapePrint(q.disciplineId)}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
    document.body.appendChild(printDiv);

    setTimeout(() => {
      window.print();
      document.body.removeChild(printDiv);
      document.head.removeChild(style);
    }, 500);
  };

  const filteredNotebooks = notebooks
    .filter(
      (nb) =>
        nb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nb.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "questions") return b.questionIds.length - a.questionIds.length;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="question-workspace question-collections">
      <PageHero
        image="study-desk"
        kicker="Questões"
        icon={BookOpen}
        title={
          <>
            Coleções de <em>questões</em>
          </>
        }
        description="Organize suas questões em coleções e retome cada seleção quando precisar."
        actions={
          <Button onClick={() => openNotebook()} className="hero-btn-primary gap-2">
            <Plus className="h-4 w-4" /> Criar caderno
          </Button>
        }
      />

      {owner && <StudyLaterNotebook key={owner} userId={owner} />}

      <AiResolutionsSection />

      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou descrição…"
            aria-label="Buscar coleções"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 shrink-0">
                <Filter className="h-4 w-4" /> Ordenar:{" "}
                {sortBy === "date" ? "Recentes" : sortBy === "name" ? "Nome" : "Questões"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("date")}>Mais Recentes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>Nome (A-Z)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("questions")}>
                Qtd. de Questões
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge variant="secondary" className="hidden lg:block">
            {filteredNotebooks.length} cadernos
          </Badge>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredNotebooks.length === 0 ? (
        <Card className="border-dashed py-12 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-bold">Nenhum caderno encontrado</h3>
          <p className="text-sm text-muted-foreground max-w-[250px] mt-1">
            {searchTerm
              ? "Tente mudar os termos da busca."
              : "Crie cadernos para separar questões por temas ou concursos."}
          </p>
          {searchTerm && (
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => setSearchTerm("")}>
              Limpar Busca
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotebooks.map((nb) => (
            <Card
              key={nb.id}
              className="group shadow-sm transition-[border-color,box-shadow] hover:border-secondary/50 hover:shadow-md"
            >
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <CardTitle title={nb.name} className="text-sm line-clamp-2 break-words">
                      {nb.name}
                    </CardTitle>
                    {nb.description && (
                      <CardDescription className="text-xs line-clamp-1">
                        {nb.description}
                      </CardDescription>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-[44px] w-[44px] -mr-2"
                      aria-label={`Ações do caderno ${nb.name}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2" onClick={() => handleExportPDF(nb)}>
                      <Printer className="h-4 w-4" /> Imprimir / PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    {nb.questionIds.length} questões
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="min-h-11 text-xs text-secondary hover:text-secondary hover:bg-secondary/10"
                    onClick={() => openNotebook(nb)}
                  >
                    Editar coleção
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={editor !== null} onOpenChange={(open) => !open && setEditor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {notebooks.some((item) => item.id === editor?.id)
                ? "Editar coleção"
                : "Criar coleção"}
            </DialogTitle>
            <DialogDescription>
              Nome e descrição ficam salvos neste navegador. Questões guardadas no treinador
              aparecem em Estudar depois.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={saveNotebook} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collection-name">Nome da coleção</Label>
              <Input
                id="collection-name"
                required
                maxLength={100}
                value={editorName}
                onChange={(event) => setEditorName(event.target.value)}
                placeholder="Ex.: Revisão para a prova"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection-description">Descrição (opcional)</Label>
              <Input
                id="collection-description"
                maxLength={240}
                value={editorDescription}
                onChange={(event) => setEditorDescription(event.target.value)}
              />
            </div>
            {editorError && (
              <p role="alert" className="text-sm text-destructive">
                {editorError}
              </p>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditor(null)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!editorName.trim()}>
                Salvar coleção
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
