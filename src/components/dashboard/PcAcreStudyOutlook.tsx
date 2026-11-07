import { Link } from "@tanstack/react-router";
import { BookOpen, CheckSquare, Download, FileText, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { pcAcrePriorities, type PcAcreRole } from "@/lib/pcAcreOutlook";

function PcAcreEditalResource() {
  return (
    <Card className="overflow-hidden border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-card to-card">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <img
          src="/media/editais/edital-pcac-001-2026-capa.jpg"
          alt="Capa do guia Edital PC-AC 001/2026 explicado"
          width={180}
          height={254}
          loading="lazy"
          decoding="async"
          className="mx-auto w-28 shrink-0 rounded-lg border shadow-md sm:mx-0 sm:w-32"
        />
        <div className="flex-1 space-y-2">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
            <FileText className="h-3.5 w-3.5" />
            Edital nº 001 SEAD/PCAC publicado em 05/11/2026
          </p>
          <CardTitle className="text-lg">Edital PC-AC explicado, passo a passo</CardTitle>
          <CardDescription>
            139 vagas em 6 cargos, banca IDECAN. Guia completo com cargos, salários, inscrições,
            isenção, provas, cronograma e checklist de conteúdo programático por cargo.
          </CardDescription>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button asChild>
              <Link to="/dashboard/pc-acre-edital">
                <CheckSquare className="mr-2 h-4 w-4" />
                Abrir edital verticalizado
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar o guia em PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PcAcreStudyOutlook({
  role,
  onRoleChange,
}: {
  role: PcAcreRole;
  onRoleChange: (role: PcAcreRole) => void;
}) {
  const cargo = pcAcVerticalCargos.find((item) => item.id === role)!;
  const disciplineCount = cargo.blocks.reduce((total, block) => total + block.disciplines.length, 0);
  return (
    <section id="pc-acre" className="scroll-mt-24 space-y-4" aria-labelledby="pc-acre-title">
      <PcAcreEditalResource />
      <Card className="border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardHeader>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Target className="h-4 w-4" />
            Seu próximo passo
          </p>
          <CardTitle
            id="pc-acre-title"
            role="heading"
            aria-level={2}
            className="text-xl sm:text-2xl"
          >
            PC do Acre: o que priorizar
          </CardTitle>
          <CardDescription>
            Conteúdo programático confirmado no Edital nº 001 SEAD/PCAC (05/11/2026, banca
            IDECAN) — 139 vagas em 6 cargos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Cargo da PC do Acre">
            {pcAcVerticalCargos.map((item) => (
              <Button
                key={item.id}
                variant={role === item.id ? "default" : "outline"}
                aria-pressed={role === item.id}
                onClick={() => onRoleChange(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2" aria-live="polite">
            {[
              ["Vagas", cargo.vagas],
              ["Salário", cargo.salario],
              ["Disciplinas no edital", disciplineCount],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border bg-background/70 p-3">
                <p className="text-lg font-black tabular-nums sm:text-2xl">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pcAcrePriorities[role].map((item, index) => (
              <article key={item.title} className="rounded-xl border bg-background/70 p-4">
                <p className="mb-1 text-xs font-bold text-primary">Prioridade {index + 1}</p>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.task}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/dashboard/library">
                <BookOpen className="mr-2 h-4 w-4" />
                Abrir biblioteca
              </Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard/pc-acre-edital">
                <CheckSquare className="mr-2 h-4 w-4" />
                Ver conteúdo programático completo
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Disciplinas de {cargo.label}</CardTitle>
          <CardDescription>
            Conforme o Anexo III do edital, agrupadas por bloco. Abra o conteúdo programático
            completo para ver os itens numerados de cada disciplina.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cargo.blocks.map((block) => (
            <div key={block.title}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {block.title}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {block.disciplines.map((discipline) => (
                  <li
                    key={discipline.id}
                    className="rounded-lg border bg-background/70 p-3 text-sm font-medium"
                  >
                    {discipline.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <details className="rounded-xl border bg-card p-4">
        <summary className="cursor-pointer font-bold">Como interpretar esta análise</summary>
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <p>
            Vagas, salário e disciplinas vêm diretamente do Edital nº 001 SEAD/PCAC, publicado em
            05/11/2026 (Diário Oficial do Acre nº 14.388), banca IDECAN — não são mais uma
            estimativa baseada em outras Polícias Civis.
          </p>
          <p>
            A ordem das prioridades de estudo é editorial do Norte Concursos, pensada a partir do
            peso de cada disciplina na estrutura do edital; não é a ordem oficial de cobrança da
            banca nem garante a proporção de questões da prova.
          </p>
          <p>
            Para o detalhamento completo — item por item do conteúdo programático, checklist de
            estudo e exportação em PDF — use o edital verticalizado.
          </p>
        </div>
      </details>
    </section>
  );
}
