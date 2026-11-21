-- Expansão didática de Arquivologia e Administração — PC-AC 2026.
-- Atualiza o conteúdo dos três módulos existentes, sem duplicar aulas ou questões.
update public.study_materials as m
set summary = v.summary,
    body_md = v.body_md,
    updated_at = now()
from (values
('pcac-2026-guia-administracao-geral-12-gestao-do-tempo-e-definicao-de-prioridades','Aprofunda urgência versus importância, matriz de Eisenhower, priorização no serviço público, delegação, estimativa de tempo, interrupções e ferramentas de organização.','# Gestão do tempo e definição de prioridades

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma tarefa é importante para os objetivos da unidade, mas ainda não tem prazo imediato. Na Matriz de Eisenhower, deve ser:
>
> A) eliminada. B) feita imediatamente por ser urgente. C) planejada e agendada. D) delegada sempre. E) ignorada até se tornar urgente.
>
> **Resolução:** importante e não urgente deve ser planejada e receber horário reservado. Gabarito: **C**.

## 1. O que significa gerir o tempo?
É organizar atividades, atenção, prazos e recursos para alcançar resultados. Não significa trabalhar sem pausa nem preencher cada minuto da agenda. Uma boa gestão prevê imprevistos, protege tarefas importantes e reduz retrabalho.

No serviço público, priorizar também exige observar prazo legal, risco ao cidadão, continuidade do serviço, segurança, impacto e dependências entre tarefas.

## 2. Urgência não é a mesma coisa que importância
- **Urgência**: existe pressão de tempo; algo precisa de atenção em breve.
- **Importância**: a tarefa contribui para um objetivo ou evita consequência relevante.

Exemplo: responder uma mensagem sem consequência pode parecer urgente porque chegou agora, mas preparar um relatório necessário para uma decisão pode ser mais importante, mesmo com prazo posterior.

## 3. Matriz de Eisenhower
| Quadrante | Característica | Conduta |
|---|---|---|
| I | Importante e urgente | Fazer agora |
| II | Importante e não urgente | Planejar e agendar |
| III | Não importante e urgente | Delegar ou simplificar, se possível |
| IV | Não importante e não urgente | Reduzir ou eliminar |

**Exemplo cotidiano:** um prazo processual que termina hoje pode estar no quadrante I; estudar uma norma que será necessária em atividade futura fica no II; uma solicitação rotineira que outra pessoa capacitada pode resolver pode ficar no III; navegar sem objetivo durante o expediente pode ficar no IV.

**Atenção:** a matriz é ferramenta de apoio, não autorização para ignorar protocolo, hierarquia, prazo legal ou atribuição funcional.

## 4. Como escolher a próxima tarefa
Use uma sequência simples:
1. Há risco imediato à vida, à integridade, à segurança ou à perda de informação? Trate conforme o protocolo.
2. Existe prazo legal ou institucional próximo? Registre e calcule a margem.
3. A tarefa bloqueia outra pessoa ou etapa? Considere a dependência.
4. Qual o impacto se atrasar?
5. Qual o esforço e quais recursos são necessários?
6. É possível dividir em etapas menores?

Uma lista de prioridades deve ser revista quando surgem fatos novos.

## 5. Planejamento realista
Estime duração, inclua margem para imprevistos e agrupe tarefas semelhantes. Compare tempo previsto com tempo realizado: isso melhora estimativas futuras.

O calendário registra compromissos e prazos. A lista de tarefas registra ações. O time blocking reserva blocos para atividades. O Kanban mostra o fluxo (a fazer, em andamento, concluído). A técnica Pomodoro alterna períodos de foco e pausas, mas o intervalo deve ser adaptado ao tipo de atividade.

## 6. Interrupções e concentração
Interrupções frequentes aumentam trocas de contexto. Quando possível:
- agrupe respostas rotineiras;
- reserve períodos para trabalho que exige concentração;
- deixe claro como situações urgentes devem ser escalonadas;
- registre onde parou antes de mudar de tarefa;
- mantenha canais de atendimento e segurança funcionando.

Não se deve silenciar um canal institucional necessário apenas para ganhar concentração.

