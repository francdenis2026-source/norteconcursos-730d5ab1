-- PC-AC 2026: aprofundamento das aulas 06 a 15 de Noções de Administração.
-- Conteúdo didático complementar baseado nos tópicos do Anexo III do Edital 001 SEAD/PCAC.
-- Idempotente: atualiza somente os slugs identificados, sem recriar questões ou progresso do aluno.

update public.study_materials
set body_md = case slug
when 'pcac-2026-guia-administracao-geral-06-papeis-do-administrador-e-situacoes-gerenciais' then $md$
# Aula 6 — Papéis do administrador e situações gerenciais

Administrar é coordenar recursos humanos, materiais, financeiros, tecnológicos e informacionais para alcançar objetivos. O trabalho gerencial envolve obter informações, decidir, comunicar, negociar, orientar pessoas e acompanhar resultados.

## Papéis gerenciais de Mintzberg

**Interpessoais**
- Representante (figura de proa): deveres simbólicos e representação formal da unidade.
- Líder: orienta, motiva, desenvolve e avalia a equipe.
- Elemento de ligação: mantém contatos e redes de relacionamento internos e externos.

**Informacionais**
- Monitor: busca e recebe informações sobre o ambiente e o funcionamento da unidade.
- Disseminador: compartilha informações relevantes internamente.
- Porta-voz: comunica informações da unidade a públicos externos.

**Decisionais**
- Empreendedor: identifica oportunidades e promove melhorias.
- Solucionador de conflitos: atua diante de crises, divergências e problemas inesperados.
- Alocador de recursos: distribui orçamento, pessoal, tempo e equipamentos.
- Negociador: representa a unidade em negociações e acordos.

## Situações práticas
Reunião para alinhar tarefas: líder. Leitura de relatórios para identificar atrasos: monitor. Comunicação de resultado a outro órgão: porta-voz. Redistribuição de servidores: alocador de recursos. Mediação de conflito: solucionador de conflitos.

## Como a banca cobra
Representar é diferente de liderar; receber informação é diferente de disseminá-la; resolver crise é diferente de empreender mudança planejada. O mesmo gestor pode desempenhar vários papéis ao longo do dia.

## Pegadinhas
- Monitor recebe/busca; disseminador transmite internamente; porta-voz comunica externamente.
- Representante é papel simbólico; líder envolve direção das pessoas.
- Alocador distribui recursos; negociador conduz acordos.
$md$
when 'pcac-2026-guia-administracao-geral-07-planejamento-estrategico-tatico-e-operacional' then $md$
# Aula 7 — Planejamento estratégico, tático e operacional

Planejar é definir objetivos e escolher antecipadamente ações, recursos, responsáveis, prazos e indicadores. Reduz improvisações, mas não elimina incertezas; deve ser acompanhado e revisto quando o cenário mudar.

## Níveis
- **Estratégico:** horizonte amplo e longo prazo; considera a organização como um todo, missão, visão, objetivos gerais e ambiente externo. Em regra, é conduzido pela alta administração.
- **Tático:** desdobra a estratégia por áreas ou unidades, com objetivos intermediários, recursos e metas setoriais.
- **Operacional:** detalha tarefas, rotinas, responsáveis, prazos e procedimentos do cotidiano.

## Instrumentos
- Missão: razão de existir da organização.
- Visão: situação futura que se pretende alcançar.
- Valores: princípios que orientam decisões.
- Objetivo: resultado amplo desejado.
- Meta: resultado mensurável, com indicador e prazo.
- Plano de ação: atividades, responsáveis, recursos e cronograma.
- Indicador: medida para acompanhar desempenho.

## Exemplo aplicado
Estratégico: melhorar a resposta institucional. Tático: regional define metas de distribuição de procedimentos e capacitação. Operacional: equipe organiza escala, fluxo de recebimento, conferência e registro de diligências.

A análise SWOT/FOFA identifica forças e fraquezas internas e oportunidades e ameaças externas. O 5W2H organiza o plano: o quê, por quê, onde, quando, quem, como e quanto custa.

