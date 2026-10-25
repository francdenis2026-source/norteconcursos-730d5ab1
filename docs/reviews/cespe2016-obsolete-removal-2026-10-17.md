# Remoção dos obsoletos da apostila CESPE 2016

Por autorização expressa do usuário, foram excluídos exatamente os 30 candidatos privados classificados individualmente como obsoletos nesta apostila: dois da importação inicial e 28 dos lotes 01–03. Nenhuma tabela pública de questões foi modificada.

O manifesto identifica os registros e as decisões anteriores. O relatório aplicado confirma a exclusão de cada candidato e de seus registros dependentes de revisão, com leitura posterior. Antes das exclusões, todos os registros completos e seus históricos foram exportados para `/workspace/cespe7000-audit/removed-obsolete-backup-2026-10-17.json`, fora do repositório, com permissão 0600. Essa cópia está no ambiente de trabalho; não constitui backup remoto permanente. Os comentários e fundamentos das decisões dos lotes continuam nos pacotes versionados. O PDF-fonte foi preservado.

O aplicador limita o escopo a até 100 IDs explícitos da mesma fonte, exige status obsoleto e histórico individual, rejeita candidatos com publicação e compara o estado antes de excluir. A API REST não oferece transação entre as duas tabelas: o histórico dependente é excluído primeiro; se a exclusão do candidato falhar, o aplicador tenta restaurar esse histórico. A cópia externa permite recuperação após interrupção. Nesta execução, todas as 30 exclusões e leituras posteriores terminaram com sucesso. Três testes verificam backup antes da escrita, bloqueio de outro status e restauração diante de falha simulada.

Após esta remoção, os totais derivados das operações confirmadas desta fonte são 3.022 pendentes de primeira revisão, 180 revisados ainda retidos e uma duplicata: 3.203 candidatos mantidos no banco. A auditoria editorial completa continua pendente.