## 7. Delegação responsável
Delegar não é simplesmente transferir um problema. O gestor precisa:
- verificar se a tarefa pode ser delegada;
- escolher pessoa habilitada e respeitar competências;
- explicar resultado, prazo e limites;
- disponibilizar recursos e informações;
- combinar como será o acompanhamento;
- dar retorno e assumir as responsabilidades que permanecem com a chefia.

Delegar não significa abandonar o controle nem transferir atribuição legal indelegável.

## 8. Exemplo aplicado
Uma unidade possui três tarefas: (a) responder uma demanda com prazo legal hoje; (b) revisar procedimento que reduz erros no próximo mês; (c) organizar arquivos sem prazo próximo. A demanda legal tende a ser urgente e importante; a revisão é importante e deve ser agendada; a organização deve receber prazo e bloco de execução. Se houver risco imediato ou ordem de prioridade institucional, a classificação muda conforme o contexto.

## 9. Pegadinhas
- Urgente não significa automaticamente importante.
- Importante e não urgente não deve ser deixado para depois indefinidamente.
- Delegação depende de competência e limites legais.
- Planejamento precisa incluir imprevistos.
- Multitarefa não garante produtividade e pode aumentar erros.
- Ferramenta de produtividade não substitui prioridade legal ou institucional.

**Macete de prova:** “importante, mas não urgente” = planejar; “urgente, mas pouco importante” = avaliar delegação; “importante e urgente” = agir; “nem importante nem urgente” = reduzir.'),
('pcac-2026-guia-administracao-geral-14-melhoria-continua-e-gestao-por-processos','Aprofunda processo organizacional, cadeia de valor, tipos de processos, mapeamento AS IS/TO BE, BPMN, indicadores, gargalos, PDCA e melhoria contínua.','# Melhoria contínua e gestão por processos

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma unidade planeja uma mudança no atendimento, testa o procedimento, mede resultados e ajusta o método após identificar falhas. A sequência representa:
>
> A) SWOT. B) ciclo PDCA. C) organograma funcional. D) departamentalização. E) controle exclusivamente financeiro.
>
> **Resolução:** planejar, executar, verificar e agir corresponde ao PDCA. Gabarito: **B**.

## 1. O que é processo organizacional?
É um conjunto de atividades relacionadas que transforma entradas em saídas para atender um usuário ou alcançar um objetivo institucional. Um processo pode atravessar vários setores.

Exemplo: para emitir um documento, pode ser necessário receber pedido, conferir dados, consultar sistema, validar informação, obter aprovação e entregar o resultado. O cidadão enxerga o serviço completo; não apenas cada departamento.

## 2. Elementos de um processo
- Fornecedor: entrega a entrada.
- Entrada: informação, documento, material ou solicitação.
- Atividade: trabalho realizado.
- Recurso: pessoas, sistemas, equipamentos e orçamento.
- Saída: produto ou serviço gerado.
- Cliente/usuário: destinatário da saída.
- Responsável: quem coordena ou responde pelo processo.
- Indicador: medida de desempenho.

Um processo bem descrito tem início, fim, regras, responsáveis e critérios de qualidade.

## 3. Tipos de processo
- **Finalístico ou primário:** entrega diretamente o resultado principal ao cidadão ou usuário.
- **Apoio:** fornece recursos para os processos finalísticos, como TI, compras e gestão de pessoas.
- **Gerencial:** define direção, acompanha desempenho e toma decisões.

A classificação depende do contexto da organização. Um mesmo setor pode participar de mais de um processo.

## 4. Gestão por processos (BPM)
BPM é uma abordagem de gestão que identifica, modela, executa, monitora e melhora processos. Não é apenas desenhar fluxogramas.

O mapeamento permite identificar:
- atividades repetidas;
- espera entre etapas;
- documentos desnecessários;
- decisões sem critério claro;
- retrabalho;
- gargalos;
- riscos e pontos de controle.

## 5. AS IS e TO BE
- AS IS: como o processo funciona atualmente.
- TO BE: como se pretende que funcione depois da melhoria.

Exemplo: hoje o cidadão entrega o mesmo documento em três setores (AS IS). A proposta valida a informação uma única vez e compartilha o dado com acesso autorizado (TO BE). A mudança precisa respeitar segurança, privacidade e competência dos setores.

