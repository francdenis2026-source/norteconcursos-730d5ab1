# Reexecução da fila e dos lotes — 30/09/2026

Os quatro SQLs abaixo foram reexecutados, em ordem, no projeto Supabase configurado para a plataforma:

1. 20261001010000_drive_constitucional_lote01_under_review.sql
2. 20261001020000_drive_administrative_review_queue.sql
3. 20261001030000_drive_constitucional_lote02_under_review.sql
4. 20261001040000_link_drive_review_to_catalog.sql

A execução foi realizada pela API administrativa do Supabase. Ela executa os SQLs, mas não registra versões na tabela de histórico do Supabase CLI. Um futuro db push pode reaplicá-los; os lotes e a fila preservam os registros já existentes.

O dry-run validou as 138 fontes e os 37.597 fragmentos locais. A execução real do importador confirmou os mesmos IDs e a integridade de todos os textos já gravados. Foram inseridos zero registros novos. As 48 questões dos dois lotes permanecem em revisão.

A comparação dos estados anterior e posterior confirmou que os dados das fontes, os conteúdos e status de todos os fragmentos e os 48 registros do catálogo permaneceram idênticos. Nenhuma revisão foi sobrescrita e nenhuma questão deste lote ficou ativa.

O importador agora verifica o acervo existente antes dos envios. Quando contagens, IDs e textos coincidem, termina com confirmação de leitura e relatório, preservando revisões e evitando reenvio de documentos grandes. O teste adicional rejeita acervo incompleto, IDs ou textos divergentes e fragmentos com publicação indevida. Os 13 testes passaram.

As evidências, incluindo os estados anterior e posterior, o recibo dos SQLs, o dry-run e o relatório do importador, estão em outputs/coleta-questoes no workspace local. O Git contém código, testes e este registro; as credenciais e o acervo privado permanecem fora do repositório.

A revisão integral e a conferência visual dos PDFs continuam pendentes, conforme drive-review-status-2026-09-30.md. Esta reexecução valida a importação e sua preservação; não certifica os fragmentos como questões prontas para alunos.
