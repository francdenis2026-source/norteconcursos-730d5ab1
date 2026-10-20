import { QuestionCode } from "@/components/dashboard/QuestionCode";
import { useEffect, useState } from "react";
import { QuestionProse } from "@/components/dashboard/QuestionProse";
import { Link } from "@tanstack/react-router";
import { BookmarkCheck, BookOpen, Download, RotateCcw, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseQuestion } from "@/lib/questionFormat";
import { questionCode } from "@/lib/questionIdentity";
import { accountStudyLaterPort } from "@/lib/studyLaterAccount";
import { pushStudyLaterItem, removeStudyLaterItem, syncStudyLater } from "@/lib/studyLaterSync";
import {
  readStudyLater,
  writeStudyLater,
  studyLaterKey,
  type StudyLaterItem,
} from "@/lib/studyLater";
import { useStudyMaterialList, type StudyMaterialSummary } from "@/lib/studyMaterials";
import { relatedTrainerMaterials } from "@/lib/trainerLearning";
import { libraryCollection } from "@/lib/libraryOrganization";

/** Assunto só é "confirmado" quando vem do cadastro (edital/assunto cobrado) ou foi editado pelo aluno. */
const topicConfirmed = (item: StudyLaterItem) =>
  item.topicSource === "user" ||
  !!item.question.syllabusTopicId ||
  (!!item.question.testedTopic && item.topic === item.question.testedTopic);