## Pegadinhas
- Estratégico é abrangente; tático traduz a estratégia para áreas; operacional detalha execução.
- Meta precisa permitir verificação; “melhorar muito” não é meta mensurável.
- Planejamento define o caminho; controle compara o resultado com o padrão.
$md$
when 'pcac-2026-guia-administracao-geral-08-estrutura-formal-informal-e-comunicacao' then $md$
# Aula 8 — Estrutura formal, informal e comunicação

A estrutura organizacional define como atividades, autoridade, responsabilidades e canais de comunicação são distribuídos. O organograma representa relações formais, mas não necessariamente todas as relações reais de influência.

## Estrutura
- Formal: instituída oficialmente, com cargos, unidades, competências, hierarquia e regras.
- Informal: surge espontaneamente das relações sociais, confiança, afinidades e cooperação; pode facilitar conhecimento, mas também gerar boatos e resistência.

## Elementos estruturais
- Hierarquia: níveis de autoridade.
- Amplitude de controle: número de subordinados sob responsabilidade direta de um gestor.
- Centralização: concentração das decisões nos níveis superiores.
- Descentralização: distribuição de autoridade decisória.
- Formalização: intensidade de regras e procedimentos.
- Departamentalização: agrupamento por função, território, processo, produto ou público.

## Comunicação organizacional
- Descendente: chefia para equipe; orientações, metas e decisões.
- Ascendente: equipe para chefia; relatórios, sugestões e alertas.
- Horizontal: entre pessoas ou setores de nível semelhante.
- Diagonal: cruza níveis hierárquicos e áreas diferentes, conforme canais institucionais.

## Processo e barreiras
O processo envolve emissor, codificação, mensagem, canal, receptor, decodificação e feedback. Ruídos decorrem de linguagem ambígua, excesso de informação, falhas técnicas, diferenças de interpretação ou falta de retorno.

Exemplos: chefia envia procedimento atualizado (descendente); servidor informa risco à chefia (ascendente); duas unidades alinham tramitação (horizontal).

## Pegadinhas
- Organograma retrata estrutura formal, não todas as relações informais.
- Descentralização não elimina responsabilidade e controle.
- Comunicação horizontal não é necessariamente informal.
- Feedback permite verificar se a mensagem foi compreendida.
$md$
when 'pcac-2026-guia-administracao-geral-09-tomada-de-decisao-e-controle' then $md$
# Aula 9 — Tomada de decisão e controle

Decidir é escolher uma alternativa entre opções possíveis para enfrentar um problema ou aproveitar uma oportunidade. A decisão pode ser individual ou coletiva, programada ou não programada.

## Tipos de decisão
- Programada: repetitiva e estruturada; pode seguir regras, rotinas e precedentes.
- Não programada: nova, complexa ou pouco estruturada; exige análise específica e julgamento.

## Etapas da decisão racional
1. Identificar e delimitar o problema.
2. Reunir informações confiáveis.
3. Definir critérios e restrições.
4. Construir alternativas.
5. Avaliar consequências, custos e riscos.
6. Escolher a alternativa adequada.
7. Implementar.
8. Monitorar efeitos e corrigir desvios.

A racionalidade é limitada: tempo, informação e capacidade de análise são finitos. Decisões reais podem buscar solução satisfatória, não uma solução matematicamente perfeita.

## Controle administrativo
Compara desempenho com padrões e permite corrigir desvios:
- estabelecer padrões e indicadores;
- medir o desempenho;
- comparar realizado e esperado;
- identificar causas;
- adotar ações corretivas e acompanhar resultados.

## Controle quanto ao momento
- Prévio/preventivo: antes da execução, para evitar falhas.
- Concomitante: durante a atividade, permitindo correção imediata.
- Posterior: depois da execução, avaliando resultados e subsidiando melhorias.

## Relação com PODC
Planejamento estabelece objetivos e padrões; organização distribui recursos; direção mobiliza pessoas; controle mede resultados e retroalimenta o planejamento.

## Pegadinhas
- Controle não se resume a punir: também previne, mede e corrige.
- Concomitante ocorre durante a execução.
- Decisão programada trata de situações recorrentes; não programada, de situações novas.
$md$
when 'pcac-2026-guia-administracao-geral-10-estoques-inventarios-e-controle-patrimonial' then $md$
# Aula 10 — Estoques, inventários e controle patrimonial

