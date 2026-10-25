# Lote 03 — outras áreas e duas recuperações visuais

## Aplicado no Supabase

**171 candidatos inseridos e relidos**, todos `under_review`, sem criação ou alteração de questões nos catálogos públicos:

| Origem | Candidatos novos |
| --- | ---: |
| IFPB 2019 — Assistente em Administração | 50 |
| IFPB 2019 — Nutricionista | 50 |
| AL-CE 2026 — Pesquisa Histórica e Sociocultural, Tipo A | 69 |
| PMSC 2026 — questão 13, fórmula recuperada | 1 |
| CBMMG 2026 — questão 10, matriz recuperada | 1 |

São três fontes privadas novas. As duas recuperações usam os cadernos já preservados no lote 02, sem duplicar as fontes. A questão 52 de História estava anulada no gabarito e foi excluída.

## Origem dos arquivos e respostas

Cadernos e documentos de resposta foram obtidos por links públicos de espelho do Qconcursos, depois de conferir as páginas de catálogo, assinatura PDF e integridade por `pdfinfo`. URLs, hashes e sucessos/falhas estão nos arquivos `*-evidence.json`. Não foram usados comentários ou respostas de usuários do site.

O gabarito de referência dos dois cargos do IFPB é o mesmo PDF multicargos cujo cabeçalho diz **GABARITO OFICIAL DEFINITIVO**, aplicação em 19/05/2019; as seções de Assistente em Administração e Nutricionista foram extraídas separadamente e conferidas em 50 posições cada. O PDF preliminar vinculado à página de Nutricionista foi superado para este lote pelo documento definitivo multicargos, encontrado no material de Assistente em Administração. Não apresentar o preliminar como definitivo.

Para AL-CE foi selecionada exclusivamente a seção **01125 — Pesquisa Histórica e Sociocultural — PROVA TIPO A**, com 70 posições. Não confundir os cargos/tipos reunidos no mesmo arquivo. A resposta X do item 52 foi respeitada.

Esses PDFs têm rótulo definitivo, mas foram obtidos em espelho; a conferência no canal primário e eventuais retificações permanece como bloqueio explícito. Os candidatos usam `answer_in_reference_document` e `answer_key_requires_clarification=true`. Nenhum desses documentos equivale a certificação pedagógica ou jurídica atual.

Páginas de Administrador e Pedagogo IFPB foram localizadas, mas seus arquivos responderam AccessDenied e não foram importados. Um outro espelho apresentou verificação humana: ela não foi contornada. O caderno de Engenharia Civil SEAD-PI e seu gabarito preliminar foram baixados e ficaram fora desta extração, para análise em lote posterior.

## Recuperações visuais

- **PMSC 13:** opções lógicas recuperadas da página 5. A negação tipográfica ∼ foi transcrita como ¬ para acessibilidade, preservando a estrutura de todas as alternativas. A equivalência `(P → Q) ↔ (¬P ∨ Q)` é a única tautologia entre as alternativas: quatro combinações P/Q conferidas, resposta C.
- **CBMMG 10:** matriz da página 4 recuperada como `[[1,-2,3],[2,-1,4],[3,1,2]]`. Determinante calculado em −7, confirmando C. A transcrição registra as linhas da matriz explicitamente.

A inspeção visual e a conferência matemática estão documentadas; as duas questões continuam privadas porque tópico de edital e aprovação pedagógica/publicação não foram concluídos. A recuperação não autoriza ativação automática.

## Deduplicação e extração

A comparação usou os três catálogos públicos e o acervo privado, considerando também estados não ativos, texto normalizado e conjunto de alternativas (ignorando a ordem das letras). Foram preservados acentos, números e símbolos. Correspondências exatas ou próximas seriam retidas; não foram encontradas nos 171 itens selecionados. A numeração dos três novos cadernos foi conferida em 50, 50 e 70 posições, respectivamente. O relatório separa uma anulação.

Antes da escrita, as tabelas públicas e fontes foram relidas; uma falha temporária no acervo privado exigiu nova leitura paginada, com projeção menor de campos, concluída em **5.201 candidatos privados**. Essas quantidades são linhas usadas na comparação, não totais globais de questões disponíveis. A rotina faz ainda checagem de identidade no catálogo principal antes de inserir.

A comparação é uma fotografia do acervo e não uma garantia semântica absoluta contra outras escritas posteriores. Antes de publicar, refazer a deduplicação. As inserções usam IDs estáveis por hash do PDF e posição, com `ignore-duplicates`; textos/revisões existentes não são sobrescritos. Operações REST são por tabela/lote, não uma transação global.

Cabeçalhos e marcas de paginação/espelho foram excluídos da extração textual, sem alterar os bytes dos PDFs usados no hash. Textos de apoio, imagens, contexto e especialidades permanecem sujeitos a revisão visual. Os cadernos completos foram preservados como fontes privadas; extração com alternativas textuais não comprova contexto completo.

## Bloqueios de publicação

Todos os candidatos têm `publication_approved=false`, sem payload de publicação. Nenhuma questão foi ativada.

- Normas e referências de 2019 precisam de vigência/aplicação temporal conferidas em fonte oficial, além de vínculo a edital atual.
- Itens de Nutrição especializada têm revisão clínica/nutricional atual pendente, com fontes oficiais de saúde/CFN antes do uso didático.
- História/patrimônio, legislação e referências jornalísticas precisam de revisão específica; não presumir atualização somente pelo ano do caderno.
- Explicação didática, exemplo, tópico de edital e aprovação individual ainda são necessários.

## Evidência e reprodução

`importacao-confirmada.json` registra os 171 IDs inseridos e relidos. `verificacao.json` confirma os estados retornados. Os arquivos `*-corpus.json` contêm exatamente os candidatos do lote e fontes; `relatorio-deduplicacao.json` separa destinos e exclusões. Credenciais foram usadas somente em memória e não foram gravadas nestes arquivos.

O gerador `scripts/idecan/build-other-areas-corpus.py WORK_DIRECTORY LIVE_SNAPSHOT_DIRECTORY` lê PDFs/textos de gabaritos e snapshots educacionais fora do Git. O importador existente `stage-missing-private-items.py` fez a inserção exclusiva em `question_corpus_sources`/`question_corpus_candidates`; nenhum SQL de mutação ficou pendente para execução manual.

Arquivos baixados e imagens de recuperação: `/workspace/idecan-downloads/lote03-outras-areas`; ZIP `/workspace/idecan-downloads/outras-areas-lote03.zip`. Não incluir os PDFs binários no diretório público do site.
