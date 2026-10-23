# Revisão cuidadosa IDECAN — fontes oficiais e aplicação delimitada

Esta etapa começou com **337 posições aguardando liberação**: 145 `under_review` no catálogo e 192 pareceres privados da PC-CE ainda retidos. Não equivale à conclusão de toda a revisão IDECAN. O inventário inicial está preservado em `inventario-pendente.json`; a contagem posterior está em `contagem-final.json`.

## O que efetivamente foi aplicado

- **10 questões de Língua Portuguesa da PC-CE 2021, Escrivão Tipo B, itens 1–10:** publicadas no catálogo, com gabarito definitivo reconferido, texto de apoio integral de 26 linhas, identificação acessível dos termos sublinhados, explicação, erro comum e exemplo. A matriz temática é o edital PF 2025 efetivamente conferido. O texto jornalístico é histórico: suas hipóteses científicas não são apresentadas como descobertas atuais. `portugues-publicado.json` registra as dez leituras de confirmação.
- **3 questões jurídicas sobre uso da força:** PC-SC Agente Tipo B itens 31 e 34 e Escrivão Tipo A item 34. Dispositivos da Lei 13.060/2014 e do Decreto 12.341/2024 foram cotejados no Planalto; o tópico real de edital foi confirmado, assim como texto e gabarito. São explicações aprovadas, com fontes, data da conferência e exemplo. A vinculação temática à PF 2025 não prevê o futuro edital PC-AC. `uso-forca-publicado.json` registra a aplicação.
- **PMSC Tipo A item 49:** passou de `under_review` para `obsolete`. A resposta histórica faz referência à dispensa antes prevista no §6º do art. 147 do CTB. Os §§6º e 7º foram revogados pelo art. 2º da Lei 15.428/2026, com vigência na publicação, em 05/06/2026, conforme o art. 3º. O gabarito da prova foi preservado. Não tratar a exceção revogada como norma atual.
- **Quatro itens continuaram retidos com comentários/fontes corrigidos:** PC-SC Agente Tipo B item 25 (ressalva ambígua sobre culpa na LIA); PC-SC Escrivão Tipo A itens 23 (veto parcial com enumeração sem inciso), 25 (benefício isolado e redação anterior do art. 3º da LIA) e 33 (referência ao art. 5º do Decreto 12.341/2024 para tema que exige confronto com o art. 7º). Não foram declarados oficialmente anulados e seus gabaritos não foram modificados.

Os cinco últimos ajustes e as três liberações jurídicas têm comparação do registro anterior, filtro de atualização que protege revisões concorrentes, backup de progresso e auditoria antes/depois na tabela existente `idecan_pedagogical_review_audit`. Aplicações REST são **por registro**, sem alegação de transação global. Interrupção entre atualização e auditoria pode ser retomada pelo relatório privado sem aplicar de novo a alteração. O lote de português usa a RPC de refinamento auditado do acervo e inserções públicas idempotentes, com confirmação de cada registro.

Os números desta pasta são o **recorte IDECAN**, não os totais globais da plataforma. Não substituem a RPC `get_public_question_summary`. A revisão integral continua pendente; não interpretar estes lotes como aprovação dos demais itens.

## Correção de transcrição PMSC — informática, itens 20–22

Conferência dos registros administrativos exportados em 23/10/2026 contra a página 7 do caderno Tipo A confirmou contaminações na importação: item 20, alternativa D; item 21, final do enunciado e alternativas A/B; item 22, todas as alternativas. O gabarito definitivo publicado pela IDECAN foi conferido separadamente: 20-E, 21-D e 22-B. Os hashes, excertos e estado exportado estão em `revisao-integral/revisao-pmsc-informatica.json`.

`revisao-integral/pmsc-informatica-correcao.sql` restaura o texto comprovado, inclui explicações e grava os dados anteriores e posteriores na auditoria. O lote mantém os três registros em `under_review`: não há aprovação de tópico de edital vigente. O SQL ainda precisa ser aplicado no Supabase; sua execução aborta se os campos conferidos, fontes ou gabaritos divergirem do retrato usado na revisão.

## Pareceres e evidências

`pareceres-juridicos-legado.json` contém **101 pareceres individuais iniciais**, com explicação, erro comum, exemplo, referências e impedimentos específicos. Esse arquivo de etapa inicial **não aprova os 101 para publicação**. O parecer preliminar é superado somente nos itens e campos expressamente documentados nos relatórios de aplicação acima. As outras decisões ainda dependem de contexto, gabarito, pertinência a edital, doutrina ou jurisprudência, conforme o caso.

`fontes-primarias.json` registra downloads, datas, SHA-256 e tratamento de codificação. `excertos-juridicos.json` arquiva os dispositivos selecionados. Foram consultados Planalto, ALESC e ONU/OHCHR, conforme a norma. Dispositivos riscados/revogados são excluídos do texto extraído; referências inline não podem substituir o cabeçalho do artigo. Artigos repetidos em partes diferentes, como Constituição/ADCT, permanecem separados para seleção contextual, sem fusão automática.

Um retorno HTTP 200 não certifica atualização ou aplicação de uma norma. A Lei Maria da Penha foi servida em UTF-16 com 1.559 bytes ASCII de espaço depois do fechamento do HTML; a normalização foi registrada, mantendo o hash dos bytes originais. Os testes impedem tratar texto truncado ou com NUL como dispositivo válido. A fonte do STF que retornou 404 é mantida como falha, nunca como evidência positiva. O PDF oficial de súmulas do STJ foi obtido e os excertos específicos arquivados; isso não substitui conferir eventuais julgamentos posteriores relevantes.

## Pendências que não podem desaparecer por importação

- O gabarito de Inspetor PC-CE contém cabeçalho preliminar em arquivo listado como definitivo. A dúvida não foi apagada.
- Conteúdo jurídico histórico precisa de vigência e aplicação temporal verificadas, não apenas de um link atual. Questões com fato datado podem exigir a redação anterior e comparação de leis.
- Parecer, fonte localizada e questão ativa são estados diferentes. Não remover bloqueios em lote nem alterar gabaritos históricos para fazer uma alternativa parecer correta.
- Há ainda questões já ativas sem explicação no catálogo antigo, além da fila de liberação. A contagem `active_board_without_explanation` permanece explícita no relatório: estar ativa não comprova revisão pedagógica completa.
- Não somar as dez publicações do acervo como dez questões históricas inéditas: são representações públicas de posições já incluídas no acervo de 473.

## Reprodução e continuação

Os scripts `publish-reviewed-portuguese.py`, `apply-retained-legal-corrections.py` e `publish-use-of-force.py` têm escopos delimitados; credenciais entram somente pelo processo e não ficam no repositório. Os relatórios completos de recuperação, com antes/depois, ficaram fora do Git; resumos sem credenciais estão nesta pasta. Não regenerar uma expectativa antiga para sobrescrever uma revisão atual: recarregar e conferir primeiro.

O lote de uso da força recusa nova execução com conferência antiga: revalidar as fontes antes de qualquer nova publicação. As aplicações existentes estão registradas nos relatórios e na auditoria do banco.

Validação desta etapa: testes do publicador (idempotência, revisão concorrente, fonte/tópico e contexto), retomada da auditoria, extração de fontes, regra de vigência, proteção de gabaritos e filtro real de elegibilidade das três questões jurídicas. A aprovação de um lote não certifica todos os itens da banca.
