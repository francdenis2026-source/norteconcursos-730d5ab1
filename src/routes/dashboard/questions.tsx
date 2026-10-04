import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { MockService } from "@/services/mockService";
import type { Contest } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/dashboard/questions")({
  component: QuestionsCatalog,
  head: () => ({ meta: [{ title: "Concursos disponíveis | Norte Concursos" }] }),
});
function QuestionsCatalog() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [focus, setFocus] = useState<string>();
  const [search, setSearch] = useState("");
  const [career, setCareer] = useState("");
  const [board, setBoard] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [detail, setDetail] = useState<Contest | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    void Promise.all([MockService.getContests(), MockService.getFocusedContest()])
      .then(([rows, focused]) => {
        if (active) {
          setContests(rows);
          setFocus(focused?.id);
        }
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [refresh]);
  const visible = useMemo(
    () =>
      contests.filter(
        (c) =>
          (!career || c.career === career) &&
          (!board || c.examBoard === board) &&
          `${c.name} ${c.agency} ${c.role} ${c.examBoard}`
            .toLocaleLowerCase("pt-BR")
            .includes(search.toLocaleLowerCase("pt-BR")),
      ),
    [contests, career, board, search],
  );
  async function choose(c: Contest) {
    setSaving(c.id);
    try {
      await MockService.setFocusedContest(c.id);
      setFocus(c.id);
      toast.success("Concurso em foco atualizado na sua conta.");
    } catch {
      toast.error("Não foi possível definir o foco. Tente novamente.");
    } finally {
      setSaving(null);
    }
  }
  const date = (value?: string) =>
    value ? new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString("pt-BR") : "A confirmar";
  const money = (value: number) =>
    value > 0
      ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : "A confirmar";
  return (
    <section className="space-y-6">
      <header className="catalog-command-hero tactical-feature-hero">
        <span className="internal-hero-kicker">Seu próximo objetivo</span>
        <h1>Concursos disponíveis</h1>
        <p>Consulte os concursos cadastrados e escolha o foco da sua preparação.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <label>
          Pesquisar
          <Input
            placeholder="Órgão, cargo ou banca"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <label>
          Carreira
          <select
            className="institutional-input w-full"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          >
            <option value="">Todas as carreiras</option>
            {[...new Set(contests.map((c) => c.career))].sort().map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Banca
          <select
            className="institutional-input w-full"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
          >
            <option value="">Todas as bancas</option>
            {[...new Set(contests.map((c) => c.examBoard))]
              .filter(Boolean)
              .sort()
              .map((b) => (
                <option key={b}>{b}</option>
              ))}
          </select>
        </label>
      </div>
      {loading ? (
        <p role="status">Carregando concursos…</p>
      ) : error ? (
        <div role="alert">
          <p>Não foi possível consultar o catálogo.</p>
          <Button onClick={() => setRefresh((r) => r + 1)}>Tentar novamente</Button>
        </div>
      ) : contests.length === 0 ? (
        <Card>
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-bold">O catálogo de editais está sendo atualizado.</h2>
            <p>
              Os concursos aparecerão aqui quando forem cadastrados. Você já pode estudar com o
              acervo de provas e questões.
            </p>
            <Button asChild>
              <Link to="/dashboard/question-bank">Abrir banco de questões</Link>
            </Button>
          </CardContent>
        </Card>
      ) : visible.length === 0 ? (
        <p>Nenhum concurso encontrado com estes filtros.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((c) => (
            <Card key={c.id} className="command-panel">
              <CardHeader>
                <span>
                  {c.career} · {c.status}
                </span>
                <CardTitle>{c.name}</CardTitle>
                {focus === c.id && <strong>Seu foco atual</strong>}
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  {c.role} · {c.examBoard || "Banca a confirmar"}
                </p>
                <p>
                  {c.location} · {c.educationLevel}
                </p>
                <p>Prova: {date(c.examDate)}</p>
                <p>Vagas: {c.vacancies > 0 ? c.vacancies : "A confirmar"}</p>
                <p>Remuneração informada: {money(c.salary)}</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" onClick={() => setDetail(c)}>
                  Ver detalhes
                </Button>
                <Button disabled={!!saving || focus === c.id} onClick={() => void choose(c)}>
                  {saving === c.id
                    ? "Salvando…"
                    : focus === c.id
                      ? "Foco definido"
                      : "Definir foco"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <Dialog
        open={!!detail}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{detail?.name}</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-3">
              <p>Órgão: {detail.agency}</p>
              <p>Cargo: {detail.role}</p>
              <p>Banca: {detail.examBoard || "A confirmar"}</p>
              <p>Situação: {detail.status}</p>
              <p>
                Inscrições: {date(detail.startDate)} até {date(detail.endDate)}
              </p>
              <p>Prova: {date(detail.examDate)}</p>
              <p>Confirme prazos e condições no edital oficial antes de se inscrever.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
