# Ativação administrativa IDECAN — 24/10/2026

A pedido explícito do responsável, 368 registros foram inseridos em `board_exam_questions` com estado `active`, com leitura posterior confirmada. Foram preservados 10 candidatos já publicados e 12 anulados, obsoletos ou rejeitados; nenhum foi duplicado ou reativado.

A revisão foi adiada, não concluída. Os candidatos privados e seus pareceres permaneceram intactos. Não foram inventados explicações, vínculo a edital, fontes jurídicas, aprovação editorial ou datas de verificação legislativa. O `verified_at` padrão do catálogo não certifica essa revisão; a pendência consta em `review_note` de cada registro.

366 inserções mantêm `needs_visual=true` para contexto/imagens/gabarito/revisão clínica pendentes; 201 destas também mantêm a revisão jurídica/normativa pendente, sem data de conferência. Apenas 2 novas inserções não têm esses bloqueios. A ativação administrativa não equivale à disponibilidade de todos os itens no treinador.

O RPC público retornou 9.462 cadastradas e 5.935 disponíveis após a operação. Seu incremento de 167 disponíveis diverge dos 2 novos registros sem bloqueios de contexto/jurídicos: requer conferência da versão instalada do RPC antes de usar o número como comprovação de elegibilidade. Não foi alterado o cálculo global nem removida proteção para ajustar contagem.

Operação direta pela API REST do banco, sem SQL ou migração. O resultado registra os IDs determinísticos, exclusões e confirmação do estado, permitindo localizar os registros para a revisão posterior.
