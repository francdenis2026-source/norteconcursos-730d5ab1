import { acreDate } from "@/lib/acreTime";
import { useLegalExplanation, type LegalUnit } from "@/lib/legalCourses";
import { LegalRefText } from "./LegalRefText";
import { HighlightToggle } from "./StudyText";
import { explanationExample, explanationPractice } from "@/lib/explanationPractice";
import { hasCurrentExplanationReview } from "@/lib/explanationReview";

const Block = ({ icon, title, tone, children }: { icon: string; title: string; tone: string; children: React.ReactNode }) => (
  <section className={`rounded-xl border p-4 ${tone.includes('bg-') ? '' : 'bg-card'} ${tone}`}>
    <h4 className="flex items-center gap-2 text-sm font-semibold"><span aria-hidden className="text-base">{icon}</span>{title}</h4>
    <div className="mt-2 text-[15px] leading-7">{children}</div>
  </section>
);
const isUpdate = (t: string) => /^atualiza[çc][ãa]o/i.test(t);
/** Itens de ATUALIZAÇÃO viram um aviso colorido, para o aluno não perder a mudança da lei. */
const List = ({ items }: { items: string[] }) => <ul className="list-disc space-y-1.5 pl-5">{items.map((t) => isUpdate(t)
  ? <li key={t} className="-ml-5 list-none rounded-lg border-l border-l-amber-500 bg-amber-50 p-2.5 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100"><LegalRefText text={t} /></li>
  : <li key={t}><LegalRefText text={t} /></li>)}</ul>;

/** Keep the answer closed while the learner attempts the authored question. */
export function ExplanationChecks({ items }: { items: string[] }) {
  return <div className="space-y-3">{items.map((text, index) => {
    const exercise = explanationPractice(text);
    if (!exercise) return <p key={text}><LegalRefText text={text} /></p>;
    return <section key={text} className="rounded-xl border border-rose-200 bg-white/70 p-3 dark:border-rose-500/30 dark:bg-rose-950/20">
      <p className="font-semibold"><LegalRefText text={exercise.question} /></p>
      <details className="mt-2"><summary className="cursor-pointer text-sm font-bold">Conferir resposta comentada</summary><p className="mt-2 leading-7"><LegalRefText text={exercise.answer} /></p></details>
    </section>;
  })}</div>;
}

/** "Entenda este artigo": explicação em linguagem simples, pontos-chave, pegadinhas, exemplo e como costuma ser cobrado. */
export function UnitExplanation({ unit, userId }: { unit: LegalUnit; userId: string }) {
  const { data: e } = useLegalExplanation(unit.id, userId);
  if (!e) return null;
  const stale = e.content_sha256 !== unit.content_sha256;
  const example = explanationExample(e.exemplo);
  // avisos de conferência editorial ficam fora da leitura do aluno
  const atencao = e.atencao.filter((t) => !/^Correção editorial/i.test(t));
  return (
    <section className="reading-text space-y-3" aria-label="Entenda este artigo">
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-bold">Entenda este artigo</h3>
        {e.status === "under_review" && <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-900">Em revisão: só administradores veem</span>}
        {stale && <span className="rounded-full bg-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-900">Texto oficial mudou: revisar</span>}
        {e.status === "published" && !stale && !hasCurrentExplanationReview(e, unit.content_sha256) && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">Revisão editorial pendente</span>}
        {e.status === "published" && !stale && hasCurrentExplanationReview(e, unit.content_sha256) && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">✓ Revisado em {acreDate(e.reviewed_at!).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" })}</span>}
      </header>
      <HighlightToggle />
      <Block icon="📘" title="Em palavras simples" tone="border-l border-l-sky-500"><p><LegalRefText text={e.simples} /></p></Block>
      {e.pontos.length > 0 && <Block icon="🔑" title="Pontos-chave" tone="border-l border-l-amber-500"><List items={e.pontos} /></Block>}
      {atencao.length > 0 && <Block icon="⚠️" title="Atenção: onde o candidato erra" tone="border-l border-l-amber-500"><List items={atencao} /></Block>}
      {e.exemplo && <Block icon="🧩" title="Exemplo prático" tone="border-l border-l-emerald-500"><p><LegalRefText text={example.scenario} /></p>
        {example.variation && <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-950 dark:border-amber-400/30 dark:bg-amber-950/30 dark:text-amber-100"><strong>Altere o fato, confira a regra</strong><p className="mt-1"><LegalRefText text={example.variation} /></p></div>}
      </Block>}
      {e.prova.length > 0 && <Block icon="🎯" title="Fixação para a prova" tone="border-l border-l-rose-500"><ExplanationChecks items={e.prova} /></Block>}
      {e.termos.length > 0 && <Block icon="📖" title="Termos" tone="border-l border-l-sky-500"><dl className="space-y-1">{e.termos.map((t) => <div key={t.termo}><dt className="inline font-bold">{t.termo}: </dt><dd className="inline">{t.significado}</dd></div>)}</dl></Block>}
      {e.remissoes.length > 0 && <p className="text-xs text-muted-foreground">🔗 Veja também: {e.remissoes.map((r, i) => <span key={r}>{i > 0 && " · "}<LegalRefText text={r} /></span>)}</p>}
      <p className="text-[11px] text-muted-foreground">Texto explicativo baseado no dispositivo oficial abaixo. Em caso de dúvida, vale sempre a redação da lei.</p>
    </section>
  );
}
