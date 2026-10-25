# Gabaritos IDECAN importados como fontes privadas para análise

## Resultado confirmado no Supabase

A pedido do usuário, foram conferidos os seis PDFs efetivamente baixados. Todos são **gabaritos**, não cadernos de questões. O texto foi extraído com `pdftotext -layout`, com conferência da assinatura PDF, SHA-256 do arquivo e número de páginas por `pdfinfo`.

Foram inseridos **cinco registros em `question_corpus_sources`**, totalizando **23 páginas**:

| Documento | Páginas |
| --- | ---: |
| PEFOCE 2021 — Gabarito definitivo — Tipo A | 7 |
| PEFOCE 2021 — Gabarito definitivo — Tipo B | 7 |
| PEFOCE 2021 — Gabarito definitivo — Tipo C | 7 |
| PEFOCE 2021 — Retificação do gabarito — Auxiliar de Perícia | 1 |
| PC-SC Escrivão 2026 — Gabarito oficial definitivo | 1 |

O sexto documento, gabarito PC-CE 2021 (três páginas), já estava referenciado pelo hash nos metadados do acervo privado existente. Foi **preservado sem inserir outro registro**. Sua divergência histórica de cabeçalho de Inspetor B não foi resolvida nem apagada.

`fontes-referencia.json` contém os seis documentos como dados de referência, com texto, URL oficial, hash e páginas. A presença de seis entradas no arquivo não equivale a seis inserções: o relatório `importacao-confirmada.json` distingue cinco inseridas e uma preservada. Os PDFs binários continuam fora do Git em `/workspace/idecan-downloads`.

## Proteções e verificação

- A análise consultou todas as fontes privadas e o cadastro de fontes existentes, com paginação, para comparar hashes, URLs e referências embutidas.
- Cada fonte nova recebeu como ID o SHA-256 do PDF, com inserção `on_conflict=id` e `resolution=ignore-duplicates`. Não houve atualização ou exclusão de registros.
- Os tipos de documento são `answer_key` e `answer_key_correction`, com `analysis_status=reference_only_pending_booklet`, `publication_approved=false` e zero questões extraídas/candidatos criados.
- O importador só permite POST em `question_corpus_sources`; não escreve nas tabelas de questões ou candidatos.
- Cada inserção foi relida e confirmada. São operações por documento, sem alegação de transação global.
- Consulta posterior confirmou os cinco registros e 23 páginas, **zero candidatos vinculados às cinco fontes**, e acesso anônimo negado (HTTP 401).
- Nova prévia reconheceu as seis referências como já existentes: zero novas inserções necessárias. Os quatro testes locais cobrem prévia sem mutação, idempotência, hash de gabarito embutido e rejeição de publicação indevida/lote repetido.

A credencial administrativa foi usada somente em memória para a API e não foi persistida nos arquivos. `verificacao-pos-importacao.json` contém apenas o resultado sanitizado da conferência.

## Não confundir documentos com questões

**Nenhuma questão foi extraída, duplicada, ativada ou alterada neste lote.** Gabaritos não têm os enunciados e alternativas necessários para produzir questões. Os registros existentes de alunos, provas e revisões foram preservados.

Os cadernos correspondentes ainda precisam ser obtidos. Na futura extração, comparar a identidade e o conteúdo integral dos itens contra catálogos públicos e candidatos privados atualizados; variantes de tipo e reordenação de alternativas não são questões inéditas. Preservar anuladas, retificações e pendências, e seguir `CONTENT_GOVERNANCE.md` antes de qualquer publicação.

## Reprodução

O importador `scripts/idecan/import-answer-key-sources.py` funciona em prévia por padrão e lê a credencial somente de stdin. `--apply` habilita exclusivamente a inserção das fontes privadas após a prévia, preservando registros já encontrados. Não executar como parte do startup do ambiente. A importação desta etapa já foi aplicada e confirmada; não há SQL de mutação pendente para o usuário executar.
