-- IDECAN: explicações das questões 64–68, Escrivão PC-SC 2026, Tipo A.
-- Execute o BLOCO INTEIRO no SQL Editor como postgres.
-- Altera somente explanation; preserva status, edital, enunciado e gabarito.
-- Não libera under_review nem certifica uma nova revisão de fonte/edital.
-- Explicação existente diferente, questão alterada ou bloqueada: reverte TODO o lote.
begin;
do $access$
begin
  if current_user not in ('postgres','supabase_admin') then
    raise exception 'Execute no SQL Editor como administrador postgres.';
  end if;
end $access$;

create table if not exists public.idecan_admin_explanation_audit (
  batch_key text not null,
  question_id uuid not null references public.board_exam_questions(id),
  before_data jsonb not null,
  after_data jsonb not null,
  applied_at timestamptz not null default now(),
  primary key (batch_key,question_id)
);
alter table public.idecan_admin_explanation_audit enable row level security;
revoke all on public.idecan_admin_explanation_audit from anon, authenticated;

do $apply$
declare
  change jsonb;
  stored public.board_exam_questions;
  updated_row public.board_exam_questions;
  actual_hash text;
  applied_count integer := 0;
  unchanged_count integer := 0;
begin
  for change in
    select value from jsonb_array_elements($items$
[
  {
    "item": 64,
    "hash": "f97722c5c87a82f0c79106232bb1f7c453692615b052d2177821bbc523f744f6",
    "answer": "E",
    "explanation": "Gabarito: E.\n\nEficiência avalia a relação entre os recursos empregados e os produtos entregues: tempo, dinheiro e pessoal para executar uma atividade. Eficácia verifica se o objetivo ou a meta proposta foi alcançado. Efetividade examina os efeitos produzidos na realidade, especialmente os resultados sociais pretendidos. A alternativa E reúne corretamente essas três dimensões. Uma organização pode cumprir uma meta sem produzir o impacto esperado; por isso, eficácia e efetividade não são sinônimas.\n\nAnálise das alternativas:\nA) Inverte eficiência e eficácia e reduz a efetividade a custos, que pertencem à análise de eficiência.\nB) Volta a trocar eficiência por cumprimento de metas e eficácia por redução de desperdício. Executar funções administrativas, por si só, não demonstra impacto.\nC) Trata eficiência e eficácia como sinônimos e limita a efetividade ao controle financeiro; as duas afirmações são incorretas.\nD) Restringe eficiência ao indivíduo e associa as demais dimensões a planejamento e estrutura, sem avaliar alcance de metas e efeitos.\nE) Correta: uso dos recursos, alcance dos objetivos e impacto real correspondem, respectivamente, a eficiência, eficácia e efetividade.\n\nErro comum: Usar a expressão “alcançar resultados” sem perguntar de que resultado se trata. Cumprir a meta de atendimentos é eficácia; produzir a melhoria social pretendida é efetividade.\n\nExemplo prático: Uma unidade policial pretende realizar 100 ações educativas em escolas. Realiza as 100 ações: atingiu a meta, demonstrando eficácia. Se usa menos horas e materiais, mantendo a qualidade e a cobertura, melhora sua eficiência. A verificação de uma redução sustentada dos problemas que o programa buscava enfrentar corresponde à avaliação de efetividade. Essa redução exige dados e análise de outros fatores; não se presume apenas porque as ações aconteceram."
  },
  {
    "item": 65,
    "hash": "d06b8b49a82090cceefcce966634b2dff2caa87e423a6153f01b668b6c14e160",
    "answer": "B",
    "explanation": "Gabarito: B.\n\nNo contexto organizacional da questão, descentralizar significa distribuir autoridade para decidir entre níveis inferiores da estrutura. A alta gestão continua responsável pela orientação geral e deve manter mecanismos de prestação de contas e controle. A alternativa B descreve essa distribuição planejada. Descentralizar não significa entregar decisões sem limites nem eliminar a supervisão. A questão trata de estrutura e gestão, e não da classificação jurídica da descentralização administrativa entre entidades.\n\nAnálise das alternativas:\nA) Descreve centralização: decisões estratégicas e operacionais permanecem concentradas no topo.\nB) Correta: distribui autoridade decisória para níveis inferiores e preserva a responsabilidade final da alta gestão.\nC) A distribuição de decisões exige controles adequados; não implica eliminá-los.\nD) Reduzir níveis hierárquicos é uma mudança no desenho da estrutura e não define, por si só, a distribuição de autoridade.\nE) Relações menos formais podem existir em diferentes estruturas. Informalidade não é o critério que caracteriza descentralização.\n\nErro comum: Confundir descentralizar com perder o controle da organização ou com apenas reduzir a quantidade de chefias. O ponto decisivo é onde se localiza a autoridade para decidir.\n\nExemplo prático: A direção de uma instituição define prioridades e limites de orçamento, mas permite que cada chefia regional organize a escala de atendimento de sua unidade. As chefias decidem dentro dos limites definidos e prestam contas dos resultados. Há descentralização decisória com controle, e não abandono da supervisão."
  },
  {
    "item": 66,
    "hash": "181bb5bf186c4ef68bcf712be8b37f60bb40a71684e1aaa5383ae1cfad9142fd",
    "answer": "A",
    "explanation": "Gabarito: A.\n\nA melhoria contínua consiste em avaliar o modo de trabalhar e aperfeiçoá-lo com base em evidências. Em um projeto, o monitoramento sistemático de indicadores permite identificar desvios, investigar causas, implantar ajustes e verificar seus efeitos. Assim, a alternativa A relaciona um princípio de qualidade a uma prática de gestão de projetos. Medir indicadores, isoladamente, não garante melhoria: os dados precisam orientar a análise e a ação corretiva. A lógica é compatível com o ciclo planejar, executar, verificar e agir.\n\nAnálise das alternativas:\nA) Correta: o acompanhamento sistemático fornece informação para corrigir processos e melhorar entregas.\nB) A inspeção final pode detectar defeitos, mas não substitui prevenção, acompanhamento e aperfeiçoamento ao longo do processo.\nC) Atender prazos é relevante, porém prioridade exclusiva ao prazo pode comprometer qualidade, escopo e outras condições de entrega.\nD) Centralizar decisões não assegura qualidade; é preciso definir processos, responsabilidades e formas de avaliação.\nE) A documentação deve ser adequada ao projeto. Reduzi-la, por si só, não constitui um princípio de qualidade nem garante controle.\n\nErro comum: Achar que qualidade é apenas conferir a entrega pronta ou cumprir o cronograma. O acompanhamento deve ocorrer durante a execução e resultar em ações de melhoria.\n\nExemplo prático: Em um projeto de digitalização de documentos, a equipe mede semanalmente o percentual de arquivos com páginas ilegíveis. Ao perceber aumento dos erros, identifica uma configuração inadequada do scanner, ajusta o procedimento e acompanha as semanas seguintes para verificar se o problema diminuiu. O indicador apoia uma melhoria do processo, sem esperar o encerramento do projeto."
  },
  {
    "item": 67,
    "hash": "a64a65fe1f1dfc6b49cc9f59f5adf82e69c60e14a362a88f66eeeb70ffcca0d6",
    "answer": "D",
    "explanation": "Gabarito: D.\n\nA função de controle acompanha o desempenho, compara os resultados observados com os padrões estabelecidos e orienta correções quando há desvios. A alternativa D corresponde diretamente ao que o enunciado descreve. O planejamento define objetivos e parâmetros; a organização distribui recursos e responsabilidades; a direção mobiliza e orienta as pessoas. O controle utiliza essas referências para verificar a execução e realimentar as decisões.\n\nAnálise das alternativas:\nA) O planejamento estabelece rumos, objetivos e padrões. O acompanhamento dos resultados e a correção de desvios caracterizam o controle.\nB) Organizar é estruturar e distribuir atividades, recursos e responsabilidades; não é a função especificamente descrita.\nC) A direção envolve liderança, comunicação e orientação das pessoas na execução.\nD) Correta: controle mede resultados, compara com os padrões e promove ajustes.\nE) Coordenação busca harmonizar atividades e esforços. Embora se relacione com as demais funções, não é a resposta ao acompanhamento e à correção de desvios pedidos no enunciado.\n\nErro comum: Associar controle somente a punição, fiscalização disciplinar ou conferência no final. Em gestão, controlar também é acompanhar a execução e corrigir o processo a tempo.\n\nExemplo prático: Uma unidade estabelece o padrão de concluir o cadastro de ocorrências em até determinado prazo interno. A chefia acompanha os tempos reais, identifica uma fila acima do padrão e redistribui tarefas para reduzir o atraso. A comparação e a ação corretiva exemplificam controle; definir previamente o prazo fez parte do planejamento."
  },
  {
    "item": 68,
    "hash": "33ae35a1c5cc4274ce07422c2684431c8f8ea8a25a7ecd448d22a02e15a34496",
    "answer": "C",
    "explanation": "Gabarito: C.\n\nO planejamento estratégico conecta a razão de existir da organização, expressa na missão, aos objetivos de longo prazo e às condições do ambiente. A análise interna ajuda a reconhecer capacidades e limitações; a externa permite avaliar oportunidades e ameaças. A alternativa C reúne esses elementos. A estratégia orienta escolhas e prioridades, que depois precisam ser desdobradas em planos táticos e ações operacionais. Isso não impede revisões quando o ambiente muda.\n\nAnálise das alternativas:\nA) Centralização operacional é uma escolha de organização do trabalho e não o princípio que define o planejamento estratégico.\nB) Metas de curto prazo podem integrar o desdobramento da estratégia, mas não substituem a orientação de longo prazo.\nC) Correta: a missão, os objetivos de longo prazo e a análise do ambiente orientam escolhas estratégicas coerentes.\nD) Atividades rotineiras pertencem à execução cotidiana. Dar ênfase exclusiva a elas não define o rumo estratégico.\nE) O orçamento anual deve dialogar com a estratégia, mas o planejamento estratégico não se limita a uma previsão orçamentária anual.\n\nErro comum: Confundir planejamento estratégico com uma lista de tarefas ou com o orçamento do próximo ano. A estratégia precisa explicar o rumo e as prioridades que orientam essas decisões.\n\nExemplo prático: Uma instituição analisa sua capacidade de atendimento, as necessidades da população e as mudanças tecnológicas. Com base em sua missão, define para os próximos anos ampliar o acesso a serviços em regiões afastadas. Projetos, capacitações, metas anuais e orçamento devem ser articulados a esse objetivo, e o plano pode ser revisto diante de mudanças relevantes."
  }
]
$items$::jsonb)
  loop
    select * into strict stored
    from public.board_exam_questions
    where board = 'IDECAN'
      and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
      and career_name = 'Escrivão de Polícia Civil'
      and exam_year = 2026 and exam_type = 'Tipo A'
      and item_number = (change->>'item')::integer
    for update;

    select encode(sha256(convert_to(jsonb_build_object('stem',replace(stem,E'\r\n',E'\n'),'options',options,'answer',official_answer,'subject',subject)::text,'UTF8')),'hex')
    into actual_hash
    from public.board_exam_questions where id = stored.id;

    if actual_hash <> change->>'hash' then
      raise exception 'Questão % mudou: confira enunciado, alternativas, matéria e gabarito. Nada aplicado.', change->>'item';
    end if;
    if stored.content_status not in ('active','under_review')
       or stored.needs_visual
       or stored.legal_review_required
       or coalesce(stored.legal_basis,'[]'::jsonb) <> '[]'::jsonb then
      raise exception 'Questão % bloqueada ou exige revisão adicional. Nada aplicado.', change->>'item';
    end if;

    if stored.explanation = change->>'explanation' then
      unchanged_count := unchanged_count + 1;
      continue;
    end if;
    if nullif(btrim(stored.explanation),'') is not null then
      raise exception 'Questão % já tem explicação diferente. Preservada; lote cancelado.', change->>'item';
    end if;
    if exists (
      select 1 from public.idecan_admin_explanation_audit
      where batch_key = 'idecan-admin-pcsc-64-68-20261023'
        and question_id = stored.id
    ) then
      raise exception 'Questão % tem auditoria anterior e comentário divergente. Lote cancelado.', change->>'item';
    end if;

    update public.board_exam_questions
    set explanation = change->>'explanation'
    where id = stored.id
    returning * into updated_row;

    insert into public.idecan_admin_explanation_audit
      (batch_key,question_id,before_data,after_data)
    values ('idecan-admin-pcsc-64-68-20261023',stored.id,
            to_jsonb(stored),to_jsonb(updated_row));
    applied_count := applied_count + 1;
  end loop;
  raise notice 'Explicações aplicadas: %. Já iguais: %. Status e gabaritos preservados.', applied_count, unchanged_count;
end $apply$;

select item_number as questao, official_answer as gabarito,
       content_status as estado, syllabus_topic_id as topico_edital,
       nullif(btrim(explanation),'') is not null as tem_explicacao,
       explanation ~* 'Exemplo( pr[aá]tico)?:' as tem_exemplo
from public.board_exam_questions
where board = 'IDECAN'
  and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
  and career_name = 'Escrivão de Polícia Civil'
  and exam_year = 2026 and exam_type = 'Tipo A'
  and item_number between 64 and 68
order by item_number;
commit;