A administração de materiais busca garantir que o material adequado esteja disponível na quantidade, qualidade, local e momento necessários, com custo total compatível e sem desperdício. Envolve planejamento da demanda, compras, recebimento, armazenagem, distribuição e controle.

## Estoques e níveis
- Estoque mínimo: nível de proteção para evitar falta.
- Estoque máximo: limite para evitar excesso.
- Ponto de pedido: nível em que se inicia a reposição, considerando consumo no prazo de reposição e estoque de segurança.
- Estoque de segurança: proteção contra variação de demanda ou atraso.
- Lote de compra: quantidade adquirida por pedido.

## Curva ABC
Classifica itens conforme sua relevância econômica acumulada:
- A: poucos itens concentram grande parcela do valor; controle rigoroso.
- B: importância intermediária.
- C: muitos itens representam parcela menor do valor; controles simplificados podem bastar.

Percentuais não são universais; dependem da distribuição observada e do critério adotado.

## Inventário e patrimônio
Inventário verifica fisicamente e documentalmente bens e materiais. Pode ser periódico, rotativo, inicial, eventual ou de transferência. A contagem deve ser conciliada com registros, identificando diferenças e providências.

Bens permanentes devem ser identificados, registrados, localizados, atribuídos a responsáveis e acompanhados durante sua vida útil. Tombamento é o registro individual para controle e rastreabilidade; não é sinônimo de avaliação financeira.

## Boas práticas
Conferir quantidade, especificação e integridade no recebimento; registrar entradas e saídas; separar solicitação, autorização, recebimento e registro quando possível; armazenar conforme características e riscos; documentar ajustes e baixas.

## Pegadinhas
- Inventário físico verifica existência e condição; registro contábil não substitui contagem.
- Curva ABC considera importância acumulada, normalmente valor de consumo.
- Ponto de pedido considera prazo de reposição e estoque de segurança.
$md$
when 'pcac-2026-guia-administracao-geral-11-trabalho-em-equipe-e-relacoes-interpessoais' then $md$
# Aula 11 — Trabalho em equipe e relações interpessoais

Grupo é um conjunto de pessoas que interagem. Equipe pressupõe coordenação, objetivos compartilhados, complementaridade de competências e responsabilidade pelo resultado. Nem todo grupo funciona como equipe.

## Elementos de uma equipe eficaz
Objetivos claros; papéis definidos; comunicação respeitosa; confiança; competências complementares; liderança adequada; acompanhamento de resultados e aprendizagem.

## Desenvolvimento de equipes
O modelo de Tuckman descreve formação (forming), conflito/ajuste (storming), normatização (norming), desempenho (performing) e encerramento (adjourning) em equipes temporárias. É um modelo explicativo, não uma sequência obrigatória em todos os grupos.

## Conflitos
Podem ser de tarefa, relacionamento ou processo. A gestão construtiva identifica a causa, ouve os envolvidos, separa fatos de interpretações, explicita interesses e busca solução compatível com objetivos e regras.

Estilos: competição, colaboração, compromisso, acomodação e evitação. A escolha depende da urgência, importância do tema, poder relativo e necessidade de preservar o relacionamento.

## Motivação e liderança
Motivação envolve fatores individuais e contextuais. O gestor combina clareza de expectativas, reconhecimento, condições de trabalho, desenvolvimento e feedback. Liderança é influência para alcançar objetivos comuns; não se limita à autoridade formal.

## Pegadinhas
- Equipe não é mera reunião de pessoas.
- Conflito pode ser funcional quando debatido com respeito e orientado à tarefa.
- Colaboração procura solução que atenda interesses relevantes; compromisso costuma envolver concessões.
$md$
when 'pcac-2026-guia-administracao-geral-12-gestao-do-tempo-e-definicao-de-prioridades' then $md$
# Aula 12 — Gestão do tempo e definição de prioridades

Gestão do tempo organiza atividades, prazos, recursos e prioridades para cumprir objetivos. Não significa ocupar cada minuto, mas escolher o que deve ser feito, em que ordem e com qual padrão de qualidade.

## Matriz de Eisenhower
Classifica tarefas conforme urgência e importância:
- Importante e urgente: fazer imediatamente.
- Importante e não urgente: planejar e reservar tempo.
- Não importante e urgente: delegar ou simplificar, quando possível.
- Não importante e não urgente: reduzir ou eliminar.

