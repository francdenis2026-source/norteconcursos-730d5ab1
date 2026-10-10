import { useStudyEnrichment } from "@/lib/studyEnrichment";
import type { LegalCourse, LegalUnit } from "@/lib/legalCourses";
import { literalExercises } from "@/lib/legalLiteralPractice";
import { LawPracticeLink } from "./LawPracticeLink";
import { legalStudyCaveat } from "@/lib/legalStudyCaveats";

const articleKey = (label: string) => label.toLocaleLowerCase("pt-BR").replace(/[\sº°.,]/g, "");

export function LegalCoverage({ course, units, userId }: { course: LegalCourse; units: LegalUnit[]; userId: string }) {
  const examples = useStudyEnrichment(course.material_slug, !!userId);
  const current = units.filter(unit => unit.content_status === "current");
  const chapters = [...new Set(current.map(unit => unit.chapter))];
  const cases = examples.data?.content.cases ?? [];
  const references = new Set(cases.flatMap(example => example.articles.map(articleKey)));
  return <details className="rounded-xl border bg-card p-4"><summary className="cursor-pointer font-semibold">Cobertura deste percurso · leitura, fixação e casos</summary><p className="mt-3 text-sm text-muted-foreground">O texto integral e os exercícios literais não substituem casos aplicados nem garantem cobertura de todo edital. Confira os tópicos do seu concurso. Um caso pode envolver mais de um artigo; a contagem abaixo indica vínculo explícito ao dispositivo.</p>
    <p className="mt-3 text-sm">{current.length} dispositivos disponíveis · {current.filter(unit => legalStudyCaveat(course.slug, unit.unit_key)?.literalPractice !== false && literalExercises(unit.body_text).length > 0).length} com fixação literal · {examples.isPending ? "carregando casos" : examples.isError ? "falha ao consultar casos" : `${cases.length} casos publicados`}</p>
    {examples.isError && <button className="mt-2 text-sm underline" onClick={() => void examples.refetch()}>Tentar carregar os casos novamente</button>}
    <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th className="p-2">Bloco da lei</th><th className="p-2">Dispositivos</th><th className="p-2">Com caso vinculado</th></tr></thead><tbody>{chapters.map(chapter => {const rows = current.filter(unit => unit.chapter === chapter); return <tr key={chapter} className="border-t"><td className="p-2">{chapter}</td><td className="p-2">{rows.length}</td><td className="p-2">{examples.isPending || examples.isError ? "—" : rows.filter(unit => references.has(articleKey(unit.label))).length}</td></tr>;})}</tbody></table></div>
    <div className="mt-4"><LawPracticeLink law={course.slug} userId={userId} /></div>
  </details>;
}
