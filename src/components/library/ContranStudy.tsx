import { useState } from "react";
import { BookOpen, ExternalLink, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONTRAN_CHECKED_AT, CONTRAN_GUIDES, CONTRAN_INDEX_URL } from "@/data/contranGuides";
import { CONTRAN_DIDATICA, type ContranDidatica } from "@/data/contranDidatica";
import { StudyText, HighlightToggle } from "./StudyText";
import { RESOLUCOES_COBRADAS } from "@/data/ctbPanel";
import { contranDate, currentContranGuides, type ContranGuide } from "@/lib/contranStudy";

function OfficialText({ guide }: { guide: ContranGuide }) {
  const [text, setText] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const load = async () => {
    if (text || pending || !guide.textPath) return;
    setPending(true);
    setFailed(false);
    try {
      const response = await fetch(guide.textPath);
      if (!response.ok) throw new Error("Texto indisponível");
      const document = await response.json() as { text?: unknown };
      if (typeof document.text !== "string" || !document.text.trim()) throw new Error("Texto indisponível");
      setText(document.text);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };
  return <details className="rounded-xl border p-3" onToggle={(e) => { if (e.currentTarget.open) void load(); }}>
    <summary className="cursor-pointer text-sm font-semibold">Consultar o texto do PDF oficial</summary>
    <p className="mt-2 text-xs leading-5 text-muted-foreground">Edição do documento consultado. Atos modificadores e retificações são indicados neste guia; o PDF original pode conservar trechos posteriormente alterados. Para uma regra específica, leia também o ato modificador.</p>
    {pending && <p className="mt-3 text-sm" role="status">Carregando o texto…</p>}
    {failed && <div className="mt-3 text-sm"><p>Não foi possível abrir o texto. Use o PDF oficial abaixo ou tente novamente.</p><button className="mt-2 font-semibold underline" onClick={() => void load()}>Tentar novamente</button></div>}
    {text && <pre className="mt-3 max-h-[36rem] overflow-auto whitespace-pre-wrap rounded-lg bg-muted/40 p-3 font-sans text-sm leading-6">{text}</pre>}
  </details>;
}

function DidaticaBlock({ d }: { d: ContranDidatica }) {
  return <div className="space-y-4">
    <section className="rounded-xl border-l-4 border-sky-500 bg-sky-50/60 p-3 dark:bg-sky-950/20">
      <h4 className="text-sm font-bold">Explicação passo a passo</h4>
      <div className="mt-2 space-y-2 text-sm leading-6">{d.simples.map((p) => <p key={p}><StudyText text={p} /></p>)}</div>
    </section>
    {d.atualizacoes && d.atualizacoes.length > 0 && <section className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-3 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
      <h4 className="text-sm font-bold">Atualização: o que mudou depois</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">{d.atualizacoes.map((a) => <li key={a}><StudyText text={a} /></li>)}</ul>
    </section>}
    {d.quadro && <section className="rounded-xl border p-3">
      <h4 className="text-sm font-bold">{d.quadro.titulo}</h4>
      <dl className="mt-2 divide-y text-sm">{d.quadro.linhas.map(([k, v]) => <div key={k} className="grid gap-1 py-2 sm:grid-cols-[11rem_1fr]"><dt className="font-semibold">{k}</dt><dd><StudyText text={v} /></dd></div>)}</dl>
    </section>}
    {d.exemplos.length > 0 && <section className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-3 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">
      <h4 className="text-sm font-bold">Aplique em situações reais</h4>
      <ul className="mt-2 space-y-3 text-sm leading-6">{d.exemplos.map((e) => <li key={e.situacao}><p className="font-semibold"><StudyText text={e.situacao} /></p><details className="mt-1"><summary className="cursor-pointer text-xs font-semibold underline">Ver a resposta</summary><p className="mt-1"><StudyText text={e.resposta} /></p></details></li>)}</ul>
    </section>}
    {d.pegadinhas.length > 0 && <section className="rounded-xl border-l-4 border-rose-500 bg-rose-50 p-3 text-rose-950 dark:bg-rose-950/30 dark:text-rose-100">
      <h4 className="text-sm font-bold">Onde o candidato erra</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">{d.pegadinhas.map((p) => <li key={p}><StudyText text={p} /></li>)}</ul>
    </section>}
  </div>;
}

const guideKey = (g: ContranGuide) => `${g.number.toLocaleString("pt-BR")}/${g.year}`;
/** Número de questões de prova que citam a resolução (levantamento TEC Concursos, tendência); 0 quando não consta. */
const QUESTOES = new Map(RESOLUCOES_COBRADAS.map((r) => [r.numero, r.questoes]));
const cobradas = (g: ContranGuide) => QUESTOES.get(guideKey(g)) ?? 0;

export function ContranStudy({ query = "" }: { query?: string }) {
  // as mais cobradas em prova primeiro; empate mantém a ordem do catálogo (mais recentes antes)
  const guides = [...currentContranGuides(CONTRAN_GUIDES, query)].sort((a, b) => cobradas(b) - cobradas(a));
  const top = guides.filter((g) => cobradas(g) > 0).slice(0, 6);
  const total = currentContranGuides(CONTRAN_GUIDES).length;
  return <section className="space-y-4" aria-label="Consulta das resoluções do CONTRAN">
    <div className="rounded-xl border bg-card p-4 text-sm leading-6">
      <p className="font-semibold">{total} resoluções em vigor para estudar</p>
      <p className="mt-1 text-muted-foreground">Cada uma tem a explicação do Norte (elaborada a partir do texto oficial), um caso prático e a fonte oficial, em abas separadas. Fontes conferidas em {contranDate(CONTRAN_CHECKED_AT)}; resoluções totalmente revogadas ficam de fora.</p>
      <p className="mt-1 text-muted-foreground">Cobradas em concursos da PRF (Legislação de Trânsito). Para outras carreiras, confira o edital: o da PF 2025 não inclui Trânsito.</p>
      <div className="mt-2"><HighlightToggle /></div>
      <a className="mt-2 inline-flex items-center gap-1 font-semibold text-primary underline" href={CONTRAN_INDEX_URL} target="_blank" rel="noopener noreferrer">Catálogo oficial do CONTRAN <ExternalLink size={14} /></a>
    </div>
    {!query.trim() && top.length > 0 && <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100">
      <p className="font-semibold">Comece por estas: as mais cobradas em prova</p>
      <p className="mt-1 text-xs">Ordem baseada em levantamento de questões de provas anteriores; indica tendência, não é dado oficial. Os guias abaixo seguem essa ordem.</p>
      <ul className="mt-2 flex flex-wrap gap-2">{top.map((g) => <li key={guideKey(g)} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold dark:bg-amber-900/40">Res. {guideKey(g)} · {cobradas(g)} questões</li>)}</ul>
    </div>}
    {guides.map((guide) => <article key={`${guide.number}/${guide.year}`} className="rounded-2xl border bg-card p-4 sm:p-5">
      <header className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-100">Resolução {guideKey(guide)}</span>
        {cobradas(guide) > 0 && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-950 dark:bg-amber-950/50 dark:text-amber-100">Mais cobrada</span>}
      </header>
      <h3 className="mt-3 text-lg font-bold">{guide.title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{guide.points[0]}</p>
      <details className="mt-3 rounded-xl border bg-muted/20 p-3">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold"><BookOpen size={16} /> Estudar esta resolução</summary>
        <Tabs defaultValue="entenda" className="mt-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="entenda">Entenda</TabsTrigger>
            <TabsTrigger value="pratica">Na prática</TabsTrigger>
            <TabsTrigger value="oficial">Fonte oficial</TabsTrigger>
          </TabsList>
          <TabsContent value="entenda" className="mt-4 space-y-4">
            {CONTRAN_DIDATICA[guideKey(guide)] && <DidaticaBlock d={CONTRAN_DIDATICA[guideKey(guide)]!} />}
            <section className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50/50 p-3 dark:bg-indigo-950/20">
              <h4 className="text-sm font-bold">Em resumo</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">{guide.points.map((point) => <li key={point}><StudyText text={point} /></li>)}</ul>
            </section>
            <section className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-3 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
              <h4 className="text-sm font-bold">Cuidado na prova</h4>
              <p className="mt-1 text-sm leading-6"><StudyText text={guide.warning} /></p>
            </section>
            <p className="text-xs text-muted-foreground">Explicação elaborada pelo Norte a partir do texto oficial, para estudo. Em caso de dúvida, vale o texto da norma (aba Fonte oficial).</p>
          </TabsContent>
          <TabsContent value="pratica" className="mt-4 space-y-4">
            <section className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-3 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">
              <h4 className="flex items-center gap-1 text-sm font-bold"><Lightbulb size={15} /> Caso prático</h4>
              <p className="mt-2 text-sm leading-6"><StudyText text={guide.example.scenario} /></p>
              <p className="mt-2 text-sm font-semibold">{guide.example.question}</p>
              <details className="mt-2 text-sm"><summary className="cursor-pointer font-semibold">Ver resposta comentada</summary><p className="mt-2 leading-6"><StudyText text={guide.example.answer} /></p></details>
            </section>
            <section className="rounded-xl border border-violet-300 bg-violet-50 p-3 text-violet-950 dark:border-violet-400/30 dark:bg-violet-950/30 dark:text-violet-100">
              <h4 className="text-sm font-bold">Agora é com você: o mesmo caso, com um detalhe diferente</h4>
              <p className="mt-1 text-xs">Mudar um detalhe pode mudar a resposta. Leia, decida sozinho e só depois confira.</p>
              <ol className="mt-3 space-y-3 text-sm leading-6">
                <li><span className="font-semibold">1. Nova situação.</span> <StudyText text={guide.example.variation} /></li>
                <li><span className="font-semibold">2. Pense:</span> a resposta do caso anterior continua valendo?</li>
                <li><details><summary className="cursor-pointer font-semibold underline">3. Conferir a resposta</summary><p className="mt-2 rounded-lg bg-white/70 p-2 dark:bg-black/20"><StudyText text={guide.example.variationAnswer} /></p></details></li>
              </ol>
            </section>
          </TabsContent>
          <TabsContent value="oficial" className="mt-4 space-y-3">
            {guide.reviewedScope && <p className="text-xs leading-5 text-muted-foreground">Este guia cobre: {guide.reviewedScope}. Outros dispositivos e anexos exigem consulta específica.</p>}
            <p className="text-xs text-muted-foreground">Publicada em {contranDate(guide.publicationDate)} · último ato relacionado em {contranDate(guide.lastRelatedActDate)} · conferida em {contranDate(guide.checkedAt)}</p>
            <details className="rounded-xl border p-3 text-xs"><summary className="cursor-pointer font-semibold">Situação no catálogo oficial</summary><p className="mt-2 leading-5 text-muted-foreground">{guide.officialSituation}</p></details>
            <OfficialText guide={guide} />
            <div className="space-y-2 text-xs">
              <a className="inline-flex items-center gap-1 font-semibold text-primary underline" href={guide.sourceUrl} target="_blank" rel="noopener noreferrer">Abrir PDF no portal oficial <ExternalLink size={13} /></a>
              {guide.relatedSources.length > 0 && <div><p className="mb-1 font-semibold">Atos que alteram ou complementam</p><ul className="space-y-1">{guide.relatedSources.map((source) => <li key={`${source.url}-${source.label}`}><a className="text-primary underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></div>}
            </div>
          </TabsContent>
        </Tabs>
      </details>
    </article>)}
    {!guides.length && <p className="rounded-xl border p-4 text-sm text-muted-foreground">Nenhum guia corresponde à busca. Consulte o catálogo oficial para outras resoluções.</p>}
  </section>;
}
