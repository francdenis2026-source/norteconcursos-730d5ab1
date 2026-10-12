import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Gavel, Lightbulb, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/dashboard/PageHero";
import {
  CATEGORIAS,
  GRAVIDADES,
  INFRACOES,
  PRAZOS,
  RESOLUCOES,
  RESOLUCOES_COBRADAS,
  RESOLUCOES_FONTE,
  RESOLUCOES_VERIFICADO_EM,
  SUSPENSAO_PONTOS,
  VELOCIDADES,
  valorMulta,
  type Gravidade,
} from "@/data/ctbPanel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/ctb")({ component: CtbPanelPage });

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const GRAV_STYLE: Record<Gravidade, string> = {
  leve: "bg-emerald-100 text-emerald-900",
  media: "bg-amber-100 text-amber-900",
  grave: "bg-orange-100 text-orange-900",
  gravissima: "bg-red-100 text-red-900",
};

function resolutionLearning(subject: string) {
  const text = norm(subject);
  if (text.includes("alcool") || text.includes("substancia")) {
    return { points: ["Identifique a conduta fiscalizada e o artigo do CTB relacionado.", "Separe a infração administrativa da eventual consequência criminal.", "Confira quando a nova resolução substitui ou altera a anterior."], example: "Uma blitz pode aplicar o procedimento administrativo mesmo quando o condutor se recusa ao teste; a recusa tem enquadramento próprio." };
  }
  if (text.includes("formacao") || text.includes("habilitacao")) {
    return { points: ["Confira as etapas exigidas para cada categoria de habilitação.", "Observe os documentos, exames e prazos previstos.", "Não misture regra de aprendizagem com regra de renovação da CNH."], example: "Um candidato à categoria D precisa cumprir os requisitos de idade, tempo de habilitação e exames antes de iniciar a etapa prática." };
  }
  if (text.includes("remocao") || text.includes("leilao") || text.includes("guarda")) {
    return { points: ["Diferencie remoção, custódia, liberação e leilão.", "Marque os prazos que começam após o recolhimento do veículo.", "Confira quem pode retirar o veículo e quais documentos são exigidos."], example: "Um veículo removido não é automaticamente perdido: primeiro há custódia e possibilidade de liberação; o leilão depende do prazo e do procedimento oficial." };
  }
  if (text.includes("sinalizacao") || text.includes("velocidade")) {
    return { points: ["Leia o anexo técnico junto com o texto principal.", "Relacione a regra ao tipo de via, sinal ou equipamento.", "Confira alterações posteriores antes de memorizar o número."], example: "A mesma placa pode ter efeito diferente se estiver acompanhada de sinalização complementar; na prova, procure primeiro a combinação completa." };
  }
  return { points: ["Comece pelo objeto e pelo alcance da resolução.", "Marque os artigos, anexos e exceções que alteram a regra geral.", "Confira a situação oficial e as normas que a alteraram ou revogaram."], example: "Ao estudar uma regra de registro de veículo, transforme o texto em uma sequência: quem deve fazer, qual documento usar e qual prazo observar." };
}

