import * as React from "react";
import { Link } from "@tanstack/react-router";
import { BookmarkPlus, BookOpen, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuthStatus } from "@/hooks/useDashboard";
import { type Question, parseQuestion } from "@/lib/questionFormat";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { relatedTrainerMaterials } from "@/lib/trainerLearning";
import {
  addStudyLater,
  readStudyLater,
  writeStudyLater,
  questionStudyTopics,
  studyQuestionKey,
  type StudyLaterItem,
} from "@/lib/studyLater";

function TopicMaterials({ question, topic }: { question: Question; topic: string }) {
  const library = useStudyMaterialList(true);
  const materials = relatedTrainerMaterials(
    { ...question, subtopic: topic, legalBasis: [] },
    library.data ?? [],
  );
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {library.isLoading ? (
        <span className="text-xs">Buscando materiais…</span>
      ) : (
        materials.map((m) => (
          <Link
            key={m.slug}
            to="/dashboard/library/$slug"
            params={{ slug: m.slug }}
            className="text-sm font-medium text-primary underline"
          >
            {m.title}
          </Link>
        ))
      )}
      <Link
        to="/dashboard/library"
        search={{ collection: "subjects", q: topic || question.subject }}
        className="text-sm font-medium text-primary underline"
      >
        {materials.length ? "Ver mais materiais" : "Pesquisar na biblioteca"}
      </Link>
    </div>
  );
}
export function SaveStudyLater({ question, userId }: { question: Question; userId: string }) {
  const [open, setOpen] = React.useState(false),
    [topic, setTopic] = React.useState(""),
    [note, setNote] = React.useState("");
  const topics = questionStudyTopics(question);
  function show() {
    try {
      const old = readStudyLater(userId).find((i) => i.key === studyQuestionKey(question));
      setTopic(old?.topic ?? topics.main ?? "");
      setNote(old?.note ?? "");
      setOpen(true);
    } catch {
      toast.error("Não foi possível abrir o caderno. Verifique o armazenamento do navegador.");
    }
  }
  function save() {
    try {
      writeStudyLater(
        userId,
        addStudyLater(readStudyLater(userId), question, topic.trim(), note.trim()),
      );
      setOpen(false);
      toast.success("Questão salva em Meus cadernos → Estudar depois.");
    } catch {
      toast.error(
        "Não foi possível salvar. O armazenamento do navegador pode estar indisponível ou cheio.",
      );
    }
  }
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={show}>
          <BookmarkPlus className="mr-2 h-4 w-4" />
          Estudar depois
        </Button>
        <Button asChild variant="ghost">
          <Link to="/dashboard/notebooks">
            <BookOpen className="mr-2 h-4 w-4" />
            Meus cadernos
          </Link>
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Salvar para estudar depois</DialogTitle>
            <DialogDescription>
              A questão completa fica disponível em Meus cadernos, nesta conta e neste navegador.
              Não há sincronização entre dispositivos.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm font-semibold">{question.subject}</p>
          <label className="grid gap-2 text-sm">
            Assunto principal
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={200}
              placeholder="Informe ou ajuste o assunto"
            />
          </label>
          <p className="text-xs text-muted-foreground">
            A identificação automática é uma sugestão. Você pode corrigir o assunto.
          </p>
          {topics.alternatives.length > 0 && (
            <div className="space-y-1 rounded-lg border p-3 text-sm">
              <p className="font-semibold">Assuntos sugeridos por alternativa</p>
              {topics.alternatives.map((a) => (
                <p key={a.letter}>
                  {a.letter}: {a.topic || "Não identificado com segurança"}
                </p>
              ))}
            </div>
          )}
          <label className="grid gap-2 text-sm">
            O que você quer revisar?
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={3000}
              placeholder="Anote sua dúvida ou a alternativa que precisa estudar."
            />
          </label>
          <Button onClick={save}>Salvar no caderno</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
function SavedQuestion({
  item,
  onChange,
  onRemove,
}: {
  item: StudyLaterItem;
  onChange: (item: StudyLaterItem) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const topics = questionStudyTopics(item.question),
    parsed = parseQuestion(item.question.text);
  return (
    <article className="rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {item.question.subject} · {item.question.board} · {item.question.year}
          </p>
          <h3 className="mt-1 font-semibold">{item.topic || "Assunto a classificar"}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.question.contest}</p>
        </div>
        <Button
          variant={item.reviewed ? "secondary" : "outline"}
          onClick={() => onChange({ ...item, reviewed: !item.reviewed })}
        >
          <Check className="mr-1 h-4 w-4" />
          {item.reviewed ? "Revisado — reabrir" : "Marcar revisado"}
        </Button>
      </div>
      {item.note && (
        <p className="mt-3 whitespace-pre-wrap rounded-lg bg-muted p-3 text-sm">{item.note}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? "Recolher" : "Abrir questão e assuntos"}
        </Button>
        <Button variant="ghost" onClick={onRemove}>
          Remover do caderno
        </Button>
      </div>
      {expanded && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-muted-foreground">
            Cópia salva para revisão. Consulte os materiais atuais para verificar eventuais mudanças
            na legislação.
          </p>
          <p className="whitespace-pre-wrap text-sm leading-7">
            {parsed.base}
            {parsed.base ? "\n\n" : ""}
            {parsed.stem}
          </p>
          <div className="rounded-lg border p-3">
            <p className="font-semibold">Estudar o assunto principal</p>
            <TopicMaterials question={item.question} topic={item.topic} />
          </div>
          {parsed.options.map((o) => (
            <div key={o.letter} className="rounded-lg border p-3">
              <p className="whitespace-pre-wrap text-sm">
                {o.letter}) {o.text}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Assunto sugerido:{" "}
                {topics.alternatives.find((a) => a.letter === o.letter)?.topic ||
                  "Não identificado"}
              </p>
              <TopicMaterials
                question={item.question}
                topic={topics.alternatives.find((a) => a.letter === o.letter)?.topic ?? ""}
              />
            </div>
          ))}
          <details className="rounded-lg border p-3">
            <summary className="cursor-pointer font-medium">
              Consultar gabarito e comentário salvos
            </summary>
            <p className="mt-3 text-sm">Gabarito: {item.question.answer}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">
              {item.question.explanation}
            </p>
          </details>
        </div>
      )}
    </article>
  );
}
export function StudyLaterNotebook() {
  const { user } = useAuthStatus();
  const [items, setItems] = React.useState<StudyLaterItem[]>([]),
    [error, setError] = React.useState(false),
    [query, setQuery] = React.useState(""),
    [status, setStatus] = React.useState("pending");
  React.useEffect(() => {
    setItems([]);
    if (!user?.id) return;
    const load = () => {
      try {
        setItems(readStudyLater(user.id));
        setError(false);
      } catch {
        setError(true);
      }
    };
    load();
    window.addEventListener("study-later-changed", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("study-later-changed", load);
      window.removeEventListener("storage", load);
    };
  }, [user?.id]);
  function update(next: StudyLaterItem[]) {
    if (!user) return;
    try {
      writeStudyLater(user.id, next);
      setItems(next);
    } catch {
      toast.error("Não foi possível atualizar o caderno.");
    }
  }
  const visible = items.filter(
    (i) =>
      (status === "all" || (status === "done" ? i.reviewed : !i.reviewed)) &&
      `${i.topic} ${i.question.subject} ${i.note} ${i.question.text}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
  );
  return (
    <section id="estudar-depois" className="space-y-4 rounded-2xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <BookmarkPlus />
        Estudar depois <span className="text-sm text-muted-foreground">({items.length})</span>
      </h2>
      <p className="text-sm text-muted-foreground">
        Questões salvas no treinador, organizadas por assunto. Salvas nesta conta e neste navegador;
        não sincronizadas entre dispositivos.
      </p>
      <div className="flex flex-wrap gap-3">
        <Input
          className="max-w-md"
          aria-label="Buscar no caderno de revisão"
          placeholder="Buscar questão, assunto ou anotação"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label="Status de revisão"
          className="rounded-md border bg-background px-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Para revisar</option>
          <option value="done">Revisados</option>
          <option value="all">Todos</option>
        </select>
      </div>
      {error ? (
        <p role="alert">Não foi possível ler o caderno neste navegador.</p>
      ) : visible.length ? (
        visible.map((item) => (
          <SavedQuestion
            key={item.key}
            item={item}
            onChange={(next) => update(items.map((i) => (i.key === item.key ? next : i)))}
            onRemove={() => {
              update(items.filter((i) => i.key !== item.key));
              toast("Questão removida", {
                action: {
                  label: "Desfazer",
                  onClick: () => {
                    if (!user) return;
                    try {
                      update([item, ...readStudyLater(user.id).filter((i) => i.key !== item.key)]);
                    } catch {
                      toast.error("Não foi possível restaurar.");
                    }
                  },
                },
              });
            }}
          />
        ))
      ) : (
        <p className="py-4 text-sm text-muted-foreground">
          Nenhuma questão nesta seleção. No treinador, use “Estudar depois”.
        </p>
      )}
    </section>
  );
}
