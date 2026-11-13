import * as React from "react";
import { Link } from "@tanstack/react-router";
import type { StudyMaterialSummary } from "@/lib/studyMaterials";
import { useStudyGuideProgress } from "@/lib/useStudyGuideProgress";
import { supplementalPcAcLessons } from "@/data/pcAcSupplementalStudyLessons";
import { pcAcProgramGapLessons } from "@/data/pcAcProgramGapLessons";
import { normalizeLibrarySearch } from "@/lib/librarySearch";
import {
  Archive,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Landmark,
  Search,
  ShieldAlert,
  X,
  type LucideIcon,
} from "lucide-react";

type Lesson = { title: string; body: string[]; example: string; question: string; answer: string; source: string };
type Course = { id: string; title: string; subtitle: string; applicability: string; origin: string; updated: string; lessons: Lesson[] };
const OFFICIAL = {
  archives: "https://www.gov.br/arquivonacional/pt-br/siga/politica-de-gestao-de-documentos-e-arquivos/legislacao/leis",
  conarq: "https://www.gov.br/conarq/pt-br/legislacao-arquivistica/resolucoes-do-conarq/resolucoes-do-conarq/",
  digital: "https://www.gov.br/conarq/pt-br/centrais-de-conteudo/publicacoes/publicacoes-conarq",
  retention: "https://www.gov.br/arquivonacional/pt-br/servicos/gestao-de-documentos/orientacao-tecnica-1/codigo-de-classificacao-e-tabela-de-temporalidade-e-destinacao-de-documentos-de-arquivo/codigo-de-classificacao-e-tabela-de-temporalidade-e-destinacao-de-documentos-relativos-as-atividades-meio-do-poder-executivo-federal",
  dasp: "https://www2.camara.leg.br/legin/fed/declei/1930-1939/decreto-lei-579-30-julho-1938-350919-norma-pe.html",
  edital: "https://pc.ac.gov.br/governo-do-acre-lanca-edital-de-concurso-da-policia-civil-com-139-vagas/",
  digitization: "https://www.gov.br/conarq/pt-br/legislacao-arquivistica/decretos-federais/decreto-no-10-278-de-18-de-marco-de-2020",
};
const BASE_COURSES: Course[] = [
  { id:"arquivologia", title:"Arquivologia", subtitle:"Documentos, protocolo, classificação e preservação digital", applicability:"PC-AC: Oficial Investigador (Arquivologia nos específicos) e Papiloscopista (Noções de Arquivologia em Ciências Forenses). Em outros concursos, usar apenas quando o edital exigir a disciplina.", origin:"Referência temática: Arquivologia para Concursos Públicos (edição 2011), reescrito e complementado a partir de fontes institucionais.",updated:"Normas e fontes verificadas em 10/11/2026", lessons:[
    {title:"01 · Arquivo e documento arquivístico",body:["Arquivo é um conjunto orgânico de documentos acumulados por pessoa ou instituição no exercício de suas atividades, independentemente do suporte. Não se limita a papéis: documentos digitais também podem ser arquivísticos.","O vínculo com as atividades produtoras e a manutenção de contexto, autoria e autenticidade diferenciam documentos de arquivo de coleções temáticas. A gestão deve respeitar proveniência e organicidade."],example:"Um inquérito reúne peças produzidas e recebidas no curso de determinada atividade. Sua organização deve preservar vínculos processuais e histórico de tramitação.",question:"Todo arquivo precisa estar em papel?",answer:"Não. A natureza arquivística independe do suporte, físico ou digital.",source:OFFICIAL.archives},
    {title:"02 · Ciclo vital e três idades",body:["Documentos correntes são necessários às atividades em andamento e consultados com frequência; intermediários têm uso administrativo reduzido, mas permanecem guardados por prazo estabelecido; permanentes possuem valor que justifica preservação definitiva.","Transferência é a passagem entre fases de guarda, normalmente de corrente a intermediária; recolhimento é a entrada em custódia permanente. Nem todo documento passa obrigatoriamente por depósito intermediário."],example:"Um processo concluído pode ficar em guarda intermediária até cumprir seu prazo; documentos de valor permanente serão recolhidos em vez de eliminados.",question:"Um documento permanente pode ser eliminado só porque é pouco consultado?",answer:"Não. A destinação permanente decorre de avaliação e valor, não da frequência de consulta.",source:OFFICIAL.archives},
    {title:"03 · Classificação, ordenação e protocolo",body:["Classificar significa associar o documento à função ou atividade representada no plano de classificação. Ordenar é dispor unidades documentais de modo a permitir sua localização. O método adotado depende da estrutura e do plano da instituição.","O protocolo registra e controla recebimento, autuação, movimentação e expedição. A rastreabilidade, o registro e a integridade são essenciais. Classificação arquivística funcional não deve ser confundida com a Classificação Decimal de Dewey usada sobretudo no universo bibliográfico."],example:"Uma ocorrência recebida pode ganhar identificação, classe arquivística, registro de data e controle de encaminhamentos; só a ordem alfabética não substitui o plano de classificação.",question:"A Classificação Decimal de Dewey é o plano obrigatório de arquivos públicos?",answer:"Não. Planos arquivísticos dependem de funções e atividades e dos instrumentos aprovados para o órgão.",source:OFFICIAL.retention},
    {title:"04 · Avaliação e temporalidade",body:["A avaliação determina valores documentais, prazos de guarda e destinação, utilizando tabela de temporalidade e instâncias competentes. Valor primário atende necessidades administrativas, fiscais ou legais; valor secundário justifica uso probatório, informativo, histórico ou de pesquisa.","Os instrumentos federais de atividades-meio foram atualizados pela Portaria AN/MGI nº 174/2024. Essa norma é específica do Executivo federal e não deve ser aplicada automaticamente aos arquivos estaduais da PC-AC sem a norma local pertinente."],example:"A eliminação de dossiês só pode seguir avaliação e procedimentos aplicáveis; apagar arquivos por falta de espaço não é destinação documental válida.",question:"É correto aplicar toda tabela federal de temporalidade diretamente à Polícia Civil estadual?",answer:"Não. É necessário conferir a competência e os instrumentos arquivísticos vigentes para o ente e órgão.",source:OFFICIAL.retention},
    {title:"05 · Documentos digitais, SIGAD e e-ARQ Brasil",body:["A gestão arquivística precisa manter identidade, integridade, contexto, metadados e trilha de eventos ao longo do ciclo de vida. Um sistema eletrônico de armazenamento, isoladamente, não equivale a um Sistema Informatizado de Gestão Arquivística de Documentos (SIGAD).","O e-ARQ Brasil versão 2, aprovado pela Resolução CONARQ nº 50/2022, apresenta requisitos para essa gestão. A Resolução nº 51/2023 trata de repositórios arquivísticos digitais confiáveis e preservação de longo prazo."],example:"Para um expediente eletrônico, metadados de autoria e data, controle de acesso, classificação e preservação importam tanto quanto conseguir abrir o arquivo.",question:"Guardar PDFs numa pasta de nuvem garante sozinho gestão arquivística?",answer:"Não. Faltam, por exemplo, requisitos de classificação, metadados, rastreabilidade, destinação e preservação.",source:OFFICIAL.digital},
    {title:"06 · Digitalização, acesso e privacidade",body:["A digitalização é um processo regulamentado pelo Decreto nº 10.278/2020, com requisitos técnicos e legais; não significa que qualquer escaneamento produza automaticamente efeitos idênticos ao original.","A Lei de Acesso à Informação, a LGPD e as normas arquivísticas convivem. A Resolução CONARQ nº 54/2023 disciplina especificamente o tratamento de dados pessoais em arquivos permanentes e não substitui as regras dos arquivos correntes e intermediários."],example:"Em documento digitalizado com informações pessoais, a disponibilização pública depende de fundamento jurídico e análise das restrições aplicáveis.",question:"A Resolução CONARQ nº 54/2023 disciplina indistintamente documentos correntes e permanentes?",answer:"Não. Seu objeto é o tratamento de dados pessoais em arquivos permanentes.",source:OFFICIAL.conarq}
  ]},
  {id:"administracao-geral",title:"Noções de Administração",subtitle:"Planejamento, organização, gestão e situações gerenciais",applicability:"PC-AC: Oficial Investigador (conhecimentos específicos, incluindo administração de materiais e patrimônio). Em outras carreiras, reutilizar conforme o programa específico do edital.",origin:"Temas organizados com base na Aula 00 de Noções de Administração/Situações Gerenciais (Marcelo Soares), com redação original.",updated:"Revisão conceitual em 10/11/2026",lessons:[
    {title:"01 · Administração e organização",body:["Administrar significa mobilizar pessoas, informações, recursos e processos para atingir objetivos. Uma organização reúne pessoas e meios coordenados em torno de propósitos compartilhados; pode ser formal, com estrutura e papéis definidos, e também conter redes informais de interação.","A administração não se reduz a ocupar cargo de chefia: envolve tomada de decisões, coordenação e revisão de resultados em qualquer nível."],example:"Uma unidade policial coordena escalas, atendimento, manutenção de equipamentos e gestão documental para prestar serviços com continuidade.",question:"Administração equivale apenas a executar ordens?",answer:"Não. Engloba decisões, articulação de recursos, acompanhamento e correções de rumo.",source:OFFICIAL.edital},
    {title:"02 · Funções administrativas: PODC",body:["Planejamento define objetivos e caminhos; organização distribui recursos, atribuições e estruturas; direção orienta pessoas e mobiliza a execução; controle verifica resultados frente aos objetivos e promove ajustes.","Em questões, pode surgir a formulação clássica de Fayol: prever, organizar, comandar, coordenar e controlar. O modelo atual frequentemente sintetiza em planejar, organizar, dirigir e controlar (PODC)."],example:"Definir meta mensal de atendimento é planejar; dividir tarefas é organizar; orientar equipe é dirigir; comparar resultados com a meta é controlar.",question:"Qual função compara resultados com metas e corrige desvios?",answer:"Controle.",source:OFFICIAL.edital},
    {title:"03 · Eficiência, eficácia, efetividade e economicidade",body:["Eficiência observa a relação entre recursos empregados e entregas; eficácia verifica o grau de alcance das metas; efetividade observa mudanças e impactos relevantes produzidos; economicidade envolve obtenção de recursos em condições vantajosas, sem sacrificar requisitos de qualidade.","Esses conceitos não são sinônimos. Uma ação pode atingir meta operacional e não alterar de modo relevante a situação social que buscava melhorar."],example:"Emitir mais relatórios por hora é ganho de eficiência; entregar todos no prazo é eficácia; reduzir a demora percebida pelos cidadãos pode evidenciar efetividade.",question:"Alcançar a meta sem demonstrar impacto social prova efetividade?",answer:"Não. Alcançar a meta evidencia eficácia; efetividade exige examinar resultados ou impactos.",source:OFFICIAL.edital},
    {title:"04 · Níveis organizacionais e habilidades",body:["No nível estratégico predominam direção geral e decisões de longo prazo; no tático, gerências traduzem objetivos em planos setoriais; no operacional, equipes executam processos rotineiros e atendimentos concretos.","Habilidades técnicas são ligadas a métodos e tarefas específicas; habilidades humanas envolvem comunicação e colaboração; habilidades conceituais permitem entender o conjunto da organização e suas relações."],example:"Planejar a política institucional é estratégico; organizar uma delegacia é tático; registrar atendimentos e processar expedientes é operacional.",question:"Qual habilidade é mais relacionada à leitura do sistema organizacional como um todo?",answer:"Habilidade conceitual.",source:OFFICIAL.edital},
    {title:"05 · Administração de materiais e patrimônio",body:["A gestão de materiais busca disponibilizar insumos adequados, nas quantidades e momentos necessários, evitando faltas e desperdícios. Abrange planejamento de necessidades, recebimento, conferência, armazenamento, distribuição, inventário e controle de estoque.","Gestão patrimonial trata dos bens permanentes da instituição: identificação, registro, responsabilização, movimentação, manutenção e desfazimento conforme as normas de cada ente. Estoque de consumo e patrimônio permanente exigem controles distintos."],example:"Em uma unidade policial, equipamentos permanentes precisam de registro e localização; materiais de consumo exigem controle de entradas e saídas e reposição planejada.",question:"Inventariar e rastrear computadores e mobiliário é exemplo de qual atividade?",answer:"Gestão patrimonial de bens permanentes.",source:OFFICIAL.edital},
    {title:"06 · Papéis do administrador e situações gerenciais",body:["Mintzberg agrupa papéis gerenciais em interpessoais, informacionais e decisórios. O gestor representa e lidera, obtém e distribui informações e decide sobre melhorias, alocação de recursos e resolução de conflitos.","Em uma situação prática, identifique o problema, as informações disponíveis, as alternativas, os critérios e os efeitos da decisão. A comunicação entre equipes faz parte tanto da execução quanto do controle."],example:"Diante de aumento de demanda, uma chefia coleta indicadores, distribui servidores conforme competências e acompanha o novo tempo de atendimento.",question:"Divulgar informação importante para a equipe corresponde a qual grupo de papéis?",answer:"Informacionais.",source:OFFICIAL.edital}
  ]},
  {id:"administracao-publica",title:"Evolução da Administração Pública",subtitle:"Patrimonialismo, burocracia, gerencialismo e reformas no Brasil",applicability:"Aprofundamento em Administração Pública/Direito Administrativo; usar na PC-AC somente se compatível com a descrição de conteúdo do cargo.",origin:"Temas identificados em Evolução da Administração Pública no Brasil – 1930 (Vinicius Ribeiro). Datas e legislação conferidas em fonte oficial.",updated:"Correção histórica confirmada em 10/11/2026",lessons:[
    {title:"01 · Patrimonialismo e separação público-privado",body:["O patrimonialismo é caracterizado pela pouca distinção entre patrimônio pessoal de governantes e recursos públicos, com personalismo, clientelismo e ocupação de cargos pela proximidade com o poder.","Para a prova, compare esse padrão à exigência moderna de impessoalidade, transparência, legalidade e responsabilização dos agentes. É incorreto presumir que traços patrimonialistas desapareceram totalmente em uma data única."],example:"Utilizar bens públicos como propriedade particular expressa a confusão que a administração republicana deve combater.",question:"No patrimonialismo há separação nítida entre bens do governante e bens públicos?",answer:"Não, essa confusão é uma característica central.",source:OFFICIAL.dasp},
    {title:"02 · Burocracia e reforma de 1930–1938",body:["O modelo burocrático racional-legal privilegia impessoalidade, regras, hierarquia, especialização, profissionalização e mérito, como resposta ao personalismo e à corrupção.","No Brasil, o ciclo de reformas se intensificou nos anos 1930. Atenção à data: o DASP foi formalmente criado pelo Decreto-Lei nº 579, de 30 de julho de 1938. Materiais que afirmam criação formal em 1936 precisam ser corrigidos."],example:"A exigência de seleção técnica e controle de procedimentos procura reduzir favorecimentos pessoais.",question:"Qual norma criou formalmente o DASP?",answer:"Decreto-Lei nº 579, de 30 de julho de 1938.",source:OFFICIAL.dasp},
    {title:"03 · Administração gerencial",body:["O modelo gerencial desloca parte da ênfase do controle exclusivo de procedimentos para desempenho, qualidade, responsabilização por resultados e atenção ao usuário do serviço público. Temas associados incluem autonomia gerencial e avaliação de entregas.","Não há substituição absoluta: procedimentos legais, controle e impessoalidade continuam necessários. A modernização não autoriza descumprir normas para obter metas."],example:"Uma unidade monitora atendimento e tempo de resposta sem deixar de observar garantias procedimentais.",question:"Gerencialismo elimina obrigatoriamente formalidades e controle de legalidade?",answer:"Não. A busca de resultados convive com regras e prestação de contas.",source:OFFICIAL.edital},
    {title:"04 · Administração direta, indireta e descentralização",body:["Administração direta abrange órgãos integrantes das pessoas políticas; administração indireta reúne entidades dotadas de personalidade jurídica própria, como autarquias, fundações públicas, empresas públicas e sociedades de economia mista, segundo a legislação aplicável.","Desconcentração distribui competências internamente em uma mesma pessoa jurídica, enquanto descentralização transfere a execução ou titularidade de atividades conforme os modelos legalmente admitidos. Delegar tarefas a unidades internas não cria automaticamente nova pessoa jurídica."],example:"Criar unidades regionais dentro do mesmo órgão exemplifica desconcentração; instituir autarquia por lei integra a administração indireta.",question:"Criar uma unidade interna sem personalidade jurídica é descentralização?",answer:"Em regra, é desconcentração administrativa.",source:OFFICIAL.edital}
  ]}
];
const COURSES: Course[] = BASE_COURSES.map(course => ({...course, lessons: [...course.lessons, ...(supplementalPcAcLessons[course.id] ?? []), ...(pcAcProgramGapLessons[course.id] ?? [])]}));