function CtbPanelPage() {
  const [q, setQ] = React.useState("");
  const [grav, setGrav] = React.useState<Gravidade | "todas">("todas");
  const [qRes, setQRes] = React.useState("");

  const infracoes = React.useMemo(
    () =>
      INFRACOES.filter(
        (i) =>
          (grav === "todas" || i.gravidade === grav) &&
          (!q || norm(`${i.art} ${i.conduta} ${i.extra ?? ""}`).includes(norm(q))),
      ),
    [q, grav],
  );
  const resolucoes = React.useMemo(
    () => RESOLUCOES.filter((r) => !qRes || norm(`${r.numero} ${r.assunto} ${r.situacao}`).includes(norm(qRes))),
    [qRes],
  );

  return (
    <div className="space-y-6">
      <PageHero
        image="toolkit"
        kicker="Trânsito"
        icon={Gavel}
        title="Painel do Código de Trânsito Brasileiro"
        description="Multas, pontos, velocidades, habilitação, prazos e as resoluções do Contran em um só lugar, conferidos com o texto oficial vigente."
        actions={
          <Link
            to="/dashboard/legal-course/$slug"
            params={{ slug: "transito" }}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Ler o CTB artigo por artigo
          </Link>
        }
      />

      <Tabs defaultValue="infracoes">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="infracoes">Infrações e multas</TabsTrigger>
          <TabsTrigger value="pontos">Pontos e suspensão</TabsTrigger>
          <TabsTrigger value="velocidade">Velocidades</TabsTrigger>
          <TabsTrigger value="habilitacao">Habilitação</TabsTrigger>
          <TabsTrigger value="prazos">Prazos</TabsTrigger>
          <TabsTrigger value="resolucoes">Resoluções do Contran</TabsTrigger>
        </TabsList>

        <TabsContent value="infracoes" className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-4">
            {(Object.keys(GRAVIDADES) as Gravidade[]).map((g) => (
              <Card key={g}>
                <CardContent className="p-4">
                  <Badge className={cn("mb-2", GRAV_STYLE[g])}>{GRAVIDADES[g].label}</Badge>
                  <p className="text-xl font-semibold">{brl(GRAVIDADES[g].multa)}</p>
                  <p className="text-sm text-muted-foreground">{GRAVIDADES[g].pontos} pontos</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Valores do art. 258 e pontos do art. 259 do CTB. Multas com fator (ex.: "3 vezes") multiplicam o valor-base; confira o artigo.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar infração (ex.: celular, cinto, art. 218)" className="pl-9" />
            </div>
            <select
              value={grav}
              onChange={(e) => setGrav(e.target.value as Gravidade | "todas")}
              className="rounded-md border bg-background px-3 py-2 text-sm"
              aria-label="Filtrar por gravidade"
            >
              <option value="todas">Todas as gravidades</option>
              {(Object.keys(GRAVIDADES) as Gravidade[]).map((g) => (
                <option key={g} value={g}>{GRAVIDADES[g].label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            {infracoes.map((i) => (
              <Card key={`${i.art}-${i.conduta}`}>
                <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">{i.conduta}</p>
                    <p className="text-xs text-muted-foreground">
                      CTB, art. {i.art}{i.extra ? ` · ${i.extra}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge className={GRAV_STYLE[i.gravidade]}>{GRAVIDADES[i.gravidade].label}</Badge>
                    <span className="text-sm font-semibold">{brl(valorMulta(i))}</span>
                    <span className="text-xs text-muted-foreground">{GRAVIDADES[i.gravidade].pontos} pts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!infracoes.length && <p className="text-sm text-muted-foreground">Nenhuma infração encontrada.</p>}
          </div>
        </TabsContent>

        <TabsContent value="pontos">
          <Card>
            <CardHeader>
              <CardTitle>Suspensão do direito de dirigir por pontos (art. 261)</CardTitle>
              <CardDescription>Contagem em 12 meses. Prazos de suspensão: 6 meses a 1 ano (reincidência em 12 meses: 8 meses a 2 anos).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {SUSPENSAO_PONTOS.map((s) => (
                <div key={s.pontos} className="flex items-center justify-between rounded-md border p-3 text-sm">
                  <span>{s.quando}</span>
                  <Badge variant="secondary">{s.pontos} pontos</Badge>
                </div>
              ))}
              <p className="pt-2 text-xs text-muted-foreground">
                Para quem exerce atividade remunerada ao veículo, a suspensão por pontos ocorre ao atingir 40 pontos, independentemente da natureza das infrações (art. 261, §5º).
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="velocidade">
          <Card>
            <CardHeader>
              <CardTitle>Velocidade máxima sem sinalização (art. 61)</CardTitle>
              <CardDescription>Onde houver sinalização regulamentadora, vale o limite da placa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {VELOCIDADES.map((v) => (
                <div key={v.via} className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                  <span>{v.via}</span>
                  <Badge variant="secondary">{v.limite}</Badge>
                </div>
              ))}
              <p className="pt-2 text-xs text-muted-foreground">
                Excesso (art. 218): até 20% acima = média; de 20% a 50% = grave; acima de 50% = gravíssima, com multa 3 vezes e suspensão.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habilitacao" className="space-y-3">
          {CATEGORIAS.map((c) => (
            <Card key={c.cat}>
              <CardContent className="flex gap-4 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-lg font-bold text-primary-foreground">{c.cat}</span>
                <p className="text-sm">{c.descricao}</p>
              </CardContent>
            </Card>
          ))}
          <p className="text-xs text-muted-foreground">
            O processo de formação, os cursos e os documentos de habilitação são regulados pela Resolução Contran nº 1.020/2025 (veja a aba de resoluções).
          </p>
        </TabsContent>

        <TabsContent value="prazos">
          <Card>
            <CardContent className="space-y-2 p-4">
              {PRAZOS.map((p) => (
                <div key={p.item} className="flex flex-col gap-1 rounded-md border p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <span>{p.item}</span>
                  <span className="flex items-center gap-2">
                    <Badge variant="secondary">{p.valor}</Badge>
                    <span className="text-xs text-muted-foreground">art. {p.art}</span>
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolucoes" className="space-y-4">
          <Card>
            <CardContent className="space-y-2 p-4 text-sm">
              <p>
                Situação conferida na página oficial do Ministério dos Transportes em <strong>{RESOLUCOES_VERIFICADO_EM}</strong>. A relação abaixo
                reúne as resoluções recentes de maior impacto para provas, não todas as vigentes.
              </p>
              <a href={RESOLUCOES_FONTE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-primary underline">
                Consultar o texto e a situação oficial de qualquer resolução <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <p className="text-xs text-muted-foreground">
                Resoluções são alteradas e revogadas com frequência. Antes de usar uma resolução em prova, confirme a vigência na fonte oficial.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mais cobradas em concursos</CardTitle>
              <CardDescription>
                Resoluções do edital da PRF, em ordem de questões no guia de estudo da TEC Concursos (fonte secundária: mostra tendência, não é dado oficial). O edital da PF 2025 não inclui trânsito nem resoluções do Contran. A coluna de situação vem da página oficial do Contran.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {RESOLUCOES_COBRADAS.map((r) => (
                <div key={r.numero} className="flex flex-col gap-1 rounded-md border p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <span><strong>Res. {r.numero}</strong> · {r.assunto}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="text-xs text-muted-foreground">{r.questoes} questões</span>
                    <Badge className={cn(r.estado === "revogada" ? "bg-red-100 text-red-900" : r.estado === "alterada" ? "bg-amber-100 text-amber-900" : r.estado === "vigente" ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700")}>
                      {r.estado === "revogada" ? "Revogada" : r.estado === "alterada" ? "Alterada" : r.estado === "vigente" ? "Em vigor" : "Confirmar"}
                    </Badge>
                  </span>
                  <span className="text-xs text-muted-foreground sm:basis-full">{r.situacao}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={qRes} onChange={(e) => setQRes(e.target.value)} placeholder="Buscar resolução (número ou assunto)" className="pl-9" />
          </div>
          <div className="space-y-2">
            {resolucoes.map((r) => (
              <Card key={r.numero}>
                <CardContent className="space-y-1 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Res. {r.numero}</Badge>
                    <span className="text-xs text-muted-foreground">{r.data}</span>
                  </div>
                  <p className="text-sm font-medium">{r.assunto}</p>
                  <p className="text-xs text-muted-foreground">{r.situacao}</p>
                  {r.nota && <p className="text-xs font-medium text-amber-700">ATUALIZAÇÃO: {r.nota}</p>}
                  <details className="ctb-resolution-reader mt-3 rounded-lg border bg-muted/30 p-3">
                    <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary">
                      <BookOpen className="h-4 w-4" /> Ler guia da resolução e pontos-chave
                    </summary>
                    <div className="mt-3 grid gap-3 text-sm sm:grid-cols-[1fr_1.1fr]">
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">Pontos importantes</p>
                        <ul className="list-disc space-y-1 pl-5">
                          {resolutionLearning(r.assunto).points.map((point) => <li key={point}>{point}</li>)}
                        </ul>
                      </div>
                      <div className="rounded-md border border-amber-300/60 bg-amber-50 p-3 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-100">
                        <p className="mb-1 flex items-center gap-1 text-xs font-bold uppercase tracking-wide"><Lightbulb className="h-3.5 w-3.5" /> Exemplo do dia a dia</p>
                        <p className="leading-6">{resolutionLearning(r.assunto).example}</p>
                      </div>
                    </div>
                    <a href={RESOLUCOES_FONTE} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary underline">
                      Abrir documento e situação oficial <ExternalLink className="h-3 w-3" />
                    </a>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