## 6. Fluxograma e BPMN
Fluxograma representa sequência de atividades e decisões por símbolos. BPMN é uma notação padronizada para modelar processos, com eventos, tarefas, gateways (decisões), fluxos e participantes.

Não confunda mapa de processo com organograma: organograma mostra estrutura e relações hierárquicas; processo mostra o fluxo de trabalho.

## 7. Indicadores de desempenho
Um indicador precisa de definição, fórmula, fonte, periodicidade, responsável e meta.

Exemplos:
- Tempo médio de atendimento = soma dos tempos / quantidade de atendimentos.
- Taxa de retrabalho = processos refeitos / processos analisados × 100.
- Taxa de erro = registros com erro / total verificado × 100.
- Produtividade = entregas / unidade de recurso ou tempo.

Não analise apenas a média: poucos casos extremos podem distorcê-la. Quando necessário, observe mediana, distribuição e segmentos do processo.

## 8. Gargalo e capacidade
Gargalo é a etapa que limita o fluxo total. Se uma unidade consegue receber 100 solicitações por dia, mas a conferência final só libera 40, aumentar a capacidade da recepção não resolve o limite. É preciso examinar a etapa restritiva.

Automatizar uma etapa sem entender o processo pode apenas acelerar erros ou transferir o gargalo para outro setor.

## 9. Ciclo PDCA
1. **Plan (planejar):** identificar problema, causa, objetivo, método e indicador.
2. **Do (executar):** testar a mudança, registrar dados e orientar envolvidos.
3. **Check (verificar):** comparar resultado com meta e avaliar efeitos não previstos.
4. **Act (agir):** padronizar se funcionou ou corrigir e reiniciar o ciclo.

O PDCA é contínuo. A etapa Act não é simplesmente “terminar”: ela consolida o aprendizado e alimenta um novo planejamento.

## 10. Exemplo resolvido
Uma unidade demora 10 dias para concluir um atendimento e registra 20% de retrabalho. A equipe mapeia o fluxo, descobre que formulários incompletos voltam ao início, cria uma conferência inicial, testa a mudança e mede novamente tempo e retrabalho. Se os indicadores melhorarem sem prejudicar a qualidade, o procedimento pode ser padronizado.

## 11. Pegadinhas de prova
- Processo atravessa setores; departamento é parte da estrutura.
- AS IS descreve o atual; TO BE descreve o futuro proposto.
- BPM envolve gestão do ciclo, não só desenho.
- Gargalo limita a capacidade total.
- Indicador precisa de fórmula e fonte.
- PDCA é cíclico, não uma sequência encerrada para sempre.
- Eficiência local pode piorar o resultado global se deslocar o gargalo.

**Macete:** processo = fluxo de ponta a ponta; BPM = gerir esse fluxo; PDCA = melhorar continuamente.'),
('pcac-2026-guia-arquivologia-08-fundo-serie-especie-tipo-e-suporte','Aprofunda fundo, grupo, série, subsérie, espécie, tipo, gênero, suporte e formato, com exemplos de documentos policiais, classificação e pegadinhas de prova.','# Fundo, série, espécie, tipo, gênero, suporte e formato

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma unidade policial produz um documento com a forma de relatório para registrar uma vistoria específica. “Relatório” e “relatório de vistoria” correspondem, respectivamente, a:
>
> A) tipo e suporte. B) espécie e tipo documental. C) fundo e série. D) gênero e formato. E) suporte e espécie.
>
> **Resolução:** “relatório” é a espécie, isto é, a forma documental. “Relatório de vistoria” é o tipo, pois associa a espécie à atividade que gerou o documento. Gabarito: **B**.

## 1. Primeiro entenda a lógica do arquivo
Imagine o arquivo de uma delegacia. Há documentos produzidos no trabalho diário: boletins, relatórios, ofícios, termos, requisições e processos. Eles não são um monte de papéis iguais: foram produzidos por uma instituição, em atividades diferentes e seguindo procedimentos.

A Arquivologia organiza esses documentos respeitando o contexto de produção. Por isso, é importante distinguir o conjunto que pertence ao produtor, a atividade que reúne documentos semelhantes e a forma específica de cada documento.

