import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Gavel, Search } from "lucide-react";
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
