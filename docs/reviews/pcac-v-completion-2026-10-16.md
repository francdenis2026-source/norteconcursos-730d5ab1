# PC-AC 2017 S01-V — conclusão das pendências registradas

As cinco questões pendentes **2, 6, 7, 8 e 10** foram recuperadas, revisadas e publicadas no Supabase após o usuário anexar os PDFs da prova e do gabarito. **Não restam pendências registradas neste caderno.**

| Questão | Gabarito preservado | Explicação publicada |
| --- | --- | --- |
| 2 | A | Interação com o leitor pela primeira pessoa do plural, com análise contextual. |
| 6 | D | Haver impessoal com sentido de existir; distinção de tempo decorrido e concordância na passiva sintética. |
| 7 | C | Relação comparativa no recorte do gabarito; travessões não possuem valor comparativo fixo em todo contexto. |
| 8 | A | Reescrita, pronome relativo e preservação das relações de sentido, sem ensinar equivalência universal de conectores. |
| 10 | D | Diferença entre regras de acentuação, crase na alteração proposta e referência anafórica. |

Cada comentário contém exemplo, variação e orientação de fixação. As alternativas e os gabaritos não foram substituídos por versões inventadas. Os fragmentos necessários constam nos próprios itens; não foi necessário criar outro material ou duplicar a crônica integral.

## Arquivos fornecidos e confronto

Os arquivos anexados pelo usuário são idênticos aos documentos oficiais registrados:

- `V-4.pdf`: SHA-256 `6fc3d1720f125c353d99e08541c67e3baddaaf8de9ac3051a0ca271c1d4cfb69`.
- `Gabarito-da-Prova-Objetiva-IBADE-PCACRE.pdf`: SHA-256 `a0d364982268671c13071145da7445923139e8183386eaff8c1999b56d695697`.

A página 2 do gabarito identifica **S01 — Agente de Polícia Civil, versão V, aplicada em 7/5/2017**, e confirma as cinco letras. Os itens foram cotejados com as páginas 3 e 4 do caderno. Foram corrigidas separações de palavras e leituras de rótulos/algarismos romanos decorrentes do OCR, mantendo o conteúdo original. As cópias e os pacotes com texto integral ficam em outputs privados, fora do Git.

O vínculo atual usa os tópicos já cadastrados de Língua Portuguesa na matriz oficial PF Agente 2025: interpretação/coesão, morfossintaxe e reescrita. Isso não transforma a prova histórica PC-AC em prova PF nem modifica sua identidade.

## Publicação e verificação

A recuperação do contexto foi executada separadamente da decisão de ativação. O fluxo reutilizou `repair-question-context.mjs`, `build-pcac-2017-v-review.py` e `publish-question-review.mjs`, com simulação, preflight no banco, comparação de todos os campos originais e leitura após gravação.

- **202 testes passaram; zero falhas e zero ignorados.**
- **158 registros PC-AC comparados antes e depois**; somente os cinco alvos mudaram, com **153 registros fora do lote preservados**, incluindo aliases arquivados.
- Gabaritos, extração bruta e fontes originais preservados.
- As cinco ativações passaram pela regra real de elegibilidade. A conferência ampliada encontrou **72 registros canônicos elegíveis**, sem placeholder ou bloqueio de contexto no conjunto canônico.
- Não houve alteração de aplicação ou unidade da biblioteca de leis; build não foi necessário.
- Nenhuma fonte, edição ou tópico foi criado ou alterado por este lote. As 378 fontes, 56 edições e 709 tópicos anteriores permaneceram intactos; foi observada uma nova fonte externa.

## Estado do caderno

| Situação | Quantidade |
| --- | ---: |
| Ativas após revisão, elegíveis para treino | 72 |
| Arquivadas como históricas | 4 |
| Obsoletas | 3 |
| Pendentes de revisão/contexto | 0 |
| Anulada no gabarito oficial, questão 26 | 1 |
| **Total da prova** | **80** |

O conjunto canônico possui 79 registros; a questão 26 anulada no gabarito não integra esse conjunto. Há também 79 aliases arquivados fora da contagem de questões únicas da prova. As 79 recuperações textuais e as 79 decisões acumuladas se sobrepõem e não devem ser somadas.

As restrições dos lotes anteriores foram mantidas: arquivados 13, 23, 39 e 44; obsoletos 38, 68 e 78. Esses arquivamentos são decisões editoriais documentadas, não novas anulações oficiais. A conclusão fecha a fila deste conjunto, sem certificar todo detalhe doutrinário, toda jurisprudência possível ou as demais provas da plataforma.

## Contagem geral e alterações externas

Na leitura de **16/10/2026 04:15 UTC**, as quatro tabelas somavam **7.768 registros físicos, 6.526 ativos e 909 em revisão**. Não é contagem de questões únicas. A alteração deste lote foi somente **+5 ativos e -5 pendentes** em `official_exam_questions`.

Desde o inventário anterior, `board_exam_questions` teve **+150 ativos e -150 pendentes** por operações externas. Não se atribui autoria ou certificação dessas revisões a este lote. O inventário atual preserva a distinção.

Detalhes: `docs/question-review-pcac-v-batch6-2026-10-16.json`. As análises preparadas em `scripts/review/pcac-2017-v-context-analyses.json` foram marcadas como concluídas e apontam para as explicações finais em `scripts/review/pcac-2017-v-reviewed-batch6.json`.