const COURSE_ICONS: Record<string, LucideIcon> = {
  arquivologia: Archive,
  "administracao-geral": ClipboardList,
  "administracao-publica": Landmark,
};

export function UpdatedStudyCollections({initialCourseId,storageScope="public",materials=[]}: {initialCourseId?: string;storageScope?: string;materials?: StudyMaterialSummary[]}) {
  const [selected,setSelected]=React.useState(() => COURSES.some(c=>c.id===initialCourseId) ? initialCourseId! : COURSES[0]!.id);
  const [revealed,setRevealed]=React.useState<Record<string,boolean>>({});
  const [query,setQuery]=React.useState("");
  React.useEffect(()=>{if(COURSES.some(c=>c.id===initialCourseId))setSelected(initialCourseId!);},[initialCourseId]);
  const {completed,toggleCompleted,syncState,syncError}=useStudyGuideProgress(storageScope);

  const normalizedQuery = normalizeLibrarySearch(query);
  const matches = React.useCallback((text: string) => !normalizedQuery || normalizeLibrarySearch(text).includes(normalizedQuery), [normalizedQuery]);
  const lessonMatches = React.useCallback((lesson: Lesson) => matches(lesson.title) || lesson.body.some(matches), [matches]);

  const entries = React.useMemo(() => COURSES.map((course) => {
    const courseMatches = matches(course.title) || matches(course.subtitle);
    const matchingLessons = course.lessons.filter(lessonMatches).length;
    return { course, courseMatches, matchingLessons, visible: !normalizedQuery || courseMatches || matchingLessons > 0 };
  }), [matches, lessonMatches, normalizedQuery]);
  const visibleEntries = entries.filter((entry) => entry.visible);

  React.useEffect(() => {
    if (!normalizedQuery) return;
    if (visibleEntries.some((entry) => entry.course.id === selected)) return;
    if (visibleEntries[0]) setSelected(visibleEntries[0].course.id);
  }, [normalizedQuery, visibleEntries, selected]);

  const activeEntry = visibleEntries.find((entry) => entry.course.id === selected) ?? visibleEntries[0];
  const course = activeEntry?.course;
  const displayedLessons = course ? (activeEntry!.courseMatches || !normalizedQuery ? course.lessons : course.lessons.filter(lessonMatches)) : [];
  const countCompleted = course ? course.lessons.filter(l=>completed[`${course.id}:${l.title}`]).length : 0;
  const publishedGroups = React.useMemo(() => {
    const groups = new Map<string, StudyMaterialSummary[]>();
    for (const material of materials) {
      if (material.contest_name !== "PC-AC 2026") continue;
      const list = groups.get(material.discipline) ?? [];
      list.push(material);
      groups.set(material.discipline, list);
    }
    return [...groups.entries()]
      .map(([discipline, rows]) => [discipline, rows.sort((x, y) => x.sort_order - y.sort_order)] as const)
      .sort((x, y) => x[0].localeCompare(y[0], "pt-BR"));
  }, [materials]);
  const publishedCount = publishedGroups.reduce((total, [, rows]) => total + rows.length, 0);

  return <section id="materiais-atualizados-pcac" className="updated-study-collections" aria-labelledby="pcac-new-study-title">
    <header className="updated-study-collections__header">
      <p className="updated-study-collections__eyebrow">Biblioteca temática · Alinhamento ao edital PC-AC 2026</p>
      <h2 id="pcac-new-study-title">Aulas atualizadas por matéria</h2>
      <p className="updated-study-collections__lede">Escolha uma matéria para abrir suas aulas, exemplos e perguntas de verificação.</p>
    </header>

    <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.045] p-4" aria-label="Materiais publicados no banco de estudos PC-AC 2026">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-extrabold text-foreground">Materiais publicados no banco de estudos</h3>
          <p className="text-sm text-muted-foreground">Aulas ligadas ao edital PC-AC 2026. Abra diretamente o texto, os flashcards e as questões.</p>
        </div>
        <span className="rounded-full border px-3 py-1 text-xs font-bold">{publishedCount} aulas · {publishedGroups.length} disciplinas</span>
      </header>
      {publishedCount === 0 ? (
        <p className="text-sm text-muted-foreground">Os materiais deste edital ainda não foram carregados nesta consulta. Atualize a página para buscar novamente.</p>
      ) : (
        <div className="space-y-4">
          {publishedGroups.map(([discipline, rows]) => (
            <div key={discipline}>
              <h4 className="mb-2 text-sm font-bold">{discipline} <span className="font-normal text-muted-foreground">· {rows.length} {rows.length === 1 ? "aula" : "aulas"}</span></h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {rows.map((material) => (
                  <li key={material.id}>
                    <Link to="/dashboard/library/$slug" params={{ slug: material.slug }} className="flex min-h-14 items-center justify-between gap-3 rounded-xl border bg-card px-3 py-2 text-sm transition hover:border-primary hover:bg-muted/50">
                      <span className="min-w-0">
                        <strong className="block">{material.title}</strong>
                        <span className="block truncate text-xs text-muted-foreground">{material.topic_label}</span>
                      </span>
                      <span className="shrink-0 font-semibold text-primary">Estudar →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
    <div className="updated-study-collections__search">
      <Search aria-hidden="true" size={17} />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar matéria ou aula, ex.: protocolo, PODC..."
        aria-label="Buscar nas aulas atualizadas"
      />
      {query && (
        <button type="button" onClick={() => setQuery("")} aria-label="Limpar a busca">
          <X aria-hidden="true" size={15} />
        </button>
      )}
    </div>

    {visibleEntries.length === 0 ? (
      <p className="updated-study-collections__empty">Nenhuma matéria ou aula encontrada para “{query}”.</p>
    ) : (
      <div className="updated-study-collections__grid" role="group" aria-label="Escolher matéria">
        {visibleEntries.map(({ course: c }) => {
          const Icon = COURSE_ICONS[c.id] ?? Archive;
          const done = c.lessons.filter((l) => completed[`${c.id}:${l.title}`]).length;
          const isSelected = course?.id === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={isSelected}
              data-active={isSelected || undefined}
              onClick={() => { setSelected(c.id); setRevealed({}); }}
              className="updated-study-collections__card"
            >
              <span className="updated-study-collections__card-icon"><Icon aria-hidden="true" /></span>
              <span className="updated-study-collections__card-body">
                <strong>{c.title}</strong>
                <span>{c.subtitle}</span>
                <small>{done} de {c.lessons.length} aulas concluídas</small>
              </span>
            </button>
          );
        })}
      </div>
    )}

    {course && (
      <div className="updated-study-collections__panel">
        <div className="updated-study-collections__panel-head">
          <h3>{course.title} <span>· {displayedLessons.length} {displayedLessons.length === 1 ? "aula" : "aulas"}</span></h3>
          <p>{course.subtitle}</p>
          <p className="updated-study-collections__progress" role="status">{countCompleted} de {course.lessons.length} aulas concluídas · {syncState === "synced" ? "salvas na nuvem" : syncState === "loading" ? "sincronizando…" : "armazenadas neste navegador"}.</p>
          {syncError && <p role="status" className="updated-study-collections__sync-error">{syncError}</p>}
          <details className="updated-study-collections__meta">
            <summary>Sobre este conteúdo</summary>
            <p><strong>Aplicabilidade:</strong> {course.applicability}</p>
            <p><strong>Origem:</strong> {course.origin}</p>
            <p><strong>Atualização:</strong> {course.updated}</p>
          </details>
        </div>

        <div className="updated-study-collections__lessons">
          {displayedLessons.length === 0 && (
            <p className="updated-study-collections__empty">Nenhuma aula de {course.title} encontrada para “{query}”.</p>
          )}
          {displayedLessons.map((l) => (
            <details key={l.title} className="updated-study-collections__lesson group">
              <summary>{l.title}</summary>
              <div className="updated-study-collections__lesson-body">
                <label className="updated-study-collections__done">
                  <input type="checkbox" checked={!!completed[`${course.id}:${l.title}`]} onChange={() => void toggleCompleted(course.id, l.title)} disabled={syncState === "loading"} />
                  Marcar aula como concluída
                </label>
                {l.body.map((p, j) => <p key={j}>{p}</p>)}
                <p className="updated-study-collections__example"><strong>Aplicação prática:</strong> {l.example}</p>
                <div className="updated-study-collections__check">
                  <p className="updated-study-collections__check-label">Verifique o aprendizado</p>
                  <p>{l.question}</p>
                  <button type="button" onClick={() => setRevealed((prev) => ({ ...prev, [l.title]: !prev[l.title] }))}>
                    {revealed[l.title] ? "Ocultar resposta" : "Ver resposta comentada"}
                  </button>
                  {revealed[l.title] && (
                    <p className="updated-study-collections__answer"><CheckCircle2 aria-hidden="true" />{l.answer}</p>
                  )}
                </div>
                <a href={l.source} target="_blank" rel="noopener noreferrer" className="updated-study-collections__source">
                  Conferir fonte institucional <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </details>
          ))}
        </div>
      </div>
    )}

    <footer className="updated-study-collections__disclaimer">
      <ShieldAlert aria-hidden="true" />
      <span>Não reproduz apostilas de terceiros. Os tópicos foram reescritos e verificados. A aplicação de normas federais a órgãos estaduais depende de competência e regulamentação próprias. Conteúdo complementar não significa cobrança garantida no edital.</span>
    </footer>
  </section>;
}