Urgência é pressão temporal; importância é contribuição para objetivos e consequências. Não são sinônimos.

## Priorização
Considere prazo, impacto, risco, dependências, esforço, recursos disponíveis e consequências do atraso. Uma tarefa crítica pode ter prioridade mesmo sem prazo imediato se evitar risco relevante.

## Ferramentas
- Agenda/calendário: compromissos e prazos.
- Lista de tarefas: registro de ações pendentes.
- Time blocking: blocos de tempo reservados.
- Pomodoro: ciclos de foco e pausas ajustados ao trabalho.
- Kanban: visualização do fluxo em a fazer, em andamento e concluído.
- Revisão: comparar tempo previsto e realizado para melhorar estimativas.

## Interrupções e delegação
Agrupe tarefas semelhantes, defina períodos de concentração e estabeleça critérios para urgências. Delegar exige escolher responsável, explicar resultado esperado, conceder recursos e acompanhar sem retirar toda a autonomia.

## Pegadinhas
- Tarefa urgente não é necessariamente importante.
- O planejamento precisa prever imprevistos.
- Delegação não elimina o acompanhamento do gestor.
- Multitarefa pode aumentar trocas de contexto e erros.
$md$
when 'pcac-2026-guia-administracao-geral-13-gestao-da-informacao-e-do-conhecimento' then $md$
# Aula 13 — Gestão da informação e do conhecimento

## Dado, informação e conhecimento
- Dado: registro bruto de um fato, sem interpretação suficiente.
- Informação: dado organizado e contextualizado, com significado para uma finalidade.
- Conhecimento: capacidade de interpretar informações e aplicá-las à decisão e à ação.

Exemplo: “12” é dado; “12 processos estão pendentes há mais de 30 dias” é informação; conhecer as causas e reorganizar o fluxo é aplicação do conhecimento.

## Gestão da informação
Abrange identificar necessidades, coletar, classificar, armazenar, proteger, recuperar, compartilhar e descartar informações conforme regras de retenção e acesso. A qualidade depende de precisão, completude, atualidade, consistência, relevância e disponibilidade.

## Gestão do conhecimento
Busca criar, registrar, compartilhar e aplicar conhecimento organizacional. Inclui capacitação, comunidades de prática, manuais, lições aprendidas, padronização e transferência de conhecimento em mudanças de equipe.

- Tácito: pessoal, contextual e difícil de formalizar, adquirido pela experiência.
- Explícito: registrado em documentos, bases, procedimentos, vídeos e manuais.

O modelo SECI descreve socialização, externalização, combinação e internalização na conversão do conhecimento.

## Memória institucional e segurança
Registros confiáveis preservam decisões, justificativas, procedimentos e histórico. A gestão documental mantém autenticidade, integridade, disponibilidade e rastreabilidade. O compartilhamento deve respeitar finalidade, necessidade, autorização e proteção de dados pessoais.

## Pegadinhas
- Dado não é sinônimo de informação.
- Conhecimento tácito pode ser externalizado parcialmente.
- Gestão do conhecimento não é apenas comprar tecnologia.
- Informação deve ser disponibilizada a quem precisa, segundo permissões e regras.
$md$
when 'pcac-2026-guia-administracao-geral-14-melhoria-continua-e-gestao-por-processos' then $md$
# Aula 14 — Melhoria contínua e gestão por processos

Processo é conjunto de atividades relacionadas que transforma entradas em saídas para produzir valor a um usuário ou destinatário. Pode atravessar vários setores; por isso, não se confunde com a estrutura departamental.

## Elementos
Fornecedor, entrada, atividades, recursos, saída, cliente/usuário, responsável, regras e indicadores.

## Tipos
- Finalístico/primário: entrega diretamente o serviço ou resultado principal ao cidadão.
- Apoio: fornece recursos e suporte aos processos finalísticos.
- Gerencial: orienta, monitora e avalia o desempenho.

## BPM e mapeamento
Gestão por processos (BPM) envolve identificar, modelar, executar, monitorar e melhorar processos. Fluxogramas e BPMN representam tarefas, eventos, decisões, responsáveis e caminhos alternativos.

