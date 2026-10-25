# Lote 02 — posições ausentes dos cadernos IDECAN

## Resultado aplicado e confirmado

Foram baixados quatro cadernos e conferidos os respectivos gabaritos definitivos: PC-SC Agente Tipo B, PC-SC Escrivão Tipo A, PMSC Aluno-Soldado Temporário Tipo A e CBMMG Cadete Tipo A, provas de 2026. Os cadernos vieram de espelhos identificados, com SHA-256 igual ao das fontes previamente verificadas; os gabaritos foram obtidos no portal oficial da IDECAN, respeitando a navegação a partir da página do concurso.

**19 candidatos novos foram inseridos em `question_corpus_candidates`, todos `under_review`, com três fontes privadas correspondentes. Não foram inseridas ou alteradas questões nos catálogos públicos.** Cada registro foi relido e confirmado. O relatório real está em `importacao-confirmada.json`; a verificação posterior confirmou 19 fingerprints distintos, ausência de payload de publicação, estado `under_review` em todos e acesso anônimo negado.

| Caderno | Itens importados para análise | Quantidade |
| --- | --- | ---: |
| PC-SC Agente B | 37, 38, 39, 61, 62, 63, 65 | 7 |
| PMSC Temporário A | 1, 3, 19, 23, 24, 25, 26, 27, 28, 30 | 10 |
| CBMMG Cadete A | 39, 40 | 2 |
| PC-SC Escrivão A | Nenhum; todos já cadastrados ou anulados | 0 |

As 300 posições impressas dos quatro cadernos foram separadas em:

- 273 posições já cadastradas, excluídas dos novos candidatos;
- seis anuladas, fora do lote: Agente B 60, PMSC A 5/42, CBMMG A 11, Escrivão A 24/96;
- duas retidas localmente para recuperação visual, **não importadas**: PMSC A 13 (símbolos/fórmula) e CBMMG A 10 (matriz ausente na extração textual);
- 19 candidatos privados ausentes na comparação realizada.

Esses números descrevem o lote, não os totais globais da plataforma. Não substituem a RPC de contagem pública e não devem ser somados às contagens públicas como novas questões disponíveis para treino.

## Comparação contra o acervo atual

Antes da escrita foi refeita a leitura administrativa paginada de 1.916 linhas de `board_exam_questions`, 2.045 de `curated_question_catalog`, 5.133 de `official_exam_questions` e 5.182 candidatos privados, além das fontes existentes. São linhas consultadas, não quantidades de questões distintas. Os snapshots completos ficaram apenas em `/tmp/idecan-next-collection/live`, fora do Git e sem credenciais.

A comparação considera todas as situações, não apenas ativos: identidade da prova/tipo/item, texto normalizado e alternativas como conjunto ordenado pelo conteúdo, para reconhecer permutações. Preserva números, acentos e símbolos matemáticos. Correspondências exatas e possíveis correspondências próximas são retidas, não promovidas a novas questões. No recorte selecionado, não foram encontradas correspondências adicionais de conteúdo além das posições excluídas por identidade.

A checagem é uma fotografia daquele instante e não uma garantia semântica absoluta contra futuras inserções por outros processos. O publicador deve refazer a comparação antes de publicar. O importador realiza também uma consulta final aos itens do mesmo concurso/caderno no catálogo principal antes de qualquer escrita; se aparecerem, exige atualizar a deduplicação.

## Qualidade da extração e pendências

- A numeração integral dos cadernos foi conferida (100/100/50/50) e o gabarito do tipo correspondente contém exatamente a quantidade prevista, sem duplicação de números.
- Foram removidos da segmentação títulos e textos da seção seguinte, evitando contaminar a última alternativa com o próximo texto de apoio. Isso foi verificado nos itens Agente 65 e CBMMG 40.
- Agente 61/62/63/65 são **Contabilidade**, conforme o cabeçalho da prova; não foram classificados como Tecnologia da Informação. Têm revisão normativa CFC pendente (`normative_review_required: accounting`), sem certificação de NBC/ITG vigente.
- Questões de legislação institucional de SC e MG continuam dependentes de confronto com o legislador oficial, vigência e aplicação temporal. Não transferir automaticamente normas estaduais para outra carreira/estado.
- Português 1/3 da PMSC exige conferir grifos e contexto do texto de apoio no PDF original. O texto integral do caderno foi preservado na fonte privada.
- Todos os candidatos mantêm revisão visual/contextual e mapeamento de edital pendentes. Não têm explicação didática aprovada, tópico de edital certificado ou publicação autorizada.
- Matrizes/fórmulas não recuperadas não foram completadas por suposição. As páginas para recuperação estão no pacote de download, fora do Git.

## Gravação e proteção de revisões

A escrita foi exclusivamente por inserções idempotentes em `question_corpus_sources` e `question_corpus_candidates`, com `resolution=ignore-duplicates`. Nenhum registro existente foi atualizado ou removido. Antes de escrever, o importador compara textos de fontes/candidatos existentes e interrompe se houver divergência. As chamadas são por tabela/caderno, não uma transação global. O relatório de progresso permite retomar sem sobrescrever revisões.

Uma nova prévia após a importação reconheceu os 19 candidatos existentes e não exigiu inserções. Os testes verificam essa idempotência, preservação de revisões posteriores, bloqueio de texto concorrente e questão que apareça no catálogo público antes da gravação, além da normalização de alternativas e da separação correta entre seções do PDF. Os três pacotes passaram também no `validateCorpus` existente.

Não houve geração de SQL de mutação pendente: a importação foi realizada e confirmada pela API. A credencial foi usada somente em memória e não foi salva nos arquivos.

## Arquivos e reprodução

- `*-corpus.json`: os três pacotes privados, com fontes, páginas, respostas do documento oficial e 19 candidatos.
- `relatorio-deduplicacao.json`: destinos das 300 posições e motivos das exclusões/retenções.
- `gabaritos-oficiais.json`: URLs e hashes dos gabaritos consultados.
- `importacao-confirmada.json` e `verificacao-pos-importacao.json`: resultados sanitizados do banco.
- PDFs e prévias visuais: `/workspace/idecan-downloads/lote02-cadernos`; pacote `/workspace/idecan-downloads/cadernos-e-gabaritos-lote02.zip` (fora do Git).

O gerador `scripts/idecan/build-missing-item-corpus.py WORK_DIRECTORY` usa PDFs e snapshots atuais guardados fora do repositório; não consulta ou escreve no banco. O importador `scripts/idecan/stage-missing-private-items.py DIRECTORY REPORT` faz prévia por padrão; `--apply` habilita somente a inserção privada. Credencial entra por stdin seguro no processo, nunca como argumento ou arquivo versionado. Não executar durante startup do app.

Próxima etapa editorial: revisar individualmente os 19 candidatos com fontes aplicáveis e contexto completo, completar explicações e exemplos, verificar o tópico real de edital e deduplicar novamente antes de autorizar publicação. As duas questões com imagem continuam fora do banco até recuperação.