## 2. Fundo documental
Fundo é o conjunto orgânico de documentos produzidos e recebidos por uma pessoa ou entidade no exercício de suas funções. A identidade do fundo vem do produtor, não apenas do assunto.

**Exemplo:** os documentos acumulados pela Polícia Civil no exercício de suas competências integram o fundo correspondente ao produtor institucional. Não se deve misturar esse fundo com o de outro órgão apenas porque ambos guardam documentos sobre investigação.

**Pegadinha:** fundo não é sinônimo de coleção temática. Uma coleção pode reunir itens por assunto ou interesse; fundo reflete a acumulação orgânica de um produtor.

## 3. Grupo, seção e série
Dentro de um fundo, a organização pode apresentar divisões hierárquicas conforme estrutura e funções do produtor. Os nomes e níveis dependem do plano de classificação adotado.

Série documental reúne documentos relacionados a uma mesma atividade ou procedimento, com características recorrentes.

**Exemplo:** processos de aquisição de materiais podem formar uma série; dentro dela, podem existir processos de anos diferentes, organizados conforme o plano institucional.

## 4. Espécie documental
Espécie é a configuração formal que permite reconhecer o documento: ata, relatório, ofício, certidão, requerimento, contrato, boletim, termo.

Pense na pergunta: “Que forma esse documento tem?” Se a resposta for relatório, essa é a espécie.

## 5. Tipo documental
Tipo documental resulta da união entre espécie e atividade que gerou o documento.

- Relatório + atividade de inspeção = relatório de inspeção.
- Relatório + atividade de investigação = relatório de investigação.
- Ata + reunião de comissão = ata de reunião da comissão.
- Requerimento + pedido de licença = requerimento de licença.

**Macete:** espécie é o nome geral da forma; tipo explica para qual atividade aquela forma foi produzida.

## 6. Gênero, suporte e formato
Gênero diz respeito à maneira como a informação é representada: textual, iconográfica, cartográfica, sonora, audiovisual, entre outras.

Suporte é o meio material em que a informação está registrada: papel, película, fita magnética, mídia óptica ou suporte eletrônico, conforme a terminologia adotada.

Formato é a configuração técnica do arquivo ou documento: PDF, DOCX, TIFF, JPEG, WAV etc. Não confunda o formato digital com a espécie documental.

**Exemplo completo:** um relatório de inspeção (tipo) pertence à espécie relatório; pode ter gênero textual; estar registrado em papel (suporte) ou em arquivo digital; e, neste último caso, estar em PDF (formato). Mudar o papel para PDF não transforma o relatório em outra espécie.

## 7. Como classificar um exemplo na prova
Quando o enunciado trouxer um documento, faça quatro perguntas:
1. Quem produziu/acumulou? Ajuda a identificar o fundo.
2. Qual atividade ou procedimento o originou? Ajuda a identificar a série e o tipo.
3. Qual a forma documental? Identifica a espécie.
4. Em que meio e configuração está registrado? Identifica suporte e formato.

Não tente responder olhando apenas o assunto. O contexto funcional é decisivo.

## 8. Erros que a banca pode explorar
- Fundo não é simplesmente conjunto de documentos sobre o mesmo tema.
- Série não é sinônimo de espécie.
- Espécie é a forma; tipo associa a forma à atividade.
- Gênero não é formato.
- Suporte não é formato: papel é suporte; PDF é formato.
- Um documento digital pode continuar sendo ofício, relatório, ata ou requerimento.
- A classificação deve preservar o vínculo com o produtor e com a função que gerou o documento.

## 9. Revisão rápida
| Termo | Pergunta que responde | Exemplo |
|---|---|---|
| Fundo | Quem acumulou? | Documentos de uma instituição |
| Série | Qual atividade recorrente? | Processos de contratação |
| Espécie | Qual a forma? | Relatório |
| Tipo | Forma + atividade? | Relatório de inspeção |
| Gênero | Como a informação é representada? | Textual ou audiovisual |
| Suporte | Em que meio está registrada? | Papel |
| Formato | Qual configuração técnica? | PDF |

**Dica final:** se aparecer “relatório de inspeção”, separe as palavras: relatório = espécie; de inspeção = atividade que especifica o tipo.')
) as v(slug, summary, body_md)
where m.slug = v.slug;
