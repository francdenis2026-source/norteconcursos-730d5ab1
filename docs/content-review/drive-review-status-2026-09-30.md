# Revisão e importação do Drive — 30/09/2026

## Resultado confirmado no banco

| Trabalho                                                                  | Resultado |
| ------------------------------------------------------------------------- | --------: |
| Fontes PDF inventariadas e textos preservados na fila administrativa      |       138 |
| Fragmentos candidatos registrados na fila                                 |    37.597 |
| Questões cotejadas textualmente e inseridas no catálogo como under_review |        48 |
| Itens com revisão textual individual na fila, incluindo os excluídos      |        51 |
| Publicações para alunos realizadas nesta operação                         |         0 |
| Itens individuais ainda sem revisão textual                               |    37.546 |

A leitura independente confirmou enunciados, gabaritos, explicações e fundamentos dos 48 registros dos dois lotes. A conferência da fila confirmou os 37.597 IDs e a integridade dos textos das 138 fontes por checksum. Os documentos e fragmentos ficam em drive_question_import_documents e drive_question_import_candidates, com RLS e acesso limitado a administradores. Eles não alimentam as tabelas de treinamento dos alunos.

Os testes passaram: 12 testes de regressão e importação; PostgreSQL descartável verificou os lotes de 26 e 22 registros, reaplicação, preservação de revisão humana, bloqueio de duplicatas, edital inativo e restrição de acesso à fila. A API rejeitou um documento grande com HTTP 413; o envio foi retomado em partes, sem duplicar nem sobrescrever revisões. Todos os textos foram confirmados ao final.

## Duplicatas e alertas

A comparação normalizada encontrou 616 fragmentos com possíveis correspondências em outros registros e 47 correspondências com o próprio item já importado no catálogo. São sugestões para conferência: pontuação, comandos, contexto e diferenças de gabarito precisam de análise; nenhum registro existente foi excluído ou alterado por esse critério.

Dois itens de nacionalidade da coletânea constitucional, 107 e 108, foram marcados como obsoletos e excluídos do catálogo. Um item de informática ficou rejeitado por divergência entre gabarito e conceito; um item repetido foi separado como duplicata. Os demais alertas de atualização continuam como pendências, não como erros certificados.

Fontes oficiais consultadas para priorizar revisão:

- [Constituição compilada](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm): fundamento dos dois lotes constitucionais.
- [EC 131/2023](https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc131.htm): mudanças na perda da nacionalidade.
- [Lei 14.133/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm): revogação da Lei 8.666, com atenção às regras transitórias e contratos históricos.
- [Lei 14.967/2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm): novo estatuto e revogação da Lei 7.102.
- [Lei 14.230/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14230.htm): mudanças no regime de improbidade; cada item ainda exige análise de vigência e jurisprudência.
- [CPC 2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm): avaliar referências ao código anterior.
- [Microsoft](https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025): suporte regular do Windows 10 encerrado, com programas ESU que devem ser considerados no contexto da questão.

## Pendência que impede conclusão e publicação

**A revisão integral não foi concluída.** O conector permite ler texto, mas o download do PDF retornou HTTP 403. O navegador também mostrou acesso negado porque a conta conectada não tem permissão para o arquivo. Nenhum item foi certificado visualmente. É necessário disponibilizar os PDFs à conta do navegador ou restabelecer o download autenticado para conferir páginas, figuras, textos-base e gabaritos.

Após resolver esse acesso, ainda é necessário revisar individualmente os 37.546 fragmentos restantes, confrontar o gabarito e a legislação/jurisprudência, consolidar duplicatas e verificar o edital de destino. Parte desses fragmentos pode ser comentário ou tópico, e não uma questão completa. Não há liberação automática baseada em extração ou palavra-chave.

## Reexecução técnica

Aplicar as migrações da fila e dos lotes na ordem versionada. O importador scripts/import-drive-review.mjs recebe a pasta de coleta e o caminho de relatório: node scripts/import-drive-review.mjs PASTA_COLETA RELATORIO_JSON. Definir TASK_SUPABASE_PAT e TASK_SUPABASE_PROJECT no ambiente da sessão; nenhuma credencial é gravada no código. Use --dry-run como terceiro argumento para validar arquivos sem acessar o banco. Reexecuções preservam registros e revisões existentes.

O acervo extraído e as evidências de leitura ficam nos outputs locais, não no Git. O commit inclui a estrutura, os lotes, o importador, os testes e este relatório, sem tokens ou PDFs privados.