const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function StudyLaterNotebook({ userId }: { userId: string }) {
  const [items, setItems] = useState<StudyLaterItem[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [status, setStatus] = useState("pending");
  const [origin, setOrigin] = useState("all");
  const [limit, setLimit] = useState(20);
  // null = ainda conferindo; false = a tabela da conta não existe e o caderno vale só neste navegador.
  const [account, setAccount] = useState<boolean | null>(null);
  const library = useStudyMaterialList(!!userId);
  useEffect(() => {
    const load = () => {
      setItems([]);
      try {
        setItems(readStudyLater(localStorage, userId));
        setError("");
      } catch {
        setError(
          "Não foi possível ler o caderno. Os dados existentes foram preservados; tente novamente neste navegador.",
        );
      }
    };
    load();
    // Mescla com o caderno da conta sem apagar nada: o que só existe aqui sobe, o que só existe lá desce.
    let active = true;
    try {
      const local = readStudyLater(localStorage, userId);
      void syncStudyLater(userId, local, accountStudyLaterPort(userId))
        .then((result) => {
          if (!active) return;
          setAccount(result.account);
          if (result.account) {
            writeStudyLater(localStorage, userId, result.items);
            setItems(result.items);
          }
        })
        .catch(() => active && setAccount(false));
    } catch {
      setAccount(false);
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === studyLaterKey(userId)) load();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
    };
  }, [userId]);
  useEffect(() => setLimit(20), [search, subject, status, origin]);
  const change = (key: string, update: (item: StudyLaterItem) => StudyLaterItem | null) => {
    try {
      const fresh = readStudyLater(localStorage, userId);
      const before = fresh.find((item) => item.key === key);
      const next = fresh.flatMap((item) =>
        item.key !== key ? [item] : [update(item)].filter((x): x is StudyLaterItem => !!x),
      );
      writeStudyLater(localStorage, userId, next);
      setItems(next);
      const after = next.find((item) => item.key === key);
      const port = accountStudyLaterPort(userId);
      if (account !== false && before)
        void (
          after ? pushStudyLaterItem(userId, after, port) : removeStudyLaterItem(before, port)
        ).catch(() =>
          toast.message("Alteração salva neste navegador; a conta será atualizada na próxima vez."),
        );
    } catch {
      toast.error("Não foi possível salvar a alteração. Os dados anteriores foram preservados.");
    }
  };
  const exportBackup = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(items, null, 2)], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "meu-caderno-estudar-depois.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const visible = items.filter(
    (item) =>
      (subject === "all" || item.question.subject === subject) &&
      (status === "all" || item.reviewed === (status === "reviewed")) &&
      (origin === "all" || (item.reason === "skipped" ? "skipped" : "saved") === origin) &&
      fold(
        [
          item.question.text,
          item.question.subject,
          item.question.contest,
          item.topic,
          item.notes,
          questionCode(item.question),
          ...item.alternatives.map((a) => `${a.subject} ${a.topic ?? ""}`),
        ].join(" "),
      ).includes(fold(search)),
  );
  return (
    <section
      aria-labelledby="study-later-title"
      className="space-y-4 rounded-2xl border border-sky-500/25 bg-sky-500/5 p-4 sm:p-6"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="study-later-title" className="flex items-center gap-2 text-xl font-bold">
            <BookmarkCheck className="h-5 w-5 text-sky-600 dark:text-sky-400" /> Estudar depois
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Questões salvas ou puladas no treinador, com assuntos e anotações para sua revisão.
          </p>
        </div>
        <Button variant="outline" disabled={!items.length || !!error} onClick={exportBackup}>
          <Download className="mr-2 h-4 w-4" /> Exportar backup
        </Button>
      </header>
      <p className="rounded-lg border bg-card p-3 text-xs text-muted-foreground">
        {account === true
          ? "Sincronizado com a sua conta: o caderno acompanha você em outros aparelhos. Este navegador guarda uma cópia."
          : account === false
            ? "Salvo apenas neste navegador e separado por conta: a sincronização com a conta ainda não está ativa no banco. Exporte um backup para guardar uma cópia."
            : "Conferindo a sincronização com a sua conta…"}
      </p>
      {error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm">
              Buscar questões e anotações
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Termo, assunto ou anotação"
              />
            </label>
            <label className="text-sm">
              Disciplina
              <select
                className="mt-1 w-full rounded-md border bg-background p-2"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="all">Todas as disciplinas</option>
                {[...new Set(items.map((item) => item.question.subject))].sort().map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Origem
              <select
                className="mt-1 w-full rounded-md border bg-background p-2"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                <option value="all">Salvas e puladas</option>
                <option value="skipped">Puladas no treino</option>
                <option value="saved">Salvas por mim</option>
              </select>
            </label>
            <label className="text-sm">
              Revisão
              <select
                className="mt-1 w-full rounded-md border bg-background p-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Para estudar</option>
                <option value="reviewed">Revisadas</option>
                <option value="all">Todas</option>
              </select>
            </label>
          </div>
          <p role="status" className="text-sm text-muted-foreground">
            {visible.length} questões nesta seleção · {items.length} salvas
          </p>
          {!visible.length && (
            <p className="text-sm">
              {items.length
                ? "Nenhuma questão combina com os filtros."
                : "Durante o treino, use “Estudar depois” para começar seu caderno."}
            </p>
          )}
          {visible.slice(0, limit).map((item) => (
            <details key={item.key} className="rounded-xl border bg-card p-4">
              <summary className="cursor-pointer">
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-300">
                  {item.question.subject} · {item.topic ?? "Assunto a identificar"}
                  {item.reason === "skipped" && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-amber-500/50 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-800 dark:text-amber-200">
                      <SkipForward className="h-3 w-3" aria-hidden="true" /> Pulada no treino
                    </span>
                  )}
                </span>
                <span className="mt-1 block font-semibold">
                  {parseQuestion(item.question.text).stem.slice(0, 180)}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {item.question.contest} · {item.question.year} ·{" "}
                  {item.reviewed ? "Revisada" : "Para estudar"}
                </span>
              </summary>
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <QuestionCode question={item.question} />
                  <Button asChild variant="outline" size="sm">
                    <Link
                      to="/dashboard/question-trainer"
                      search={{
                        catalogQuery: questionCode(item.question),
                        mode: "catalog",
                        limit: "all",
                        go: "1",
                      }}
                    >
                      <RotateCcw className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" /> Voltar a
                      treinar
                    </Link>
                  </Button>
                </div>
                <QuestionProse text={item.question.text} className="text-sm" />
                <p className="text-xs text-muted-foreground">
                  Cópia salva em {new Date(item.savedAt).toLocaleDateString("pt-BR")}. O conteúdo e
                  as fontes podem receber atualizações; confira os materiais atuais. Assuntos
                  inferidos são sugestões: revise e ajuste quando necessário.
                </p>
                <p className="text-xs text-muted-foreground">
                  {topicConfirmed(item)
                    ? "Assunto vinculado ao cadastro da questão ou confirmado por você."
                    : "Assunto sugerido automaticamente pelo enunciado: confira e ajuste antes de confiar nos materiais indicados."}
                </p>
                <label className="block text-sm font-medium">
                  Assunto principal
                  <Input
                    key={`${item.key}:topic:${item.topic}`}
                    defaultValue={item.topic ?? ""}
                    placeholder="Defina o assunto para revisar"
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (value !== (item.topic ?? ""))
                        change(item.key, (current) => ({
                          ...current,
                          topic: value || null,
                          topicSource: value ? "user" : undefined,
                        }));
                    }}
                  />
                </label>
                <StudyLinks
                  main
                  item={item}
                  subject={item.question.subject}
                  topic={item.topic}
                  materials={library.data ?? []}
                  loading={library.isPending}
                  failed={library.isError}
                />
                <label className="block text-sm font-medium">
                  Minhas anotações
                  <textarea
                    className="mt-1 min-h-24 w-full rounded-md border bg-background p-3 font-normal"
                    key={`${item.key}:notes:${item.notes}`}
                    defaultValue={item.notes}
                    placeholder="O que preciso rever?"
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value !== item.notes)
                        change(item.key, (current) => ({ ...current, notes: value }));
                    }}
                  />
                </label>
                {!!item.alternatives.length && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Estudar cada alternativa</h3>
                    <p className="text-xs text-muted-foreground">
                      Cada alternativa pode abordar um assunto diferente. Quando não há
                      identificação segura, preencha a disciplina e o assunto.
                    </p>
                    {item.alternatives.map((alternative, index) => (
                      <details
                        key={alternative.letter}
                        className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3"
                      >
                        <summary className="cursor-pointer text-sm font-medium">
                          Alternativa {alternative.letter} ·{" "}
                          {alternative.topic ?? "Identificar assunto"}
                        </summary>
                        <p className="my-3 text-sm">{alternative.text}</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <label className="text-sm">
                            Disciplina da alternativa
                            <Input
                              defaultValue={alternative.subject}
                              onBlur={(e) => {
                                const value = e.target.value.trim();
                                if (value && value !== alternative.subject)
                                  change(item.key, (current) => ({
                                    ...current,
                                    alternatives: current.alternatives.map((a, i) =>
                                      i === index ? { ...a, subject: value, topic: null } : a,
                                    ),
                                  }));
                              }}
                            />
                          </label>
                          <label className="text-sm">
                            Assunto da alternativa
                            <Input
                              key={`${alternative.subject}:${alternative.topic}`}
                              defaultValue={alternative.topic ?? ""}
                              onBlur={(e) => {
                                const value = e.target.value.trim();
                                if (value !== (alternative.topic ?? ""))
                                  change(item.key, (current) => ({
                                    ...current,
                                    alternatives: current.alternatives.map((a, i) =>
                                      i === index ? { ...a, topic: value || null } : a,
                                    ),
                                  }));
                              }}
                            />
                          </label>
                        </div>
                        <div className="mt-3">
                          <StudyLinks
                            item={item}
                            subject={alternative.subject}
                            topic={alternative.topic}
                            materials={library.data ?? []}
                            loading={library.isPending}
                            failed={library.isError}
                          />
                        </div>
                      </details>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      change(item.key, (current) => ({ ...current, reviewed: !current.reviewed }))
                    }
                  >
                    {item.reviewed ? "Voltar para estudar" : "Marcar como revisada"}
                  </Button>
                  <Button variant="ghost" onClick={() => change(item.key, () => null)}>
                    Remover do caderno
                  </Button>
                </div>
              </div>
            </details>
          ))}
          {visible.length > limit && (
            <Button variant="outline" onClick={() => setLimit((n) => n + 20)}>
              Mostrar mais questões
            </Button>
          )}
        </>
      )}
    </section>
  );
}

