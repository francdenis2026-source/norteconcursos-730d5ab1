import { useState } from "react";
import { LearningIllustration } from "./LearningIllustrations";
import { useStudyEnrichment, type StudyEnrichment, type WorkedCase } from "@/lib/studyEnrichment";
import { isStudySourceUrl } from "@/lib/studySourceUrl";

export function WorkedExamples({slug,enabled,articleLabel}:{slug:string;enabled:boolean;articleLabel?:string}){
 const query=useStudyEnrichment(slug,enabled);
 if(query.isPending)return <p role="status" className="text-sm text-muted-foreground">Carregando exemplos e ilustrações…</p>;
 if(query.isError)return <p role="alert" className="text-sm">Não foi possível carregar os exemplos. <button className="underline" onClick={()=>void query.refetch()}>Tentar novamente</button></p>;
 if(!query.data)return null;
 const cases=articleLabel?query.data.content.cases.filter(c=>c.articles.includes(articleLabel)):query.data.content.cases;
 if(!cases.length)return null;
 return <WorkedExampleContent enrichment={{...query.data,content:{...query.data.content,cases,illustrations:articleLabel?[]:query.data.content.illustrations}}}/>;
}
export function WorkedExampleContent({enrichment}:{enrichment:StudyEnrichment}){
 return <section className="surface-card worked-examples" aria-label="Exemplos resolvidos e ilustrações"><header><p className="text-xs font-semibold uppercase tracking-widest text-primary">Entenda na prática</p><h2 className="mt-2 text-2xl font-bold">Do conceito ao caso concreto</h2><p className="mt-2 text-sm text-muted-foreground">Observe o esquema e tente resolver o caso antes de abrir a explicação. Depois, mude um dado e veja por que a resposta muda.</p></header>
 {enrichment.content.illustrations.map((illustration,i)=><LearningIllustration key={i} illustration={illustration}/>)}
 {enrichment.content.cases.map(example=><WorkedCaseCard key={example.id} example={example}/>)}
 {enrichment.sources.length>0&&<aside className="text-sm"><h3 className="font-semibold">Fontes destes exemplos</h3><p className="mt-1 text-xs text-muted-foreground">Conferência: {new Date(enrichment.checked_at).toLocaleDateString("pt-BR",{timeZone:"America/Rio_Branco"})}. Casos fictícios para estudo; a conclusão depende dos fatos e requisitos indicados.</p><ul className="mt-2 space-y-2">{enrichment.sources.filter(s=>isStudySourceUrl(s.url)).map(source=><li key={source.url}><a className="underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ul></aside>}
 </section>;
}
function WorkedCaseCard({example}:{example:WorkedCase}){
 const [answer,setAnswer]=useState("");
 return <article className="worked-case"><h3 className="text-lg font-bold">{example.title}</h3><p className="mt-3 leading-7">{example.scenario}</p><p className="mt-3 font-semibold">{example.question}</p><label className="mt-3 block text-sm">Seu raciocínio (rascunho nesta tela)<textarea value={answer} maxLength={2000} onChange={e=>setAnswer(e.target.value)} className="mt-1 min-h-20 w-full rounded-lg border bg-background p-3" placeholder="Qual dado é decisivo? Que regra você aplicaria?"/></label>
 <details className="mt-4"><summary className="cursor-pointer font-semibold text-primary">Ver resolução passo a passo</summary><ol className="mt-3 list-decimal space-y-3 pl-5">{example.steps.map((step,i)=><li key={i} className="leading-7">{step}</li>)}</ol><p className="worked-result mt-4"><strong>Conclusão: </strong>{example.conclusion}</p>{example.articles.length>0&&<p className="mt-3 text-xs text-muted-foreground">Dispositivos relevantes: {example.articles.join("; ")}. Confira a redação completa nas fontes abaixo.</p>}<p className="mt-4 border-l-2 border-amber-500 pl-3 text-sm leading-6"><strong>Erro comum: </strong>{example.pitfall}</p></details>
 <details className="mt-4 rounded-lg border p-3"><summary className="cursor-pointer font-semibold">E se o caso mudar?</summary><p className="mt-3 leading-7">{example.variation.scenario}</p><details className="mt-3"><summary className="cursor-pointer text-sm underline">Conferir a variação</summary><p className="mt-2 leading-7">{example.variation.answer}</p></details></details>
 </article>;
}
