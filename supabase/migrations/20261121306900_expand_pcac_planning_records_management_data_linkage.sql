-- Expansão de planejamento, gestão documental e cruzamento de dados — PC-AC 2026.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-guia-administracao-geral-07-planejamento-estrategico-tatico-e-operacional','Aprofunda níveis estratégico, tático e operacional, missão, visão, objetivos, metas, indicadores, análise de ambiente e desdobramento do planejamento.','# Planejamento estratégico, tático e operacional

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> A direção de um órgão define prioridades para os próximos quatro anos. Cada departamento transforma essas prioridades em planos anuais, e as equipes organizam tarefas semanais. A sequência corresponde a:
>
> A) operacional, tático e estratégico. B) estratégico, tático e operacional. C) tático, operacional e estratégico. D) controle, direção e organização. E) execução, controle e missão.
>
> **Resolução:** direção e longo prazo = estratégico; departamentos = tático; rotina das equipes = operacional. Gabarito: **B**.

## 1. O que é planejar?
Planejamento é definir antecipadamente objetivos, caminhos, recursos, responsáveis, prazos e formas de medir resultados. Reduz improviso, mas não elimina a necessidade de adaptar decisões quando o ambiente muda.

No serviço público, o planejamento deve respeitar lei, orçamento, competência institucional, interesse público e transparência.

## 2. Três níveis de planejamento
- **Estratégico:** visão ampla, longo prazo, organização como um todo, alta administração.
- **Tático:** médio prazo, áreas ou departamentos, desdobra a estratégia em programas e metas setoriais.
- **Operacional:** curto prazo, tarefas, rotinas, responsáveis, cronogramas e procedimentos.

**Exemplo:** objetivo estratégico: reduzir o tempo de atendimento ao cidadão. Plano tático: reorganizar o fluxo da unidade. Plano operacional: distribuir tarefas diárias, definir checklist e acompanhar fila.

## 3. Missão, visão e valores
- Missão: razão de existir e finalidade institucional.
- Visão: situação futura que se pretende alcançar.
- Valores: princípios que orientam comportamento e decisões.

Não confunda missão com meta. A missão é propósito; a meta é resultado mensurável com prazo.

## 4. Objetivos, metas e indicadores
Objetivo descreve o que se pretende alcançar. Meta especifica resultado, medida e prazo. Indicador permite acompanhar o progresso.

Exemplo: objetivo = melhorar atendimento. Meta = reduzir o tempo mediano de espera de 40 para 25 minutos em seis meses. Indicador = mediana do tempo de espera, calculada a partir dos registros do sistema.

Uma meta útil precisa ser clara, mensurável, viável, relevante e temporalmente definida.

## 5. Diagnóstico e análise do ambiente
Planejamento considera fatores internos (pessoas, processos, recursos, tecnologia) e externos (legislação, orçamento, demandas sociais, ambiente econômico e riscos).

A análise SWOT/FOFA organiza:
- Forças e fraquezas: fatores internos.
- Oportunidades e ameaças: fatores externos.

A matriz ajuda a estruturar diagnóstico; não substitui dados nem decisão fundamentada.

## 6. Desdobramento e alinhamento
Objetivos estratégicos devem se traduzir em metas táticas e atividades operacionais. Se cada setor perseguir indicador isolado, pode prejudicar o resultado global. Alinhamento exige comunicação, responsabilidades, recursos e indicadores coerentes.

## 7. Monitoramento e revisão
Acompanhe execução, compare resultado com meta, identifique desvio, investigue causa e ajuste plano. Indicador sem fonte, fórmula, periodicidade e responsável não permite acompanhamento confiável.

Planejamento não é documento feito uma vez e esquecido: precisa ser revisto diante de mudança relevante.

## 8. Pegadinhas
- Estratégico é amplo e de longo prazo; operacional é rotina e curto prazo.
- Tático traduz estratégia para áreas.
- Missão é razão de existir; visão é futuro desejado.
- Meta é resultado mensurável com prazo.
- SWOT: forças/fraquezas internas; oportunidades/ameaças externas.
- Planejamento não garante resultado sem execução e controle.