AS IS representa o processo atual; TO BE representa o processo futuro proposto.

## Ciclo PDCA
- Plan: planejar objetivo, método e indicadores.
- Do: executar e registrar dados.
- Check: verificar resultados e comparar com metas.
- Act: padronizar o que funcionou ou corrigir o plano.

O ciclo é contínuo: após agir, um novo planejamento pode começar.

## Indicadores e gargalos
Tempo de ciclo, retrabalho, erros, custo, produtividade e satisfação podem medir desempenho. Gargalo é a etapa que limita a capacidade do fluxo. Melhorar etapa que não é gargalo pode não aumentar a entrega total.

## Pegadinhas
- Processo atravessa setores; departamento é unidade da estrutura.
- PDCA é ciclo de melhoria contínua.
- AS IS é situação atual; TO BE, situação desejada.
- Automatizar processo ruim sem redesenhá-lo pode acelerar o desperdício.
$md$
when 'pcac-2026-guia-administracao-geral-15-atendimento-ao-publico-etica-e-sigilo' then $md$
# Aula 15 — Atendimento ao público, ética e sigilo

## Atendimento público
Atendimento adequado exige urbanidade, respeito, escuta ativa, clareza, impessoalidade, acessibilidade, eficiência e orientação correta. O agente deve compreender a demanda, confirmar o entendimento, informar providências e prazos possíveis e registrar o atendimento quando necessário.

## Comunicação com o cidadão
Use linguagem simples, objetiva e respeitosa. Evite jargões, promessas que não pode cumprir, exposição desnecessária de dados e tratamento discriminatório. Em conflito, mantenha postura profissional, escute, explique limites legais e encaminhe a demanda ao setor competente.

## Ética no serviço público
A conduta deve observar legalidade, finalidade pública, honestidade, imparcialidade, responsabilidade, transparência e zelo pelo patrimônio. O interesse público não autoriza violar direitos ou agir fora da competência.

Conflitos de interesse devem ser identificados e tratados conforme regras institucionais. Favorecimento pessoal, uso privado de recursos públicos e divulgação indevida de informação são incompatíveis com a ética funcional.

## Sigilo e proteção da informação
Nem toda informação estatal é pública sem restrição. O acesso observa LAI, LGPD, normas de sigilo legal e necessidade funcional. Dados pessoais e informações de investigação exigem proteção e compartilhamento limitado a quem tenha atribuição e autorização.

O dever de sigilo não pode ser usado para ocultar ilegalidades ou impedir acesso legalmente assegurado. A restrição deve ter fundamento normativo e ser registrada.

## Acessibilidade
Considere barreiras físicas, comunicacionais, digitais e atitudinais. Adapte canal e comunicação às necessidades do usuário, respeitando dignidade, autonomia e regras de atendimento prioritário.

## Pegadinhas
- Impessoalidade não significa atendimento frio ou desrespeitoso.
- Transparência é regra, mas há restrições legais legítimas.
- Sigilo funcional protege informação, não irregularidade.
- Ética envolve finalidade pública e responsabilidade.
$md$
else body_md end,
updated_at=now()
where contest_name='PC-AC 2026'
and slug in (
'pcac-2026-guia-administracao-geral-06-papeis-do-administrador-e-situacoes-gerenciais',
'pcac-2026-guia-administracao-geral-07-planejamento-estrategico-tatico-e-operacional',
'pcac-2026-guia-administracao-geral-08-estrutura-formal-informal-e-comunicacao',
'pcac-2026-guia-administracao-geral-09-tomada-de-decisao-e-controle',
'pcac-2026-guia-administracao-geral-10-estoques-inventarios-e-controle-patrimonial',
'pcac-2026-guia-administracao-geral-11-trabalho-em-equipe-e-relacoes-interpessoais',
'pcac-2026-guia-administracao-geral-12-gestao-do-tempo-e-definicao-de-prioridades',
'pcac-2026-guia-administracao-geral-13-gestao-da-informacao-e-do-conhecimento',
'pcac-2026-guia-administracao-geral-14-melhoria-continua-e-gestao-por-processos',
'pcac-2026-guia-administracao-geral-15-atendimento-ao-publico-etica-e-sigilo'
);
