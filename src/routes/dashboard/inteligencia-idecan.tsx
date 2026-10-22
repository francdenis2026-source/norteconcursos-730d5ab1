import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, BrainCircuit, FileText, Shield, Target, TrendingUp, ArrowRight, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/dashboard/inteligencia-idecan")({ component: InteligenciaIdecan });

type Topic = { name: string; priority: "Alta" | "Média"; topics: string[]; reason: string };
const subjects: Topic[] = [
  {name:"Língua Portuguesa",priority:"Alta",reason:"Peso relevante na PC-SC 2026; sintaxe e interpretação merecem atenção.",topics:["Interpretação textual","Sintaxe","Concordância e regência","Pontuação e reescrita"]},
  {name:"Direito Penal",priority:"Alta",reason:"Núcleo essencial das carreiras policiais.",topics:["Teoria do crime","Crimes contra a pessoa e patrimônio","Crimes contra a Administração Pública","Concurso de pessoas"]},
  {name:"Processo Penal",priority:"Alta",reason:"Conteúdo diretamente relacionado à investigação policial.",topics:["Inquérito policial","Prisões e cautelares","Provas e cadeia de custódia","Busca e apreensão"]},
  {name:"Constitucional",priority:"Alta",reason:"Base normativa da atividade policial.",topics:["Direitos fundamentais","Segurança pública (art. 144)","Remédios constitucionais","Administração pública"]},
  {name:"Administrativo",priority:"Alta",reason:"Essencial para o exercício da função pública.",topics:["Atos administrativos","Poder de polícia","Agentes públicos","Responsabilidade estatal"]},
  {name:"Legislação Penal Especial",priority:"Alta",reason:"Seleção pedagógica a confirmar no edital.",topics:["Lei de Drogas","Lei Maria da Penha","Estatuto do Desarmamento","Abuso de Autoridade","Organizações Criminosas"]},
  {name:"Informática e Segurança Digital",priority:"Alta",reason:"Segurança da informação apareceu nas provas PC-SC 2026.",topics:["Criptografia","Autenticação","Ataques e malwares","LGPD e Marco Civil"]},
  {name:"Legislação Institucional",priority:"Alta",reason:"A legislação da PCAC deverá ser conferida no edital.",topics:["Lei 14.735/2023","Organização da Polícia Civil do Acre","Regime jurídico estadual"]},
  {name:"Raciocínio Lógico",priority:"Média",reason:"Prioridade provisória, dependente do cargo e edital.",topics:["Proposições","Equivalências","Probabilidade","Conjuntos"]},
  {name:"Direitos Humanos e Criminalística",priority:"Média",reason:"Conteúdos pertinentes à atividade policial, a confirmar.",topics:["Sistema interamericano","Uso proporcional da força","Preservação de vestígios","Exame de corpo de delito"]},
];
const exams = [
  {name:"PC-SC — Agente (2026)",description:"Referência recente de carreira policial civil",url:"https://www.qconcursos.com/questoes-de-concursos/provas/idecan-2026-pc-sc-agente-de-policia-civil"},
  {name:"PC-SC — Escrivão (2026)",description:"Complemento para Português, Penal e segurança digital",url:"https://www.qconcursos.com/questoes-de-concursos/provas/idecan-2026-pc-sc-escrivao-de-policia-civil"},
  {name:"Portal oficial IDECAN",description:"Verifique editais, comunicados e gabaritos",url:"https://idecan.org.br/"},
];
function InteligenciaIdecan() {
 const [cargo,setCargo]=useState("Oficial Investigador");
 const [filter,setFilter]=useState("Todas");
 const [query,setQuery]=useState("");
 const shown=useMemo(()=>subjects.filter(s=>(filter==="Todas"||s.priority===filter)&&(`${s.name} ${s.topics.join(" ")}`).toLowerCase().includes(query.toLowerCase())),[filter,query]);
 return <main className="mx-auto max-w-7xl space-y-7 px-3 py-5 text-foreground sm:px-6" aria-label="Inteligência IDECAN para PCAC">
   <section className="relative isolate overflow-hidden rounded-3xl border border-amber-500/25 bg-[#101316] text-white shadow-2xl">
     <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage:"linear-gradient(90deg,#07090c 0%,rgba(7,9,12,.85) 48%,rgba(7,9,12,.25) 100%),url('/media/hero/hero-norte-recorte.webp')"}} aria-hidden="true"/>
     <div className="absolute inset-0 bg-gradient-to-t from-[#07090c] via-transparent to-transparent" aria-hidden="true"/>
     <div className="relative max-w-3xl space-y-5 px-5 py-12 sm:px-10 sm:py-20">
       <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Shield size={14}/> Norte Concursos • Operação PCAC</span>
       <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">INTELIGÊNCIA <span className="text-amber-400">IDECAN</span></h1>
       <p className="text-lg font-semibold text-white/90">Conheça a banca. Identifique prioridades. Prepare sua aprovação na Polícia Civil do Acre.</p>
       <p className="max-w-xl text-sm leading-6 text-white/70">Análise orientada por provas anteriores, legislação e estratégia de estudo. Tendências não são garantia de cobrança.</p>
       <a href="#mapa" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-bold text-black hover:bg-amber-300">Explorar mapa de estudos <ArrowRight size={18}/></a>
     </div>
   </section>
   <section className="grid gap-3 md:grid-cols-3">
     {[{icon:BrainCircuit,title:"Perfil da banca",desc:"Compare estilo e conteúdos com provas anteriores."},{icon:Target,title:"Foco por cargo",desc:"Prioridades diferentes para Investigador, Delegado e Perito."},{icon:TrendingUp,title:"Análise responsável",desc:"Sem percentuais fictícios ou promessas de aprovação."}].map(({icon:Icon,title,desc})=><article key={title} className="rounded-2xl border bg-card p-5"><Icon className="mb-3 text-amber-500"/><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{desc}</p></article>)}
   </section>
   <section id="mapa" className="space-y-4 scroll-mt-24">
     <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-600">Radar de preparação</p><h2 className="mt-1 text-2xl font-black">Mapa de assuntos da PCAC</h2><p className="mt-2 max-w-3xl text-sm text-muted-foreground">Prioridade editorial estimada a partir de relevância policial e referências recentes. Não representa frequência estatística medida.</p></div><label className="text-sm font-semibold">Cargo <select value={cargo} onChange={e=>setCargo(e.target.value)} className="ml-2 rounded-lg border bg-background p-2"><option>Oficial Investigador</option><option>Delegado</option><option>Perito</option></select></label></div>
     {cargo!=="Oficial Investigador"&&<p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm">O mapa abaixo é uma referência geral. Para {cargo}, a ponderação específica depende do edital e da especialidade.</p>}
     <div className="flex flex-wrap gap-3"><input aria-label="Buscar assuntos" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar disciplina ou assunto..." className="min-w-0 flex-1 rounded-xl border bg-background px-4 py-3"/><select aria-label="Filtrar prioridade" value={filter} onChange={e=>setFilter(e.target.value)} className="rounded-xl border bg-background px-3"><option>Todas</option><option>Alta</option><option>Média</option></select></div>
     <div className="grid gap-3 lg:grid-cols-2">{shown.map(s=><details key={s.name} className="group rounded-2xl border bg-card p-5"><summary className="cursor-pointer list-none"><div className="flex items-center justify-between gap-3"><h3 className="font-bold">{s.name}</h3><span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">{s.priority}</span></div><p className="mt-2 text-sm text-muted-foreground">{s.reason}</p><span className="mt-3 block text-xs font-medium text-amber-600 group-open:hidden">Ver assuntos +</span></summary><ul className="mt-4 space-y-2 border-t pt-4 text-sm">{s.topics.map(t=><li key={t} className="flex items-start gap-2"><BookOpen size={15} className="mt-0.5 shrink-0 text-amber-500"/>{t}</li>)}</ul></details>)}</div>
     {shown.length===0&&<p className="rounded-xl border p-5">Nenhum assunto encontrado para os filtros escolhidos.</p>}
   </section>
   <section className="grid gap-5 lg:grid-cols-2"><article className="rounded-2xl border bg-card p-6"><h2 className="flex items-center gap-2 text-xl font-bold"><FileText className="text-amber-500"/> Provas e fontes</h2><p className="my-3 text-sm text-muted-foreground">Consulte provas recentes e valide os gabaritos definitivos no portal oficial.</p><div className="space-y-3">{exams.map(e=><a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-xl border p-3 hover:bg-muted"><span><strong className="block text-sm">{e.name}</strong><span className="text-xs text-muted-foreground">{e.description}</span></span><ExternalLink size={16}/></a>)}</div></article>
   <article className="rounded-2xl border bg-card p-6"><h2 className="flex items-center gap-2 text-xl font-bold"><Target className="text-amber-500"/> Plano de ataque</h2><p className="mt-3 text-sm text-muted-foreground">Trilha inicial recomendada: 30 dias de base teórica, 30 dias de questões e revisões, depois adaptação ao edital.</p><div className="mt-5 space-y-3">{[["01","Fundamentos","Português, Penal e Processo Penal"],["02","Consolidação","Legislação, tecnologia e questões IDECAN"],["03","Reta final","Simulados, erros e revisão orientada"]].map(([n,t,d])=><div key={n} className="flex gap-3 rounded-xl bg-muted/60 p-3"><span className="font-black text-amber-600">{n}</span><div><strong className="text-sm">{t}</strong><p className="text-xs text-muted-foreground">{d}</p></div></div>)}</div><div className="mt-5 flex flex-wrap gap-2"><Link to="/dashboard/question-trainer" className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-black">Treinar questões</Link><Link to="/dashboard/mock-exams" className="rounded-lg border px-4 py-2 text-sm font-semibold">Fazer simulado</Link></div></article></section>
   <p className="text-xs text-muted-foreground">Conteúdo pedagógico inicial. Dados de incidência numérica só serão exibidos após auditoria de questões e provas. Verifique o edital oficial e a legislação vigente.</p>
 </main>;
}
