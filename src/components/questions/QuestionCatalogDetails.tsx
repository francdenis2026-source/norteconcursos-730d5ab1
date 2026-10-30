import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpenCheck, LibraryBig, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/questionFormat";
import { questionCode } from "@/lib/questionIdentity";
import {
  availableQuestionBank,
  questionBankExams,
  questionBankSearch,
  searchQuestionCatalog,
  type BankCollection,
  type BankSource,
} from "@/lib/questionBank";
import { QUESTION_COUNT_LABELS, type PlatformQuestionSummary } from "@/lib/platformQuestionSummary";
import { catalogGroups, catalogNumber as n } from "@/lib/questionCatalogSummary";

export type CatalogDetail = "platform" | "questions" | "exams" | "boards" | "subjects";
const titles: Record<CatalogDetail, string> = {
  platform: "O acervo da plataforma",
  questions: "Questões da sua seleção",
  exams: "Provas e concursos",
  boards: "Explore as bancas",
  subjects: "Explore as disciplinas",
};
const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
const origins = { official: "Oficial", curated: "Autoral", personal: "Meu caderno" };

type Props = {
  view: CatalogDetail | null;
  onClose: () => void;
  restoreFocus: () => void;
  publicCatalog: Question[];
  platformSummary: PlatformQuestionSummary | undefined;
  reviewedCount: number | undefined;
  items: Question[];
  collection: BankCollection;
  source: BankSource;
  query: string;
};
export function QuestionCatalogDetails(props: Props) {
  // Unmount the body on close: every new exploration starts with a clean local search.
  return (
    <Dialog
      open={props.view !== null}
      onOpenChange={(open) => {
        if (!open) props.onClose();
      }}
    >
      {props.view && (
        <DialogContent
          motion="instant"
          className="catalog-details"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            props.restoreFocus();
          }}
        >
          <DetailBody key={props.view} {...props} view={props.view} />
        </DialogContent>
      )}
    </Dialog>
  );
}
function DetailBody({
  view,
  publicCatalog,
  platformSummary,
  reviewedCount,
  items,
  collection,
  source,
  query,
  onClose,
}: Props & { view: CatalogDetail }) {
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(20);
  const scope = view === "platform" ? publicCatalog : items;
  const searched = React.useMemo(
    () => (view === "questions" ? searchQuestionCatalog(scope, search) : scope),
    [scope, search, view],
  );
  const allGroups = React.useMemo(() => {
    if (view === "boards" || view === "subjects")
      return catalogGroups(searched, view === "boards" ? "board" : "subject").map((g) => ({
        key: g.name,
        name: g.name,
        questions: g.questions,
        selection: view === "boards" ? { board: g.name } : { subject: g.name },
      }));
    if (view === "exams")
      return questionBankExams(searched).map((exam) => ({
        key: exam.key,
        name: `${exam.question.contest} · ${exam.question.year}`,
        questions: exam.questions,
        selection: { exam: exam.question },
      }));
    return [];
  }, [searched, view]);
  const groups = React.useMemo(
    () =>
      allGroups.filter((g) =>
        fold(`${g.name} ${view === "exams" ? g.questions[0]?.board : ""}`).includes(fold(search)),
      ),
    [allGroups, search, view],
  );
  const listTotal = view === "questions" ? searched.length : groups.length;
  const years = catalogGroups(scope, "year").map((g) => Number(g.name));
  return (
    <>
      <DialogHeader className="catalog-details__header">
        <span className="catalog-details__eyebrow">
          <LibraryBig aria-hidden="true" /> INTELIGÊNCIA DO ACERVO
        </span>
        <DialogTitle>{titles[view]}</DialogTitle>
        <DialogDescription>
          {view === "platform"
            ? "Resumo global de Concursos e ENEM, igual ao da homepage. O total cadastrado inclui itens ainda em conferência; as listas de estudo mostram apenas a seleção liberada. Questões pessoais ficam à parte."
            : `${collection === "enem" ? "ENEM" : "Concursos públicos"} · ${source === "all" ? "Todas as origens" : origins[source]}${query ? ` · Busca: ${query}` : ""}. Os dados respeitam os filtros da página.`}
        </DialogDescription>
      </DialogHeader>
      <div className="catalog-details__scroll">
        {view === "platform" ? (
          <div className="catalog-details__summary">
            <div>
              <strong>{platformSummary ? n(platformSummary.registered) : "—"}</strong>
              <span>{QUESTION_COUNT_LABELS.registered}</span>
            </div>
            <div>
              <strong>{platformSummary ? n(platformSummary.available) : "—"}</strong>
              <span>{QUESTION_COUNT_LABELS.available}</span>
            </div>
            <div>
              <strong>{reviewedCount === undefined ? "—" : n(reviewedCount)}</strong>
              <span>{QUESTION_COUNT_LABELS.reviewed}</span>
            </div>
          </div>
        ) : (
          <div className="catalog-details__summary">
            <div>
              <strong>{n(scope.length)}</strong>
              <span>questões na seleção</span>
            </div>
            <div>
              <strong>{n(catalogGroups(scope, "subject").length)}</strong>
              <span>disciplinas</span>
            </div>
            <div>
              <strong>
                {years.length
                  ? Math.min(...years) === Math.max(...years)
                    ? String(years[0])
                    : `${Math.min(...years)}–${Math.max(...years)}`
                  : "—"}
              </strong>
              <span>anos do acervo</span>
            </div>
          </div>
        )}

        {view === "platform" ? (
          <>
            <h3>Escolha sua preparação</h3>
            <div className="catalog-details__areas">
              {(["contests", "enem"] as const).map((area) => {
                const questions = availableQuestionBank(publicCatalog, area);
                return (
                  <article key={area}>
                    <span className="catalog-details__eyebrow">
                      {area === "enem" ? "FORMAÇÃO ACADÊMICA" : "CARREIRAS PÚBLICAS"}
                    </span>
                    <h4>{area === "enem" ? "ENEM" : "Concursos públicos"}</h4>
                    <strong>{n(questions.length)} questões</strong>
                    <p>
                      {n(questionBankExams(questions).length)} provas ·{" "}
                      {n(catalogGroups(questions, "subject").length)} disciplinas
                    </p>
                    <div className="catalog-details__area-actions">
                      {(["official", "curated"] as const).map((origin) => {
                        const count = questions.filter((q) => q.source === origin).length;
                        const label = `${origin === "official" ? "Oficiais" : "Autorais"} · ${n(count)}`;
                        return count ? (
                          <Button key={origin} asChild variant="outline">
                            <Link
                              to="/dashboard/question-trainer"
                              search={questionBankSearch(area, origin, "", {})}
                              onClick={onClose}
                            >
                              {label}
                              <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        ) : (
                          <Button key={origin} variant="outline" disabled>
                            {label}
                          </Button>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
            <h3>Origem das questões publicadas</h3>
            <div className="catalog-details__origins">
              {(["official", "curated"] as const).map((origin) => (
                <div key={origin}>
                  <span>{origin === "official" ? "Provas oficiais" : "Questões autorais"}</span>
                  <strong>{n(publicCatalog.filter((q) => q.source === origin).length)}</strong>
                </div>
              ))}
            </div>
            <p className="catalog-details__note">
              O total cadastrado e as disponíveis vêm do mesmo resumo da homepage. “Revisadas com
              exemplo” indica a revisão didática adicional das questões completas deste catálogo. A
              área, o cargo e os filtros de estudo podem reduzir a seleção. Seu caderno pessoal não
              entra no total global.
            </p>
          </>
        ) : (
          <>
            <label className="catalog-details__search">
              <Search aria-hidden="true" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setLimit(20);
                }}
                aria-label="Buscar nos detalhes"
                placeholder={
                  view === "questions"
                    ? "Disciplina, banca, ano ou código…"
                    : view === "exams"
                      ? "Buscar por prova, ano ou banca…"
                      : "Buscar pelo nome…"
                }
              />
            </label>
            <p className="catalog-details__note" role="status">
              {n(listTotal)} {view === "questions" ? "questões encontradas" : "grupos encontrados"}.
              Abra uma seleção para treinar.
            </p>
            <div className="catalog-details__list">
              {view === "questions"
                ? searched.slice(0, limit).map((q) => (
                    <Link
                      key={`${q.table}:${q.id}`}
                      to="/dashboard/question-trainer"
                      search={questionBankSearch(collection, q.source, questionCode(q), {})}
                      onClick={onClose}
                      className="catalog-details__row"
                    >
                      <span>
                        <small>
                          {questionCode(q)} · {origins[q.source]}
                        </small>
                        <strong>{q.subject}</strong>
                        <small>
                          {q.contest} · {q.board} · {q.year}
                        </small>
                      </span>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  ))
                : groups.slice(0, limit).map((group) => {
                    const subjects = catalogGroups(group.questions, "subject");
                    const boards = catalogGroups(group.questions, "board");
                    const official = group.questions.filter((q) => q.source === "official").length;
                    return (
                      <Link
                        key={group.key}
                        to="/dashboard/question-trainer"
                        search={questionBankSearch(collection, source, query, group.selection)}
                        onClick={onClose}
                        className="catalog-details__row"
                      >
                        <span>
                          <strong>{group.name}</strong>
                          <small>
                            {view === "subjects"
                              ? `${boards.length} bancas`
                              : `${subjects.length} disciplinas`}
                            {" · "}
                            {n(official)} oficiais
                            {view === "exams" ? ` · ${group.questions[0]?.career}` : ""}
                          </small>
                          <span className="catalog-details__bar" aria-hidden="true">
                            <i
                              style={{
                                width: `${Math.max(2, (group.questions.length / Math.max(1, scope.length)) * 100)}%`,
                              }}
                            />
                          </span>
                        </span>
                        <span className="catalog-details__count">
                          <strong>{n(group.questions.length)}</strong>
                          <small>questões</small>
                          <ArrowUpRight aria-hidden="true" />
                        </span>
                      </Link>
                    );
                  })}
            </div>
            {!listTotal && (
              <div className="catalog-details__empty">
                <BookOpenCheck aria-hidden="true" />
                <h3>Nenhum resultado nesta seleção</h3>
                <p>
                  {search
                    ? "Tente outro termo ou limpe a busca."
                    : "Altere a área ou os filtros na página do acervo."}
                </p>
                {search && (
                  <Button variant="outline" onClick={() => setSearch("")}>
                    Limpar busca
                  </Button>
                )}
              </div>
            )}
            {listTotal > limit && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setLimit((value) => value + 20)}
              >
                Mostrar mais · {n(listTotal - limit)} restantes
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
}