function StudyLinks({
  item,
  subject,
  topic,
  materials,
  loading,
  failed,
  main = false,
}: {
  item: StudyLaterItem;
  subject: string;
  topic: string | null;
  materials: StudyMaterialSummary[];
  loading: boolean;
  failed: boolean;
  main?: boolean;
}) {
  const enem = item.question.contest.trim().toUpperCase() === "ENEM";
  const candidates = materials.filter(
    (material) => (libraryCollection(material) === "enem") === enem,
  );
  const related = relatedTrainerMaterials(
    { subject, subtopic: topic, legalBasis: main ? item.question.legalBasis : [] },
    candidates,
  );
  return (
    <div className="space-y-2 text-sm">
      <p className="flex items-center gap-2 font-medium">
        <BookOpen className="h-4 w-4" /> Onde estudar
      </p>
      {loading ? (
        <p className="text-xs text-muted-foreground">Buscando materiais…</p>
      ) : failed ? (
        <p className="text-xs text-muted-foreground">
          A biblioteca não carregou. Tente novamente ao reabrir o caderno.
        </p>
      ) : related.length ? (
        related.map((material) => (
          <Link
            key={material.slug}
            className="block text-primary underline"
            to="/dashboard/library/$slug"
            params={{ slug: material.slug }}
          >
            {material.title}
          </Link>
        ))
      ) : (
        <p className="text-xs text-muted-foreground">
          {topic
            ? "Nenhum material diretamente relacionado foi encontrado."
            : "Defina um assunto para procurar materiais relacionados."}
        </p>
      )}
      {enem ? (
        <Link
          className="inline-block text-primary underline"
          to="/dashboard/enem"
          search={{ tab: "materiais" }}
        >
          Materiais do ENEM
        </Link>
      ) : (
        <Link
          className="inline-block text-primary underline"
          to="/dashboard/library"
          search={{
            collection:
              libraryCollection({ slug: "", discipline: subject }) === "laws" ? "laws" : "subjects",
            q: topic ?? subject,
          }}
        >
          Pesquisar materiais deste assunto
        </Link>
      )}
    </div>
  );
}
