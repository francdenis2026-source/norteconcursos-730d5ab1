import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Settings,
  CreditCard,
  History as HistoryIcon,
  FileText,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MockService } from "@/services/mockService";
import { Contest, Question } from "@/types";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/dashboard/PageHero";
import { LibraryAdmin } from "@/components/library/LibraryAdmin";
import { EnrichmentAdmin } from "@/components/library/EnrichmentAdmin";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { confirmDialog } from "@/lib/confirm";
import { DatePicker } from "@/components/ui/date-picker";

interface AdminExamUploadRow {
  id: string;
  user_id: string;
  cpf: string | null;
  full_name: string | null;
  auth_email: string | null;
  contest_name: string | null;
  contest_year: string | null;
  exam_board: string | null;
  doc_type: string;
  uploaded_via: string;
  analysis_status: string;
  ai_extracted: Record<string, unknown> | null;
  file_name: string;
  storage_path: string;
  created_at: string;
}

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminPanel,
  head: () => ({
    meta: [
      { title: "Conteúdo da plataforma | Norte Concurso" },
      {
        name: "description",
        content:
          "Administração de concursos, questões, editais, biblioteca e provas do Norte Concurso.",
      },
      { property: "og:title", content: "Conteúdo da plataforma | Norte Concurso" },
      {
        property: "og:description",
        content: "Central administrativa de conteúdo e provas da plataforma.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

import { useAuthStatus } from "@/hooks/useDashboard";

function AdminPanel() {
  const { user, isAdmin, isLoading: isAuthLoading } = useAuthStatus();
  const [contests, setContests] = React.useState<Contest[]>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [auditLogs, setAuditLogs] = React.useState<
    {
      id: string;
      created_at: string;
      action: string;
      old_values: unknown;
      new_values: { reason?: string } | null;
      entity_type?: string | null;
      entity_id?: string | null;
      admin?: { full_name?: string; email?: string };
    }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  // States for Edit Modal
  const [editingContest, setEditingContest] = React.useState<Contest | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Real Supabase data (not MockService): every uploaded exam document,
  // joined to the owning profile's CPF/email, so a misrouted upload
  // (wrong account/session) can be spotted and relinked from here.
  const [examUploads, setExamUploads] = React.useState<AdminExamUploadRow[]>([]);
  const [examUploadsLoading, setExamUploadsLoading] = React.useState(true);
  const [examUploadsError, setExamUploadsError] = React.useState<string | null>(null);
  const [examSearch, setExamSearch] = React.useState("");
  const [relinkTargetId, setRelinkTargetId] = React.useState<string | null>(null);
  const [relinkCpf, setRelinkCpf] = React.useState("");
  const [relinkContestName, setRelinkContestName] = React.useState("");
  const [relinkContestYear, setRelinkContestYear] = React.useState("");
  const [isRelinking, setIsRelinking] = React.useState(false);

  const loadExamUploads = React.useCallback(async () => {
    setExamUploadsLoading(true);
    setExamUploadsError(null);
    const { data, error } = await supabase
      .from("admin_student_exam_documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setExamUploadsError(error.message);
    } else {
      setExamUploads((data || []) as AdminExamUploadRow[]);
    }
    setExamUploadsLoading(false);
  }, []);

  React.useEffect(() => {
    if (isAdmin) void loadExamUploads();
  }, [isAdmin, loadExamUploads]);

  const openRelink = (row: AdminExamUploadRow) => {
    setRelinkTargetId(row.id);
    setRelinkCpf(row.cpf || "");
    setRelinkContestName(row["contest_name"] || "");
    setRelinkContestYear(row["contest_year"] || "");
  };

  const handleRelink = async () => {
    if (!relinkTargetId) return;
    setIsRelinking(true);
    try {
      const update: Record<string, unknown> = {
        contest_name: relinkContestName.trim() || null,
        contest_year: relinkContestYear.trim() || null,
      };
      // Reassigning by CPF is opt-in: only touch user_id if the admin typed a
      // CPF that resolves to a different profile, so a blank/unchanged field
      // never accidentally moves a document to another account.
      const trimmedCpf = relinkCpf.replace(/\D/g, "");
      if (trimmedCpf) {
        const { data: targetProfile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("cpf", trimmedCpf)
          .maybeSingle();
        if (profileError) throw profileError;
        if (!targetProfile) {
          toast.error(`Nenhuma conta encontrada com o CPF ${trimmedCpf}.`);
          setIsRelinking(false);
          return;
        }
        update["user_id"] = targetProfile.id;
      }
      const { error } = await supabase
        .from("student_exam_documents")
        .update(update)
        .eq("id", relinkTargetId);
      if (error) throw error;
      toast.success("Vínculo corrigido com sucesso.");
      setRelinkTargetId(null);
      void loadExamUploads();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao corrigir vínculo.");
    } finally {
      setIsRelinking(false);
    }
  };

  const filteredExamUploads = examUploads.filter((row) => {
    if (!examSearch.trim()) return true;
    const q = examSearch.trim().toLowerCase();
    return (
      row.cpf?.toLowerCase().includes(q) ||
      row.full_name?.toLowerCase().includes(q) ||
      row.auth_email?.toLowerCase().includes(q) ||
      row["contest_name"]?.toLowerCase().includes(q) ||
      row["user_id"].toLowerCase().includes(q)
    );
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [c, q, logs] = await Promise.all([
        MockService.getContests(),
        MockService.getQuestions(),
        supabase
          .from("admin_audit_logs")
          .select("id,created_at,action,old_values,new_values,entity_type,entity_id")
          .order("created_at", { ascending: false })
          .limit(100)
          .then(({ data, error }) => {
            if (error) throw error;
            return data ?? [];
          }),
      ]);
      setContests(c);
      setQuestions(q);
      setAuditLogs(logs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportAuditCSV = async () => {
    const csv = await MockService.exportSubscriptionLogsToCSV();
    if (!csv) {
      toast.error("Nenhum log encontrado para exportar.");
      return;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `auditoria_assinaturas_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Histórico exportado com sucesso!");
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleDeleteContest = async (id: string) => {
    if (
      !(await confirmDialog({
        title: "Excluir concurso?",
        message: "O concurso será removido da plataforma.",
        confirmLabel: "Excluir",
      }))
    )
      return;
    const success = await MockService.deleteContest(id);
    if (success) {
      toast.success("Concurso excluído com sucesso");
      loadData();
    } else {
      toast.error("Erro ao excluir concurso");
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (
      !(await confirmDialog({
        title: "Excluir questão?",
        message: "A questão será removida da plataforma.",
        confirmLabel: "Excluir",
      }))
    )
      return;
    const success = await MockService.deleteQuestion(id);
    if (success) {
      toast.success("Questão excluída com sucesso");
      loadData();
    } else {
      toast.error("Erro ao excluir questão");
    }
  };

  const handleEditContest = (contest: Contest) => {
    setEditingContest({ ...contest });
    setIsEditModalOpen(true);
  };

  const handleSaveContest = async () => {
    if (!editingContest) return;
    setIsSaving(true);
    const success = await MockService.updateContest(editingContest.id, editingContest);
    if (success) {
      toast.success("Concurso atualizado com sucesso");
      setIsEditModalOpen(false);
      loadData();
    } else {
      toast.error("Erro ao atualizar concurso");
    }
    setIsSaving(false);
  };

  if (isAuthLoading) return <div className="p-8">Verificando permissões...</div>;
  if (!isAdmin) {
    return (
      <Card className="max-w-md mx-auto mt-20">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 bg-destructive/10 rounded-full w-fit mb-4">
            <Lock className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle>Acesso Negado</CardTitle>
          <CardDescription>
            Você não tem permissão para acessar esta área. Esta página é restrita a administradores.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button asChild>
            <Link to="/dashboard">Voltar para o Início</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração"
        icon={Settings}
        title={
          <>
            Painel <em>administrativo</em>
          </>
        }
        description="Gerencie concursos, questões, editais, biblioteca e provas em uma central reservada."
      />

      <Tabs defaultValue="contests" className="w-full">
        <TabsList className="admin-tabs w-full max-w-5xl">
          <TabsTrigger value="contests">Concursos</TabsTrigger>
          <TabsTrigger value="questions">Questões</TabsTrigger>
          <TabsTrigger value="syllabus">Edital</TabsTrigger>
          <TabsTrigger value="library">Biblioteca</TabsTrigger>
          <TabsTrigger value="exam-uploads">Provas Enviadas</TabsTrigger>
          <TabsTrigger value="audit">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="contests" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Concursos Cadastrados</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os concursos disponíveis.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={() => document.getElementById("csv-import")?.click()}
                >
                  <FileText className="h-4 w-4" /> Importar Questões (CSV)
                  <input
                    id="csv-import"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      toast.info("Processando arquivo CSV...");
                      // Simulação de processamento
                      setTimeout(() => {
                        toast.success("50 questões importadas com sucesso!");
                        loadData();
                      }, 1500);
                    }}
                  />
                </Button>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Novo Concurso
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar concurso..." className="pl-9" />
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Órgão / Nome</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Banca</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Vagas</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Nenhum concurso encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      contests.map((contest) => (
                        <TableRow key={contest.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{contest.agency}</span>
                              <span className="text-xs text-muted-foreground">{contest.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">
                            {contest.startDate
                              ? new Date(contest.startDate).toLocaleDateString()
                              : "∞"}{" "}
                            -
                            {contest.endDate ? new Date(contest.endDate).toLocaleDateString() : "∞"}
                          </TableCell>
                          <TableCell>{contest.examBoard}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                              {contest.status}
                            </span>
                          </TableCell>
                          <TableCell>{contest.vacancies}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditContest(contest)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteContest(contest.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Banco de Questões</CardTitle>
                <CardDescription>
                  Crie e edite o banco de dados de questões da plataforma.
                </CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Nova Questão
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por texto da questão..." className="pl-9" />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    onChange={(e) => {
                      // Filter logic for teacherComment
                    }}
                  >
                    <option value="all">Todas as Questões</option>
                    <option value="with_comment">Com Comentário</option>
                    <option value="without_comment">Sem Comentário</option>
                  </select>
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Enunciado</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Dificuldade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          Nenhuma questão encontrada.
                        </TableCell>
                      </TableRow>
                    ) : (
                      questions.slice(0, 10).map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-[400px]">
                            <p className="truncate text-sm" title={question.text}>
                              {question.text}
                            </p>
                          </TableCell>
                          <TableCell>{question.type}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                                question.difficulty === "Fácil"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : question.difficulty === "Média"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-800",
                              )}
                            >
                              {question.difficulty}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteQuestion(question.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {questions.length > 10 && (
                  <div className="p-4 text-center border-t text-sm text-muted-foreground">
                    Exibindo as 10 primeiras questões de {questions.length} totais.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Editor de explicações da questão</CardTitle>
              <CardDescription>
                Cadastre explicações estruturadas, links de teoria e anexos de mídia.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selecione a Questão</label>
                  <select className="w-full p-2 rounded-md border bg-background text-sm">
                    <option>Selecione uma questão para comentar...</option>
                    {questions.slice(0, 5).map((q) => (
                      <option key={q.id}>{q.text.substring(0, 60)}...</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Histórico de Versões</label>
                  <select className="w-full p-2 rounded-md border bg-background text-sm">
                    <option>Última versão (Atual)</option>
                    <option>12/08/2026 - Admin Silva</option>
                    <option>10/08/2026 - Admin Costa</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Comentário do Professor</label>
                  <div className="border rounded-md overflow-hidden flex flex-col h-full">
                    <div className="bg-muted p-2 border-b flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 font-bold">
                        B
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 italic">
                        I
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 underline">
                        U
                      </Button>
                      <div className="w-px h-4 bg-border self-center mx-1" />
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]">
                        Lista
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]">
                        Link
                      </Button>
                    </div>
                    <textarea
                      className="w-full p-4 flex-1 min-h-[250px] text-sm focus:outline-none bg-background resize-none"
                      placeholder="Digite o comentário estruturado aqui (suporta HTML)..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Visualização em Tempo Real (Prévia)</label>
                  <div className="border rounded-md p-4 bg-muted/20 min-h-[250px] overflow-auto prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-muted-foreground italic text-xs">
                      A prévia da formatação aparecerá aqui enquanto você digita...
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Links de Teoria (Vídeo/PDF)</label>
                    <div className="flex gap-2">
                      <Input placeholder="Título do link" className="text-xs" />
                      <Input placeholder="URL" className="text-xs" />
                      <Button variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Mídias e Anexos (Imagens/Documentos)
                    </label>
                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors group">
                      <div className="text-center">
                        <Plus className="h-4 w-4 mx-auto mb-1 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-muted-foreground">
                          Upload de Mídia (Vídeo/Theory PDF)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Visualizar</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Salvar Questão Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="mt-6">
          <Tabs defaultValue="materials">
            <TabsList>
              <TabsTrigger value="materials">Materiais</TabsTrigger>
              <TabsTrigger value="enrichments">Exemplos e ilustrações</TabsTrigger>
            </TabsList>
            <TabsContent value="materials" className="mt-4">
              <LibraryAdmin />
            </TabsContent>
            <TabsContent value="enrichments" className="mt-4">
              <EnrichmentAdmin />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="syllabus" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Edital Verticalizado</CardTitle>
                <CardDescription>Importe e gerencie os tópicos do edital.</CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => document.getElementById("syllabus-import")?.click()}
              >
                <FileText className="h-4 w-4" /> Importar Edital (JSON/CSV)
                <input
                  id="syllabus-import"
                  type="file"
                  accept=".json,.csv"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    toast.info("Validando edital...");
                    setTimeout(() => {
                      toast.success("Estrutura do edital importada e vinculada!");
                      loadData();
                    }, 2000);
                  }}
                />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">PF - Agente de Polícia Federal</p>
                    <p className="text-xs text-muted-foreground">
                      Última atualização: Hoje • 48 tópicos detectados
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Gerenciar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam-uploads" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Provas Enviadas pelos Candidatos</CardTitle>
                <CardDescription>
                  Todo documento de prova cadastrado no banco, com CPF e e-mail da conta dona do
                  registro (auth.uid = user_id). Use para localizar e corrigir vínculos incorretos
                  com segurança — a correção só move o registro quando você digita um CPF de destino
                  explicitamente.
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => void loadExamUploads()}
              >
                <HistoryIcon className="h-4 w-4" /> Atualizar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por CPF, e-mail, nome, concurso ou user_id..."
                  className="pl-9"
                  value={examSearch}
                  onChange={(e) => setExamSearch(e.target.value)}
                />
              </div>
              {examUploadsError && (
                <p className="mb-4 text-sm text-destructive">
                  Erro ao carregar: {examUploadsError}
                </p>
              )}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CPF / Conta</TableHead>
                      <TableHead>Concurso</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Status IA</TableHead>
                      <TableHead>Arquivo</TableHead>
                      <TableHead>Enviado em</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examUploadsLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Carregando...
                        </TableCell>
                      </TableRow>
                    ) : filteredExamUploads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Nenhum documento encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredExamUploads.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <div className="flex flex-col text-xs">
                              <span className="font-bold">{row.cpf || "—"}</span>
                              <span className="text-muted-foreground">
                                {row.full_name || row.auth_email || "—"}
                              </span>
                              <span className="font-mono text-[10px] text-muted-foreground">
                                {row["user_id"].slice(0, 8)}…
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">
                            <div className="flex flex-col">
                              <span>
                                {row["contest_name"] || (
                                  <span className="italic text-muted-foreground">
                                    não identificado
                                  </span>
                                )}
                              </span>
                              <span className="text-muted-foreground">
                                {row["contest_year"] || "—"}{" "}
                                {row.exam_board ? `· ${row.exam_board}` : ""}
                              </span>
                              {row.ai_extracted?.["contest_name"] ? (
                                <span className="mt-0.5 text-[10px] text-emerald-700">
                                  IA sugeriu: {String(row.ai_extracted?.["contest_name"])}
                                  {row.ai_extracted?.["contest_year"]
                                    ? ` (${String(row.ai_extracted?.["contest_year"])})`
                                    : ""}
                                </span>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell className="text-[10px]">
                            <Badge variant="outline">
                              {row.uploaded_via === "candidate_upload"
                                ? "Candidato"
                                : "Admin/import"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-[10px]">
                            <Badge
                              variant={row.analysis_status === "erro" ? "destructive" : "secondary"}
                              className="uppercase"
                            >
                              {row.analysis_status}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className="max-w-[160px] truncate text-xs"
                            title={row.file_name}
                          >
                            {row.file_name}
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-[10px] text-muted-foreground">
                            {new Date(row.created_at).toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => openRelink(row)}>
                              Corrigir vínculo
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <HistoryIcon className="h-5 w-5 text-primary" />
                  Logs de Auditoria
                </CardTitle>
                <CardDescription>
                  Histórico completo de alterações realizadas por administradores.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExportAuditCSV}>
                <Download className="h-4 w-4" /> Exportar CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Ação</TableHead>
                      <TableHead>Entidade</TableHead>
                      <TableHead>Detalhes/Motivo</TableHead>
                      <TableHead>Mudanças</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Nenhum log de auditoria encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      auditLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs whitespace-nowrap">
                            {new Date(log.created_at).toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">
                                {log.admin?.full_name || "Admin"}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {log.admin?.email}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
                              {log.action}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs">
                            {log.entity_type}: {log.entity_id}
                          </TableCell>
                          <TableCell className="text-[10px] text-rose-600 italic max-w-[150px] truncate">
                            {log.new_values?.reason || "-"}
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[300px]">
                              <code
                                className="text-[10px] block p-2 bg-muted rounded truncate"
                                title={JSON.stringify(log.new_values)}
                              >
                                {JSON.stringify(log.new_values)}
                              </code>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Contest Modal */}
      {isEditModalOpen && editingContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader>
              <CardTitle>Editar Período do Concurso</CardTitle>
              <CardDescription>
                {editingContest.agency} - {editingContest.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data de Início</label>
                  <DatePicker
                    value={
                      editingContest.startDate ? (editingContest.startDate.split("T")[0] ?? "") : ""
                    }
                    onChange={(v) => setEditingContest({ ...editingContest, startDate: v })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data de Fim</label>
                  <DatePicker
                    value={
                      editingContest.endDate ? (editingContest.endDate.split("T")[0] ?? "") : ""
                    }
                    onChange={(v) => setEditingContest({ ...editingContest, endDate: v })}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                * Concursos fora deste período não serão exibidos para os alunos.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveContest} disabled={isSaving}>
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Exam Upload Relink Modal */}
      <Dialog
        open={!!relinkTargetId}
        onOpenChange={(open) => !isRelinking && !open && setRelinkTargetId(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Corrigir vínculo da prova</DialogTitle>
            <DialogDescription>
              Ajuste o concurso identificado ou mova este documento para outra conta informando o
              CPF correto. Deixar o CPF em branco mantém o dono atual do registro.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="relink-cpf">Mover para o CPF (opcional)</Label>
              <Input
                id="relink-cpf"
                placeholder="Deixe em branco para não alterar a conta"
                value={relinkCpf}
                onChange={(e) => setRelinkCpf(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relink-contest">Concurso</Label>
              <Input
                id="relink-contest"
                value={relinkContestName}
                onChange={(e) => setRelinkContestName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relink-year">Ano</Label>
              <Input
                id="relink-year"
                value={relinkContestYear}
                onChange={(e) => setRelinkContestYear(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRelinkTargetId(null)}
              disabled={isRelinking}
            >
              Cancelar
            </Button>
            <Button onClick={handleRelink} disabled={isRelinking}>
              {isRelinking ? "Salvando..." : "Salvar vínculo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