**Macete:** estratégico = onde queremos chegar; tático = como cada área contribuirá; operacional = o que será feito no dia a dia.'),
('pcac-2026-guia-analise-dados-04-cruzamento-registros-vinculacao','Aprofunda cruzamento de bases, chaves, padronização, correspondência exata e aproximada, duplicidades, falsos positivos, validação e rastreabilidade.','# Cruzamento de registros e vinculação de dados

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Duas bases possuem registros de pessoas. Em uma, o nome está abreviado; na outra, completo. Qual procedimento é mais adequado antes de concluir que se trata da mesma pessoa?
>
> A) considerar nomes parecidos como prova. B) comparar múltiplos campos, padronizar dados, avaliar qualidade e registrar incerteza. C) excluir todos os registros incompletos. D) usar apenas o endereço. E) escolher o registro mais recente sem análise.
>
> **Resolução:** vinculação exige critérios, múltiplos atributos e avaliação de falsos positivos e falsos negativos. Gabarito: **B**.

## 1. O que é cruzar registros?
É comparar informações de fontes diferentes para verificar correspondências, complementar dados, identificar inconsistências ou encontrar relações. O cruzamento pode ser determinístico (regra exata) ou probabilístico/aproximado (pontuação de semelhança).

O resultado não é automaticamente verdadeiro: depende da qualidade das fontes, dos campos comparados e das regras usadas.

## 2. Chave e identificador
Chave é campo ou combinação de campos usada para relacionar registros. Pode ser:
- identificador único confiável;
- combinação de nome, data de nascimento e outro atributo;
- chave técnica gerada para cada registro.

Nome isolado geralmente não é uma boa chave: homônimos, abreviações, erros de digitação e mudanças de nome podem gerar associação incorreta.

## 3. Preparação e padronização
Antes do cruzamento:
1. preserve cópia original e registre a fonte;
2. normalize espaços e caracteres conforme regra documentada;
3. padronize datas, telefones e identificadores;
4. separe campos compostos quando necessário;
5. identifique ausências e inconsistências;
6. defina quais campos podem ser comparados e com qual finalidade.

Padronizar não significa apagar a forma original. Mantenha o dado bruto para auditoria.

## 4. Correspondência determinística
Usa regra exata, como mesmo número de protocolo ou identificador confiável. É simples e reprodutível, mas pode perder correspondências quando há erro ou ausência de dado.

Exemplo: cruzar duas bases pelo número de processo, desde que o campo tenha sido preenchido corretamente e pertença ao mesmo sistema de identificação.

## 5. Correspondência aproximada
Usa similaridade entre campos, como nomes com grafia diferente. Pode atribuir pontuação e estabelecer limiares:
- pontuação alta: possível correspondência forte;
- faixa intermediária: revisão manual;
- pontuação baixa: não vincular automaticamente.

Não existe um limiar universal: depende do risco do uso. Em contexto sensível, falsos positivos podem causar prejuízo sério e exigem revisão humana.

## 6. Falsos positivos e falsos negativos
- Falso positivo: sistema diz que dois registros correspondem, mas são pessoas ou eventos diferentes.
- Falso negativo: sistema não encontra correspondência que realmente existe.

Aumentar o limiar pode reduzir falsos positivos, mas aumentar falsos negativos. Diminuir o limiar pode recuperar mais candidatos, mas gerar associações erradas.

## 7. Duplicidades e inconsistências
Duplicidade pode ser real ou aparente. Dois registros com mesmo nome podem representar pessoas diferentes; uma pessoa pode aparecer com abreviação, erro ou endereço antigo.

Classifique os casos, preserve trilha de decisão e evite exclusão automática. Registre a regra, campos comparados, versão da base, data e responsável.

## 8. Privacidade, finalidade e acesso
Cruzar dados pessoais exige finalidade legítima, necessidade, proporcionalidade, segurança e acesso autorizado, observando as normas aplicáveis. Não amplie o cruzamento para campos sem necessidade. Restrinja compartilhamento e registre operações.

## 9. Exemplo resolvido
Base A: “Maria S. Oliveira”, data de nascimento 12/03/1990, protocolo 123. Base B: “Maria Silva Oliveira”, mesma data, protocolo diferente. O nome semelhante e a data coincidente são sinais, mas não prova definitiva. Verifique origem, demais atributos, possibilidade de homônimos e contexto; classifique a correspondência como confirmada, provável ou pendente, conforme critérios formalizados.

## 10. Pegadinhas
- Nome parecido não prova identidade.
- Correspondência exata depende da confiabilidade da chave.
- Similaridade não elimina necessidade de validação.
- Falso positivo e falso negativo são erros diferentes.
- Padronização deve preservar dado original e trilha.
- Cruzamento deve respeitar finalidade e acesso autorizado.

