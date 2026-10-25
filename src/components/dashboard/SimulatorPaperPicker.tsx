import { useMemo, useState, useEffect } from "react";
import { simulatorPapers, type SimulatorQuestion } from "@/lib/simulatorSession";
import { examCoverage } from "@/lib/examCoverage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
export function SimulatorPaperPicker({
  catalog,
  selected,
  onSelect,
}: {
  catalog: SimulatorQuestion[];
  selected: string;
  onSelect: (key: string) => void;
}) {
  const [query, setQuery] = useState(""),
    [page, setPage] = useState(0);
  const papers = useMemo(() => simulatorPapers(catalog), [catalog]);
  const fold = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const words = fold(query).trim().split(/\s+/).filter(Boolean);
  const visible = papers.filter((p) => words.every((w) => fold(p.title).includes(w)));
  useEffect(() => setPage(0), [query, catalog]);
  return (
    <section aria-label="Provas cadastradas" className="space-y-3">
      <Label htmlFor="simulator-paper-search">Buscar prova por concurso, cargo, banca ou ano</Label>
      <Input
        id="simulator-paper-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex.: Polícia Civil, investigador, 2025…"
      />
      <p role="status" className="text-sm text-muted-foreground">
        {visible.length} provas identificadas no acervo elegível
      </p>
      <div className="grid gap-2">
        {visible.slice(page * 6, page * 6 + 6).map((p) => (
          <button
            type="button"
            key={p.key}
            aria-pressed={selected === p.key}
            onClick={() => onSelect(p.key)}
            className={`rounded-xl border p-4 text-left transition ${selected === p.key ? "border-primary bg-primary/10 ring-1 ring-primary" : "hover:bg-muted"}`}
          >
            <strong className="block">{p.question.contest}</strong>
            <span className="block text-sm">
              {p.question.career} · {p.question.board} · {p.question.year}
            </span>
            <span className="text-xs text-muted-foreground">
              {p.questions.length} questões disponíveis ·{" "}
              {new Set(p.questions.map((q) => q.subject)).size} disciplinas
            </span>
            {examCoverage(p.question, p.questions.length) && (
              <span className="block text-xs font-medium">
                {examCoverage(p.question, p.questions.length)}
              </span>
            )}
          </button>
        ))}
      </div>
      {!visible.length && (
        <p className="rounded-xl border border-dashed p-4 text-sm">
          Nenhuma prova identificada corresponde à busca. Tente outros termos ou crie um simulado
          personalizado.
        </p>
      )}
      {visible.length > 6 && (
        <nav aria-label="Páginas de provas" className="flex items-center justify-between gap-2">
          <Button variant="outline" disabled={!page} onClick={() => setPage((p) => p - 1)}>
            Anterior
          </Button>
          <span className="text-sm">
            {page + 1} de {Math.ceil(visible.length / 6)}
          </span>
          <Button
            variant="outline"
            disabled={(page + 1) * 6 >= visible.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima página
          </Button>
        </nav>
      )}
    </section>
  );
}
