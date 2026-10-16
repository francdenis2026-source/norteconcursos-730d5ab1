# Continuação da fila de questões das Polícias Civis — 16/10/2026

## Primeiro lote: Rondônia, 59 pendências resolvidas

Foram revisadas individualmente e publicadas como ativas **59 questões do concurso PC/RO 2022**: delegado 19, agente 17, escrivão 15 e datiloscopista oito. Cada comentário inclui explicação, exemplo e exercício respondido. Enunciados, cinco alternativas, gabaritos definitivos, extrações, disciplinas e referências originais foram preservados. As URLs históricas do Drive continuam nos identificadores de origem; a evidência desta revisão usa os PDFs oficiais do Cebraspe e seus hashes, sem alegar reparo integral de toda a proveniência antiga.

O catálogo oficial `PC_RO_22` foi consultado na API do Cebraspe e foram recuperados 19 PDFs, incluindo abertura, duas retificações consultadas, cadernos e gabaritos definitivos dos quatro cargos. O concurso de 2022 permanece com publicações de fases posteriores em 2026: não é anunciado como concurso novo de 2026. As retificações 5/2022 e 1/2023 consultadas não alteram os recortes programáticos usados no lote. Essa análise não certifica cada detalhe dos 98 documentos do catálogo.

Os quatro registros de edição apontavam para cadernos em vez de edital. Foram corrigidos para a abertura oficial, preservando as fontes antigas e os tópicos provisórios. Foram registrados **nove fontes oficiais e 17 recortes de tópicos**, normalizados por disciplina e extraídos do programa do próprio cargo. São metadados de pertinência; não novas questões ou materiais redundantes, nem aprovação em massa dos demais itens.

O confronto automatizado examinou 385 registros de Rondônia: 240 comparações de texto e alternativas ficaram completas com o extrator utilizado; 118 desses registros estavam pendentes. Os outros resultados exigem reconciliação da extração, especialmente comandos, cabeçalhos, fórmulas e imagens, e não significam automaticamente divergência com a prova. As 59 questões publicadas pertencem ao subconjunto com enunciado, cinco alternativas e letra definitiva correspondentes, além da conferência jurídica individual. Os 385 gabaritos registrados correspondem às letras dos respectivos definitivos recuperados.

Foram consultados novamente CF, CP, CPP, LINDB, CC, Lei 9.784/1999, prisão temporária, Lei 12.830/2013 e Lei 13.848/2019 no Planalto. Os comentários distinguem, entre outros pontos, flagrante ilegal de eventual novo título preventivo; ausência de vínculo subjetivo na autoria colateral; os requisitos da embriaguez fortuita; promessa de cura infalível; exceção da escusa familiar para vítima de 60 anos ou mais; a capacidade da pessoa de testemunhar e o regime específico de compromisso; e proibição de transformar regra federal de agência reguladora em aplicação automática de todos os detalhes a entes locais.

A referência de autotutela foi acompanhada do devido processo, conforme a fonte institucional do STF sobre o RE 594.296, sem apresentar a Súmula 473 como autorização irrestrita para retirar vantagens. A fonte da Lei 13.848/2019 estava `em_revisao`; a primeira validação bloqueou a publicação. Após conferência expressa do art. 3º e captura oficial com hash, sua vigência foi registrada pelo fluxo próprio, preservando metadados e notas anteriores. A vigência da fonte não certifica revisão editorial de todos os dispositivos ou comentários.

As salvaguardas foram reforçadas: catálogo da API só é aceito com captura e hash, mesmo evento e nome exato do PDF; `--dry-run` de questões pendentes agora consulta o banco e os vínculos sem escrever; transição de fonte em revisão exige captura e compara todos os campos anteriores na gravação. **71 testes passaram**, sem falhas ou ignorados. Não houve alteração de aplicação neste lote e não foi executado build para as mudanças de scripts/dados.

A leitura posterior confirmou **59 itens ativos e elegíveis**, com os **outros 2.909 registros de Polícia Civil preservados**, sem desaparecimentos ou alterações concorrentes. Foram conferidos também as quatro edições, as nove fontes criadas, a transição de uma fonte e os 17 tópicos, sem alterações nos demais metadados comparados.

Restam **175 questões `under_review`**: RO 97, PE 39, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas. O conjunto atual da PCDF permanece concluído com 111 itens. Essa redução não significa auditoria completa das demais provas ativas.

## Fontes estaduais e acesso

Os portais legislativos necessários a algumas questões estaduais não estão liberados na rede atual. A chamada ao SAPL/RO teve erro de proxy `CONNECT 403`. Um rascunho aditivo preservou os 42 domínios existentes e acrescentou 13 destinos de fontes estaduais, Senado, IBGE e STF. É necessário revisar/aplicar e publicar a configuração do ambiente; salvar o rascunho não aplica a liberação em execução. A tarefa prossegue com as fontes disponíveis, sem substituir norma estadual por lei federal apenas para liberar questões.

Snapshots, PDFs, capturas e pacotes completos permanecem em `outputs/pc-pending-review-2026-10-16/`, fora do Git. O relatório JSON versiona comentários, escopo e hashes, sem credenciais.

## Continuação — mais dez questões publicadas

Foram conferidas visualmente e publicadas outras dez questões: delegado 15, 33 e 95; agente 66, 71, 75 e 85; escrivão 75, 82 e 85. Os falsos sinais de divergência do extrator foram confrontados com as páginas oficiais, sem alterar enunciados, alternativas ou letras definitivas. Cada item recebeu comentário, exemplo e exercício respondido, com referência normativa atual.

A questão 71 de agente distingue expressamente o feminicídio como qualificadora histórica de 2022 e como crime autônomo atual do art. 121-A, com a mudança da Lei 14.994/2024 e vedação de retroatividade mais gravosa. A causa de aumento relativa ao pós-parto não foi confundida com presença de descendente. Os demais comentários abordam limites do estado de defesa, erro de proibição inevitável, bens inconsumíveis, suspensão de direitos políticos, ingresso domiciliar, embriaguez culposa, identificação civil na preventiva, elegibilidade militar e legalidade estrita na autoacusação falsa de contravenção.

Os dois pacotes passaram por pré-validação integral no banco sem escrita e publicação com comparação de todos os campos anteriores. O snapshot posterior confirmou os dez ativos e elegíveis e a preservação dos outros 2.958 registros de Polícia Civil, sem alterações nos metadados. Não houve mudanças de aplicação nem necessidade de build adicional.

**Resultado acumulado desta etapa: 69 questões de RO publicadas; pendências de Polícia Civil reduzidas de 234 para 165.** Restam RO 87, PE 39, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas. O conjunto tem 2.968 registros físicos: 2.550 ativos (2.120 elegíveis pelo filtro atual da aplicação), 165 em revisão, 210 arquivados, seis obsoletos e 37 anulados. Ativo não significa integralmente auditado nesta campanha.
