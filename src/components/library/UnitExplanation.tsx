import { useLegalExplanation, type LegalUnit } from "@/lib/legalCourses";
import { LegalRefText } from "./LegalRefText";

const Block = ({ icon, title, tone, children }: { icon: string; title: string; tone: string; children: React.ReactNode }) => (
  <section className={`rounded-xl border bg-card p-4 ${tone}`}>
    <h4 className="flex items-center gap-2 text-sm font-semibold"><span aria-hidden className="text-base">{icon}</span>{title}</h4>
    <div className="mt-2 text-[15px] leading-7">{children}</div>
  </section>
);
const List = ({ items }: { items: string[] }) => <ul className="list-disc space-y-1 pl-5">{items.map((t) => <li key={t}><LegalRefText text={t} /></li>)}</ul>;

/** "Entenda este artigo": explicação em linguagem simples, pontos-chave, pegadinhas, exemplo e como costuma ser cobrado. */
export function UnitExplanation({ unit, userId }: { unit: LegalUnit; userId: string }) {
  const { data: e } = useLegalExplanation(unit.id, userId);
  if (!e) return null;
  const stale = e.content_sha256 !== unit.content_sha256;
  return (
    <section className="space-y-3" aria-label="Entenda este artigo">
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-bold">Entenda este artigo</h3>
        {e.status === "under_review" && <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-900">Em revisão: só administradores veem</span>}
        {stale && <span className="rounded-full bg-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-900">Texto oficial mudou: revisar</span>}
      </header>
      <Block icon="📘" title="Em palavras simples" tone="border-l-4 border-l-sky-500"><p><LegalRefText text={e.simples} /></p></Block>
      {e.pontos.length > 0 && <Block icon="🔑" title="Pontos-chave" tone="border-l-4 border-l-indigo-500"><List items={e.pontos} /></Block>}
      {e.atencao.length > 0 && <Block icon="⚠️" title="Atenção: onde o candidato erra" tone="border-l-4 border-l-amber-500"><List items={e.atencao} /></Block>}
      {e.exemplo && <Block icon="🧩" title="Exemplo prático" tone="border-l-4 border-l-emerald-500"><p><LegalRefText text={e.exemplo} /></p></Block>}
      {e.prova.length > 0 && <Block icon="🎯" title="Como pode aparecer em prova" tone="border-l-4 border-l-rose-500"><List items={e.prova} /></Block>}
      {e.termos.length > 0 && <Block icon="📖" title="Termos" tone="border-l-4 border-l-violet-500"><dl className="space-y-1">{e.termos.map((t) => <div key={t.termo}><dt className="inline font-bold">{t.termo}: </dt><dd className="inline">{t.significado}</dd></div>)}</dl></Block>}
      {e.remissoes.length > 0 && <p className="text-xs text-muted-foreground">🔗 Veja também: {e.remissoes.map((r, i) => <span key={r}>{i > 0 && " · "}<LegalRefText text={r} /></span>)}</p>}
      <p className="text-[11px] text-muted-foreground">Texto explicativo baseado no dispositivo oficial abaixo. Em caso de dúvida, vale sempre a redação da lei.</p>
    </section>
  );
}
