import { useState } from "react";
import { BookOpen, ExternalLink, Lightbulb } from "lucide-react";
import { CONTRAN_CHECKED_AT, CONTRAN_GUIDES, CONTRAN_INDEX_URL } from "@/data/contranGuides";
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

export function ContranStudy({ query = "" }: { query?: string }) {
  const guides = currentContranGuides(CONTRAN_GUIDES, query);
  const total = currentContranGuides(CONTRAN_GUIDES).length;
  return <section className="space-y-4" aria-label="Consulta das resoluções do CONTRAN">
    <div className="rounded-xl border bg-card p-4 text-sm leading-6">
      <p className="font-semibold">{total} guias para consulta atual · primeiro lote de {CONTRAN_GUIDES.length} atos conferidos</p>
      <p className="mt-1 text-muted-foreground">Conferência das fontes em {contranDate(CONTRAN_CHECKED_AT)}. Resoluções integralmente revogadas ficam fora do estudo atual; calendários antigos e guias de normas-base substituídas também foram separados.</p>
      <p className="mt-1 text-muted-foreground">As datas de publicação, atualização e produção de efeitos são diferentes. Os casos são autorais e revisam temas delimitados; não certificam todas as fichas e especificações técnicas dos anexos.</p>
      <p className="mt-1 text-muted-foreground">Confira o edital da sua carreira. Trânsito e CONTRAN não constam do edital PF 2025 citado nesta biblioteca.</p>
      <a className="mt-2 inline-flex items-center gap-1 font-semibold text-primary underline" href={CONTRAN_INDEX_URL} target="_blank" rel="noopener noreferrer">Catálogo oficial do CONTRAN <ExternalLink size={14} /></a>
    </div>
    {guides.map((guide) => <article key={`${guide.number}/${guide.year}`} className="rounded-2xl border bg-card p-4 sm:p-5">
      <header className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-100">Resolução {guide.number.toLocaleString("pt-BR")}/{guide.year}</span>
        <span className="text-xs text-muted-foreground">Publicação: {contranDate(guide.publicationDate)}</span>
      </header>
      <h3 className="mt-3 text-lg font-bold">{guide.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">Último ato relacionado identificado: {contranDate(guide.lastRelatedActDate)} · conferência: {contranDate(guide.checkedAt)}</p>
      <details className="mt-3 rounded-xl border bg-muted/20 p-3">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold"><BookOpen size={16} /> Estudar pontos-chave, casos e texto oficial</summary>
        <div className="mt-4 space-y-4">
          <section className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50/50 p-3 dark:bg-indigo-950/20">
            <h4 className="text-sm font-bold">Pontos-chave</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">{guide.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </section>
          <section className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-3 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
            <h4 className="text-sm font-bold">Atualização e erro de prova</h4>
            <p className="mt-1 text-sm leading-6">{guide.warning}</p>
            <p className="mt-2 text-xs leading-5">Situação indicada no catálogo oficial: {guide.officialSituation}</p>
          </section>
          <section className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-3 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">
            <h4 className="flex items-center gap-1 text-sm font-bold"><Lightbulb size={15} /> Caso prático</h4>
            <p className="mt-2 text-sm leading-6">{guide.example.scenario}</p>
            <p className="mt-2 text-sm font-semibold">{guide.example.question}</p>
            <details className="mt-2 text-sm"><summary className="cursor-pointer font-semibold">Conferir resposta comentada</summary><p className="mt-2 leading-6">{guide.example.answer}</p></details>
          </section>
          <section className="rounded-xl border-l-4 border-violet-500 bg-violet-50 p-3 text-violet-950 dark:bg-violet-950/30 dark:text-violet-100">
            <h4 className="text-sm font-bold">Altere o fato e teste sua compreensão</h4>
            <p className="mt-2 text-sm leading-6">{guide.example.variation}</p>
            <details className="mt-2 text-sm"><summary className="cursor-pointer font-semibold">Ver a consequência da mudança</summary><p className="mt-2 leading-6">{guide.example.variationAnswer}</p></details>
          </section>
          <OfficialText guide={guide} />
          <div className="space-y-2 text-xs">
            <a className="inline-flex items-center gap-1 font-semibold text-primary underline" href={guide.sourceUrl} target="_blank" rel="noopener noreferrer">Abrir PDF no portal oficial <ExternalLink size={13} /></a>
            {guide.relatedSources.length > 0 && <div><p className="mb-1 font-semibold">Atos relacionados para conferir a regra</p><ul className="space-y-1">{guide.relatedSources.map((source) => <li key={`${source.url}-${source.label}`}><a className="text-primary underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></div>}
          </div>
        </div>
      </details>
    </article>)}
    {!guides.length && <p className="rounded-xl border p-4 text-sm text-muted-foreground">Nenhum guia atual deste lote corresponde à busca. Consulte o catálogo oficial para outras resoluções.</p>}
  </section>;
}