**Macete:** prepare → defina chave → compare → avalie erro → valide → documente.'),
('pcac-2026-guia-arquivologia-09-gestao-documental-da-producao-a-destinacao','Aprofunda ciclo de vida documental, produção, recebimento, protocolo, classificação, tramitação, arquivamento, avaliação, tabela de temporalidade, transferência e recolhimento.','# Gestão documental: da produção à destinação

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Um processo deixou de ser consultado diariamente, mas ainda precisa ser guardado até terminar o prazo administrativo e jurídico. Qual fase costuma corresponder a essa situação?
>
> A) permanente. B) intermediária. C) eliminação imediata. D) produção. E) expedição.
>
> **Resolução:** documento com uso menos frequente, mas que ainda precisa cumprir prazo de guarda, permanece na fase intermediária. Gabarito: **B**.

## 1. O que é gestão documental?
É o conjunto de procedimentos e operações técnicas relativos à produção, tramitação, uso, avaliação e arquivamento de documentos nas fases corrente e intermediária, visando sua eliminação autorizada ou recolhimento para guarda permanente.

A finalidade é garantir acesso, controle, economia de espaço, transparência e preservação da memória institucional.

## 2. O ciclo de vida documental
1. Produção ou recebimento.
2. Registro e protocolo.
3. Classificação conforme função e atividade.
4. Tramitação e uso.
5. Arquivamento e controle.
6. Avaliação dos valores e prazos.
7. Destinação: eliminação autorizada ou guarda permanente.

O documento deve manter vínculo com o produtor e com a atividade que o originou.

## 3. As três idades
- **Corrente:** documento em uso frequente, necessário às atividades imediatas.
- **Intermediário:** uso menos frequente, mas ainda deve ser conservado por prazo administrativo, fiscal ou jurídico.
- **Permanente:** possui valor secundário e deve ser preservado definitivamente.

A idade não depende apenas de quantos anos o documento tem. Depende do uso e da avaliação.

## 4. Transferência, recolhimento e eliminação
- Transferência: passagem do arquivo corrente para o intermediário.
- Recolhimento: passagem ao arquivo permanente.
- Eliminação: destruição autorizada de documentos que cumpriram prazos e não possuem valor que justifique guarda permanente.

**Pegadinha clássica:** transferência não é recolhimento. A primeira conduz ao intermediário; a segunda, ao permanente.

## 5. Avaliação e tabela de temporalidade
Avaliação identifica valores e estabelece prazos de guarda e destinação. Valor primário está ligado à utilidade administrativa, fiscal ou jurídica. Valor secundário decorre de interesse histórico, probatório ou informativo duradouro.

A tabela de temporalidade registra prazos nas fases corrente e intermediária e a destinação final. Sua aplicação depende de aprovação e procedimentos institucionais competentes.

Não se elimina documento apenas porque uma unidade não o consulta mais. Pode existir prazo legal ou valor permanente.

## 6. Classificação, ordenação e arquivamento
Classificação vincula documento à função ou atividade produtora, segundo plano de classificação. Ordenação define sequência de localização, por exemplo, numérica, cronológica, alfabética ou geográfica. Arquivamento é a operação de guardar de modo organizado e recuperável.

Exemplo: processos de investigação são classificados segundo atividade institucional e podem ser ordenados por número/ano. A classificação explica o contexto; a ordenação facilita encontrar.

## 7. Protocolo e tramitação
Protocolo controla recebimento, registro, distribuição, expedição e acompanhamento da circulação. Tramitação é o percurso do documento entre unidades e responsáveis. Cada movimentação relevante deve ser rastreável.

## 8. Documento digital
A gestão digital exige metadados, controle de acesso, identificação, versão, integridade, autenticidade e preservação. Digitalizar papel não resolve sozinho classificação, temporalidade, contexto e destinação.

## 9. Exemplo prático
Uma unidade recebe um requerimento:
- protocola e registra a entrada;
- classifica pela função/atividade;
- encaminha para análise e registra movimentações;
- mantém no corrente enquanto o uso é frequente;
- transfere ao intermediário quando o uso diminui, mas o prazo continua;
- após avaliação, recolhe ao permanente ou elimina conforme tabela e autorização.

## 10. Pegadinhas
- Três idades não são simplesmente três faixas de idade cronológica.
- Documento intermediário ainda pode ter valor administrativo ou jurídico.
- Recolhimento é para o permanente.
- Eliminação exige autorização e formalização.
- Classificação não é mera ordenação.
- Tabela de temporalidade define prazo e destinação, não é lista informal de descarte.

**Macete:** corrente = uso frequente; intermediário = espera prazo/destinação; permanente = guarda definitiva.')
) as v(slug, summary, body_md)
where m.slug = v.slug;