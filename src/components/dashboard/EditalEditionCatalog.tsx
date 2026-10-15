import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filterEditalEditions, editalSourceLabel, type EditalEdition } from "@/lib/editalCatalog";

/** One study catalog for the goal page and the syllabus reader. */
export function EditalEditionCatalog({
  editions,
  failed = false,
}: {
  editions: EditalEdition[];
  failed?: boolean;
}) {
  const [editionQuery, setEditionQuery] = useState("");
  const [year, setYear] = useState("all");
  const [kind, setKind] = useState("all");
  const [page, setPage] = useState(0);
  const visibleEditions = filterEditalEditions(editions, editionQuery, year, kind);
  const years = [...new Set(editions.map((e) => e.contest_year))].sort((a, b) => b - a);
  useEffect(() => setPage(0), [editionQuery, year, kind, editions]);
  if (failed) return null;
  if (!editions.length)
    return (
      <section className="edital-catalog">
        <h2>Nenhuma edição para estudo cadastrada</h2>
        <p>Você pode continuar sua preparação pelo acervo de questões.</p>
        <Button asChild>
          <Link to="/dashboard/question-bank">Consultar o acervo de questões</Link>
        </Button>
      </section>
    );
  return (
    <section className="edital-catalog" aria-label="Catálogo de editais">
      <div className="edital-catalog-intro">
        <div>
          <h2>Escolha o concurso e o cargo</h2>
          <p>{editions.length} edições cadastradas · das mais recentes às anteriores</p>
        </div>
        <Badge variant="outline">
          {editions.filter((e) => e.status === "archived").length} arquivadas
        </Badge>
      </div>
      <div className="edital-catalog-filters">
        <div>
          <Label htmlFor="edition-search">Concurso, cargo ou banca</Label>
          <Input
            id="edition-search"
            value={editionQuery}
            onChange={(e) => setEditionQuery(e.target.value)}
            placeholder="Ex.: Polícia Federal, delegado, Cebraspe…"
          />
        </div>
        <div>
          <Label htmlFor="edition-year">Ano da edição</Label>
          <select id="edition-year" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="all">Todos os anos</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="edition-kind">Documentação</Label>
          <select id="edition-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="all">Todas as edições</option>
            <option value="edital">Com edital cadastrado</option>
            <option value="reference">Referência de prova</option>
            <option value="archived">Arquivadas</option>
          </select>
        </div>
      </div>
      <p className="edital-note">
        O ano identifica a edição do concurso. A presença no catálogo não significa inscrições
        abertas. Referências de prova podem ter apenas parte do programa revisada.
      </p>
      <p role="status" className="text-sm text-muted-foreground">
        {visibleEditions.length}{" "}
        {visibleEditions.length === 1 ? "edição encontrada" : "edições encontradas"}
      </p>
      <div className="edital-editions">
        {visibleEditions.slice(page * 12, page * 12 + 12).map((e) => (
          <Link
            to="/dashboard/edital"
            search={{ edition: e.id }}
            key={e.id}
            className="edital-edition"
          >
            <div className="edital-edition-meta">
              <strong>{e.contest_year}</strong>
              <span>{e.status === "archived" ? "Edição arquivada" : editalSourceLabel(e)}</span>
            </div>
            <h3>{e.contest_name}</h3>
            <p>{e.role_name}</p>
            <div className="edital-edition-foot">
              <span>{e.exam_board || "Banca não informada"}</span>
              <span>
                Abrir programa <ChevronRight aria-hidden className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!visibleEditions.length && (
        <div className="edital-empty">
          <p>
            {editions.length
              ? "Nenhuma edição corresponde aos filtros."
              : "Nenhuma edição está disponível no catálogo."}
          </p>
          {editions.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                setEditionQuery("");
                setYear("all");
                setKind("all");
              }}
            >
              Limpar filtros
            </Button>
          )}
        </div>
      )}
      {visibleEditions.length > 12 && (
        <nav
          aria-label="Páginas do catálogo de editais"
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <Button variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Anterior
          </Button>
          <span className="text-sm">
            Página {page + 1} de {Math.ceil(visibleEditions.length / 12)}
          </span>
          <Button
            variant="outline"
            disabled={(page + 1) * 12 >= visibleEditions.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </Button>
        </nav>
      )}
    </section>
  );
}
