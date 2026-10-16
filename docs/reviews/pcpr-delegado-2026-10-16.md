# PC-PR/2026 — revisão das quatro pendências de Delegado

Conferência e publicação em 16/10/2026. Escopo: questões 14, 29, 51 e 60 do caderno Tipo 1. Não certifica a revisão integral das 300 questões dos três cargos.

A página oficial da FGV consultada apresenta o **gabarito preliminar**, publicado para a prova de 11/10/2026. Não foi localizado nela um gabarito definitivo. Letras, enunciados, alternativas, fontes, figuras e vínculos ao edital foram preservados.

| Questão | Decisão editorial | Fundamento e limite |
| --- | --- | --- |
| 14 | Arquivada; letra preliminar A preservada | A simulação de negócio e dissimulação da origem não pode ser ensinada como mero exaurimento impunível. A leitura jurídica é compatível com C; não se trocou a resposta oficial. Reabrir após retificação/esclarecimento e conferência do definitivo. |
| 29 | Ativa; letra preliminar E | Motivo pessoal sem nexo funcional; Júri no lugar da consumação. O precedente de 2025 do STF mantém o requisito funcional. A SV 45 não foi usada para afastar indistintamente foro constitucional federal. |
| 51 | Arquivada; letra preliminar E preservada | Omissão da data do crime, diante da alteração do art. 112, § 1º, da LEP. Súmula 439 e notícia de repercussão geral do Tema 1408 não autorizam universalizar o regime anterior nem antecipar decisão de mérito. |
| 60 | Ativa; letra preliminar D | Distinção entre reação cautelar, desobediência e dolo específico do dano; comentário diferencia cautelar por receptação de execução penal e tipos especiais de medidas protetivas. Precedentes gerais não foram apresentados como julgamento idêntico sobre a tornozeleira desta questão. |

Os quatro itens receberam comentários pedagógicos, exemplos contrastantes, exercício de fixação e ressalva explícita sobre o gabarito preliminar. O arquivamento é uma quarentena editorial: **não significa anulação pela FGV** nem que os dois impedimentos estejam resolvidos.

Após a publicação, os três cargos somam **298 registros ativos, dois arquivados editorialmente e nenhum `under_review`**: Agente 100 ativos; Papiloscopista 100 ativos; Delegado 98 ativos e dois arquivados. Ainda há **dois itens bloqueados que exigem acompanhamento**, embora tenham recebido uma decisão editorial e saído da fila `under_review`.

A leitura após gravação confirmou os quatro patches completos e a preservação integral dos outros **296 registros**. As duas liberações passam pela função efetiva de elegibilidade; os dois arquivados são rejeitados. Não houve inclusão ou exclusão de questões, alteração do gabarito, criação de fonte ou modificação de edital/tópico.

Foi necessário corrigir o importador para comparar `board_exam_questions.figure_urls`, coluna PostgreSQL `text[]`, usando sintaxe de array do PostgreSQL em vez de JSON. O predicado continua incluindo todos os campos anteriores. Testes cobrem escape de URLs, separação entre JSONB e array SQL e rejeição de atualização concorrente de imagem. A primeira tentativa foi rejeitada antes de qualquer gravação.

Validação: **64 testes aprovados, zero falhas e zero ignorados**, nas suítes de revisão e formato/texto/acervo. Não houve alteração da aplicação; build não foi executado neste lote. Capturas oficiais, PDFs, snapshots e pacotes completos permanecem em `outputs/pcpr-review-2026-10-16/`, ignorado pelo Git. O inventário JSON versionado registra explicações publicadas, decisões, URLs e hashes, sem credenciais.

Fontes principais: [FGV — página do concurso](https://conhecimento.fgv.br/concursos/pcpr26), [caderno Tipo 1](https://conhecimento.fgv.br/sites/default/files/concursos/cns101-delegado-de-policia-cns101-tipo-1.pdf), [gabarito preliminar](https://conhecimento.fgv.br/sites/default/files/concursos/pcpr2026-gabaritos-para-publicacao.pdf), textos compilados do Planalto (CF, CP, CPP, LEP e Lei 9.613/1998), [STF — foro após saída do cargo](https://noticias.stf.jus.br/postsnoticias/acoes-contra-autoridades-permanecem-no-stf-mesmo-apos-saida-do-cargo/), [STF — reconhecimento do Tema 1408 em 2025](https://noticias.stf.jus.br/postsnoticias/stf-vai-decidir-se-exigencia-de-exame-criminologico-para-progressao-de-regime-vale-para-crimes-anteriores/), Súmula 439/STJ, Informativo 856/STJ (HC 916.770/SC) e Jurisprudência em Teses/STJ, edição 87, tese 3. A referência histórica à desobediência em medidas protetivas foi expressamente diferenciada do regime posterior ao art. 24-A da Lei Maria da Penha.
