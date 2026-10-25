# PC-AC 2017 — segundo lote e 50 decisões concluídas

Conferência final em 15/10/2026, 23:10 de Brasília (16/10, 02:10 UTC). O primeiro lote foi enviado à main no commit `b4120c1`.

## Publicação efetiva

O segundo lote liberou **15 questões**: 31, 33–35, 37, 46, 49, 53, 54, 56, 57, 60, 63, 64 e 66. Cada uma recebeu explicação individual, resposta comentada e exemplo, com vínculo a conteúdo pertinente do edital oficial PCDF Delegado 2026. A identificação de origem permanece PC-AC 2017, Agente, IBADE, versão V.

Nos dois lotes, foram concluídas **50 decisões: 47 ativas, uma arquivada como histórica e duas obsoletas**. Também foram recuperados **69 textos completos**. Essas grandezas se sobrepõem: recuperar texto não equivale a aprovar editorialmente o item.

A revisão destaca a diferença entre conexão e continência, ação privada e subsidiária, oferecimento e recebimento da denúncia, restrições à interceptação, limites da infiltração e condições da colaboração na lavagem. A explicação de Maria da Penha inclui o MI 7452: não exclui casais homoafetivos masculinos em situação de subordinação nem travestis e mulheres transexuais nos termos do julgamento; não cria crimes por analogia. A lesão corporal em violência doméstica contra mulher permanece identificada como ação pública incondicionada, conforme a ADI 4424. O art. 16 é tratado somente em seu âmbito próprio de ações condicionadas.

## Vínculo ao edital

O PDF oficial PCDF 2026 foi obtido e seu programa confrontado nas páginas 80 e 83. Foram acrescentados dois tópicos ausentes: organização dos poderes/processo legislativo/CPI e ação penal/competência/conexão/continência. Não houve substituição ou expansão silenciosa dos tópicos existentes. Todos os registros anteriores foram comparados e permaneceram iguais; a inserção protege o par disciplina/ordem contra concorrência e faz leitura de confirmação.

A matriz também permitiu cotejar crimes contra a família e dignidade sexual e legislação especial. Isso não afirma que o edital PF 2025 cobrava todo esse conteúdo, nem que existe novo edital PC-AC correspondente.

O Planalto permaneceu indisponível nas novas tentativas (503); usaram-se as capturas oficiais bem-sucedidas de 15/10 desta sessão, com seus hashes e datas originais. A Lei Maria da Penha estava em UTF-16 com BOM e foi corretamente decodificada antes do cotejo. Os textos modificadores históricos não foram tratados como redação atual do CP. As matérias específicas do STF foram consultadas novamente; o resumo jornalístico geral não substituiu o exame dos dispositivos e dos julgamentos pertinentes.

## Validação e preservação

- **191 testes passaram**, sem falhas ou testes ignorados.
- O autor do primeiro lote foi reproduzido com a versão ampliada da ferramenta: as 35 decisões anteriores permaneceram equivalentes, exceto a data gerada para o ensaio, sem nova publicação.
- A leitura final dos **158 registros da prova** correspondeu integralmente aos patches esperados dos dois lotes. Gabaritos e extrações originais foram preservados; os 79 aliases arquivados e os dez itens de Português fora do escopo permaneceram iguais.
- O parser da aplicação reconheceu as cinco alternativas de todos os 69 textos; o filtro real do treinador considerou elegíveis os 47 itens liberados.
- Não houve mudança de aplicação, novo build ou alteração das unidades da biblioteca de leis. PDFs, OCR, snapshots e pacotes completos ficaram nos outputs ignorados; não foram gravadas credenciais no Git.

## O que ainda falta

Restam **29 itens da PC-AC 2017**:

- **1–10:** tratamento do texto de apoio completo.
- **13, 25, 39, 42, 44, 45, 48, 69 e 70:** revisão técnica/jurídica, ambiguidades das alternativas ou conclusão do cadastro de fonte e vínculo específico. Não foram declarados obsoletos nem aprovados por inferência.
- **71–80:** validação médico-legal contemporânea, incluindo o cuidado de não ensinar ruptura do hímen como prova necessária de conjunção carnal, nem confundir barotrauma com doença descompressiva. Permanecem bloqueados.

A contagem global final é de **7.768 registros**, sendo **6.349 ativos**, **1.201 em revisão**, **149 arquivados**, **32 obsoletos** e **37 anulados**. Inclui 34 questões pessoais; não garante unicidade entre origens nem elegibilidade de todo registro marcado ativo. A fila recebeu 300 registros de bancas durante o trabalho, em operações independentes desta revisão. O balanço é **951 − 50 + 300 = 1.201** pendências. Esta execução não escreveu nas outras três tabelas de questões.

Inventário final: `docs/question-review-current-2026-10-15.json`. Escopo, pendências individualizadas, tópicos e hashes: `docs/question-review-pcac-v-batch2-2026-10-15.json`. O checkpoint anterior permanece registrado no relatório do primeiro lote; seus números referem-se àquele instante.
