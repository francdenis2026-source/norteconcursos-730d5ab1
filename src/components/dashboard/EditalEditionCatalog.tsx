import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filterEditalEditions, editalSourceLabel, type EditalEdition } from "@/lib/editalCatalog";
import { contestOptions, editionOptions, roleOptions } from "@/lib/editalSelection";

/** One study catalog for the goal page and the syllabus reader. */
export function EditalEditionCatalog({
  editions,
  failed = false,
  activeEditionId,
}: {
  editions: EditalEdition[];
  failed?: boolean;
  /** Quando informado (mesmo nulo), mostra o bloco "Seu concurso em foco" antes dos demais. */
  activeEditionId?: string | null;
}) {
  const [editionQuery, setEditionQuery] = useState("");
  const [year, setYear] = useState("all");
  const [kind, setKind] = useState("all");
  const [selectedContest, setSelectedContest] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEdition, setSelectedEdition] = useState("");
  const activeEditions = editions.filter((edition) => edition.status === "active");
  const contests = contestOptions(activeEditions);
  const roles = roleOptions(activeEditions, selectedContest);
  const availableEditions = editionOptions(activeEditions, selectedContest, selectedRole);
  const visibleEditions = filterEditalEditions(editions, editionQuery, year, kind);
  const years = [...new Set(editions.map((e) => e.contest_year))].sort((a, b) => b - a);
  const showMine = activeEditionId !== undefined;
  const active = activeEditionId ? editions.find((e) => e.id === activeEditionId) : undefined;
  const filtering = !!editionQuery || year !== "all" || kind !== "all";
  const groups = new Map<string, EditalEdition[]>();
  for (const e of visibleEditions) {
    if (e.id === active?.id) continue;
    groups.set(e.contest_name, [...(groups.get(e.contest_name) ?? []), e]);
  }
  const orderedGroups = [...groups.entries()]
    .map(([name, list]) => [name, [...list].sort((a, b) => b.contest_year - a.contest_year || a.role_name.localeCompare(b.role_name, "pt-BR"))] as const)
    .sort((a, b) => b[1][0]!.contest_year - a[1][0]!.contest_year || a[0].localeCompare(b[0], "pt-BR"));
  useEffect(() => {
    if (!roles.includes(selectedRole)) setSelectedRole(roles.length === 1 ? roles[0]! : "");
  }, [roles, selectedRole]);
  useEffect(() => {
    if (!availableEditions.some((edition) => edition.id === selectedEdition)) {
      const onlyEdition = availableEditions.length === 1 ? availableEditions[0] : undefined;
      setSelectedEdition(onlyEdition?.id ?? "");
      if (onlyEdition) {
        window.location.href = `/dashboard/edital?edition=${encodeURIComponent(onlyEdition.id)}`;
      }
    }
  }, [availableEditions, selectedEdition]);
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
      {showMine && <section className="edital-mine" aria-labelledby="edital-mine-title">
        {active ? (
          <>
            <span className="edital-mine__tag">Seu concurso em foco</span>
            <h2 id="edital-mine-title">
              {active.contest_name} · {active.contest_year}
            </h2>
            <p>
              {active.role_name} · {active.exam_board || "Banca não informada"}
            </p>
            <Link to="/dashboard/edital" search={{ edition: active.id }} className="edital-mine__cta">
              Abrir meu edital <ChevronRight aria-hidden className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <>
            <span className="edital-mine__tag">Seu concurso em foco</span>
            <h2 id="edital-mine-title">Você ainda não escolheu um edital principal</h2>
            <p>
              Escolha um concurso abaixo, abra o programa e toque em “Usar como edital principal”. Ele
              passa a aparecer aqui e no menu.
            </p>
          </>
        )}
      </section>}
      <div className="edital-catalog-intro">
        <div>
          <h2>{showMine ? "Outros concursos" : "Escolha o concurso e o cargo"}</h2>
          <p>
            {orderedGroups.length} {orderedGroups.length === 1 ? "concurso" : "concursos"} · cada um
            com suas edições e cargos, separados do seu
          </p>
        </div>
        <Badge variant="outline">
          {editions.filter((e) => e.status === "archived").length} arquivadas
        </Badge>
      </div>
      <div className="edital-catalog-filters">
        <div>
          <Label htmlFor="edition-contest">1. Concurso ativo</Label>
          <select
            id="edition-contest"
            value={selectedContest}
            onChange={(e) => {
              setSelectedContest(e.target.value);
              setSelectedRole("");
              setSelectedEdition("");
            }}
          >
            <option value="">Selecione um concurso</option>
            {contests.map((contest) => (
              <option key={contest} value={contest}>
                {contest}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="edition-role">2. Cargo</Label>
          <select
            id="edition-role"
            value={selectedRole}
            disabled={!selectedContest}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setSelectedEdition("");
            }}
          >
            <option value="">Selecione um cargo</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="edition-selection">3. Edição</Label>
          <select
            id="edition-selection"
            value={selectedEdition}
            disabled={!selectedRole}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedEdition(id);
              if (id) window.location.href = `/dashboard/edital?edition=${encodeURIComponent(id)}`;
            }}
          >
            <option value="">Selecione o ano do edital</option>
            {availableEditions.map((edition) => (
              <option key={edition.id} value={edition.id}>
                {edition.contest_year} {edition.exam_board ? `· ${edition.exam_board}` : ""}
              </option>
            ))}
          </select>
        </div>
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
      <div className="edital-groups">
        {orderedGroups.map(([contest, list]) => (
          <details key={contest} className="edital-group" open={filtering || orderedGroups.length === 1}>
            <summary>
              <strong>{contest}</strong>
              <span>
                {list.length} {list.length === 1 ? "edição" : "edições"} · mais recente {list[0]!.contest_year}
              </span>
              <ChevronRight aria-hidden className="edital-group__chevron h-4 w-4" />
            </summary>
            <div className="edital-editions">
              {list.map((e) => (
                <Link to="/dashboard/edital" search={{ edition: e.id }} key={e.id} className="edital-edition">
                  <div className="edital-edition-meta">
                    <strong>{e.contest_year}</strong>
                    <span>{e.status === "archived" ? "Edição arquivada" : editalSourceLabel(e)}</span>
                  </div>
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
          </details>
        ))}
      </div>
      {!orderedGroups.length && (
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
    </section>
  );
}
